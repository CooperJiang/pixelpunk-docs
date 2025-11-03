import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'PixelPunk',
  description: 'AI 智能图床平台 - 赛博朋克风格的新一代图片存储管理系统',
  lang: 'zh-CN',
  
  head: [
    ['meta', { name: 'theme-color', content: '#00ff88' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'og:site_name', content: 'PixelPunk' }],
    ['meta', { name: 'og:image', content: '/og-image.png' }],
    ['meta', { name: 'keywords', content: 'AI图床,智能图片管理,赛博朋克,图片存储,GPT-4 Vision,图床系统' }],
    ['meta', { name: 'author', content: 'PixelPunk Team' }],
    ['link', { rel: 'icon', href: '/favorite.ico' }],
    ['link', { rel: 'shortcut icon', href: '/favorite.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/favorite.ico' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap', rel: 'stylesheet' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap', rel: 'stylesheet' }],
    // 防止主题闪烁的内联脚本
    ['script', {}, `
      (function() {
        const theme = localStorage.getItem('vitepress-theme-appearance') || 'light';
        const isDark = theme === 'dark';
        
        // 设置 data-theme 属性
        document.documentElement.setAttribute('data-theme', theme);
        
        // VitePress 使用 .dark 类名控制主题
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // 确保 localStorage 有默认值
        if (!localStorage.getItem('vitepress-theme-appearance')) {
          localStorage.setItem('vitepress-theme-appearance', 'light');
        }
      })();
    `],
    // 防止搜索框闪烁的内联样式
    ['style', {}, `
      .VPNavBarSearch { display: none !important; }
      .VPNavBarSearch.show { display: flex !important; }
    `],
    // 添加结构化数据
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PixelPunk",
      "description": "AI 智能图床平台，支持 GPT-4 Vision 分析，多云存储，企业级功能",
      "url": "https://pixelpunk.io",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Linux, macOS, Windows",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    })]
  ],

  appearance: 'dark', // 设置默认为深色主题 - 赛博朋克风格
  
  ignoreDeadLinks: true,
  
  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '功能', link: '/features' },
      { 
        text: '文档', 
        items: [
          { text: '快速开始', link: '/docs/getting-started' },
          { text: '安装部署', link: '/docs/installation' },
          { text: 'AI 功能', link: '/docs/ai-features' },
          { text: 'API 文档', link: '/docs/api/overview' }
        ]
      },
      { text: '更新日志', link: '/updates' },
      { text: '演示', link: '/demo' },
      { text: '反馈', link: '/feedback' },
      { text: '下载', link: '/download' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: '开始使用',
          collapsed: false,
          items: [
            { text: '介绍', link: '/docs/introduction' },
            { text: '快速开始', link: '/docs/getting-started' },
            { text: '安装部署', link: '/docs/installation' }
          ]
        },
        {
          text: '功能特性',
          collapsed: false,
          items: [
            { text: 'AI 智能分析', link: '/docs/ai-features' },
            { text: '图片管理', link: '/docs/image-management' },
            { text: '多云存储', link: '/docs/cloud-storage' },
            { text: '分享系统', link: '/docs/sharing' },
            { text: '管理后台', link: '/docs/admin' }
          ]
        },
        {
          text: '配置指南',
          collapsed: true,
          items: [
            { text: '基本配置', link: '/docs/config/basic' },
            { text: '存储配置', link: '/docs/config/storage' },
            { text: 'AI 配置', link: '/docs/config/ai' },
            { text: '邮件配置', link: '/docs/config/email' },
            { text: '安全配置', link: '/docs/config/security' }
          ]
        },
        {
          text: 'API 文档',
          collapsed: true,
          items: [
            { text: 'API 概览', link: '/docs/api/overview' },
            { text: '认证授权', link: '/docs/api/auth' },
            { text: '用户接口', link: '/docs/api/user' },
            { text: '图片接口', link: '/docs/api/image' },
            { text: 'AI 分析', link: '/docs/api/ai' },
            { text: '分享接口', link: '/docs/api/sharing' },
            { text: '管理接口', link: '/docs/api/admin' }
          ]
        },
        {
          text: '开发指南',
          collapsed: true,
          items: [
            { text: '开发环境', link: '/docs/development/environment' },
            { text: '源码结构', link: '/docs/development/structure' },
            { text: '贡献指南', link: '/docs/development/contributing' },
            { text: '插件开发', link: '/docs/development/plugins' }
          ]
        },
        {
          text: '部署运维',
          collapsed: true,
          items: [
            { text: 'Docker 部署', link: '/docs/deployment/docker' },
            { text: '云平台部署', link: '/docs/deployment/cloud' },
            { text: '性能优化', link: '/docs/deployment/optimization' },
            { text: '监控告警', link: '/docs/deployment/monitoring' },
            { text: '备份恢复', link: '/docs/deployment/backup' }
          ]
        },
        {
          text: '故障排除',
          collapsed: true,
          items: [
            { text: '常见问题', link: '/docs/troubleshooting/faq' },
            { text: '错误代码', link: '/docs/troubleshooting/errors' },
            { text: '性能问题', link: '/docs/troubleshooting/performance' },
            { text: '数据恢复', link: '/docs/troubleshooting/recovery' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CooperJiang/PixelPunk' },
    ],

    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2024-present PixelPunk Team'
    // },

    editLink: {
      pattern: 'https://github.com/pixelpunk/website/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  },

  vite: {
    server: {
      port: 5000
    },
    css: {
      postcss: './postcss.config.js'
    },
    optimizeDeps: {
      include: ['gsap']
    }
  },

  sitemap: {
    hostname: 'https://pixelpunk.io'
  },

  cleanUrls: true,

  // 构建配置
  buildEnd: (siteConfig) => {
    // 可以在这里添加构建后的处理逻辑
  },

  // Markdown 配置
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    // 支持 mermaid 图表
    config: (md) => {
      // 可以在这里添加 markdown-it 插件
    }
  },

  // 多语言配置 (未来扩展)
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    }
    // en: {
    //   label: 'English',
    //   lang: 'en-US',
    //   link: '/en/'
    // }
  }
})