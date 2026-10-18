# Claude Course: Authoring Contract

This file is the contract every lesson and quiz in this course follows. It records the voice, the
sources, the facts that are easy to get wrong, and the lesson and quiz format. Facts below were
checked against Anthropic's own documentation on **2026-10-17**. Claude changes fast, so re-verify any
volatile fact (models, prices, plans, feature availability) before editing a lesson that uses it.

## Audience and scope

- **Who it's for:** anyone, from a first-time user to a developer. The beginner tier needs no coding.
  The intermediate tier is for power users. The advanced tier builds with Claude Code, the Claude API,
  and MCP.
- **Scope:** what Claude is and how it works, then the whole product family: the Claude apps (web,
  desktop, mobile), plans and usage limits, prompting, files, Artifacts (Docs, Slides, Design),
  Projects, models/effort/thinking, web search and Research, memory and personalization, connectors
  and MCP, Skills and plugins, Cowork, Claude in Chrome and other apps, Claude Code, the Claude API
  (tool use, structured outputs, caching, batches, agents), building MCP servers, and responsible use.
- **Sibling course:** the portal's *AI Agents* course goes deeper on agent architecture (RAG,
  memory systems, multi-agent design, evaluation). Link to it rather than duplicating it.

## Voice

- Plain, welcoming English. Define every term the first time it appears. One analogy per lesson (the
  *Real World Analogy* section).
- Practical first: every concept is followed by what to *do* with it (a prompt, a setting, a command).
- Honest about limits: say what Claude can't do, what's beta, and what depends on your plan.
- Say "as of writing (October 2026)" for anything volatile, and link the page that stays current.
- Code is minimal and runnable. Prompts go in `text` fences.

## Sources (cite these; invent nothing)

1. **Claude Help Center**: <https://support.claude.com/> (plans, usage limits, every app feature,
   privacy, release notes at <https://support.claude.com/en/articles/12138966-release-notes>)
2. **Plans and pricing**: <https://claude.com/pricing>
3. **Claude Developer Platform docs**: <https://platform.claude.com/docs> (models overview, pricing,
   prompting best practices, Messages API, tool use, structured outputs, caching, batches, thinking,
   effort, reducing hallucinations)
4. **Claude Code docs**: <https://code.claude.com/docs> (overview, how it works, permission modes,
   memory/CLAUDE.md, skills, hooks, subagents, plugins, MCP, best practices, data usage)
5. **Model Context Protocol**: <https://modelcontextprotocol.io/> (architecture, build-a-server)
6. **Agent Skills standard**: <https://agentskills.io/>; Anthropic's example skills:
   <https://github.com/anthropics/skills>
7. **Claude's constitution**: <https://www.anthropic.com/constitution>
8. **Anthropic news**: <https://www.anthropic.com/news>, and **Anthropic Academy**:
   <https://academy.claude.com/>

If a claim isn't backed by one of these, qualify it or leave it out. No invented numbers, benchmarks,
or "best/fastest" claims.

## High-risk facts checklist (verified 2026-10-17)

### Models
- Current lineup: **Claude Fable 5.1** (`claude-fable-5-1`), **Claude Opus 5.5** (`claude-opus-5-5`),
  **Claude Sonnet 5.5** (`claude-sonnet-5-5`), **Claude Haiku 5.5** (`claude-haiku-5-5`). All have a
  **1M-token** context window, **128K** max output, and a **June 2026** reliable knowledge cutoff.
- Launch dates: Fable 5.1 on Sep 1, 2026; Opus 5.5 on Sep 22, 2026; Sonnet 5.5 on Sep 28, 2026;
  Haiku 5.5 on Oct 7, 2026.
- Tiers: Haiku is the smallest and fastest; Sonnet balances speed and intelligence; Opus is for
  long-running agentic coding and knowledge work; Fable is the most capable widely released tier.
  **Mythos** models are restricted to approved Project Glasswing participants. Don't present Mythos
  as generally available.
- The docs say: if unsure, **start with Claude Opus 5.5** for most workloads; use Fable 5.1 for
  demanding reasoning and long-horizon agentic work.
- API list prices per million tokens (input/output): Fable 5.1 $10/$50; Opus 5.5 $4/$20; Sonnet 5.5
  $2/$10; Haiku 5.5 from $0.10/$0.50 (prompts up to 100K tokens; $0.50/$2.50 above). Batch API is
  **50% off**. Cache reads are 10% of base input (2.5% on Fable 5.1, 5% on Opus 5.5 and Sonnet 5.5).
- Default API effort: Fable 5.1 `high`, Opus 5.5 `medium`, Sonnet 5.5 `high`, Haiku 5.5 `medium`.
  Levels: `low`, `medium`, `high`, `xhigh`, `max`.
- Thinking is **adaptive** on current models (Claude decides how much to think, steered by effort).
  It's **always on** for Fable 5.1 and Opus 5.5. The manual `budget_tokens` setting is rejected on
  current models.
- Training data cutoffs (Help Center): Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1 are June 2026.

### Apps, plans, and limits
- Surfaces: web (claude.ai), Claude Desktop (macOS, Windows), mobile (iOS, Android). Users must be
  **18+** and in a supported location.
- Plans (claude.com/pricing, as of writing): **Free** $0; **Pro** $20/month, or $17/month billed
  annually ($200 up front); **Max** from $100/month, with 5x or 20x Pro's usage; **Team** Standard
  seat $25/month ($20 annual), Premium seat $125/month ($100 annual); **Enterprise** $20/seat/month
  billed annually, 20-seat minimum, plus usage at API rates; **Education** plans for institutions.
- Usage: Free has a session limit that resets every **five hours**. Paid plans have a five-hour
  session limit **and** weekly limits. Limits are **shared across Claude and Claude Code**. Long
  chats, big files, tools (web search, Research), model choice, effort level, Artifacts, and
  multi-step tasks all use more of the limit.
- `ANTHROPIC_API_KEY` set in your environment makes Claude Code bill the API instead of your plan.

### Features (plan details as of writing)
- Uploads: up to **500 MB per file** and **20 files per chat**. Images up to **8000x8000 px**. PDFs
  up to **1000 pages**; Claude analyzes text *and* visuals for PDFs of **100 pages or fewer**, and
  text only for 101 to 1000 pages. Project files are capped at **30 MB** each.
- File creation (Excel, PowerPoint, Word, PDF) runs code in an isolated sandbox and needs **Code
  execution and file creation** turned on (Settings > Capabilities).
- Claude **doesn't generate photos or illustrations** like image models; it builds diagrams, charts,
  and visuals with HTML and SVG.
- **Artifacts** (new experience since Sep 16, 2026): templates for **Docs**, **Slides**, and
  **Design**; **Dashboards** (beta, paid plans); **Motion** (beta, Team/Enterprise). They need code
  execution and file creation turned on. Artifacts made in chat before Sep 16, 2026 are "legacy
  artifacts". AI-powered artifacts use each *viewer's* own plan limits. Storage: 20 MB per artifact,
  text only.
- **Projects**: Free users can create up to **five**. On paid plans, RAG kicks in automatically near
  the context limit and expands capacity **up to 10x**. Each project has its own memory.
- **Web search** includes citations; **Research** (paid plans) needs web search on, runs on Opus 5.5
  whatever model you picked (falls back to Opus 4.8), and can use connectors on web and desktop.
- **Memory**: saved as editable topics (Settings > Memory). On by default for Free, Pro, and Max; off
  for Team/Enterprise members until the org enables it and they opt in. Sensitive topics are off by
  default. Never saved: government ID numbers, criminal history, financial account numbers,
  immigration status. **Incognito** chats stay out of history, memory, and search.
- **Chat search** (searching past chats): paid plans.
- **Styles moved to skills**: custom styles were migrated to (disabled) skills; the Concise,
  Explanatory, and Formal presets were dropped; Learning is kept as a skill. The Help Center article
  that announced it (10181068) has since been removed, and the current personalization article lists
  only instructions, project instructions, and skills.
- **Connectors**: remote (web) connectors work on every surface; **desktop extensions** run locally
  in Claude Desktop and Claude Code only. A custom connector is a remote MCP server URL that must be
  reachable from Anthropic's cloud. Free users get **one** custom connector.
- **Skills**: folders with a `SKILL.md` (YAML front-matter `name` + `description`, then
  instructions). They load by **progressive disclosure**. They need code execution on, and they
  follow the open **Agent Skills** standard. The claude.ai upload guide caps `name` at 64 and
  `description` at 200 characters.
- **Plugins** bundle skills, connectors, and sub-agents (paid plans). Hooks and sub-agents run only
  in Cowork and Claude Code.
- **Cowork** (paid plans) brings Claude Code's agentic abilities to knowledge work. It has
  cloud sessions, scheduled tasks (`/schedule`), and the permission modes **Manual**, **Auto**, and
  **Skip**. Since Sep 16, 2026 it's rolling into every conversation ("Cowork is now just Claude").
- **Claude in Chrome** (paid plans) works in **Google Chrome only**, not on mobile. Its modes are
  **Automatically approve** and **Manually approve**. Prompt injection is the biggest risk; use a
  separate browser profile. Prohibited: stock trading or investment transactions, bypassing
  captchas, inputting sensitive data, gathering facial images.

### Claude Code
- Install: `curl -fsSL https://claude.ai/install.sh | bash` (macOS/Linux/WSL),
  `irm https://claude.ai/install.ps1 | iex` (PowerShell). Also Homebrew `brew install --cask
  claude-code` and WinGet `winget install Anthropic.ClaudeCode`. Then run `claude` in a project.
- Pro and Max include Claude Code. Team Standard seats include it (since Jan 16, 2026).
- The agentic loop is **gather context, take action, verify results**.
- Permission modes: **Manual** (config value `default`), `acceptEdits`, `plan`, `auto`, `dontAsk`,
  `bypassPermissions`. Auto is the built-in starting mode on v2.1.283+ for interactive terminal and
  VS Code sessions. `Shift+Tab` cycles modes. `Esc` stops; `Esc Esc` or `/rewind` rewinds.
  Checkpoints cover file edits only, not remote side effects.
- CLAUDE.md: `~/.claude/CLAUDE.md` (user), `./CLAUDE.md` or `./.claude/CLAUDE.md` (project),
  `./CLAUDE.local.md` (local). Keep it under ~200 lines. `@path` imports. `.claude/rules/` with
  `paths:` front-matter. Claude Code can read `AGENTS.md`. Auto memory loads the first 200 lines or
  25KB.
- Skills: `.claude/skills/<name>/SKILL.md` or `~/.claude/skills/...`; `disable-model-invocation:
  true` for side-effect workflows; `$ARGUMENTS`; keep `SKILL.md` under 500 lines.
- Subagents: `.claude/agents/*.md` with `name` and `description` (required); built-ins include
  Explore, Plan, and general-purpose.
- Hooks: in settings JSON under `"hooks"`. Events include `PreToolUse`, `PostToolUse`,
  `Notification`, and `Stop`. **Exit code 2 blocks** the action. Hooks are deterministic, while
  CLAUDE.md is advisory.
- Headless: `claude -p "..."` with `--output-format json` or `stream-json`.

### Claude API
- `pip install anthropic` / `npm install @anthropic-ai/sdk`; key in `ANTHROPIC_API_KEY`; one endpoint
  `POST /v1/messages`; the API is **stateless**.
- `stop_reason`: `end_turn`, `max_tokens`, `stop_sequence`, `tool_use`, `pause_turn`, `refusal`.
  Always check it before reading `content`.
- **No assistant prefill** on current models (returns 400). Use structured outputs
  (`output_config.format`, or `client.messages.parse(..., output_format=Model)` in Python).
- **Forced tool choice** (`any`/`tool`) returns 400 on Opus 5.5, Sonnet 5.5, and Fable 5.1. Use
  `auto` with a prompt instruction, plus `strict: true`.
- Adaptive thinking `thinking={"type": "adaptive"}`; effort in `output_config={"effort": ...}`;
  `display: "summarized"` to see a thinking summary (default is omitted).
- Prompt caching is a **prefix match**. Use `cache_control: {"type": "ephemeral"}`, and verify with
  `usage.cache_read_input_tokens`.
- Batches: 50% off; up to 100,000 requests or 256 MB per batch; most finish within an hour (24h max);
  results kept 29 days.
- Server-side refusal fallback: `fallbacks: "default"` with beta `server-side-fallback-2026-07-01`
  (Claude API only; not for Haiku 5.5).
- Agent SDK: `claude-agent-sdk` (Python) / `@anthropic-ai/claude-agent-sdk` (TypeScript). Third
  parties may not offer claude.ai login for their products unless approved.

### MCP
- An open-source standard for connecting AI applications to external systems. The docs compare it
  to **USB-C**.
- Hosts, clients, and servers. Servers expose **tools, resources, prompts**. Clients can offer
  **elicitation**; **sampling is deprecated** as of protocol version **2026-07-28**.
- Transports: **stdio** (local) and **Streamable HTTP** (remote).
- Python SDK 2.x: `from mcp.server import MCPServer`, `@mcp.tool()`, `mcp.run(transport="stdio")`.
  **Never print to stdout** in a stdio server; log to stderr.

### Values and privacy
- Constitution priority order (holistic, not strict): **broadly safe**, **broadly ethical**,
  **compliant with Anthropic's guidelines**, **genuinely helpful**.
- Consumer accounts (Free/Pro/Max) **choose** whether their data trains future models. Retention is
  5 years if allowed, 30 days if not. Settings: claude.ai/settings/data-privacy-controls.
- Commercial accounts (Team, Enterprise, API) aren't used for training by default.

## Lesson format

Front-matter: `id` (lesson-NN), `slug`, `title`, `level`, `order` (1-24), `duration`, `tags`
(exactly 5), `summary` (one sentence). Then these H1 sections, in order:

Learning Objectives · Why It Matters · Concept Explanation (### subsections) · Key Terminology ·
Options and Trade-offs (a table) · Worked Example · Real World Analogy · Examples (## Example 1/2/3 =
basic, real-world, pitfall) · Common Mistakes · Best Practices · Summary · Flash Cards (6 Q:/A:) ·
Exercises (### Easy/Medium/Challenging) · Further Reading.

Code fences: only `python`, `typescript`, `bash`, `json`, `markdown`, `yaml`, `text`.

## Quiz format

`public/quizzes/lesson-NN.json`: `id` quiz-lesson-NN, `lessonId` lesson-NN, `title`, `passingScore`
60, 5-6 questions that cover all five types (single-choice, multiple-choice, fill-blank, ordering,
match-pair). Each question has an `explanation`, and every answer must be traceable to the lesson.

## Validation

Run `npm run manifest` then `npm run validate` (24↔24↔manifest, sections, tags, flash cards, fences,
quiz schemas), then `npm run build`.
