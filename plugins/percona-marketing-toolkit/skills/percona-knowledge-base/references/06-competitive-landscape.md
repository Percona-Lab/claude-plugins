# Percona: Competitive Landscape

## Table of Contents

1. [Positioning overview](#positioning-overview)
2. [Oracle](#oracle)
3. [MongoDB, Inc.](#mongodb-inc)
4. [AWS database services](#aws-database-services)
5. [Google Cloud database services](#google-cloud-database-services)
6. [Microsoft Azure database services](#microsoft-azure-database-services)
7. [EnterpriseDB (EDB)](#enterprisedb-edb)
8. [MariaDB](#mariadb)
9. [Redis Ltd and Valkey](#redis-ltd-and-valkey)
10. [Positioning by persona](#positioning-by-persona)

---

## Positioning overview

Percona's core competitive position: **freedom from vendor lock-in with enterprise-grade expertise.**

Percona competes differently depending on the context:
- Against **proprietary vendors** (Oracle, MongoDB Inc.): Freedom, cost, and open source
- Against **cloud-managed services** (AWS RDS, Google Cloud SQL, Azure): Control, portability, and cost
- Against **other open source companies** (EDB, MariaDB): Breadth (multi-database) and depth of expertise

**Percona's unique position:** The only company that provides enterprise-grade software AND services across MySQL, PostgreSQL, AND MongoDB. Other competitors specialize in one database.

---

## Oracle

**Where Percona competes:** Oracle Database to PostgreSQL migrations. Oracle MySQL Enterprise to Percona Server for MySQL.

**Why companies leave Oracle:**
- Licensing cost (Oracle's per-core licensing is expensive and complex)
- Vendor lock-in (proprietary features create migration barriers)
- Audit risk (Oracle is known for aggressive license compliance audits)
- Desire for open source and cloud portability

**Percona's counter-positioning:**
- Percona Distribution for PostgreSQL as the landing zone for Oracle-to-PostgreSQL migrations
- Percona Server for MySQL as a drop-in replacement for MySQL Enterprise (same features, no licensing cost)
- Expert Consulting for migration planning and execution
- Proof point: Protectall migrated from MySQL Enterprise to Percona Server for MySQL, saving significant licensing costs

**Key messages:**
- "Move off Oracle without sacrificing enterprise features"
- "Open source PostgreSQL with the enterprise capabilities you need"
- "No per-core licensing, no audits, no lock-in"

**Important naming rule for MySQL:** When comparing Percona Server for MySQL to MySQL Enterprise, use "a functional alternative to Oracle MySQL Enterprise Edition," NOT "a drop-in replacement." (Percona Server for MySQL IS a drop-in replacement for MySQL Community, but NOT for MySQL Enterprise.)

> **TODO: Add specific Oracle-to-PostgreSQL migration proof points and typical savings ranges from internal data.**

---

## MongoDB, Inc.

**Where Percona competes:** MongoDB Enterprise to Percona Server for MongoDB (PSMDB). MongoDB Atlas (managed) vs. self-managed with Percona.

**Why companies consider alternatives:**
- MongoDB Enterprise licensing costs at scale
- SSPL license change (2018) created trust concerns
- MongoDB Atlas lock-in to MongoDB's cloud platform
- Desire for enterprise features without vendor dependency

**Percona's counter-positioning:**
- PSMDB is fully wire-compatible with MongoDB, includes enterprise features (audit, LDAP, encryption at rest)
- PSMDB is freely available (no licensing cost)
- Percona provides 24x7 expert support for MongoDB deployments
- Proof point: BBVA replaced MongoDB Enterprise with PSMDB across 400+ servers, 300+ databases, 35 TB. 20% faster backup recovery.

**Key messages:**
- "Keep MongoDB. Drop the licensing cost."
- "Fully compatible, freely available, enterprise-ready"
- "BBVA saved [amount] by switching to Percona's MongoDB distribution"

**Important trademark rule:** Never pair the MongoDB trademark with copy that disparages MongoDB, Inc. in headlines, subheads, or CTAs. MongoDB enforcement risk is HIGH.

> **TODO: Add more MongoDB migration proof points from internal data. Quantify typical savings.**

---

## AWS database services

**Where Percona competes:** Amazon RDS (MySQL, PostgreSQL, MariaDB), Amazon Aurora, Amazon DocumentDB vs. self-managed databases with Percona on EC2 or EKS.

**Why companies consider alternatives:**
- Cloud vendor lock-in (RDS-specific features, Aurora-specific behaviors)
- Cost at scale (RDS/Aurora pricing increases with instance size and storage)
- Limited control over database configuration and optimization
- Multi-cloud strategy requires portability
- Data sovereignty requirements

**Percona's counter-positioning:**
- Percona Operators for Kubernetes enable database portability across clouds
- Self-managed databases with Percona software and support on any infrastructure
- Full control over configuration, tuning, and optimization
- No cloud-vendor-specific lock-in
- Proof point: Lookout worked with Percona to reduce their AWS cloud footprint and operational costs

**Key messages:**
- "Run your databases on any cloud, on-premises, or hybrid. No lock-in."
- "Percona Operators give you cloud-managed convenience on your own Kubernetes"
- "Control your database configuration, not your cloud vendor's defaults"

> **TODO: Add cost comparison data (RDS/Aurora vs. self-managed with Percona) from internal sources or published benchmarks.**

---

## Google Cloud database services

**Where Percona competes:** Cloud SQL (MySQL, PostgreSQL), AlloyDB vs. self-managed with Percona on GKE.

**Positioning mirrors AWS** with the same lock-in, control, and portability arguments. Google Cloud SQL is less dominant than AWS RDS but growing in enterprises using GCP.

> **TODO: Add Google Cloud-specific proof points and positioning nuances from internal data.**

---

## Microsoft Azure database services

**Where Percona competes:** Azure Database for MySQL, Azure Database for PostgreSQL, Azure Cosmos DB (MongoDB API) vs. self-managed with Percona on AKS.

**Positioning mirrors AWS** with additional emphasis on:
- Azure Cosmos DB's MongoDB-compatible API is not fully compatible (behavioral differences)
- Enterprises in Microsoft-heavy environments are often considering PostgreSQL as an alternative to SQL Server

> **TODO: Add Azure-specific proof points from internal data.**

---

## EnterpriseDB (EDB)

**Where Percona competes:** PostgreSQL enterprise support and services.

**EDB's position:** Largest dedicated PostgreSQL company. Offers proprietary extensions (EDB Postgres Advanced Server with Oracle compatibility), managed hosting, and enterprise support.

**Percona's counter-positioning:**
- Percona supports PostgreSQL, MySQL, AND MongoDB (EDB is PostgreSQL-only)
- Percona's PostgreSQL offerings are 100% open source (no proprietary extensions)
- Percona's TDE for PostgreSQL is the first fully open source implementation
- For companies running multiple database technologies, Percona provides a single vendor relationship

**Key messages:**
- "One vendor for all your open source databases, not just PostgreSQL"
- "Fully open source PostgreSQL, no proprietary extensions required"

> **TODO: Add head-to-head competitive intelligence from internal sources.**

---

## MariaDB

**Where Percona competes:** MySQL support and services. MariaDB is a MySQL fork.

**MariaDB's position:** Originally a community fork of MySQL after Oracle's acquisition. MariaDB Corporation (now separate from MariaDB Foundation) offers enterprise versions and cloud services. MariaDB has diverged significantly from MySQL in recent versions.

**Percona's counter-positioning:**
- Percona Server for MySQL tracks MySQL upstream more closely than MariaDB
- Percona provides support for MariaDB users (no Percona-developed MariaDB software)
- Percona's MySQL performance benchmarks consistently show strong results
- Multi-database support means Percona can help if you're running MariaDB AND other databases

**Key messages:**
- "Percona supports MariaDB users alongside MySQL, PostgreSQL, and MongoDB"

> **TODO: Add competitive differentiation details from internal sources.**

---

## Redis Ltd and Valkey

**Context:** In 2024, Redis Ltd changed Redis's license from BSD to a dual RSALv2/SSPLv1 license, which restricted use by cloud providers. In response, the Linux Foundation forked Redis as Valkey under a BSD-3-Clause license. In 2025, Redis re-licensed again to AGPL.

**Percona's position:**
- Percona launched 24x7 enterprise support for Valkey in 2025
- Percona provides support for Redis users with operational expertise
- Percona does NOT develop Percona-branded software for either Valkey or Redis
- Percona positions Valkey as the community-governed, truly open source alternative

**Key messages:**
- "Enterprise support for Valkey from the open source database experts"
- "A trusted, open alternative as licensing changes reshape the Redis ecosystem"

---

## Positioning by persona

| Persona | Primary competitor concern | Percona's counter-message |
|---|---|---|
| CIO | Cost of proprietary licensing, vendor risk | TCO reduction, multi-vendor independence, enterprise-grade open source |
| IT Procurement | Contract terms, licensing complexity, compliance | Transparent licensing, no per-core fees, flexible engagement models |
| DBA | Oracle lock-in, MongoDB Enterprise cost, tool quality | Superior open source tools, expert support from kernel-level engineers |
| SRE | Cloud-managed service limitations, observability gaps | PMM for unified monitoring, Operators for Kubernetes-native operations |
| DevOps Engineer | Cloud lock-in, Kubernetes complexity for databases | Percona Operators, multi-cloud portability, infrastructure-as-code compatibility |
| Developer | Database selection, getting started friction | Freely available software, active community, documentation |
| Enterprise Architect | Vendor lock-in, technology strategy risk | Open source, multi-database, portability, no proprietary dependencies |

> **TODO: Expand with specific competitive battle cards from internal sales enablement.**
