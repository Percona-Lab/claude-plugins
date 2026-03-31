# easyMCP

Scaffold production-ready MCP servers with polished cross-platform installers. Like `create-react-app` but for MCP servers.

## Install

In Claude Code:

```
Install this plugin: https://github.com/Percona-Lab/claude-plugins
```

Or manually:

```bash
git clone https://github.com/Percona-Lab/claude-plugins.git /tmp/claude-plugins
cp -r /tmp/claude-plugins/plugins/easymcp ~/.claude/plugins/easymcp/
rm -rf /tmp/claude-plugins
```

## Usage

In Claude Code, say:

- "Create a new MCP server for our API docs"
- "Scaffold an MCP project like percona-dk"
- "I want to build a doc search tool for our GitHub repos"

Or download the CLI from the [latest release](https://github.com/Percona-Lab/easymcp/releases/latest) and run directly:

```bash
curl -fsSL -o /tmp/easymcp.whl https://github.com/Percona-Lab/easymcp/releases/latest/download/easymcp-0.1.0-py3-none-any.whl
uvx --from /tmp/easymcp.whl easymcp init
```

## Source

https://github.com/Percona-Lab/easymcp
