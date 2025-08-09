# 极简技术博客

一个基于 Vue 3 的极简技术博客平台，专注于前端技术分享。

## ✨ 特色功能

- 🎨 **极简设计** - 采用极简主义设计理念，专注于内容本身
- 📱 **响应式布局** - 完美适配各种设备，从手机到桌面
- 🌙 **深色模式** - 支持深色/浅色主题切换，保护眼睛
- ⚡ **快速加载** - 基于 Vite 构建，确保极快的加载速度
- 📝 **Markdown 支持** - 完整的 Markdown 渲染支持，代码高亮
- 🔍 **SEO 优化** - 针对搜索引擎优化，提高内容被发现的机会
- 📱 **PWA 支持** - 渐进式 Web 应用，支持离线访问

## 🛠 技术栈

### 前端框架
- **Vue 3** - 渐进式 JavaScript 框架
- **Composition API** - Vue 3 的组合式 API
- **Vue Router 4** - 官方路由管理器
- **Pinia** - Vue 的状态管理库

### 构建工具
- **Vite** - 下一代前端构建工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **PWA** - 渐进式 Web 应用

### 样式与渲染
- **原生 CSS** - 极简的样式方案
- **Marked.js** - Markdown 解析器
- **Highlight.js** - 代码语法高亮
- **CSS Grid** - 现代布局系统

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

### 代码格式化

```bash
npm run format
```

## 📁 项目结构

```
minimal-tech-blog/
├── public/                 # 静态资源
│   ├── favicon.ico        # 网站图标
│   ├── index.html         # HTML 模板
│   └── manifest.json      # PWA 清单文件
├── src/                   # 源代码
│   ├── components/        # Vue 组件
│   │   ├── Navigation.vue # 导航组件
│   │   └── MarkdownRenderer.vue # Markdown 渲染组件
│   ├── views/             # 页面视图
│   │   ├── Home.vue       # 首页
│   │   ├── Post.vue       # 文章详情页
│   │   └── About.vue      # 关于页面
│   ├── stores/            # Pinia 状态管理
│   │   └── blog.js        # 博客状态
│   ├── router/            # 路由配置
│   │   └── index.js       # 路由定义
│   ├── App.vue            # 根组件
│   └── main.js            # 应用入口
├── .eslintrc.js           # ESLint 配置
├── .prettierrc            # Prettier 配置
├── vite.config.js         # Vite 配置
├── package.json           # 项目依赖
└── README.md              # 项目说明
```

## 🎨 设计理念

### 极简至上
我们相信最好的设计是看不见的设计。通过去除不必要的元素，让用户专注于内容本身，创造更好的阅读体验。

### 性能优先
在保证功能完整的前提下，我们始终将性能放在首位。快速的加载速度和流畅的交互体验是我们的核心追求。

### 用户体验
从用户的角度思考每一个细节，包括深色模式、响应式设计、无障碍访问等，确保每个用户都能获得最佳体验。

## 📝 使用说明

### 添加新文章

在 `src/stores/blog.js` 中的 `posts` 数组中添加新的文章对象：

```javascript
{
  id: 4,
  title: '文章标题',
  slug: 'article-slug',
  excerpt: '文章摘要...',
  content: `# Markdown 内容

这里是文章的 Markdown 内容...`,
  tags: ['标签1', '标签2'],
  date: '2024-01-20',
  readTime: 10
}
```

### 自定义样式

项目使用原生 CSS，所有样式都在各个组件的 `<style>` 标签中定义。你可以根据需要修改颜色、字体、布局等。

### 部署

构建完成后，将 `dist` 目录部署到任何静态文件服务器即可。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 开源协议

本项目采用 MIT 开源协议 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue 的状态管理库
- [Marked.js](https://marked.js.org/) - Markdown 解析器
- [Highlight.js](https://highlightjs.org/) - 代码语法高亮

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 邮箱：your-email@example.com
- GitHub：[your-username](https://github.com/your-username)

---

⭐️ 如果这个项目对您有帮助，请给个 Star 支持一下！
