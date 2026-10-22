# Atlassian Artifacts

Makes Claude publish the HTML pages it makes (reports, dashboards, explainers, decks, prototypes) to **Atlassian Artifacts on percona.atlassian.net** instead of claude.ai Artifacts. Any Perconian can open those, whichever Claude workspace they're in.

## Install

Pick **one**. Option 1 covers chat, Cowork and Claude Code at once.

### 1. In claude.ai (recommended)

1. In claude.ai (web or desktop app), open **Customize → Plugins → Add → Add marketplace**.
2. Enter `Percona-Lab/claude-plugins`.
3. Find **atlassian-artifacts** and click **Install**.

The install is saved to your Claude account. It works in chat and Cowork, and in Claude Code when you're signed in with the same account.

### 2. Upload the skill file

If you can't add a marketplace:

1. Download **[atlassian-artifacts-skill.zip](https://github.com/Percona-Lab/claude-plugins/raw/main/plugins/atlassian-artifacts/atlassian-artifacts-skill.zip)**.
2. In claude.ai, open **Customize → Skills → + → Create skill → Upload a skill**.
3. Choose the zip.

### 3. Claude Code only

Paste this into a terminal:

```bash
claude plugin install atlassian-artifacts --marketplace Percona-Lab/claude-plugins
```

Needs Claude Code 2.1.292 or later; run `claude --version` to check. If cloning fails, use `--marketplace https://github.com/Percona-Lab/claude-plugins.git` instead.

## One-time setup

- **Connect Atlassian.** In claude.ai, open **Customize → Connectors**, connect **Atlassian**, and include the **percona.atlassian.net** site.
- **Chat only:** your Claude workspace must allow `tdp-os.services.atlassian.com`. A workspace admin adds it once under **Organization settings → Capabilities**. Without it, Claude tells you the upload was blocked.

## Use it

Ask Claude for any HTML page, for example "make a one-page summary of this and publish it". Claude then:

1. Asks who should see it:
   - **Restricted** (the default): only you and the people you invite.
   - **Anyone with the link:** any Perconian who has the link.
   - **Open:** any Perconian, and the page shows up in search.
2. Publishes the page and gives you the link.

Atlassian's API can't set **Anyone with the link** or **Open**. For those, open the link and choose the option under **Share → General access**.

To update a page, ask Claude to update it. It publishes a new version at the same link.

To get a claude.ai Artifact instead, just ask for one.

## Notes

- **Why it exists:** Percona has several Claude workspaces, and claude.ai Artifacts can't be shared between them.
- **Deleting:** there's no delete tool. Delete artifacts in the Atlassian web interface.
- **Maintainers:** after editing `skills/publish/SKILL.md`, run `./package.sh` and commit the rebuilt zip.
