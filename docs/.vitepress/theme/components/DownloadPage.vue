<template>
  <div class="download-page-container">
    <!-- 页面头部 -->
    <div class="download-header">
      <div class="header-bg absolute inset-0">
        <div class="grid-overlay"></div>
        <div class="gradient-overlay"></div>
      </div>
      
      <div class="header-content relative z-10 container mx-auto px-4 py-16 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
          下载安装
        </h1>
        
        <p class="text-lg max-w-2xl mx-auto opacity-90 mb-8">
          PixelPunk 即将正式发布，我们正在完善安装脚本、镜像和安装包功能
        </p>
        
        <!-- 状态指示器 -->
        <div class="status-indicator">
          <div class="status-icon">
            <div class="loading-spinner"></div>
          </div>
          <span class="status-text">开发中...</span>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="download-content container mx-auto px-4 py-16">
      <div class="content-wrapper">
        <!-- 当前状态卡片 -->
        <div class="status-card">
          <div class="card-header">
            <div class="header-icon">🚧</div>
            <h2 class="card-title">正在建设中</h2>
          </div>
          
          <div class="card-content">
            <p class="card-description">
              我们正在努力完善 PixelPunk 的各项功能，包括官网建设、bug 修复和功能测试。
              预计将在近期开放以下安装方式：
            </p>
            
            <div class="features-coming-soon">
              <div class="feature-item">
                <div class="feature-icon">📦</div>
                <div class="feature-info">
                  <h3>安装包下载</h3>
                  <p>提供 Windows、macOS、Linux 平台的安装包</p>
                </div>
                <div class="feature-status coming-soon">即将开放</div>
              </div>
              
              <div class="feature-item">
                <div class="feature-icon">🐳</div>
                <div class="feature-info">
                  <h3>Docker 镜像</h3>
                  <p>一键部署的 Docker 容器镜像</p>
                </div>
                <div class="feature-status coming-soon">即将开放</div>
              </div>
              
              <div class="feature-item">
                <div class="feature-icon">⚡</div>
                <div class="feature-info">
                  <h3>安装脚本</h3>
                  <p>自动化安装和配置脚本</p>
                </div>
                <div class="feature-status coming-soon">即将开放</div>
              </div>
              
              <div class="feature-item">
                <div class="feature-icon">☁️</div>
                <div class="feature-info">
                  <h3>云部署</h3>
                  <p>一键部署到云平台的解决方案</p>
                </div>
                <div class="feature-status coming-soon">即将开放</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 进度时间线 -->
        <div class="progress-timeline">
          <h3 class="timeline-title">开发进度</h3>
          
          <div class="timeline-items">
            <div class="timeline-item completed">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>核心功能开发</h4>
                <p>完成基础图床功能和 AI 分析能力</p>
                <span class="timeline-date">已完成</span>
              </div>
            </div>
            
            <div class="timeline-item completed">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>官网建设</h4>
                <p>完成官网设计和文档编写</p>
                <span class="timeline-date">已完成</span>
              </div>
            </div>
            
            <div class="timeline-item current">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>测试与优化</h4>
                <p>修复 bug，优化性能，完善用户体验</p>
                <span class="timeline-date">进行中</span>
              </div>
            </div>
            
            <div class="timeline-item upcoming">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>打包部署</h4>
                <p>制作安装包，构建 Docker 镜像</p>
                <span class="timeline-date">即将开始</span>
              </div>
            </div>
            
            <div class="timeline-item upcoming">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>正式发布</h4>
                <p>开放下载，提供完整的安装方案</p>
                <span class="timeline-date">预计近期</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 关注我们 -->
        <div class="follow-section">
          <div class="follow-card">
            <h3 class="follow-title">获取最新进展</h3>
            <p class="follow-description">
              关注我们的开发进度，第一时间获取发布通知
            </p>
            
            <div class="follow-actions">
              <a href="https://github.com/CooperJiang/PixelPunk" class="follow-btn primary" target="_blank">
                <span class="btn-icon">⭐</span>
                <span>Star on GitHub</span>
              </a>
              
              <a href="/updates" class="follow-btn secondary">
                <span class="btn-icon">📋</span>
                <span>查看更新日志</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(async () => {
  // 动态导入 ScrollTrigger 避免构建问题
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      // 状态卡片动画
      gsap.set('.status-card', { opacity: 0, y: 50 })
      
      ScrollTrigger.create({
        trigger: '.status-card',
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.status-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
        }
      })
      
      // 时间线动画
      gsap.set('.timeline-item', { opacity: 0, x: -30 })
      
      ScrollTrigger.batch('.timeline-item', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1
          })
        },
        start: 'top 85%'
      })
      
      // 旋转动画
      gsap.to('.loading-spinner', {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: 'linear'
      })
      
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
    }
  }
})
</script>

<style scoped>
.download-page-container {
  min-height: 100vh;
  background: var(--cyber-bg-primary);
}

/* 页面头部 */
.download-header {
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

/* 状态指示器 */
.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.status-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--cyber-border);
  border-top: 3px solid var(--vp-c-brand);
  border-radius: 50%;
}

.status-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

/* 主要内容 */
.download-content {
  max-width: 1200px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* 状态卡片 */
.status-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.header-icon {
  font-size: 2rem;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin: 0;
}

.card-description {
  color: var(--cyber-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* 即将开放的功能 */
.features-coming-soon {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.feature-item:hover {
  border-color: var(--cyber-border-hover);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feature-info {
  flex: 1;
}

.feature-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin: 0 0 0.25rem 0;
}

.feature-info p {
  font-size: 0.9rem;
  color: var(--cyber-text-secondary);
  margin: 0;
  line-height: 1.4;
}

.feature-status {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.feature-status.coming-soon {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

/* 进度时间线 */
.progress-timeline {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin: 0 0 2rem 0;
  text-align: center;
}

.timeline-items {
  position: relative;
  padding-left: 2rem;
}

.timeline-items::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--cyber-border);
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
  margin-left: 1rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -1.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid var(--cyber-border);
  background: var(--cyber-bg-secondary);
  transition: all 0.3s ease;
}

.timeline-item.completed .timeline-marker {
  background: #10b981;
  border-color: #10b981;
}

.timeline-item.current .timeline-marker {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 10px var(--vp-c-brand);
}

.timeline-item.upcoming .timeline-marker {
  background: var(--cyber-bg-primary);
  border-color: var(--cyber-border);
}

.timeline-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin: 0 0 0.5rem 0;
}

.timeline-content p {
  color: var(--cyber-text-secondary);
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
}

.timeline-date {
  font-size: 0.875rem;
  color: var(--cyber-text-tertiary);
  font-weight: 500;
}

.timeline-item.completed .timeline-date {
  color: #10b981;
}

.timeline-item.current .timeline-date {
  color: var(--vp-c-brand);
}

/* 关注我们 */
.follow-section {
  display: flex;
  justify-content: center;
}

.follow-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

.follow-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin: 0 0 1rem 0;
}

.follow-description {
  color: var(--cyber-text-secondary);
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.follow-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.follow-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
}

.follow-btn.primary {
  background: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  border: 1px solid var(--vp-c-brand);
}

.follow-btn.primary:hover {
  background: var(--vp-c-brand-light);
  box-shadow: 0 0 20px var(--vp-c-brand);
  transform: translateY(-2px);
}

.follow-btn.secondary {
  background: transparent;
  color: var(--cyber-text-primary);
  border: 1px solid var(--cyber-border-hover);
}

.follow-btn.secondary:hover {
  background: var(--cyber-border);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.btn-icon {
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .download-content {
    padding: 2rem 1rem;
  }
  
  .status-card,
  .progress-timeline,
  .follow-card {
    padding: 1.5rem;
  }
  
  .features-coming-soon {
    grid-template-columns: 1fr;
  }
  
  .feature-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .feature-status {
    align-self: center;
  }
  
  .timeline-items {
    padding-left: 1.5rem;
  }
  
  .timeline-items::before {
    left: 0.75rem;
  }
  
  .timeline-marker {
    left: -1.25rem;
  }
  
  .follow-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .follow-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>