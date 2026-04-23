---
name: wf-plan
description: 制定开发计划，生成 spec.md 和 tasks.md。自动匹配相关 Wiki，强制文档先行。适用于新功能开发、bug 修复、需求改进。不可跳过。
---

# /wf-plan - 制定计划

制定开发计划，生成 spec.md 和 tasks.md。自动匹配相关 Wiki，确保开发前了解背景。

## 使用方式

```bash
# 新功能（自动搜索 Wiki + 详细询问）
/wf-plan "添加注册功能"

# bug 修复（快速模式）
/wf-plan "修复登录按钮样式"

# 带描述的计划
/wf-plan "优化登录流程" --desc "当前首次改密体验差，改为注册流程"

# 指定相关 Wiki（跳过自动匹配）
/wf-plan "修复登录按钮样式" --wiki current/authentication
```

## 执行流程

### 0. 前置检查

```
检查是否存在 active 的变更：
  → 扫描 docs/changes/active/
  → 如果已有同名变更，提示用户选择：继续 或 新建
```

### 1. 自动搜索 Wiki

```
IF 用户未指定 --wiki 参数:
  → 自动提取关键词
  → 搜索 docs/wiki/current/
  → 计算匹配度

  IF 匹配度 >= 80%:
    → 显示匹配结果，要求确认：
      "找到相关 Wiki：current/authentication.md（匹配度：95%）"
      [ ] 使用此 Wiki
      [ ] 查看详情（执行 /wf-search）
      [ ] 手动选择其他 Wiki

  ELSE IF 匹配度 40%-80%:
    → 显示候选列表，要求选择：
      "找到以下可能的 Wiki："
      1. current/authentication.md（匹配度：65%）
      2. current/user-management.md（匹配度：45%）
      [ ] 选择 1
      [ ] 选择 2
      [ ] 先 /wf-search 了解详情
      [ ] 手动输入

  ELSE:
    → 未找到相关 Wiki
    → 强制先执行 /wf-search：
      "未找到相关 Wiki，请先执行 /wf-search 了解背景"
      → 自动执行 /wf-search
      → 搜索完成后回到匹配流程
```

### 2. 详细询问

根据用户输入的标题和描述，AI 询问以下信息：

**新功能开发**：

```
Q: 为什么要做这个功能？
Q: 当前系统有什么问题？
Q: 新方案是什么？
Q: 会影响哪些现有功能？
Q: 有没有需要废弃的功能？
```

**Bug 修复**：

```
Q: Bug 的具体表现是什么？
Q: 期望的正确行为是什么？
Q: 复现步骤是什么？
Q: 影响范围有多大？
```

**需求改进**：

```
Q: 当前实现有什么不足？
Q: 改进方案是什么？
Q: 会影响哪些现有功能？
Q: 需要废弃哪些旧功能？
```

AI 根据标题和描述自动判断类型（新功能/Bug/改进），只询问相关问题。用户也可以主动提供完整信息，跳过询问。

### 3. 生成 spec.md

按照 references/spec.md 模板生成：

```
docs/changes/active/{slug}/spec.md
```

slug 生成规则：
- 取标题的关键词，用短横线连接
- 加上日期前缀：`{YYYY-MM-DD}-{slug}`
- 示例：`2026-04-24-add-registration`

### 4. 生成 tasks.md

按照 references/tasks.md 模板生成：

```
docs/changes/active/{slug}/tasks.md
```

AI 根据询问结果自动分解任务，按模块分组。

### 5. 输出结果

```
✅ 计划已生成

相关 Wiki：
  → current/authentication.md

生成文件：
  → docs/changes/active/2026-04-24-add-registration/spec.md
  → docs/changes/active/2026-04-24-add-registration/tasks.md

下一步：
  → /wf-do 开始执行开发
  → /wf-search 了解更多背景
```

## 强约束规则

1. **必须指定相关 Wiki**
   - 如果自动匹配失败，强制执行 /wf-search
   - spec.md 必须包含 `## 相关 Wiki` 字段
   - 不允许"无相关 Wiki"的计划（除非是全新项目）

2. **spec.md 不可跳过**
   - /wf-do 执行前会检查 spec.md 是否存在
   - 不存在则自动执行 /wf-plan

3. **slug 唯一性**
   - 同名变更不允许重复创建
   - 已有同名变更时，提示用户选择：继续 或 新建

## spec.md 模板结构

```markdown
# {标题}

## 元数据
- 创建时间：{YYYY-MM-DD}
- 状态：active
- 相关 Wiki：{wiki-path}（匹配度：{score}%）

## 目标
{从询问中提取}

## 当前问题
{从询问中提取}

## 方案
{从询问中提取}

## 废弃功能
{从询问中提取，没有则写"无"}

## 影响范围
{从询问中提取}

## 相关链接
- [[{wiki-name}]]
```

## 注意事项

- 小 bug 修复也需要走 /wf-plan，但询问流程会简化
- AI 自动判断计划类型，调整询问策略
- 已有 active 变更时，提示用户选择继续或新建
