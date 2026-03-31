---
name: easymcp
description: >
  Scaffold production-ready MCP server projects with polished cross-platform
  installers. Use this skill when the user wants to create a new MCP server,
  scaffold an MCP project, build a documentation search tool, or create
  something like percona-dk for their own docs. Trigger phrases: "create an
  MCP server", "scaffold MCP", "new MCP project", "build a doc search MCP",
  "like percona-dk but for", "easymcp", "easy mcp". This skill runs the
  easyMCP CLI interactively or guides manual scaffolding.
---

# easyMCP — Scaffold Production-Ready MCP Servers

Like `create-react-app` but for MCP servers. Generates a complete project
with a polished cross-platform installer, incremental ingestion pipeline,
MCP server, REST API, and all the operational polish from percona-dk.

Source: https://github.com/Percona-Lab/easymcp

---

## Overview

easyMCP generates standalone MCP server projects from interactive prompts.
Every generated project includes:

- **One-liner install** (`curl | bash` / `irm | iex` bootstrap scripts)
- **Cross-platform installer** with ANSI colors, stack selection UI, parallel
  GitHub API fetching, time/disk estimates, progress bars, AI client auto-detection
- **Incremental ingestion** pipeline with SHA256 file hashing
- **MCP server** with background auto-refresh
- **REST API** with /search, /health, /stats endpoints
- **Source suggestions** when search results are weak

Two language templates:
- **Python**: FastMCP + ChromaDB + FastAPI
- **Node.js**: @modelcontextprotocol/sdk + ChromaDB + Express

---

## How to Use

### Option 1: Run the CLI (recommended)

If `uv` is installed:

```bash
uvx easymcp init
```

If `uv` is not installed, install it first:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Node.js users can also use:

```bash
npx easymcp init
```

The CLI will interactively prompt for:
1. **Project name** and description
2. **Language** — Python or Node.js
3. **GitHub repo URL** — where the generated project will live
4. **Documentation stacks** — groups of GitHub repos containing Markdown docs
5. **Auto-refresh interval** — how often to check for doc updates (default: 7 days)
6. **Author name**

Then generates the complete project directory.

### Option 2: Manual scaffolding with Claude

If the user can't or doesn't want to run the CLI, guide them through creating
the project manually. Use the easyMCP repo as a reference for template structure.

The key files to create for a Python MCP server project:

1. `install-<project-slug>` — Bash bootstrap script
2. `install-<project-slug>.ps1` — PowerShell bootstrap script
3. `installer.py` — Cross-platform interactive installer
4. `pyproject.toml` — Package config with CLI entry points
5. `src/<package_name>/mcp_server.py` — FastMCP server with auto-refresh
6. `src/<package_name>/ingest.py` — Incremental ingestion pipeline
7. `src/<package_name>/server.py` — FastAPI REST API
8. `src/<package_name>/source_registry.py` — Keyword-based source suggestions
9. `README.md`, `LICENSE`, `.gitignore`, `.env.example`

For Node.js, replace Python files with:
- `package.json`, `src/mcp-server.js`, `src/ingest.js`, `src/server.js`, `src/source-registry.js`

---

## What Gets Generated

For a project called "acme-docs" with Python:

```
acme-docs/
  install-acme-docs          # Bash bootstrap (curl|bash)
  install-acme-docs.ps1      # PowerShell bootstrap (irm|iex)
  installer.py               # Cross-platform interactive installer
  pyproject.toml             # Package with CLI entry points
  README.md                  # Install instructions + MCP config examples
  LICENSE, .gitignore, .env.example
  src/acme_docs/
    mcp_server.py            # FastMCP server with auto-refresh
    ingest.py                # Incremental ingestion (file hashing, ChromaDB)
    server.py                # FastAPI REST API
    source_registry.py       # Source suggestions for weak results
```

---

## Key Concepts

### Data Sources
A data source is a GitHub repository containing Markdown documentation.
Each source has: slug (owner/repo), display name, keywords (for search
suggestions), and approximate doc count (for time estimates).

### Stacks
A stack is a group of related data sources. During installation, users
can install/skip each stack independently. Example: "MySQL stack" might
contain psmysql-docs, pxc-docs, pxb-docs.

### Installer UX
The generated installer.py is a self-contained Python script (stdlib only)
that handles the full installation flow:
- Prerequisites check (git + uv/node)
- Git clone/pull with rerun detection
- Virtual env setup (Python) or npm install (Node.js)
- .env management
- Parallel GitHub API fetching for doc counts
- Interactive stack selection with review loop
- AI client auto-detection (Claude Desktop + Claude Code)
- Ingestion with progress bars

### Template Engine
easyMCP uses Jinja2 with alternate delimiters to avoid conflicts:
- `<% %>` for blocks (instead of `{% %}`)
- `<< >>` for variables (instead of `{{ }}`)
- `<# #>` for comments

---

## After Scaffolding

Tell the user their next steps:

1. `cd <project-dir>` and review the generated code
2. Customize `source_registry.py` / `source-registry.js` with real keywords
3. Update `_build_page_url()` / `buildPageUrl()` in ingest to match their docs site URL pattern
4. `git init && git add -A && git commit -m "Initial scaffold"`
5. Push to GitHub
6. Users install with: `curl -fsSL https://raw.githubusercontent.com/<owner>/<repo>/main/install-<slug> | bash`
