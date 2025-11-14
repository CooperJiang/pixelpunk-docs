<template>
  <div class="version-preview-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <div class="header-bg absolute inset-0">
        <div class="grid-overlay"></div>
        <div class="gradient-overlay"></div>
      </div>

      <div class="header-content relative z-10 container mx-auto px-4 py-8 text-center">
        <h1 class="text-3xl lg:text-4xl font-bold mb-3 gradient-text">
          在线演示
        </h1>

        <p class="text-base max-w-2xl mx-auto opacity-90">
          体验 PixelPunk 的不同版本，探索图床系统的强大功能
        </p>
      </div>
    </div>

    <!-- 版本列表 -->
    <div class="versions-content container mx-auto px-4 py-8">
      <div class="versions-grid">
        <a
          v-for="version in versions"
          :key="version.id"
          :href="version.url"
          target="_blank"
          class="version-card"
          :class="version.type"
        >
          <!-- 装饰性背景 -->
          <div class="card-bg-decoration"></div>

          <!-- 版本图标 -->
          <div class="version-icon">
            {{ version.icon }}
          </div>

          <!-- 版本信息 -->
          <div class="version-info">
            <div class="version-header">
              <h3 class="version-title">{{ version.title }}</h3>
              <div class="status-badge" :class="version.type">
                <span class="status-dot"></span>
                {{ version.status }}
              </div>
            </div>

            <p class="version-description">{{ version.description }}</p>

            <!-- 特性标签 -->
            <div class="version-features">
              <div v-for="feature in version.features" :key="feature" class="feature-tag">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ feature }}</span>
              </div>
            </div>

            <!-- 访问按钮 -->
            <div class="version-action">
              <span class="action-text">{{ version.actionText }}</span>
              <svg class="action-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>

          <!-- 悬停效果叠加层 -->
          <div class="card-hover-overlay"></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'

interface Version {
  id: string
  title: string
  description: string
  status: string
  type: 'production' | 'development'
  url: string
  icon: string
  actionText: string
  features: string[]
}

// 版本数据
const versions: Version[] = [
  {
    id: 'production',
    title: '正式版',
    description: '已经发布的稳定版本，适合正式使用和生产环境部署',
    status: '稳定版',
    type: 'production',
    url: 'https://v1.pixelpunk.cc/',
    icon: '🚀',
    actionText: '访问正式版',
    features: ['稳定可靠', '完整功能', '生产就绪']
  },
  {
    id: 'development',
    title: '开发版',
    description: '开发中的版本，可以抢先看到一些新开发的功能',
    status: '开发中',
    type: 'development',
    url: 'http://dev.pixelpunk.cc/',
    icon: '🔧',
    actionText: '访问开发版',
    features: ['最新特性', '实验功能', '抢先体验']
  }
]

onMounted(async () => {
  // 动态导入 ScrollTrigger 避免构建问题
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // 版本卡片动画
      gsap.set('.version-card', { opacity: 0, y: 30 })

      ScrollTrigger.batch('.version-card', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15
          })
        },
        start: 'top 85%'
      })
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
    }
  }
})
</script>

<style scoped>
.version-preview-container {
  min-height: 100vh;
  background: var(--cyber-bg-primary);
}

/* 页面头部 */
.demo-header {
  position: relative;
  background: linear-gradient(135deg, var(--cyber-bg-primary) 0%, var(--cyber-bg-secondary) 100%);
  overflow: hidden;
}

.header-bg {
  opacity: 0.1;
}

.grid-overlay {
  background-image:
    linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

.gradient-overlay {
  background: radial-gradient(circle at 30% 60%, var(--cyber-border) 0%, transparent 50%);
  animation: gradient-pulse 8s ease-in-out infinite;
}

@keyframes grid-move {
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}

@keyframes gradient-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.gradient-text {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light), var(--vp-c-brand-lighter));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* 版本内容区域 */
.versions-content {
  max-width: 1200px;
}

.versions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

/* 版本卡片 */
.version-card {
  background: var(--cyber-bg-secondary);
  border: 2px solid var(--cyber-border);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.5rem;
  text-decoration: none;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.15),
    0 0 20px rgba(0, 255, 136, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.version-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.version-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow:
    0 12px 40px rgba(0, 255, 136, 0.25),
    0 0 60px rgba(0, 255, 136, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateY(-6px);
}

.version-card:hover::before {
  opacity: 1;
}

.version-card.production {
  border-left: 4px solid #10b981;
}

.version-card.production:hover {
  box-shadow:
    0 12px 40px rgba(16, 185, 129, 0.3),
    0 0 60px rgba(16, 185, 129, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.version-card.development {
  border-left: 4px solid #f59e0b;
}

.version-card.development:hover {
  box-shadow:
    0 12px 40px rgba(245, 158, 11, 0.3),
    0 0 60px rgba(245, 158, 11, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* 装饰性背景 */
.card-bg-decoration {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--cyber-border) 0%, transparent 70%);
  opacity: 0.15;
  pointer-events: none;
  transition: all 0.6s ease;
}

.version-card:hover .card-bg-decoration {
  opacity: 0.3;
  transform: scale(1.2) rotate(10deg);
}

/* 悬停叠加层 */
.card-hover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(0, 255, 136, 0.03) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.version-card:hover .card-hover-overlay {
  opacity: 1;
}

/* 版本图标 */
.version-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  filter: drop-shadow(0 0 15px rgba(0, 255, 136, 0.4));
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.version-card:hover .version-icon {
  transform: scale(1.1) translateY(-5px);
  filter: drop-shadow(0 0 25px rgba(0, 255, 136, 0.6));
}

.version-card.production .version-icon {
  filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.4));
}

.version-card.production:hover .version-icon {
  filter: drop-shadow(0 0 25px rgba(16, 185, 129, 0.6));
}

.version-card.development .version-icon {
  filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.4));
}

.version-card.development:hover .version-icon {
  filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.6));
}

/* 版本信息 */
.version-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.version-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.version-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin: 0;
  line-height: 1.2;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.status-badge::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.version-card:hover .status-badge::before {
  transform: translateX(100%);
}

.status-badge.production {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.1);
}

.status-badge.development {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.1);
}

/* 状态点 */
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
}

.status-badge.production .status-dot {
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
  animation: pulse-green 2s ease-in-out infinite;
}

.status-badge.development .status-dot {
  background: #f59e0b;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
  animation: pulse-orange 2s ease-in-out infinite;
}

@keyframes pulse-green {
  0%, 100% {
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
  }
  50% {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
  }
}

@keyframes pulse-orange {
  0%, 100% {
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
  }
  50% {
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.8);
  }
}

.version-description {
  color: var(--cyber-text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 0.9rem;
  min-height: auto;
}

/* 特性标签 */
.version-features {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(0, 255, 136, 0.08);
  border: 1px solid var(--cyber-border);
  border-radius: 0.375rem;
  font-size: 0.8rem;
  color: var(--cyber-text-secondary);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex: 1;
  justify-content: center;
  white-space: nowrap;
}

.feature-tag::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-tag:hover::before {
  opacity: 1;
}

.version-card:hover .feature-tag {
  border-color: var(--vp-c-brand);
  background: rgba(0, 255, 136, 0.12);
  color: var(--cyber-text-primary);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.1);
}

.feature-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--vp-c-brand);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.version-card.production .feature-tag {
  background: rgba(16, 185, 129, 0.08);
}

.version-card.production:hover .feature-tag {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.1);
}

.version-card.production .feature-icon {
  color: #10b981;
}

.version-card.development .feature-tag {
  background: rgba(245, 158, 11, 0.08);
}

.version-card.development:hover .feature-tag {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.12);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.1);
}

.version-card.development .feature-icon {
  color: #f59e0b;
}

/* 访问按钮 */
.version-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding: 0.875rem 1.25rem;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.08) 0%, rgba(0, 255, 136, 0.03) 100%);
  border: 1.5px solid var(--cyber-border);
  border-radius: 0.375rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.version-action::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.15) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.version-card:hover .version-action {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.15) 0%, rgba(0, 255, 136, 0.08) 100%);
  border-color: var(--vp-c-brand);
  box-shadow:
    0 0 20px rgba(0, 255, 136, 0.25),
    inset 0 0 20px rgba(0, 255, 136, 0.05);
  transform: translateY(-2px);
}

.version-card:hover .version-action::before {
  opacity: 1;
}

.version-card.production .version-action {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 100%);
  color: #10b981;
}

.version-card.production:hover .version-action {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%);
  border-color: #10b981;
  box-shadow:
    0 0 20px rgba(16, 185, 129, 0.25),
    inset 0 0 20px rgba(16, 185, 129, 0.05);
}

.version-card.development .version-action {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.03) 100%);
  color: #f59e0b;
}

.version-card.development:hover .version-action {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%);
  border-color: #f59e0b;
  box-shadow:
    0 0 20px rgba(245, 158, 11, 0.25),
    inset 0 0 20px rgba(245, 158, 11, 0.05);
}

.action-text {
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.action-arrow {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.version-card:hover .action-arrow {
  transform: translateX(6px);
  animation: arrow-bounce 0.6s ease-in-out;
}

@keyframes arrow-bounce {
  0%, 100% {
    transform: translateX(6px);
  }
  50% {
    transform: translateX(10px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .versions-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .version-card {
    padding: 1.5rem 1.25rem;
  }

  .version-icon {
    font-size: 2.5rem;
    margin-bottom: 0.875rem;
  }

  .version-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .version-title {
    font-size: 1.35rem;
  }

  .version-description {
    min-height: auto;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .version-features {
    gap: 0.375rem;
    margin-top: 0.875rem;
    flex-wrap: nowrap;
  }

  .feature-tag {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
    flex: 1;
    min-width: 0;
  }

  .feature-tag span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .feature-icon {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
  }

  .version-action {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }

  .demo-header .header-content {
    padding: 2rem 1rem !important;
  }

  .demo-header h1 {
    font-size: 1.75rem !important;
    margin-bottom: 0.5rem !important;
  }

  .demo-header p {
    font-size: 0.9rem !important;
  }
}

/* 中等屏幕优化 */
@media (max-width: 1024px) and (min-width: 769px) {
  .versions-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
  }

  .version-card {
    padding: 1.875rem 1.5rem;
  }

  .version-icon {
    font-size: 2.75rem;
    margin-bottom: 1rem;
  }

  .version-title {
    font-size: 1.4rem;
  }

  .version-description {
    font-size: 0.875rem;
  }
}
</style>