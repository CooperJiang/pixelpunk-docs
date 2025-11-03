// 反馈系统配置
export const feedbackConfig = {
  // ===== 生产环境配置 =====
  apiKey: import.meta.env?.VITE_FEEDBACK_API_KEY || '3d07f6607a0955b8b2a2a688227990e4e823956bba195c9b4d9d02c28e4f139f',
  apiBaseUrl: 'https://version-track.pixelpunk.cc/api/public/v1/projects',
  authBaseUrl: 'https://version-track.pixelpunk.cc/api/public/v1/auth/github',

  // ===== 开发环境配置 =====
  // apiKey: import.meta.env?.VITE_FEEDBACK_API_KEY || '3f9b20ab59fae92e7574d27c5c3683b49cbe249e96f0b9e38021a2f69a0ba205',
  // apiBaseUrl: 'http://localhost:5000/api/public/v1/projects',
  // authBaseUrl: 'http://localhost:5000/api/public/v1/auth/github',
  // 回调地址配置（可选）
  // 方案A: 在管理后台配置默认回调地址（推荐） - 不设置此参数
  // 方案B: 在代码中动态指定回调地址 - 设置此参数会覆盖管理后台配置
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/callback` : '/callback',
  
  // 功能配置
  enableFeedback: true,  // 是否启用反馈功能
  enableComments: true,  // 是否启用评论功能
  enableReplies: true,   // 是否启用回复功能
  requireGithubAuth: true, // 是否需要GitHub认证才能评论
  
  // 显示配置
  pageSize: 10,          // 每页显示条数
  maxTitleLength: 255,   // 标题最大长度
  maxDescLength: 2000,   // 描述最大长度
  maxCommentLength: 1000,// 评论最大长度
  
  // 本地存储配置
  storagePrefix: 'pixelpunk_feedback_', // 本地存储前缀
  cacheExpiry: 5 * 60 * 1000, // 缓存过期时间（5分钟）
  githubTokenKey: 'github_session_token', // GitHub token存储键
}

// 获取API Key的说明
export const apiKeyInstructions = `
## 如何获取 API Key

1. 登录 VersionTrack 管理后台
2. 创建或选择一个项目
3. 进入项目设置 → 反馈配置
4. 启用反馈功能
5. 复制生成的 API Key

## 配置 API Key

### 方法一：环境变量（推荐）
在项目根目录创建 .env 文件：
\`\`\`
VITE_FEEDBACK_API_KEY=your_actual_api_key_here
\`\`\`

### 方法二：直接修改配置文件
编辑 docs/.vitepress/theme/config/feedback.js 文件，
将 'YOUR_API_KEY_HERE' 替换为实际的 API Key。

注意：请勿将真实的 API Key 提交到版本控制系统中。
`