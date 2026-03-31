---
name: percona-knowledge-base
description: >
  The single source of truth for all factual knowledge about Percona: company facts,
  products, services, licensing, naming rules, competitive landscape, customer proof
  points, value propositions, buyer personas, industry verticals, and commercial model.
  Every other Percona skill should reference this knowledge base instead of maintaining
  its own copy of Percona facts. Trigger this skill whenever any Percona skill needs
  to look up a fact about Percona, its products, its customers, its competitors, or
  its market position. Also trigger directly when the user asks factual questions about
  Percona ("what does Percona do?", "what is PMM?", "who are Percona's competitors?",
  "what databases does Percona support?", "tell me about Percona's services").
---

# Percona Knowledge Base

This is the authoritative reference for all factual information about Percona. Other Percona skills (content-and-copy, percona-voice-writer, percona-tov, percona-persona, percona-account-plan, percona-ab-test-generator, percona-tov-review) should read from this knowledge base rather than maintaining their own copies of Percona facts.

## How to use this skill

1. Identify which topic you need (see index below)
2. Read ONLY the specific reference file(s) you need
3. Do not load all files at once; load on demand

## Reference File Index

| File | What it contains | Read when you need to... |
|---|---|---|
| `references/01-company.md` | Founding, leadership, mission, size, history, milestones | Write "about Percona" copy, brief someone on the company, verify company facts |
| `references/02-products.md` | Every product: name, description, features, status, who it's for | Mention any Percona product, describe what a product does, check product status |
| `references/03-services.md` | Expert Support, ExpertOps, Expert Consulting, Percona Packages, training | Describe Percona services, write services copy, verify service names |
| `references/04-licensing.md` | License per product, open source vs source available, Percona's role per DB | Verify licensing claims, write about open source, describe Percona's relationship to each database |
| `references/05-naming-and-branding.md` | Product naming rules, terminology, AP Style exceptions, grammar rules | Write any Percona copy (always check this), review copy for compliance |
| `references/06-competitive-landscape.md` | Competitors by database, positioning, differentiators | Write competitive content, position Percona against alternatives, brief sales teams |
| `references/07-customer-proof-points.md` | Case studies and customer logos by vertical | Reference customer stories, write case-study-backed content, build account plans |
| `references/08-value-propositions.md` | Value props by product, by persona, by vertical, campaign pillars | Write messaging, build pitch decks, create landing pages, tailor content to audience |
| `references/09-industry-verticals.md` | Target verticals, use cases, compliance context, entry points | Write vertical-specific content, build account plans, tailor outreach |
| `references/10-personas.md` | Index of all 7 buyer personas / 12 named characters | Identify target audience, role-play as persona, write persona-targeted content |
| `references/11-commercial.md` | How Percona makes money, packaging, sales motion | Understand commercial context, write sales-aligned content |
| `references/12-changelog.md` | Dated log of product/service changes, renames, discontinuations | Verify current product status, check for recent changes, avoid referencing deprecated items |

## Persona detail files

For full persona profiles (demographics, goals, challenges, messaging guidance), read the individual persona files:

| File | Persona |
|---|---|
| `personas/persona-cio.md` | CIO ("Carrie") |
| `personas/persona-it-procurement.md` | IT Procurement Manager/Director |
| `personas/persona-dba.md` | DBA (Kavitha, Cameron) |
| `personas/persona-sre.md` | SRE (Aaron, Sarah) |
| `personas/persona-devops.md` | DevOps Engineer (Karolina, Vasil, Chevan) |
| `personas/persona-developer.md` | Developer (Jane, Dinesh) |
| `personas/persona-enterprise-architect.md` | Enterprise Architect ("Chris Anderson") |

## Important: What this skill does NOT contain

This skill contains **facts about Percona**. It does NOT contain:

- How to write copy (see: content-and-copy, percona-voice-writer)
- Tone of voice rules (see: percona-tov)
- How to review copy (see: percona-tov-review)
- How to build account plans (see: percona-account-plan)
- How to generate A/B variants (see: percona-ab-test-generator)
- Anti-AI writing rules (see: anti-ai-writing)

Those skills contain **workflow and style instructions**. This skill contains **the factual knowledge they all draw from**.
