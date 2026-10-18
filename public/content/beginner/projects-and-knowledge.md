---
id: lesson-07
slug: projects-and-knowledge
title: "Projects: Workspaces with Knowledge, Instructions, and Memory"
level: beginner
order: 7
duration: 17
tags:
  - projects
  - knowledge-base
  - project-instructions
  - rag
  - collaboration
summary: "Projects give Claude a dedicated workspace: a knowledge base of your files, standing instructions, and their own memory. This lesson covers how they work, how RAG lets them grow up to ten times larger, why they save usage, and how teams share them."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Explain what a **Project** is and when to use one instead of a regular chat.
- Build a useful **knowledge base** and write effective **project instructions**.
- Describe how **project memory** stays separate from your other work.
- Explain how **RAG** lets projects grow beyond the context window.
- Use projects to **save usage**, and **share** them on Team and Enterprise plans.

# Why It Matters

If you find yourself re-uploading the same files or re-explaining the same background ("I'm the
marketing lead at…, our brand voice is…"), you need a Project. Projects turn Claude from a blank slate
into a teammate who already knows the material. They also make repeated work cheaper, because
reused project content counts less against your limits.

# Concept Explanation

### What a project is

The Help Center describes projects as *self-contained workspaces with their own chat histories and
knowledge bases*. A project has three parts:

1. **Knowledge:** documents, text, code, and other files Claude can use in every chat in the project.
2. **Instructions:** standing guidance that shapes responses (tone, role, format, rules) and applies
   *only* to chats in that project.
3. **Memory:** each project keeps its own memory, separate from other projects.

Projects are available to everyone. **Free users can create up to five.** Chat and Cowork share the
same projects, so a project can hold both conversations and longer tasks (Lesson 14).

### Building the knowledge base

Upload the material Claude should always have on hand: style guides, product docs, past reports,
policies, code. The Help Center's advice for projects:

- **Upload all relevant material up front.**
- Use **clear, descriptive filenames** (`2026-brand-voice-guide.pdf`, not `final_v3.pdf`).
- **Group related documents** in one project; keep unrelated work in separate projects.
- **Name specific documents** in your questions ("According to the pricing policy doc…").

Project files can be up to **30 MB** each. Claude extracts their text, except for multimodal PDFs,
where it can also read the visuals.

### Writing project instructions

Good instructions answer: *Who should Claude be here? Who is the audience? What rules always apply?*

```text
You are the content assistant for Northwind Coffee's marketing team.
Audience: coffee enthusiasts aged 25-45. Voice: warm, witty, never snobby.
Always follow the brand-voice guide in this project's files.
Use US spelling. Never mention competitors by name.
When unsure about a product detail, say so and point to the product catalog.
```

Keep instructions focused on what's **true for every chat** in the project. For one-off details, put
them in the message instead.

### Project memory

Each project has **its own memory**. A chat inside a project uses that project's memory plus your
general (non-project) account memory, but **not** other projects' memories. New things Claude
remembers in a project are saved to that project. For complete separation, turn off **Use account
memory** on the project's page. When you search past chats from inside a project, the search stays
within that project.

### How big can a project get? RAG

A project's knowledge used to be limited by the context window. On paid plans, when a project's
knowledge nears that limit, Claude **automatically switches to RAG** (retrieval-augmented
generation): instead of loading every file at once, it uses a **project knowledge search tool** to
pull the passages relevant to your question. This expands capacity **up to 10x**. You'll see an
indicator when a project is using RAG, and it's automatic. You can't toggle it.

### Projects save usage

From the Help Center's usage guide: *content in projects is cached and counts less against your
limits when reused.* Caches expire after a period of inactivity, so the first message after a long
break counts that content in full again. A file you'd otherwise attach to ten separate chats costs
far less living in a project.

### Sharing projects (Team and Enterprise)

On Team and Enterprise, you can share a project with specific people, in bulk, or with the whole
organization, with **Can view** (use it and chat, but not edit) or **Can edit** (change instructions
and knowledge, manage members). Owners can turn sharing off.

# Key Terminology

- **Project** — a workspace with its own chats, knowledge base, instructions, and memory.
- **Knowledge base** — the files and text you add to a project for Claude to use.
- **Project instructions** — standing guidance that applies only to that project's chats.
- **Project memory** — memories saved in and used by one project, separate from other projects.
- **RAG (retrieval-augmented generation)** — searching a large knowledge base for relevant passages
  instead of loading everything at once.
- **Caching** — reusing already-processed content so it counts less against your limits.

# Options and Trade-offs

| Option | Best for | Trade-off |
| --- | --- | --- |
| Regular chat with an upload | One-off questions about a file | Re-sent each turn; nothing persists |
| Project | Ongoing work on the same material | Needs a little setup; keep it focused |
| Project with RAG (paid, automatic) | Very large knowledge bases | Retrieves passages, so name documents in questions for precision |
| Shared project (Team/Enterprise) | A team's common knowledge and instructions | Edit rights matter; review who can change instructions |
| Account-level instructions (Lesson 11) | Preferences for *all* chats | Not the place for project-specific rules |

# Worked Example

**Goal:** a project for a part-time course you're taking, "Intro to Macroeconomics."

1. **Create** a project called *Macro 101 – Fall*.
2. **Knowledge:** upload the syllabus, lecture slides (renamed `week-01-gdp.pdf`,
   `week-02-inflation.pdf`, …), and your own notes.
3. **Instructions:**

```text
You are my study tutor for Macro 101. Explain concepts at an introductory level
using examples from the lecture slides in this project. When I ask for practice,
give me one question at a time and wait for my answer before explaining.
Cite the slide file you're drawing from.
```

4. **Use it:** "Using week-02-inflation.pdf, quiz me on the difference between CPI and the GDP
   deflator."
5. **Benefit:** every new chat already knows the course, your preferred teaching style, and the
   source files. Because the slides are cached, repeated questions cost less of your usage.

# Real World Analogy

A project is like a **dedicated client folder plus a standing briefing**. A consultant who handles
several clients keeps a separate cabinet for each: their documents, their preferences ("they hate
jargon"), and notes from past meetings. When a call comes in from that client, the consultant pulls
the right cabinet and is instantly up to speed, without mixing in another client's files. And when a
cabinet gets too full to read cover to cover, they use its index (RAG) to find the right pages.

# Examples

## Example 1 — Basic: a personal writing project

Create a project called *My Blog* with your three best past posts as knowledge and the instruction
"Match the voice of the example posts; suggest titles in sentence case." Every draft in that project
now starts in your voice.

**Why this works:** the examples in the knowledge base work like few-shot prompting (Lesson 4),
applied automatically to every chat.

## Example 2 — Real-world: a support knowledge project

```text
Project: Customer Support – Billing
Knowledge: refund-policy-2026.pdf, billing-faq.docx, escalation-matrix.xlsx
Instructions: You help support agents answer billing questions. Answer only from
the project documents. Quote the policy section you used. If the documents
don't cover it, reply "Escalate per escalation-matrix.xlsx" and name the team.
```

**Why this works:** grounding in project files, quoting, and an explicit "not covered" path make
answers checkable and consistent across agents.

## Example 3 — Pitfall: the junk-drawer project

Someone dumps 80 unrelated files (old drafts, three versions of the same policy, files named
`doc1.pdf`) into one project and asks, "What's our refund policy?" Claude finds conflicting versions
and can't tell which is current.

**The fix:** one focused project per area, **only current versions**, **descriptive filenames**, and
questions that **name the document**.

# Common Mistakes

- **Putting everything in one giant project.** Mixed topics confuse retrieval and answers.
- **Keeping outdated versions** of the same document. Remove them, or label the current one clearly.
- **Vague filenames** that make it hard for Claude (and you) to cite sources.
- **Writing one-off details into project instructions.** Instructions should hold for every chat.
- **Forgetting memory is per project.** Facts learned in one project don't carry to another.

# Best Practices

- Create **one project per ongoing area**: a client, a course, a product, a team.
- Upload **current, well-named** files up front, and remove stale ones.
- Write **short, durable instructions**: role, audience, voice, rules, and what to do when unsure.
- Ask questions that **name the source document** for precise retrieval.
- On Team and Enterprise, grant **Can edit** sparingly; most people need **Can view**.

# Summary

- A **Project** bundles a **knowledge base**, **instructions**, and its own **memory**.
- Free users can create **up to five** projects.
- On paid plans, projects switch to **RAG** automatically near the context limit, growing **up to 10x**.
- Project content is **cached**, so reusing it counts less against your limits.
- Team and Enterprise can **share** projects with **Can view** or **Can edit** access.

# Flash Cards

Q: What three things does a Project give Claude?
A: A knowledge base of your files, project instructions, and its own project memory.

Q: How many projects can a Free user create?
A: Up to five.

Q: What happens on paid plans when a project's knowledge nears the context limit?
A: Claude automatically switches to RAG, searching for relevant passages, which expands capacity up to 10x.

Q: Does a project chat use other projects' memories?
A: No. It uses that project's memory plus your general account memory, never other projects' memories.

Q: Why do projects help with usage limits?
A: Project content is cached and counts less against your limits when it's reused.

Q: What sharing permissions exist for projects on Team and Enterprise?
A: Can view (use and chat) and Can edit (change instructions and knowledge, manage members).

# Exercises

### Easy
Create a project for something you work on weekly. Add two files and a three-line instruction, then
start two chats and confirm both use the files without re-uploading.

### Medium
Rename the files in an existing project descriptively, remove outdated versions, and rewrite the
instructions to include "what to do when unsure." Ask the same question before and after, and compare.

### Challenging
Design a project for a team of five (for example, a sales team's proposal library). Specify the
knowledge files, the instructions, who gets Can view versus Can edit, and a monthly maintenance step
to retire stale documents. Explain how you'd test that answers cite the right documents.

# Further Reading

- Claude Help Center — *What are projects?*: <https://support.claude.com/en/articles/9517075-what-are-projects>
- Claude Help Center — *Retrieval augmented generation (RAG) for projects*:
  <https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects>
- Claude Help Center — *Using Claude's chat search and memory*:
  <https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context>
- Claude Help Center — *Usage limit best practices*:
  <https://support.claude.com/en/articles/9797557-usage-limit-best-practices>
