# MySQL Cascade Report (anchor + 3 supporting signals)

Source of truth for the MySQL Cascade in Notion: `https://www.notion.so/percona/33b674d091f3818c8680cd57850a01c5`. Vista's MySQL Cascade Report tracks **one anchor + three supporting signals** — render all four in every report, with the anchor as the marquee and supporting signals beneath.

**Render**: Layout C in SKILL.md. Wrap in `<VistaReport theme="dark" accent="mysql">`. Visual styling lives in `vista-primitives.jsx` — never inline hex.

Triggers (canonical): "Show me the MySQL Cascade report", "MySQL Cascade", "MySQL adoption report".
Also accepted (legacy / shorthand): "MySQL Cascade KPI", "MySQL KPI", "PS instances KPI", "cascade metric", "are we on track" (in MySQL/telemetry context).

---

## The four signals at a glance

| # | Signal | Type | Baseline (Jan 26) | Target (Dec 26) | Tracked as |
|---|---|---|---|---|---|
| 1 | **Monthly Active PS Instances** | Anchor | 57,912 | 100,000 | growth-to-target |
| 2 | **Active PXC Clusters** | Supporting | ~975 | ≥ 1,000 | floor (maintain above) |
| 3 | **Active Operator-Deployed MySQL Instances** | Supporting | 2,692 | 9,000 | growth-to-target |
| 4 | **PACKAGE PS with PXB co-installed** | Supporting | 13,142 | 18,000 | growth-to-target |

All measure the trailing 30-day window per month ("monthly active"). Cadence: monthly, last day of month. Period: Jan 1 – Dec 31, 2026. Owner: Dennis Kittrell.

---

## 1. Anchor — Monthly Active PS Instances

**Why this is the anchor**: PS is the load-bearing product in the MySQL line; PS active-instance count is the executive-level proxy for MySQL product-line health. The other three signals are tracked one level down on the Notion proposal page.

| Field | Value |
|-------|-------|
| Metric | `uniqExact(pillar_db_instance_id)` over a trailing 30-day window per month |
| Baseline | **57,912** (Jan 2026) |
| Target | **100,000** by Dec 31, 2026 |
| Growth required | **+42,088** instances |
| Status thresholds | ON TRACK if actual ≥ pace; AT RISK within 2%; OFF TRACK > 2% below |

### Query

```sql
-- Headline (last complete month)
SELECT toStartOfMonth(create_date) AS month,
       uniqExact(pillar_db_instance_id) AS active_instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps'
  AND create_date >= toStartOfMonth(today()) - INTERVAL 12 MONTH
  AND create_date < toStartOfMonth(today())
GROUP BY month
ORDER BY month
```

Use the most recent complete month as headline. As of Mar 2026: ~65,876.

### On-track calculation

```
months_elapsed = month_index_of(last_complete_month) - 0     // Jan = 0, Feb = 1, ..., Dec = 11
required_at_pace = 57912 + 42088 * months_elapsed / 11
margin = (actual - required_at_pace) / required_at_pace
status = ON TRACK if margin >= 0; AT RISK if margin in (-0.02, 0); OFF TRACK if margin <= -0.02
```

Sanity check (Mar 2026): months_elapsed=2, required ≈ 65,564, actual ≈ 65,876 → ON TRACK +0.5%.

---

## 2. Supporting — Active PXC Clusters

**Why this is tracked as a floor, not growth**: PXC users run HA-grade, write-replicated workloads — the workload profile most strongly correlated with enterprise-tier buyers and support customers. PXC adoption is long-cycle and historically bumpy (H2 2025 ranged 869–951). The strategic concern is HA-tier customer retention, not new-cluster acquisition. The goal is *maintain above 1,000* rather than a growth target. Excludes Everest-managed cluster counts (Everest is Open Everest, not Percona — see global memory).

| Field | Value |
|-------|-------|
| Metric | `uniqExact(db_replication_id)` for `product_family='pxc'` over trailing 30-day window. Cluster identity (Galera replication group ID) lives inside the `metrics` array, not as a top-level column. |
| Baseline | ~975 active clusters (Jan 2026) |
| Target | **≥ 1,000** active clusters maintained through Dec 31, 2026 |
| Status thresholds | ON TRACK if ≥ 1,000; AT RISK / BEHIND if 850–999; OFF TRACK / CRITICAL if < 850 |

### Query

```sql
SELECT toStartOfMonth(create_date) AS month,
       uniqExact(tupleElement(metric, 2)) AS active_clusters
FROM telemetryd.pillars_telemetry_phase_1
ARRAY JOIN metrics AS metric
WHERE product_family = 'pxc'
  AND tupleElement(metric, 1) = 'db_replication_id'
  AND create_date >= toStartOfMonth(today()) - INTERVAL 12 MONTH
  AND create_date < toStartOfMonth(today())
GROUP BY month
ORDER BY month
```

### On-track calculation

```
status = ON TRACK if actual >= 1000;
         AT RISK   if actual in [850, 1000);
         OFF TRACK if actual <  850
```

No pace math — it's a floor, not a growth target. Don't compute "required at pace" for this signal.

### Diagnostic: Active PXC Instances

Useful as a secondary lens but **not the tracked KPI**. Show as a smaller card next to the cluster trend. Trailing 12-month uniqExact ≈ 6,700 instances; ≈ 2,950 clusters cumulative.

```sql
-- Diagnostic only — not the tracked signal
SELECT uniqExact(pillar_db_instance_id) AS pxc_instances
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'pxc' AND create_date >= today() - 365
```

---

## 3. Supporting — Active Operator-Deployed MySQL Instances

**Why this is tracked**: Cloud-native momentum across both Percona Kubernetes operators (PS Operator + PXC Operator). The cascade-level question is "how much of MySQL is running on Kubernetes," not "which operator wins" — combine into one signal. Q1 2026 grew ~3.7× (1,768 → 4,460 combined).

| Field | Value |
|-------|-------|
| Metric (PS Operator) | distinct instances reporting under `product_family = 'operator_ps'` in `generic_reports` (telemetry naming convention, not the product name) |
| Metric (PXC Operator) | PXC instances in `pillars_telemetry_phase_1` whose OS metric is `el8` or `el9` (the operator's RHEL UBI container base image). Used as a **proxy until distinct instrumentation is added** — flag this caveat in the report. |
| Combined | sum of the two over a trailing 30-day window per month |
| Baseline | **2,692** (Jan 2026) |
| Target | **9,000** by Dec 31, 2026 |
| Growth required | +6,307 |
| Status thresholds | same growth-to-pace logic as the anchor |

### Query (combined)

```sql
-- PS Operator (generic_reports, naming = 'operator_ps')
SELECT toStartOfMonth(create_date) AS month,
       uniqExact(pillar_db_instance_id) AS ps_op_instances
FROM telemetryd.generic_reports
WHERE product_family = 'operator_ps'
  AND create_date >= toStartOfMonth(today()) - INTERVAL 12 MONTH
  AND create_date < toStartOfMonth(today())
GROUP BY month
ORDER BY month;

-- PXC Operator proxy: PXC instances on RHEL UBI base images (el8/el9)
-- TODO verify exact metric name for OS — likely `os_release_id` or `host_os_version` inside metrics array.
SELECT toStartOfMonth(create_date) AS month,
       uniqExact(pillar_db_instance_id) AS pxc_op_instances
FROM telemetryd.pillars_telemetry_phase_1
ARRAY JOIN metrics AS metric
WHERE product_family = 'pxc'
  AND tupleElement(metric, 1) IN ('os_release_id', 'host_os_version')
  AND tupleElement(metric, 2) IN ('el8', 'el9')
  AND create_date >= toStartOfMonth(today()) - INTERVAL 12 MONTH
  AND create_date < toStartOfMonth(today())
GROUP BY month
ORDER BY month;
```

Combined = ps_op_instances + pxc_op_instances per month.

**Caveat to surface in the report**: "PXC Operator count is a proxy (RHEL UBI base image) until distinct telemetry instrumentation lands."

### On-track calculation

```
months_elapsed = month_index (Jan = 0)
required_at_pace = 2692 + 6308 * months_elapsed / 11
status = ON TRACK if actual >= required; AT RISK within 2%; OFF TRACK > 2% below
```

---

## 4. Supporting — PACKAGE PS with PXB co-installed

**Why this is tracked**: Strongest behavioral proxy for commercial intent. A user who installs PS via PACKAGE *and also* has Percona XtraBackup in their installed packages is operating with production discipline, ops mindset, and is materially more likely to convert. While the anchor measures market reach, this signal measures the *quality* of that reach. Tracked as an absolute count (not a ratio) so growth in the buying-intent population is directly visible even when overall PS adoption is diluted by low-monetization segments.

| Field | Value |
|-------|-------|
| Metric | `uniqExact(host_instance_id)` for `product_family='ps'` AND `pillar_deployment='PACKAGE'` AND PXB present in `installed_packages`, trailing 30-day window |
| Baseline | **13,142** (Jan 2026) |
| Target | **18,000** by Dec 31, 2026 |
| Growth required | +4,858 |
| Status thresholds | same growth-to-pace logic as the anchor |
| Watch metric (not a target) | PXB-in-PACKAGE-PS ratio. Currently ~28–32%. Floor: 25%. If the ratio drops below 25% even while the absolute target is being hit, escalate — that's an early signal that growth is concentrated in non-monetizable segments. |
| Excluded by design | Docker / operator / container deployments — those users handle backup outside PXB co-install, so they're not measurable via this signal. |

### Query (canonical — verified against schema)

```sql
-- Headline (last complete month). Run on the last day of each month
-- against the trailing 30 days to match anchor convention.
SELECT uniqExact(host_instance_id) AS active_ps_with_pxb
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps'
  AND pillar_deployment = 'PACKAGE'
  AND create_date >= today() - 30
  AND arrayExists(
        m -> tupleElement(m, 1) = 'installed_packages'
             AND tupleElement(m, 2) LIKE '%percona-xtrabackup%',
        metrics
      );
```

Field reference:
- **Deployment type column**: `pillar_deployment`. Value `'PACKAGE'` (uppercase). Excludes Docker / operator / container deployments by design.
- **Co-install detection**: not a cross-product-family join. PXB presence comes from the `metrics` array on the PS row itself — specifically the `installed_packages` metric key, whose value is a string matched with `LIKE '%percona-xtrabackup%'`.
- **Unique counter**: `host_instance_id` (not `pillar_db_instance_id`) — counts distinct hosts, deduplicated across the trailing 30-day window.

### Monthly trend (12 complete months)

```sql
SELECT toStartOfMonth(create_date) AS month,
       uniqExact(host_instance_id) AS active_ps_with_pxb
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps'
  AND pillar_deployment = 'PACKAGE'
  AND create_date >= toStartOfMonth(today()) - INTERVAL 12 MONTH
  AND create_date <  toStartOfMonth(today())
  AND arrayExists(
        m -> tupleElement(m, 1) = 'installed_packages'
             AND tupleElement(m, 2) LIKE '%percona-xtrabackup%',
        metrics
      )
GROUP BY month
ORDER BY month;
```

### Watch-metric query: PXB-in-PACKAGE-PS ratio

```sql
SELECT toStartOfMonth(create_date) AS month,
       uniqExact(host_instance_id) AS package_ps_total,
       uniqExactIf(host_instance_id,
         arrayExists(
           m -> tupleElement(m, 1) = 'installed_packages'
                AND tupleElement(m, 2) LIKE '%percona-xtrabackup%',
           metrics
         )
       ) AS package_ps_with_pxb,
       round(package_ps_with_pxb * 100.0 / package_ps_total, 1) AS pxb_ratio_pct
FROM telemetryd.pillars_telemetry_phase_1
WHERE product_family = 'ps'
  AND pillar_deployment = 'PACKAGE'
  AND create_date >= toStartOfMonth(today()) - INTERVAL 12 MONTH
  AND create_date <  toStartOfMonth(today())
GROUP BY month
ORDER BY month;
```

Surface this ratio next to the absolute count in the report — small `<Card>` with the latest ratio, a `<Callout variant="warning">` if it has dipped below 25%.

### On-track calculation

```
required_at_pace = 13142 + 4858 * months_elapsed / 11   // months_elapsed: Jan=0..Dec=11
status = ON TRACK if actual >= required;
         AT RISK   within 2% below;
         OFF TRACK > 2% below
```

---

## ClickHouse column reference

EXACT names in `telemetryd.pillars_telemetry_phase_1`. Do NOT guess or add prefixes.

| Column | Type | Use |
|--------|------|-----|
| `product_family` | LowCardinality(String) | Filter: `'ps'`, `'pxc'`, `'pxb'`, etc. |
| `pillar_db_instance_id` | String | Unique instance — use `uniqExact()` |
| `pillar_version` | LowCardinality(String) | Version, e.g. `8.4.3-3` |
| `create_date` | Date | Partition-aligned date — use for range filters |
| `create_time` | DateTime | Full timestamp — only when sub-day precision needed |
| `metrics` | Array(Tuple(String,String)) | ARRAY JOIN (or `arrayExists`) to extract per-metric values like `db_replication_id`, `os_release_id`, `installed_packages` |
| `pillar_deployment` | LowCardinality(String) | Deployment type. Values include `'PACKAGE'` (uppercase). Filter for the PS+PXB co-install signal. |
| `host_instance_id` | String | Distinct host. Use for the PS+PXB signal — counts hosts (not DB instances). |

For Operator (PS Operator only), table is `telemetryd.generic_reports` with `product_family='operator_ps'`.

---

## Data quality

- **Recent-month ingestion check** (applies to all four signals): before trusting the latest month, compare its monthly-active count to the prior 3 months. A drop greater than ~30% means ingestion is incomplete — drop it and use the prior complete month as headline. Show `<Callout variant="warning" label="Data quality">` rather than a false OFF TRACK.
- **PXC Operator proxy** (signal 3): RHEL UBI image is a proxy for "running under the operator." Replace with first-class metric when available.
- **PACKAGE+PXB co-install** (signal 4): no cross-row join — PXB presence is detected via the `installed_packages` key in the PS row's `metrics` array. Watch the PXB-in-PACKAGE-PS ratio (currently ~28–32%, floor 25%) alongside the absolute count.

---

## Render specifics

### Status semantics

| Status | `<StatusBanner status>` | Headline KPI `valueColor` |
|---|---|---|
| ON TRACK | `"good"` | `"var(--vista-good)"` |
| AT RISK / BEHIND | `"warning"` | `"var(--vista-warning)"` |
| OFF TRACK / CRITICAL | `"danger"` | `"var(--vista-danger)"` |
| DATA INCOMPLETE | omit `<StatusBanner>`; use `<Callout variant="warning">` | `"var(--vista-text-muted)"` |

### Anchor (signal 1) — marquee treatment

Top of report. `<StatusBanner>` + progress strip + 5-tile `<KPIGrid>` (Current, Baseline, Target, Growth Needed, Monthly Pace Required) + primary `<TrendLine>` with actual (area) + target (dashed) + projected (dashed) + reference lines for baseline and target.

### Supporting signals (2, 3, 4) — repeating sub-section

For each supporting signal, render a self-contained sub-section in this order:

```jsx
<section style={{ display: "grid", gap: 12 }}>
  <div>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--vista-text-subtle)" }}>
      Supporting signal · {2|3|4} of 3
    </div>
    <div style={{ fontFamily: "var(--vista-font-display)", fontSize: 20, fontWeight: 600, marginTop: 2 }}>
      {Signal name}
    </div>
    <div style={{ color: "var(--vista-text-muted)", fontSize: 12.5, marginTop: 4, maxWidth: "72ch" }}>
      {1-sentence "why this matters"}
    </div>
  </div>

  <KPIGrid columns={4} items={[
    { label: "Current ({last month})", value: actual, headline: true, valueColor: STATUS_COLOR },
    { label: "Baseline (Jan 26)",       value: baseline },
    { label: "Target (Dec 26)",         value: targetLabel },     // "≥1,000" for floor; raw number for growth
    { label: "Status",                  value: STATUS_LABEL },    // "On Track" / "At Risk" / "Behind"
  ]}/>

  <Card title="Monthly trend">
    <TrendLine
      data={monthly}
      series={[
        { key: "actual", name: "Active", area: true, color: "var(--vista-chart-2)" },  // not the accent — reserve accent for the anchor
        ...(isGrowthTarget ? [{ key: "target", name: "Target pace", dashed: true, color: "var(--vista-text-muted)" }] : []),
      ]}
      refLines={isFloor
        ? [{ y: TARGET_FLOOR, label: `Floor ${TARGET_FLOOR}`, color: "var(--vista-warning)" }]
        : [{ y: BASELINE, label: "Baseline" }, { y: TARGET, label: "Target", color: "var(--vista-accent)" }]
      }
      height={220}
    />
  </Card>

  {anyDataCaveat && <Callout variant="warning">{caveat}</Callout>}
</section>
```

**Color discipline**: the anchor uses `--vista-accent` (MySQL orange) as its primary series. Supporting signals use `--vista-chart-2` (blue) so the anchor stays visually dominant. Never use the accent for a supporting signal's primary series in the same report.

**PXC clusters specifics**: `<TrendLine>` shows clusters as the primary signal; do NOT add a "target pace" series (it's a floor). Add a single `refLines={[{ y: 1000, label: "Floor: 1,000" }]}` and a thinner `{ y: 850, label: "Critical: 850", color: "var(--vista-danger)" }`. Pair with a small `<Card title="Diagnostic: PXC instances">` containing a `<TrendLine>` of monthly instances — labelled "diagnostic, not tracked."

**Operator-MySQL specifics**: split the trend into two stacked series (PS Operator + PXC Operator) using `<StackedHBar>` semantics — actually use `<TrendLine>` with two area series stacked visually (chart-2 + chart-4) so the split is visible. Surface the PXC-Operator-proxy caveat in a `<Callout variant="warning">`.

**PS+PXB specifics**: standard growth treatment. If the join query is fragile, surface a `<Callout variant="warning" label="Data source">` noting whether the number came from live ClickHouse or Notion-recorded values.

### Tail of the report

After all four signals:

1. `<Card title="GSM Framework">` — applies to the anchor only. Goal / Signal / Measure rows.
2. `<Callout variant="warning" label="Data quality">` — list any incomplete months excluded.
3. `<Callout variant="insight">` — 4–6 bullets:
   - Anchor status with specific numbers.
   - Each supporting signal in one bullet (status + last-month delta).
   - Most material cross-signal observation (e.g. "operator growth is the standout — 89% YoY — while PXC clusters are bumping the floor").
   - Top risk going into next month.
4. `<ReportFooter source="Source: ClickHouse · telemetryd · Queried {timestamp} UTC"/>`

---

## GSM Framework (anchor only)

| Element | Definition |
|---------|-----------|
| **Goal** | Measure the reach and active adoption of Percona Server for MySQL in the field |
| **Signal** | The number of unique Percona Server instances reporting telemetry is growing — new deployments outpace decommissions and opt-outs |
| **Measure** | `uniqExact(pillar_db_instance_id)` for `product_family='ps'` over a rolling 30-day window, tracked monthly |

Aligns with **Goal 1: Measure Feature Activation and Adoption (Priority 1)** on the MySQL GSM page. The three supporting signals do not have their own GSM entries — they are layered diagnostics under the anchor.
