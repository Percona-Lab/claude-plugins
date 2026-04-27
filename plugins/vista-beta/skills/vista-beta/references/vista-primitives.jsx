// vista-primitives.jsx
// Canonical primitives for every Vista report.
//
// CONTRACT FOR THE MODEL:
//   1. Read this file in full.
//   2. Paste the entire block (TOKENS_CSS + helpers + components) verbatim into your report artifact,
//      between the markers "BEGIN VISTA PRIMITIVES" and "END VISTA PRIMITIVES".
//   3. Below the END marker, define your <Report/> using these primitives + data.
//   4. Default-export a wrapper that renders <VistaReport theme=... accent=...> around <Report/>.
//
// Do NOT edit, summarize, or "clean up" this block. Do NOT redefine these names.
// All theming flows through CSS vars set on the [data-theme]/[data-accent] container.
// All chart series colors must come from --vista-chart-1..8 as var(--...) strings.
//
// Cowork environment assumed: React global, Recharts via `recharts` import, Tailwind available.

import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, ComposedChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from "recharts";

// ============================================================
// BEGIN VISTA PRIMITIVES — paste verbatim, do not edit
// ============================================================

const VISTA_TOKENS_CSS = `
:root, [data-theme="dark"] {
  --vista-bg:#0B0B10; --vista-surface:#15151C; --vista-surface-2:#1D1D26; --vista-surface-3:#26263280;
  --vista-border:#26262F; --vista-border-strong:#363644;
  --vista-text:#F4F4F7; --vista-text-muted:#A7A7B5; --vista-text-subtle:#6D6D7D;
  --vista-purple:#6E3FF3; --vista-purple-soft:#8C67F5; --vista-yellow:#F5FF5A;
  --vista-good:#4ADE80; --vista-warning:#FBBF24; --vista-danger:#F87171; --vista-info:#60A5FA;
  --vista-accent:var(--vista-purple);
  --vista-chart-1:var(--vista-accent); --vista-chart-2:#38BDF8; --vista-chart-3:#F59E0B;
  --vista-chart-4:#4ADE80; --vista-chart-5:#F472B6; --vista-chart-6:#A78BFA;
  --vista-chart-7:#FB7185; --vista-chart-8:#94A3B8;
  --vista-grid:rgba(255,255,255,0.06); --vista-axis:#8A8A98;
  --vista-tooltip-bg:#0F0F16; --vista-tooltip-br:#363644;
  --vista-font-display:"Space Grotesk","Poppins",system-ui,sans-serif;
  --vista-font-ui:"Inter",system-ui,sans-serif;
  --vista-font-mono:"JetBrains Mono",ui-monospace,monospace;
}
[data-theme="light"] {
  --vista-bg:#F7F6F2; --vista-surface:#FFFFFF; --vista-surface-2:#FAF9F4; --vista-surface-3:#1B1B2408;
  --vista-border:#E6E4DC; --vista-border-strong:#CFCDC3;
  --vista-text:#16161E; --vista-text-muted:#5B5B6A; --vista-text-subtle:#8A8A98;
  --vista-grid:rgba(0,0,0,0.06); --vista-axis:#6D6D7D;
  --vista-tooltip-bg:#FFFFFF; --vista-tooltip-br:#E6E4DC;
}
[data-accent="mysql"]      { --vista-accent:#E65A15; }
[data-accent="postgresql"] { --vista-accent:#005ED6; }
[data-accent="mongodb"]    { --vista-accent:#1FA23A; }
[data-accent="redis"]      { --vista-accent:#D6362A; }
[data-accent="kubernetes"] { --vista-accent:#2AA6DF; }
[data-accent="valkey"]     { --vista-accent:#A83FEF; }
[data-accent="pmm"]        { --vista-accent:#6E3FF3; }
`;

// Inject tokens into document.head at module load — guaranteed available
// before any chart renders, so var(--vista-...) refs resolve on first paint.
// Idempotent; safe to import multiple times.
if (typeof document !== "undefined" && !document.getElementById("vista-tokens")) {
  const styleEl = document.createElement("style");
  styleEl.id = "vista-tokens";
  styleEl.textContent = VISTA_TOKENS_CSS;
  document.head.appendChild(styleEl);
}

// Color resolution policy:
//   - Plain DOM (div / span / aside): use "var(--vista-...)" strings — browser resolves at paint.
//   - SVG inside Recharts (Line stroke, Area fill, gradient stop-color, ReferenceLine label
//     fill, dot fill, etc.): use HEX strings resolved via tok(). Recharts processes these
//     for animation / dot color / interpolation and chokes on var() strings, leaving the
//     chart blank. Module-load token injection guarantees tok() returns real hex on first
//     render. Hex fallbacks are belt-and-suspenders.
const tok = (name, fallback) => {
  if (typeof document === "undefined") return fallback;
  const got = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return got || fallback;
};

// Hex fallbacks mirror dark-theme defaults — kept in sync with VISTA_TOKENS_CSS above.
const FALLBACK = {
  bg:           "#0B0B10",
  text:         "#F4F4F7",
  textMuted:    "#A7A7B5",
  textSubtle:   "#6D6D7D",
  border:       "#26262F",
  borderStrong: "#363644",
  surface3:     "rgba(38,38,50,0.5)",
  grid:         "rgba(255,255,255,0.06)",
  axis:         "#8A8A98",
  tooltipBg:    "#0F0F16",
  tooltipBr:    "#363644",
  accent:       "#6E3FF3",
  good:         "#4ADE80",
  warning:      "#FBBF24",
  danger:       "#F87171",
  fontUi:       'Inter, system-ui, sans-serif',
  chart: ["#6E3FF3","#38BDF8","#F59E0B","#4ADE80","#F472B6","#A78BFA","#FB7185","#94A3B8"],
};

const chartColors = () => [1,2,3,4,5,6,7,8].map(
  i => tok(`--vista-chart-${i}`, FALLBACK.chart[i-1])
);

// ============================================================
// Brand SVGs — pure-path, on-brand. Fill is baked into the file
// per the Percona brand kit; do not recolor.
// ============================================================

function PerconaWordmarkDark({ height = 24, ...rest }) {
  // Dark wordmark — for use ON LIGHT surfaces.
  return (
    <svg viewBox="0 0 1130 235.3" height={height} fill="#282727" xmlns="http://www.w3.org/2000/svg" aria-label="Percona" role="img" {...rest}>
      <path d="M356.5,152.6h-18.8v33.6H313v-112h45.9c26.8,0,43,15.8,43,38.7v0.3C401.9,139.1,381.7,152.6,356.5,152.6L356.5,152.6z M376.9,113.4c0-11-7.7-17-20.1-17h-19.1v34.2h19.6c12.4,0,19.6-7.4,19.6-17V113.4L376.9,113.4z"/>
      <polygon points="415.7,186.2 415.7,74.2 500.5,74.2 500.5,96.1 440.3,96.1 440.3,118.9 493.3,118.9 493.3,140.8 440.3,140.8 440.3,164.3 501.3,164.3 501.3,186.3 415.7,186.3 "/>
      <path d="M588.9,186.2l-24.1-35.8h-19.4v35.8h-24.7v-112H572c26.5,0,42.4,13.9,42.4,37v0.3c0,18.1-9.8,29.5-24.1,34.7l27.5,40H588.9L588.9,186.2z M589.4,112.4c0-10.6-7.4-16-19.4-16h-24.6v32.2h25.1c12,0,18.9-6.4,18.9-15.8V112.4L589.4,112.4z"/>
      <path d="M685.3,189.2c-33.5,0-58.4-25.8-58.4-58.4v-0.3c0-32.3,24.4-58.7,59.4-58.7c21.5,0,34.3,7.1,44.9,17.5l-15.9,18.3c-8.8-8-17.7-12.8-29.1-12.8c-19.2,0-33,15.9-33,35.4v0.3c0,19.5,13.5,35.7,33,35.7c13,0,21-5.2,29.9-13.3l15.9,16C720.3,181.4,707.3,189.2,685.3,189.2L685.3,189.2z"/>
      <path d="M798.2,189.2c-35.2,0-60.4-26.1-60.4-58.4v-0.3c0-32.3,25.5-58.7,60.7-58.7c35.1,0,60.4,26.1,60.4,58.4v0.3C858.8,162.8,833.3,189.2,798.2,189.2 M832.7,130.5c0-19.5-14.3-35.7-34.5-35.7S764,110.7,764,130.2v0.3c0,19.5,14.3,35.7,34.5,35.7s34.2-15.9,34.2-35.4V130.5z"/>
      <polygon points="994.9,186.3 1050.3,71.8 1105.6,186.3 1077.8,186.3 1050.3,129.3 1022.8,186.3 "/>
      <polygon points="984.7,74.2 984.7,189.2 900.4,121.1 900.4,186.1 874.1,186.1 874.1,71.8 958.5,139.6 958.5,74.2 "/>
      <path d="M96.2,107.2l63.5,110.1h-127L96.2,107.2z M166,49.9c10.3-4.9,21.8-6,33-3c12.3,3.3,22.6,11.2,29,22.3c12.6,21.8,6,49.4-14.4,63.3L166,49.9z M106.6,89.1l30.6-53l0,0l104.5,181.2h-61.2L106.6,89.1z M96.2,71.1L1.5,235.3H273l-50.3-87.2c29-18.9,38.4-57.6,20.9-88c-8.8-15.2-23-26.1-40-30.7c-15.7-4.2-32.2-2.5-46.6,4.8L137.2,0L96.2,71.1z"/>
      <path d="M1123,73.3c1.7,1,3.1,2.4,4.1,4.2c1,1.8,1.5,3.8,1.5,6s-0.5,4.2-1.5,6s-2.3,3.2-4.1,4.2c-1.7,1-3.7,1.5-5.9,1.5c-2.2,0-4.2-0.5-5.9-1.5c-1.7-1-3.1-2.4-4.1-4.2c-1-1.8-1.5-3.8-1.5-6s0.5-4.2,1.5-6s2.3-3.2,4.1-4.2c1.7-1,3.7-1.5,5.9-1.5S1121.2,72.3,1123,73.3z M1122.2,92.4c1.5-0.9,2.7-2.1,3.5-3.7s1.2-3.3,1.2-5.2s-0.4-3.7-1.2-5.2c-0.8-1.5-2-2.8-3.5-3.6c-1.5-0.9-3.2-1.3-5.1-1.3c-2.9,0-5.3,1-7.1,2.9c-1.8,1.9-2.7,4.3-2.7,7.3c0,1.9,0.4,3.7,1.2,5.2c0.8,1.6,2,2.8,3.5,3.7c1.5,0.9,3.2,1.3,5.1,1.3C1119,93.7,1120.7,93.3,1122.2,92.4z M1121.2,83.3c-0.6,0.7-1.5,1.1-2.6,1.2l3.8,5.3l-2.2,0.1l-3.7-5.4h-1.9v5.4h-1.9V77.1h5.3c1.3,0,2.3,0.3,3,1c0.7,0.6,1.1,1.6,1.1,2.8C1122.2,81.8,1121.8,82.7,1121.2,83.3z M1114.7,82.9h3.2c1.6,0,2.5-0.7,2.5-2.1c0-0.7-0.2-1.2-0.7-1.5c-0.4-0.3-1-0.5-1.8-0.5h-3.2V82.9z"/>
    </svg>
  );
}

function PerconaWordmarkLight({ height = 24, ...rest }) {
  // Light wordmark — for use ON DARK surfaces.
  return (
    <svg viewBox="0 0 1130 235.3" height={height} fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" aria-label="Percona" role="img" {...rest}>
      <path d="M356.5,152.6h-18.8v33.6H313v-112h45.9c26.8,0,43,15.8,43,38.7v0.3C401.9,139.1,381.7,152.6,356.5,152.6L356.5,152.6z M376.9,113.4c0-11-7.7-17-20.1-17h-19.1v34.2h19.6c12.4,0,19.6-7.4,19.6-17V113.4L376.9,113.4z"/>
      <polygon points="415.7,186.2 415.7,74.2 500.5,74.2 500.5,96.1 440.3,96.1 440.3,118.9 493.3,118.9 493.3,140.8 440.3,140.8 440.3,164.3 501.3,164.3 501.3,186.3 415.7,186.3 "/>
      <path d="M588.9,186.2l-24.1-35.8h-19.4v35.8h-24.7v-112H572c26.5,0,42.4,13.9,42.4,37v0.3c0,18.1-9.8,29.5-24.1,34.7l27.5,40H588.9L588.9,186.2z M589.4,112.4c0-10.6-7.4-16-19.4-16h-24.6v32.2h25.1c12,0,18.9-6.4,18.9-15.8V112.4L589.4,112.4z"/>
      <path d="M685.3,189.2c-33.5,0-58.4-25.8-58.4-58.4v-0.3c0-32.3,24.4-58.7,59.4-58.7c21.5,0,34.3,7.1,44.9,17.5l-15.9,18.3c-8.8-8-17.7-12.8-29.1-12.8c-19.2,0-33,15.9-33,35.4v0.3c0,19.5,13.5,35.7,33,35.7c13,0,21-5.2,29.9-13.3l15.9,16C720.3,181.4,707.3,189.2,685.3,189.2L685.3,189.2z"/>
      <path d="M798.2,189.2c-35.2,0-60.4-26.1-60.4-58.4v-0.3c0-32.3,25.5-58.7,60.7-58.7c35.1,0,60.4,26.1,60.4,58.4v0.3C858.8,162.8,833.3,189.2,798.2,189.2 M832.7,130.5c0-19.5-14.3-35.7-34.5-35.7S764,110.7,764,130.2v0.3c0,19.5,14.3,35.7,34.5,35.7s34.2-15.9,34.2-35.4V130.5z"/>
      <polygon points="994.9,186.3 1050.3,71.8 1105.6,186.3 1077.8,186.3 1050.3,129.3 1022.8,186.3 "/>
      <polygon points="984.7,74.2 984.7,189.2 900.4,121.1 900.4,186.1 874.1,186.1 874.1,71.8 958.5,139.6 958.5,74.2 "/>
      <path d="M96.2,107.2l63.5,110.1h-127L96.2,107.2z M166,49.9c10.3-4.9,21.8-6,33-3c12.3,3.3,22.6,11.2,29,22.3c12.6,21.8,6,49.4-14.4,63.3L166,49.9z M106.6,89.1l30.6-53l0,0l104.5,181.2h-61.2L106.6,89.1z M96.2,71.1L1.5,235.3H273l-50.3-87.2c29-18.9,38.4-57.6,20.9-88c-8.8-15.2-23-26.1-40-30.7c-15.7-4.2-32.2-2.5-46.6,4.8L137.2,0L96.2,71.1z"/>
      <path d="M1123,73.3c1.7,1,3.1,2.4,4.1,4.2c1,1.8,1.5,3.8,1.5,6s-0.5,4.2-1.5,6s-2.3,3.2-4.1,4.2c-1.7,1-3.7,1.5-5.9,1.5c-2.2,0-4.2-0.5-5.9-1.5c-1.7-1-3.1-2.4-4.1-4.2c-1-1.8-1.5-3.8-1.5-6s0.5-4.2,1.5-6s2.3-3.2,4.1-4.2c1.7-1,3.7-1.5,5.9-1.5S1121.2,72.3,1123,73.3z M1122.2,92.4c1.5-0.9,2.7-2.1,3.5-3.7s1.2-3.3,1.2-5.2s-0.4-3.7-1.2-5.2c-0.8-1.5-2-2.8-3.5-3.6c-1.5-0.9-3.2-1.3-5.1-1.3c-2.9,0-5.3,1-7.1,2.9c-1.8,1.9-2.7,4.3-2.7,7.3c0,1.9,0.4,3.7,1.2,5.2c0.8,1.6,2,2.8,3.5,3.7c1.5,0.9,3.2,1.3,5.1,1.3C1119,93.7,1120.7,93.3,1122.2,92.4z M1121.2,83.3c-0.6,0.7-1.5,1.1-2.6,1.2l3.8,5.3l-2.2,0.1l-3.7-5.4h-1.9v5.4h-1.9V77.1h5.3c1.3,0,2.3,0.3,3,1c0.7,0.6,1.1,1.6,1.1,2.8C1122.2,81.8,1121.8,82.7,1121.2,83.3z M1114.7,82.9h3.2c1.6,0,2.5-0.7,2.5-2.1c0-0.7-0.2-1.2-0.7-1.5c-0.4-0.3-1-0.5-1.8-0.5h-3.2V82.9z"/>
    </svg>
  );
}

function PerconaLogomarkPurple({ size = 28, ...rest }) {
  return (
    <svg viewBox="0 0 300 300" height={size} width={size} fill="#653DF4" xmlns="http://www.w3.org/2000/svg" aria-label="Percona" role="img" {...rest}>
      <path d="M108.9,139.5l63.5,110.1h-127L108.9,139.5z M178.8,82.2c10.3-4.9,21.8-6,33-3c12.3,3.3,22.6,11.2,29,22.3c12.6,21.8,6,49.4-14.4,63.3L178.8,82.2z M119.3,121.4l30.6-53l0,0l104.5,181.2h-61.2L119.3,121.4z M108.9,103.4L14.2,267.6h271.5l-50.3-87.2c29-18.9,38.4-57.6,20.9-88c-8.8-15.2-23-26.1-40-30.7c-15.7-4.2-32.2-2.5-46.6,4.8l-19.8-34.2L108.9,103.4z"/>
    </svg>
  );
}

function PerconaLogomarkYellow({ size = 28, ...rest }) {
  return (
    <svg viewBox="0 0 300 300" height={size} width={size} fill="#F6FE54" xmlns="http://www.w3.org/2000/svg" aria-label="Percona" role="img" {...rest}>
      <path d="M108.9,139.5l63.5,110.1h-127L108.9,139.5z M178.8,82.2c10.3-4.9,21.8-6,33-3c12.3,3.3,22.6,11.2,29,22.3c12.6,21.8,6,49.4-14.4,63.3L178.8,82.2z M119.3,121.4l30.6-53l0,0l104.5,181.2h-61.2L119.3,121.4z M108.9,103.4L14.2,267.6h271.5l-50.3-87.2c29-18.9,38.4-57.6,20.9-88c-8.8-15.2-23-26.1-40-30.7c-15.7-4.2-32.2-2.5-46.6,4.8l-19.8-34.2L108.9,103.4z"/>
    </svg>
  );
}

// Theme-aware wrappers.
function PerconaWordmark({ theme = "dark", ...rest }) {
  return theme === "light" ? <PerconaWordmarkDark {...rest}/> : <PerconaWordmarkLight {...rest}/>;
}
function PerconaLogomark({ theme = "dark", ...rest }) {
  return theme === "light" ? <PerconaLogomarkPurple {...rest}/> : <PerconaLogomarkYellow {...rest}/>;
}

// ============================================================
// Chart primitives — read tokens at render time.
// ============================================================

const VistaTooltip = ({ active, payload, label, unit = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--vista-tooltip-bg)",
      border: "1px solid var(--vista-tooltip-br)",
      borderRadius: 10, padding: "10px 12px",
      fontFamily: "var(--vista-font-ui)", fontSize: 12,
      boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      color: "var(--vista-text)", minWidth: 140,
    }}>
      <div style={{ color: "var(--vista-text-subtle)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center", padding: "2px 0" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: "inline-block" }} />
            <span style={{ color: "var(--vista-text-muted)" }}>{p.name}</span>
          </span>
          <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}{unit}
          </span>
        </div>
      ))}
    </div>
  );
};

// Axis & grid resolve to hex (Recharts processes these strings).
const axisProps = () => ({
  tick: { fill: tok("--vista-axis", FALLBACK.axis), fontSize: 11, fontFamily: tok("--vista-font-ui", FALLBACK.fontUi) },
  axisLine: { stroke: tok("--vista-border", FALLBACK.border) },
  tickLine: false,
});
const VistaGrid = () => <CartesianGrid stroke={tok("--vista-grid", FALLBACK.grid)} strokeDasharray="2 4" vertical={false} />;

// 100% stacked or grouped horizontal bar.
function StackedHBar({ data, keys, colors, height, yWidth = 110, unit = "" }) {
  const c = colors || chartColors();
  const h = height || Math.max(180, data.length * 42);
  const textColor = tok("--vista-text", FALLBACK.text);
  const cursorFill = tok("--vista-surface-3", FALLBACK.surface3);
  return (
    <div style={{ width: "100%", height: h, minHeight: h }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 6, right: 18, left: 0, bottom: 0 }}>
          <VistaGrid />
          <XAxis type="number" {...axisProps()} />
          <YAxis type="category" dataKey="name" width={yWidth} {...axisProps()} tick={{ ...axisProps().tick, fill: textColor }} />
          <Tooltip cursor={{ fill: cursorFill }} content={<VistaTooltip unit={unit} />} />
          {keys.map((k, i) => (
            <Bar key={k} dataKey={k} stackId="a" fill={c[i % c.length]} radius={i === keys.length - 1 ? [0, 6, 6, 0] : 0} isAnimationActive={false} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Multi-series line / area trend with optional reference lines.
// Stable gradient ID counter — avoids Math.random() reconciliation churn.
let _vgCounter = 0;
const _nextGradId = () => `vg${++_vgCounter}`;

// TrendLine — hand-rolled SVG (no Recharts). Recharts' <ComposedChart> blanks
// in Cowork's artifact iframe for reasons we can't diagnose without devtools
// access; bypassing it eliminates the problem entirely. Same API as before
// so existing report code keeps working unchanged.
//
// API: <TrendLine data={[{month:"Apr 25", actual:33022, target:null}, ...]}
//                 series={[{key:"actual", name:"Active", area:true, color:"var(--vista-accent)"},
//                          {key:"target", name:"Target", dashed:true, color:"var(--vista-text-muted)"}]}
//                 xKey="month" height={300}
//                 refLines={[{y:57912, label:"Baseline"}, {y:100000, label:"Target", color:"var(--vista-accent)"}]} />
function TrendLine({ data, series, xKey = "month", height = 300, refLines = [] }) {
  const idRef = React.useRef();
  if (!idRef.current) idRef.current = _nextGradId();
  const id = idRef.current;

  const cs = chartColors();
  const resolveColor = (c, fallback) => {
    if (!c) return fallback;
    const m = /^var\(\s*(--[\w-]+)\s*\)$/.exec(c);
    if (m) return tok(m[1], fallback);
    return c;
  };

  const axisColor      = tok("--vista-axis",            FALLBACK.axis);
  const gridColor      = tok("--vista-grid",            FALLBACK.grid);
  const borderColor    = tok("--vista-border",          FALLBACK.border);
  const borderStrong   = tok("--vista-border-strong",   FALLBACK.borderStrong);
  const textMuted      = tok("--vista-text-muted",      FALLBACK.textMuted);
  const fontUi         = tok("--vista-font-ui",         FALLBACK.fontUi);

  // ── viewBox + layout ───────────────────────────────────────────
  const W = 800, H = height;
  const PAD = { top: 12, right: 24, bottom: 28, left: 56 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  // ── y-domain (numeric values across all series + refLines) ────
  const allValues = [];
  data.forEach(row => series.forEach(s => {
    const v = row[s.key];
    if (typeof v === "number" && !Number.isNaN(v)) allValues.push(v);
  }));
  refLines.forEach(r => { if (typeof r.y === "number") allValues.push(r.y); });
  if (!allValues.length) allValues.push(0, 1);
  let yMin = Math.min(...allValues), yMax = Math.max(...allValues);
  if (yMin === yMax) { yMin -= 1; yMax += 1; }
  // Add 5% headroom + footroom; clamp footroom to >= 0 if all positive.
  const span = yMax - yMin;
  yMax = yMax + span * 0.06;
  yMin = (yMin >= 0) ? Math.max(0, yMin - span * 0.06) : yMin - span * 0.06;

  const N = data.length;
  const xAt = (i) => PAD.left + (N === 1 ? plotW / 2 : (i / (N - 1)) * plotW);
  const yAt = (v) => PAD.top + (1 - (v - yMin) / (yMax - yMin)) * plotH;

  // ── y-axis ticks (5 evenly spaced "nice" values) ──────────────
  const niceStep = (raw) => {
    const exp = Math.pow(10, Math.floor(Math.log10(raw)));
    const f = raw / exp;
    return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * exp;
  };
  const targetTicks = 5;
  const step = niceStep((yMax - yMin) / targetTicks);
  const tickStart = Math.ceil(yMin / step) * step;
  const yTicks = [];
  for (let v = tickStart; v <= yMax; v += step) yTicks.push(v);

  const fmt = (v) => {
    const a = Math.abs(v);
    if (a >= 1_000_000) return (v / 1_000_000).toFixed(v % 1_000_000 ? 1 : 0) + "M";
    if (a >= 1_000)     return (v / 1_000).toFixed(v % 1_000 ? 1 : 0) + "k";
    return String(v);
  };

  // ── series paths ──────────────────────────────────────────────
  const buildPath = (sKey) => {
    let d = "";
    let started = false;
    data.forEach((row, i) => {
      const v = row[sKey];
      if (typeof v !== "number" || Number.isNaN(v)) return;
      const x = xAt(i), y = yAt(v);
      d += (started ? " L " : "M ") + x + " " + y;
      started = true;
    });
    return d;
  };
  const buildArea = (sKey) => {
    let d = "";
    let started = false;
    let firstX = null, lastX = null;
    data.forEach((row, i) => {
      const v = row[sKey];
      if (typeof v !== "number" || Number.isNaN(v)) return;
      const x = xAt(i), y = yAt(v);
      if (!started) { d = "M " + x + " " + y; firstX = x; started = true; }
      else d += " L " + x + " " + y;
      lastX = x;
    });
    if (!started) return "";
    const baselineY = PAD.top + plotH;
    d += ` L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
    return d;
  };

  // ── x-axis tick selection (avoid label overlap on dense data) ─
  const targetXLabels = Math.min(N, 12);
  const xTickStep = Math.max(1, Math.ceil(N / targetXLabels));

  return (
    <div style={{ width: "100%", height, minHeight: height }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
        <defs>
          {series.map((s, i) => {
            const color = resolveColor(s.color, cs[i % cs.length]);
            return (
              <linearGradient key={s.key} id={`${id}-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={color} stopOpacity="0.32" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            );
          })}
        </defs>

        {/* horizontal grid */}
        {yTicks.map((v, i) => (
          <line key={`g${i}`} x1={PAD.left} x2={W - PAD.right} y1={yAt(v)} y2={yAt(v)}
                stroke={gridColor} strokeWidth="1" strokeDasharray="2 4" />
        ))}

        {/* y-axis labels */}
        {yTicks.map((v, i) => (
          <text key={`y${i}`} x={PAD.left - 8} y={yAt(v)} fill={axisColor}
                fontFamily={fontUi} fontSize="11" textAnchor="end" dominantBaseline="middle"
                style={{ fontVariantNumeric: "tabular-nums" }}>
            {fmt(v)}
          </text>
        ))}

        {/* x-axis baseline */}
        <line x1={PAD.left} x2={W - PAD.right} y1={PAD.top + plotH} y2={PAD.top + plotH}
              stroke={borderColor} strokeWidth="1" />

        {/* x-axis labels */}
        {data.map((row, i) => (
          (i % xTickStep === 0 || i === N - 1) && (
            <text key={`x${i}`} x={xAt(i)} y={PAD.top + plotH + 16} fill={axisColor}
                  fontFamily={fontUi} fontSize="11" textAnchor="middle">
              {row[xKey]}
            </text>
          )
        ))}

        {/* reference lines */}
        {refLines.map((r, i) => {
          if (typeof r.y !== "number") return null;
          const refColor = resolveColor(r.color, borderStrong);
          const y = yAt(r.y);
          return (
            <g key={`r${i}`}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y}
                    stroke={refColor} strokeWidth="1" strokeDasharray="4 4" />
              {r.label && (
                <text x={W - PAD.right - 6} y={y - 4} fill={refColor}
                      fontFamily={fontUi} fontSize="10" textAnchor="end">
                  {r.label}
                </text>
              )}
            </g>
          );
        })}

        {/* series */}
        {series.map((s, i) => {
          const color = resolveColor(s.color, cs[i % cs.length]);
          return (
            <g key={s.key}>
              {s.area && <path d={buildArea(s.key)} fill={`url(#${id}-${i})`} />}
              <path d={buildPath(s.key)} fill="none" stroke={color}
                    strokeWidth={s.dashed ? 2 : 2.5}
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray={s.dashed ? "6 4" : undefined} />
              {!s.dashed && data.map((row, j) => {
                const v = row[s.key];
                if (typeof v !== "number" || Number.isNaN(v)) return null;
                return <circle key={j} cx={xAt(j)} cy={yAt(v)} r="3" fill={color} />;
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Donut + side legend. Use for 5–7 categories max.
function Donut({ data, colors, unit = "", size = 200 }) {
  const c = colors || chartColors();
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ position: "relative", width: size, height: size, minHeight: size, flex: `0 0 ${size}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={size * 0.32} outerRadius={size * 0.47} paddingAngle={2} stroke="none" isAnimationActive={false}>
              {data.map((d, i) => <Cell key={d.name} fill={c[i % c.length]} />)}
            </Pie>
            <Tooltip content={<VistaTooltip unit={unit} />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ position: "absolute", inset: 0, display: "grid", placeContent: "center", pointerEvents: "none", textAlign: "center" }}>
          <div style={{ color: "var(--vista-text-subtle)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>Total</div>
          <div style={{ fontFamily: "var(--vista-font-display)", fontSize: 22, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{total}</div>
        </div>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6, flex: 1, fontSize: 12.5 }}>
        {data.map((d, i) => (
          <li key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--vista-text-muted)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: c[i % c.length] }} />
              {d.name}
            </span>
            <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Single-series ranked horizontal bars (versions, top-N assignees, etc.)
// Always uses --vista-accent — never chart-2/etc.
function VersionBars({ data, yWidth = 90, height }) {
  const h = height || Math.max(120, data.length * 28);
  const textColor = tok("--vista-text", FALLBACK.text);
  const cursorFill = tok("--vista-surface-3", FALLBACK.surface3);
  const accent = tok("--vista-accent", FALLBACK.accent);
  return (
    <div style={{ width: "100%", height: h, minHeight: h }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
          <XAxis type="number" {...axisProps()} hide />
          <YAxis type="category" dataKey="name" width={yWidth} {...axisProps()} tick={{ ...axisProps().tick, fill: textColor }} />
          <Tooltip content={<VistaTooltip />} cursor={{ fill: cursorFill }} />
          <Bar dataKey="value" fill={accent} radius={[0, 6, 6, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// Shell components — header, footer, KPI, callouts, banner.
// ============================================================

function ReportHeader({ kicker, title, sub, theme = "dark", right }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 32px", borderBottom: "1px solid var(--vista-border)", gap: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <PerconaWordmark theme={theme} height={26} />
        <span style={{ width: 1, height: 22, background: "var(--vista-border)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {kicker && <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--vista-accent)" }}>{kicker}</span>}
          <h1 style={{ margin: 0, fontFamily: "var(--vista-font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--vista-text)" }}>{title}</h1>
          {sub && <div style={{ fontSize: 12, color: "var(--vista-text-muted)" }}>{sub}</div>}
        </div>
      </div>
      {right}
    </header>
  );
}

function ReportFooter({ source, theme = "dark", page }) {
  return (
    <footer style={{
      display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 24,
      padding: "18px 32px", borderTop: "1px solid var(--vista-border)",
      color: "var(--vista-text-subtle)", fontSize: 11.5,
      background: "var(--vista-surface-2)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <PerconaLogomark theme={theme} size={20} />
        <span>Generated by <strong style={{ color: "var(--vista-text-muted)" }}>VISTA</strong></span>
      </div>
      <div style={{ textAlign: "center" }}>{source}</div>
      <div style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{page || ""}</div>
    </footer>
  );
}

function KPI({ label, value, delta, deltaDir = "up", headline, valueColor }) {
  return (
    <div style={{
      background: headline ? "color-mix(in oklab, var(--vista-accent) 10%, var(--vista-surface))" : "var(--vista-surface)",
      border: headline ? "1px solid transparent" : "1px solid var(--vista-border)",
      borderLeft: headline ? "3px solid var(--vista-accent)" : "1px solid var(--vista-border)",
      borderRadius: 14, padding: "16px 18px",
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--vista-text-subtle)" }}>{label}</div>
      <div style={{
        fontFamily: "var(--vista-font-display)", fontSize: 28, fontWeight: 600, letterSpacing: "-0.015em",
        marginTop: 6, color: valueColor || (headline ? "var(--vista-accent)" : "var(--vista-text)"),
        fontVariantNumeric: "tabular-nums",
      }}>{value}</div>
      {delta && (
        <div style={{ fontSize: 12, marginTop: 4, fontWeight: 600, color: deltaDir === "down" ? "var(--vista-danger)" : "var(--vista-good)" }}>
          {deltaDir === "down" ? "↓ " : "↑ "}{delta}
        </div>
      )}
    </div>
  );
}

function KPIGrid({ items, columns }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : "repeat(auto-fit, minmax(160px, 1fr))",
      gap: 12,
    }}>
      {items.map((k, i) => <KPI key={k.label || i} {...k} />)}
    </div>
  );
}

// variant: "insight" | "warning" | "action"
function Callout({ variant = "insight", label, children }) {
  const borderColor = {
    insight: "var(--vista-accent)",
    warning: "var(--vista-warning)",
    action:  "var(--vista-purple)",
  }[variant] || "var(--vista-accent)";
  const defaultLabel = { insight: "Key finding", warning: "Watch", action: "Recommended action" }[variant];
  return (
    <aside style={{
      borderLeft: `3px solid ${borderColor}`,
      background: "var(--vista-surface-3)",
      padding: "16px 20px", borderRadius: 10,
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--vista-text-subtle)", marginBottom: 6 }}>
        {label || defaultLabel}
      </div>
      <div style={{ fontSize: 14, color: "var(--vista-text)", lineHeight: 1.5, maxWidth: "72ch", textWrap: "pretty" }}>
        {children}
      </div>
    </aside>
  );
}

// status: "good" | "warning" | "danger"
function StatusBanner({ status = "good", children }) {
  const color = `var(--vista-${status})`;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 18px", borderRadius: 12,
      background: `color-mix(in oklab, ${color} 14%, transparent)`,
      color, fontFamily: "var(--vista-font-display)", fontWeight: 600, letterSpacing: "-0.01em",
    }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "currentColor", boxShadow: `0 0 0 4px color-mix(in oklab, currentColor 20%, transparent)` }} />
      <div style={{ fontSize: 15, lineHeight: 1.3 }}>{children}</div>
    </div>
  );
}

function Card({ title, children, padding = 20 }) {
  return (
    <div style={{
      background: "var(--vista-surface)", border: "1px solid var(--vista-border)",
      borderRadius: 14, padding,
    }}>
      {title && (
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--vista-text-subtle)", marginBottom: 12 }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

// ============================================================
// VistaReport — wrap your report with this. Sets theme + accent
// + injects tokens. Wraps children in a centered max-width column.
// ============================================================

function VistaReport({ theme = "dark", accent, children, maxWidth = 1180 }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: VISTA_TOKENS_CSS }} />
      <div data-theme={theme} data-accent={accent} style={{
        background: "var(--vista-bg)", color: "var(--vista-text)",
        minHeight: "100vh", fontFamily: "var(--vista-font-ui)",
      }}>
        <div style={{ maxWidth, margin: "0 auto" }}>
          {children}
        </div>
      </div>
    </>
  );
}

// ============================================================
// END VISTA PRIMITIVES
// ============================================================

export {
  VistaReport, ReportHeader, ReportFooter,
  KPI, KPIGrid, Callout, StatusBanner, Card,
  StackedHBar, TrendLine, Donut, VersionBars,
  PerconaWordmark, PerconaLogomark,
  PerconaWordmarkDark, PerconaWordmarkLight,
  PerconaLogomarkPurple, PerconaLogomarkYellow,
  tok, chartColors,
};
