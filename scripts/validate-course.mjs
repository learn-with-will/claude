// Validates the whole course before build/ship. Checks the invariants the
// authoring contract promises: 24 lessons ↔ 24 quizzes ↔ manifest, front-matter
// ↔ file/order, the required H1 sections, exactly 5 tags, ≥5 flash cards, code
// fences limited to the allowed languages, and the quiz schema per question
// type. Exits non-zero (listing every problem) if anything is off.
// Run: `npm run validate`.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractFrontMatter, parseFrontMatter, collectLessons } from './generate-manifest.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = resolve(root, 'public', 'content');
const quizzesDir = resolve(root, 'public', 'quizzes');

const EXPECTED_COUNT = 24;
const PER_LEVEL = 8;
const ALLOWED_FENCES = new Set(['python', 'typescript', 'json', 'bash', 'markdown', 'yaml', 'text']);
const REQUIRED_SECTIONS = [
  'Learning Objectives',
  'Why It Matters',
  'Concept Explanation',
  'Key Terminology',
  'Options and Trade-offs',
  'Worked Example',
  'Real World Analogy',
  'Examples',
  'Common Mistakes',
  'Best Practices',
  'Summary',
  'Flash Cards',
  'Exercises',
  'Further Reading',
];
const QUIZ_TYPES = ['single-choice', 'multiple-choice', 'fill-blank', 'ordering', 'match-pair'];

const errors = [];
const fail = (where, msg) => errors.push(`[${where}] ${msg}`);

/**
 * Blanks every line inside a fenced code block (keeping the line count), so a
 * `# comment` in a bash snippet or a `# Heading` in a CLAUDE.md example is
 * never mistaken for a lesson section heading.
 */
function maskFences(text) {
  let inFence = false;
  return text
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      return inFence ? '' : line;
    })
    .join('\n');
}

/** Returns the text of the H1 section `name` (up to the next `# ` heading). */
function sectionBody(body, name) {
  const re = new RegExp(`^# ${name}\\s*$`, 'm');
  const m = re.exec(body);
  if (!m) return null;
  const start = m.index + m[0].length;
  const rest = body.slice(start);
  const next = /^# .+$/m.exec(rest);
  return next ? rest.slice(0, next.index) : rest;
}

// ---- Lessons -------------------------------------------------------------
const tiers = { beginner: [], intermediate: [], advanced: [] };
const lessonById = new Map();
const seenOrders = new Map();
const seenSlugs = new Set();

for (const tier of Object.keys(tiers)) {
  const dir = resolve(contentDir, tier);
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')) : [];
  for (const f of files) {
    const rel = `${tier}/${f}`;
    const raw = readFileSync(resolve(dir, f), 'utf8');
    let meta;
    try {
      meta = parseFrontMatter(extractFrontMatter(raw));
    } catch (e) {
      fail(rel, `front-matter parse failed: ${e.message}`);
      continue;
    }
    const body = raw.slice(/^﻿?---\r?\n[\s\S]*?\r?\n---/.exec(raw)?.[0].length ?? 0);
    // Section checks run on a copy with fenced code blanked out.
    const prose = maskFences(body);
    const rawProse = maskFences(raw);
    tiers[tier].push(meta);
    lessonById.set(meta.id, { meta, body, rel });

    // front-matter field checks
    for (const key of ['id', 'slug', 'title', 'level', 'order', 'duration', 'summary']) {
      if (meta[key] === undefined || meta[key] === '') fail(rel, `missing front-matter: ${key}`);
    }
    if (meta.level !== tier) fail(rel, `level "${meta.level}" != folder "${tier}"`);
    if (meta.slug && `${meta.slug}.md` !== f) fail(rel, `slug "${meta.slug}" != filename`);
    if (meta.slug) {
      if (seenSlugs.has(meta.slug)) fail(rel, `duplicate slug ${meta.slug}`);
      seenSlugs.add(meta.slug);
    }
    if (!/^lesson-\d{2}$/.test(meta.id || '')) fail(rel, `id "${meta.id}" not lesson-NN`);
    if (meta.id && meta.order != null) {
      const nn = String(meta.order).padStart(2, '0');
      if (meta.id !== `lesson-${nn}`) fail(rel, `id ${meta.id} != order ${meta.order}`);
    }
    if (meta.order != null) {
      if (seenOrders.has(meta.order)) fail(rel, `duplicate order ${meta.order}`);
      seenOrders.set(meta.order, rel);
    }
    if (!Number.isFinite(meta.duration) || meta.duration <= 0)
      fail(rel, `duration not a positive number`);
    if (!Array.isArray(meta.tags) || meta.tags.length !== 5)
      fail(rel, `tags must be exactly 5 (got ${meta.tags?.length ?? 0})`);
    if (meta.summary && !/[.!?]$/.test(meta.summary.trim()))
      fail(rel, `summary should be a sentence ending in punctuation`);

    // required sections, in order
    let lastIdx = -1;
    for (const s of REQUIRED_SECTIONS) {
      const re = new RegExp(`^# ${s}\\s*$`, 'm');
      const at = rawProse.search(re);
      if (at === -1) {
        fail(rel, `missing H1 section: ${s}`);
      } else if (at < lastIdx) {
        fail(rel, `section out of order: ${s}`);
      } else {
        lastIdx = at;
      }
    }

    // Examples subsections
    const examples = sectionBody(prose, 'Examples');
    if (examples) {
      for (const n of [1, 2, 3]) {
        if (!new RegExp(`^## Example ${n}\\b`, 'm').test(examples))
          fail(rel, `Examples missing "## Example ${n}"`);
      }
    }
    // Exercises subsections
    const exercises = sectionBody(prose, 'Exercises');
    if (exercises) {
      for (const level of ['Easy', 'Medium', 'Challenging']) {
        if (!new RegExp(`^### ${level}\\b`, 'm').test(exercises))
          fail(rel, `Exercises missing "### ${level}"`);
      }
    }
    // Flash cards >= 5 Q:/A: pairs
    const cards = sectionBody(prose, 'Flash Cards');
    if (cards) {
      const qs = (cards.match(/^Q:/gm) || []).length;
      const as = (cards.match(/^A:/gm) || []).length;
      if (qs < 5) fail(rel, `Flash Cards: ${qs} Q: (need >= 5)`);
      if (qs !== as) fail(rel, `Flash Cards: ${qs} Q: vs ${as} A:`);
    }
    // Concept Explanation must use ### subsections
    const concept = sectionBody(prose, 'Concept Explanation');
    if (concept && !/^### .+$/m.test(concept))
      fail(rel, `Concept Explanation has no ### subsections`);
    // Options and Trade-offs must contain a table
    const tradeoffs = sectionBody(prose, 'Options and Trade-offs');
    if (tradeoffs && !/^\s*\|.*\|/m.test(tradeoffs))
      fail(rel, `Options and Trade-offs has no table`);

    // code fences
    const fenceRe = /^```([^\s`]*)/gm;
    let fm;
    while ((fm = fenceRe.exec(body))) {
      const lang = fm[1];
      if (lang === '') continue; // closing fence
      if (!ALLOWED_FENCES.has(lang)) fail(rel, `disallowed code fence: \`\`\`${lang}`);
    }
  }
}

const allLessons = [...lessonById.values()].map((v) => v.meta);
if (allLessons.length !== EXPECTED_COUNT)
  fail('lessons', `expected ${EXPECTED_COUNT} lessons, found ${allLessons.length}`);
for (const [tier, list] of Object.entries(tiers)) {
  if (list.length !== PER_LEVEL) fail('lessons', `${tier}: expected ${PER_LEVEL}, found ${list.length}`);
}
for (let i = 1; i <= EXPECTED_COUNT; i++) {
  if (!seenOrders.has(i)) fail('lessons', `no lesson with order ${i}`);
}

// ---- Manifest ------------------------------------------------------------
const manifestPath = resolve(contentDir, 'course-manifest.json');
let manifest = [];
if (!existsSync(manifestPath)) {
  fail('manifest', 'course-manifest.json missing (run `npm run manifest`)');
} else {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (manifest.length !== EXPECTED_COUNT)
    fail('manifest', `expected ${EXPECTED_COUNT} entries, found ${manifest.length}`);
  // manifest must be freshly generated from front-matter
  const fresh = collectLessons();
  if (JSON.stringify(fresh) !== JSON.stringify(manifest))
    fail('manifest', 'out of sync with lesson front-matter (run `npm run manifest`)');
  let prevOrder = 0;
  for (const e of manifest) {
    const rel = e.file || e.slug;
    if (!lessonById.has(e.id)) fail('manifest', `${e.id} has no lesson file`);
    if (e.order <= prevOrder) fail('manifest', `${rel}: order not strictly increasing`);
    prevOrder = e.order;
    const fpath = resolve(contentDir, e.file || '');
    if (!e.file || !existsSync(fpath)) fail('manifest', `${e.id}: file "${e.file}" not found`);
  }
}

// ---- Quizzes -------------------------------------------------------------
const quizFiles = existsSync(quizzesDir)
  ? readdirSync(quizzesDir).filter((f) => f.endsWith('.json'))
  : [];
if (quizFiles.length !== EXPECTED_COUNT)
  fail('quizzes', `expected ${EXPECTED_COUNT} quizzes, found ${quizFiles.length}`);

for (const meta of allLessons) {
  const nn = String(meta.order).padStart(2, '0');
  const qpath = resolve(quizzesDir, `lesson-${nn}.json`);
  const where = `quizzes/lesson-${nn}.json`;
  if (!existsSync(qpath)) {
    fail(where, `missing quiz for ${meta.id}`);
    continue;
  }
  let quiz;
  try {
    quiz = JSON.parse(readFileSync(qpath, 'utf8'));
  } catch (e) {
    fail(where, `invalid JSON: ${e.message}`);
    continue;
  }
  if (quiz.id !== `quiz-lesson-${nn}`) fail(where, `id should be quiz-lesson-${nn}`);
  if (quiz.lessonId !== `lesson-${nn}`) fail(where, `lessonId should be lesson-${nn}`);
  if (quiz.passingScore !== 60) fail(where, `passingScore should be 60`);
  const qs = quiz.questions || [];
  if (qs.length < 5 || qs.length > 6) fail(where, `expected 5-6 questions, got ${qs.length}`);
  const typesSeen = new Set();
  const ids = new Set();
  for (const q of qs) {
    if (!q.id) fail(where, `question missing id`);
    if (ids.has(q.id)) fail(where, `duplicate question id ${q.id}`);
    ids.add(q.id);
    if (!QUIZ_TYPES.includes(q.type)) fail(where, `${q.id}: bad type ${q.type}`);
    typesSeen.add(q.type);
    if (!q.prompt) fail(where, `${q.id}: missing prompt`);
    if (!q.explanation) fail(where, `${q.id}: missing explanation`);
    const optIds = Array.isArray(q.options) ? q.options.map((o) => o.id) : [];
    switch (q.type) {
      case 'single-choice':
        if (!q.options || q.options.length < 2) fail(where, `${q.id}: needs >=2 options`);
        if (!optIds.includes(q.answer)) fail(where, `${q.id}: answer not an option id`);
        break;
      case 'multiple-choice':
        if (!q.options || q.options.length < 2) fail(where, `${q.id}: needs >=2 options`);
        if (!Array.isArray(q.answer) || q.answer.length < 1)
          fail(where, `${q.id}: answer must be a non-empty array`);
        else if (!q.answer.every((a) => optIds.includes(a)))
          fail(where, `${q.id}: answer has unknown option id`);
        break;
      case 'fill-blank':
        if (!Array.isArray(q.answer) || q.answer.length < 1)
          fail(where, `${q.id}: answer must be a non-empty array`);
        break;
      case 'ordering': {
        const itemIds = Array.isArray(q.items) ? q.items.map((o) => o.id) : [];
        if (itemIds.length < 2) fail(where, `${q.id}: needs >=2 items`);
        if (!Array.isArray(q.answer) || q.answer.length !== itemIds.length)
          fail(where, `${q.id}: answer must order every item`);
        else if ([...q.answer].sort().join() !== [...itemIds].sort().join())
          fail(where, `${q.id}: answer is not a permutation of item ids`);
        break;
      }
      case 'match-pair':
        if (!Array.isArray(q.pairs) || q.pairs.length < 2)
          fail(where, `${q.id}: needs >=2 pairs`);
        else if (!q.pairs.every((p) => p.left && p.right))
          fail(where, `${q.id}: each pair needs left and right`);
        // The UI keys rows by left and lists rights as dropdown options, so both must be unique.
        else if (new Set(q.pairs.map((p) => p.left)).size !== q.pairs.length)
          fail(where, `${q.id}: duplicate left value in pairs`);
        else if (new Set(q.pairs.map((p) => p.right)).size !== q.pairs.length)
          fail(where, `${q.id}: duplicate right value in pairs`);
        break;
    }
  }
  for (const t of QUIZ_TYPES) {
    if (!typesSeen.has(t)) fail(where, `missing question type: ${t}`);
  }
}

// ---- Report --------------------------------------------------------------
if (errors.length) {
  console.error(`\n✗ Course validation FAILED with ${errors.length} problem(s):\n`);
  for (const e of errors) console.error('  - ' + e);
  console.error('');
  process.exit(1);
} else {
  console.log(
    `\n✓ Course validation passed: ${allLessons.length} lessons (8/8/8), ${quizFiles.length} quizzes, manifest in sync, all sections/tags/fences/quiz schemas OK.\n`,
  );
}
