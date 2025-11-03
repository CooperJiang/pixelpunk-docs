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
      <div class="nav-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
          
          <div class="features-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="feature in selectedModule.features" 
              :key="feature.id"
              class="feature-item"
            >
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="feature-content">
                <h4 class="feature-title">{{ feature.title }}</h4>
                <p class="feature-description">{{ feature.description }}</p>
                <div v-if="feature.category" class="feature-category" :style="getCategoryStyle(feature.category)">
                  <span class="category-icon">{{ featureCategories[feature.category]?.icon }}</span>
                  <span class="category-label">{{ featureCategories[feature.category]?.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 更多截图 -->
        <div v-if="selectedModule.screenshots && selectedModule.screenshots.length > 0" class="screenshots-section">
          <h3 class="section-title">
            <span class="title-icon">📷</span>
            功能截图展示
          </h3>
          
          <div class="screenshots-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="(screenshot, index) in selectedModule.screenshots" 
              :key="index"
              class="screenshot-item"
              @click="openImagePreview(screenshot, `${selectedModule.name} - 截图${index + 1}`)"
            >
              <img :src="screenshot" :alt="`${selectedModule.name} - 截图${index + 1}`" class="screenshot-image">
              <div class="screenshot-overlay"></div>
              <div class="screenshot-preview-hint">
                <svg class="preview-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                <span>查看大图</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 配置说明 -->
        <div v-if="selectedModule.configGuide" class="config-section">
          <h3 class="section-title">
            <span class="title-icon">⚙️</span>
            {{ selectedModule.configGuide.title }}
          </h3>
          
          <div class="config-steps">
            <div 
              v-for="(step, index) in selectedModule.configGuide.steps" 
              :key="index"
              class="config-step"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">{{ step }}</div>
            </div>
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
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { featureModules, featureCategories, type FeatureModule } from '../../config/features'

const selectedModule = ref<FeatureModule>(featureModules[0])
const expandedFaqs = ref<number[]>([])

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
    
    // 滚动到详情区域，考虑导航栏高度偏移
    const detailsElement = document.querySelector('.module-details')
    if (detailsElement) {
      const elementPosition = detailsElement.offsetTop
      const offsetPosition = elementPosition - 22 // 减去导航栏高度70px
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
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
      gsap.set('.feature-item', { opacity: 0, y: 30 })
      
      ScrollTrigger.batch('.feature-item', {
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

.nav-grid {
  max-width: 1200px;
  margin: 0 auto;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.75rem;
  color: var(--cyber-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
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
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
}

.nav-label {
  font-weight: 600;
  font-size: 0.875rem;
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
  border-radius: 1rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px var(--cyber-shadow);
}

/* 模块头部 */
.module-header {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding: 2rem;
  border-bottom: 1px solid var(--cyber-border);
}

.header-left {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex: 1;
}

.module-icon-large {
  font-size: 3rem;
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
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.version-badge {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
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
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
}

/* 主要图片 */
.module-image {
  position: relative;
  width: 320px;
  height: 180px;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--cyber-border);
  flex-shrink: 0;
}

.module-image:hover {
  border-color: var(--cyber-border-hover);
  box-shadow: 0 8px 25px var(--cyber-shadow), 0 0 20px var(--cyber-border);
  transform: translateY(-2px);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
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
  background: rgba(0, 0, 0, 0.7);
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.module-image:hover .image-preview-hint {
  opacity: 1;
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
.config-section,
.faqs-section {
  padding: 2rem;
  border-bottom: 1px solid var(--cyber-border);
}

.faqs-section {
  border-bottom: none;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin-bottom: 1.5rem;
}

.title-icon {
  font-size: 1.5rem;
}

/* 功能特性网格 */
.features-grid {
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.feature-item:hover {
  border-color: var(--cyber-border-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--cyber-shadow);
}

.feature-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.feature-description {
  color: var(--cyber-text-secondary);
  line-height: 1.5;
  margin-bottom: 0.75rem;
  margin-top: 0;
}

.feature-category {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--category-bg);
  border: 1px solid var(--category-color);
  border-radius: 0.375rem;
  color: var(--category-color);
  font-size: 0.75rem;
  font-weight: 500;
}

.category-icon {
  font-size: 0.75rem;
}

/* 截图展示 */
.screenshots-grid {
  gap: 1.5rem;
}

.screenshot-item {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--cyber-border);
}

.screenshot-item:hover {
  border-color: var(--cyber-border-hover);
  box-shadow: 0 8px 25px var(--cyber-shadow);
  transform: translateY(-2px);
}

.screenshot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.screenshot-item:hover .screenshot-image {
  transform: scale(1.05);
}

.screenshot-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, var(--cyber-border) 0%, transparent 50%);
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.screenshot-item:hover .screenshot-overlay {
  opacity: 0.2;
}

.screenshot-preview-hint {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.screenshot-item:hover .screenshot-preview-hint {
  opacity: 1;
}

/* 配置步骤 */
.config-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.config-step {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.config-step:hover {
  border-color: var(--cyber-border-hover);
  background: var(--cyber-border);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.step-content {
  color: var(--cyber-text-secondary);
  line-height: 1.5;
  align-self: center;
}

/* 常见问题 */
.faqs-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: var(--cyber-border-hover);
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
  border-radius: 1rem !important;
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
  .nav-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
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
  
  .nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .screenshots-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .config-step {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .step-number {
    align-self: center;
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
  .nav-grid {
    grid-template-columns: 1fr;
  }
  
  .module-title {
    font-size: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .features-section,
  .screenshots-section,
  .config-section,
  .faqs-section {
    padding: 1rem;
  }
}
</style>