<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="closeModal" v-show="visible">
      <div class="modal-container" @click.stop>
        <div class="modal-card">
          <!-- 关闭按钮 -->
          <button class="close-button" @click="closeModal" :style="{color: 'var(--cyber-text-secondary)'}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- 用户头像和基本信息 -->
          <div class="modal-header">
            <div class="avatar-container">
              <img 
                :src="contributor.avatar" 
                :alt="contributor.name"
                class="modal-avatar"
                @error="handleImageError"
              />
              <div class="avatar-decoration"></div>
            </div>
            <div class="basic-info">
              <h2 class="user-name" :style="{color: 'var(--vp-c-brand-light)'}">{{ contributor.name }}</h2>
              <p class="user-profession" :style="{color: 'var(--cyber-text-secondary)'}">{{ contributor.profession || '开发者' }}</p>
            </div>
          </div>

          <!-- 个性签名 -->
          <div class="signature-section" v-if="contributor.signature">
            <div class="section-title" :style="{color: 'var(--vp-c-brand)'}">
              <span class="section-icon">💭</span>
              个性签名
            </div>
            <p class="signature-text" :style="{color: 'var(--cyber-text-secondary)'}">
              "{{ contributor.signature }}"
            </p>
          </div>

          <!-- 链接区域 -->
          <div class="links-section">
            <div class="section-title" :style="{color: 'var(--vp-c-brand)'}">
              <span class="section-icon">🔗</span>
              相关链接
            </div>
            <div class="links-grid">
              <a 
                v-if="contributor.githubUrl" 
                :href="contributor.githubUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="link-item github-link"
              >
                <div class="link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div class="link-info">
                  <div class="link-title">GitHub</div>
                  <div class="link-url">查看代码仓库</div>
                </div>
                <div class="link-arrow">→</div>
              </a>

              <a 
                v-if="contributor.personalUrl" 
                :href="contributor.personalUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="link-item personal-link"
              >
                <div class="link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div class="link-info">
                  <div class="link-title">个人网站</div>
                  <div class="link-url">访问主页</div>
                </div>
                <div class="link-arrow">→</div>
              </a>
            </div>
          </div>

          <!-- 装饰元素 -->
          <div class="modal-decoration-1"></div>
          <div class="modal-decoration-2"></div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface Contributor {
  name: string
  avatar: string
  githubUrl?: string
  personalUrl?: string
  profession?: string
  signature?: string
}

const props = defineProps<{
  contributor: Contributor
}>()

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)

const closeModal = () => {
  const overlay = document.querySelector('.modal-overlay') as HTMLElement
  const card = document.querySelector('.modal-card') as HTMLElement
  
  if (overlay && card) {
    // 设置关闭动画
    overlay.style.transition = 'opacity 0.2s ease-in'
    card.style.transition = 'transform 0.2s ease-in, opacity 0.2s ease-in'
    
    overlay.style.opacity = '0'
    card.style.transform = 'scale(0.9)'
    card.style.opacity = '0'
    
    // 动画完成后发出事件
    setTimeout(() => {
      // 恢复矩阵雨显示
      const matrixRain = document.querySelector('.matrix-rain')
      if (matrixRain) {
        matrixRain.style.display = ''
      }
      // 移除padding补偿
      document.body.style.paddingRight = ''
      const navbar = document.querySelector('.VPNavBar')
      if (navbar) {
        navbar.style.paddingRight = ''
      }
      emit('close')
    }, 200)
  } else {
    // 确保即使在异常情况下也恢复样式
    document.body.style.paddingRight = ''
    const navbar = document.querySelector('.VPNavBar')
    if (navbar) {
      navbar.style.paddingRight = ''
    }
    const matrixRain = document.querySelector('.matrix-rain')
    if (matrixRain) {
      matrixRain.style.display = ''
    }
    emit('close')
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzczNzM3Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5VU0VSPC90ZXh0Pgo8L3N2Zz4K'
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

onMounted(async () => {
  await nextTick()
  visible.value = true
  
  // 计算滚动条宽度并添加padding补偿，避免页面抖动
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
    
    // 同时为固定定位的导航栏添加补偿
    const navbar = document.querySelector('.VPNavBar')
    if (navbar) {
      navbar.style.paddingRight = `${scrollbarWidth}px`
    }
  }
  
  // 暂停矩阵雨动画以提高性能
  const matrixRain = document.querySelector('.matrix-rain')
  if (matrixRain) {
    matrixRain.style.display = 'none'
  }
  
  // 使用 CSS transition 而不是 GSAP 避免冲突
  const overlay = document.querySelector('.modal-overlay') as HTMLElement
  const card = document.querySelector('.modal-card') as HTMLElement
  
  if (overlay && card) {
    // 设置初始状态
    overlay.style.opacity = '0'
    card.style.transform = 'scale(0.95)'
    card.style.opacity = '0'
    
    // 强制重流
    overlay.offsetHeight
    
    // 添加过渡类
    overlay.style.transition = 'opacity 0.2s ease-out'
    card.style.transition = 'transform 0.25s ease-out, opacity 0.25s ease-out'
    
    // 执行动画
    requestAnimationFrame(() => {
      overlay.style.opacity = '1'
      card.style.transform = 'scale(1)'
      card.style.opacity = '1'
    })
  }
  
  // 添加键盘事件监听
  document.addEventListener('keydown', handleEscapeKey)
  
  // 防止背景滚动
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  
  // 恢复导航栏样式
  const navbar = document.querySelector('.VPNavBar')
  if (navbar) {
    navbar.style.paddingRight = ''
  }
  
  // 确保矩阵雨重新显示
  const matrixRain = document.querySelector('.matrix-rain')
  if (matrixRain) {
    matrixRain.style.display = ''
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-card {
  position: relative;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-button:hover {
  background: var(--cyber-bg-secondary);
  color: var(--vp-c-brand);
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.modal-avatar {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--vp-c-brand);
  box-shadow: 0 0 30px var(--vp-c-brand);
}

.avatar-decoration {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--vp-c-brand), transparent, var(--vp-c-brand));
  opacity: 0.2;
  z-index: -1;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.user-profession {
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.8;
}

.signature-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
}

.signature-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--vp-c-brand), transparent, var(--vp-c-brand));
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-icon {
  font-size: 1.125rem;
}

.signature-text {
  font-size: 0.95rem;
  line-height: 1.6;
  font-style: italic;
  position: relative;
  padding-left: 1rem;
}

.signature-text::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.25rem;
  bottom: 0.25rem;
  width: 3px;
  background: var(--vp-c-brand);
  border-radius: 2px;
}

.links-section {
  margin-bottom: 1rem;
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.link-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(5px);
  box-shadow: 0 8px 25px var(--cyber-shadow);
}

.link-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--vp-c-brand);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.link-item:hover::before {
  transform: scaleY(1);
}

.link-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.github-link .link-icon {
  background: #24292e;
}

.personal-link .link-icon {
  background: var(--vp-c-brand);
}

.link-info {
  flex: 1;
}

.link-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin-bottom: 0.25rem;
}

.link-url {
  font-size: 0.8rem;
  color: var(--cyber-text-tertiary);
}

.link-arrow {
  font-size: 1.25rem;
  color: var(--vp-c-brand);
  transition: transform 0.3s ease;
}

.link-item:hover .link-arrow {
  transform: translateX(5px);
}

/* 装饰元素 */
.modal-decoration-1 {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--vp-c-brand) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.1;
  z-index: -1;
}

.modal-decoration-2 {
  position: absolute;
  bottom: -30px;
  left: -30px;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, var(--vp-c-brand-light) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.15;
  z-index: -1;
}

/* 亮色主题适配 */
[data-theme="light"] .modal-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15), 0 0 40px var(--cyber-border);
}

[data-theme="light"] .signature-section,
[data-theme="light"] .link-item {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
}

[data-theme="light"] .link-item:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .modal-container {
    max-width: 100%;
    margin: 0;
  }
  
  .modal-card {
    margin: 1rem;
    padding: 1.5rem;
    border-radius: 1rem;
  }
  
  .modal-avatar {
    width: 5rem;
    height: 5rem;
  }
  
  .user-name {
    font-size: 1.25rem;
  }
  
  .signature-section {
    padding: 1rem;
  }
  
  .link-item {
    padding: 0.75rem;
  }
  
  .link-icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>