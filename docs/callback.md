---
layout: false
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // GitHub回调处理逻辑
  const urlParams = new URLSearchParams(window.location.search)
  const sessionToken = urlParams.get('session_token')
  const error = urlParams.get('error')
  
  if (error) {
    console.error('GitHub登录错误:', error)
    alert('GitHub登录失败: ' + error)
    // 跳转回反馈页面
    window.location.href = '/feedback'
    return
  }
  
  if (sessionToken) {
    // 保存token到localStorage
    localStorage.setItem('github_session_token', sessionToken)
    
    // 跳转回反馈页面
    window.location.href = '/feedback'
  } else {
    // 处理GitHub OAuth回调参数
    const code = urlParams.get('code')
    const state = urlParams.get('state')
    
    if (code && state) {
      // 这种情况下，API会自动处理并重定向带session_token
      // 如果到这里说明可能有问题，等待一下或刷新
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } else {
      // 没有任何有效参数，直接跳转回反馈页面
      window.location.href = '/feedback'
    }
  }
})
</script>

<div id="callback-processing" style="
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">
  <div style="margin-bottom: 2rem;">
    <div style="
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    "></div>
    <h2 style="color: #333; margin: 0 0 0.5rem 0;">正在处理GitHub登录...</h2>
    <p style="color: #666; margin: 0;">请稍候，即将跳转回反馈页面</p>
  </div>
  
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</div>