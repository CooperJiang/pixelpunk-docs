<template>
  <section class="stats-section py-12">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6" :style="{background: 'linear-gradient(to right, var(--vp-c-brand-lighter), var(--vp-c-brand))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          项目数据统计
        </h2>
        <p class="text-xl max-w-3xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
          PixelPunk 是一个功能完备的企业级解决方案，拥有丰富的功能模块和强大的技术架构
        </p>
      </div>
      
      <!-- 统计网格 -->
      <div class="stats-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-card group"
        >
          <div class="stat-icon">
            <span class="text-4xl">{{ stat.icon }}</span>
          </div>
          <div class="stat-content">
            <div class="stat-number" :style="{color: 'var(--vp-c-brand)'}">{{ animatedStats[index] }}</div>
            <div class="stat-label" :style="{color: 'var(--cyber-text-tertiary)'}">{{ stat.label }}</div>
            <div v-if="stat.extra" class="stat-extra" :style="{color: 'var(--vp-c-brand-light)', fontSize: '0.7rem', marginTop: '0.25rem'}">{{ stat.extra }}</div>
          </div>
          <div class="stat-glow"></div>
        </div>
      </div>
      
      <!-- 技术栈展示 -->
      <div class="tech-stack mb-16">
        <h3 class="text-2xl font-bold text-center section-title" :style="{color: 'var(--vp-c-brand)'}">
          技术栈
        </h3>
        <div class="tech-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4">
          <div
            v-for="(tech, index) in techStack"
            :key="index"
            class="tech-item"
          >
            <div class="tech-icon">
              <span class="text-4xl">{{ tech.icon }}</span>
            </div>
            <div class="tech-name" :style="{color: 'var(--cyber-text-secondary)'}">{{ tech.name }}</div>
          </div>
        </div>
      </div>
      
      <!-- 功能模块 -->
      <div class="modules-section">
        <h3 class="text-2xl font-bold text-center section-title" :style="{color: 'var(--vp-c-brand-light)'}">
          功能模块
        </h3>
        <div class="modules-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(module, index) in modules"
            :key="index"
            class="module-card"
          >
            <div class="module-header">
              <div class="module-icon">{{ module.icon }}</div>
              <h4 class="module-title" :style="{color: 'var(--vp-c-brand-light)'}">{{ module.title }}</h4>
            </div>
            <div class="module-stats">
              <div class="module-stat">
                <span class="stat-value" :style="{color: 'var(--vp-c-brand)'}">{{ module.files }}</span>
                <span class="stat-unit" :style="{color: 'var(--cyber-text-tertiary)'}">文件</span>
              </div>
              <div class="module-stat">
                <span class="stat-value" :style="{color: 'var(--vp-c-brand)'}">{{ module.lines }}</span>
                <span class="stat-unit" :style="{color: 'var(--cyber-text-tertiary)'}">行代码</span>
              </div>
            </div>
            <div class="module-description" :style="{color: 'var(--cyber-text-secondary)'}">
              {{ module.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const animatedStats = ref(['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'])

const stats = [
  { icon: '📁', label: '后端接口', target: 80, suffix: '+' },
  { icon: '🎨', label: '前端页面', target: 35, suffix: '+' },
  { icon: '🗃️', label: '数据表', target: 25, suffix: '+' },
  { icon: '🤖', label: 'AI 模型', target: 8, suffix: '+' },
  { icon: '🔍', label: '向量维度', target: 1536, suffix: 'D' },
  { icon: '☁️', label: '存储渠道', target: 18, suffix: '+' },
  { icon: '📄', label: '支持格式', target: 20, suffix: '+' },
  { icon: '🛡️', label: '安全特性', target: 15, suffix: '+' },
  { icon: '🔧', label: '管理功能', target: 45, suffix: '+' },
  { icon: '⚡', label: '构建速度', target: 8, suffix: '秒' }
]

const techStack = [
  { name: 'Go', icon: '🐹' },
  { name: 'Vue 3', icon: '💚' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'Redis', icon: '📦' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Gin', icon: '🍸' },
  { name: 'Tailwind', icon: '🌊' },
  { name: 'OpenAI', icon: '🤖' },
  { name: 'Qdrant', icon: '🔍' },
  { name: 'Elastic', icon: '🔎' },
  { name: 'AWS S3', icon: '☁️' },
  { name: 'MinIO', icon: '🪣' },
  { name: 'CloudFlare', icon: '🌩️' },
  { name: 'Prometheus', icon: '📊' },
  { name: 'Grafana', icon: '📈' },
  { name: 'GSAP', icon: '⚡' },
  { name: 'Vite', icon: '⚡' }
]

const modules = [
  {
    icon: '👤',
    title: '用户系统',
    files: 15,
    lines: 3200,
    description: '完整的用户认证、权限管理、个人资料和企业级用户管理'
  },
  {
    icon: '🖼️',
    title: '文件管理',
    files: 25,
    lines: 5500,
    description: '分片上传、断点续传、秒传去重、批量操作、智能压缩'
  },
  {
    icon: '🤖',
    title: 'AI 智能分析',
    files: 18,
    lines: 3800,
    description: '多模态AI模型、自动识别、智能分类、内容安全检测'
  },
  {
    icon: '🔍',
    title: '向量搜索',
    files: 12,
    lines: 2400,
    description: '基于Qdrant、以文搜图、以图搜图、语义搜索'
  },
  {
    icon: '☁️',
    title: '多云存储',
    files: 22,
    lines: 4200,
    description: '18+种存储渠道、灵活切换、CDN加速、带宽控制'
  },
  {
    icon: '🔗',
    title: '分享系统',
    files: 16,
    lines: 3100,
    description: '公开/私密/密码保护、过期策略、访客统计、作者主页'
  },
  {
    icon: '🛡️',
    title: '安全控制',
    files: 14,
    lines: 2800,
    description: '访问控制、游客限制、内容审核、下载鉴权'
  },
  {
    icon: '🎨',
    title: '水印系统',
    files: 8,
    lines: 1500,
    description: '文字/图片水印、批量添加、模板管理、版权保护'
  },
  {
    icon: '👑',
    title: '企业管理',
    files: 28,
    lines: 6500,
    description: '实时监控、用户管理、内容审核、API管理、消息系统'
  }
]

const animateStats = () => {
  // 优化的数字动画，减少onUpdate频率
  stats.forEach((stat, index) => {
    gsap.to({ value: 0 }, {
      value: stat.target,
      duration: 1.5, // 缩短时间
      delay: index * 0.1, // 减少延迟
      ease: 'power2.out',
      onUpdate: function() {
        const value = Math.floor(this.targets()[0].value)
        animatedStats.value[index] = value + stat.suffix
      },
      callbackScope: this
    })
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
      const elements = document.querySelectorAll('.stat-card, .tech-item, .module-card')
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        
        // 如果元素已经在视口中或接近视口，直接显示
        if (rect.top < windowHeight * 0.85) {
          if (element.classList.contains('stat-card') || element.classList.contains('module-card')) {
            gsap.set(element, { opacity: 1, y: 0 })
          } else if (element.classList.contains('tech-item')) {
            gsap.set(element, { opacity: 1, scale: 1 })
          }
        } else {
          if (element.classList.contains('stat-card') || element.classList.contains('module-card')) {
            gsap.set(element, { opacity: 0, y: 20 })
          } else if (element.classList.contains('tech-item')) {
            gsap.set(element, { opacity: 0, scale: 0.9 })
          }
        }
      })
      
      // 合并所有ScrollTrigger到单一批处理
      ScrollTrigger.batch(['.stat-card', '.tech-item', '.module-card'], {
        onEnter: (elements) => {
          elements.forEach((element) => {
            if (element.classList.contains('stat-card')) {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
              })
            } else if (element.classList.contains('tech-item')) {
              gsap.to(element, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.5)'
              })
            } else if (element.classList.contains('module-card')) {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
              })
            }
          })
        },
        start: 'top 85%',
        once: true,
        refreshPriority: -3
      })
      
      // 数字动画触发
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 80%',
        onEnter: () => {
          animateStats()
        },
        once: true
      })
      
      // 刷新 ScrollTrigger
      ScrollTrigger.refresh()
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
      // 失败时直接显示所有元素
      gsap.set('.stat-card', { opacity: 1, y: 0 })
      gsap.set('.tech-item', { opacity: 1, scale: 1 })
      gsap.set('.module-card', { opacity: 1, y: 0 })
      animateStats()
    }
  }
})
</script>

<style scoped>
.stat-card {
  position: relative;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px var(--cyber-shadow);
  backdrop-filter: blur(10px);
}

.stat-card:hover {
  border-color: var(--cyber-border-hover);
  box-shadow: 0 20px 60px var(--cyber-shadow), 0 0 20px var(--cyber-border);
}

.stat-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, var(--cyber-border), var(--cyber-border-hover));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-number {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-glow {
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  background: radial-gradient(circle at center, var(--cyber-border) 0%, transparent 70%);
}

.stat-card:hover .stat-glow {
  opacity: 1;
}

.tech-item {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.tech-item:hover {
  border-color: var(--cyber-border-hover);
}

.tech-icon {
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;
}

.tech-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.module-card {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.module-card:hover {
  border-color: var(--cyber-border-hover);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.module-icon {
  font-size: 1.5rem;
}

.module-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.module-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--cyber-border);
}

.module-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: bold;
}

.stat-unit {
  font-size: 0.75rem;
}

.module-description {
  font-size: 0.875rem;
  line-height: 1.6;
}

/* 亮色主题特定样式 */
[data-theme="light"] .stats-section {
}

[data-theme="light"] .stat-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .stat-card:hover {
  box-shadow: 0 10px 40px var(--cyber-shadow), 0 0 20px var(--cyber-border);
}

[data-theme="light"] .stat-icon {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 2px 10px var(--cyber-shadow);
}

[data-theme="light"] .tech-item {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 2px 10px var(--cyber-shadow);
}

[data-theme="light"] .tech-item:hover {
  box-shadow: 0 4px 15px var(--cyber-shadow);
}

[data-theme="light"] .module-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .module-card:hover {
  box-shadow: 0 8px 30px var(--cyber-shadow);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-grid {
    @apply grid-cols-2 gap-4;
  }
  
  .stat-card {
    @apply p-4;
  }
  
  .stat-icon {
    @apply w-12 h-12;
  }
  
  .stat-number {
    @apply text-2xl;
  }
  
  .tech-grid {
    @apply grid-cols-3 gap-4;
  }
  
  .tech-item {
    @apply p-3;
  }
  
  .tech-icon img {
    @apply w-8 h-8;
  }
  
  .modules-grid {
    @apply grid-cols-1 gap-4;
  }
}

/* 标题间距样式 */
.section-title {
  margin-bottom: 2rem !important;
}
</style>