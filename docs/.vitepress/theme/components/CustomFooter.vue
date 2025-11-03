<template>
  <footer class="custom-footer">
    <div class="footer-content">
      <div class="footer-center">
        <div class="footer-text">
          <p>Released under the MIT License.</p>
          <p>Copyright © 2024-present PixelPunk Team</p>
        </div>
      </div>
      <div class="last-update">
        <span class="update-time">{{ formatTime }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const buildTime = ref('')
const formatTime = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/build-timestamp.json')
    if (response.ok) {
      const data = await response.json()
      buildTime.value = data.buildTime
      formatTime.value = data.buildTime
    } else {
      // 如果文件不存在，使用当前时间
      const now = new Date()
      formatTime.value = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(/\//g, '-')
    }
  } catch (error) {
    console.warn('无法获取构建时间:', error)
    // 使用当前时间作为后备
    const now = new Date()
    formatTime.value = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\//g, '-')
  }
})
</script>

<style scoped>
.custom-footer {
  background-color: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  padding: 20px 0;
  margin-top: 40px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.footer-content {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
  position: relative;
}

.footer-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
}

.footer-text {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}

.footer-text p {
  margin: 0;
  margin-bottom: 4px;
}

.footer-text p:last-child {
  margin-bottom: 0;
}

.last-update {
  position: absolute;
  bottom: 0;
  right: 24px;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  color: var(--vp-c-text-3);
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.last-update:hover {
  opacity: 0.8;
}

.update-time {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

/* 防止横向滚动条 */
.custom-footer,
.footer-content {
  max-width: 100%;
  overflow-x: hidden;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .custom-footer {
    padding: 16px 0;
    margin-top: 32px;
  }
  
  .footer-content {
    padding: 0 16px;
  }
  
  .footer-text {
    font-size: 13px;
  }
  
  .last-update {
    right: 16px;
    font-size: 9px;
    opacity: 0.4;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 0 12px;
  }
  
  .footer-text {
    font-size: 12px;
  }
  
  .last-update {
    right: 12px;
    font-size: 8px;
  }
}

/* 确保品牌色一致性 */
:root {
  --vp-c-brand-1: #00ff88;
  --vp-c-brand-1-rgb: 0, 255, 136;
}

.dark {
  --vp-c-brand-1: #00ff88;
  --vp-c-brand-1-rgb: 0, 255, 136;
}
</style>