import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'WikiFlow',
  description: '文档驱动的 AI 开发框架',
  lang: 'zh-CN',
  base: '/',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Skills', link: '/skills/' },
      { text: '指南', link: '/guide/getting-started' },
      {
        text: 'GitHub',
        link: 'https://github.com/liqunx/wikiflow'
      }
    ],

    sidebar: {
      '/skills/': [
        {
          text: '初始化',
          items: [
            { text: 'wf-init', link: '/skills/wf-init' }
          ]
        },
        {
          text: '查询',
          items: [
            { text: 'wf-search', link: '/skills/wf-search' }
          ]
        },
        {
          text: '开发',
          items: [
            { text: 'wf-plan', link: '/skills/wf-plan' },
            { text: 'wf-do', link: '/skills/wf-do' },
            { text: 'wf-fix', link: '/skills/wf-fix' },
            { text: 'wf-finish', link: '/skills/wf-finish' }
          ]
        },
        {
          text: '维护',
          items: [
            { text: 'wf-lint', link: '/skills/wf-lint' },
            { text: 'wf-migrate-openspec', link: '/skills/wf-migrate-openspec' },
            { text: 'wf-update', link: '/skills/wf-update' }
          ]
        }
      ],
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '工作流说明', link: '/guide/workflow' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/liqunx/wikiflow' }
    ]
  }
})
