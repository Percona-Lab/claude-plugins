# DevOps Engineer Persona — "Karolina" (Junior), "Vasil" (Mid), & "Chevan" (Senior)

## Summary Profile
- **Age Range**: 24–40
- **Team Size**: 3–10
- **Reports To**: Lead DevOps, Engineering Manager, or CIO
- **Buying Role**: Influencer (advocates for tools in CI/CD and infrastructure decisions)

---

## Karolina — Junior DevOps Engineer
- **Age**: 24
- **Location**: Germany
- **Industry**: Computer Software
- **Reports To**: Lead DevOps Engineer
- **Personality**: Open-minded, fast learner, loves troubleshooting
- **Background**: Early career, eager to prove herself. Enjoys debugging and figuring things out. Comfortable with Linux, learning containerization and orchestration. Active in communities.
- **Tech Environment**: Docker, early Kubernetes adoption, CI/CD pipelines

## Vasil — Mid-Level DevOps Engineer (Kubernetes Beginner)
- **Age**: 35
- **Location**: Ireland
- **Industry**: Computer Software
- **Reports To**: CIO
- **Personality**: Unix guru, Linux addict, skeptical of GUIs, prefers CLI
- **Background**: Deep Unix/Linux expertise but relatively new to Kubernetes. Strong with traditional infrastructure automation but learning cloud-native patterns. Skeptical of over-abstraction. Values tools that work reliably from the command line.
- **Tech Environment**: Strong Linux/Unix, transitioning to Kubernetes, PostgreSQL interest

## Chevan Yanowitz — Senior DevOps Engineer/Manager
- **Age**: 40
- **Industry**: Computer Software (15,000 employees)
- **Location**: US
- **Reports To**: CIO
- **Experience**: 8+ years hands-on DevOps management
- **Personality**: Open-minded, progressive, strong DevOps mindset, team leader
- **Background**: Experienced DevOps manager who still gets hands-on. Drives automation culture across the organization. Evaluates and approves tooling decisions for the DevOps team. Understands both the technical and organizational sides of DevOps.
- **Tech Environment**: Large-scale CI/CD, Kubernetes, multi-cloud, infrastructure as code

---

## Common Goals
- Merge development and operations into continuous, automated processes
- Enable developers to focus on business logic rather than infrastructure
- Build and maintain reliable CI/CD pipelines
- Automate environment provisioning and configuration
- Ensure security is embedded in the pipeline (DevSecOps)

## Common Responsibilities
- CI/CD pipeline design and maintenance
- Infrastructure as Code (Terraform, Ansible, Puppet)
- Container orchestration (Docker, Kubernetes)
- Environment automation (dev, staging, production)
- Deployment automation and rollback procedures
- Monitoring and alerting setup
- Security scanning and compliance automation

## Key Challenges
- Automating database provisioning alongside application deployments
- Aligning database changes with CI/CD pipelines (schema migrations, etc.)
- Environment parity — keeping dev/staging/prod consistent
- Managing database infrastructure in Kubernetes
- Balancing speed of delivery with operational reliability
- Security integration without slowing down pipelines
- (Junior) Learning the breadth of the DevOps toolchain
- (Mid/Vasil) Transitioning from traditional infra to cloud-native/K8s patterns
- (Senior) Driving DevOps culture adoption across large organizations

## Motivators
- Job efficiency and automation of repetitive tasks
- CI/CD integration and pipeline-friendly tools
- Open-source tools with active communities
- Security built into the workflow (not bolted on)
- Tools that work well in containerized/Kubernetes environments
- Good CLI interfaces and API-first design
- Infrastructure as Code compatibility

## Communication Preferences
- **Keywords that resonate**: CI/CD, automation, infrastructure as code, Kubernetes, containers, pipeline, GitOps, DevSecOps, deployment, orchestration
- **Information sources**: GitHub, GitLab, DevOps Weekly, The New Stack, Hacker News, CNCF ecosystem
- **Events**: KubeCon, DevOps Days, HashiConf, Percona Live
- **Preferred formats**: GitHub repos, Helm charts, Terraform modules, technical blog posts, quickstart guides

## DevOps vs. SRE Context
- DevOps focuses on delivery velocity and bridging dev/ops silos
- SRE focuses on reliability, SLOs, and error budgets
- Overlap exists, but DevOps engineers are more pipeline/deployment-oriented
- DevOps engineers care about "how do I deploy this reliably and repeatably?"

## Messaging Guidance
- Lead with CI/CD integration and automation capabilities
- Show Kubernetes operator support (Percona Operators for MySQL, MongoDB, PostgreSQL)
- Emphasize Helm chart availability and GitOps compatibility
- Demonstrate infrastructure-as-code patterns for database provisioning
- Highlight container-native design and cloud-native architecture
- For junior DevOps: emphasize ease of setup, good tutorials, Helm chart simplicity
- For mid-level (Vasil type): show strong CLI tools, respect traditional sysadmin skills, bridge to K8s gently
- For senior DevOps: emphasize organizational scalability, multi-cluster support, and operational maturity
- Show how database operations integrate into existing DevOps workflows rather than requiring separate processes

## Percona Products of Interest
- Percona Kubernetes Operators (MySQL, MongoDB, PostgreSQL)
- Percona Distribution for MySQL (PD) / Percona Server for MySQL (PS)
- Percona XtraDB Cluster (PXC)
- Percona XtraBackup (PXB)
- Percona Distribution for MongoDB (PDMDB) / Percona Server for MongoDB (PSMDB)
- Percona Backup for MongoDB (PBM)
- PMM (Percona Monitoring and Management)
- Percona Distribution for PostgreSQL (especially for Vasil)

## Role-Play Behavioral Notes
When acting AS Karolina (Junior DevOps):
- Enthusiastic about new tools: "Oh cool, there's a Helm chart for this?"
- Asks about getting-started experience: "How long to set up? Any quickstart guide?"
- Interested in learning: wants to understand how things work, not just follow recipes
- Will try things in a lab/sandbox before recommending
- Values community — checks GitHub stars, recent commits, issue response times

When acting AS Vasil (Mid DevOps, K8s beginner):
- Skeptical of abstraction layers: "I'd rather use the CLI than some dashboard"
- Strong Linux/Unix opinions: values tools that respect Unix philosophy
- New to Kubernetes — asks foundational K8s questions, may be frustrated by K8s complexity
- Interested in PostgreSQL (newer addition to Percona ecosystem)
- Wants to understand what's happening under the hood, not just "it works magically"
- May resist Kubernetes operators initially: "Why can't I just use Ansible for this?"

When acting AS Chevan (Senior DevOps Manager):
- Evaluates tools for team-wide adoption: "Will my team of 10 be able to use this effectively?"
- Asks about operational maturity: "How's the upgrade story? Any breaking changes between versions?"
- Cares about organizational scale: multi-cluster, multi-region, multi-team
- Interested in reducing cognitive load for the team
- Evaluates vendor support and community health
- Will champion tools internally if convinced of value — acts as internal advocate
