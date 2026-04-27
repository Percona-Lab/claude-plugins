# Vista × Percona — brand reference

Authoritative source for visual identity in every Vista report. Pair with `vista-primitives.html` (the canonical HTML implementation) and `vista-primitives.jsx` (the JSX twin, kept for reference / direct consumption).

## Render contract — the only way Vista produces a report

Every Vista report is a single **HTML artifact** delivered via Cowork's artifact tool:

1. **Pastes the HTML primitives verbatim.** In Cowork, the model `Read`s `references/vista-primitives.html` and pastes the block between `BEGIN VISTA HTML PRIMITIVES` and `END VISTA HTML PRIMITIVES` (the `<style id="vista-tokens">` + `<script id="vista-renderer">`) into the report's `<head>`. Do not abridge or substitute.
2. **Sets theme + accent on `<body>`** via `class="vista-report" data-theme="dark" data-accent="mysql"`. Switching `data-accent` swaps `--vista-accent` for the product color via CSS — the entire chart palette and brand layer follows automatically.
3. **Uses only the documented classes + `Vista.*` chart functions.** The shell builders `Vista.header(opts)` / `Vista.footer(opts)` return HTML strings; chart renderers populate placeholder `<div id="...">` elements. Pass token names like `"--vista-accent"` for colors — the renderer resolves them at draw time. No hex literals in report code.

The HTML primitives are the contract. If you need a new visual primitive, add it to `vista-primitives.html` first (and ideally mirror in `vista-primitives.jsx` for parity).

## Tokens

All defined in `VISTA_TOKENS_CSS` inside `vista-primitives.jsx`. Switching theme or accent updates every downstream token automatically.

| Group | Tokens |
|---|---|
| Surface | `--vista-bg`, `--vista-surface`, `--vista-surface-2`, `--vista-surface-3` |
| Border | `--vista-border`, `--vista-border-strong` |
| Text | `--vista-text`, `--vista-text-muted`, `--vista-text-subtle` |
| Brand | `--vista-purple` (#6E3FF3), `--vista-yellow` (#F5FF5A) |
| Status | `--vista-good`, `--vista-warning`, `--vista-danger`, `--vista-info` |
| Accent | `--vista-accent` — Percona purple by default, overridden by `data-accent` |
| Charts | `--vista-chart-1..8` — series palette; chart-1 always resolves to accent |
| Chart chrome | `--vista-grid`, `--vista-axis`, `--vista-tooltip-bg`, `--vista-tooltip-br` |
| Type | `--vista-font-display` (Space Grotesk), `--vista-font-ui` (Inter), `--vista-font-mono` (JetBrains Mono) |

## Theme

Set via the `theme` prop on `<VistaReport>`. Two values: `"dark"` (default) or `"light"`.

**Sticky preference**: when the user requests a specific theme ("light mode", "dark mode"), persist via `pack memory_update` under key `vista_beta_theme_preference`. Read on next request via `memory_get`. Default = dark on first run.

## Accent (per-product)

Set via the `accent` prop on `<VistaReport>`. Determines `--vista-accent` and `--vista-chart-1`.

| Accent | Color | Use for reports about |
|---|---|---|
| `mysql` | #E65A15 | PS, PXC, PXB, ProxySQL, Distribution for MySQL |
| `postgresql` | #005ED6 | PG, Distribution for PostgreSQL |
| `mongodb` | #1FA23A | PSMDB, PBM |
| `redis` | #D6362A | Redis-aligned reports |
| `kubernetes` | #2AA6DF | Operators (K8SPS, K8SPXC, K8SPSMDB, K8SPG) |
| `valkey` | #A83FEF | Valkey |
| `pmm` | #6E3FF3 | PMM |
| *(omit)* | purple | Cross-team, exec, communication feeds |

Cross-product reports (Team Highlights, Cross-Team Comms, Exec Summary) omit `accent` and stay on Percona purple.

## Logo usage

Provided as JSX components in `vista-primitives.jsx` — **never as `<img src>`**, never as base64 data URIs, never as relative-path assets.

| Component | Use |
|---|---|
| `<PerconaWordmark theme="dark"/>` | Header. Picks light wordmark on dark theme, dark wordmark on light. |
| `<PerconaLogomark theme="dark"/>` | Footer + cover. Yellow on dark, purple on light. |
| `<PerconaWordmarkDark/>`, `<PerconaWordmarkLight/>` | Direct override (rare — use the theme-aware wrapper). |
| `<PerconaLogomarkPurple/>`, `<PerconaLogomarkYellow/>` | Direct override (rare). |

**Sizing:** wordmark 24–28px tall in headers; logomark 18–22px in footers; logomark 96px on cover pages.

**Don't:** recolor the wordmark, drop-shadow, stretch, or place on photography without a solid scrim.

## Layout primitives

Provided in `vista-primitives.jsx`:

- `<ReportHeader kicker title sub theme right/>` — top of every report
- `<ReportFooter source theme page/>` — bottom of every report
- `<KPI label value delta deltaDir headline valueColor/>` — single tile
- `<KPIGrid items columns/>` — auto-grid of KPIs (`columns` optional; default auto-fit)
- `<Callout variant="insight|warning|action" label>` — key findings
- `<StatusBanner status="good|warning|danger">` — Cascade KPI status
- `<Card title>` — generic card with optional uppercase title

## Source attribution format

In `<ReportFooter source>`:

```
Source: Jira (perconadev.atlassian.net) · Fetched Apr 24, 2026 09:12 UTC
```

- `Source: <system> (<url>)` first.
- `Fetched <date time UTC>` for data recency.
- Multi-source: semicolon-separate. `Source: Jira (...); Percona Telemetry (pt-api.percona.com) · Fetched ...`
- "Generated by VISTA" is rendered automatically by `<ReportFooter>` — don't repeat in `source`.

## Acceptance checks

A Vista artifact passes review when:

- [ ] Imports/uses primitives from `vista-primitives.jsx` (no inline duplicate definitions).
- [ ] Wrapped in `<VistaReport theme accent>`.
- [ ] No hex literals in report code (only inside `vista-primitives.jsx`).
- [ ] Header uses `<PerconaWordmark/>`, footer uses `<PerconaLogomark/>`.
- [ ] Charts use `<StackedHBar/>`, `<TrendLine/>`, `<Donut/>`, or `<VersionBars/>` (or a documented exception).
- [ ] At least one `<Callout/>` per report tied to the most material signal.
- [ ] Footer source attribution follows the standard format.
- [ ] Light-mode render is coherent (flip `theme="light"` and check).
