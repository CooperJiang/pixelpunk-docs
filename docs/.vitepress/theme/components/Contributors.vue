<template>
  <section class="contributors-section py-12">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4" :style="{background: 'linear-gradient(to right, var(--vp-c-brand-lighter), var(--vp-c-brand))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          贡献列表
        </h2>
        <p class="text-lg max-w-2xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
          感谢所有为 PixelPunk 项目做出贡献的开发者们
        </p>
      </div>
      
      <!-- 贡献者网格 -->
      <div class="contributors-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        <div
          v-for="(contributor, index) in contributors"
          :key="index"
          class="contributor-card group cursor-pointer"
          @click="openContributorModal(contributor)"
        >
          <div class="contributor-avatar">
            <img 
              :src="contributor.avatar" 
              :alt="contributor.name"
              class="avatar-image"
              @error="handleImageError"
            />
            <div class="avatar-overlay">
              <div class="view-icon">👁️</div>
            </div>
          </div>
          <div class="contributor-info">
            <h3 class="contributor-name" :style="{color: 'var(--vp-c-brand-light)'}">{{ contributor.name }}</h3>
            <p class="contributor-profession" :style="{color: 'var(--cyber-text-tertiary)'}">{{ contributor.profession || '开发者' }}</p>
          </div>
          <div class="card-glow"></div>
        </div>
      </div>
    </div>

    <!-- 贡献者详情弹窗 -->
    <ContributorModal 
      v-if="selectedContributor"
      :contributor="selectedContributor"
      @close="closeContributorModal"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ContributorModal from './ContributorModal.vue'

interface Contributor {
  name: string
  avatar: string
  githubUrl?: string
  personalUrl?: string
  profession?: string
  signature?: string
}

const selectedContributor = ref<Contributor | null>(null)

// Mock 数据
const contributors: Contributor[] = [
  {
    name: '张伟',
    avatar: '/images/avatar/frontend-1.webp',
    githubUrl: 'https://github.com/zhangwei',
    personalUrl: 'https://zhangwei.dev',
    profession: '前端架构师',
    signature: '代码改变世界，创新驱动未来'
  },
  {
    name: '李娜',
    avatar: '/images/avatar/ui-1.webp',
    githubUrl: 'https://github.com/lina',
    profession: 'UI/UX 设计师',
    signature: '设计不仅是外观，更是功能的体现'
  },
  {
    name: '王强',
    avatar: '/images/avatar/jishuzongjian-1.webp',
    githubUrl: 'https://github.com/wangqiang',
    personalUrl: 'https://wangqiang.blog',
    profession: '技术总监',
    signature: '技术为人服务，创新永无止境'
  },
  {
    name: '赵敏',
    avatar: '/images/avatar/chanpinjingli.webp',
    githubUrl: 'https://github.com/zhaomin',
    profession: '产品经理',
    signature: '用心打磨每一个产品细节'
  },
  {
    name: '刘涛',
    avatar: '/images/avatar/dulikaifa.webp',
    githubUrl: 'https://github.com/liutao',
    personalUrl: 'https://liutao.tech',
    profession: '独立开发者',
    signature: '热爱编程，享受创造的乐趣'
  },
  {
    name: '陈静',
    avatar: '/images/avatar/sheyingshi.webp',
    githubUrl: 'https://github.com/chenjing',
    profession: '摄影师',
    signature: '用镜头记录美好，用代码分享世界'
  }
]

const openContributorModal = (contributor: Contributor) => {
  selectedContributor.value = contributor
}

const closeContributorModal = () => {
  selectedContributor.value = null
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMzNzM3MzciLz4KPHN2ZyB4PSIyNCIgeT0iMjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHN2ZyBmaWxsPSIjOTk5OTk5Ij4KPHA+JiN4MTk5NDg7JiN4MTk5ODM7PC9wPgo8L3N2Zz4KPC9zdmc+Cjwvc3ZnPgo='
}

onMounted(async () => {
  if (typeof window !== 'undefined') {
    // 使用 Intersection Observer 替代 ScrollTrigger
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.contributor-card')
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-in')
            }, index * 100)
          })
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    })
    
    const grid = document.querySelector('.contributors-grid')
    if (grid) {
      observer.observe(grid)
    }
  }
})
</script>

<style scoped>
.contributor-card {
  position: relative;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px var(--cyber-shadow);
  backdrop-filter: blur(10px);
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
}

.contributor-card.animate-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.contributor-card.animate-in:hover {
  border-color: var(--cyber-border-hover);
  transform: translateY(-5px);
  box-shadow: 0 20px 60px var(--cyber-shadow), 0 0 20px var(--cyber-border);
}

.contributor-avatar {
  position: relative;
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--cyber-border);
  transition: all 0.3s ease;
}

.contributor-card:hover .contributor-avatar {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 20px var(--vp-c-brand);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.contributor-card:hover .avatar-image {
  transform: scale(1.1);
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contributor-card:hover .avatar-overlay {
  opacity: 1;
}

.view-icon {
  font-size: 1.25rem;
  color: white;
}

.contributor-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.contributor-profession {
  font-size: 0.75rem;
  font-weight: 400;
}

.card-glow {
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  background: radial-gradient(circle at center, var(--cyber-border) 0%, transparent 70%);
}

.contributor-card:hover .card-glow {
  opacity: 1;
}

/* 亮色主题适配 */
[data-theme="light"] .contributor-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .contributor-card:hover {
  box-shadow: 0 10px 40px var(--cyber-shadow), 0 0 20px var(--cyber-border);
}

[data-theme="light"] .contributor-avatar {
  border: 2px solid var(--cyber-border-hover);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .contributors-grid {
    @apply grid-cols-2 gap-4;
  }
  
  .contributor-card {
    @apply p-4;
  }
  
  .contributor-avatar {
    @apply w-12 h-12;
  }
  
  .contributor-name {
    @apply text-sm;
  }
  
  .contributor-profession {
    @apply text-xs;
  }
}

@media (max-width: 640px) {
  .contributors-grid {
    @apply grid-cols-2 gap-3;
  }
  
  .contributor-card {
    @apply p-3;
  }
}
</style>