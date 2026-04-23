# WikiFlow

**English** | [中文](README.md)

A document-driven AI workflow protocol.

## What Problem Does It Solve?

In agile development, requirements "grow" — a simple feature becomes a mini-system through iterations, testing, and new branches. Along the way, documentation gets lost and falls out of sync with code.

**WikiFlow drives AI development through documentation. You manage docs, AI manages code.**

## Core Principles

1. **Documentation First**: Read Wiki and create plans before coding
2. **Docs as Code**: Documentation and code update in sync, not retroactively
3. **Wiki is Truth**: `current/` always reflects the latest implementation
4. **Traceable Decisions**: Every "why" is recorded
5. **You manage docs, AI manages code**: Docs are white-box, code can be black-box

## Quick Start

```
Install wikiflow, guide: https://liqunx.github.io/wikiflow/install.md
```

Copy the command above and paste it into your AI chat. One-click install includes all core skills.

### Core vs Extensions

WikiFlow skills come in two categories:

- **Core skills** (one-click install): wf-init, wf-search, wf-plan, wf-do, wf-fix, wf-finish
- **Extension skills** (install individually): one-time tools, migration tools, etc.

| Extension | Purpose | Install Command |
|-----------|---------|-----------------|
| wf-migrate-openspec | Migrate from OpenSpec to WikiFlow | `Install wikiflow extension wf-migrate-openspec, source: https://github.com/liqunx/wikiflow/tree/main/skills/wf-migrate-openspec` |
| wf-lint | Check Wiki document quality (errors, contradictions, orphan pages, etc.) | `Install wikiflow extension wf-lint, source: https://github.com/liqunx/wikiflow/tree/main/skills/wf-lint` |
| wf-update | Update installed WikiFlow skills to latest version | `Install wikiflow extension wf-update, source: https://github.com/liqunx/wikiflow/tree/main/skills/wf-update` |

## Workflow

```
/wf-plan     →  Create plan (auto-search Wiki, generate spec.md + tasks.md)
     ↓
/wf-do       →  AI executes development
     ↓
/wf-fix      →  Fix & improve (bug or requirement, auto-update docs)
     ↓
/wf-finish   →  Compile Wiki (auto-handle history, deprecation, lint)
```

> **Tip**: `/wf-search` can be used at any stage to browse the Wiki. `/wf-plan` calls search automatically, but if you've already run `/wf-search`, `/wf-plan` will reuse the existing context.

### Strict Rules

- `/wf-plan` cannot be skipped (`/wf-do` checks automatically)
- `/wf-plan` must reference a related Wiki (otherwise `/wf-search` is enforced)
- Even small bug fixes require `/wf-plan` (simplified flow, but not omitted)

### Quick Flow (Small Changes)

```bash
/wf-plan "Fix login button style"     # Auto-match Wiki → simplified inquiry
/wf-do                                # Execute fix
/wf-finish                            # Compile Wiki
```

### Full Flow (New Feature)

```bash
/wf-search "Login feature"            # Understand current implementation
/wf-plan "Add registration"           # Detailed inquiry → generate plan
/wf-do                                # Execute development
/wf-fix "Should auto-login after registration"  # Improvement → update docs
/wf-do                                # Continue development
/wf-finish                            # Compile Wiki
```

## Project Structure

```
wikiflow/
├── README.md                          ← This file
├── install.md                         ← AI install guide
└── skills/
    ├── wf-init/                       ← Core
    │   ├── skill.md
    │   └── references/config.schema.json
    ├── wf-search/                     ← Core
    │   └── skill.md
    ├── wf-plan/                       ← Core
    │   ├── skill.md
    │   └── references/{spec.md, tasks.md}
    ├── wf-do/                         ← Core
    │   └── skill.md
    ├── wf-fix/                        ← Core
    │   ├── skill.md
    │   └── references/decisions.md
    ├── wf-finish/                     ← Core
    │   ├── skill.md
    │   └── references/{docs.schema.json, current-wiki.md, ...}
    └── wf-migrate-openspec/           ← Extension (install on demand)
        └── skill.md
```

## User Project Structure

After `/wf-init`, the user's project will have:

```
your-project/
├── .wikiflow/
│   └── config.json               ← WikiFlow config
├── docs/
│   ├── wiki/                     ← Knowledge base (AI maintained)
│   │   ├── current/              ← ⭐ Current implementation
│   │   ├── history/              ← Historical versions
│   │   ├── deprecated/           ← Deprecated features
│   │   ├── decisions/            ← Decision logs
│   │   ├── index.md              ← Main index
│   │   └── log.md                ← Changelog
│   ├── raw/                      ← Raw documents (legacy)
│   └── changes/                  ← Working directory
│       └── active/               ← Active changes (auto-cleaned after compile)
└── src/                          ← User code (AI locates via config)
```

## License

MIT
