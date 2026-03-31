---
name: mynah
description: >
  MYNAH (My Natural Authoring Helper) writes messages, emails, Slack posts,
  documentation, and other communications in the user's personal voice and
  style — in any language. Use this skill whenever the user asks you to draft,
  write, compose, or rewrite ANY communication — including Slack DMs, channel
  messages, emails, Notion docs, blog posts, calendar invites, document
  comments, or announcements. Also trigger when the user says "write this
  for me", "how should I say this", "draft a message", "in my voice",
  "make this sound like me", "respond to this", "help me word this", or
  "what should I say". Trigger even when the user doesn't explicitly mention
  style — if they ask you to write something on their behalf and a style
  profile exists in memory, use it. Two modes: LEARN (extract style from
  samples) and COMPOSE (write in the user's voice). Supports multilingual
  users who write in different languages depending on audience. Always use
  this skill when writing on behalf of the user, including quick one-liner drafts.
---

# MYNAH — My Natural Authoring Helper

A personal communication style engine. Learns how the user writes across
different contexts and languages, stores those patterns in persistent memory,
and uses them to compose new messages that sound authentically like them.

Named for the hill mynah — a mountain bird renowned for learning and
reproducing human speech with remarkable fidelity.

---

## Overview

**Two modes:**

1. **LEARN** — Feed it samples, it extracts style patterns and saves them to memory
2. **COMPOSE** — Give it a context + intent, it writes in the user's voice

---

## Memory Backend

MYNAH stores style profiles in persistent memory. It supports two backends
and automatically selects the best available option.

**Detection:** At the start of any LEARN or COMPOSE operation, check which
memory tools are available.

### Backend 1: PACK (preferred)

If PACK memory tools (`memory_get` / `memory_update`) are available, use them.
Profiles are stored under `## MYNAH Profiles` in PACK memory. This is the
recommended setup because profiles are cross-platform (Claude Code, Cowork,
Cursor, Open WebUI), cross-project, version-controlled via Git, and accessible
to other tools like BINER.

### Backend 2: Claude Memory (automatic fallback)

If PACK is not available, store profiles as individual files in Claude's
memory directory. This works out of the box with no extra setup.

**File naming:** `mynah-profile-{context-id}.md`
(e.g., `mynah-profile-slack-dm-tech.md`, `mynah-profile-email-external-pt.md`)

**File format:**
```markdown
---
name: mynah-profile-{context-id}
description: MYNAH writing style profile for {context description}
type: user
---

### {context-id}
*Last updated: [date]*
*Samples used: [n]*
*Language: [language]*

- **Tone**: ...
- **Formality**: ...
[rest of profile using the same schema as PACK]
```

After writing a profile file, update MEMORY.md with a pointer to it.

**Limitations vs PACK:** Claude memory is per-project in Claude Code and
per-platform in Cowork. Profiles won't sync across platforms or be accessible
to other tools. For the full experience, install PACK.

---

## Context Taxonomy

Every message belongs to one of these contexts. Learn and store a profile for
each one the user wants to cover.

| ID | Context | Description |
|----|---------|-------------|
| `slack-dm-tech` | Slack DM → Technical peer | 1:1 with a developer, engineer, or technical colleague |
| `slack-dm-biz` | Slack DM → Business/non-technical | 1:1 with a PM, exec, sales, or non-technical colleague |
| `slack-channel-team` | Slack channel → Team/small group | Team channel, squad standup, working group |
| `slack-channel-company` | Slack channel → Company-wide | All-hands, announcements, cross-org channels |
| `email-internal` | Email → Internal | Colleagues, teammates, internal stakeholders |
| `email-external` | Email → External/customer | Customers, vendors, partners, prospects |
| `notion-internal` | Notion / internal docs | Specs, wikis, meeting notes, internal references |
| `doc-comment` | Inline comments (Notion, Google Docs) | Feedback, questions, reactions in document comments |
| `calendar-invite` | Calendar invites | Event title, description, agenda, meeting context |
| `blog-public` | Blog post / public writing | Published articles, developer posts, thought leadership |

### Disambiguating Context

Sometimes a message could fit multiple contexts. Use these heuristics:

- **Recipient's role wins over the channel.** "Slack DM to my engineering manager
  about sprint planning" → `slack-dm-tech` (the topic and recipient are technical,
  even though a manager might seem "biz"). Reserve `slack-dm-biz` for people
  outside the user's technical domain — sales, HR, execs without engineering background.
- **Audience size wins over topic.** A technical update in #general → `slack-channel-company`,
  not `slack-channel-team`, because the audience is broad.
- **When in doubt, ask.** But frame it as a quick choice, not a taxonomy lesson:
  "Is this more of a casual peer DM or a wider-audience channel post?"

### Multilingual Contexts

Users who write in multiple languages may have different style patterns per
language — not just vocabulary, but tone, formality, structure, and greeting
conventions. A user might be terse and direct in English Slack DMs but warmer
and more formal in Portuguese emails.

**How language interacts with context IDs:**

- If the user writes in only one language, no change needed. The profile
  captures their style in that language.
- If the user writes in multiple languages and their style is similar across
  them, store a single profile with a `Language` field noting the languages.
- If the user writes differently across languages, create language-variant
  profiles by appending the language: `email-external:pt`, `slack-dm-tech:ja`.
  This keeps profiles compact while capturing real differences.

During LEARN mode, notice the language of the samples. During COMPOSE mode,
determine the target language from the request context (recipient, channel,
user instruction) and load the appropriate profile variant.

---

## LEARN Mode

Use this when the user wants to train or update a style profile.

### Trigger phrases
- "learn how I write [X]"
- "train on these samples"
- "here are some examples of my [Slack/emails/posts]"
- "update my style for [context]"

### Process

**Step 1: Identify the context.**
Ask the user which context ID (from the table above) these samples represent,
if not already clear. Use the disambiguation heuristics above.

**Step 2: Collect samples.**
Target 5–10 samples minimum per context. Prefer pulling samples directly
from connected tools when available. See `references/sample-collection.md`
for tool-specific guidance (Gmail, Slack, Drive, Notion, Calendar).

If no connectors are available, ask the user to paste 5–10 samples directly.

If samples arrive in multiple languages, ask whether the user wants a single
combined profile or separate language variants. Don't assume.

**Step 3: Extract the style fingerprint.**
Read `references/style-dimensions.md`. Analyze the samples and extract a
profile using those dimensions. Look for patterns, not rules — capture what
is *characteristic*, including inconsistencies that are themselves part of the voice.

For non-English samples, pay extra attention to language-specific conventions
that carry stylistic weight: formality markers (tu/vous, tú/usted, honorifics),
sentence-final particles, punctuation norms that differ from English, and
greeting/closing conventions specific to that language's business culture.

**Step 4: Save to memory.**

Check which memory backend is available (see Memory Backend section above).

**If PACK is available:**
Read the user's current PACK memory. Find or create the `## MYNAH Profiles`
section. Add or update the profile for this context using the schema in
`references/profile-schema.md`. Write the complete updated memory back.

**If using Claude memory:**
Write (or overwrite) the profile to a memory file named
`mynah-profile-{context-id}.md` using the format shown in the Memory Backend
section. Update MEMORY.md with a pointer if this is a new profile.

Keep profiles compact. Each profile should be 8–15 lines. Use the required fields
from the schema; only add optional fields when samples show a clear, distinctive
pattern worth capturing. A tight profile that nails the voice is better than an
exhaustive one that dilutes the signal.

**Step 5: Confirm.**
Tell the user what was captured. Show a brief summary of the key patterns
detected. Offer to refine if anything looks off.

---

## COMPOSE Mode

Use this when the user wants to write something in their voice.

### Trigger phrases
- "draft a message to [person] about [topic]"
- "write this for me"
- "how should I respond to this?"
- "in my voice"
- "write a Slack message / email / post"

### Process

**Step 0: Fast-path check.**
If all of these are true, skip straight to Step 4 (drafting):
- The context is obvious from the request
- A profile exists for that context
- The intent and key points are clear from the request
- It's a low-stakes message (DM, short reply, quick update)

Don't interview the user for "draft a quick slack to Alex saying I'll be 5 min late."
Just write it in their voice.

**Step 1: Determine context.**
Identify which context ID applies using the disambiguation heuristics above.
If ambiguous, ask — but as a quick choice, not a multi-question interview.

**Step 2: Load the style profile.**

Check which memory backend is available (see Memory Backend section above).

**If PACK is available:**
Read PACK memory. Find `## MYNAH Profiles` → the relevant context.

**If using Claude memory:**
Read the memory file `mynah-profile-{context-id}.md` for the relevant context.

If no profile exists for this context in either backend, say so and offer to
run LEARN mode first, or proceed with best-effort defaults and flag it.

Also read the relevant section of `references/context-guide.md` for composition
guidance specific to this context. The context guide provides tactical advice
(how to handle structure, tone traps, what to watch for) that complements
the user's stored style patterns.

For multilingual users: determine the target language from the recipient, channel,
or explicit instruction. Load the language-variant profile if one exists (e.g.,
`email-external:pt`), otherwise fall back to the base profile. Draft in the
target language, applying that language's conventions naturally — don't just
translate an English draft.

**Step 3: Understand the intent.**
Make sure you know:
- What the message needs to accomplish
- Who the recipient is (if relevant)
- Any key points to include
- Desired length or any constraints

If missing critical info, ask before drafting. For low-stakes messages,
infer reasonable defaults and note any assumptions.

**Step 4: Draft in their voice.**
Apply the style profile. Follow the profile closely — do not default back to
a generic Claude voice. Pay particular attention to:
- Sentence rhythm and length
- Formality register
- Greeting and closing patterns
- Emoji / punctuation habits
- How they handle hedging, directness, or disagreement
- Language-specific conventions (formality markers, honorifics, punctuation norms)
- Imperfection patterns: if the profile includes characteristic mistakes, shortcuts,
  or informal patterns, reproduce them. Do not correct spelling, grammar, or
  punctuation habits that are part of the user's voice. A draft that's "too correct"
  sounds like AI, not like the user. (Skip this if the profile sets Imperfections
  to "disabled".)

The goal is a draft the user can send with minimal editing. That means matching
their real voice, including its rough edges. A technically perfect message that
doesn't sound like them costs more editing time than an imperfect one that does.

**Delivery format:** If the `message_compose_v1` tool is available and the
output is an email, Slack message, or text message, use it to present the
draft. This gives the user a polished, copyable output with the right
framing (subject line for email, channel-ready for Slack). For other
contexts (docs, blog posts, comments), output as text or in an appropriate
file format.

**Step 5: Offer iteration.**
After the draft, offer one brief note on any tradeoffs made (e.g., "kept it
short per your usual DM style, but let me know if you need more detail").
Offer to adjust tone, length, or angle. Keep this to one sentence — don't
write a paragraph about your own draft.

---

## Memory Schema

### PACK format

Profiles are stored in PACK memory like this:

```markdown
## MYNAH Profiles

### slack-dm-tech
*Last updated: [date]*
*Samples used: [n]*
*Language: [e.g., English, or "English + Portuguese"]*

- **Tone**: [e.g., casual, direct, collaborative]
- **Sentence length**: [e.g., short bursts, rarely over 2 lines]
- **Greeting**: [e.g., no greeting, jumps straight in, "hey"]
- **Closing**: [e.g., none, "lmk", "thx"]
- **Emoji**: [e.g., rare, only 👍 or ✅, never in serious threads]
- **Punctuation**: [notable habits]
- **Formality**: [1–5 scale, 1=very casual, 5=very formal]
- **Directness**: [leads with point / builds to it / depends]
- **Signature moves**: [2–3 distinctive patterns that define this voice]
- **Avoid**: [things out of character]
```

For language-variant profiles:
```markdown
### email-external:pt
*Last updated: [date]*
*Samples used: [n]*
*Language: Portuguese (Brazil)*

- **Tone**: [may differ from English variant]
- **Formality**: [may differ — e.g., uses "você" not "o senhor"]
- ...
```

### Claude memory format

Each profile is a separate file named `mynah-profile-{context-id}.md`:

```markdown
---
name: mynah-profile-slack-dm-tech
description: MYNAH writing style profile for Slack DM technical context
type: user
---

### slack-dm-tech
*Last updated: [date]*
*Samples used: [n]*
*Language: [e.g., English]*

- **Tone**: [e.g., casual, direct, collaborative]
- **Sentence length**: [e.g., short bursts, rarely over 2 lines]
- **Greeting**: [e.g., no greeting, jumps straight in]
- ... [same fields as PACK format]
```

### Profile size guidance

Target 8–15 lines per profile. Only add optional fields (hedging, humor,
disagreement style, example phrases) when the pattern is distinctive enough
to meaningfully change how a draft reads. Ten well-chosen profiles should
fit in under 1,500 words total.

---

## Reference Files

Read these during the relevant mode:

| File | When to read |
|------|-------------|
| `references/style-dimensions.md` | LEARN mode — full list of dimensions to analyze |
| `references/profile-schema.md` | LEARN mode — detailed schema with field guidance |
| `references/sample-collection.md` | LEARN mode — tool-specific sample pulling instructions |
| `references/context-guide.md` | COMPOSE mode — nuanced per-context composition guidance |

---

## Style Evolution

Voices change. This skill is designed to grow with the user.

**How profiles update:**
- Re-run LEARN mode on a context at any time with fresh samples
- New patterns are merged into the existing profile, not overwritten
- If new samples contradict old patterns, note the shift explicitly:
  `- **Tone**: casual-direct (shifted toward warmer in 2025 samples)`
- `Last updated` and `Samples used` are tracked per profile

**Prompts for triggered re-learning:**
- "My writing has changed — update my [context] profile"
- "Retrain my email style from these recent samples"
- "I've stopped using em dashes — update all my profiles"

**Proactive nudge:** If the user provides a sample during COMPOSE mode that
clearly diverges from the stored profile, flag it:
> "This reads differently from your stored [context] profile —
> want me to update it to reflect this shift?"

Never silently overwrite. Always confirm before changing stored patterns.

---

## Notes for Shareable Use

This plugin contains **no personal style data**. All user-specific content lives
in their own persistent memory. To use this plugin:

1. Install the MYNAH plugin
2. Run LEARN mode with samples from each context you care about
3. Profiles are saved to your memory (PACK if available, Claude memory otherwise)
4. Use COMPOSE mode any time you need to write in your voice

**Recommended:** Install [PACK](https://github.com/Percona-Lab/PACK) for
cross-platform, cross-project profile access. Without PACK, profiles are
stored in Claude's built-in memory and limited to the current platform/project.

To reset a profile, ask Claude to delete that context from your memory
and re-train from fresh samples.
