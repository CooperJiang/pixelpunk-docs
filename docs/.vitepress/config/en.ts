import { defineConfig, type DefaultTheme } from 'vitepress'

// 英文特定配置 (English-specific configuration)
// TODO: 待翻译和完善内容
export const en = defineConfig({
  lang: 'en-US',
  description: 'AI-Powered Image Hosting Platform - Next-Gen Image Storage with Cyberpunk Style',

  themeConfig: {
    // Navigation
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Features', link: '/en/features' },
      {
        text: 'Documentation',
        items: [
          { text: 'Getting Started', link: '/en/docs/getting-started' },
          { text: 'Installation', link: '/en/docs/installation' },
          { text: 'AI Features', link: '/en/docs/ai-features' },
          { text: 'API Docs', link: '/en/docs/api/overview' }
        ]
      },
      { text: 'Updates', link: '/en/updates' },
      { text: 'Demo', link: '/en/demo' },
      { text: 'Feedback', link: '/en/feedback' },
      { text: 'Download', link: '/en/download' }
    ],

    // Sidebar
    sidebar: {
      '/en/docs/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/en/docs/introduction' },
            { text: 'Quick Start', link: '/en/docs/getting-started' },
            { text: 'Installation', link: '/en/docs/installation' }
          ]
        },
        {
          text: 'Features',
          collapsed: false,
          items: [
            { text: 'AI Analysis', link: '/en/docs/ai-features' },
            { text: 'Image Management', link: '/en/docs/image-management' },
            { text: 'Cloud Storage', link: '/en/docs/cloud-storage' },
            { text: 'Sharing System', link: '/en/docs/sharing' },
            { text: 'Admin Panel', link: '/en/docs/admin' }
          ]
        },
        {
          text: 'Configuration',
          collapsed: true,
          items: [
            { text: 'Basic Config', link: '/en/docs/config/basic' },
            { text: 'Storage Config', link: '/en/docs/config/storage' },
            { text: 'AI Config', link: '/en/docs/config/ai' },
            { text: 'Email Config', link: '/en/docs/config/email' },
            { text: 'Security Config', link: '/en/docs/config/security' }
          ]
        },
        {
          text: 'API Documentation',
          collapsed: true,
          items: [
            { text: 'API Overview', link: '/en/docs/api/overview' },
            { text: 'Authentication', link: '/en/docs/api/auth' },
            { text: 'User API', link: '/en/docs/api/user' },
            { text: 'Image API', link: '/en/docs/api/image' },
            { text: 'AI API', link: '/en/docs/api/ai' },
            { text: 'Sharing API', link: '/en/docs/api/sharing' },
            { text: 'Admin API', link: '/en/docs/api/admin' }
          ]
        },
        {
          text: 'Development',
          collapsed: true,
          items: [
            { text: 'Environment', link: '/en/docs/development/environment' },
            { text: 'Structure', link: '/en/docs/development/structure' },
            { text: 'Contributing', link: '/en/docs/development/contributing' }
          ]
        },
        {
          text: 'Deployment',
          collapsed: true,
          items: [
            { text: 'Docker Deploy', link: '/en/docs/deployment/docker' },
            { text: 'Cloud Deploy', link: '/en/docs/deployment/cloud' },
            { text: 'Optimization', link: '/en/docs/deployment/optimization' },
            { text: 'Monitoring', link: '/en/docs/deployment/monitoring' },
            { text: 'Backup', link: '/en/docs/deployment/backup' }
          ]
        },
        {
          text: 'Troubleshooting',
          collapsed: true,
          items: [
            { text: 'FAQ', link: '/en/docs/troubleshooting/faq' },
            { text: 'Recovery', link: '/en/docs/troubleshooting/recovery' }
          ]
        }
      ]
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/pixelpunk/website/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // Last updated
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // Doc footer
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },

    // Outline
    outline: {
      label: 'On this page'
    },

    // Other text
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',

    // Search
    search: {
      provider: 'local',
      options: {
        locales: {
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear search',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate'
                }
              }
            }
          }
        }
      }
    }
  }
})
