---
name: publish
description: Publish HTML pages to Atlassian Artifacts on percona.atlassian.net instead of claude.ai Artifacts. Use by default whenever you would make an HTML page or artifact for a Perconian or their team — a report, dashboard, explainer, slide deck, prototype, one-pager, tracker — and when the user says "publish", "share this", "put this in Atlassian", "update the page", or asks for a link to a page you made. Percona has several Claude workspaces and claude.ai Artifacts can't be shared across them; Atlassian Artifacts open for any Perconian with SSO. Also use to publish a new version of, or share, an Atlassian artifact.
---

# Publish HTML to Atlassian Artifacts

Percona runs several Claude workspaces, and a claude.ai Artifact made in one can't be opened from another. Atlassian Artifacts on **percona.atlassian.net** can be opened by any Perconian through SSO, so **make HTML pages as Atlassian artifacts by default**. Use a claude.ai Artifact only when the user asks for one, or the page needs Artifact-only features (shared database, comments, `window.claude`).

Publish with the **Atlassian connector**. Its artifact operations are `createArtifactsUpload`, `publishArtifact`, `shareArtifact`, `getArtifact` and `listArtifacts`. If they aren't in your tool list, find them with the connector's `discover` tool and run them through `executeWrite` / `executeRead`. Always pass `cloudId: "https://percona.atlassian.net"`.

## 1. Ask who should see it, every time

Before publishing, unless the user already said, ask which general access they want. Use a question tool if you have one; otherwise ask in one short message.

| Option | Who can open it | How it's applied |
|---|---|---|
| **Restricted** (default) | Only the owner and people they invite | Automatic: new artifacts start Restricted. You can invite named people (step 4). |
| **Anyone with the link** | Any Perconian who has the link | The user clicks it in the share dialog (step 4) |
| **Open** | Any Perconian, and the page shows up in search | The user clicks it in the share dialog (step 4) |

The API can't set "Anyone with the link" or "Open". Say so up front, so the user knows a click is coming.

When updating an existing artifact, don't ask again. Its access setting stays as it is.

## 2. Build one self-contained HTML file

- Inline CSS, JavaScript, images (as `data:` URIs) and data. JavaScript runs in Artifacts.
- Give the page a `<title>`.
- Save it to a file. The upload needs the exact bytes, so don't retype the HTML between steps.

## 3. Upload and publish

1. **Measure the exact bytes** of the file you'll upload:
   ```bash
   wc -c < page.html                                          # length in bytes
   openssl dgst -sha256 -binary page.html | openssl base64 -A  # base64 SHA-256 checksum
   ```
   In Python: `len(data)` and `base64.b64encode(hashlib.sha256(data).digest())`, where `data` is the UTF-8 bytes.
2. **Create the upload:** `createArtifactsUpload(cloudId, length, checksum)`. It returns a pre-signed `url` and `completionPayload.contentId`. The URL expires after about 15 minutes, so upload right away.
3. **Upload the file:**
   ```bash
   curl --fail --request PUT --header "Content-Type: text/html" --data-binary "@page.html" "$URL"
   ```
4. **Publish:** `publishArtifact(cloudId, name, description, contentId, contentType: "text/html")`.
   - `name`: the page title.
   - `description`: what the page contains and why, up to 1000 characters. It's indexed for search, so summarise the content rather than repeating the name.
   - **New version of an existing artifact:** also pass its `id`. The link stays the same. Get the ID from earlier in the conversation, from the link (`/artifacts/<id>/share`), or from `listArtifacts`.

## 4. Apply the access choice

- **Restricted:** nothing more to do. If the user named people, teams or groups to share with:
  - Resolve each person to an account ID (`lookupJiraAccountId`), and confirm with the user when a name matches more than one person.
  - Call `shareArtifact(cloudId, id, audienceAris)` with `ari:cloud:identity::user/<accountId>`, `…::group/<groupId>`, or a team ARI from `searchTeams`.
  - Never guess an ARI. A wrong one gives the wrong person access.
- **Anyone with the link** or **Open:** give the link and this instruction, word for word: *Open the link → **Share** → **General access** → choose **Anyone with the link*** (or ***Open***).

## 5. Report back

- **The share link**, `https://percona.atlassian.net/artifacts/<id>/share`, and whether this is a new artifact or a new version.
- **Who can see it now**, plus any click the user still needs to make.
- **Never show `downloadUrl`.** It's a signed link that opens the raw file without signing in, for 24 hours.

## Errors

- **The upload is refused with a proxy or network error** mentioning `tdp-os.services.atlassian.com`, for example `connect_rejected` or `CONNECT tunnel failed, response 403`: the Claude workspace doesn't allow that domain. Tell the user that a workspace admin must add `tdp-os.services.atlassian.com` under *Organization settings → Capabilities* (allowed domains). Then re-run from step 3.2 with a fresh upload URL. Don't silently switch to a claude.ai Artifact.
- **The site isn't granted** (for example "isn't explicitly granted by the user"): the user needs to give their Atlassian connector access to percona.atlassian.net, by reconnecting it and selecting that site.
- **Checksum or length mismatch:** recompute both from the exact file you upload, and don't edit the file between hashing and uploading.
- **The upload URL expired:** call `createArtifactsUpload` again.
- **Deleting:** there's no delete tool. Delete artifacts in the Atlassian web interface.
