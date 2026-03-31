# easyMCP

Scaffold production-ready MCP servers with polished cross-platform installers. Like `create-react-app` but for MCP servers.

## Install

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

Or run the CLI directly:

```bash
uvx easymcp init
```

## Source

https://github.com/Percona-Lab/easymcp
