<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface CodeTab {
  label: string
  value: string
  code: string
  language?: string
}

const props = defineProps<{
  tabs: CodeTab[]
  defaultTab?: string
}>()

const activeTab = ref<string>('')

onMounted(() => {
  activeTab.value = props.defaultTab || props.tabs[0]?.value || ''
})

const setActiveTab = (value: string) => {
  activeTab.value = value
}

// 简化的语法高亮
const highlightCode = (code: string, lang: string) => {
  const escape = (str: string) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  let result = escape(code)

  // 使用占位符避免正则冲突
  const tokens: string[] = []
  let tokenIndex = 0

  const savePart = (match: string, color: string) => {
    const placeholder = `__TOKEN_${tokenIndex}__`
    tokens[tokenIndex] = `<span style="color: ${color};">${match}</span>`
    tokenIndex++
    return placeholder
  }

  if (lang === 'bash' || lang === 'shell') {
    // 1. 先保存字符串
    result = result.replace(/"[^"]*"/g, (match) => savePart(match, '#CE9178'))
    // 2. 保存注释
    result = result.replace(/(#[^\n]*)/g, (match) => savePart(match, '#6A9955'))
    // 3. 保存命令
    result = result.replace(/\b(curl|docker|npm|git|cd|mkdir|ls|chmod|bash|sh)\b/g, (match) => savePart(match, '#569CD6'))
    // 4. 保存参数
    result = result.replace(/(-[a-zA-Z-]+)/g, (match) => savePart(match, '#9CDCFE'))
  } else if (lang === 'javascript') {
    // 1. 先保存注释
    result = result.replace(/\/\/[^\n]*/g, (match) => savePart(match, '#6A9955'))
    // 2. 保存字符串（单引号、双引号、反引号）
    result = result.replace(/'(?:[^'\\]|\\.)*'/g, (match) => savePart(match, '#CE9178'))
    result = result.replace(/"(?:[^"\\]|\\.)*"/g, (match) => savePart(match, '#CE9178'))
    result = result.replace(/`(?:[^`\\]|\\.)*`/g, (match) => savePart(match, '#CE9178'))
    // 3. 保存关键字
    result = result.replace(/\b(const|let|var|function|async|await|if|else|return|try|catch|throw|new|import|from|require|export|default|for|while|break|continue|class|extends|this|super)\b/g, (match) => savePart(match, '#C586C0'))
    // 4. 保存数字
    result = result.replace(/\b(\d+)\b/g, (match) => savePart(match, '#B5CEA8'))
  } else if (lang === 'python') {
    // 1. 先保存三引号字符串
    result = result.replace(/"""[\s\S]*?"""/g, (match) => savePart(match, '#CE9178'))
    result = result.replace(/'''[\s\S]*?'''/g, (match) => savePart(match, '#CE9178'))
    // 2. 保存注释
    result = result.replace(/#[^\n]*/g, (match) => savePart(match, '#6A9955'))
    // 3. 保存普通字符串
    result = result.replace(/"(?:[^"\\]|\\.)*"/g, (match) => savePart(match, '#CE9178'))
    result = result.replace(/'(?:[^'\\]|\\.)*'/g, (match) => savePart(match, '#CE9178'))
    // 4. 保存关键字
    result = result.replace(/\b(def|class|import|from|if|else|elif|return|try|except|finally|with|as|for|in|while|pass|break|continue|raise|None|True|False|and|or|not|is|lambda|yield)\b/g, (match) => savePart(match, '#C586C0'))
  } else if (lang === 'go') {
    // 1. 先保存注释
    result = result.replace(/\/\/[^\n]*/g, (match) => savePart(match, '#6A9955'))
    // 2. 保存字符串
    result = result.replace(/`[^`]*`/g, (match) => savePart(match, '#CE9178'))
    result = result.replace(/"(?:[^"\\]|\\.)*"/g, (match) => savePart(match, '#CE9178'))
    // 3. 保存关键字
    result = result.replace(/\b(package|import|func|type|struct|interface|var|const|if|else|for|range|return|defer|go|chan|select|case|default|switch|break|continue|map|make|new)\b/g, (match) => savePart(match, '#C586C0'))
    // 4. 保存类型
    result = result.replace(/\b(int|int64|int32|string|bool|error|byte|rune|float32|float64)\b/g, (match) => savePart(match, '#4EC9B0'))
  }

  // 恢复所有占位符
  for (let i = 0; i < tokenIndex; i++) {
    result = result.replace(`__TOKEN_${i}__`, tokens[i])
  }

  return result
}
</script>

<template>
  <div class="code-tabs">
    <div class="tabs-header">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tab-button', { active: activeTab === tab.value }]"
        @click="setActiveTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs-content">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        v-show="activeTab === tab.value"
        class="tab-panel"
      >
        <div :class="'language-' + (tab.language || 'bash')">
          <span class="lang">{{ tab.language || 'bash' }}</span>
          <button title="Copy Code" class="copy"></button>
          <pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code v-html="highlightCode(tab.code, tab.language || 'bash')"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-tabs {
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.tabs-header {
  display: flex;
  gap: 0;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 0;
  overflow-x: auto;
}

.tab-button {
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
}

.tab-button:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.tab-button.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.tabs-content {
  background: var(--vp-code-block-bg);
}

.tab-panel {
  padding: 0;
}

.tab-panel div[class*='language-'] {
  position: relative;
  margin: 0;
  border-radius: 0;
  background-color: var(--vp-code-block-bg);
}

.tab-panel pre {
  margin: 0 !important;
  padding: 1.25rem 1.5rem !important;
  background: transparent !important;
  overflow-x: auto;
  overflow-y: auto;
  line-height: 1.7;
  max-height: 500px;
}

.tab-panel code {
  background: transparent !important;
  padding: 0 !important;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  display: block;
  white-space: pre;
}

/* 代码块滚动条样式 */
.tab-panel pre::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.tab-panel pre::-webkit-scrollbar-track {
  background: transparent;
}

.tab-panel pre::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}

.tab-panel pre::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-3);
}

.lang {
  position: absolute;
  top: 0.6em;
  right: 1em;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  transition: color 0.5s;
  z-index: 1;
}

.copy {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  width: 2em;
  height: 2em;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-code-block-bg);
  opacity: 0;
  cursor: pointer;
  background-image: var(--vp-icon-copy);
  background-position: 50%;
  background-size: 20px;
  background-repeat: no-repeat;
  transition: opacity 0.4s;
  z-index: 1;
}

.tab-panel:hover .copy {
  opacity: 1;
}

/* 滚动条样式 */
.tabs-header::-webkit-scrollbar {
  height: 4px;
}

.tabs-header::-webkit-scrollbar-track {
  background: var(--vp-c-bg-soft);
}

.tabs-header::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.tabs-header::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-brand);
}
</style>
