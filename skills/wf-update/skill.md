---
name: wf-update
description: 更新已安装的 WikiFlow 技能。从 GitHub 仓库拉取最新版本并直接替换。执行步骤确定，结果一致。
metadata:
  version: 1.0.0
---

# /wf-update - 更新技能

从 GitHub 仓库拉取最新的 WikiFlow 技能并更新到最新版本。执行步骤确定，每次结果一致。

## 使用方式

```bash
# 检查并更新所有已安装的技能
/wf-update

# 只更新核心技能
/wf-update --core

# 更新指定技能
/wf-update wf-lint

# 只检查不更新，显示可用更新
/wf-update --check
```

## 执行流程

### 0. 读取配置

```
读取 .wikiflow/config.json：
  → 获取 language 等配置
```

### 1. 扫描本地已安装技能

```
扫描技能安装目录（如 .claude/skills/ 或等效位置）：
  → 列出所有已安装的 WikiFlow 技能（以 wf- 开头）
  
  IF 没有已安装的 WikiFlow 技能:
    → 提示"未检测到已安装的 WikiFlow 技能，请先安装"
    → 退出
```

### 2. 拉取远程版本信息

```
从 GitHub 仓库拉取版本信息：
  → 读取远程每个 skill.md 的 frontmatter
  → 提取 metadata.version 字段
  → 列出远程可用的技能目录

  核心技能列表：wf-init, wf-search, wf-plan, wf-do, wf-fix, wf-finish
  扩展技能：wf-migrate-openspec, wf-lint, wf-update, ...
```

### 3. 检查版本差异

```
FOR 每个已安装的技能:
  → 读取本地 skill.md 的 frontmatter
  → 提取 metadata.version 字段
  → 读取远程 skill.md 的 frontmatter
  → 提取 metadata.version 字段
  → 对比版本号

  IF 本地版本 < 远程版本:
    → 标记为需要更新
  ELSE:
    → 跳过（已是最新）
```

### 4. 检查技能文件差异

```
FOR 每个已安装的技能:
  → 检查远程 skill.md 是否存在
  → IF 远程技能不存在:
    → 跳过（可能是已删除的技能）
  → ELSE:
    → 标记为需要更新
```

### 4. 显示可用更新

```
📋 WikiFlow 技能更新检查

核心技能版本：1.0.0（示例）

已安装：{N} 个技能

可更新：{N} 个技能
  → wf-plan：1.0.0 → 1.1.0
  → wf-finish：1.0.0 → 1.1.0
  → wf-lint：1.0.0 → 1.1.0

已是最新：{M} 个技能
  → wf-init, wf-search, wf-do, wf-fix

是否更新？{N} 个技能有新版本
  [ ] 全部更新
  [ ] 取消
```

### 5. 执行更新

```
FOR 用户确认更新的每个技能:
  → 删除本地 skill.md
  → 删除本地 references/ 目录（如有）
  → 下载远程 skill.md
  → 下载远程 references/ 目录下所有文件
  → 写入本地，保持目录结构不变
  → 检查是否有 config.schema.json：
    IF config.schema.json 有变更:
      → 提示用户"配置 Schema 已更新，建议检查 .wikiflow/config.json 兼容性"
```

**重要**：不进行内容对比、不生成差异摘要。直接用远程版本替换本地版本，确保每次执行结果一致。

### 6. 输出更新报告

```
✅ 更新完成

已更新：{N} 个技能
  → wf-plan：1.0.0 → 1.1.0（skill.md + references/spec.md）
  → wf-finish：1.0.0 → 1.1.0（skill.md + references/docs.schema.json）

未更新：{M} 个技能（已是最新）

⚠️ 注意：
  → config.schema.json 已变更，请检查 .wikiflow/config.json 兼容性

下一步：
  → 继续正常使用 WikiFlow 工作流
  → 如有 Schema 变更，检查 /wf-init 更新配置
```

## 注意事项

- 遵循 WikiFlow 全局约束（见 install.md）
- 更新是破坏性的，直接替换本地文件，不保留任何自定义修改
- 如需保留本地修改，请在更新前手动备份
- 如果用户使用 `--check`，只显示差异不执行更新
- `/wf-update` 自身也可以被更新（从远程拉取最新版）
