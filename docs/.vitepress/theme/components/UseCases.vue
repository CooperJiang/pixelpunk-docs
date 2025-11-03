<template>
  <div class="use-cases-section">
    <h3 class="text-2xl font-bold text-center section-title" :style="{color: 'var(--vp-c-brand)'}">
      适用场景
    </h3>
    <div class="use-cases-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(useCase, index) in useCases"
        :key="index"
        class="use-case-card"
      >
        <div class="use-case-icon">
          <span class="text-3xl">{{ useCase.icon }}</span>
        </div>
        <h4 class="use-case-title" :style="{color: 'var(--vp-c-brand-light)'}">{{ useCase.title }}</h4>
        <p class="use-case-description" :style="{color: 'var(--cyber-text-secondary)'}">{{ useCase.description }}</p>
        <div class="use-case-features">
          <div
            v-for="feature in useCase.features"
            :key="feature"
            class="use-case-feature"
            :style="{color: 'var(--cyber-text-tertiary)'}"
          >
            {{ feature }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const useCases = [
  {
    icon: '🧠',
    title: 'AI 研究团队',
    description: '基于向量搜索和智能分析，构建某研究数据集和知识库',
    features: ['多模型AI分析', '向量化数据集', '智能检索']
  },
  {
    icon: '🏢',
    title: '企业级应用',
    description: '大型企业数字资产管理，支持多组织、权限控制和合规管理',
    features: ['企业级权限', '合规监管', '成本控制']
  },
  {
    icon: '🚀',
    title: '创业公司',
    description: '创业团队快速搭建素材库，支持高并发和快速扩展',
    features: ['快速部署', '弹性扩展', 'CDN加速']
  },
  {
    icon: '🎨',
    title: '内容创作平台',
    description: '支持大量创作者的多媒体平台，提供版权保护和内容分发',
    features: ['版权保护', '内容分发', '智能推荐']
  },
  {
    icon: '🏭',
    title: '政府机构',
    description: '政务数字化平台，支持高安全等级和合规性要求',
    features: ['高安全等级', '合规性要求', '审计追踪']
  },
  {
    icon: '🏫',
    title: '教育机构',
    description: '在线教育平台的教学资源管理，支持大量并发和知识管理',
    features: ['教学资源库', '知识管理', '学习分析']
  }
]

const checkElementsInViewport = () => {
  const elements = document.querySelectorAll('.use-case-card')
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    
    // 如果元素已经在视口中或接近视口，直接显示
    if (rect.top < windowHeight * 0.85) {
      gsap.set(element, { opacity: 1, scale: 1 })
    } else {
      gsap.set(element, { opacity: 0, scale: 0.95 })
    }
  })
}

onMounted(async () => {
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      // 等待元素渲染完成
      await nextTick()
      
      // 检查初始状态
      checkElementsInViewport()
      
      ScrollTrigger.batch(['.use-case-card'], {
        onEnter: (elements) => {
          elements.forEach((element) => {
            if (element.classList.contains('use-case-card')) {
              gsap.to(element, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.3)'
              })
            }
          })
        },
        start: 'top 85%',
        once: true,
        refreshPriority: -4
      })
      
      // 刷新 ScrollTrigger
      ScrollTrigger.refresh()
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
      // 失败时直接显示所有元素
      gsap.set('.use-case-card', { opacity: 1, scale: 1 })
    }
  }
})
</script>

<style scoped>
.use-cases-section {
  margin-bottom: 2rem;
}

.use-case-card {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.use-case-card:hover {
  border-color: var(--cyber-border-hover);
  transform: translateY(-3px);
}

.use-case-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, var(--cyber-border), var(--cyber-border-hover));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.use-case-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.use-case-description {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.use-case-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.use-case-feature {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.use-case-feature::before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  background: var(--vp-c-brand-light);
  border-radius: 50%;
  margin-right: 0.5rem;
}

.section-title {
  margin-bottom: 2rem !important;
}

@media (max-width: 1024px) {
  .use-cases-grid {
    @apply grid-cols-2 gap-4;
  }
}

@media (max-width: 768px) {
  .use-cases-grid {
    @apply grid-cols-1 gap-4;
  }
  
  .use-case-card {
    @apply p-4;
  }
  
  .use-case-icon {
    @apply w-12 h-12;
  }
}

[data-theme="light"] .use-case-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 2px 10px var(--cyber-shadow);
}

[data-theme="light"] .use-case-card:hover {
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .use-case-icon {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 2px 10px var(--cyber-shadow);
}
</style>