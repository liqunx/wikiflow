---
name: wf-finish
description: 编译 Wiki，将 active 变更同步到知识库。自动处理历史版本、废弃功能、决策日志，并执行 lint 检查。完成后清理 active 目录。
metadata:
  version: 1.0.0
  execution_location: documentation_repository
---

# /wf-finish - 编译 Wiki

**⚠️ 重要约束：本技能必须在文档仓库中执行**

将 active 变更编译到 Wiki 知识库，自动处理版本历史、废弃功能和文档检查。

## 使用方式

```bash
# 编译当前 active 变更到 Wiki
/wf-finish

# 编译指定的变更
/wf-finish docs/changes/active/2026-04-24-add-registration

# 编译并跳过 lint（不推荐）
/wf-finish --skip-lint
```

## 执行流程

### 0. 前置检查

```
读取 .wikiflow/config.json，获取 paths、language、wiki 等配置。

**检查当前仓库类型**：

检查当前目录特征：
  IF 存在 .wikiflow/config.json AND docs/wiki/ 目录:
    → 当前是文档仓库
    → ✅ 继续执行

  ELSE IF 存在代码目录特征（如 src/、package.json 等）且不存在 .wikiflow/:
    → 当前是代码仓库
    → ❌ 错误：wf-finish 必须在文档仓库执行
    → 报错并提示：
      "❌ 操作被拒绝：wf-finish 必须在文档仓库执行

       当前仓库：代码仓库（不包含 .wikiflow/ 和 docs/wiki/）
       尝试操作：编译 Wiki 知识库
       允许操作：代码修改、测试、构建

       请切换到文档仓库后重试：
       1. 查找文档仓库目录（如 ../wikiflowDev）
       2. 切换到文档仓库目录
       3. 再次执行 /wf-finish"
    → 退出执行

  ELSE:
    → ⚠️ 警告：无法确定仓库类型
    → 询问用户："当前目录不是文档仓库，确定要继续吗？"
    → 如果用户确认，继续执行
    → 如果用户取消，退出

扫描 {paths.changes}/active/ 目录：

IF 没有 active 变更:
  → 提示"没有需要编译的变更"
  → 退出

IF 有多个 active 变更:
  → 列出所有 active 变更
  → 要求用户选择

IF 只有一个 active 变更:
  → 自动选中

检查 tasks.md：
  → 是否有未完成的任务？
  → 如果有，警告用户：
    "⚠️ 仍有 N 个未完成任务，确定要编译吗？"
    [ ] 是，继续编译
    [ ] 否，返回继续开发
```

### 1. 读取源文件

```
读取 .wikiflow/config.json 中的 language 配置，后续所有生成内容使用该语言。

读取 active 变更的所有文件：
  → spec.md（目标、方案、影响范围）
  → tasks.md（任务清单，含完成状态）
  → decisions.md（决策日志，如果存在）
```

### 2. 读取旧 Wiki

```
根据 spec.md 中的"相关 Wiki"字段：
  → 读取 {paths.wiki}/{wiki.structure.current}/{name}.md（当前版本）
  → 如果不存在，说明是全新功能
```

### 3. 编译 current/

**合并策略**：

```
IF 旧 Wiki 不存在（全新功能）:
  → 直接从 spec.md + decisions.md 生成 current/{name}.md

IF 旧 Wiki 存在（已有功能）:
  → 读取旧 Wiki 的内容
  → 读取 spec.md 的变更
  → 合并：
    1. 保留旧 Wiki 的有效部分（未被废弃的）
    2. 应用 spec.md 的变更
    3. 标记废弃部分：移到 deprecated/
    4. 添加新的内容
  → 生成新的 current/{name}.md
```

**current Wiki 格式**：

```markdown
---
title: {功能名称}
type: feature
last_updated: {YYYY-MM-DD}
tags: [{标签列表}]
source: changes/active/{slug}
---

# {功能名称}

## 概述
{从 spec.md 目标提取}

## 实现细节
{从 spec.md 方案 + tasks.md 完成状态提取}

## 技术决策
{从 decisions.md 提取所有决策}

## 影响范围
{从 spec.md 提取}

## 相关链接
- [[{相关页面}]]
```

### 4. 移动旧版本到 history/

```
IF 旧 Wiki 存在:
  → 复制旧 Wiki 到 history/{name}-{version}.md
  → version 递增（表示第 N 次编译）
  → 示例：history/authentication-v3.md（第三次编译）

  → 检查 history/ 中的版本数量
  → 如果超过配置的 keepHistoryVersions（默认 5）：
    → 删除最旧的版本
```

### 5. 提取废弃功能到 deprecated/

```
IF spec.md 中有"废弃功能":
  FOR 每个废弃功能:
    → 从旧 Wiki 中提取相关内容
    → 生成 deprecated/{name}.md
    → 格式：
      ---
      title: {废弃功能名称}
      type: deprecated
      deprecated_at: {YYYY-MM-DD}
      replaced_by: {新功能名称}
      ---

      # {废弃功能名称}

      ⚠️ 此功能已废弃

      ## 原始描述
      {从旧 Wiki 提取}

      ## 废弃原因
      {从 decisions.md 提取}

      ## 替代方案
      → [[{新功能名称}]]
```

### 6. 编译 decisions/

```
IF decisions.md 存在:
  → 解析每条决策记录
  → 生成独立的决策文件：
    {paths.wiki}/{wiki.structure.decisions}/{YYYY-MM-DD}-{slug}.md
  → 格式：
    ---
    title: {决策标题}
    type: decision
    date: {YYYY-MM-DD}
    related_wiki: current/{name}
    ---

    # {决策标题}

    ## 问题
    {问题描述}

    ## 决策
    {决策内容}

    ## 废弃
    {废弃内容}

    ## 新增
    {新增内容}
```

### 7. 更新 index.md

```
更新 {paths.wiki}/index.md：

1. 更新 current/ 页面列表
2. 更新 history/ 页面列表
3. 更新 deprecated/ 页面列表
4. 更新 decisions/ 页面列表
5. 更新统计信息
```

### 8. 自动 Lint

**检查项目**：

```
1. 废弃文档检查
   → current/ 中是否有 ⚠️ 标记的废弃内容？
   → 如果有，移到 deprecated/

2. 失效链接检查
   → 所有 [[link]] 是否指向存在的文件？
   → 如果失效，搜索可能的替代页面

3. 重复内容检查
   → current/ 中是否有重复描述？
   → 如果有，合并

4. 一致性检查
   → decisions/ 中的决策是否反映在 current/ 中？
   → 如果不一致，标记

5. 孤岛页面检查
   → 是否有没有被任何页面引用的 Wiki 页面？
   → 如果有，标记

6. 历史版本清理
   → history/ 中是否有超过 keepHistoryVersions 的版本？
   → 如果有，删除最旧的
```

**Lint 输出**：

```
📋 Lint 报告

✅ 废弃文档检查：通过
✅ 失效链接检查：通过（修复了 1 个失效链接）
✅ 重复内容检查：通过
⚠️ 一致性检查：发现 1 个不一致
  → decisions/2026-04-23-xxx.md 中的决策未反映在 current/authentication.md
  → 建议：手动检查或重新执行 /wf-finish
✅ 孤岛页面检查：通过
✅ 历史版本清理：通过

总计：6 项检查，5 项通过，1 项需人工确认
```

### 9. 清理 active/

```
编译完成后：
  → 直接删除 {paths.changes}/active/{slug}/

  提示用户：
  "✅ active 变更已清理"
```

### 10. 最终输出

```
✅ Wiki 编译完成

生成文件：
  → docs/wiki/current/authentication.md
  → docs/wiki/decisions/2026-04-24-add-registration.md

移动文件：
  → docs/wiki/history/authentication-v2.md

新增废弃：
  → docs/wiki/deprecated/force-change-password.md

Lint 结果：
  → 6 项检查，5 项通过，1 项需人工确认

索引更新：
  → docs/wiki/index.md

下一步：
  → /wf-search 验证编译结果
  → 或继续 /wf-plan 开始新的变更
```

## 注意事项

**仓库约束**：
- ✅ 必须在文档仓库执行
- ✅ 允许操作：文档编辑、Wiki 编译、spec 生成、Git 操作
- ❌ 禁止操作：代码修改、测试、构建

**执行规范**：
- 遵循 WikiFlow 全局约束（见 install.md）
- 编译后 active 变更会被直接删除（不保留 archive）
- 建议编译前确认所有任务已完成
- Lint 检查自动修复能修复的问题，需人工确认的会标记
- 如果编译失败，active 变更不会被清理
- 可以多次执行 /wf-finish（幂等）

**架构参考**：
- 文档与代码分离架构：[current/architecture.md](../../docs/wiki/current/architecture.md)

