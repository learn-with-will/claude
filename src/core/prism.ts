// Prism core + the languages the Claude lessons use. `python` and `typescript`
// cover the Claude API, Agent SDK, and MCP examples. `bash` covers installs,
// the `claude` CLI, and shell commands. `json` covers API bodies, tool schemas,
// and Claude Code / Claude Desktop config files. `markdown` covers CLAUDE.md,
// SKILL.md, and subagent files; `yaml` covers CI workflows. Plain `text`
// fences (prompts, transcripts, console output) are left unhighlighted.
//
// PrismJS core already ships the `javascript` grammar that `typescript`
// extends and the `markup` grammar that `markdown` extends, so importing these
// components alone is enough.
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';
import 'prismjs/themes/prism-tomorrow.css';

export default Prism;
