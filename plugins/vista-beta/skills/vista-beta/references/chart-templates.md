# Chart templates

Every Vista chart is one of four primitives defined in `vista-primitives.html` (canonical) and mirrored in `vista-primitives.jsx`. **No custom chart code.** If a request truly doesn't fit a primitive, document the exception in this file before adding a new one.

## Render contract

See `brand.md` and the "Visual identity" section of `SKILL.md`. The model `Read`s `vista-primitives.html` and pastes the BEGIN/END block verbatim into the report's `<head>`, then composes the four chart functions with data via `<script>` calls in the body.

## Format

HTML artifacts via Cowork's artifact tool. The JSX twin (`vista-primitives.jsx`) is maintained for completeness — same algorithms, same look — but is not the primary delivery path because `.jsx` files saved to `outputs/` aren't pinnable in Cowork's UI.

## The four chart functions

### `Vista.renderStackedHBar(elId, { data, keys, colors? })`

Horizontal stacked bars. One row per `data[i].name`; one stack per `keys[i]`.

```html
<div class="vista-card">
  <div class="vista-card-title">Status by project</div>
  <div id="status-chart"></div>
</div>
<script>
  Vista.renderStackedHBar("status-chart", {
    data: [
      { name: "PS",        "To Do": 12, "In Progress": 8, "Blocked": 3 },
      { name: "DISTMYSQL", "To Do":  5, "In Progress": 4, "Blocked": 0 },
    ],
    keys: ["To Do", "In Progress", "Blocked"]
  });
</script>
```

- `colors` is optional. Default = `chartColors()` reading `--vista-chart-1..8`.
- For status breakdowns, prefer the chart-2..6 palette so the page's accent stays reserved for the headline series.
- For severity-coded series ("Blocked", "Urgent"), use `tok('--vista-danger')` for that key only.

**Use for:** status / priority distributions per team, volume-by-team, workload-by-assignee, contributor breakdowns.

### `Vista.renderTrendLine(elId, { data, series, xKey?, height?, refLines? })`

Line / area trend with optional reference lines.

```html
<div class="vista-card">
  <div class="vista-card-title">Monthly trend</div>
  <div id="trend"></div>
</div>
<script>
  Vista.renderTrendLine("trend", {
    data: [{ month: "Jan", actual: 80, target: 85 }, /* ... */],
    series: [
      { key: "actual", name: "Active instances", area: true },           // defaults to chart-1 (accent)
      { key: "target", name: "Target", dashed: true, color: "--vista-text-subtle" }
    ],
    height: 320,
    refLines: [
      { y: 1000, label: "Target", color: "--vista-accent" },
      { y:  700, label: "Baseline" }
    ]
  });
</script>
```

- Pass `area: true` on the headline series to get the gradient fill.
- `dashed: true` produces a 6-4 dash; pair with `color` for target lines.
- `xKey` defaults to `"month"`.
- Color values can be `"--vista-X"` (token name), `"var(--vista-X)"`, or a hex string.

**Use for:** monthly KPIs, sprint-over-sprint throughput, downloads over time, telemetry trends, Cascade tracker.

### `Vista.renderDonut(elId, { data, colors?, size? })`

Donut + side legend with center "Total".

```html
<div id="types"></div>
<script>
  Vista.renderDonut("types", {
    data: [
      { name: "Bug",         value: 24 },
      { name: "Task",        value: 18 },
      { name: "Improvement", value: 12 },
      { name: "New Feature", value:  6 }
    ]
  });
</script>
```

- 5–7 categories max. More than 7 → use `renderStackedHBar`.
- `colors` defaults to chart palette. For severity, override with danger/warning/good/info tokens.

**Use for:** issue-type distribution, priority distribution, severity, regional split.

### `Vista.renderVersionBars(elId, { data })`

Single-series ranked horizontal bars. **Always** uses `--vista-accent` — never another chart color.

```html
<div id="versions"></div>
<script>
  Vista.renderVersionBars("versions", {
    data: [
      { name: "8.4.x", value: 1240 },
      { name: "8.0.x", value:  860 },
      { name: "5.7.x", value:  120 }
    ]
  });
</script>
```

**Use for:** version distribution, top-N assignees, top-N contributors, top-N anything single-series.

### `Vista.renderFunnel(elId, { data, showConversion?, color? })`

Centered tapered bars for stage-progression analyses. Each row shows stage name + value + (optional) conversion-from-previous-stage %. Data must be ordered top-to-bottom (largest → smallest).

```html
<div id="pipeline-funnel"></div>
<script>
  Vista.renderFunnel("pipeline-funnel", {
    data: [
      { name: "Leads",         value: 5420 },
      { name: "MQL",           value: 3180 },
      { name: "SQL",           value: 1240 },
      { name: "Opportunity",   value:  680 },
      { name: "Closed Won",    value:  142 }
    ]
  });
</script>
```

- `showConversion` defaults to `true` — shows "39% from MQL" etc. under each value.
- `color` defaults to `--vista-accent`. Bars darken slightly down the funnel.
- Smallest stage is floored at 40px wide so labels stay legible.

**Use for:** Pipeline Snapshot (#1), SAL Conversion (#6), any stage funnel.

### `Vista.renderHeatmap(elId, { rows, cols, data, color?, unit? })`

Row × column matrix where each cell's color intensity scales with its numeric value. Rendered as a styled HTML table (not SVG) so row/col labels resize cleanly with the page.

```html
<div id="dependencies-heatmap"></div>
<script>
  Vista.renderHeatmap("dependencies-heatmap", {
    rows: ["MySQL", "PXC", "MongoDB", "PostgreSQL", "Operators", "PMM"],
    cols: ["MySQL", "PXC", "MongoDB", "PostgreSQL", "Operators", "PMM"],
    // rows × cols matrix of "blocking links"
    data: [
      [0,  3,  0,  0,  1,  0],
      [2,  0,  0,  0,  0,  1],
      [0,  0,  0,  0,  2,  0],
      [0,  0,  0,  0,  4,  0],
      [5,  3,  4,  6,  0,  2],
      [0,  0,  0,  0,  1,  0]
    ],
    color: "--vista-danger"
  });
</script>
```

- `data` is a 2D array, `data[rowIndex][colIndex]`. Empty cells render with the surface color.
- `color` is the high-intensity end of the gradient — defaults to `--vista-danger` (red, good for blocking/risk). Use `--vista-warning` (amber) for renewal risk, `--vista-good` for activity, etc.
- `unit` appended to non-zero cell values.

**Use for:** Cross-Team Dependencies (#24) — blocking matrix; Renewal Forecast (#4) — risk × expiry-month grid; any "X by Y" intensity comparison.

## Chart-color rules

- The **headline single-series chart** on a page uses `--vista-accent` (= chart-1).
- **Multi-series stacked breakdowns** start at `chart-2` so chart-1 stays reserved for the page's headline.
- **Semantic series** ("Blocked", "Urgent", "Failed") map to `--vista-danger` regardless of position. "Done", "Healthy" map to `--vista-good`.
- Never read hex literals in report code. Either use the primitive's defaults (read from CSS vars) or call `tok('--vista-...')`.

## Per-report quick reference

- **Team Status (#23)** — see `engineering-visibility.md` Layout A.
- **Sprint Delivery / Comms feed (#26)** — see `engineering-visibility.md` Layout B.
- **Cascade KPI (#28)** — see `cascade-kpi-mysql.md`.
- **Cross-Team Dependencies (#24)** — `<StackedHBar>` for cross-team volume; for the matrix view use a custom `<table>` styled with `var(--vista-border)` since no primitive covers heatmaps yet.
- **Workload & Capacity (#25)** — `<StackedHBar>` with a `refLines` overload threshold; `<Callout variant="warning">` if any assignee crosses it.
- **Download Trends (#13)** — `<TrendLine>` of top-N series + `<VersionBars>` or `<Donut>` secondary.
- **Geographic / Regional (#21)** — `<StackedHBar>` by region + `<TrendLine>` per region.

## Adding a new primitive

If a report genuinely needs a fifth primitive (heatmap, sankey, sparkline, etc.):

1. Implement it in `vista-primitives.jsx`, reading colors via `tok()` so theme + accent flip works.
2. Document its API and use case in this file.
3. Export it from the primitives module.

Don't define ad-hoc chart components inside report artifacts.
