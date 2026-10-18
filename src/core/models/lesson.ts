export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';

/** A single entry in course-manifest.json. */
export interface LessonMeta {
  id: string;
  slug: string;
  title: string;
  level: LessonLevel;
  order: number;
  /** Estimated reading time in minutes. */
  duration: number;
  /** Path to the markdown file, relative to /content. */
  file: string;
  /** Optional short description shown on cards. */
  summary?: string;
  tags?: string[];
}

/** A heading extracted from lesson markdown, used to build the table of contents. */
export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

/** A fully loaded lesson: metadata plus rendered-ready markdown body. */
export interface Lesson {
  meta: LessonMeta;
  /** Raw markdown with front-matter stripped. */
  content: string;
  toc: TocEntry[];
}

export const LEVELS: LessonLevel[] = ['beginner', 'intermediate', 'advanced'];

export const LEVEL_LABELS: Record<LessonLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const LEVEL_BLURBS: Record<LessonLevel, string> = {
  beginner:
    'Getting to know Claude — what it is and how it works, the Claude apps and plans, talking to Claude well, prompting fundamentals, files and images, Artifacts (docs, slides, designs), Projects, and using Claude responsibly.',
  intermediate:
    'Becoming a power user — choosing models, effort, and thinking; web search and Research; memory and personalization; connectors and MCP; Skills and plugins; Cowork tasks; Claude in Chrome and your other apps; and Claude Code essentials.',
  advanced:
    'Building with Claude — customizing and automating Claude Code, the Claude API from first call to tool use and agents, cost and scale, building your own MCP server, and a capstone that assembles your own Claude workflow.',
};

/** Badge utility class per level; defined in index.css. */
export const LEVEL_BADGES: Record<LessonLevel, string> = {
  beginner: 'badge-beginner',
  intermediate: 'badge-intermediate',
  advanced: 'badge-advanced',
};

/** Gradient stops for each level's accent bar — a distinct hue per difficulty. */
export const LEVEL_ACCENTS: Record<LessonLevel, string> = {
  beginner: 'from-emerald-400 to-teal-500',
  intermediate: 'from-amber-400 to-orange-500',
  advanced: 'from-violet-400 to-purple-600',
};
