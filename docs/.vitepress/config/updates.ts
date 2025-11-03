// 更新日志配置文件
export interface UpdateItem {
  id: string
  title: string
  description: string
  type: 'feature' | 'improvement' | 'bugfix' | 'breaking'
  icon?: string
}

export interface UpdateLog {
  version: string
  date: string
  title: string
  description?: string
  image?: string
  highlights: string[]
  updates: UpdateItem[]
  author: {
    name: string
    avatar?: string
    url?: string
  }
  tags: string[]
}

// Mock 数据
export const updateLogs: UpdateLog[] = [
  {
    version: 'v2.1.0',
    date: '2024-01-15',
    title: 'AI 智能分析全面升级',
    description: '本次更新带来了全新的 GPT-4 Vision 集成，大幅提升图片分析准确度和处理速度。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    highlights: [
      '新增 GPT-4 Vision 智能分析',
      '图片处理速度提升 300%',
      '支持批量智能标签生成',
      '新增 NSFW 内容检测'
    ],
    updates: [
      {
        id: '1',
        title: 'GPT-4 Vision 集成',
        description: '集成最新的 GPT-4 Vision API，提供更准确的图片内容识别和描述生成。支持识别 15+ 种不同类型的内容标签。',
        type: 'feature',
        icon: '🤖'
      },
      {
        id: '2',
        title: '智能批量处理',
        description: '新增批量上传功能，支持一次性处理多达 100 张图片，自动生成标签和描述。',
        type: 'feature',
        icon: '📦'
      },
      {
        id: '3',
        title: 'NSFW 内容检测',
        description: '基于 AI 的内容安全检测，自动识别和标记不适宜内容，保护平台安全。',
        type: 'feature',
        icon: '🛡️'
      },
      {
        id: '4',
        title: '性能优化',
        description: '图片处理管道全面重构，处理速度提升 300%，内存使用减少 40%。',
        type: 'improvement',
        icon: '⚡'
      },
      {
        id: '5',
        title: '修复上传卡顿',
        description: '解决大文件上传时的界面卡顿问题，优化进度条显示。',
        type: 'bugfix',
        icon: '🔧'
      }
    ],
    author: {
      name: 'PixelPunk Team',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      url: '/team'
    },
    tags: ['AI', 'Performance', 'Security']
  },
  {
    version: 'v2.0.5',
    date: '2024-01-08',
    title: '存储系统重大更新',
    description: '全新的多云存储架构，支持更多云服务提供商，提升存储可靠性。',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop',
    highlights: [
      '支持 5+ 云存储服务',
      '自动故障转移机制',
      '存储成本降低 25%',
      '新增 CDN 加速'
    ],
    updates: [
      {
        id: '1',
        title: 'Rainyun 存储支持',
        description: '新增 RainyUN 云存储支持，提供更多存储选择和更优惠的价格方案。',
        type: 'feature',
        icon: '☁️'
      },
      {
        id: '2',
        title: '自动故障转移',
        description: '智能存储路由系统，当主存储不可用时自动切换到备用存储，确保服务稳定性。',
        type: 'feature',
        icon: '🔄'
      },
      {
        id: '3',
        title: 'CDN 加速优化',
        description: '全球 CDN 节点覆盖优化，图片加载速度提升 150%，支持 WebP 格式自动转换。',
        type: 'improvement',
        icon: '🚀'
      },
      {
        id: '4',
        title: '存储配置管理',
        description: '管理后台新增存储配置界面，支持动态切换存储策略和成本分析。',
        type: 'feature',
        icon: '⚙️'
      }
    ],
    author: {
      name: 'Storage Team',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      url: '/team'
    },
    tags: ['Storage', 'CDN', 'Reliability']
  },
  {
    version: 'v2.0.0',
    date: '2024-01-01',
    title: '全新赛博朋克界面',
    description: '完全重新设计的用户界面，采用赛博朋克风格，带来沉浸式的视觉体验。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    highlights: [
      '全新赛博朋克界面设计',
      'GSAP 动画效果',
      '响应式布局优化',
      '深色主题支持'
    ],
    updates: [
      {
        id: '1',
        title: '赛博朋克主题',
        description: '全新的视觉设计语言，包含霓虹灯效果、故障艺术、矩阵雨等赛博朋克元素。',
        type: 'feature',
        icon: '🎨'
      },
      {
        id: '2',
        title: 'GSAP 动画系统',
        description: '基于 GSAP 的流畅动画效果，包含页面切换、悬浮交互、滚动触发等动画。',
        type: 'feature',
        icon: '✨'
      },
      {
        id: '3',
        title: '响应式重构',
        description: '移动端体验全面优化，适配各种屏幕尺寸，确保在所有设备上的完美显示。',
        type: 'improvement',
        icon: '📱'
      },
      {
        id: '4',
        title: 'API 接口重构',
        description: '后端 API 全面重构，提升性能和安全性，支持更高并发访问。',
        type: 'breaking',
        icon: '🔄'
      }
    ],
    author: {
      name: 'Design Team',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b586?w=64&h=64&fit=crop&crop=face',
      url: '/team'
    },
    tags: ['UI/UX', 'Design', 'Animation']
  },
  {
    version: 'v1.9.2',
    date: '2023-12-20',
    title: '安全性增强更新',
    description: '重要的安全性更新，修复多个安全漏洞，增强数据保护机制。',
    highlights: [
      '修复 3 个安全漏洞',
      '数据加密强化',
      '访问控制优化',
      '审计日志完善'
    ],
    updates: [
      {
        id: '1',
        title: '身份认证强化',
        description: '升级 JWT 令牌机制，增加多因素认证支持，提升账户安全性。',
        type: 'improvement',
        icon: '🔐'
      },
      {
        id: '2',
        title: '数据加密升级',
        description: '敏感数据采用 AES-256 加密存储，传输过程使用 TLS 1.3 协议保护。',
        type: 'improvement',
        icon: '🔒'
      },
      {
        id: '3',
        title: '修复 XSS 漏洞',
        description: '修复用户输入处理中的跨站脚本攻击漏洞，加强输入验证和输出编码。',
        type: 'bugfix',
        icon: '🛡️'
      },
      {
        id: '4',
        title: '访问控制优化',
        description: '细化权限控制粒度，支持基于资源的访问控制 (RBAC)。',
        type: 'improvement',
        icon: '👥'
      }
    ],
    author: {
      name: 'Security Team',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face',
      url: '/team'
    },
    tags: ['Security', 'Authentication', 'Encryption']
  },
  {
    version: 'v1.8.1',
    date: '2023-12-15',
    title: '性能优化与错误修复',
    description: '针对用户反馈进行的性能优化和错误修复，提升系统稳定性。',
    highlights: [
      '数据库查询优化',
      '内存泄漏修复', 
      '上传稳定性提升',
      'UI 响应速度优化'
    ],
    updates: [
      {
        id: '1',
        title: '数据库索引优化',
        description: '为常用查询添加复合索引，图片搜索性能提升 60%。',
        type: 'improvement',
        icon: '⚡'
      },
      {
        id: '2', 
        title: '修复内存泄漏',
        description: '解决长时间运行时的内存泄漏问题，提升系统稳定性。',
        type: 'bugfix',
        icon: '🔧'
      },
      {
        id: '3',
        title: '上传断点续传',
        description: '大文件上传支持断点续传，避免网络中断导致的上传失败。',
        type: 'feature',
        icon: '📤'
      }
    ],
    author: {
      name: 'Backend Team',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop&crop=face',
      url: '/team'
    },
    tags: ['Performance', 'Bugfix', 'Stability']
  }
]

export const updateCategories = {
  feature: {
    label: '新功能',
    color: 'var(--vp-c-brand)',
    bgColor: 'var(--cyber-border)',
    icon: '✨'
  },
  improvement: {
    label: '改进',
    color: 'var(--vp-c-brand-light)',
    bgColor: 'var(--cyber-border)',
    icon: '⚡'
  },
  bugfix: {
    label: '修复',
    color: 'var(--vp-c-brand-lighter)',
    bgColor: 'var(--cyber-border)',
    icon: '🔧'
  },
  breaking: {
    label: '重大变更',
    color: 'var(--vp-c-warning)',
    bgColor: 'var(--cyber-border)',
    icon: '⚠️'
  }
}