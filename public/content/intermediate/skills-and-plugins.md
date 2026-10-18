---
id: lesson-13
slug: skills-and-plugins
title: "Skills and Plugins"
level: intermediate
order: 13
duration: 21
tags:
  - skills
  - skill-md
  - progressive-disclosure
  - plugins
  - agent-skills
summary: "Skills teach Claude repeatable ways of doing specialized work, packaged as folders with a SKILL.md file that load only when relevant. This lesson covers Anthropic's built-in skills, writing and uploading your own, how they differ from projects and connectors, and how plugins bundle skills, connectors, and sub-agents."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Explain what a **skill** is and how **progressive disclosure** keeps skills efficient.
- Enable Anthropic's **built-in skills** and manage skills in **Customize > Skills**.
- Write, package, upload, and **test** a custom skill.
- Choose between **skills, projects, connectors, and instructions**.
- Install **plugins** and evaluate them for **security**.

# Why It Matters

Every team has "the way we do it": the report format, the brand rules, the review checklist.
Pasting those instructions into chat after chat is tedious and inconsistent. A skill captures the
procedure once, and Claude applies it automatically whenever it's relevant, in the apps, in Claude
Code, and through the API. It's the most direct way to make Claude reliably good at *your* work.

# Concept Explanation

### What a skill is

The Help Center defines skills as *folders of instructions, scripts, and resources that Claude loads
dynamically* to improve performance on specialized tasks. A skill can be as simple as one Markdown
file of instructions, or include reference documents and executable scripts. Skills follow the open
**Agent Skills** standard (agentskills.io), so they aren't limited to Claude.

### Progressive disclosure

Skills stay efficient because Claude loads them in layers:

1. **Level 1, the front-matter:** each skill's `name` and `description`. This is just enough for
   Claude to decide whether the skill is relevant.
2. **Level 2, the body:** the full instructions, read only when Claude decides to use the skill.
3. **Level 3, extra files:** reference documents or scripts in the skill folder, opened only when
   the instructions say they're needed.

That's why you can have many skills without crowding the context window.

### Kinds of skills

- **Anthropic skills:** built-in skills for **Excel, Word, PowerPoint, and PDF** creation. With code
  execution on, Claude uses them automatically.
- **Custom skills:** ones you or your organization write, such as brand guidelines, email templates,
  or ticket-creation workflows.
- **Organization-provisioned skills (Team/Enterprise):** owners can distribute skills to everyone.
- **Partner skills:** built by companies like Notion, Figma, and Atlassian to work with their connectors.

### Enabling and managing skills

Skills are available on **all plans** and need **Code execution and file creation** turned on
(Settings > Capabilities). On Team and Enterprise, an owner enables them under Organization settings.
Then open **Customize > Skills** to turn individual skills on or off. You can also browse and install
skills from the **directory**. Claude decides when a skill is needed. You don't have to invoke it,
though you can always ask for one by name.

### Writing a custom skill

A skill is a folder containing a `SKILL.md` file. (The Help Center writes the name in lowercase; the
open standard and Claude Code use `SKILL.md`.) The file starts with YAML front-matter holding the two
required fields, then the instructions:

```markdown
---
name: weekly-status-report
description: Formats weekly team status reports in our house style. Use when the user asks for a weekly update, status report, or progress summary.
---

## Structure
1. Headline: one sentence on overall status (On track / At risk / Blocked).
2. Wins this week: up to 3 bullets, each with a measurable result.
3. Risks and blockers: owner and next step for each.
4. Next week: top 3 priorities.

## Rules
- Keep it under 250 words.
- Use plain language; spell out acronyms on first use.
- If information is missing, ask for it instead of inventing it.

See examples.md for two approved reports.
```

For upload to the Claude apps, the Help Center caps `name` at **64 characters** and `description` at
**200 characters**. The **description matters most**: Claude uses it to decide when to load the
skill, so say both *what it does* and *when to use it*.

### Packaging, uploading, and testing

1. Make sure the **folder name matches the skill's name**.
2. **ZIP the folder** so the skill folder is the ZIP's root (not nested inside another folder).
3. In **Customize > Skills**, click **+**, then **Create skill**, then **Upload a skill**.
4. **Test** with several prompts that should trigger it, and check Claude's thinking to confirm it
   loaded the skill. If it doesn't trigger, **revise the description**.

Uploaded skills aren't visible to colleagues until you share them.

### Skills vs. the alternatives

| Feature | What it holds | When it loads |
| --- | --- | --- |
| **Project** | Background knowledge for one area | Always, within that project |
| **Skill** | A procedure or format | Only when relevant, anywhere |
| **Connector (MCP)** | Access to an external service | When its tools are needed |
| **Instructions for Claude** | General preferences | Every conversation |

The Help Center's distinction is useful: **MCP connects Claude to services; skills teach Claude how
to use them well.** They work together.

### Plugins: bundles of skills and more

A **plugin** bundles **skills, connectors, and sub-agents** (plus commands, and sometimes hooks or
local MCP servers) into one package, so a whole workflow installs at once. Plugins are available on
**paid plans**. Install them from **Customize > Plugins > Discover > Add**. A Knowledge Work marketplace
is added by default, and you can add Anthropic marketplaces (such as Financial Services or Legal) or a
Git repository. Plugins you install also **sync to Claude Code** when you sign in with your Claude
account. **Hooks and sub-agents run only in Cowork and Claude Code**, not in chat.

### Security

Skills and plugins can include **executable code**, and plugins may include **local MCP servers that
run on your computer with the same permissions as any other program**. So:

- **Install only from sources you trust**, and review downloaded skills before enabling them.
- **Never hardcode** API keys or passwords in a skill.
- Use proper **connectors** for external services rather than embedding credentials.
- Enterprise organizations can turn on **skill and plugin security scanning** (beta).

# Key Terminology

- **Skill** — a folder of instructions, scripts, and resources Claude loads when relevant.
- **SKILL.md** — the skill's main file: YAML front-matter (`name`, `description`) plus instructions.
- **Progressive disclosure** — loading a skill in layers (description first, body and files only when needed).
- **Agent Skills standard** — the open specification at agentskills.io that skills follow.
- **Anthropic skills** — built-in skills for Excel, Word, PowerPoint, and PDF.
- **Plugin** — a package bundling skills, connectors, and sub-agents (and more) for a workflow.
- **Marketplace** — a source of plugins you can browse and install from.

# Options and Trade-offs

| Approach | Strength | Watch out for |
| --- | --- | --- |
| Instructions-only skill | Easy to write and maintain | Can't perform calculations or file operations by itself |
| Skill with reference files | Rich guidance without bloating context | Mention when to open each file |
| Skill with scripts | Deterministic steps (formatting, conversion) | Code must be reviewed; dependencies matter |
| One big "do everything" skill | Fewer files | Triggers unpredictably; focused skills compose better |
| Plugin from a marketplace | A whole workflow in one install | Trust the source; may run local servers |

# Worked Example

**Goal:** make every weekly update from your team look the same.

1. **Write** the `SKILL.md` above, and add `examples.md` with two real, approved reports.
2. **Package:** folder `weekly-status-report/` containing both files, zipped with the folder at the root.
3. **Upload:** Customize > Skills > + > Create skill > Upload a skill, then toggle it on.
4. **Test:** "Here are my notes for this week, make my status update." Then try a near miss: "Summarize
   this meeting." It should *not* trigger.
5. **Refine:** if it triggers too often or not at all, tighten the description's "when to use" wording.
6. **Share** it with your team, or have an owner provision it org-wide.

# Real World Analogy

Skills work like a **binder of recipe cards** in a professional kitchen. The chef always knows the
**index** (each card's name and one-line description) but only pulls a card out when cooking that
dish. Some cards point to a supplier sheet or a plating photo (reference files). Some come with a
specialized gadget (scripts). A plugin is a **themed kit**: the recipe cards, the gadgets, and a
supplier account, delivered together for, say, a pastry station.

# Examples

## Example 1 — Basic: let the built-in skills work

With **Code execution and file creation** on:

```text
Create a Word document from these meeting notes: a title, an executive summary,
a decisions table (decision, owner, date), and an action-items list.
```

**Why this works:** Anthropic's built-in Word skill handles professional document creation. You get a
real .docx without writing any formatting rules yourself.

## Example 2 — Real-world: a brand-guidelines skill

A marketing team creates `brand-guidelines/` with a `SKILL.md` (colors with hex codes, fonts, logo
rules, tone) and a `resources/` folder with logo files. Its description: "Apply Acme brand guidelines
to presentations, documents, and social posts. Use for any Acme-branded deliverable." Now decks,
docs, and posts from anyone on the team follow the brand automatically.

**Why this works:** one maintained source of truth, loaded only when an Acme deliverable is requested.

## Example 3 — Pitfall: the description that never triggers

```markdown
---
name: helper
description: Useful stuff for work.
---
```

**What goes wrong:** Claude decides whether to load a skill from its description. "Useful stuff for
work" says nothing about *what* the skill does or *when* to use it, so it rarely or randomly triggers.

**The fix:** a specific description, such as "Drafts customer refund emails using our approved
templates. Use when the user asks to write, reply to, or approve a refund or credit."

# Common Mistakes

- **Vague descriptions.** Say what the skill does *and* when to use it.
- **Giant all-in-one skills.** Separate workflows into focused skills that combine well.
- **Zipping the wrong level,** with the skill folder nested inside another folder, or a name mismatch.
- **Hardcoding secrets** in skill files or scripts.
- **Installing plugins from unknown sources** without reviewing what they run.

# Best Practices

- Keep each skill **focused on one workflow**; let Claude combine several.
- Write descriptions that state **what** and **when**, and test near-miss prompts too.
- **Start with Markdown instructions**; add reference files and scripts only when needed.
- Include **examples** of good output in the skill.
- Follow the **Agent Skills standard** so skills work across Claude surfaces.
- Treat third-party skills and plugins like software: **trusted sources, reviewed contents**.

# Summary

- A **skill** is a folder with a `SKILL.md` (name, description, instructions), loaded by
  **progressive disclosure**.
- **Anthropic skills** cover Excel, Word, PowerPoint, and PDF; custom, org, and partner skills add your
  own workflows.
- Skills need **code execution** on and are managed in **Customize > Skills**; upload a **ZIP** with the
  folder at its root.
- **MCP connects** Claude to services; **skills teach** Claude how to do work, including with those services.
- **Plugins** (paid plans) bundle skills, connectors, and sub-agents; install only **trusted** ones.

# Flash Cards

Q: How does the Help Center define skills?
A: Folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks.

Q: What is progressive disclosure in skills?
A: Claude first sees only each skill's name and description, reads the full instructions only when the skill is relevant, and opens extra files only when needed.

Q: What are the two required front-matter fields in SKILL.md?
A: name and description.

Q: Why is the description the most important part of a skill?
A: Claude uses it to decide when to load the skill, so it must say what the skill does and when to use it.

Q: How should you package a skill for upload?
A: ZIP the skill folder (named to match the skill) so the folder itself is the ZIP's root.

Q: What does a plugin bundle?
A: Skills, connectors, and sub-agents (and possibly commands, hooks, or local MCP servers) in a single package.

# Exercises

### Easy
Open **Customize > Skills**, turn on Anthropic's document skills (with code execution enabled), and
ask Claude to create a formatted Word or Excel file from some notes.

### Medium
Write a `SKILL.md` for a task you repeat weekly. Include a specific description, numbered steps, and
one example. Upload it, then test three prompts that should trigger it and one that shouldn't.

### Challenging
Design a plugin for your team's workflow on paper: which skills, which connectors, and which
sub-agents it would bundle, and what each does. Then write a short security review: what code or local
servers it would run, what data it would touch, and who should be allowed to install it.

# Further Reading

- Claude Help Center — *What are skills?*: <https://support.claude.com/en/articles/12512176-what-are-skills>
- Claude Help Center — *How to create custom skills*:
  <https://support.claude.com/en/articles/12512198-how-to-create-custom-skills>
- Claude Help Center — *Use plugins in Claude*:
  <https://support.claude.com/en/articles/13837440-use-plugins-in-claude>
- Agent Skills — the open standard: <https://agentskills.io/>
- Anthropic — example skills on GitHub: <https://github.com/anthropics/skills>
