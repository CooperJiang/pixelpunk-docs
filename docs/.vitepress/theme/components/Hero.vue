<template>
  <section class="hero-section relative overflow-hidden">
    <!-- 背景效果 -->
    <div class="hero-bg">
      <div class="matrix-rain absolute inset-0"></div>
      <div class="grid-overlay absolute inset-0 opacity-5"></div>
      <div class="gradient-overlay absolute inset-0"></div>
    </div>
    
    <!-- 主要内容 -->
    <div class="hero-content relative z-10 w-full">
      <div class="hero-container grid lg:grid-cols-2 gap-6 items-center py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <!-- 左侧文本内容 -->
        <div class="hero-text space-y-6">
          
          <div class="space-y-6">
            <!-- 核心理念标语 -->
            <div class="brand-slogan">
              <div class="slogan-text">
                <span class="slogan-brand">PixelPunk</span>
                <span class="slogan-separator">·</span>
                <span class="slogan-concept">最强大的开源图床平台</span>
              </div>
            </div>
            
            <p class="text-lg lg:text-xl leading-relaxed max-w-2xl font-medium" style="color: var(--cyber-text-secondary); line-height: 1.6;">
              赛博朋克风格的企业级智能图床平台，集成
              <span class="font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">AI智能分析</span>、
              <span class="font-bold bg-gradient-to-r from-cyber-purple to-cyber-pink bg-clip-text text-transparent">向量搜索</span>、
              <span class="font-bold bg-gradient-to-r from-cyber-pink to-cyber-yellow bg-clip-text text-transparent">多云存储</span>、
              <span class="font-bold bg-gradient-to-r from-cyber-yellow to-cyber-blue bg-clip-text text-transparent">带宽控制</span>、
              <span class="font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">企业管理</span>等
              于一体的全栈图片管理解决方案
            </p>
          </div>
          
          <div class="hero-features grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
            <div class="feature-badge ai-feature">
              <div class="badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div class="badge-content">
                <div class="badge-title">AI 智能</div>
                <div class="badge-desc">AI全自动分析</div>
              </div>
            </div>
            <div class="feature-badge search-feature">
              <div class="badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                  <circle cx="11" cy="8" r="2"/>
                </svg>
              </div>
              <div class="badge-content">
                <div class="badge-title">向量搜索</div>
                <div class="badge-desc">智能推荐</div>
              </div>
            </div>
            <div class="feature-badge cloud-feature">
              <div class="badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="16" cy="9" r="1"/>
                  <circle cx="8" cy="15" r="1"/>
                </svg>
              </div>
              <div class="badge-content">
                <div class="badge-title">多云存储</div>
                <div class="badge-desc">高可用性</div>
              </div>
            </div>
            <div class="feature-badge enterprise-feature">
              <div class="badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <div class="badge-content">
                <div class="badge-title">企业管理</div>
                <div class="badge-desc">带宽控制</div>
              </div>
            </div>
          </div>
          
          <div class="hero-actions flex flex-wrap items-center gap-4">
            <a href="/docs/getting-started" class="btn btn-primary group">
              <span class="btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  <circle cx="12" cy="12" r="1"/>
                </svg>
              </span>
              <span>立即开始</span>
              <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
            <a href="https://v1.pixelpunk.cc/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary group">
              <span class="btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  <circle cx="8" cy="9" r="1"/>
                  <path d="M16 11l-4 4-2-2"/>
                </svg>
              </span>
              <span>在线演示</span>
              <svg class="w-4 h-4 ml-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            <a href="https://github.com/CooperJiang/PixelPunk" target="_blank" rel="noopener noreferrer" class="btn btn-ghost group">
              <svg class="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
              <svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
          
          <div class="hero-stats grid grid-cols-3 gap-6 py-4 border-t border-cyber-primary/20">
            <div class="stat-item text-center">
              <div class="text-3xl font-bold glow-text" style="color: var(--vp-c-brand)">{{ animatedStats.images }}</div>
              <div class="text-sm mt-1" style="color: var(--cyber-text-tertiary)">技术栈</div>
            </div>
            <div class="stat-item text-center">
              <div class="text-3xl font-bold glow-text" style="color: var(--vp-c-brand-light)">{{ animatedStats.users }}</div>
              <div class="text-sm mt-1" style="color: var(--cyber-text-tertiary)">存储渠道</div>
            </div>
            <div class="stat-item text-center">
              <div class="text-3xl font-bold glow-text" style="color: var(--vp-c-brand-lighter)">{{ animatedStats.storage }}</div>
              <div class="text-sm mt-1" style="color: var(--cyber-text-tertiary)">行代码</div>
            </div>
          </div>
        </div>
        
        <!-- 右侧图片/动画 -->
        <div class="hero-visual relative">
          <div class="hero-image-container relative">
            <!-- 主展示区域 -->
            <div class="hero-dashboard neon-border-animated">
              <div class="dashboard-header">
                <div class="window-controls">
                  <span class="control red"></span>
                  <span class="control yellow"></span>
                  <span class="control green"></span>
                </div>
                <div class="dashboard-title">PixelPunk Dashboard</div>
              </div>
              
              <div class="dashboard-content">
                <div class="terminal-section">
                  <div class="terminal-line">
                    <span class="prompt">$</span>
                    <span class="command">pixelpunk</span>
                    <span class="cursor">|</span>
                  </div>
                  <div class="terminal-output">
                    <div class="output-line">🤖 AI Analysis Engine initialized</div>
                    <div class="output-line">🔍 Vector Search Engine ready</div>
                    <div class="output-line">☁️ Multi-cloud storage connected</div>
                    <div class="output-line">🚀 CDN & Bandwidth control active</div>
                    <div class="output-line">🛡️ Enterprise security enabled</div>
                    <div class="output-line success">✅ PixelPunk Enterprise ready!</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 浮动功能卡片 -->
            <div class="floating-features">
              <div class="feature-bubble ai-bubble" :style="{ transform: `translateY(${floatingOffset}px) rotate(${rotationOffset}deg)` }">
                <div class="bubble-icon">🤖</div>
                <div class="bubble-label">AI Vision</div>
                <div class="bubble-status">Active</div>
              </div>
              
              <div class="feature-bubble cloud-bubble" :style="{ transform: `translateY(${-floatingOffset * 0.8}px) rotate(${-rotationOffset * 0.5}deg)` }">
                <div class="bubble-icon">☁️</div>
                <div class="bubble-label">Cloud Storage</div>
                <div class="bubble-status">Connected</div>
              </div>
              
              <div class="feature-bubble security-bubble" :style="{ transform: `translateY(${floatingOffset * 0.6}px) rotate(${rotationOffset * 0.3}deg)` }">
                <div class="bubble-icon">🔒</div>
                <div class="bubble-label">Security</div>
                <div class="bubble-status">Enabled</div>
              </div>
            </div>
            
            <!-- 动态线条 -->
            <div class="connecting-lines">
              <svg class="connection-svg" viewBox="0 0 400 400">
                <path class="connection-path" d="M100,100 Q200,150 300,100" fill="none" stroke="url(#gradient)" stroke-width="2"/>
                <path class="connection-path" d="M150,200 Q250,250 350,200" fill="none" stroke="url(#gradient)" stroke-width="2"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" :style="{stopColor: 'var(--vp-c-brand)', stopOpacity: 0}"/>
                    <stop offset="50%" :style="{stopColor: 'var(--vp-c-brand)', stopOpacity: 1}"/>
                    <stop offset="100%" :style="{stopColor: 'var(--vp-c-brand-light)', stopOpacity: 0}"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 滚动提示 -->
    <div class="scroll-indicator">
      <div class="scroll-text">向下滚动</div>
      <div class="scroll-arrow">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

// 响应式数据
const animatedStats = ref({
  images: '10',
  users: '10',
  storage: '10'
})

const floatingOffset = ref(0)
const rotationOffset = ref(0)

// 目标数据
const targetStats = {
  images: '30+',
  users: '10+',
  storage: '20w+'
}

// 数字动画 - 完全禁用
const animateStats = () => {
  // 直接设置最终值，不使用动画
  animatedStats.value = {
    images: '30+',
    users: '10+',
    storage: '20w+'
  }
}

// 浮动动画 - 使用GSAP轻量级动画
const animateFloating = () => {
  // 使用GSAP创建轻量级浮动效果
  gsap.to(floatingOffset, {
    value: 15,
    duration: 3,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    onUpdate: () => {
      floatingOffset.value = floatingOffset.value
    }
  })
  
  gsap.to(rotationOffset, {
    value: 5,
    duration: 4,
    ease: "power2.inOut", 
    yoyo: true,
    repeat: -1,
    onUpdate: () => {
      rotationOffset.value = rotationOffset.value
    }
  })
}

// 初始化动画 - 完全简化
const initAnimations = () => {
  // 直接显示所有元素，不使用动画
  gsap.set('.hero-text', { opacity: 1, y: 0 })
  gsap.set('.hero-visual', { opacity: 1, scale: 1 })
  gsap.set('.scroll-indicator', { opacity: 1, y: 0 })
  
  // 立即显示最终数据
  animatedStats.value = {
    images: '30+',
    users: '10+',
    storage: '20w+'
  }
}

// 滚动处理 - 完全禁用
const handleScroll = () => {
  // 禁用滚动动画以提升性能
}

onMounted(async () => {
  // 动态导入 ScrollTrigger 避免构建问题
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      // 优化ScrollTrigger性能
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
        limitCallbacks: true
      })
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
    }
  }
  
  initAnimations()
  animateFloating() // 启用浮动动画
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 主背景 - 简化版 */
.hero-section {
  min-height: calc(100vh - var(--vp-nav-height, 64px));
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: 
    /* 主要渐变背景 */
    linear-gradient(135deg, 
      rgba(0, 12, 36, 0.95) 0%, 
      rgba(0, 25, 50, 0.9) 25%,
      rgba(0, 40, 70, 0.85) 50%,
      rgba(0, 60, 100, 0.8) 75%,
      rgba(0, 80, 140, 0.75) 100%
    );
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  margin: 0;
  padding: 2rem 0;
  /* 移除复杂动画 */
}

/* 简化背景容器 */
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

/* 移除复杂的背景效果 */
.hero-bg::before,
.hero-bg::after {
  display: none;
}

.matrix-rain {
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 98px,
      var(--cyber-border) 100px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 98px,
      var(--cyber-border) 100px
    );
  /* 移除动画 */
  opacity: var(--cyber-matrix-opacity);
}

/* 动态光束效果 */
.light-beams {
  display: none; /* 完全禁用光束效果 */
}

/* 网格覆盖层 - 简化版 */
.grid-overlay {
  background-image: 
    linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  /* 移除动画 */
}

.gradient-overlay {
  background: linear-gradient(45deg, 
    var(--cyber-border) 0%, 
    transparent 25%, 
    transparent 75%, 
    var(--cyber-border-hover) 100%);
  /* 移除动画 */
  opacity: var(--cyber-effect-opacity);
}

.hero-content {
  position: relative;
  z-index: 10;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  max-width: none !important;
}

.hero-container {
  max-width: var(--hero-container-max-width, 1400px) !important;
  margin: 0 auto !important;
  padding: 0 var(--hero-container-padding, 1.5rem) !important;
  width: 100% !important;
  gap: 3rem !important;
}

@media (max-width: 1024px) {
  .hero-container {
    max-width: 100% !important;
  }
}

/* 核心理念标语样式 */
.brand-slogan {
  position: relative;
  display: inline-block;
  margin: 1rem 0;
  padding: 1rem 0;
}

.slogan-text {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  z-index: 2;
}

.slogan-brand {
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 10px var(--vp-c-brand));
}

.slogan-separator {
  color: var(--vp-c-brand-light);
  font-size: 2rem;
  animation: separator-pulse 2s ease-in-out infinite;
}

.slogan-concept {
  background: linear-gradient(135deg, var(--vp-c-brand-light) 0%, var(--vp-c-brand-lighter) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
}

.slogan-concept::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--vp-c-brand-light), var(--vp-c-brand-lighter));
  border-radius: 1px;
  animation: underline-glow 3s ease-in-out infinite;
}

.slogan-subtitle {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--cyber-text-secondary);
  text-transform: none;
  letter-spacing: 0.02em;
  margin-top: 0.75rem;
  text-align: center;
  opacity: 0.9;
  line-height: 1.4;
}


@keyframes separator-pulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes underline-glow {
  0%, 100% {
    box-shadow: 0 0 5px var(--vp-c-brand-light);
  }
  50% {
    box-shadow: 0 0 15px var(--vp-c-brand-light), 0 0 25px var(--vp-c-brand);
  }
}


/* 功能标签 */
.hero-features {
  margin: 1.5rem 0;
}

.feature-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, var(--cyber-bg-secondary) 0%, var(--cyber-bg-tertiary) 100%);
  border: 1px solid var(--cyber-border);
  border-radius: 1rem;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.feature-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--cyber-border), transparent);
  transition: left 0.6s ease;
  opacity: 0.3;
}

.feature-badge:hover::before {
  left: 100%;
}

.feature-badge:hover {
  border-color: var(--cyber-border-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--cyber-shadow), 0 0 20px var(--cyber-border);
}

.badge-icon {
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cyber-border);
  border-radius: 0.75rem;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.badge-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--cyber-text-primary);
}

/* 功能标签专属颜色主题 */
.ai-feature {
  background: linear-gradient(135deg, 
    rgba(5, 217, 232, 0.12) 0%, 
    rgba(157, 76, 237, 0.08) 100%
  );
  border-color: rgba(5, 217, 232, 0.3);
}

.ai-feature:hover {
  border-color: rgba(5, 217, 232, 0.6);
  box-shadow: 0 8px 25px rgba(5, 217, 232, 0.25), 0 0 20px rgba(5, 217, 232, 0.15);
}

.ai-feature .badge-icon {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.9), rgba(157, 76, 237, 0.8));
}

.ai-feature .badge-icon svg {
  color: #161b22;
}

.cloud-feature {
  background: linear-gradient(135deg, 
    rgba(157, 76, 237, 0.12) 0%, 
    rgba(255, 42, 109, 0.08) 100%
  );
  border-color: rgba(157, 76, 237, 0.3);
}

.cloud-feature:hover {
  border-color: rgba(157, 76, 237, 0.6);
  box-shadow: 0 8px 25px rgba(157, 76, 237, 0.25), 0 0 20px rgba(157, 76, 237, 0.15);
}

.cloud-feature .badge-icon {
  background: linear-gradient(135deg, rgba(157, 76, 237, 0.9), rgba(255, 42, 109, 0.8));
}

.cloud-feature .badge-icon svg {
  color: #161b22;
}

.search-feature {
  background: linear-gradient(135deg, 
    rgba(34, 197, 94, 0.12) 0%, 
    rgba(16, 185, 129, 0.08) 100%
  );
  border-color: rgba(34, 197, 94, 0.3);
}

.search-feature:hover {
  border-color: rgba(34, 197, 94, 0.6);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.25), 0 0 20px rgba(34, 197, 94, 0.15);
}

.search-feature .badge-icon {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(16, 185, 129, 0.8));
}

.search-feature .badge-icon svg {
  color: #161b22;
}

.enterprise-feature {
  background: linear-gradient(135deg, 
    rgba(249, 200, 14, 0.12) 0%, 
    rgba(245, 158, 11, 0.08) 100%
  );
  border-color: rgba(249, 200, 14, 0.3);
}

.enterprise-feature:hover {
  border-color: rgba(249, 200, 14, 0.6);
  box-shadow: 0 8px 25px rgba(249, 200, 14, 0.25), 0 0 20px rgba(249, 200, 14, 0.15);
}

.enterprise-feature .badge-icon {
  background: linear-gradient(135deg, rgba(249, 200, 14, 0.9), rgba(245, 158, 11, 0.8));
}

.enterprise-feature .badge-icon svg {
  color: #161b22;
}

.badge-content {
  flex: 1;
  position: relative;
  z-index: 2;
}

.badge-title {
  font-weight: 600;
  color: var(--cyber-text-primary);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.badge-desc {
  font-size: 0.75rem;
  color: var(--cyber-text-tertiary);
  line-height: 1.3;
  opacity: 0.8;
  white-space: nowrap;
}

/* 紧凑版功能标签 */
.feature-tag-compact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 3rem;
}

.feature-tag-compact:hover {
  border-color: var(--cyber-border-hover);
  background: var(--cyber-border);
  transform: translateY(-1px);
}

.feature-icon-compact {
  font-size: 1.125rem;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cyber-border);
  border-radius: 0.375rem;
  flex-shrink: 0;
}

.feature-text-compact {
  font-weight: 600;
  color: var(--cyber-text-primary);
  font-size: 0.875rem;
  white-space: nowrap;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  gap: 0.25rem;
}

.btn-icon {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.btn-icon svg {
  width: 1rem;
  height: 1rem;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transition: left 0.6s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(8, 145, 178, 0.25), 0 0 15px rgba(8, 145, 178, 0.15);
  border: 1px solid var(--vp-c-brand);
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.btn-primary:hover {
  box-shadow: 0 6px 25px rgba(8, 145, 178, 0.4), 0 0 25px rgba(8, 145, 178, 0.25);
  transform: translateY(-2px) scale(1.01);
  background: linear-gradient(135deg, var(--vp-c-brand-light) 0%, var(--vp-c-brand-lighter) 100%);
  color: #ffffff;
}

.btn-primary .btn-icon {
  color: #ffffff;
}

.btn-primary:hover .btn-icon {
  animation: pulse-glow 1.5s ease-in-out infinite;
  color: #ffffff;
}

.btn-secondary {
  background: linear-gradient(135deg, var(--vp-c-brand-dark) 0%, var(--vp-c-brand-darker) 100%);
  border: 1px solid var(--vp-c-brand-dark);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(8, 145, 178, 0.25);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.btn-secondary:hover {
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
  box-shadow: 0 6px 25px rgba(8, 145, 178, 0.4), 0 0 20px rgba(8, 145, 178, 0.2);
  transform: translateY(-2px) scale(1.01);
  border-color: var(--vp-c-brand);
  color: #ffffff;
}

.btn-secondary .btn-icon {
  color: #ffffff;
}

.btn-ghost {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(31, 41, 55, 0.8) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  backdrop-filter: blur(15px);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.btn-ghost:hover {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(31, 41, 55, 0.9) 100%);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.btn-ghost .btn-icon {
  color: #ffffff;
}

@keyframes pulse-glow {
  0%, 100% {
    filter: drop-shadow(0 0 5px currentColor);
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 15px currentColor);
    transform: scale(1.1);
  }
}

/* 统计数据 */
.hero-stats {
  position: relative;
}

.stat-item {
  position: relative;
  padding: 2rem 1rem;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  width: 1px;
  height: 60%;
  background: linear-gradient(180deg, transparent, var(--cyber-border-hover), transparent);
  transform: translateY(-50%);
}

.stat-item:last-child::before {
  display: none;
}

/* 移除text-glow动画 */
.glow-text {
  text-shadow: 0 0 20px currentColor;
  /* 移除动画 */
}

/* 右侧视觉效果 */
.hero-visual {
  perspective: 1000px;
  position: relative;
  overflow: visible;
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image-container {
  position: relative;
  transform-style: preserve-3d;
  overflow: visible; /* 允许悬浮元素显示 */
}

.hero-dashboard {
  background: 
    linear-gradient(135deg, 
      rgba(0, 20, 40, 0.95) 0%, 
      rgba(0, 35, 60, 0.9) 50%, 
      rgba(0, 50, 80, 0.95) 100%
    );
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 1.25rem;
  overflow: hidden;
  backdrop-filter: blur(10px); /* 减少blur强度 */
  position: relative;
  width: 100%;
  min-width: 500px;
  max-width: 550px;
  height: 350px;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); /* 简化阴影 */
  /* 移除所有动画和GPU加速 */
}

.neon-border-animated {
  position: relative;
  /* 移除所有GPU加速和动画 */
}

.neon-border-animated::before {
  display: none; /* 完全禁用边框动画 */
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--cyber-bg-tertiary);
  border-bottom: 1px solid var(--cyber-border);
}

.window-controls {
  display: flex;
  gap: 0.5rem;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control.red { background: #ff5f57; }
.control.yellow { background: #ffbd2e; }
.control.green { background: #28ca42; }

.dashboard-title {
  color: var(--vp-c-brand);
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
}

.dashboard-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.terminal-section {
  background: var(--cyber-bg-tertiary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
}

.terminal-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.prompt {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.command {
  color: var(--vp-c-brand-light);
}

/* 移除cursor动画以减少卡顿 */
.cursor {
  color: var(--vp-c-brand);
  /* 移除动画 */
}

.terminal-output {
  space-y: 0.5rem;
}

.output-line {
  color: var(--cyber-text-tertiary);
  margin: 0.5rem 0;
}

.output-line.success {
  color: var(--vp-c-brand);
}

/* 浮动功能泡泡 */
.floating-features {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  overflow: visible; /* 允许卡片超出面板边界 */
}

.feature-bubble {
  position: absolute;
  background: rgba(0, 30, 60, 0.8);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  max-width: 140px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  /* 移除所有动画和GPU加速 */
  z-index: 15;
}

.ai-bubble {
  top: -25%;
  left: 40%;
  border-color: var(--vp-c-brand);
  /* 移除动画 */
}

.cloud-bubble {
  top: 60%;
  right: -25%;
  border-color: var(--vp-c-brand-light);
  /* 移除动画 */
}

.security-bubble {
  bottom: -25%;
  left: 5%;
  border-color: var(--vp-c-brand-lighter);
  /* 移除动画 */
}

.bubble-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.bubble-label {
  font-weight: 600;
  color: var(--cyber-text-primary);
  font-size: 0.875rem;
}

.bubble-status {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* 连接线 */
.connecting-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.connection-svg {
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

/* 移除连接线动画 */
.connection-path {
  stroke-dasharray: 5, 5;
  /* 移除动画 */
}

/* 滚动提示 */
.scroll-indicator {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-brand);
  z-index: 10;
}

.scroll-text {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* 滚动箭头动画 */
.scroll-arrow {
  animation: scroll-bounce 2s ease-in-out infinite;
}

/* 移除所有复杂动画 */
@keyframes matrix-move {
  /* 禁用 */
}

@keyframes gradient-shift {
  /* 禁用 */
}

@keyframes hero-background-shift {
  /* 禁用 */
}

@keyframes particles-float {
  /* 禁用 */
}

@keyframes flowing-light {
  /* 禁用 */
}

@keyframes terminal-glow {
  /* 禁用 */
}

@keyframes enhanced-float {
  /* 禁用 */
}

/* 移除所有关键帧动画定义 */
@keyframes badge-float { /* 禁用 */ }
@keyframes version-pulse { /* 禁用 */ }
@keyframes glitch-1 { /* 禁用 */ }
@keyframes glitch-2 { /* 禁用 */ }
@keyframes text-glow { /* 禁用 */ }
@keyframes border-rotate { /* 禁用 */ }
@keyframes cursor-blink { /* 禁用 */ }
@keyframes dash-move { /* 禁用 */ }
@keyframes scroll-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

/* 主题特定样式 */
[data-theme="light"] .hero-section {
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.06) 0%, transparent 50%),
    linear-gradient(135deg, var(--cyber-bg-primary) 0%, var(--cyber-bg-secondary) 100%);
}

[data-theme="light"] .feature-tag,
[data-theme="light"] .feature-tag-compact {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 2px 10px var(--cyber-shadow);
}

[data-theme="light"] .hero-dashboard {
  background: var(--cyber-bg-primary);
  border: 2px solid var(--cyber-border-hover);
  box-shadow: 
    0 20px 60px var(--cyber-shadow),
    inset 0 1px 0 var(--cyber-border);
}

[data-theme="light"] .terminal-section {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
}

[data-theme="light"] .feature-bubble {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 10px 30px var(--cyber-shadow);
}


/* 响应式设计 */
@media (max-width: 1024px) {
  .hero-visual {
    padding: 1rem; /* 减少移动端的padding */
  }
  
  .floating-features {
    display: none; /* 移动端隐藏悬浮元素 */
  }
  
  .connecting-lines {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: calc(100vh - var(--vp-nav-height, 64px));
    padding: 1rem 0;
  }
  
  .hero-content {
    padding: 0.5rem;
  }
  
  .hero-container {
    gap: 2rem !important;
    padding: 0 1rem !important;
  }
  
  .hero-text {
    space-y: 1rem;
  }
  
  /* 移动端标语响应式 */
  .slogan-text {
    font-size: 1.25rem;
    gap: 0.5rem;
    flex-direction: column;
    text-align: center;
  }
  
  .slogan-separator {
    font-size: 1.5rem;
  }
  
  .brand-slogan {
    margin: 1rem 0;
    padding: 0.5rem 0;
  }
  
  /* 移动端紧凑标签响应式 */
  .hero-features {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin: 1rem 0;
  }
  
  .feature-tag-compact {
    justify-content: center;
    padding: 0.75rem;
  }
  
  .feature-text-compact {
    font-size: 0.8rem;
  }
  
  .hero-features {
    padding: 0.5rem 0;
  }
  
  .hero-stats {
    padding: 0.5rem 0;
    gap: 1rem;
  }
  
  .scroll-indicator {
    bottom: 1rem;
  }
  
  .hero-features {
    grid-template-columns: 1fr;
  }
  
  .hero-actions {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  
  .btn {
    justify-content: center;
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-item::before {
    display: none;
  }
  
  .hero-dashboard {
    width: 100%;
    max-width: 400px;
    height: 280px;
  }
  
  .dashboard-content {
    padding: 1rem;
  }
  
  .stats-preview {
    grid-template-columns: 1fr;
  }
  
  /* 移动端隐藏动效 */
  .light-beams,
  .connecting-lines,
  .floating-features {
    display: none;
  }
  
  .matrix-rain {
    display: none;
  }
  
  .grid-overlay {
    animation: none;
  }
}

@media (max-width: 640px) {
  .feature-tag {
    padding: 0.75rem;
  }
  
  .feature-icon {
    width: 2rem;
    height: 2rem;
    font-size: 1.25rem;
  }
}
</style>