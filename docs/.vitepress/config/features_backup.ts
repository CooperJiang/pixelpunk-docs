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

// AI图床程序的功能模块数据
export const featureModules: FeatureModule[] = [
  {
    id: 'ai-analysis',
    name: 'AI智能分析',
    description: '基于AI识图大模型的智能图片内容识别与分析系统，自动生成标签和描述...',
    icon: '🤖',
    color: '#00ff88',
    bgColor: 'rgba(0, 255, 136, 0.1)',
    image: '/images/demo/ai-analysis-demo.webp',
    screenshots: [
      '/images/features/features-1.png',
      '/images/features/features-2.png'
    ],
    features: [
      {
        id: 'content-recognition',
        title: '智能内容识别',
        description: '自动识别图片中的物体、场景、人物等15+种内容类型',
        icon: '👁️',
        category: 'core'
      },
      {
        id: 'auto-tagging',
        title: '自动标签生成',
        description: '基于图片内容自动生成相关标签，提升搜索效率',
        icon: '🏷️',
        category: 'core'
      },
      {
        id: 'batch-processing',
        title: '批量智能处理',
        description: '支持队列限制的图片批量分析功能',
        icon: '📦',
        category: 'efficiency'
      },
      {
        id: 'nsfw-detection',
        title: 'NSFW内容检测',
        description: '自动识别和标记不适宜内容，保护平台安全',
        icon: '🛡️',
        category: 'security'
      }
    ],
    configGuide: {
      title: '配置AI分析功能',
      steps: [
        '在管理后台进入"AI设置"页面',
        '配置OpenAI API密钥',
        '选择分析模型（GPT-4 Vision推荐）',
        '设置分析触发条件（上传时/手动）',
        '配置自动标签规则和敏感内容过滤'
      ]
    },
    faqs: [
      {
        question: 'AI分析的准确率如何？',
        answer: '基于GPT-4 Vision的内容识别准确率达到95%以上，支持中英文双语识别。'
      },
      {
        question: '批量处理有什么限制？',
        answer: '单次最多处理100张图片，每张图片大小不超过20MB，支持常见图片格式。'
      },
      {
        question: '如何自定义标签规则？',
        answer: '在AI设置中可以自定义标签词库、同义词映射和分类规则。'
      }
    ],
    status: 'stable',
    version: 'v2.1'
  },
  {
    id: 'cloud-storage',
    name: '多云存储',
    description: '支持多家云存储服务商的统一管理系统，提供高可用性和成本优化',
    icon: '☁️',
    color: '#0ea5e9',
    bgColor: 'rgba(14, 165, 233, 0.1)',
    image: '/images/demo/cloud-storage-demo.webp',
    screenshots: [
      '/images/features/features-3.png',
      '/images/features/features-4.png'
    ],
    features: [
      {
        id: 'multi-provider',
        title: '多云服务支持',
        description: '支持阿里云OSS、腾讯云COS、七牛云、又拍云、RainyUN等主流云存储',
        icon: '🌐',
        category: 'core'
      },
      {
        id: 'auto-failover',
        title: '自动故障转移',
        description: '智能存储路由，主存储故障时自动切换到备用存储',
        icon: '🔄',
        category: 'reliability'
      },
      {
        id: 'cdn-acceleration',
        title: 'CDN全球加速',
        description: '全球CDN节点覆盖，图片加载速度提升150%',
        icon: '🚀',
        category: 'performance'
      },
      {
        id: 'cost-optimization',
        title: '成本智能优化',
        description: '根据访问频率和地域自动选择最优存储策略，降低25%成本',
        icon: '💰',
        category: 'optimization'
      }
    ],
    configGuide: {
      title: '配置多云存储',
      steps: [
        '进入"存储配置"管理页面',
        '添加云存储服务商密钥信息',
        '设置主存储和备用存储策略',
        '配置CDN加速域名',
        '设置存储桶权限和访问策略',
        '测试连接并启用自动故障转移'
      ]
    },
    faqs: [
      {
        question: '支持哪些云存储服务商？',
        answer: '目前支持阿里云OSS、腾讯云COS、七牛云、又拍云、RainyUN、Amazon S3等主流服务商。'
      },
      {
        question: '故障转移需要多长时间？',
        answer: '故障检测和切换过程通常在30秒内完成，确保服务连续性。'
      },
      {
        question: '如何监控存储成本？',
        answer: '管理后台提供详细的存储使用情况和成本分析报表，支持按月统计。'
      }
    ],
    status: 'stable',
    version: 'v2.0'
  },
  {
    id: 'image-management',
    name: '图片管理',
    description: '强大的图片管理系统，支持分类、搜索、批量操作和版本控制',
    icon: '🖼️',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    image: '/images/demo/image-management-demo.webp',
    screenshots: [
      '/images/features/features-5.png',
      '/images/features/features-6.png'
    ],
    features: [
      {
        id: 'smart-classification',
        title: '智能分类管理',
        description: '基于AI自动分类和手动分类相结合的图片管理系统',
        icon: '📁',
        category: 'organization'
      },
      {
        id: 'advanced-search',
        title: '高级搜索功能',
        description: '支持按标签、颜色、尺寸、格式等多维度搜索图片',
        icon: '🔍',
        category: 'search'
      },
      {
        id: 'batch-operations',
        title: '批量操作工具',
        description: '支持批量删除、移动、标签编辑、格式转换等操作',
        icon: '⚡',
        category: 'efficiency'
      },
      {
        id: 'version-control',
        title: '版本控制系统',
        description: '图片版本管理，支持历史版本查看和回滚功能',
        icon: '🕐',
        category: 'versioning'
      }
    ],
    configGuide: {
      title: '配置图片管理系统',
      steps: [
        '创建图片分类和标签体系',
        '设置自动分类规则和命名规范',
        '配置搜索索引和过滤器',
        '设置批量操作权限和限制',
        '启用版本控制和备份策略'
      ]
    },
    faqs: [
      {
        question: '支持哪些图片格式？',
        answer: '支持JPEG、PNG、GIF、WebP、AVIF、SVG等主流图片格式，以及RAW格式预览。'
      },
      {
        question: '搜索功能有什么特色？',
        answer: '除了基础搜索外，还支持以图搜图、相似图片查找、智能标签建议等功能。'
      },
      {
        question: '版本控制占用多少存储空间？',
        answer: '使用增量存储技术，版本控制通常只占用原图片10-20%的额外空间。'
      }
    ],
    status: 'stable',
    version: 'v1.8'
  },
  {
    id: 'sharing-system',
    name: '分享系统',
    description: '灵活的图片分享和权限管理系统，支持多种分享方式和访问控制',
    icon: '🔗',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    image: '/images/demo/sharing-system-demo.webp',
    screenshots: [
      '/images/features/features-7.png',
      '/images/features/features-8.png'
    ],
    features: [
      {
        id: 'flexible-sharing',
        title: '灵活分享选项',
        description: '支持链接分享、二维码分享、嵌入代码等多种分享方式',
        icon: '📤',
        category: 'sharing'
      },
      {
        id: 'access-control',
        title: '访问权限控制',
        description: '精细化权限管理，支持密码保护、时效控制、访问次数限制',
        icon: '🔐',
        category: 'security'
      },
      {
        id: 'sharing-analytics',
        title: '分享数据统计',
        description: '详细的分享访问统计，包括来源分析、地域分布等',
        icon: '📊',
        category: 'analytics'
      },
      {
        id: 'watermark-protection',
        title: '水印保护功能',
        description: '自动添加水印保护，支持文字和图片水印',
        icon: '🖼️',
        category: 'protection'
      }
    ],
    configGuide: {
      title: '配置分享系统',
      steps: [
        '设置默认分享权限和限制',
        '配置水印模板和保护规则',
        '设置访问统计和分析功能',
        '配置分享链接的域名和格式',
        '设置分享通知和审核流程'
      ]
    },
    faqs: [
      {
        question: '分享链接的有效期如何设置？',
        answer: '支持永久有效、自定义时间、访问次数限制等多种有效期设置方式。'
      },
      {
        question: '水印是否会影响原图？',
        answer: '水印只在分享时添加，不会修改原始图片文件，保证原图完整性。'
      },
      {
        question: '如何防止图片被恶意下载？',
        answer: '提供防盗链、访问频率限制、IP白名单等多重保护机制。'
      }
    ],
    status: 'stable',
    version: 'v1.6'
  },
  {
    id: 'api-integration',
    name: 'API集成',
    description: '完整的RESTful API和SDK，支持第三方应用无缝集成',
    icon: '🔌',
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    image: '/images/features/features-9.png',
    screenshots: [
      '/images/features/features-9.png',
      '/images/features/features-10.png'
    ],
    features: [
      {
        id: 'restful-api',
        title: 'RESTful API',
        description: '完整的REST API接口，支持所有核心功能的程序化访问',
        icon: '🌐',
        category: 'api'
      },
      {
        id: 'multi-sdk',
        title: '多语言SDK',
        description: '提供PHP、Python、Node.js、Java等主流语言的SDK',
        icon: '💻',
        category: 'sdk'
      },
      {
        id: 'webhook-support',
        title: 'Webhook支持',
        description: '事件驱动的Webhook通知，实时同步数据变更',
        icon: '🔔',
        category: 'integration'
      },
      {
        id: 'rate-limiting',
        title: '智能限流控制',
        description: '基于用户等级的API调用限制和QoS保障',
        icon: '⏱️',
        category: 'control'
      }
    ],
    configGuide: {
      title: '配置API集成',
      steps: [
        '在开发者中心创建应用获取API密钥',
        '选择合适的SDK或直接使用REST API',
        '配置Webhook接收地址和事件类型',
        '设置API调用限制和安全策略',
        '测试API接口并部署到生产环境'
      ]
    },
    faqs: [
      {
        question: 'API有调用次数限制吗？',
        answer: '根据用户等级提供不同的调用限额，免费用户每天1000次，付费用户无限制。'
      },
      {
        question: '如何确保API调用安全？',
        answer: '支持API密钥认证、HTTPS传输、IP白名单、签名验证等多重安全机制。'
      },
      {
        question: 'SDK是否开源？',
        answer: '所有官方SDK都在GitHub开源，欢迎社区贡献和改进。'
      }
    ],
    status: 'stable',
    version: 'v1.5'
  },
  {
    id: 'admin-panel',
    name: '管理后台',
    description: '功能强大的管理后台，提供完整的系统监控和配置管理',
    icon: '⚙️',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    image: '/images/features/features-11.png',
    screenshots: [
      '/images/features/features-11.png',
      '/images/features/features-12.png'
    ],
    features: [
      {
        id: 'system-monitoring',
        title: '系统监控面板',
        description: '实时监控系统状态、性能指标和资源使用情况',
        icon: '📊',
        category: 'monitoring'
      },
      {
        id: 'user-management',
        title: '用户管理系统',
        description: '完整的用户管理，包括权限分配、额度管理等',
        icon: '👥',
        category: 'management'
      },
      {
        id: 'config-management',
        title: '配置管理中心',
        description: '统一的系统配置管理，支持热更新和配置版本控制',
        icon: '🛠️',
        category: 'configuration'
      },
      {
        id: 'log-analysis',
        title: '日志分析工具',
        description: '详细的操作日志和错误分析，支持日志搜索和导出',
        icon: '📝',
        category: 'logging'
      }
    ],
    configGuide: {
      title: '配置管理后台',
      steps: [
        '创建管理员账户并设置权限',
        '配置系统监控告警规则',
        '设置用户注册和认证策略',
        '配置存储和CDN服务参数',
        '设置备份和灾难恢复计划'
      ]
    },
    faqs: [
      {
        question: '管理后台支持多管理员吗？',
        answer: '支持多管理员和分级权限管理，可以为不同管理员分配不同的管理权限。'
      },
      {
        question: '如何设置系统告警？',
        answer: '支持邮件、短信、钉钉、企微等多种告警方式，可设置自定义告警规则。'
      },
      {
        question: '管理后台是否支持移动端？',
        answer: '采用响应式设计，支持在手机和平板上进行基础的系统管理操作。'
      }
    ],
    status: 'stable',
    version: 'v1.4'
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