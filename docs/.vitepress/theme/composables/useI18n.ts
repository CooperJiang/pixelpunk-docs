import { useData } from 'vitepress'
import { zhCN } from '../../config/i18n/zh-CN'
import { enUS } from '../../config/i18n/en-US'

// 翻译字典
const translations: Record<string, any> = {
  'zh-CN': zhCN,
  'en-US': enUS
}

/**
 * i18n 组合函数
 * 用于在组件中获取翻译文本
 *
 * @example
 * const { t, lang } = useI18n()
 * const text = t('hero.title') // 返回: 'PixelPunk'
 */
export function useI18n() {
  const { lang } = useData()

  /**
   * 翻译函数
   * @param key - 翻译键，支持点号分隔的嵌套路径，如 'hero.title'
   * @returns 翻译后的文本，如果找不到则返回 key 本身
   */
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[lang.value] || translations['zh-CN']

    // 遍历嵌套的键
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        console.warn(`Translation key not found: ${key} for lang: ${lang.value}`)
        return key
      }
    }

    return value || key
  }

  /**
   * 获取当前语言代码
   */
  const currentLang = lang

  return {
    t,
    lang: currentLang
  }
}
