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

## 文档仓库 vs 代码仓库

WikiFlow 支持**文档代码分离**模式：
- **文档仓库**：包含 `.wikiflow/`、`docs/wiki/`，由团队/个人管理
- **代码仓库**：纯代码仓库，Git 工作流不变，由公司/客户管理
- 两个仓库分离，但通过 `.wikiflow/config.json` 建立关联

## 执行流程

### 1. 对话确认配置

向用户询问以下信息：

```
Q: 这是文档仓库还是代码仓库？
   [ ] 文档仓库（创建 .wikiflow/，配置代码仓库路径）
   [ ] 代码仓库（跳过初始化，引用外部文档仓库）

如果选择文档仓库：
  Q: 项目名称是什么？
  Q: 有几个代码仓库需要关联？
     - 单仓库：直接配置代码路径
     - 多仓库：配置每个仓库的名称和路径
  Q: 代码路径使用默认值还是环境变量？
     [ ] 默认值（适合单仓库或团队成员目录结构一致）
     [ ] 环境变量（适合团队协作，每个人目录结构不同）
  Q: 主要编程语言是什么？（用于 AI 理解代码）
  Q: 工作流使用什么语言？（默认 zh-CN）
  Q: 文档放在哪个目录？（默认 docs/）

如果选择环境变量：
  Q: 是否创建 .env 模板文件？
```

根据回答生成配置。如果选择环境变量，config 中使用 `${WIKIFLOW_XXX_ROOT:-默认值}` 格式。

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
    └── active/           ← 开发中的变更
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

### 7. 处理 .gitignore

```
检查项目根目录下是否有 .gitignore 文件：

IF 不存在:
  → 创建 .gitignore
  → 添加内容：.env、.env.local

IF 已存在:
  → 读取现有内容
  → 检查是否已包含 .env、.env.local
  → IF 没有:
    → 追加以下内容：
      # WikiFlow environment variables
      .env
      .env.local
    → 提示用户："✅ 已在 .gitignore 中追加 .env 相关条目"
  → ELSE:
    → 提示用户："ℹ️ .gitignore 已包含 .env 相关条目，跳过"
```

### 8. 生成 .env.template（可选）

```
如果用户选择环境变量且同意创建模板：
  → 生成 .env.template 文件
  → 包含示例环境变量（注释掉或为空）
  → 用户可以复制为 .env 并填入自己的值
```

### 9. 生成 .wikiflow/config.json

按照 references/config.schema.json 中定义的结构和默认值生成配置文件。

**多仓库配置示例**：

```json
{
  "project": {
    "name": "my-project",
    "code": {
      "repositories": [
        {"name": "backend", "root": "${WIKIFLOW_BACKEND_ROOT:-../backend-code}/src"},
        {"name": "frontend", "root": "${WIKIFLOW_FRONTEND_ROOT:-../frontend-code}/src"}
      ]
    }
  }
}
```

**单仓库配置示例**：

```json
{
  "project": {
    "name": "my-project",
    "code": {
      "root": "src"
    }
  }
}
```

### 10. 输出结果

```
✅ WikiFlow 初始化完成

配置文件：
  → .wikiflow/config.json

创建目录：
  → docs/wiki/{current,history,deprecated,decisions}
  → docs/raw/00-uncategorized
  → docs/changes/active

生成文件：
  → docs/wiki/index.md
  → docs/wiki/log.md
  → .env.template（如果选择环境变量）

下一步：
  → 如使用环境变量，复制 .env.template 为 .env 并填入路径
  → /wf-plan "你的第一个功能" 开始开发
  → 或将现有文档放入 docs/raw/ 后通过 /wf-plan 整理到 Wiki
```

## 注意事项

- 遵循 WikiFlow 全局约束（见 install.md）
- 环境变量支持团队协作：每个人设置自己的路径，不会冲突
- 如果用户项目已有文档，建议先放入 `raw/` 目录，后续通过工作流整理
- `project.code` 是面向 AI 的配置，用户无需关心代码细节
- config.json 可随时手动编辑，修改后立即生效
- 重复执行 /wf-init 会检测到已有配置，询问是否覆盖

## 环境变量使用

如果 config 中使用了环境变量（如 `${WIKIFLOW_BACKEND_ROOT:-../backend}`），所有 skill 在执行时会：

1. 读取 .wikiflow/config.json
2. 检查系统环境变量和 .env 文件（如果存在）
3. 用环境变量的值覆盖 config 中的默认值
4. 使用覆盖后的配置继续执行

这样团队成员可以各自设置不同的代码路径，而不会在 config.json 上冲突。
