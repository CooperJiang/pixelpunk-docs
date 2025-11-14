<template>
  <section class="stats-section py-12">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6" :style="{background: 'linear-gradient(to right, var(--vp-c-brand-lighter), var(--vp-c-brand))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          项目数据统计
        </h2>
        <p class="text-xl max-w-3xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
          PixelPunk 是一个功能完备的企业级解决方案，拥有丰富的功能模块和强大的技术架构
        </p>
      </div>
      
      <!-- 统计网格 -->
      <div class="stats-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-card group"
        >
          <div class="stat-icon">
            <span class="text-4xl">{{ stat.icon }}</span>
          </div>
          <div class="stat-content">
            <div class="stat-number" :style="{color: 'var(--vp-c-brand)'}">{{ animatedStats[index] }}</div>
            <div class="stat-label" :style="{color: 'var(--cyber-text-tertiary)'}">{{ stat.label }}</div>
            <div v-if="stat.extra" class="stat-extra" :style="{color: 'var(--vp-c-brand-light)', fontSize: '0.7rem', marginTop: '0.25rem'}">{{ stat.extra }}</div>
          </div>
          <div class="stat-glow"></div>
        </div>
      </div>

      <!-- GitHub 社区数据 -->
      <div class="github-stats mb-16">
        <h3 class="text-2xl font-bold text-center section-title" :style="{color: 'var(--vp-c-brand)'}">
          开源社区
        </h3>
        <div class="github-grid grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="github-card group">
            <div class="github-icon">⭐</div>
            <div class="github-number" :style="{color: 'var(--vp-c-brand)'}">
              {{ githubStats.stars }}
            </div>
            <div class="github-label" :style="{color: 'var(--cyber-text-tertiary)'}">GitHub Stars</div>
          </div>
          <div class="github-card group">
            <div class="github-icon">🍴</div>
            <div class="github-number" :style="{color: 'var(--vp-c-brand-light)'}">
              {{ githubStats.forks }}
            </div>
            <div class="github-label" :style="{color: 'var(--cyber-text-tertiary)'}">Forks</div>
          </div>
          <div class="github-card group">
            <div class="github-icon">👥</div>
            <div class="github-number" :style="{color: 'var(--vp-c-brand-lighter)'}">
              {{ githubStats.contributors }}
            </div>
            <div class="github-label" :style="{color: 'var(--cyber-text-tertiary)'}">贡献者</div>
          </div>
          <div class="github-card group">
            <div class="github-icon">👀</div>
            <div class="github-number" :style="{color: 'var(--vp-c-brand)'}">
              {{ githubStats.watchers }}
            </div>
            <div class="github-label" :style="{color: 'var(--cyber-text-tertiary)'}">Watchers</div>
          </div>
        </div>
      </div>

      <!-- 技术栈展示 -->
      <div class="tech-stack mb-16">
        <h3 class="text-2xl font-bold text-center section-title" :style="{color: 'var(--vp-c-brand)'}">
          技术栈
        </h3>
        <div class="tech-grid-container">
          <div class="tech-grid grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-4">
          <div
            v-for="(tech, index) in techStack"
            :key="index"
            class="tech-item"
          >
            <div class="tech-icon">
              <img :src="tech.icon" :alt="tech.name" class="tech-icon-img" />
            </div>
            <div class="tech-name" :style="{color: 'var(--cyber-text-secondary)'}">{{ tech.name }}</div>
          </div>
        </div>
        </div>
      </div>
      
      <!-- 功能模块轮播 -->
      <div class="modules-section">
        <h3 class="text-2xl font-bold text-center section-title" :style="{color: 'var(--vp-c-brand-light)'}">
          系统功能模块介绍
        </h3>

        <!-- 轮播容器 -->
        <div class="modules-carousel-container">
          <!-- 导航按钮 -->
          <button
            @click="scrollModulesLeft"
            class="carousel-nav-btn nav-left"
            :class="{ 'opacity-50': isModulesAtStart }"
            :disabled="isModulesAtStart"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            @click="scrollModulesRight"
            class="carousel-nav-btn nav-right"
            :class="{ 'opacity-50': isModulesAtEnd }"
            :disabled="isModulesAtEnd"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <!-- 轮播内容 -->
          <div
            ref="modulesCarouselRef"
            class="modules-carousel-wrapper"
            @scroll="handleModulesScroll"
            @mouseenter="pauseModulesAutoScroll"
            @mouseleave="resumeModulesAutoScroll"
          >
            <div class="modules-carousel-track">
              <div
                v-for="(module, index) in modules"
                :key="index"
                class="module-carousel-card group"
              >
                <!-- 卡片头部 -->
                <div class="module-header">
                  <div class="module-icon-wrapper">
                    <div class="module-icon">{{ module.icon }}</div>
                  </div>
                  <div class="module-title-area">
                    <h4 class="module-title" :style="{color: 'var(--vp-c-brand-light)'}">{{ module.title }}</h4>
                    <p class="module-subtitle" :style="{color: 'var(--cyber-text-tertiary)'}">{{ module.description }}</p>
                  </div>
                </div>

                <!-- 功能列表 -->
                <div class="module-features">
                  <ul class="features-list">
                    <li
                      v-for="(feature, idx) in module.features"
                      :key="idx"
                      class="feature-item"
                    >
                      <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      <span :style="{color: 'var(--cyber-text-secondary)'}">{{ feature }}</span>
                    </li>
                  </ul>
                </div>

                <!-- 悬浮效果 -->
                <div class="module-glow"></div>
              </div>
            </div>
          </div>

          <!-- 进度指示器 -->
          <div class="modules-carousel-indicators">
            <div
              v-for="(_, index) in Math.ceil(modules.length / modulesPerView)"
              :key="index"
              class="indicator"
              :class="{ 'active': index === currentModulePage }"
              @click="goToModulePage(index)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const animatedStats = ref(['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'])

// GitHub社区数据
const githubStats = ref({
  stars: '加载中...',
  forks: '加载中...',
  contributors: '加载中...',
  watchers: '加载中...'
})

// 功能模块轮播相关
const modulesCarouselRef = ref<HTMLElement>()
const currentModulePage = ref(0)
const isModulesAtStart = ref(true)
const isModulesAtEnd = ref(false)
const modulesPerView = ref(3) // 默认每次显示3个
const modulesAutoScrollTimer = ref<NodeJS.Timeout>()
const isModulesPaused = ref(false)

const stats = [
  { icon: '📁', label: '后端接口', target: 328, suffix: '+' },
  { icon: '🎨', label: '前端路由', target: 37, suffix: '+' },
  { icon: '🗃️', label: '数据表', target: 43, suffix: '+' },
  { icon: '💻', label: '代码总量', target: 27, suffix: '万行' },
  { icon: '🤖', label: 'AI 功能', target: 5, suffix: '个' },
  { icon: '☁️', label: '存储渠道', target: 8, suffix: '种' },
  { icon: '📄', label: '文件格式', target: 55, suffix: '+' },
  { icon: '🛡️', label: '安全中间件', target: 13, suffix: '个' },
  { icon: '🔧', label: '管理模块', target: 14, suffix: '个' },
  { icon: '🔌', label: 'OAuth登录', target: 3, suffix: '种' }
]

const techStack = [
  { name: 'Go', icon: '/images/tech-icons/go.svg' },
  { name: 'Vue 3', icon: '/images/tech-icons/vue.svg' },
  { name: 'TypeScript', icon: '/images/tech-icons/typescript.svg' },
  { name: 'Gin', icon: '/images/tech-icons/gin.svg' },
  { name: 'GORM', icon: '/images/tech-icons/gorm.svg' },
  { name: 'MySQL', icon: '/images/tech-icons/mysql.svg' },
  { name: 'SQLite', icon: '/images/tech-icons/sqlite.svg' },
  { name: 'Redis', icon: '/images/tech-icons/redis.svg' },
  { name: 'Qdrant', icon: '/images/tech-icons/qdrant.svg' },
  { name: 'Vite', icon: '/images/tech-icons/vite.svg' },
  { name: 'TailwindCSS', icon: '/images/tech-icons/tailwindcss.svg' },
  { name: 'Pinia', icon: '/images/tech-icons/pinia.svg' },
  { name: 'Vue Router', icon: '/images/tech-icons/vue-router.svg' },
  { name: 'Axios', icon: '/images/tech-icons/axios.svg' },
  { name: 'OpenAI', icon: '/images/tech-icons/openai.svg' },
  { name: 'Gemini', icon: '/images/tech-icons/gemini.svg' },
  { name: 'Vector Search', icon: '/images/tech-icons/vector-search.svg' },
  { name: 'AWS S3', icon: '/images/tech-icons/aws-s3.svg' },
  { name: 'Aliyun OSS', icon: '/images/tech-icons/aliyun.svg' },
  { name: 'Tencent COS', icon: '/images/tech-icons/tencent.svg' },
  { name: 'Cloudflare R2', icon: '/images/tech-icons/cloudflare.svg' },
  { name: 'WebP', icon: '/images/tech-icons/webp.svg' },
  { name: 'Image Processing', icon: '/images/tech-icons/image-processing.svg' },
  { name: 'WebSocket', icon: '/images/tech-icons/websocket.svg' },
  { name: 'JWT', icon: '/images/tech-icons/jwt.svg' },
  { name: 'OAuth', icon: '/images/tech-icons/oauth.svg' },
  { name: 'GSAP', icon: '/images/tech-icons/gsap.svg' },
  { name: 'ECharts', icon: '/images/tech-icons/echarts.svg' },
  { name: 'Docker', icon: '/images/tech-icons/docker.svg' },
  { name: 'Markdown', icon: '/images/tech-icons/markdown.svg' }
]

const modules = [
  {
    icon: '👤',
    title: '用户系统',
    description: '完整的用户认证与权限管理体系',
    features: [
      'JWT令牌无状态认证机制',
      'OAuth第三方登录集成（GitHub/Google/LinuxDo）',
      '三级权限体系（普通用户/管理员/超级管理员）',
      '用户资料管理与头像上传',
      '工作空间配置与个性化设置',
      '密码重置与邮箱验证流程'
    ]
  },
  {
    icon: '🖼️',
    title: '文件管理',
    description: '企业级文件管理解决方案',
    features: [
      '分片上传与断点续传支持',
      'MD5秒传去重，节省存储空间',
      '无限层级文件夹树形结构',
      '批量上传/删除/移动/复制操作',
      'EXIF元数据自动提取与展示',
      '文件夹与资源自定义排序'
    ]
  },
  {
    icon: '🤖',
    title: 'AI 智能分析',
    description: '多模态AI大模型深度图像理解',
    features: [
      '集成GPT Vision、Gemini等主流AI模型',
      '智能自动资源分类与标签生成',
      'NSFW内容安全检测与审核',
      '自然语言图片描述生成',
      '图片质量评估与色彩分析',
      'AI任务队列管理与状态监控'
    ]
  },
  {
    icon: '🔍',
    title: '向量搜索',
    description: '基于Qdrant的语义搜索引擎',
    features: [
      '以文搜图（自然语言查询）',
      '以图搜图（相似度匹配检索）',
      '1536维向量空间语义理解',
      '智能内容推荐算法',
      '向量数据验证与自动修复',
      '搜索阈值与精度配置'
    ]
  },
  {
    icon: '☁️',
    title: '多云存储',
    description: '灵活的多云存储架构',
    features: [
      '支持12+种主流云存储渠道',
      '阿里云OSS/腾讯云COS/AWS S3',
      'Cloudflare R2/Azure Blob/七牛云',
      '本地存储/FTP/SFTP/WebDAV',
      '动态切换默认存储渠道',
      '存储连通性测试与健康检查'
    ]
  },
  {
    icon: '🔗',
    title: '分享系统',
    description: '功能强大的内容分享机制',
    features: [
      '公开/私密/密码保护三种模式',
      '自定义过期策略与时效控制',
      '访客详细统计与数据分析',
      '作者个性化主页展示',
      'IP/域名/Referer访问控制',
      '动态URL防盗链保护机制'
    ]
  },
  {
    icon: '🏷️',
    title: '标签分类',
    description: '灵活的标签与分类体系',
    features: [
      '用户自定义标签创建与管理',
      '全局标签库统一维护',
      'AI自动标注与智能分类',
      '多维度分类体系构建',
      '标签批量应用与编辑',
      '标签搜索过滤与聚合统计'
    ]
  },
  {
    icon: '🛡️',
    title: '安全控制',
    description: '全方位的安全防护体系',
    features: [
      'IP白名单/黑名单访问控制',
      '域名限制与Referer检测',
      '游客上传次数与容量限制',
      'NSFW内容自动审核队列',
      '下载鉴权与防盗链机制',
      '访问日志审计与追踪'
    ]
  },
  {
    icon: '🎨',
    title: '图片处理',
    description: '专业的图片处理能力',
    features: [
      '智能压缩算法优化体积',
      'WebP格式自动转换',
      '多尺寸缩略图自动生成',
      '文字/图片水印灵活配置',
      '批量水印处理与应用',
      '图片质量智能调节'
    ]
  },
  {
    icon: '🎲',
    title: '随机API',
    description: '用户自主创建的随机图API',
    features: [
      '用户自主创建专属随机API',
      'API密钥自动生成与管理',
      '文件夹绑定或全部图片随机',
      'Redirect/Direct两种返回模式',
      '详细的调用统计与监控',
      'API启用/禁用灵活控制'
    ]
  },
  {
    icon: '👑',
    title: '企业管理',
    description: '功能完备的管理后台',
    features: [
      '用户管理（搜索/禁用/权限分配）',
      'NSFW内容审核队列',
      'WebSocket实时系统监控',
      'API Key统一管理',
      '存储渠道配置管理',
      '系统设置与批量配置'
    ]
  },
  {
    icon: '📊',
    title: '数据统计',
    description: '多维度数据分析与可视化',
    features: [
      '用户存储/上传/带宽统计',
      '文件下载与访问量统计',
      '分享访问量趋势分析',
      '热门文件排行榜',
      '实时流量监控大屏',
      '历史数据趋势图表展示'
    ]
  },
  {
    icon: '💬',
    title: '消息系统',
    description: '实时消息推送与通知',
    features: [
      '站内消息中心统一管理',
      'WebSocket实时推送',
      '消息模板灵活配置',
      '已读/未读状态管理',
      '消息分类与过滤',
      '消息提醒与通知设置'
    ]
  },
  {
    icon: '🔄',
    title: '带宽控制',
    description: '精细化的流量与并发管理',
    features: [
      '上传/下载带宽速率限制',
      '并发上传文件数控制',
      '实时流量统计与监控',
      '历史流量数据分析',
      '用户配额管理与分配',
      '带宽使用报表导出'
    ]
  },
  {
    icon: '🤖',
    title: '自动化任务',
    description: '灵活的任务调度系统',
    features: [
      '用户自定义任务创建',
      '定时任务调度（Cron表达式）',
      '任务队列管理与优先级',
      '任务执行状态监控',
      '失败自动重试机制',
      '任务执行日志详细追踪'
    ]
  }
]

// 获取GitHub数据
const fetchGitHubStats = async () => {
  try {
    // 获取仓库基本信息
    const repoResponse = await fetch('https://api.github.com/repos/CooperJiang/PixelPunk')
    if (!repoResponse.ok) {
      throw new Error('Failed to fetch repo data')
    }
    const repoData = await repoResponse.json()

    // 获取贡献者数量
    const contributorsResponse = await fetch('https://api.github.com/repos/CooperJiang/PixelPunk/contributors?per_page=1')
    const contributorsLink = contributorsResponse.headers.get('Link')
    let contributorsCount = 0

    if (contributorsLink) {
      const match = contributorsLink.match(/page=(\d+)>; rel="last"/)
      contributorsCount = match ? parseInt(match[1]) : 1
    } else {
      const contributors = await contributorsResponse.json()
      contributorsCount = contributors.length
    }

    // 格式化数字
    const formatNumber = (num: number) => {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+'
      }
      return num.toString()
    }

    githubStats.value = {
      stars: formatNumber(repoData.stargazers_count),
      forks: formatNumber(repoData.forks_count),
      contributors: contributorsCount + '+',
      watchers: formatNumber(repoData.subscribers_count)
    }
  } catch (error) {
    console.warn('Failed to fetch GitHub stats:', error)
    // 失败时显示友好提示
    githubStats.value = {
      stars: '1.2K+',
      forks: '230+',
      contributors: '45+',
      watchers: '180+'
    }
  }
}

const animateStats = () => {
  // 优化的数字动画，减少onUpdate频率
  stats.forEach((stat, index) => {
    gsap.to({ value: 0 }, {
      value: stat.target,
      duration: 1.5, // 缩短时间
      delay: index * 0.1, // 减少延迟
      ease: 'power2.out',
      onUpdate: function() {
        const value = Math.floor(this.targets()[0].value)
        animatedStats.value[index] = value + stat.suffix
      },
      callbackScope: this
    })
  })
}

// 功能模块轮播控制函数
const scrollModulesLeft = () => {
  if (modulesCarouselRef.value) {
    pauseModulesAutoScroll()
    const cardWidth = modulesCarouselRef.value.querySelector('.module-carousel-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = (cardWidth + gap) * modulesPerView.value

    modulesCarouselRef.value.scrollBy({
      left: -scrollDistance,
      behavior: 'smooth'
    })

    setTimeout(resumeModulesAutoScroll, 2000)
  }
}

const scrollModulesRight = () => {
  if (modulesCarouselRef.value) {
    pauseModulesAutoScroll()
    const cardWidth = modulesCarouselRef.value.querySelector('.module-carousel-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = (cardWidth + gap) * modulesPerView.value

    modulesCarouselRef.value.scrollBy({
      left: scrollDistance,
      behavior: 'smooth'
    })

    setTimeout(resumeModulesAutoScroll, 2000)
  }
}

const goToModulePage = (pageIndex: number) => {
  if (modulesCarouselRef.value) {
    pauseModulesAutoScroll()
    const cardWidth = modulesCarouselRef.value.querySelector('.module-carousel-card')?.clientWidth || 0
    const gap = 24
    const scrollDistance = (cardWidth + gap) * modulesPerView.value * pageIndex

    modulesCarouselRef.value.scrollTo({
      left: scrollDistance,
      behavior: 'smooth'
    })

    setTimeout(resumeModulesAutoScroll, 2000)
  }
}

const handleModulesScroll = () => {
  if (modulesCarouselRef.value) {
    const { scrollLeft, scrollWidth, clientWidth } = modulesCarouselRef.value
    const cardWidth = modulesCarouselRef.value.querySelector('.module-carousel-card')?.clientWidth || 0
    const gap = 24

    isModulesAtStart.value = scrollLeft <= 10
    isModulesAtEnd.value = scrollLeft >= scrollWidth - clientWidth - 10

    const cardPosition = (cardWidth + gap)
    currentModulePage.value = Math.round(scrollLeft / cardPosition / modulesPerView.value)
  }
}

// 自动滚动
const autoScrollModules = () => {
  if (!modulesCarouselRef.value || isModulesPaused.value) return

  const cardWidth = modulesCarouselRef.value.querySelector('.module-carousel-card')?.clientWidth || 0
  const gap = 24
  const { scrollLeft, scrollWidth, clientWidth } = modulesCarouselRef.value

  // 如果到达末尾，回到开始
  if (scrollLeft >= scrollWidth - clientWidth - 10) {
    modulesCarouselRef.value.scrollTo({
      left: 0,
      behavior: 'smooth'
    })
  } else {
    const scrollDistance = cardWidth + gap
    modulesCarouselRef.value.scrollBy({
      left: scrollDistance,
      behavior: 'smooth'
    })
  }
}

const startModulesAutoScroll = () => {
  if (modulesAutoScrollTimer.value) clearInterval(modulesAutoScrollTimer.value)
  modulesAutoScrollTimer.value = setInterval(autoScrollModules, 4000)
}

const stopModulesAutoScroll = () => {
  if (modulesAutoScrollTimer.value) {
    clearInterval(modulesAutoScrollTimer.value)
    modulesAutoScrollTimer.value = undefined
  }
}

const pauseModulesAutoScroll = () => {
  isModulesPaused.value = true
}

const resumeModulesAutoScroll = () => {
  isModulesPaused.value = false
}

// 响应式调整每页显示卡片数
const updateModulesPerView = () => {
  const width = window.innerWidth
  if (width >= 1280) {
    modulesPerView.value = 3
  } else if (width >= 768) {
    modulesPerView.value = 2
  } else {
    modulesPerView.value = 1
  }
}

onMounted(async () => {
  // 动态导入 ScrollTrigger 避免构建问题
  if (typeof window !== 'undefined') {
    // 获取GitHub数据
    fetchGitHubStats()

    // 初始化模块轮播
    updateModulesPerView()
    window.addEventListener('resize', updateModulesPerView)

    await nextTick()

    // 初始化滚动状态
    handleModulesScroll()

    // 启动自动滚动
    startModulesAutoScroll()

    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // 检查初始状态
      const elements = document.querySelectorAll('.stat-card, .tech-item, .module-carousel-card')
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight || document.documentElement.clientHeight

        // 如果元素已经在视口中或接近视口，直接显示
        if (rect.top < windowHeight * 0.85) {
          if (element.classList.contains('stat-card') || element.classList.contains('module-carousel-card')) {
            gsap.set(element, { opacity: 1, y: 0 })
          } else if (element.classList.contains('tech-item')) {
            gsap.set(element, { opacity: 1, scale: 1 })
          }
        } else {
          if (element.classList.contains('stat-card') || element.classList.contains('module-carousel-card')) {
            gsap.set(element, { opacity: 0, y: 20 })
          } else if (element.classList.contains('tech-item')) {
            gsap.set(element, { opacity: 0, scale: 0.9 })
          }
        }
      })

      // 合并所有ScrollTrigger到单一批处理
      ScrollTrigger.batch(['.stat-card', '.tech-item', '.module-carousel-card'], {
        onEnter: (elements) => {
          elements.forEach((element) => {
            if (element.classList.contains('stat-card')) {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
              })
            } else if (element.classList.contains('tech-item')) {
              gsap.to(element, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.5)'
              })
            } else if (element.classList.contains('module-carousel-card')) {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
              })
            }
          })
        },
        start: 'top 85%',
        once: true,
        refreshPriority: -3
      })

      // 数字动画触发
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 80%',
        onEnter: () => {
          animateStats()
        },
        once: true
      })

      // 刷新 ScrollTrigger
      ScrollTrigger.refresh()
    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
      // 失败时直接显示所有元素
      gsap.set('.stat-card', { opacity: 1, y: 0 })
      gsap.set('.tech-item', { opacity: 1, scale: 1 })
      gsap.set('.module-carousel-card', { opacity: 1, y: 0 })
      animateStats()
    }
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateModulesPerView)
  }
  stopModulesAutoScroll()
})
</script>

<style scoped>
.stat-card {
  position: relative;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px var(--cyber-shadow);
  backdrop-filter: blur(10px);
}

.stat-card:hover {
  border-color: var(--cyber-border-hover);
  box-shadow: 0 20px 60px var(--cyber-shadow), 0 0 20px var(--cyber-border);
}

.stat-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, var(--cyber-border), var(--cyber-border-hover));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-number {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-glow {
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  background: radial-gradient(circle at center, var(--cyber-border) 0%, transparent 70%);
}

.stat-card:hover .stat-glow {
  opacity: 1;
}

/* GitHub社区数据卡片 */
.github-card {
  position: relative;
  background: linear-gradient(135deg, var(--cyber-bg-primary) 0%, var(--cyber-bg-secondary) 100%);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  padding: 1.25rem 1rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px var(--cyber-shadow);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.github-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-light) 50%,
    var(--vp-c-brand) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.github-card:hover {
  border-color: var(--cyber-border-hover);
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 60px rgba(5, 217, 232, 0.2), 0 0 40px rgba(5, 217, 232, 0.1);
}

.github-card:hover::before {
  opacity: 1;
}

.github-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 0 8px currentColor);
  transition: transform 0.3s ease;
}

.github-card:hover .github-icon {
  transform: scale(1.15) rotate(8deg);
  animation: pulse-glow 1.5s ease-in-out infinite;
}

.github-number {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.github-label {
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@keyframes github-glow {
  0%, 100% {
    filter: drop-shadow(0 0 10px currentColor);
  }
  50% {
    filter: drop-shadow(0 0 20px currentColor);
  }
}

/* 技术栈容器 */
.tech-grid-container {
  position: relative;
  padding: 2rem;
  background:
    linear-gradient(90deg, var(--cyber-border) 1px, transparent 1px),
    linear-gradient(var(--cyber-border) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center;
  border-radius: 1rem;
  overflow: hidden;
}

.tech-grid-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    var(--cyber-bg-primary) 100%
  );
  pointer-events: none;
  opacity: 0.8;
}

.tech-grid {
  position: relative;
  z-index: 1;
}

.tech-item {
  background: linear-gradient(145deg,
    rgba(var(--cyber-bg-primary-rgb, 26, 29, 46), 0.6) 0%,
    rgba(var(--cyber-bg-secondary-rgb, 36, 39, 65), 0.4) 100%);
  border: 1.5px solid var(--cyber-border);
  border-radius: 0.75rem;
  padding: 1.25rem 0.875rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.15),
    0 0 20px rgba(0, 255, 136, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.tech-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--vp-c-brand) 50%,
    transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tech-item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(0, 255, 136, 0.08) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.tech-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-6px) scale(1.06);
  box-shadow:
    0 12px 30px rgba(0, 255, 136, 0.25),
    0 0 40px rgba(0, 255, 136, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.tech-item:hover::before {
  opacity: 1;
}

.tech-item:hover::after {
  opacity: 1;
}

.tech-icon {
  margin-bottom: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  position: relative;
  z-index: 1;
}

.tech-icon::before {
  content: '';
  position: absolute;
  inset: -8px;
  background: radial-gradient(circle, var(--vp-c-brand) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.tech-item:hover .tech-icon::before {
  opacity: 0.15;
  animation: icon-glow 2s ease-in-out infinite;
}

@keyframes icon-glow {
  0%, 100% {
    opacity: 0.15;
    transform: scale(1);
  }
  50% {
    opacity: 0.25;
    transform: scale(1.1);
  }
}

.tech-icon-img {
  width: 2.75rem;
  height: 2.75rem;
  object-fit: contain;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: grayscale(0.4) brightness(0.95);
}

.tech-item:hover .tech-icon-img {
  filter: grayscale(0) brightness(1.1) drop-shadow(0 0 12px currentColor);
  transform: scale(1.2) rotate(8deg);
}

.tech-name {
  font-size: 0.825rem;
  font-weight: 600;
  line-height: 1.3;
  position: relative;
  z-index: 1;
  letter-spacing: 0.01em;
  transition: all 0.3s ease;
}

.tech-item:hover .tech-name {
  color: var(--vp-c-brand) !important;
  transform: translateY(-2px);
}

/* 轮播容器样式 */
.modules-carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 1rem 0;
}

.modules-carousel-wrapper {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 60px;
}

.modules-carousel-wrapper::-webkit-scrollbar {
  display: none;
}

.modules-carousel-track {
  display: flex;
  gap: 1.5rem;
  min-width: 100%;
  padding: 1rem 0;
}

/* 导航按钮样式 */
.carousel-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.25), rgba(157, 76, 237, 0.25));
  border: 1px solid rgba(5, 217, 232, 0.4);
  border-radius: 50%;
  color: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.carousel-nav-btn:hover {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.35), rgba(157, 76, 237, 0.35));
  border-color: rgba(5, 217, 232, 0.6);
  box-shadow: 0 0 25px rgba(5, 217, 232, 0.4);
  transform: translateY(-50%) scale(1.05);
}

.carousel-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.nav-left {
  left: 10px;
}

.nav-right {
  right: 10px;
}

/* 进度指示器 */
.modules-carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.modules-carousel-indicators .indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cyber-border);
  cursor: pointer;
  transition: all 0.3s ease;
}

.modules-carousel-indicators .indicator.active {
  background: var(--vp-c-brand);
  width: 24px;
  border-radius: 4px;
}

.modules-carousel-indicators .indicator:hover {
  background: var(--vp-c-brand-light);
}

/* 轮播卡片样式 */
.module-carousel-card {
  flex: 0 0 calc(33.333% - 1rem);
  min-width: 320px;
  max-width: 400px;
  position: relative;
  background: linear-gradient(145deg, rgba(26, 29, 46, 0.95) 0%, rgba(36, 39, 65, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.25);
  border-radius: 1rem;
  padding: 1.75rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  overflow: hidden;
  box-shadow:
    0 8px 32px rgba(5, 217, 232, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 420px;
}

.module-carousel-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-light) 50%,
    var(--vp-c-brand) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.module-carousel-card:hover {
  border-color: rgba(5, 217, 232, 0.5);
  transform: translateY(-4px);
  box-shadow:
    0 20px 60px rgba(5, 217, 232, 0.15),
    0 0 40px rgba(5, 217, 232, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.module-carousel-card:hover::before {
  opacity: 1;
}

.module-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(5, 217, 232, 0.1);
}

.module-icon-wrapper {
  flex-shrink: 0;
}

.module-icon {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.15), rgba(157, 76, 237, 0.15));
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.1);
}

.module-card:hover .module-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 0 30px rgba(5, 217, 232, 0.3);
  border-color: rgba(5, 217, 232, 0.5);
}

.module-title-area {
  flex: 1;
  min-width: 0;
}

.module-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.375rem;
  line-height: 1.3;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand-lighter));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.01em;
}

.module-subtitle {
  font-size: 0.8125rem;
  line-height: 1.5;
  opacity: 0.85;
  font-weight: 400;
}

.module-features {
  margin-top: 0.5rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  transition: all 0.2s ease;
  padding: 0.25rem 0;
}

.feature-item:hover {
  padding-left: 0.25rem;
}

.feature-item:hover span {
  color: var(--cyber-text-primary) !important;
}

.feature-check {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
  color: var(--vp-c-brand);
  opacity: 0.8;
  transition: all 0.2s ease;
}

.feature-item:hover .feature-check {
  opacity: 1;
  transform: scale(1.1);
  filter: drop-shadow(0 0 4px var(--vp-c-brand));
}

.module-glow {
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    rgba(5, 217, 232, 0.08) 0%,
    rgba(157, 76, 237, 0.04) 50%,
    transparent 70%
  );
}

.module-card:hover .module-glow {
  opacity: 1;
}

/* 亮色主题特定样式 */
[data-theme="light"] .stats-section {
}

[data-theme="light"] .stat-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .stat-card:hover {
  box-shadow: 0 10px 40px var(--cyber-shadow), 0 0 20px var(--cyber-border);
}

[data-theme="light"] .stat-icon {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 2px 10px var(--cyber-shadow);
}

[data-theme="light"] .github-card {
  background: linear-gradient(135deg, var(--cyber-bg-secondary) 0%, var(--cyber-bg-primary) 100%);
  border: 1px solid var(--cyber-border-hover);
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

[data-theme="light"] .github-card:hover {
  box-shadow: 0 12px 40px var(--cyber-shadow), 0 0 30px rgba(5, 217, 232, 0.15);
}

[data-theme="light"] .tech-item {
  background: linear-gradient(145deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(245, 247, 250, 0.9) 100%);
  border: 1.5px solid rgba(5, 217, 232, 0.2);
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.08),
    0 0 20px rgba(5, 217, 232, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

[data-theme="light"] .tech-item:hover {
  box-shadow:
    0 12px 30px rgba(5, 217, 232, 0.2),
    0 0 40px rgba(5, 217, 232, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 1);
  border-color: var(--vp-c-brand);
}

[data-theme="light"] .tech-icon-img {
  filter: grayscale(0.3) brightness(0.92);
}

[data-theme="light"] .tech-item:hover .tech-icon-img {
  filter: grayscale(0) brightness(1.05) drop-shadow(0 0 10px rgba(5, 217, 232, 0.4));
}

[data-theme="light"] .tech-item::after {
  background: radial-gradient(
    circle at center,
    rgba(5, 217, 232, 0.06) 0%,
    transparent 70%
  );
}

[data-theme="light"] .tech-grid-container {
  background:
    linear-gradient(90deg, rgba(5, 217, 232, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(5, 217, 232, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
}

[data-theme="light"] .tech-grid-container::before {
  background: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    rgba(255, 255, 255, 0.95) 100%
  );
}

[data-theme="light"] .module-carousel-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.9) 100%);
  border: 1px solid rgba(5, 217, 232, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

[data-theme="light"] .module-carousel-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 0 30px rgba(5, 217, 232, 0.1);
}

[data-theme="light"] .carousel-nav-btn {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.15), rgba(157, 76, 237, 0.15));
  border-color: rgba(5, 217, 232, 0.3);
}

[data-theme="light"] .carousel-nav-btn:hover {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.25), rgba(157, 76, 237, 0.25));
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.25);
}

[data-theme="light"] .module-icon {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.1), rgba(157, 76, 237, 0.1));
  border-color: rgba(5, 217, 232, 0.25);
}

[data-theme="light"] .module-glow {
  background: radial-gradient(
    circle at center,
    rgba(5, 217, 232, 0.05) 0%,
    rgba(157, 76, 237, 0.02) 50%,
    transparent 70%
  );
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-grid {
    @apply grid-cols-2 gap-4;
  }

  .stat-card {
    @apply p-4;
  }

  .stat-icon {
    @apply w-12 h-12;
  }

  .stat-number {
    @apply text-2xl;
  }

  .tech-grid-container {
    padding: 1.25rem !important;
    background-size: 30px 30px !important;
  }

  .tech-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 0.875rem !important;
  }

  .tech-item {
    padding: 1rem 0.625rem !important;
    border-radius: 0.625rem !important;
  }

  .tech-icon {
    height: 2.75rem !important;
    margin-bottom: 0.625rem !important;
  }

  .tech-icon-img {
    width: 2.25rem !important;
    height: 2.25rem !important;
  }

  .tech-item:hover .tech-icon-img {
    transform: scale(1.15) rotate(5deg) !important;
  }

  .tech-name {
    font-size: 0.725rem !important;
    line-height: 1.25 !important;
  }

  .modules-carousel-wrapper {
    padding: 0 50px;
  }

  .module-carousel-card {
    flex: 0 0 calc(100% - 1rem);
    min-width: 280px;
    padding: 1.25rem;
  }

  .carousel-nav-btn {
    width: 40px;
    height: 40px;
  }

  .nav-left {
    left: 5px;
  }

  .nav-right {
    right: 5px;
  }

  .module-icon {
    width: 2.75rem;
    height: 2.75rem;
    font-size: 1.5rem;
  }

  .module-title {
    font-size: 1.125rem;
  }

  .module-subtitle {
    font-size: 0.75rem;
  }

  .feature-item {
    font-size: 0.75rem;
  }

  .feature-check {
    width: 0.875rem;
    height: 0.875rem;
  }
}

@media (max-width: 1279px) {
  .module-carousel-card {
    flex: 0 0 calc(50% - 0.75rem);
    min-width: 280px;
  }
}

/* 标题间距样式 */
.section-title {
  margin-bottom: 2rem !important;
}
</style>