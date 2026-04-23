---
name: wf-migrate-openspec
description: 从 OpenSpec 迁移到 WikiFlow。检测现有 OpenSpec 结构，转换配置、迁移 Wiki 和 specs。一次性使用。
---

# /wf-migrate-openspec - 从 OpenSpec 迁移

检测项目中的 OpenSpec 结构，将数据迁移到 WikiFlow 格式。一次性使用，迁移完成后可卸载本技能。

## 前置条件

- 项目中已存在 `openspec/` 目录
- 已通过 `/wf-init` 初始化 WikiFlow

## 使用方式

```bash
/wf-migrate-openspec
```

## 执行流程

### 1. 检测 OpenSpec

```
扫描项目根目录，查找 openspec/ 目录：

IF 不存在:
  → 提示"未检测到 OpenSpec 结构，无需迁移"
  → 退出

IF 存在:
  → 读取 openspec/config.yaml
  → 列出检测到的内容：
    - config.yaml
    - docs/wiki/ 下的页面（统计数量）
    - specs/ 下的规格文件（统计数量）
    - docs/raw/ 下的原始文档（统计数量）
  → 要求用户确认迁移
```

### 2. 迁移 Wiki

```
将 openspec/docs/wiki/ 的内容迁移到 WikiFlow 的 docs/wiki/current/：

IF openspec/docs/wiki/features/ 存在:
  → 读取 features/ 下的每个 .md 文件
  → 为每个文件添加 WikiFlow frontmatter（type: feature, last_updated, tags）
  → 写入 docs/wiki/current/

IF openspec/docs/wiki/index.md 存在:
  → 读取内容，按 WikiFlow 索引格式重新生成 docs/wiki/index.md

IF openspec/docs/wiki/log.md 存在:
  → 追加到 docs/wiki/log.md
```

### 3. 迁移 Specs

```
将 openspec/specs/ 下的规格文件迁移到 WikiFlow 格式：

FOR 每个规格文件:
  → 读取内容
  → 转换为 WikiFlow 的 spec.md 格式（按 wf-plan 的 references/spec.md 模板）
  → 如果是活跃规格 → 放入 {paths.changes}/active/{slug}/spec.md
  → 如果是已归档 → 直接编译到 {paths.wiki}/current/（WikiFlow 不保留 archive）
```

### 4. 迁移 Raw 文档

```
IF openspec/docs/raw/ 存在且非空:
  → 将内容合并到 docs/raw/00-uncategorized/
  → 如果有冲突（同名文件），保留两份并加后缀
```

### 5. 迁移归档

```
IF openspec/changes/archive/ 存在且非空:
  → 将归档内容直接编译到 {paths.wiki}/current/（作为历史 Wiki 页面）
  → WikiFlow 不使用 archive 目录，归档内容统一由 Wiki 管理
```

### 6. 保留参考

```
IF openspec/docs/schema/CLAUDE.md 存在:
  → 复制到 docs/raw/00-uncategorized/openspec-claude-md（保留参考）
```

### 7. 转换配置

```
读取 openspec/config.yaml，提取有效配置：
  → 项目名称、路径等
  → 更新 .wikiflow/config.json 中对应字段
```

### 8. 处理旧目录

```
迁移完成后，询问用户：
  [ ] 删除 openspec/ 目录（推荐，迁移已完成）
  [ ] 重命名为 openspec-backup/（保留备份）
  [ ] 暂不处理（稍后手动清理）
```

### 9. 输出结果

```
✅ OpenSpec → WikiFlow 迁移完成

迁移统计：
  → Wiki 页面：{N} 页 → {paths.wiki}/current/
  → 规格文件：{N} 个 → {paths.changes}/active/
  → 原始文档：{N} 个 → {paths.raw}/

下一步：
  → /wf-search "关键词" 验证迁移结果
  → /wf-plan 开始新的开发
```

## 注意事项

- 遵循 WikiFlow 全局约束（见 install.md）
- 迁移是单向的（OpenSpec → WikiFlow），不提供回迁
- 迁移前建议确认 git 工作区是干净的（便于回滚）
- 如果 OpenSpec 中的 specs 格式差异较大，AI 会尽量转换，无法自动转换的会放入 raw/ 保留
- 迁移完成后可卸载本技能
