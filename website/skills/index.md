# Skills 总览

WikiFlow 包含 9 个核心技能，覆盖从初始化、查询、开发到维护的完整工作流。

## 初始化

<a href="/skills/wf-init" class="skill-card">
  <h3>wf-init</h3>
  <p>初始化 WikiFlow 项目，创建文档驱动的开发环境</p>
  <code>/wf-init</code>
</a>

## 查询

<a href="/skills/wf-search" class="skill-card">
  <h3>wf-search</h3>
  <p>查询 Wiki 知识库，了解当前系统实现和历史决策</p>
  <code>/wf-search "关键词"</code>
</a>

## 开发

<a href="/skills/wf-plan" class="skill-card">
  <h3>wf-plan</h3>
  <p>制定开发计划，生成 spec.md 和 tasks.md</p>
  <code>/wf-plan "功能描述"</code>
</a>

<a href="/skills/wf-do" class="skill-card">
  <h3>wf-do</h3>
  <p>执行开发计划，按照 tasks.md 逐个完成任务</p>
  <code>/wf-do</code>
</a>

<a href="/skills/wf-fix" class="skill-card">
  <h3>wf-fix</h3>
  <p>修正开发过程中的问题和需求改进</p>
  <code>/wf-fix "问题描述"</code>
</a>

<a href="/skills/wf-finish" class="skill-card">
  <h3>wf-finish</h3>
  <p>完成开发，编译变更到 Wiki 知识库</p>
  <code>/wf-finish</code>
</a>

## 维护

<a href="/skills/wf-lint" class="skill-card">
  <h3>wf-lint</h3>
  <p>检查 Wiki 文档质量，查找错误和矛盾</p>
  <code>/wf-lint</code>
</a>

<a href="/skills/wf-migrate-openspec" class="skill-card">
  <h3>wf-migrate-openspec</h3>
  <p>从 OpenSpec 迁移到 WikiFlow</p>
  <code>/wf-migrate-openspec</code>
</a>

<a href="/skills/wf-update" class="skill-card">
  <h3>wf-update</h3>
  <p>更新 WikiFlow 技能到最新版本</p>
  <code>/wf-update</code>
</a>

## 工作流程

```
wf-init → wf-search → wf-plan → wf-do → wf-finish
                ↓           ↓
             wf-fix ←──────┘
                ↓
             wf-lint
```

## 下一步

- 查看 [快速开始指南](/guide/getting-started)
- 了解 [工作流说明](/guide/workflow)
