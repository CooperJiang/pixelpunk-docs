<template>
  <div class="language-switcher" v-click-outside="closeMenu">
    <button
      class="lang-btn"
      @click="toggleMenu"
      :aria-label="t('language.select')"
    >
      <span class="lang-icon">🌐</span>
      <span class="lang-text">{{ currentLocale.label }}</span>
      <span class="arrow" :class="{ 'rotate': showMenu }">▼</span>
    </button>

    <transition name="slide-fade">
      <div v-if="showMenu" class="lang-menu">
        <a
          v-for="locale in locales"
          :key="locale.lang"
          :href="locale.link"
          class="lang-item"
          :class="{ active: locale.lang === lang }"
          @click="handleLanguageChange(locale)"
        >
          <span class="lang-flag">{{ locale.flag }}</span>
          <span class="lang-label">{{ locale.label }}</span>
          <span v-if="locale.lang === lang" class="check-icon">✓</span>
        </a>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData, useRouter } from 'vitepress'
import { useI18n } from '../composables/useI18n'

const { lang } = useData()
const { t } = useI18n()
const router = useRouter()

const showMenu = ref(false)

// 语言配置
const locales = [
  {
    lang: 'zh-CN',
    label: '简体中文',
    flag: '🇨🇳',
    link: '/'
  },
  {
    lang: 'en-US',
    label: 'English',
    flag: '🇺🇸',
    link: '/en/'
  }
]

// 当前语言
const currentLocale = computed(() => {
  return locales.find(l => l.lang === lang.value) || locales[0]
})

// 切换菜单
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// 关闭菜单
const closeMenu = () => {
  showMenu.value = false
}

// 处理语言切换
const handleLanguageChange = (locale: typeof locales[0]) => {
  if (locale.lang === lang.value) {
    showMenu.value = false
    return
  }

  // VitePress 会自动处理语言切换
  showMenu.value = false
}

// 点击外部关闭菜单的指令
const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', (el as any).clickOutsideEvent)
  }
}
</script>

<style scoped>
.language-switcher {
  position: relative;
  z-index: 100;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--cyber-primary, #00ff88);
  border-radius: 0.5rem;
  color: var(--cyber-primary, #00ff88);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.lang-btn:hover {
  background: var(--cyber-primary, #00ff88);
  color: var(--cyber-dark, #0a0a0a);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  transform: translateY(-2px);
}

.lang-btn:active {
  transform: translateY(0);
}

.lang-icon {
  font-size: 1.125rem;
  line-height: 1;
}

.lang-text {
  font-family: 'Inter', sans-serif;
}

.arrow {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
  line-height: 1;
}

.arrow.rotate {
  transform: rotate(180deg);
}

.lang-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 180px;
  background: var(--cyber-dark-secondary, #1a1a1a);
  border: 1px solid var(--cyber-primary, #00ff88);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(0, 255, 136, 0.2);
}

.lang-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: var(--cyber-primary, #00ff88);
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.lang-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--cyber-primary, #00ff88);
  opacity: 0.1;
  transition: width 0.3s ease;
}

.lang-item:hover::before {
  width: 100%;
}

.lang-item:hover,
.lang-item.active {
  color: var(--cyber-primary, #00ff88);
  background: rgba(0, 255, 136, 0.15);
}

.lang-item.active {
  font-weight: 600;
}

.lang-flag {
  font-size: 1.25rem;
  line-height: 1;
}

.lang-label {
  flex: 1;
  font-family: 'Inter', sans-serif;
}

.check-icon {
  font-size: 1rem;
  font-weight: bold;
  color: var(--cyber-primary, #00ff88);
}

/* 动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .lang-btn {
    padding: 0.4rem 0.75rem;
    font-size: 0.813rem;
  }

  .lang-text {
    display: none;
  }

  .lang-icon {
    font-size: 1.25rem;
  }

  .lang-menu {
    min-width: 160px;
  }
}

/* Dark mode compatibility */
html.dark .lang-btn {
  background: rgba(0, 255, 136, 0.1);
  border-color: var(--cyber-primary, #00ff88);
  color: var(--cyber-primary, #00ff88);
}

html.dark .lang-menu {
  background: var(--cyber-dark-secondary, #1a1a1a);
  border-color: var(--cyber-primary, #00ff88);
}
</style>
