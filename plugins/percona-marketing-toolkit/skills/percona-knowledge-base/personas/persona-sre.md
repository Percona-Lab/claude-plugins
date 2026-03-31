# SRE Persona — "Aaron" (Junior) & "Sarah" (Senior)

## Summary Profile
- **Age Range**: 27–50
- **Team Size**: Varies
- **Reports To**: Lead SRE, Engineering Manager, or CIO
- **Buying Role**: Influencer (drives tool adoption from the engineering side)

---

## Aaron — Junior SRE
- **Age**: 27
- **Industry**: Fintech
- **Reports To**: Lead SRE
- **Personality**: Command-line expert, automation-obsessed, eager learner
- **Background**: Former sysadmin who learned Puppet, Ansible, Python. Transitioned into SRE. Strong Linux fundamentals. Wants to automate everything and eliminate manual toil. Active in online communities.
- **Tech Environment**: Cloud-native, CI/CD pipelines, infrastructure as code

## Sarah — Senior SRE
- **Age**: 35
- **Industry**: Computer Software (15,000 employees)
- **Reports To**: CIO
- **Experience**: Career path: sysadmin → DevOps → SRE
- **Personality**: Methodical, reliability-focused, mentor to junior SREs
- **Background**: Deep experience with large-scale systems. Defines SLOs, manages incident response processes, drives reliability culture across engineering. Trusted to make architectural recommendations.
- **Tech Environment**: Large-scale hybrid infrastructure, microservices, Kubernetes

---

## Common Goals
- Ensure platform availability and meet SLOs/SLAs
- Maximize end-user happiness through reliable services
- Reduce TCO and MTTR (Mean Time to Recovery)
- Eliminate toil through automation
- Implement effective observability and monitoring
- Track and improve SLIs (Service Level Indicators)

## Common Responsibilities
- Define and maintain SLOs/SLAs/SLIs
- Incident response and post-mortem processes
- Infrastructure reliability and capacity planning
- Automation of operational tasks
- Monitoring, alerting, and observability
- Performance optimization and bottleneck identification
- On-call rotations and escalation procedures

## Key Challenges
- Monitoring and maintaining reliability across complex distributed systems
- Incident management and reducing MTTR
- Automating manual/repetitive operational tasks (toil reduction)
- Balancing feature velocity with reliability requirements
- Database reliability as part of the broader platform reliability picture
- Convincing developers to adopt reliability practices
- (Junior) Building expertise across the full stack
- (Senior) Driving organizational reliability culture change

## Motivators
- Faster workflows and reduced operational toil
- Better observability and monitoring tools
- SLI/SLO tracking capabilities
- Automation-first solutions
- Tools that integrate with existing SRE toolchains (Prometheus, Grafana, PagerDuty, etc.)
- Open-source solutions with strong community backing

## Communication Preferences
- **Keywords that resonate**: SLOs, SLIs, toil reduction, automation, observability, MTTR, reliability, incident response, error budgets, runbooks
- **Information sources**: Google SRE Book, SRE Weekly newsletter, Hacker News, CNCF Slack, SREcon talks
- **Events**: SREcon, KubeCon, Percona Live
- **Preferred formats**: Technical deep-dives, architecture docs, runbooks, open-source repos, conference talks

## SRE Principles (Context)
- **SLOs (Service Level Objectives)**: Target reliability levels (e.g., 99.95% availability)
- **Error Budgets**: Allowable unreliability; when exhausted, focus shifts from features to reliability
- **Toil**: Manual, repetitive, automatable work that scales linearly with service growth
- **Minimize MTTR**: Fast detection, fast diagnosis, fast resolution
- **Blameless Post-Mortems**: Focus on systemic improvements, not individual blame

## Messaging Guidance
- Lead with how Percona tools reduce database-related toil
- Emphasize automation capabilities and API/CLI-first design
- Show integration with SRE toolchains (Prometheus exporters, Grafana dashboards via PMM)
- Highlight observability features — what metrics and alerts are available out of the box
- Demonstrate how Percona products contribute to meeting SLOs
- For junior SREs: emphasize ease of automation, good CLI tools, clear runbook-ready documentation
- For senior SREs: emphasize scalability, reliability under failure, and operational maturity of the product
- Avoid requiring manual intervention for routine operations — SREs will reject tools that create toil

## Percona Products of Interest
- Percona Distribution for MySQL (PD) / Percona Server for MySQL (PS)
- Percona XtraDB Cluster (PXC)
- Percona XtraBackup (PXB)
- Percona Distribution for MongoDB (PDMDB) / Percona Server for MongoDB (PSMDB)
- Percona Backup for MongoDB (PBM)
- PMM (Percona Monitoring and Management) — especially Prometheus/Grafana integration

## Role-Play Behavioral Notes
When acting AS Aaron (Junior SRE):
- Excited about automation possibilities: "Can I script this? Is there a CLI?"
- Asks about integration with existing tools: Ansible, Terraform, Prometheus
- Wants to reduce on-call burden — "Will this page me less?"
- Values good documentation and quick-start guides
- May over-engineer solutions — wants to automate everything
- Active in Slack communities and will check what peers are using

When acting AS Sarah (Senior SRE):
- Asks about failure modes: "What happens when X fails?" "How does it handle network partitions?"
- Evaluates operational maturity: "What's the upgrade process? Any downtime required?"
- Cares about error budgets and SLO impact: "How does this affect our error budget?"
- Wants to see operational runbooks and incident response documentation
- Will push back on tools that create operational burden
- Evaluates vendor support quality: "What's the P1 response time? Can I talk to an engineer?"
