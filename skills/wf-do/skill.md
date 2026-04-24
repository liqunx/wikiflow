---
name: wf-do
description: 执行开发计划，按照 tasks.md 逐个完成任务。自动检查 spec.md 是否存在，不存在则先执行 /wf-plan。
metadata:
  version: 1.0.0
  execution_location: documentation_repository
---

# /wf-do - 执行开发

**⚠️ 重要约束：本技能在文档仓库执行，但只能操作代码仓库的代码文件**

按照 spec.md 和 tasks.md 逐个执行开发任务。

## 使用方式

```bash
# 执行当前 active 的计划
/wf-do

# 执行指定的计划
/wf-do docs/changes/active/2026-04-24-add-registration

# 执行并跳过已完成的任务
/wf-do --continue
```

## 执行流程

### 0. 前置检查

```
读取 .wikiflow/config.json：
  → 获取 paths.code（代码仓库路径，如 ../wikiflow）
  → 获取 language、project 等配置

**检查当前仓库类型**：

检查当前目录特征：
  IF 存在 .wikiflow/config.json AND docs/wiki/ 目录:
    → 当前是文档仓库
    → ✅ 继续执行

  ELSE:
    → ⚠️ 警告：当前目录不是文档仓库
    → 提示用户："wf-do 需要在文档仓库执行（读取 spec.md、tasks.md）
       当前目录：{当前目录}
       文档仓库特征：存在 .wikiflow/config.json 和 docs/wiki/
       请切换到文档仓库后重试"
    → 退出执行

**操作约束检查**（AI 执行时必须遵守）：

✅ 允许的操作：
  → 读取文档仓库：spec.md、tasks.md、decisions.md、wiki/
  → 修改文档仓库：tasks.md（标记任务完成）
  → 修改代码仓库：通过 paths.code 路径操作代码文件（../wikiflow/src/*）

❌ 禁止的操作：
  → 在文档仓库修改代码文件（文档仓库不应该有代码文件）
  → 在代码仓库修改文档文件（spec.md、tasks.md 必须在文档仓库）
  → Git 操作代码仓库（由用户在 /wf-finish 时处理）
```

### 1. 读取计划

```
读取文档仓库中的 spec.md：
  → 了解目标、方案、影响范围

读取文档仓库中的 tasks.md：
  → 获取任务清单
  → 统计已完成/未完成任务
```

### 2. 执行任务

```
FOR 每个未完成的任务:
  1. 读取任务描述
  2. 通过 paths.code 定位代码仓库（如 ../wikiflow/）
  3. 查看代码仓库中的相关代码（根据 spec.md 的影响范围）
  4. **只在代码仓库路径下**执行代码修改
  5. 在文档仓库中标记任务为已完成（更新 tasks.md）

  IF 任务执行失败:
    → 提示错误信息
    → 询问是否继续下一个任务
    → 如果不继续，退出

  IF 开发中发现需要修改 specs:
    → 提示用户执行 /wf-fix 更新 specs
    → 或暂停，等待用户确认
```

### 3. 输出进度

```
📊 开发进度

计划：添加注册功能
总任务：8
已完成：3 / 8（37.5%）

✅ [后端] 设计 users 表结构
✅ [后端] 实现注册 API
✅ [前端] 创建注册页面
⬜ [后端] 实现登录 API 更新
⬜ [后端] 编写单元测试
⬜ [前端] 更新登录页面
⬜ [前端] 移除首次改密弹窗
⬜ [前端] 添加表单验证
```

### 4. 完成提示

```
所有任务完成时：

✅ 所有任务已完成

下一步：
  → /wf-fix 修正问题（如果有）
  → /wf-finish 编译到 Wiki
```

## 与 /wf-fix 的交互

开发过程中可能发现问题或需要改进：

```
场景：执行到"创建注册页面"时，发现应该"注册后自动登录"

选项：
1. 先完成当前任务，然后 /wf-fix
2. 暂停当前任务，立即 /wf-fix
3. 忽略，继续按计划执行

推荐：先完成当前任务，然后 /wf-fix
```

## 注意事项

**执行位置**：
- ✅ 必须在文档仓库执行（读取 spec.md、tasks.md）
- ✅ AI 通过 paths.code 路径操作代码仓库文件（如 ../wikiflow/src/*）
- ❌ 不要提示用户切换到代码仓库（会丢失文档上下文）

**操作边界**：
- ✅ 文档仓库：读取 spec.md、tasks.md，更新 tasks.md
- ✅ 代码仓库：修改源代码、运行测试、构建
- ❌ 禁止在文档仓库修改代码文件
- ❌ 禁止在代码仓库修改文档文件

**执行规范**：
- 遵循 WikiFlow 全局约束（见 install.md）
- 每完成一个任务就更新 tasks.md（标记为已完成）
- 如果需要修改 specs，提示用户执行 /wf-fix
- 不自动修改 spec.md（避免意外改变计划）
- 任务执行失败时，不自动跳过，等待用户确认

**架构参考**：
- 文档与代码分离架构：[current/architecture.md](../../docs/wiki/current/architecture.md)

