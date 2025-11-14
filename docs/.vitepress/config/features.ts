// 功能模块配置文件
export interface FeatureDetail {
  id: string
  title: string
  description: string
  icon: string
  category?: string
}

export interface FeatureModule {
  id: string
  name: string
  description: string
  icon: string
  color: string
  bgColor: string
  image?: string
  screenshots?: string[]
  features: FeatureDetail[]
  configGuide?: {
    title: string
    steps: string[]
  }
  faqs?: {
    question: string
    answer: string
  }[]
  status: 'stable' | 'beta' | 'experimental'
  version?: string
}

// PixelPunk 功能模块数据
export const featureModules: FeatureModule[] = [
  {
    id: 'ai-processing',
    name: 'AI智能处理',
    description: '集成OpenAI API的全自动智能处理管道，支持图像分类、智能打标、NSFW内容审核，让您的图片管理更智能。',
    icon: '✨',
    color: '#00d4ff',
    bgColor: 'rgba(0, 212, 255, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'auto-classification',
        title: '自动分类',
        description: 'AI自动识别图片内容，智能分类为景物、人物、动物、抽象艺术等类别',
        icon: '📂',
        category: 'core'
      },
      {
        id: 'smart-tagging',
        title: '智能打标',
        description: '基于图像内容自动提取关键词标签，支持任务队列和批量处理',
        icon: '🏷️',
        category: 'core'
      },
      {
        id: 'nsfw-detection',
        title: '内容审核',
        description: '自动检测NSFW内容，支持自动隐藏、用户提示、拒绝上传三种策略',
        icon: '🛡️',
        category: 'security'
      },
      {
        id: 'pipeline-control',
        title: '处理管道控制',
        description: '动态调整并发数(1-100)，支持暂停/恢复/重试，实时WebSocket推送进度',
        icon: '⚙️',
        category: 'configuration'
      },
      {
        id: 'batch-processing',
        title: '批量处理',
        description: '支持历史文件批量AI分析，自动重试失败任务，追踪处理耗时统计',
        icon: '📊',
        category: 'efficiency'
      }
    ],
    faqs: [
      {
        question: 'AI处理是否支持自定义模型？',
        answer: '支持！系统兼容OpenAI API格式的接口，您可以配置自己的模型端点，支持GPT-4V、Claude等多种视觉模型。'
      },
      {
        question: 'AI处理失败后会怎样？',
        answer: '系统会自动重试，重试次数可配置。失败的任务会被记录到队列中，您可以在管理后台查看失败原因并手动重新处理。'
      },
      {
        question: '能否批量处理历史文件？',
        answer: '完全支持！在AI管理页面可以选择文件并批量添加到处理队列，系统会自动排队处理。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'vector-search',
    name: '向量搜索引擎',
    description: '基于Qdrant向量数据库的语义搜索系统，支持以图搜图、自然语言搜索和智能推荐，让查找图片像搜索引擎一样简单。',
    icon: '🔍',
    color: '#00ff88',
    bgColor: 'rgba(0, 255, 136, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'semantic-search',
        title: '语义搜索',
        description: '输入自然语言描述，AI将文本转换为向量，搜索出语义相关的图片',
        icon: '💬',
        category: 'search'
      },
      {
        id: 'image-search',
        title: '以图搜图',
        description: '上传参考图片，自动找出视觉相似的图片，支持相似度阈值调整(0.3-0.7)',
        icon: '🖼️',
        category: 'search'
      },
      {
        id: 'smart-recommendation',
        title: '智能推荐',
        description: '基于向量相似度算法，为每张图片推荐视觉风格相近的内容',
        icon: '✨',
        category: 'core'
      },
      {
        id: 'vector-verification',
        title: '向量验证',
        description: '后台自动验证向量质量，检测异常向量并支持批量重新生成',
        icon: '✅',
        category: 'reliability'
      },
      {
        id: 'embedding-models',
        title: '多模型支持',
        description: '支持text-embedding-3-small/large/ada-002等多种嵌入模型，1536维向量',
        icon: '🧠',
        category: 'core'
      }
    ],
    faqs: [
      {
        question: '向量搜索的准确率如何？',
        answer: '使用OpenAI的text-embedding-3系列模型，搜索准确率达到行业领先水平。您可以通过调整相似度阈值来平衡精确度和召回率。'
      },
      {
        question: 'Qdrant向量数据库如何部署？',
        answer: 'Docker Compose会自动部署Qdrant容器，无需额外配置。数据持久化存储在本地卷中，重启不丢失。'
      },
      {
        question: '向量化处理需要多长时间？',
        answer: '单张图片向量化耗时约1-3秒，系统支持异步队列处理，不影响文件上传速度。您可以在后台监控向量生成进度。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'file-management',
    name: '文件管理系统',
    description: '支持10+种图片和视频格式，提供拖拽上传、断点续传、批量操作、水印、缩略图等完整的文件管理能力。',
    icon: '📁',
    color: '#ff6b6b',
    bgColor: 'rgba(255, 107, 107, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'multi-format-upload',
        title: '多格式上传',
        description: '支持JPG/PNG/GIF/WebP/HEIC/AVIF等图片格式，以及MP4/MOV等视频格式',
        icon: '📤',
        category: 'core'
      },
      {
        id: 'resumable-upload',
        title: '断点续传',
        description: '基于spark-md5的分块上传，网络中断自动续传，大文件上传更可靠',
        icon: '🔄',
        category: 'reliability'
      },
      {
        id: 'thumbnail-generation',
        title: '智能缩略图',
        description: '自动生成多尺寸缩略图，支持WebP格式压缩，节省存储和带宽',
        icon: '🖼️',
        category: 'optimization'
      },
      {
        id: 'watermark',
        title: '水印功能',
        description: '支持图片水印和文字水印，位置、透明度、大小可自定义',
        icon: '💧',
        category: 'protection'
      },
      {
        id: 'folder-structure',
        title: '无限层级文件夹',
        description: '树形结构文件夹，支持拖拽移动、批量移动、文件夹分享',
        icon: '🗂️',
        category: 'organization'
      },
      {
        id: 'batch-operations',
        title: '批量操作',
        description: '批量删除、移动、重命名、下载、设置标签，提升管理效率',
        icon: '⚡',
        category: 'efficiency'
      },
      {
        id: 'expiration-control',
        title: '过期控制',
        description: '设置文件自动过期时间，系统定时清理过期文件，释放存储空间',
        icon: '⏰',
        category: 'management'
      }
    ],
    faqs: [
      {
        question: '支持的最大文件大小是多少？',
        answer: '默认支持100MB单文件上传，管理员可在系统设置中调整。使用断点续传技术，理论上可支持任意大小文件。'
      },
      {
        question: '上传的文件会被压缩吗？',
        answer: '原图不会被压缩，保持原始质量。系统会自动生成WebP格式的缩略图用于预览，节省流量。您可以选择是否压缩原图。'
      },
      {
        question: '如何管理大量文件？',
        answer: '支持文件夹树形结构、AI自动分类、标签系统、高级搜索等多种方式，帮助您快速定位文件。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'share-system',
    name: '分享系统',
    description: '灵活的分享机制，支持文件分享、文件夹分享、混合分享，提供密码保护、过期时间、访问次数限制等安全控制。',
    icon: '🔗',
    color: '#a78bfa',
    bgColor: 'rgba(167, 139, 250, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'encrypted-share',
        title: '加密分享',
        description: '支持密码保护，访问分享链接需要输入密码，保护隐私内容',
        icon: '🔐',
        category: 'security'
      },
      {
        id: 'expiration-time',
        title: '过期控制',
        description: '设置分享链接的有效期，过期自动失效，支持永久分享',
        icon: '⏳',
        category: 'control'
      },
      {
        id: 'access-limit',
        title: '访问限制',
        description: '限制分享链接的访问次数，达到次数后自动失效',
        icon: '🚫',
        category: 'control'
      },
      {
        id: 'folder-share',
        title: '文件夹分享',
        description: '分享整个文件夹，访问者可浏览文件夹内所有文件',
        icon: '📂',
        category: 'sharing'
      },
      {
        id: 'mixed-share',
        title: '混合分享',
        description: '同时分享多个文件和文件夹，灵活组合分享内容',
        icon: '🎯',
        category: 'sharing'
      },
      {
        id: 'share-analytics',
        title: '访问统计',
        description: '查看分享链接的访问次数、访问时间、访问IP等统计信息',
        icon: '📊',
        category: 'analytics'
      }
    ],
    faqs: [
      {
        question: '分享链接可以撤销吗？',
        answer: '可以！在分享管理页面随时删除分享链接，删除后链接立即失效。'
      },
      {
        question: '访问者可以下载分享的文件吗？',
        answer: '创建分享时可以选择是否允许下载。如果禁止下载，访问者只能在线预览。'
      },
      {
        question: '如何避免分享链接被恶意传播？',
        answer: '建议设置密码保护、访问次数限制和过期时间。系统还支持IP黑白名单，进一步加强安全控制。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'storage-channels',
    name: '多云存储',
    description: '支持AWS S3、阿里云OSS、腾讯云COS、本地存储等多种存储方式，灵活配置存储通道，实现存储成本优化。',
    icon: '☁️',
    color: '#fbbf24',
    bgColor: 'rgba(251, 191, 36, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 's3-compatible',
        title: 'S3兼容存储',
        description: '支持AWS S3及所有S3兼容存储（MinIO、Cloudflare R2等）',
        icon: '🪣',
        category: 'core'
      },
      {
        id: 'aliyun-oss',
        title: '阿里云OSS',
        description: '原生支持阿里云对象存储服务，配置简单，性能优异',
        icon: '☁️',
        category: 'core'
      },
      {
        id: 'tencent-cos',
        title: '腾讯云COS',
        description: '原生支持腾讯云对象存储服务，适合国内用户',
        icon: '☁️',
        category: 'core'
      },
      {
        id: 'local-storage',
        title: '本地存储',
        description: '支持本地文件系统存储，适合私有部署和小规模使用',
        icon: '💾',
        category: 'core'
      },
      {
        id: 'channel-switching',
        title: '动态切换',
        description: '支持多个存储通道，可为不同用户/文件夹指定不同存储通道',
        icon: '🔄',
        category: 'configuration'
      },
      {
        id: 'cdn-acceleration',
        title: 'CDN加速',
        description: '支持配置CDN域名，加速文件访问，降低服务器带宽压力',
        icon: '🚀',
        category: 'performance'
      }
    ],
    faqs: [
      {
        question: '可以同时使用多个存储通道吗？',
        answer: '可以！系统支持配置多个存储通道，并为不同用户或文件夹指定不同的存储通道，实现存储策略的灵活配置。'
      },
      {
        question: '切换存储通道会影响已上传的文件吗？',
        answer: '不会！已上传的文件会保留在原存储通道中，只有新上传的文件会使用新的存储通道。'
      },
      {
        question: '如何迁移已有文件到新存储？',
        answer: '管理员可以在后台使用批量迁移工具，将文件从一个存储通道迁移到另一个存储通道。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'tag-system',
    name: '标签系统',
    description: '全局标签和用户标签双重体系，支持AI自动标签和手动标签，标签聚合统计，让文件分类更灵活。',
    icon: '🏷️',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'global-tags',
        title: '全局标签',
        description: '系统级标签，所有用户共享，支持标签层级和分类',
        icon: '🌍',
        category: 'organization'
      },
      {
        id: 'user-tags',
        title: '用户标签',
        description: '用户私有标签，只对自己可见，个性化管理文件',
        icon: '👤',
        category: 'organization'
      },
      {
        id: 'ai-auto-tags',
        title: 'AI自动标签',
        description: 'AI智能提取图片关键词作为标签，自动关联到全局标签库',
        icon: '🤖',
        category: 'core'
      },
      {
        id: 'tag-statistics',
        title: '标签统计',
        description: '统计每个标签的使用频率，展示热门标签和标签云',
        icon: '📊',
        category: 'analytics'
      },
      {
        id: 'batch-tagging',
        title: '批量打标',
        description: '选择多个文件批量添加或移除标签，提升管理效率',
        icon: '⚡',
        category: 'efficiency'
      },
      {
        id: 'tag-search',
        title: '标签搜索',
        description: '根据标签快速筛选文件，支持多标签组合搜索（AND/OR）',
        icon: '🔍',
        category: 'search'
      }
    ],
    faqs: [
      {
        question: '全局标签和用户标签有什么区别？',
        answer: '全局标签是系统级标签，所有用户可见和使用；用户标签是私有标签，只有创建者可见。AI自动标签会优先使用全局标签。'
      },
      {
        question: 'AI生成的标签可以编辑吗？',
        answer: '可以！AI生成的标签可以随时删除或修改，您也可以手动添加新的标签。'
      },
      {
        question: '如何管理标签混乱的问题？',
        answer: '管理员可以在后台合并重复标签、删除无用标签、设置标签别名等，保持标签库的整洁。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'advanced-search',
    name: '高级搜索',
    description: '融合关键词搜索、标签搜索、分类搜索、向量搜索的多维度搜索系统，让您快速找到任何文件。',
    icon: '🔎',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'keyword-search',
        title: '关键词搜索',
        description: '搜索文件名、描述、标签等文本内容，支持模糊匹配',
        icon: '📝',
        category: 'search'
      },
      {
        id: 'tag-filter',
        title: '标签筛选',
        description: '多标签组合筛选，支持AND/OR逻辑，精确定位文件',
        icon: '🏷️',
        category: 'search'
      },
      {
        id: 'category-filter',
        title: '分类筛选',
        description: '按AI识别的分类（景物、人物、动物等）筛选文件',
        icon: '📂',
        category: 'search'
      },
      {
        id: 'date-range',
        title: '时间范围',
        description: '按上传时间、修改时间筛选，支持自定义时间范围',
        icon: '📅',
        category: 'search'
      },
      {
        id: 'file-type',
        title: '文件类型',
        description: '按文件格式（JPG/PNG/GIF/视频等）筛选',
        icon: '📄',
        category: 'search'
      },
      {
        id: 'size-filter',
        title: '大小筛选',
        description: '按文件大小、图片尺寸筛选文件',
        icon: '📏',
        category: 'search'
      }
    ],
    faqs: [
      {
        question: '搜索速度如何？',
        answer: '系统使用MySQL全文索引和Redis缓存，搜索响应时间通常在100ms以内。向量搜索由Qdrant提供，性能优异。'
      },
      {
        question: '可以保存搜索条件吗？',
        answer: '支持！您可以将常用的搜索条件保存为智能文件夹，下次直接点击即可快速搜索。'
      },
      {
        question: '搜索支持正则表达式吗？',
        answer: '目前支持模糊匹配和通配符，正则表达式功能正在开发中。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'user-management',
    name: '用户管理',
    description: '完整的用户系统，支持注册/登录、OAuth第三方登录、权限管理、配额控制、活动日志等企业级功能。',
    icon: '👥',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'user-auth',
        title: '用户认证',
        description: '支持邮箱/用户名登录，JWT Token认证，安全可靠',
        icon: '🔐',
        category: 'security'
      },
      {
        id: 'oauth-login',
        title: 'OAuth登录',
        description: '支持GitHub、Google、Linux.do第三方登录，一键注册',
        icon: '🔗',
        category: 'integration'
      },
      {
        id: 'role-permissions',
        title: '角色权限',
        description: '管理员、普通用户多角色体系，细粒度权限控制',
        icon: '👑',
        category: 'control'
      },
      {
        id: 'quota-control',
        title: '配额管理',
        description: '限制用户存储空间、上传大小、文件数量等，灵活配置',
        icon: '📊',
        category: 'management'
      },
      {
        id: 'activity-log',
        title: '活动日志',
        description: '记录用户所有操作（上传/删除/分享等），支持审计追踪',
        icon: '📝',
        category: 'logging'
      },
      {
        id: 'user-profile',
        title: '用户资料',
        description: '自定义头像、昵称、邮箱等个人信息，支持密码修改',
        icon: '👤',
        category: 'management'
      }
    ],
    faqs: [
      {
        question: '支持LDAP/AD域认证吗？',
        answer: '当前版本暂不支持，该功能在企业版路线图中。您可以使用OAuth接入企业内部的SSO系统。'
      },
      {
        question: '如何限制用户上传速度？',
        answer: '管理员可以在带宽控制模块中为每个用户或用户组设置上传/下载速度限制。'
      },
      {
        question: '可以批量导入用户吗？',
        answer: '支持！管理员可以通过CSV文件批量导入用户，系统会自动发送邮件通知。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'security-protection',
    name: '安全防护',
    description: '多层次安全防护机制，包括防盗链、IP黑白名单、访问日志、带宽控制等，保护您的资源安全。',
    icon: '🛡️',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'hotlink-protection',
        title: '防盗链',
        description: '设置域名白名单，防止外部网站直接引用您的图片',
        icon: '🔒',
        category: 'security'
      },
      {
        id: 'ip-blacklist',
        title: 'IP黑白名单',
        description: '封禁恶意IP，或限制只有特定IP可以访问',
        icon: '🚫',
        category: 'security'
      },
      {
        id: 'bandwidth-limit',
        title: '带宽控制',
        description: '限制单用户/全局带宽，防止流量被恶意消耗',
        icon: '📊',
        category: 'management'
      },
      {
        id: 'access-log',
        title: '访问日志',
        description: '记录所有文件访问请求，支持IP、时间、文件等维度分析',
        icon: '📋',
        category: 'logging'
      },
      {
        id: 'rate-limiting',
        title: '频率限制',
        description: '限制API请求频率，防止恶意刷接口攻击',
        icon: '⏱️',
        category: 'security'
      },
      {
        id: 'cors-control',
        title: '跨域控制',
        description: '配置CORS策略，精确控制哪些域名可以请求您的资源',
        icon: '🌐',
        category: 'security'
      }
    ],
    faqs: [
      {
        question: '如何防止图片被大量盗用？',
        answer: '建议开启防盗链、设置域名白名单、启用水印功能。对于敏感内容，可以使用加密分享链接。'
      },
      {
        question: '检测到恶意访问怎么办？',
        answer: '系统会自动记录异常访问日志，管理员可以在后台查看并添加IP到黑名单。支持设置自动封禁规则。'
      },
      {
        question: '访问日志会占用很多存储吗？',
        answer: '日志支持自动清理策略，可设置保留天数（如30天）。也可以配置日志级别，只记录关键事件。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'system-settings',
    name: '系统设置',
    description: '灵活的系统配置中心，涵盖存储、AI、邮件、OAuth、公告、代理等各个方面的配置，支持在线修改无需重启。',
    icon: '⚙️',
    color: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'dynamic-config',
        title: '动态配置',
        description: '大部分配置支持在线修改，无需重启服务即可生效',
        icon: '🔄',
        category: 'configuration'
      },
      {
        id: 'ai-settings',
        title: 'AI配置',
        description: '配置OpenAI API端点、模型、并发数、超时时间等AI参数',
        icon: '🤖',
        category: 'configuration'
      },
      {
        id: 'storage-settings',
        title: '存储配置',
        description: '管理存储通道、配置S3/OSS/COS凭证、设置CDN域名',
        icon: '💾',
        category: 'configuration'
      },
      {
        id: 'email-settings',
        title: '邮件配置',
        description: '配置SMTP服务器，用于发送注册邮件、分享通知等',
        icon: '📧',
        category: 'configuration'
      },
      {
        id: 'oauth-settings',
        title: 'OAuth配置',
        description: '配置GitHub、Google等OAuth应用，开启第三方登录',
        icon: '🔗',
        category: 'configuration'
      },
      {
        id: 'announcement-settings',
        title: '公告配置',
        description: '发布系统公告、维护通知，支持富文本编辑',
        icon: '📢',
        category: 'management'
      },
      {
        id: 'proxy-settings',
        title: '代理配置',
        description: '配置HTTP/SOCKS5代理，用于访问OpenAI API等外部服务',
        icon: '🌐',
        category: 'configuration'
      }
    ],
    faqs: [
      {
        question: '修改配置需要重启服务吗？',
        answer: '大部分配置无需重启即可生效。少数涉及底层架构的配置（如数据库连接）需要重启，系统会提示。'
      },
      {
        question: '配置会备份吗？',
        answer: '系统会自动记录配置修改历史，可以随时回滚到之前的配置版本。建议定期导出配置文件备份。'
      },
      {
        question: '可以为不同用户设置不同的配置吗？',
        answer: '部分配置支持用户级覆盖，如AI并发数、存储通道等。全局配置会作为默认值。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'dashboard-analytics',
    name: '数据统计',
    description: '可视化仪表板，展示文件数量、存储使用、上传趋势、热门标签等统计数据，支持ECharts图表展示。',
    icon: '📊',
    color: '#14b8a6',
    bgColor: 'rgba(20, 184, 166, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'file-statistics',
        title: '文件统计',
        description: '展示文件总数、存储总量、今日上传等核心指标',
        icon: '📁',
        category: 'analytics'
      },
      {
        id: 'upload-trend',
        title: '上传趋势',
        description: '折线图展示每日/每周/每月的上传数量和存储增长趋势',
        icon: '📈',
        category: 'analytics'
      },
      {
        id: 'storage-distribution',
        title: '存储分布',
        description: '饼图展示不同存储通道、文件类型的存储占比',
        icon: '🥧',
        category: 'analytics'
      },
      {
        id: 'tag-cloud',
        title: '标签云',
        description: '展示热门标签和使用频率，可视化标签分布',
        icon: '☁️',
        category: 'analytics'
      },
      {
        id: 'user-activity',
        title: '用户活跃度',
        description: '统计活跃用户、上传排行、存储占用排行',
        icon: '👥',
        category: 'analytics'
      },
      {
        id: 'export-reports',
        title: '导出报表',
        description: '支持导出统计数据为Excel/CSV格式，方便进一步分析',
        icon: '📤',
        category: 'analytics'
      }
    ],
    faqs: [
      {
        question: '统计数据是实时的吗？',
        answer: '核心指标是实时计算的，部分复杂统计会使用Redis缓存，每5分钟更新一次。'
      },
      {
        question: '可以查看历史数据吗？',
        answer: '支持！您可以选择时间范围查看历史统计数据，默认保留最近90天的详细数据。'
      },
      {
        question: '能否自定义统计维度？',
        answer: '管理员可以在设置中添加自定义统计指标，系统会自动采集和展示。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'internationalization',
    name: '国际化支持',
    description: '完整的多语言支持，内置中文、英文、日文三种语言，支持动态切换和自定义翻译。',
    icon: '🌏',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'multi-language',
        title: '多语言',
        description: '内置中文（简体）、英文、日文三种语言，覆盖所有界面文本',
        icon: '🗣️',
        category: 'core'
      },
      {
        id: 'dynamic-loading',
        title: '动态加载',
        description: '语言包按需加载，切换语言无需刷新页面',
        icon: '⚡',
        category: 'efficiency'
      },
      {
        id: 'auto-detection',
        title: '自动检测',
        description: '根据浏览器语言自动选择界面语言，也可手动切换',
        icon: '🔍',
        category: 'core'
      },
      {
        id: 'custom-translation',
        title: '自定义翻译',
        description: '管理员可修改或添加翻译文本，支持导入/导出语言包',
        icon: '✏️',
        category: 'configuration'
      }
    ],
    faqs: [
      {
        question: '如何添加新的语言？',
        answer: '复制现有语言包文件，翻译所有文本后放入locales目录，在配置文件中注册即可。'
      },
      {
        question: '支持RTL（从右到左）语言吗？',
        answer: '当前版本暂不支持RTL语言，该功能在未来版本的规划中。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  },
  {
    id: 'theme-system',
    name: '主题系统',
    description: '内置12+精美主题，包括赛博朋克、清新自然等多种风格，支持暗黑模式和自定义主题颜色。',
    icon: '🎨',
    color: '#f43f5e',
    bgColor: 'rgba(244, 63, 94, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp',
      '/images/demo/ai-analysis-demo.webp'
    ],
    features: [
      {
        id: 'multiple-themes',
        title: '多种主题',
        description: '内置赛博朋克、清新自然、商务简约等12+种精美主题',
        icon: '🎭',
        category: 'core'
      },
      {
        id: 'dark-mode',
        title: '暗黑模式',
        description: '所有主题支持暗黑模式，保护夜间使用者的眼睛',
        icon: '🌙',
        category: 'core'
      },
      {
        id: 'custom-colors',
        title: '自定义颜色',
        description: '支持自定义主题色、强调色等，打造专属视觉风格',
        icon: '🎨',
        category: 'configuration'
      },
      {
        id: 'instant-switch',
        title: '即时切换',
        description: '切换主题无需刷新页面，使用CSS变量实现流畅过渡',
        icon: '⚡',
        category: 'efficiency'
      }
    ],
    faqs: [
      {
        question: '如何创建自己的主题？',
        answer: '复制现有主题的CSS变量配置，修改颜色值后在主题配置文件中注册即可。系统会自动生成主题预览。'
      },
      {
        question: '主题会影响性能吗？',
        answer: '不会！主题使用CSS变量实现，切换主题只是修改变量值，不会重新加载样式文件。'
      }
    ],
    status: 'stable',
    version: 'v1.0.0'
  }
]

export const featureCategories = {
  core: {
    label: '核心功能',
    color: '#00ff88',
    icon: '🚀'
  },
  efficiency: {
    label: '效率提升',
    color: '#8b5cf6',
    icon: '⚡'
  },
  security: {
    label: '安全保护',
    color: '#ef4444',
    icon: '🛡️'
  },
  reliability: {
    label: '可靠性',
    color: '#0ea5e9',
    icon: '🔄'
  },
  performance: {
    label: '性能优化',
    color: '#f59e0b',
    icon: '🚀'
  },
  optimization: {
    label: '成本优化',
    color: '#10b981',
    icon: '💰'
  },
  organization: {
    label: '组织管理',
    color: '#8b5cf6',
    icon: '📁'
  },
  search: {
    label: '搜索功能',
    color: '#06b6d4',
    icon: '🔍'
  },
  versioning: {
    label: '版本控制',
    color: '#6366f1',
    icon: '🕐'
  },
  sharing: {
    label: '分享功能',
    color: '#f59e0b',
    icon: '📤'
  },
  analytics: {
    label: '数据分析',
    color: '#10b981',
    icon: '📊'
  },
  protection: {
    label: '内容保护',
    color: '#ef4444',
    icon: '🖼️'
  },
  api: {
    label: 'API接口',
    color: '#06b6d4',
    icon: '🌐'
  },
  sdk: {
    label: 'SDK工具',
    color: '#8b5cf6',
    icon: '💻'
  },
  integration: {
    label: '系统集成',
    color: '#f59e0b',
    icon: '🔔'
  },
  control: {
    label: '访问控制',
    color: '#ef4444',
    icon: '⏱️'
  },
  monitoring: {
    label: '系统监控',
    color: '#10b981',
    icon: '📊'
  },
  management: {
    label: '管理功能',
    color: '#06b6d4',
    icon: '👥'
  },
  configuration: {
    label: '配置管理',
    color: '#8b5cf6',
    icon: '🛠️'
  },
  logging: {
    label: '日志系统',
    color: '#6366f1',
    icon: '📝'
  }
}
