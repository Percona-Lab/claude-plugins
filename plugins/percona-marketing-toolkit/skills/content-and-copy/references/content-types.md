# Content Type Playbooks

Content-type-specific rules that layer on top of the core Percona voice writer. Read the section matching the content type from Step 1 before writing. Every rule here supplements (never overrides) the main SKILL.md, tov.md, and review-rules.md.

## Table of contents

1. [Blog posts](#1-blog-posts)
2. [Social posts](#2-social-posts)
3. [General emails](#3-general-emails)
4. [Datasheets](#4-datasheets)
5. [Landing pages](#5-landing-pages)
6. [Ad copy](#6-ad-copy)
7. [Case studies](#7-case-studies)
8. [Press releases](#8-press-releases)
9. [Video scripts](#9-video-scripts)

---

## 1. Blog posts

### Purpose

Blogs are Percona's primary organic traffic and thought leadership engine. They sit mostly at the top and middle of the funnel. A good Percona blog teaches something specific, earns trust through technical accuracy, and nudges the reader toward a logical next step.

### Structure

Every blog post follows this skeleton:

1. **Title** (AP title case, lowercase "with"). Include the primary keyword naturally. Keep under 60 characters when possible so it doesn't truncate in search results.
2. **Opening paragraph** (2-4 sentences). State the problem the reader has. Answer "What's in it for me?" immediately. No throat-clearing.
3. **Body sections** (H2 subheads in sentence case). Each section addresses one idea. Sections should flow logically but also work as standalone skimmable chunks.
4. **Closing paragraph** (2-3 sentences). End on a concrete takeaway or a forward-looking statement about what the reader can do next. No summary of what was just said. No "In conclusion."
5. **CTA**. One clear next step: try a tool, read a related guide, contact the team, download a resource. Spell out the full Percona product or service name in the CTA.

### SEO rules

- One primary keyword per post. Include it in the title, first 100 words, one H2, meta description, and image alt text.
- Use long-tail, intent-based phrases over broad terms. "How to monitor MySQL replication lag" beats "MySQL monitoring."
- Internal links: include 2-4 links to related Percona content (solution pages, other blogs, docs). Use descriptive anchor text, not "click here."
- Aim for 1,200-2,500 words for technical posts. Shorter is fine for news or opinion pieces (600-1,000 words).
- Write meta descriptions manually: under 155 characters, include the keyword, state the benefit of reading the post.
- Structure content for featured snippets: use a clear question as an H2, then answer it concisely in the paragraph directly below.
- Add schema-friendly FAQ sections at the end for posts that answer common questions.

### Readability

- Paragraphs: 2-4 sentences max. Single-sentence paragraphs are fine for emphasis.
- Use subheads every 200-300 words so readers can skim.
- Code blocks and terminal output should be formatted properly and tested for accuracy.
- Include at least one visual element (diagram, screenshot, table, code output) per 500 words of technical content.
- Write at a level where a mid-career DBA or DevOps engineer would read comfortably, but define niche terms on first use.

### E-E-A-T signals

- Attribute the post to a named author with real credentials. Include a short author bio with relevant experience.
- Cite specific sources for stats and claims. Link to original research, not aggregators.
- If the author has personal experience with the topic, say so briefly. "I've seen this fail on three production clusters" is more credible than "many organizations encounter this."
- Update older posts when facts change. Note "Updated [month year]" in the body.

### What not to do

- Don't write listicles for the sake of listicles. If the content works better as a how-to or deep dive, write it that way.
- Don't stuff keywords. One primary keyword, a few natural variations. If it reads awkwardly, the keyword density is too high.
- Don't open with "In today's [anything]."
- Don't end with "Stay tuned for more."

---

## 2. Social posts

### Purpose

Social posts (LinkedIn primarily, plus X/Twitter) amplify Percona content, build personal and brand authority, and start conversations with the technical community.

### Scope note

The standalone `social-post` skill covers general social post craft (hook, rehook, wave structure, templates, engagement tactics). This section covers only the Percona-specific layer that sits on top.

When writing a Percona social post, apply the `social-post` skill's formatting and structural rules, then overlay the following Percona constraints.

### Percona social rules

- **Tone**: conversational, occasionally playful. Social is the one channel where mild humor is welcome, but it must be earned (fact-anchored, not forced).
- **Naming**: on LinkedIn, you have room for full product names on first mention. On X, abbreviate after first mention if space demands it, but always use the correct abbreviation (PMM, PXC, PSMDB).
- **Hashtags**: 2-3 max. Always include #OpenSource or #Percona. Add one topic hashtag (#MySQL, #PostgreSQL, #Kubernetes). No made-up hashtags.
- **Links**: one link per post. Link to the asset being promoted, not the homepage. On LinkedIn, put the link in a comment if the algorithm is suppressing link posts that quarter (this changes; check current best practice).
- **CTAs**: ask a question. Social CTAs should invite comments, not clicks. "What's your biggest pain point with database migrations?" beats "Read our blog."
- **Tagging**: tag individuals quoted or mentioned. Tag Percona's company page. Don't tag competitors.
- **Carousel/image posts**: when promoting a blog or report, create a 3-5 slide summary with one stat or takeaway per slide. Final slide is the CTA.
- **Employee advocacy**: when ghostwriting for a Perconian, write in first person. Reference their actual job and experience. "In my past 12 years working with MySQL clusters..." not "Percona has extensive experience."

### Post types and when to use them

| Post type | When | Notes |
|---|---|---|
| Blog promotion | Every published blog | Lead with the takeaway, not "we just published" |
| Event promotion | 2 weeks, 1 week, 1 day before | Focus on what attendees will learn, not logistics |
| Data/stat post | When original research or benchmarks are available | One stat, one insight, one question |
| Opinion/hot take | When a relevant industry shift happens (license changes, acquisitions, outages) | Keep it factual. Snark at situations, not people |
| Employee spotlight | Monthly or as available | Humanize the brand. Keep it genuine |

---

## 3. General emails

### Purpose

General emails cover newsletters, product announcements, event invitations, webinar promotions, nurture sequences, onboarding emails, and re-engagement campaigns. Not cold outreach (the `cold-email` skill handles that).

### Scope note

The `cold-email` skill handles all first-contact outreach. This section covers every other email Percona sends to people who have opted in or are existing contacts.

### Subject line rules

- Sentence case (per Percona TOV).
- 4-8 words. Under 50 characters to avoid mobile truncation.
- Be specific about the benefit: "PostgreSQL 17 support is live" beats "Exciting product update."
- Personalize with role or industry when data is available: "[DBA teams] Three things we changed in PMM 3.0."
- No ALL CAPS words. No exclamation marks.
- Questions work: "Still running MySQL 5.7?" (but use sparingly, not every send).

### Preheader

- Treat it as a second subject line. Write it intentionally; don't let it auto-populate with "View in browser."
- Extend the subject line's promise or add a detail: Subject: "PostgreSQL 17 support is live" / Preheader: "Plus three new monitoring features in PMM."

### Email body

- **Length**: newsletters can be 300-500 words. Single-purpose emails (event invite, product update) should be 100-200 words. Every sentence earns its place.
- **One CTA per email** (except newsletters, which can tease 3-5 items with individual links). Make the primary CTA button obvious and above the fold on mobile.
- **Structure**: problem or context (1-2 sentences) then value (what's new or what they'll learn) then CTA. No preamble.
- **Personalization**: go beyond first name. Reference their database technology, their role, their company size segment. "As someone running MongoDB in production..." is more relevant than "Hi [First Name]."
- **Formatting**: short paragraphs (1-3 sentences). Use one or two bold phrases to anchor the skimmer's eye, but don't bold entire sentences. Bullet lists only when presenting 3+ parallel items.
- **From name**: a real person (e.g., "Sarah from Percona") for marketing emails. "Percona" for transactional or system emails.

### Email types and cadence notes

| Type | Frequency | Key rule |
|---|---|---|
| Newsletter | Bi-weekly or monthly | Curate, don't sell. 80% educational, 20% product |
| Product announcement | As needed | Lead with what it means for the reader, not what the team built |
| Event/webinar invite | 2 weeks + 1 week + day-of | Each send needs a different angle, not just "reminder" |
| Nurture sequence | Triggered by behavior | One topic per email. Progress from awareness to consideration |
| Onboarding | Triggered by signup | Help them get value fast. Link to quickstart, not marketing pages |
| Re-engagement | After 90 days inactive | Offer something useful, not guilt ("We noticed you haven't...") |

### Deliverability

- Keep links to 3 or fewer per email (excluding the unsubscribe link).
- Avoid spam trigger words: "free," "act now," "limited time," "guaranteed." These are already banned in Percona TOV anyway.
- Light HTML for marketing emails; plain text or minimal formatting for personal-sounding emails from sales.
- Always include a plain-text version.

---

## 4. Datasheets

### Purpose

Datasheets (also called solution briefs or one-pagers) are mid-funnel sales enablement assets. Their job is to give a technical evaluator or procurement lead enough information to shortlist Percona, not to close the deal.

### Format

- **Length**: 1-2 pages. Never more than 2. If it's going longer, split it or move content to a white paper.
- **Layout**: designed for scanning. Use a two-column layout where possible. Left column for features/specs, right column for benefits or use cases.

### Structure

1. **Header**: Percona logo, product name (full, per naming rules), one-line product definition.
2. **At a glance** (3-4 bullet points): the single most compelling things about this solution. This is what the reader sees first. Make each bullet a benefit, not a feature.
3. **Problem statement** (2-3 sentences): what pain does this solution address? Write from the reader's perspective.
4. **Key capabilities** (table or structured list): features with corresponding benefits. Keep each entry to one line if possible.
5. **Technical specifications** (if applicable): compatibility, supported platforms, architecture requirements. This section should be precise and scannable.
6. **Proof point**: one customer quote, one stat, or one "time-to-value" metric. Don't fabricate. If nothing is available, mark it TODO: add proof point.
7. **CTA**: "Learn more at [URL]" or "Contact Percona for a technical assessment." Not "Contact us" alone. Use the full service name.

### Writing rules

- Tone: serious, concise, precise (per TOV for technical content). No humor.
- Write for two readers simultaneously: the technical evaluator (wants specs and compatibility) and the business decision-maker (wants outcomes and risk reduction). The at-a-glance section serves the business reader; the specs section serves the technical reader.
- Every feature must be paired with a benefit or use case. "Supports multi-cloud deployments" alone is a feature. "Supports multi-cloud deployments, so you can run the same stack on AWS, GCP, or on-premises without retooling" pairs it with a benefit.
- No vague claims. "High performance" means nothing. "Handles 50,000 queries per second on standard hardware" means something. If you don't have the number, describe the mechanism.
- Acronyms: define every one on first use, even common ones. The reader may forward this PDF to someone less technical.
- Software descriptions: "freely available" not "free." "Solution" not "product."
- Licensing: if the datasheet covers a solution that includes SSPL-licensed software, say "source available" not "open source." See review-rules.md section 4.

### What not to do

- Don't cram the entire product documentation into a datasheet. It's a snapshot, not a manual.
- Don't use marketing superlatives. No "best-in-class," "world-class," "industry-leading." These are already banned.
- Don't skip the CTA. Every datasheet needs a clear next step.
- Don't use generic stock imagery. If there's no meaningful visual, use a simple architecture diagram or leave the space for clean whitespace.

---

## 5. Landing pages

### Purpose

Landing pages are high-intent conversion assets. Every element on the page exists to move the visitor toward one action: download a resource, book a demo, start a trial, or contact the team.

### Scope note

This section covers the copy for landing pages, not the design or code. Copy should be written to slot into a wireframe.

### Structure

1. **Hero section**
   - **Headline**: benefit-first, 6-12 words. Address the visitor's problem, not Percona's features. "Run your databases without the vendor lock-in" not "Percona: Open Source Database Solutions."
   - **Subheadline**: 1-2 sentences expanding on the headline. Add specificity: who this is for, what they'll get.
   - **Primary CTA button**: sentence case, action-oriented. "Start your free assessment" or "Download the guide." Not "Submit" or "Learn more."
   - **Trust signals above the fold**: client logos, a star rating, "Trusted by X organizations" or a short testimonial snippet.

2. **Value section** (below fold)
   - 3-4 benefit blocks, each with a short heading and 1-2 sentences. Pair each benefit with an outcome.
   - If the page promotes a specific solution, include a brief "How it works" (3 steps max).

3. **Social proof section**
   - One customer quote with name, title, and company. Or a mini case study (challenge, solution, result in 3 sentences).
   - Alternatively, a row of client logos.

4. **Objection handling** (optional but recommended)
   - Address 2-3 common concerns: "What if we're already locked into [competitor]?" "How long does migration take?"
   - Keep answers to 1-2 sentences each.

5. **Repeat CTA**
   - Same button and copy as the hero CTA. Place it after the social proof section.

6. **Form** (if lead capture)
   - 5 fields or fewer. Name, email, company, job title max. Every additional field reduces conversion.
   - If more qualification data is needed, collect it in a follow-up, not the initial form.

### Copy rules

- **One CTA per page.** If the page has "Book a demo" and "Download the white paper" and "Subscribe to newsletter," it has three competing goals. Pick one.
- **Write at a 5th-7th grade reading level.** Landing page copy written at this level converts roughly 2x better than professional-level writing. This means short sentences, common words, direct phrasing.
- **Mirror the traffic source.** If the visitor clicked a Google ad about "MySQL managed services," the landing page headline should reference MySQL managed services, not "database solutions" generically. Message match prevents bounce.
- **No navigation links.** Landing pages should not have the site's main navigation. The only clickable elements should be the CTA and legally required links (privacy policy, etc.).
- **Mobile-first.** Over 68% of B2B buyers research solutions on mobile. Write for a single-column layout. CTAs should be thumb-friendly. Forms should be short.

### Conversion benchmarks

- Healthy B2B landing page conversion: 2-6%. Top performers: 10%+.
- If you're writing for a paid campaign, every word has a cost per impression behind it. Be ruthless about what earns its place on the page.

### What not to do

- Don't overwhelm. Less information, not more. If the reader needs a 2,000-word explanation, this isn't a landing page; it's a blog or a white paper.
- Don't hide the CTA. It should be visible without scrolling and repeated at least once below the fold.
- Don't use industry jargon in the headline. The headline's job is to be understood in 3 seconds.

---

## 6. Ad copy

### Purpose

Ad copy drives clicks to landing pages, blog posts, and gated content. It operates under extreme constraints: character limits, scanning speed, and algorithmic quality scores.

### Scope note

The standalone `ad-copy` skill covers general ad copywriting craft (benefits over features, headline techniques, A/B testing, platform specs). This section covers only the Percona-specific layer.

When writing Percona ad copy, apply the `ad-copy` skill's structural rules and platform guides, then overlay the following Percona constraints.

### Percona ad rules

- **Naming**: use "Percona" in headlines wherever character limits allow. For Google Ads responsive search, include "Percona" in at least 3 of 15 headline slots.
- **Trademark compliance**: never pair a third-party trademark (MongoDB, MySQL, PostgreSQL) with disparagement of the trademark owner in ad copy. "Enterprise MongoDB Support" is fine. "MongoDB Support That Actually Works" implies MongoDB, Inc.'s doesn't. See review-rules.md section 1.
- **Naming hierarchy**: "Percona [Service] for [Database]" in headlines. "Expert Support for MySQL" in descriptions. Never "[Database] [Service]" in headlines.
- **Claims**: no "best," "leading," "only." Google and Meta both flag unsubstantiated superlatives. Use specific proof: "Trusted by 3,000+ organizations" or "24x7 support with 15-minute response SLA."
- **CTA alignment**: the ad CTA and the landing page CTA must match. If the ad says "Get a free database assessment," the landing page must offer exactly that.
- **Software positioning**: "Freely available" not "free" in ad copy. Exception: Google Ads character constraints may require "free" in a headline slot, which is acceptable there but should be paired with "open source software" or "freely available" in a description line.
- **Banned words (same as TOV)**: no "leverage," "unlock," "empower," "seamless," "robust," "cutting-edge," "revolutionary," "game-changing."

### Platform notes

| Platform | Headline limit | Description limit | Key Percona note |
|---|---|---|---|
| Google RSA | 30 chars x 15 | 90 chars x 4 | Include "Percona" and primary DB name in at least 3 headlines |
| LinkedIn Sponsored | 70 chars | 150 chars (intro text up to 600) | Lead with a pain point or stat relevant to the DBA/DevOps audience |
| 6sense display | Varies by size | Brief | Follow Percona brand asset guidelines for visual layout |
| Meta | 40 chars primary | 125 chars primary text | Less used for Percona; if used, target by job title |

### A/B testing for Percona

When providing ad variations, always include:
- **Variation A**: benefit-led (outcome for the reader)
- **Variation B**: proof-led (stat, customer count, or SLA)
- **Variation C**: pain-point-led (name the problem they're trying to solve)

Label each variation with its approach so the Percona team knows what they're testing.

---

## 7. Case studies

### Purpose

Case studies are Percona's most powerful bottom-of-funnel asset. They prove that real organizations solved real problems using Percona solutions, with measurable results. Case studies rank as the single most effective content type for influencing B2B buying decisions.

### Structure

Every Percona case study follows the **Situation, Trigger, Barrier, Solution, Results** (STBSR) flow:

1. **Snapshot box** (above the fold)
   - Customer name, industry, company size, region, Percona solutions used, 1-2 headline KPIs.
   - This box exists so a reader can decide in 5 seconds whether this story is relevant to them.

2. **Situation** (2-3 paragraphs)
   - Who is the customer? What do they do? What was their database environment before Percona?
   - Write from the customer's perspective. They are the hero, not Percona.

3. **Trigger** (1-2 paragraphs)
   - What changed? A scaling event, a licensing change, a migration, an outage, a cost problem?
   - This is the "inciting incident" of the story. It creates urgency and makes the reader care.

4. **Barrier** (1-2 paragraphs)
   - What obstacles stood between the customer and a solution? Complexity, vendor lock-in, skills gap, compliance requirements?
   - This is where the reader sees their own situation reflected.

5. **Solution** (2-3 paragraphs)
   - How did Percona help? Be specific about which solutions were used and how they were deployed.
   - Frame every Percona action as a response to the barrier described above. "To address the replication lag, Percona Consulting configured Percona XtraDB Cluster (PXC) with..."
   - Do not turn this into a product feature list. Keep it in the narrative.

6. **Results** (1-2 paragraphs + a before/after table)
   - Lead with the single most impressive metric.
   - Include a 3-4 row table: metric, before, after, improvement.
   - Mention time-to-value: "Within 6 weeks of deployment, the team saw..."
   - If exact numbers aren't available, use directional language: "reduced query latency by more than half." But flag internally with TODO: get exact metrics from customer.

7. **Customer quote** (1-2 sentences)
   - One short, results-focused quote from a named contact. Include their title and company.
   - The quote should reinforce the headline result or name the blocker Percona removed.

8. **CTA**
   - "Explore Percona [full solution name]" or "Talk to our team about [database] support."
   - Use the full Percona product/service name.

### Writing rules

- The customer is the hero. Percona is the guide. Every sentence should center on the customer's experience.
- Quantify everything possible. "Faster" is weak. "40% faster query response under peak load" is proof.
- Keep it under 800 words for the web version. Also produce a 1-page PDF version for sales and a 60-90 second video summary if possible.
- Draft the headline last. Write three headline options; pick the one with the strongest single KPI: "How [Company] Cut Database Costs 60% with Percona Software for MySQL."
- Legal/brand pass: confirm customer has approved the use of their name, logo, quote, and any regulated claims.
- Never edit customer quotes for trademark compliance. If a customer says "Mongo," leave it.

### Multi-asset output

For every case study, plan for:
- **Web page** (primary, scannable, full narrative)
- **PDF one-pager** (sales enablement, designed for email attachment)
- **Social clip** (60-90 second version for LinkedIn/YouTube)
- **Pull quote graphic** (for social promotion)

---

## 8. Press releases

### Purpose

Press releases announce newsworthy events: product launches, major partnerships, funding, executive hires, acquisitions, significant customer wins, or original research. They target journalists, analysts, and AI search engines simultaneously.

### Structure (inverted pyramid)

1. **Headline**: under 70 characters. Outcome-driven, not promotional. Include Percona by name. "Percona Releases PMM 3.0 with Unified PostgreSQL and MySQL Monitoring" not "Exciting New Product Announcement."
2. **Subheadline** (optional): one sentence adding context the headline couldn't fit.
3. **Dateline**: city, state/country, date. e.g., "RALEIGH, N.C., March 20, 2026"
4. **Lead paragraph**: answer who, what, when, where, why in 2-3 sentences. This paragraph must stand alone as a complete news summary. If a journalist only reads this, they have the story.
5. **Impact paragraph**: one short paragraph tying the announcement to audience benefit. How does this help DBAs, DevOps teams, or enterprises?
6. **Key details** (structured bullets): 3-7 bullet points with specifications, features, or differentiators. This section is specifically designed for AI extraction and journalist scanning.
7. **Proof points**: data, benchmarks, or real-world examples that substantiate the announcement. Back every claim with evidence.
8. **Executive quote**: one quote from a Percona leader. It should add insight, not restate the headline. Write it to sound like something a person would actually say in an interview. Use contractions. Avoid committee-speak.
9. **Third-party quote** (if available): a customer, partner, or analyst quote adds external credibility.
10. **Pre-answered FAQ** (2-3 questions): "When is this available?" "Who is this for?" "How does pricing work?" This increases AI "answerability" by 58%.
11. **Boilerplate**: standard Percona company description. Keep to 3-4 sentences. Include website URL.
12. **Media contact**: name, email, phone.

### Writing rules

- Tone: strictly neutral with controlled brand personality in quotes only.
- No superlatives: no "revolutionary," "groundbreaking," "industry-leading." These are already banned in Percona TOV, and journalists actively distrust them.
- No jargon in the headline or lead. Write for a reader who covers technology broadly, not databases specifically.
- Quotes should sound human. Read them aloud. If they sound like a press release, rewrite them.
- Include the (R) symbol on first mention of registered trademarks (MongoDB(R), MySQL(R)) per review-rules.md.
- Trademark disclaimer in the footer: "[Mark] is a registered trademark of [Owner]. Percona is not affiliated with, sponsored by, or endorsed by [Owner]."

### AI and SEO optimization

- Use clear H2-equivalent section labels (AI models extract from labeled sections more reliably).
- Include entity-rich copy: spell out full company names, product names, database names.
- Structured data (bullets, specifications) earns a 38% higher extraction rate from AI models than narrative prose.
- Quotes placed after data/proof sections are 22% more likely to be included in AI-generated "expert opinion" summaries.

### Distribution timing

- Best days: Tuesday, Wednesday, Thursday.
- Best time: 8:00-10:00 a.m. ET (catches East Coast journalists starting their day and West Coast as they log on).
- Worst: Friday afternoon, Monday morning, major holidays, same day as major industry events (your news gets buried).

---

## 9. Video scripts

### Purpose

Video scripts are the foundation for product explainers, customer testimonials, webinar intros, social clips, event promos, and thought leadership pieces. The script dictates pacing, clarity, and whether the viewer stays or leaves.

### Pacing

- **Speaking rate**: 150-160 words per minute. A 2-minute video is approximately 300 words.
- **Hook window**: 7 seconds. The first line must earn the viewer's attention. Open with a problem, a surprising stat, or a direct question. Not "Hi, I'm [name] from Percona, and today we're going to talk about..."
- **Ideal length by type**:

| Video type | Target length | Max length |
|---|---|---|
| Social clip (LinkedIn/X) | 30-60 seconds | 90 seconds |
| Product explainer | 60-90 seconds | 2 minutes |
| Customer testimonial | 90 seconds | 3 minutes |
| Webinar intro | 30-45 seconds | 60 seconds |
| Event promo | 30-45 seconds | 60 seconds |
| Thought leadership | 2-3 minutes | 5 minutes |

### Structure (three-act)

1. **Hook** (0-7 seconds): a problem, stat, or question that makes the viewer care.
   - "Seventy percent of database outages happen because nobody was watching. What if your monitoring told you before it broke?"
   - Not: "Welcome to this video about Percona Monitoring and Management."

2. **Value bridge** (body): the explanation, story, or demonstration.
   - One idea per section. If the script covers three features, give each one a clear transition.
   - Use concrete language. "You'll see the query that's slowing down your dashboard, with the exact table and index it's hitting" beats "You'll get valuable insights into your database performance."
   - For customer testimonials: Situation, Trigger, Result (abbreviated STBSR from the case study structure, minus the detailed barrier/solution).

3. **CTA** (final 10-15 seconds): tell the viewer exactly what to do next.
   - "Try Percona Monitoring and Management (PMM) for free at percona.com/pmm."
   - One CTA. Not "visit our website, follow us on social, and subscribe to our newsletter."

### Writing rules

- **Write for the ear, not the eye.** Read every line aloud. If it's awkward to say, rewrite it.
- **Contractions always.** "You'll" not "you will." "It's" not "it is." Scripts that avoid contractions sound robotic.
- **Short sentences.** 8-15 words average. Viewers can't rewind and reread a sentence. If they miss it, it's gone.
- **Active voice.** "PMM alerts you when replication lags" not "You are alerted by PMM when replication is lagging."
- **One idea per sentence.** Compound sentences with multiple clauses are hard to deliver on camera and hard to follow as a viewer.
- **Use metaphors for complex concepts.** "Think of Percona Operators as autopilot for your database clusters" is easier to grasp in a video than a technical definition.
- **Visuals direction.** Include bracketed notes for visual cues: [SCREEN: PMM dashboard showing query analytics] or [CUT TO: talking head]. The script should tell the editor what to show alongside what's being said.

### Format

Write video scripts in a two-column format:

```
AUDIO                              | VISUAL
-----------------------------------|-----------------------------------
"Seventy percent of outages happen  | [Animated stat: 70% with red
because nobody was watching."       | warning icon]
                                   |
"With PMM, you see the problem     | [SCREEN: PMM dashboard, zooming
before your users do."             | into alerting panel]
```

If two-column formatting isn't practical (e.g., social post caption or voiceover-only), write the script as a single column with [VISUAL] cues in brackets.

### Percona-specific rules

- Use full product names on first mention and in the CTA. Abbreviations are fine in the middle.
- Software is "freely available" not "free" (same as all content). In spoken word, "freely available" can sound stiff; rephrase as "you can download it and start using it today, no cost."
- No military metaphors. "Battle-tested" especially sounds odd in a friendly video.
- Customer testimonial scripts: do not edit the customer's actual words for trademark compliance. If they say "Mongo" or "Postgres," leave it.
- For webinar or event scripts: always specify time zones. "Join us at 11:00 a.m. ET / 4:00 p.m. GMT."

---

## 10. Whitepapers

### Purpose

Whitepapers are Percona's highest-authority long-form asset. They sit at the middle of the funnel — used to educate warm prospects, support complex buying decisions, and arm champions with credible evidence to share internally. A Percona whitepaper demonstrates that we have thought harder about a database problem than anyone else. It earns trust through evidence, not assertion.

Whitepapers are not blog posts with longer word counts. They are not sales brochures. They are not opinion pieces. They are research-backed, structured, peer-reviewed-style documents that take a position and defend it with data.

### Whitepaper types — choose one before writing

| Type | Purpose | Funnel stage |
|---|---|---|
| Problem-solution | Diagnoses a business pain and prescribes a structured approach. Most common for Percona. | Mid-funnel |
| Technical how-to | Configuration, integration, or implementation detail for practitioners (DBA, SRE, DevOps). | Mid-to-bottom |
| Backgrounder | Frames a market trend or technology for non-technical stakeholders. Good for CIO/CTO audience. | Top-to-mid |
| Market research | Shares survey data, benchmarks, and actionable insights. Requires real data to be credible. | Top-to-mid |
| Comparative buyer's guide | Positions Percona against alternatives. Evidence-led, not promotional. | Bottom |

### Structure

Every Percona whitepaper follows this structure. Do not skip sections.

1. **Cover** — Title (benefit-driven, under 12 words), Percona branding, date, author name and title
2. **Executive summary** (1–2 pages) — Problem in one sentence. Why it matters now. What the whitepaper argues. What the reader will be able to do after reading it. Written last, placed first.
3. **Introduction** — Set the context. Establish why this problem matters for the reader's business specifically. Include one striking data point in the first 100 words.
4. **Problem analysis** (2–4 sections with H2 subheads) — Define the problem in depth. Use data, industry research, and real-world examples. Cite sources. Do not mention Percona yet.
5. **Solution framework** — Present the approach or methodology. This is where Percona's perspective comes in, but frame it as the logical answer to the analysis, not as a product pitch.
6. **Evidence and proof** — Customer examples (named where possible, anonymised where not), benchmark data, third-party research. At least one quantified outcome.
7. **Recommendations** (3–5 bullet points or numbered steps) — Concrete, actionable. Tied directly to the problem analysis.
8. **Conclusion** — One paragraph. What the reader now knows. What they should do next.
9. **CTA** — Specific and low-friction. "Talk to a Percona DBA about your environment" beats "Contact us."
10. **About Percona** — Two sentences max. Standard boilerplate.

### Word count

- Problem-solution: 3,000–5,000 words
- Technical how-to: 2,500–4,000 words
- Backgrounder: 2,000–3,500 words
- Market research: 3,000–6,000 words
- Comparative buyer's guide: 2,500–4,000 words

### Evidence and citation rules

- Every factual claim must have a source. No unattributed statistics.
- Prefer primary sources: Percona's own benchmarks, customer data, original research. Secondary: Gartner, Forrester, IDC, Stack Overflow Developer Survey, DORA report.
- Do not cite competitors' marketing materials as evidence.
- If using Percona benchmark data, state methodology: what hardware, what configuration, what workload.

### Tone calibration

Whitepapers dial up the formality compared to Percona's default TOV — but never to the point of being dry or academic. The Percona voice still applies: direct, honest, occasionally challenging. Just more measured. No "UNSHITTIFICATION"-style provocation here. Save the edge for the blog.

- Present tense, active voice throughout
- Define technical acronyms on first use
- No em dashes (Percona-wide rule)
- Subheads every 250–350 words so readers can skim
- One chart, diagram, or table per major section where it adds clarity

### What not to do

- Do not open with "In today's rapidly evolving database landscape." Ever.
- Do not make the whitepaper a product brochure. Percona products should appear in the solution section only, and only where they genuinely solve the stated problem.
- Do not pad word count with background history that the reader already knows.
- Do not use unverified claims. "Many organisations struggle with..." is not evidence. Find the number.

---

## 11. Guides

### Purpose

Guides are Percona's practitioner-facing educational content. They sit at the top-to-middle of the funnel and are written to be acted on — not just read. A good Percona guide teaches someone how to do something specific, in enough detail that they can actually do it after reading.

Guides are more conversational and less formal than whitepapers. They feel like advice from a knowledgeable Percona engineer, not a corporate document. The test: could a DBA or DevOps engineer open this guide, follow it, and have their problem solved by the end?

### Guide types — choose one before writing

| Type | Example |
|---|---|
| How-to guide | "How to Set Up PostgreSQL Streaming Replication" |
| Best practice guide | "MySQL Performance Tuning: 12 Best Practices for Production" |
| Migration guide | "Migrating from Oracle to PostgreSQL: A Practical Guide" |
| Decision guide | "Choosing Between MySQL 8.0 and 8.4: What DBAs Need to Know" |
| Getting started guide | "Getting Started with Percona Monitoring and Management" |

### Structure

1. **Title** — Specific, practical, audience-clear. Includes the technology and the outcome. "The Complete Guide to X" is fine if it's actually complete.
2. **Who this is for** (2–3 sentences) — State the audience explicitly. "This guide is for DBAs managing MySQL in production who are experiencing replication lag." Readers self-select in or out immediately.
3. **What you'll learn / what you'll be able to do** — 3–5 bullet points. Concrete outcomes, not vague promises.
4. **Prerequisites** (if technical) — What the reader needs to have in place before starting. Software versions, access levels, environment assumptions.
5. **Sections / steps** (H2 subheads) — Each section covers one thing. If technical: commands in code blocks, expected output, common errors and how to fix them. If conceptual: one idea per section, short paragraphs, examples.
6. **Summary or key takeaways** — What they've done / learned. Not a repeat of the intro.
7. **Next steps / CTA** — Where to go deeper. Related Percona resources, documentation, or a specific offer.

### Word count

- How-to / getting started: 1,200–2,500 words
- Best practice: 2,000–3,500 words
- Migration / decision guide: 2,500–4,000 words

### Tone calibration

Guides use Percona's default voice but dial up the clarity and dial down the edge. This is the space where we sound most like a trusted engineer explaining something to a colleague. Friendly authority. Peer-to-peer, not expert-to-novice.

- Second person ("you") throughout
- Imperatives for instructions ("Run this command", "Set the parameter to...")
- Short sentences for steps. Longer sentences for context and explanation.
- Callout boxes for warnings, tips, and gotchas
- Code blocks for any commands, queries, or configuration snippets — always tested for accuracy

### What not to do

- Do not write a guide that requires another guide to understand. If prerequisites are heavy, link out.
- Do not mix conceptual explanation and step-by-step instruction in the same section without clear signposting.
- Do not use product names without explaining what they do — even if "everyone knows PMM," write "Percona Monitoring and Management (PMM)" on first mention.

---

## 12. Executive Briefs

### Purpose

Executive briefs are written for budget holders and strategic decision-makers: CIOs, CTOs, VPs of Engineering, VP of Infrastructure, CFOs. They are short, opinionated, and designed to influence a specific decision. They are not whitepapers compressed into two pages. They are a different format entirely — one that respects that executives have 90 seconds, not 90 minutes.

A Percona executive brief answers one question: "Why should I care about this, and what should I do about it?" Everything else is cut.

### Structure

**Strict 1–2 page maximum. No exceptions.**

1. **Headline** — A statement, not a topic. "The Hidden Cost of Managed Database Lock-in" not "Managed Databases." Takes a position the reader may not have fully articulated yet.
2. **The situation** (1 short paragraph) — What is happening in the market or in the reader's environment that makes this relevant right now. One data point or trend. No more than 4 sentences.
3. **The problem this creates** (3–5 bullet points or 1 short paragraph) — Business consequences. Frame in the executive's language: cost, risk, compliance exposure, competitive disadvantage, team productivity. Not technical problems.
4. **The Percona perspective** (1 short paragraph) — Our view on the right approach. Not a product pitch. A position. "The answer is not a managed service with an exit tax. It's an open-source stack with the right expertise behind it."
5. **Why Percona** (2–4 bullet points) — Specific, evidence-backed reasons. Customer outcomes with numbers where available. Keep tight.
6. **Recommended next step** (1 sentence + CTA) — One specific action. "Talk to a Percona architect about your current database estate." Not "contact us to learn more."

### Tone calibration

Executive briefs are Percona's most restrained format — but the voice still has edge. They should feel like something a sharp, senior Percona person handed the CIO after a 10-minute conversation. Confident. Direct. Respects the reader's intelligence and time.

- No jargon without definition. CIOs know "TCO" and "lock-in." They do not need "WAL" or "XtraDB."
- No filler phrases. "In today's competitive landscape" is cut on sight.
- Active verbs. Concrete nouns. No nominalisations ("the utilisation of" → "using").
- Numbers are your friends. Specificity builds credibility. "Up to 40% lower database costs" beats "significant savings."

### What not to do

- Do not turn it into a whitepaper. If it needs three pages, it is not an executive brief.
- Do not write for a technical reader. If a DBA would find it interesting, a CIO probably will not.
- Do not list features. List outcomes.
- Do not end with a vague CTA. "Contact us" is not a next step. Name the action, name the person, make it specific.
