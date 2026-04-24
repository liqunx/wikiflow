# WikiFlow Website

WikiFlow 官方网站，使用 VitePress 构建。

## 开发

```bash
# 安装依赖
cd website
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 项目结构

```
website/
├── .vitepress/
│   ├── config.ts       # VitePress 配置
│   └── theme/          # 自定义主题
│       ├── custom.css  # 自定义样式
│       └── index.ts    # 主题入口
├── index.md            # 首页
├── skills/             # Skills 文档
├── guide/              # 指南文档
└── public/             # 静态资源
```

## 部署

网站使用 GitHub Pages 自动部署：

- 推送到 `main` 分支时自动触发构建
- 构建产物自动部署到 GitHub Pages
- 访问地址：`https://liqunx.github.io/wikiflow/`

## 设计风格

网站设计参考 [Ollama](https://ollama.com/)：

- 极简黑白配色
- 大标题 Hero section
- 代码示例展示
- 卡片式布局
- 响应式设计

## 贡献

欢迎贡献内容和建议！

1. Fork 本仓库
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可

与 WikiFlow 主项目保持一致。
