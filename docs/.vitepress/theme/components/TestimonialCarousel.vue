<template>
  <section class="testimonials-section py-12">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6" :style="{background: 'linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          用户评价
        </h2>
        <p class="text-xl max-w-3xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
          听听用户们对 PixelPunk 的真实评价和使用体验
        </p>
      </div>
      
      <!-- 轮播容器 -->
      <div 
        class="testimonials-carousel"
        @mouseenter="stopAutoPlay"
        @mouseleave="startAutoPlay"
      >
    <div class="carousel-container" ref="carouselContainer">
      <div 
        class="carousel-track"
        ref="carouselTrack"
        :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }"
        @transitionend="handleTransitionEnd"
      >
        <!-- 原始testimonials -->
        <div
          v-for="(testimonial, index) in testimonials"
          :key="`original-${index}`"
          class="testimonial-card carousel-slide"
        >
          <!-- 评价内容 -->
          <div class="testimonial-content">
            <div class="quote-icon">
              <svg class="w-8 h-8" :style="{color: 'var(--vp-c-brand)'}" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
            <p class="testimonial-text" :style="{color: 'var(--cyber-text-secondary)'}">{{ testimonial.content }}</p>
            <div class="testimonial-rating">
              <div class="stars">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="star"
                  :class="{ 'filled': i <= testimonial.rating }"
                >
                  ★
                </span>
              </div>
            </div>
          </div>
          
          <!-- 用户信息 -->
          <div class="testimonial-author">
            <div class="author-avatar">
              <img :src="testimonial.avatar" :alt="testimonial.name" />
            </div>
            <div class="author-info">
              <div class="author-name" :style="{color: 'var(--vp-c-brand)'}">{{ testimonial.name }}</div>
              <div class="author-title" :style="{color: 'var(--cyber-text-tertiary)'}">{{ testimonial.title }}</div>
              <div class="author-company" :style="{color: 'var(--vp-c-brand-light)'}">{{ testimonial.company }}</div>
            </div>
          </div>
          
          <!-- 使用场景标签 -->
          <div class="use-case-tags">
            <span
              v-for="tag in testimonial.tags"
              :key="tag"
              class="use-case-tag"
            >
              {{ tag }}
            </span>
          </div>
          
          <!-- 悬浮效果 -->
          <div class="testimonial-glow"></div>
        </div>
        
        <!-- 复制的testimonials用于无限循环 -->
        <div
          v-for="(testimonial, index) in testimonials"
          :key="`clone-${index}`"
          class="testimonial-card carousel-slide"
        >
          <!-- 评价内容 -->
          <div class="testimonial-content">
            <div class="quote-icon">
              <svg class="w-8 h-8" :style="{color: 'var(--vp-c-brand)'}" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
            <p class="testimonial-text" :style="{color: 'var(--cyber-text-secondary)'}">{{ testimonial.content }}</p>
            <div class="testimonial-rating">
              <div class="stars">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="star"
                  :class="{ 'filled': i <= testimonial.rating }"
                >
                  ★
                </span>
              </div>
            </div>
          </div>
          
          <!-- 用户信息 -->
          <div class="testimonial-author">
            <div class="author-avatar">
              <img :src="testimonial.avatar" :alt="testimonial.name" />
            </div>
            <div class="author-info">
              <div class="author-name" :style="{color: 'var(--vp-c-brand)'}">{{ testimonial.name }}</div>
              <div class="author-title" :style="{color: 'var(--cyber-text-tertiary)'}">{{ testimonial.title }}</div>
              <div class="author-company" :style="{color: 'var(--vp-c-brand-light)'}">{{ testimonial.company }}</div>
            </div>
          </div>
          
          <!-- 使用场景标签 -->
          <div class="use-case-tags">
            <span
              v-for="tag in testimonial.tags"
              :key="tag"
              class="use-case-tag"
            >
              {{ tag }}
            </span>
          </div>
          
          <!-- 悬浮效果 -->
          <div class="testimonial-glow"></div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const currentSlide = ref(0)
const slideWidth = ref(400)
const carouselContainer = ref<HTMLElement>()
const carouselTrack = ref<HTMLElement>()
const autoPlayInterval = ref<number>()

const nextSlide = () => {
  currentSlide.value += 1
}

const handleTransitionEnd = () => {
  if (currentSlide.value >= testimonials.length) {
    if (carouselTrack.value) {
      carouselTrack.value.style.transition = 'none'
    }
    currentSlide.value = 0
    setTimeout(() => {
      if (carouselTrack.value) {
        carouselTrack.value.style.transition = 'transform 0.5s ease-in-out'
      }
    }, 50)
  }
}

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextSlide()
  }, 3500)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
}

const updateSlideWidth = () => {
  if (carouselContainer.value) {
    const containerWidth = carouselContainer.value.offsetWidth
    const screenWidth = window.innerWidth
    
    let visibleSlides = 3
    let marginRight = 24
    
    if (screenWidth <= 768) {
      visibleSlides = 1
      marginRight = 16
    } else if (screenWidth <= 1024) {
      visibleSlides = 2
      marginRight = 20
    }
    
    const totalMargin = marginRight * (visibleSlides - 1)
    slideWidth.value = (containerWidth - totalMargin) / visibleSlides + marginRight
  }
}

const testimonials = [
  {
    name: '李小明',
    title: '前端开发工程师',
    company: '字节跳动',
    avatar: '/images/avatar/frontend-1.webp',
    content: 'PixelPunk 的 AI 分析功能真的太强大了！自动标签生成节省了我大量时间，而且准确率很高。赛博朋克的界面设计也很酷炫。',
    rating: 5,
    tags: ['AI分析', '个人使用', '前端开发']
  },
  {
    name: '王美丽',
    title: 'UI/UX 设计师',
    company: '腾讯',
    avatar: '/images/avatar/ui-1.webp',
    content: '作为设计师，我需要管理大量的图片素材。PixelPunk 的文件夹管理和智能标签让我的工作效率提升了 50%。',
    rating: 5,
    tags: ['图片管理', '设计工作', '效率提升']
  },
  {
    name: '张三',
    title: '创业者',
    company: '独立开发者',
    avatar: '/images/avatar/dulikaifa.webp',
    content: '单文件部署太方便了！我在自己的服务器上几分钟就搭建好了，多云存储支持让我不用担心数据安全。',
    rating: 5,
    tags: ['自部署', '云存储', '创业公司']
  },
  {
    name: '陈建华',
    title: '技术总监',
    company: '美团',
    avatar: '/images/avatar/jishuzongjian-1.webp',
    content: '我们团队在使用 PixelPunk 管理产品图片，API 接口很完善，集成到我们的系统非常容易。性能表现也很出色。',
    rating: 5,
    tags: ['企业使用', 'API集成', '团队协作']
  },
  {
    name: '刘艺',
    title: '摄影师',
    company: '自由职业',
    avatar: '/images/avatar/sheyingshi.webp',
    content: '作为摄影师，我很喜欢 PixelPunk 的图片分享功能。客户预览很方便，而且统计数据很详细。',
    rating: 4,
    tags: ['摄影师', '分享功能', '客户展示']
  },
  {
    name: '赵云',
    title: '产品经理',
    company: '阿里巴巴',
    avatar: '/images/avatar/chanpinjingli.webp',
    content: '管理后台功能很全面，用户管理、存储配置、统计分析都有。对于企业级应用来说，这些功能很重要。',
    rating: 5,
    tags: ['企业级', '管理后台', '数据统计']
  }
]

onMounted(() => {
  nextTick(() => {
    updateSlideWidth()
    startAutoPlay()
  })
  
  window.addEventListener('resize', updateSlideWidth)
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('resize', updateSlideWidth)
})
</script>

<style scoped>
.testimonials-section {
  /* 主容器样式 */
}

.testimonials-carousel {
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
}

.carousel-container {
  overflow: hidden;
  width: 100%;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 calc(33.333% - 16px);
  margin-right: 24px;
  box-sizing: border-box;
}

@media (max-width: 1024px) {
  .carousel-slide {
    flex: 0 0 calc(50% - 10px);
    margin-right: 20px;
  }
  
  .testimonial-card {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .carousel-slide {
    flex: 0 0 calc(100% - 8px);
    margin-right: 16px;
  }
  
  .testimonial-card {
    height: 380px;
    padding: 1.5rem;
  }
  
  .testimonial-text {
    font-size: 1rem;
    height: calc(1rem * 1.7 * 3);
  }
}

.testimonial-card {
  position: relative;
  background: linear-gradient(135deg, var(--cyber-bg-primary) 0%, var(--cyber-bg-secondary) 100%);
  border: 1px solid var(--cyber-border);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 10px 40px var(--cyber-shadow),
    0 4px 20px rgba(0, 255, 136, 0.1);
  backdrop-filter: blur(15px);
  overflow: hidden;
  height: 420px;
  display: flex;
  flex-direction: column;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.testimonial-card:hover {
  border-color: var(--cyber-border-hover);
}

.testimonial-card:hover::before {
  opacity: 1;
}

.testimonial-content {
  margin-bottom: 1.5rem;
}

.quote-icon {
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: var(--cyber-text-secondary);
  font-weight: 400;
  letter-spacing: 0.025em;
  height: calc(1.1rem * 1.7 * 3);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.testimonial-rating {
  display: flex;
  justify-content: flex-start;
}

.stars {
  display: flex;
  gap: 0.125rem;
}

.star {
  font-size: 1.25rem;
  color: var(--cyber-border);
  text-shadow: 0 0 10px rgba(251, 191, 36, 0);
}

.star.filled {
  color: #fbbf24;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  margin-top: auto;
}

.author-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--vp-c-brand);
  position: relative;
}

.author-avatar::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--vp-c-brand), var(--vp-c-brand-light));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.author-title {
  font-size: 0.875rem;
}

.author-company {
  font-size: 0.75rem;
}

.use-case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.use-case-tag {
  padding: 0.375rem 0.75rem;
  background: linear-gradient(135deg, var(--cyber-border), var(--cyber-border-hover));
  color: var(--vp-c-brand-light);
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 1rem;
  border: 1px solid var(--cyber-border-hover);
  letter-spacing: 0.025em;
}

.testimonial-glow {
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  background: radial-gradient(circle at center, var(--cyber-border) 0%, transparent 70%);
}

.testimonial-card:hover .testimonial-glow {
  opacity: 1;
}

[data-theme="light"] .testimonial-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .testimonial-card:hover {
  box-shadow: 0 10px 40px var(--cyber-shadow), 0 0 20px var(--cyber-border);
}

[data-theme="light"] .author-avatar {
  border: 2px solid var(--cyber-border-hover);
}

[data-theme="light"] .use-case-tag {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
}

[data-theme="light"] .testimonial-glow {
  background: radial-gradient(circle at center, var(--cyber-border-hover) 0%, transparent 70%);
}
</style>