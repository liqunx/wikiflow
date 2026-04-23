---
name: wf-fix
description: 修正开发过程中的问题和需求改进。AI 自动判断是 bug 还是需求改进，更新 spec.md 和 tasks.md，生成 decisions.md。仅在 /wf-do 之后使用。
metadata:
  version: 1.0.0
---

# /wf-fix - 修正改进

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
```

### 1. AI 自动判断类型

AI 分析用户描述，自动判断是 Bug 还是需求改进：

**判断标准**：

| 类型 | 判断依据 | 处理方式 |
|------|----------|----------|
| **Bug** | 修复错误，不改变 spec.md 的目标 | 只更新 tasks.md |
| **需求改进** | 影响 spec.md 的目标，需要修改设计 | 更新 spec.md + tasks.md + 生成 decisions.md |

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
  1. 修复 bug（修改代码）
  2. 更新 tasks.md：
     → 在 [Bug 修复] 分组下添加新任务
     → 标记为已完成
  3. 输出：
     ✅ Bug 已修复
     更新文件：tasks.md
```

### 3. 需求改进处理

```
IF type === "requirement":
  1. 更新 spec.md：
     → 在"方案"部分添加新的改进
     → 在"废弃功能"部分添加被废弃的内容（如果有）
     → 更新"影响范围"

  2. 更新 tasks.md：
     → 在相应分组下添加新任务
     → 或修改现有任务的描述

  3. 生成 decisions.md：
     → 按照模板生成决策记录
     → 追加到现有 decisions.md（如果已存在）
     → 或创建新的 decisions.md

  4. 执行代码修改

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

- 遵循 WikiFlow 全局约束（见 install.md）
- AI 自动判断类型，不询问用户
- Bug 只更新 tasks.md，不生成 decisions.md
- 需求改进必须更新 spec.md + tasks.md + decisions.md
- decisions.md 是追加模式，不覆盖之前的决策
- 可以连续执行多次 /wf-fix，每次都会追加决策记录
