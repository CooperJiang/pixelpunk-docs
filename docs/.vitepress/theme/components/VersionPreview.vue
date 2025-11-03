<template>
  <div class="version-preview-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <div class="header-bg absolute inset-0">
        <div class="grid-overlay"></div>
        <div class="gradient-overlay"></div>
      </div>
      
      <div class="header-content relative z-10 container mx-auto px-4 py-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
          版本下载
        </h1>
        
        <p class="text-lg max-w-2xl mx-auto opacity-90 mb-10">
          选择适合你的 PixelPunk 版本，稳定版本可直接下载使用，开发版本可预览最新功能
        </p>
      </div>
    </div>

    <!-- 版本列表 -->
    <div class="versions-content container mx-auto px-4 pt-8 pb-16">
      <div class="versions-grid">
        <div 
          v-for="version in versions" 
          :key="version.id"
          class="version-card"
          :class="{ 
            'featured': version.featured, 
            'stable': version.status === 'stable',
            'development': version.status === 'development'
          }"
        >
          <!-- 版本信息 -->
          <div class="version-info-horizontal">
            <!-- 版本标识 -->
            <div class="version-header-horizontal">
              <div class="version-badge">{{ version.version }}</div>
              <div class="status-badge" :class="version.status">
                <span class="status-icon">{{ getStatusIcon(version.status) }}</span>
                <span class="status-text">{{ getStatusText(version.status) }}</span>
              </div>
            </div>

            <h3 class="version-title">{{ version.title }}</h3>
            <p class="version-description">{{ version.description }}</p>
            
            <!-- 版本特性 -->
            <div class="version-features-compact">
              <h4 class="features-title">核心特性</h4>
              <div class="features-grid">
                <div v-for="feature in version.features.slice(0, 4)" :key="feature" class="feature-item-compact">
                  <span class="feature-icon">✨</span>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>

            <!-- 版本差异 -->
            <div v-if="version.differences" class="version-differences-compact">
              <h4 class="differences-title">版本差异</h4>
              <div class="differences-grid">
                <div v-for="diff in version.differences.slice(0, 2)" :key="diff" class="difference-item-compact">
                  <span class="diff-icon">🔄</span>
                  <span>{{ diff }}</span>
                </div>
              </div>
            </div>

            <!-- 版本元数据 -->
            <div class="version-meta-horizontal">
              <div class="meta-item">
                <span class="meta-label">发布时间</span>
                <span class="meta-value">{{ formatDate(version.releaseDate) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">更新时间</span>
                <span class="meta-value">{{ formatDate(version.updateDate) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">版本大小</span>
                <span class="meta-value">{{ version.size }}</span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="version-actions-horizontal">
              <a 
                v-if="version.status === 'stable'"
                :href="version.demoUrl" 
                class="action-btn primary"
              >
                <span class="btn-icon">🚀</span>
                <span>前往安装</span>
              </a>
              <a 
                v-else
                :href="version.demoUrl" 
                target="_blank" 
                class="action-btn secondary"
              >
                <span class="btn-icon">👀</span>
                <span>预览功能</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'

interface Version {
  id: string
  version: string
  title: string
  description: string
  status: 'stable' | 'development' | 'beta'
  featured: boolean
  features: string[]
  differences?: string[]
  releaseDate: string
  updateDate: string
  size: string
  demoUrl: string
}

// Mock 版本数据
const versions: Version[] = [
  {
    id: 'v1',
    version: 'v1.0.0',
    title: 'PixelPunk 稳定版',
    description: '经过充分测试的稳定版本，适合生产环境使用。包含完整的图床功能和基础 AI 分析能力，可直接下载部署。',
    status: 'stable',
    featured: true,
    features: [
      '完整的图片上传和管理功能',
      '基础 AI 图片分析和标签生成',
      '多种云存储支持（阿里云、腾讯云、AWS）',
      '用户权限管理系统',
      'RESTful API 接口',
      '响应式前端界面'
    ],
    differences: [
      '经过长期测试，稳定性优异',
      '功能完善，适合生产环境',
      '性能优化到位，响应速度快',
      '文档完整，社区支持良好'
    ],
    releaseDate: '2024-01-15',
    updateDate: '2024-03-20',
    size: '45.2 MB',
    demoUrl: '/download'
  },
  {
    id: 'v2',
    version: 'v2.0.0-beta',
    title: 'PixelPunk 开发版',
    description: '最新的开发版本，包含实验性功能和最新特性。仅供开发者测试和预览，不建议在生产环境使用。',
    status: 'development',
    featured: false,
    features: [
      '全新的 UI 设计和交互体验',
      '增强的 AI 分析能力（GPT-4 Vision 集成）',
      '实时图片处理和滤镜效果',
      '智能相册和自动分类',
      '团队协作功能',
      'GraphQL API 支持',
      'Progressive Web App (PWA) 支持'
    ],
    differences: [
      '采用最新技术栈和架构',
      '性能提升 40%，UI 更加现代化',
      '新增团队协作和实时功能',
      '更强大的 AI 分析能力',
      '⚠️ 开发中，功能可能不稳定'
    ],
    releaseDate: '2024-05-01',
    updateDate: '2024-07-15',
    size: '52.8 MB',
    demoUrl: 'https://v1.pixelpunk.cc/'
  }
]

// 计算统计数据
const totalFeatures = computed(() => {
  return versions.reduce((total, version) => total + version.features.length, 0)
})

const stableVersions = computed(() => {
  return versions.filter(v => v.status === 'stable').length
})

const developmentVersions = computed(() => {
  return versions.filter(v => v.status === 'development').length
})

// 工具函数
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'stable': return '✅'
    case 'development': return '🚧'
    case 'beta': return '⚡'
    default: return '❓'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'stable': return '稳定版'
    case 'development': return '开发版'
    case 'beta': return '测试版'
    default: return '未知'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric' 
  })
}

onMounted(async () => {
  // 动态导入 ScrollTrigger 避免构建问题
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      // 版本卡片动画
      gsap.set('.version-card', { opacity: 0, y: 50 })
      
      ScrollTrigger.batch('.version-card', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2
          })
        },
        start: 'top 80%'
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
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

/* 版本卡片 - 上下布局 */
.version-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

.version-card:hover {
  border-color: var(--cyber-border-hover);
  box-shadow: 0 8px 32px var(--cyber-shadow), 0 0 20px var(--cyber-border);
  transform: translateY(-4px);
}

.version-card.featured {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 30px var(--cyber-border);
}

.version-card.stable {
  border-left: 4px solid #10b981;
}

.version-card.development {
  border-left: 4px solid #f59e0b;
}

/* 版本信息 */
.version-info-horizontal {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.version-header-horizontal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.version-badge {
  background: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.stable {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid #10b981;
}

.status-badge.development {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.version-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin: 0;
  line-height: 1.3;
}

.version-description {
  color: var(--cyber-text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

/* 版本特性 */
.version-features-compact {
  margin-bottom: 1rem;
}

.features-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.features-title::before {
  content: '⭐';
  font-size: 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
}

.feature-item-compact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--cyber-text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.feature-icon {
  color: var(--vp-c-brand);
  font-size: 0.8rem;
  flex-shrink: 0;
}

/* 版本差异 */
.version-differences-compact {
  margin-bottom: 1rem;
}

.differences-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.differences-title::before {
  content: '🔄';
  font-size: 1rem;
}

.differences-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.difference-item-compact {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: var(--cyber-text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.diff-icon {
  color: var(--vp-c-brand);
  font-size: 0.8rem;
  margin-top: 0.1rem;
  flex-shrink: 0;
}

/* 版本元数据 */
.version-meta-horizontal {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.meta-label {
  color: var(--cyber-text-tertiary);
  font-weight: 500;
}

.meta-value {
  color: var(--cyber-text-secondary);
  font-weight: 400;
}

/* 操作按钮 */
.version-actions-horizontal {
  display: flex;
  gap: 1rem;
  margin-top: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
}

.action-btn.primary {
  background: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  border: 1px solid var(--vp-c-brand);
}

.action-btn.primary:hover {
  background: var(--vp-c-brand-light);
  box-shadow: 0 0 20px var(--vp-c-brand);
  transform: translateY(-2px);
}

.action-btn.secondary {
  background: transparent;
  color: var(--cyber-text-primary);
  border: 1px solid var(--cyber-border-hover);
}

.action-btn.secondary:hover {
  background: var(--cyber-border);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.btn-icon {
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .version-info-horizontal {
    padding: 1rem;
  }
  
  .version-header-horizontal {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .version-actions-horizontal {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .version-meta-horizontal {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

/* 中等屏幕优化 */
@media (max-width: 1024px) and (min-width: 769px) {
  .version-info-horizontal {
    padding: 1.25rem;
  }
  
  .version-meta-horizontal {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>