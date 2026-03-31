# Profile Schema

This is the canonical schema for a style profile stored in memory.
Each context gets its own section under `## MYNAH Profiles`.

---

## Required Fields

Every profile must have these:

```markdown
### [context-id]
*Last updated: [YYYY-MM-DD]*
*Samples used: [n]*
*Language: [e.g., English, "English + Portuguese", or "Portuguese (Brazil)"]*

- **Tone**: [1–2 word description + brief note, e.g., "casual-direct — gets to the point fast, no fluff"]
- **Formality**: [1–5] — [one line rationale]
- **Sentence length**: [short / medium / long / mixed] — [brief note]
- **Message length**: [brief note on typical length for this context]
- **Greeting**: [what they do, or "none"]
- **Closing**: [what they do, or "none"]
- **Emoji**: [none / rare / moderate / frequent] — [which ones, if any]
- **Punctuation**: [notable habits]
- **Directness**: [leads with point / builds to it / depends]
- **Signature moves**: [2–3 characteristic patterns that define this voice]
- **Avoid**: [things that would sound out of character]
```

---

## Optional Fields

Add these when the samples reveal clear patterns:

```markdown
- **Hedging**: [how they qualify or don't]
- **Disagreement style**: [how they push back]
- **Acknowledgment**: [do they validate before responding]
- **Humor**: [dry / self-deprecating / absent / etc]
- **Capitalization quirks**: [anything non-standard]
- **Structure**: [bullets / prose / mixed, and when]
- **Example openers**: [2–3 characteristic ways they start a message]
- **Example phrases**: [2–3 phrases that are distinctly theirs]
- **Status sensitivity**: [does tone shift with seniority]
- **Formality markers**: [for non-English: tu/vous, tú/usted, honorific patterns, etc.]
- **Imperfections**: [characteristic mistakes, shortcuts, or informal patterns that are
  part of the user's voice — e.g., consistent misspellings, abbreviations, grammar
  shortcuts, lowercase habits. Set to "disabled" if the user prefers clean output.]
```

---

## Full Example Profile

```markdown
### slack-dm-tech
*Last updated: 2025-03-10*
*Samples used: 12*
*Language: English*

- **Tone**: casual-collaborative — warm but efficient, treats peers as equals
- **Formality**: 2 — close to texting but stays focused on work
- **Sentence length**: short — rarely more than 1–2 lines per thought
- **Message length**: 1–4 lines typical; longer only for context-heavy asks
- **Greeting**: none — jumps straight to topic
- **Closing**: "lmk" or nothing — no sign-off
- **Emoji**: rare — 👍 for acknowledgment, occasionally 😅 for self-aware humor
- **Punctuation**: minimal periods in short messages; uses "..." for thinking-out-loud
- **Directness**: leads with the ask or point, provides context after if needed
- **Signature moves**: 
  - Frames asks as "quick q:" or "random thought:"
  - Acknowledges before redirecting ("yeah totally — one thing though")
  - Uses "worth a look?" to float ideas without committing
- **Avoid**: formal openers ("I hope this finds you well"), over-explaining, exclamation points
- **Hedging**: moderate — often floats ideas as questions rather than statements
- **Imperfections**: skips capitalization in DMs; uses "thx" and "pls"; writes "lets" without apostrophe; occasional comma splices when listing ideas quickly
- **Example openers**: "quick q —", "hey, re: the thing from earlier —", "so this is probably obvious but"
- **Example phrases**: "makes sense to me", "worth a look?", "could go either way"
```

---

## Memory Structure

### PACK format

When using PACK, all profiles live under a single `## MYNAH Profiles` section:

```markdown
## MYNAH Profiles

### slack-dm-tech
[profile]

### slack-dm-biz
[profile]

### email-external
[profile]

### email-external:pt
[language-variant profile for Portuguese]

### blog-public
[profile]
```

### Claude Memory format

When PACK is not available, each profile is stored as a separate memory file.

**File naming:** `mynah-profile-{context-id}.md`
(replace `:` with `-` for language variants, e.g., `mynah-profile-email-external-pt.md`)

**File format:**
```markdown
---
name: mynah-profile-slack-dm-tech
description: MYNAH writing style profile for Slack DM technical context
type: user
---

### slack-dm-tech
*Last updated: 2025-03-10*
*Samples used: 12*
*Language: English*

- **Tone**: casual-collaborative — warm but efficient, treats peers as equals
- **Formality**: 2 — close to texting but stays focused on work
- ... [same fields as PACK format]
```

After creating or updating a profile file, add a pointer to MEMORY.md:
```markdown
- [mynah-profile-slack-dm-tech.md](mynah-profile-slack-dm-tech.md) - MYNAH style profile for Slack DM tech context
```

The profile content (everything below the frontmatter) uses the exact same
schema as PACK. Only the storage mechanism differs.

---

## Profile Versioning

When updating a profile:
- Increment `Samples used` count
- Update `Last updated` date
- Preserve existing patterns unless new samples clearly contradict them
- If patterns conflict across sample sets, note the variance:
  `- **Tone**: casual-direct (more formal when topic is sensitive)`

---

## Keeping Profiles Compact

Memory space is shared with other tools and context. Aim for 8–15 lines per
profile using required fields. Only add optional fields when they carry real
signal — a distinctive humor style or a strong disagreement pattern is worth
capturing; a generic "uses standard capitalization" is not.

Ten profiles at 12 lines each ≈ 1,200 words. That's the target ceiling.
If profiles are growing past this, trim optional fields that aren't changing
how drafts actually read.
