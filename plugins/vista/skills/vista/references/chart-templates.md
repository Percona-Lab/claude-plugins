# VISTA Chart Templates

**IMPORTANT**: Always import every Recharts component you use. Common missing import: `Legend`. Use this full import line for stacked/grouped charts:
```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
```

## Percona Brand Palette

```javascript
const PERCONA_COLORS = [
  "#1A4D2E", // Percona dark green (primary)
  "#FF6B35", // Orange (accent)
  "#2196F3", // Blue
  "#4CAF50", // Green
  "#FF9800", // Amber
  "#9C27B0", // Purple
  "#F44336", // Red (danger/churn)
  "#00BCD4", // Cyan
];

const STATUS_COLORS = {
  good: "#4CAF50",
  warning: "#FF9800",
  danger: "#F44336",
  neutral: "#9E9E9E",
};
```

## React Template: Line Chart (Trend)

```jsx
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#1A4D2E", "#FF6B35", "#2196F3", "#4CAF50"];

export default function TrendReport() {
  const data = [/* processed data here */];

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-gray-100">
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Report Title</h2>
      <p className="text-sm text-gray-400 mb-6">Period: Jan-Dec 2025 | Source: Salesforce</p>

      {/* Summary stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-100">$12.4M</p>
          <p className="text-xs text-green-400">+8% YoY</p>
        </div>
        {/* more stat cards */}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "#f3f4f6" }} />
          <Legend wrapperStyle={{ color: "#9ca3af" }} />
          <Line type="monotone" dataKey="actual" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="target" stroke={COLORS[1]} strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 mt-4">Data source: Salesforce | Generated: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
```

## React Template: Funnel Chart (Pipeline/Conversion)

```jsx
import { ResponsiveContainer, FunnelChart, Funnel, Tooltip, Cell, LabelList } from "recharts";

const COLORS = ["#1A4D2E", "#2E7D32", "#4CAF50", "#81C784", "#C8E6C9"];

export default function FunnelReport() {
  const data = [
    { name: "Leads", value: 1200 },
    { name: "SALs", value: 480 },
    { name: "Opportunities", value: 240 },
    { name: "Proposals", value: 120 },
    { name: "Closed Won", value: 72 },
  ];

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-gray-100">
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Pipeline Funnel</h2>
      <p className="text-sm text-gray-400 mb-6">Q1 2026 | Source: Salesforce</p>

      <ResponsiveContainer width="100%" height={400}>
        <FunnelChart>
          <Tooltip />
          <Funnel dataKey="value" data={data} isAnimationActive>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
            <LabelList position="right" fill="#333" stroke="none" dataKey="name" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}
```

## React Template: Horizontal Bar Chart (Contributors / Ranked Lists)

**IMPORTANT**: For horizontal bar charts with person names on the Y-axis, ALWAYS set `YAxis width={150}` (or more) to prevent name truncation. Long names like "Hrvoje Matijakovic" or "Jaideep Karande" will wrap and get cut off at the default width.

```jsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = { Bug: "#F44336", Improvement: "#4CAF50", Task: "#2196F3", "New Feature": "#9C27B0" };

export default function ContributorBreakdown() {
  const data = [/* { name: "Yura Sorokin", Bug: 3, Improvement: 2, Task: 8, "New Feature": 1 } */];

  return (
    <ResponsiveContainer width="100%" height={Math.max(300, data.length * 45)}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
        <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="name"
          width={150}
          tick={{ fill: "#d1d5db", fontSize: 12 }}
        />
        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
        <Legend />
        {Object.entries(COLORS).map(([key, color]) => (
          <Bar key={key} dataKey={key} stackId="a" fill={color} name={key} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
```

**Key rules for horizontal bars:**
- `layout="vertical"` on `<BarChart>`
- `YAxis width={150}` minimum for person names — increase to 180 if names are very long
- `type="category"` on YAxis, `type="number"` on XAxis
- Dynamic height: `Math.max(300, data.length * 45)` to prevent cramming
- Sort data by total descending before rendering

## React Template: Grouped Bar Chart (Comparison)

```jsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#1A4D2E", "#FF6B35", "#2196F3"];

export default function ComparisonReport() {
  const data = [/* { region: "AMER", new: 45, renewal: 32, expansion: 18 } */];

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-gray-100">
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Regional Comparison</h2>
      <p className="text-sm text-gray-400 mb-6">FY 2025 | Source: Salesforce</p>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="region" tick={{ fill: "#9ca3af" }} />
          <YAxis tick={{ fill: "#9ca3af" }} />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "#f3f4f6" }} />
          <Legend wrapperStyle={{ color: "#9ca3af" }} />
          <Bar dataKey="new" fill={COLORS[0]} name="New Business" />
          <Bar dataKey="renewal" fill={COLORS[1]} name="Renewals" />
          <Bar dataKey="expansion" fill={COLORS[2]} name="Expansion" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

## HTML Template: Chart.js

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATLAS Report</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 2rem; max-width: 1200px; margin: 0 auto; color: #f3f4f6; background: #0a1628; }
    .header { margin-bottom: 2rem; border-bottom: 2px solid #1A4D2E; padding-bottom: 1rem; }
    .header h1 { font-size: 1.5rem; color: #f3f4f6; }
    .header p { font-size: 0.875rem; color: #9ca3af; margin-top: 0.25rem; }
    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { background: #111827; border-radius: 12px; padding: 1rem; border: 1px solid #1f2937; }
    .stat-card .label { font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; }
    .stat-card .value { font-size: 1.5rem; font-weight: 700; color: #f3f4f6; }
    .stat-card .delta { font-size: 0.75rem; }
    .delta.positive { color: #4ade80; }
    .delta.negative { color: #f87171; }
    .chart-container { position: relative; height: 400px; margin-bottom: 2rem; }
    .footer { font-size: 0.75rem; color: #6b7280; margin-top: 2rem; }
    @media print {
      body { padding: 0; }
      .chart-container { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Report Title</h1>
    <p>Period | Source</p>
  </div>
  <div class="stats-row">
    <div class="stat-card">
      <div class="label">Metric</div>
      <div class="value">$0</div>
      <div class="delta positive">+0% YoY</div>
    </div>
  </div>
  <div class="chart-container">
    <canvas id="chart"></canvas>
  </div>
  <div class="footer">Generated by ATLAS | Data source: [source] | [date]</div>
  <script>
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'line', // or 'bar', 'pie', 'doughnut', 'radar'
      data: { /* chart data */ },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  </script>
</body>
</html>
```

## React Template: Cascade KPI Tracker (Progress Toward Target)

Use this template for Layout C (#28). The status banner, progress bar, and KPI cards are the core — they must appear identically every time.

```jsx
import { useState } from "react";
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
  BarChart, Bar, Cell
} from "recharts";

// --- Status logic ---
const getStatus = (actual, required) => {
  const pct = actual / required;
  if (pct >= 1.0) return { label: "ON TRACK", bg: "#065f46", color: "#ecfdf5" };
  if (pct >= 0.98) return { label: "AT RISK", bg: "#92400e", color: "#fffbeb" };
  return { label: "OFF TRACK", bg: "#991b1b", color: "#fef2f2" };
};

// --- Progress bar component ---
const ProgressBar = ({ baseline, current, target, status }) => {
  const range = target - baseline;
  const progress = Math.max(0, Math.min(1, (current - baseline) / range));
  const pct = (progress * 100).toFixed(1);
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 mb-4">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Baseline: {baseline.toLocaleString()}</span>
        <span className="font-semibold text-gray-100">{pct}% of target growth achieved</span>
        <span>Target: {target.toLocaleString()}</span>
      </div>
      <div className="w-full h-6 bg-gray-800 rounded-full relative overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, progress * 100)}%`, backgroundColor: status.bg === "#065f46" ? "#4CAF50" : status.bg === "#92400e" ? "#FF9800" : "#F44336" }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{baseline.toLocaleString()}</span>
        <span className="font-semibold" style={{ color: status.bg === "#065f46" ? "#4ade80" : status.bg === "#92400e" ? "#fbbf24" : "#f87171" }}>
          Current: {current.toLocaleString()}
        </span>
        <span>{target.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default function CascadeKPITracker() {
  // --- Replace with live data from ClickHouse queries ---
  const BASELINE = 141000;
  const TARGET = 155000;
  const CURRENT = 0; // trailing-12m uniqExact(pillar_db_instance_id)

  const monthlyData = [
    // { month: "Apr 25", actual: 31500 }, ...through... { month: "Jan 26", actual: 54749 },
    // { month: "Feb 26", actual: null },  // incomplete — exclude
    // Future months: { month: "Jun 26", target: 148222 }
  ];

  const versionData = [
    // { name: "8.0.x", instances: 40370 },
    // { name: "8.4.x", instances: 14506 },
  ];

  const GROWTH_REQUIRED = TARGET - BASELINE;
  const monthsTotal = 9; // Apr–Dec
  const monthsElapsed = 0; // calculate from current month
  const requiredNow = BASELINE + (GROWTH_REQUIRED * monthsElapsed / monthsTotal);
  const status = getStatus(CURRENT, requiredNow);
  const growthNeeded = TARGET - CURRENT;
  const monthsLeft = 12 - new Date().getMonth(); // rough
  const paceRequired = monthsLeft > 0 ? Math.ceil(growthNeeded / monthsLeft) : 0;

  const VERSION_COLORS = { "8.4.x": "#4CAF50", "8.0.x": "#FF6B35", "8.3.x": "#2196F3", "5.7.x": "#9E9E9E", "Other": "#6b7280" };

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-gray-100">
      {/* 1. Status banner */}
      <div className="rounded-xl p-4 mb-4 text-center text-lg font-bold" style={{ backgroundColor: status.bg, color: status.color }}>
        {status.label} — {CURRENT.toLocaleString()} instances vs {Math.round(requiredNow).toLocaleString()} required ({CURRENT >= requiredNow ? "+" : ""}{(CURRENT - requiredNow).toLocaleString()})
      </div>

      {/* 2. Header */}
      <p className="text-xs font-semibold tracking-widest text-[#FF6B35] mb-1">VISTA TELEMETRY REPORT</p>
      <h1 className="text-3xl font-bold text-gray-100 mb-1">MySQL Cascade KPI</h1>
      <p className="text-sm text-gray-400 mb-6">Tracking Period: Jan 2026 – Dec 2026 | Metric: pillar_db_instance_id | Source: ClickHouse (telemetryd)</p>

      {/* 3. Progress bar */}
      <ProgressBar baseline={BASELINE} current={CURRENT} target={TARGET} status={status} />

      {/* 4. KPI row */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "CURRENT (T12M)", value: CURRENT.toLocaleString(), color: status.bg === "#065f46" ? "#4ade80" : status.bg === "#92400e" ? "#fbbf24" : "#f87171" },
          { label: "BASELINE", value: BASELINE.toLocaleString(), color: "#9ca3af" },
          { label: "TARGET", value: TARGET.toLocaleString(), color: "#f3f4f6" },
          { label: "GROWTH NEEDED", value: `+${growthNeeded.toLocaleString()}`, color: "#f3f4f6" },
          { label: "MONTHLY PACE REQ'D", value: `+${paceRequired.toLocaleString()}/mo`, color: "#f3f4f6" },
        ].map((card) => (
          <div key={card.label} className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
            <p className="text-xs text-gray-400 font-semibold tracking-wider mb-2">{card.label}</p>
            <p className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* 5. Trend chart */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 mb-4">
        <h2 className="text-lg font-semibold text-gray-100 mb-1">Active PS Instances & Target Pace</h2>
        <p className="text-xs text-gray-400 mb-4">Monthly unique DB instances (complete months only) vs linear target pace</p>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={monthlyData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "#f3f4f6" }} />
            <Legend wrapperStyle={{ color: "#9ca3af" }} />
            <ReferenceLine y={BASELINE} stroke="#6b7280" strokeDasharray="8 4" label={{ value: "Baseline", fill: "#6b7280", fontSize: 11 }} />
            <ReferenceLine y={TARGET} stroke="#FF6B35" strokeDasharray="8 4" label={{ value: "Target", fill: "#FF6B35", fontSize: 11 }} />
            <Line type="monotone" dataKey="target" stroke="#FF6B35" strokeWidth={2} strokeDasharray="6 3" dot={false} name="Target Pace" />
            <Line type="monotone" dataKey="projected" stroke="#6b7280" strokeWidth={1.5} strokeDasharray="3 3" dot={false} name="Projected" />
            <Line type="monotone" dataKey="actual" stroke="#4CAF50" strokeWidth={2.5} dot={{ r: 4, fill: "#4CAF50" }} name="Actual" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 6. Secondary metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <p className="text-xs text-gray-400 font-semibold tracking-wider mb-2">8.4 ADOPTION RATE</p>
          <p className="text-3xl font-bold text-[#4CAF50]">26.5%</p>
          <p className="text-sm text-gray-400 mt-1">14,506 of 54,749 instances</p>
          <p className="text-xs text-green-400 mt-1">+20.6pp from 5.9% ten months ago</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <p className="text-xs text-gray-400 font-semibold tracking-wider mb-3">VERSION DISTRIBUTION</p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={versionData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={60} tick={{ fill: "#d1d5db", fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "#f3f4f6" }} />
              <Bar dataKey="instances" radius={[0, 4, 4, 0]}>
                {versionData.map((entry) => (
                  <Cell key={entry.name} fill={VERSION_COLORS[entry.name] || "#6b7280"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 7. GSM Framework card */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 border-l-4 border-l-[#FF6B35] p-5 mb-4">
        <h3 className="text-sm font-semibold text-gray-300 tracking-wider mb-3">GSM FRAMEWORK</h3>
        <div className="space-y-2 text-sm">
          <p><span className="text-gray-400 font-semibold">Goal:</span> <span className="text-gray-200">Measure the reach and active adoption of Percona Server for MySQL in the field</span></p>
          <p><span className="text-gray-400 font-semibold">Signal:</span> <span className="text-gray-200">Unique PS instances reporting telemetry is growing — new deployments outpace decommissions</span></p>
          <p><span className="text-gray-400 font-semibold">Measure:</span> <span className="text-gray-200">Count of unique db_instance_id values within a rolling 30-day window, tracked monthly</span></p>
        </div>
      </div>

      {/* 10. Footer */}
      <p className="text-xs text-gray-500 mt-6 text-center">Generated by VISTA | {new Date().toLocaleDateString()} | Source: ClickHouse telemetryd | Metric: uniqExact(pillar_db_instance_id)</p>
    </div>
  );
}
```

**Key rules for Cascade KPI Tracker:**
- Status banner is ALWAYS the first element — the user should see on-track/off-track before anything else
- Progress bar shows visual distance to target — never skip this
- KPI row is always 5 cards in the exact order shown
- Trend chart must include target pace line (dashed orange) and actual line (solid green)
- Flag incomplete data months — never silently include bad data
- GSM Framework card is always present — it grounds the KPI in its strategic context
- Use `references/cascade-kpi-mysql.md` for all parameters (baseline, target, queries, status thresholds)

## Chart Type Selection Guide

| Report Need | Chart Type | When to Use |
|---|---|---|
| Trend over time | Line chart | Monthly/quarterly metrics |
| Compare categories | Bar chart (grouped) | Region vs region, product vs product |
| Part of whole | Pie/Donut | Market share, revenue mix |
| Distribution | Histogram | Deal sizes, ticket age |
| Conversion flow | Funnel | Pipeline stages, SAL conversion |
| Multi-dimension | Radar | Customer health scores |
| Hierarchy | Treemap | Feature adoption by product |
| Composition over time | Stacked area | Version adoption, revenue mix over time |
| Correlation | Scatter | Deal size vs close time |
| Status overview | Scorecard + sparklines | Executive summary |
| Goal tracking | KPI Tracker (Layout C) | Cascade KPIs, target vs actual |
| Risk/heat | Heatmap table | Renewal risk, regional performance |
