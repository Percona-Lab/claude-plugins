# Percona Editorial Style Guide — Full Reference

## Table of Contents
1. [Voice and Tone](#voice-and-tone)
2. [Writing About Percona Software and Services](#writing-about-percona-software-and-services)
3. [Writing About the Industry / Key Terminology](#writing-about-the-industry)
4. [Grammar and Mechanics](#grammar-and-mechanics)
5. [Word Choices and Words to Avoid](#word-choices)
6. [Commonly Miswritten Words](#commonly-miswritten-words)
7. [PostgreSQL Extensions](#postgresql-extensions)

---

## Voice and Tone

### Voice Principles
- **Empower**: Help customers understand benefits. Inform and encourage.
- **Educate**: Share expertise. The "human IP" at Percona is unmatched.
- **Guide**: Educators, not lecturers. Prefer overexplaining to underexplaining.
- **Speak openly and truthfully**: Champions of open source. No exaggeration or grandiose claims.

### Voice Characteristics
- **Free of jargon**: Avoid buzzwords. Say "Databases run better with Percona," not "Percona's purpose-built technology and industry-leading expertise will optimize your database environments."
- **Concise**: Never use two words when one will do. Get to the point.
- **Approachable**: Use plain language. Define all acronyms and abbreviations. Don't write from assumed knowledge.
- **Active voice (mostly)**: Passive voice is acceptable when emphasizing product benefits over the actor. "Percona Toolkit is designed to solve X" (passive, fine) vs. "We designed Percona Toolkit to solve X" (active, less ideal here — readers care what the tool does for them).
- **Relatable**: Empathetic, understanding, non-judgmental. Many Perconians have been in customers' shoes.

### Tone
- Tone shifts by content type. More jovial in social media and event emails; more serious and concise in technical white papers and datasheets.
- Never force jokes or irreverence. If humor is relevant and appropriate, use it. Having permission doesn't mean obligation.

---

## Writing About Percona Software and Services

### General Percona Rules
- **Percona** is always capitalized. Employees are **Perconians**.
- Avoid possessive form with products: "Percona software and services," NOT "Percona's software and services." Possessive is fine generally: "Percona's future."
- **Percona Blog**: Capitalize "Blog" after "Percona." Lowercase "blog" when used generally.

### Services

**Umbrella services**: Percona Support, Percona Consulting, Percona Managed Services.

Rules:
- Capitalize umbrella terms.
- Capitalize when referencing the Percona team: "Contact the Managed Services team."
- Lowercase when used generally: "MySQL support from Percona."
- Capitalize tier options.
- Link to respective service page on first mention.
- Always spell out full service name on first and final mention or in CTAs/buttons.

**Percona Support for [DBMS]**: Always capitalize and write in full. Never write "Percona DBMS Support" or "Percona [DBMS] Database Support."
- Percona Support for MySQL
- Percona Support for MongoDB
- Percona Support for MariaDB
- Percona Support for PostgreSQL

**Percona Support for DBaaS**: Write in full. Never spell out DBaaS as "Database as a Service" when referring to the support offering.

**Percona Managed Services (PMDS)**: Write out in full. For specific technologies:
- Percona Managed Services for MySQL
- Percona Managed Services for PostgreSQL
- Percona Managed Services for MongoDB
- Never write "MongoDB Managed Services" when referring to Percona's offering.

**Percona Consulting**: Write in full. Capitalize "Consultants" when referring to Percona Consultants. Lowercase when general.

**Percona Experts**: Always capitalize "Experts" after "Percona." Lowercase when general: "our staff of experts."

### Software and Solutions

General rules:
- Capitalize every word except conjunctions.
- No preceding article: "Percona Server for X," NOT "the Percona Server for X."
- Do not generalize: "Percona Monitoring and Management (PMM)," NOT "our monitoring and management solution."
- Link to solution page (not docs) on first mention.
- Always spell out full name on final mention or in CTAs/buttons.
- Refer to software as **"freely available,"** never **"free."**
- Use **"solution"** over **"product"** when describing offerings.

**Percona Everest**:
- Always "Percona Everest" — never just "Everest" or any other shorthand.
- Never preceded by an article.
- Never abbreviated.
- **NOT** a DBaaS solution. Always defined as a **cloud-native database platform**.

**Percona Monitoring and Management (PMM)**:
- Write full name on first mention with abbreviation: "Percona Monitoring and Management (PMM)."
- Subsequent mentions can use "PMM."
- **Never use the "&" symbol.**
- Features: "Percona Monitoring and Management Server" on first mention → "PMM Server" subsequently.

**Percona Account**: Always capitalized. Can be "your Percona Account" or "a Percona Account."

**Percona Advisors**: Always capitalized. OK to drop "Percona" for specific types (Security Advisors, Performance Advisors) after introducing the concept.

**Percona Server for [DBMS] and Percona Distribution for [DBMS]**: Write out in full with full database name.
- Percona Server for MySQL
- Percona Server for MongoDB (PSMDB) — always include abbreviation on first mention
- Percona Distribution for MySQL
- Percona Distribution for MongoDB
- Percona Distribution for PostgreSQL

**Percona XtraDB Cluster (PXC)**: Write in full, capitalize. Can abbreviate to PXC after first mention with abbreviation included. Do not un-stylize ("extra backup").

**Percona XtraBackup**: Write in full, capitalize.

**Percona Backup for MongoDB (PBM)**: Write out on first mention. Can abbreviate to PBM after first mention with abbreviation included.

**Percona Operators**: Write in full, always capitalize. NOT "Percona Kubernetes Operators." You can define them as Kubernetes operators, but "Kubernetes" is not part of the product name.
- Percona Operator for PostgreSQL
- Percona Operator for MongoDB
- Percona Operator for MySQL based on Percona XtraDB Cluster (lowercase "b" in "based")
- Percona Operator for MySQL based on Percona Server for MySQL

**Percona Pro Builds**: Always capitalized, always pluralized "Builds." Never "professional" builds. Never "our Pro Builds" or "Percona's Pro Builds."

**Percona Server for MongoDB Pro**: Always capitalize, write in full. Never abbreviate. Never "professional build."

**PostgreSQL**: Always write out "PostgreSQL," not "Postgres," when referring to a Percona PostgreSQL solution or service. Can use "Postgres" on second mention in general (non-Percona) context.

---

## Writing About the Industry

### Style Foundation
- Defer to **AP Style** with noted exceptions.
- For terminology not in AP Style, defer to industry analysts (Gartner, Red Monk) and Wikipedia.

### Percona Exceptions to AP Style
1. **Open source**: NEVER hyphenated. Always "open source solutions," NOT "open-source solutions."
2. **"with"** in titles: Always lowercase. "Databases Run Better with Percona," NOT "With."
3. **Oxford comma**: Always use the serial comma. "Expertise, services, and solutions."

### Key Terminology

- **Cloud**: Lowercase except in title case or product names.
- **Database**: Never capitalized except in title case or starting a sentence. Abbreviate as DB only after first use includes the abbreviation.
- **Database Administrator (DBA)**: Always capitalize. Spell out on first mention. Plural: DBAs.
- **Database as a Service (DBaaS)**: Capitalize Database and Service in full term. Include abbreviation on first mention. Never hyphenate.
- **Distribution**: Lowercase generally. Capitalize for Percona Distribution(s).
- **High availability**: Do not capitalize. Include HA abbreviation on first mention if used later.
- **Infrastructure as a Service (IaaS)**: Same rules as DBaaS.
- **Internet of Things (IoT)**: Capitalize Internet and Things. Define on first mention.
- **Kubernetes Operator(s)**: Always capitalized.
- **Lock-in** (noun, hyphenated) vs. **lock in** (verb, no hyphen).
- **On demand**: Not hyphenated standalone. Hyphenated as modifier ("on-demand streaming"). Capitalize both in title case.
- **On-premises**: Always hyphenated. Never "on-premise" or "on-prem." Never capitalize "p" (except starting sentence/title).
- **Private/public DBaaS**: Lowercase private/public except at sentence start or in title.
- **Query Analytics (QAN)**: Capitalize for PMM dashboard. Lowercase as general term.
- **Software as a Service (SaaS)**: Capitalize Software and Service. Abbreviation OK without defining.
- **Specific DBMSs**: Full name on first mention (MySQL, PostgreSQL, MongoDB). Can use "Postgres" on second mention except in Percona product/service references.

---

## Grammar and Mechanics

### Bullet Lists
- Items should follow the same grammatical structure.
- Each item should begin with the same/similar part of speech.
- Items should be comparable length.
- Either all complete sentences (with periods) or all incomplete (no periods). Don't mix.
- No semicolons at end of items.
- No conjunction before last item.
- Introductory sentence should end with a colon.
- Bullet hierarchy: filled circle → open circle → filled square. Rarely go beyond second level.

### Capitalization
- **Titles/headlines**: AP title case (use Capitalize My Title tool set to AP). Exception: lowercase "with."
- **Subheads/subtitles**: Sentence case.
- **Buttons/CTAs**: Sentence case.
- **Job titles**: Always capitalized (exception to AP). Common titles don't need spelling out (CEO is fine).
- **Department names**: Capitalize after "Percona" externally. Lowercase otherwise. "Percona Marketing department" vs. "the marketing department."
- **Email subject lines/preheaders**: Sentence case.

### Contractions
Use them. They're vital to conversational style.

### Numbers
- Spell out zero through nine and any number starting a sentence.
- Use numerals for 10+.
- Units of measure take numerals even under 10.
- Numbers over three digits get commas.
- **Fractions**: Spell out (two-thirds, not ⅔).
- **Percentages**: Use % symbol. Spell out only when starting a sentence.
- **Dates**: Spell out day and month in sentences (February 2, not Feb. 2). Invitations: MM/DD/YYYY.
- **Time**: Numerals + a.m./p.m. (lowercase, periods, space). Always include minutes (7:00 a.m., not 7 a.m.). Specify time zones for events.

### Punctuation
- **One space** between sentences. Always.
- **Ampersands**: Never use unless part of a brand name. Especially not for Percona Monitoring and Management.
- **Apostrophes**: Plural possessives ending in "s" — add only apostrophe. "Consultants' advice."
- **Commas**: Use Oxford/serial comma.
- **Dashes**: Hyphen (-) no spaces for compound words. Em dash (—) with spaces for asides.
- **Ellipsis**: Three periods only. Space before and after, no spaces between periods.
- **Exclamation marks**: Minimal in serious content (white papers, reports). Acceptable sparingly in social/email. Don't overuse.
- **Semicolons**: Use sparingly. Em dashes usually work better.
- **Sentence length**: Keep most under 30 words. Vary length. Short sentences work.

### People, Places, and Things
- **Quoting**: Use present tense for quotes in blogs/case studies.
- **Names**: First and last on first mention. First name on subsequent mentions.
- **United States**: Spell out on first mention, then U.S. (with periods). Spell out all city and state names. Well-known cities don't need state (see list in full guide).
- **International**: Spell out all names. EU on subsequent mentions (no periods). Well-known cities don't need country (see list in full guide).
- **Slang/colloquialisms**: Avoid. International audience.
- **Cultural competency**: Avoid culturally insensitive expressions.
- **Other companies**: Use their own style/spelling. Refer as "it" not "they" (exception: partner companies).

### Acronyms
- Always spell out on first mention with abbreviation in parentheses.
- When speaking, annunciate each letter (Q-A-N = "Cue-Ay-En").

---

## Word Choices

- **affect** (verb) vs. **effect** (noun). Memory: "A" for action.
- **after** vs. **following**: Use "after" when you mean after. "Following" can mean adhering to.
- **between...and** (excludes endpoints) vs. **from...to/through** (includes endpoints).
- **complement** (completeness/supplementing) vs. **compliment** (praise). Free = complimentary (with "i").
- **farther** (physical distance) vs. **further** (time/degree).
- **if** (conditional) vs. **whether** (alternative/yes-no). If "or not" works, use whether.
- **insure** (insurance) vs. **ensure** (guarantee) vs. **assure** (give confidence). Use "help ensure"/"help assure" to avoid overpromising.
- **last** (final) vs. **past** (immediately preceding). "Past two years," NOT "last two years" (unless truly the final two years).
- **replica**: Always. **Never "slave."**
- **use** vs. **utilize/leverage**: Always prefer "use." Utilize and leverage are pretentious.

### American English Spelling
Always use American English: analog, behavior, canceled, center, color, endeavor, fulfill, gray, license, maximize, minimize, organize, program, realize, recognize, specialize.

---

## Commonly Miswritten Words

add-on (noun/adj), add on (verb) | at a glance | back end (noun), back-end (adj) | brick-and-mortar | coworker | datasheet | discernible | double-click | drop-down (noun/adj), drop down (verb) | eBook | email (never hyphenate) | End of Life (EOL) | front end (noun), front-end (adj) | homepage | integrate | internet (lowercase) | login (noun/adj), log in (verb) | Like (social media) | machine learning | ongoing | online (lowercase) | opt-in (noun/adj), opt in (verb) | out of the box / out-of-the-box (modifier) | plug and play / plug-and-play (modifier) | pop-up (noun/adj), pop up (verb) | predominantly | runtime | single point of failure (SPOF) / single points of failure | signup (noun/adj), sign up (verb) | sync | third party (noun), third-party (adj) | username | URL | website | white paper (two words) | WiFi

---

## PostgreSQL Extensions

Follow the style accepted by the PostgreSQL community. Always verify correct spelling via official repositories and PGXN.

Common extensions with correct spellings: pgvector, timescale, PostGIS, pgpool-II, PostgreSQL Commons, Patroni, pg_stat_monitor, pg_repack, pgaudit, pgaudit_set_user, pgBackRest, pgbadger, PgBouncer, wal2json, Postgres Contrib Modules, Postgres Client/Server Utilities, repmgr, barman, HAProxy, Keepalived, plProfiler, WAL-e/WAL-g, pgadmin 4, pg_partman, dblink, Oracle_fdw, pg_cron, pg_hint_plan.
