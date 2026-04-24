---
name: wf-search
description: 查询 Wiki 知识库，了解当前系统实现和历史决策。在制定计划前了解背景，或随时查询项目文档。
metadata:
  version: 1.0.0
  execution_location: documentation_repository
---

# /wf-search - 查询 Wiki

**⚠️ 重要约束：本技能必须在文档仓库中执行**

查询 Wiki 知识库，获取当前系统实现摘要和相关决策记录。

## 使用方式

```bash
# 搜索关键词
/wf-search "登录功能"

# 搜索多个关键词
/wf-search "登录 注册 认证"

# 查看某个具体页面
/wf-search "current/authentication"
```

## 执行流程

### 0. 读取配置

```
读取 .wikiflow/config.json：
  → 获取 paths.wiki、wiki.structure 等路径配置
  → 获取 language 配置，后续交互使用该语言

**检查当前仓库类型**：

检查当前目录特征：
  IF 存在 .wikiflow/config.json AND docs/wiki/ 目录:
    → 当前是文档仓库
    → ✅ 继续执行

  ELSE:
    → 当前不是文档仓库
    → ❌ 错误：wf-search 必须在文档仓库执行
    → 报错并提示切换到文档仓库
    → 退出执行
```

### 1. 读取索引

```
读取 {paths.wiki}/index.md
→ 获取所有 Wiki 页面列表和分类
```

### 2. 搜索匹配

根据关键词搜索以下位置：

- `{paths.wiki}/{wiki.structure.current}/` — 当前实现（优先级最高）
- `{paths.wiki}/{wiki.structure.decisions}/` — 决策日志
- `{paths.wiki}/{wiki.structure.history}/` — 历史版本（仅在 current/ 无结果时）
- `{paths.wiki}/{wiki.structure.deprecated}/` — 已废弃功能（仅在明确要求时）

搜索策略：

- 关键词匹配（标题、标签、内容）
- 语义相似度匹配
- 文件名匹配

### 3. 返回结果

对每个匹配结果返回：

```
📄 找到 {N} 个相关页面：

1. current/authentication.md（匹配度：95%）
   概述：用户通过注册设置密码，使用手机号+密码登录
   最后更新：2026-04-24

2. decisions/2026-04-24-deprecate-force-change-password.md（匹配度：80%）
   决策：废弃首次改密，改为注册流程

3. decisions/2026-04-23-add-force-change-password.md（匹配度：60%）
   决策：添加首次改密功能
```

### 4. 返回摘要

```
## 登录功能 — 当前实现

### 当前状态
- 用户通过注册页面设置密码
- 使用手机号+密码登录
- 支持自动填充密码

### 相关决策
- [2026-04-24] 废弃首次改密，改为注册流程
- [2026-04-23] 添加首次改密功能（已废弃）

### 历史版本
- v3（当前）：注册流程
- v2：首次改密（已废弃）
- v1：默认密码（已废弃）
```

## 注意事项

- 遵循 WikiFlow 全局约束（见 install.md）
- 优先返回 `current/` 的内容，`history/` 和 `deprecated/` 仅在明确要求时返回
- 搜索结果按匹配度排序
- 返回摘要而非完整文档，减少上下文占用
- 如果未找到匹配，提示用户可能需要先 `/wf-plan` 创建相关文档
