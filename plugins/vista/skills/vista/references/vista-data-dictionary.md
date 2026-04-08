# VISTA Data Dictionary — ClickHouse & Elasticsearch

Quick reference for the vista-data MCP server. Use this to skip schema discovery
and go straight to writing queries. Updated 2026-04-08.

## How to Use This Reference

**IMPORTANT**: When generating reports that use telemetry or download data,
read this file FIRST. Do NOT call `es_list_indices`, `es_get_mapping`,
`ch_list_databases`, `ch_list_tables`, or `ch_describe_table` for discovery.
Go straight to the query.

---

## Elasticsearch — Download Analytics

HTTP download logs from percona.com and mirrors. Each document is one HTTP request
for a package file. ~5M docs per month, data from 2022 to present.

### Access Pattern

- **Index**: Always use `*` — the `claudeai_ro` user cannot access individual index names
- **Permissions**: Read-only. `list_indices` and `get_mapping` will return 403. Only `search` works.
- **Date filtering**: Use `@timestamp` field with range queries

### Key Fields

All download-specific fields are under the `parsed.*` namespace:

| Field | Type | Description | Example Values |
|---|---|---|---|
| `parsed.product` | keyword | Product name | `postgresql`, `mysql-server`, `pxc`, `mongodb-server`, `pmm`, `toolkit`, `xtrabackup`, `percona-release`, `other` |
| `parsed.package_type` | keyword | Package format | `rpm`, `deb`, `tar`, `dsc`, `ova` |
| `parsed.os` | keyword | Target OS | `centos`, `debian`, `redhat`, `linux` |
| `parsed.package_name` | keyword | Full package filename | `percona-postgresql-17-17.4-1.bookworm.amd64.deb` |
| `parsed.version` | keyword | Product version | (varies by product, often empty for postgresql) |
| `parsed.component` | keyword | Package component | `other` (most common) |
| `parsed.site` | keyword | Download site | `www.percona.com` (95%), `docs.percona.com`, `repo.percona.com` |
| `parsed.path` | keyword | Full URL path | `/ppg-17.4/apt/bookworm/pool/main/p/...` |
| `@timestamp` | date | Request timestamp | `2026-03-31T23:59:58.000Z` |
| `source.geo.country_iso_code` | keyword | Downloader country | `US`, `DE`, `CN` |
| `source.geo.continent_name` | keyword | Continent | `North America`, `Europe`, `Asia` |
| `user_agent.name` | keyword | Client tool | `curl`, `Wget`, `apt`, `yum` |
| `http.response.status_code` | integer | HTTP status | `200`, `304`, `404` |
| `http.response.body.bytes` | long | Download size in bytes | `22270505` |

### Product Values (by volume)

| Product | Total Downloads | Notes |
|---|---|---|
| `percona-release` | ~80M | The `percona-release` package itself |
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

### Common Query Patterns

**Downloads by package type for a product (last month):**
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

**Daily download trend for a product:**
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

**Top products by downloads:**
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

**Downloads by OS:**
```json
{
  "size": 0,
  "query": {"term": {"parsed.product.keyword": "postgresql"}},
  "aggs": {
    "by_os": {"terms": {"field": "parsed.os.keyword", "size": 10}}
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
| `create_date` | Date | Report date (materialized) |
| `host_instance_id` | UUID | Unique host instance |
| `product_family` | LowCardinality(String) | Product: `postgresql`, `ps`, `psmdb`, `pxc` |
| `pillar_cpu_arch` | LowCardinality(String) | CPU: `x86_64`, `aarch64`, `unknown`, `ERROR:` |
| `pillar_deployment` | LowCardinality(String) | Method: `PACKAGE`, `DOCKER` |
| `pillar_db_instance_id` | String | Unique DB instance |
| `pillar_version` | LowCardinality(String) | Product version |
| `metrics` | Array(Tuple(String, String)) | Key-value metrics array |
| `country_code` | LowCardinality(String) | Country of origin |
| `cloud_provider` | String | Cloud provider (from ASN) |

**Product family values**: `postgresql`, `ps` (Percona Server for MySQL), `psmdb` (Percona Server for MongoDB), `pxc` (Percona XtraDB Cluster)

**Common queries:**
```sql
-- Active instances by product (last 30 days)
SELECT product_family, uniqExact(host_instance_id) as active_instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 30
GROUP BY product_family ORDER BY active_instances DESC

-- Version distribution for a product
SELECT pillar_version, uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'postgresql' AND create_date >= today() - 30
GROUP BY pillar_version ORDER BY instances DESC

-- Deployment method breakdown
SELECT pillar_deployment, uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 30
GROUP BY pillar_deployment

-- Active instances trend (monthly)
SELECT toStartOfMonth(create_date) as month, product_family,
       uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 365
GROUP BY month, product_family ORDER BY month

-- Cloud provider distribution
SELECT cloud_provider, uniqExact(host_instance_id) as instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE create_date >= today() - 30 AND cloud_provider != ''
GROUP BY cloud_provider ORDER BY instances DESC
```

#### `pmm_metrics` — PMM Server Telemetry
PMM Server instances reporting metrics. **19M rows, 2020–present.**

| Column | Type | Description |
|---|---|---|
| `event_time` | DateTime | Event timestamp |
| `event_date` | Date | Event date (materialized) |
| `pmm_server_telemetry_id` | UUID | PMM Server unique ID |
| `portal_org_id` | Nullable(UUID) | Percona Portal org |
| `portal_org_name` | LowCardinality(String) | Portal org name |
| `percona_customer_tier` | Int32 | Customer tier level |
| `pmm_server_metrics` | Array(Tuple(String, String)) | Server metrics array |

**Common queries:**
```sql
-- Active PMM servers (last 30 days)
SELECT uniqExact(pmm_server_telemetry_id) as active_servers
FROM telemetryd.pmm_metrics WHERE event_date >= today() - 30

-- PMM servers by customer tier
SELECT percona_customer_tier, uniqExact(pmm_server_telemetry_id) as servers
FROM telemetryd.pmm_metrics WHERE event_date >= today() - 30
GROUP BY percona_customer_tier ORDER BY servers DESC
```

#### `everest_telemetry` — Percona Everest Instances
Percona Everest (Kubernetes DB platform) deployments. **198K rows, 2023–present.**

| Column | Type | Description |
|---|---|---|
| `create_time` | DateTime | Report timestamp |
| `create_date` | Date | Report date |
| `host_instance_id` | UUID | Unique Everest instance |
| `everest_version` | LowCardinality(String) | Everest version |
| `pxc_count` | UInt16 | Managed PXC clusters |
| `psmdb_count` | UInt16 | Managed PSMDB clusters |
| `pg_count` | UInt16 | Managed PG clusters |
| `country_code` | LowCardinality(String) | Country |
| `cloud_provider` | String | Cloud provider |

**Common queries:**
```sql
-- Active Everest deployments
SELECT uniqExact(host_instance_id) as deployments,
       sum(pxc_count) as total_pxc, sum(psmdb_count) as total_psmdb, sum(pg_count) as total_pg
FROM telemetryd.everest_telemetry WHERE create_date >= today() - 30
```

#### `dockerhub_metrics` — Docker Hub Pull Stats
Container image pulls from Docker Hub. **136M rows, Oct–Nov 2023 only (historical snapshot).**

| Column | Type | Description |
|---|---|---|
| `timestamp` | DateTime64 | Pull timestamp |
| `repo` | LowCardinality(String) | Image name (e.g., `pmm-server`, `percona-server`) |
| `tag` | LowCardinality(String) | Image tag |
| `action` | LowCardinality(String) | Action type |
| `country` | LowCardinality(String) | Country |
| `component` | LowCardinality(String) | Component |

**Docker repos**: `pmm-server`, `pmm-client`, `percona-server`, `percona-server-mongodb`, `percona-xtradb-cluster`, `percona-xtrabackup`, `percona-postgresql-operator`, `percona-server-mongodb-operator`, `percona-server-mysql-operator`, `percona-everest`, `haproxy`, `proxysql2`, plus others.

#### Other Tables (materialized views / aggregates)
- `pmm_metrics_aggregated` — Pre-aggregated PMM metrics
- `pmm_metrics_aggregated_api_usage` — PMM API usage stats
- `pmm_metrics_mysql_plugins` — MySQL plugin usage across PMM instances
- `pmm_metrics_pg_available_extensions` / `pmm_metrics_pg_installed_extensions` — PostgreSQL extension tracking
- `pmm_metrics_advisor_checks_*` — PMM Advisor check execution stats
- `pmm3_server_info` — PMM 3 server metadata
- `generic_reports` — Generic report data
- `pmm_metrics_view` — Convenience view over pmm_metrics

---

## Performance Tips

- **Elasticsearch**: Always use `"size": 0` with aggregations — you rarely need raw hits for reports
- **ClickHouse**: Use `uniqExact(host_instance_id)` for counting unique instances, not `count()`
- **Date filters first**: Both systems perform best when date range is the primary filter
- **ClickHouse date columns**: Use `create_date` (Date type) not `create_time` (DateTime) for range filters — it's partition-aligned and much faster
- **ES index access**: Only `*` works as index pattern — individual indices are 403 for the read-only user
