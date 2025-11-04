<template>
  <section class="screenshots-section py-16">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6" :style="{background: 'linear-gradient(to right, var(--vp-c-brand-lighter), var(--vp-c-brand))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          系统展示
        </h2>
        <p class="text-xl max-w-3xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
          沉浸式体验赛博朋克风格界面，探索 AI 智能图床的核心功能模块
        </p>
      </div>

      <!-- 截图轮播 -->
      <div class="screenshots-carousel-container">
        <!-- 导航按钮 -->
        <button
          @click="scrollLeft"
          class="carousel-nav-btn nav-left"
          :class="{ 'opacity-50': isAtStart }"
          :disabled="isAtStart"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button
          @click="scrollRight"
          class="carousel-nav-btn nav-right"
          :class="{ 'opacity-50': isAtEnd }"
          :disabled="isAtEnd"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- 轮播内容 -->
        <div
          ref="carouselRef"
          class="screenshots-carousel-wrapper"
          @scroll="handleScroll"
          @mouseenter="pauseAutoScroll"
          @mouseleave="resumeAutoScroll"
        >
          <div class="screenshots-carousel-track">
            <div
              v-for="(screenshot, index) in screenshots"
              :key="index"
              class="screenshot-card group"
              @click="openLightbox(index)"
            >
              <div class="screenshot-image-wrapper">
                <!-- Mock截图 - 使用占位符 -->
                <div class="screenshot-placeholder">
                  <div class="placeholder-icon">{{ screenshot.icon }}</div>
                  <div class="placeholder-text">{{ screenshot.title }}</div>
                </div>
                <div class="screenshot-overlay">
                  <svg class="zoom-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                  </svg>
                </div>
              </div>
              <div class="screenshot-info">
                <h3 class="screenshot-title" :style="{color: 'var(--vp-c-brand-light)'}">{{ screenshot.title }}</h3>
                <p class="screenshot-desc" :style="{color: 'var(--cyber-text-tertiary)'}">{{ screenshot.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 进度指示器 -->
        <div class="carousel-indicators">
          <div
            v-for="(_, index) in screenshots"
            :key="index"
            class="indicator"
            :class="{ 'active': index === currentPage }"
            @click="goToPage(index)"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const carouselRef = ref<HTMLElement>()
const currentPage = ref(0)
const isAtStart = ref(true)
const isAtEnd = ref(false)
const autoScrollTimer = ref<NodeJS.Timeout>()
const isPaused = ref(false)

// Mock数据 - 产品截图
const screenshots = [
  {
    icon: '🏠',
    title: '首页控制台',
    description: '数据统计与系统概览',
    image: '' // 占位，待替换
  },
  {
    icon: '🖼️',
    title: '图片管理',
    description: '批量操作与智能管理',
    image: ''
  },
  {
    icon: '🤖',
    title: 'AI 智能分析',
    description: '自动分类与标签生成',
    image: ''
  },
  {
    icon: '🔍',
    title: '向量搜索',
    description: '语义搜索与相似匹配',
    image: ''
  },
  {
    icon: '☁️',
    title: '存储管理',
    description: '多云存储与渠道配置',
    image: ''
  },
  {
    icon: '📊',
    title: '数据统计',
    description: '可视化图表与分析',
    image: ''
  },
  {
    icon: '⚙️',
    title: '系统设置',
    description: '灵活配置与参数管理',
    image: ''
  },
  {
    icon: '👥',
    title: '用户管理',
    description: '企业级权限控制',
    image: ''
  }
]

const scrollLeft = () => {
  if (carouselRef.value) {
    pauseAutoScroll()
    const cardWidth = carouselRef.value.querySelector('.screenshot-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = cardWidth + gap

    carouselRef.value.scrollBy({
      left: -scrollDistance,
      behavior: 'smooth'
    })

    setTimeout(resumeAutoScroll, 2000)
  }
}

const scrollRight = () => {
  if (carouselRef.value) {
    pauseAutoScroll()
    const cardWidth = carouselRef.value.querySelector('.screenshot-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = cardWidth + gap

    carouselRef.value.scrollBy({
      left: scrollDistance,
      behavior: 'smooth'
    })

    setTimeout(resumeAutoScroll, 2000)
  }
}

const goToPage = (pageIndex: number) => {
  if (carouselRef.value) {
    pauseAutoScroll()
    const cardWidth = carouselRef.value.querySelector('.screenshot-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = (cardWidth + gap) * pageIndex

    carouselRef.value.scrollTo({
      left: scrollDistance,
      behavior: 'smooth'
    })

    setTimeout(resumeAutoScroll, 2000)
  }
}

const handleScroll = () => {
  if (carouselRef.value) {
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value
    const cardWidth = carouselRef.value.querySelector('.screenshot-card')?.clientWidth || 0
    const gap = 24

    isAtStart.value = scrollLeft <= 10
    isAtEnd.value = scrollLeft >= scrollWidth - clientWidth - 10

    const cardPosition = cardWidth + gap
    currentPage.value = Math.round(scrollLeft / cardPosition)
  }
}

// 自动滚动
const autoScroll = () => {
  if (!carouselRef.value || isPaused.value) return

  const cardWidth = carouselRef.value.querySelector('.screenshot-card')?.clientWidth || 0
  const gap = 24
  const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value

  // 如果到达末尾，回到开始
  if (scrollLeft >= scrollWidth - clientWidth - 10) {
    carouselRef.value.scrollTo({
      left: 0,
      behavior: 'smooth'
    })
  } else {
    const scrollDistance = cardWidth + gap
    carouselRef.value.scrollBy({
      left: scrollDistance,
      behavior: 'smooth'
    })
  }
}

const startAutoScroll = () => {
  if (autoScrollTimer.value) clearInterval(autoScrollTimer.value)
  autoScrollTimer.value = setInterval(autoScroll, 5000)
}

const stopAutoScroll = () => {
  if (autoScrollTimer.value) {
    clearInterval(autoScrollTimer.value)
    autoScrollTimer.value = undefined
  }
}

const pauseAutoScroll = () => {
  isPaused.value = true
}

const resumeAutoScroll = () => {
  isPaused.value = false
}

const openLightbox = (index: number) => {
  // TODO: 实现灯箱查看大图功能
  console.log('Open lightbox for screenshot:', index)
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    handleScroll()
    startAutoScroll()
  }
})

onUnmounted(() => {
  stopAutoScroll()
})
</script>

<style scoped>
.screenshots-section {
  background: var(--cyber-bg-primary);
  position: relative;
}

/* 轮播容器 */
.screenshots-carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
}

.screenshots-carousel-wrapper {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 60px;
}

.screenshots-carousel-wrapper::-webkit-scrollbar {
  display: none;
}

.screenshots-carousel-track {
  display: flex;
  gap: 1.5rem;
  min-width: 100%;
  padding: 1rem 0;
}

/* 导航按钮 */
.carousel-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.25), rgba(157, 76, 237, 0.25));
  border: 1px solid rgba(5, 217, 232, 0.4);
  border-radius: 50%;
  color: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.carousel-nav-btn:hover {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.35), rgba(157, 76, 237, 0.35));
  border-color: rgba(5, 217, 232, 0.6);
  box-shadow: 0 0 25px rgba(5, 217, 232, 0.4);
  transform: translateY(-50%) scale(1.05);
}

.carousel-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.nav-left {
  left: 10px;
}

.nav-right {
  right: 10px;
}

/* 截图卡片 */
.screenshot-card {
  flex: 0 0 400px;
  min-width: 400px;
  max-width: 400px;
  position: relative;
  background: linear-gradient(145deg, rgba(26, 29, 46, 0.95) 0%, rgba(36, 39, 65, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.25);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(20px);
  box-shadow:
    0 8px 32px rgba(5, 217, 232, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.screenshot-card::before {
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
  opacity: 0;
  transition: opacity 0.3s ease;
}

.screenshot-card:hover {
  border-color: rgba(5, 217, 232, 0.5);
  transform: translateY(-8px);
  box-shadow:
    0 20px 60px rgba(5, 217, 232, 0.15),
    0 0 40px rgba(5, 217, 232, 0.1);
}

.screenshot-card:hover::before {
  opacity: 1;
}

.screenshot-image-wrapper {
  position: relative;
  width: 100%;
  height: 225px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.05), rgba(157, 76, 237, 0.05));
}

.screenshot-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.1), rgba(157, 76, 237, 0.1));
  border-bottom: 1px solid rgba(5, 217, 232, 0.1);
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 20px currentColor);
}

.placeholder-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand-light);
  letter-spacing: 0.05em;
}

.screenshot-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5, 217, 232, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.screenshot-card:hover .screenshot-overlay {
  opacity: 1;
}

.zoom-icon {
  width: 48px;
  height: 48px;
  color: white;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.screenshot-card:hover .zoom-icon {
  transform: scale(1);
}

.screenshot-info {
  padding: 0.5rem 0.75rem;
}

.screenshot-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.125rem;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand-lighter));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.screenshot-desc {
  font-size: 0.75rem;
  line-height: 1.3;
  opacity: 0.85;
}

/* 进度指示器 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cyber-border);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: var(--vp-c-brand);
  width: 24px;
  border-radius: 4px;
}

.indicator:hover {
  background: var(--vp-c-brand-light);
}

/* 亮色主题 */
[data-theme="light"] .screenshot-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

[data-theme="light"] .screenshot-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 0 30px rgba(5, 217, 232, 0.1);
}

[data-theme="light"] .screenshot-placeholder {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.08), rgba(157, 76, 237, 0.08));
}

[data-theme="light"] .carousel-nav-btn {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.15), rgba(157, 76, 237, 0.15));
  border-color: rgba(5, 217, 232, 0.3);
}

[data-theme="light"] .carousel-nav-btn:hover {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.25), rgba(157, 76, 237, 0.25));
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.25);
}

/* 响应式 */
@media (max-width: 768px) {
  .screenshot-card {
    flex: 0 0 calc(100% - 2rem);
    min-width: 280px;
    max-width: 350px;
  }

  .screenshots-carousel-wrapper {
    padding: 0 50px;
  }

  .carousel-nav-btn {
    width: 40px;
    height: 40px;
  }

  .nav-left {
    left: 5px;
  }

  .nav-right {
    right: 5px;
  }

  .screenshot-image-wrapper {
    height: 158px;
  }

  .placeholder-icon {
    font-size: 2.5rem;
  }

  .placeholder-text {
    font-size: 0.875rem;
  }

  .screenshot-info {
    padding: 0.5rem 0.625rem;
  }

  .screenshot-title {
    font-size: 0.8125rem;
  }

  .screenshot-desc {
    font-size: 0.6875rem;
  }
}
</style>
