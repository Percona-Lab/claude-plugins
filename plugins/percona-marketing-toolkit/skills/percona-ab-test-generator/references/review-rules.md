# Percona TOV Review Rules

Complete framework for reviewing Percona marketing copy. Work through each section systematically when reviewing any piece of content.

## Table of Contents

1. [Trademark defensibility](#1-trademark-defensibility)
2. [Naming hierarchy](#2-naming-hierarchy)
3. [Voice and tone](#3-voice-and-tone)
4. [Open source and licensing accuracy](#4-open-source-and-licensing-accuracy)
5. [Accuracy and claims](#5-accuracy-and-claims)
6. [Formatting](#6-formatting)
7. [Review checklist](#7-review-checklist)

---

## 1. Trademark defensibility

### Legal framework

Percona's use of third-party database trademarks (MongoDB, MySQL, PostgreSQL, Redis, MariaDB) must satisfy the nominative fair use defense. Three criteria must all be met:

1. The product/service is not readily identifiable without use of the mark
2. We use only as much of the mark as is reasonably necessary
3. Nothing suggests sponsorship or endorsement by the mark owner

Source: Jaimie McKean (GC), legal review dated Mar 9, 2026.

### Anti-disparagement (non-negotiable)

- Never pair a third-party trademark with copy that criticizes, mocks, or disparages the trademark owner in the same headline, subhead, or CTA.
- Criticism of a company's business decisions is fine in body copy. Using their registered mark as the vehicle for that criticism is not.
- Test: "Would this line work with a generic noun instead of the trademark?" If yes, use the generic noun.

Examples:

| Bad | Why | Good |
| --- | --- | --- |
| "MongoDB Services That Actually Put Your Needs First" | Implies MongoDB's own services don't. GC flagged this exact line. | "Enterprise Database Services That Actually Put Your Needs First" |
| "Keep MongoDB. Lose the Corporation." | Uses mark to tell customers to leave MongoDB, Inc. | "Keep your database. Lose the lock-in." |
| "MongoDB as It Was Supposed To Be" + "Then they changed the game" | Mark anchors headline; subhead characterizes MongoDB, Inc. negatively | "The Database You Deserve" + keep subhead criticism generic |

"Landlord" lines: lower risk because "landlord" is a generic positioning term, not a direct attack by name. Still worth being aware of on MongoDB-branded pages.

### Attribution (required on all assets)

- Registered trademark symbol: use (R) on first or prominent mention of registered marks (MongoDB(R), MySQL(R)).
- Footer disclaimer: every page/asset using third-party marks needs: "[Mark] is a registered trademark of [Owner]. Percona is not affiliated with, sponsored by, or endorsed by [Owner]."
- For website: this is a template-level fix (confirm with dev/agency that the site template includes it).

### Enforcement risk by database

| Database | Risk level | Notes |
| --- | --- | --- |
| MongoDB | HIGH | Actively enforcing. Apply all rules strictly. |
| MySQL (Oracle) | LOW | Lower enforcement on MySQL mark specifically. Same rules apply for safety. |
| PostgreSQL | LOW | Community project, no corporate trademark holder enforcing. Good practice only. |
| Redis | MODERATE | Company-governed, AGPL-licensed. |
| MariaDB | LOW | Foundation-governed. Low enforcement history. |

---

## 2. Naming hierarchy

Use the most defensible formulation available. In order of preference:

| Priority | Pattern | Example | Use where |
| --- | --- | --- | --- |
| 1 (strongest) | Percona leads | "Percona Software for MongoDB," "Percona Support for MySQL" | Headlines, CTAs, section headers, first mention |
| 2 (defensible) | "for [DB]" | "Support for MongoDB," "Expert Support for PostgreSQL" | Section headers, body copy |
| 3 (weakest, avoid) | "[DB] [Service]" | "MongoDB Support," "MySQL Consulting" | Never in headlines. OK in referential body copy if unavoidable |

### Specific naming rules

- "Percona for X": canonical customer-facing umbrella for all first-contact materials (events, overview pages, headlines, one-pagers, datasheets).
- "Percona Software for X": use on software detail pages where the context is specifically the software stack.
- "Percona Server for X" and "Percona Distribution for X": reserve for download pages, docs, and technical implementation details. Not in headlines or first-contact copy.
- "Distribution": replace with "stack" or "software" in all customer-facing copy that isn't a download/docs page. The word causes confusion at events (attendees hear "distributed database").
- Database names in referential lists ("MySQL, PostgreSQL, MongoDB, Valkey/Redis, and MariaDB"): fine as-is. Generic referential use.
- Comparison sections ("See How Percona Compares to MongoDB, Inc."): fair use for comparison. Fine.
- Customer quotes: do not edit for trademark compliance.
- FAQs: database names in question text are fine (descriptive use).

### Services taxonomy (keep consistent)

| Service name | What it is |
| --- | --- |
| Expert Support | Reactive, 24x7 help for incidents and performance issues |
| ExpertOps | Proactive, hands-on ongoing operations management |
| Expert Consulting and Services | Project-based expertise for complex database work |

- "Managed Services" is the old name for ExpertOps. Replace in all new materials.
- On first mention, use full name. Shorthand is fine after: "Support," "ExpertOps," "Consulting."

---

## 3. Voice and tone

### Channel defaults

| Channel | Voice |
| --- | --- |
| Website landing pages + PDFs | Challenger "goat" voice: confident, plainspoken, slightly rebellious |
| Technical docs / runbooks | Neutral technical: direct, minimal tone |
| Blogs / solution briefs | Challenger-lite: neutral body, sharper headings |
| Legal / compliance pages | Strictly neutral |

### Challenger voice rules

- Headings: bold, short, concrete. This is where brand personality lives.
- Body: calm, factual, skimmable. Short paragraphs, bullets, defined acronyms.
- Snark: allowed in headings and callouts, but must be fact-anchored. Aim at constraints and outcomes, not people.
  - OK: "managed-service constraints," "vendor-controlled defaults," "bill shock"
  - Not OK: insults, petty language, or anything that uses a trademark to attack its owner
- "Freedom": preferred brand word in headings. Use it to mean portability, control, optionality, auditability. Anchor it to a concrete "how" within 1-2 lines. One strong use per page max.

### Words and phrases to avoid

AI-sounding jargon: leverage, unlock, empower, enable, drive outcomes, robust, seamless, scalable, future-proof, best-in-class, delve into, in today's landscape, at scale (when vague), streamline, optimize, modernize (without mechanism)

Marketing hype: game-changing, revolutionary, cutting-edge, innovative, world-class, industry-leading, next-generation, synergy, value-add, transformative, holistic

Military language: battle-tested, war room, arsenal, weapon, kill, crush, dominate, campaign, tactics

Ideology-first framing (in body copy): "we believe," "our mission," "revolution," "commitment to open source" (use customer-impact framing instead)

### Words and phrases to prefer

- Concrete verbs: builds, maintains, supports, contributes, publishes, configures, tunes, monitors
- "Freedom" (headings only, anchored to specifics)
- Plain problem/outcome language: "reduce downtime," "avoid vendor lock-in," "control your data layer"

---

## 4. Open source and licensing accuracy

### Non-negotiable rules

- Only call software open source if it uses an OSI-approved license.
- If not OSI-approved, call it source available.
- If license status is uncertain, use TODO: verify license and default to "source available."
- Describe governance neutrally: "community-governed" vs. "company-governed." Tie it to trust and operational impact, not morality.
- No legal speculation or compliance advice.

### Current license status (for copy accuracy)

| Product | License type | Notes |
| --- | --- | --- |
| Percona Server for MySQL | Open source (GPL) | |
| Percona Server for PostgreSQL | Open source (PostgreSQL License) | |
| Percona Server for MongoDB | Source available (SSPL) | Inherited from upstream. Do not call "open source." |
| Valkey | Open source (BSD-3) | Community-governed |
| Redis | Open source (AGPL, as of 2025 re-license) | Company-governed |

### Percona's role (be exact)

| Role | Databases |
| --- | --- |
| Develops and maintains software | MySQL, PostgreSQL, MongoDB, Valkey |
| Supports with operational expertise (no Percona software) | Redis, MariaDB |

- Never claim Percona develops Redis or MariaDB software.
- OK: "Percona supports Redis users with operational expertise."
- Not OK: "Percona builds software for Redis."

### How to frame Percona's open source position

Prioritize in this order:

1. Accuracy: exact on license and governance
2. Customer value: reliability and continuity
3. Transparency: code and operations are open and auditable
4. Sustainability: profitable, long-term open source practice
5. Fairness: acknowledge others' good actions without hostility

---

## 5. Accuracy and claims

- Do not invent proof points, customer claims, stats, benchmarks, compatibility statements, or timelines.
- If a proof point is not confirmed for reuse, mark it TODO: verify permission.
- Avoid absolute claims ("no proprietary tooling") unless verified. Prefer: "no proprietary database platform required" or "no lock-in."
- Stats should be treated as attributed evidence: "reported," "survey found," "estimated," with source and year.
- Do not describe features as "on the roadmap" unless sourced to a public project roadmap.
- Performance claims must be scoped to workload characteristics and deployment context.
- Security comparisons must distinguish between capability and operational integration.

---

## 6. Formatting

- No em dashes. Banned completely. Use commas, periods, colons, parentheses, or restructure the sentence. No exceptions.
- No blockquote carets (>) in draft copy that will be sent as messages.
- Never reference "Everest" or "ProBuilds" in any output.

---

## 7. Review checklist (quick pass)

Before finalizing any marketing asset, verify:

- [ ] Trademark: no headline/CTA pairs a trademark with disparagement of trademark owner
- [ ] Percona leads: service headers use "Percona [X] for [DB]" or "[X] for [DB]"
- [ ] (R) symbol: on first/prominent mention of registered marks
- [ ] Footer disclaimer: trademark attribution present (or confirmed in template)
- [ ] Naming: no "Distribution" in customer-facing copy (use "software" or "stack")
- [ ] Licensing accuracy: SSPL products called "source available," not "open source"
- [ ] No fabricated claims: stats attributed, proof points verified or marked TODO
- [ ] Voice match: channel-appropriate tone (challenger for web/PDF, neutral for docs)
- [ ] No banned words: no AI jargon, no military metaphors, no hype words without mechanism
- [ ] Legibility: short paragraphs, clear headings, defined acronyms, ESL-friendly
