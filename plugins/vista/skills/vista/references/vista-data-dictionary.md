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

### North Star Metrics (from Slack + data catalog)

| Metric | Source | Owner | Formula | Notes |
|---|---|---|---|---|
| **Unique active instances** per product | CH: `pillars_telemetry_phase_1` | Product, Strategic | `uniqExact(host_instance_id)` per `product_family` in last 30d | Primary adoption metric. Radek's MongoDB goal: 60K unique PSMDB instances for 2026 (+20% YoY, was ~49K last year) |
| **Product downloads** by type/OS/version | ES: `*` | Product | Count of download events per `parsed.product` | Validated metric. Segmented by: IP, date, country, city, version, OS, CPU arch, cloud provider |
| **Download growth rate** (MoM) | ES: `*` | Product | % change in monthly downloads per product | Proposed metric — not yet dashboarded |
| **EOL package downloads** | ES: `*` | Product | Downloads where `url.original.keyword: /private/*` | Tracks customers still downloading end-of-life versions |
| **Pro-builds downloads** | ES: `*` | Product | Downloads where package name matches `*pro*` | Tracks Percona Pro (commercial) package adoption |
| **Product combination downloads** | ES: `*` | Product | Co-downloads from same IP in 24h window | Proposed — shows which tools are seen as essential companions |
| **Software deployments** | CH: `pillars_telemetry_phase_1` | Strategic | Count of telemetry events | Based on requirements from DO-19 |
| **Kubernetes Operators metrics** | ES (separate cluster) | Engineering | Operator usage from telemetry | Dashboard exists at Kibana |
| **Everest managed clusters** | CH: `everest_telemetry` | Product | `pxc_count + psmdb_count + pg_count` per Everest instance | Weekly unique clusters target: 25.5K (Q3). Was 20.2K as of Aug 2025 |
| **PMM active servers** | CH: `pmm_metrics` | Product | `uniqExact(pmm_server_telemetry_id)` in last 30d | Can segment by customer tier |

### Known Data Quality Issues

- **PostgreSQL telemetry is unreliable**: Per Jan W. (Product), the PG telemetry data contains CI/CD pipeline noise, not real adoption data. Anomalies have been confirmed. The team is aware but has no resources to fix it currently. **When reporting PG active instances, add a caveat about data quality.**
- **`parsed.version`** in ES is often empty for PostgreSQL. Use `parsed.major_version` instead, or extract version from `parsed.package_name`.
- **DockerHub metrics** in ClickHouse are a 2-month historical snapshot only (Oct-Nov 2023). Not useful for current analysis.

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
| `percona-release` | ~80M | The `percona-release` meta-package itself — exclude from product adoption reports |
| `mysql-server` | ~34M | Percona Server for MySQL |
| `pxc` | ~17M | Percona XtraDB Cluster |
| `postgresql` | ~13M | Percona Distribution for PostgreSQL |
| `other` | ~11M | Unclassified packages |
| `toolkit` | ~10M | Percona Toolkit |
| `xtrabackup` | ~10M | Percona XtraBackup |
| `pmm` | ~8M | Percona Monitoring and Management |
| `mongodb-server` | ~6M | Percona Server for MongoDB |
| `mysql-distribution-ps` | ~834K | MySQL distribution (PS variant) |
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

**8. Pro-builds adoption:**
> "How are Pro-builds downloads trending?"
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

**9. Daily download trend with package type breakdown:**
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

**10. Product combination — co-downloads (same IP, same day):**
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

**9. Everest managed clusters:**
> "How many clusters is Everest managing?"
```sql
SELECT uniqExact(host_instance_id) as deployments,
       sum(pxc_count) as pxc_clusters, sum(psmdb_count) as psmdb_clusters, sum(pg_count) as pg_clusters,
       sum(pxc_count) + sum(psmdb_count) + sum(pg_count) as total_clusters
FROM telemetryd.everest_telemetry WHERE create_date >= today() - 30
```

**10. PMM server adoption by customer tier:**
> "How many PMM servers are active? Break down by customer tier"
```sql
SELECT percona_customer_tier, uniqExact(pmm_server_telemetry_id) as servers
FROM telemetryd.pmm_metrics WHERE event_date >= today() - 30
GROUP BY percona_customer_tier ORDER BY servers DESC
```

**11. PMM PostgreSQL extension tracking:**
> "Which PostgreSQL extensions are most commonly installed across PMM-monitored instances?"
```sql
SELECT * FROM telemetryd.pmm_metrics_pg_installed_extensions LIMIT 10
-- Explore this table to understand structure before building full queries
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
