# 快速开始

本指南将帮助你在 5 分钟内快速部署 PixelPunk，0 配置部署，开箱即用。

## 环境要求

根据你选择的部署方式，需要满足以下要求之一：

### Docker Compose 部署（推荐）

- **Docker**: 20.10.0+
- **Docker Compose**: 2.0.0+
- **内存**: 建议 2GB 以上
- **磁盘**: 建议 10GB 以上可用空间

::: tip 自动配置
Docker Compose 模式会自动配置所有依赖服务（MySQL、Qdrant、Redis），无需额外安装。
:::

### 安装包部署

- **操作系统**: Linux (x86_64/ARM64)、macOS (Intel/Apple Silicon) 或 Windows (x86_64)
- **内存**: 建议 1GB 以上
- **磁盘**: 建议 5GB 以上可用空间

::: tip 0 配置设计
安装包模式会在首次运行时自动生成配置文件，并通过 Web 安装向导完成初始化，无需手动编辑任何配置文件。
:::

## 快速安装

PixelPunk 采用 **0 配置设计**，部署阶段无需任何配置文件，所有设置都在首次访问时通过 Web 安装向导完成。

### 方式一：Docker Compose（推荐）

Docker Compose 会自动启动所有必需的服务，包括 PixelPunk、MySQL、Redis 和 Qdrant。

**一键安装（推荐）：**

```bash
# 使用 curl
curl -fsSL https://download.pixelpunk.cc/shell/docker-install.sh | bash

# 或使用 wget
wget -qO- https://download.pixelpunk.cc/shell/docker-install.sh | bash
```

安装脚本会自动：
- ✅ 检测 Docker 和 Docker Compose 环境
- ✅ 下载 docker-compose.yml 配置文件
- ✅ 交互式配置端口和数据目录（都有默认值，可直接回车）
- ✅ 自动创建所需目录
- ✅ 启动所有服务并等待就绪
- ✅ 显示访问地址

**手动部署：**

如果你需要手动控制部署过程：

```bash
# 1. 下载配置文件
curl -O https://download.pixelpunk.cc/docker/docker-compose.yml

# 2. 启动服务（首次启动会自动创建目录和配置）
docker-compose up -d

# 3. 访问应用
open http://localhost:9520
```

各组件默认端口如下（可通过环境变量调整）：
- **PixelPunk 主服务**: `9520`
- **MySQL**: `3306`
- **Redis**: `6379`
- **Qdrant**: `6333`

::: tip 环境变量配置
Docker Compose 支持通过环境变量自定义端口和目录：
```bash
PORT=8080 DATA_DIR=/mnt/storage docker-compose up -d
```
更多配置选项请查看[下载页面](/download)。
:::

### 方式二：安装包部署

适合需要自定义部署环境的场景，支持 Linux、macOS、Windows 平台。

**一键安装（推荐）：**

```bash
# Linux / macOS
curl -fsSL https://download.pixelpunk.cc/shell/install.sh | bash

# 或使用 wget
wget -qO- https://download.pixelpunk.cc/shell/install.sh | bash
```

**手动安装：**

1. 从[下载页面](/download)下载对应平台的安装包
2. 解压安装包：
   ```bash
   # Linux / macOS
   tar -xzf pixelpunk-linux-amd64-VERSION.tar.gz
   cd pixelpunk

   # Windows - 解压 ZIP 文件到目标目录
   ```
3. 运行安装脚本：
   ```bash
   # Linux / macOS
   chmod +x install.sh
   ./install.sh

   # Windows - 双击运行 install.bat 或 pixelpunk.exe
   ```

::: tip 0 配置设计
首次运行会自动生成配置文件并进入 Setup 安装向导，按提示完成初始化即可，无需手动编辑任何配置文件。
:::

## 访问应用

部署完成后，使用浏览器访问 PixelPunk：

```
http://你的服务器IP:9520
```

或使用自定义域名：

```
http://your-domain.com
```

::: tip 默认端口
PixelPunk 默认运行在 `9520` 端口。如果你使用了反向代理（如 Nginx、Caddy），可以隐藏端口号直接通过域名访问。
:::

## 首次安装向导

当你第一次访问 PixelPunk 时，系统会自动进入 **安装向导** 页面，引导你完成初始化配置。

### 安装流程

1. **系统检测**
   - 自动检测运行环境
   - 检查必要组件是否就绪

2. **数据库配置**
   - 选择使用 SQLite（默认，无需配置）或 MySQL
   - 如选择 MySQL，填写数据库连接信息

3. **缓存配置**（可选）
   - 选择是否启用 Redis 缓存
   - 填写 Redis 连接信息

4. **管理员账户**
   - 设置管理员用户名
   - 设置管理员密码
   - 设置管理员邮箱

5. **站点信息**
   - 设置站点名称
   - 设置站点域名

6. **完成安装**
   - 系统自动生成配置文件
   - 自动初始化数据库
   - 自动生成 JWT 密钥

::: tip 0 配置设计
PixelPunk 的配置文件在安装向导完成后自动生成，部署阶段无需手动编辑任何配置文件。这样可以避免配置错误，让部署更加简单可靠。
:::

## 安全说明

::: warning JWT 密钥安全
系统采用 JWT 进行前后端校验。安装向导会自动生成随机 JWT 密钥，确保系统安全。如需更改密钥，请前往后台管理安全配置页面（路径：`/admin/settings?tab=security`）进行修改。
:::

## 下一步

恭喜！你已经成功部署了 PixelPunk。接下来你可以：

- [**系统配置**](/docs/configuration) - 配置 AI 服务、存储、邮件等高级功能
- [**功能特性**](/docs/features) - 探索 PixelPunk 的完整功能
- [**完整部署指南**](/docs/deployment) - 了解生产环境部署和性能优化
- [**API 文档**](/docs/api) - 使用 API 接口集成到你的应用

## 获取帮助

遇到问题？我们随时为你提供帮助：

- 📦 [GitHub Issues](https://github.com/CooperJiang/PixelPunk-v1/issues) - 报告 Bug 或提出功能建议
- 💬 [GitHub Discussions](https://github.com/CooperJiang/PixelPunk-v1/discussions) - 社区讨论和问答
- 🌍 [官方网站](https://pixelpunk.cc/) - 查看最新动态和文档
- 🎮 [在线体验](https://v1.pixelpunk.cc/) - 在线演示环境
