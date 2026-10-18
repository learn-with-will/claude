---
id: lesson-21
slug: tool-use-and-agents
title: "Tool Use and Agents on the API"
level: advanced
order: 21
duration: 26
tags:
  - tool-use
  - agent-loop
  - server-tools
  - agent-sdk
  - managed-agents
summary: "How Claude calls your functions and Anthropic's hosted tools: defining tools, the tool_use and tool_result loop, the SDK tool runner, server tools like web search and code execution, when an agent is worth it, and the four ways to build one, from a hand-written loop to the Agent SDK and Managed Agents."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Define **tools** with clear descriptions and JSON schemas.
- Run the **tool-use loop**: `tool_use` → execute → `tool_result` → continue.
- Use the SDK's **tool runner**, and know when to write the loop yourself.
- Add Anthropic's **server tools** (web search, web fetch, code execution).
- Decide **whether you need an agent**, and choose among the **four ways** to build one.

# Why It Matters

On its own, the API can only produce text. With **tools**, Claude can look up an order, query a
database, run code, search the web, or call your internal services, and then use the results to
finish the job. This is the foundation of every agent, including Claude Code itself. The decisions
here (how to describe tools, who runs the loop, how much autonomy to grant) determine whether your
system is reliable.

# Concept Explanation

### How tool use works

1. You send a request with a list of **tools** (name, description, input schema).
2. If Claude decides a tool would help, it responds with `stop_reason: "tool_use"` and one or more
   **`tool_use`** blocks containing the tool name and arguments.
3. **Your code runs the tool** and sends back a **`tool_result`** block (matched by `tool_use_id`).
4. Claude continues: it calls more tools or writes the final answer (`stop_reason: "end_turn"`).

### Defining a tool

```python
tools = [{
    "name": "get_order_status",
    "description": (
        "Look up the current status of a customer order by its order ID. "
        "Use when the user asks where their order is or when it will arrive. "
        "Returns status, carrier, and estimated delivery date."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "order_id": {"type": "string", "description": "Order ID, e.g. 'A-10293'"}
        },
        "required": ["order_id"],
        "additionalProperties": False,
    },
    "strict": True,  # guarantees the arguments validate against the schema
}]
```

**The description is the most important part.** Say what the tool does, *when* to use it, and what
it returns. Claude chooses tools from descriptions, much like skills.

### The loop, by hand

```python
messages = [{"role": "user", "content": "Where is my order A-10293?"}]

while True:
    response = client.messages.create(
        model="claude-opus-5-5", max_tokens=16000, tools=tools, messages=messages
    )
    if response.stop_reason != "tool_use":
        break  # end_turn, max_tokens, refusal, ... (handle pause_turn in real code)

    messages.append({"role": "assistant", "content": response.content})
    results = []
    for block in response.content:
        if block.type == "tool_use":
            output = run_tool(block.name, block.input)  # your implementation
            results.append({"type": "tool_result", "tool_use_id": block.id, "content": output})
    messages.append({"role": "user", "content": results})  # ALL results in ONE message

print(next(b.text for b in response.content if b.type == "text"))
```

Two rules from Anthropic's docs: when Claude makes **parallel tool calls**, return **all** the results
in a **single** user message, and when a tool fails, return a `tool_result` with `"is_error": True`
and a helpful message instead of dropping it.

### The tool runner (SDK helper)

The SDKs include a **tool runner** (beta) that runs this loop for you. In Python, decorate a typed
function and let the runner call it:

```python
from anthropic import beta_tool

@beta_tool
def get_order_status(order_id: str) -> str:
    """Look up the current status of a customer order.

    Args:
        order_id: Order ID, e.g. 'A-10293'.
    """
    return lookup(order_id)  # your implementation

runner = client.beta.messages.tool_runner(
    model="claude-opus-5-5",
    max_tokens=16000,
    tools=[get_order_status],
    messages=[{"role": "user", "content": "Where is my order A-10293?"}],
)
for message in runner:  # each iteration is one model turn
    print(message.content)
```

The schema is generated from the function signature and docstring. Write the loop yourself only when
you need control the runner doesn't give you.

### Tool choice on current models

`tool_choice` defaults to **`auto`**: Claude decides whether to call a tool. Forcing a call (`any`, or
a specific `tool`) **returns a 400 on Opus 5.5, Sonnet 5.5, and Fable 5.1**. Instead, keep `auto`,
say in the prompt which tool to use, and set `strict: true` for schema-valid arguments. If you only
forced a tool to get JSON back, use structured outputs (Lesson 20).

### Server tools: Anthropic runs them

Some tools run **on Anthropic's infrastructure**. You declare them, and the results arrive in the same
response, with no loop on your side:

```python
response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    tools=[{"type": "web_search_20260209", "name": "web_search", "max_uses": 5}],
    messages=[{"role": "user", "content": "What changed in the latest Python release? Cite sources."}],
)
```

The current versions include **web search** (`web_search_20260209`), **web fetch**
(`web_fetch_20260209`, for URLs already in the conversation), and **code execution**
(`code_execution_20260521`, a sandbox for running code and creating files). Server-tool errors come
back as result blocks, not exceptions, and long server-tool turns can stop with
`stop_reason: "pause_turn"`, which you resend to continue. Web search is billed per search ($10 per
1,000 as of writing) on top of tokens. The API can also connect directly to **remote MCP servers**
through its MCP connector (beta).

### Do you need an agent?

Anthropic's guidance is to **start simple**: a single call or a code-controlled workflow handles most
use cases. Reach for an agent, where the model drives an open-ended tool loop, only when all four
hold:

- **Complexity:** the task is multi-step and hard to fully specify in advance.
- **Value:** the outcome justifies higher cost and latency.
- **Viability:** Claude is capable at this kind of task.
- **Cost of error:** mistakes can be caught and recovered from (tests, review, rollback).

### Four ways to build an agent

| Approach | You write | Who runs the loop and the infrastructure |
| --- | --- | --- |
| **Manual loop** (Messages API) | The whole loop | You build and host everything |
| **Tool runner** (client SDK, beta) | Just your tool functions | SDK runs the loop; you host |
| **Claude Agent SDK** | A prompt and options | Claude Code's full harness and built-in tools, as a library; you host |
| **Managed Agents** (beta) | An agent config and your tool results | Anthropic runs the loop **and** hosts a sandbox per session |

The **Agent SDK** (`pip install claude-agent-sdk`, or `@anthropic-ai/claude-agent-sdk`) gives you
Claude Code's agent loop and built-in tools (read, edit, bash, search) in your own code:

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions, AssistantMessage, ResultMessage

async def main():
    async for message in query(
        prompt="Review utils.py for bugs that would cause crashes. Fix any issues you find.",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Glob"],
            permission_mode="acceptEdits",
        ),
    ):
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if hasattr(block, "text"):
                    print(block.text)
        elif isinstance(message, ResultMessage):
            print("Done:", message.subtype)

asyncio.run(main())
```

It authenticates with an **API key** (or a cloud provider). Unless previously approved by Anthropic,
third-party products may not offer claude.ai login or subscription rate limits. **Managed Agents**
stores versioned agent configs and runs each session in an Anthropic-hosted container, which suits
long-running, scheduled, or file-heavy agents. The portal's **AI Agents** course goes much deeper on
agent design.

# Key Terminology

- **Tool** — a function you describe (name, description, JSON schema) that Claude can ask to call.
- **`tool_use` / `tool_result`** — Claude's request to call a tool, and your reply with the output.
- **Tool runner** — the SDK helper that runs the tool-call loop for you (beta).
- **Server tool** — a tool Anthropic hosts, such as web search, web fetch, or code execution.
- **`strict: true`** — guarantees tool arguments match the schema.
- **Agent** — a system where the model drives an open-ended loop of tool calls toward a goal.
- **Claude Agent SDK / Managed Agents** — Claude Code's harness as a library, and Anthropic-hosted agents.

# Options and Trade-offs

| Need | Choose | Trade-off |
| --- | --- | --- |
| One fixed lookup per request | A workflow you code (call, tool, call) | Least flexible, most predictable |
| Custom tools, minimal code | Tool runner | Beta helper; less control over each turn |
| Full control of every turn | Manual loop | More code to own and test |
| A coding or filesystem agent | Agent SDK | You host it; API-key auth |
| Hosted, long-running, or scheduled agents | Managed Agents | Beta; files are uploaded or a repo is mounted |
| Current info or calculations | Server tools (web search, code execution) | Extra per-use costs; handle `pause_turn` |

# Worked Example

**Goal:** a support assistant that answers order questions accurately.

1. **Start as a workflow:** most questions are "where is my order?", so define one tool,
   `get_order_status`, with a precise description and `strict: true`.
2. **Use the tool runner** with a system prompt: "Answer only from tool results. If an order isn't
   found, say so and offer to connect a human."
3. **Handle failures:** the tool returns `is_error: true` with "Order not found. Check the ID format
   A-#####" so Claude can recover gracefully.
4. **Add a second tool** (`request_refund`) behind a human approval step in your code, because refunds
   cost money (the "cost of error" criterion).
5. **Evaluate:** run 100 real past questions, measure correct answers and wrong tool calls, and only
   then consider more autonomy.

# Real World Analogy

Tool use is like a **manager working with a team over a ticket system**. The manager (Claude) can't
open the warehouse database themselves, but they can file a ticket: "check order A-10293." Your code
is the warehouse clerk who does the lookup and writes back the result. Good ticket templates (tool
descriptions) mean the right ticket goes to the right clerk. An agent is a manager trusted to keep
filing tickets until the whole job is done, which works well, as long as expensive or irreversible
tickets still need a supervisor's signature.

# Examples

## Example 1 — Basic: one tool, one lookup

Define `get_weather(city)`, ask "Should I bring an umbrella in Seattle today?", execute the
`tool_use` Claude returns, send the `tool_result`, and read Claude's final answer.

**Why this works:** it's the smallest complete loop: tool definition, call, result, answer.

## Example 2 — Real-world: research with a server tool

Add `{"type": "web_search_20260209", "name": "web_search", "max_uses": 5}` and ask for a cited
summary of a recent standards change. Claude searches, reads, and cites, all in one API call.

**Why this works:** Anthropic runs the search tool, so you get current, cited information without
writing any loop code.

## Example 3 — Pitfall: forcing a tool on a new model

Code migrated from an older model sets `tool_choice={"type": "tool", "name": "extract"}` to force JSON
extraction. On Opus 5.5 it returns a **400**.

**The fix:** use `tool_choice` `auto` with a prompt instruction and `strict: true`, or, since the goal
was JSON, switch to **structured outputs** (`output_config.format`).

# Common Mistakes

- **Vague tool descriptions,** which lead to wrong or missing tool calls.
- **Splitting parallel tool results** across several messages instead of one.
- **Dropping failed tool calls** instead of returning `is_error: true` with guidance.
- **Forcing `tool_choice`** on models that reject it.
- **Building an agent first** when a simple workflow would be cheaper and more reliable.

# Best Practices

- Write tool descriptions that say **what, when, and what it returns**; use `strict: true`.
- Prefer the **tool runner** for custom tools; drop to a manual loop only when needed.
- Return **all parallel results together**, and **errors as `is_error` results**.
- Gate **costly or irreversible** tools behind human approval in your code.
- **Start with the simplest tier** (call, workflow, then agent) and add autonomy only after evaluation.

# Summary

- Tools let Claude request actions: **`tool_use`** → your code runs it → **`tool_result`** → Claude continues.
- **Descriptions** drive tool choice; **`strict: true`** guarantees valid arguments.
- The **tool runner** automates the loop; **server tools** (web search, web fetch, code execution) run
  on Anthropic's side.
- Forced **`tool_choice`** returns 400 on Opus 5.5, Sonnet 5.5, and Fable 5.1; use `auto` plus instructions.
- Build agents only when **complexity, value, viability, and recoverable errors** justify it, using a
  manual loop, the tool runner, the **Agent SDK**, or **Managed Agents**.

# Flash Cards

Q: What stop_reason tells you Claude wants to call a tool?
A: "tool_use"; the response contains tool_use blocks with the tool name, input, and an id.

Q: How must you return results when Claude makes several tool calls at once?
A: Send all the tool_result blocks together in a single user message, each matched by tool_use_id.

Q: How should you report a tool that failed?
A: Return a tool_result with "is_error": true and a helpful message, rather than dropping it.

Q: Why does forcing tool_choice fail on Claude Opus 5.5?
A: Forced tool choice (any or a specific tool) returns a 400 on Opus 5.5, Sonnet 5.5, and Fable 5.1; use auto with a prompt instruction and strict: true.

Q: What's a server tool?
A: A tool Anthropic runs on its own infrastructure, such as web search, web fetch, or code execution; results come back in the same response.

Q: What are the four criteria for deciding to build an agent?
A: Complexity (hard to specify in advance), value (worth the cost), viability (Claude is good at it), and cost of error (mistakes are catchable and recoverable).

# Exercises

### Easy
Implement a single `get_time(timezone)` tool and run the full loop by hand. Print each block type you
receive along the way.

### Medium
Rebuild it with the **tool runner** and add a second tool. Make one tool fail on purpose and confirm
that returning `is_error: true` lets Claude recover and explain the problem.

### Challenging
Take a real multi-step task (for example, "find our three oldest open issues and draft a status note
for each"). Implement it twice: as a fixed workflow you code, and as an agent with tools. Compare
correctness, cost (from `usage`), and latency on ten runs, then argue which you'd ship and why.

# Further Reading

- Anthropic — *Tool use overview*: <https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview>
- Anthropic — *Building effective agents*: <https://www.anthropic.com/engineering/building-effective-agents>
- Claude Code docs — *Agent SDK overview*: <https://code.claude.com/docs/en/agent-sdk/overview>
- Anthropic — *Managed Agents overview*: <https://platform.claude.com/docs/en/managed-agents/overview>
- Learning Portal — *AI Agents* course: <https://learn-with-will.github.io/ai-agents/>
