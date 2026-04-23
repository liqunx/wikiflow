# WikiFlow

**中文** | [English](README.en.md)

文档驱动的 AI 工作流协议。

## 解决什么问题

敏捷开发中，需求是"生长式"的：一个简易需求，开发，测试中发现新分支，最终功能变成小型系统。这个过程中，文档经常丢失，代码和文档脱节。

**WikiFlow 通过文档驱动 AI 开发，让人只管文档，AI 管代码。**

## 核心理念

1. **文档先行**：开发前必须查阅 Wiki、制定计划
2. **文档即代码**：文档和代码同步更新，不是事后补写
3. **Wiki 是当前真相**：`current/` 始终反映最新实现
4. **决策可追溯**：每个"为什么"都有记录
5. **人管文档，AI 管代码**：文档是白盒，代码可以是黑盒

## 快速开始

```
帮我安装wikiflow，安装指南：https://liqunx.github.io/wikiflow/install.md
```

复制以上命令，粘贴到 AI 对话框中发送即可。一键安装包含所有核心技能。

### 核心 vs 扩展

WikiFlow 技能分为两类：

- **核心技能**（一键安装）：wf-init、wf-search、wf-plan、wf-do、wf-fix、wf-finish
- **扩展技能**（按需单独安装）：一次性工具、迁移工具等

| 扩展技能 | 用途 | 安装命令 |
|----------|------|----------|
| wf-migrate-openspec | 从 OpenSpec 迁移到 WikiFlow | `帮我安装 wikiflow 扩展技能 wf-migrate-openspec，源文件：https://github.com/liqunx/wikiflow/tree/main/skills/wf-migrate-openspec` |
| wf-lint | 检查 Wiki 文档质量（错误、矛盾、孤岛等） | `帮我安装 wikiflow 扩展技能 wf-lint，源文件：https://github.com/liqunx/wikiflow/tree/main/skills/wf-lint` |

## 工作流

```
/wf-plan     →  制定计划（自动搜索 Wiki，生成 spec.md + tasks.md）
     ↓
/wf-do       →  AI 执行开发
     ↓
/wf-fix      →  修正改进（bug 或需求改进，自动更新文档）
     ↓
/wf-finish   →  编译 Wiki（自动处理历史版本、废弃功能、lint）
```

> **提示**：`/wf-search` 可在工作流任意阶段使用，用于主动查阅 Wiki。`/wf-plan` 会自动调用搜索，但如果你已执行过 `/wf-search`，`/wf-plan` 会复用已有上下文，不重复搜索。

### 强约束

- `/wf-plan` 不可跳过（`/wf-do` 会自动检查）
- `/wf-plan` 必须指定相关 Wiki（否则强制先 `/wf-search`）
- 小 bug 修复也必须走 `/wf-plan`（流程简化，但不省略）

### 快速流程（小改动）

```bash
/wf-plan "修复登录按钮样式"          # 自动匹配 Wiki → 简化询问
/wf-do                               # 执行修复
/wf-finish                           # 编译 Wiki
```

### 完整流程（新功能）

```bash
/wf-search "登录功能"                # 了解当前实现
/wf-plan "添加注册功能"              # 详细询问 → 生成计划
/wf-do                               # 执行开发
/wf-fix "注册后应该自动登录"          # 发现改进 → 更新文档
/wf-do                               # 继续开发
/wf-finish                           # 编译 Wiki
```

## 项目结构

```
wikiflow/
├── README.md                          ← 本文件
├── install.md                         ← AI 安装指南
└── skills/
    ├── wf-init/                       ← 核心
    │   ├── skill.md
    │   └── references/config.schema.json
    ├── wf-search/                     ← 核心
    │   └── skill.md
    ├── wf-plan/                       ← 核心
    │   ├── skill.md
    │   └── references/{spec.md, tasks.md}
    ├── wf-do/                         ← 核心
    │   └── skill.md
    ├── wf-fix/                        ← 核心
    │   ├── skill.md
    │   └── references/decisions.md
    ├── wf-finish/                     ← 核心
    │   ├── skill.md
    │   └── references/{docs.schema.json, current-wiki.md, ...}
    └── wf-migrate-openspec/           ← 扩展（按需安装）
        └── skill.md
```

## 用户项目结构

`/wf-init` 初始化后，用户项目会生成以下结构：

```
your-project/
├── .wikiflow/
│   └── config.json               ← WikiFlow 配置
├── docs/
│   ├── wiki/                     ← 知识库（AI 维护）
│   │   ├── current/              ← ⭐ 当前实现
│   │   ├── history/              ← 历史版本
│   │   ├── deprecated/           ← 已废弃功能
│   │   ├── decisions/            ← 决策日志
│   │   ├── index.md              ← 主索引
│   │   └── log.md                ← 变更日志
│   ├── raw/                      ← 原始文档（存量系统）
│   └── changes/                  ← 工作目录
│       └── active/               ← 开发中的变更（编译后自动清理）
└── src/                          ← 用户代码（AI 根据 config 定位）
```

## License

MIT
