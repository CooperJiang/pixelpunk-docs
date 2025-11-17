<template>
  <section class="screenshots-section py-8">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-6">
        <h2 class="text-4xl lg:text-5xl font-bold mb-4" :style="{background: 'linear-gradient(to right, var(--vp-c-brand-lighter), var(--vp-c-brand))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
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
                <!-- 如果有缩略图则显示缩略图，否则显示占位符 -->
                <img
                  v-if="screenshot.thumbnail"
                  :src="screenshot.thumbnail"
                  :alt="screenshot.title"
                  class="screenshot-image"
                  loading="lazy"
                />
                <div v-else class="screenshot-placeholder">
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
                <div class="screenshot-tags">
                  <span v-for="tag in screenshot.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
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

    <!-- 灯箱 -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="showLightbox" class="lightbox-overlay" @click="closeLightbox">
          <div class="lightbox-container" @click.stop>
            <!-- 关闭按钮 -->
            <button class="lightbox-close" @click="closeLightbox">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <!-- 左右导航 -->
            <button class="lightbox-nav nav-prev" @click="prevImage">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <button class="lightbox-nav nav-next" @click="nextImage">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            <!-- 图片 -->
            <div class="lightbox-image-wrapper">
              <img
                :src="screenshots[currentLightboxIndex].fullImage"
                :alt="screenshots[currentLightboxIndex].title"
                class="lightbox-image"
              />
              <div class="lightbox-info">
                <h3>{{ screenshots[currentLightboxIndex].title }}</h3>
                <p>{{ screenshots[currentLightboxIndex].description }}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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

// 产品截图数据
const screenshots = [
  {
    icon: '🏠',
    title: '首页控制台',
    description: '数据统计与系统概览',
    tags: ['数据面板', '实时监控', '快速入口'],
    thumbnail: 'https://v1.pixelpunk.cc/t/a06c4e90d1a9410b/image.png',
    fullImage: 'https://v1.pixelpunk.cc/f/a06c4e90d1a9410b/image.png'
  },
  {
    icon: '🖼️',
    title: '图片管理',
    description: '批量操作与智能管理',
    tags: ['批量上传', '智能分类', '快速检索'],
    thumbnail: 'https://v1.pixelpunk.cc/t/ea99c9b7f5394da4/image.png',
    fullImage: 'https://v1.pixelpunk.cc/f/ea99c9b7f5394da4/image.png'
  },
  {
    icon: '🤖',
    title: 'AI 智能分析',
    description: '自动分类与标签生成',
    tags: ['AI打标', 'NSFW检测', '自动分类'],
    thumbnail: 'https://v1.pixelpunk.cc/t/59480493788348f6/image.png',
    fullImage: 'https://v1.pixelpunk.cc/f/59480493788348f6/image.png'
  },
  {
    icon: '🔍',
    title: '向量搜索',
    description: '语义搜索与相似匹配',
    tags: ['以图搜图', '语义检索', '相似推荐'],
    thumbnail: 'https://v1.pixelpunk.cc/t/b0a09164d5414695/image.png',
    fullImage: 'https://v1.pixelpunk.cc/f/b0a09164d5414695/image.png'
  },
  {
    icon: '☁️',
    title: '存储管理',
    description: '多云存储与渠道配置',
    tags: ['多云支持', '灵活切换', '统一管理'],
    thumbnail: 'https://v1.pixelpunk.cc/t/43eca3fc61a74dcd/image.png',
    fullImage: 'https://v1.pixelpunk.cc/f/43eca3fc61a74dcd/image.png'
  },
  {
    icon: '📊',
    title: '数据统计',
    description: '可视化图表与分析',
    tags: ['图表展示', '趋势分析', '报表导出'],
    thumbnail: 'https://v1.pixelpunk.cc/t/855df9170bfb42e8/image.png',
    fullImage: 'https://v1.pixelpunk.cc/f/855df9170bfb42e8/image.png'
  },
  {
    icon: '⚙️',
    title: '系统设置',
    description: '灵活配置与参数管理',
    tags: ['全局配置', '参数调优', '功能开关'],
    thumbnail: 'https://v1.pixelpunk.cc/t/62a1f61a828e40e8/image.png',
    fullImage: 'https://v1.pixelpunk.cc/f/62a1f61a828e40e8/image.png'
  },
  {
    icon: '👥',
    title: '用户管理',
    description: '企业级权限控制',
    tags: ['角色管理', '权限控制', '操作审计'],
    thumbnail: 'https://v1.pixelpunk.cc/t/7761caba9d9f4298/image.png',
    fullImage: 'https://v1.pixelpunk.cc/f/7761caba9d9f4298/image.png'
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

// 灯箱相关
const showLightbox = ref(false)
const currentLightboxIndex = ref(0)

const openLightbox = (index: number) => {
  // 只有当有原图时才打开灯箱
  if (screenshots[index].fullImage) {
    currentLightboxIndex.value = index
    showLightbox.value = true
    document.body.style.overflow = 'hidden' // 禁止页面滚动
  }
}

const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = '' // 恢复页面滚动
}

const nextImage = () => {
  currentLightboxIndex.value = (currentLightboxIndex.value + 1) % screenshots.length
}

const prevImage = () => {
  currentLightboxIndex.value = (currentLightboxIndex.value - 1 + screenshots.length) % screenshots.length
}

// 键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  if (!showLightbox.value) return

  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    handleScroll()
    startAutoScroll()
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  stopAutoScroll()
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
  // 确保清理 body 的 overflow 样式
  document.body.style.overflow = ''
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
  padding: 0.5rem 0 0.75rem;
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
  padding: 0.5rem 0;
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
  height: 240px;
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
  padding: 0.625rem 0.875rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.screenshot-title {
  font-size: 0.9375rem;
  font-weight: 600;
  margin-top: 5px !important;
  margin-bottom: 0 !important;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand-lighter));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.screenshot-desc {
  font-size: 0.75rem;
  line-height: 1.3;
  opacity: 0.75;
  color: var(--cyber-text-secondary);
  margin: 0 !important;
}

.screenshot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3125rem;
  margin-top: 0.125rem;
}

.tag {
  display: inline-block;
  padding: 0.1875rem 0.4375rem;
  font-size: 0.625rem;
  border-radius: 0.25rem;
  background: rgba(5, 217, 232, 0.1);
  border: 1px solid rgba(5, 217, 232, 0.3);
  color: var(--vp-c-brand-light);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.screenshot-card:hover .tag {
  background: rgba(5, 217, 232, 0.15);
  border-color: rgba(5, 217, 232, 0.4);
}

/* 进度指示器 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
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

[data-theme="light"] .tag {
  background: rgba(5, 217, 232, 0.08);
  border-color: rgba(5, 217, 232, 0.25);
}

[data-theme="light"] .screenshot-card:hover .tag {
  background: rgba(5, 217, 232, 0.12);
  border-color: rgba(5, 217, 232, 0.35);
}

/* 缩略图样式 */
.screenshot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.screenshot-card:hover .screenshot-image {
  transform: scale(1.05);
}

/* 灯箱样式 */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.lightbox-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.lightbox-image {
  max-width: 100%;
  max-height: calc(90vh - 8rem);
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(5, 217, 232, 0.3);
}

.lightbox-info {
  text-align: center;
  color: white;
}

.lightbox-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand-light);
}

.lightbox-info p {
  font-size: 1rem;
  opacity: 0.8;
}

.lightbox-close {
  position: absolute;
  top: -3rem;
  right: 0;
  width: 48px;
  height: 48px;
  background: rgba(5, 217, 232, 0.15);
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.lightbox-close:hover {
  background: rgba(5, 217, 232, 0.3);
  border-color: rgba(5, 217, 232, 0.5);
  transform: scale(1.1);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  background: rgba(5, 217, 232, 0.15);
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.lightbox-nav:hover {
  background: rgba(5, 217, 232, 0.3);
  border-color: rgba(5, 217, 232, 0.5);
  transform: translateY(-50%) scale(1.1);
}

.nav-prev {
  left: -5rem;
}

.nav-next {
  right: -5rem;
}

/* 灯箱过渡动画 */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-container,
.lightbox-leave-active .lightbox-container {
  transition: transform 0.3s ease;
}

.lightbox-enter-from .lightbox-container,
.lightbox-leave-to .lightbox-container {
  transform: scale(0.9);
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
    height: 170px;
  }

  .placeholder-icon {
    font-size: 2.5rem;
  }

  .placeholder-text {
    font-size: 0.875rem;
  }

  .screenshot-info {
    padding: 0.5rem 0.75rem 0.625rem;
    gap: 0.3125rem;
  }

  .screenshot-title {
    font-size: 0.875rem;
  }

  .screenshot-desc {
    font-size: 0.6875rem;
    line-height: 1.25;
  }

  .screenshot-tags {
    gap: 0.25rem;
    margin-top: 0.0625rem;
  }

  .tag {
    font-size: 0.5625rem;
    padding: 0.15625rem 0.375rem;
  }

  /* 灯箱响应式 */
  .lightbox-overlay {
    padding: 1rem;
  }

  .lightbox-nav {
    width: 44px;
    height: 44px;
  }

  .nav-prev {
    left: 0.5rem;
  }

  .nav-next {
    right: 0.5rem;
  }

  .lightbox-close {
    top: 0.5rem;
    right: 0.5rem;
  }

  .lightbox-image {
    max-height: calc(90vh - 10rem);
  }

  .lightbox-info h3 {
    font-size: 1.125rem;
  }

  .lightbox-info p {
    font-size: 0.875rem;
  }
}
</style>
