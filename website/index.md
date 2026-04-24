---
layout: home
hero:
  name: WikiFlow
  text: 文档驱动的 AI 开发框架
  tagline: 让 AI 更懂你的项目，让开发更高效
  image:
    src: /logo.svg
    alt: WikiFlow

features:
  - title: 文档先行
    details: 强制先写文档再开发，确保思路清晰、设计完整。深度集成 Claude AI，自动提取 Wiki 知识。
    link: /guide/workflow
    linkText: 了解工作流 →
  - title: AI 协作
    details: 深度集成 Claude，自动提取 Wiki 知识，让 AI 更懂你的项目。智能任务分解，自动执行开发。
    link: /skills/wf-search
    linkText: 查看 Skills →
  - title: 版本管理
    details: 自动记录决策历史，支持版本回溯。每个变更都有据可查，历史版本完整保留。
    link: /guide/workflow
    linkText: 了解更多 →
  - title: 团队协作
    details: 文档代码分离，支持多仓库管理。环境变量配置，团队协作无冲突。
    link: /skills/wf-init
    linkText: 开始使用 →
---

<style>
:root {
  --vp-c-brand-1: #000;
  --vp-c-brand-2: #404040;
  --vp-c-brand-3: #737373;
}

/* VPHero 样式 */
.VPHero {
  padding: 7rem 1.5rem 5rem !important;
  text-align: center !important;
}

.VPHero h1 {
  font-size: 2.25rem !important;
  font-weight: 500 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.02em !important;
}

.VPHero p {
  font-size: 1.125rem !important;
  color: #737373 !important;
}

.VPHero .image {
  width: 18rem !important;
  height: 18rem !important;
  margin-bottom: 1.5rem !important;
}

/* 隐藏默认的 actions 区域 */
.VPHero .actions {
  display: none !important;
}

/* 自定义安装命令区域 */
.install-command {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem auto 2rem;
  max-width: 36rem;
}

.install-command-box {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e5e5;
  border-radius: 0.75rem;
  overflow: hidden;
  width: 100%;
}

.install-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.install-copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-left: 1px solid #e5e5e5;
  cursor: pointer;
  transition: background 0.2s;
}

.install-copy-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.install-copy-btn svg {
  width: 1rem;
  height: 1rem;
  color: #737373;
}

.install-hint {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #737373;
  text-align: center;
}

.install-hint a {
  color: #737373;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.install-hint a:hover {
  color: #000;
}

/* VPFeatures 样式 */
.VPFeatures {
  padding: 5rem 1.5rem !important;
}

.VPFeature {
  border: 1px solid #e5e5e5 !important;
  border-radius: 1rem !important;
  padding: 2rem !important;
  background: #fff !important;
  margin-bottom: 1rem !important;
}

.VPFeature:hover {
  border-color: #000 !important;
}

.VPFeature h3 {
  font-size: 1.5rem !important;
  font-weight: 500 !important;
  color: #000 !important;
  margin-bottom: 0.75rem !important;
}

.VPFeature p {
  font-size: 1rem !important;
  color: #404040 !important;
  line-height: 1.6 !important;
}

.VPFeature .link-text {
  color: #737373 !important;
  font-size: 0.875rem !important;
  margin-top: 1rem !important;
  display: inline-block !important;
}

/* 移动端样式 */
@media (max-width: 768px) {
  .VPHero h1 {
    font-size: 2.25rem !important;
  }

  .VPHero .image {
    width: 14rem !important;
    height: 14rem !important;
  }

  .install-input {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }

  .install-copy-btn {
    padding: 0.5rem 0.75rem;
  }
}
</style>

<div class="install-command">
  <div class="install-command-box">
    <code class="install-input">安装skill：https://liqunx.github.io/wikiflow/install.md</code>
    <button class="install-copy-btn" title="复制命令">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
    </button>
  </div>
</div>
<p class="install-hint">复制以上命令，粘贴到 AI 对话框中发送即可。一键安装包含所有核心技能。</p>

<script>
document.addEventListener('DOMContentLoaded', () => {
  // 将安装命令框移动到 VPHero 的 tagline 下方
  const installCommand = document.querySelector('.install-command');
  const installHint = document.querySelector('.install-hint');
  const vphero = document.querySelector('.VPHero');

  if (installCommand && installHint && vphero) {
    // 在 VPHero 中找到 tagline 元素
    const tagline = vphero.querySelector('.tagline');
    if (tagline) {
      // 将安装命令框插入到 tagline 之后
      tagline.after(installCommand);
      tagline.after(installHint);
    }
  }

  // 复制按钮功能
  const copyBtn = document.querySelector('.install-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('安装skill：https://liqunx.github.io/wikiflow/install.md');
        copyBtn.style.background = 'rgba(0, 0, 0, 0.1)';
        setTimeout(() => {
          copyBtn.style.background = 'transparent';
        }, 200);
      } catch (err) {
        console.error('复制失败:', err);
      }
    });
  }
});
</script>
