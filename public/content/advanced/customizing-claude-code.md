---
id: lesson-17
slug: customizing-claude-code
title: "Customizing Claude Code: CLAUDE.md, Skills, Styles, and Permissions"
level: advanced
order: 17
duration: 24
tags:
  - claude-md
  - claude-code-skills
  - output-styles
  - permissions
  - settings
summary: "How to shape Claude Code to your project and your habits: writing a CLAUDE.md that actually gets followed, path-scoped rules and auto memory, project skills with arguments, output styles, and permission rules in settings files, plus when each one is the right tool."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Write and organize **CLAUDE.md** files that Claude follows consistently.
- Use **`.claude/rules/`**, **imports**, and **auto memory** without bloating context.
- Build **project skills** with arguments and controlled invocation.
- Switch **output styles** and write a custom one.
- Configure **permission rules** and settings scopes so the right things run without prompts.

# Why It Matters

Out of the box, Claude Code is a capable generalist. Customized, it knows your build commands, your
conventions, your release checklist, and which commands are safe, so you stop repeating yourself and
it stops repeating mistakes. Done badly, customization does the opposite: a bloated CLAUDE.md gets
half-ignored, and loose permissions invite trouble. Each tool has a specific job.

# Concept Explanation

### Pick the right layer

Anthropic's docs suggest adding features **as triggers come up**, not all at once:

| Trigger | Add |
| --- | --- |
| Claude gets a convention or command wrong twice | A line in **CLAUDE.md** |
| You keep asking for a different response length or format | An **output style** |
| You keep typing the same prompt to start a task | A user-invocable **skill** |
| You paste the same multi-step procedure for the third time | A **skill** |
| Something must happen every time, without exception | A **hook** (Lesson 18) |
| A second repository needs the same setup | A **plugin** (Lesson 18) |

### CLAUDE.md: always-on project instructions

`CLAUDE.md` is a Markdown file Claude reads at the start of **every session**. Where it lives decides
who it applies to:

- **User:** `~/.claude/CLAUDE.md`, your preferences for all projects.
- **Project:** `./CLAUDE.md` or `./.claude/CLAUDE.md`, shared with your team through git.
- **Local:** `./CLAUDE.local.md`, your private notes for this project. Keep it out of git.

Files in the directories **above** your working directory load at launch. Files in **subdirectories**
load when Claude works there. They're **concatenated, not overridden**. Run **`/init`** to generate a
starter file from your codebase.

**What to put in it,** per Anthropic's best practices: commands Claude can't guess, style rules that
differ from defaults, test instructions, repository etiquette, architectural decisions, environment
quirks, and non-obvious gotchas. **Leave out** what Claude can learn by reading the code, standard
conventions, long tutorials, and anything that changes often.

**Keep it short:** target under **200 lines**. For each line, ask *"Would removing this cause Claude to
make mistakes?"* If Claude keeps ignoring a rule, the file is probably too long. Use emphasis
("IMPORTANT") on at most a line or two.

```markdown
# Commands
- Run tests with `pnpm test` (not npm). Single file: `pnpm test path/to/file`.
- Typecheck with `pnpm typecheck` after any change to src/.

# Conventions
- ES modules only; no CommonJS.
- API handlers live in src/api/ and must validate input with zod.

# Gotchas
- The dev database resets nightly; never rely on seeded IDs.
```

**Imports:** pull in other files with `@path/to/file` syntax. Imported files still load at launch, so
imports organize a file without reducing its cost. **AGENTS.md:** if a repository has an `AGENTS.md`
for other coding agents and no `CLAUDE.md`, Claude Code can read it instead.

CLAUDE.md is **context, not enforcement**. The docs are explicit that to *block* an action regardless
of what Claude decides, you need a hook.

### Path-scoped rules and auto memory

- **`.claude/rules/*.md`** splits instructions into topic files. A rule with **`paths:`** front-matter
  loads **only when Claude works with matching files**, which saves context:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

- Every endpoint returns errors as { error: { code, message } }.
- Add an integration test in tests/api/ for each new route.
```

- **Auto memory:** Claude saves its own learnings (your corrections and preferences) as it works. The
  first **200 lines or 25KB** of its `MEMORY.md` load each session. Use **`/memory`** to view, edit, or
  turn it off.

### Skills in Claude Code

Skills (Lesson 13) work the same way here, with extra options. Put them in
**`.claude/skills/<name>/SKILL.md`** (project, shareable) or **`~/.claude/skills/<name>/SKILL.md`**
(personal). Run one with **`/<name>`**, or let Claude load it when the description matches.

Useful front-matter fields:

- `description`: what it does and when to use it (Claude's trigger).
- `disable-model-invocation: true`: only **you** can run it. Use this for workflows with side
  effects, like deploys.
- `allowed-tools`: tools Claude may use without asking while the skill runs.
- `argument-hint`, plus **`$ARGUMENTS`** (or `$0`, `$1`) in the body to receive what you type after
  the command.
- `context: fork`: run the skill in an isolated subagent context.

```markdown
---
name: fix-issue
description: Fix a GitHub issue end to end
disable-model-invocation: true
argument-hint: [issue-number]
---

Fix GitHub issue $ARGUMENTS:
1. Read it with `gh issue view $ARGUMENTS`.
2. Find the relevant code and write a failing test that reproduces it.
3. Fix the code until the test passes; run the full suite.
4. Commit with a message that references the issue.
```

Run it with `/fix-issue 1234`. Older `.claude/commands/*.md` files keep working as commands. Keep each
`SKILL.md` under about 500 lines and move reference material into separate files. Claude Code also
ships **bundled skills** such as `/code-review`, `/batch`, `/debug`, and `/loop`.

### Output styles

An **output style** sets Claude's role, tone, and response format for a **whole session**. Besides
**Default**, the built-ins are **Proactive** (works through routine decisions without asking),
**Concise** (results first, no preamble or recap), **Explanatory** (adds `Insight` blocks explaining
choices), and **Learning** (leaves small `TODO(human)` pieces for you to write). Switch with
`/output-style concise` or via `/config`. Custom styles are Markdown files in `~/.claude/output-styles/`
or `.claude/output-styles/` (front-matter: `name`, `description`, `keep-coding-instructions`).

### Settings and permission rules

Settings live in JSON files with clear precedence, from highest to lowest:

1. **Managed** settings (your organization)
2. **Command-line** flags
3. **Project local:** `.claude/settings.local.json` (you, this project; kept out of git)
4. **Shared project:** `.claude/settings.json` (commit it for your team)
5. **User:** `~/.claude/settings.json` (you, every project)

Permission rules sit under `permissions` as `allow`, `ask`, and `deny` lists. They're evaluated in the
order **deny → ask → allow**, and the first match wins, so a deny can't be carved out by an allow:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": ["Bash(npm run lint)", "Bash(npm run test *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
  }
}
```

`Bash(npm run *)` matches any `npm run …` command, and the space before `*` matters. Claude Code
understands shell operators, so `Bash(safe-cmd *)` doesn't approve `safe-cmd && other-cmd`. Use
**`/permissions`** to view and edit rules, and **`/sandbox`** for OS-level filesystem and network
isolation of shell commands (macOS, Linux, WSL2).

# Key Terminology

- **CLAUDE.md** — always-loaded project or user instructions in Markdown.
- **CLAUDE.local.md** — personal, uncommitted project instructions.
- **`.claude/rules/`** — modular instruction files, optionally scoped with `paths:` front-matter.
- **Auto memory** — notes Claude writes itself; the first 200 lines or 25KB load per session.
- **Skill** — a `SKILL.md` playbook invoked with `/name` or loaded when relevant.
- **Output style** — session-wide instructions for role, tone, and format (Concise, Explanatory, …).
- **Permission rule** — an `allow`, `ask`, or `deny` entry like `Bash(npm test *)` or `Read(./.env)`.

# Options and Trade-offs

| Put it in… | When | Cost |
| --- | --- | --- |
| CLAUDE.md | Every session needs it ("use pnpm") | Loaded every request, so keep it lean |
| `.claude/rules/` with `paths:` | Only some files need it | Loads only when matching files are touched |
| A skill | Sometimes-needed procedures or references | Description always visible; body loads on use |
| An output style | How *every* response should read | Applies to the whole session |
| A permission rule | What may run without asking, or never | Enforced by Claude Code, not by the model |
| A hook (Lesson 18) | Must happen every time | Deterministic; zero context unless it outputs |

# Worked Example

**Goal:** set up a TypeScript service repository for your team.

1. **`/init`** to draft `CLAUDE.md`, then prune it to the commands, conventions, and gotchas Claude
   wouldn't discover. Get it under 200 lines.
2. **Move API-only guidance** into `.claude/rules/api.md` with `paths: ["src/api/**/*.ts"]`.
3. **Add a `/release` skill** (`disable-model-invocation: true`) with your release checklist, and a
   reference skill describing your error-handling conventions.
4. **Permissions** in `.claude/settings.json`: allow `Bash(pnpm test *)` and `Bash(pnpm typecheck)`,
   ask for `Bash(git push *)`, deny `Read(./.env*)`.
5. **Commit** `CLAUDE.md`, `.claude/rules/`, `.claude/skills/`, and `.claude/settings.json`.
   Teammates put personal tweaks in `CLAUDE.local.md` and `.claude/settings.local.json`.
6. **Test:** open a fresh session, run `/context` to confirm what loaded, and try a task that should
   follow the API rules.

# Real World Analogy

Customizing Claude Code is like **onboarding a strong new hire**. You give them a short **team
handbook** (CLAUDE.md), not a 300-page binder they'll skim. You give **department guides** they read
when they visit that department (path-scoped rules), and **playbooks** for recurring procedures
(skills). You agree on **how they'll report back** (output style). And they get a **building badge**
that opens some doors automatically, requires a sign-in at others, and simply doesn't open the vault
(permissions).

# Examples

## Example 1 — Basic: a CLAUDE.md that earns its place

```markdown
# Build and test
- `make dev` starts the app; `make test` runs unit tests (needs Docker running).

# Style
- Python 3.12, type hints required on public functions.
- Use the logger from app/log.py; never print().

# When compacting
- Always keep the list of modified files and the test commands.
```

**Why this works:** every line prevents a likely mistake, and the compaction note protects what
matters during long sessions.

## Example 2 — Real-world: a reference skill plus a scoped rule

A team adds `.claude/skills/db-conventions/SKILL.md` ("Our Postgres schema conventions and query
patterns. Use when writing migrations or SQL.") and a rule in `.claude/rules/migrations.md` scoped to
`db/migrations/**`. Migration work gets full guidance, and unrelated work pays no context cost.

**Why this works:** knowledge loads only where and when it's relevant.

## Example 3 — Pitfall: the 600-line CLAUDE.md

A team keeps appending to CLAUDE.md after every incident until it's 600 lines, including full API docs
and a tutorial. Claude starts missing the rules that matter most.

**The fix:** prune ruthlessly to under 200 lines; move reference docs into skills, area-specific
guidance into path-scoped rules, and "must never happen" rules into **permission deny rules or
hooks**. Run `/doctor` for suggested cuts.

# Common Mistakes

- **Bloated CLAUDE.md** files that bury the important rules.
- **Relying on CLAUDE.md for enforcement.** It's advisory; use deny rules and hooks for guarantees.
- **Putting personal preferences in shared files** instead of `CLAUDE.local.md` or `settings.local.json`.
- **Model-invocable side-effect skills** (like deploy) without `disable-model-invocation: true`.
- **Over-broad allow rules** such as `Bash(git *)` when you meant `Bash(git log *)`.

# Best Practices

- Start with **`/init`**, then **prune**; review CLAUDE.md like code when things go wrong.
- Scope area-specific guidance with **`paths:`** rules; move references into **skills**.
- Use **`disable-model-invocation: true`** for skills with side effects.
- **Commit** shared config (`CLAUDE.md`, `.claude/settings.json`, skills); keep personal config **local**.
- Write **deny rules** for secrets (`Read(./.env*)`) and **ask rules** for risky actions (`git push`).

# Summary

- Add customization **as triggers appear**: CLAUDE.md, rules, skills, output styles, permissions, hooks.
- **CLAUDE.md** (user, project, local) is always loaded: keep it **under ~200 lines** and specific.
- **`.claude/rules/` with `paths:`** and **skills** load knowledge only when relevant.
- **Output styles** (Default, Proactive, Concise, Explanatory, Learning) set session-wide response style.
- **Permission rules** (`allow`/`ask`/`deny`, evaluated deny → ask → allow) live in settings files with
  clear **precedence**.

# Flash Cards

Q: What are the three common CLAUDE.md locations and their scopes?
A: ~/.claude/CLAUDE.md (you, all projects), ./CLAUDE.md or ./.claude/CLAUDE.md (the team, via git), and ./CLAUDE.local.md (you, this project only).

Q: What size does Anthropic recommend for a CLAUDE.md file?
A: Under about 200 lines; longer files consume more context and reduce adherence.

Q: How do you make a rule load only for certain files?
A: Put it in .claude/rules/ with paths: front-matter listing glob patterns.

Q: What does disable-model-invocation: true do in a skill?
A: Prevents Claude from running the skill on its own, so only you can invoke it with /name; use it for side-effect workflows.

Q: In what order are permission rules evaluated?
A: Deny, then ask, then allow; the first match wins.

Q: Name the four built-in output styles besides Default.
A: Proactive, Concise, Explanatory, and Learning.

# Exercises

### Easy
Run `/init` in a project, then cut the generated CLAUDE.md down to the ten lines that would most
prevent mistakes. Check it loaded with `/context`.

### Medium
Create a project skill with `disable-model-invocation: true` and `$ARGUMENTS` for a task you repeat
(for example, "write release notes for version X"). Run it twice with different arguments.

### Challenging
Design the settings for a team repository: a `.claude/settings.json` with allow, ask, and deny rules,
plus a `CLAUDE.md` and one path-scoped rule. Test that a denied read of `.env` is blocked, an ask rule
prompts, and an allowed test command runs without a prompt. Document any rule that matched more than
you intended.

# Further Reading

- Claude Code docs — *How Claude remembers your project* (CLAUDE.md, rules, auto memory):
  <https://code.claude.com/docs/en/memory>
- Claude Code docs — *Extend Claude with skills*: <https://code.claude.com/docs/en/skills>
- Claude Code docs — *Output styles*: <https://code.claude.com/docs/en/output-styles>
- Claude Code docs — *Configure permissions*: <https://code.claude.com/docs/en/permissions>
- Claude Code docs — *Settings files and precedence*: <https://code.claude.com/docs/en/settings>
