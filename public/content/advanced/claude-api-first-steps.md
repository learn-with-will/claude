---
id: lesson-19
slug: claude-api-first-steps
title: "The Claude API: Your First Requests"
level: advanced
order: 19
duration: 24
tags:
  - claude-api
  - messages-api
  - sdk
  - streaming
  - stop-reasons
summary: "Building with Claude through the Claude Developer Platform: API keys and the Console, your first Messages API request in Python, TypeScript, and curl, reading content blocks, usage, and stop reasons, multi-turn conversations, streaming, error handling, refusals, and what a request costs."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Set up the **Claude Developer Platform**: Console account, API key, and SDK.
- Send a **Messages API** request in Python, TypeScript, and curl.
- Read a response's **content blocks**, **usage**, and **stop reason**.
- Hold a **multi-turn** conversation and **stream** long responses.
- Handle **errors** and **refusals**, and estimate what a request **costs**.

# Why It Matters

The apps are great for working *with* Claude. The API is how you build Claude *into* things: a support
tool, a document pipeline, an internal assistant, an agent. Everything in the developer platform (tool
use, structured outputs, caching, agents) is built on the single request you'll learn here. Get it
right once, and the rest is composition.

# Concept Explanation

### The platform and your key

1. Sign in to the **Claude Console** at <https://platform.claude.com>. That's where you manage API
   keys, workspaces, billing, and usage, and test prompts in the browser.
2. **Create an API key** and store it as an environment variable. Never put it in code or commit it:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
pip install anthropic            # Python SDK
npm install @anthropic-ai/sdk    # TypeScript SDK
```

API usage is billed **per token**, separately from Claude app subscriptions. (As of writing, Max and
Team plans also include monthly API credits you can link to a Console organization.)

### One endpoint: the Messages API

Everything goes through **`POST /v1/messages`**. You send a list of messages and some parameters, and
you get back Claude's next message. Tools, structured output, and thinking are features of this one
request, not separate APIs. The SDK reads `ANTHROPIC_API_KEY` automatically:

```python
import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY

response = client.messages.create(
    model="claude-opus-5-5",   # current Opus, as of writing
    max_tokens=16000,          # required cap on the reply length
    system="You are a concise assistant for a hardware store.",
    messages=[{"role": "user", "content": "What size drill bit for a #8 wood screw?"}],
)

# content is a LIST of blocks; check each block's type before reading text
for block in response.content:
    if block.type == "text":
        print(block.text)
print(response.stop_reason, response.usage.input_tokens, response.usage.output_tokens)
```

The same request in TypeScript:

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY

const response = await client.messages.create({
  model: "claude-opus-5-5",
  max_tokens: 16000,
  messages: [{ role: "user", content: "What size drill bit for a #8 wood screw?" }],
});
for (const block of response.content) {
  if (block.type === "text") console.log(block.text);
}
```

And as raw HTTP, which shows the three required headers:

```bash
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model": "claude-opus-5-5", "max_tokens": 1024,
       "messages": [{"role": "user", "content": "Hello, Claude"}]}'
```

### Anatomy of a response

```json
{
  "id": "msg_01...",
  "role": "assistant",
  "content": [
    { "type": "thinking", "thinking": "", "signature": "..." },
    { "type": "text", "text": "Use a 1/8\" pilot bit for softwood, 9/64\" for hardwood." }
  ],
  "stop_reason": "end_turn",
  "usage": { "input_tokens": 31, "output_tokens": 54 }
}
```

- **`content`** is a list of **blocks**. Current models think adaptively, so you may see a `thinking`
  block. Its text is empty unless you ask for a summary (Lesson 20). That's why you loop and check
  `type` instead of reading `content[0].text`.
- **`stop_reason`** says *why* Claude stopped (table below). Check it before trusting the content.
- **`usage`** counts input and output **tokens**, the units you pay for.

| `stop_reason` | Meaning |
| --- | --- |
| `end_turn` | Finished naturally |
| `max_tokens` | Hit your cap, so the reply is cut off |
| `stop_sequence` | Hit a stop sequence you set |
| `tool_use` | Wants to call a tool (Lesson 21) |
| `pause_turn` | Paused mid-turn in an agentic flow; send it back to continue |
| `refusal` | Declined for safety reasons; `stop_details` has the category |

### Multi-turn: the API is stateless

The server remembers nothing between requests. To continue a conversation, append Claude's reply and
your next message, and **resend the whole list**. Append the full `response.content` (not just the
text), so blocks like thinking travel back unchanged:

```python
messages = [{"role": "user", "content": "My project is a birdhouse. Suggest a wood."}]
first = client.messages.create(model="claude-opus-5-5", max_tokens=16000, messages=messages)

messages.append({"role": "assistant", "content": first.content})
messages.append({"role": "user", "content": "What screws should I use with it?"})
second = client.messages.create(model="claude-opus-5-5", max_tokens=16000, messages=messages)
```

### Streaming

For long replies, **stream** so text appears as it's generated and long requests don't time out:

```python
with client.messages.stream(
    model="claude-opus-5-5",
    max_tokens=64000,
    messages=[{"role": "user", "content": "Write a detailed guide to building a birdhouse."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
    final = stream.get_final_message()  # the complete message, with usage
```

### Errors and retries

The SDKs retry connection errors, 408/409/429, and 5xx responses automatically (2 retries by
default). Catch errors from most specific to most general, so retryable failures aren't confused with
bugs in your request:

```python
try:
    response = client.messages.create(model="claude-opus-5-5", max_tokens=1024,
                                      messages=[{"role": "user", "content": "Hi"}])
except anthropic.BadRequestError as e:       # 400: fix the request
    print("Bad request:", e.message)
except anthropic.RateLimitError:             # 429: back off and retry later
    print("Rate limited")
except anthropic.APIStatusError as e:        # other HTTP errors
    print("API error", e.status_code)
except anthropic.APIConnectionError:         # network problems
    print("Network error")
```

### Refusals and fallbacks

Current models run safety classifiers that can decline a request with **HTTP 200** and
`stop_reason: "refusal"`, so always check `stop_reason` before reading content. On the Claude API you
can opt into a **server-side fallback** that retries a declined request on another model Anthropic
recommends for that refusal category:

```bash
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: server-side-fallback-2026-07-01" \
  -d '{"model": "claude-opus-5-5", "fallbacks": "default", "max_tokens": 1024,
       "messages": [{"role": "user", "content": "Explain how TLS certificates work."}]}'
```

### What a request costs

Prices are per **million tokens** (MTok). As of writing: Opus 5.5 is **$4 input / $20 output**,
Sonnet 5.5 $2 / $10, Haiku 5.5 from $0.10 / $0.50, and Fable 5.1 $10 / $50. Count tokens before
sending with `client.messages.count_tokens(model=..., messages=...)`, and see Lesson 22 for cutting
costs.

# Key Terminology

- **Claude Console** — the developer dashboard at platform.claude.com for keys, usage, and testing.
- **Messages API** — the single endpoint (`POST /v1/messages`) for all Claude requests.
- **SDK** — the official client library (`anthropic`, `@anthropic-ai/sdk`) for your language.
- **Content block** — one item in `content`: `text`, `thinking`, `tool_use`, and so on.
- **`stop_reason`** — why generation ended: `end_turn`, `max_tokens`, `tool_use`, `refusal`, …
- **Stateless** — the API keeps no memory; you resend the conversation each time.
- **Streaming** — receiving the response incrementally as it's generated.

# Options and Trade-offs

| Decision | Option A | Option B | How to choose |
| --- | --- | --- | --- |
| Interface | Official SDK | Raw HTTP | SDK by default; raw HTTP for shells or languages without an SDK |
| Response mode | Non-streaming | Streaming | Stream for long outputs, large `max_tokens`, or live UIs |
| Model | Opus 5.5 (docs' default starting point) | Sonnet 5.5 / Haiku 5.5 | Start capable, then test whether a cheaper model holds quality on your evals |
| `max_tokens` | Small | Large | Large enough for complete answers; too small truncates (`max_tokens` stop) |
| Refusals | Handle in code | Opt into server-side `fallbacks` | Do both: check `stop_reason`, and opt in where it's available |

# Worked Example

**Estimate a support assistant's cost on Opus 5.5.** Each request sends about **2,000 input tokens**
(system prompt, history, question) and gets about **500 output tokens** back.

1. Input: 2,000 × $4 / 1,000,000 = **$0.008**
2. Output: 500 × $20 / 1,000,000 = **$0.010**
3. Per request: **$0.018**, so 10,000 requests a month is about **$180**.

Notice that output tokens cost **5× input** here, so long answers dominate. Lesson 22 shows how prompt
caching (for the repeated system prompt) and batching cut this further. Always confirm with real
`usage` numbers from your logs rather than estimates.

# Real World Analogy

The Messages API is a **counter where the barista has no memory**. Every order must repeat your whole
order so far ("the latte, oat milk, and the muffin I mentioned"). You get back a receipt (the
response), not just a coffee: what you got (content blocks), why the order ended (stop reason: done,
ran out of cups, or "I need to check the back," which is a tool call), and the itemized bill (usage).
Reading the receipt, not just drinking the coffee, is what separates a working integration from a
fragile one.

# Examples

## Example 1 — Basic: a single request

The Python snippet above is the whole "hello world": construct the client, call `messages.create`
with a model, `max_tokens`, and messages, then loop over `content` for `text` blocks.

**Why this works:** the client reads your key from the environment, and the structured response gives
you text, stop reason, and usage in one place.

## Example 2 — Real-world: a classifier with a system prompt

```python
LABELS = "BILLING, BUG, FEATURE_REQUEST, OTHER"
resp = client.messages.create(
    model="claude-haiku-5-5",   # fast and cheap for simple classification
    max_tokens=256,
    system=f"Classify the support email into exactly one of: {LABELS}. Reply with the label only.",
    messages=[{"role": "user", "content": "I was charged twice for October."}],
)
if resp.stop_reason == "end_turn":
    label = next(b.text for b in resp.content if b.type == "text").strip()
    print(label)  # BILLING
```

**Why this works:** a high-volume, simple task fits the fastest model, a short `max_tokens`, and a
strict system prompt, and the code checks `stop_reason` before trusting the output. (Lesson 20 shows
how to *guarantee* the format with structured outputs.)

## Example 3 — Pitfall: expecting the server to remember

A developer sends "My name is Ada," then a *new* request containing only "What's my name?" Claude
can't answer. Nothing is wrong with the model: the first turn simply wasn't resent.

**The fix:** keep the conversation in your own `messages` list and send the whole list every time,
including the assistant turns.

# Common Mistakes

- **Hard-coding the API key.** Use an environment variable or a secret manager.
- **Reading `content[0].text` blindly.** Content is a list of typed blocks, and a thinking block may come first.
- **Ignoring `stop_reason`.** `max_tokens` means truncated; `refusal` means declined.
- **Assuming memory between calls.** The API is stateless; resend history.
- **Non-streaming requests with huge `max_tokens`.** Stream to avoid timeouts.

# Best Practices

- Keep keys in the **environment**; construct clients with **no arguments**.
- **Loop over content blocks** by type, and **check `stop_reason`** every time.
- **Append full `response.content`** when continuing conversations.
- **Stream** long outputs, and use `get_final_message()` when you need the whole result.
- **Log `usage`** from day one, and catch errors from **most specific to most general**.

# Summary

- Get a key from the **Claude Console**, install the **SDK**, and keep the key in `ANTHROPIC_API_KEY`.
- Everything goes through **`POST /v1/messages`**: model, `max_tokens`, optional `system`, and `messages`.
- A response has **content blocks**, a **stop reason**, and **usage**; read all three.
- The API is **stateless**: resend the conversation, appending full `response.content`.
- **Stream** long replies, handle **errors** and **refusals**, and price requests **per million tokens**.

# Flash Cards

Q: Which endpoint do all Claude API requests use?
A: The Messages API, POST /v1/messages; tools, structured output, and thinking are features of that one request.

Q: What three headers does a raw HTTP request need?
A: x-api-key (your key), anthropic-version (for example 2023-06-01), and content-type: application/json.

Q: Why should you loop over response.content instead of reading content[0].text?
A: Content is a list of typed blocks (text, thinking, tool_use…), and the first block may not be text.

Q: What does stop_reason "refusal" mean, and what status code does it come with?
A: Claude declined for safety reasons; it arrives with HTTP 200, so you must check stop_reason in code.

Q: How do you continue a conversation with the stateless API?
A: Append Claude's full response.content as an assistant message plus your next user message, and resend the whole messages list.

Q: What are Claude Opus 5.5's API prices, as of writing?
A: $4 per million input tokens and $20 per million output tokens.

# Exercises

### Easy
Create an API key, install the SDK for your language, and run the first request. Print each content
block's type, the `stop_reason`, and the `usage`.

### Medium
Build a minimal terminal chat loop that appends full `response.content` each turn and streams replies.
Confirm it remembers something from three turns earlier, and explain why.

### Challenging
Set `max_tokens` to 20 and ask for a long answer, then write code that detects `max_tokens`
truncation and retries with a larger cap. Add handling for `refusal` and for `RateLimitError`, and log
`usage` plus the computed cost of each request at Opus 5.5 prices.

# Further Reading

- Anthropic — *Get started* (first API call): <https://platform.claude.com/docs/en/get-started>
- Anthropic — *Models overview*: <https://platform.claude.com/docs/en/about-claude/models/overview>
- Anthropic — *Pricing*: <https://platform.claude.com/docs/en/about-claude/pricing>
- Anthropic — *Streaming*: <https://platform.claude.com/docs/en/build-with-claude/streaming>
- Anthropic — *Errors*: <https://platform.claude.com/docs/en/api/errors>
