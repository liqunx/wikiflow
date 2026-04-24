# wf-migrate-openspec - 从 OpenSpec 迁移

从 OpenSpec 迁移到 WikiFlow。检测现有 OpenSpec 结构，转换配置、迁移 Wiki 和 specs。

## 使用方式

```bash
# 迁移当前项目
/wf-migrate-openspec

# 迁移指定项目
/wf-migrate-openspec /path/to/project

# 预览迁移（不实际执行）
/wf-migrate-openspec --dry-run
```

## 迁移流程

### 1. 检测 OpenSpec 结构

```bash
扫描项目目录，查找：
  → .openspec/ 目录
  → specs/ 目录
  → OpenSpec 配置文件
```

### 2. 备份现有文件

```bash
创建备份：
  → .openspec/ → .openspec-backup-{timestamp}/
  → specs/ → specs-backup-{timestamp}/
```

### 3. 转换配置

```bash
读取 .openspec/config.json：
  → 提取项目信息
  → 转换为 WikiFlow 配置
  → 生成 .wikiflow/config.json
```

### 4. 迁移 Wiki

```bash
迁移 OpenSpec specs → WikiFlow Wiki：

openspec/specs/user-auth.md → wiki/current/authentication.md
openspec/specs/payment.md → wiki/current/payment.md
```

### 5. 迁移 Specs

```bash
迁移进行中的 specs：

openspec/specs/active/add-registration/
  → docs/changes/active/2026-04-24-add-registration/
```

### 6. 生成迁移报告

```bash
✅ OpenSpec 迁移完成

📊 迁移统计：
  → Wiki 文档：15 页
  → 决策记录：5 条
  → 活跃 specs：2 个
  → 配置文件：1 个

📁 生成的文件：
  → .wikiflow/config.json
  → docs/wiki/current/ (15 页)
  → docs/changes/active/ (2 个)

📦 备份位置：
  → .openspec-backup-20260423-143522/
  → specs-backup-20260423-143522/

⚠️  手动处理：
  → 检查迁移后的文档内容
  → 更新内部链接引用
  → 验证配置是否正确

下一步：
  → /wf-search "关键词" 测试 Wiki 功能
  → /wf-plan "新功能" 测试工作流
```

## 配置映射

### OpenSpec → WikiFlow

```json
// OpenSpec (.openspec/config.json)
{
  "project": {
    "name": "my-project",
    "language": "TypeScript"
  },
  "paths": {
    "specs": "specs"
  }
}

↓ 转换

// WikiFlow (.wikiflow/config.json)
{
  "project": {
    "name": "my-project",
    "language": "TypeScript"
  },
  "paths": {
    "docs": "docs",
    "wiki": "wiki",
    "code": "src"  // 新增，需手动配置
  }
}
```

## 注意事项

- 迁移前会自动备份原文件
- 建议先在测试项目中尝试迁移
- 迁移后需要手动验证文档内容
- OpenSpec 的 specs 会转换为 WikiFlow 的 current/
- 活跃的 specs 会被迁移到 changes/active/

## 手动处理

迁移后可能需要手动处理：

1. **更新内部链接**
   - OpenSpec 链接：`[用户认证](specs/user-auth)`
   - WikiFlow 链接：`[用户认证](wiki/current/authentication)`

2. **补充配置**
   - `project.code` 字段需要手动配置
   - 决策保留历史版本数量

3. **验证文档**
   - 检查迁移后的文档格式
   - 确认所有内容都正确迁移

## 回滚

如果迁移出现问题，可以回滚：

```bash
# 删除 WikiFlow 文件
rm -rf .wikiflow docs/wiki

# 恢复备份
mv .openspec-backup-{timestamp} .openspec
mv specs-backup-{timestamp} specs
```

## 下一步

- 迁移完成后，查看 [快速开始指南](/guide/getting-started)
- 测试 WikiFlow 工作流
- 根据需要调整配置
