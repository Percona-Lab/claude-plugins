# Percona: Value Propositions

## Table of Contents

1. [Campaign pillars](#campaign-pillars)
2. [Value propositions by product](#by-product)
3. [Value propositions by persona](#by-persona)
4. [Value propositions by pain point](#by-pain-point)

---

## Campaign pillars

Percona organizes its messaging around four value pillars. Every piece of content should align with at least one.

### 1. Cost Optimization and Price/Performance

**Core message:** Eliminate proprietary licensing fees. Reduce cloud spend. Get enterprise features without the enterprise price tag. Standardize operations to reduce overhead.

**The problem:** Modern database landscapes span multiple engines across on-prem, cloud, and hybrid (including Kubernetes). Operational sprawl (multiple monitoring systems, backup tools, vendor SLAs) creates overhead. Proprietary DBaaS tiers enforce sizing floors and support bundles that lead to under-utilization. Industry data: 58% of organizations believe cloud spend is higher than it should be (CloudZero 2024). VMware survey: nearly half reported 25%+ of public cloud spend is wasted.

**Percona's solution:**
- Transparent, usage-based pricing scoped to real deployment needs. No per-core pricing, license gates, or hidden fees.
- $0 in database licensing (all software freely available)
- Right-sized infrastructure: Expert Support and ExpertOps align to actual usage, avoiding DBaaS premium costs
- Customers typically cut 20-30% in infrastructure waste (consistent with Flexera's 32% cloud overspend findings)

**Proof points:** Protectall (eliminated MySQL Enterprise licensing, unified governance), Optimum Instruments (avoided DBA hire, reduced 20+ engineer hours/month), BBVA (eliminated MongoDB Enterprise licensing across 400+ servers), LeadByte (migrated from AWS Aurora, eliminated cloud licensing premiums), Turk Telekom (eliminated licensing costs with Percona Distribution for PostgreSQL)

**Relevant products:** All Percona Server products, PMM, Expert Support, ExpertOps, Percona Operators

### 2. Performance and Reliability at Scale

**Core message:** Your databases run faster, stay up longer, and handle more load with Percona. Predictable performance under pressure, not just "fast."

**The problem:** 100ms of added latency reduces conversion rates by 7% (Akamai). Every hour offline costs enterprises six figures (Atlassian). As environments expand, latency creeps in, reliability falters, and operational debt compounds. Teams can't answer: how long does recovery take? Are backups automated? Is tuning consistent?

**Percona's solution:**
- 24x7 expert coverage with engineers who monitor telemetry, analyze query patterns, and tune systems continuously
- Automated resilience through PMM, XtraBackup, and Percona Operators for standardized replication, failover, and rolling upgrades
- Performance optimization at scale: query tuning, schema review, storage-layer optimization (buffer pools, I/O scheduling, cache efficiency)
- Rapid incident recovery with defined SLAs (15-30 min Sev1 response)

**Proof points:** Layer7 (200M calls, 680M+ transactions/month, zero unplanned downtime), Optimum Instruments (40% reduction in downtime incidents, stabilized latency), Carpages.ca (60-100% traffic growth handling, continuous uptime), Peak Games (millions of daily active users, fast gaming experience)

**Relevant products:** All Percona Server products, PXC, PMM, Expert Support, ExpertOps, XtraBackup, Percona Operators

### 3. Security, Sovereignty, and Compliance

**Core message:** Secure your data. Meet compliance requirements. Keep control of where your data lives and how it's protected. Prove compliance, not just claim it.

**The problem:** 140+ countries have data protection or sovereignty laws (BearingPoint). Nearly half of enterprises cite data sovereignty and compliance as top design priorities (IDC). Hyperscaler ecosystems make it difficult to verify what "secure" means inside managed services. Average data breach costs $4.88M (IBM 2024). Only 20% of organizations generate SBOMs (arXiv 2025).

**Percona's solution:**
- Sovereign control: full visibility into database environments, freedom to run on any infrastructure (public cloud, private cloud, hybrid, air-gapped)
- Open and verifiable software: code is accessible, customers can verify encryption, access control, and runtime logic
- Standardized encryption: transparent data-at-rest encryption across PostgreSQL (pg_tde), MySQL, and MongoDB, with external key management (HashiCorp Vault, Thales CipherTrust, Fortanix SDKMS, OpenBao, Akeyless)
- TLS and role-based access by default across all engines
- Transparent CVE process with public advisories
- Operational resilience: Expert teams validate backups, run live recovery drills, maintain RTOs under 15 minutes
- FIPS 140-2 validated builds available

**Proof points:** Merchant Warrior (PCI-DSS Level 1), TDE for PostgreSQL (first fully open source implementation), Percona Pro Builds (FIPS validation)

**Relevant products:** TDE for PostgreSQL (pg_tde), Percona Pro Builds, audit logging (PSMDB, Percona Server for MySQL), LDAP/OIDC/Kerberos/PAM authentication, Expert Consulting

### 4. Future Readiness (AI, Emerging Workloads)

**Core message:** Prepare your database infrastructure for AI, real-time analytics, and cloud-native workloads without replatforming or new lock-in.

**The problem:** 75% of enterprise AI workloads will deploy on hybrid infrastructure by 2027 (IDC). Proprietary vendors package "AI readiness" behind gated features. Vector search and embeddings tied to enterprise SKUs. 70% of organizations report data-governance difficulties in AI efforts (McKinsey 2024).

**Percona's solution:**
- AI-ready databases: pgvector support in PostgreSQL today, commitment to bring vector search for MongoDB and MySQL as ecosystems mature
- Valkey community supports early vector similarity search (valkey-search module)
- Hybrid and multi-cloud flexibility through Percona Operators
- Data integrity and compliance maintained for sensitive data in AI training (encryption, RBAC, audit logs)
- Predictable performance and cost for AI workloads through ExpertOps tuning

**Proof points:** Percona Packages AI Readiness Bundle, Percona Operators for Kubernetes-native operations, 55.3% of PostgreSQL users now use AI-enabled tools (State of PostgreSQL 2024 survey)

**Relevant products:** Percona Distribution for PostgreSQL (pgvector), Percona Operators, PMM, Percona Packages (AI Readiness), ExpertOps

---

## By product

| Product | Primary value | One-line pitch |
|---|---|---|
| Percona Server for MySQL | Enterprise MySQL features, zero licensing cost | All of MySQL Enterprise's features, freely available and fully compatible |
| Percona XtraDB Cluster | MySQL high availability | Synchronous multi-primary replication for zero-downtime MySQL |
| Percona XtraBackup | Non-disruptive MySQL backups | Hot backups without locking your production MySQL server |
| Percona Server for MongoDB | MongoDB enterprise features without vendor lock-in | Wire-compatible MongoDB with audit, LDAP, and encryption at rest. No licensing fees. |
| Percona Backup for MongoDB | Consistent MongoDB cluster backups | Point-in-time recovery across sharded MongoDB clusters |
| Percona Distribution for PostgreSQL | Complete, production-ready PostgreSQL | Enterprise-ready PostgreSQL with TDE, HA, backup, and monitoring, out of the box |
| Percona Monitoring and Management (PMM) | Unified database observability | One dashboard for MySQL, PostgreSQL, MongoDB, and MariaDB monitoring |
| Percona Operators | Kubernetes-native database operations | Run production databases on Kubernetes with automated Day-2 operations |
| Percona Toolkit | Advanced DBA automation | Command-line tools for the tasks that are too complex or risky to do manually |
| Percona Pro Builds | Certified, security-hardened software | FIPS-validated, enterprise-certified builds for regulated environments |
| Expert Support | 24x7 database expert access | Senior database engineers on call, not script-reading generalists |
| ExpertOps | Proactive database management | Percona engineers manage your databases without taking away your visibility |
| Expert Consulting | Project-based expertise | Hands-on practitioners, not slide-deck consultants |
| OpenEverest | Private DBaaS on your infrastructure | Cloud-managed database convenience on your own Kubernetes, with no vendor lock-in |

---

## By persona

### CIO / VP of Engineering

**What they care about:** TCO, risk, vendor strategy, business continuity, digital transformation
**Lead with:**
- Cost savings from eliminating proprietary licensing (Oracle, MongoDB Enterprise)
- Risk reduction through multi-database expertise and 24x7 support
- Strategic value of open source (no vendor lock-in, portability, auditability)
- Enterprise-grade SLAs and support

### IT Procurement

**What they care about:** Cost, contract terms, licensing simplicity, compliance
**Lead with:**
- No per-core licensing, no audits
- Flexible engagement models (support, managed services, consulting)
- Transparent, simple licensing (open source)
- Cost comparison vs. proprietary alternatives

### DBA

**What they care about:** Tool quality, query performance, backup reliability, expert help
**Lead with:**
- Percona Toolkit (industry-standard DBA tools)
- PMM for monitoring and query analysis
- Expert Support from kernel-level database engineers
- Percona Server features (thread pooling, audit, encryption)
- Specific technical benchmarks and performance data

### SRE

**What they care about:** Uptime, observability, automation, SLOs, incident response
**Lead with:**
- PMM for unified database observability
- Percona Operators for automated database operations on Kubernetes
- Expert Support for incident response
- HA solutions (PXC, Patroni integration for PostgreSQL)

### DevOps Engineer

**What they care about:** Kubernetes, automation, CI/CD, infrastructure as code, multi-cloud
**Lead with:**
- Percona Operators (Kubernetes-native, Helm charts, GitOps-compatible)
- Multi-cloud portability (no cloud vendor lock-in)
- OpenEverest for private DBaaS
- Freely available software (no licensing to manage)

### Developer

**What they care about:** Getting started fast, documentation, community, not fighting infrastructure
**Lead with:**
- Freely available software (download and run)
- Drop-in compatible with community versions
- Active community and documentation
- PMM for understanding query performance

### Enterprise Architect

**What they care about:** Technology strategy, vendor risk, architecture patterns, standards
**Lead with:**
- Open source, no proprietary lock-in
- Multi-database strategy (single vendor for MySQL, PostgreSQL, MongoDB)
- Kubernetes-native database operations
- Portability across cloud and on-premises

---

## By pain point

| Pain point | Percona's answer | Products/services |
|---|---|---|
| Proprietary licensing costs | Freely available software with enterprise features | Percona Server (MySQL, MongoDB), Distribution for PostgreSQL |
| Database downtime and reliability | HA solutions, expert support, proactive monitoring | PXC, Expert Support, ExpertOps, PMM |
| Cloud vendor lock-in | Multi-cloud portability, Kubernetes-native operations | Percona Operators, OpenEverest |
| Compliance and data sovereignty | Open source TDE, audit logging, FIPS builds, on-premises deployment | TDE for PostgreSQL, Pro Builds, PSMDB audit/LDAP |
| DBA talent shortage | Expert support and managed services supplement internal teams | Expert Support, ExpertOps, Percona Packages |
| Legacy database migration | Consulting expertise for Oracle-to-PostgreSQL and other migrations | Expert Consulting, Percona Distribution for PostgreSQL |
| AI/ML readiness | Database optimization for AI workloads | Percona Packages (AI Readiness), Expert Consulting |
| Multi-database complexity | Single vendor for MySQL, PostgreSQL, MongoDB, Valkey | Full Percona portfolio, PMM for unified monitoring |

> **TODO: Add specific value propositions by industry vertical (finance, tech, healthcare, retail, etc.) once 09-industry-verticals.md is populated with internal data.**
