# VISTA Data Dictionary — ClickHouse & Elasticsearch

Quick reference for the vista-data MCP server. Use this to skip schema discovery
and go straight to writing queries. Updated 2026-04-08.

## How to Use This Reference

**IMPORTANT**: When generating reports that use telemetry or download data,
read this file FIRST. Do NOT call `es_list_indices`, `es_get_mapping`,
`ch_list_databases`, `ch_list_tables`, or `ch_describe_table` for discovery.
Go straight to the query using the schemas and templates below.

---

## Business Context

Percona tracks two complementary signals for product health:

1. **Downloads (Elasticsearch)** — How many people are downloading packages, and which ones?
   Answers questions from Product, Marketing, and Community about adoption trends.
2. **Telemetry (ClickHouse)** — How many active instances are running in the wild?
   Answers questions from Product and Strategic about real-world deployment and usage.

### Product Taxonomy

Single source of truth for how every Percona product maps across all three data systems.

| Canonical Name | Abbr | ES `parsed.product` | CH `product_family` | Jira Project Keys | Team | Status |
|---|---|---|---|---|---|---|
| Percona Server for MySQL | PS | `mysql-server` | `ps` | PS, DISTMYSQL | MySQL | Active |
| MySQL Roadmap | MYR | n/a | n/a | MYR | MySQL | **ARCHIVED** — Jira Product Discovery, no longer in use |
| Percona XtraDB Cluster | PXC | `pxc` | `pxc` | PXC | PXC | Active |
| Percona XtraBackup | PXB | `xtrabackup` | n/a (no telemetry) | PXB | MySQL | Active |
| Percona Toolkit | PT | `toolkit` | n/a (no telemetry) | PT | MySQL | Active |
| ProxySQL | ProxySQL | `other` (~817K bucketed) | n/a (no telemetry) | PSQLADM | MySQL | Active — v3.0.6 in progress |
| MySQL Binlog Server | -- | n/a (not yet released) | n/a | PS (tracked within PS) | MySQL | MVP in development |
| MySQL Vector Capabilities | -- | n/a (not yet released) | n/a | PS (tracked within PS) | MySQL | MVP in development |
| Percona Server for MongoDB | PSMDB | `mongodb-server` | `psmdb` | PSMDB | MongoDB | Active |
| Percona Backup for MongoDB | PBM | `mongodb-backup` | n/a | PBM | MongoDB | Active |
| Percona ClusterSync for MongoDB | PCSM | `percona-clustersync-mongodb` | n/a | PCSM | MongoDB | Active |
| Percona Monitoring and Management | PMM | `pmm` | CH: `pmm_metrics` table | PMM | PMM | Active |
| Percona Distribution for PostgreSQL | PG | `postgresql` | `postgresql` (CAVEAT: noisy data) | PG, DISTPG | PostgreSQL | Active |
| Operator for MySQL (PS) | K8SPS | n/a | n/a | K8SPS | Operators | Active |
| Operator for PXC | K8SPXC | n/a | n/a | K8SPXC | Operators | Active |
| Operator for MongoDB | K8SPSMDB | n/a | n/a | K8SPSMDB | Operators | Active |
| Operator for PostgreSQL | K8SPG | n/a | n/a | K8SPG | Operators | Active |
| Percona Distribution for MySQL (PS variant) | DISTMYSQL-PS | `mysql-distribution-ps` | n/a | DISTMYSQL | MySQL | Active |
| Percona Distribution for MySQL (PXC variant) | DISTMYSQL-PXC | `mysql-distribution-pxc` | n/a | DISTMYSQL | MySQL | Active |
| MongoDB Distribution | -- | `mongodb-distribution` | n/a | n/a | MongoDB | Active |
| PostgreSQL Distribution | -- | `postgresql-distribution` | n/a | DISTPG | PostgreSQL | Active |
| percona-release | -- | `percona-release` | n/a | n/a | n/a | Active (meta-package, exclude from adoption reports) |
| Valkey | VK | `other` (~12K bucketed) | n/a | VK | TBD | Early stage |
| Percona Everest | -- | n/a | `everest_telemetry` | n/a | n/a | **DISCONTINUED** — now "Open Everest", independent of Percona |
| Packaging | PKG | n/a | n/a | PKG | Packaging | Infrastructure |
| Documentation | DOCS | n/a | n/a | DOCS | Docs | Infrastructure |

### North Star Metrics (from Slack + data catalog)

> **`host_instance_id` vs `pillar_db_instance_id`**: `host_instance_id` identifies the host/server. `pillar_db_instance_id` identifies individual database instances on that host. A single host can run multiple DB instances. The Cascade KPI uses `pillar_db_instance_id` for a more accurate count of active deployments.

| Metric | Source | Owner | Formula | Status | Notes |
|---|---|---|---|---|---|
| **Unique active instances** per product | CH: `pillars_telemetry_phase_1` | Product, Strategic | `uniqExact(host_instance_id)` per `product_family` in last 30d | Validated | Primary adoption metric. Radek's MongoDB goal: 60K unique PSMDB instances for 2026 (+20% YoY, was ~49K last year) |
| **Active MySQL Instances (Cascade Primary KPI)** | CH: `pillars_telemetry_phase_1` | Product | `uniqExact(pillar_db_instance_id)` WHERE `product_family = 'ps'` in last 30d | Proposed | Uses `pillar_db_instance_id` (unique DB instances), NOT `host_instance_id` (unique hosts). Recommended primary KPI for the Cascade goal-setting framework. |
| **PS 8.4 Version Adoption Rate** | CH: `pillars_telemetry_phase_1` | Product | Count of `pillar_db_instance_id` where `pillar_version LIKE '8.4%'` / total active PS instances * 100 | Proposed | Secondary Cascade KPI. Tracks migration from 8.0 to 8.4 LTS. |
| **Product downloads** by type/OS/version | ES: `*` | Product | Count of download events per `parsed.product` | Validated | Segmented by: IP, date, country, city, version, OS, CPU arch, cloud provider |
| **Download growth rate** (MoM) | ES: `*` | Product | % change in monthly downloads per product | Proposed | Not yet dashboarded |
| **EOL package downloads** | ES: `*` | Product | Downloads where `url.original.keyword: /private/*` | Proposed | Tracks customers still downloading end-of-life versions |
| **MySQL 8.0 EOL download volume** | ES: `*` | Product | Downloads where `parsed.product.keyword = 'mysql-server'` AND `parsed.major_version.keyword = '8.0'` | Proposed | Post-EOL, 8.0 packages are token-gated and served from `/private/` paths. |
| **MySQL 8.0-to-8.4 migration rate** | CH: `pillars_telemetry_phase_1` | Product | Ratio of `pillar_version LIKE '8.4%'` to `pillar_version LIKE '8.0%'` instances, trended monthly | Proposed | Tracks velocity of customer migration from EOL 8.0 to 8.4 LTS. |
| **Product combination downloads** | ES: `*` | Product | Co-downloads from same IP in 24h window | Proposed | Shows which tools are seen as essential companions |
| **Software deployments** | CH: `pillars_telemetry_phase_1` | Strategic | Count of telemetry events | Validated | Based on requirements from DO-19 |
| **Kubernetes Operators metrics** | ES (separate cluster) | Engineering | Operator usage from telemetry | Validated | Dashboard exists at Kibana |
| **PMM active servers** | CH: `pmm_metrics` | Product | `uniqExact(pmm_server_telemetry_id)` in last 30d | Validated | Can segment by customer tier |
| **Download-to-Active-Instance ratio** | ES + CH combined | Product | Monthly downloads per product (ES) / Monthly unique active instances per product (CH) | Proposed | Cross-source metric. High ratio = healthy new adoption funnel. Low ratio = sticky installed base with little new adoption. Requires mapping ES product names to CH product_family values using the Product Taxonomy table. |
| **Pro-builds downloads** | ES: `*` | N/A | Downloads where package name matches `*pro*` | Discontinued | Pro-builds are no longer offered. Historical data only. |
| **Everest managed clusters** | CH: `everest_telemetry` | N/A | `pxc_count + psmdb_count + pg_count` per Everest instance | Discontinued | Everest is now "Open Everest", independent of Percona. Historical data only. |
| **Component-level feature activation** | CH: `pillars_telemetry_phase_1` | Product | `uniqExact(host_instance_id)` where `metrics` contains `('active_components', '%file://<component_urn>%')` in last 30d | Validated | Use `percona-dk` to verify the exact `component_*` URN before querying — names do NOT follow a `component_{feature}` pattern (e.g., JS stored programs = `component_js_lang`, NOT `component_mysql_js`). |

### Known Data Quality Issues

- **PostgreSQL telemetry is unreliable**: Per Jan W. (Product), the PG telemetry data contains CI/CD pipeline noise, not real adoption data. Anomalies have been confirmed. The team is aware but has no resources to fix it currently. **When reporting PG active instances, add a caveat about data quality.**
- **`parsed.version`** in ES is often empty for PostgreSQL. Use `parsed.major_version` instead, or extract version from `parsed.package_name`.
- **DockerHub metrics** in ClickHouse are a 2-month historical snapshot only (Oct-Nov 2023). Not useful for current analysis.
- **Everest** is no longer a Percona product — it is now "Open Everest", an independent open-source project. The `everest_telemetry` table is historical data only. Do NOT include in Percona product reports.
- **Pro-builds** are discontinued — Percona no longer offers Pro-builds (commercial package builds). Historical download data exists but must be labeled as discontinued.

---

## Elasticsearch — Download Analytics

HTTP download logs from percona.com and mirrors. Each document is one HTTP request
for a package file. ~5M docs per month, data from 2022 to present.

### Access Pattern

- **Index**: Always use `*` — the `claudeai_ro` user cannot access individual index names
- **Permissions**: Read-only. `list_indices` and `get_mapping` will return 403. Only `search` works.
- **Date filtering**: Use `@timestamp` field with range queries
- **Field suffix**: Always use `.keyword` suffix for term queries and aggregations on text fields

### Key Fields

All download-specific fields are under the `parsed.*` namespace:

| Field | Type | Description | Example Values |
|---|---|---|---|
| `parsed.product` | keyword | Product name | `postgresql`, `mysql-server`, `pxc`, `mongodb-server`, `pmm`, `toolkit`, `xtrabackup`, `percona-release`, `other` |
| `parsed.package_type` | keyword | Package format | `rpm`, `deb`, `tar`, `dsc`, `ova` |
| `parsed.package_name` | keyword | Full package filename | `percona-postgresql-17-17.4-1.bookworm.amd64.deb` |
| `parsed.os` | keyword | Target OS | `centos`, `debian`, `redhat`, `linux` |
| `parsed.arch` | keyword | CPU architecture | `x86_64`, `noarch`, `all`, `amd64`, `i386`, `source` |
| `parsed.major_version` | keyword | Major version | `latest`, `3`, `8.0`, `5.7`, `8.4`, etc. |
| `parsed.version` | keyword | Exact version (often empty for PG) | varies by product |
| `parsed.component` | keyword | Package component | `other` (most common) |
| `parsed.site` | keyword | Download site | `www.percona.com` (95%), `docs.percona.com`, `repo.percona.com` |
| `parsed.path` | keyword | Full URL path | `/ppg-17.4/apt/bookworm/pool/main/p/...` |
| `@timestamp` | date | Request timestamp | `2026-03-31T23:59:58.000Z` |
| `source.geo.country_iso_code` | keyword | Downloader country | `US`, `DE`, `CN` |
| `source.geo.continent_name` | keyword | Continent | `North America`, `Europe`, `Asia` |
| `source.geo.city_name` | keyword | City | `Ashburn`, `Frankfurt` |
| `user_agent.name` | keyword | Client tool | `curl`, `Wget`, `apt`, `yum`, `libdnf` |
| `user_agent.os.name` | keyword | Client OS | `Linux`, `Windows`, `Mac OS X` |
| `http.response.status_code` | integer | HTTP status | `200`, `304`, `404` |
| `http.response.body.bytes` | long | Download size in bytes | `22270505` |
| `url.original` | keyword | Raw request URL | Used for EOL filter: `/private/*` |

### Product Values (by volume, all-time)

| Product | Total Downloads | Notes |
|---|---|---|
| `percona-release` | ~80M | The `percona-release` meta-package itself — exclude from product adoption reports. However, `percona-release` downloads are a useful **leading indicator** of new Percona deployments. A spike without a corresponding increase in product downloads may indicate onboarding friction. |
| `mysql-server` | ~34M | Percona Server for MySQL |
| `pxc` | ~17M | Percona XtraDB Cluster |
| `postgresql` | ~13M | Percona Distribution for PostgreSQL |
| `other` | ~11M | Unclassified packages |
| `toolkit` | ~10M | Percona Toolkit |
| `xtrabackup` | ~10M | Percona XtraBackup |
| `pmm` | ~8M | Percona Monitoring and Management |
| `mongodb-server` | ~6M | Percona Server for MongoDB |
| `mysql-distribution-ps` | ~834K | MySQL distribution (PS variant) |
| `percona-clustersync-mongodb` | ~700 | Percona ClusterSync for MongoDB |
| `mongodb-backup` | ~574K | Percona Backup for MongoDB |
| `mongodb-distribution` | ~193K | MongoDB distribution |
| `mysql-distribution-pxc` | ~187K | MySQL distribution (PXC variant) |
| `postgresql-distribution` | ~78K | PostgreSQL distribution |

### Business-Aligned Query Templates

**1. Product downloads by package type (the most common ask):**
> "Show me downloaded postgres packages by package type for last month"
```json
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {"term": {"parsed.product.keyword": "postgresql"}},
        {"range": {"@timestamp": {"gte": "2026-03-01", "lt": "2026-04-01"}}}
      ]
    }
  },
  "aggs": {
    "by_package_type": {
      "terms": {"field": "parsed.package_type.keyword", "size": 10}
    }
  }
}
```

**2. Download growth rate — month-over-month by product:**
> "How are MySQL downloads trending? Compare last 3 months"
```json
{
  "size": 0,
  "query": {"range": {"@timestamp": {"gte": "2026-01-01", "lt": "2026-04-01"}}},
  "aggs": {
    "monthly": {
      "date_histogram": {"field": "@timestamp", "calendar_interval": "month"},
      "aggs": {
        "by_product": {"terms": {"field": "parsed.product.keyword", "size": 15}}
      }
    }
  }
}
```

**3. Product adoption comparison — all products side by side:**
> "Top downloaded products last month"
```json
{
  "size": 0,
  "query": {"range": {"@timestamp": {"gte": "2026-03-01", "lt": "2026-04-01"}}},
  "aggs": {
    "by_product": {
      "terms": {"field": "parsed.product.keyword", "size": 15}
    }
  }
}
```

**4. Geographic distribution — where are users downloading from?**
> "Which countries download the most PostgreSQL packages?"
```json
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {"term": {"parsed.product.keyword": "postgresql"}},
        {"range": {"@timestamp": {"gte": "2026-03-01", "lt": "2026-04-01"}}}
      ]
    }
  },
  "aggs": {
    "by_country": {"terms": {"field": "source.geo.country_iso_code.keyword", "size": 20}}
  }
}
```

**5. OS and architecture breakdown:**
> "What OS are people running our MySQL packages on?"
```json
{
  "size": 0,
  "query": {"term": {"parsed.product.keyword": "mysql-server"}},
  "aggs": {
    "by_os": {"terms": {"field": "parsed.os.keyword", "size": 10}},
    "by_arch": {"terms": {"field": "parsed.arch.keyword", "size": 10}}
  }
}
```

**6. Version adoption — which versions are people downloading?**
> "What PostgreSQL versions are being downloaded?"
```json
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {"term": {"parsed.product.keyword": "postgresql"}},
        {"range": {"@timestamp": {"gte": "2026-03-01", "lt": "2026-04-01"}}}
      ]
    }
  },
  "aggs": {
    "by_version": {"terms": {"field": "parsed.major_version.keyword", "size": 20}}
  }
}
```

**7. EOL package downloads (security/compliance concern):**
> "How many EOL packages are still being downloaded?"
```json
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {"wildcard": {"url.original.keyword": "/private/*"}},
        {"range": {"@timestamp": {"gte": "2026-03-01", "lt": "2026-04-01"}}}
      ]
    }
  },
  "aggs": {
    "by_product": {"terms": {"field": "parsed.product.keyword", "size": 15}}
  }
}
```

**8. Daily download trend with package type breakdown:**
> "Show me a daily trend of PostgreSQL downloads by package type"
```json
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {"term": {"parsed.product.keyword": "postgresql"}},
        {"range": {"@timestamp": {"gte": "2026-03-01", "lt": "2026-04-01"}}}
      ]
    }
  },
  "aggs": {
    "daily": {
      "date_histogram": {"field": "@timestamp", "calendar_interval": "day"},
      "aggs": {
        "by_type": {"terms": {"field": "parsed.package_type.keyword"}}
      }
    }
  }
}
```

**9. Product combination — co-downloads (same IP, same day):**
> "Which products are commonly downloaded together?"
Note: This requires a composite aggregation on IP. Due to ES permissions,
this may not be fully achievable without IP field access. Try:
```json
{
  "size": 0,
  "query": {"range": {"@timestamp": {"gte": "2026-03-01", "lt": "2026-04-01"}}},
  "aggs": {
    "by_product": {
      "terms": {"field": "parsed.product.keyword", "size": 15},
      "aggs": {
        "by_user_agent": {"terms": {"field": "user_agent.name.keyword", "size": 5}}
      }
    }
  }
}
```

---

## ClickHouse — Product Telemetry

Active instance telemetry from Percona products phoning home. Database: `telemetryd`.

### Tables

#### `pillars_telemetry_phase_1` — Product Instance Telemetry (PRIMARY)
Active installations of Percona database products. **22M rows, 2017–present.**

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Unique report ID |
| `create_time` | DateTime | Report timestamp |
| `create_date` | Date | Report date (materialized — use this for range filters, partition-aligned) |
| `host_instance_id` | UUID | Unique host instance |
| `product_family` | LowCardinality(String) | Product: `postgresql`, `ps`, `psmdb`, `pxc` |
| `pillar_cpu_arch` | LowCardinality(String) | CPU: `x86_64`, `aarch64`, `unknown`, `ERROR:` |
| `pillar_deployment` | LowCardinality(String) | Method: `PACKAGE`, `DOCKER` |
| `pillar_db_instance_id` | String | Unique DB instance ID |
| `pillar_version` | LowCardinality(String) | Product version |
| `metrics` | Array(Tuple(String, String)) | Key-value metrics array (storage engines, plugins, extensions, etc.) |
| `country_code` | LowCardinality(String) | Country of origin |
| `ip_address_hash` | String | Base64 hash of IP (for deduplication, not identification) |
| `cloud_provider` | String | Cloud provider (from ASN lookup) |

**Product family values**: `postgresql` (caveat: noisy data), `ps` (Percona Server for MySQL), `psmdb` (Percona Server for MongoDB), `pxc` (Percona XtraDB Cluster)

#### Filtering on `active_components` — verify names first

The `metrics` column is `Array(Tuple(String, String))`. One common tuple key is `active_components`, whose value is a JSON array of URNs like `file://component_js_lang`. **Component URN names are NOT predictable** — they do NOT follow a `component_{feature}` or `component_{product}_{feature}` pattern.

> ⚠️ **If the `percona-dk` MCP is not installed** (`search_percona_docs` tool unavailable), step 1 below cannot be performed and any component/feature name in the report is unverified. Show the "percona-dk MCP not installed" banner from `SKILL.md` at the top of the report, and rely entirely on step 2 (the live `DISTINCT` query) before committing to a name.

**Rule**: Before writing any query that filters on a `component_*` URN, verify the exact name. Do not guess.

Two-step verification:

1. **Look it up in the Percona docs** via the `percona-dk` MCP (`search_percona_docs` / `get_percona_doc`). The canonical component-name mapping lives in PACK memory at `context/mysql-component-names.md` and is sourced from product docs.
2. **Confirm against live data** with a `DISTINCT` query before running the real aggregation:

   ```sql
   SELECT DISTINCT arrayJoin(
     JSONExtractArrayRaw(tupleElement(metric, 2))
   ) AS component
   FROM telemetryd.pillars_telemetry_phase_1
   ARRAY JOIN metrics AS metric
   WHERE product_family = 'ps'
     AND tupleElement(metric, 1) = 'active_components'
     AND create_date >= today() - 30
   ORDER BY component
   ```

**Known gotcha**: JS stored programs in MySQL 9.7 = `component_js_lang`, NOT `component_mysql_js`. The 2026-04-15 JS stored programs report hallucinated the wrong name and returned zero results.

### Business-Aligned Query Templates

**1. Active instances by product (the primary adoption metric):**
> "How many active instances of each product do we have?"
```sql
SELECT product_family, uniqExact(host_instance_id) as active_instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 30
GROUP BY product_family ORDER BY active_instances DESC
```

**2. Active instances trend — monthly (tracks north star over time):**
> "How is PSMDB adoption trending month over month?"
```sql
SELECT toStartOfMonth(create_date) as month, product_family,
       uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 365
GROUP BY month, product_family ORDER BY month
```

**3. Version distribution — which versions are people running?**
> "What MySQL versions are deployed in production?"
```sql
SELECT pillar_version, uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps' AND create_date >= today() - 30
GROUP BY pillar_version ORDER BY instances DESC
```

> **MySQL 9.x versions**: Percona Server 9.7 uses the version format `9.7.0-X`. When filtering for 9.x adoption, use `pillar_version LIKE '9.%'`. Note that 9.x is the Innovation track (not LTS) — adoption numbers are expected to be significantly lower than 8.4 LTS. JS stored programs in 9.7 have known stability issues and should be framed as forward-looking, not production-ready, in any customer-facing reports.

**4. Deployment method breakdown (Package vs Docker):**
> "How are customers deploying MongoDB?"
```sql
SELECT pillar_deployment, uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'psmdb' AND create_date >= today() - 30
GROUP BY pillar_deployment
```

**5. Cloud provider distribution — where are instances running?**
> "Which cloud providers are our customers on?"
```sql
SELECT cloud_provider, uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 30 AND cloud_provider != ''
GROUP BY cloud_provider ORDER BY instances DESC
```

**6. CPU architecture — x86 vs ARM adoption:**
> "What's the ARM adoption rate?"
```sql
SELECT pillar_cpu_arch, uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 30
GROUP BY pillar_cpu_arch ORDER BY instances DESC
```

**7. Geographic distribution of deployments:**
> "Where in the world are our databases running?"
```sql
SELECT country_code, uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 30 AND country_code != ''
GROUP BY country_code ORDER BY instances DESC LIMIT 20
```

**8. DB instance count per host (multi-instance deployments):**
> "How many database instances per host?"
```sql
SELECT product_family,
       uniqExact(host_instance_id) as hosts,
       uniqExact(pillar_db_instance_id) as db_instances,
       round(uniqExact(pillar_db_instance_id) / uniqExact(host_instance_id), 2) as instances_per_host
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 30
GROUP BY product_family
```

> **Date field naming**: The PMM tables use `event_date` as the date column, NOT `create_date`. Always check the column name when switching between `pillars_telemetry_phase_1` (uses `create_date`) and `pmm_metrics` (uses `event_date`).

**8. PMM server adoption by customer tier:**
> "How many PMM servers are active? Break down by customer tier"
```sql
SELECT percona_customer_tier, uniqExact(pmm_server_telemetry_id) as servers
FROM telemetryd.pmm_metrics WHERE event_date >= today() - 30
GROUP BY percona_customer_tier ORDER BY servers DESC
```

**9. PMM PostgreSQL extension tracking:**
> "Which PostgreSQL extensions are most commonly installed across PMM-monitored instances?"
```sql
SELECT * FROM telemetryd.pmm_metrics_pg_installed_extensions LIMIT 10
-- Explore this table to understand structure before building full queries
```

**10. Component-level feature activation (e.g., JS stored programs):**
> "How many instances have JS stored programs enabled, trended monthly?"

**First** verify the component URN (see "Filtering on `active_components`" above). JS stored programs = `component_js_lang` (NOT `component_mysql_js`).

```sql
SELECT
  toStartOfMonth(create_date) AS month,
  uniqExact(host_instance_id) AS instances_with_component
FROM telemetryd.pillars_telemetry_phase_1
ARRAY JOIN metrics AS metric
WHERE product_family = 'ps'
  AND tupleElement(metric, 1) = 'active_components'
  AND tupleElement(metric, 2) LIKE '%component_js_lang%'
  AND create_date >= today() - 365
GROUP BY month
ORDER BY month
```

#### Other Tables Reference
- `pmm_metrics_aggregated` — Pre-aggregated PMM metrics
- `pmm_metrics_aggregated_api_usage` — PMM API usage stats
- `pmm_metrics_mysql_plugins` — MySQL plugin usage across PMM instances
- `pmm_metrics_pg_available_extensions` / `pmm_metrics_pg_installed_extensions` — PostgreSQL extension tracking
- `pmm_metrics_advisor_checks_*` — PMM Advisor check execution stats
- `pmm3_server_info` / `pmm3_server_info_mv` — PMM 3 server metadata
- `generic_reports` — Generic report data
- `pmm_metrics_view` — Convenience view over pmm_metrics
- `dockerhub_metrics` — Docker Hub pull stats (**Oct-Nov 2023 only, historical snapshot**)

---

## Performance Tips

- **Elasticsearch**: Always use `"size": 0` with aggregations — you rarely need raw hits for reports
- **ClickHouse**: Use `uniqExact(host_instance_id)` for counting unique instances, not `count()` — count() gives raw events, not unique installations
- **Date filters first**: Both systems perform best when date range is the primary filter
- **ClickHouse date columns**: Use `create_date` (Date type) not `create_time` (DateTime) for range filters — it's partition-aligned and much faster
- **ES index access**: Only `*` works as index pattern — individual indices return 403 for the read-only user
- **ES field suffix**: Always use `.keyword` suffix for term queries and terms aggregations (e.g., `parsed.product.keyword`, not `parsed.product`)
- **Exclude `percona-release`**: When reporting on product adoption downloads, exclude the `percona-release` meta-package — it inflates numbers and isn't a product

---

## MySQL 8.0 EOL Query Templates

**MySQL 8.0 vs 8.4 active instances (migration tracking):**
```sql
SELECT
  toStartOfMonth(create_date) as month,
  countIf(pillar_version LIKE '8.0%') as v8_0_instances,
  countIf(pillar_version LIKE '8.4%') as v8_4_instances,
  round(countIf(pillar_version LIKE '8.4%') * 100.0 /
    nullIf(countIf(pillar_version LIKE '8.0%') + countIf(pillar_version LIKE '8.4%'), 0), 1) as migration_pct
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps' AND create_date >= today() - 365
GROUP BY month ORDER BY month
```

**MySQL 8.0 EOL downloads by month:**
```json
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {"term": {"parsed.product.keyword": "mysql-server"}},
        {"term": {"parsed.major_version.keyword": "8.0"}},
        {"range": {"@timestamp": {"gte": "2025-01-01"}}}
      ]
    }
  },
  "aggs": {
    "monthly": {
      "date_histogram": {"field": "@timestamp", "calendar_interval": "month"}
    }
  }
}
```

---

## Discontinued / Historical Queries

These queries are for historical analysis only. The underlying products are no longer active Percona offerings.

**Pro-builds adoption (DISCONTINUED):**
> "How were Pro-builds downloads trending before discontinuation?"
```json
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {"wildcard": {"parsed.package_name.keyword": "*pro*"}},
        {"range": {"@timestamp": {"gte": "2026-01-01", "lt": "2026-04-01"}}}
      ]
    }
  },
  "aggs": {
    "monthly": {
      "date_histogram": {"field": "@timestamp", "calendar_interval": "month"},
      "aggs": {
        "by_product": {"terms": {"field": "parsed.product.keyword"}}
      }
    }
  }
}
```

**Everest managed clusters (DISCONTINUED — now "Open Everest", independent of Percona):**
> "How many clusters was Everest managing before it was spun out?"
```sql
SELECT uniqExact(host_instance_id) as deployments,
       sum(pxc_count) as pxc_clusters, sum(psmdb_count) as psmdb_clusters, sum(pg_count) as pg_clusters,
       sum(pxc_count) + sum(psmdb_count) + sum(pg_count) as total_clusters
FROM telemetryd.everest_telemetry WHERE create_date >= today() - 30
```
