# Context Guide

Nuanced guidance for composing in each context type.
Read the relevant section(s) during COMPOSE mode when you need more than
the stored profile to get the tone right.

---

## slack-dm-tech
**Slack DM to a technical peer (dev, engineer, data scientist, etc.)**

The relationship is collegial. Assume shared context and vocabulary.
Efficiency is valued — don't over-explain what they already know.

Composition notes:
- Technical shorthand is fine (PR, LGTM, infra, etc.)
- Tend toward brevity; they're busy
- It's fine to be slightly informal or even jokey if the profile supports it
- Don't soften technical feedback unnecessarily — they can handle directness
- If asking for help, be specific about what you need

Watch for:
- Don't be so terse it reads as curt
- Don't code-switch to formal if the profile is casual

---

## slack-dm-biz
**Slack DM to a business or non-technical colleague**

More care around jargon. Assume less shared context.
Relationship is still collegial but may be more role-formal.

Composition notes:
- Avoid technical acronyms unless you know they know them
- May need slightly more context/background for asks
- Warmer opener than with tech peers in some profiles
- Framing matters more — lead with the "so what" before the "how"

Watch for:
- Don't be condescending by over-explaining
- Don't drop all personality — it's still a DM, not a memo

---

## slack-channel-team
**Slack channel to a team or small working group**

Semi-public but within a trusted group. Tone is still relatively casual.
Messages may be read async, so slightly more context than a DM.

Composition notes:
- A bit more structure is fine for longer messages (bullets, bold keywords)
- Acknowledge that others may be looped in ("for those not on the call...")
- Decisions or action items should be clear
- @mentions are appropriate when directing something to a specific person

Watch for:
- Don't write an essay in Slack
- Channel messages have more visibility — no sarcasm that could read wrong
- Tag threads clearly if it's a reply vs new topic

---

## slack-channel-company
**Slack channel to a large or all-company audience**

Higher stakes. Wider audience means more diverse contexts.
Messages are often semi-permanent (people search for them later).

Composition notes:
- Clear subject/header upfront — people skim
- Tone can still be human and direct, but no in-jokes or insider references
- Explicit about what action (if any) is needed and from whom
- Links and context should stand alone without prior knowledge
- Thank-yous and acknowledgments land well here

Watch for:
- Don't be stiff or corporate — it reads as inauthentic
- Don't bury the lede
- Avoid ambiguous "we" — be specific about who's doing what

---

## email-internal
**Email to internal colleagues**

More durable than Slack. People forward internal email.
Searchable and often looped to new recipients.

Composition notes:
- Subject line should be actionable or informative at a glance
- OK to be slightly more structured than Slack — short paragraphs, maybe bullets
- CTA or next step at the end is good practice
- Easier to CC/BCC without it feeling weird vs. adding to a Slack channel

Watch for:
- Don't write novel-length emails for simple asks
- "Reply all" culture vs. direct culture — know your org

---

## email-external
**Email to customers, partners, vendors, or prospects**

Represents the company. Often the first or ongoing formal touchpoint.
Balance professionalism with authenticity.

Composition notes:
- Subject line is critical — open rate depends on it
- Warmer, more polished than internal email
- Avoid jargon, acronyms, or internal references
- Be clear about what you're asking for and why it matters to them
- Closing should be clean and action-oriented

Watch for:
- Don't be robotic or template-y — personalizing lands better
- Don't over-promise or under-clarify
- Proofread more carefully than internal email

---

## calendar-invite
**Calendar event titles, descriptions, and agendas**

A highly compressed, functional context. The reader is often in scheduling mode —
skimming, not reading. But the tone still reflects the organizer's style.

Composition notes:
- **Title**: the most important field — captures purpose at a glance
  - Some people write keywords ("Roadmap sync"), others write full sentences ("Q3 roadmap review — eng + PM")
  - Capture the user's typical length and format
- **Description/body**: ranges from empty to a full brief
  - Minimal style: just a link or "no prep needed"
  - Structured style: goal, agenda, pre-read, decisions needed
  - Capture how much the user typically writes and what they include
- **Agenda format**: bullets vs prose vs numbered vs nothing
- **Tone of the ask**: is the meeting framed as a collaboration, a decision, a status check?
  Some people write "let's figure out X together"; others write "decision needed on X"

Key dimensions to capture in LEARN mode:
- Title length and format (keywords vs phrase vs full sentence)
- Whether descriptions are written at all, and how long
- Agenda structure if used
- How they phrase the purpose ("to discuss", "to decide", "sync on", "quick check-in")
- Whether they include pre-reads or prep asks
- Tone: directive vs collaborative vs neutral

Watch for:
- This context is distinct from email even when the content is similar
- "Meeting about X" is rarely how good organizers phrase it — capture their actual framing pattern
- Some users write differently for internal vs external calendar invites — ask if unclear

---

## doc-comment
**Inline comments in Notion, Google Docs, or similar**

Comments are a distinct register — more compressed than any other context.
They exist in direct reference to specific text, so they carry less ambient context.
Often read by someone in the middle of a task, not in a reading mindset.

Composition notes:
- Extreme brevity is the default — one line is ideal, two is a lot
- No greeting, no closing, no pleasantries
- Reference the specific text if needed, but don't restate it
- Questions should be tight: "why this approach?" not "I was wondering about the rationale here"
- Approvals/acknowledgments are often just a word or phrase: "✓", "agreed", "nice"
- Suggested edits should be direct, not hedged

Watch for:
- Don't write a Slack message in a comment box — it's the wrong register
- Emoji reactions and short affirmations are fine here where they'd be odd in a doc body
- Tone can be more terse than any other context without reading as rude — that's normal

Key dimensions to capture in LEARN mode:
- Do they use question marks or just drop the question flat ("why here" vs "why here?")
- Do they use emoji at all in comments
- How do they frame suggested changes ("suggest:" / "maybe:" / just a rewrite)
- Do they sign comments or leave them anonymous (some tools show name automatically)

---

## notion-internal
**Notion pages, internal wikis, specs, meeting notes, PRDs**

Written for an audience that may encounter this later without context.
Should work as a standalone artifact.

Composition notes:
- Structure is important — good headings, clear sections
- Leads with purpose/context ("This doc covers X for Y reason")
- TL;DR or summary section for long docs
- Write for skim-reading (bold key terms, use bullets for lists)
- Dates and owners on action items
- Link generously to related docs

Watch for:
- Don't over-engineer with too much structure for a short doc
- Don't assume the reader has context they might not have
- Keep tone clear and direct — this is a reference, not a narrative

---

## blog-public
**Blog posts, developer articles, public documentation, thought leadership**

Public-facing. Often the user's most crafted writing.
Balance voice, authority, and accessibility.

Composition notes:
- Opening should hook: question, observation, surprising fact, or sharp statement
- Structure matters: intro → body → conclusion/takeaway
- Use the user's natural voice — don't sterilize it into generic "content"
- Concrete examples > abstract principles
- TL;DR or key takeaways section is often appropriate
- End with a point of view, not a non-committal close

Watch for:
- Don't write like a press release
- Avoid "in this article I will..." meta-framing
- Personal perspective is a feature, not a bug — lean into it
- Long sentences in this context are often fine if the profile supports it
