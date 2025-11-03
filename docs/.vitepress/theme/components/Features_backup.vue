<template>
  <section class="features-section py-8">
    <div class="container mx-auto px-4">
      <!-- 标题区域 -->
      <div class="text-center mb-12">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6" :style="{background: 'linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          强大功能特性
        </h2>
        <p class="text-xl max-w-3xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
          集成 GPT-4 Vision + Qdrant 向量搜索，提供企业级智能图床解决方案，50+ API接口覆盖全业务场景
        </p>
      </div>
      
      <!-- 特性网格 -->
      <div class="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card group"
          :class="{ 
            'lg:col-span-2': feature.featured && index < 2,
            'lg:col-span-1': !feature.featured || index >= 2
          }"
        >
          <!-- 卡片头部 -->
          <div class="feature-header flex items-center mb-4">
            <div class="feature-icon">
              <span class="text-3xl">{{ feature.icon }}</span>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-semibold mb-1" :style="{color: 'var(--vp-c-brand)'}">
                {{ feature.title }}
              </h3>
              <div class="feature-badge" v-if="feature.badge">
                {{ feature.badge }}
              </div>
            </div>
          </div>
          
          <!-- 卡片内容 -->
          <div class="feature-content">
            <p class="mb-4 leading-relaxed text-sm" :style="{color: 'var(--cyber-text-secondary)'}">
              {{ feature.description }}
            </p>
            
            <!-- 功能列表 -->
            <ul class="feature-list space-y-2 mb-4">
              <li
                v-for="(item, idx) in feature.items"
                :key="idx"
                class="flex items-start"
              >
                <svg class="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" :style="{color: 'var(--vp-c-brand)'}" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-xs" :style="{color: 'var(--cyber-text-tertiary)'}">{{ item }}</span>
              </li>
            </ul>
            
            <!-- 技术标签 -->
            <div class="feature-tags flex flex-wrap gap-1" v-if="feature.tags">
              <span
                v-for="tag in feature.tags"
                :key="tag"
                class="px-2 py-1 text-xs font-medium rounded-full"
                :style="{background: 'var(--cyber-border)', color: 'var(--vp-c-brand)'}"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- 悬浮效果 -->
          <div class="feature-glow"></div>
        </div>
      </div>
      
      <!-- 底部统计 -->
      <div class="features-stats mt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
        <div class="stat-item text-center">
          <div class="text-3xl font-bold mb-2" :style="{color: 'var(--vp-c-brand)'}">50+</div>
          <div class="text-sm" :style="{color: 'var(--cyber-text-tertiary)'}">API 接口</div>
        </div>
        <div class="stat-item text-center">
          <div class="text-3xl font-bold mb-2" :style="{color: 'var(--vp-c-brand-light)'}">15+</div>
          <div class="text-sm" :style="{color: 'var(--cyber-text-tertiary)'}">数据表</div>
        </div>
        <div class="stat-item text-center">
          <div class="text-3xl font-bold mb-2" :style="{color: 'var(--vp-c-brand-lighter)'}">4+</div>
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
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const features = [
  {
    icon: '🤖',
    title: 'AI 智能分析',
    badge: 'GPT-4 Vision',
    description: '集成最新AI大模型图片识别技术，提供深度图像内容分析，智能生成标签和描述。',
    featured: true,
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
    featured: true,
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
    description: '多渠道存储管理系统，支持动态切换和配置管理，提供企业级可靠性。',
    items: [
      '多存储渠道（Local/OSS/COS/S3）',
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
  }
]

const checkElementsInViewport = () => {
  const elements = document.querySelectorAll('.feature-card, .stat-item')
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    
    // 如果元素已经在视口中或接近视口，直接显示
    if (rect.top < windowHeight * 0.85) {
      if (element.classList.contains('feature-card')) {
        gsap.set(element, { opacity: 1, y: 0 })
      } else if (element.classList.contains('stat-item')) {
        gsap.set(element, { opacity: 1, scale: 1 })
      }
    } else {
      if (element.classList.contains('feature-card')) {
        gsap.set(element, { opacity: 0, y: 30 })
      } else if (element.classList.contains('stat-item')) {
        gsap.set(element, { opacity: 0, scale: 0.9 })
      }
    }
  })
}

onMounted(async () => {
  // 动态导入 ScrollTrigger 避免构建问题
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      // 等待元素渲染完成
      await nextTick()
      
      // 检查初始状态
      checkElementsInViewport()
      
      // 合并所有动画到一个优化的ScrollTrigger
      ScrollTrigger.batch(['.feature-card', '.stat-item'], {
        onEnter: (elements) => {
          elements.forEach((element) => {
            if (element.classList.contains('feature-card')) {
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
      
      // 刷新 ScrollTrigger
      ScrollTrigger.refresh()
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
      // 失败时直接显示所有元素
      gsap.set('.feature-card', { opacity: 1, y: 0 })
      gsap.set('.stat-item', { opacity: 1, scale: 1 })
    }
  }
})
</script>

<style scoped>
.features-section {
  background-color: transparent !important;
  transition: background-color 0.3s ease;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  
  .feature-card.lg\\:col-span-2 {
    grid-column: span 2;
  }
}

.feature-card {
  position: relative;
  background: var(--cyber-bg-tertiary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px var(--cyber-shadow);
  backdrop-filter: blur(10px);
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: auto;
}

[data-theme="dark"] .feature-card {
  background: linear-gradient(135deg, rgba(20, 24, 35, 0.8) 0%, rgba(26, 29, 46, 0.7) 100%);
  border: 1px solid rgba(5, 217, 232, 0.2);
  box-shadow: 0 8px 32px rgba(5, 217, 232, 0.08), 0 0 0 1px rgba(5, 217, 232, 0.1);
}

.feature-card:hover {
  border-color: var(--cyber-border-hover);
  transform: translateY(-5px);
  box-shadow: 0 20px 60px var(--cyber-shadow), 0 0 30px var(--cyber-border-hover);
}

[data-theme="dark"] .feature-card:hover {
  border-color: rgba(5, 217, 232, 0.4);
  box-shadow: 0 20px 60px rgba(5, 217, 232, 0.15), 0 0 30px rgba(5, 217, 232, 0.2);
  background: linear-gradient(135deg, rgba(26, 29, 46, 0.9) 0%, rgba(36, 39, 65, 0.8) 100%);
}

.feature-card.lg\\:col-span-2 {
  @apply lg:flex lg:items-start lg:gap-8;
}

.feature-card.lg\\:col-span-2 .feature-header {
  @apply lg:flex-shrink-0;
}

.feature-card.lg\\:col-span-2 .feature-content {
  @apply lg:flex-1;
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.1), rgba(157, 76, 237, 0.1));
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 0 20px var(--cyber-border);
  transition: all 0.3s ease;
}

[data-theme="dark"] .feature-icon {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.15), rgba(157, 76, 237, 0.15));
  border: 1px solid rgba(5, 217, 232, 0.3);
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.1);
}

.feature-card:hover .feature-icon {
  box-shadow: 0 0 30px rgba(5, 217, 232, 0.3);
  transform: scale(1.05);
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

.feature-list li {
  transition: all 0.3s ease;
}

.feature-list li:hover {
  color: var(--cyber-text-primary);
}

.feature-tags {
  border-top: 1px solid var(--cyber-border);
  padding-top: 1rem;
}

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

.feature-card:hover .feature-glow {
  opacity: 1;
}

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

/* 亮色主题特定样式 */
[data-theme="light"] .features-section {
  background: var(--cyber-bg-primary);
}

[data-theme="light"] .feature-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .feature-card:hover {
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

/* 响应式设计 */
@media (min-width: 768px) and (max-width: 1023px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  .feature-card.lg\\:col-span-2 {
    grid-column: span 2;
  }
}

@media (max-width: 1024px) {
  .feature-card.lg\\:col-span-2 {
    display: block;
  }
  
  .feature-card.lg\\:col-span-2 .feature-header {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .feature-card.lg\\:col-span-2 {
    grid-column: span 1;
  }
  
  .feature-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .feature-icon span {
    font-size: 1.5rem;
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
</style>