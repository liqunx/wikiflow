# WikiFlow 安装指南

本指南面向 AI 编码助手。用户发送"安装 WikiFlow"后，AI 读取本文件，完成技能安装。

## 技能清单

默认安装**核心技能**（6 个）。扩展技能按需单独安装，不包含在一键安装中。

### 核心技能

| 技能 | 用途 | 配套资源 |
|-------|------|----------|
| wf-init | 初始化项目 | references/config.schema.json |
| wf-search | 查询 Wiki | — |
| wf-plan | 制定计划 | references/spec.md, tasks.md |
| wf-do | 执行开发 | — |
| wf-fix | 修正改进 | references/decisions.md |
| wf-finish | 编译 Wiki | references/docs.schema.json, current-wiki.md, decision-wiki.md, deprecated-wiki.md, history-wiki.md |

### 扩展技能

| 技能 | 用途 | 说明 |
|-------|------|------|
| wf-migrate-openspec | 从 OpenSpec 迁移到 WikiFlow | 一次性使用，迁移后可卸载 |
| wf-lint | 检查 Wiki 文档质量 | 可重复使用，独立于工作流 |
| wf-update | 更新已安装的技能到最新版本 | 核心技能更新时推荐使用 |

扩展技能安装命令：`帮我安装 wikiflow 扩展技能 {技能名}，源文件：https://github.com/liqunx/wikiflow/tree/main/skills/{技能名}`

## 源文件位置

所有技能文件在 GitHub 仓库的 `skills/` 目录下：

```
https://github.com/liqunx/wikiflow/tree/main/skills/
```

每个技能的目录结构：

```
skills/{wf-xxx}/
├── skill.md           ← 技能定义（源 truth，不可修改）
└── references/        ← 配套资源（模板、schema）
```

## 安装步骤

### 1. 获取技能文件

从 GitHub 仓库获取以下 6 个核心技能目录下的所有文件（跳过 wf-migrate-openspec 等扩展技能）：

wf-init, wf-search, wf-plan, wf-do, wf-fix, wf-finish

每个目录包含 `skill.md` 和 `references/`（如有）。

### 2. 按平台格式安装

将技能安装到用户当前项目中，按平台规范适配格式：

- **Claude Code**：复制到项目的 `.claude/skills/` 目录，每个技能一个子目录，保持 `skill.md` + `references/` 结构不变
- **通义灵码**：按灵码技能格式适配，核心指令内容保持不变
- **Cursor / Windsurf**：按 `.cursor/rules/` 或 `.windsurfrules` 格式适配
- **其他平台**：根据平台技能/规则格式适配，核心指令内容不可修改

### 3. 安装后提示

安装完成后，自动提示用户：

```
✅ WikiFlow 安装完成（6 个核心技能）

是否立即初始化当前项目？（/wf-init）
```

## 全局约束

所有 WikiFlow 技能在执行时必须遵循以下全局约束：

1. **读取配置**：每次执行前读取 `.wikiflow/config.json`，所有路径从配置中获取，不硬编码
2. **环境变量覆盖**：检查系统环境变量和 `.env` 文件（如果存在），用环境变量的值覆盖 config 中的默认值
3. **语言**：所有 AI 生成物（spec.md、tasks.md、decisions.md、wiki 页面）和交互过程使用 config 中 `language` 指定的语言（默认 zh-CN）
4. **代码定位**：通过 config 中 `project.code.root` 或 `project.code.repositories` 定位用户代码目录
5. **无归档**：`/wf-finish` 编译后直接删除 active 变更，不保留 archive
6. **版本检查**：`/wf-update` 执行时读取每个 skill.md 的 frontmatter，提取 `metadata.version` 字段对比版本

### 文档与代码分离约束（重要）

WikiFlow 基于**文档驱动开发**和**文档代码分离**架构，所有技能必须严格遵守仓库职责划分：

**仓库类型识别**：
- **文档仓库**：存在 `.wikiflow/config.json` 和 `docs/wiki/` 目录
- **代码仓库**：存在代码目录（`src/`、`package.json` 等）但不存在 `.wikiflow/`

**职责划分**：

| 操作类型 | 文档仓库 | 代码仓库 |
|---------|---------|---------|
| 文档编辑、Wiki 编译 | ✅ 允许 | ❌ 禁止 |
| spec.md、tasks.md 生成 | ✅ 允许 | ❌ 禁止 |
| 代码修改、测试、构建 | ❌ 禁止 | ✅ 允许 |
| Git 操作（仓库自己的） | ✅ 允许 | ✅ 允许 |

**技能执行位置约束**：
- **wf-plan**：必须在文档仓库执行
- **wf-do**：在文档仓库执行，但只能操作代码仓库的代码文件
- **wf-finish**：必须在文档仓库执行
- **wf-fix**：智能判断（文档修改→文档仓库，代码修改→代码仓库）
- **wf-search**：必须在文档仓库执行
- **wf-lint**：必须在文档仓库执行
- **wf-init**：可在任意仓库执行（初始化时选择）

**跨仓库操作规范**：
- wf-do 在文档仓库执行（读取 spec.md、tasks.md）
- AI 通过 paths.code 配置（如 ../wikiflow）操作代码仓库文件
- 不要求用户切换仓库（避免丢失文档上下文）
- AI 必须遵守操作边界：
  - ✅ 文档仓库：读取/修改 spec.md、tasks.md、wiki/
  - ✅ 代码仓库：修改源代码（通过 paths.code 路径）
  - ❌ 禁止在文档仓库修改代码文件
  - ❌ 禁止在代码仓库修改文档文件

**架构文档**：详见 [docs/wiki/current/architecture.md](https://github.com/liqunx/wikiflow/blob/main/docs/wiki/current/architecture.md)

**环境变量支持**：config 中使用 `${WIKIFLOW_XXX_ROOT:-默认值}` 格式时，skill 会自动用环境变量覆盖默认值。

**版本管理**：
- 每个 skill.md 的 `metadata.version` 字段标记该技能版本
- 核心技能保持统一版本号
- `config.json` 的 `version` 字段标记配置 schema 版本，用于兼容性检查
- Wiki 页面的 `version` 字段为整数，表示该页面的编译次数

## 约束

- skill.md 中的指令内容不可修改，只能适配包装格式
- references/ 中的配套资源必须一并安装
- 安装后用户执行 `/wf-init` 才能开始使用
