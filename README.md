# PixelPunk 官方网站

PixelPunk AI 智能图床平台的官方网站，基于 VitePress 构建，采用赛博朋克风格设计。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建网站

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
website/
├── docs/                          # 文档和页面内容
│   ├── .vitepress/                # VitePress 配置
│   │   ├── config.ts             # 主配置文件
│   │   └── theme/                # 自定义主题
│   │       ├── index.ts          # 主题入口
│   │       ├── Layout.vue        # 布局组件
│   │       ├── style.css         # 基础样式
│   │       ├── cyber.css         # 赛博朋克样式
│   │       └── components/       # 自定义组件
│   │           ├── Hero.vue      # 首页英雄区
│   │           ├── Features.vue  # 功能特性
│   │           ├── ProductDemo.vue # 产品演示
│   │           ├── Stats.vue     # 统计数据
│   │           └── Testimonials.vue # 用户评价
│   ├── index.md                  # 首页
│   ├── product.md                # 产品介绍
│   ├── demo.md                   # 在线演示
│   ├── download.md               # 下载页面
│   └── docs/                     # 文档目录
│       ├── introduction.md       # 项目介绍
│       ├── getting-started.md    # 快速开始
│       └── ...                   # 其他文档
├── tailwind.config.js            # Tailwind CSS 配置
├── postcss.config.js             # PostCSS 配置
└── package.json                  # 项目配置
```

## 🎨 技术栈

- **框架**: VitePress
- **样式**: Tailwind CSS + 自定义 CSS
- **动画**: GSAP
- **图标**: SVG + Emoji
- **字体**: Inter + JetBrains Mono
- **主题**: 赛博朋克风格

## 🎯 功能特性

### 🌟 视觉设计
- 赛博朋克风格主题
- 霓虹灯光效果
- 矩阵雨背景
- 故障艺术效果
- 全息投影样式

### ⚡ 动画效果
- GSAP 驱动的流畅动画
- 滚动触发动画
- 页面转场效果
- 交互式 UI 元素
- 响应式动画优化

### 📱 响应式设计
- 移动端优化
- 平板适配
- 桌面端完整体验
- 触控友好交互
- 性能优化

### 🔧 开发体验
- TypeScript 支持
- 组件化开发
- 热重载开发
- SEO 优化
- 静态站点生成

## 🎨 主题定制

### 颜色系统

```css
:root {
  /* 主色调 */
  --cyber-primary: #00ff88;      /* 赛博绿 */
  --cyber-secondary: #ff0080;    /* 赛博粉 */
  --cyber-accent: #00d4ff;       /* 赛博蓝 */
  
  /* 背景色 */
  --cyber-dark: #0a0a0a;         /* 主背景 */
  --cyber-dark-secondary: #1a1a1a; /* 次背景 */
  --cyber-dark-tertiary: #2a2a2a;  /* 三级背景 */
  
  /* 霓虹色 */
  --cyber-neon-green: #39ff14;   /* 霓虹绿 */
  --cyber-neon-pink: #ff1493;    /* 霓虹粉 */
  --cyber-neon-blue: #00bfff;    /* 霓虹蓝 */
  --cyber-neon-purple: #bf00ff;  /* 霓虹紫 */
}
```

### 动画效果

- `glow`: 发光效果
- `pulse-slow`: 慢速脉冲
- `float`: 浮动效果
- `slide-up/down`: 滑动进入
- `fade-in`: 淡入效果
- `matrix`: 矩阵雨效果

### 组件样式

- `.btn`: 按钮基础样式
- `.card`: 卡片容器
- `.neon-border`: 霓虹边框
- `.glitch`: 故障效果
- `.hologram`: 全息投影
- `.terminal`: 终端样式

## 📝 内容编辑

### 页面结构

每个页面都包含 frontmatter 配置：

```yaml
---
layout: page
title: 页面标题
description: 页面描述
---
```

### 组件使用

在 Markdown 中可以直接使用 Vue 组件：

```vue
<Hero />
<Features />
<ProductDemo />
<Stats />
<Testimonials />
```

### 自定义样式

使用 `<style scoped>` 为页面添加自定义样式：

```vue
<style scoped>
.custom-section {
  @apply bg-cyber-dark-secondary rounded-xl p-8;
}
</style>
```

## 🛠️ 开发指南

### 添加新页面

1. 在 `docs/` 目录下创建 `.md` 文件
2. 添加 frontmatter 配置
3. 在 `config.ts` 中添加导航配置

### 创建新组件

1. 在 `docs/.vitepress/theme/components/` 下创建 `.vue` 文件
2. 在 `theme/index.ts` 中注册组件
3. 在页面中使用组件

### 自定义样式

1. 在 `style.css` 中添加全局样式
2. 在 `cyber.css` 中添加主题相关样式
3. 使用 Tailwind CSS 工具类

### 动画效果

使用 GSAP 添加动画：

```javascript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 滚动触发动画
ScrollTrigger.create({
  trigger: '.element',
  start: 'top 80%',
  onEnter: () => {
    gsap.to('.element', {
      opacity: 1,
      y: 0,
      duration: 0.8
    })
  }
})
```

## 📦 部署

### 自动部署

推送到 main 分支会自动触发 GitHub Actions 部署到 GitHub Pages。

### 手动部署

```bash
# 构建项目
npm run build

# 部署到服务器
# 将 docs/.vitepress/dist 目录部署到 Web 服务器
```

### Docker 部署

```dockerfile
FROM nginx:alpine
COPY docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🤝 贡献指南

### 开发流程

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/new-feature`
3. 提交更改: `git commit -am 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 提交 Pull Request

### 代码规范

- 使用 TypeScript
- 遵循 Vue 3 Composition API
- 使用 Tailwind CSS 工具类
- 保持组件简洁和可复用
- 添加适当的注释

### 提交规范

- feat: 新功能
- fix: 修复问题
- docs: 文档更新
- style: 样式调整
- refactor: 代码重构
- test: 测试相关
- chore: 其他更改

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🔗 相关链接

- [PixelPunk 主项目](https://github.com/CooperJiang/PixelPunk)
- [在线演示](https://v1.pixelpunk.cc/)
- [官方网站](https://pixelpunk.cc)
- [QQ群 (826708512)](https://qm.qq.com/cgi-bin/qm/qr?k=826708512)