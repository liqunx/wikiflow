# WikiFlow

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

复制以上命令，粘贴到 AI 对话框中发送即可。

## 工作流

```
/wf-init     →  初始化项目（对话配置，创建目录结构）
     ↓
/wf-search   →  查询 Wiki，了解背景
     ↓
/wf-plan     →  制定计划（自动匹配 Wiki，生成 spec.md + tasks.md）
     ↓
/wf-do       →  AI 执行开发
     ↓
/wf-fix      →  修正改进（bug 或需求改进，自动更新文档）
     ↓
/wf-finish   →  编译 Wiki（自动处理历史版本、废弃功能、lint）
```

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
└── skills/
    ├── wf-init/
    │   ├── skill.md                   ← 初始化
    │   └── references/
    │       └── config.schema.json     ← 配置校验（含默认值）
    ├── wf-search/
    │   └── skill.md                   ← 查询 Wiki
    ├── wf-plan/
    │   ├── skill.md                   ← 制定计划
    │   └── references/
    │       ├── spec.md                ← spec 模板
    │       └── tasks.md               ← tasks 模板
    ├── wf-do/
    │   └── skill.md                   ← 执行开发
    ├── wf-fix/
    │   ├── skill.md                   ← 修正改进
    │   └── references/
    │       └── decisions.md           ← 决策记录模板
    └── wf-finish/
        ├── skill.md                   ← 编译 Wiki
        └── references/
            ├── docs.schema.json       ← 文档 frontmatter 校验
            ├── current-wiki.md        ← current 页面模板
            ├── decision-wiki.md       ← decision 页面模板
            ├── deprecated-wiki.md     ← deprecated 页面模板
            └── history-wiki.md        ← history 页面模板
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
│       ├── active/               ← 开发中的变更
│       └── archive/              ← 已归档的变更
└── src/                          ← 用户代码（AI 根据 config 定位）
```

## License

MIT
