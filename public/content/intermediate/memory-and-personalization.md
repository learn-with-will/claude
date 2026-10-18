---
id: lesson-11
slug: memory-and-personalization
title: "Memory, Instructions, and Personalization"
level: intermediate
order: 11
duration: 18
tags:
  - memory
  - personalization
  - instructions
  - chat-search
  - privacy-controls
summary: "How to make Claude yours: account-wide instructions, memory saved as editable topics, searching past chats, project-separated memory, sensitive-topic and incognito controls, and why styles moved to skills, with a setup that stays helpful and private."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Write effective **instructions for Claude** that apply to every conversation.
- Explain how **memory** works, and **view, edit, and delete** what Claude remembers.
- Use **chat search** to pull context from past conversations.
- Keep memory **separate across projects** and out of **sensitive** areas.
- Understand the move from **styles to skills**, and choose the right personalization tool.

# Why It Matters

Without personalization, every chat starts from zero: you re-explain your role, your preferences,
your projects. With it, Claude already knows you're a product manager who wants concise answers with
a recommendation first. Personalization done carelessly can also store things you'd rather it didn't.
This lesson shows how to get the benefit and stay in control.

# Concept Explanation

### Four ways to personalize

| Tool | Applies to | Use it for |
| --- | --- | --- |
| **Instructions for Claude** (account-wide) | Every conversation | How you like to work and communicate |
| **Project instructions** (Lesson 7) | Chats in one project | Role, rules, and context for that work |
| **Skills** (Lesson 13) | Loaded when relevant | Repeatable procedures, formats, and voices |
| **Memory** | Learned over time | Facts about you and your work Claude picks up |

The Help Center frames it as account-wide instructions for general preferences, project instructions
for specific work, and skills for format and delivery. These can be combined.

### Instructions for Claude

Open **Settings** (click your initials) and add instructions that apply to **all** your chats.
Good candidates are your role, terms you use, and communication preferences:

```text
I'm a product manager at a B2B software company.
Lead with the answer or recommendation, then the reasoning.
Prefer short paragraphs over long bullet lists.
Use US English and metric units.
When you're unsure, say so instead of guessing.
```

Keep them **short and universal**. If something only matters for one area of work, put it in a
project instead.

### Memory: what Claude learns about you

Claude saves **memory as individual topics** as you chat, either on its own or when you say
"remember this." Categories include your **role and professional context**, **people and places**,
**communication preferences**, **technical and coding preferences**, and **project details**.

- **Defaults:** memory is **on by default** for Free, Pro, and Max (web, desktop, mobile). On Team and
  Enterprise, an owner must enable it, and it stays off for each member until they opt in.
- **Viewing and editing:** go to **Settings > Memory > Topics** to read, edit (pencil icon), or delete
  any topic. You can also tell Claude in chat to remember, change, or forget something.
- **Pausing vs. resetting:** pausing keeps existing memory but stops using and adding to it.
  **Reset memory** permanently deletes everything, including project memories.
- **One chat without memory:** before your first message, open **+** and turn off **Memory**. The chat
  isn't used for or added to memory. The setting locks once the chat starts.

### Sensitive topics and things never saved

By default, memory **won't save sensitive topics** such as health, race, ethnicity, religion,
politics, and gender identity. You can opt in with **Include sensitive topics in memory**. Some data is
**never saved, even on request**: government ID numbers, criminal history, financial account numbers,
and immigration status.

### Memory and projects

Each **project has its own memory**. A project chat uses that project's memory plus your general
account memory, never another project's. For complete separation, turn off **Use account memory** on
the project page.

### Chat search: reaching back into past chats

On paid plans, Claude can **search your past chats** when you ask ("What did we decide about the
launch date last week?"). Searches appear as a tool call, and Claude links to the chats it used.
Searches from a project stay within that project. **Incognito chats are never included.** Turn it
off with **Search and reference chats** in Settings > Memory.

### Styles have moved to skills

Claude used to have a **styles** menu (presets like Concise, Formal, and Explanatory, plus custom
styles). Anthropic has retired it in favor of skills: **custom styles were migrated into skills**,
which arrive **disabled** so you can turn on the ones you want in **Customize > Skills**. The
**Concise, Explanatory, and Formal** presets were dropped, and **Learning** was kept as a skill you
can install. The current personalization docs list just instructions, project instructions, and
skills. If you'd rather not use skills, put tone guidance in your instructions for Claude.

### Bringing memory with you

Free, Pro, and Max users can **import memory from other AI assistants** (an experimental feature in
Settings > Memory), and memory is included when you export your data.

# Key Terminology

- **Instructions for Claude** — account-wide guidance applied to every conversation.
- **Memory** — facts and preferences Claude saves as editable topics across chats.
- **Topic** — one saved memory entry you can view, edit, or delete in Settings > Memory.
- **Chat search** — Claude searching your past (non-incognito) chats for context.
- **Project memory** — memory that belongs to one project and stays separate from other projects.
- **Sensitive topics** — categories like health or beliefs that memory skips unless you opt in.
- **Skill** — a reusable set of instructions Claude loads when relevant; replaces custom styles.

# Options and Trade-offs

| Goal | Best tool | Trade-off |
| --- | --- | --- |
| "Always answer this way" | Instructions for Claude | Applies everywhere, so keep it general |
| "In this work area, follow these rules" | Project instructions | Only inside that project |
| A repeatable format or voice | A skill | Needs setup; loads only when relevant |
| Claude remembering facts about you | Memory | Review topics; outdated facts can linger |
| Finding a past decision | Chat search (paid) | Excludes incognito; project searches stay in-project |
| Total privacy for one conversation | Incognito chat, or memory off for that chat | Nothing from it carries forward |

# Worked Example

**Goal:** set up personalization for a freelance designer with three clients.

1. **Instructions for Claude:** role ("freelance brand designer"), style ("concise, recommendation
   first"), and one rule ("ask before assuming a client's preferences").
2. **One project per client**, each with its brand guide and its own project memory, so details about
   Client A never appear in Client B's chats. For a client under a strict NDA, turn off **Use account
   memory** in that project.
3. **Review memory:** open Settings > Memory > Topics, delete an outdated topic (an old rate card),
   and correct one ("I now work four days a week").
4. **Use chat search** later: "Search my chats for the color palette we picked for Client B's
   rebrand." Claude cites the chat it found.

# Real World Analogy

Think of a great **executive assistant**. Their **standing orders** from you ("always book aisle
seats," "summaries first") are your instructions. Their **notebook** of things they've learned about
you is memory: who your key contacts are, what you're working on. Their **separate client files** are
projects, never mixed up. Their **playbooks** for recurring jobs are skills. And a good assistant
lets you read and edit their notebook, and knows some things should never be written down at all.

# Examples

## Example 1 — Basic: a clean set of instructions

```text
I'm a high-school biology teacher. Explain things at a level I can adapt for
16-year-olds. When I ask for activities, include materials and timing.
Keep answers under 300 words unless I ask for more.
```

**Why this works:** short, universal preferences that improve almost every chat.

## Example 2 — Real-world: shaping memory deliberately

```text
Remember: I switched teams in September. I now lead the Payments team, not
Onboarding. Forget anything about my old Onboarding roadmap.
```

Then open **Settings > Memory > Topics** to confirm the update and that the old roadmap topic is gone.

**Why this works:** you're correcting memory directly instead of hoping Claude infers the change.

## Example 3 — Pitfall: stale memory steering answers

A user changed jobs months ago, but memory still says they work at their old company. Claude keeps
framing advice around the old role, and the user can't figure out why.

**The fix:** review memory topics every so often. Edit or delete outdated topics, or ask Claude,
"What do you remember about me?", and correct anything wrong.

# Common Mistakes

- **Overloading instructions** with project-specific details that belong in a project.
- **Never reviewing memory**, so outdated or unwanted facts keep shaping answers.
- **Assuming deleting a chat deletes its memories.** Remove those topics in Settings > Memory too.
- **Mixing client work** without project separation, or without turning off account memory when needed.
- **Hunting for the old styles menu.** Use skills or instructions instead.

# Best Practices

- Keep **instructions for Claude** short: role, communication style, and how to handle uncertainty.
- Use **projects** to keep work areas, and their memories, apart.
- Review **Settings > Memory > Topics** monthly; correct or delete anything stale.
- Use **incognito** or **memory off** for conversations you don't want remembered.
- Turn on **sensitive topics** only if you truly want those remembered, and know what's never saved.

# Summary

- Personalize with **instructions for Claude**, **project instructions**, **skills**, and **memory**.
- Memory is saved as **editable topics**: on by default for Free, Pro, and Max; opt-in on Team and
  Enterprise.
- **Projects keep separate memories**; turn off **Use account memory** for full separation.
- **Chat search** (paid) finds past chats, never incognito ones; turn it off in Settings > Memory.
- **Styles have moved to skills**: custom styles were migrated (disabled), and most presets were retired.

# Flash Cards

Q: Where do you set instructions that apply to all your conversations?
A: In Settings (click your initials), in your instructions for Claude.

Q: How is Claude's memory stored, and where can you edit it?
A: As individual topics, which you can view, edit, or delete in Settings > Memory > Topics.

Q: Is memory on by default for Team and Enterprise members?
A: No. An owner must enable it for the organization, and it stays off for each member until they opt in.

Q: Name two kinds of data memory never saves, even if asked.
A: Government ID numbers, criminal history, financial account numbers, and immigration status (any two).

Q: Does a project chat use other projects' memories?
A: No. It uses its own project memory plus your general account memory, unless you turn account memory off.

Q: What happened to the styles feature?
A: Styles moved to skills: custom styles were migrated to (disabled) skills, the Concise, Explanatory, and Formal presets were dropped, and Learning remains as a skill.

# Exercises

### Easy
Ask Claude, "What do you remember about me?" Then open Settings > Memory > Topics and compare. Delete
or correct one topic.

### Medium
Write account-wide instructions of five lines or fewer, use Claude for a few days, and note one
response that improved and one instruction that didn't seem to matter. Revise.

### Challenging
Design a personalization setup for someone with sensitive work (for example, a therapist or HR
manager). Specify instructions, projects, memory settings (including sensitive topics and per-project
account memory), and when to use incognito. Explain the privacy reasoning for each choice.

# Further Reading

- Claude Help Center — *Using Claude's chat search and memory*:
  <https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context>
- Claude Help Center — *Understanding Claude's personalization features*:
  <https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features>
- Claude Help Center — *What are skills?*: <https://support.claude.com/en/articles/12512176-what-are-skills>
- Claude Help Center — *Use skills in Claude*:
  <https://support.claude.com/en/articles/12512180-use-skills-in-claude>
