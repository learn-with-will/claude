---
id: lesson-04
slug: prompting-fundamentals
title: "Prompting Fundamentals"
level: beginner
order: 4
duration: 22
tags:
  - prompt-engineering
  - clarity
  - examples
  - xml-tags
  - formatting
summary: "The core prompting techniques from Anthropic's own best-practices guide: being clear and direct, explaining why, showing examples, structuring with XML tags, giving Claude a role, and controlling the output format, plus a reusable prompt template."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Apply Anthropic's **golden rule** of clear prompting.
- Add **context and motivation** so Claude understands *why* you want something.
- Use **examples** (few-shot prompting) to lock in format and tone.
- Structure complex prompts with **XML tags** and assign Claude a **role**.
- Control the **format** of responses by saying what to do instead of what not to do.

# Why It Matters

A prompt is the only window Claude has into your intent. The same model gives a mediocre answer to a
vague prompt and an excellent one to a clear prompt. These techniques come straight from Anthropic's
*Prompting best practices* guide. They work in the chat apps, in Projects, in Claude Code, and in the
API. Learn them once and you'll use them everywhere.

# Concept Explanation

### The golden rule: be clear and direct

Anthropic's guide says to think of Claude as *a brilliant but new employee* who lacks context on your
norms and workflows. Its **golden rule** is to show your prompt to a colleague with minimal context
on the task and ask them to follow it. If they'd be confused, Claude will be too.

Being clear means:

- Say exactly **what** you want, for **whom**, at what **length**, in what **format**.
- Use **numbered steps** when order or completeness matters.
- If you want "above and beyond" work, **ask for it explicitly**. Don't hope Claude will infer it.

### Add context: explain the why

Instructions work better with a reason. Anthropic's guide makes this point with a text-to-speech
example; here's the same idea in another setting:

```text
Less effective:  Don't use abbreviations.
More effective:  This text will be read aloud by a screen reader for visually impaired
                 customers, so spell out abbreviations (write "for example", not "e.g.").
```

Given the reason, Claude can generalize. It will also avoid *other* things a screen reader handles
badly, like symbols used as words.

### Show examples (few-shot prompting)

Examples are, in the guide's words, *one of the most reliable ways* to steer format, tone, and
structure. Make them:

- **Relevant:** close to your real use case.
- **Diverse:** covering edge cases, so Claude doesn't copy an accidental pattern.
- **Structured:** wrapped in `<example>` tags (several inside `<examples>`).

The guide suggests **3–5 examples** for best results.

### Structure with XML tags

When a prompt mixes instructions, background, examples, and input, wrap each in its own **XML tag**
so nothing gets confused. Use consistent, descriptive names and nest when it's natural:

```text
<instructions>
Summarize the customer feedback below for the product team.
Group it into themes and give each theme a one-line summary.
</instructions>

<context>
We released a new checkout flow last week. The team wants to know what to fix first.
</context>

<feedback>
{{PASTE FEEDBACK HERE}}
</feedback>
```

There's nothing magic about the tag names. They simply make the boundaries unambiguous.

### Give Claude a role

A short role sets focus and tone: "You are a senior tax accountant reviewing a small-business
return," or "You are a patient tutor for a 12-year-old." In the API this goes in the **system
prompt** (Lesson 19). In the apps, put it at the top of your message or in **project instructions**
(Lesson 7).

### Control the format

The guide's most effective formatting tips:

1. **Say what to do instead of what not to do.** Write "Use smoothly flowing prose paragraphs"
   instead of "Don't use markdown."
2. **Match your prompt's style to the output you want.** A prompt full of bullet points tends to get
   bullet points back.
3. **Be explicit** about headings, lists, tables, and length when they matter.

### Long documents: data first, question last

For long inputs (the guide says 20k+ tokens), put the documents **at the top** and your question **at
the end**. Anthropic notes that queries at the end can improve response quality by up to 30% in its
tests. Also ask Claude to **quote the relevant passages first** before answering. That grounds the
answer in the text (Lesson 5).

# Key Terminology

- **Prompt** — everything you send Claude: instructions, context, examples, and input.
- **Golden rule** — if a colleague with no context would be confused by your prompt, Claude will be too.
- **Few-shot prompting** — including a few examples of the output you want.
- **XML tags** — labels like `<context>…</context>` that separate parts of a prompt.
- **Role prompting** — telling Claude who to be ("You are a…") to focus tone and expertise.
- **System prompt** — standing instructions sent before the conversation (in the API and in Projects).

# Options and Trade-offs

| Technique | Use it when… | Watch out for |
| --- | --- | --- |
| Clear, direct instructions | Always | Over-long prompts that bury the key ask |
| Explaining the "why" | Rules that might seem arbitrary | Long justifications for trivial rules |
| Few-shot examples | Format, tone, or labels must be consistent | Examples that are too similar, so Claude copies quirks |
| XML tags | Prompt mixes instructions, data, and examples | Inconsistent tag names across prompts |
| Role prompting | You need a specific expertise or voice | Roles that conflict with your actual instructions |
| Format instructions | Output feeds another tool or audience | Contradicting rules ("no lists" and "list the steps") |

# Worked Example

**Vague prompt:**

```text
Write something about our new vacation policy.
```

**Rebuilt with the techniques from this lesson:**

```text
You are an HR communications specialist writing for a 200-person software company.

<context>
Starting January 1, employees get 25 vacation days instead of 20, unused days roll
over (max 5), and requests go through the new HR portal instead of email.
Many employees are skeptical after last year's confusing policy change.
</context>

<instructions>
Write an announcement email that:
1. Leads with the headline benefit (5 more days).
2. Explains the three changes in plain language.
3. Addresses the skepticism directly and honestly.
4. Ends with where to ask questions.
Keep it under 200 words, warm but professional, in flowing paragraphs.
</instructions>
```

What changed: a **role**, the **facts** Claude couldn't know, the **reason** for the tone (skeptical
readers), **numbered requirements**, and an explicit **length and format**.

# Real World Analogy

A prompt is a **work order for a skilled contractor**. "Fix the kitchen" gets you something, maybe
not what you wanted. A good work order says which room, what's broken, the budget, the style you
like, a photo of a kitchen you love (an example), and why (you're selling the house in spring, so it
should appeal to buyers). The contractor is just as skilled either way. The work order is what
changes the result.

# Examples

## Example 1 — Basic: from vague to specific

```text
Explain photosynthesis for a 10-year-old in 4 short sentences, using one
everyday comparison. Avoid technical terms except "chlorophyll," which you
should define.
```

**Why this works:** audience, length, a requested analogy, and a clear rule about vocabulary.

## Example 2 — Real-world: few-shot classification

```text
Classify each support email as BILLING, BUG, FEATURE_REQUEST, or OTHER.
Reply with only the label.

<examples>
<example>
Email: "I was charged twice this month."
Label: BILLING
</example>
<example>
Email: "The export button does nothing on Safari."
Label: BUG
</example>
<example>
Email: "Could you add dark mode?"
Label: FEATURE_REQUEST
</example>
</examples>

Email: "My invoice shows the wrong company name."
```

**Why this works:** the examples define the labels and the output format better than any
description could.

## Example 3 — Pitfall: negative and conflicting instructions

```text
Don't use bullet points. Don't be too long. Don't be boring.
List the 5 steps to set up the router.
```

**What goes wrong:** three "don'ts" say nothing about what *to* do, and "don't use bullet points"
conflicts with "list the 5 steps." Rewrite positively and consistently:

```text
Explain the 5 steps to set up the router as a numbered list, one or two
sentences per step, in a friendly tone for a non-technical reader.
```

# Common Mistakes

- **Leaving out context** Claude can't possibly know: audience, purpose, constraints.
- **Only saying what *not* to do.** Describe the output you want.
- **Contradictory instructions** that force Claude to pick one at random.
- **One example only,** which Claude may copy too literally. Use several, varied examples.
- **Burying the actual request** under paragraphs of background. Make the ask easy to find.

# Best Practices

- Apply the **golden rule**: would a new colleague understand this prompt?
- State **audience, goal, length, and format** every time it matters.
- **Explain why** for any rule that matters.
- Use **3–5 varied examples** in `<example>` tags when consistency matters.
- Separate parts with **XML tags**; put long documents **first** and the question **last**.
- Ask Claude to **improve your prompt**: "Rewrite this prompt to be clearer and tell me what's missing."

# Summary

- Anthropic's golden rule: if a colleague with minimal context would be confused, Claude will be too.
- Be **clear and direct**, and **explain the why** so Claude can generalize.
- **Examples** are one of the most reliable ways to steer format and tone (3–5, varied, in tags).
- **XML tags** separate instructions, context, examples, and input; a **role** focuses expertise.
- Control format by saying **what to do** and matching your prompt's style to the output.

# Flash Cards

Q: What is Anthropic's "golden rule" of prompting?
A: Show your prompt to a colleague with minimal context on the task; if they'd be confused, Claude will be too.

Q: Why does explaining the reason behind an instruction help?
A: Claude can generalize from the reason and handle related cases you didn't spell out.

Q: How many examples does Anthropic suggest for few-shot prompting, and how should you mark them?
A: About 3–5 relevant, diverse examples, wrapped in <example> tags (inside <examples> for several).

Q: What are XML tags for in a prompt?
A: They separate instructions, context, examples, and input so Claude parses a complex prompt unambiguously.

Q: How should you phrase formatting instructions?
A: Say what to do instead of what not to do, for example "write flowing prose paragraphs" rather than "don't use markdown."

Q: Where should long documents go in a prompt?
A: At the top, with your question at the end. Anthropic's tests saw up to 30% better quality.

# Exercises

### Easy
Take a prompt you used recently and rewrite it with an explicit audience, length, and format. Run
both versions and compare.

### Medium
Create a few-shot prompt that turns messy meeting notes into a fixed format (decisions, action items
with owners, open questions). Use three varied examples in `<example>` tags and test it on real notes.

### Challenging
Build a reusable prompt template for a recurring task at work using tags for `<role>`, `<context>`,
`<instructions>`, `<examples>`, and `<input>`. Test it on five different inputs, then ask Claude:
"What's ambiguous or missing in this template?" Revise and re-test.

# Further Reading

- Anthropic — *Prompting best practices*:
  <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices>
- Anthropic — *Prompt engineering overview*:
  <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview>
- Anthropic — *Interactive prompt engineering tutorial* (GitHub; written for older models, so
  follow the best-practices guide where they differ):
  <https://github.com/anthropics/prompt-eng-interactive-tutorial>
- Claude blog — *Best practices for prompt engineering*:
  <https://claude.com/blog/best-practices-for-prompt-engineering>
