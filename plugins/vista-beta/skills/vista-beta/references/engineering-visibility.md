# Engineering Visibility reference

Data pull patterns, processing logic, and visualization blueprints for the Engineering Visibility report family. Visual styling is **not** in this file — see `vista-primitives.jsx` and `brand.md`. SKILL.md "Visual identity" defines the render contract.

VISTA supports two data sources — see SKILL.md "Data Source Selection Logic".

---

## Team Status Dashboard (#23)

### Step 1: Pull Data

Use the selected data source (Jira API preferred, Notion Jira Sync fallback).

#### Option A: Jira API (preferred)
Run three JQL queries for the requested team. Replace `PROJECT_KEYS` with the correct keys from the team mapping.

**Active work (non-epic):**
```
project in (PROJECT_KEYS) AND status != Done AND status != Closed AND issuetype != Epic ORDER BY priority DESC
```
Fields: `summary, status, issuetype, priority, assignee, parent, labels`

**Active epics:**
```
project in (PROJECT_KEYS) AND issuetype = Epic AND status != Done AND status != Closed
```
Fields: `summary, status, priority, assignee`

**Recently completed (sprint-aware):**

When the user says "last sprint", resolve the actual sprint from Jira first:
1. Query with `fields: ["customfield_10020"]` to get sprint objects.
2. Find the most recently closed sprint (by `completeDate`).
3. Use the sprint name in JQL:
```
project in (PROJECT_KEYS) AND sprint = "SPRINT_NAME" AND status in (Done, Closed) ORDER BY updated DESC
```

Fallback (when no sprint or user gives a time range):
```
project in (PROJECT_KEYS) AND status in (Done, Closed) AND status changed to (Done, Closed) AFTER -14d ORDER BY updated DESC
```

Include `customfield_10020[].goal` in the report header when present.

#### Option B: Notion Jira Sync (fallback only)
Query `collection://302674d0-91f3-8087-a698-000b2c337f93`. **Warning**: Notion sync returns ~14% of Jira API results. No sprint data. Use only when Jira API is unavailable.

### Step 2: Process Data

Group issues into:

1. **By Status** — map raw statuses to display groups:
   - `Open` / `New` → "To Do"
   - `In Progress` → "In Progress"
   - `In Review` / `In QA` / `In Doc` → "In Review"
   - `Pending Release` → "Pending Release"
   - `On Hold` / `Confirmation` → "Blocked"
2. **By Epic / Parent** — issues without a parent go into "Ungrouped / Standalone".
3. **By Priority** — Urgent / Critical / High / Medium / Low.
4. **By Assignee** — track "Unassigned" separately.

### Step 3: Render — Layout A

Use the primitives from `vista-primitives.jsx`. Wrap in `<VistaReport theme accent="<team-product>">`. Then in order:

1. `<ReportHeader kicker="{TEAM} · ENGINEERING VISIBILITY" title="Team Status" sub="As of {date} · Projects: {KEYS} · Source: Jira"/>`
2. `<KPIGrid columns={6} items={[ {label:"Total Active", value:N, headline:true}, {label:"In Progress",...}, {label:"In Review",...}, {label:"Blocked",...}, {label:"Unassigned",...}, {label:"Recently Completed", value:N, delta:"{x} vs prev sprint", deltaDir:"up"} ]}/>`
3. **Sprint goals** (if present) — row of small `<Card>` blocks, one per goal.
4. **Status distribution** — `<Card title="Status by project"><StackedHBar data=[...] keys=["To Do","In Progress","In Review","Pending Release","Blocked"]/></Card>`. Map "Blocked" key to `tok('--vista-danger')`.
5. **Priority + Workload** — `grid grid-cols-2 gap-4`:
   - `<Card title="Priority"><Donut data=[...]/></Card>`
   - `<Card title="Workload by assignee"><StackedHBar data=[...] keys=[issuetypes]/></Card>`
6. **By epic / initiative** — `<Card>` per epic with name, count badge, inline `<StackedHBar height={28}>` of statuses. Sort by count desc. Ungrouped at bottom.
7. **Active issues table** — `<Card title="Active Issues">` with a plain `<table>`, columns: Key (linked to Jira), Type, Priority, Summary, Assignee, Status, Epic.
8. **Recently completed** — similar table, last 10–20 items.
9. `<Callout variant="insight">` — auto-generated bullets:
   - Total active and trend vs previous period.
   - Unassigned percentage (flag if > 40%).
   - Top epic by issue count.
   - Any Blocker / Urgent items (always surface).
   - Recently completed count (momentum).
10. `<ReportFooter source="Source: Jira (perconadev.atlassian.net) · Fetched {now} UTC"/>`

---

## Cross-Team Dependencies (#24)

### Data Pull

#### Option A: Jira API
```
project in (PS, DISTMYSQL, PXC, PSMDB, PBM, PMM, PG, DISTPG, K8SPS, K8SPXC, K8SPSMDB, K8SPG, PCSM, PT, PKG, DOCS) AND issueFunction in hasLinks() AND status != Done AND status != Closed
```
Fields: `summary, status, issuelinks, project, priority, assignee`. Fallback: pull active issues, filter client-side for `issuelinks` non-empty.

#### Option B: Notion Jira Sync
Filter where `Blocked by` or `Is blocking` non-empty AND Status != Done/Closed.

### Processing
- Build a matrix: rows = blocking team, columns = blocked team. Use the team mapping from SKILL.md.
- Highlight cross-project links; same-project links are noise.

### Render
- `<body class="vista-report" data-theme="dark">` (cross-team — no `data-accent`; stays Percona purple).
- `Vista.header({ kicker: "ENGINEERING · DEPENDENCIES", title: "Cross-Team Dependencies", sub: "..." })`
- **Heatmap**: `Vista.renderHeatmap(elId, { rows: TEAMS, cols: TEAMS, data: matrix, color: "--vista-danger" })`. `matrix[srcTeamIdx][dstTeamIdx]` = count of issues where `src` is blocking `dst`. Diagonal stays 0 (a team blocking itself is noise).
- **Volume by source team**: `Vista.renderStackedHBar(elId, { data: [{name, blocking:N}, ...], keys: ["blocking"] })`.
- **Specific blocked items**: `<div class="vista-card"><div class="vista-card-title">Blocking chains</div><table class="vista-table">...</table></div>` listing each blocked issue with owner attribution and link.
- `<aside class="vista-callout vista-callout--warning">` for any chains > 3 hops.
- `Vista.footer({ source: "Source: Jira (perconadev.atlassian.net) · Fetched ... UTC" })`.

---

## Workload & Capacity (#25)

### Data Pull
```
project in (PROJECT_KEYS) AND status != Done AND status != Closed AND assignee is not EMPTY ORDER BY assignee
```
Fields: `summary, status, issuetype, priority, assignee, story_points` (when available). Plus an unassigned count query.

### Processing
- Count active issues per assignee (and story-point sum if available).
- Flag anyone with > 10 active issues as overloaded (threshold tunable).

### Render
- `<VistaReport theme accent="<team-product>">`
- `<ReportHeader kicker="{TEAM} · CAPACITY" title="Workload by Engineer" .../>`
- `<KPIGrid columns={4}>`: Total Active, Avg per Engineer, Overloaded (>10), Unassigned.
- `<Card title="Workload"><StackedHBar data=[...] keys=[issuetypes] refLines={[{x:10,label:'Overload',color:tok('--vista-danger')}]}/></Card>` — note: `refLines` is for `<TrendLine>`; for `<StackedHBar>` overload, render the threshold as a thin `<div>` overlay or list overloaded engineers in a `<Callout variant="warning">`.
- `<Callout variant="insight">` — bullets calling out the most-loaded engineers and unassigned count.
- `<ReportFooter/>`.

---

## Cross-Team Communication Feed (#26) — Layout B

### Data Pull

#### Option A: Jira API

When the user says "last sprint", resolve each team's sprint independently — sprint cadences vary. For cross-team queries, run per-team sprint lookups and label each.

For a fixed time range (this week, last 30d):
```
project in (PS, DISTMYSQL, PXC, PSMDB, PBM, PMM, PG, DISTPG, K8SPS, K8SPXC, K8SPSMDB, K8SPG, PCSM, PT, PKG, DOCS) AND status in (Done, Closed) AND status changed to (Done, Closed) AFTER -{days}d ORDER BY updated DESC
```

Fields: `summary, status, issuetype, priority, assignee, project, updated, parent, customfield_10020`. Default: 7 days.

#### Option B: Notion Jira Sync — fallback only.

### Processing
- **Group by TEAM, not project key.** Use the mapping in SKILL.md.
- Sort by completion date desc.
- Highlight milestones: epic completions, release items, Critical/Urgent fixes.
- "Volume by team" (not project key) in summary.

### Render — Layout B

1. `<VistaReport theme accent={singleTeam ? team : undefined}>`
2. `<ReportHeader kicker="ENGINEERING · {SPRINT|WEEK} DELIVERY" title="What shipped {range}" sub="{start} – {end} · Source: Jira"/>`
3. `<KPIGrid columns={6} items={[ Total Shipped (headline), Bugs Fixed, New Features, Improvements, Maintenance/Tasks, Contributors ]}/>`
4. **Sprint goals** (if present and single-team).
5. `<Card title="Volume by team"><StackedHBar data=[...] keys=[issuetypes]/></Card>`
6. `grid grid-cols-2 gap-4`:
   - `<Card title="Issue type"><Donut data=[...]/></Card>`
   - `<Card title="Top contributors"><StackedHBar data=[...] keys=[issuetypes]/></Card>`
7. `<Card title="Releases & milestones">` — list with team name + Fix Versions.
8. **Per-team detail** — one `<Card title="{Team}">` per team, with its own table. Issue keys link to Jira.
9. `<Callout variant="insight">` — sprint summary bullets.
10. `<ReportFooter source="Source: Jira (perconadev.atlassian.net) · Fetched {now} UTC"/>`

---

## Team Highlights & Risks (#27)

Driven by the weekly status reports in Notion (Reporting Home `d1f374e5e2264cbe983a43ecc2681f4d`).

### Data Pull
1. Fetch Reporting Home, find most recent High-Level Status entry.
2. Fetch the linked status page; extract Good/Bad tables per team.
3. Optionally fetch the previous week for comparison.

### Render
- `<VistaReport theme accent={undefined}>` (cross-team).
- `<ReportHeader kicker="LEADERSHIP · WEEKLY HIGHLIGHTS" title="Wins & Risks · {week}" .../>`
- For each team: two side-by-side `<Card>`s — left "Wins" with `borderLeft: 3px solid var(--vista-good)`, right "Risks" with `borderLeft: 3px solid var(--vista-danger)`. Bullets from Notion.
- `<Callout variant="action">` for any risk that requires leadership attention.
- `<ReportFooter source="Source: Weekly Status Report (Notion) · As of {date}"/>`
