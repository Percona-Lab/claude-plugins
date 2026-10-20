# Atlassian Artifacts

Makes Claude publish the HTML pages it makes (reports, dashboards, explainers, decks, prototypes) to **Atlassian Artifacts on percona.atlassian.net** instead of claude.ai Artifacts.

## Why

Percona runs several separate Claude workspaces, and a claude.ai Artifact made in one can't be opened from another. Every Perconian can open an Atlassian artifact through SSO. Publishing there makes sharing across workspaces just a link.

## What it does

The plugin has one skill, `publish`. It uses Atlassian's own connector and doesn't bundle one.

- **The default for HTML pages.** Ask for a claude.ai Artifact and you get one instead.
- **Asks who should see each new page:**
  - **Restricted** (the default): only you and the people you invite. Claude can invite named people.
  - **Anyone with the link:** any Perconian who has the link.
  - **Open:** any Perconian, and the page shows up in search.
- **Same link for updates.** Updating a page publishes a new version at the same link.
- **Share link only.** Claude returns only the `/share` link, never the raw download link, which works without sign-in for 24 hours.

Atlassian's API can't set **Anyone with the link** or **Open**. For those, Claude gives you the link, and you choose the option under **Share → General access**.

Tested end to end from Claude Code, Cowork and claude.ai chat: JavaScript runs, and the page needs an Atlassian sign-in to view.

## Setup (each Claude workspace)

1. **Allow the upload domain.** An admin adds `tdp-os.services.atlassian.com` under *Organization settings → Capabilities* (allowed domains). Claude in chat can't upload without it.
2. **Install the plugin.**
   - **claude.ai:** add it under *Organization settings → Plugins & skills* and set it to **Installed by default**.
   - **Claude Code:** run `/plugin install atlassian-artifacts@percona-lab`.
3. **Connect Atlassian.** Each person connects the Atlassian connector with access to **percona.atlassian.net**.

## Notes

- There's no delete tool. Delete artifacts in the Atlassian web interface.
- Links use IDs (`/artifacts/<id>/share`), not readable names.
