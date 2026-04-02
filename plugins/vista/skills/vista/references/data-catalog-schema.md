# Data Catalog Schema Reference

This is a snapshot of the Notion data catalog schema for quick reference. The live version is the source of truth.

**Notion Database**: `28c674d091f3801f8bc3d35d85caa322`
**Data Source**: `collection://28c674d0-91f3-8095-9615-000bd4930760`

## Properties

| Property | Type | Description |
|---|---|---|
| Name | title | Metric name |
| Description | text | What the metric measures |
| Formula / Logic | text | How the metric is calculated |
| Business Owner | multi_select | Which team owns it |
| Status | select | Validated, Proposed, Expired |
| Reporting systems locations | text | Where to find this in existing BI tools |
| Segmentation | multi_select | How the metric can be sliced |
| Source System | multi_select | Where raw data comes from |
| Tags | multi_select | Categorization labels |
| Notes/Updates | text | Changelog and context |
| Created | date | When the metric was added |
| Updated | text | Last update info |

## Business Owners
Strategic, Product, Sales, BDR, SE, Customer Success, Marketing, Delivery Ops, Engineering, Community

## Source Systems
Pillars telemetry, ServiceNow, Download stats elasticsearch cluster, Salesforce, Download stats, Engineering Jira, Github, MS - Customer Monthly report, Clickhouse, Clari, check.percona.com

## Status Values
- **Validated** -- Metric is actively used and trusted
- **Proposed** -- Metric is defined but not yet validated
- **Expired** -- Metric is no longer maintained

## Key Tags (grouped)

### Product
MySQL, MongoDB, Postgres, Valkey, N+E, operators, kubernetes, percona server, postgresql

### Sales & Revenue
Sales, quota, target, attainment, ACV, booking, bookings, NRE, revenue, win, Expansion, NNL, opportunity, opportunities

### Customer Success
customer, cs, renewal, rate, GRR, NPS, SDM

### Engineering
bugs, fr, jira, engineering, github, pr, merged, builds, pro-builds

### Support / Delivery
tam, hours, responsive, consumed, managed, services, flexible, block, remaining, time, spent, task, ticket, incident, problem, case, change, request, Delivery OPS, Operations, Coordinator, estimated time, workload, tasks, changes, projects, cases

### Telemetry / Downloads
telemetry, downloads, deployment, version, packages, installed, components, storage, engine, plugin, addons, technology, software, active instance, pillar instance, uptime, database, size, cpu, arch, architecture, stats, pro

### Geography
EMEA, APAC, AMER, Global, region, location

### Service Family
Service Family, Managed Services, Support, Professional services, MS, PS
