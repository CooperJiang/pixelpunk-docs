<template>
  <div class="download-page-container">
    <!-- 页面头部 -->
    <div class="download-header">
      <div class="header-bg absolute inset-0">
        <div class="grid-overlay"></div>
        <div class="gradient-overlay"></div>
      </div>

      <div class="header-content relative z-10 container mx-auto px-4 py-16 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
          下载安装
        </h1>

        <p class="text-lg max-w-2xl mx-auto opacity-90">
          选择最适合你的部署方式，快速启动 PixelPunk AI 智能图床
        </p>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="download-content container mx-auto px-4 py-16">
      <div class="content-wrapper">
        <!-- 推荐部署方式 -->
        <div class="status-card">
          <div class="card-content">

            <div class="features-coming-soon">
              <div class="feature-item featured">
                <div class="feature-icon">🐳</div>
                <div class="feature-info">
                  <h3>Docker Compose 部署</h3>
                  <p>一键启动所有服务，包含所有依赖（推荐）</p>
                  <div class="install-command">
                    <code>curl -fsSL https://download.pixelpunk.cc/shell/docker-install.sh | bash</code>
                    <button
                      class="copy-btn"
                      :class="{ 'copied': copiedCommand === 'curl -fsSL https://download.pixelpunk.cc/shell/docker-install.sh | bash' }"
                      @click="copyCommand('curl -fsSL https://download.pixelpunk.cc/shell/docker-install.sh | bash')"
                      :title="copiedCommand === 'curl -fsSL https://download.pixelpunk.cc/shell/docker-install.sh | bash' ? '已复制！' : '复制命令'">
                      <span class="copy-icon">{{ copiedCommand === 'curl -fsSL https://download.pixelpunk.cc/shell/docker-install.sh | bash' ? '✓' : '📋' }}</span>
                    </button>
                  </div>
                </div>
                <div class="feature-status available">推荐</div>
              </div>

              <div class="feature-item">
                <div class="feature-icon">📦</div>
                <div class="feature-info">
                  <h3>安装包部署</h3>
                  <p>支持 Linux、macOS、Windows 全平台</p>
                  <div class="install-command">
                    <code>curl -fsSL https://download.pixelpunk.cc/shell/install.sh | bash</code>
                    <button
                      class="copy-btn"
                      :class="{ 'copied': copiedCommand === 'curl -fsSL https://download.pixelpunk.cc/shell/install.sh | bash' }"
                      @click="copyCommand('curl -fsSL https://download.pixelpunk.cc/shell/install.sh | bash')"
                      :title="copiedCommand === 'curl -fsSL https://download.pixelpunk.cc/shell/install.sh | bash' ? '已复制！' : '复制命令'">
                      <span class="copy-icon">{{ copiedCommand === 'curl -fsSL https://download.pixelpunk.cc/shell/install.sh | bash' ? '✓' : '📋' }}</span>
                    </button>
                  </div>
                </div>
                <div class="feature-status available">全平台</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 详细安装指南 -->
        <div class="installation-methods">
          <h3 class="section-title">详细安装指南</h3>

          <div class="method-cards">
            <!-- Docker Compose 部署 -->
            <div class="method-card">
              <div class="method-header">
                <span class="method-icon">🐳</span>
                <h4>Docker Compose 部署（推荐）</h4>
              </div>
              <div class="method-body">
                <p class="method-description">
                  使用 Docker Compose 一键部署，自动配置所有依赖服务（PixelPunk + MySQL + Qdrant + Redis），支持多架构（amd64/arm64/armv7）。
                </p>

                <h5 class="method-step-title">📌 方式一：一键安装（推荐）</h5>
                <div class="method-code">
                  <pre><code># 使用 curl
curl -fsSL https://download.pixelpunk.cc/shell/docker-install.sh | bash

# 或使用 wget
wget -qO- https://download.pixelpunk.cc/shell/docker-install.sh | bash</code></pre>
                </div>
                <p class="method-note">
                  ✨ 安装脚本会自动检测依赖、下载配置、创建目录并启动服务，支持交互式配置端口和数据目录。
                </p>

                <h5 class="method-step-title">📌 方式二：手动部署</h5>
                <div class="method-code">
                  <pre><code># 1. 下载配置文件
curl -O https://download.pixelpunk.cc/docker/docker-compose.yml

# 2. 启动服务
docker-compose up -d

# 3. 访问应用
open http://localhost:9520</code></pre>
                </div>
                <p class="method-note">
                  💡 首次启动会自动创建所需的数据目录并生成配置文件。
                </p>

                <h5 class="method-step-title">⚙️ 环境变量配置</h5>
                <p class="method-note">
                  支持通过环境变量自定义端口和目录：
                </p>
                <div class="method-code">
                  <pre><code># 自定义端口
PORT=8080 docker-compose up -d

# 自定义数据目录
DATA_DIR=/mnt/storage docker-compose up -d

# 组合配置
PORT=8080 DATA_DIR=/mnt/storage MYSQL_PORT=3307 docker-compose up -d</code></pre>
                </div>

                <div class="method-features">
                  <div class="feature-badge">✓ 开箱即用</div>
                  <div class="feature-badge">✓ 自动配置依赖</div>
                  <div class="feature-badge">✓ 多架构支持</div>
                  <div class="feature-badge">✓ 环境变量配置</div>
                  <div class="feature-badge">✓ 服务健康检查</div>
                  <div class="feature-badge">✓ 易于管理</div>
                </div>
              </div>
            </div>

            <!-- 安装包部署 -->
            <div class="method-card">
              <div class="method-header">
                <span class="method-icon">📦</span>
                <h4>安装包部署</h4>
              </div>
              <div class="method-body">
                <p class="method-description">
                  适合需要自定义部署环境的场景，支持 Linux、macOS、Windows 平台。0 配置设计，无需手动编辑配置文件。
                </p>

                <h5 class="method-step-title">📌 一键安装脚本（推荐）</h5>
                <div class="method-code">
                  <pre><code># Linux / macOS
curl -fsSL https://download.pixelpunk.cc/shell/install.sh | bash

# 或使用 wget
wget -qO- https://download.pixelpunk.cc/shell/install.sh | bash</code></pre>
                </div>
                <p class="method-note">
                  ✨ 安装脚本会自动下载对应平台的安装包并完成安装配置。
                </p>

                <h5 class="method-step-title">📥 手动下载安装</h5>
                <div class="platform-downloads">
                  <a href="https://download.pixelpunk.cc/release/" class="platform-link" target="_blank">
                    <span class="platform-icon">🐧</span>
                    <span class="platform-name">Linux</span>
                    <span class="platform-arch">x86_64 / ARM64</span>
                  </a>
                  <a href="https://download.pixelpunk.cc/release/" class="platform-link" target="_blank">
                    <span class="platform-icon">🍎</span>
                    <span class="platform-name">macOS</span>
                    <span class="platform-arch">Intel / Apple Silicon</span>
                  </a>
                  <a href="https://download.pixelpunk.cc/release/" class="platform-link" target="_blank">
                    <span class="platform-icon">🪟</span>
                    <span class="platform-name">Windows</span>
                    <span class="platform-arch">x86_64</span>
                  </a>
                </div>

                <h5 class="method-step-title">📋 安装步骤</h5>
                <div class="method-code">
                  <pre><code># Linux / macOS
# 1. 解压安装包
tar -xzf pixelpunk-linux-amd64-VERSION.tar.gz
cd pixelpunk

# 2. 运行安装脚本
chmod +x install.sh
./install.sh

# Windows
# 1. 解压 ZIP 文件到目标目录
# 2. 双击运行 install.bat 或 pixelpunk.exe</code></pre>
                </div>

                <p class="method-note">
                  💡 首次运行会自动生成配置文件并进入 Setup 安装向导，按提示完成初始化即可。
                </p>

                <div class="method-features">
                  <div class="feature-badge">✓ 全平台支持</div>
                  <div class="feature-badge">✓ 0 配置设计</div>
                  <div class="feature-badge">✓ 自动初始化</div>
                  <div class="feature-badge">✓ 灵活部署</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 环境变量配置 -->
        <div class="env-vars-section">
          <h3 class="section-title">Docker Compose 环境变量</h3>
          <p class="section-description">
            Docker Compose 部署支持通过环境变量自定义配置，所有变量都有默认值，可按需覆盖。
          </p>

          <div class="env-table-container">
            <table class="env-table">
              <thead>
                <tr>
                  <th>环境变量</th>
                  <th>说明</th>
                  <th>默认值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>PORT</code></td>
                  <td>PixelPunk 主应用端口</td>
                  <td><code>9520</code></td>
                </tr>
                <tr>
                  <td><code>MYSQL_PORT</code></td>
                  <td>MySQL 数据库端口</td>
                  <td><code>3306</code></td>
                </tr>
                <tr>
                  <td><code>QDRANT_PORT</code></td>
                  <td>Qdrant HTTP 端口</td>
                  <td><code>6333</code></td>
                </tr>
                <tr>
                  <td><code>QDRANT_GRPC_PORT</code></td>
                  <td>Qdrant gRPC 端口</td>
                  <td><code>6334</code></td>
                </tr>
                <tr>
                  <td><code>REDIS_PORT</code></td>
                  <td>Redis 缓存端口</td>
                  <td><code>6379</code></td>
                </tr>
                <tr>
                  <td><code>DATA_DIR</code></td>
                  <td>数据存储目录</td>
                  <td><code>./data</code></td>
                </tr>
                <tr>
                  <td><code>LOGS_DIR</code></td>
                  <td>日志存储目录</td>
                  <td><code>./logs</code></td>
                </tr>
                <tr>
                  <td><code>UPLOADS_DIR</code></td>
                  <td>上传文件目录</td>
                  <td><code>./uploads</code></td>
                </tr>
                <tr>
                  <td><code>MYSQL_DATA_DIR</code></td>
                  <td>MySQL 数据目录</td>
                  <td><code>./data/mysql</code></td>
                </tr>
                <tr>
                  <td><code>QDRANT_DATA_DIR</code></td>
                  <td>Qdrant 数据目录</td>
                  <td><code>./data/qdrant</code></td>
                </tr>
                <tr>
                  <td><code>REDIS_DATA_DIR</code></td>
                  <td>Redis 数据目录</td>
                  <td><code>./data/redis</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="env-examples">
            <h4 class="examples-title">使用示例</h4>
            <div class="example-cards">
              <div class="example-card">
                <div class="example-header">
                  <span class="example-icon">🔧</span>
                  <h5>自定义端口</h5>
                </div>
                <div class="method-code">
                  <pre><code>PORT=8080 docker-compose up -d</code></pre>
                </div>
              </div>

              <div class="example-card">
                <div class="example-header">
                  <span class="example-icon">📁</span>
                  <h5>自定义数据目录</h5>
                </div>
                <div class="method-code">
                  <pre><code>DATA_DIR=/mnt/storage docker-compose up -d</code></pre>
                </div>
              </div>

              <div class="example-card">
                <div class="example-header">
                  <span class="example-icon">⚙️</span>
                  <h5>多个配置组合</h5>
                </div>
                <div class="method-code">
                  <pre><code>PORT=8080 DATA_DIR=/mnt/storage MYSQL_PORT=3307 docker-compose up -d</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Docker 多架构支持 -->
        <div class="docker-arch-section">
          <h3 class="section-title">Docker 多架构支持</h3>
          <p class="section-description">
            PixelPunk Docker 镜像支持多架构，自动适配您的系统，无需手动指定。
          </p>

          <div class="arch-cards">
            <div class="arch-card">
              <div class="arch-icon">💻</div>
              <h4>linux/amd64</h4>
              <p>Intel/AMD 64位</p>
              <div class="arch-devices">服务器、PC、云主机</div>
            </div>

            <div class="arch-card">
              <div class="arch-icon">🍎</div>
              <h4>linux/arm64</h4>
              <p>ARM 64位</p>
              <div class="arch-devices">树莓派 4、Mac M1/M2、ARM 服务器</div>
            </div>

            <div class="arch-card">
              <div class="arch-icon">🔧</div>
              <h4>linux/arm/v7</h4>
              <p>ARM 32位</p>
              <div class="arch-devices">树莓派 3、旧版 ARM 设备</div>
            </div>
          </div>

          <div class="docker-info">
            <div class="info-item">
              <span class="info-label">镜像仓库：</span>
              <code>snine98/pixelpunk</code>
            </div>
            <div class="info-item">
              <span class="info-label">Docker Hub：</span>
              <a href="https://hub.docker.com/r/snine98/pixelpunk" target="_blank">
                https://hub.docker.com/r/snine98/pixelpunk
              </a>
            </div>
            <div class="info-item">
              <span class="info-label">镜像大小：</span>
              <code>117MB</code>
            </div>
          </div>
        </div>

        <!-- 系统要求 -->
        <div class="requirements-section">
          <h3 class="section-title">系统要求</h3>
          <div class="requirements-grid">
            <div class="requirement-card">
              <div class="req-icon">💻</div>
              <h4>最低配置</h4>
              <ul class="req-list">
                <li>CPU: 1 核</li>
                <li>内存: 512MB</li>
                <li>磁盘: 1GB</li>
                <li>网络: 1Mbps</li>
              </ul>
            </div>
            <div class="requirement-card highlighted">
              <div class="req-icon">🚀</div>
              <h4>推荐配置</h4>
              <ul class="req-list">
                <li>CPU: 2 核或更多</li>
                <li>内存: 2GB 或更多</li>
                <li>磁盘: 20GB 或更多</li>
                <li>网络: 10Mbps 或更快</li>
              </ul>
            </div>
            <div class="requirement-card">
              <div class="req-icon">🔧</div>
              <h4>依赖服务</h4>
              <ul class="req-list">
                <li>MySQL 8.0+ 或 SQLite</li>
                <li>Qdrant 向量数据库</li>
                <li>Redis 缓存（可选）</li>
                <li style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--cyber-border); color: var(--vp-c-brand);">Docker 模式自动配置</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 相关链接 -->
        <div class="follow-section">
          <div class="follow-card">
            <h3 class="follow-title">更多资源</h3>
            <p class="follow-description">
              获取更多帮助和技术支持
            </p>

            <div class="follow-actions">
              <a href="https://github.com/CooperJiang/PixelPunk-v1" class="follow-btn primary" target="_blank">
                <span class="btn-icon">⭐</span>
                <span>GitHub 仓库</span>
              </a>

              <a href="https://v1.pixelpunk.cc/" class="follow-btn secondary" target="_blank">
                <span class="btn-icon">🎮</span>
                <span>在线体验</span>
              </a>

              <a href="/docs/introduction" class="follow-btn secondary">
                <span class="btn-icon">📖</span>
                <span>完整文档</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// 复制状态管理
const copiedCommand = ref<string | null>(null)

// 复制命令到剪贴板
const copyCommand = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedCommand.value = text

    // 2秒后重置状态
    setTimeout(() => {
      copiedCommand.value = null
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

onMounted(async () => {
  // 动态导入 ScrollTrigger 避免构建问题
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // 状态卡片动画
      gsap.set('.status-card', { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: '.status-card',
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.status-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
        }
      })

      // 安装方式卡片动画
      gsap.set('.method-card', { opacity: 0, y: 30 })

      ScrollTrigger.batch('.method-card', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15
          })
        },
        start: 'top 85%'
      })

      // 系统要求卡片动画
      gsap.set('.requirement-card', { opacity: 0, scale: 0.95 })

      ScrollTrigger.batch('.requirement-card', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.2)',
            stagger: 0.1
          })
        },
        start: 'top 85%'
      })

    } catch (error) {
      console.warn('ScrollTrigger loading failed:', error)
    }
  }
})
</script>

<style scoped>
.download-page-container {
  min-height: 100vh;
  background: var(--cyber-bg-primary);
}

/* 页面头部 */
.download-header {
  position: relative;
  background: linear-gradient(135deg, var(--cyber-bg-primary) 0%, var(--cyber-bg-secondary) 100%);
  overflow: hidden;
}

.header-bg {
  opacity: 0.1;
}

.grid-overlay {
  background-image:
    linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

.gradient-overlay {
  background: radial-gradient(circle at 30% 60%, var(--cyber-border) 0%, transparent 50%);
  animation: gradient-pulse 8s ease-in-out infinite;
}

@keyframes grid-move {
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}

@keyframes gradient-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.gradient-text {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light), var(--vp-c-brand-lighter));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* 主要内容 */
.download-content {
  max-width: 1200px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* 状态卡片 */
.status-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.header-icon {
  font-size: 2rem;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin: 0;
}

.card-description {
  color: var(--cyber-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* 功能特性 */
.features-coming-soon {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.feature-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.25rem;
  background: linear-gradient(135deg, var(--cyber-bg-primary) 0%, rgba(0, 255, 136, 0.02) 100%);
  border: 1.5px solid var(--cyber-border);
  border-radius: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 220px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.feature-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 100% 0%, rgba(0, 255, 136, 0.05), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.feature-item.featured {
  border-color: rgba(0, 255, 136, 0.4);
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, var(--cyber-bg-primary) 100%);
  box-shadow: 0 6px 24px rgba(0, 255, 136, 0.15);
}

.feature-item.featured::before {
  opacity: 1;
}

.feature-item.featured::after {
  opacity: 1;
}

.feature-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 16px 48px rgba(0, 255, 136, 0.25);
}

.feature-item:hover::before {
  opacity: 1;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light), var(--vp-c-brand));
}

.feature-item:hover::after {
  opacity: 1;
}

.feature-icon {
  font-size: 2.75rem;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 8px rgba(0, 255, 136, 0.3));
}

.feature-info {
  flex: 1;
}

.feature-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--cyber-text-primary);
  margin: 0 0 0.625rem 0;
  letter-spacing: 0.3px;
}

.feature-info p {
  font-size: 0.938rem;
  color: var(--cyber-text-secondary);
  margin: 0 0 0.875rem 0;
  line-height: 1.6;
}

.install-command {
  margin-top: 0.875rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.install-command code {
  flex: 1;
  padding: 0.875rem 1rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 0.625rem;
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover .install-command code {
  border-color: var(--vp-c-brand);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2), 0 0 12px rgba(0, 255, 136, 0.15);
}

.copy-btn {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cyber-bg-secondary);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.copy-btn:hover {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
}

.copy-btn:active {
  transform: scale(0.95);
}

.copy-icon {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.copy-btn:hover .copy-icon {
  transform: scale(1.1);
}

.copy-btn.copied {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 16px rgba(0, 255, 136, 0.5);
}

.copy-btn.copied .copy-icon {
  color: var(--cyber-bg-primary);
  font-weight: bold;
}

.feature-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.813rem;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
}

.feature-status.available {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.15));
  color: #10b981;
  border: 1.5px solid rgba(16, 185, 129, 0.5);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

/* 安装方式 */
.installation-methods {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin: 0 0 2rem 0;
  text-align: center;
}

.method-cards {
  display: grid;
  gap: 2rem;
}

.method-card {
  position: relative;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.method-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 32px var(--cyber-shadow);
}

.method-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--cyber-bg-primary);
  border-bottom: 1px solid var(--cyber-border);
}

.method-icon {
  font-size: 1.8rem;
}

.method-header h4 {
  flex: 1;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
}

.method-body {
  padding: 1.5rem;
}

.method-description {
  color: var(--cyber-text-secondary);
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}

.method-step-title {
  margin: 1.75rem 0 0.875rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.method-step-title:first-of-type {
  margin-top: 1.25rem;
}

.method-note {
  color: var(--cyber-text-secondary);
  margin: 0.75rem 0;
  padding: 0.875rem 1.125rem;
  background: rgba(0, 255, 136, 0.05);
  border-left: 3px solid var(--vp-c-brand);
  border-radius: 0.375rem;
  font-size: 0.938rem;
  line-height: 1.6;
}

.method-code {
  margin: 0.875rem 0 1.25rem 0;
}

.method-code pre {
  margin: 0;
  padding: 1.25rem;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.75rem;
  overflow-x: auto;
}

.method-code code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  line-height: 1.6;
}

.method-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.feature-badge {
  padding: 0.5rem 1rem;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--cyber-text-secondary);
}

/* 平台下载链接 */
.platform-downloads {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.platform-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.platform-link:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--cyber-shadow);
}

.platform-icon {
  font-size: 2rem;
}

.platform-name {
  font-weight: 600;
  color: var(--cyber-text-primary);
  font-size: 1rem;
}

.platform-arch {
  font-size: 0.813rem;
  color: var(--cyber-text-secondary);
}

/* 环境变量配置 */
.env-vars-section {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px var(--cyber-shadow);
}

.section-description {
  color: var(--cyber-text-secondary);
  text-align: center;
  margin: -1rem auto 2rem;
  max-width: 800px;
  line-height: 1.6;
}

.env-table-container {
  overflow-x: auto;
  margin: 2rem 0;
  border-radius: 1rem;
  border: 1px solid var(--cyber-border);
}

.env-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--cyber-bg-primary);
}

.env-table thead {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05));
  border-bottom: 2px solid var(--vp-c-brand);
}

.env-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: var(--cyber-text-primary);
  font-size: 0.938rem;
  letter-spacing: 0.3px;
}

.env-table tbody tr {
  border-bottom: 1px solid var(--cyber-border);
  transition: background 0.3s ease;
}

.env-table tbody tr:hover {
  background: rgba(0, 255, 136, 0.05);
}

.env-table tbody tr:last-child {
  border-bottom: none;
}

.env-table td {
  padding: 1rem 1.5rem;
  color: var(--cyber-text-secondary);
  font-size: 0.938rem;
}

.env-table td:first-child {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.env-table code {
  padding: 0.25rem 0.5rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  font-family: 'JetBrains Mono', monospace;
}

.env-examples {
  margin-top: 2.5rem;
}

.examples-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.example-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.example-card {
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.875rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.example-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 24px var(--cyber-shadow);
}

.example-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.08), rgba(0, 255, 136, 0.03));
  border-bottom: 1px solid var(--cyber-border);
}

.example-icon {
  font-size: 1.5rem;
}

.example-header h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--cyber-text-primary);
}

.example-card .method-code {
  margin: 0;
}

.example-card .method-code pre {
  border: none;
  border-radius: 0;
  margin: 0;
}

/* Docker 多架构支持 */
.docker-arch-section {
  margin-top: 3rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, var(--cyber-bg-secondary) 0%, rgba(0, 255, 136, 0.02) 100%);
  border: 1px solid var(--cyber-border);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px var(--cyber-shadow);
}

.arch-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.arch-card {
  position: relative;
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--cyber-bg-primary);
  border: 1.5px solid var(--cyber-border);
  border-radius: 1.125rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.arch-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--cyber-border), transparent);
  transition: background 0.4s ease;
}

.arch-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 255, 136, 0.2);
}

.arch-card:hover::before {
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light), var(--vp-c-brand));
}

.arch-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 12px rgba(0, 255, 136, 0.3));
  transition: transform 0.4s ease;
}

.arch-card:hover .arch-icon {
  transform: scale(1.1) rotate(5deg);
}

.arch-card h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  font-family: 'JetBrains Mono', monospace;
}

.arch-card p {
  margin: 0 0 1rem 0;
  color: var(--cyber-text-secondary);
  font-size: 0.938rem;
}

.arch-devices {
  padding: 0.625rem 1rem;
  background: rgba(0, 255, 136, 0.08);
  border: 1px solid var(--cyber-border);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--cyber-text-secondary);
  line-height: 1.5;
}

.docker-info {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--cyber-bg-primary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.938rem;
}

.info-label {
  color: var(--cyber-text-secondary);
  font-weight: 500;
  min-width: 120px;
}

.info-item code {
  padding: 0.375rem 0.75rem;
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 0.375rem;
  color: var(--vp-c-brand);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
}

.info-item a {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: all 0.3s ease;
}

.info-item a:hover {
  color: var(--vp-c-brand-light);
  text-decoration: underline;
}

/* 系统要求 */
.requirements-section {
  margin-top: 3rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, var(--cyber-bg-secondary) 0%, rgba(0, 255, 136, 0.03) 100%);
  border: 1px solid var(--cyber-border);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px var(--cyber-shadow);
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.requirement-card {
  position: relative;
  padding: 2.25rem 2rem;
  background: var(--cyber-bg-primary);
  border: 1.5px solid var(--cyber-border);
  border-radius: 1.25rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.requirement-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--cyber-border), transparent);
  transition: background 0.4s ease;
}

.requirement-card.highlighted {
  border-color: var(--vp-c-brand);
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.08) 0%, var(--cyber-bg-primary) 100%);
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.15);
}

.requirement-card.highlighted::before {
  background: linear-gradient(90deg, transparent, var(--vp-c-brand), transparent);
}

.requirement-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 12px 48px rgba(0, 255, 136, 0.2);
}

.requirement-card:hover::before {
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light), var(--vp-c-brand));
}

.req-icon {
  font-size: 3rem;
  margin-bottom: 1.25rem;
  filter: drop-shadow(0 4px 12px rgba(0, 255, 136, 0.3));
  transition: transform 0.4s ease;
}

.requirement-card:hover .req-icon {
  transform: scale(1.1) rotate(5deg);
}

.requirement-card h4 {
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--cyber-text-primary);
  letter-spacing: 0.5px;
}

.requirement-card.highlighted h4 {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.req-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  background: var(--cyber-bg-secondary);
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--cyber-border);
}

.req-list li {
  padding: 0.75rem 1rem;
  color: var(--cyber-text-secondary);
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  transition: all 0.3s ease;
  font-size: 0.938rem;
  position: relative;
  padding-left: 2rem;
}

.req-list li::before {
  content: '▸';
  position: absolute;
  left: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: bold;
  transition: transform 0.3s ease;
}

.req-list li:hover {
  color: var(--cyber-text-primary);
  padding-left: 2.25rem;
  background: rgba(0, 255, 136, 0.05);
}

.req-list li:hover::before {
  transform: translateX(3px);
}

.req-list li:last-child {
  border-bottom: none;
}

/* 关注我们 */
.follow-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.follow-card {
  background: var(--cyber-bg-secondary);
  border: 1px solid var(--cyber-border);
  border-radius: 1.5rem;
  padding: 2.5rem;
  text-align: center;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 4px 20px var(--cyber-shadow);
}

.follow-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--cyber-text-primary);
  margin: 0 0 1rem 0;
}

.follow-description {
  color: var(--cyber-text-secondary);
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.follow-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.follow-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
}

.follow-btn.primary {
  background: var(--vp-c-brand);
  color: var(--cyber-bg-primary);
  border: 1px solid var(--vp-c-brand);
}

.follow-btn.primary:hover {
  background: var(--vp-c-brand-light);
  box-shadow: 0 0 20px var(--vp-c-brand);
  transform: translateY(-2px);
}

.follow-btn.secondary {
  background: transparent;
  color: var(--cyber-text-primary);
  border: 1px solid var(--cyber-border-hover);
}

.follow-btn.secondary:hover {
  background: var(--cyber-border);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .download-content {
    padding: 2rem 1rem;
  }

  .status-card,
  .follow-card {
    padding: 1.5rem;
  }

  .features-coming-soon {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .feature-item {
    padding: 1.75rem;
    min-height: auto;
  }

  .feature-status {
    position: static;
    margin-top: 0.75rem;
    display: inline-block;
  }

  .install-command code {
    font-size: 0.75rem;
    overflow-x: auto;
  }

  .copy-btn {
    width: 36px;
    height: 36px;
  }

  .method-cards {
    gap: 1.5rem;
  }

  .method-step-title {
    font-size: 1rem;
    margin: 1.5rem 0 0.75rem 0;
  }

  .method-note {
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
  }

  .platform-downloads {
    grid-template-columns: 1fr;
  }

  .requirements-section {
    padding: 1.5rem;
  }

  .requirements-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .requirement-card {
    padding: 1.75rem 1.5rem;
  }

  .follow-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .follow-btn {
    width: 100%;
  }

  .env-vars-section,
  .docker-arch-section {
    padding: 1.5rem;
  }

  .env-table-container {
    margin: 1.5rem -1.5rem;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  .env-table th,
  .env-table td {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }

  .example-cards {
    grid-template-columns: 1fr;
  }

  .arch-cards {
    grid-template-columns: 1fr;
  }

  .docker-info {
    padding: 1rem;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .info-label {
    min-width: auto;
  }
}
</style>
