import { defineConfig } from 'vitepress'
import { shared } from './config/shared'
import { zh } from './config/zh'
import { en } from './config/en'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,

  // 多语言配置
  locales: {
    // 中文作为根路径
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      ...zh
    },
    // 英文在 /en/ 路径下
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      ...en
    }
  }
})
