# Claude Learning Portal

A **frontend-only** course on Claude, from beginner to advanced. Read Markdown lessons, take quizzes,
and track your progress, all in the browser. No sign-up, no backend.

Live at **<https://learn-with-will.github.io/claude/>**.

> An independent learning course, not affiliated with or endorsed by Anthropic. Claude is a
> trademark of Anthropic.

## What this is

The portal shell is built with React 19, Vite, TypeScript, React Router, Tailwind CSS v4, `marked`,
and PrismJS. It renders a **24-lesson curriculum** that starts with what Claude is and how a large
language model works, then covers using it well: the Claude apps and plans, prompting, files,
Artifacts (Docs, Slides, Design), Projects, models/effort/thinking, web search and Research, memory,
connectors and MCP, Skills and plugins, Cowork, Claude in Chrome and the office add-ins, and Claude
Code. It finishes by building with Claude: customizing and automating Claude Code, the Claude API
(first requests, thinking and structured outputs, tool use and agents, cost and scale), building your
own MCP server, and a capstone that assembles your own Claude workflow.

Every lesson is written in plain, welcoming English and checked against Anthropic's official
documentation (see **Sources** below). Volatile facts (models, prices, plans, feature availability)
are marked "as of writing (October 2026)."

Progress, bookmarks, and quiz scores live in `localStorage` under `claude-learning-*` keys, so
nothing leaves your machine.

## Run it locally

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run manifest   # regenerate the course manifest from lesson front-matter
npm run validate   # check lessons, quizzes, manifest, sections, and schemas
```

## How the content works

The app is **data-driven**, so adding a lesson needs no code changes:

1. Write the lesson Markdown in `public/content/<level>/<slug>.md` with YAML front-matter
   (including a `summary`).
2. Add a quiz at `public/quizzes/lesson-NN.json`.
3. Run `npm run manifest` to regenerate `public/content/course-manifest.json` from the front-matter,
   then `npm run validate`.

> **Code fences** must declare one of the highlighted languages: `python` and `typescript` (Claude
> API, Agent SDK, and MCP examples), `bash` (installs and the `claude` CLI), `json` (API bodies,
> tool schemas, settings files), `markdown` (CLAUDE.md, SKILL.md, subagent files), `yaml` (CI
> workflows), or `text` (prompts, transcripts, output); see `src/core/prism.ts`.

## Curriculum

**Beginner, getting to know Claude:** what is Claude? · getting started: apps, plans, and usage
limits · talking to Claude · prompting fundamentals · files, images, and documents · Artifacts: docs,
slides, designs, and apps · Projects · using Claude responsibly.

**Intermediate, becoming a power user:** models, effort, and thinking · web search and Research ·
memory and personalization · connectors and MCP · Skills and plugins · Cowork · Claude in Chrome and
your other apps · Claude Code essentials.

**Advanced, building with Claude:** customizing Claude Code · automating Claude Code (hooks,
subagents, MCP, plugins, CI) · the Claude API: first requests · thinking, effort, vision, and
structured outputs · tool use and agents · cost, speed, and scale · building your own MCP server ·
capstone: designing your Claude workflow.

## Accuracy: no hallucination

The authoring contract, including a checklist of easy-to-get-wrong facts verified on 2026-10-17,
lives in `prompts/claude-authoring-prompt.md`.

**Sources:**

- **Claude Help Center**: <https://support.claude.com/> (plans, limits, every app feature, privacy,
  release notes)
- **Plans and pricing**: <https://claude.com/pricing>
- **Claude Developer Platform docs**: <https://platform.claude.com/docs>
- **Claude Code docs**: <https://code.claude.com/docs>
- **Model Context Protocol**: <https://modelcontextprotocol.io/>
- **Agent Skills standard**: <https://agentskills.io/>
- **Claude's constitution**: <https://www.anthropic.com/constitution>

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with `BASE_PATH=/<repo>/`
and publishes `dist/` to GitHub Pages.

---

React 19 · Vite · TypeScript · React Router · Tailwind CSS v4 · marked · PrismJS · localStorage.
