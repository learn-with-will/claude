---
id: lesson-20
slug: thinking-and-structured-outputs
title: "Thinking, Effort, Vision, and Structured Outputs"
level: advanced
order: 20
duration: 23
tags:
  - adaptive-thinking
  - effort-parameter
  - structured-outputs
  - vision
  - pdf-support
summary: "Controlling how hard Claude thinks and exactly what it returns: adaptive thinking and the effort parameter, reading thinking summaries, sending images and PDFs, and getting guaranteed, schema-valid JSON with structured outputs now that assistant prefill is gone."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Use **adaptive thinking** and the **effort** parameter, and know each model's defaults.
- Request **thinking summaries** and use them to debug.
- Send **images** and **PDFs**, and ask for grounded, **cited** answers.
- Get **schema-valid JSON** with **structured outputs** (`output_config.format` or `messages.parse`).
- Replace old **prefill** patterns that current models reject.

# Why It Matters

Two questions decide most API integrations: *how much reasoning is this worth?* and *can my code
trust the shape of what comes back?* Effort answers the first. You pay for thinking, so match it to
the job. Structured outputs answer the second: instead of hoping Claude formats JSON correctly, you
constrain it to your schema and parse with confidence.

# Concept Explanation

### Adaptive thinking

On current models, thinking is **adaptive**: Claude decides when and how much to think, steered by
the **effort** setting and how hard the request is. The configuration is simple:

```python
response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    thinking={"type": "adaptive", "display": "summarized"},  # show a readable summary
    output_config={"effort": "high"},                        # low | medium | high | xhigh | max
    messages=[{"role": "user", "content": "Plan a 3-phase migration from cron jobs to a queue."}],
)
for block in response.content:
    if block.type == "thinking":
        print("THINKING SUMMARY:", block.thinking)
    elif block.type == "text":
        print(block.text)
```

Key facts (as of writing):

- **Opus 5.5 and Fable 5.1 always think.** Turning thinking off (`{"type": "disabled"}`) returns a
  400. **Effort** is the control. On **Sonnet 5.5**, `disabled` also returns a 400; it offers a
  separate `{"type": "between_tools"}` mode for agent loops.
- The old manual mode, `{"type": "enabled", "budget_tokens": N}`, is **rejected** on current models.
- **`display`** defaults to **omitted**, which means thinking happens and is billed but its text comes
  back empty. Set `"display": "summarized"` to read a summary. The raw chain of thought is never
  returned.

### The effort parameter

`output_config={"effort": ...}` trades thoroughness against tokens, latency, and cost. Defaults
differ: **Opus 5.5 and Haiku 5.5 default to `medium`**, while **Sonnet 5.5 and Fable 5.1 default to
`high`**. Set it explicitly so behavior doesn't change silently when you switch models. A sensible
reading of Anthropic's guidance:

- **`low`** for chat, classification, simple sub-tasks, and high-volume routes.
- **`medium`** as a cost-saving step down where quality holds.
- **`high`** as a floor for intelligence-sensitive work.
- **`xhigh`**, designed for long-running coding and agentic tasks.
- **`max`** when correctness matters more than cost.

Levels are calibrated per model (Sonnet 5.5's were recalibrated from Sonnet 5's), so measure on real
requests before raising a default, and tune **per route**, not globally.

### Images and PDFs

Images go in the user message as content blocks, by **base64** or **URL**, placed before your text:

```python
response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    messages=[{
        "role": "user",
        "content": [
            {"type": "image", "source": {"type": "url", "url": "https://example.com/receipt.png"}},
            {"type": "text", "text": "Extract the vendor, date, and total from this receipt."},
        ],
    }],
)
```

PDFs use a **`document`** block (`"source": {"type": "base64", "media_type": "application/pdf",
"data": ...}`). As of writing, a request can be up to 32 MB and 600 pages (100 for 200K-context
models). Set `"citations": {"enabled": True}` on document blocks and Claude's answer comes back split
into text blocks carrying **citations**, with page numbers for PDFs. That's the API version of
"quote the source" from Lesson 5.

### No more prefill

Older integrations forced a format by **prefilling** the start of Claude's reply (for example, `{`).
Prefilling the last assistant turn **returns a 400** on current models. The replacements:

| Old prefill trick | Do this instead |
| --- | --- |
| Force JSON or YAML | **Structured outputs** (below) |
| Force a classification label | A tool with an `enum` field, or structured outputs |
| Skip a preamble ("Here is…") | System prompt: "Respond directly without preamble" |
| Continue an interrupted reply | Put the partial text in the user turn and ask Claude to continue |

### Structured outputs: guaranteed JSON

With **`output_config.format`**, the response is constrained to your JSON schema, and the first text
block is valid JSON:

```python
import json

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    messages=[{"role": "user", "content": "Extract: Jane Doe (jane@co.com) wants the Enterprise plan."}],
    output_config={
        "format": {
            "type": "json_schema",
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "email": {"type": "string"},
                    "plan": {"type": "string", "enum": ["Free", "Pro", "Enterprise"]},
                },
                "required": ["name", "email", "plan"],
                "additionalProperties": False,
            },
        }
    },
)
data = json.loads(next(b.text for b in response.content if b.type == "text"))
```

In Python, the **`messages.parse`** helper takes a Pydantic model and returns a validated object:

```python
from pydantic import BaseModel

class Lead(BaseModel):
    name: str
    email: str
    plan: str
    demo_requested: bool

response = client.messages.parse(
    model="claude-opus-5-5",
    max_tokens=16000,
    messages=[{"role": "user", "content": "Jane Doe (jane@co.com) wants Enterprise and a demo."}],
    output_format=Lead,
)
lead = response.parsed_output   # a validated Lead instance
print(lead.name, lead.demo_requested)
```

Schemas need `"additionalProperties": false` and a `required` list. (The Python `parse` helper takes
an `output_format` argument; on raw requests, the old top-level `output_format` field is deprecated in
favor of `output_config.format`.) Citations can't be combined with structured outputs in the same
request.

# Key Terminology

- **Adaptive thinking** — Claude decides when and how much to think (`thinking={"type": "adaptive"}`).
- **Effort** — `output_config.effort`: `low` to `max`, trading thoroughness against tokens and latency.
- **Thinking display** — `omitted` (default, empty text) or `summarized` (a readable summary).
- **Content block (image/document)** — how images and PDFs are sent inside a user message.
- **Citations** — structured references from an answer back to passages in your documents.
- **Prefill** — pre-writing the start of Claude's reply; rejected on current models.
- **Structured outputs** — constraining the response to a JSON schema (`output_config.format`).

# Options and Trade-offs

| Goal | Approach | Trade-off |
| --- | --- | --- |
| Cheaper, faster simple routes | `effort: "low"` | Less depth on hard inputs, so measure quality |
| Hard reasoning | `effort: "high"` or above | More tokens and latency |
| See why an answer happened | `display: "summarized"` | Slightly larger responses (thinking is billed either way) |
| Machine-readable output | Structured outputs | Schema design effort; no citations in the same call |
| Verifiable document answers | Document blocks + citations | Not combinable with structured outputs |
| Typed results in Python | `messages.parse` + Pydantic | Python-specific helper |

# Worked Example

**Goal:** an invoice-extraction service that never breaks your database insert.

1. **Input:** each invoice PDF as a `document` block, plus the instruction "Extract the invoice fields."
2. **Schema:** an `Invoice` Pydantic model with `vendor: str`, `invoice_number: str`, `date: str`,
   `total: float`, `currency: str`, and `line_items: list[LineItem]`.
3. **Call:** `client.messages.parse(model="claude-opus-5-5", ..., output_format=Invoice)` with
   `output_config={"effort": "medium"}`. Extraction rarely needs deep reasoning.
4. **Use:** `response.parsed_output` is a validated object, so insert it directly.
5. **Quality check:** run 50 real invoices at `low`, `medium`, and `high` effort, and compare field
   accuracy. Keep the cheapest level that matches the best accuracy.

# Real World Analogy

Effort is like choosing between a **quick glance and a full inspection** from an expert. A glance is
fine for "is this a receipt?" and a full inspection is worth paying for when you're assessing a
house. Structured outputs are a **pre-printed form** instead of a blank page: the inspector fills in
every labeled box, in the right format, every time, so the office can file it without retyping
anything.

# Examples

## Example 1 — Basic: the same question at two efforts

Run a tricky scheduling question with `output_config={"effort": "low"}` and again with
`{"effort": "high"}`, both with `display: "summarized"`. Compare answers, latency, and
`usage.output_tokens`.

**Why this works:** you learn on real data whether the extra effort pays for itself on that route.

## Example 2 — Real-world: screenshot to structured bug report

Send a screenshot of an error dialog as an `image` block with the prompt "Create a bug report," and
use structured outputs with fields `title`, `error_message`, `likely_component`, and
`steps_to_reproduce` (array). The result drops straight into your issue tracker's API.

**Why this works:** vision reads the screenshot, and the schema guarantees the shape your integration needs.

## Example 3 — Pitfall: carrying old patterns forward

Code written for older models prefills `{` to force JSON and sets
`thinking={"type": "enabled", "budget_tokens": 4000}`. On Opus 5.5 both return **400 errors**.

**The fix:** use `output_config.format` (or `messages.parse`) for the JSON, and adaptive thinking
with an explicit `effort` for the reasoning depth.

# Common Mistakes

- **Prefilling the assistant turn** on current models, which returns a 400.
- **Sending `budget_tokens`** or `{"type": "disabled"}` to models that reject them.
- **Forgetting effort defaults differ** between models (Opus 5.5 is `medium`, Sonnet 5.5 is `high`).
- **Schemas without `additionalProperties: false` and `required`.**
- **Expecting thinking text by default.** Set `display: "summarized"` if you want to read it.

# Best Practices

- Use **adaptive thinking** and set **effort explicitly** per route; measure before raising it.
- Turn on **thinking summaries** while developing and debugging.
- Use **structured outputs** for anything code consumes; use **`messages.parse`** for typed Python.
- Put images and documents **before** your question, and use **citations** when answers must be verifiable.
- Audit old code for **prefill** and **`budget_tokens`** before migrating to current models.

# Summary

- Current models use **adaptive thinking**; **effort** (`low` to `max`) is the main control, and Opus 5.5
  and Fable 5.1 always think.
- `display: "summarized"` returns a readable thinking summary; the default is **omitted**.
- Send **images** and **PDFs** as content blocks; enable **citations** for verifiable answers.
- **Prefill is rejected** on current models; use **structured outputs** (`output_config.format`) instead.
- **`messages.parse`** with a Pydantic model returns validated, typed results in Python.

# Flash Cards

Q: How do you configure thinking on current Claude models?
A: thinking={"type": "adaptive"}; Claude decides when and how much to think, steered by effort.

Q: What are the five effort levels, and where does the parameter go?
A: low, medium, high, xhigh, and max, set inside output_config, for example output_config={"effort": "high"}.

Q: What is the default effort on Claude Opus 5.5 and on Claude Sonnet 5.5?
A: medium on Opus 5.5; high on Sonnet 5.5.

Q: Why might thinking blocks come back with empty text?
A: The display setting defaults to omitted; set display to "summarized" to receive a readable summary.

Q: What happens if you prefill the assistant's reply on current models?
A: The request returns a 400 error; use structured outputs or system-prompt instructions instead.

Q: How do you guarantee schema-valid JSON output?
A: Use structured outputs: output_config={"format": {"type": "json_schema", "schema": {...}}}, or messages.parse with a Pydantic model in Python.

# Exercises

### Easy
Send the same reasoning question at `low` and `high` effort with `display: "summarized"`. Record the
output tokens and latency of each, and judge whether the answers differ.

### Medium
Write a structured-outputs extractor for meeting notes (decisions, action items with owner and due
date, open questions) using `messages.parse` or a raw schema. Test it on three real notes.

### Challenging
Build a small PDF Q&A script with citations enabled. Ask five questions of a real PDF, print each
answer with its cited page numbers, and verify every citation by hand. Then explain why you couldn't
add structured outputs to the same request, and design a two-step pipeline that gets both.

# Further Reading

- Anthropic — *Adaptive thinking*: <https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking>
- Anthropic — *Effort*: <https://platform.claude.com/docs/en/build-with-claude/effort>
- Anthropic — *Structured outputs*: <https://platform.claude.com/docs/en/build-with-claude/structured-outputs>
- Anthropic — *Vision*: <https://platform.claude.com/docs/en/build-with-claude/vision>
- Anthropic — *PDF support* and *Citations*:
  <https://platform.claude.com/docs/en/build-with-claude/pdf-support>,
  <https://platform.claude.com/docs/en/build-with-claude/citations>
