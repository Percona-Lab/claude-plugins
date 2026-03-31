# Percona: Licensing and Open Source

## Table of Contents

1. [Core rules](#core-rules)
2. [License status by product](#license-status-by-product)
3. [Percona's role by database](#perconas-role-by-database)
4. [How to describe licensing in copy](#how-to-describe-licensing-in-copy)
5. [Upstream relationships](#upstream-relationships)

---

## Core rules

1. Only call software "open source" if it uses an OSI-approved license.
2. If not OSI-approved (e.g., SSPL), call it "source available."
3. If license status is uncertain, default to "source available" and flag for verification.
4. Describe governance neutrally: "community-governed" vs. "company-governed." Tie it to trust and operational impact, not morality.
5. No legal speculation or compliance advice.
6. Describe Percona's software as "freely available," never "free."

---

## License status by product

### Percona-developed software

| Product | License | Type | Notes |
|---|---|---|---|
| Percona Server for MySQL | GPL v2 | Open source | |
| Percona XtraDB Cluster (PXC) | GPL v2 | Open source | |
| Percona XtraBackup | GPL v2 | Open source | |
| Percona Distribution for MySQL | GPL v2 | Open source | Bundle; all components GPL |
| Percona Toolkit | GPL v2 | Open source | |
| Percona Server for MongoDB (PSMDB) | SSPL | Source available | Inherited from upstream MongoDB. Do NOT call "open source." |
| Percona Backup for MongoDB | Apache 2.0 | Open source | |
| Percona Distribution for MongoDB | Mixed | Mixed | PSMDB is SSPL; other components Apache/GPL |
| Percona Distribution for PostgreSQL | PostgreSQL License | Open source | |
| Percona Monitoring and Management (PMM) | AGPL v3 | Open source | |
| Percona Operators (MySQL, MongoDB, PostgreSQL) | Apache 2.0 | Open source | |
| OpenEverest (formerly Percona Everest) | Apache 2.0 | Open source | Now independent project |
| Percona Pro Builds | Same as base product | Same as base product | Certified/hardened builds of existing products |

### Databases Percona supports (not Percona's own software)

| Database | License | Governance | Notes |
|---|---|---|---|
| Valkey | BSD-3-Clause | Community-governed | Forked from Redis after license change. Percona provides support only. |
| Redis | AGPL (as of 2025) | Company-governed (Redis Ltd) | Re-licensed from BSD. Percona provides support only. |
| MariaDB | GPL v2 | Foundation-governed (MariaDB Foundation) | Percona provides support only. |

---

## Percona's role by database

| Database | Percona develops software? | Percona provides support/services? |
|---|---|---|
| MySQL | Yes (Percona Server, PXC, XtraBackup, Toolkit, Distribution, Operators) | Yes |
| PostgreSQL | Yes (Distribution for PostgreSQL with TDE, Operators) | Yes |
| MongoDB | Yes (PSMDB, Backup for MongoDB, Distribution, Operators) | Yes |
| Valkey | No | Yes (24x7 enterprise support, launched 2025) |
| Redis | No | Yes (operational expertise) |
| MariaDB | No | Yes (support and operational expertise) |

**Critical rules:**
- Never claim Percona develops Redis or MariaDB software.
- OK: "Percona supports Redis users with operational expertise."
- NOT OK: "Percona builds software for Redis."

---

## How to describe licensing in copy

### Percona's open source position (priority order)

1. **Accuracy:** Be exact on license and governance
2. **Customer value:** Reliability and continuity
3. **Transparency:** Code and operations are open and auditable
4. **Sustainability:** Profitable, long-term open source practice
5. **Fairness:** Acknowledge others' good actions without hostility

### Language rules

| Scenario | Correct language | Incorrect language |
|---|---|---|
| Describing Percona MySQL software | "freely available," "open source" | "free" |
| Describing PSMDB | "freely available," "source available" | "open source" (SSPL is not OSI-approved) |
| Describing Valkey | "open source" (BSD-3) | |
| Describing Redis | "open source" (AGPL, as of 2025 re-license) | |
| Describing Percona software generally | "freely available open source database software" | "free software" |

---

## Upstream relationships

Percona's software products are based on upstream community projects with added enterprise features:

| Percona product | Based on | Relationship |
|---|---|---|
| Percona Server for MySQL | MySQL Community (Oracle) | Drop-in replacement. 100% wire-compatible. Adds enterprise features (thread pool, audit, PAM, encryption). |
| Percona XtraDB Cluster | MySQL Community + Galera | Adds synchronous multi-primary replication to Percona Server for MySQL. |
| Percona Server for MongoDB | MongoDB Community | Drop-in, wire-compatible replacement. Adds audit, LDAP, encryption at rest, hot backups. |
| Percona Distribution for PostgreSQL | PostgreSQL Community | Bundles community PostgreSQL with curated extensions (pgBackRest, Patroni, pgBouncer, TDE, etc.). |
| PMM | Grafana, Prometheus, ClickHouse, Victoria Metrics | Open source monitoring stack customized for database workloads. |

**Key message:** Percona's software is compatible with upstream versions. Customers can switch between upstream and Percona versions without application changes. This is the anti-lock-in story.
