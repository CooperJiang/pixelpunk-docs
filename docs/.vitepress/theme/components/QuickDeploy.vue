<template>
  <section class="deploy-section py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- 标题 -->
      <div class="text-center mb-8">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4" :style="{background: 'linear-gradient(to right, var(--vp-c-brand-lighter), var(--vp-c-brand))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          快速部署
        </h2>
        <p class="text-lg max-w-2xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
          使用 Docker 一键启动，几分钟内即可运行 PixelPunk
        </p>
      </div>

      <!-- Docker部署卡片 -->
      <div class="deploy-card">
        <!-- 卡片头部 -->
        <div class="deploy-header">
          <div class="deploy-icon">🐳</div>
          <div class="deploy-info">
            <h3 class="deploy-title" :style="{color: 'var(--vp-c-brand-light)'}">Docker 部署</h3>
            <p class="deploy-subtitle" :style="{color: 'var(--cyber-text-tertiary)'}">推荐方式 · 开箱即用 · 跨平台支持</p>
          </div>
        </div>

        <!-- 命令行 -->
        <div class="deploy-command">
          <div class="command-header">
            <span class="command-label">运行命令</span>
            <button
              @click="copyToClipboard"
              class="copy-btn"
              :class="{ 'copied': copied }"
            >
              <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="ml-1">{{ copied ? '已复制' : '复制' }}</span>
            </button>
          </div>
          <pre class="command-text"><code>docker run -d -p 8080:8080 --name pixelpunk pixelpunk/pixelpunk:latest</code></pre>
        </div>

        <!-- 特性列表 -->
        <div class="deploy-features">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-item"
          >
            <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span :style="{color: 'var(--cyber-text-tertiary)'}">{{ feature }}</span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="deploy-actions">
          <a href="/docs/deployment" class="deploy-btn primary">
            <span>查看详细文档</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
          <a href="https://github.com/CooperJiang/PixelPunk" target="_blank" class="deploy-btn secondary">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub 仓库</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)

const dockerCommand = 'docker run -d -p 8080:8080 --name pixelpunk pixelpunk/pixelpunk:latest'

const features = [
  '一键启动，无需复杂配置',
  '完整环境隔离，互不干扰',
  '支持自动更新到最新版本',
  '跨平台部署（Linux/macOS/Windows）'
]

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(dockerCommand)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.deploy-section {
  background: var(--cyber-bg-primary);
  position: relative;
}

/* 部署卡片 */
.deploy-card {
  position: relative;
  background: linear-gradient(145deg, rgba(26, 29, 46, 0.95) 0%, rgba(36, 39, 65, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.25);
  border-radius: 1rem;
  padding: 2rem;
  backdrop-filter: blur(20px);
  overflow: hidden;
  box-shadow:
    0 8px 32px rgba(5, 217, 232, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.deploy-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-light) 50%,
    var(--vp-c-brand) 100%);
}

/* 卡片头部 */
.deploy-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(5, 217, 232, 0.1);
}

.deploy-icon {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.15), rgba(157, 76, 237, 0.15));
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.2);
  flex-shrink: 0;
}

.deploy-info {
  flex: 1;
}

.deploy-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand-lighter));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.deploy-subtitle {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* 命令行 */
.deploy-command {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(5, 217, 232, 0.2);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(5, 217, 232, 0.05);
  border-bottom: 1px solid rgba(5, 217, 232, 0.1);
}

.command-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-light);
  background: rgba(5, 217, 232, 0.1);
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: rgba(5, 217, 232, 0.2);
  border-color: rgba(5, 217, 232, 0.5);
}

.copy-btn.copied {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.5);
  color: #22C55E;
}

.command-text {
  padding: 1rem;
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--vp-c-brand-light);
  overflow-x: auto;
}

/* 特性列表 */
.deploy-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.875rem;
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.feature-icon {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  color: var(--vp-c-brand);
}

/* 操作按钮 */
.deploy-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.deploy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  padding: 0.875rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.deploy-btn.primary {
  color: white;
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  border: 1px solid var(--vp-c-brand);
  box-shadow: 0 4px 15px rgba(5, 217, 232, 0.25);
}

.deploy-btn.primary:hover {
  background: linear-gradient(135deg, var(--vp-c-brand-light) 0%, var(--vp-c-brand-lighter) 100%);
  box-shadow: 0 6px 25px rgba(5, 217, 232, 0.4);
  transform: translateY(-2px);
}

.deploy-btn.secondary {
  color: var(--vp-c-brand-light);
  background: rgba(5, 217, 232, 0.1);
  border: 1px solid rgba(5, 217, 232, 0.3);
}

.deploy-btn.secondary:hover {
  background: rgba(5, 217, 232, 0.2);
  border-color: rgba(5, 217, 232, 0.5);
  transform: translateY(-2px);
}

/* 亮色主题 */
[data-theme="light"] .deploy-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

[data-theme="light"] .deploy-command {
  background: rgba(0, 0, 0, 0.05);
}

/* 响应式 */
@media (max-width: 768px) {
  .deploy-section {
    padding: 2rem 0;
  }

  .deploy-card {
    padding: 1.5rem;
  }

  .deploy-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .deploy-icon {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 2rem;
  }

  .deploy-title {
    font-size: 1.25rem;
  }

  .deploy-features {
    grid-template-columns: 1fr;
  }

  .deploy-actions {
    flex-direction: column;
  }

  .command-text {
    font-size: 0.75rem;
  }
}
</style>
