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

export const updateLogs: UpdateLog[] = [
  {
    version: 'v1.0.0',
    date: '2025-11-15',
    title: 'PixelPunk 首个正式版本发布 🎉',
    description: '经过数月精心打磨，PixelPunk 正式发布！这是一个全栈式智能图床与资源管理平台，集成 AI 图片分析、向量语义搜索、多云存储等前沿技术，为个人和团队提供强大而易用的图片管理解决方案。从此刻起，图片管理进入智能化时代！',
    image: 'https://v1.pixelpunk.cc/f/200ff9e8bd544a99/v1.0.0.png',
    highlights: [
      '🤖 AI 智能图片分析 - 自动分类、打标、语义解析、内容审核',
      '🧠 Qdrant 向量搜索 - 以图搜图、语义搜索、智能推荐',
      '☁️ 多云存储支持 - 本地、S3、阿里云 OSS、腾讯云 COS 等',
      '🐳 Docker 一键部署 - 完整服务栈，开箱即用',
      '🌍 完整国际化 - 中文、英文、日文，主题级多语言',
      '🎨 12+ 精选主题 - 赛博朋克、清新、可爱等风格，亮暗色自适应'
    ],
    updates: [
      {
        id: 'ai-analysis',
        title: 'AI 智能图片分析',
        description: '集成 OpenAI Vision API，自动完成图片分类、关键词提取、语义描述、内容审核。支持批量处理，性能提升 6 倍（3图/秒 → 20图/秒）。',
        type: 'feature',
        icon: '🤖'
      },
      {
        id: 'vector-search',
        title: '向量语义搜索',
        description: '基于 Qdrant 向量数据库实现以图搜图、自然语言搜索、相似推荐。理解图片语义而非简单标签匹配，准确度提升 40%。',
        type: 'feature',
        icon: '🧠'
      },
      {
        id: 'storage-adapter',
        title: '统一存储适配器',
        description: '工厂+适配器模式设计，支持本地、S3、阿里云 OSS、腾讯云 COS、七牛云、又拍云等多种存储。3 步即可接入新存储渠道。',
        type: 'feature',
        icon: '☁️'
      },
      {
        id: 'docker-deploy',
        title: 'Docker 一键部署',
        description: '提供完整 Docker Compose 配置，一行命令启动全部服务（PixelPunk + MySQL + Redis + Qdrant）。支持三种部署模式，智能配置。',
        type: 'feature',
        icon: '🐳'
      },
      {
        id: 'i18n',
        title: '双维度国际化',
        description: '独创语言 × 主题双维架构，支持中文、英文、日文。动态懒加载机制，首屏加载速度提升 30%。',
        type: 'feature',
        icon: '🌍'
      },
      {
        id: 'theme-system',
        title: '灵活主题系统',
        description: '12+ 精选主题，赛博朋克、清新、可爱等风格。支持亮暗色自适应、动态切换。3 步快速创建自定义主题。',
        type: 'feature',
        icon: '🎨'
      },
      {
        id: 'ai-pipeline',
        title: '高性能 AI Pipeline',
        description: '生产者-消费者模式 + 工作池架构，支持并发处理。性能从 3 图/秒提升至 20 图/秒，错误率降低 80%。',
        type: 'improvement',
        icon: '⚡'
      },
      {
        id: 'permission-control',
        title: '精细权限控制',
        description: '防盗链、IP/域名黑白名单、流量带宽限制。支持角色管理、用户组、操作日志审计。独立配额，动态调整。',
        type: 'feature',
        icon: '🔐'
      },
      {
        id: 'share-system',
        title: '灵活分享系统',
        description: '支持文件夹、单图、混合分享。可设置密码、有效期、访问限制。相册模式、批量链接、打包下载、邮件通知。',
        type: 'feature',
        icon: '🔗'
      },
      {
        id: 'open-api',
        title: '开放 API',
        description: '提供上传、随机图片等接口。支持权限验证、统计分析、次数控制、文件限制。完整在线 API 文档。',
        type: 'feature',
        icon: '🔧'
      },
      {
        id: 'batch-operations',
        title: '批量操作',
        description: '批量上传、移动、删除、标签编辑。无限层级文件夹、标签分类、收藏夹。网格、列表、瀑布流视图。',
        type: 'feature',
        icon: '📁'
      },
      {
        id: 'stats',
        title: '数据统计',
        description: '上传统计、存储分析、访问量追踪、用户行为分析。可视化图表，多维度查询。',
        type: 'feature',
        icon: '📊'
      },
      {
        id: 'cross-platform',
        title: '跨平台支持',
        description: '单文件二进制，支持 Linux/macOS/Windows 多架构。Docker 镜像仅 117MB，基于 Alpine 构建。',
        type: 'feature',
        icon: '🚀'
      }
    ],
    author: {
      name: 'PixelPunk Team',
      avatar: '/images/avatar/author_avatar.jpg',
      url: 'https://github.com/CooperJiang'
    },
    tags: ['AI', 'Image Management', 'Vector Search', 'Cloud Storage', 'Docker', 'Go', 'Vue3', 'Qdrant', 'Open Source']
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
