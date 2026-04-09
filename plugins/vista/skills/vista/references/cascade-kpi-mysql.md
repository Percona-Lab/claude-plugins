# Cascade KPI: Active Percona Server for MySQL Instances

This reference defines the MySQL Cascade KPI that VISTA tracks. Use this file whenever the user asks about "MySQL Cascade KPI", "MySQL KPI", "PS instances KPI", or "cascade metric".

## GSM Framework

| Element | Definition |
|---------|-----------|
| **Goal** | Measure the reach and active adoption of Percona Server for MySQL in the field |
| **Signal** | The number of unique Percona Server instances reporting telemetry is growing, indicating new deployments outpace decommissions and opt-outs |
| **Measure** | Count of unique `pillar_db_instance_id` values reported to the Percona Telemetry backend (ClickHouse) within a rolling 30-day window, tracked monthly |

**Alignment**: This measure maps directly to **Goal 1: Measure Feature Activation and Adoption (Priority 1)** on the MySQL GSM page, under the Activation & Usage Statistics column.

## KPI Parameters

| Field | Value |
|-------|-------|
| KPI Name | Active Percona Server for MySQL Instances (Telemetry-Reporting) |
| Baseline | ~141,000 unique instances (trailing 12 months, as of April 2026) |
| Target | 155,000 unique instances by Dec 31, 2026 |
| Growth Required | +14,000 instances (~10% growth) |
| Tracking Cadence | Monthly |
| Owner | Dennis Kittrell |
| Period | Jan 1, 2026 to Dec 31, 2026 |

## ClickHouse Column Reference

These are the EXACT column names in `telemetryd.pillars_telemetry_phase_1`. Do NOT guess or add prefixes.

| Column | Type | Use |
|--------|------|-----|
| `product_family` | LowCardinality(String) | Filter: `product_family = 'ps'` for MySQL |
| `pillar_db_instance_id` | String | Unique DB instance identifier — use `uniqExact()` |
| `pillar_version` | LowCardinality(String) | Version string, e.g. `8.4.3-3`, `8.0.37-29` |
| `create_date` | Date | Partition-aligned date — use for range filters (fast) |
| `create_time` | DateTime | Full timestamp — use only when time precision needed |

## Pre-Built Queries (copy-paste ready)

### Monthly Active Instances (complete months, trailing 12)
```sql
SELECT
  toStartOfMonth(create_date) AS month,
  uniqExact(pillar_db_instance_id) AS active_instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps'
  AND create_date >= toStartOfMonth(today()) - INTERVAL 12 MONTH
  AND create_date < toStartOfMonth(today())
GROUP BY month
ORDER BY month
```

### Trailing-12-Month Cumulative (KPI headline number)
```sql
SELECT uniqExact(pillar_db_instance_id) AS trailing_12m_instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps'
  AND create_date >= today() - INTERVAL 12 MONTH
```

### Version Distribution (last complete month)
```sql
SELECT
  multiIf(
    pillar_version LIKE '8.4%', '8.4.x',
    pillar_version LIKE '8.0%', '8.0.x',
    pillar_version LIKE '8.3%', '8.3.x',
    pillar_version LIKE '5.7%', '5.7.x',
    'Other'
  ) AS version_group,
  uniqExact(pillar_db_instance_id) AS instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps'
  AND create_date >= toStartOfMonth(today()) - INTERVAL 1 MONTH
  AND create_date < toStartOfMonth(today())
GROUP BY version_group
ORDER BY instances DESC
```

### 8.4 Adoption Rate (last complete month)
```sql
SELECT
  uniqExactIf(pillar_db_instance_id, pillar_version LIKE '8.4%') AS v84_instances,
  uniqExact(pillar_db_instance_id) AS total_instances,
  round(v84_instances * 100.0 / total_instances, 1) AS adoption_pct
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps'
  AND create_date >= toStartOfMonth(today()) - INTERVAL 1 MONTH
  AND create_date < toStartOfMonth(today())
```

## On-Track Calculation

The pace check determines whether the KPI is on track at any point in time:

```
months_elapsed = current_month - baseline_month (April 2026 = month 0)
months_total = 9 (April through December)
required_at_this_point = baseline + (growth_required * months_elapsed / months_total)
actual = trailing_12m_instances (current)

status:
  if actual >= required_at_this_point:       "ON TRACK"  (green)
  if actual >= required_at_this_point - 2%:  "AT RISK"   (amber)
  if actual < required_at_this_point - 2%:   "OFF TRACK" (red)
```

**IMPORTANT**: If trailing-12m data is incomplete (ingestion gaps), the on-track calculation is unreliable. In that case, show the status as "DATA INCOMPLETE" (gray) with an explanation — do NOT show a false OFF TRACK.

## Data Quality Notes

- **Feb-Apr 2026 telemetry ingestion is incomplete** (~3K vs expected ~55K). Exclude these months from trend charts. The trailing-12m number will be undercounted until ingestion is restored.
- Use `create_date` (Date) for range filters, not `create_time` (DateTime) — it's partition-aligned and faster.
- Product family filter is `product_family = 'ps'` (NOT `mysql`, NOT `percona-server`, NOT `pillar_product_family`).
- Always use `uniqExact(pillar_db_instance_id)` for unique instance counts, not `count()`.
- Column is `pillar_version` (NOT `pillar_db_version`, NOT `db_version`).
