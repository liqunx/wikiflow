# 快速开始

欢迎使用 WikiFlow！本指南将帮助你快速上手文档驱动的 AI 开发框架。

## 安装

```bash
# 使用 npm 安装
npm install -g wikiflow

# 或使用 pnpm
pnpm add -g wikiflow
```

## 初始化项目

```bash
# 在你的项目目录中执行
wf-init

# WikiFlow 会询问一些问题：
# 1. 项目名称
# 2. 代码目录
# 3. 编程语言
# 4. 文档目录
```

## 工作流程

### 1. 查询现有文档

```bash
# 开发前先了解背景
/wf-search "用户认证"
```

### 2. 制定计划

```bash
# 规划新功能
/wf-plan "添加用户注册功能"

# WikiFlow 会：
# - 自动搜索相关 Wiki
# - 询问详细需求
# - 生成 spec.md 和 tasks.md
```

### 3. 执行开发

```bash
# 按照任务清单执行
/wf-do

# WikiFlow 会：
# - 逐个完成任务
# - 更新任务状态
# - 实时显示进度
```

### 4. 完成变更

```bash
# 编译到 Wiki 知识库
/wf-finish

# WikiFlow 会：
# - 更新 Wiki 文档
# - 归档历史版本
# - 记录决策日志
```

## 核心概念

### 文档先行

WikiFlow 强制先写文档再开发，确保：

- ✅ 思路清晰
- ✅ 设计完整
- ✅ 有据可查

### AI 协作

深度集成 Claude AI：

- 🤖 自动查询 Wiki 知识
- 🤖 理解项目上下文
- 🤖 智能任务分解

### 版本管理

完整的变更追踪：

- 📚 当前实现（current/）
- 📜 历史版本（history/）
- 💡 决策日志（decisions/）

### 团队协作

支持多种协作模式：

- 👥 文档代码分离
- 👥 多仓库管理
- 👥 环境变量配置

## 下一步

- 查看 [工作流说明](/guide/workflow) 了解详细流程
- 浏览 [Skills 文档](/skills/) 了解所有功能
- 开始你的第一个功能开发！

## 常见问题

### WikiFlow 适合什么项目？

WikiFlow 适合需要长期维护、多人协作的软件项目，特别是：

- 需要频繁迭代的产品
- 多人协作的团队项目
- 需要详细文档记录的系统

### 如何迁移现有项目？

如果你的项目已经有一些文档，可以使用：

```bash
# 从 OpenSpec 迁移
/wf-migrate-openspec

# 或手动将现有文档放入 docs/raw/ 目录
```

### WikiFlow 会影响现有工作流吗？

不会！WikiFlow 只是增强你的工作流：

- 代码仓库不变
- Git 工作流不变
- 团队协作方式不变

只是增加了文档管理和 AI 辅助能力。

## 获取帮助

遇到问题？

- 查看 [Skills 文档](/skills/)
- 提交 [GitHub Issue](https://github.com/liqunx/wikiflow/issues)
- 加入社区讨论
