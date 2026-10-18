---
id: lesson-23
slug: building-mcp-servers
title: "Building Your Own MCP Server"
level: advanced
order: 23
duration: 24
tags:
  - mcp
  - mcp-server
  - python-sdk
  - claude-desktop
  - tool-design
summary: "How to give Claude access to your own data and tools with the Model Context Protocol: hosts, clients, and servers; tools, resources, and prompts; stdio versus Streamable HTTP; building a small server with the Python SDK; connecting it to Claude Desktop, Claude Code, and claude.ai; and designing and securing it well."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Explain MCP's **architecture**: hosts, clients, servers, and the two **transports**.
- Choose between the server **primitives**: tools, resources, and prompts.
- Build a small MCP server with the **Python SDK**.
- Connect it to **Claude Desktop**, **Claude Code**, and (remotely) **claude.ai**.
- Design tools that Claude uses well, and **secure** your server.

# Why It Matters

Connectors (Lesson 12) let Claude use other people's services. An MCP server lets Claude use
**yours**: an internal database, a ticket system, a folder of notes, a lab instrument. Because MCP is
an open standard, one server works across Claude Desktop, Claude Code, claude.ai custom connectors,
and other MCP-compatible applications. Build once, use everywhere.

# Concept Explanation

### Architecture in one picture

MCP's docs describe a client-server model:

- **Host:** the AI application, such as Claude Desktop or Claude Code.
- **Client:** a connection the host creates for **each** server it talks to.
- **Server:** a program that provides context and capabilities. It can run locally or remotely.

Messages use **JSON-RPC 2.0**. As of the protocol version **2026-07-28**, MCP is **stateless**: every
request carries the protocol version and capabilities in its metadata, and servers describe themselves
through a `server/discover` request. The SDKs handle these details for you.

### Two transports

- **stdio:** the host **launches the server as a local process** and talks over standard input and
  output. This is typical for local tools, and it serves a single client.
- **Streamable HTTP:** the server runs as a web service, HTTP POST for client messages with optional
  Server-Sent Events for streaming. This is typical for **remote** servers serving many clients. It
  supports standard HTTP authentication, and MCP **recommends OAuth** for obtaining tokens.

### Three server primitives (and one client primitive)

- **Tools:** executable functions Claude can call (query a database, create a ticket).
- **Resources:** read-only data that provides context (a file's contents, a schema).
- **Prompts:** reusable templates (a few-shot example, a standard request).

Clients can offer **elicitation**, which lets a server ask the user for more input or confirmation.
**Sampling** (a server asking the client's model for completions) and **logging** are **deprecated** as
of 2026-07-28: new servers should call model APIs directly, and log to **stderr** or use OpenTelemetry.

### Build a server with the Python SDK

The official quickstart uses Python 3.10+ and **MCP Python SDK 2.0 or later**:

```bash
uv init notes-server
cd notes-server
uv add "mcp[cli]"
```

Here is a small, read-only server that lets Claude search and read a folder of Markdown notes:

```python
import logging
from pathlib import Path

from mcp.server import MCPServer

logging.basicConfig(level=logging.INFO)  # writes to stderr; never print() in a stdio server
logger = logging.getLogger(__name__)

NOTES_DIR = (Path.home() / "notes").resolve()
mcp = MCPServer("notes")


@mcp.tool()
async def search_notes(query: str, limit: int = 5) -> str:
    """Search my Markdown notes for a word or phrase (case-insensitive).

    Args:
        query: Text to look for.
        limit: Maximum number of matching notes to return.
    """
    hits = []
    for path in sorted(NOTES_DIR.glob("*.md")):
        text = path.read_text(encoding="utf-8", errors="ignore")
        if query.lower() in text.lower():
            hits.append(f"{path.stem}: {text[:200].strip()}")
        if len(hits) >= limit:
            break
    logger.info("search_notes %r -> %d hits", query, len(hits))
    return "\n\n".join(hits) or "No notes matched."


@mcp.tool()
async def read_note(name: str) -> str:
    """Return the full text of one note.

    Args:
        name: The note's file name without .md, as returned by search_notes.
    """
    path = (NOTES_DIR / f"{name}.md").resolve()
    if path.parent != NOTES_DIR or not path.is_file():  # blocks ../ path tricks
        return f"Error: no note named {name!r}. Use search_notes to find valid names."
    return path.read_text(encoding="utf-8", errors="ignore")


if __name__ == "__main__":
    mcp.run(transport="stdio")
```

The SDK turns **type hints and docstrings into tool definitions** automatically, so the docstrings
*are* your tool descriptions. The most important rule for stdio servers, from the MCP docs: **never
write to stdout**, because it corrupts the JSON-RPC messages. Use `logging`, which writes to stderr.

### Connect it to Claude Desktop

Add the server under `mcpServers` in Claude Desktop's config file
(`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS,
`%APPDATA%\Claude\claude_desktop_config.json` on Windows), using **absolute paths**, then restart the app:

```json
{
  "mcpServers": {
    "notes": {
      "command": "uv",
      "args": ["--directory", "/ABSOLUTE/PATH/TO/notes-server", "run", "server.py"]
    }
  }
}
```

### Connect it to Claude Code

```bash
claude mcp add --transport stdio notes -- uv --directory /ABSOLUTE/PATH/TO/notes-server run server.py
```

Add `--scope project` to share it through `.mcp.json`, and run `/mcp` to check its status.

### Going remote: a custom connector

To use the server from **claude.ai**, mobile, or Cowork, deploy it over **Streamable HTTP** to a
**publicly reachable** URL, protect it with authentication (OAuth recommended), and add it under
**Customize > Connectors > Add > Custom > Web**. Remember that Claude connects from **Anthropic's
cloud**, not from your laptop.

### Design tools Claude uses well

- **Clear, specific names.** The MCP docs favor names like `calculator_arithmetic` over `calculate`.
- **Descriptions that say what, when, and what's returned.** Claude chooses tools from them.
- **Tight input schemas,** with required fields, enums, and documented formats.
- **Helpful errors** that tell Claude how to recover ("Use search_notes to find valid names").
- **Few, focused tools,** plus resources for read-only context and prompts for common requests.
- **Pair it with a skill** (Lesson 13) that teaches *how* to use your server well.

### Secure it

- **Least privilege:** expose only what's needed, and prefer read-only tools.
- **Validate every input,** including path traversal, size limits, and allowed values.
- **Treat tool calls as untrusted:** prompt injection elsewhere could steer Claude into calling your
  tools, so gate destructive actions behind confirmation (elicitation) or keep them out.
- **Authenticate remote servers,** never embed secrets in code, and log to stderr.

# Key Terminology

- **MCP host** — the AI application (Claude Desktop, Claude Code) that connects to servers.
- **MCP client** — the per-server connection the host maintains.
- **MCP server** — a program exposing tools, resources, and prompts.
- **stdio transport** — local communication over standard input/output.
- **Streamable HTTP transport** — remote communication over HTTP POST with optional SSE streaming.
- **Tools / resources / prompts** — executable functions, read-only context, and reusable templates.
- **Elicitation** — a server asking the user for more information or confirmation.

# Options and Trade-offs

| Choice | Pros | Cons |
| --- | --- | --- |
| Local stdio server | Simple; works with local files and apps | Only on that machine (Desktop, Claude Code) |
| Remote Streamable HTTP server | Works on every surface, for many users | Needs hosting, a public URL, and authentication |
| Many small tools | Precise actions | More choices for Claude, and more descriptions to maintain |
| Few broad tools | Simpler | Vaguer behavior and harder validation |
| Read-only tools | Safe by default | Can't complete write workflows |
| Write tools | End-to-end automation | Need confirmation, validation, and audit logs |

# Worked Example

**Goal:** let Claude use your team's runbooks during incidents.

1. **Scope it read-only:** two tools, `search_runbooks(query)` and `get_runbook(name)`, plus a resource
   listing all runbook titles.
2. **Build** it with the Python SDK as above, pointing at the runbook folder, and test it locally in
   Claude Desktop: "Find the runbook for a full database disk."
3. **Refine descriptions** after watching which tool Claude picks and why.
4. **Share in Claude Code** via `claude mcp add --scope project …`, committed as `.mcp.json`.
5. **Go remote** once the team relies on it: deploy over Streamable HTTP behind company SSO/OAuth, and
   add it as a custom connector so on-call engineers can use it from their phones.

# Real World Analogy

An MCP server is like building a **standard electrical outlet into your own equipment**. Once your
device has the standard socket (the protocol), any compatible appliance (Claude Desktop, Claude Code,
claude.ai, other hosts) can plug in, with no custom wiring for each one. A local server is an outlet
on your own desk. A remote server is one in the office hallway that everyone can use, which is why it
needs a lock (authentication) and a breaker (validation and limits).

# Examples

## Example 1 — Basic: a one-tool server

Start from the quickstart: a single `@mcp.tool()` function such as `word_count(text: str) -> str`,
`mcp.run(transport="stdio")`, and the Claude Desktop config. Ask Claude to count the words in a
paragraph and watch it call your tool.

**Why this works:** it's the smallest complete loop, from tool definition to host connection to call.

## Example 2 — Real-world: the notes server in Claude Code

With the notes server added to Claude Code, a developer asks: "Search my notes for the staging
deploy steps and follow them to deploy this branch." Claude calls `search_notes`, then `read_note`,
then runs the steps, using personal knowledge that never had to be pasted in.

**Why this works:** MCP brings your private context to Claude in a structured, reusable way.

## Example 3 — Pitfall: the stray print()

A developer adds `print("got request")` for debugging. The server starts, but Claude Desktop shows
connection errors and tools never respond.

**The fix:** in a stdio server, stdout carries the protocol's JSON-RPC messages, so any `print()`
corrupts them. Log with `logging` (stderr) instead.

# Common Mistakes

- **Printing to stdout** in a stdio server.
- **Relative paths** in the Claude Desktop config. Use absolute paths, and restart the app.
- **Vague tool names and descriptions** that make Claude pick the wrong tool.
- **No input validation**, which allows path traversal, huge inputs, or unexpected values.
- **Exposing a remote server without authentication**, or behind a network Anthropic's cloud can't reach.

# Best Practices

- Start **local and read-only**; add write tools with **confirmation** and **validation** later.
- Let **docstrings and type hints** produce clear, precise tool definitions.
- Return **actionable error messages** that help Claude recover.
- Use **resources** for reference data and **prompts** for common requests, not only tools.
- For remote servers, use **Streamable HTTP + OAuth**, and follow MCP's security best practices.

# Summary

- MCP connects **hosts** (Claude Desktop, Claude Code) to **servers** through per-server **clients**, over
  **JSON-RPC 2.0**.
- Transports: **stdio** for local servers, **Streamable HTTP** for remote ones (OAuth recommended).
- Servers expose **tools**, **resources**, and **prompts**; **sampling** is deprecated as of 2026-07-28.
- The Python SDK's **`MCPServer`** with `@mcp.tool()` builds servers from typed, documented functions;
  **never print to stdout**.
- Connect via **`claude_desktop_config.json`**, **`claude mcp add`**, or a **custom connector** for remote servers.

# Flash Cards

Q: What are the three participants in MCP's architecture?
A: The host (the AI application), a client per server connection, and the server that provides context and tools.

Q: What are MCP's two transports, and when is each used?
A: stdio for local servers launched as processes, and Streamable HTTP for remote servers serving many clients.

Q: Name the three primitives a server can expose.
A: Tools (executable functions), resources (read-only context data), and prompts (reusable templates).

Q: Why must a stdio server never print to stdout?
A: stdout carries the JSON-RPC protocol messages, so extra output corrupts them; log to stderr instead.

Q: How does the Python SDK create tool definitions?
A: From your function's type hints and docstring, when you decorate it with @mcp.tool().

Q: What does a remote server need before you can add it as a claude.ai custom connector?
A: A publicly reachable URL (Claude connects from Anthropic's cloud) and appropriate authentication, ideally OAuth.

# Exercises

### Easy
Build the one-tool `word_count` server, connect it to Claude Desktop or Claude Code, and ask Claude
to use it. Confirm the tool call appears in the conversation.

### Medium
Build the notes server against a folder of five or more Markdown files. Try a prompt that should use
`search_notes` and then `read_note`, and try a malicious name like `../secrets` to confirm the
validation works.

### Challenging
Design a remote MCP server for a real team need: list its tools, resources, and prompts; write the
descriptions; decide which actions need confirmation; and plan authentication and hosting. Implement
one read-only tool end to end, and write the companion skill that teaches Claude how to use the server.

# Further Reading

- Model Context Protocol — *Architecture overview*:
  <https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture>
- Model Context Protocol — *Build an MCP server*:
  <https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server>
- Model Context Protocol — *Security best practices*:
  <https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices>
- Claude Code docs — *Connect tools via MCP*: <https://code.claude.com/docs/en/mcp>
- Claude Help Center — *Use connectors to extend Claude's capabilities*:
  <https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities>
