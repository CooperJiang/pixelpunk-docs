<template>
  <div class="image-upload-container">
    <label class="form-label">图片附件（可选）</label>
    
    <!-- 上传区域 -->
    <div 
      class="upload-area"
      @click="triggerFileInput"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      :class="{ 'drag-active': isDragActive }"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        @change="handleFileSelect"
        style="display: none"
      >
      
      <div class="upload-content">
        <div class="upload-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        </div>
        <div class="upload-text">
          <p class="primary-text">点击上传图片或拖拽到此处</p>
          <p class="secondary-text">支持 JPG、PNG、GIF 格式，单张不超过 3MB</p>
        </div>
      </div>
    </div>

    <!-- 图片预览区域 -->
    <div v-if="images.length > 0" class="preview-area">
      <div class="preview-grid">
        <div 
          v-for="(image, index) in images" 
          :key="index" 
          class="preview-item"
        >
          <div class="preview-image">
            <img :src="image.preview" :alt="image.name">
            <div class="image-overlay">
              <button 
                type="button" 
                @click="removeImage(index)"
                class="remove-button"
                title="删除图片"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <button 
                type="button" 
                @click="previewImage(image)"
                class="preview-button"
                title="预览图片"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
          <div class="image-info">
            <p class="image-name" :title="image.name">{{ truncateName(image.name) }}</p>
            <p class="image-size">{{ formatFileSize(image.size) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览弹窗 -->
    <div v-if="showPreview" class="preview-modal" @click="closePreview">
      <div class="preview-modal-content" @click.stop>
        <button @click="closePreview" class="modal-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img v-if="previewImageSrc" :src="previewImageSrc" alt="预览图片">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'error'])

// 响应式数据
const fileInput = ref(null)
const isDragActive = ref(false)
const showPreview = ref(false)
const previewImageSrc = ref('')

// 计算属性
const images = ref(props.modelValue || [])

// 方法
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleDragOver = (e) => {
  e.preventDefault()
  isDragActive.value = true
}

const handleDragLeave = (e) => {
  e.preventDefault()
  isDragActive.value = false
}

const handleDrop = (e) => {
  e.preventDefault()
  isDragActive.value = false
  const files = Array.from(e.dataTransfer.files)
  processFiles(files)
}

const handleFileSelect = (e) => {
  const files = Array.from(e.target.files)
  processFiles(files)
  // 清空input值，允许重复选择同一文件
  e.target.value = ''
}

const processFiles = (files) => {
  files.forEach(file => {
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      emit('error', `${file.name} 不是有效的图片文件`)
      return
    }

    // 验证文件大小
    if (file.size > 3 * 1024 * 1024) {
      emit('error', `${file.name} 文件过大，请选择小于3MB的图片`)
      return
    }

    // 检查是否已存在
    const exists = images.value.some(img => 
      img.name === file.name && img.size === file.size
    )
    if (exists) {
      emit('error', `${file.name} 已经添加过了`)
      return
    }

    // 读取文件
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = {
        name: file.name,
        type: file.type,
        size: file.size,
        preview: e.target.result,
        base64: e.target.result,
        file: file
      }
      
      images.value.push(imageData)
      updateParent()
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  images.value.splice(index, 1)
  updateParent()
}

const previewImage = (image) => {
  previewImageSrc.value = image.preview
  showPreview.value = true
}

const closePreview = () => {
  showPreview.value = false
  previewImageSrc.value = ''
}

const updateParent = () => {
  emit('update:modelValue', images.value)
}

const truncateName = (name) => {
  if (name.length <= 20) return name
  const ext = name.split('.').pop()
  const baseName = name.substring(0, name.lastIndexOf('.'))
  return `${baseName.substring(0, 15)}...${ext}`
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// 监听props变化
import { watch } from 'vue'
watch(() => props.modelValue, (newValue) => {
  images.value = newValue || []
}, { immediate: true })
</script>

<style scoped>
.image-upload-container {
  width: 100%;
}

.form-label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.upload-area {
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--vp-c-bg-soft);
}

.upload-area:hover {
  border-color: var(--vp-c-brand-light);
  background: var(--vp-c-bg-alt);
}

.upload-area.drag-active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
  transform: scale(1.02);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.upload-icon {
  color: var(--vp-c-text-2);
  opacity: 0.7;
}

.upload-icon svg {
  width: 24px;
  height: 24px;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.primary-text {
  margin: 0;
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.secondary-text {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.preview-area {
  margin-top: 1.5rem;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.preview-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-image {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.preview-image:hover .image-overlay {
  opacity: 1;
}

.remove-button,
.preview-button {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--vp-c-text-1);
}

.remove-button:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}

.preview-button:hover {
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.1);
}

.image-info {
  text-align: center;
}

.image-name {
  margin: 0 0 0.25rem 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  word-break: break-word;
}

.image-size {
  margin: 0;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.preview-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-modal-content img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: -1rem;
  right: -1rem;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  z-index: 1001;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.9);
}

@media (max-width: 768px) {
  .upload-area {
    padding: 1.5rem;
  }
  
  .preview-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.75rem;
  }
  
  .upload-content {
    gap: 0.75rem;
  }
  
  .primary-text {
    font-size: 0.9rem;
  }
  
  .secondary-text {
    font-size: 0.8rem;
  }
}
</style>