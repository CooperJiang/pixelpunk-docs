<style scoped>
/* 现代表单样式 */
.submit-section {
  margin-bottom: 3rem;
}

.submit-card {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.submit-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-lighter);
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.card-title svg {
  color: var(--vp-c-brand);
}

.card-subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* 现代输入框组件 */
.input-group {
  margin-bottom: 2rem;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.label-text {
  font-size: 0.95rem;
}

.required-star {
  color: #ef4444;
  font-weight: 600;
}

.input-wrapper {
  position: relative;
}

.modern-input,
.modern-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  resize: vertical;
}

.modern-input:focus,
.modern-textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: var(--vp-c-bg);
}

.modern-input.has-icon {
  padding-left: 3rem;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  z-index: 1;
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.char-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.contact-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

/* 类型选择器 */
.type-selector {
  display: grid;
  gap: 0.75rem;
}

.type-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.type-option:hover {
  border-color: var(--vp-c-brand-lighter);
  background: var(--vp-c-bg-alt);
}

.type-option.active {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.05);
}

.type-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border-radius: 0.5rem;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.type-option.active .type-icon {
  background: var(--vp-c-brand);
  color: white;
}

.type-content {
  flex: 1;
}

.type-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.type-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.type-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  transition: all 0.3s ease;
}

.type-option.active .type-check {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

/* 提交按钮 */
.submit-section {
  text-align: center;
  margin-top: 2rem;
}

.submit-button {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-darker));
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
}

.submit-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.submit-note {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 筛选区域 */
.filters-section {
  margin-bottom: 3rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.section-title svg {
  color: var(--vp-c-brand);
}

.section-subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  margin: 0;
}

.modern-filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.modern-filter-tab {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  border-radius: 2rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modern-filter-tab:hover {
  border-color: var(--vp-c-brand-lighter);
  background: var(--vp-c-bg);
}

.modern-filter-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.modern-filter-tab.active .tab-count {
  background: rgba(255, 255, 255, 0.3);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stats {
    gap: 1rem;
  }
  
  .contact-row {
    grid-template-columns: 1fr;
  }
  
  .modern-filter-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .submit-card {
    padding: 2rem;
  }
}
</style>