# Percona: Buyer Personas Index

This file is an index. For full persona profiles, read the individual persona files in the `personas/` directory.

---

## Persona overview

Percona targets two categories of buyer:

### Buyer / Validator Personas (sign off on purchases)

| Persona | Character name | File | Key concern |
|---|---|---|---|
| CIO | "Carrie" (35-55yo) | `personas/persona-cio.md` | ROI, digital transformation, vendor trust, strategic IT decisions |
| IT Procurement Manager/Director | (30-45yo) | `personas/persona-it-procurement.md` | Cost, licensing, contract terms, compliance, vendor management |

### User / Influencer Personas (evaluate, recommend, advocate internally)

| Persona | Sub-personas | File | Key concern |
|---|---|---|---|
| DBA | Kavitha (Junior, 28, healthcare/cloud) and Cameron (Senior, 42, banking, 15yr veteran) | `personas/persona-dba.md` | Query performance, backup reliability, tool quality, expert support |
| SRE | Aaron (Junior, 27, fintech) and Sarah (Senior, 35, large software co) | `personas/persona-sre.md` | Uptime, SLOs, observability, automation, incident response |
| DevOps Engineer | Karolina (Junior, 24, Germany), Vasil (Mid, 35, Ireland), Chevan Yanowitz (Senior, 40, US) | `personas/persona-devops.md` | Kubernetes, automation, CI/CD, multi-cloud, infrastructure as code |
| Developer | Jane Hudson (Junior, 22, gaming) and Dinesh Devi (Senior, 35, banking backend) | `personas/persona-developer.md` | Getting started, documentation, community, code samples, database selection |
| Enterprise Architect | "Chris Anderson" (35-45yo) | `personas/persona-enterprise-architect.md` | Technology strategy, vendor risk, architecture patterns, anti-lock-in |

---

## Buying roles

| Role | Personas | What content they need |
|---|---|---|
| Initiator (discovers Percona) | DBA, Developer, DevOps | Technical content, documentation, community |
| Influencer (evaluates and recommends) | DBA, SRE, DevOps, Developer, Enterprise Architect | Benchmarks, comparisons, architecture guides, proof points |
| Validator (approves the purchase) | CIO, IT Procurement | ROI analysis, risk assessment, compliance documentation, executive summaries |
| Decision maker (signs the contract) | CIO | Business case, strategic fit, vendor trust |

---

## Seniority calibration

| Seniority | Content depth | Tone | Skepticism level |
|---|---|---|---|
| Junior | Educational, step-by-step, emphasize learning and community | Approachable, supportive | Low (open, curious, needs hand-holding) |
| Mid-level | Balanced, practical, operational | Peer-to-peer | Moderate |
| Senior | Proof-driven, benchmark-heavy, operational maturity | Peer-to-peer, respect their experience | High (seen vendor pitches, skeptical of claims) |
| Executive | Strategic framing, business outcomes, risk reduction | Concise, executive-level | High (needs ROI and risk framing, not technical detail) |

---

## Competitive landscape by persona

Each persona evaluates Percona against different alternatives:

| Persona | Primary competitive frame |
|---|---|
| CIO | Oracle (cost), MongoDB Inc. (licensing risk), cloud vendors (lock-in) |
| IT Procurement | Oracle (licensing complexity), all vendors (contract terms, TCO) |
| DBA | Oracle (lock-in), MariaDB (MySQL alternative), MongoDB Enterprise (features) |
| SRE | Cloud-managed services (RDS, Cloud SQL), proprietary monitoring tools |
| DevOps Engineer | Cloud-managed databases (RDS, Aurora, Cloud SQL), managed Kubernetes database services |
| Developer | MongoDB Atlas (convenience), AWS RDS (ease of use), managed services generally |
| Enterprise Architect | Oracle (strategy risk), cloud vendors (lock-in), all proprietary databases |
