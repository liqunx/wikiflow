---
name: wf-update
description: 更新已安装的 WikiFlow 技能。从 GitHub 仓库拉取最新版本，对比差异后更新。支持更新核心技能和扩展技能。
---

# /wf-update - 更新技能

从 GitHub 仓库拉取最新的 WikiFlow 技能，对比本地已安装的版本，更新到最新。

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

### 1. 扫描本地已安装技能

```
扫描技能安装目录（如 .claude/skills/ 或等效位置）：
  → 列出所有已安装的 WikiFlow 技能（以 wf- 开头）
  → 读取每个技能的 skill.md 内容（用于后续对比）

  IF 没有已安装的 WikiFlow 技能:
    → 提示"未检测到已安装的 WikiFlow 技能，请先安装"
    → 退出
```

### 2. 拉取远程最新版本

```
从 GitHub 仓库拉取最新的技能文件：
  → 仓库地址：https://github.com/liqunx/wikiflow/tree/main/skills/
  → 拉取每个已安装技能对应的远程 skill.md
  → 如果有 references/，一并拉取

  核心技能列表：wf-init, wf-search, wf-plan, wf-do, wf-fix, wf-finish
  扩展技能：wf-migrate-openspec, wf-lint, wf-update, ...
```

### 3. 对比差异

```
FOR 每个已安装的技能:
  → 对比本地 skill.md 与远程 skill.md
  → 如果内容相同 → 无更新，跳过
  → 如果内容不同 → 标记为可更新，提取变更摘要

  变更摘要提取：
    → 比较 frontmatter 中的 description 字段
    → 比较主要章节变化
    → 生成简要差异说明
```

### 4. 显示可用更新

```
📋 WikiFlow 技能更新检查

已安装：{N} 个技能

可更新：
  → wf-plan（核心）
    变更：优化了 Wiki 搜索匹配逻辑，增加上下文复用
  → wf-finish（核心）
    变更：移除 archive 逻辑，编译后直接清理 active

无更新：
  → wf-init、wf-search、wf-do、wf-fix

是否更新？{N} 个技能有新版本
  [ ] 全部更新
  [ ] 选择性更新
  [ ] 取消
```

### 5. 执行更新

```
FOR 用户确认更新的每个技能:
  → 用远程 skill.md 替换本地 skill.md
  → 用远程 references/ 替换本地 references/（如有）
  → 保留技能安装目录结构不变

  → 检查 references/config.schema.json 是否有变化：
    IF config.schema.json 有变更:
      → 提示用户"配置 Schema 已更新，建议检查 .wikiflow/config.json 兼容性"
```

### 6. 输出更新报告

```
✅ 更新完成

已更新：{N} 个技能
  → wf-plan：skill.md + references/spec.md
  → wf-finish：skill.md + references/docs.schema.json

未更新：{N} 个技能（已是最新）

⚠️ 注意：
  → config.schema.json 已变更，请检查 .wikiflow/config.json 兼容性

下一步：
  → 继续正常使用 WikiFlow 工作流
  → 如有 Schema 变更，检查 /wf-init 更新配置
```

## 注意事项

- 遵循 WikiFlow 全局约束（见 install.md）
- 更新只替换技能文件，不影响用户项目的文档和配置
- 如果用户使用 `--check`，只显示差异不执行更新
- 更新过程中如果拉取远程文件失败，提示网络错误，不修改本地文件
- `/wf-update` 自身也可以被更新（从远程拉取最新版）
