# MYNAH — My Natural Authoring Helper

A plugin for [Claude](https://claude.ai) that learns how you write and composes
messages in your voice.

> **Platform:** Claude only (Cowork, Claude Code, Claude Desktop). MYNAH
> relies on Claude's plugin system and persistent memory tooling. It is not
> currently compatible with other LLMs or AI assistants.

## Why "MYNAH"?

The **hill mynah** (*Gracula religiosa*) is a mountain bird native to the
forested foothills of South and Southeast Asia, found at elevations up to
2,000 meters. It is widely regarded as the best vocal mimic in the bird
world, capable of reproducing human speech with more clarity and fidelity
than even the grey parrot.

The parallel is intentional: MYNAH doesn't generate generic text. It learns
*your* voice through direct exposure to your writing, then reproduces it
faithfully across different communication contexts.

MYNAH is part of a family of open-source tools from Percona Lab, all named
for mountain and alpine themes:

| Tool | Theme | Purpose |
|------|-------|---------|
| [IBEX](https://github.com/Percona-Lab/IBEX) | Alpine ibex | Integration Bridge for EXternal Systems. MCP server for connecting AI assistants to workplace tools |
| [PACK](https://github.com/Percona-Lab/DK-PACK) | Climber's backpack | Portable Agent Context Keeper. Persistent memory across AI sessions |
| **MYNAH** | Hill mynah | My Natural Authoring Helper. Learns and reproduces your writing voice |
| [BINER](https://github.com/Percona-Lab/BINER) | Carabiner | Beautiful Intelligent Notion Enhancement & Reformatting. Like Prettier, but for Notion |
| [SHERPA](https://github.com/Percona-Lab/SHERPA) | Mountain guide | Stakeholder Hub for Enhancement Request Prioritization & Action |

## What it does

Trains on samples of your actual writing (Slack messages, emails, Notion docs,
blog posts) and uses those patterns to draft new messages that sound like you.
Works in any language, and supports users who write differently across languages.

Supports ten communication contexts out of the box:

| Context | Description |
|---------|-------------|
| Slack DM → Technical peer | 1:1 with a dev, engineer, or technical colleague |
| Slack DM → Business/non-technical | 1:1 with a PM, exec, or non-technical colleague |
| Slack channel → Team/small group | Team channel, working group |
| Slack channel → Company-wide | All-hands, announcements, cross-org |
| Email → Internal | Colleagues and internal stakeholders |
| Email → External | Customers, partners, vendors |
| Notion / internal docs | Specs, wikis, meeting notes, PRDs |
| Inline comments | Feedback and reactions in Notion, Google Docs |
| Calendar invites | Event titles, descriptions, agendas |
| Blog / public writing | Published articles, developer posts |

## Privacy by design

**This plugin contains zero personal data.**

Your style profiles are stored in your own persistent memory (via
[PACK](https://github.com/Percona-Lab/DK-PACK) or equivalent), not in this
repo or in the plugin itself. The plugin is a generic framework; your voice
lives with you.

## Why use PACK?

MYNAH works out of the box using Claude's built-in memory, but installing
[PACK](https://github.com/Percona-Lab/DK-PACK) unlocks the full experience:

- **Any Claude interface can use your profiles.** PACK is an MCP server, so
  even a normal Claude chat session (claude.ai, Claude Desktop) can read your
  writing style and compose in your voice. Without PACK, profiles are only
  available inside the platform where you trained them.
- **Cross-platform.** Train once, use everywhere. Your profiles follow you
  across Claude Code, Cowork, Cursor, Open WebUI, and any MCP-compatible client.
- **Cross-project.** Claude's built-in memory is scoped per project directory.
  PACK memory is global, so your writing voice is available no matter which
  repo you're working in.
- **Version controlled.** PACK backs memory to a private GitHub repo. Full git
  history of every profile change, and you can clone it anywhere.
- **Shared context.** Other Alpine toolkit tools (like BINER) can read the same
  memory, enabling a connected workflow across tools.

Without PACK, MYNAH stores profiles in Claude's built-in memory. This works
for single-platform, single-project use, but profiles won't sync across
platforms or be accessible to other tools.

## Prerequisites

- **Claude** with plugin support (Cowork, Claude Code, or Claude Desktop)
- **Recommended:** [PACK](https://github.com/Percona-Lab/DK-PACK) for the benefits
  described above
- Optionally: **Slack, Gmail, Notion, or Google Drive connectors** for pulling
  writing samples directly rather than copy-pasting

## Installation

### One-liner (Claude Code / Cowork)

Open Claude Code or Cowork and prompt:

```
Install this plugin: https://github.com/Percona-Lab/MYNAH
```

Claude will clone the repo, copy the plugin files to `~/.claude/plugins/mynah/`,
and clean up. Done.

### Manual

1. Clone or download this repo
2. Copy the contents (everything except `.git/`, `README.md`, `LICENSE`) into
   `~/.claude/plugins/mynah/`
3. Restart Claude (or reload plugins)

## Getting started

### Quick start: paste samples

> "Learn how I write Slack DMs to developers. Here are some examples:"
> [paste 3–10 messages]

Claude will extract your style patterns and save them to your memory.

Repeat for each context you care about. You don't need to cover all ten,
start with the ones you use most.

### Autonomous training (recommended)

If you have messaging, email, calendar, or document tools connected to Claude,
MYNAH can train itself by pulling your real writing samples directly, no
copy-pasting needed.

Just prompt:

> "Train MYNAH on my writing using my connected tools. Search the last 3–6
> months of my messages, emails, calendar invites, and docs. Figure out which
> conversations are technical vs. business, which emails are internal vs.
> external, and build profiles for every context you find enough samples for."

Claude will:

1. **Discover your identity** across each connected platform
2. **Search your messages and documents** from the last few months
3. **Categorize automatically** into technical DMs vs. business DMs, team
   channels vs. company-wide, internal emails vs. customer emails, etc.
   It uses recipient roles, channel names, and conversation content to decide
4. **Read representative samples** for each context, pulling full message
   bodies where needed
5. **Extract style profiles** for every context with enough data (5+ samples)
6. **Save everything** to your persistent memory in one pass

This works with whatever tools you have connected: messaging apps, email,
calendar, document platforms. The more connections, the more contexts MYNAH
can learn. Even with just one or two connected tools, autonomous training
is faster and more accurate than pasting samples manually.

**Tips for autonomous training:**

- Grant read access to the tools you want MYNAH to learn from
- 3–6 months of history is the sweet spot. Enough to find patterns, not so
  much that it's noisy
- After training, review the summary Claude gives you. If a context feels
  off, paste a few manual corrections and re-learn
- You can re-run autonomous training any time to refresh profiles as your
  writing evolves

### Use it to draft messages

> "Draft a Slack message to my engineering lead about pushing the release date"

> "Write an email to a customer explaining the delay. Keep it short and direct"

> "Help me write a company announcement about the new roadmap"

Claude reads your stored profile for that context and drafts in your voice.

### Multilingual support

If you write in multiple languages, MYNAH can learn separate profiles per
language. Train it with samples in each language and it will match your voice
in each one, not just translate from English.

> "Learn how I write emails to our Brazil team. Here are some in Portuguese"

## How it works

MYNAH has two modes:

**LEARN mode**: You provide writing samples (pasted or pulled from connected
tools). MYNAH analyzes them across dozens of style dimensions (sentence rhythm,
formality, greeting patterns, punctuation habits, hedging behavior, and more)
and stores a compact style profile in your persistent memory.

**COMPOSE mode**: You describe what you need to write. MYNAH loads your style
profile for that context and drafts the message in your voice, applying your
actual patterns rather than a generic AI tone.

See `skills/mynah/SKILL.md` for the full technical specification.

## Tips

- **More samples = better profiles.** Aim for at least 5–8 per context.
- **Samples don't need to be curated.** Real, unedited messages work better than
  ones you've polished. The goal is to capture how you *actually* write.
- **Update profiles over time.** As your writing evolves, re-run LEARN mode
  with fresh samples to keep profiles current.
- **You can train specific sub-contexts.** If you write very differently to your
  CEO vs. your skip-level, name them differently in memory and train separately.

## Resetting a profile

Tell Claude: *"Delete my MYNAH profile for [context] and we'll retrain it"*

## Plugin Structure

```
mynah/
├── .claude-plugin/
│   └── plugin.json                   # Plugin metadata
└── skills/
    └── mynah/
        ├── SKILL.md                  # Main skill instructions
        └── references/
            ├── style-dimensions.md   # What to extract during learning
            ├── profile-schema.md     # Memory storage format
            ├── sample-collection.md  # Tool-specific sample pulling guidance
            └── context-guide.md      # Nuanced per-context composition guidance
```

## Built with

100% vibe coded with [Claude](https://claude.ai) (Opus).

## License

MIT
