<template>
  <div class="feedback-container">
    <div class="container mx-auto px-4 py-8">
      <!-- 提交反馈区域 -->
      <section class="submit-section">
        <div class="section-header" @click="toggleSubmitForm">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            提交反馈
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
              class="collapse-icon"
              :class="{ expanded: showSubmitForm }"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </h2>
          <p class="section-subtitle">{{ showSubmitForm ? '分享您的想法和建议，帮助我们改进产品' : '点击展开提交反馈表单' }}</p>
        </div>

        <div v-show="showSubmitForm" class="submit-form-container">
          <!-- 系统未启用提示 -->
          <div v-if="configChecked && !systemEnabled" class="system-disabled-notice">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>反馈功能暂时未启用，请稍后再试</p>
          </div>
          
          <!-- GitHub认证提示 -->
          <GitHubAuth 
            v-else-if="!isLoggedIn" 
            loginMessage="需要GitHub登录后才能提交反馈"
            @login-success="handleLoginSuccess"
          />
          
          <Transition name="form-slide">
            <form v-if="isLoggedIn && systemEnabled" @submit.prevent="submitFeedback" class="feedback-form">
            <div class="form-grid">
              <!-- 反馈类型 -->
              <div class="form-group">
                <label class="form-label">反馈类型</label>
                <div class="type-selector">
                  <button
                    v-for="option in typeOptions"
                    :key="option.value"
                    type="button"
                    @click="feedbackForm.type = option.value"
                    :class="['type-option', { active: feedbackForm.type === option.value }]"
                  >
                    <span class="type-icon" v-html="option.icon"></span>
                    <span class="type-text">{{ option.label }}</span>
                  </button>
                </div>
              </div>

              <!-- 标题 -->
              <div class="form-group full-width">
                <label class="form-label required">标题</label>
                <input
                  v-model="feedbackForm.title"
                  type="text"
                  required
                  maxlength="255"
                  placeholder="简要描述您的问题或建议..."
                  class="form-input"
                >
                <div class="input-footer">
                  <span class="char-count">{{ feedbackForm.title.length }}/255</span>
                </div>
              </div>

              <!-- 详细描述 -->
              <div class="form-group full-width">
                <label class="form-label required">详细描述</label>
                
                <!-- 用户信息显示 -->
                <div v-if="currentUserInfo" class="user-info-bar">
                  <div class="user-avatar">
                    <img 
                      v-if="currentUserInfo.github_avatar_url" 
                      :src="currentUserInfo.github_avatar_url" 
                      :alt="currentUserInfo.github_username"
                      class="github-avatar"
                    >
                    <div v-else class="avatar-placeholder">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="user-details">
                    <span class="username">{{ currentUserInfo.github_username }}</span>
                    <span v-if="currentUserInfo.github_name" class="display-name">{{ currentUserInfo.github_name }}</span>
                  </div>
                  <div class="login-status">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 12l2 2 4-4M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span>已登录</span>
                  </div>
                </div>
                
                <textarea
                  v-model="feedbackForm.description"
                  required
                  maxlength="2000"
                  rows="4"
                  placeholder="请详细说明您遇到的问题、期望的功能或改进建议..."
                  class="form-textarea"
                ></textarea>
                <div class="input-footer">
                  <span class="char-count">{{ feedbackForm.description.length }}/2000</span>
                </div>
              </div>

              <!-- 联系信息不再需要手动填写，系统会自动从GitHub获取 -->

              <!-- 图片上传组件 -->
              <div class="form-group full-width">
                <ImageUpload
                  v-model="selectedImages"
                  @error="showNotification($event, 'error')"
                />
              </div>
            </div>
            
            <!-- 提交按钮独立行 -->
            <div class="submit-button-container">
              <button
                type="submit"
                :disabled="submitting || !canSubmit"
                class="submit-button"
              >
                <span v-if="!submitting" class="button-content">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                  </svg>
                  提交反馈
                </span>
                <span v-else class="button-loading">
                  <div class="spinner"></div>
                  提交中...
                </span>
              </button>
            </div>
          </form>
          </Transition>
        </div>
      </section>

      <!-- 反馈列表区域 -->
      <section class="list-section">
        <!-- 标题和筛选器在同一行 -->
        <div class="list-header">
          <div class="header-info">
            <h2 class="section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              社区反馈
            </h2>
            <p class="section-subtitle">查看其他用户的想法和建议</p>
          </div>
          
          <!-- 筛选器 -->
          <div class="filter-tabs">
            <button
              v-for="filter in filters"
              :key="filter.key"
              @click="switchFilter(filter.key)"
              :class="['filter-tab', { active: currentFilter === filter.key }]"
            >
              <span class="tab-text">{{ filter.label }}</span>
              <span class="tab-badge">{{ filter.count }}</span>
            </button>
          </div>
        </div>

        <!-- 反馈列表 -->
        <div class="feedback-list">
          <div v-if="loading" class="loading-state">
            <div class="spinner large"></div>
            <p>加载反馈中...</p>
          </div>

          <div v-else-if="filteredFeedbacks.length === 0" class="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <h3>暂无反馈</h3>
            <p>成为第一个分享想法的人吧！</p>
          </div>

          <div v-else class="feedback-items">
            <div
              v-for="feedback in paginatedFeedbacks"
              :key="feedback.id"
              class="feedback-item"
            >
              <!-- 主要反馈内容 -->
              <div class="feedback-main">
                <div class="author-avatar">
                  <img 
                    v-if="feedback.github_avatar_url" 
                    :src="feedback.github_avatar_url" 
                    :alt="feedback.submitter_name"
                    class="avatar-image"
                    @error="handleAvatarError"
                  />
                  <span class="avatar-text">
                    {{ getInitials(feedback.submitter_name) }}
                  </span>
                </div>
                
                <div class="feedback-content">
                  <div class="feedback-header">
                    <span class="author-name">{{ feedback.submitter_name }}</span>
                    <span class="feedback-time">{{ formatDate(feedback.created_at) }}</span>
                  </div>
                  
                  <div class="feedback-body">
                    <h3 class="feedback-title">{{ feedback.title }}</h3>
                    <div class="feedback-description">
                      <p>{{ feedback.description }}</p>
                    </div>

                    <!-- 附件展示 -->
                    <div v-if="feedback.attachments && feedback.attachments.length > 0" class="feedback-attachments">
                      <div class="attachments-grid">
                        <div
                          v-for="attachment in feedback.attachments"
                          :key="attachment.id"
                          class="attachment-item"
                          @click="viewImage(attachment)"
                        >
                          <img
                            :src="`${API_BASE_URL.replace('/api/public/v1/projects', '')}${attachment.url}`"
                            :alt="attachment.file_name"
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 操作区域 -->
                  <div class="feedback-actions">
                    <div class="action-stats">
                      <span v-if="feedback.comments && feedback.comments.length > 0" class="stats-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        {{ feedback.comments.length }}
                      </span>
                    </div>
                    
                    <div class="action-buttons">
                      <button
                        v-if="feedback.comments && feedback.comments.length > 0"
                        @click="toggleComments(feedback.id)"
                        class="action-btn reply-btn"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="6,9 12,15 18,9" :class="{ 'rotate-180': expandedComments.includes(feedback.id) }"></polyline>
                        </svg>
                        {{ expandedComments.includes(feedback.id) ? '收起' : '展开' }}
                      </button>
                      
                      <button @click="toggleFeedbackReply(feedback.id)" class="action-btn reply-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                        </svg>
                        回复
                      </button>
                    </div>
                  </div>
                  
                  <!-- 内联回复表单 -->
                  <div v-if="showFeedbackReply[feedback.id]" class="inline-reply-form">
                    <!-- GitHub认证组件 -->
                    <GitHubAuth 
                      v-if="!isLoggedIn" 
                      loginMessage="需要GitHub登录后才能回复"
                      @login-success="handleLoginSuccess"
                    />
                    
                    <!-- 回复表单（仅登录用户可见） -->
                    <form v-if="isLoggedIn" @submit.prevent="submitFeedbackReply(feedback.id)">
                      <textarea 
                        v-model="feedbackReplyForm.content"
                        placeholder="写下你的回复..."
                        rows="3"
                        required
                        class="reply-textarea"
                      ></textarea>
                      
                      <div class="reply-actions">
                        <button type="button" @click="cancelFeedbackReply(feedback.id)" class="cancel-btn">取消</button>
                        <button type="submit" :disabled="!canSubmitFeedbackReply" class="submit-btn">提交回复</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <!-- 子评论区域 -->
              <div
                v-if="feedback.comments && feedback.comments.length > 0 && expandedComments.includes(feedback.id)"
                class="comments-section"
              >
                <div class="comments-container">
                  <CommentTree
                    v-for="comment in feedback.comments"
                    :key="comment.id"
                    :comment="comment"
                    :feedback-id="feedback.id"
                    :depth="0"
                    @reply-submitted="handleReplySubmit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 滚动加载提示 -->
        <div v-if="loadingMore" class="scroll-loading">
          <div class="spinner large"></div>
          <p>加载更多评论中...</p>
        </div>
      </section>
    </div>

    <!-- 通知消息 -->
    <Transition name="notification">
      <div v-if="notification.show" :class="['notification', notification.type]">
        <div class="notification-content">
          <svg
            v-if="notification.type === 'success'"
            width="20" height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
          <svg
            v-else
            width="20" height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{{ notification.message }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { feedbackConfig } from '../config/feedback.js'
import { githubAuth } from '../services/githubAuth.js'
import ImageUpload from './ImageUpload.vue'
import CommentTree from './CommentTree.vue'
import GitHubAuth from './GitHubAuth.vue'

const API_BASE_URL = feedbackConfig.apiBaseUrl
const API_KEY = feedbackConfig.apiKey

// 反馈类型
const typeOptions = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: '功能' },
  { value: 'other', label: '其他' }
]

// 数据
const feedbacks = ref([])
const loading = ref(false)
const submitting = ref(false)
const loadingMore = ref(false)
const currentFilter = ref('approved')
const currentStats = ref({})
const expandedComments = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const selectedImages = ref([])
const hasMore = ref(true)
const showSubmitForm = ref(false) // 控制提交表单折叠状态
const isLoggedIn = ref(false) // GitHub登录状态
const currentUserInfo = ref(null) // 当前用户信息
const configChecked = ref(false) // 配置检查状态
const systemEnabled = ref(true) // 系统启用状态

// 表单数据
const feedbackForm = ref({
  title: '',
  description: '',
  type: 'feature'
})

// 回复相关数据
const showFeedbackReply = ref({})
const feedbackReplyForm = ref({
  content: ''
})

// 通知消息
const notification = ref({
  show: false,
  message: '',
  type: 'success'
})

// 计算属性
const canSubmit = computed(() => {
  const form = feedbackForm.value
  return form.title.trim() && 
         form.description.trim() &&
         isLoggedIn.value
})

const canSubmitFeedbackReply = computed(() => {
  const form = feedbackReplyForm.value
  return form.content.trim() && isLoggedIn.value
})


const stats = computed(() => {
  return feedbacks.value.reduce((acc, fb) => {
    acc[fb.status] = (acc[fb.status] || 0) + 1
    return acc
  }, {})
})

const filters = computed(() => [
  { key: 'approved', label: '已通过', count: currentStats.value.approved || 0 },
  { key: 'completed', label: '已完成', count: currentStats.value.completed || 0 }
])

const filteredFeedbacks = computed(() => {
  // 直接返回当前加载的数据，不再需要客户端过滤
  const result = feedbacks.value
  console.log('📊 filteredFeedbacks computed:', {
    feedbacksLength: feedbacks.value.length,
    resultLength: result.length,
    firstItem: result[0]
  })
  return result
})

const paginatedFeedbacks = computed(() => {
  const result = filteredFeedbacks.value
  console.log('📊 paginatedFeedbacks computed:', {
    filteredLength: filteredFeedbacks.value.length,
    resultLength: result.length
  })
  return result
})

// 初始化字符
const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

// 方法
const checkLoginStatus = () => {
  isLoggedIn.value = githubAuth.isLoggedIn()
  currentUserInfo.value = githubAuth.getUserInfo()
}

const handleLoginSuccess = (userInfo) => {
  checkLoginStatus()
  currentUserInfo.value = userInfo
}

const showNotification = (text, type = 'success') => {
  notification.value = {
    show: true,
    message: text,
    type: type
  }
  setTimeout(() => {
    notification.value.show = false
  }, 5000) // 延长显示时间到5秒，便于用户阅读完整的友好提示
}

const toggleSubmitForm = () => {
  showSubmitForm.value = !showSubmitForm.value
}

const handleAvatarError = (event) => {
  // 头像加载失败时，隐藏图片，文字头像会自动显示（因为图片隐藏后文字头像就可见了）
  event.target.style.display = 'none'
}

// 构建评论树形结构
// 新接口已经返回完整的树形结构，不需要额外处理
// 评论树形结构处理（新接口已支持无限层级）
const processCommentTree = (comments) => {
  if (!comments || !Array.isArray(comments)) return []
  
  // 新接口返回的数据已经是完整的树形结构
  // replies字段包含子评论，支持无限层级嵌套
  return comments.map(comment => ({
    ...comment,
    replies: comment.replies ? processCommentTree(comment.replies) : []
  }))
}

// 兼容旧的方法名
const buildCommentTree = processCommentTree

// 从评论内容中提取标题（取第一行或前50个字符）
const extractTitle = (content) => {
  if (!content) return '无标题'
  const firstLine = content.split('\n')[0]
  return firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine
}

// 根据新文档，检查系统配置
const checkSystemConfig = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/${API_KEY}/config`)
    
    if (!response.ok) {
      throw new Error('获取配置失败')
    }

    const data = await response.json()
    // 根据实际API响应格式调整 - 如果没有code字段，说明响应成功
    if (data.code && data.code !== 200) {
      throw new Error(data.message || '获取配置失败')
    }

    // 检查反馈功能是否启用 - 根据实际API返回的字段调整
    systemEnabled.value = data.data?.is_enabled ?? data.data?.feedback_enabled ?? true
    configChecked.value = true

    if (!systemEnabled.value) {
      showNotification('反馈功能未启用', 'error')
    }
    
    console.log('📋 系统配置检查完成:', { 
      enabled: systemEnabled.value, 
      config: data.data 
    })

    return data.data
  } catch (error) {
    console.error('配置检查失败:', error)
    // 配置检查失败不阻止功能使用，使用默认配置
    configChecked.value = true
    systemEnabled.value = true
    return null
  }
}

// 根据当前筛选类型加载对应数据
const loadFeedbacks = async (resetPage = false) => {
  if (resetPage) {
    currentPage.value = 1
  }
  
  loading.value = true
  try {
    // 根据当前筛选类型请求对应接口
    let apiEndpoint = ''
    switch (currentFilter.value) {
      case 'approved':
        apiEndpoint = 'approved'
        break
      case 'completed':
        apiEndpoint = 'completed'
        break
      default:
        apiEndpoint = 'approved'
    }
    
    const apiUrl = `${API_BASE_URL}/${API_KEY}/feedback/${apiEndpoint}?page=${currentPage.value}&page_size=${pageSize.value}`
    console.log('🌐 API请求信息:', {
      url: apiUrl,
      filter: currentFilter.value,
      endpoint: apiEndpoint,
      page: currentPage.value
    })
    
    const response = await fetch(apiUrl)
    
    let data
    try {
      data = await response.json()
      console.log('🌐 API完整响应:', {
        status: response.status,
        ok: response.ok,
        responseData: data
      })
    } catch (parseError) {
      console.error('JSON解析错误:', parseError, 'Response status:', response.status)
      throw new Error('服务器响应格式错误')
    }
    
    // 根据实际API响应格式调整 - 如果没有code字段，说明响应成功
    if (data.code && data.code !== 200) {
      throw new Error(data.message || '请求失败')
    }

    // 根据API实际返回格式判断数据类型
    let processedFeedbacks = []
    
    if (data.data?.feedbacks) {
      // 如果返回的是反馈列表 (基础 /feedback 接口)
      const feedbacks = data.data.feedbacks
      console.log('📊 反馈数据 (feedbacks):', {
        count: feedbacks.length,
        firstItem: feedbacks[0]
      })
      
      processedFeedbacks = feedbacks.map(feedback => ({
        id: feedback.id,
        title: feedback.title,
        description: feedback.description,
        status: feedback.status,
        submitter_name: feedback.submitter_name,
        submitter_email: feedback.submitter_email,
        created_at: feedback.created_at,
        updated_at: feedback.updated_at,
        comments: feedback.comments ? processCommentTree(feedback.comments) : [],
        comments_count: feedback.comments ? getCommentsCount(feedback.comments) : 0,
        type: feedback.type,
        attachments: feedback.attachments || []
      }))
      
    } else if (data.data?.comments) {
      // 如果返回的是评论列表 (/feedback/approved, /feedback/completed 接口)
      const comments = data.data.comments
      console.log('📊 评论数据 (comments):', {
        count: comments.length,
        firstItem: comments[0]
      })
      
      processedFeedbacks = comments.map(comment => ({
        id: comment.id,
        title: extractTitle(comment.content),
        description: comment.content,
        status: comment.status,
        submitter_name: comment.commenter_name,
        submitter_email: comment.commenter_email,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        comments: comment.replies ? processCommentTree(comment.replies) : [],
        comments_count: comment.replies ? getCommentsCount(comment.replies) : 0,
        type: comment.type,
        feedback_id: comment.feedback_id,
        attachments: comment.attachments || []
      }))
    }
    
    processedFeedbacks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // 最新的在上面

    // 更新分页信息 - 兼容不同的API响应格式
    const pagination = data.data?.pagination ? {
      page: data.data.pagination.page || 1,
      page_size: data.data.pagination.page_size || 10,
      total: data.data.pagination.total || 0,
      total_pages: data.data.pagination.total_pages || 1
    } : {
      page: data.data?.page || 1,
      page_size: data.data?.page_size || 10,
      total: data.data?.total || 0,
      total_pages: data.data?.total_pages || 1
    }
    
    // 统计信息
    const stats = data.data?.stats || {
      approved: processedFeedbacks.filter(f => f.status === 'approved').length,
      pending: processedFeedbacks.filter(f => f.status === 'pending').length,
      rejected: processedFeedbacks.filter(f => f.status === 'rejected').length,
      completed: processedFeedbacks.filter(f => f.status === 'completed').length,
      total: processedFeedbacks.length
    }
    
    hasMore.value = currentPage.value < (pagination.total_pages || 1)

    // 更新数据
    console.log('📊 处理后的反馈数据:', {
      processedCount: processedFeedbacks.length,
      currentPage: currentPage.value,
      resetPage,
      finalFeedbacks: processedFeedbacks
    })
    
    if (currentPage.value === 1) {
      feedbacks.value = processedFeedbacks
      // 默认展开所有评论
      expandedComments.value = processedFeedbacks.map(f => f.id)
    } else {
      feedbacks.value = [...feedbacks.value, ...processedFeedbacks]
      // 展开新加载的评论
      expandedComments.value = [...expandedComments.value, ...processedFeedbacks.map(f => f.id)]
    }
    
    console.log('📊 更新后的状态:', {
      feedbacksValueLength: feedbacks.value.length,
      stats: stats,
      hasMore: hasMore.value,
      expandedComments: expandedComments.value.length
    })
    
    // 更新统计信息
    currentStats.value = stats
    
  } catch (error) {
    console.error('加载反馈失败:', error)
    showNotification('加载失败，请稍后重试', 'error')
  } finally {
    loading.value = false
  }
}

const submitFeedback = async () => {
  if (!isLoggedIn.value) {
    showNotification('请先登录GitHub', 'error')
    return
  }

  submitting.value = true
  try {
    const data = { 
      ...feedbackForm.value,
      is_public: true  // 根据新文档，添加is_public参数
    }
    
    if (selectedImages.value.length) {
      data.attachments = selectedImages.value.map(img => ({
        file_name: img.name,
        file_type: img.type,
        file_data: img.base64.split(',')[1]
      }))
    }

    const authHeaders = githubAuth.getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/${API_KEY}/feedback`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...authHeaders
      },
      body: JSON.stringify(data)
    })

    if (response.status === 401) {
      githubAuth.clearToken()
      checkLoginStatus()
      showNotification('登录已过期，请重新登录', 'error')
      return
    }

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (parseError) {
        console.error('错误响应解析失败:', parseError)
        throw new Error('提交失败')
      }
      throw new Error(errorData.message || '提交失败')
    }

    showNotification('提交成功！已提交等待审核通过后显示')
    
    // 重置表单
    feedbackForm.value = {
      title: '',
      description: '',
      type: 'feature'
    }
    selectedImages.value = []
    
    loadFeedbacks()
  } catch (error) {
    showNotification(error.message, 'error')
  } finally {
    submitting.value = false
  }
}


const viewImage = (attachment) => {
  const url = `${API_BASE_URL.replace('/api/public/v1/projects', '')}${attachment.url}`
  window.open(url, '_blank')
}

const toggleComments = async (feedbackId) => {
  const index = expandedComments.value.indexOf(feedbackId)
  if (index > -1) {
    expandedComments.value.splice(index, 1)
  } else {
    expandedComments.value.push(feedbackId)
    // 如果反馈中没有评论数据，尝试独立加载
    const feedback = feedbacks.value.find(f => f.id === feedbackId)
    if (feedback && !feedback.comments) {
      await loadComments(feedbackId)
    }
  }
}

// 根据新文档，评论模块独立API
const loadComments = async (feedbackId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${API_KEY}/feedback/${feedbackId}/comments?page=1&page_size=10`)
    
    if (!response.ok) {
      throw new Error('加载评论失败')
    }

    const data = await response.json()
    if (data.code !== 200) {
      throw new Error(data.message || '加载评论失败')
    }

    // 找到对应的反馈项并更新评论数据
    const feedback = feedbacks.value.find(f => f.id === feedbackId)
    if (feedback) {
      // 根据新文档的数据结构
      feedback.comments = data.data?.comments || []
    }
  } catch (error) {
    console.error('加载评论失败:', error)
    showNotification('加载评论失败', 'error')
  }
}

const toggleFeedbackReply = (feedbackId) => {
  showFeedbackReply.value[feedbackId] = !showFeedbackReply.value[feedbackId]
  if (!showFeedbackReply.value[feedbackId]) {
    cancelFeedbackReply(feedbackId)
  }
}

const cancelFeedbackReply = (feedbackId) => {
  showFeedbackReply.value[feedbackId] = false
  feedbackReplyForm.value = {
    content: ''
  }
}

const submitFeedbackReply = async (feedbackId) => {
  if (!isLoggedIn.value) {
    showNotification('请先登录GitHub', 'error')
    return
  }

  try {
    const authHeaders = githubAuth.getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/${API_KEY}/feedback/${feedbackId}/comments`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...authHeaders
      },
      body: JSON.stringify({
        content: feedbackReplyForm.value.content
      })
    })

    if (response.status === 401) {
      githubAuth.clearToken()
      checkLoginStatus()
      showNotification('登录已过期，请重新登录', 'error')
      return
    }

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (parseError) {
        console.error('错误响应解析失败:', parseError)
        throw new Error('回复失败')
      }
      throw new Error(errorData.message || '回复失败')
    }

    showNotification('回复成功！已提交等待审核通过后显示')
    cancelFeedbackReply(feedbackId)
    // 重新加载反馈列表以获取最新评论
    loadFeedbacks()
  } catch (error) {
    showNotification(error.message, 'error')
  }
}

const handleReplySubmit = async (replyData) => {
  if (!isLoggedIn.value) {
    showNotification('请先登录GitHub', 'error')
    return
  }

  try {
    const authHeaders = githubAuth.getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/${API_KEY}/feedback/${replyData.feedbackId}/comments`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...authHeaders
      },
      body: JSON.stringify({
        content: replyData.content,
        parent_id: replyData.parentId
      })
    })

    if (response.status === 401) {
      githubAuth.clearToken()
      checkLoginStatus()
      showNotification('登录已过期，请重新登录', 'error')
      return
    }

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (parseError) {
        console.error('错误响应解析失败:', parseError)
        throw new Error('回复失败')
      }
      throw new Error(errorData.message || '回复失败')
    }

    showNotification('回复成功！已提交等待审核通过后显示')
    // 重新加载反馈列表以获取最新评论
    loadFeedbacks()
  } catch (error) {
    showNotification(error.message, 'error')
  }
}

const loadMoreFeedbacks = async () => {
  if (!hasMore.value || loadingMore.value) return
  
  loadingMore.value = true
  try {
    currentPage.value += 1
    await loadFeedbacks(false) // false表示不重置页码，追加数据
  } catch (error) {
    showNotification('加载失败', 'error')
    currentPage.value -= 1 // 加载失败时回退页码
  } finally {
    loadingMore.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 切换tab筛选
const switchFilter = (filterKey) => {
  if (currentFilter.value !== filterKey) {
    currentFilter.value = filterKey
    loadFeedbacks(true) // 重置页码并重新加载
  }
}

// 获取评论总数（递归统计所有层级）
const getCommentsCount = (comments) => {
  if (!comments || !Array.isArray(comments)) return 0
  
  let count = 0
  comments.forEach(comment => {
    count += 1 // 当前评论
    if (comment.replies && comment.replies.length > 0) {
      count += getCommentsCount(comment.replies) // 递归统计子评论
    }
  })
  return count
}


// 滚动监听函数
const handleScroll = () => {
  // 防抖处理
  if (loadingMore.value || !hasMore.value) return
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // 当滚动到距离底部200px时开始加载
  if (scrollTop + windowHeight >= documentHeight - 200) {
    loadMoreFeedbacks()
  }
}

// 生命周期
onMounted(async () => {
  // 处理GitHub回调
  githubAuth.handleCallback()
  checkLoginStatus()
  
  // 根据新文档，首先检查系统配置
  await checkSystemConfig()
  
  // 只有在系统启用时才加载反馈
  if (systemEnabled.value) {
    loadFeedbacks()
  }
  
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.feedback-container {
  min-height: 100vh;
  background: var(--vp-c-bg);
}

/* 系统未启用提示 */
.system-disabled-notice {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  color: #dc2626;
  text-align: center;
}

.system-disabled-notice svg {
  color: #dc2626;
}

.system-disabled-notice p {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* 提交反馈区域 */
.submit-section {
  background: var(--vp-c-bg-alt);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-header {
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.section-header:hover {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
  margin: -0.75rem;
  margin-bottom: 0.75rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
  user-select: none;
}

.collapse-icon {
  margin-left: auto;
  transition: transform 0.2s ease;
}

.collapse-icon.expanded {
  transform: rotate(180deg);
}

.section-subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  user-select: none;
}

.submit-form-container {
  margin-top: 1rem;
}

/* 折叠动画 */
.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top;
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px) scaleY(0.8);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.95);
}

/* 表单样式 */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.8125rem;
}

.form-label.required::after {
  content: ' *';
  color: #ef4444;
}

.form-input,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 1px solid rgba(var(--vp-c-divider-rgb), 0.3);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: rgba(var(--vp-c-brand-rgb), 0.5);
  background: var(--vp-c-bg);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1);
  transform: translateY(-1px);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

/* 用户信息栏 */
.user-info-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid rgba(var(--vp-c-divider-rgb), 0.3);
  border-radius: 12px;
  margin-bottom: 0.75rem;
}

.user-info-bar .user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-info-bar .github-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info-bar .avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
}

.user-info-bar .user-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.user-info-bar .username {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.user-info-bar .display-name {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.user-info-bar .login-status {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.user-info-bar .login-status svg {
  flex-shrink: 0;
}

/* 类型选择器 */
.type-selector {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.type-option {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1rem;
  border: 1px solid rgba(var(--vp-c-divider-rgb), 0.2);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.type-option:hover {
  border-color: rgba(var(--vp-c-brand-rgb), 0.3);
  color: var(--vp-c-text-1);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.type-option.active {
  border-color: var(--vp-c-brand);
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  color: white;
  box-shadow: 0 4px 15px rgba(var(--vp-c-brand-rgb), 0.2);
}

.type-icon {
  font-size: 0.875rem;
}

.input-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.125rem;
}

.char-count {
  font-size: 0.6875rem;
  color: var(--vp-c-text-2);
}

/* 提交按钮容器 - 使用flex布局独立成行 */
.submit-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.625rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;
  min-width: 140px;
}

.submit-button:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand-rgb), 0.25);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-content {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.button-loading {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner.large {
  width: 24px;
  height: 24px;
  border-width: 2px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 反馈列表区域 */
.list-section {
  margin-top: 2rem;
}

/* 列表头部 - 标题和筛选器在同一行 */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
}

.header-info {
  flex: 1;
}

.header-info .section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem 0;
}

.header-info .section-subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
  line-height: 1.4;
  margin: 0;
}

/* 筛选器样式优化 */
.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.filter-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 25px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-weight: 500;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  font-family: inherit;
  white-space: nowrap;
}

.filter-tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-tab.active {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  color: white;
  box-shadow: 0 4px 15px rgba(var(--vp-c-brand-rgb), 0.2);
}

.tab-text {
  font-weight: 500;
}

.tab-badge {
  padding: 0.125rem 0.375rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1;
}

.filter-tab:not(.active) .tab-badge {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

/* 状态样式 */
.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.loading-state svg,
.empty-state svg {
  margin-bottom: 1rem;
  color: var(--vp-c-text-3);
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* 反馈列表 - 扁平化聊天风格 */
.feedback-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feedback-item {
  transition: all 0.2s ease;
}

.feedback-item:hover {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
  margin: -0.75rem;
}

.feedback-main {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.feedback-main .author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
  position: relative;
  overflow: hidden;
}

.feedback-main .author-avatar .avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 2; /* 图片在文字上方，加载成功时会覆盖文字 */
}

.feedback-main .author-avatar .avatar-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; /* 确保文字在图片下方 */
}


.feedback-content {
  flex: 1;
  min-width: 0;
}

.feedback-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.author-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}


.feedback-time {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: auto;
  flex-shrink: 0;
}

.feedback-body {
  margin-bottom: 0.75rem;
}

.feedback-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.375rem 0;
  line-height: 1.3;
}

.feedback-description p {
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
  font-size: 0.875rem;
}

/* 操作区域 */
.feedback-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.action-stats {
  display: flex;
  gap: 0.75rem;
}

.action-stats .stats-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: none;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: inherit;
}

.action-btn:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-btn svg {
  transition: transform 0.2s ease;
}

.action-btn svg.rotate-180 {
  transform: rotate(180deg);
}


/* 附件样式 */
.feedback-attachments {
  margin: 0.75rem 0;
}

.attachments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 0.375rem;
  max-width: 300px;
}

.attachment-item {
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.attachment-item:hover {
  transform: scale(1.05);
}

.attachment-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 评论区域 */
.comments-section {
  margin-top: 0.75rem;
  margin-left: 3rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider-light);
}

.comments-container {
  max-width: none;
}

/* 内联回复表单 */
.inline-reply-form {
  margin-top: 1rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.reply-textarea {
  width: 100%;
  padding: 0.875rem;
  border: 1px solid rgba(var(--vp-c-divider-rgb), 0.2);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.reply-textarea:focus {
  outline: none;
  border-color: rgba(var(--vp-c-brand-rgb), 0.4);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1);
  transform: translateY(-1px);
}

/* 移除不需要的样式，因为不再有邮箱和昵称输入 */

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.cancel-btn, .submit-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  border: none;
}

.cancel-btn {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
}

.cancel-btn:hover {
  color: var(--vp-c-text-1);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.submit-btn {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  color: white;
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand-rgb), 0.2);
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--vp-c-brand-dark), var(--vp-c-brand));
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(var(--vp-c-brand-rgb), 0.3);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* 滚动加载提示 */
.scroll-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.scroll-loading p {
  margin: 0.5rem 0 0 0;
  font-size: 0.875rem;
}

/* 通知消息 */
.notification {
  position: fixed;
  top: 5rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  z-index: 9999;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 400px;
}

.notification.success {
  background: #10b981;
}

.notification.error {
  background: #ef4444;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .filter-tabs {
    align-self: stretch;
    justify-content: flex-start;
  }
  
  .filter-tab {
    flex: 1;
    justify-content: center;
    min-width: 0;
  }
  
  .feedback-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .feedback-time {
    margin-left: 0;
    align-self: flex-start;
  }
  
  .feedback-actions {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .action-buttons {
    gap: 0.75rem;
  }
  
  .comments-section {
    margin-left: 2rem;
  }
  
  .feedback-main .author-avatar {
    width: 32px;
    height: 32px;
    font-size: 0.75rem;
  }
  
  .feedback-main {
    gap: 0.5rem;
  }
  
  .type-selector {
    flex-direction: column;
  }
  
  /* 移除不需要的样式 */
  
  .reply-actions {
    flex-direction: column;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .notification {
    top: 4rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
</style>