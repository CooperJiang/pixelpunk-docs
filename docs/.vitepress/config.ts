import { defineConfig } from 'vitepress'
import { shared } from './config/shared'
import { zh } from './config/zh'
import { en } from './config/en'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,

  // 多语言配置 - 暂时隐藏，等英文文档完成后再启用
  // locales: {
  //   // 中文作为根路径
  //   root: {
  //     label: '简体中文',
  //     lang: 'zh-CN',
  //     ...zh
  //   },
  //   // 英文在 /en/ 路径下
  //   en: {
  //     label: 'English',
  //     lang: 'en-US',
  //     link: '/en/',
  //     ...en
  //   }
  // }

  // 临时使用单语言配置（仅中文）
  ...zh
})
