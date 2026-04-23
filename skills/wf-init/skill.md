---
name: wf-init
description: 初始化 WikiFlow 项目。对话确认配置，创建目录结构，生成 config.json。是使用 WikiFlow 的第一步。
---

# /wf-init - 初始化项目

初始化 WikiFlow，在用户项目中创建文档驱动的开发环境。

## 使用方式

```bash
# 初始化当前项目
/wf-init

# 初始化指定项目
/wf-init /path/to/project
```

## 执行流程

### 1. 对话确认配置

向用户询问以下信息：

```
Q: 项目名称是什么？
Q: 代码在哪个目录？（如 src/、lib/、app/）→ 用于 AI 定位代码，用户无需关心
Q: 主要编程语言是什么？
Q: 工作流使用什么语言？（默认 zh-CN，如 en、ja、ko 等）→ 控制 AI 产物和交互语言
Q: 文档放在哪个目录？（默认 docs/）
```

根据回答生成配置。

### 2. 检查现有目录

```
检查项目根目录下是否已有 {docs} 目录：

IF 不存在:
  → 直接创建

IF 已存在:
  → 询问用户：
    [ ] 使用现有目录（将 WikiFlow 结构添加进去）
    [ ] 改名旧目录为 {docs}-old，创建新的
    [ ] 指定其他目录名
```

### 3. 创建目录结构

```
{docs}/
├── wiki/
│   ├── current/          ← 当前实现（AI 查询优先读这里）
│   ├── history/          ← 历史版本
│   ├── deprecated/       ← 已废弃功能
│   ├── decisions/        ← 决策日志
│   ├── index.md          ← 主索引
│   └── log.md            ← 变更日志
├── raw/
│   └── 00-uncategorized/ ← 原始文档（存量系统）
└── changes/
    ├── active/           ← 开发中的变更
    └── archive/          ← 已归档的变更
```

### 4. 生成 index.md

```markdown
# Wiki 知识库索引

本索引由 WikiFlow 自动生成和维护。

## 当前实现（current/）

| 页面 | 标签 | 最后更新 |
|------|------|----------|
| （暂无页面，执行 /wf-finish 后会自动更新） | | |

## 历史版本（history/）

| 页面 | 版本 | 归档日期 |
|------|------|----------|
| （暂无历史版本） | | |

## 已废弃（deprecated/）

| 页面 | 废弃日期 | 替代方案 |
|------|----------|----------|
| （暂无废弃功能） | | |

## 决策日志（decisions/）

| 日期 | 决策标题 | 相关功能 |
|------|----------|----------|
| （暂无决策记录） | | |

---

统计：current 0 页 | history 0 页 | deprecated 0 页 | decisions 0 条
```

### 5. 生成 log.md

```markdown
# Wiki 变更日志

本日志由 WikiFlow 自动生成和维护。

---

（暂无变更记录，执行 /wf-finish 后会自动追加）
```

### 6. 生成 .wikiflow/config.json

按照 references/config.schema.json 中定义的结构和默认值生成配置文件。

### 7. 输出结果

```
✅ WikiFlow 初始化完成

配置文件：
  → .wikiflow/config.json

创建目录：
  → docs/wiki/{current,history,deprecated,decisions}
  → docs/raw/00-uncategorized
  → docs/changes/{active,archive}

生成文件：
  → docs/wiki/index.md
  → docs/wiki/log.md

下一步：
  → /wf-plan "你的第一个功能" 开始开发
  → 或将现有文档放入 docs/raw/ 后通过 /wf-plan 整理到 Wiki
```

## 注意事项

- 如果用户项目已有文档，建议先放入 `raw/` 目录，后续通过工作流整理
- `project.code` 是面向 AI 的配置，用户无需关心代码细节
- config.json 可随时手动编辑，修改后立即生效
- 重复执行 /wf-init 会检测到已有配置，询问是否覆盖
