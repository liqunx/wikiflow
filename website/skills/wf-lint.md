# wf-lint - 文档检查

检查 Wiki 文档质量。查找错误、矛盾点、孤岛文件、废弃残留等。

## 使用方式

```bash
# 检查所有 Wiki
/wf-lint

# 只检查 current/
/wf-lint --scope current

# 只检查特定文档
/wf-lint docs/wiki/current/authentication.md
```

## 检查项目

### 1. 链接完整性

检查所有文档中的链接是否有效：

```bash
✅ current/authentication.md → valid link
❌ current/user.md → broken link (404)
⚠️  guide/quickstart.md → orphan file (not linked)
```

### 2. 一致性检查

检查文档之间是否有矛盾：

```bash
❌ 矛盾发现：

current/authentication.md:
  → "登录使用 JWT 认证"

current/api.md:
  → "登录使用 session 认证"

建议：统一认证方式的描述
```

### 3. 孤儿文件

查找未被引用的文档：

```bash
⚠️  发现孤岛文件：
  → current/old-feature.md (未被任何文档引用)
  → history/v0.1-deprecated.md (无链接指向)

建议：删除或添加索引
```

### 4. 废弃残留

检查是否还有废弃功能的残留：

```bash
❌ 发现废弃残留：

current/payment.md:
  → 提到 "支付宝支付"（已废弃）

建议：更新文档，移除废弃功能描述
```

### 5. 格式规范

检查文档格式是否符合规范：

```bash
⚠️  格式问题：
  → decisions/2024-01-15-login.md 缺少"原因"字段
  → current/api.md 标题层级错误（h3 后直接使用 h5）

建议：按照模板格式化文档
```

## 输出示例

```bash
📊 Wiki 质量检查报告

检查范围：全量检查
文档总数：28 页

问题统计：
  ❌ 错误：3 个
  ⚠️  警告：5 个
  ✅ 通过：20 页

错误详情：
  1. current/user.md → 链接到不存在的前端文档
  2. current/auth.md 与 current/api.md 描述矛盾
  3. deprecated/old-login.md 仍有引用

警告详情：
  1. decisions/2024-03-15.md 缺少"影响"字段
  2. current/payment.md 引用即将废弃的功能
  ...

建议：
  → 优先修复 3 个错误
  → 逐步完善 5 个警告
  → 定期执行 /wf-lint 检查
```

## 使用场景

### 开发完成后

```bash
/wf-finish  # wf-finish 会自动执行 lint
```

### 定期维护

```bash
# 每周检查一次
/wf-lint --scope current
```

### 重构前

```bash
# 了解哪些文档需要更新
/wf-lint
```

## 注意事项

- lint 发现的问题不会自动修复，需要手动处理
- 优先修复"错误"级别的项目
- "警告"级别的问题可以逐步完善
- 定期执行 lint 可以保持 Wiki 质量

## 下一步

- 根据检查结果修复问题
- 使用 `/wf-fix` 更新文档
- 修复后再次执行 `/wf-lint` 验证
