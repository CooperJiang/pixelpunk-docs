<template>
  <section class="updates-section py-8">
    <div class="container mx-auto px-4">
      <div class="updates-ticker">
        <!-- 标签 -->
        <div class="ticker-label">
          <span class="label-icon">📰</span>
          <span class="label-text">最新动态</span>
        </div>

        <!-- 滚动内容容器 -->
        <div class="ticker-wrapper" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
          <div ref="tickerContentRef" class="ticker-content" :style="{ animationPlayState: isPaused ? 'paused' : 'running' }">
            <div
              v-for="(update, index) in [...updates, ...updates]"
              :key="index"
              class="ticker-item"
            >
              <span class="item-badge" :style="{background: update.color + '20', borderColor: update.color + '40', color: update.color}">
                {{ update.version }}
              </span>
              <span class="item-text" :style="{color: 'var(--cyber-text-primary)'}">
                {{ update.title }}
              </span>
              <span class="item-separator">•</span>
            </div>
          </div>
        </div>

        <!-- 查看更多按钮 -->
        <a href="/updates" class="ticker-more-btn">
          <span>查看全部</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tickerContentRef = ref<HTMLElement>()
const isPaused = ref(false)

// 最新动态数据（简化版）
const updates = [
  {
    version: 'v2.5.0',
    title: '向量搜索引擎重大升级 - 支持以文搜图和以图搜图功能',
    color: '#05D9E8'
  },
  {
    version: 'v2.4.0',
    title: 'AI 智能分析全面升级 - 接入更多大模型',
    color: '#9D4CED'
  },
  {
    version: 'v2.3.0',
    title: '企业管理功能大幅增强 - 新增带宽控制和实时监控',
    color: '#22C55E'
  },
  {
    version: 'v2.2.0',
    title: '多云存储架构升级 - 支持 12+ 种主流云存储',
    color: '#F59E0B'
  }
]

const pauseScroll = () => {
  isPaused.value = true
}

const resumeScroll = () => {
  isPaused.value = false
}
</script>

<style scoped>
.updates-section {
  background: var(--cyber-bg-primary);
  position: relative;
}

.updates-ticker {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(145deg, rgba(26, 29, 46, 0.95) 0%, rgba(36, 39, 65, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.25);
  border-radius: 0.75rem;
  padding: 0.875rem 1.25rem;
  backdrop-filter: blur(20px);
  box-shadow:
    0 4px 20px rgba(5, 217, 232, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.updates-ticker::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-light) 50%,
    var(--vp-c-brand) 100%);
}

/* 标签 */
.ticker-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.15), rgba(157, 76, 237, 0.15));
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 0.5rem;
  white-space: nowrap;
}

.label-icon {
  font-size: 1.25rem;
}

.label-text {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--vp-c-brand-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* 滚动容器 */
.ticker-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.ticker-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: scroll 40s linear infinite;
  will-change: transform;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 滚动项 */
.ticker-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.item-badge {
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 0.375rem;
  border: 1px solid;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'JetBrains Mono', monospace;
}

.item-text {
  font-size: 0.9375rem;
  font-weight: 500;
}

.item-separator {
  color: var(--cyber-text-tertiary);
  opacity: 0.5;
  font-size: 0.875rem;
}

/* 查看更多按钮 */
.ticker-more-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-brand-light);
  background: rgba(5, 217, 232, 0.1);
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  white-space: nowrap;
}

.ticker-more-btn:hover {
  background: rgba(5, 217, 232, 0.2);
  border-color: rgba(5, 217, 232, 0.5);
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.3);
  transform: translateX(2px);
}

/* 亮色主题 */
[data-theme="light"] .updates-ticker {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* 响应式 */
@media (max-width: 768px) {
  .updates-ticker {
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
  }

  .ticker-label {
    width: 100%;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .ticker-wrapper {
    flex: 1;
    min-width: 0;
  }

  .ticker-content {
    gap: 1.5rem;
  }

  .item-text {
    font-size: 0.875rem;
  }

  .ticker-more-btn {
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
  }
}
</style>
