<template>
  <div class="use-cases-section py-12">
    <h3 class="text-2xl font-bold text-center section-title" :style="{color: 'var(--vp-c-brand)'}">
      适用场景
    </h3>

    <!-- 轮播容器 -->
    <div class="carousel-container">
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
        class="carousel-wrapper"
        @scroll="handleScroll"
        @mouseenter="pauseAutoScroll"
        @mouseleave="resumeAutoScroll"
      >
        <div class="carousel-track">
          <div
            v-for="(useCase, index) in useCases"
            :key="index"
            class="use-case-card"
          >
            <div class="use-case-icon">
              <span class="text-3xl">{{ useCase.icon }}</span>
            </div>
            <h4 class="use-case-title" :style="{color: 'var(--vp-c-brand-light)'}">{{ useCase.title }}</h4>
            <p class="use-case-description" :style="{color: 'var(--cyber-text-secondary)'}">{{ useCase.description }}</p>
            <div class="use-case-features">
              <div
                v-for="feature in useCase.features"
                :key="feature"
                class="use-case-feature"
                :style="{color: 'var(--cyber-text-tertiary)'}"
              >
                {{ feature }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 进度指示器 -->
      <div class="carousel-indicators">
        <div
          v-for="(_, index) in Math.ceil(useCases.length / cardsPerView)"
          :key="index"
          class="indicator"
          :class="{ 'active': index === currentPage }"
          @click="goToPage(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const carouselRef = ref<HTMLElement>()
const currentPage = ref(0)
const isAtStart = ref(true)
const isAtEnd = ref(false)
const cardsPerView = ref(3)
const autoScrollTimer = ref<NodeJS.Timeout>()
const isPaused = ref(false)

const useCases = [
  {
    icon: '🧠',
    title: 'AI 研究团队',
    description: '基于向量搜索和智能分析，构建某研究数据集和知识库',
    features: ['多模型AI分析', '向量化数据集', '智能检索']
  },
  {
    icon: '🏢',
    title: '企业级应用',
    description: '大型企业数字资产管理，支持多组织、权限控制和合规管理',
    features: ['企业级权限', '合规监管', '成本控制']
  },
  {
    icon: '🚀',
    title: '创业公司',
    description: '创业团队快速搭建素材库，支持高并发和快速扩展',
    features: ['快速部署', '弹性扩展', 'CDN加速']
  },
  {
    icon: '🎨',
    title: '内容创作平台',
    description: '支持大量创作者的多媒体平台，提供版权保护和内容分发',
    features: ['版权保护', '内容分发', '智能推荐']
  },
  {
    icon: '🏭',
    title: '政府机构',
    description: '政务数字化平台，支持高安全等级和合规性要求',
    features: ['高安全等级', '合规性要求', '审计追踪']
  },
  {
    icon: '🏫',
    title: '教育机构',
    description: '在线教育平台的教学资源管理，支持大量并发和知识管理',
    features: ['教学资源库', '知识管理', '学习分析']
  }
]

const scrollLeft = () => {
  if (carouselRef.value) {
    pauseAutoScroll()
    const cardWidth = carouselRef.value.querySelector('.use-case-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = (cardWidth + gap) * cardsPerView.value

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
    const cardWidth = carouselRef.value.querySelector('.use-case-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = (cardWidth + gap) * cardsPerView.value

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
    const cardWidth = carouselRef.value.querySelector('.use-case-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = (cardWidth + gap) * cardsPerView.value * pageIndex

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
    const cardWidth = carouselRef.value.querySelector('.use-case-card')?.clientWidth || 0
    const gap = 24

    isAtStart.value = scrollLeft <= 10
    isAtEnd.value = scrollLeft >= scrollWidth - clientWidth - 10

    const cardPosition = cardWidth + gap
    currentPage.value = Math.round(scrollLeft / cardPosition / cardsPerView.value)
  }
}

// 自动滚动
const autoScroll = () => {
  if (!carouselRef.value || isPaused.value) return

  const cardWidth = carouselRef.value.querySelector('.use-case-card')?.clientWidth || 0
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
  autoScrollTimer.value = setInterval(autoScroll, 4000)
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

// 响应式调整每页显示卡片数
const updateCardsPerView = () => {
  const width = window.innerWidth
  if (width >= 1024) {
    cardsPerView.value = 3
  } else if (width >= 768) {
    cardsPerView.value = 2
  } else {
    cardsPerView.value = 1
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    handleScroll()
    startAutoScroll()
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateCardsPerView)
  }
  stopAutoScroll()
})
</script>

<style scoped>
.use-cases-section {
  background: var(--cyber-bg-primary);
  position: relative;
}

.section-title {
  margin-bottom: 2rem !important;
}

/* 轮播容器 */
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 1rem 0;
}

.carousel-wrapper {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 60px;
}

.carousel-wrapper::-webkit-scrollbar {
  display: none;
}

.carousel-track {
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

/* 使用场景卡片 */
.use-case-card {
  flex: 0 0 calc(33.333% - 1rem);
  min-width: 300px;
  max-width: 380px;
  position: relative;
  background: linear-gradient(145deg, rgba(26, 29, 46, 0.95) 0%, rgba(36, 39, 65, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.25);
  border-radius: 1rem;
  padding: 1.75rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  box-shadow:
    0 8px 32px rgba(5, 217, 232, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.use-case-card::before {
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
  border-radius: 1rem 1rem 0 0;
}

.use-case-card:hover {
  border-color: rgba(5, 217, 232, 0.5);
  transform: translateY(-4px);
  box-shadow:
    0 20px 60px rgba(5, 217, 232, 0.15),
    0 0 40px rgba(5, 217, 232, 0.1);
}

.use-case-card:hover::before {
  opacity: 1;
}

.use-case-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.25rem;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.15), rgba(157, 76, 237, 0.15));
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.1);
}

.use-case-card:hover .use-case-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 0 30px rgba(5, 217, 232, 0.3);
}

.use-case-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.875rem;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand-lighter));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.use-case-description {
  margin-bottom: 1.25rem;
  line-height: 1.6;
  font-size: 0.9375rem;
  opacity: 0.9;
}

.use-case-features {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  text-align: left;
  padding-top: 1rem;
  border-top: 1px solid rgba(5, 217, 232, 0.1);
}

.use-case-feature {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.use-case-feature::before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  background: var(--vp-c-brand-light);
  border-radius: 50%;
  margin-right: 0.625rem;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.use-case-card:hover .use-case-feature::before {
  transform: scale(1.2);
  box-shadow: 0 0 8px var(--vp-c-brand-light);
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
[data-theme="light"] .use-case-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

[data-theme="light"] .use-case-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 0 30px rgba(5, 217, 232, 0.1);
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
@media (max-width: 1023px) {
  .use-case-card {
    flex: 0 0 calc(50% - 0.75rem);
    min-width: 280px;
  }
}

@media (max-width: 768px) {
  .carousel-wrapper {
    padding: 0 50px;
  }

  .use-case-card {
    flex: 0 0 calc(100% - 1rem);
    min-width: 260px;
    padding: 1.5rem;
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

  .use-case-icon {
    width: 3.5rem;
    height: 3.5rem;
  }

  .use-case-title {
    font-size: 1.125rem;
  }

  .use-case-description {
    font-size: 0.875rem;
  }
}
</style>
