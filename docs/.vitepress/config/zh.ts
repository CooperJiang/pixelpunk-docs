import { defineConfig, type DefaultTheme } from 'vitepress'

// 中文特定配置
export const zh = defineConfig({
  lang: 'zh-CN',
  description: 'AI 智能图床平台 - 赛博朋克风格的新一代图片存储管理系统',

  themeConfig: {
    // Logo 和社交链接
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CooperJiang/PixelPunk' }
    ],

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '功能', link: '/features' },
      {
        text: '文档',
        items: [
          { text: '快速开始', link: '/docs/getting-started' },
          { text: '安装部署', link: '/docs/deployment/docker' },
          { text: '配置指南', link: '/docs/config/basic' },
          { text: '开放 API', link: '/docs/api/upload' }
        ]
      },
      { text: '更新日志', link: '/changelog' },
      { text: '演示', link: '/demo' },
      { text: '反馈', link: '/feedback' },
      { text: '下载', link: '/download' }
    ],

    // 侧边栏
    sidebar: {
      '/docs/': [
        {
          text: '开始使用',
          collapsed: false,
          items: [
            { text: '介绍', link: '/docs/introduction' },
            { text: '快速开始', link: '/docs/getting-started' }
          ]
        },
        {
          text: '部署文档',
          collapsed: false,
          items: [
            { text: 'Docker 部署', link: '/docs/deployment/docker' },
            { text: '脚本部署', link: '/docs/deployment/script' },
            { text: '手动部署', link: '/docs/deployment/manual' }
          ]
        },
        {
          text: '配置指南',
          collapsed: false,
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
            { text: '开放上传', link: '/docs/api/upload' },
            { text: '随机图片', link: '/docs/api/random' }
          ]
        },
        {
          text: '开发指南',
          collapsed: true,
          items: [
            { text: '开发环境', link: '/docs/development/environment' },
            { text: '源码结构', link: '/docs/development/structure' },
            { text: '贡献指南', link: '/docs/development/contributing' }
          ]
        },
        {
          text: '故障排除',
          collapsed: true,
          items: [
            { text: '常见问题', link: '/docs/troubleshooting/faq' },
            { text: '数据恢复', link: '/docs/troubleshooting/recovery' }
          ]
        }
      ]
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/pixelpunk/website/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲
    outline: {
      label: '页面导航'
    },

    // 其他文本
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
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
  }
})
