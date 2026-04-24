# wf-finish - 完成变更

编译 Wiki，将 active 变更同步到知识库。自动处理历史版本、废弃功能、决策日志，并执行 lint 检查。

## 使用方式

```bash
# 完成当前 active 变更
/wf-finish

# 完成指定变更
/wf-finish docs/changes/active/2026-04-24-add-registration

# 跳过 lint 检查
/wf-finish --skip-lint
```

## 执行流程

### 1. 前置检查

```bash
1. 检查是否有未完成的任务
   → 如果有，询问是否继续

2. 执行 lint 检查
   → 检查文档质量
   → 查找错误和矛盾
   → 如果有问题，询问是否继续
```

### 2. 处理 active 变更

```bash
1. 读取 spec.md 和 tasks.md
2. 提取关键信息和决策
3. 生成 Wiki 文档
```

### 3. 更新 Wiki

```bash
1. current/ - 添加或更新当前实现文档
2. history/ - 归档旧版本（如果存在）
3. deprecated/ - 标记废弃功能
4. decisions/ - 添加决策日志
5. index.md - 更新主索引
6. log.md - 添加变更记录
```

### 4. 清理 active

```bash
1. 将 active 变更移动到 archive/
2. 生成变更总结
```

## 输出示例

```bash
✅ 变更已编译到 Wiki

📊 变更统计：
  → 新增文档：2 页
  → 更新文档：1 页
  → 归档版本：1 版
  → 决策记录：3 条
  → 废弃功能：1 项

📝 生成的文档：
  → current/user-registration.md
  → current/authentication-flow.md
  → history/login-v1.md
  → decisions/2026-04-24-auto-login.md

📊 Wiki 统计：
  → current: 12 页
  → history: 3 版
  → deprecated: 1 功能
  → decisions: 8 条

下一步：
  → git add docs/
  → git commit -m "feat: 添加用户注册功能"
  → /wf-plan "下一个功能"
```

## Lint 检查

`wf-finish` 会自动执行以下检查：

- **链接完整性**：检查所有文档链接是否有效
- **一致性**：检查文档之间是否有矛盾
- **孤儿文件**：查找未被引用的文档
- **废弃残留**：检查是否还有废弃功能的残留代码
- **格式规范**：检查文档格式是否符合规范

## 注意事项

- 建议所有任务完成后再执行 `/wf-finish`
- 如果 lint 发现问题，可以选择修复或继续
- active 变更会被移动到 `archive/`，不会删除
- 所有变更都会记录在 `log.md` 中

## 下一步

- 变更完成后，提交代码到 Git
- 开始下一个功能的开发：`/wf-plan`
- 定期执行 `/wf-lint` 检查 Wiki 质量
