// Generates public/content/course-manifest.json from the YAML front-matter of
// every lesson under public/content/{beginner,intermediate,advanced}.
//
// The app is manifest-driven: adding a lesson means dropping in a Markdown file
// (and a quiz) and re-running this — no code change. Entries are ordered by the
// front-matter `order` (1..N). Run: `npm run manifest`.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = resolve(root, 'public', 'content');
const TIERS = ['beginner', 'intermediate', 'advanced'];

/** Extracts the raw YAML front-matter block (between the first pair of ---). */
export function extractFrontMatter(raw) {
  const m = /^﻿?---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!m) throw new Error('missing front-matter');
  return m[1];
}

/** Minimal parser for the flat scalar keys + `tags` list our lessons use. */
export function parseFrontMatter(block) {
  const meta = { tags: [] };
  const lines = block.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^tags:\s*$/.test(line)) {
      // collect following `  - item` lines
      for (let j = i + 1; j < lines.length; j++) {
        const item = /^\s*-\s+(.*)$/.exec(lines[j]);
        if (!item) break;
        meta.tags.push(unquote(item[1].trim()));
        i = j;
      }
      continue;
    }
    const kv = /^([a-zA-Z_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    const [, key, valueRaw] = kv;
    if (key === 'tags') continue;
    meta[key] = unquote(valueRaw.trim());
  }
  if (meta.order != null) meta.order = Number(meta.order);
  if (meta.duration != null) meta.duration = Number(meta.duration);
  return meta;
}

function unquote(s) {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

export function collectLessons() {
  const entries = [];
  for (const tier of TIERS) {
    const dir = resolve(contentDir, tier);
    let files;
    try {
      files = readdirSync(dir).filter((f) => f.endsWith('.md'));
    } catch {
      files = [];
    }
    for (const f of files.sort()) {
      const raw = readFileSync(resolve(dir, f), 'utf8');
      const meta = parseFrontMatter(extractFrontMatter(raw));
      entries.push({
        id: meta.id,
        slug: meta.slug,
        title: meta.title,
        level: meta.level,
        order: meta.order,
        duration: meta.duration,
        file: `${tier}/${f}`,
        summary: meta.summary,
        tags: meta.tags,
      });
    }
  }
  entries.sort((a, b) => a.order - b.order);
  return entries;
}

// Only run when invoked directly (not when imported by the validator).
// pathToFileURL keeps this check working on Windows paths too.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const entries = collectLessons();
  const out = resolve(contentDir, 'course-manifest.json');
  writeFileSync(out, JSON.stringify(entries, null, 2) + '\n');
  console.log(`generate-manifest: wrote ${entries.length} entries to ${out}`);
}
