import { defineConfig } from 'vitepress'

// 所有语言共享的配置
export const shared = defineConfig({
  title: 'PixelPunk',

  appearance: 'dark', // 赛博朋克风格默认深色主题

  ignoreDeadLinks: true,

  head: [
    ['meta', { name: 'theme-color', content: '#00ff88' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:site_name', content: 'PixelPunk' }],
    ['meta', { name: 'og:image', content: '/og-image.png' }],
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
        const theme = localStorage.getItem('vitepress-theme-appearance') || 'dark';
        const isDark = theme === 'dark';

        document.documentElement.setAttribute('data-theme', theme);

        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        if (!localStorage.getItem('vitepress-theme-appearance')) {
          localStorage.setItem('vitepress-theme-appearance', 'dark');
        }
      })();
    `],

    // 防止搜索框闪烁的内联样式
    ['style', {}, `
      .VPNavBarSearch { display: none !important; }
      .VPNavBarSearch.show { display: flex !important; }
    `],

    // 结构化数据
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

  themeConfig: {
    logo: '/logo.png',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CooperJiang/PixelPunk' },
    ],
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

  // Markdown 配置
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    config: (md) => {
      // 可以在这里添加 markdown-it 插件
    }
  }
})
