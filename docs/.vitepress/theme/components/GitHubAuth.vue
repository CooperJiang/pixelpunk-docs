<template>
  <div class="github-auth">
    <!-- 未登录状态 -->
    <div v-if="!isLoggedIn" class="login-prompt">
      <div class="login-message">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 12l2 2 4-4M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <p>{{ loginMessage || '需要GitHub登录后才能评论' }}</p>
      </div>
      
      <button 
        @click="handleLogin" 
        :disabled="loggingIn" 
        class="github-login-btn"
      >
        <span v-if="!loggingIn" class="login-content">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          登录 GitHub
        </span>
        <span v-else class="login-loading">
          <div class="spinner"></div>
          登录中...
        </span>
      </button>
    </div>
    
    <!-- 已登录状态 -->
    <div v-else class="user-info">
      <div class="user-avatar">
        <img 
          v-if="userInfo?.github_avatar_url" 
          :src="userInfo.github_avatar_url" 
          :alt="userInfo.github_username"
          @error="handleAvatarError"
        >
        <div v-else class="avatar-placeholder">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
      </div>
      
      <div class="user-details">
        <div class="user-name-info">
          <span class="username">{{ userInfo?.github_username || 'GitHub用户' }}</span>
          <span v-if="userInfo?.github_name" class="display-name">{{ userInfo.github_name }}</span>
        </div>
        <button @click="handleLogout" class="logout-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
          </svg>
          退出
        </button>
      </div>
    </div>
    
    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { githubAuth } from '../services/githubAuth.js'

const props = defineProps({
  loginMessage: {
    type: String,
    default: ''
  },
  showUserInfo: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['login-success', 'login-error', 'logout-success'])

// 状态管理
const isLoggedIn = ref(false)
const userInfo = ref(null)
const loggingIn = ref(false)
const error = ref('')

// 方法
const checkLoginStatus = async () => {
  isLoggedIn.value = githubAuth.isLoggedIn()
  
  if (isLoggedIn.value) {
    // 先尝试从本地存储获取用户信息
    const localUserInfo = githubAuth.getUserInfo()
    if (localUserInfo) {
      userInfo.value = localUserInfo
      emit('login-success', localUserInfo)
    }
    
    try {
      // 验证session并更新用户信息
      const info = await githubAuth.verifySession()
      if (info) {
        userInfo.value = info
        emit('login-success', info)
      } else {
        isLoggedIn.value = false
        userInfo.value = null
      }
    } catch (err) {
      console.error('验证用户信息失败:', err)
      isLoggedIn.value = false
      userInfo.value = null
    }
  }
}

const handleLogin = () => {
  if (loggingIn.value) return
  
  console.log('🔘 用户点击GitHub登录按钮')
  loggingIn.value = true
  error.value = ''
  
  try {
    console.log('🔘 调用 githubAuth.login() 方法')
    githubAuth.login()
    console.log('🔘 login() 方法调用完成，页面应该开始跳转')
    // 注意：login()方法会直接跳转，所以这里的finally可能不会执行
  } catch (err) {
    console.error('🔘 登录过程出错:', err)
    error.value = err.message || '登录失败'
    emit('login-error', err)
    loggingIn.value = false
  }
}

const handleLogout = async () => {
  try {
    await githubAuth.logout()
    isLoggedIn.value = false
    userInfo.value = null
    error.value = ''
    emit('logout-success')
  } catch (err) {
    console.error('退出登录失败:', err)
  }
}

const handleAvatarError = (event) => {
  event.target.style.display = 'none'
  const nextElement = event.target.nextElementSibling
  if (nextElement) {
    nextElement.style.display = 'flex'
  }
}

// 生命周期
onMounted(async () => {
  // 处理GitHub回调
  const isCallback = githubAuth.handleCallback()
  if (isCallback) {
    // 如果是回调，等待一下再检查状态
    setTimeout(checkLoginStatus, 100)
  } else {
    await checkLoginStatus()
  }
})

// 暴露方法给父组件使用
defineExpose({
  checkLoginStatus,
  isLoggedIn: () => isLoggedIn.value,
  getUserInfo: () => userInfo.value
})
</script>

<style scoped>
.github-auth {
  width: 100%;
}

/* 登录提示区域 */
.login-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider-light);
}

.login-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.login-message svg {
  color: var(--vp-c-text-2);
}

.login-message p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.5;
}

/* GitHub登录按钮 */
.github-login-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #24292e;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.github-login-btn:hover:not(:disabled) {
  background: #1a1e22;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(36, 41, 46, 0.3);
}

.github-login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.login-content {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.login-loading {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 用户信息区域 */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider-light);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.user-details {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.user-name-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.username {
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.display-name {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.logout-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  background: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  font-family: inherit;
}

.logout-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}

/* 错误提示 */
.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.error-message svg {
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-prompt {
    padding: 1.5rem;
  }
  
  .github-login-btn {
    width: 100%;
    justify-content: center;
  }
  
  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .user-details {
    width: 100%;
    justify-content: space-between;
  }
}

/* 主题适配 */
[data-theme="light"] .github-login-btn {
  background: #24292e;
}

[data-theme="light"] .github-login-btn:hover:not(:disabled) {
  background: #1a1e22;
}

[data-theme="dark"] .github-login-btn {
  background: #ffffff;
  color: #24292e;
}

[data-theme="dark"] .github-login-btn:hover:not(:disabled) {
  background: #f6f8fa;
}
</style>