# Percona: Product Catalog

## Table of Contents

1. [Product overview](#product-overview)
2. [MySQL products](#mysql-products)
3. [MongoDB products](#mongodb-products)
4. [PostgreSQL products](#postgresql-products)
5. [Multi-database products](#multi-database-products)
6. [Kubernetes and cloud-native](#kubernetes-and-cloud-native)
7. [Valkey](#valkey)
8. [Discontinued and transitioned products](#discontinued-and-transitioned-products)

---

## Product overview

Percona develops and maintains freely available, enterprise-grade database software for MySQL, PostgreSQL, and MongoDB. All Percona software is freely available (never say "free"). The software is 100% compatible with upstream community versions but includes additional enterprise features, performance improvements, and security enhancements.

Percona also supports (without developing Percona-branded software for) Redis, MariaDB, and Valkey.

**Key rule:** Refer to Percona's offerings as "solutions," not "products."

---

## MySQL products

### Percona Server for MySQL

- **Full name:** Percona Server for MySQL
- **What it is:** A freely available, enhanced, drop-in replacement for MySQL Community Edition
- **What it solves:** Organizations need enterprise-grade MySQL features (encryption, audit, thread pooling, advanced diagnostics) without paying for Oracle's MySQL Enterprise
- **Who it's for:** DBAs, DevOps engineers, developers running MySQL in production
- **Key features:**
  - Drop-in compatible with MySQL Community
  - Includes features otherwise only in MySQL Enterprise (audit log, thread pool, PAM authentication, data masking)
  - Performance improvements from Percona's engineering team
  - Percona XtraDB storage engine (enhanced InnoDB)
- **License:** GPL (open source)
- **Status:** Active. Current major versions track MySQL upstream (8.x, 9.x series)

### Percona XtraDB Cluster (PXC)

- **Full name:** Percona XtraDB Cluster (PXC)
- **Abbreviation:** PXC (only after first mention)
- **What it is:** A freely available, high-availability MySQL clustering solution based on Galera synchronous replication
- **What it solves:** MySQL single-point-of-failure risk, need for multi-node synchronous replication
- **Who it's for:** DBAs and infrastructure teams needing high availability for MySQL
- **Key features:**
  - Synchronous multi-primary replication
  - Automatic node provisioning
  - Data consistency across nodes
  - Built on Percona Server for MySQL + Galera library
- **License:** GPL (open source)
- **Status:** Active

### Percona XtraBackup

- **Full name:** Percona XtraBackup
- **What it is:** A freely available, online (hot) backup solution for MySQL
- **What it solves:** Taking consistent MySQL backups without locking tables or stopping the server
- **Who it's for:** DBAs managing MySQL backup and recovery
- **Key features:**
  - Non-blocking backups for InnoDB
  - Compressed and encrypted backups
  - Streaming backups to remote storage
  - Point-in-time recovery support
  - Backup locks (lightweight alternative to FLUSH TABLES WITH READ LOCK)
- **License:** GPL (open source)
- **Status:** Active. Percona XtraBackup Pro (included in Pro Builds) has additional features like reduced backup lock time.

### Percona Distribution for MySQL

- **Full name:** Percona Distribution for MySQL
- **What it is:** A complete, enterprise-ready MySQL solution bundle
- **What it solves:** Complexity of assembling compatible MySQL components (server, backup, HA, monitoring, toolkit)
- **Who it's for:** Teams wanting a tested, integrated MySQL stack
- **Includes:** Percona Server for MySQL, Percona XtraBackup, Percona XtraDB Cluster, Percona Toolkit, ProxySQL, Orchestrator
- **License:** GPL (open source)
- **Status:** Active
- **Naming note:** Use "software" or "stack" in customer-facing copy, not "distribution" (causes confusion with "distributed database")
- **Competitive note:** Serves as a functional alternative to Oracle MySQL Enterprise Edition, delivering comparable or extended capabilities without proprietary licensing or feature gating. However, do NOT call it a "drop-in replacement" for MySQL Enterprise. Correct phrasing: "a functional alternative to Oracle MySQL Enterprise Edition."

### ProxySQL

- **What it is:** A high-performance MySQL protocol-aware proxy included in Percona Distribution for MySQL
- **What it solves:** Connection pooling, query routing, read/write splitting for MySQL
- **Status:** Active (bundled with Percona Distribution for MySQL)

### Orchestrator

- **What it is:** A MySQL replication topology management and visualization tool
- **What it solves:** Automated failover and topology management for MySQL replication
- **Status:** Active (bundled with Percona Distribution for MySQL)

### Percona Toolkit

- **Full name:** Percona Toolkit
- **What it is:** A collection of advanced open source command-line tools for database management
- **What it solves:** Complex DBA tasks that are too difficult or error-prone to do manually (schema changes, replication management, data verification)
- **Who it's for:** DBAs and DevOps engineers managing MySQL, MongoDB, PostgreSQL, or MariaDB
- **Key features:**
  - Online schema changes (pt-online-schema-change)
  - Replication integrity checking
  - Query analysis
  - Backup verification
  - Compatible with AWS, Google Cloud, Azure
- **License:** GPL (open source)
- **Status:** Active

---

## MongoDB products

### Percona Server for MongoDB (PSMDB)

- **Full name:** Percona Server for MongoDB (PSMDB)
- **Abbreviation:** PSMDB (only after first mention)
- **What it is:** An enhanced, source-available, enterprise-grade MongoDB-compatible server
- **What it solves:** Need for MongoDB enterprise features (audit log, LDAP auth, encryption at rest, hot backups) without MongoDB Enterprise licensing costs
- **Who it's for:** Teams running MongoDB who want enterprise features without vendor lock-in
- **Key features:**
  - Fully wire-compatible with MongoDB Community
  - Audit logging
  - LDAP authentication (external auth)
  - Encryption at rest (data-at-rest encryption)
  - Hot backups
  - OpenID Connect (OIDC) support (added 2025)
- **License:** SSPL (source available, NOT open source). Inherited from upstream MongoDB licensing.
- **Status:** Active
- **Critical naming/licensing note:** Because PSMDB is SSPL-licensed, never call it "open source." Always say "source available" or "freely available."

### Percona Backup for MongoDB

- **Full name:** Percona Backup for MongoDB
- **What it is:** A distributed backup solution for MongoDB replica sets and sharded clusters
- **What it solves:** Consistent, point-in-time backups across MongoDB sharded clusters
- **Who it's for:** DBAs managing MongoDB backup and disaster recovery
- **Key features:**
  - Consistent backups across sharded clusters
  - Point-in-time recovery
  - S3-compatible storage support
  - Physical and logical backup methods
- **License:** Apache 2.0 (open source)
- **Status:** Active

### Percona ClusterSync for MongoDB

- **Full name:** Percona ClusterSync for MongoDB
- **What it is:** A tool for automating data synchronization and coordinated cutover during MongoDB migrations
- **What it solves:** Reduces downtime window, manual sequencing work, and operational risk during MongoDB migrations (e.g., from MongoDB Enterprise to PSMDB)
- **License:** Apache 2.0 (open source)
- **Status:** Active (GA expected early 2026, confirm exact date)

### Percona Distribution for MongoDB

- **Full name:** Percona Distribution for MongoDB
- **What it is:** An integrated MongoDB solution bundle
- **Includes:** Percona Server for MongoDB, Percona Backup for MongoDB, Percona Toolkit (MongoDB tools)
- **License:** Mixed (PSMDB is SSPL; other components vary)
- **Status:** Active
- **Naming note:** Use "software" or "stack" in customer-facing copy, not "distribution"

---

## PostgreSQL products

### Percona Distribution for PostgreSQL

- **Full name:** Percona Distribution for PostgreSQL
- **What it is:** A comprehensive, enterprise-ready PostgreSQL solution bundle
- **What it solves:** Fragmented PostgreSQL ecosystem. Organizations need a tested, integrated PostgreSQL stack with enterprise features.
- **Who it's for:** Teams deploying PostgreSQL in production who want a complete, supported stack
- **Includes:** PostgreSQL server, pgBackRest (backup), pgBouncer (connection pooling), pg_stat_monitor (query performance), patroni (HA), pgAudit (audit logging), pg_repack, HAProxy, and additional extensions
- **Key features:**
  - Transparent Data Encryption (TDE) for PostgreSQL: first fully open source implementation (launched 2025)
  - Integrated backup, HA, connection pooling, and monitoring
  - Extensions for audit, replication management, and performance
- **License:** PostgreSQL License (open source)
- **Status:** Active. Supports PostgreSQL 18 as of early 2026.
- **Naming note:** Always "PostgreSQL" in product names, never "Postgres"

---

## Multi-database products

### Percona Monitoring and Management (PMM)

- **Full name:** Percona Monitoring and Management (PMM)
- **Abbreviation:** PMM (only after first mention in parentheses)
- **What it is:** A freely available, open source platform for monitoring and managing database performance
- **What it solves:** Unified observability across mixed-database environments (MySQL, PostgreSQL, MongoDB, MariaDB)
- **Who it's for:** DBAs, SREs, DevOps teams managing database infrastructure
- **Key features:**
  - Query Analytics (QAN) for slow query identification and optimization
  - Dashboard-based monitoring with Grafana
  - MySQL, PostgreSQL, MongoDB, and MariaDB support
  - Alerting and notification
  - Security checks and vulnerability scanning
  - Database health checks
  - High Availability Cluster (technical preview, PMM 3.6.0)
- **License:** AGPL v3 (open source)
- **Status:** Active. Current version: PMM 3.x series (PMM 3.6.0 released early 2026)
- **Naming note:** NEVER use "&" (not "Percona Monitoring & Management")

### Percona Pro Builds

- **Full name:** Percona Pro Builds
- **What it is:** Certified, security-hardened builds of Percona software with additional enterprise features
- **What it solves:** Organizations with strict compliance, security, or certification requirements
- **Who it's for:** Regulated enterprises, security-conscious teams
- **Key features:**
  - FIPS-validated builds
  - Additional security features
  - Features like reduced backup lock time (XtraBackup Pro)
  - Certified and tested for enterprise environments
- **Status:** Active
- **Naming note:** Always plural "Builds." Never "professional." Never "ProBuilds."

---

## Kubernetes and cloud-native

### Percona Operators

- **Full name:** Percona Operators
- **What they are:** Kubernetes operators for automated deployment and management of database clusters
- **What they solve:** Complexity of running production databases on Kubernetes
- **Who they're for:** DevOps engineers, SREs, platform teams running Kubernetes
- **Available for:**
  - Percona Operator for MySQL (based on PXC and Group Replication)
  - Percona Operator for MongoDB (based on PSMDB and replica sets/sharded clusters)
  - Percona Operator for PostgreSQL (based on Percona Distribution for PostgreSQL)
- **Key features:**
  - Automated deployment, scaling, backup, and recovery
  - Multi-cloud and hybrid-cloud portability
  - Integration with Kubernetes-native tooling
  - Day-2 operations (upgrades, failover, monitoring)
- **License:** Apache 2.0 (open source)
- **Status:** Active
- **Naming note:** NOT "Percona Kubernetes Operators." "Kubernetes" is not part of the product name.

### OpenEverest (formerly Percona Everest)

- **Full name:** OpenEverest
- **Previous name:** Percona Everest
- **What it is:** An independent open source platform for automated database provisioning and management on Kubernetes
- **What it solves:** Running a private Database as a Service (DBaaS) on your own infrastructure
- **Status:** Transitioned from Percona Everest to independent open source project (January 2026). Managed by Solanica (Percona wholly-owned subsidiary). Intended for CNCF donation.
- **License:** Apache 2.0
- **Databases supported:** MySQL, PostgreSQL, MongoDB (with ClickHouse, Vitess, Valkey planned)
- **Critical rule for copy:** Percona Everest is the former name. In new copy, refer to OpenEverest. Percona remains a contributor and provides enterprise support. See changelog for transition details.

---

## Valkey

Percona does not develop Percona-branded software for Valkey. Percona provides:
- 24x7 enterprise support for Valkey (launched 2025)
- Operational expertise and services

Valkey is a community-governed, BSD-3-licensed open source in-memory data store forked from Redis after Redis's license change.

---

## Discontinued and transitioned products

| Product | Status | Date | What happened |
|---|---|---|---|
| Percona Everest | Transitioned | January 2026 | Became OpenEverest, an independent open source project under Solanica |
| TokuDB | Deprecated | 2021 | Storage engine for MySQL, deprecated in favor of InnoDB improvements |
| TokuMX | Deprecated | Pre-2020 | MongoDB storage engine, acquired from Tokutek (2015), superseded |

> **TODO: Confirm complete list of deprecated products from internal sources.**
