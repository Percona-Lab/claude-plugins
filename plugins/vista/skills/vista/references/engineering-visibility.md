# Engineering Visibility Reference

This reference contains data pull patterns, processing logic, and visualization blueprints for Engineering Visibility reports. VISTA supports two data sources — see SKILL.md Data Source Selection Logic.

## Team Status Dashboard (#23)

### Step 1: Pull Data

Use the selected data source (Notion Jira Sync preferred, Jira API fallback).

#### Option A: Notion Jira Sync
Query `collection://302674d0-91f3-8087-a698-000b2c337f93` with these filters:

**Active work:** Status != Done AND Status != Closed (filter by Project relation for team scope)
Fields available: Task name, Key, Status, Assignee, Parent-task, Updated, Due, Blocked by, Is blocking, Fix Versions

**Recently completed:** Status = Done/Closed AND Updated >= {14 days ago}
Note: `Updated` is an approximation of resolved date (~95% accurate).

#### Option B: Jira API (JQL)
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

**Recently completed (trailing 14 days):**
```
project in (PROJECT_KEYS) AND status in (Done, Closed) AND status changed to (Done, Closed) AFTER -14d ORDER BY updated DESC
```
Fields: `summary, status, issuetype, priority, assignee, parent`

### Step 2: Process Data

Group issues into these categories for display:

1. **By Status** — aggregate counts per status for the stacked bar chart:
   - Map statuses to display groups: Open/New → "To Do", In Progress → "In Progress", In Review/In QA/In Doc → "In Review", Pending Release → "Pending Release", On Hold/Confirmation → "Blocked/Waiting"

2. **By Epic/Parent** — group issues under their parent epic. Issues without a parent go into "Ungrouped / Standalone".

3. **By Priority** — count per priority level for the priority distribution.

4. **By Assignee** — count per assignee for workload mini-view. Track "Unassigned" separately.

### Step 3: Generate Visualization

**React (Cowork/Claude Code):**

The dashboard should render as a single React component with these sections:

```
┌─────────────────────────────────────────────────────┐
│  Team Status Dashboard: MySQL                        │
│  Jira data as of 2026-04-02 | PS, MYR, DISTMYSQL         │
├─────────────────────────────────────────────────────┤
│  Summary Cards:                                      │
│  [Total Active] [In Progress] [Pending Release] [Blockers] │
├─────────────────────────────────────────────────────┤
│  Status Distribution (Stacked Horizontal Bar)        │
│  ████████████░░░░░░░████░░██                        │
│  To Do | In Progress | In Review | Pending Release   │
├─────────────────────────────────────────────────────┤
│  By Epic/Initiative (Grouped Table)                  │
│  ▸ PS 9.7.0-0 Release          [3 issues] ██░░      │
│  ▸ Audit Log Filter             [2 issues] █░░░      │
│  ▸ KMIP Library                 [1 issue]  ░░░░      │
│  ▸ Ungrouped / Standalone       [86 issues] ████████ │
├─────────────────────────────────────────────────────┤
│  Priority Breakdown (Donut)     │  Top Assignees (Bar)│
│       ┌───┐                     │  Skibinski  ████    │
│      │ H:78│                    │  Lukin      ███     │
│       └───┘                     │  Nogueira   ███     │
│  C:12 U:5 M:5                   │  Unassigned ████████│
├─────────────────────────────────────────────────────┤
│  Recently Completed (last 14 days)                   │
│  ✓ PS-10891 Fix crash on multi-table UPDATE          │
│  ✓ PS-10887 Audit log rotation deadlock              │
└─────────────────────────────────────────────────────┘
```

**Status colors for charts:**
```javascript
const STATUS_COLORS = {
  "To Do": "#9E9E9E",           // gray
  "In Progress": "#2196F3",     // blue
  "In Review": "#FF9800",       // amber
  "Pending Release": "#4CAF50", // green
  "Blocked/Waiting": "#F44336", // red
};

const PRIORITY_COLORS = {
  "Urgent": "#F44336",    // red
  "Critical": "#FF6B35",  // orange
  "High": "#FF9800",      // amber
  "Medium": "#4CAF50",    // green
  "Low": "#2196F3",       // blue
};
```

### Step 4: Key Findings

Auto-generate 3-5 bullet points:
- Total active issues and trend vs. previous period if available
- Percentage unassigned (flag if > 40%)
- Top epic/initiative by issue count
- Any Blocker or Urgent priority items (always surface these)
- Recently completed count (momentum indicator)

---

## Cross-Team Dependencies (#24)

### Data Pull

#### Option A: Notion Jira Sync (preferred)
Query all issues where `Blocked by` or `Is blocking` relations are non-empty, AND Status != Done/Closed.
The Notion sync has explicit `Blocked by` and `Is blocking` relation fields — no need for `issueFunction`.

#### Option B: Jira API
```
project in (PS, MYR, DISTMYSQL, PXC, PSMDB, PBM, PMM, PG, DISTPG, K8SPS, K8SPXC, K8SPSMDB, K8SPG, PCSM, PT, PKG, DOCS) AND issueFunction in hasLinks() AND status != Done AND status != Closed
```
Fields: `summary, status, issuelinks, project, priority, assignee`

Note: `issueFunction` may not be available on all Jira instances. Fallback: pull all active issues and filter client-side for those with `issuelinks`.

### Processing
- Extract blocking relationships from Notion relations (Blocked by / Is blocking) or Jira issue links
- Build a matrix: rows = blocking team, columns = blocked team
- Highlight cross-project links (same-project links are less interesting)

### Visualization
- Dependency matrix (heatmap table) showing cross-team block counts
- List of specific blocked items with owner attribution

---

## Workload & Capacity (#25)

### Data Pull

#### Option A: Notion Jira Sync
Query issues where Status != Done/Closed, filtered by Project relation for team scope. Group by Assignee. Count issues with empty Assignee separately.

#### Option B: Jira API
```
project in (PROJECT_KEYS) AND status != Done AND status != Closed AND assignee is not EMPTY ORDER BY assignee
```
Fields: `summary, status, issuetype, priority, assignee, story_points` (if available)

Also pull unassigned count:
```
project in (PROJECT_KEYS) AND status != Done AND status != Closed AND assignee is EMPTY
```

### Processing
- Count active issues per assignee
- Flag anyone with > 10 active issues as "overloaded" (configurable)
- Calculate unassigned ratio

### Visualization
- Horizontal bar chart: one bar per assignee, colored by priority distribution
- Red threshold line at overload limit
- Separate "Unassigned" bar at bottom

---

## Cross-Team Communication Feed (#26)

### Data Pull

#### Option A: Notion Jira Sync
Query issues where Status = Done/Closed AND Updated >= {days ago}. Returns all recently completed items across all synced projects.

#### Option B: Jira API
```
project in (PS, MYR, DISTMYSQL, PXC, PSMDB, PBM, PMM, PG, DISTPG, K8SPS, K8SPXC, K8SPSMDB, K8SPG, PCSM, PT, PKG, DOCS) AND status in (Done, Closed) AND status changed to (Done, Closed) AFTER -{days}d ORDER BY updated DESC
```
Fields: `summary, status, issuetype, priority, assignee, project, updated, parent`

Default: 7 days. User can specify: "this week", "last sprint", "this month", "last 30 days".

### Processing
- **Group by TEAM, not by project key.** Roll up project keys into teams using the mapping from SKILL.md:
  - MySQL: PS, MYR, DISTMYSQL
  - PXC: PXC
  - MongoDB: PSMDB, PBM
  - PMM: PMM
  - PostgreSQL: PG, DISTPG
  - Operators: K8SPS, K8SPXC, K8SPSMDB, K8SPG
  - ClusterSync: PCSM
  - Percona Toolkit: PT
  - Packaging: PKG
  - Docs: DOCS
  - Other: any project key not in the above mapping gets its own group
- Sort by completion date (most recent first)
- Highlight milestones: epic completions, release items, high-priority fixes
- Show "Volume by Team" (not by project) in the summary section

### Visualization

**IMPORTANT: All reports MUST use the dark theme and the same layout structure as the Team Status Dashboard.**

**Theme**: Dark background (`bg-gray-950` / `#0a1628`), light text (`text-gray-100`). Never use white/light backgrounds.

**Layout (in order):**

```
┌─────────────────────────────────────────────────────┐
│  Title: "What Shipped This [Week/Month] Across Percona" │
│  Date range | Source: Jira (perconadev.atlassian.net)     │
├─────────────────────────────────────────────────────┤
│  KPI Cards (dark cards, colored values):             │
│  [Total Shipped] [Bugs Fixed] [New Features]         │
│  [Improvements] [Urgent/Critical] [Teams Active]     │
├─────────────────────────────────────────────────────┤
│  Volume by Team (Horizontal Stacked Bar)             │
│  - Bars colored by issue type (Bug/Feature/etc.)     │
│  - Teams sorted by volume descending                 │
├────────────────────────┬────────────────────────────┤
│  Issue Type Breakdown  │  Completions by Contributor │
│  (Doughnut chart)      │  (Horizontal bar chart)     │
├────────────────────────┴────────────────────────────┤
│  Key Initiatives / Releases in Motion                │
│  - Cards with team color left-border                 │
│  - Items listed with type badges and checkmarks      │
├─────────────────────────────────────────────────────┤
│  Team Detail Tables (collapsible per team)           │
│  - Team header with count badge                      │
│  - Linked Jira keys, type badges, summary, assignee  │
├─────────────────────────────────────────────────────┤
│  Key Findings (3-5 auto-generated bullet points)     │
└─────────────────────────────────────────────────────┘
```

**Style rules:**
- KPI cards: `bg-gray-900 rounded-xl border border-gray-800`, values in brand colors (red for bugs, green for features, orange for total)
- Charts: Use Recharts. Import ALL components including `Legend`. Dark grid lines (`#1f2937`), light axis text (`#9ca3af`)
- Tables: `bg-gray-900` with `border-gray-800`, hover states, linked Jira keys in blue
- Team headers: Left border in team color, count badge in green
- Initiative cards: `bg-gray-800` with team color left border, type badges colored by type
- Footer: `text-gray-600`, centered, "Generated by VISTA"

**This exact layout applies to ALL cross-team reports** — weekly, monthly, sprint, or custom date range. The only difference is the date range in the title and JQL query.
