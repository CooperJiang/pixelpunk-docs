<template>
  <div class="cyber-layout">
    <!-- 矩阵雨背景 -->
    <div class="matrix-rain">
      <div
        v-for="(column, index) in matrixColumns"
        :key="index"
        class="matrix-column"
        :style="{
          left: column.left + '%',
          animationDelay: column.delay + 's',
          animationDuration: column.duration + 's'
        }"
      >
        {{ column.text }}
      </div>
    </div>

    <!-- 主布局 -->
    <Layout>
      <!-- 自定义首页 -->
      <template #home-hero-before>
        <div class="cyber-hero-bg circuit-bg"></div>
      </template>

      <!-- 自定义导航栏 -->
      <template #nav-bar-content-after>
        <div class="nav-glow" :class="{ 'hidden': !isScrolled }"></div>
      </template>

      <!-- 自定义侧边栏 -->
      <!-- <template #sidebar-nav-before>
        <div class="sidebar-glow"></div>
      </template> -->

      <!-- 自定义内容区域 -->
      <template #doc-before>
        <div class="doc-glow"></div>
      </template>

      <!-- 自定义页脚 -->
      <template #layout-bottom>
        <div class="cyber-footer-bg"></div>
      </template>
    </Layout>

    <!-- 全局动画效果 -->
    <div class="cyber-effects">
      <!-- 扫描线 -->
      <div class="scan-lines" v-if="showEffects"></div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { gsap } from 'gsap'

const { Layout } = DefaultTheme

const route = useRoute()
const showEffects = ref(true)
const isScrolled = ref(false)
const matrixColumns = ref<Array<{
  left: number
  delay: number
  duration: number
  text: string
}>>([])

// 矩阵雨字符
const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?'

// 生成矩阵雨
const generateMatrixRain = () => {
  const columns = []
  for (let i = 0; i < 20; i++) {
    const text = Array.from({ length: 20 }, () => 
      matrixChars[Math.floor(Math.random() * matrixChars.length)]
    ).join('')
    
    columns.push({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      text
    })
  }
  matrixColumns.value = columns
}

// 初始化动画
const initAnimations = () => {
  // 检查DOM元素是否存在
  const navGlow = document.querySelector('.nav-glow')
  const sidebarGlow = document.querySelector('.sidebar-glow')
  
  // 先确保layout可见，避免滚动条闪烁
  gsap.set('.cyber-layout', { opacity: 1 })
  
  // 页面加载动画 - 优雅的组合效果，避免y轴动画导致滚动条闪烁
  const tl = gsap.timeline()
    .fromTo('.VPContent',
      { opacity: 0, scale: 0.99, filter: 'blur(2px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power1.out' }
    )

  // 只在元素存在时添加hero动画
  const heroElements = document.querySelectorAll('.VPContent .hero-section, .VPContent section:first-child')
  if (heroElements.length > 0) {
    tl.fromTo('.VPContent .hero-section, .VPContent section:first-child',
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power1.out' },
      '-=0.4'
    )
  }

  // 只在元素存在时添加其他section动画
  const otherSections = document.querySelectorAll('.VPContent section:not(:first-child)')
  if (otherSections.length > 0) {
    tl.fromTo('.VPContent section:not(:first-child)',
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power1.out', stagger: 0.1 },
      '-=0.3'
    )
  }
  
  // 只在元素存在时添加动画 - 初始化时隐藏nav-glow
  if (navGlow) {
    gsap.set('.nav-glow', { scaleX: 0, opacity: 0 })
  }
  
  if (sidebarGlow) {
    tl.from('.sidebar-glow', {
      scaleY: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.3')
  }
}

// 页面切换动画 - 优雅的过渡效果，避免y轴动画导致滚动条闪烁
const animatePageTransition = () => {
  const tl = gsap.timeline()
    .fromTo('.VPContent', 
      { opacity: 0, scale: 0.99, rotateX: 0.5 },
      { opacity: 1, scale: 1, rotateX: 0, duration: 0.5, ease: 'power1.out' }
    )
    .fromTo('.VPContent h1, .VPContent .hero-title', 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power1.out' },
      '-=0.3'
    )
}

// 滚动监听器
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isScrolled.value = scrollTop > 50
  
  // 动态添加/移除导航栏样式
  const navBar = document.querySelector('.VPNavBar')
  const navGlow = document.querySelector('.nav-glow')
  
  if (navBar) {
    if (isScrolled.value) {
      navBar.classList.add('scrolled')
    } else {
      navBar.classList.remove('scrolled')
    }
  }
  
  // 控制 nav-glow 显示/隐藏动画
  if (navGlow) {
    if (isScrolled.value) {
      gsap.to('.nav-glow', {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
    } else {
      gsap.to('.nav-glow', {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    }
  }
}

onMounted(() => {
  generateMatrixRain()
  initAnimations()
  
  // 页面加载后执行动画
  animatePageTransition()
  
  // 添加滚动监听器
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始检查
})

onUnmounted(() => {
  // 清理事件监听器
  window.removeEventListener('scroll', handleScroll)
})

// 响应式控制特效
const handleResize = () => {
  const isMobile = window.innerWidth < 768
  showEffects.value = !isMobile
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', handleResize)
  handleResize()
}
</script>

<style scoped>
.cyber-layout {
  position: relative;
  min-height: 100vh;
  background: var(--cyber-bg-primary);
  transition: background-color 0.3s ease;
}

.cyber-hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  z-index: -1;
}

.nav-glow {
  position: fixed;
  top: var(--vp-nav-height, 64px);
  left: 0;
  width: 100vw;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand), transparent);
  transform-origin: left;
  z-index: 999;
  transform: translateY(-2px);
}

.nav-glow.hidden {
  opacity: 0;
  pointer-events: none;
  display: none !important;
}

.sidebar-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, var(--vp-c-brand), transparent);
  transform-origin: top;
}

.doc-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand-light), transparent);
  opacity: 0.6;
}

.cyber-footer-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, transparent, var(--cyber-border));
  pointer-events: none;
}

.cyber-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.scan-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.matrix-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
  opacity: 0.1;
}

.matrix-column {
  position: absolute;
  top: -100%;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--vp-c-brand);
  white-space: pre;
  animation: matrix-fall linear infinite;
}

@keyframes matrix-fall {
  0% {
    top: -100%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}


/* 移动端优化 */
@media (max-width: 768px) {
  .scan-lines {
    display: none;
  }

  .matrix-rain {
    opacity: 0.05;
  }

  .matrix-column {
    font-size: 12px;
  }
}
</style>