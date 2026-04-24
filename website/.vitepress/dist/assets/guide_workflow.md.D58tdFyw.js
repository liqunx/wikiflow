import{_ as a,o as n,c as i,ag as p}from"./chunks/framework.CAXxHpAX.js";const r=JSON.parse('{"title":"工作流说明","description":"","frontmatter":{},"headers":[],"relativePath":"guide/workflow.md","filePath":"guide/workflow.md"}'),l={name:"guide/workflow.md"};function e(t,s,h,c,k,d){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="工作流说明" tabindex="-1">工作流说明 <a class="header-anchor" href="#工作流说明" aria-label="Permalink to &quot;工作流说明&quot;">​</a></h1><p>WikiFlow 的工作流围绕&quot;文档先行&quot;的理念设计，确保每次开发都有清晰的规划和完整的记录。</p><h2 id="完整工作流" tabindex="-1">完整工作流 <a class="header-anchor" href="#完整工作流" aria-label="Permalink to &quot;完整工作流&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        开发前准备                            │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                    ┌───────▼───────┐</span></span>
<span class="line"><span>                    │   wf-search   │ ← 查询现有文档，了解背景</span></span>
<span class="line"><span>                    └───────┬───────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                    ┌───────▼───────┐</span></span>
<span class="line"><span>                    │    wf-plan    │ ← 制定开发计划</span></span>
<span class="line"><span>                    └───────┬───────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            ▼</span></span>
<span class="line"><span>                    ┌───────────────┐</span></span>
<span class="line"><span>                    │  生成 spec.md  │ ← 技术方案</span></span>
<span class="line"><span>                    │ 生成 tasks.md  │ ← 任务清单</span></span>
<span class="line"><span>                    └───────┬───────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>┌───────────────────────────▼───────────────────────────────────┐</span></span>
<span class="line"><span>│                        开发执行                                │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                    ┌───────▼───────┐</span></span>
<span class="line"><span>                    │     wf-do     │ ← 逐个执行任务</span></span>
<span class="line"><span>                    └───────┬───────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                    ┌───────▼───────┐</span></span>
<span class="line"><span>                    │    发现问题？  │</span></span>
<span class="line"><span>                    └───────┬───────┘</span></span>
<span class="line"><span>                     是      │    否</span></span>
<span class="line"><span>                   ┌─▼──┐    │    │</span></span>
<span class="line"><span>                   │wf-fix│   │    │</span></span>
<span class="line"><span>                   └─┬──┘   │    │</span></span>
<span class="line"><span>                     └──────┼────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                    ┌───────▼───────┐</span></span>
<span class="line"><span>                    │  所有任务完成？│</span></span>
<span class="line"><span>                    └───────┬───────┘</span></span>
<span class="line"><span>                            │ 是</span></span>
<span class="line"><span>┌───────────────────────────▼───────────────────────────────────┐</span></span>
<span class="line"><span>│                        完成变更                                │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                    ┌───────▼───────┐</span></span>
<span class="line"><span>                    │   wf-finish   │ ← 编译到 Wiki</span></span>
<span class="line"><span>                    └───────┬───────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                    ┌───────▼───────┐</span></span>
<span class="line"><span>                    │  更新 Wiki    │</span></span>
<span class="line"><span>                    │  - current/   │ ← 当前实现</span></span>
<span class="line"><span>                    │  - history/   │ ← 历史版本</span></span>
<span class="line"><span>                    │  - decisions/ │ ← 决策日志</span></span>
<span class="line"><span>                    │  - index.md   │ ← 主索引</span></span>
<span class="line"><span>                    │  - log.md     │ ← 变更日志</span></span>
<span class="line"><span>                    └───────┬───────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                    ┌───────▼───────┐</span></span>
<span class="line"><span>                    │   归档变更    │ ← active → archive</span></span>
<span class="line"><span>                    └───────────────┘</span></span></code></pre></div><h2 id="各阶段详解" tabindex="-1">各阶段详解 <a class="header-anchor" href="#各阶段详解" aria-label="Permalink to &quot;各阶段详解&quot;">​</a></h2><h3 id="_1-开发前准备" tabindex="-1">1. 开发前准备 <a class="header-anchor" href="#_1-开发前准备" aria-label="Permalink to &quot;1. 开发前准备&quot;">​</a></h3><p><strong>目标</strong>：确保开发前充分了解背景</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤 1：查询现有文档</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-search</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;用户认证&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤 2：制定开发计划</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-plan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;添加注册功能&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤 3：确认方案</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># WikiFlow 会生成 spec.md，确认技术方案</span></span></code></pre></div><p><strong>产出</strong>：</p><ul><li><code>docs/changes/active/{slug}/spec.md</code> - 技术方案</li><li><code>docs/changes/active/{slug}/tasks.md</code> - 任务清单</li></ul><h3 id="_2-开发执行" tabindex="-1">2. 开发执行 <a class="header-anchor" href="#_2-开发执行" aria-label="Permalink to &quot;2. 开发执行&quot;">​</a></h3><p><strong>目标</strong>：按计划执行任务</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 开始执行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-do</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># WikiFlow 会：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># - 逐个执行 tasks.md 中的任务</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># - 实时更新任务状态</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># - 显示开发进度</span></span></code></pre></div><p><strong>遇到问题时</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用 wf-fix 修正</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-fix</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;注册成功后应该自动登录&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># WikiFlow 会：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># - 更新 spec.md</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># - 添加新任务到 tasks.md</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># - 记录决策日志</span></span></code></pre></div><p><strong>产出</strong>：</p><ul><li>完成的代码变更</li><li>更新的 tasks.md（标记已完成）</li></ul><h3 id="_3-完成变更" tabindex="-1">3. 完成变更 <a class="header-anchor" href="#_3-完成变更" aria-label="Permalink to &quot;3. 完成变更&quot;">​</a></h3><p><strong>目标</strong>：将变更同步到 Wiki</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 完成开发</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-finish</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># WikiFlow 会：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># - 检查文档质量（lint）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># - 更新 Wiki 知识库</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># - 归档 active 变更</span></span></code></pre></div><p><strong>产出</strong>：</p><ul><li><code>docs/wiki/current/</code> - 更新或新增文档</li><li><code>docs/wiki/history/</code> - 旧版本归档</li><li><code>docs/wiki/decisions/</code> - 决策记录</li><li><code>docs/changes/archive/</code> - 已归档的变更</li></ul><h2 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践&quot;">​</a></h2><h3 id="_1-文档先行的价值" tabindex="-1">1. 文档先行的价值 <a class="header-anchor" href="#_1-文档先行的价值" aria-label="Permalink to &quot;1. 文档先行的价值&quot;">​</a></h3><p><strong>为什么先写文档？</strong></p><ul><li>✅ <strong>思路清晰</strong>：写文档的过程就是梳理思路的过程</li><li>✅ <strong>设计完整</strong>：提前发现问题和边界情况</li><li>✅ <strong>沟通顺畅</strong>：团队成员可以提前review</li><li>✅ <strong>有据可查</strong>：后续维护时可以了解设计初衷</li></ul><h3 id="_2-小步快跑" tabindex="-1">2. 小步快跑 <a class="header-anchor" href="#_2-小步快跑" aria-label="Permalink to &quot;2. 小步快跑&quot;">​</a></h3><p><strong>推荐做法</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ✅ 推荐：小功能独立开发</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-plan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;添加注册功能&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-do</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-finish</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-plan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;添加密码重置功能&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-do</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-finish</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ❌ 不推荐：一次开发太多功能</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-plan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;重构整个认证系统&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 太大，难以review</span></span></code></pre></div><h3 id="_3-保持同步" tabindex="-1">3. 保持同步 <a class="header-anchor" href="#_3-保持同步" aria-label="Permalink to &quot;3. 保持同步&quot;">​</a></h3><p><strong>开发过程中</strong>：</p><ul><li>✅ 每完成一个任务，立即更新 tasks.md</li><li>✅ 发现设计问题，立即用 wf-fix 修正</li><li>✅ 不要拖延 wf-finish，及时同步到 Wiki</li></ul><h3 id="_4-定期维护" tabindex="-1">4. 定期维护 <a class="header-anchor" href="#_4-定期维护" aria-label="Permalink to &quot;4. 定期维护&quot;">​</a></h3><p><strong>建议频率</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 每周检查一次文档质量</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-lint</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 每月更新一次 WikiFlow</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/wf-update</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 每个 Sprint 结束后，review 变更记录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs/wiki/log.md</span></span></code></pre></div><h2 id="常见场景" tabindex="-1">常见场景 <a class="header-anchor" href="#常见场景" aria-label="Permalink to &quot;常见场景&quot;">​</a></h2><h3 id="场景-1-新功能开发" tabindex="-1">场景 1：新功能开发 <a class="header-anchor" href="#场景-1-新功能开发" aria-label="Permalink to &quot;场景 1：新功能开发&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-search</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;相关功能&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # 了解背景</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-plan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;新功能&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          # 制定计划</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-do</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                     # 执行开发</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-finish</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                 # 完成变更</span></span></code></pre></div><h3 id="场景-2-bug-修复" tabindex="-1">场景 2：Bug 修复 <a class="header-anchor" href="#场景-2-bug-修复" aria-label="Permalink to &quot;场景 2：Bug 修复&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-plan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;修复 XXX bug&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 制定修复计划</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-do</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                     # 执行修复</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-finish</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                 # 更新文档</span></span></code></pre></div><h3 id="场景-3-需求改进" tabindex="-1">场景 3：需求改进 <a class="header-anchor" href="#场景-3-需求改进" aria-label="Permalink to &quot;场景 3：需求改进&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-plan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;优化 XXX 流程&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # 制定改进计划</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-do</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                     # 执行改进</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-finish</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                 # 归档旧版本</span></span></code></pre></div><h3 id="场景-4-发现新问题" tabindex="-1">场景 4：发现新问题 <a class="header-anchor" href="#场景-4-发现新问题" aria-label="Permalink to &quot;场景 4：发现新问题&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-do</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                     # 开发中</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-fix</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;发现新问题&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # 修正计划</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-do</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                     # 继续执行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wf-finish</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                 # 完成变更</span></span></code></pre></div><h2 id="工作流图解" tabindex="-1">工作流图解 <a class="header-anchor" href="#工作流图解" aria-label="Permalink to &quot;工作流图解&quot;">​</a></h2><h3 id="文档流转" tabindex="-1">文档流转 <a class="header-anchor" href="#文档流转" aria-label="Permalink to &quot;文档流转&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>raw/ (原始文档)</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>  整理到 Wiki</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>current/ (当前实现) ← 开发时查询这里</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>  发生变更</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>history/ (历史版本) ← 旧版本归档到这里</span></span></code></pre></div><h3 id="变更管理" tabindex="-1">变更管理 <a class="header-anchor" href="#变更管理" aria-label="Permalink to &quot;变更管理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>changes/active/ (开发中)</span></span>
<span class="line"><span>  ↓ wf-finish</span></span>
<span class="line"><span>changes/archive/ (已归档)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>同时生成：</span></span>
<span class="line"><span>  - wiki/current/ (更新)</span></span>
<span class="line"><span>  - wiki/history/ (归档)</span></span>
<span class="line"><span>  - wiki/decisions/ (决策)</span></span></code></pre></div><h2 id="下一步" tabindex="-1">下一步 <a class="header-anchor" href="#下一步" aria-label="Permalink to &quot;下一步&quot;">​</a></h2><ul><li>开始你的第一个功能：<code>/wf-plan &quot;功能描述&quot;</code></li><li>查看 <a href="/skills/">Skills 文档</a> 了解更多细节</li><li>了解如何 <a href="/skills/wf-migrate-openspec.html">迁移现有项目</a></li></ul>`,51)])])}const g=a(l,[["render",e]]);export{r as __pageData,g as default};
