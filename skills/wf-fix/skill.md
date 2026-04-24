---
name: wf-fix
description: 修正开发过程中的问题和需求改进。AI 自动判断是 bug 还是需求改进，更新 spec.md 和 tasks.md，生成 decisions.md。仅在 /wf-do 之后使用。
metadata:
  version: 1.0.0
  execution_location: documentation_repository
---

# /wf-fix - 修正改进

**⚠️ 重要约束：本技能在文档仓库执行，如需修改代码则通过 paths.code 操作代码仓库**

在开发过程中修正 bug 或处理需求改进，确保文档和代码保持同步。

## 使用方式

```bash
# 描述修正内容
/wf-fix "注册后应该自动登录，不需要再跳转到登录页"

# Bug 修复
/wf-fix "注册页面提交按钮点击无响应"

# 带更多上下文
/wf-fix "用户反馈注册后跳转到登录页体验差，改为注册后直接进入首页"
```

## 执行流程

### 0. 前置检查

```
读取 .wikiflow/config.json，获取路径和语言配置。

检查是否有 active 变更：
  → 扫描 {paths.changes}/active/
  → 没有则提示"请先执行 /wf-plan 和 /wf-do"

**检查当前仓库类型**：

检查当前目录特征：
  IF 存在 .wikiflow/config.json AND docs/wiki/ 目录:
    → 当前是文档仓库
    → ✅ 继续执行

  ELSE:
    → ⚠️ 警告：当前目录不是文档仓库
    → 提示用户："wf-fix 需要在文档仓库执行（修改 spec.md、tasks.md）
       当前目录：{当前目录}
       文档仓库特征：存在 .wikiflow/config.json 和 docs/wiki/
       请切换到文档仓库后重试"
    → 退出执行

**操作约束检查**（AI 执行时必须遵守）：

✅ 允许的操作：
  → 读取/修改文档仓库：spec.md、tasks.md、decisions.md、wiki/
  → 修改代码仓库：通过 paths.code 路径操作代码文件（../wikiflow/src/*）

❌ 禁止的操作：
  → 在文档仓库修改代码文件（文档仓库不应该有代码文件）
  → 在代码仓库修改文档文件（spec.md、tasks.md 必须在文档仓库）
```

### 1. AI 自动判断类型

AI 分析用户描述，自动判断是 Bug 还是需求改进：

**判断标准**：

| 类型 | 判断依据 | 处理方式 |
|------|----------|----------|
| **Bug** | 修复错误，不改变 spec.md 的目标 | 只更新 tasks.md，修改代码 |
| **需求改进** | 影响 spec.md 的目标，需要修改设计 | 更新 spec.md + tasks.md + 生成 decisions.md + 修改代码 |

**AI 分析过程**：

```
分析输入："{用户描述}"

对比当前 spec.md：
  → 是否改变目标？ → 是 → 需求改进
  → 是否只是修复？ → 是 → Bug

判断结果：{type}
理由：{reason}
```

### 2. Bug 处理

```
IF type === "bug":
  1. 通过 paths.code 定位代码仓库，修复 bug（修改代码）
  2. 更新文档仓库中的 tasks.md：
     → 在 [Bug 修复] 分组下添加新任务
     → 标记为已完成
  3. 输出：
     ✅ Bug 已修复
     更新文件：tasks.md
```

### 3. 需求改进处理

```
IF type === "requirement":
  1. 更新文档仓库中的 spec.md：
     → 在"方案"部分添加新的改进
     → 在"废弃功能"部分添加被废弃的内容（如果有）
     → 更新"影响范围"

  2. 更新文档仓库中的 tasks.md：
     → 在相应分组下添加新任务
     → 或修改现有任务的描述

  3. 在文档仓库中生成 decisions.md：
     → 按照模板生成决策记录
     → 追加到现有 decisions.md（如果已存在）
     → 或创建新的 decisions.md

  4. 通过 paths.code 定位代码仓库，执行代码修改

  5. 输出：
     ✅ 需求改进已处理
     更新文件：
       → spec.md（更新目标）
       → tasks.md（添加任务）
       → decisions.md（新增决策）
```

### 4. 输出结果

```
✅ 修正完成

类型：需求改进
决策：注册后自动登录，不再跳转到登录页

更新文件：
  → spec.md：添加"注册后自动登录"
  → tasks.md：添加"实现注册后自动跳转"
  → decisions.md：新增 [2026-04-24 15:30] 注册后自动登录

下一步：
  → /wf-do 继续执行剩余任务
  → 或 /wf-finish 如果所有任务已完成
```

## decisions.md 格式

每次需求改进都追加一条决策记录：

```markdown
## [{YYYY-MM-DD HH:MM}] {简短标题}

### 问题
{为什么要改}

### 决策
{改了什么}

### 废弃
- ❌ {被废弃的功能}（如果有）

### 新增
- ✅ {新增的功能}

### 影响文档
- spec.md：{更新了什么}
- tasks.md：{添加了什么}

### 影响代码
- {文件路径}
```

## 注意事项

**执行位置**：
- ✅ 必须在文档仓库执行（修改 spec.md、tasks.md）
- ✅ AI 通过 paths.code 路径操作代码仓库文件（如 ../wikiflow/src/*）
- ✅ 不要求用户切换仓库（保持文档上下文）

**操作边界**：
- ✅ 文档仓库：读取/修改 spec.md、tasks.md、decisions.md
- ✅ 代码仓库：修改源代码（通过 paths.code 路径）
- ❌ 禁止在文档仓库修改代码文件
- ❌ 禁止在代码仓库修改文档文件

**执行规范**：
- 遵循 WikiFlow 全局约束（见 install.md）
- AI 自动判断类型，不询问用户
- Bug 只更新 tasks.md，不生成 decisions.md
- 需求改进必须更新 spec.md + tasks.md + decisions.md
- decisions.md 是追加模式，不覆盖之前的决策
- 可以连续执行多次 /wf-fix，每次都会追加决策记录
