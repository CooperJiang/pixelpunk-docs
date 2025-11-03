<template>
  <div class="comment-item">
    <div class="comment-content">
      <!-- 评论头部 -->
      <div class="comment-header">
        <div class="comment-author">
          <div class="author-avatar">
            {{ comment.commenter_name?.charAt(0)?.toUpperCase() || '?' }}
          </div>
          <div class="author-info">
            <span class="author-name">{{ comment.commenter_name }}</span>
            <span v-if="comment.type === 'admin'" class="admin-badge">官方</span>
            <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
          </div>
        </div>
      </div>

      <!-- 评论内容 -->
      <div class="comment-body">
        <p class="comment-text">{{ comment.content }}</p>
        
        <!-- 附件图片 -->
        <div v-if="comment.attachments && comment.attachments.length > 0" class="comment-attachments">
          <div 
            v-for="attachment in comment.attachments" 
            :key="attachment.id"
            class="attachment-item"
            @click="viewImage(attachment)"
          >
            <img :src="`https://version-track.pixelpunk.cc${attachment.url}`" :alt="attachment.file_name">
          </div>
        </div>
      </div>

      <!-- 评论操作 -->
      <div class="comment-actions">
        <button @click="toggleReplyForm" class="action-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
          </svg>
          回复
        </button>
      </div>

      <!-- 回复表单 -->
      <div v-if="showReplyForm" class="reply-form">
        <div class="reply-form-header">
          <span>回复 @{{ comment.commenter_name }}</span>
        </div>
        <form @submit.prevent="submitReply" class="reply-form-body">
          <textarea 
            v-model="replyContent"
            placeholder="写下您的回复... (Ctrl+V 粘贴图片)"
            rows="3"
            maxlength="1000"
            required
            class="reply-textarea"
            @paste="handlePaste"
          ></textarea>
          
          <!-- 图片粘贴区域 -->
          <div v-if="pastedImages.length > 0" class="pasted-images">
            <div class="pasted-images-header">
              <span>已添加 {{ pastedImages.length }} 张图片</span>
              <button type="button" @click="clearPastedImages" class="clear-btn">清空</button>
            </div>
            <div class="images-grid">
              <div v-for="(image, index) in pastedImages" :key="index" class="pasted-image">
                <img :src="image.preview" :alt="`图片 ${index + 1}`">
                <button type="button" @click="removePastedImage(index)" class="remove-btn">×</button>
              </div>
            </div>
          </div>
          
          <div class="reply-user-info">
            <input 
              v-model="replyName"
              type="text"
              placeholder="您的姓名"
              required
              class="reply-input"
            >
            <input 
              v-model="replyEmail"
              type="email"
              placeholder="您的邮箱"
              required
              class="reply-input"
            >
          </div>
          
          <div class="reply-actions">
            <button type="button" @click="cancelReply" class="btn btn-ghost">取消</button>
            <button type="submit" :disabled="!canSubmit" class="btn btn-primary">发送</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 嵌套回复 -->
    <div v-if="comment.replies && comment.replies.length > 0" class="nested-replies">
      <CommentItem 
        v-for="reply in comment.replies" 
        :key="reply.id"
        :comment="reply"
        :feedback-id="feedbackId"
        :is-nested="true"
        @submit-reply="handleNestedReply"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  feedbackId: {
    type: String,
    required: true
  },
  isNested: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit-reply'])

// 响应式数据
const showReplyForm = ref(false)
const replyContent = ref('')
const replyName = ref('')
const replyEmail = ref('')
const pastedImages = ref([])

// 计算属性
const canSubmit = computed(() => {
  return replyContent.value.trim() && replyName.value.trim() && replyEmail.value.trim()
})

// 方法
const toggleReplyForm = () => {
  showReplyForm.value = !showReplyForm.value
  if (!showReplyForm.value) {
    resetForm()
  }
}

const resetForm = () => {
  replyContent.value = ''
  replyName.value = ''
  replyEmail.value = ''
  pastedImages.value = []
}

const cancelReply = () => {
  showReplyForm.value = false
  resetForm()
}

const submitReply = () => {
  if (!canSubmit.value) return

  const attachments = pastedImages.value.map(img => ({
    file_name: img.name,
    file_type: img.type,
    file_data: img.base64
  }))

  emit('submit-reply', {
    feedbackId: props.feedbackId,
    parentId: props.comment.id,
    content: replyContent.value,
    commenter_name: replyName.value,
    commenter_email: replyEmail.value,
    attachments: attachments
  })

  resetForm()
  showReplyForm.value = false
}

const handleNestedReply = (replyData) => {
  emit('submit-reply', replyData)
}

// 图片处理
const handlePaste = (event) => {
  const items = event.clipboardData.items
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    
    if (item.type.indexOf('image') !== -1) {
      event.preventDefault()
      const file = item.getAsFile()
      
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('图片文件大小不能超过5MB')
          return
        }
        
        if (pastedImages.value.length >= 3) {
          alert('最多只能添加3张图片')
          return
        }
        
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target.result
          pastedImages.value.push({
            name: `image-${Date.now()}.${file.type.split('/')[1]}`,
            type: file.type,
            preview: base64,
            base64: base64.split(',')[1]
          })
        }
        reader.readAsDataURL(file)
      }
    }
  }
}

const removePastedImage = (index) => {
  pastedImages.value.splice(index, 1)
}

const clearPastedImages = () => {
  pastedImages.value = []
}

const viewImage = (attachment) => {
  window.open(`https://version-track.pixelpunk.cc${attachment.url}`, '_blank')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 24) {
    return `${diffInHours}小时前`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays}天前`
    } else {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.comment-item {
  margin-bottom: 1rem;
}

.comment-content {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.comment-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.author-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.admin-badge {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.comment-date {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}

.comment-body {
  margin-bottom: 0.75rem;
}

.comment-text {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  word-break: break-word;
}

/* 附件样式 */
.comment-attachments {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.attachment-item {
  aspect-ratio: 1;
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.attachment-item:hover {
  transform: scale(1.02);
  border-color: var(--vp-c-brand);
}

.attachment-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 评论操作 */
.comment-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-elv);
}

.action-btn svg {
  flex-shrink: 0;
}

/* 回复表单 */
.reply-form {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider-light);
}

.reply-form-header {
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 500;
}

.reply-form-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.reply-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 4rem;
  transition: all 0.2s ease;
}

.reply-textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(0, 170, 102, 0.1);
}

[data-theme="dark"] .reply-textarea:focus {
  box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.1);
}

.reply-textarea::placeholder {
  color: var(--vp-c-text-3);
}

/* 粘贴图片 */
.pasted-images {
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  padding: 0.75rem;
}

.pasted-images-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.clear-btn {
  background: none;
  border: none;
  color: var(--vp-c-brand);
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0;
}

.clear-btn:hover {
  text-decoration: underline;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 0.5rem;
}

.pasted-image {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.25rem;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.pasted-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 0.125rem;
  right: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 0.75rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reply-user-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.reply-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.reply-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(0, 170, 102, 0.1);
}

[data-theme="dark"] .reply-input:focus {
  box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.1);
}

.reply-input::placeholder {
  color: var(--vp-c-text-3);
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* 嵌套回复 */
.nested-replies {
  margin-left: 2rem;
  margin-top: 1rem;
  position: relative;
}

.nested-replies::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--vp-c-brand), transparent);
  opacity: 0.3;
}

.nested-replies .comment-content {
  background: transparent;
  border: 1px solid var(--vp-c-divider-light);
  border-left: 2px solid var(--vp-c-brand);
}

.nested-replies .author-avatar {
  width: 1.75rem;
  height: 1.75rem;
  font-size: 0.7rem;
}

.nested-replies .comment-text {
  font-size: 0.875rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nested-replies {
    margin-left: 1rem;
  }
  
  .nested-replies::before {
    left: -0.5rem;
    width: 1px;
  }
  
  .reply-user-info {
    grid-template-columns: 1fr;
  }
  
  .reply-actions {
    flex-direction: column-reverse;
  }
  
  .comment-attachments {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
  
  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  }
  
  .author-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}

/* 暗色主题优化 */
[data-theme="dark"] .comment-content {
  background: rgba(255, 255, 255, 0.02);
}

[data-theme="dark"] .nested-replies .comment-content {
  background: rgba(255, 255, 255, 0.01);
}

[data-theme="dark"] .author-avatar {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .pasted-images {
  background: rgba(255, 255, 255, 0.03);
}
</style>