<template>
  <div class="features-container">
    <!-- 页面头部 -->
    <div class="features-header">
      <div class="header-bg absolute inset-0">
        <div class="grid-overlay"></div>
        <div class="gradient-overlay"></div>
      </div>
      
      <div class="header-content relative z-10 container mx-auto px-4 py-16 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
          功能模块总览
        </h1>
        
        <p class="text-lg max-w-2xl mx-auto opacity-90 mb-8">
          探索 PixelPunk AI 智能图床的强大功能模块，每个模块都经过精心设计，为您提供最佳的图片管理体验
        </p>
        
        <!-- 统计信息 -->
        <div class="stats-grid grid grid-cols-3 gap-6 mt-8 max-w-xl mx-auto">
          <div class="stat-item">
            <div class="stat-value">{{ featureModules.length }}</div>
            <div class="stat-label">功能模块</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ totalFeatures }}</div>
            <div class="stat-label">特色功能</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ stableModules }}</div>
            <div class="stat-label">稳定版本</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模块导航 -->
    <div class="module-navigation container mx-auto px-4 py-8">
      <div class="nav-carousel-wrapper">
        <!-- 左箭头 -->
        <button
          class="nav-arrow nav-arrow-left"
          @click="scrollNavLeft"
          :class="{ 'disabled': navScrollPosition <= 0 }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- 导航容器 -->
        <div class="nav-scroll" ref="navScrollRef" @scroll="updateNavScrollPosition">
          <button
            v-for="module in featureModules"
            :key="module.id"
            @click="selectModule(module.id)"
            :class="['nav-item', { active: selectedModule?.id === module.id }]"
            :style="{ '--module-color': module.color, '--module-bg': module.bgColor }"
          >
            <div class="nav-icon">{{ module.icon }}</div>
            <div class="nav-label">{{ module.name }}</div>
          </button>
        </div>

        <!-- 右箭头 -->
        <button
          class="nav-arrow nav-arrow-right"
          @click="scrollNavRight"
          :class="{ 'disabled': navScrollPosition >= navMaxScroll }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 模块详情展示 -->
    <div v-if="selectedModule" class="module-details container mx-auto px-4 pb-16">
      <div class="detail-card">
        <!-- 模块头部信息 -->
        <div class="module-header">
          <div class="header-left">
            <div class="module-icon-large" :style="{ '--module-color': selectedModule.color }">
              {{ selectedModule.icon }}
            </div>
            <div class="module-info">
              <div class="module-title">
                {{ selectedModule.name }}
                <span class="version-badge" v-if="selectedModule.version">{{ selectedModule.version }}</span>
                <span class="status-badge" :class="selectedModule.status">{{ getStatusText(selectedModule.status) }}</span>
              </div>
              <p class="module-description">{{ selectedModule.description }}</p>
            </div>
          </div>
          
          <!-- 主要截图 -->
          <div v-if="selectedModule.image" class="module-image" @click="openImagePreview(selectedModule.image, selectedModule.name)">
            <img :src="selectedModule.image" :alt="selectedModule.name" class="main-image">
            <div class="image-overlay"></div>
            <div class="image-preview-hint">
              <svg class="preview-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
              <span>点击预览</span>
            </div>
          </div>
        </div>

        <!-- 功能特性列表 -->
        <div class="features-section">
          <h3 class="section-title">
            <span class="title-icon">✨</span>
            核心功能特性
          </h3>

          <!-- 横向滚动卡片容器 -->
          <div class="features-carousel">
            <!-- 卡片轨道 -->
            <div
              ref="featuresTrackRef"
              class="features-track"
            >
              <div class="features-wrapper">
                <div
                  v-for="feature in selectedModule.features"
                  :key="feature.id"
                  class="feature-card"
                >
                  <div class="feature-card-header">
                    <div class="feature-card-icon">{{ feature.icon }}</div>
                    <h4 class="feature-card-title">{{ feature.title }}</h4>
                  </div>
                  <p class="feature-card-description">{{ feature.description }}</p>
                  <div v-if="feature.category" class="feature-card-category" :style="getCategoryStyle(feature.category)">
                    <span class="category-icon">{{ featureCategories[feature.category]?.icon }}</span>
                    <span class="category-label">{{ featureCategories[feature.category]?.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 功能截图轮播 -->
        <div v-if="selectedModule.screenshots && selectedModule.screenshots.length > 0" class="screenshots-section">
          <h3 class="section-title">
            <span class="title-icon">📷</span>
            功能截图展示
            <span class="screenshot-count">{{ Math.min(currentScreenshotIndex + 2, selectedModule.screenshots.length) }} / {{ selectedModule.screenshots.length }}</span>
          </h3>

          <div class="screenshots-carousel">
            <!-- 左箭头 -->
            <button
              v-if="selectedModule.screenshots.length > 2"
              class="screenshot-nav screenshot-nav-left"
              @click="prevScreenshot"
              :class="{ 'disabled': currentScreenshotIndex === 0 }"
              :disabled="currentScreenshotIndex === 0"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <!-- 轮播容器 -->
            <div class="screenshots-container">
              <div
                class="screenshots-track"
                :style="{ transform: `translateX(-${currentScreenshotIndex * (100 / 2)}%)` }"
              >
                <div
                  v-for="(screenshot, index) in selectedModule.screenshots"
                  :key="index"
                  class="screenshot-slide"
                  @click="openImagePreview(screenshot, `${selectedModule.name} - 截图${index + 1}`)"
                >
                  <img :src="screenshot" :alt="`${selectedModule.name} - 截图${index + 1}`" class="screenshot-image">
                  <div class="screenshot-overlay"></div>
                  <div class="screenshot-preview-hint">
                    <svg class="preview-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>点击预览大图</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右箭头 -->
            <button
              v-if="selectedModule.screenshots.length > 2"
              class="screenshot-nav screenshot-nav-right"
              @click="nextScreenshot"
              :class="{ 'disabled': currentScreenshotIndex >= selectedModule.screenshots.length - 2 }"
              :disabled="currentScreenshotIndex >= selectedModule.screenshots.length - 2"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <!-- 轮播指示器 -->
          <div v-if="selectedModule.screenshots.length > 2" class="screenshot-indicators">
            <button
              v-for="(_, index) in Math.max(1, selectedModule.screenshots.length - 1)"
              :key="index"
              class="screenshot-indicator"
              :class="{ 'active': index === currentScreenshotIndex }"
              @click="goToScreenshot(index)"
            ></button>
          </div>
        </div>

        <!-- 常见问题 -->
        <div v-if="selectedModule.faqs && selectedModule.faqs.length > 0" class="faqs-section">
          <h3 class="section-title">
            <span class="title-icon">❓</span>
            常见问题
          </h3>
          
          <div class="faqs-list">
            <div 
              v-for="(faq, index) in selectedModule.faqs" 
              :key="index"
              class="faq-item"
              @click="toggleFaq(index)"
            >
              <div class="faq-question">
                <span class="question-text">{{ faq.question }}</span>
                <svg 
                  class="expand-icon" 
                  :class="{ expanded: expandedFaqs.includes(index) }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              <div v-show="expandedFaqs.includes(index)" class="faq-answer">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览弹窗 -->
    <Teleport to="body">
      <div v-if="imagePreview.show" class="image-preview-modal" @click="closeImagePreview">
        <div class="preview-backdrop"></div>
        <div class="preview-content" @click.stop>
          <button class="preview-close" @click="closeImagePreview">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img :src="imagePreview.src" :alt="imagePreview.alt" class="preview-image">
          <div class="preview-title">{{ imagePreview.alt }}</div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { gsap } from 'gsap'
import { featureModules, featureCategories, type FeatureModule } from '../../config/features'

const selectedModule = ref<FeatureModule>(featureModules[0])
const expandedFaqs = ref<number[]>([])

// 导航滚动状态
const navScrollRef = ref<HTMLElement | null>(null)
const navScrollPosition = ref(0)
const navMaxScroll = ref(0)

// 截图轮播状态
const currentScreenshotIndex = ref(0)

// 图片预览功能
const imagePreview = ref({
  show: false,
  src: '',
  alt: ''
})

const openImagePreview = (src: string, alt: string) => {
  imagePreview.value.show = true
  imagePreview.value.src = src
  imagePreview.value.alt = alt
  document.body.style.overflow = 'hidden'
}

const closeImagePreview = () => {
  imagePreview.value.show = false
  document.body.style.overflow = 'auto'
}

// 计算统计数据
const totalFeatures = computed(() => {
  return featureModules.reduce((total, module) => total + module.features.length, 0)
})

const stableModules = computed(() => {
  return featureModules.filter(module => module.status === 'stable').length
})

// 选择模块
const selectModule = (moduleId: string) => {
  const module = featureModules.find(m => m.id === moduleId)
  if (module) {
    selectedModule.value = module
    expandedFaqs.value = []
    currentScreenshotIndex.value = 0 // 重置截图索引

    // 滚动到详情区域，考虑导航栏高度偏移（已禁用）
    // const detailsElement = document.querySelector('.module-details')
    // if (detailsElement) {
    //   const elementPosition = detailsElement.offsetTop
    //   const offsetPosition = elementPosition - 22 // 减去导航栏高度70px

    //   window.scrollTo({
    //     top: offsetPosition,
    //     behavior: 'smooth'
    //   })
    // }
  }
}

// 导航滚动控制
const updateNavScrollPosition = () => {
  if (navScrollRef.value) {
    navScrollPosition.value = navScrollRef.value.scrollLeft
    navMaxScroll.value = navScrollRef.value.scrollWidth - navScrollRef.value.clientWidth
  }
}

const scrollNavLeft = () => {
  if (navScrollRef.value) {
    const scrollAmount = navScrollRef.value.clientWidth * 0.8
    navScrollRef.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }
}

const scrollNavRight = () => {
  if (navScrollRef.value) {
    const scrollAmount = navScrollRef.value.clientWidth * 0.8
    navScrollRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

// 截图轮播控制（一屏显示2张，每次滚动1张）
const prevScreenshot = () => {
  if (currentScreenshotIndex.value > 0) {
    currentScreenshotIndex.value--
  }
}

const nextScreenshot = () => {
  if (selectedModule.value.screenshots && currentScreenshotIndex.value < selectedModule.value.screenshots.length - 2) {
    currentScreenshotIndex.value++
  }
}

const goToScreenshot = (index: number) => {
  currentScreenshotIndex.value = index
}

// 切换FAQ展开状态
const toggleFaq = (index: number) => {
  const faqIndex = expandedFaqs.value.indexOf(index)
  if (faqIndex > -1) {
    expandedFaqs.value.splice(faqIndex, 1)
  } else {
    expandedFaqs.value.push(index)
  }
}

// 获取状态文本
const getStatusText = (status: string) => {
  switch (status) {
    case 'stable': return '稳定版'
    case 'beta': return '测试版'
    case 'experimental': return '实验版'
    default: return status
  }
}

// 获取分类样式
const getCategoryStyle = (category: string) => {
  const categoryInfo = featureCategories[category]
  if (!categoryInfo) return {}
  
  return {
    '--category-color': categoryInfo.color,
    '--category-bg': `${categoryInfo.color}20`
  }
}

onMounted(async () => {
  // 初始化导航滚动状态
  if (navScrollRef.value) {
    updateNavScrollPosition()
    window.addEventListener('resize', updateNavScrollPosition)
  }

  // 动态导入 ScrollTrigger 避免构建问题
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      // 导航项动画
      gsap.set('.nav-item', { opacity: 0, y: 20 })
      
      ScrollTrigger.batch('.nav-item', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1
          })
        },
        start: 'top 80%'
      })
      
      // 功能卡片动画
      gsap.set('.feature-card', { opacity: 0, y: 30 })

      ScrollTrigger.batch('.feature-card', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15
          })
        },
        start: 'top 85%'
      })
      
      // 统计数字动画
      gsap.set('.stat-value', { innerHTML: '0' })
      
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 80%',
        onEnter: () => {
          gsap.to({}, {
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              const progress = this.progress()
              document.querySelectorAll('.stat-value').forEach((el, index) => {
                const targets = [featureModules.length, totalFeatures.value, stableModules.value]
                const target = targets[index] || 0
                el.innerHTML = Math.floor(target * progress).toString()
              })
            }
          })
        }
      })
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
    }
  }
})
</script>

<style scoped>
.features-container {
  min-height: 100vh;
  background: var(--cyber-bg-primary);
}

/* 页面头部 */
.features-header {
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

.stats-grid {
  border-top: 1px solid var(--cyber-border);
  padding-top: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
  text-shadow: 0 0 15px currentColor;
}

.stat-label {
  color: var(--cyber-text-tertiary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* 模块导航 */
.module-navigation {
  position: sticky;
  top: 80px;
  z-index: 50;
  background: var(--cyber-bg-primary);
  /* border-bottom: 1px solid var(--cyber-border); */
  backdrop-filter: blur(10px);
}

.nav-carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-arrow {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 50%;
  color: var(--vp-c-brand);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-arrow:hover:not(.disabled) {
  background: var(--cyber-bg-primary);
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  transform: scale(1.1);
}

.nav-arrow.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.nav-scroll {
  flex: 1;
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 0.5rem 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.nav-scroll::-webkit-scrollbar {
  display: none;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.6rem 0.9rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  color: var(--cyber-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  white-space: nowrap;
}

.nav-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--module-bg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-item:hover,
.nav-item.active {
  border-color: var(--module-color);
  color: var(--cyber-text-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--cyber-shadow), 0 0 20px var(--module-color);
}

.nav-item:hover::before,
.nav-item.active::before {
  opacity: 1;
}

.nav-icon {
  font-size: 1.25rem;
  position: relative;
  z-index: 1;
}

.nav-label {
  font-weight: 600;
  font-size: 0.75rem;
  position: relative;
  z-index: 1;
  text-align: center;
}

.nav-item.active .nav-icon {
  animation: icon-glow 2s ease-in-out infinite;
}

@keyframes icon-glow {
  0%, 100% { filter: drop-shadow(0 0 8px var(--module-color)); }
  50% { filter: drop-shadow(0 0 15px var(--module-color)); }
}

/* 模块详情 */
.detail-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px var(--cyber-shadow);
}

/* 模块头部 */
.module-header {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  padding: 2.5rem;
  border-bottom: 1px solid var(--cyber-border);
}

.header-left {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex: 1;
}

.module-icon-large {
  font-size: 2.5rem;
  filter: drop-shadow(0 0 15px var(--module-color));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.module-info {
  flex: 1;
}

.module-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.version-badge {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.stable {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid #10b981;
}

.status-badge.beta {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.status-badge.experimental {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid #ef4444;
}

.module-description {
  color: var(--cyber-text-secondary);
  line-height: 1.8;
  font-size: 1rem;
  margin: 0;
}

/* 主要图片 */
.module-image {
  position: relative;
  width: 320px;
  height: 180px;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid var(--cyber-border);
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.1);
}

.module-image:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 25px var(--cyber-shadow), 0 0 30px var(--vp-c-brand);
  transform: translateY(-2px);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  position: relative;
  z-index: 1;
}

.module-image:hover .main-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, var(--cyber-border) 0%, transparent 50%);
  opacity: 0.1;
  transition: opacity 0.3s ease;
  z-index: 2;
  pointer-events: none;
}

.module-image:hover .image-overlay {
  opacity: 0.2;
}

.image-preview-hint {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 255, 136, 0.3));
  color: white;
  opacity: 0;
  transition: all 0.4s ease;
  backdrop-filter: blur(8px);
  z-index: 10;
  pointer-events: none;
}

.module-image:hover .image-preview-hint {
  opacity: 1;
  pointer-events: auto;
}

.preview-icon {
  width: 2rem;
  height: 2rem;
  margin-bottom: 0.5rem;
  animation: float 2s ease-in-out infinite;
}

.image-preview-hint span {
  font-size: 0.875rem;
  font-weight: 500;
}

/* 内容区域 */
.features-section,
.screenshots-section,
.faqs-section {
  padding: 2.5rem;
  border-bottom: 1px solid var(--cyber-border);
}

.faqs-section {
  border-bottom: none;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--cyber-border);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, var(--vp-c-brand), transparent);
}

.title-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 8px var(--vp-c-brand));
}

/* 功能特性横向滚动 */
.features-carousel {
  position: relative;
  margin: 0 -2rem;
  padding: 0 2rem;
}

.features-track {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-brand) var(--cyber-border);
  padding: 0.5rem 0;
  cursor: grab;
}

.features-track:active {
  cursor: grabbing;
}

.features-track::-webkit-scrollbar {
  height: 6px;
}

.features-track::-webkit-scrollbar-track {
  background: var(--cyber-border);
  border-radius: 3px;
}

.features-track::-webkit-scrollbar-thumb {
  background: var(--vp-c-brand);
  border-radius: 3px;
  transition: background 0.3s ease;
}

.features-track::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-brand-light);
}

.features-wrapper {
  display: flex;
  gap: 1.5rem;
  min-width: max-content;
}

.feature-card {
  flex: 0 0 320px;
  min-height: 300px;
  height: 100%;
  padding: 1.5rem;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 255, 136, 0.2), 0 0 30px rgba(0, 255, 136, 0.1);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.feature-card-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px var(--vp-c-brand));
  flex-shrink: 0;
}

.feature-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--cyber-text-primary);
  margin: 0;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: right;
  line-height: 1.3;
}

.feature-card-description {
  color: var(--cyber-text-secondary);
  line-height: 1.7;
  margin: 0 0 1rem 0;
  flex: 1;
  font-size: 0.9rem;
}

.feature-card-category {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  background: var(--category-bg);
  border: 1px solid var(--category-color);
  border-radius: 0.375rem;
  color: var(--category-color);
  font-size: 0.75rem;
  font-weight: 600;
  align-self: flex-start;
  margin-top: auto;
  box-shadow: 0 0 15px var(--category-bg);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-card-category {
  box-shadow: 0 0 20px var(--category-color);
}

.category-icon {
  font-size: 0.875rem;
}

/* 截图轮播展示 */
.screenshot-count {
  margin-left: auto;
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  padding: 0.35rem 0.85rem;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--vp-c-brand);
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
}

.screenshots-carousel {
  position: relative;
  padding: 0 60px;
  margin: 0 -2rem;
}

.screenshot-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 212, 255, 0.15));
  border: 1px solid var(--vp-c-brand);
  border-radius: 50%;
  color: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.screenshot-nav:hover:not(.disabled) {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.3), rgba(0, 212, 255, 0.3));
  box-shadow: 0 0 25px var(--vp-c-brand);
  transform: translateY(-50%) scale(1.1);
}

.screenshot-nav.disabled {
  opacity: 0.2;
  cursor: not-allowed;
  pointer-events: none;
}

.screenshot-nav-left {
  left: 0;
}

.screenshot-nav-right {
  right: 0;
}

.screenshots-container {
  overflow: hidden;
  border-radius: 0.5rem;
}

.screenshots-track {
  display: flex;
  gap: 1.5rem;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.screenshot-slide {
  flex: 0 0 calc(50% - 0.75rem);
  position: relative;
  aspect-ratio: 16/9;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid var(--cyber-border);
  border-radius: 0.5rem;
  background: var(--cyber-bg-primary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 136, 0.05);
  transition: all 0.4s ease;
}

.screenshot-slide:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 35px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 255, 136, 0.2);
  transform: scale(1.02);
}

.screenshot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  position: relative;
  z-index: 1;
}

.screenshot-slide:hover .screenshot-image {
  transform: scale(1.05);
}

.screenshot-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, var(--vp-c-brand) 0%, transparent 50%);
  opacity: 0.05;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 2;
}

.screenshot-slide:hover .screenshot-overlay {
  opacity: 0.15;
}

.screenshot-preview-hint {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 255, 136, 0.3));
  color: white;
  opacity: 0;
  transition: all 0.4s ease;
  backdrop-filter: blur(8px);
  z-index: 10;
  pointer-events: none;
}

.screenshot-slide:hover .screenshot-preview-hint {
  opacity: 1;
  pointer-events: auto;
}

.preview-icon {
  width: 2.5rem;
  height: 2.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

.screenshot-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.screenshot-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--cyber-border);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.screenshot-indicator.active {
  background: var(--vp-c-brand);
  width: 32px;
  border-radius: 5px;
  box-shadow: 0 0 15px var(--vp-c-brand);
}

.screenshot-indicator:hover:not(.active) {
  background: var(--vp-c-brand-light);
  transform: scale(1.2);
}

/* 常见问题 */
.faqs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.375rem;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.faq-item:hover {
  border-color: var(--cyber-border-hover);
  box-shadow: 0 4px 16px rgba(0, 255, 136, 0.1);
  transform: translateX(4px);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  user-select: none;
}

.question-text {
  font-weight: 600;
  color: var(--cyber-text-primary);
}

.expand-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--cyber-text-tertiary);
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1rem 1rem;
  color: var(--cyber-text-secondary);
  line-height: 1.5;
  border-top: 1px solid var(--cyber-border);
  margin-top: -1px;
}

/* 图片预览弹窗 */
.image-preview-modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 10000 !important;
  animation: modal-fade-in 0.3s ease-out;
  background: rgba(0, 0, 0, 0.8) !important;
}

@keyframes modal-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.preview-backdrop {
  position: absolute;
  inset: 0;
  background: transparent;
  backdrop-filter: blur(8px);
}

.preview-content {
  position: relative !important;
  max-width: 90vw !important;
  max-height: 90vh !important;
  background: var(--cyber-bg-secondary) !important;
  border: 1px solid var(--cyber-border-hover) !important;
  border-radius: 0.5rem !important;
  overflow: hidden !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px var(--cyber-border) !important;
  animation: content-scale-in 0.3s ease-out;
}

@keyframes content-scale-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.preview-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--cyber-border-hover);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.preview-close:hover {
  background: rgba(255, 0, 0, 0.8);
  border-color: #ff0000;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
}

.preview-close svg {
  width: 1.25rem;
  height: 1.25rem;
}

.preview-image {
  width: 100% !important;
  height: auto !important;
  max-height: 80vh !important;
  object-fit: contain !important;
  display: block !important;
}

.preview-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem 1.5rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  backdrop-filter: blur(10px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .nav-carousel-wrapper {
    gap: 0.75rem;
  }

  .nav-arrow {
    width: 36px;
    height: 36px;
  }

  .features-carousel {
    padding: 0 1rem;
    margin: 0 -1rem;
  }

  .screenshots-carousel {
    padding: 0 50px;
    margin: 0 -1rem;
  }

  .feature-card {
    flex: 0 0 280px;
  }
}

@media (max-width: 768px) {
  .nav-carousel-wrapper {
    gap: 0.5rem;
  }

  .nav-arrow {
    width: 32px;
    height: 32px;
  }

  .nav-arrow svg {
    width: 1rem;
    height: 1rem;
  }

  .module-header {
    flex-direction: column;
    gap: 1.5rem;
  }

  .header-left {
    flex-direction: column;
    gap: 1rem;
  }

  .module-image {
    width: 100%;
    height: 200px;
  }

  .features-carousel {
    padding: 0 1rem;
  }

  .screenshots-carousel {
    padding: 0 45px;
  }

  .screenshot-nav {
    width: 40px;
    height: 40px;
  }

  .feature-card {
    flex: 0 0 260px;
    min-height: 260px;
    padding: 1.25rem;
  }

  .feature-card-icon {
    font-size: 2rem;
  }

  .feature-card-title {
    font-size: 1rem;
  }

  .screenshot-slide {
    flex: 0 0 calc(100% - 1.5rem);
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .preview-content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .preview-title {
    font-size: 1rem;
    padding: 1.5rem 1rem 0.75rem;
  }
}

@media (max-width: 480px) {
  .module-title {
    font-size: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .features-section,
  .screenshots-section,
  .faqs-section {
    padding: 1rem;
  }

  .features-carousel {
    padding: 0 1rem;
  }

  .screenshots-carousel {
    padding: 0 40px;
  }

  .screenshot-nav {
    width: 36px;
    height: 36px;
  }

  .screenshot-nav svg {
    width: 1rem;
    height: 1rem;
  }

  .feature-card {
    flex: 0 0 240px;
    padding: 1rem;
  }

  .screenshot-slide {
    flex: 0 0 calc(100% - 1.5rem);
  }

  .screenshot-count {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
}

/* 亮色主题适配 */
[data-theme="light"] .feature-card {
  background: var(--cyber-bg-secondary);
  border-color: var(--cyber-border-hover);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

[data-theme="light"] .feature-card:hover {
  box-shadow: 0 12px 40px rgba(0, 255, 136, 0.12);
  background: #ffffff;
}

[data-theme="light"] .features-track::-webkit-scrollbar-thumb {
  background: var(--vp-c-brand-dark);
}

[data-theme="light"] .screenshot-nav {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.08), rgba(0, 212, 255, 0.08));
  border-color: var(--vp-c-brand);
}

[data-theme="light"] .screenshot-nav:hover:not(.disabled) {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 212, 255, 0.15));
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
}

[data-theme="light"] .screenshot-slide {
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

[data-theme="light"] .screenshot-slide:hover {
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.15);
}

[data-theme="light"] .screenshot-count {
  background: rgba(0, 255, 136, 0.1);
  color: var(--vp-c-brand-dark);
}

[data-theme="light"] .feature-card-description {
  color: var(--vp-c-text-2);
}

/* 暗色主题增强 */
[data-theme="dark"] .feature-card {
  background: linear-gradient(135deg, rgba(20, 24, 35, 0.8) 0%, rgba(26, 29, 46, 0.7) 100%);
}

[data-theme="dark"] .feature-card:hover {
  background: linear-gradient(135deg, rgba(26, 29, 46, 0.95) 0%, rgba(36, 39, 65, 0.9) 100%);
  box-shadow: 0 12px 40px rgba(0, 255, 136, 0.2);
}

[data-theme="dark"] .screenshot-slide {
  background: rgba(20, 24, 35, 0.6);
}
</style>