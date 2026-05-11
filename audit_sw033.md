# sw_033 auto-annotation audit

Source: /Users/jay/Projects/meme-eval/src/data/sw033.json
Episode: sw_033 · software_project · 17 sessions
Systems: bm25, dense, graphiti, karpathy, md_file, mem0, md_file_opus
Probe before / after session: 13 / 16

## 1. Annotation counts (added lines per session × task tag)

### BM25 (bm25)

| session | kind | added_total | +ER | +Agg | +Tr | +Del | +Cas | +Abs | removed_total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | filler | 127 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | filler | 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | filler | 22 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3 | evidence | 25 | 0 | 2 | 3 | 0 | 0 | 0 | 0 |
| 4 | filler | 71 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 5 | filler | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 6 | evidence | 13 | 0 | 1 | 2 | 1 | 0 | 0 | 0 |
| 7 | filler | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 8 | filler | 65 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 9 | evidence | 13 | 0 | 1 | 2 | 0 | 1 | 1 | 0 |
| 10 | filler | 180 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 11 | evidence | 17 | 0 | 0 | 0 | 0 | 2 | 1 | 0 |
| 12 | filler | 76 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 13 | probe-before | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 14 | evidence | 13 | 0 | 0 | 0 | 1 | 1 | 1 | 0 |
| 15 | filler | 61 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 16 | probe-after | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

### text-emb-3-small (dense)

| session | kind | added_total | +ER | +Agg | +Tr | +Del | +Cas | +Abs | removed_total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | filler | 127 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | filler | 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | filler | 22 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3 | evidence | 25 | 0 | 2 | 3 | 0 | 0 | 0 | 0 |
| 4 | filler | 71 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 5 | filler | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 6 | evidence | 13 | 0 | 1 | 2 | 1 | 0 | 0 | 0 |
| 7 | filler | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 8 | filler | 65 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 9 | evidence | 13 | 0 | 1 | 2 | 0 | 1 | 1 | 0 |
| 10 | filler | 180 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 11 | evidence | 17 | 0 | 0 | 0 | 0 | 2 | 1 | 0 |
| 12 | filler | 76 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 13 | probe-before | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 14 | evidence | 13 | 0 | 0 | 0 | 1 | 1 | 1 | 0 |
| 15 | filler | 61 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 16 | probe-after | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

### Graphiti (graphiti)

| session | kind | added_total | +ER | +Agg | +Tr | +Del | +Cas | +Abs | removed_total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | filler | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| 1 | filler | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | filler | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3 | evidence | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 4 | filler | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 5 | filler | 12 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 6 | evidence | 4 | 0 | 1 | 1 | 1 | 0 | 0 | 0 |
| 7 | filler | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 8 | filler | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 9 | evidence | 5 | 0 | 1 | 1 | 0 | 2 | 2 | 0 |
| 10 | filler | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 11 | evidence | 3 | 0 | 0 | 0 | 0 | 2 | 1 | 0 |
| 12 | filler | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 13 | probe-before | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 14 | evidence | 2 | 0 | 0 | 0 | 0 | 1 | 1 | 0 |
| 15 | filler | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 16 | probe-after | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

### Karpathy Wiki (karpathy)

| session | kind | added_total | +ER | +Agg | +Tr | +Del | +Cas | +Abs | removed_total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | filler | 22 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | filler | 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | filler | 17 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3 | evidence | 33 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| 4 | filler | 28 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 5 | filler | 25 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 6 | evidence | 29 | 0 | 0 | 3 | 0 | 0 | 0 | 0 |
| 7 | filler | 26 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 8 | filler | 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 9 | evidence | 28 | 0 | 0 | 3 | 0 | 2 | 2 | 0 |
| 10 | filler | 29 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 11 | evidence | 25 | 1 | 0 | 0 | 0 | 1 | 1 | 0 |
| 12 | filler | 29 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 13 | probe-before | 1890 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 14 | evidence | 23 | 0 | 0 | 0 | 1 | 2 | 2 | 0 |
| 15 | filler | 33 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 16 | probe-after | 367 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

### MD-flat (md_file)

| session | kind | added_total | +ER | +Agg | +Tr | +Del | +Cas | +Abs | removed_total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | filler | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| 1 | filler | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | filler | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3 | evidence | 5 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 4 | filler | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 5 | filler | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 6 | evidence | 4 | 0 | 1 | 1 | 1 | 0 | 0 | 0 |
| 7 | filler | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 8 | filler | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 9 | evidence | 4 | 0 | 1 | 1 | 0 | 1 | 1 | 0 |
| 10 | filler | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 11 | evidence | 3 | 1 | 0 | 0 | 0 | 1 | 1 | 0 |
| 12 | filler | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 13 | probe-before | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 14 | evidence | 3 | 0 | 0 | 0 | 0 | 1 | 1 | 0 |
| 15 | filler | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 16 | probe-after | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

### Mem0 (mem0)

| session | kind | added_total | +ER | +Agg | +Tr | +Del | +Cas | +Abs | removed_total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | filler | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| 1 | filler | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | filler | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3 | evidence | 10 | 0 | 1 | 2 | 0 | 0 | 0 | 0 |
| 4 | filler | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 5 | filler | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 6 | evidence | 8 | 0 | 1 | 2 | 1 | 0 | 0 | 0 |
| 7 | filler | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 8 | filler | 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 9 | evidence | 5 | 0 | 1 | 1 | 0 | 1 | 1 | 0 |
| 10 | filler | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 11 | evidence | 3 | 1 | 0 | 0 | 0 | 1 | 1 | 0 |
| 12 | filler | 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 13 | probe-before | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 14 | evidence | 4 | 0 | 0 | 0 | 1 | 1 | 1 | 0 |
| 15 | filler | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 16 | probe-after | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

### MD-flat × Opus 4.7 (md_file_opus)

| session | kind | added_total | +ER | +Agg | +Tr | +Del | +Cas | +Abs | removed_total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | filler | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | filler | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | filler | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3 | evidence | 5 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 4 | filler | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 5 | filler | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 6 | evidence | 6 | 0 | 1 | 1 | 1 | 0 | 0 | 1 |
| 7 | filler | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 8 | filler | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 9 | evidence | 5 | 0 | 1 | 1 | 0 | 1 | 1 | 1 |
| 10 | filler | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 11 | evidence | 2 | 0 | 0 | 0 | 0 | 1 | 1 | 0 |
| 12 | filler | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 13 | probe-before | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 14 | evidence | 5 | 0 | 0 | 0 | 0 | 1 | 1 | 4 |
| 15 | filler | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 16 | probe-after | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## 2. Sample annotated lines (first 3 per task per system)

### BM25

- **ER**: _no lines tagged_
- **Agg** (3 shown):
    - [s3] `User: Our team's on-call rotation is paired oncall, meaning there's a primary and a secondary person on duty. It helps to have a backup, right? `
    - [s3] `Assistant: Having a paired on-call setup is definitely a smart move, as it provides support for the primary responder and can lead to quicker resolution times. `
    - [s6] `User: Our production alerts go to #aurora-pager. It’s pretty straightforward, but I’m curious—how do you usually handle alert noise in your setup? Any strategie`
- **Tr** (3 shown):
    - [s3] `User: The team's package manager is Karnex Pack. It’s been pretty efficient for managing our dependencies.`
    - [s3] `Have you worked with Karnex Pack before? What are some best practices for managing packages with it?`
    - [s3] `Assistant: I haven't worked directly with Karnex Pack, but when managing packages in any package manager, it's generally important to keep your dependencies up `
- **Del** (2 shown):
    - [s6] `User: Logs drain to stream.velturis.io/aurora. It's essential for keeping track of everything going on in production. Do you have any recommendations for struct`
    - [s14] `User: The log drain endpoint is stream.velturis.io/aurora. Please delete that from your memory. Any tips or things to watch out for?`
- **Cas** (3 shown):
    - [s9] `User: The team lead is Seokjin Kang. He's been guiding us through the transition and ensuring everyone is on the same page. How do you usually keep communicatio`
    - [s11] `User: The weekly report recipient is Hyunwoo Nam — Seokjin Kang assigned it; if the team lead changes, this assignment would change. Any tips or things to watch`
    - [s11] `User: If the team lead changes, the weekly report recipient will be James Lee. Any tips or things to watch out for?`
- **Abs** (3 shown):
    - [s9] `User: The team lead is Seokjin Kang. He's been guiding us through the transition and ensuring everyone is on the same page. How do you usually keep communicatio`
    - [s11] `User: Code reviews go to Seoyun Choi — Seokjin Kang assigned it; if the team lead changes, this assignment would change. Any tips or things to watch out for?`
    - [s14] `User: Jihoon Ryu is our new team lead. Any tips or things to watch out for?`

### text-emb-3-small

- **ER**: _no lines tagged_
- **Agg** (3 shown):
    - [s3] `User: Our team's on-call rotation is paired oncall, meaning there's a primary and a secondary person on duty. It helps to have a backup, right? `
    - [s3] `Assistant: Having a paired on-call setup is definitely a smart move, as it provides support for the primary responder and can lead to quicker resolution times. `
    - [s6] `User: Our production alerts go to #aurora-pager. It’s pretty straightforward, but I’m curious—how do you usually handle alert noise in your setup? Any strategie`
- **Tr** (3 shown):
    - [s3] `User: The team's package manager is Karnex Pack. It’s been pretty efficient for managing our dependencies.`
    - [s3] `Have you worked with Karnex Pack before? What are some best practices for managing packages with it?`
    - [s3] `Assistant: I haven't worked directly with Karnex Pack, but when managing packages in any package manager, it's generally important to keep your dependencies up `
- **Del** (2 shown):
    - [s6] `User: Logs drain to stream.velturis.io/aurora. It's essential for keeping track of everything going on in production. Do you have any recommendations for struct`
    - [s14] `User: The log drain endpoint is stream.velturis.io/aurora. Please delete that from your memory. Any tips or things to watch out for?`
- **Cas** (3 shown):
    - [s9] `User: The team lead is Seokjin Kang. He's been guiding us through the transition and ensuring everyone is on the same page. How do you usually keep communicatio`
    - [s11] `User: The weekly report recipient is Hyunwoo Nam — Seokjin Kang assigned it; if the team lead changes, this assignment would change. Any tips or things to watch`
    - [s11] `User: If the team lead changes, the weekly report recipient will be James Lee. Any tips or things to watch out for?`
- **Abs** (3 shown):
    - [s9] `User: The team lead is Seokjin Kang. He's been guiding us through the transition and ensuring everyone is on the same page. How do you usually keep communicatio`
    - [s11] `User: Code reviews go to Seoyun Choi — Seokjin Kang assigned it; if the team lead changes, this assignment would change. Any tips or things to watch out for?`
    - [s14] `User: Jihoon Ryu is our new team lead. Any tips or things to watch out for?`

### Graphiti

- **ER**: _no lines tagged_
- **Agg** (2 shown):
    - [s6] `User's production alerts are sent to #aurora-pager channel to monitor production events.`
    - [s9] `User references the incident runbook located at wiki.aurora.dev/incident-response as a useful resource for handling issues.`
- **Tr** (2 shown):
    - [s6] `User manages project dependencies using Dranith Stack package manager.`
    - [s9] `User reports that the team's package manager has switched to Synthari Modules during the project transition.`
- **Del** (1 shown):
    - [s6] `User's production logs drain to stream.velturis.io/aurora for monitoring and tracking.`
- **Cas** (3 shown):
    - [s9] `User maintains communication with Seokjin Kang during the package manager transition to keep aligned.`
    - [s9] `Seokjin Kang is the team lead guiding the User and team members through the transition to Synthari Modules.`
    - [s11] `If the team lead changes, the weekly report recipient will be James Lee instead of Hyunwoo Nam.`
- **Abs** (3 shown):
    - [s9] `User maintains communication with Seokjin Kang during the package manager transition to keep aligned.`
    - [s9] `Seokjin Kang is the team lead guiding the User and team members through the transition to Synthari Modules.`
    - [s11] `Seokjin Kang assigns code reviews to Seoyun Choi, and this assignment changes if the team lead changes.`

### Karpathy Wiki

- **ER** (1 shown):
    - [s11] `- User shared a detailed database connection error log: "ConnectionRefusedError: [Errno 111] Connection refused. Service crysthene-db-primary on port 5432 is no`
- **Agg**: _no lines tagged_
- **Tr** (3 shown):
    - [s3] `- Karnex Pack used for dependency management; recommended keeping dependencies updated, cleaning unused packages, and documenting configurations. `
    - [s6] `Discussing best practices for managing production alerts, package management with Dranith Stack, log structuring, and code review policies.`
    - [s6] `- Best practices for Dranith Stack involve semantic versioning, regular dependency updates with thorough testing, and locking dependencies to specific versions `
- **Del** (1 shown):
    - [s14] `- User requested deletion of the log drain endpoint (stream.velturis.io/aurora) from memory; assistant confirmed compliance and advised securing access.`
- **Cas** (3 shown):
    - [s9] `- User introduced the team lead, Seokjin Kang, and asked for tips on maintaining communication during transitions.`
    - [s9] `- Maintain regular communication with Seokjin Kang to support the transition.`
    - [s11] `- Weekly report recipient is Hyunwoo Nam, assigned by Seokjin Kang; changes to James Lee if the team lead changes. `
- **Abs** (3 shown):
    - [s9] `- User introduced the team lead, Seokjin Kang, and asked for tips on maintaining communication during transitions.`
    - [s9] `- Maintain regular communication with Seokjin Kang to support the transition.`
    - [s11] `- Code reviews are assigned to Seoyun Choi by Seokjin Kang; this assignment changes if the team lead changes. `

### MD-flat

- **ER** (1 shown):
    - [s11] `[2023/03/13] Error log to remember: "ConnectionRefusedError: [Errno 111] Connection refused. Service crysthene-db-primary on port 5432 is not accepting connecti`
- **Agg** (3 shown):
    - [s3] `[2023/03/05] Team uses a paired on-call rotation with primary and secondary roles for support and backup.`
    - [s6] `[2023/03/07] Production alerts go to #aurora-pager; team interested in strategies to filter alert noise.`
    - [s9] `[2023/03/10] Incident runbook is at wiki.aurora.dev/incident-response, a resource for handling issues.`
- **Tr** (3 shown):
    - [s3] `[2023/03/05] Team's package manager is Karnex Pack, used for managing dependencies efficiently.`
    - [s6] `[2023/03/07] Team uses Dranith Stack as package manager; seeking tips on versioning and dependency resolution.`
    - [s9] `[2023/03/10] The team's package manager is Synthari Modules, recently switched to it for dependency management.`
- **Del** (1 shown):
    - [s6] `[2023/03/07] Logs drain to stream.velturis.io/aurora; user interested in log data structuring for easier analysis.`
- **Cas** (3 shown):
    - [s9] `[2023/03/10] Team lead is Seokjin Kang, guiding the team through the transition to Synthari Modules.`
    - [s11] `[2023/03/13] Weekly report recipient is Hyunwoo Nam, assigned by Seokjin Kang; changes to James Lee if team lead changes.`
    - [s14] `[2023/03/17] Jihoon Ryu is the new team lead.`
- **Abs** (3 shown):
    - [s9] `[2023/03/10] Team lead is Seokjin Kang, guiding the team through the transition to Synthari Modules.`
    - [s11] `[2023/03/13] Code reviews go to Seoyun Choi, assigned by Seokjin Kang; assignment changes if team lead changes.`
    - [s14] `[2023/03/17] Jihoon Ryu is the new team lead.`

### Mem0

- **ER** (1 shown):
    - [s11] `[e880e0a9] User shared an exact error log stating: 'ConnectionRefusedError: [Errno 111] Connection refused. Service crysthene-db-primary on port 5432 is not acc`
- **Agg** (3 shown):
    - [s3] `[d1ecd357] User's team uses a paired on-call rotation with a primary and secondary person on duty to provide backup support and improve incident resolution`
    - [s6] `[32263316] User's production alerts are sent to the #aurora-pager channel, and User is interested in strategies to reduce alert noise by filtering less critical`
    - [s9] `[7ea96943] User's team uses an incident runbook located at wiki.aurora.dev/incident-response as a resource for handling issues and values a well-organized layou`
- **Tr** (3 shown):
    - [s3] `[2359a73e] User's team uses Karnex Pack as their package manager, which they find efficient for managing dependencies`
    - [s3] `[2e19f70c] User inquires about best practices for managing packages with Karnex Pack and how to track updates or changes to dependencies`
    - [s6] `[a33a87bd] User was advised to optimize Dranith Stack usage by establishing a clear versioning strategy like semantic versioning, regularly updating dependencie`
- **Del** (2 shown):
    - [s6] `[d03f9198] User's production logs are sent to stream.velturis.io/aurora and User is interested in recommendations for structuring log data to facilitate easier `
    - [s14] `[719ca504] User requested deletion of the log drain endpoint stream.velturis.io/aurora from memory as of April 21, 2026 and asked for tips on managing such endp`
- **Cas** (3 shown):
    - [s9] `[91b2741c] User's team lead is Seokjin Kang, who is guiding the team through the transition to Synthari Modules and ensuring clear communication`
    - [s11] `[b8adeee7] User's weekly report recipient is Hyunwoo Nam as assigned by team lead Seokjin Kang, with the recipient changing to James Lee if the team lead change`
    - [s14] `[187c4f82] User's new team lead is Jihoon Ryu as of April 21, 2026, and User is seeking tips or things to watch out for with this leadership change`
- **Abs** (3 shown):
    - [s9] `[91b2741c] User's team lead is Seokjin Kang, who is guiding the team through the transition to Synthari Modules and ensuring clear communication`
    - [s11] `[de59d181] User's code reviews are assigned to Seoyun Choi by team lead Seokjin Kang, and this assignment will change if the team lead changes`
    - [s14] `[187c4f82] User's new team lead is Jihoon Ryu as of April 21, 2026, and User is seeking tips or things to watch out for with this leadership change`

### MD-flat × Opus 4.7

- **ER**: _no lines tagged_
- **Agg** (3 shown):
    - [s3] `[2023/03/05] Team uses paired on-call rotation (primary + secondary)`
    - [s6] `[2023/03/07] Production alerts channel: #aurora-pager`
    - [s9] `[2023/03/10] Incident runbook location: wiki.aurora.dev/incident-response`
- **Tr** (3 shown):
    - [s3] `[2023/03/05] Team's package manager: Karnex Pack`
    - [s6] `[2023/03/07] Team's package manager: Dranith Stack (updated from Karnex Pack)`
    - [s9] `[2023/03/10] Team's package manager: Synthari Modules (updated from Dranith Stack)`
- **Del** (1 shown):
    - [s6] `[2023/03/07] Logs drain to: stream.velturis.io/aurora`
- **Cas** (3 shown):
    - [s9] `[2023/03/10] Team lead: Seokjin Kang`
    - [s11] `[2023/03/13] Weekly report recipient: Hyunwoo Nam (assigned by Seokjin Kang; tied to team lead); if team lead changes, recipient becomes James Lee`
    - [s14] `[2023/03/17] Team lead: Jihoon Ryu (updated from Seokjin Kang)`
- **Abs** (3 shown):
    - [s9] `[2023/03/10] Team lead: Seokjin Kang`
    - [s11] `[2023/03/13] Code reviews go to Seoyun Choi (assigned by Seokjin Kang; tied to team lead)`
    - [s14] `[2023/03/17] Team lead: Jihoon Ryu (updated from Seokjin Kang)`

## 3. Pipeline-stage outcomes per system × question

### before-questions

| system | task | encoded | maintained | retrieved | answered | failure_stage |
| --- | --- | --- | --- | --- | --- | --- |
| BM25 | Cas | ✓ | ✓ | ✓ | ✓ | _passed_ |
| BM25 | Abs | ✓ | ✓ | ✓ | ✓ | _passed_ |
| BM25 | Del | ✓ | ✓ | ✓ | ✓ | _passed_ |
| BM25 | ER | ✓ | ✓ | ✓ | ✗ | answering |
| text-emb-3-small | Cas | ✓ | ✓ | ✓ | ✓ | _passed_ |
| text-emb-3-small | Abs | ✓ | ✓ | ✓ | ✓ | _passed_ |
| text-emb-3-small | Del | ✓ | ✓ | ✓ | ✓ | _passed_ |
| text-emb-3-small | ER | ✓ | ✓ | ✓ | ✗ | answering |
| Graphiti | Cas | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Graphiti | Abs | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Graphiti | Del | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Graphiti | ER | ✗ | ✗ | ✗ | ✗ | encoding |
| Karpathy Wiki | Cas | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Karpathy Wiki | Abs | ✓ | ✓ | ✗ | ✗ | retrieval |
| Karpathy Wiki | Del | ✓ | ✓ | ✗ | ✗ | retrieval |
| Karpathy Wiki | ER | ✓ | ✓ | ✗ | ✗ | retrieval |
| MD-flat | Cas | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat | Abs | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat | Del | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat | ER | ✓ | ✓ | ✓ | ✗ | answering |
| Mem0 | Cas | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Mem0 | Abs | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Mem0 | Del | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Mem0 | ER | ✓ | ✓ | ✓ | ✗ | answering |
| MD-flat × Opus 4.7 | Cas | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat × Opus 4.7 | Abs | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat × Opus 4.7 | Del | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat × Opus 4.7 | ER | ✗ | ✗ | ✗ | ✗ | encoding |

### after-questions

| system | task | encoded | maintained | retrieved | answered | failure_stage |
| --- | --- | --- | --- | --- | --- | --- |
| BM25 | Tr | ✓ | ✓ | ✗ | ✗ | retrieval |
| BM25 | Cas | ✓ | ✓ | ✗ | ✗ | retrieval |
| BM25 | Abs | ✓ | ✓ | ✗ | ✗ | retrieval |
| BM25 | Del | ✓ | ✓ | ✓ | ✓ | _passed_ |
| BM25 | Agg | ✓ | ✓ | ✗ | ✗ | retrieval |
| BM25 | ER | ✓ | ✓ | ✓ | ✓ | _passed_ |
| text-emb-3-small | Tr | ✓ | ✓ | ✓ | ✓ | _passed_ |
| text-emb-3-small | Cas | ✓ | ✓ | ✓ | ✗ | answering |
| text-emb-3-small | Abs | ✓ | ✓ | ✓ | ✗ | answering |
| text-emb-3-small | Del | ✓ | ✓ | ✓ | ✓ | _passed_ |
| text-emb-3-small | Agg | ✓ | ✓ | ✗ | ✗ | retrieval |
| text-emb-3-small | ER | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Graphiti | Tr | ✗ | ✗ | ✗ | ✗ | encoding |
| Graphiti | Cas | ✓ | ✓ | ✗ | ✗ | retrieval |
| Graphiti | Abs | ✓ | ✓ | ✗ | ✗ | retrieval |
| Graphiti | Del | ✗ | ✗ | ✗ | ✗ | encoding |
| Graphiti | Agg | ✓ | ✓ | ✓ | ✗ | answering |
| Graphiti | ER | ✗ | ✗ | ✗ | ✗ | encoding |
| Karpathy Wiki | Tr | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Karpathy Wiki | Cas | ✓ | ✓ | ✗ | ✗ | retrieval |
| Karpathy Wiki | Abs | ✓ | ✓ | ✗ | ✗ | retrieval |
| Karpathy Wiki | Del | ✗ | ✗ | ✗ | ✗ | encoding |
| Karpathy Wiki | Agg | ✓ | ✗ | ✗ | ✗ | maintenance |
| Karpathy Wiki | ER | ✓ | ✓ | ✗ | ✗ | retrieval |
| MD-flat | Tr | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat | Cas | ✓ | ✓ | ✗ | ✗ | retrieval |
| MD-flat | Abs | ✓ | ✓ | ✗ | ✗ | retrieval |
| MD-flat | Del | ✗ | ✗ | ✗ | ✗ | encoding |
| MD-flat | Agg | ✓ | ✓ | ✗ | ✗ | retrieval |
| MD-flat | ER | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Mem0 | Tr | ✓ | ✓ | ✓ | ✓ | _passed_ |
| Mem0 | Cas | ✓ | ✓ | ✓ | ✗ | answering |
| Mem0 | Abs | ✓ | ✓ | ✗ | ✗ | retrieval |
| Mem0 | Del | ✗ | ✗ | ✗ | ✗ | encoding |
| Mem0 | Agg | ✓ | ✓ | ✓ | ✗ | answering |
| Mem0 | ER | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat × Opus 4.7 | Tr | ✓ | ✗ | ✗ | ✗ | maintenance |
| MD-flat × Opus 4.7 | Cas | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat × Opus 4.7 | Abs | ✓ | ✓ | ✓ | ✗ | answering |
| MD-flat × Opus 4.7 | Del | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat × Opus 4.7 | Agg | ✓ | ✓ | ✓ | ✓ | _passed_ |
| MD-flat × Opus 4.7 | ER | ✗ | ✗ | ✗ | ✗ | encoding |

## 4. Sanity-check flags

- _no flags raised._

Total flags: **0**