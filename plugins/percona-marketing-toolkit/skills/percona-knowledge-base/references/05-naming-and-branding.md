# Percona: Naming, Branding, and Editorial Rules

This is the single source of truth for product naming, terminology, grammar, and style rules. All Percona skills should reference this file rather than maintaining their own copies.

## Table of Contents

1. [Company name rules](#company-name-rules)
2. [Product naming rules](#product-naming-rules)
3. [Product-specific rules](#product-specific-rules)
4. [Services naming](#services-naming)
5. [Naming hierarchy (trademark defensibility)](#naming-hierarchy)
6. [AP Style with Percona exceptions](#ap-style-with-percona-exceptions)
7. [Capitalization rules](#capitalization-rules)
8. [Terminology dictionary](#terminology-dictionary)
9. [Grammar rules](#grammar-rules)
10. [Numbers and time](#numbers-and-time)
11. [Commonly miswritten words](#commonly-miswritten-words)
12. [PostgreSQL extension spellings](#postgresql-extension-spellings)
13. [Trademark and attribution rules](#trademark-and-attribution-rules)

---

## Company name rules

- **Always capitalized:** Percona
- **Employees:** Perconians
- **No possessive with products:** "Percona software," NOT "Percona's software"
- **Possessive OK in general sense:** "Percona's future," "Percona's mission"

---

## Product naming rules

- Software is **"freely available,"** never **"free"**
- No preceding articles: "Percona Server for MySQL," NOT "the Percona Server for MySQL"
- Use **"solution,"** not **"product"** when describing Percona offerings
- Capitalize every word except conjunctions in product names
- Link to solution page (not docs) on first mention in web content
- Spell out full name on **final mention** and in **all CTAs/buttons**
- Do not generalize: use the actual product name, not vague descriptions

---

## Product-specific rules

| Product | Rule |
|---|---|
| **OpenEverest** | Current name (as of January 2026). Formerly "Percona Everest." Never use "Percona Everest" in new copy. It is an independent open source project, not a Percona product. Percona is a contributor and provides support. |
| **Percona Monitoring and Management (PMM)** | Full name + (PMM) on first mention. **Never use "&"** ("Monitoring and Management," not "Monitoring & Management"). |
| **Percona Support for [DBMS]** | Always this format. Never "Percona MySQL Support" or "Percona MongoDB Support." |
| **ExpertOps** | Current name for proactive database management service. Never "Managed Services" in new materials. |
| **Percona Operators** | Not "Percona Kubernetes Operators." Kubernetes is not part of the product name. |
| **Percona Server for MongoDB (PSMDB)** | Include abbreviation in parentheses on first mention. |
| **Percona XtraDB Cluster (PXC)** | Don't un-stylize "XtraDB." Abbreviate only after first mention with (PXC). |
| **PostgreSQL** | Always "PostgreSQL" in Percona product/service names. Never "Postgres" in that context. "Postgres" is acceptable in casual, non-product-name references in body copy. |
| **Percona Pro Builds** | Always plural "Builds." Never "professional." Never "ProBuilds." |
| **Percona Server for MongoDB Pro** | Always capitalize, write in full. Never abbreviate. Never "professional build." |
| **Percona Backup for MongoDB (PBM)** | Write out on first mention. Can abbreviate to PBM after first mention with abbreviation included. |
| **Percona Distribution for [DB]** | Use "software" or "stack" in customer-facing copy instead of "Distribution" (the word causes confusion; people hear "distributed database"). Reserve "Distribution" for download pages, docs, and technical implementation details only. |
| **Percona Operator for MySQL** | Two variants: "Percona Operator for MySQL based on Percona XtraDB Cluster" (lowercase "b" in "based") and "Percona Operator for MySQL based on Percona Server for MySQL." |
| **Percona Blog** | Capitalize "Blog" after "Percona." Lowercase "blog" when used generally. |
| **Percona Account** | Always capitalized. "Your Percona Account" or "a Percona Account." |
| **Percona Advisors** | Always capitalized. OK to drop "Percona" for specific types (Security Advisors, Performance Advisors) after introducing the concept. |
| **Percona Experts** | Always capitalize "Experts" after "Percona." Lowercase when general: "our staff of experts." |
| **Percona Consultants** | Capitalize when referring to Percona Consultants. Lowercase when general. |
| **Percona Support for DBaaS** | Write in full. Never spell out DBaaS as "Database as a Service" when referring to the support offering. |
| **PMM Server** | "Percona Monitoring and Management Server" on first mention, then "PMM Server" subsequently. |
| **OpenEverest** | Current name (as of January 2026). Formerly "Percona Everest." The original product was described as a "cloud-native database platform" (never "DBaaS"). Never use "Percona Everest" in new copy. Percona is a contributor and provides support. |
| **Other companies** | Use their own style/spelling for company and product names. Refer to a company as "it" not "they" (exception: partner companies). |

---

## Services naming

| Current name | What it is | Acceptable short forms | Old name (never use in new copy) |
|---|---|---|---|
| Percona Expert Support | Reactive, 24x7 incident and performance help | Expert Support, Percona Support, Support (only when context is clear and no ambiguity with community or non-commercial help) | (no rename) |
| Percona ExpertOps | Proactive, hands-on operations management | Percona ExpertOps, ExpertOps, Proactive Database Management | Managed Services (name changed because "managed services" is often used to describe SaaS offerings) |
| Percona Expert Consulting and Services | Project-based expertise | Consulting and Services, Percona Consulting or Percona Services (if describing a subset) | (no rename) |

- On first mention in a section, use the full name
- After first mention, shorthand is OK
- "Support" alone is OK only when context makes it unambiguous (not to be confused with general/community help)
- It is OK to reference "managed services" once for historical context if helpful, but always clarify that ExpertOps is the current name

### Support tier names

| Tier name | Notes |
|---|---|
| Advanced Support | Keep "Support" attached for clarity when referencing SLAs or response times |
| Premium Support | Keep "Support" attached for clarity when referencing SLAs or response times |

### Internal lifecycle framing (not customer-facing)

| Term | Meaning | Notes |
|---|---|---|
| Run | The database foundation (hardened software) | Internal only. Used to describe software lifecycle framing. |
| Operate | Automation via Kubernetes Operators | Internal only. |
| Observe | PMM observability | Internal only. |

---

## Naming hierarchy

### Core values / Positioning pillars

| Core value | Full pillar label | Common shorthand | Usage guidance |
|---|---|---|---|
| Open source | Open Source Commitment | Open source | Use for the pillar label. In body copy, reference open source, source-available, licensing, or transparency as needed. |
| Freedom / portability | Vendor Freedom to Run Anywhere | Vendor freedom | Use full label in headings or diagrams. In narrative, "run anywhere," "multi-cloud," or "platform freedom" are fine. |
| Expertise | Expertise on Call | Expertise | Use as pillar name. In explanations, "upstream-level engineers," "experts on call," or similar. |

### Naming hierarchy for products and services

Use the most defensible formulation. In order of preference:

| Priority | Pattern | Example | Use where |
|---|---|---|---|
| 1 (strongest) | Percona leads | "Percona Software for MongoDB," "Percona Support for MySQL" | Headlines, CTAs, section headers, first mention |
| 2 (defensible) | "for [DB]" | "Support for MongoDB," "Expert Support for PostgreSQL" | Section headers, body copy |
| 3 (weakest, avoid) | "[DB] [Service]" | "MongoDB Support," "MySQL Consulting" | Never in headlines. OK in referential body copy only if unavoidable |

- **"Percona for X":** canonical customer-facing umbrella for all first-contact materials (events, overview pages, headlines, one-pagers, datasheets)
- **"Percona Software for X":** use on software detail pages
- **"Percona Server for X" / "Percona Distribution for X":** reserve for download pages, docs, and technical context

---

## AP Style with Percona exceptions

We follow AP Style with these **mandatory exceptions:**

1. **Open source:** NEVER hyphenated. "Open source solutions," NOT "open-source solutions."
2. **"with" in titles:** Always lowercase. "Databases Run Better with Percona."
3. **Oxford comma:** Always use it. "Expertise, services, and solutions."

---

## Capitalization rules

| Context | Rule | Example |
|---|---|---|
| Headlines/titles | AP title case (lowercase "with") | "Databases Run Better with Percona" |
| Subheads/subtitles | Sentence case | "How to monitor your database" |
| Buttons/CTAs | Sentence case | "Get the guide" |
| Job titles | Always capitalized | "Database Administrator," "VP of Engineering" |
| Email subject lines | Sentence case | "Your database performance report is ready" |
| Department names | Capitalize after "Percona" externally only | "Percona Engineering" |

---

## Terminology dictionary

| Term | Rule |
|---|---|
| **Database** | Lowercase (except title case / sentence start). Abbreviate as DB only after defining. |
| **Database Administrator (DBA)** | Always capitalized. Spell out first, then DBA. Plural: DBAs. |
| **Database as a Service (DBaaS)** | Capitalize Database and Service. Never hyphenate. |
| **High availability** | Lowercase. Introduce as HA if abbreviating. |
| **Kubernetes Operator(s)** | Always capitalized. |
| **On-premises** | Always hyphenated. Never "on-premise" or "on-prem." |
| **Cloud** | Lowercase (except title case / product names). |
| **Lock-in** (noun) / **lock in** (verb) | Hyphenated as noun, two words as verb. |
| **On demand** (standalone) / **on-demand** (modifier) | Hyphenated only as modifier. |
| **SaaS** | OK to use without defining. Capitalize Software and Service in full form (Software as a Service). |
| **replica** | Always use "replica." **Never "slave."** |
| **Distribution** | Use "software" or "stack" in customer-facing copy. "Distribution" causes confusion. |

---

## Grammar rules

### Voice and word choice
- **Active voice preferred**, except when emphasizing product benefits over the actor
- Use **"use"** — never "utilize" or "leverage"
- Use **"after"** — not "following" (when meaning after)
- Use **"past"** — not "last" (when meaning recent, not final)
- Use **"help ensure"** — not "ensure" alone (avoids overpromising)
- Use **contractions** — they're essential for conversational tone

### Commonly confused word pairs
- **affect** (verb) vs. **effect** (noun). Memory: "A" for action.
- **after** vs. **following**: Use "after" when you mean after. "Following" can mean adhering to.
- **between...and** (excludes endpoints) vs. **from...to/through** (includes endpoints).
- **complement** (completeness/supplementing) vs. **compliment** (praise). Free = complimentary (with "i").
- **farther** (physical distance) vs. **further** (time/degree).
- **if** (conditional) vs. **whether** (alternative/yes-no). If "or not" works, use whether.
- **insure** (insurance) vs. **ensure** (guarantee) vs. **assure** (give confidence). Use "help ensure"/"help assure" to avoid overpromising.
- **last** (final) vs. **past** (immediately preceding). "Past two years," NOT "last two years."
- **replica**: Always. **Never "slave."**
- **use** vs. **utilize/leverage**: Always prefer "use."

### Bullet list formatting
- Items should follow the same grammatical structure (parallel construction)
- Each item should begin with the same/similar part of speech
- Items should be comparable length
- Either all complete sentences (with periods) or all incomplete (no periods). Don't mix.
- No semicolons at end of items
- No conjunction before last item
- Introductory sentence should end with a colon
- Bullet hierarchy: filled circle, then open circle, then filled square. Rarely go beyond second level.

### Punctuation
- **One space** between sentences
- **No ampersands** (unless brand name)
- **Oxford comma:** Always
- **Hyphens** (-): Compound words, no spaces
- **Em dashes** (—): Banned completely in all Percona copy. Use commas, colons, semicolons, parentheses, or restructure.
- **Semicolons:** Use sparingly
- **Exclamation marks:** Rare in formal content. Sparingly in casual content.
- **Ellipsis:** Three periods only. Space before and after, no spaces between periods.
- **Apostrophes:** Plural possessives ending in "s" add only the apostrophe: "Consultants' advice."
- Keep most sentences under **30 words**

### Spelling
- Always **American English:** behavior, color, center, canceled, organize, realize, maximize, program, gray, license, fulfill, specialize, analog, recognize

### Acronyms
- Always spell out on first mention with abbreviation in parentheses
- Exception: SaaS is OK without defining

---

## Numbers and time

- Spell out zero through nine. Numerals for 10+.
- Use **%** symbol (spell out only at sentence start)
- Spell out fractions: "two-thirds"
- Time: **7:00 a.m.** / **7:30 p.m.** (lowercase, periods, space, always include minutes)
- Dates: Spell out day and month in sentences. MM/DD/YYYY for invitations.
- Always specify time zones for events

---

## Commonly miswritten words

| Correct | Wrong |
|---|---|
| white paper (two words) | whitepaper |
| eBook | ebook, e-book, Ebook |
| datasheet | data sheet |
| on-premises | on-premise, on-prem |
| back end (noun) / back-end (adj) | backend (except in code) |
| front end (noun) / front-end (adj) | frontend (except in code) |
| login (noun/adj) / log in (verb) | log-in |
| sign up (verb) / signup (noun) | sign-up |
| third party (noun) / third-party (adj) | thirdparty |
| out of the box / out-of-the-box (modifier) | out-of-the-box (standalone) |
| internet (lowercase) | Internet |
| email (no hyphen) | e-mail |
| WiFi | Wifi, wifi |
| runtime | run time, run-time |
| online (lowercase) | on-line |
| add-on (noun/adj) / add on (verb) | addon |
| drop-down (noun/adj) / drop down (verb) | dropdown |
| opt-in (noun/adj) / opt in (verb) | optin |
| pop-up (noun/adj) / pop up (verb) | popup |
| plug and play / plug-and-play (modifier) | plug-and-play (standalone) |
| End of Life (EOL) | end of life (capitalize) |
| single point of failure (SPOF) | |
| double-click | double click |
| homepage | home page |
| coworker | co-worker |
| ongoing | on-going |
| predominantly | predominately |
| discernible | discernable |
| username | user name |
| URL | url |
| website | web site |

---

## PostgreSQL extension spellings

Follow the style accepted by the PostgreSQL community. Always verify correct spelling via official repositories and PGXN.

pgvector, timescale, PostGIS, pgpool-II, PostgreSQL Commons, Patroni, pg_stat_monitor, pg_repack, pgaudit, pgaudit_set_user, pgBackRest, pgbadger, PgBouncer, wal2json, Postgres Contrib Modules, Postgres Client/Server Utilities, repmgr, barman, HAProxy, Keepalived, plProfiler, WAL-e/WAL-g, pgadmin 4, pg_partman, dblink, Oracle_fdw, pg_cron, pg_hint_plan, pg_tde

---

## Trademark and attribution rules

### Registered trademark usage
- Use (R) on first or prominent mention of registered third-party marks: MongoDB(R), MySQL(R)
- Footer disclaimer on every page/asset using third-party marks: "[Mark] is a registered trademark of [Owner]. Percona is not affiliated with, sponsored by, or endorsed by [Owner]."

### Anti-disparagement (non-negotiable)
- Never pair a third-party trademark with copy that criticizes, mocks, or disparages the trademark owner in the same headline, subhead, or CTA
- Criticism of a company's business decisions is fine in body copy. Using their registered mark as the vehicle for that criticism is not.
- Test: "Would this line work with a generic noun instead of the trademark?" If yes, use the generic noun.

### Enforcement risk by database

| Database | Risk level | Notes |
|---|---|---|
| MongoDB | HIGH | Actively enforcing. Apply all rules strictly. |
| MySQL (Oracle) | LOW | Lower enforcement on MySQL mark specifically. Same rules apply for safety. |
| PostgreSQL | LOW | Community project, no corporate trademark holder enforcing. |
| Redis | MODERATE | Company-governed, AGPL-licensed. |
| MariaDB | LOW | Foundation-governed. Low enforcement history. |

### Quoting people
- Use **present tense** in blogs/case studies to imply ongoing relationship
- First and last name on first mention. First name only on subsequent mentions.

### International considerations
- Avoid slang and colloquialisms (international audience)
- Avoid culturally insensitive expressions
- Spell out all city, state, and country names
- U.S. (with periods) after first spelling out "United States." EU (no periods).
