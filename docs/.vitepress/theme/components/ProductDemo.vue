<template>
  <section class="demo-section py-12">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6" :style="{background: 'linear-gradient(to right, var(--vp-c-brand-light), var(--vp-c-brand-lighter))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          产品演示
        </h2>
        <p class="text-xl max-w-3xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
          体验 PixelPunk 企业级功能：AI 智能分析、向量搜索、多云存储、带宽控制和企业管理
        </p>
      </div>
      
      <!-- 演示标签页 - 美化设计 -->
      <div class="demo-tabs flex justify-center mb-12">
        <div class="tab-container">
          <div class="tab-list" :style="{background: 'var(--cyber-bg-secondary)', border: '1px solid var(--cyber-border)'}">
            <!-- 滑动指示器 -->
            <div 
              class="tab-indicator" 
              :style="{
                transform: `translateX(${activeTab * 100}%)`,
                width: `${100 / tabs.length}%`
              }"
            ></div>
            
            <button
              v-for="(tab, index) in tabs"
              :key="`btn-${index}`"
              @click="switchTab(index)"
              :class="[
                'tab-button',
                { 'active': activeTab === index }
              ]"
              :style="{
                color: activeTab === index ? 'var(--cyber-bg-primary)' : 'var(--cyber-text-secondary)',
                zIndex: activeTab === index ? 10 : 1
              }"
            >
              <span class="tab-icon">{{ tab.icon }}</span>
              <span class="tab-text">{{ tab.name }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 演示内容 -->
      <div class="demo-content">
        <div class="tab-content-wrapper">
          <Transition
            name="tab-content"
            mode="out-in"
          >
            <div
              :key="activeTab"
              class="demo-tab-content"
            >
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- 左侧描述 -->
            <div class="demo-description">
              <h3 class="text-3xl font-bold mb-6" :style="{color: 'var(--vp-c-brand)'}">
                {{ tabs[activeTab].title }}
              </h3>
              <p class="text-lg mb-8 leading-relaxed" :style="{color: 'var(--cyber-text-secondary)'}">
                {{ tabs[activeTab].description }}
              </p>
              
              <!-- 特性列表 -->
              <div class="demo-features space-y-4 mb-8">
                <div
                  v-for="feature in tabs[activeTab].features"
                  :key="feature"
                  class="flex items-center"
                >
                  <div class="w-2 h-2 rounded-full mr-4" :style="{background: 'var(--vp-c-brand)'}"></div>
                  <span :style="{color: 'var(--cyber-text-secondary)'}">{{ feature }}</span>
                </div>
              </div>
              
              <!-- 操作按钮 -->
              <div class="demo-actions flex gap-4">
                <a href="/demo" class="btn btn-primary">
                  在线体验
                </a>
                <a href="/docs/getting-started" class="btn btn-secondary">
                  查看文档
                </a>
              </div>
            </div>
            
            <!-- 右侧演示图片 -->
            <div class="demo-visual">
              <div class="demo-screen hologram neon-border">
                <div class="demo-screen-header">
                  <div class="screen-dots">
                    <div class="dot dot-red"></div>
                    <div class="dot dot-yellow"></div>
                    <div class="dot dot-green"></div>
                  </div>
                  <div class="screen-title">{{ tabs[activeTab].screenTitle }}</div>
                </div>
                <div class="demo-screen-content">
                  <!-- 优先显示真实截图，如果不存在则显示占位符 -->
                  <img 
                    :src="tabs[activeTab].demoImage" 
                    :alt="tabs[activeTab].screenTitle"
                    class="demo-screenshot"
                    @error="handleImageError"
                    @load="handleImageLoad"
                    v-show="!imageErrors[tabs[activeTab].demoImage]"
                  />
                  
                  <!-- 图片加载失败时显示占位符 -->
                  <div 
                    v-show="imageErrors[tabs[activeTab].demoImage]" 
                    class="demo-placeholder"
                  >
                    <div class="placeholder-content">
                      <div class="placeholder-icon">{{ tabs[activeTab].icon }}</div>
                      <div class="placeholder-title">{{ tabs[activeTab].screenTitle }}</div>
                      <div class="placeholder-subtitle">{{ tabs[activeTab].mockData?.preview || '功能演示界面' }}</div>
                      <div class="placeholder-note">{{ tabs[activeTab].mockData?.note || '等待添加真实截图' }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 浮动元素 -->
              <div class="demo-floating-elements">
                <div
                  v-for="(element, idx) in tabs[activeTab].floatingElements"
                  :key="idx"
                  class="floating-element"
                  :style="element.style"
                >
                  <div class="element-icon">{{ element.icon }}</div>
                  <div class="element-text">{{ element.text }}</div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </Transition>
        </div>
      </div>
      
      <!-- 底部 CTA -->
      <div class="demo-cta text-center mt-20">
        <div class="cta-content rounded-2xl p-12">
          <h3 class="text-3xl font-bold mb-4" :style="{color: 'var(--cyber-text-primary)'}">
            准备开始使用了吗？
          </h3>
          <p class="text-lg mb-8 max-w-2xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
            立即开始使用 PixelPunk，体验 AI 智能图床的强大功能
          </p>
          <div class="flex justify-center gap-4">
            <a href="/docs/getting-started" class="btn btn-primary">
              立即开始
            </a>
            <a href="/demo" class="btn btn-ghost">
              在线演示
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const activeTab = ref(0)
const imageErrors = ref<Record<string, boolean>>({})

// Tab切换处理函数
const switchTab = (index: number) => {
  console.log('切换到tab:', index)
  activeTab.value = index
  
  // 添加切换动画
  if (typeof window !== 'undefined' && window.gsap) {
    gsap.fromTo('.demo-description', 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    gsap.fromTo('.demo-visual', 
      { opacity: 0, x: 30 }, 
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 }
    )
  }
}

// 图片加载错误处理
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const src = img.src
  console.log('图片加载失败:', src)
  imageErrors.value[src] = true
}

// 图片加载成功处理
const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  const src = img.src
  imageErrors.value[src] = false
}

const tabs = [
  {
    name: 'AI 分析',
    title: 'AI 智能图像分析',
    description: '集成 GPT-4V、Claude Vision 等多模型，提供深度图像理解、自动标签生成和内容安全检测。',
    screenTitle: 'AI 分析控制台',
    icon: '🤖',
    demoImage: '/images/demo/ai-analysis-demo.webp',
    mockData: {
      preview: '智能分析中...',
      note: '展示AI分析结果、标签生成、安全评分等功能',
      stats: [
        '已分析图片: 1,234,567',
        '生成标签: 15,678,901', 
        '安全检测: 100%',
        '平均响应: 1.2秒'
      ]
    },
    features: [
      '多模型智能分析（GPT-4V、Claude、Gemini）',
      '自动生成语义化标签和描述',
      '内容安全检测和合规评分',
      '图片质量和技术参数分析',
      '色彩分析和主题提取',
      '相似度计算和向量化'
    ],
    floatingElements: [
      {
        icon: '🏷️',
        text: '智能标签',
        style: { top: '20%', left: '-10%' }
      },
      {
        icon: '🔍',
        text: '内容检测',
        style: { top: '40%', right: '-15%' }
      },
      {
        icon: '🎨',
        text: '色彩分析',
        style: { bottom: '20%', left: '-5%' }
      }
    ]
  },
  {
    name: '向量搜索',
    title: '智能向量搜索引擎',
    description: '基于 1536 维向量空间的语义搜索，支持以图搜图、自然语言搜索和智能推荐。',
    screenTitle: '搜索引擎控制台',
    icon: '🔍',
    demoImage: '/images/demo/image-management-demo.webp',
    mockData: {
      preview: '管理系统界面',
      note: '展示文件夹管理、批量操作、智能分类等功能',
      stats: [
        '总存储图片: 2,567,890',
        '文件夹数量: 1,234',
        '今日上传: 5,678',
        '存储使用: 85.6%'
      ]
    },
    features: [
      '1536维向量语义搜索',
      '以图搜图和相似度匹配',
      '自然语言描述搜索',
      '智能推荐和关联发现',
      '多模态搜索融合',
      '实时索引更新'
    ],
    floatingElements: [
      {
        icon: '📁',
        text: '文件夹管理',
        style: { top: '15%', left: '-8%' }
      },
      {
        icon: '🔄',
        text: '格式转换',
        style: { top: '50%', right: '-12%' }
      },
      {
        icon: '⚡',
        text: '批量处理',
        style: { bottom: '25%', left: '-10%' }
      }
    ]
  },
  {
    name: '企业管理',
    title: '企业级管理控制台',
    description: '完整的企业级管理功能，包括用户权限、带宽控制、成本分析和合规监管。',
    screenTitle: '企业管理面板',
    icon: '👑',
    demoImage: '/images/demo/cloud-storage-demo.webp',
    mockData: {
      preview: '企业管理控制台',
      note: '展示用户权限、带宽控制、成本分析等功能',
      stats: [
        '活跃用户: 12,345人',
        '带宽使用: 1.2TB/月',
        '成本统计: ￥15,678/月',
        '合规评分: 98.5%'
      ]
    },
    features: [
      '多级用户权限管理',
      '带宽和流量控制',
      '成本分析和预算管理',
      '合规性监管和审计',
      '多组织架构支持',
      'API 调用监控和率限'
    ],
    floatingElements: [
      {
        icon: '🛡️',
        text: '权限管理',
        style: { top: '20%', left: '-12%' }
      },
      {
        icon: '⚡',
        text: '带宽控制',
        style: { top: '35%', right: '-10%' }
      },
      {
        icon: '💰',
        text: '成本管理',
        style: { bottom: '20%', left: '-8%' }
      }
    ]
  },
  {
    name: '安全防护',
    title: '全面安全防护系统',
    description: '多层安全防护，包括内容审核、防盗链保护、访问控制和数据加密。',
    screenTitle: '安全控制台',
    icon: '🛡️',
    demoImage: '/images/demo/sharing-system-demo.webp',
    mockData: {
      preview: '安全防护面板',
      note: '展示内容审核、防盗链、访问控制等功能',
      stats: [
        '安全检测: 99.9%通过',
        '威胁拦截: 1,234次',
        '违规内容: 56个已处理',
        '安全评分: 98.5分'
      ]
    },
    features: [
      'AI 内容审核和合规检测',
      '防盗链和水印保护',
      'IP 黑白名单和访问控制',
      '数据加密和安全传输',
      '实时威胁监控和报警',
      '安全审计日志和追踪'
    ],
    floatingElements: [
      {
        icon: '🔐',
        text: '内容审核',
        style: { top: '25%', left: '-10%' }
      },
      {
        icon: '🛡️',
        text: '防盗链',
        style: { top: '40%', right: '-12%' }
      },
      {
        icon: '🔒',
        text: '数据加密',
        style: { bottom: '20%', left: '-8%' }
      }
    ]
  }
]

onMounted(() => {
})
</script>

<style scoped>

/* 美化的Tab容器 */
.tab-container {
  position: relative;
  padding: 0.5rem;
  background: linear-gradient(135deg, var(--cyber-bg-primary), var(--cyber-bg-secondary));
  border-radius: 1rem;
  border: 1px solid var(--cyber-border);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px var(--cyber-shadow);
}

.tab-list {
  position: relative;
  display: flex;
  border-radius: 0.75rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
  padding: 0.25rem;
}

/* 滑动指示器 */
.tab-indicator {
  position: absolute;
  top: 0.25rem;
  bottom: 0.25rem;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 0.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px var(--vp-c-brand);
  z-index: 1;
}

.tab-button {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  white-space: nowrap;
}

.tab-button:hover {
  transform: translateY(-1px);
}

.tab-button.active {
  color: var(--cyber-bg-primary) !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.tab-icon {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.tab-button.active .tab-icon {
  transform: scale(1.1);
}

.tab-text {
  font-weight: 600;
  letter-spacing: 0.025em;
}

.demo-tab-content {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.demo-description {
  opacity: 1 !important;
  transform: translateX(0) !important;
}

.demo-visual {
  opacity: 1 !important;
  transform: translateX(0) !important;
}

/* 内容切换动画 */
.tab-content-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.15s;
}

.tab-content-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-content-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.98);
}

.tab-content-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.98);
}

.tab-content-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.tab-content-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.tab-content-wrapper {
  min-height: 400px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.demo-features {
  border-left: 2px solid var(--cyber-border-hover);
  padding-left: 1.5rem;
}

.demo-screen {
  position: relative;
  background: var(--cyber-bg-tertiary);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 20px 60px var(--cyber-shadow);
}

.demo-screen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--cyber-border);
  border-bottom: 1px solid var(--cyber-border-hover);
}

.screen-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

.dot-red {
  background: #ff5f57;
}

.dot-yellow {
  background: #ffbd2e;
}

.dot-green {
  background: #28ca42;
}

.screen-title {
  color: var(--vp-c-brand);
  font-size: 0.875rem;
  font-weight: 500;
}

.demo-screen-content {
  position: relative;
  overflow: hidden;
  min-height: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0;
  display: block;
}

.demo-placeholder {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--cyber-bg-primary) 0%, var(--cyber-bg-secondary) 100%);
  border-radius: 0.5rem;
  border: 2px dashed var(--cyber-border-hover);
}

.placeholder-content {
  text-align: center;
  padding: 2rem;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.placeholder-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.placeholder-subtitle {
  font-size: 1rem;
  color: var(--cyber-text-secondary);
  margin-bottom: 0.5rem;
}

.placeholder-note {
  font-size: 0.875rem;
  color: var(--cyber-text-tertiary);
  font-style: italic;
}

.demo-floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  background: linear-gradient(135deg, var(--cyber-bg-secondary), var(--cyber-bg-primary));
  border: 1px solid var(--cyber-border-hover);
  border-radius: 0.75rem;
  backdrop-filter: blur(15px);
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), 0 0 10px var(--cyber-border);
  font-weight: 500;
  letter-spacing: 0.025em;
  white-space: nowrap;
  min-width: max-content;
  transform-origin: center;
}

.floating-element::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--vp-c-brand-lighter), var(--vp-c-brand));
  border-radius: inherit;
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.floating-element:hover::before {
  opacity: 0.2;
}

.floating-element:nth-child(1) {
  animation-delay: 0s;
  animation-duration: 5s;
}

.floating-element:nth-child(2) {
  animation-delay: 1.5s;
  animation-duration: 6s;
}

.floating-element:nth-child(3) {
  animation-delay: 3s;
  animation-duration: 7s;
}

.element-icon {
  font-size: 1rem;
  filter: drop-shadow(0 0 4px currentColor);
  animation: icon-pulse 2s ease-in-out infinite;
}

.element-text {
  position: relative;
  z-index: 1;
  font-weight: 600;
}

@keyframes icon-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-6px) rotate(0.5deg);
  }
  50% {
    transform: translateY(-8px) rotate(0deg);
  }
  75% {
    transform: translateY(-4px) rotate(-0.5deg);
  }
}

.cta-content {
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(26, 22, 37, 0.9) 0%, 
    rgba(45, 38, 64, 0.8) 50%, 
    rgba(36, 29, 53, 0.9) 100%) !important;
  border: 1px solid rgba(0, 255, 255, 0.3) !important;
  box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1), 0 0 0 1px rgba(0, 255, 255, 0.1);
}

[data-theme="dark"] .cta-content {
  background: linear-gradient(135deg, 
    rgba(26, 22, 37, 0.95) 0%, 
    rgba(45, 38, 64, 0.9) 50%, 
    rgba(36, 29, 53, 0.95) 100%) !important;
  border: 1px solid rgba(0, 255, 255, 0.4) !important;
  box-shadow: 0 8px 32px rgba(0, 255, 255, 0.15), 0 0 20px rgba(0, 255, 255, 0.1);
}

.cta-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  animation: shimmer 4s ease-in-out infinite;
  z-index: 0;
}

.cta-content > * {
  position: relative;
  z-index: 1;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* 亮色主题特定样式 */
[data-theme="light"] .demo-section {
  background: var(--cyber-bg-primary);
}

[data-theme="light"] .demo-screen {
  background: var(--cyber-bg-secondary);
  box-shadow: 0 10px 30px var(--cyber-shadow);
}

[data-theme="light"] .demo-screen-header {
  background: var(--cyber-bg-primary);
  border-bottom: 1px solid var(--cyber-border-hover);
}

[data-theme="light"] .floating-element {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 4px 15px var(--cyber-shadow);
}

[data-theme="light"] .cta-content {
  background: var(--cyber-bg-secondary) !important;
  border: 1px solid var(--cyber-border-hover) !important;
  box-shadow: 0 8px 25px var(--cyber-shadow);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .demo-tab-content .grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .demo-visual {
    order: -1;
  }
  
  .floating-element {
    display: none;
  }
}

@media (max-width: 768px) {
  .tab-container {
    padding: 0.375rem;
    margin: 0 1rem;
  }
  
  .tab-list {
    padding: 0.125rem;
    flex-wrap: wrap;
    gap: 0.125rem;
  }
  
  .tab-button {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    min-width: 0;
    flex: 1;
  }
  
  .tab-text {
    display: none;
  }
  
  .tab-icon {
    font-size: 1.25rem;
  }
  
  .tab-indicator {
    top: 0.125rem;
    bottom: 0.125rem;
  }
  
  .demo-screen-header {
    padding: 0.75rem;
  }
  
  .demo-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .tab-container {
    margin: 0 0.5rem;
  }
  
  .tab-button {
    padding: 0.625rem 0.75rem;
  }
  
  .tab-icon {
    font-size: 1.125rem;
  }
}
</style>