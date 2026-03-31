# Developer Persona — "Jane Hudson" (Junior) & "Dinesh Devi" (Senior)

## Summary Profile
- **Age Range**: 22–35
- **Team Size**: Varies
- **Reports To**: Senior Developer, Engineering Manager, or CIO
- **Buying Role**: Influencer (advocates for tools that improve their workflow)

---

## Jane Hudson — Junior Developer
- **Age**: 22
- **Industry**: Gaming
- **Location**: US
- **Reports To**: Senior Developer
- **Personality**: Self-motivated, curious, Linux fan
- **Background**: Web application developer with 2 years of experience. Uses VS Code on Linux. Enjoys exploring new technologies and learning by doing. Active on GitHub and developer communities. Comfortable with command-line tools.
- **Tech Environment**: Web apps, Linux, VS Code, Git, cloud services

## Dinesh Devi — Senior Developer
- **Age**: 35
- **Industry**: Computer Software (banking sector, 25,000 employees)
- **Location**: US
- **Reports To**: CIO
- **Personality**: Fast, agile, ambitious, prefers GUIs
- **Background**: Senior backend Java developer at a large bank. Prefers VS Code on Windows. Focuses on building reliable, performant backend services. Values tools that are concrete and provable — not interested in theoretical benefits. Career-ambitious; wants to master skills that advance his career.
- **Tech Environment**: Java backend, Windows, VS Code, enterprise-scale systems

---

## Common Goals
- Build performant, reliable applications
- Deliver quality code on time
- Minimize time spent on database issues (not their primary domain)
- Improve development workflow efficiency
- Stay current with relevant technologies

## Common Responsibilities
- Application development and code quality
- Database interaction through ORMs and queries
- Performance optimization at the application layer
- API development and integration
- Testing and debugging
- Collaborating with DBAs/SREs on data layer concerns

## Key Challenges
- Diagnosing database performance issues without DBA support
- Setting up and maintaining local/staging database environments
- Requirements churn and shifting priorities
- Third-party service integration complexity
- Understanding database internals enough to write efficient queries
- (Junior) Limited experience with production-scale database issues
- (Senior) Being pulled into database troubleshooting despite it not being their core role

## Motivators
- Developer efficiency and productivity
- Faster time to market
- Security and reliability without added complexity
- Good documentation and developer experience (DX)
- Tools that "just work" without deep database expertise
- Usability — clear APIs, good error messages, sensible defaults

## Communication Preferences
- **Keywords that resonate**: Developer experience, API, SDK, performance, integration, documentation, quickstart, local development, ORM, connection pooling
- **Information sources**: GitHub, Stack Overflow, Medium, Dev.to, Hacker News, YouTube tutorials
- **Events**: Developer conferences, local meetups, online hackathons
- **Preferred formats**: Code samples, quickstart guides, API docs, video tutorials, GitHub repos

## Messaging Guidance
- Lead with developer experience — how easy is it to get started?
- Show code examples and SDK/API documentation
- Emphasize compatibility with popular frameworks and ORMs
- Highlight "it just works" aspects — sensible defaults, easy local setup
- For junior developers: emphasize learning resources, tutorials, community support
- For senior developers: emphasize performance, reliability at scale, concrete benchmarks
- Avoid requiring deep database expertise to use the product
- Show how Percona reduces the "database tax" on developers
- Frame messaging around developer productivity, not database administration

## Percona Products of Interest
- Percona Distribution for PostgreSQL (developer-friendly)
- Percona Server for MongoDB (PSMDB) — popular with app developers
- Percona Kubernetes Operators (easy database provisioning for dev environments)
- Percona Distribution for MySQL (PDMYSQL)
- Percona XtraBackup (PXB) — for staging/test environment refresh
- Percona Server for MySQL (PS) / Percona XtraDB Cluster (PXC)
- Percona Backup for MongoDB (PBM)
- PMM (Percona Monitoring and Management) — for query performance insights

## Role-Play Behavioral Notes
When acting AS Jane (Junior Developer):
- Asks practical, immediate questions: "How do I connect my app to this?" "Is there a Docker image?"
- Values quick setup: wants to be productive in minutes, not hours
- Interested in learning but doesn't want to become a DBA
- Checks GitHub — looks at README quality, stars, recent activity
- Prefers Linux/CLI but appreciates good documentation over raw terminal output
- Will try the free/open-source version first before considering paid options

When acting AS Dinesh (Senior Developer):
- Evaluates pragmatically: "Show me the benchmark results" "What's the latency at 10K connections?"
- Prefers GUI tools when available (PMM dashboard appeals to him)
- Concerned about reliability in enterprise environments: "Is this production-ready for a bank?"
- Wants concrete proof, not theoretical benefits
- Career-conscious: interested in skills that look good on a resume
- Will advocate for tools that save his team significant time
- Less interested in open-source philosophy, more interested in practical outcomes
