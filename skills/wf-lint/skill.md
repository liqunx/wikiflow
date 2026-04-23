---
name: wf-lint
description: 检查 Wiki 文档质量。查找错误、矛盾点、孤岛文件、废弃残留等。优先检查 current/，必要时扩展到 history/。
---

# /wf-lint - 文档质量检查

检查 Wiki 知识库中的文档质量问题，包括错误、矛盾、孤岛页面、废弃残留等。

## 使用方式

```bash
# 检查所有 Wiki 文档
/wf-lint

# 只检查 current/ 目录
/wf-lint --scope current

# 检查 current/ + history/
/wf-lint --scope full

# 检查指定页面
/wf-lint current/authentication
```

## 执行流程

### 0. 读取配置

```
读取 .wikiflow/config.json：
  → 获取 paths.wiki、wiki.structure、language 等配置
```

### 1. 扫描 current/

```
扫描 {paths.wiki}/{wiki.structure.current}/ 下所有 .md 文件：
  → 读取每个文件的 frontmatter 和内容
  → 构建页面索引（标题、标签、链接、引用关系）
```

### 2. 检查项

按优先级依次执行：

#### 2.1 废弃残留检查

```
FOR 每个 current/ 中的页面:
  → 内容中是否包含 ⚠️ 或"已废弃"标记？
  → frontmatter 中 tags 是否包含 deprecated 相关标签？
  → 如果有 → 该页面应移到 deprecated/，标记为问题

输出：{N} 个页面包含废弃标记但仍在 current/ 中
```

#### 2.2 链接完整性检查

```
FOR 每个页面中的 [[link]] 引用:
  → 目标文件是否存在？
  → 不存在 → 记录为失效链接

  → 搜索可能的替代页面（关键词匹配）
  → 给出修复建议

输出：{N} 个失效链接
```

#### 2.3 内容矛盾检查

```
FOR 每对相关页面（通过 tags 或 [[link]] 关联）:
  → 同一功能在不同页面中的描述是否矛盾？
  → 决策记录是否与 current/ 中的实现描述一致？
  → 如果矛盾 → 标记并给出具体冲突点

输出：{N} 处内容矛盾
```

#### 2.4 孤岛页面检查

```
FOR 每个 current/ 中的页面:
  → 是否被其他页面通过 [[link]] 引用？
  → 是否被 index.md 列出？
  → 如果都没有 → 标记为孤岛页面

  → 检查孤岛页面内容是否仍有价值：
    - 有价值 → 建议从其他页面添加引用
    - 无价值 → 建议移到 deprecated/

输出：{N} 个孤岛页面
```

#### 2.5 frontmatter 规范检查

```
FOR 每个页面的 frontmatter:
  → 必填字段是否完整？（对照 references/docs.schema.json）
  → date 格式是否正确？（YYYY-MM-DD）
  → type 值是否合法？
  → 如果有问题 → 标记具体缺失字段

输出：{N} 个 frontmatter 问题
```

#### 2.6 历史版本一致性（仅 --scope full）

```
IF --scope full:
  扫描 {paths.wiki}/{wiki.structure.history}/:
    → history/ 中是否有与 current/ 同名但内容完全相同的页面？
      → 冗余历史版本，建议删除
    → history/ 版本数量是否超过 keepHistoryVersions？
      → 超出则标记最旧的版本建议清理

  扫描 {paths.wiki}/{wiki.structure.deprecated}/:
    → deprecated/ 中是否有被 current/ 重新引用的功能？
      → 可能需要恢复或更新引用
    → replaced_by 指向的页面是否存在？

输出：{N} 个历史版本问题
```

### 3. 生成报告

```
📋 Wiki 文档质量报告

检查范围：current/（{N} 页）
          history/（{N} 页，仅 --scope full）

✅ 废弃残留：通过
✅ 链接完整性：通过
⚠️ 内容矛盾：发现 2 处
  → current/auth.md 与 current/login.md 对"密码规则"描述不一致
  → decisions/2026-04-20-xxx.md 中的决策未反映在 current/auth.md
❌ 孤岛页面：发现 1 个
  → current/payment-utils.md（无任何页面引用）
✅ frontmatter 规范：通过
✅ 历史版本一致性：通过

总计：6 项检查，4 项通过，1 项需关注，1 项需修复

建议操作：
  → /wf-finish 可自动修复废弃残留和部分链接问题
  → 内容矛盾和孤岛页面需手动确认后通过 /wf-plan 处理
```

### 4. 自动修复（可选）

```
询问用户是否自动修复可修复的问题：
  [ ] 自动修复（废弃残留、失效链接、frontmatter）
  [ ] 仅标记，不修复
  [ ] 逐项确认后修复
```

## 与其他技能的关系

- **wf-finish** 内置了基础 lint（编译时自动执行），wf-lint 是独立的高级检查
- wf-lint 发现的问题，如果是文档层面的，可通过 `/wf-plan` → `/wf-finish` 修复
- 如果是代码层面的矛盾，需要 `/wf-do` 配合处理

## 注意事项

- 遵循 WikiFlow 全局约束（见 install.md）
- 默认只检查 current/，避免 history/ 干扰
- 报告按严重程度分级：❌ 需修复 > ⚠️ 需关注 > ✅ 通过
- 自动修复前必须确认，避免误改
- 可以多次执行（幂等）
