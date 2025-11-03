<template>
  <section class="features-section py-8">
    <div class="container mx-auto px-4">
      <!-- 标题区域 -->
      <div class="text-center mb-12">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6" :style="{background: 'linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          强大功能特性
        </h2>
        <p class="text-xl w-full mx-auto leading-relaxed" :style="{color: 'var(--cyber-text-secondary)'}">
          融合前沿AI技术与极致用户体验，构建集智能分析、语义搜索、安全管理于一体的企业级图床平台，让每一张图片都能释放最大价值
        </p>
      </div>
      
      <!-- 轮播容器 -->
      <div class="carousel-container relative">
        <!-- 导航按钮 -->
        <button 
          @click="scrollLeft" 
          class="carousel-nav nav-left"
          :class="{ 'opacity-50': isAtStart }"
          :disabled="isAtStart"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          @click="scrollRight" 
          class="carousel-nav nav-right"
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
              v-for="(feature, index) in features"
              :key="index"
              class="carousel-card"
            >
              <!-- 卡片头部 -->
              <div class="feature-header">
                <div class="feature-icon">
                  <span class="text-3xl">{{ feature.icon }}</span>
                </div>
                <div class="feature-title-area">
                  <h3 class="feature-title" :style="{color: 'var(--vp-c-brand)'}">
                    {{ feature.title }}
                  </h3>
                </div>
              </div>
              
              <!-- 卡片内容 -->
              <div class="feature-content">
                <p class="feature-description" :style="{color: 'var(--cyber-text-secondary)'}">
                  {{ feature.description }}
                </p>
                
                <!-- 功能列表 -->
                <ul class="feature-list">
                  <li
                    v-for="(item, idx) in feature.items"
                    :key="idx"
                    class="feature-item"
                  >
                    <div class="feature-square" :style="{borderColor: 'var(--vp-c-brand)', backgroundColor: 'var(--vp-c-brand)'}"></div>
                    <span :style="{color: 'var(--cyber-text-tertiary)'}">{{ item }}</span>
                  </li>
                </ul>
                
                <!-- 技术标签 -->
                <div class="feature-tags scrollable-tags" v-if="feature.tags">
                  <div class="tags-container">
                    <span
                      v-for="tag in feature.tags"
                      :key="tag"
                      class="feature-tag"
                      :style="{background: 'var(--cyber-border)', color: 'var(--vp-c-brand)'}"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- 悬浮效果 -->
              <div class="feature-glow"></div>
            </div>
          </div>
        </div>
        
        <!-- 进度指示器 -->
        <div class="carousel-indicators">
          <div 
            v-for="(_, index) in originalFeatures.length"
            :key="index"
            class="indicator"
            :class="{ 'active': index === currentPage }"
            @click="goToPage(index)"
          ></div>
        </div>
      </div>
      
      <!-- 底部统计 -->
      <div class="features-stats mt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
        <div class="stat-item text-center">
          <div class="text-3xl font-bold mb-2" :style="{color: 'var(--vp-c-brand)'}">80+</div>
          <div class="text-sm" :style="{color: 'var(--cyber-text-tertiary)'}">API 接口</div>
        </div>
        <div class="stat-item text-center">
          <div class="text-3xl font-bold mb-2" :style="{color: 'var(--vp-c-brand-light)'}">25+</div>
          <div class="text-sm" :style="{color: 'var(--cyber-text-tertiary)'}">数据表</div>
        </div>
        <div class="stat-item text-center">
          <div class="text-3xl font-bold mb-2" :style="{color: 'var(--vp-c-brand-lighter)'}">18+</div>
          <div class="text-sm" :style="{color: 'var(--cyber-text-tertiary)'}">存储渠道</div>
        </div>
        <div class="stat-item text-center">
          <div class="text-3xl font-bold mb-2" :style="{color: 'var(--vp-c-brand)'}">WebSocket</div>
          <div class="text-sm" :style="{color: 'var(--cyber-text-tertiary)'}">实时推送</div>
        </div>
        <div class="stat-item text-center">
          <div class="text-3xl font-bold mb-2" :style="{color: 'var(--vp-c-brand-light)'}">企业级</div>
          <div class="text-sm" :style="{color: 'var(--cyber-text-tertiary)'}">架构设计</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { gsap } from 'gsap'

// 轮播相关状态
const carouselRef = ref<HTMLElement>()
const currentPage = ref(0)
const isAtStart = ref(true)
const isAtEnd = ref(false)
const cardsPerView = ref(3) // 默认每次显示3个卡片
const autoScrollTimer = ref<NodeJS.Timeout>()
const isPaused = ref(false) // 悬浮时暂停自动滚动

const originalFeatures = [
  {
    icon: '🤖',
    title: 'AI 智能分析',
    badge: 'GPT-4 Vision',
    description: '集成最新AI大模型图片识别技术，提供深度图像内容分析，智能生成标签和描述。',
    items: [
      '自动标签生成（15+ 类型）',
      '内容安全检测（NSFW）',
      '智能描述生成（100-200字）',
      '图片质量评估',
      '色彩分析和调色板提取',
      'AI 队列管理与监控'
    ],
    tags: ['GPT-4 Vision', 'Computer Vision', 'NSFW Detection', 'Queue Management']
  },
  {
    icon: '🔍',
    title: '向量搜索引擎',
    badge: 'Qdrant + AI',
    description: '基于 Qdrant 向量数据库的智能搜索系统，支持语义搜索和相似度匹配。',
    items: [
      '以文搜图（Text to Image）',
      '以图搜图（Image Similarity）',
      '语义相似度搜索',
      '向量验证与修复',
      '智能推荐算法',
      '搜索阈值可配置'
    ],
    tags: ['Qdrant', 'Vector Search', 'Semantic Search', 'AI Recommendation']
  },
  {
    icon: '📁',
    title: '智能图片管理',
    description: '全方位的图片管理功能，支持多格式处理，分片上传和批量操作。',
    items: [
      '分片上传（大文件支持）',
      '秒传去重（MD5检测）',
      '自动缩略图生成',
      '图片压缩优化',
      '水印配置（JSON格式）',
      '批量操作与重排序'
    ],
    tags: ['分片上传', '秒传', '水印', '批量处理']
  },
  {
    icon: '☁️',
    title: '企业级存储方案',
    description: '支持 18+ 种存储渠道，包括本地、OSS、COS、S3、R2 等，灵活切换，配置简单。',
    items: [
      '18+ 存储渠道（Local/OSS/COS/S3/R2）',
      '存储连通性测试',
      '配置导入导出',
      '动态默认渠道切换',
      'CDN 加速配置',
      '存储使用统计监控'
    ],
    tags: ['多云存储', '配置管理', 'CDN', '监控统计']
  },
  {
    icon: '🔗',
    title: '强大分享系统',
    description: '灵活的分享机制，支持公开/私密分享，详细的访问统计和权限控制。',
    items: [
      '公开/私密/密码保护分享',
      '过期策略配置',
      '访客信息收集',
      '24小时去重统计',
      '作者主页展示',
      '分享令牌管理'
    ],
    tags: ['分享管理', '权限控制', '统计分析', '作者主页']
  },
  {
    icon: '🛡️',
    title: '带宽与安全控制',
    description: '企业级带宽管理和访问控制系统，提供精确的流量控制和安全防护。',
    items: [
      '带宽限制与统计',
      '并发上传控制',
      '访问控制（防盗链/IP/域名）',
      '游客上传限制',
      '下载流量监控',
      '安全策略配置'
    ],
    tags: ['带宽控制', '访问控制', '安全防护', '流量监控']
  },
  {
    icon: '👑',
    title: '企业管理后台',
    description: '全面的企业级管理后台，提供实时监控、用户管理和系统配置功能。',
    items: [
      '实时系统监控（WebSocket）',
      '用户权限管理（三级角色）',
      '内容审核队列（NSFW）',
      'API Key 管理',
      '消息通知系统',
      '设置中心（批量配置）'
    ],
    tags: ['实时监控', '权限管理', '内容审核', 'API管理']
  },
  {
    icon: '🗂️',
    title: '文件夹管理系统',
    description: '层级化的文件夹管理系统，支持权限控制和批量操作。',
    items: [
      '文件夹 CRUD 操作',
      '树形结构展示',
      '权限级别控制',
      '批量路径链操作',
      '面包屑导航',
      '检索与排序'
    ],
    tags: ['文件夹', '层级管理', '权限控制', '批量操作']
  },
  {
    icon: '🎨',
    title: '水印系统',
    description: '支持文字/图片水印，批量添加，模板管理，保护你的版权。',
    items: [
      '文字水印配置',
      '图片水印上传',
      '批量添加水印',
      '水印模板管理',
      '位置自定义',
      '透明度调整'
    ],
    tags: ['水印', '版权保护', '批量处理', '模板管理']
  },
  {
    icon: '🏷️',
    title: '标签与分类',
    description: '智能标签系统，自定义分类，AI 自动分类，快速整理和检索文件。',
    items: [
      '智能标签生成（AI）',
      '自定义分类管理',
      '多标签支持',
      '标签搜索过滤',
      '批量打标签',
      '标签统计分析'
    ],
    tags: ['智能标签', 'AI分类', '检索', '统计']
  },
  {
    icon: '📊',
    title: '数据统计',
    description: '用户统计、文件统计、分享统计、带宽统计，实时监控，数据可视化。',
    items: [
      '用户行为统计',
      '文件上传统计',
      '分享访问统计',
      '带宽使用监控',
      '实时数据图表',
      '导出统计报表'
    ],
    tags: ['数据统计', '实时监控', '可视化', '报表']
  },
  {
    icon: '🔌',
    title: '开放 API',
    description: '完整的 RESTful API，API Key 管理，Webhook 回调，方便集成到你的应用。',
    items: [
      'RESTful API 接口',
      'API Key 管理',
      'Webhook 回调',
      'API 使用统计',
      '速率限制控制',
      'API 文档完善'
    ],
    tags: ['API', 'Webhook', '集成', '文档']
  },
  {
    icon: '⚡',
    title: '高性能',
    description: 'Go 语言开发，高并发处理，响应迅速，8 秒快速构建，单文件部署。',
    items: [
      'Go 语言高性能',
      '高并发处理',
      '8秒快速构建',
      '单文件部署',
      '内存优化',
      '响应速度快'
    ],
    tags: ['高性能', 'Go', '快速构建', '并发']
  },
  {
    icon: '🐳',
    title: '易部署',
    description: 'Docker 一键部署，单文件运行，配置简单，支持 systemd 服务管理。',
    items: [
      'Docker Compose 部署',
      '单文件运行',
      '配置简单',
      'systemd 服务',
      '自动更新',
      '备份恢复'
    ],
    tags: ['Docker', '部署', '配置', 'systemd']
  },
  {
    icon: '💝',
    title: '开源免费',
    description: 'PolyForm NC 协议，完全开源，社区驱动，持续更新。',
    items: [
      'PolyForm NC 协议',
      '完全开源代码',
      '社区驱动开发',
      '持续功能更新',
      '活跃的社区',
      '详细的文档'
    ],
    tags: ['开源', '免费', '社区', '持续更新']
  }
]

// 使用原始数据，不复制
const features = ref(originalFeatures)

// 当前卡片索引
const currentCardIndex = ref(0)

// 自动滚动函数 - 改为简单的1-8循环
const autoScroll = () => {
  if (!carouselRef.value || isPaused.value) return
  
  const cardWidth = carouselRef.value.querySelector('.carousel-card')?.clientWidth || 0
  const gap = 24
  
  // 计算下一个卡片索引
  currentCardIndex.value = (currentCardIndex.value + 1) % originalFeatures.length
  
  // 滚动到对应位置
  const scrollDistance = (cardWidth + gap) * currentCardIndex.value
  
  carouselRef.value.scrollTo({
    left: scrollDistance,
    behavior: 'smooth'
  })
}

// 启动自动滚动
const startAutoScroll = () => {
  if (autoScrollTimer.value) clearInterval(autoScrollTimer.value)
  autoScrollTimer.value = setInterval(autoScroll, 3000)
}

// 停止自动滚动
const stopAutoScroll = () => {
  if (autoScrollTimer.value) {
    clearInterval(autoScrollTimer.value)
    autoScrollTimer.value = undefined
  }
}

// 暂停/恢复自动滚动
const pauseAutoScroll = () => {
  isPaused.value = true
}

const resumeAutoScroll = () => {
  isPaused.value = false
}

// 轮播控制函数
const scrollLeft = () => {
  if (carouselRef.value) {
    pauseAutoScroll()
    const cardWidth = carouselRef.value.querySelector('.carousel-card')?.clientWidth || 0
    const gap = 24 // 1.5rem gap
    const scrollDistance = (cardWidth + gap) * cardsPerView.value
    
    carouselRef.value.scrollBy({
      left: -scrollDistance,
      behavior: 'smooth'
    })
    
    // 2秒后恢复自动滚动
    setTimeout(resumeAutoScroll, 2000)
  }
}

const scrollRight = () => {
  if (carouselRef.value) {
    pauseAutoScroll()
    const cardWidth = carouselRef.value.querySelector('.carousel-card')?.clientWidth || 0
    const gap = 24 // 1.5rem gap
    const scrollDistance = (cardWidth + gap) * cardsPerView.value
    
    carouselRef.value.scrollBy({
      left: scrollDistance,
      behavior: 'smooth'
    })
    
    // 2秒后恢复自动滚动
    setTimeout(resumeAutoScroll, 2000)
  }
}

const goToPage = (pageIndex: number) => {
  if (carouselRef.value) {
    pauseAutoScroll()
    const cardWidth = carouselRef.value.querySelector('.carousel-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = (cardWidth + gap) * cardsPerView.value * pageIndex
    
    carouselRef.value.scrollTo({
      left: scrollDistance,
      behavior: 'smooth'
    })
    
    // 2秒后恢复自动滚动
    setTimeout(resumeAutoScroll, 2000)
  }
}

const handleScroll = () => {
  if (carouselRef.value) {
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value
    const cardWidth = carouselRef.value.querySelector('.carousel-card')?.clientWidth || 0
    const gap = 24
    
    isAtStart.value = scrollLeft <= 10
    isAtEnd.value = scrollLeft >= scrollWidth - clientWidth - 10
    
    // 计算当前页
    const cardPosition = (cardWidth + gap)
    currentPage.value = Math.round(scrollLeft / cardPosition)
    currentCardIndex.value = currentPage.value
  }
}

// 响应式调整每页显示卡片数
const updateCardsPerView = () => {
  const width = window.innerWidth
  if (width >= 1280) {
    cardsPerView.value = 3
  } else if (width >= 768) {
    cardsPerView.value = 2
  } else {
    cardsPerView.value = 1
  }
}

onMounted(async () => {
  if (typeof window !== 'undefined') {
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    
    await nextTick()
    
    // 初始化滚动状态
    handleScroll()
    
    // 启动自动滚动
    startAutoScroll()
    
    // 动画效果
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      ScrollTrigger.batch(['.carousel-card', '.stat-item'], {
        onEnter: (elements) => {
          elements.forEach((element) => {
            if (element.classList.contains('carousel-card')) {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
              })
            } else if (element.classList.contains('stat-item')) {
              gsap.to(element, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.5)'
              })
            }
          })
        },
        start: 'top 85%',
        once: true
      })
      
      ScrollTrigger.refresh()
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
    }
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
.features-section {
  background-color: transparent !important;
  transition: background-color 0.3s ease;
}

/* 轮播容器样式 */
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 60px; /* 为导航按钮留出空间 */
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

/* 轮播卡片样式 */
.carousel-card {
  flex: 0 0 calc(33.333% - 1rem); /* 桌面端显示3个 */
  min-width: 320px;
  max-width: 400px;
  position: relative;
  background: linear-gradient(145deg, rgba(26, 29, 46, 0.95) 0%, rgba(36, 39, 65, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 10px 40px rgba(5, 217, 232, 0.1),
    0 0 0 1px rgba(5, 217, 232, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 400px;
  opacity: 0.95;
  overflow: hidden;
}

[data-theme="dark"] .carousel-card {
  background: linear-gradient(135deg, rgba(20, 24, 35, 0.8) 0%, rgba(26, 29, 46, 0.7) 100%);
  border: 1px solid rgba(5, 217, 232, 0.2);
  box-shadow: 0 8px 32px rgba(5, 217, 232, 0.08), 0 0 0 1px rgba(5, 217, 232, 0.1);
}

.carousel-card:hover {
  border-color: rgba(5, 217, 232, 0.6);
  box-shadow:
    0 25px 80px rgba(5, 217, 232, 0.2),
    0 0 60px rgba(5, 217, 232, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  opacity: 1;
  background: linear-gradient(145deg, rgba(36, 39, 65, 0.98) 0%, rgba(46, 49, 75, 0.95) 100%);
}

[data-theme="dark"] .carousel-card:hover {
  border-color: rgba(5, 217, 232, 0.4);
  box-shadow: 0 20px 60px rgba(5, 217, 232, 0.15), 0 0 30px rgba(5, 217, 232, 0.2);
  background: linear-gradient(135deg, rgba(26, 29, 46, 0.9) 0%, rgba(36, 39, 65, 0.8) 100%);
}

/* 导航按钮样式 */
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.2), rgba(157, 76, 237, 0.2));
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 50%;
  color: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.carousel-nav:hover {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.3), rgba(157, 76, 237, 0.3));
  border-color: rgba(5, 217, 232, 0.5);
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.3);
}

.carousel-nav:disabled {
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

/* 卡片内容样式 */
.feature-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.feature-icon {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.2), rgba(157, 76, 237, 0.15));
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(5, 217, 232, 0.4);
  box-shadow: 
    0 0 30px rgba(5, 217, 232, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .feature-icon {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.15), rgba(157, 76, 237, 0.15));
  border: 1px solid rgba(5, 217, 232, 0.3);
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.1);
}

.carousel-card:hover .feature-icon {
  box-shadow: 0 0 30px rgba(5, 217, 232, 0.3);
}

.feature-title-area {
  margin-left: 0.75rem;
  flex: 1;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

.feature-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.2), rgba(157, 76, 237, 0.2));
  color: var(--vp-c-brand-light);
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.25rem;
  border: 1px solid rgba(5, 217, 232, 0.3);
}

.feature-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.feature-description {
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.feature-list {
  flex: 1;
  margin-bottom: 1rem;
  list-style: none;
  padding: 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
  transition: all 0.3s ease;
}

.feature-item:hover {
  color: var(--cyber-text-primary);
}

.feature-square {
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
  border-radius: 2px;
  border: 1px solid;
  opacity: 0.8;
}

.feature-tags {
  border-top: 1px solid var(--cyber-border);
  padding-top: 0.75rem;
  margin-top: auto;
  overflow: hidden;
}

.scrollable-tags {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollable-tags::-webkit-scrollbar {
  display: none;
}

.tags-container {
  display: flex;
  gap: 0.25rem;
  min-width: max-content;
  padding-bottom: 2px;
}

.feature-tag {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* 进度指示器样式 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
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

/* 发光效果 */
.feature-glow {
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  background: radial-gradient(circle at center, rgba(5, 217, 232, 0.1) 0%, transparent 70%);
}

[data-theme="dark"] .feature-glow {
  background: radial-gradient(circle at center, rgba(5, 217, 232, 0.15) 0%, rgba(157, 76, 237, 0.05) 50%, transparent 70%);
}

.carousel-card:hover .feature-glow {
  opacity: 1;
}

/* 统计区域样式 */
.features-stats {
  padding-top: 3rem;
}

.stat-item {
  position: relative;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 3rem;
  background: linear-gradient(to bottom, var(--cyber-border-hover), transparent);
  transform: translateX(-50%);
}

.stat-item:first-child::before {
  display: none;
}

/* 响应式设计 */
@media (max-width: 1279px) {
  .carousel-card {
    flex: 0 0 calc(50% - 0.75rem); /* 平板显示2个 */
    min-width: 280px;
  }
}

@media (max-width: 767px) {
  .carousel-card {
    flex: 0 0 calc(100% - 1rem); /* 手机显示1个 */
    min-width: 260px;
  }
  
  .carousel-wrapper {
    padding: 0 50px;
  }
  
  .carousel-nav {
    width: 40px;
    height: 40px;
  }
  
  .nav-left {
    left: 5px;
  }
  
  .nav-right {
    right: 5px;
  }
  
  .feature-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .feature-icon span {
    font-size: 1.25rem;
  }
  
  .features-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .stat-item:nth-child(n+3) {
    display: none;
  }
  
  .stat-item::before {
    display: none;
  }
}

/* 亮色主题特定样式 */
[data-theme="light"] .features-section {
  background: var(--cyber-bg-primary);
}

[data-theme="light"] .carousel-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .carousel-card:hover {
  box-shadow: 0 10px 40px var(--cyber-shadow), 0 0 20px var(--cyber-border);
}

[data-theme="light"] .feature-icon {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 2px 10px var(--cyber-shadow);
}

[data-theme="light"] .feature-badge {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
}

[data-theme="light"] .feature-glow {
  background: radial-gradient(circle at center, var(--cyber-border-hover) 0%, transparent 70%);
}

[data-theme="light"] .carousel-nav {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
}

[data-theme="light"] .carousel-nav:hover {
  background: var(--cyber-bg-primary);
  box-shadow: 0 4px 12px var(--cyber-shadow);
}
</style>