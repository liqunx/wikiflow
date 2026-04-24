# wf-plan - 制定计划

制定开发计划，生成 spec.md 和 tasks.md。自动匹配相关 Wiki，确保开发前了解背景。

## 使用方式

```bash
# 新功能开发
/wf-plan "添加注册功能"

# Bug 修复
/wf-plan "修复登录按钮样式"

# 带描述的计划
/wf-plan "优化登录流程" --desc "当前首次改密体验差"

# 指定相关 Wiki
/wf-plan "修复登录" --wiki current/authentication
```

## 执行流程

### 1. 自动搜索 Wiki

- 提取关键词，搜索 `current/` 目录
- 计算匹配度，自动关联相关 Wiki
- 如果未找到相关 Wiki，强制先执行 `/wf-search`

### 2. 详细询问

根据任务类型（新功能/Bug/改进）询问相关问题：

**新功能开发**：
- 为什么要做这个功能？
- 当前系统有什么问题？
- 新方案是什么？
- 会影响哪些现有功能？

**Bug 修复**：
- Bug 的具体表现是什么？
- 期望的正确行为是什么？
- 复现步骤是什么？

### 3. 生成文档

- **spec.md**：完整的技术方案
- **tasks.md**：可执行的任务清单

## 强约束规则

1. **必须指定相关 Wiki**
   - 不允许"无相关 Wiki"的计划（除非是全新项目）
   - spec.md 必须包含 `## 相关 Wiki` 字段

2. **spec.md 不可跳过**
   - `/wf-do` 执行前会检查 spec.md 是否存在
   - 不存在则自动执行 `/wf-plan`

3. **slug 唯一性**
   - 同名变更不允许重复创建
   - 已有同名变更时，提示用户选择

## 输出示例

```bash
✅ 计划已生成

相关 Wiki：
  → current/authentication.md

生成文件：
  → docs/changes/active/2026-04-24-add-registration/spec.md
  → docs/changes/active/2026-04-24-add-registration/tasks.md

下一步：
  → /wf-do 开始执行开发
```

## 注意事项

- 小 bug 修复也需要走 `/wf-plan`，但询问流程会简化
- AI 自动判断计划类型，调整询问策略
- 已有 active 变更时，提示用户选择继续或新建

## 下一步

- 计划生成后，使用 `/wf-do` 开始执行
- 如果需要修改计划，使用 `/wf-fix`
