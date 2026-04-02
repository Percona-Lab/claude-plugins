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
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Report Title</h2>
      <p className="text-sm text-gray-500 mb-6">Period: Jan-Dec 2025 | Source: Salesforce</p>

      {/* Summary stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">$12.4M</p>
          <p className="text-xs text-green-600">+8% YoY</p>
        </div>
        {/* more stat cards */}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actual" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="target" stroke={COLORS[1]} strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-400 mt-4">Data source: Salesforce | Generated: {new Date().toLocaleDateString()}</p>
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
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Pipeline Funnel</h2>
      <p className="text-sm text-gray-500 mb-6">Q1 2026 | Source: Salesforce</p>

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
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Regional Comparison</h2>
      <p className="text-sm text-gray-500 mb-6">FY 2025 | Source: Salesforce</p>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Legend />
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
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 2rem; max-width: 1200px; margin: 0 auto; color: #1a1a1a; }
    .header { margin-bottom: 2rem; border-bottom: 2px solid #1A4D2E; padding-bottom: 1rem; }
    .header h1 { font-size: 1.5rem; color: #1A4D2E; }
    .header p { font-size: 0.875rem; color: #666; margin-top: 0.25rem; }
    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { background: #f8f9fa; border-radius: 8px; padding: 1rem; }
    .stat-card .label { font-size: 0.75rem; color: #666; text-transform: uppercase; }
    .stat-card .value { font-size: 1.5rem; font-weight: 700; color: #1a1a1a; }
    .stat-card .delta { font-size: 0.75rem; }
    .delta.positive { color: #4CAF50; }
    .delta.negative { color: #F44336; }
    .chart-container { position: relative; height: 400px; margin-bottom: 2rem; }
    .footer { font-size: 0.75rem; color: #999; margin-top: 2rem; }
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
| Risk/heat | Heatmap table | Renewal risk, regional performance |
