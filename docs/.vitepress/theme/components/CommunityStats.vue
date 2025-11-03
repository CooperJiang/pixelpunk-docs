<template>
  <div class="community-stats">
    <h3 class="text-2xl font-bold text-center section-title" :style="{color: 'var(--vp-c-brand-light)'}">
      社区数据
    </h3>
    <div class="stats-row grid grid-cols-2 md:grid-cols-4 gap-8">
      <div class="community-stat">
        <div class="stat-icon">👥</div>
        <div class="stat-number" :style="{color: 'var(--vp-c-brand)'}">{{ animatedCommunityStats.users }}</div>
        <div class="stat-label" :style="{color: 'var(--cyber-text-tertiary)'}">活跃用户</div>
      </div>
      <div class="community-stat">
        <div class="stat-icon">🖼️</div>
        <div class="stat-number" :style="{color: 'var(--vp-c-brand)'}">{{ animatedCommunityStats.images }}</div>
        <div class="stat-label" :style="{color: 'var(--cyber-text-tertiary)'}">图片处理</div>
      </div>
      <div class="community-stat">
        <div class="stat-icon">🌟</div>
        <div class="stat-number" :style="{color: 'var(--vp-c-brand)'}">{{ animatedCommunityStats.stars }}</div>
        <div class="stat-label" :style="{color: 'var(--cyber-text-tertiary)'}">GitHub Stars</div>
      </div>
      <div class="community-stat">
        <div class="stat-icon">💬</div>
        <div class="stat-number" :style="{color: 'var(--vp-c-brand)'}">{{ animatedCommunityStats.feedback }}</div>
        <div class="stat-label" :style="{color: 'var(--cyber-text-tertiary)'}">用户反馈</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const animatedCommunityStats = ref({
  users: '0',
  images: '0',
  stars: '0',
  feedback: '0'
})

const animateCommunityStats = () => {
  const targets = {
    users: { value: 50000, suffix: 'K+' },
    images: { value: 1000000, suffix: 'M+' },
    stars: { value: '100', suffix: '+' },
    feedback: { value: 98, suffix: '%' }
  }

  Object.entries(targets).forEach(([key, target], index) => {
    gsap.to({ value: 0 }, {
      value: target.value,
      duration: 1.2,
      delay: index * 0.1,
      ease: 'power2.out',
      onUpdate: function() {
        const value = Math.floor(this.targets()[0].value)
        if (key === 'users') {
          animatedCommunityStats.value[key] = Math.floor(value / 1000) + 'K+'
        } else if (key === 'images') {
          animatedCommunityStats.value[key] = Math.floor(value / 1000000) + 'M+'
        } else {
          animatedCommunityStats.value[key] = value + target.suffix
        }
      }
    })
  })
}

const checkStatsInViewport = () => {
  const statsElement = document.querySelector('.community-stats')
  if (statsElement) {
    const rect = statsElement.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    
    // 如果元素已经在视口中，直接执行动画
    if (rect.top < windowHeight * 0.8) {
      animateCommunityStats()
      return true
    }
  }
  return false
}

onMounted(async () => {
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      // 等待元素渲染完成
      await nextTick()
      
      // 检查初始状态，如果已经在视口中则不需要ScrollTrigger
      if (!checkStatsInViewport()) {
        ScrollTrigger.create({
          trigger: '.community-stats',
          start: 'top 80%',
          onEnter: () => {
            animateCommunityStats()
          },
          once: true
        })
      }
      
      // 刷新 ScrollTrigger
      ScrollTrigger.refresh()
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
      // 失败时直接执行动画
      animateCommunityStats()
    }
  }
})
</script>

<style scoped>
.community-stats {
  margin-top: 4rem;
}

.community-stat {
  text-align: center;
}

.community-stat .stat-icon {
  font-size: 1.875rem;
  margin-bottom: 0.5rem;
}

.community-stat .stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.community-stat .stat-label {
  font-size: 0.875rem;
}

.section-title {
  margin-bottom: 2rem !important;
}

@media (max-width: 768px) {
  .stats-row {
    @apply grid-cols-2 gap-4;
  }
}
</style>