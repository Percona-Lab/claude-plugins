# Engineering Visibility Reference

This reference contains the proven JQL queries, data processing logic, and visualization patterns for Engineering Visibility reports. VISTA uses this as a blueprint when generating reports from live Jira data.

## Team Status Dashboard (#23)

### Step 1: Pull Data

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
│  Jira data as of 2026-04-02 | PS, K8SPS, MYR, DISTMYSQL │
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
```
project in (PS, K8SPS, PXC, K8SPXC, PSMDB, K8SPSMDB, PMM, DOCS) AND issueFunction in hasLinks() AND status != Done AND status != Closed
```
Fields: `summary, status, issuelinks, project, priority, assignee`

Note: `issueFunction` may not be available on all Jira instances. Fallback: pull all active issues and filter client-side for those with `issuelinks`.

### Processing
- Extract issue links of type "blocks/is blocked by" and "depends on/is depended on by"
- Build a matrix: rows = blocking team, columns = blocked team
- Highlight cross-project links (same-project links are less interesting)

### Visualization
- Dependency matrix (heatmap table) showing cross-team block counts
- List of specific blocked items with owner attribution

---

## Workload & Capacity (#25)

### Data Pull
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
```
project in (PS, K8SPS, PXC, K8SPXC, PSMDB, K8SPSMDB, PMM, DOCS) AND status in (Done, Closed) AND status changed to (Done, Closed) AFTER -{days}d ORDER BY updated DESC
```
Fields: `summary, status, issuetype, priority, assignee, project, updated, parent`

Default: 7 days. User can specify: "this week", "last sprint", "this month", "last 30 days".

### Processing
- **Group by TEAM, not by project key.** Roll up project keys into teams using the mapping from SKILL.md:
  - MySQL: PS, K8SPS, MYR, DISTMYSQL
  - PXC: PXC, K8SPXC
  - MongoDB: PSMDB, K8SPSMDB
  - PMM: PMM
  - PostgreSQL: PG, K8SPG, DISTPG
  - Docs: DOCS
  - Other: any project key not in the above mapping gets its own group
- Sort by completion date (most recent first)
- Highlight milestones: epic completions, release items, high-priority fixes
- Show "Volume by Team" (not by project) in the summary section

### Visualization
- Timeline feed grouped by **team** (not raw project keys)
- Team headers with completion count and team name (e.g. "MySQL — 12 done", not "PS — 12 done")
- Milestone items get a special badge/highlight
- "Releases in Motion" section should also label by team name
