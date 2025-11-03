<template>
  <div class="under-development">
    <div class="container">
      <div class="icon-wrapper">
        <svg class="construction-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      </div>
      
      <h2 class="title">页面开发中</h2>
      <p class="description">此页面正在开发中，敬请期待</p>
      
      <div class="features">
        <div class="feature-item">
          <span class="feature-icon">📝</span>
          <span class="feature-text">内容正在编写</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🚧</span>
          <span class="feature-text">功能正在完善</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">⚡</span>
          <span class="feature-text">即将上线</span>
        </div>
      </div>
      
      <div class="actions">
        <a href="/" class="btn btn-primary">返回首页</a>
        <a href="/docs/introduction" class="btn btn-secondary">查看文档</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.under-development {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, 
    rgba(0, 255, 136, 0.05) 0%, 
    rgba(0, 255, 136, 0.02) 50%, 
    rgba(255, 0, 136, 0.05) 100%
  );
  border-radius: 16px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
}

.under-development::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.container {
  text-align: center;
  position: relative;
  z-index: 1;
  max-width: 500px;
}

.icon-wrapper {
  margin-bottom: 1.5rem;
}

.construction-icon {
  width: 64px;
  height: 64px;
  color: var(--vp-c-brand-1, #00ff88);
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  background: linear-gradient(45deg, 
    var(--vp-c-brand-1, #00ff88), 
    var(--vp-c-brand-2, #ff0088)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.1);
  border-color: var(--vp-c-brand-1, #00ff88);
}

.feature-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background: var(--vp-c-brand-1, #00ff88);
  color: var(--vp-c-bg);
}

.btn-primary:hover {
  background: var(--vp-c-brand-2, #00dd77);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1, #00ff88);
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .under-development {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
  }
}

/* 深色模式支持 */
.dark .under-development {
  background: linear-gradient(135deg, 
    rgba(0, 255, 136, 0.08) 0%, 
    rgba(0, 255, 136, 0.03) 50%, 
    rgba(255, 0, 136, 0.08) 100%
  );
}

.dark .feature-item {
  background: var(--vp-c-bg-alt);
}

.dark .btn-primary {
  color: var(--vp-c-bg-alt);
}
</style>