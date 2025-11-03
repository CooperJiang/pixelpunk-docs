<template>
  <div class="comment-tree" :style="{ '--depth': depth }">
    <div class="comment-item" :data-depth="depth">
      <!-- 评论内容 -->
      <div class="comment-main" :class="{ admin: comment.type === 'admin' }">
        <div class="comment-avatar">
          <div class="avatar-circle" :class="{ 'admin-avatar': comment.type === 'admin' }">
            <img v-if="comment.type === 'admin'" src="/logo.png" alt="官方" class="admin-logo" />
            <img 
              v-else-if="comment.github_avatar_url" 
              :src="comment.github_avatar_url" 
              :alt="comment.github_username || comment.commenter_name"
              class="github-avatar"
              @error="$event.target.style.display = 'none'"
            />
            <span v-show="!comment.github_avatar_url || comment.type !== 'admin'" class="avatar-initials">{{ getInitials(comment.commenter_name) }}</span>
          </div>
        </div>
        
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-author">
              {{ comment.github_username || comment.commenter_name }}
            </span>
            <span v-if="comment.github_username" class="github-badge">GitHub</span>
            <span v-if="comment.type === 'admin'" class="official-badge">官方回复</span>
            <span class="comment-time">{{ formatDate(comment.created_at) }}</span>
          </div>
          
          <div class="comment-body">
            <p>{{ comment.content }}</p>
          </div>
          
          <div class="comment-actions">
            <button @click="toggleReply" class="action-btn reply-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
              </svg>
              回复
            </button>
          </div>
          
          <!-- 回复表单 -->
          <div v-if="showReplyForm" class="reply-form">
            <!-- GitHub认证组件 -->
            <GitHubAuth 
              v-if="!isLoggedIn" 
              loginMessage="需要GitHub登录后才能回复"
              @login-success="handleLoginSuccess"
            />
            
            <!-- 回复输入表单（仅登录用户可见） -->
            <form v-if="isLoggedIn" @submit.prevent="submitReply">
              <!-- 当前用户信息显示 -->
              <div class="current-user-info">
                <div class="user-avatar">
                  <img 
                    v-if="currentUserInfo?.github_avatar_url" 
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
                <span class="username">{{ currentUserInfo?.github_username || 'GitHub用户' }}</span>
              </div>
              
              <textarea 
                v-model="replyContent"
                placeholder="写下你的回复..."
                rows="3"
                required
                class="reply-textarea"
              ></textarea>
              
              <div class="reply-actions">
                <button type="button" @click="cancelReply" class="cancel-btn">取消</button>
                <button type="submit" :disabled="!canSubmitReply" class="submit-btn">提交回复</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- 子评论 -->
      <div v-if="comment.replies && comment.replies.length > 0" class="comment-replies">
        <CommentTree
          v-for="reply in comment.replies"
          :key="reply.id"
          :comment="reply"
          :feedback-id="feedbackId"
          :depth="depth + 1"
          :max-depth="maxDepth"
          @reply-submitted="$emit('reply-submitted', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted } from 'vue'
import { githubAuth } from '../services/githubAuth.js'
import GitHubAuth from './GitHubAuth.vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  feedbackId: {
    type: [String, Number],
    required: true
  },
  depth: {
    type: Number,
    default: 0
  },
  maxDepth: {
    type: Number,
    default: 10 // 支持更深层级，适配新的无限嵌套能力
  }
})

const emit = defineEmits(['reply-submitted'])

// 响应式数据
const showReplyForm = ref(false)
const replyContent = ref('')
const isLoggedIn = ref(false)
const currentUserInfo = ref(null)

// 计算属性
const canSubmitReply = computed(() => {
  return replyContent.value.trim() && isLoggedIn.value
})

// 方法
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return '刚刚'
  } else if (diffInHours < 24) {
    return `${diffInHours}小时前`
  } else if (diffInHours < 24 * 7) {
    return `${Math.floor(diffInHours / 24)}天前`
  } else {
    return date.toLocaleDateString('zh-CN')
  }
}

const toggleReply = () => {
  if (props.depth >= props.maxDepth) {
    // 达到最大深度，不允许回复
    return
  }
  showReplyForm.value = !showReplyForm.value
  if (!showReplyForm.value) {
    cancelReply()
  }
}

const checkLoginStatus = () => {
  isLoggedIn.value = githubAuth.isLoggedIn()
  currentUserInfo.value = githubAuth.getUserInfo()
}

const handleLoginSuccess = (userInfo) => {
  checkLoginStatus()
  currentUserInfo.value = userInfo
}

const cancelReply = () => {
  showReplyForm.value = false
  replyContent.value = ''
}

const submitReply = () => {
  if (!canSubmitReply.value) return
  
  const replyData = {
    feedbackId: props.feedbackId,
    parentId: props.comment.id,
    content: replyContent.value
  }
  
  emit('reply-submitted', replyData)
  cancelReply()
}

// 生命周期
onMounted(() => {
  checkLoginStatus()
})
</script>

<style scoped>
.comment-tree {
  --comment-indent: calc(var(--depth, 0) * 2rem);
}

.comment-item {
  position: relative;
  margin-bottom: 1rem;
  padding-left: var(--comment-indent);
}

.comment-item::before {
  content: '';
  position: absolute;
  left: calc(var(--comment-indent, 0) - 1rem);
  top: 2.5rem;
  bottom: -1rem;
  width: 1px;
  background: var(--vp-c-divider-light);
  opacity: 0.5;
}

.comment-item:last-child::before {
  display: none;
}

.comment-main {
  display: flex;
  gap: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 12px;
  padding: 1rem;
  position: relative;
}

.comment-main.admin {
  background: rgba(59, 130, 246, 0.05);
  border-color: rgba(59, 130, 246, 0.2);
}

.comment-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.avatar-circle .avatar-initials {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.admin-avatar {
  background: #fff !important;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  border: 2px solid #3b82f6;
  padding: 2px;
}

.admin-logo,
.github-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.comment-content {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.comment-time {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.github-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  background: #24292e;
  color: white;
  border-radius: 4px;
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.official-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
}

.comment-body {
  margin-bottom: 0.75rem;
}

.comment-body p {
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  font-size: 0.875rem;
  word-wrap: break-word;
}

.comment-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.action-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}

.reply-form {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider-light);
}

.reply-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 0.75rem;
}

.reply-textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.1);
}

.current-user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider-light);
}

.current-user-info .user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.current-user-info .user-avatar .github-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.current-user-info .avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
}

.current-user-info .username {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.cancel-btn, .submit-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.cancel-btn {
  background: none;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.cancel-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.submit-btn {
  background: var(--vp-c-brand);
  border: 1px solid var(--vp-c-brand);
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-dark);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.comment-replies {
  margin-top: 0.75rem;
}

/* 根评论样式 */
.comment-tree[style*="--depth:0"] .comment-main {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

/* 深层评论样式调整 */
.comment-tree[style*="--depth:1"] .comment-main,
.comment-tree[style*="--depth:2"] .comment-main,
.comment-tree[style*="--depth:3"] .comment-main,
.comment-tree[style*="--depth:4"] .comment-main,
.comment-tree[style*="--depth:5"] .comment-main {
  background: var(--vp-c-bg);
}

/* 连接线样式 */
.comment-item[style*="--depth:0"]::after {
  content: '';
  position: absolute;
  left: calc(32px / 2 + 0.75rem);
  top: calc(32px + 1rem + 0.5rem);
  width: 1rem;
  height: 1px;
  background: var(--vp-c-divider-light);
}

@media (max-width: 768px) {
  .comment-tree {
    --comment-indent: calc(var(--depth, 0) * 1rem);
  }
  
  .comment-main {
    padding: 0.75rem;
    gap: 0.5rem;
  }
  
  .avatar-circle {
    width: 28px;
    height: 28px;
    font-size: 0.7rem;
  }
  
  /* 移除不需要的样式 */
  
  .reply-actions {
    flex-direction: column;
  }
  
  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>