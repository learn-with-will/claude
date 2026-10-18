---
id: lesson-24
slug: capstone-your-claude-workflow
title: "Capstone: Designing Your Claude Workflow"
level: advanced
order: 24
duration: 28
tags:
  - capstone
  - workflow-design
  - evaluation
  - governance
  - automation
summary: "Pulling the whole course together: mapping your work, choosing the right Claude surface for each task, capturing knowledge, procedures, and connections, adding guardrails, measuring quality with a small evaluation, and maintaining the system, through two complete worked builds."
---

# Learning Objectives

By the end of this lesson you will be able to:

- **Map** your recurring work and match each task to the right **Claude surface**.
- Capture **knowledge**, **preferences**, **procedures**, and **connections** in the right features.
- Add **guardrails** in proportion to each task's risk.
- Define **success criteria** and run a small **evaluation** before trusting automation.
- **Maintain** your setup as Claude and your work change.

# Why It Matters

Each lesson gave you a tool. Taking full advantage of Claude comes from **combining** them into a
system that fits your work: the right task on the right surface, with the right context and the right
amount of autonomy, checked against a clear standard. This capstone is a method you can reuse every
time your work or Claude's features change.

# Concept Explanation

### The maturity ladder

Most people and teams move up five rungs. Each one builds on the last:

1. **Ask:** one-off questions and drafts in chat (Lessons 1–5).
2. **Collaborate:** Projects, Artifacts, and personalization for ongoing work (Lessons 6–11).
3. **Delegate:** Research, Cowork tasks, and Claude in Chrome for multi-step work (Lessons 10, 14, 15).
4. **Automate:** scheduled tasks, skills, hooks, and CI that run without you (Lessons 13–18).
5. **Build:** the API, agents, and MCP servers that put Claude inside your products (Lessons 19–23).

You don't need to reach rung five. You need each task on the **lowest rung that does it well**.

### Step 1: map your work

List your recurring tasks. For each, note how often it happens, its **inputs** (files, apps, the web),
its **output** (a doc, a deck, code, a decision), and its **risk**: what happens if it's wrong, and can
you undo it?

### Step 2: pick the surface

| Task shape | Best surface |
| --- | --- |
| Thinking, drafting, quick analysis | Chat (with a Project for recurring context) |
| A deliverable to share (doc, deck, design, dashboard) | Artifacts: Docs, Slides, Design |
| Current, sourced information | Web search; Research for multi-source reports |
| Multi-step work across files and apps | Cowork (scheduled if it recurs) |
| Work inside websites | Claude in Chrome |
| Work inside a document or spreadsheet | Excel/PowerPoint add-ins, Google Workspace sidebar |
| Software work | Claude Code (terminal, IDE, desktop, web, CI) |
| Claude inside your own product or pipeline | Claude API, Agent SDK, Managed Agents |

### Step 3: capture what Claude needs

| Need | Feature |
| --- | --- |
| Background knowledge for an area | **Project** knowledge base |
| How you like to work | **Instructions for Claude**; **memory** |
| Rules for one area of work | **Project instructions**; **CLAUDE.md** in code |
| A repeatable procedure or format | **Skill** |
| Access to your apps and data | **Connectors** / **MCP servers** |
| A whole workflow to share | **Plugin** |

### Step 4: add guardrails in proportion to risk

- **Low risk, reversible** (drafts, summaries): light review.
- **Medium risk** (sending messages, editing shared files): manual approval modes, Needs-approval
  tool permissions, and review before sending.
- **High risk or irreversible** (payments, deletions, production systems, legal or medical decisions):
  a human makes the call. Use deny rules and hooks in Claude Code, keep sensitive accounts out of
  browser profiles, and never fully automate the final step.

Across all levels, think about **data**: which account (personal or organization), what's in memory,
and what a connected tool can reach. Watch for **prompt injection** in anything Claude reads from
outside.

### Step 5: define success and evaluate

Anthropic's prompt-engineering guide starts with **clear success criteria** and **a way to test
against them**. You can do a lightweight version for any workflow:

1. Write down what "good" means: accurate, complete, right format, right tone, on time.
2. Collect **10–20 real examples** of the task, with what a good output looks like.
3. Run your setup on them and **score** the results against your criteria.
4. Change **one thing** at a time (prompt, skill, model, effort) and re-run.
5. Only increase autonomy (Auto mode, scheduling, CI) once the scores are consistently good.

### Step 6: maintain it

- **Monthly:** review memory topics, project files (retire stale versions), instructions, skills, and
  CLAUDE.md. Prune anything Claude no longer needs.
- **When something goes wrong twice:** fix the instructions, skill, or guardrail, not just the output.
- **Stay current:** skim Anthropic's release notes. Features, models, and limits change often, so
  re-check anything this course marks "as of writing."

# Key Terminology

- **Maturity ladder** — ask, collaborate, delegate, automate, build.
- **Surface** — where Claude runs: chat, Artifacts, Cowork, Chrome, add-ins, Claude Code, API.
- **Guardrail** — a control that limits risk: approval modes, permissions, hooks, human review.
- **Success criteria** — a concrete definition of a good output for a task.
- **Evaluation (eval)** — running a set of real examples and scoring outputs against criteria.
- **Autonomy** — how much Claude does without asking; raise it only after evaluation.

# Options and Trade-offs

| Choice | More of it gives you | More of it costs you |
| --- | --- | --- |
| Autonomy | Time back, scale | Risk of unreviewed mistakes |
| Context (projects, memory, connectors) | Better-fitted answers | Privacy exposure, usage |
| Customization (skills, CLAUDE.md, plugins) | Consistency | Maintenance |
| Model size and effort | Quality on hard tasks | Speed, usage, cost |
| Evaluation effort | Confidence | Upfront time |

# Worked Example

**Build A, for a knowledge worker: the Monday market brief.**

1. **Map:** every Monday, a marketing lead spends two hours compiling competitor news into a one-page
   brief and three slides for a team meeting. The risk is medium, because it's shared internally.
2. **Project:** *Market Brief*, with the competitor list, a past brief rated "excellent," and
   instructions: "Audience: marketing team. Facts must cite sources. Flag anything unverified."
3. **Skill:** `market-brief` defines the brief's structure (headline, three competitor sections, "so
   what for us") and the slide layout.
4. **Delegate:** a **Cowork scheduled task** (`/schedule`) every Monday at 7:00 runs web research
   (preferring primary sources), writes a **Claude Doc**, and turns it into **Claude Slides**.
5. **Guardrails:** read-only connectors only, nothing sent automatically, and the lead reviews the
   flagged items and two random citations before the 10:00 meeting.
6. **Evaluate:** for four weeks, the lead scores each brief on accuracy, completeness, and usefulness
   (1–5), and tweaks the skill after each review.
7. **Maintain:** quarterly, update the competitor list and replace the example brief.

**Build B, for a developer team: a safer, faster repository.**

1. **CLAUDE.md** under 200 lines; **path-scoped rules** for the API folder; a `/release` **skill**.
2. **Settings:** allow test and lint commands, ask for `git push`, deny reads of `.env*`.
3. **Hooks:** format on edit (`PostToolUse`), and block edits to protected files (`PreToolUse`, exit 2).
4. **Subagent:** a security reviewer that checks every feature diff in a fresh context.
5. **MCP:** the issue tracker, shared through `.mcp.json`.
6. **CI:** the GitHub Action responds to `@claude` and reviews pull requests.
7. **API side:** a support-ticket classifier on Haiku 5.5 with structured outputs, cached system
   prompt, and nightly batch summaries, evaluated on 200 labeled past tickets before launch.

# Real World Analogy

Designing your Claude workflow is like **setting up a well-run kitchen**. You decide which dishes
each station makes (surfaces), stock each station with the right ingredients and recipe cards
(projects, skills, connectors), install safety equipment where the heat is highest (guardrails), and
taste every dish before it goes out until you trust the line (evaluation). Then you keep refining the
menu as seasons change (maintenance). A great kitchen isn't one brilliant chef. It's a system that
produces great food every day.

# Examples

## Example 1 — Basic: a personal "Claude map"

A teacher lists five weekly tasks: lesson plans (Project + Docs), parent emails (chat with
instructions), quiz creation (a skill), grading rubrics (Docs), and research for a new unit
(Research). Each one maps to a surface on the lowest rung that handles it well.

**Why this works:** matching tasks to surfaces avoids both under-using Claude and over-automating.

## Example 2 — Real-world: evaluating before automating

A finance analyst wants Cowork to produce the monthly variance report automatically. They first run
it manually on the last six months' data, compare against the reports they wrote themselves, and fix
two issues (a mis-mapped account and a rounding rule) in the skill. Only then do they schedule it, in
Manual mode for the first live run.

**Why this works:** evaluation on real history catches errors while they're cheap to fix.

## Example 3 — Pitfall: automation without a definition of "good"

A team schedules a daily customer-feedback digest on day one, with no criteria and no review. Weeks
later they discover it has been silently dropping feedback in other languages.

**The fix:** define success criteria first ("all feedback included, in any language; themes ranked by
frequency"), test on real samples, and keep periodic spot-checks even after the digest runs on its own.

# Common Mistakes

- **Starting at the top of the ladder,** building an agent when a Project and a skill would do.
- **Automating before evaluating,** with no success criteria and no test set.
- **Uniform guardrails,** too heavy on trivial tasks and too light on risky ones.
- **Set-and-forget setups,** with stale memory, outdated project files, and bloated instructions.
- **Mixing personal and organization accounts** for work data.

# Best Practices

- Put each task on the **lowest rung** that does it well.
- **Capture** knowledge in Projects, procedures in skills, and access in connectors, once.
- Scale **guardrails to risk**, and keep humans on irreversible decisions.
- **Evaluate with real examples** before raising autonomy, and change one thing at a time.
- **Review monthly**, and follow Anthropic's release notes for changes.

# Summary

- Climb the **maturity ladder** (ask, collaborate, delegate, automate, build) only as far as each task needs.
- **Map** tasks by inputs, outputs, and risk; **match** each to the right surface.
- **Capture** context in Projects, instructions, memory, skills, connectors, and plugins.
- Add **guardrails proportional to risk**, and **evaluate** with success criteria and real examples.
- **Maintain** the system: prune, update, and re-check anything marked "as of writing."

# Flash Cards

Q: What are the five rungs of the maturity ladder?
A: Ask, collaborate, delegate, automate, and build.

Q: Which surface fits multi-step work across files and apps, especially if it recurs?
A: Cowork, with a scheduled task if it recurs.

Q: Where should a repeatable procedure or output format live?
A: In a skill.

Q: What should you have before increasing a workflow's autonomy?
A: Clear success criteria and an evaluation on real examples showing consistently good results.

Q: How should guardrails relate to risk?
A: Proportionally: light review for reversible tasks, approval modes and permissions for medium risk, and human decisions for irreversible or high-stakes actions.

Q: What's a good maintenance rhythm for a Claude setup?
A: A monthly review of memory, project files, instructions, skills, and CLAUDE.md, plus fixing root causes when something goes wrong twice.

# Exercises

### Easy
List your five most frequent tasks and assign each one a surface and a rung on the maturity ladder.
Identify the one that would save you the most time.

### Medium
Build the setup for that task: a Project or skill (or both), any connectors it needs, and a guardrail.
Define three success criteria and test it on five real examples.

### Challenging
Write a two-page **Claude playbook** for your team: the task map, surfaces, shared projects and
skills, connector and permission policy, evaluation method (with a 15-example test set), and a
maintenance calendar. Pilot it for two weeks, then revise it based on the evaluation scores.

# Further Reading

- Anthropic — *Prompt engineering overview* (success criteria and evaluations first):
  <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview>
- Anthropic — *Define success criteria and build evaluations*:
  <https://platform.claude.com/docs/en/test-and-evaluate/develop-tests>
- Claude Code docs — *Best practices*: <https://code.claude.com/docs/en/best-practices>
- Claude Help Center — *Release notes*: <https://support.claude.com/en/articles/12138966-release-notes>
- Anthropic Academy — free courses: <https://academy.claude.com/>
