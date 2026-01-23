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
    version: 'v1.0.1',
    date: '2025-11-19',
    title: '稳定性提升与功能优化 🔧',
    description: '本次更新专注于修复关键问题、提升用户体验和增强上传功能。修复了 6 个重要 Bug，新增了重复图检测开关、文件夹拖拽上传等实用功能，并优化了大批量文件上传性能。',
    image: 'https://cdn.pixelpunk.cc/f/c1c57e5970b14cc5/image.png',
    highlights: [
      '🐛 修复 6 个关键问题，包括 Setup 安装、Docker 配置、WebDAV 渠道等',
      '✨ 新增重复图检测开关，大幅降低大量图片时的性能消耗',
      '📁 支持文件夹拖拽上传，自动解析允许的文件格式',
      '🔗 新增多种链接格式复制（Markdown、HTML、缩略图）',
      '⚡ 优化大批量文件上传性能和界面交互体验'
    ],
    updates: [
      // Bug 修复
      {
        id: 'fix-setup-loop',
        title: '修复 Setup 安装流程问题',
        description: '修复修改 root 默认账户后重启服务再次进入安装页面的问题，确保安装流程正确完成',
        type: 'bugfix',
        icon: '🔧'
      },
      {
        id: 'fix-docker-config',
        title: '修复 Docker 配置文件问题',
        description: '修复手动启动 Docker 镜像时配置文件被错误创建为文件夹的问题',
        type: 'bugfix',
        icon: '🐳'
      },
      {
        id: 'fix-webdav-channel',
        title: '修复 WebDAV 渠道错误',
        description: '修复 WebDAV 渠道提示"不支持的渠道类型"的问题，恢复正常使用',
        type: 'bugfix',
        icon: '🔧'
      },
      {
        id: 'fix-deployment-docs',
        title: '修复部署文档错误',
        description: '修复部分部署文档中的错误内容，提升文档准确性',
        type: 'bugfix',
        icon: '📝'
      },
      {
        id: 'fix-upload-cancel',
        title: '修复取消上传功能',
        description: '修复上传过程中取消上传功能失效的问题，恢复中断控制',
        type: 'bugfix',
        icon: '🔧'
      },
      {
        id: 'fix-i18n-menu',
        title: '修复多语言翻译错误',
        description: '修复 Folders 页面右键菜单加载文件夹时的多语言翻译错误',
        type: 'bugfix',
        icon: '🌍'
      },
      // 新功能
      {
        id: 'duplicate-detection-toggle',
        title: '重复图检测开关配置',
        description: '新增重复图检测功能开关配置，可降低前端大量图片时的 MD5 比对性能消耗。配置路径：管理中心 → 全局设置 → 上传设置',
        type: 'feature',
        icon: '🎛️'
      },
      {
        id: 'folder-drag-upload',
        title: '文件夹拖拽上传',
        description: '新增上传页面文件夹选择功能，支持拖拽文件夹并自动解析允许的文件格式',
        type: 'feature',
        icon: '📁'
      },
      {
        id: 'multiple-link-formats',
        title: '多种链接格式复制',
        description: '上传页面支持 Markdown、HTML、缩略图格式的链接复制；文件夹右键菜单新增 Markdown 格式、HTML 格式链接复制选项',
        type: 'feature',
        icon: '🔗'
      },
      {
        id: 'batch-link-copy',
        title: '批量链接复制',
        description: '新增上传页面批量链接复制功能，提升批量操作效率',
        type: 'feature',
        icon: '📋'
      },
      // 优化改进
      {
        id: 'optimize-duplicate-detection',
        title: '优化重复图检测性能',
        description: '优化大批量文件上传时重复图检测的性能消耗，提升上传速度',
        type: 'improvement',
        icon: '⚡'
      },
      {
        id: 'optimize-upload-layout',
        title: '优化上传页面布局',
        description: '优化上传页面按钮排版布局，提升界面美观度和操作便捷性',
        type: 'improvement',
        icon: '🎨'
      },
      {
        id: 'optimize-upload-interaction',
        title: '优化按钮交互体验',
        description: '优化上传页面按钮交互，增加 Tooltip 提示信息，提升用户体验',
        type: 'improvement',
        icon: '💡'
      },
      {
        id: 'simplify-install-script',
        title: '简化安装脚本',
        description: '简化安装脚本，移除版本选择功能，后续发布将始终使用最新版本',
        type: 'improvement',
        icon: '🚀'
      }
    ],
    author: {
      name: 'PixelPunk Team',
      avatar: '/images/avatar/author_avatar.jpg',
      url: 'https://github.com/CooperJiang'
    },
    tags: ['Bug Fix', 'Feature', 'Optimization', 'Upload', 'Performance']
  },
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
