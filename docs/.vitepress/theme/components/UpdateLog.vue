<template>
  <div class="update-log-container">
    <!-- 页面头部 -->
    <div class="updates-header">
      <div class="header-bg absolute inset-0">
        <div class="grid-overlay"></div>
        <div class="gradient-overlay"></div>
      </div>
      
      <div class="header-content relative z-10 container mx-auto px-4 py-16 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
          产品更新历程
        </h1>
        
        <p class="text-lg max-w-2xl mx-auto opacity-90 mb-8">
          记录 PixelPunk 的每一次进步，见证 AI 智能图床平台的成长轨迹
        </p>
        
        <!-- 统计信息 -->
        <div class="stats-grid grid grid-cols-3 gap-6 mt-8 max-w-xl mx-auto">
          <div class="stat-item">
            <div class="stat-value">{{ updateLogs.length }}</div>
            <div class="stat-label">版本发布</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ totalUpdates }}</div>
            <div class="stat-label">功能更新</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ monthsActive }}</div>
            <div class="stat-label">活跃月份</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 更新日志列表 -->
    <div class="updates-content container mx-auto px-4 pt-16 pb-16">
      <!-- 过滤选项 -->
      <div class="filter-section mb-8">
        <div class="filter-tabs flex flex-wrap gap-2 justify-center">
          <button
            @click="selectedFilter = 'all'"
            :class="['filter-tab', { active: selectedFilter === 'all' }]"
          >
            全部更新
          </button>
          <button
            v-for="(category, key) in updateCategories"
            :key="key"
            @click="selectedFilter = key"
            :class="['filter-tab', { active: selectedFilter === key }]"
          >
            {{ category.icon }} {{ category.label }}
          </button>
        </div>
      </div>

      <!-- 时间线 -->
      <div class="timeline">
        <div 
          v-for="(log, index) in updateLogs" 
          :key="log.version"
          class="timeline-item"
          :class="{ featured: index === 0 }"
        >
          <!-- 时间线节点 -->
          <div class="timeline-node">
            <div class="node-dot"></div>
            <div class="node-date">{{ formatDate(log.date) }}</div>
          </div>

          <!-- 更新内容卡片 -->
          <div class="update-card">
            <!-- 卡片头部 -->
            <div class="card-header">
              <div class="header-top">
                <div class="version-info">
                  <div class="version-badge">{{ log.version }}</div>
                  <h2 class="update-title">{{ log.title }}</h2>
                </div>
                
                <!-- 作者信息 -->
                <div class="author-info">
                  <img 
                    v-if="log.author.avatar" 
                    :src="log.author.avatar" 
                    :alt="log.author.name"
                    class="author-avatar"
                  >
                  <div class="author-details">
                    <div class="author-name">{{ log.author.name }}</div>
                    <div class="release-date">{{ formatFullDate(log.date) }}</div>
                  </div>
                </div>
              </div>
              
              <!-- 描述和图片在同一行 -->
              <div class="header-content" v-if="log.description || log.image">
                <p class="update-description" v-if="log.description">
                  {{ log.description }}
                </p>
                
                <!-- 特色图片 - 可点击预览 -->
                <div v-if="log.image" class="update-image-compact" @click="openImagePreview(log.image, log.title)">
                  <img :src="log.image" :alt="log.title" class="featured-image-compact">
                  <div class="image-overlay"></div>
                  <div class="image-preview-hint">
                    <svg class="preview-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>点击预览</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 详细更新列表 - 按类型分组 -->
            <div class="updates-section">
              <h3 class="section-title mt-0">
                <span class="title-icon">📋</span>
                详细更新内容
              </h3>

              <!-- 按类型分组显示 -->
              <div
                v-for="(group, groupType) in getGroupedUpdates(log.updates)"
                :key="groupType"
                class="update-group"
              >
                <div class="group-header">
                  <span class="group-icon">{{ updateCategories[groupType]?.icon }}</span>
                  <span class="group-title">{{ updateCategories[groupType]?.label }}</span>
                  <span class="group-count">{{ group.length }}</span>
                </div>

                <div class="updates-mini">
                  <div
                    v-for="update in group"
                    :key="update.id"
                    class="update-item-mini"
                    :data-type="update.type"
                  >
                    <div class="update-content-mini">
                      <h4 class="update-item-title-mini">
                        <span v-if="update.icon" class="item-icon">{{ update.icon }}</span>
                        {{ update.title }}
                      </h4>
                      <p class="update-item-description-mini">{{ update.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览弹窗 -->
    <Teleport to="body">
      <div v-if="imagePreview.show" class="image-preview-modal" @click="closeImagePreview">
        <div class="preview-backdrop"></div>
        <div class="preview-content" @click.stop>
          <button class="preview-close" @click="closeImagePreview">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img :src="imagePreview.src" :alt="imagePreview.alt" class="preview-image">
          <div class="preview-title">{{ imagePreview.alt }}</div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { updateLogs, updateCategories, type UpdateItem } from '../../config/updates'

const selectedFilter = ref<string>('all')

// 图片预览功能
const imagePreview = ref({
  show: false,
  src: '',
  alt: ''
})

const openImagePreview = (src: string, alt: string) => {
  console.log('Opening image preview:', src, alt) // 调试用
  imagePreview.value.show = true
  imagePreview.value.src = src
  imagePreview.value.alt = alt
  document.body.style.overflow = 'hidden'
}

const closeImagePreview = () => {
  console.log('Closing image preview') // 调试用
  imagePreview.value.show = false
  document.body.style.overflow = 'auto'
}

// 计算统计数据
const totalUpdates = computed(() => {
  return updateLogs.reduce((total, log) => total + log.updates.length, 0)
})

const monthsActive = computed(() => {
  const dates = updateLogs.map(log => new Date(log.date))
  const months = new Set(dates.map(date => `${date.getFullYear()}-${date.getMonth()}`))
  return months.size
})

// 过滤更新项
const getFilteredUpdates = (updates: UpdateItem[]) => {
  if (selectedFilter.value === 'all') return updates
  return updates.filter(update => update.type === selectedFilter.value)
}

// 按类型分组更新项（保持特定顺序）
const getGroupedUpdates = (updates: UpdateItem[]) => {
  const filteredUpdates = getFilteredUpdates(updates)

  // 定义显示顺序
  const typeOrder = ['feature', 'improvement', 'bugfix', 'breaking']

  // 按类型分组
  const grouped: Record<string, UpdateItem[]> = {}

  filteredUpdates.forEach(update => {
    if (!grouped[update.type]) {
      grouped[update.type] = []
    }
    grouped[update.type].push(update)
  })

  // 按指定顺序返回分组
  const orderedGroups: Record<string, UpdateItem[]> = {}
  typeOrder.forEach(type => {
    if (grouped[type] && grouped[type].length > 0) {
      orderedGroups[type] = grouped[type]
    }
  })

  return orderedGroups
}

// 获取类型样式
const getTypeStyle = (type: string) => {
  const category = updateCategories[type]
  if (!category) return {}
  
  return {
    '--type-color': category.color,
    '--type-bg': category.bgColor
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { 
    month: '2-digit', 
    day: '2-digit' 
  })
}

const formatFullDate = (dateString: string) => {
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
      
      // 时间线动画
      gsap.set('.timeline-item', { opacity: 0, x: -50 })
      gsap.set('.timeline-node', { scale: 0 })
      
      ScrollTrigger.batch('.timeline-item', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2
          })
          
          elements.forEach(element => {
            const node = element.querySelector('.timeline-node')
            gsap.to(node, {
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
              delay: 0.3
            })
          })
        },
        start: 'top 80%'
      })
      
      // 统计数字动画
      gsap.set('.stat-value', { innerHTML: '0' })
      
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 80%',
        onEnter: () => {
          // 动画化统计数字
          gsap.to({}, {
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              const progress = this.progress()
              document.querySelectorAll('.stat-value').forEach((el, index) => {
                const targets = [updateLogs.length, totalUpdates.value, monthsActive.value]
                const target = targets[index] || 0
                el.innerHTML = Math.floor(target * progress).toString()
              })
            }
          })
        }
      })
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
    }
  }
})
</script>

<style scoped>
.update-log-container {
  min-height: 100vh;
  background: var(--cyber-bg-primary);
}

/* 页面头部 */
.updates-header {
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

.stats-grid {
  border-top: 1px solid var(--cyber-border);
  padding-top: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
  text-shadow: 0 0 15px currentColor;
}

.stat-label {
  color: var(--cyber-text-tertiary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* 过滤选项 */
.filter-section {
  text-align: center;
}

.filter-tabs {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  padding: 0.75rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
}

.filter-tab {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--cyber-border);
  border-radius: 0.375rem;
  color: var(--cyber-text-secondary);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-tab:hover {
  border-color: var(--cyber-border-hover);
  background: var(--cyber-border);
  color: var(--cyber-text-primary);
}

.filter-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  box-shadow: 0 0 20px var(--vp-c-brand);
}

/* 时间线 */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 2rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--cyber-border), var(--cyber-border-hover));
  border-radius: 1px;
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 6rem;
}

.timeline-item.featured .update-card {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 40px var(--cyber-border);
}

.timeline-node {
  position: absolute;
  left: 0;
  top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.node-dot {
  width: 1rem;
  height: 1rem;
  background: var(--vp-c-brand);
  border: 3px solid var(--cyber-bg-primary);
  border-radius: 50%;
  box-shadow: 0 0 20px var(--vp-c-brand);
  position: relative;
  z-index: 2;
}

.timeline-item.featured .node-dot {
  width: 1.5rem;
  height: 1.5rem;
  background: var(--vp-c-brand-light);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px var(--vp-c-brand);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 30px var(--vp-c-brand), 0 0 40px var(--vp-c-brand);
    transform: scale(1.1);
  }
}

.node-date {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-brand);
  white-space: nowrap;
}

/* 更新卡片 - 紧凑布局 */
.update-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.75rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px var(--cyber-shadow);
  transition: all 0.3s ease;
}

.update-card:hover {
  border-color: var(--cyber-border-hover);
  box-shadow: 0 8px 32px var(--cyber-shadow), 0 0 15px var(--cyber-border);
}

.card-header {
  padding: 1.5rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.header-content {
  display: flex;
  gap: 1.5rem;
  align-items: start;
}

.version-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

.update-title {
  font-size: 1.375rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin-bottom: 0;
  margin-top: 15px;
  line-height: 1.2;
}

.update-description {
  color: var(--cyber-text-secondary);
  line-height: 1.5;
  font-size: 0.95rem;
  flex: 1;
  margin: 0;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.author-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1px solid var(--cyber-border-hover);
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: var(--cyber-text-primary);
  font-size: 0.8rem;
}

.release-date {
  color: var(--cyber-text-tertiary);
  font-size: 0.7rem;
}

/* 紧凑图片样式 - 增大尺寸，添加动效 */
.update-image-compact {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  width: 280px;
  height: 160px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--cyber-border);
}

.update-image-compact:hover {
  border-color: var(--cyber-border-hover);
  box-shadow: 0 8px 25px var(--cyber-shadow), 0 0 20px var(--cyber-border);
  transform: translateY(-2px);
}

.featured-image-compact {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.update-image-compact:hover .featured-image-compact {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, var(--cyber-border) 0%, transparent 50%);
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.update-image-compact:hover .image-overlay {
  opacity: 0.2;
}

.image-preview-hint {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.update-image-compact:hover .image-preview-hint {
  opacity: 1;
}

.preview-icon {
  width: 2rem;
  height: 2rem;
  margin-bottom: 0.5rem;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

.image-preview-hint span {
  font-size: 0.875rem;
  font-weight: 500;
}

/* 内容区域 - 减少间距 */
.updates-section {
  padding: 0.75rem 1.5rem 1.5rem;
  border-top: 1px solid var(--cyber-border);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin-bottom: 1rem;
}

.title-icon {
  font-size: 1.1rem;
}

/* 更新分组样式 */
.update-group {
  margin-bottom: 1.5rem;
}

.update-group:last-child {
  margin-bottom: 0;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--cyber-border);
  border-left: 3px solid var(--vp-c-brand);
  border-radius: 0.375rem;
  margin-bottom: 0.75rem;
}

.group-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.group-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  letter-spacing: 0.02em;
}

.group-count {
  margin-left: auto;
  padding: 0.125rem 0.5rem;
  background: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  border-radius: 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 1.5rem;
  text-align: center;
}

/* 不同类型的分组颜色 */
.update-group:has([data-type="feature"]) .group-header {
  border-left-color: var(--vp-c-brand);
}

.update-group:has([data-type="feature"]) .group-count {
  background: var(--vp-c-brand);
}

.update-group:has([data-type="improvement"]) .group-header {
  border-left-color: var(--vp-c-brand-light);
}

.update-group:has([data-type="improvement"]) .group-count {
  background: var(--vp-c-brand-light);
}

.update-group:has([data-type="bugfix"]) .group-header {
  border-left-color: #10b981;
}

.update-group:has([data-type="bugfix"]) .group-count {
  background: #10b981;
}

.update-group:has([data-type="breaking"]) .group-header {
  border-left-color: var(--vp-c-warning);
}

.update-group:has([data-type="breaking"]) .group-count {
  background: var(--vp-c-warning);
}

/* 超紧凑的更新列表 */
.updates-mini {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.update-item-mini {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  align-items: flex-start;
  position: relative;
  padding-left: 1rem;
}

.update-item-mini::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: var(--cyber-border-hover);
  border-radius: 0 2px 2px 0;
  transition: all 0.3s ease;
}

.update-item-mini:hover {
  border-color: var(--cyber-border-hover);
  transform: translateX(0.25rem);
  background: var(--cyber-border);
}

.update-item-mini:hover::before {
  height: 80%;
  background: var(--vp-c-brand);
}

.update-content-mini {
  flex: 1;
  min-width: 0;
}

.update-item-title-mini {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin-bottom: 0.25rem;
  line-height: 1.3;
  margin-top: 0;
}

.update-item-title-mini .item-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.update-item-description-mini {
  color: var(--cyber-text-secondary);
  line-height: 1.4;
  font-size: 0.8rem;
  margin: 0;
}

/* 标签 */
.tags-section {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--cyber-border);
  background: var(--cyber-bg-primary);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  background: var(--cyber-border);
  border: 1px solid var(--cyber-border-hover);
  border-radius: 0.75rem;
  color: var(--vp-c-brand);
  font-size: 0.7rem;
  font-weight: 500;
}

/* 图片预览弹窗样式 */
.image-preview-modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 10000 !important;
  animation: modal-fade-in 0.3s ease-out;
  background: rgba(0, 0, 0, 0.8) !important;
}

@keyframes modal-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.preview-backdrop {
  position: absolute;
  inset: 0;
  background: transparent;
  backdrop-filter: blur(8px);
  animation: backdrop-fade-in 0.3s ease-out;
}

@keyframes backdrop-fade-in {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
}

.preview-content {
  position: relative !important;
  max-width: 90vw !important;
  max-height: 90vh !important;
  background: var(--cyber-bg-secondary) !important;
  border: 1px solid var(--cyber-border-hover) !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px var(--cyber-border) !important;
  animation: content-scale-in 0.3s ease-out;
  z-index: 10001 !important;
}

@keyframes content-scale-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.preview-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--cyber-border-hover);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.preview-close:hover {
  background: rgba(255, 0, 0, 0.8);
  border-color: #ff0000;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
}

.preview-close svg {
  width: 1.25rem;
  height: 1.25rem;
}

.preview-image {
  width: 100% !important;
  height: auto !important;
  max-height: 80vh !important;
  object-fit: contain !important;
  display: block !important;
  border-radius: 0.5rem;
  z-index: 10002 !important;
}

.preview-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem 1.5rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  backdrop-filter: blur(10px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .timeline::before {
    left: 1rem;
  }
  
  .timeline-item {
    padding-left: 3rem;
    margin-bottom: 2rem;
  }
  
  .header-top {
    flex-direction: column;
    align-items: start;
    gap: 0.75rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .update-image-compact {
    width: 100%;
    height: 150px;
  }
  
  .highlights-compact {
    flex-direction: column;
  }
  
  .update-item-compact {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .filter-tabs {
    flex-direction: column;
    align-items: stretch;
  }
  
  .preview-content {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .preview-title {
    font-size: 1rem;
    padding: 1.5rem 1rem 0.75rem;
  }
  
  .preview-close {
    width: 2rem;
    height: 2rem;
    top: 0.75rem;
    right: 0.75rem;
  }
  
  .preview-close svg {
    width: 1rem;
    height: 1rem;
  }
}

/* 亮色主题适配 */
[data-theme="light"] .update-card {
  background: var(--cyber-bg-primary);
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .highlight-item {
  background: var(--cyber-bg-secondary);
}

[data-theme="light"] .update-item {
  background: var(--cyber-bg-secondary);
}
</style>