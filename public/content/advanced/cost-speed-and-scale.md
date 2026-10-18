---
id: lesson-22
slug: cost-speed-and-scale
title: "Cost, Speed, and Scale: Caching, Batches, and Limits"
level: advanced
order: 22
duration: 24
tags:
  - prompt-caching
  - batch-api
  - cost-optimization
  - latency
  - rate-limits
summary: "Running Claude economically and fast at scale: where token costs come from, prompt caching as a prefix match, the 50%-off Batch API, choosing model and effort per route, managing long contexts, fast mode, rate limits, and measuring cost per completed task."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Explain **where API costs come from** and estimate cost per **completed task**.
- Apply **prompt caching** correctly and verify that it's working.
- Use the **Batch API** for work that can wait.
- Tune **model and effort per route** and manage **long contexts**.
- Handle **latency** and **rate limits** in production.

# Why It Matters

A prototype that costs $5 a day can cost $5,000 a day in production. The good news is that the
biggest savings are often **free**: no quality trade-off, just structuring requests well. Anthropic's
own cost guidance orders the levers that way: take the free wins (caching, trimming inputs,
batching) before trading quality (lower effort, smaller models).

# Concept Explanation

### Where the money goes

You pay per **million tokens** (MTok), separately for **input** and **output**. As of writing:

| Model | Input / Output per MTok |
| --- | --- |
| Claude Fable 5.1 | $10 / $50 |
| Claude Opus 5.5 | $4 / $20 |
| Claude Sonnet 5.5 | $2 / $10 |
| Claude Haiku 5.5 | from $0.10 / $0.50 (prompts up to 100K tokens) |

Output costs **5× input** on these models, and thinking is billed as output. Judge spending by
**cost per completed task**, not per request: a cheap request that needs three retries isn't cheap.

### Prompt caching: a prefix match

Most applications resend the same large prefix (system prompt, tool definitions, reference documents)
with every request. **Prompt caching** stores that processed prefix so later requests **read** it at
a fraction of the price.

- **It's a prefix match.** Requests render as **tools → system → messages**, and any byte change in
  the prefix invalidates everything after it. Put **stable content first** and **volatile content**
  (timestamps, user questions) after the last cache breakpoint.
- **Automatic caching:** a top-level `cache_control` places the breakpoint for you. That's the
  simplest option, and good for multi-turn conversations.
- **Explicit breakpoints:** `cache_control` on specific blocks, up to **4** per request.
- **Lifetime:** 5 minutes by default (refreshed on each read), or `"ttl": "1h"`.
- **Pricing:** writes cost about **1.25×** base input (2× for the 1-hour TTL); reads cost about
  **0.1×**, or less on some models (0.05× on Opus 5.5 and Sonnet 5.5, and 0.025× on Fable 5.1).
- **Minimum size:** prefixes shorter than a model-dependent minimum (from 512 tokens on the newest
  models) silently don't cache.

```python
response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=16000,
    system=[{
        "type": "text",
        "text": SUPPORT_POLICIES,                 # large, stable, identical every time
        "cache_control": {"type": "ephemeral"},   # breakpoint after the stable prefix
    }],
    messages=[{"role": "user", "content": customer_question}],  # varies per request
)
print(response.usage.cache_creation_input_tokens,  # written to cache this time
      response.usage.cache_read_input_tokens,      # served from cache (should be > 0 on repeats)
      response.usage.input_tokens)                 # uncached input
```

If `cache_read_input_tokens` stays at **0** across identical-prefix requests, something is silently
changing the prefix: a timestamp in the system prompt, unsorted JSON, or a tool list that varies.

### The Batch API: 50% off for work that can wait

The **Message Batches API** processes requests asynchronously at **50% of standard prices**. A batch
holds up to **100,000 requests or 256 MB**. Most finish **within an hour** (24 hours at most), and
results are kept for **29 days**. Results can come back **in any order**, so match them by `custom_id`.

```python
batch = client.messages.batches.create(requests=[
    {"custom_id": f"ticket-{t.id}",
     "params": {"model": "claude-sonnet-5-5", "max_tokens": 2000,
                "messages": [{"role": "user", "content": f"Summarize: {t.text}"}]}}
    for t in tickets
])
# later, once client.messages.batches.retrieve(batch.id).processing_status == "ended":
for result in client.messages.batches.results(batch.id):
    if result.result.type == "succeeded":
        save(result.custom_id, result.result.message)
```

Nightly summaries, evaluations, backfills, and bulk classification are ideal batch jobs.

### Model and effort, per route

After the free wins, the main levers are **effort** (Lesson 20) and **model choice**. Anthropic's
cost guidance suggests measuring the simple option first: the most capable model at **lower effort**
often matches an older or smaller setup, keeps one cache namespace (caches are per model), and avoids
routing complexity. Tune **per route**: chat and classification often do well at `low`, while coding
and long agentic work benefit from more.

### Long contexts

- **Count before you send:** `client.messages.count_tokens(...)` gives exact counts. Don't use other
  vendors' tokenizers, which undercount Claude tokens.
- **Trim inputs:** send the relevant sections, not whole archives.
- **Compaction** (beta) summarizes old context server-side as a conversation nears the limit, and
  **context editing** (beta) clears stale tool results. Both keep long agent runs within budget.

### Speed

- **Stream** responses so users see text immediately. Very large outputs (current models allow up to
  128K tokens) need streaming in the SDKs anyway, to avoid HTTP timeouts.
- **Smaller models and lower effort** reduce latency for simple routes.
- **Fast mode** (research preview, Claude API only) runs Opus 5.5 at up to **2.5× higher output speed**
  for premium pricing ($8 / $40 per MTok as of writing). It requires the beta flag
  `fast-mode-2026-02-01` and `speed="fast"`.

### Rate limits

Your organization has **rate limits** that rise with usage tier. Exceeding them returns **429** with a
`retry-after` header. The SDKs retry automatically (twice by default), so add backoff, spread load,
and use batches for bulk work. Check the Console's limits page and the rate-limits docs for your
numbers.

# Key Terminology

- **MTok** — one million tokens; the unit API prices are quoted in.
- **Prompt caching** — reusing a processed prompt prefix at a fraction of the input price.
- **Cache breakpoint** — a `cache_control` marker; everything before it can be cached.
- **TTL** — how long a cache entry lives (5 minutes by default, or 1 hour).
- **Batch API** — asynchronous processing at 50% off, results within 24 hours.
- **Cost per completed task** — total spend divided by successfully finished tasks, retries included.
- **Rate limit / 429** — the request-rate ceiling, and the error you get when you exceed it.

# Options and Trade-offs

| Lever | Typical savings | Quality cost | Best for |
| --- | --- | --- | --- |
| Prompt caching | Large on repeated prefixes | None | Big system prompts, documents, tools, long chats |
| Trimming inputs | Proportional to tokens removed | None if relevant parts kept | Bloated contexts and logs |
| Batch API | 50% | None (adds latency) | Anything that can wait hours |
| Lower effort | Varies by route | Possible on hard inputs | Simple, high-volume routes |
| Smaller model | Large | Possible | Classification, extraction, routing |
| Fast mode | Costs more | None | Latency-critical Opus work |

# Worked Example

**Support bot on Sonnet 5.5:** a **10,000-token** policy system prompt, a **500-token** question, and
a **400-token** answer, at 10,000 requests a day. Prices: input $2, output $10, cache read $0.10 per
MTok.

1. **No caching:** input 10,500 × $2/1M = $0.021, plus output 400 × $10/1M = $0.004, so **$0.025** a
   request, or about **$250/day**.
2. **Cache the policy prompt:** cached read 10,000 × $0.10/1M = $0.001, uncached question 500 ×
   $2/1M = $0.001, output $0.004, so about **$0.006** a request, or about **$60/day**. Cache writes add
   a little each time the entry expires.
3. **Result:** roughly a **75% cut** with no change in answer quality. Confirm it by watching
   `cache_read_input_tokens` in production.
4. **Bonus:** the nightly job that summarizes the day's tickets moves to the **Batch API**, which
   halves its cost.

# Real World Analogy

Think of a **restaurant's costs**. Caching is **prep work**: chop the onions for every dish once in the
morning instead of separately for each order. But change the recipe even slightly and the prep doesn't
fit anymore (the prefix match). Batching is **catering orders with a next-day deadline**, cooked in
bulk during quiet hours at half the cost. And choosing the model per route is staffing: you don't put
the head chef on the toaster.

# Examples

## Example 1 — Basic: turn on automatic caching

Add a top-level `cache_control={"type": "ephemeral"}` to a multi-turn chat request, send three turns,
and print `usage.cache_read_input_tokens` each time. It should grow as the shared history is reused.

**Why this works:** automatic caching moves the breakpoint forward as the conversation grows, with no
bookkeeping.

## Example 2 — Real-world: nightly evaluation as a batch

An evaluation suite of 2,000 test prompts runs each night with `client.messages.batches.create(...)`.
Results are matched by `custom_id` in the morning and scored, at **half price**.

**Why this works:** evaluations don't need instant answers, so the 50% discount is free money.

## Example 3 — Pitfall: the timestamp that killed the cache

A team adds `f"Current time: {datetime.now()}"` to the **top** of their system prompt. Cache reads
drop to zero, and costs jump back up.

**The fix:** move volatile content **after** the last breakpoint (for example, into the user message),
or remove it. Then verify that `cache_read_input_tokens` is above zero again.

# Common Mistakes

- **Volatile content early in the prompt**, such as timestamps, request IDs, or shuffled tools, which
  breaks caching.
- **Never checking cache usage fields**, so silent misses go unnoticed.
- **Real-time calls for batchable work**, paying double for nothing.
- **Judging cost per request** instead of per completed task.
- **Ignoring 429s** instead of backing off, or retrying in tight loops.

# Best Practices

- **Free wins first:** cache stable prefixes, trim inputs, and batch what can wait.
- Order prompts **stable → volatile**, and verify caching with `usage` fields.
- Set **effort and model per route**, measured on real samples.
- **Count tokens** with the official endpoint, and stream long outputs.
- Track **cost per completed task**, and build in **backoff** for rate limits.

# Summary

- Costs are **per million input and output tokens**; output is the pricier side, and thinking counts as output.
- **Prompt caching** is a **prefix match** (tools → system → messages): stable content first, verify
  with `cache_read_input_tokens`.
- The **Batch API** halves the price of anything that can wait (up to 24 hours; results by `custom_id`).
- Tune **effort and model per route**; manage long contexts with counting, trimming, and compaction.
- For speed, **stream**, use lighter settings, or **fast mode**; handle **429s** with backoff.

# Flash Cards

Q: What does "prompt caching is a prefix match" mean?
A: The cache is keyed on the exact bytes of the prompt up to each breakpoint, so any change in the prefix invalidates everything after it.

Q: In what order is a request rendered for caching?
A: Tools, then system, then messages.

Q: How do you verify that caching is working?
A: Check usage.cache_read_input_tokens; it should be above zero on repeated requests with the same prefix.

Q: What discount does the Batch API give, and how long can a batch take?
A: 50% off; most batches finish within an hour, with a 24-hour maximum.

Q: Why should you match batch results by custom_id?
A: Results can arrive in any order, so position isn't reliable.

Q: What's the right way to judge API spending?
A: Cost per completed task, including retries and extra turns, not cost per individual request.

# Exercises

### Easy
Send the same long system prompt twice within five minutes with caching on, and print the three
`usage` cache fields both times. Explain the difference.

### Medium
Find one batchable workload in a project of yours (summaries, classification, evaluation) and move it
to the Batch API. Compare the cost and the turnaround time.

### Challenging
For an application of your choice, build a cost model: tokens per request by route, a cache hit rate
measured in practice, the batchable share, and the current model and effort for each route. Propose
three changes ranked by savings, implement the top one, and measure the actual effect.

# Further Reading

- Anthropic — *Prompt caching*: <https://platform.claude.com/docs/en/build-with-claude/prompt-caching>
- Anthropic — *Batch processing*: <https://platform.claude.com/docs/en/build-with-claude/batch-processing>
- Anthropic — *Pricing*: <https://platform.claude.com/docs/en/about-claude/pricing>
- Anthropic — *Optimizing for cost and intelligence*:
  <https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence>
- Anthropic — *Rate limits*: <https://platform.claude.com/docs/en/api/rate-limits>
