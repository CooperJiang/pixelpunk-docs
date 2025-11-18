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
Docker Compose 模式会自动启动并配置所有依赖服务（MySQL、Redis、Qdrant 向量数据库），无需额外安装和配置。
:::

### Docker 单容器部署

- **Docker**: 20.10.0+
- **外部服务**: MySQL 或 SQLite、Redis（需自行安装）
- **内存**: 建议 1GB 以上
- **磁盘**: 建议 5GB 以上可用空间

::: tip 灵活配置
单容器模式适合已有数据库和 Redis 的环境，通过环境变量即可连接外部服务，无需修改配置文件。
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

### 方式一：Docker Compose（推荐，一键部署）

Docker Compose 会自动启动所有必需的服务，包括 PixelPunk 应用、MySQL 数据库、Redis 缓存和 Qdrant 向量数据库。

**一键安装（强烈推荐）：**

```bash
# 使用 curl
curl -fsSL https://download.pixelpunk.cc/shell/docker-install.sh | bash

# 或使用 wget
wget -qO- https://download.pixelpunk.cc/shell/docker-install.sh | bash
```

安装脚本会自动完成以下步骤：
- ✅ 检测 Docker 和 Docker Compose 环境
- ✅ 下载 docker-compose.yml 配置文件
- ✅ 交互式配置端口和数据目录（都有默认值，可直接回车）
- ✅ 自动创建所需目录结构
- ✅ 启动所有服务容器并等待就绪
- ✅ 显示访问地址和后续步骤

**手动部署：**

如果你需要手动控制部署过程，也可以直接运行：

```bash
# 1. 下载配置文件
curl -O https://download.pixelpunk.cc/docker/docker-compose.yml

# 2. 启动所有服务（首次启动会自动初始化配置和目录）
docker-compose up -d

# 3. 访问应用
open http://localhost:9520
```

::: tip 自动配置初始化
Docker 镜像内置了智能启动脚本，首次启动时会自动：
- 检测并修复配置文件异常
- 从模板生成适合 Docker 环境的配置文件
- 使用容器服务名连接数据库和 Redis

无需手动创建或编辑配置文件！
:::

各服务默认端口如下（仅 PixelPunk 对外暴露，其他服务仅容器内部访问）：
- **PixelPunk 主服务**: `9520` （对外）
- **MySQL**: `3306` （仅内部）
- **Redis**: `6379` （仅内部）
- **Qdrant**: `6333` （仅内部）

::: tip 环境变量配置
Docker Compose 支持通过环境变量自定义端口和目录：
```bash
PORT=8080 DATA_DIR=/mnt/storage docker-compose up -d
```
更多配置选项请查看 [Docker 部署指南](/docs/deployment/docker)。
:::

### 方式二：Docker 单容器部署（适合已有数据库环境）

如果你已经有 MySQL 和 Redis 服务（或想使用 SQLite），可以只运行 PixelPunk 容器，通过环境变量连接外部服务。

**使用外部 MySQL + Redis：**

```bash
docker run -d \
  --name pixelpunk \
  --restart unless-stopped \
  -p 9520:9520 \
  -v $(pwd)/pixelpunk/data:/app/data \
  -v $(pwd)/pixelpunk/uploads:/app/uploads \
  -v $(pwd)/pixelpunk/logs:/app/logs \
  -e APP_DB_TYPE=mysql \
  -e APP_DB_HOST=你的MySQL地址 \
  -e APP_DB_PORT=3306 \
  -e APP_DB_USERNAME=pixelpunk \
  -e APP_DB_PASSWORD=你的密码 \
  -e APP_DB_NAME=pixelpunk \
  -e APP_REDIS_HOST=你的Redis地址 \
  -e APP_REDIS_PORT=6379 \
  -e APP_VECTOR_ENABLED=false \
  -e TZ=Asia/Shanghai \
  snine98/pixelpunk:latest
```

**使用 SQLite + 外部 Redis：**

```bash
docker run -d \
  --name pixelpunk \
  --restart unless-stopped \
  -p 9520:9520 \
  -v $(pwd)/pixelpunk/data:/app/data \
  -v $(pwd)/pixelpunk/uploads:/app/uploads \
  -v $(pwd)/pixelpunk/logs:/app/logs \
  -e APP_DB_TYPE=sqlite \
  -e APP_DB_PATH=/app/data/pixelpunk.db \
  -e APP_REDIS_HOST=你的Redis地址 \
  -e APP_REDIS_PORT=6379 \
  -e APP_VECTOR_ENABLED=false \
  -e TZ=Asia/Shanghai \
  snine98/pixelpunk:latest
```

::: tip 容器访问宿主机服务
如果 MySQL/Redis 运行在宿主机上，需要使用正确的地址：
- **Linux**: 使用 `--network host` 或宿主机 IP
- **macOS/Windows Docker Desktop**: 使用 `host.docker.internal`
- **生产环境**: 使用宿主机的实际 IP 地址

完整的环境变量配置请查看 [Docker 部署指南 - 单容器部署](/docs/deployment/docker#standalone)。
:::

### 方式三：安装包部署

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
   - Docker Compose 部署：已自动配置 MySQL，直接下一步
   - 安装包部署：选择使用 SQLite（默认，无需配置）或 MySQL
   - 单容器部署：已通过环境变量配置，跳过此步

3. **缓存配置**
   - Docker Compose 部署：已自动配置 Redis，直接下一步
   - 安装包部署：可选择是否启用 Redis
   - 单容器部署：已通过环境变量配置，跳过此步

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

- [**系统配置**](/docs/config/basic) - 配置 AI 服务、存储、邮件等高级功能
- [**功能特性**](/features) - 探索 PixelPunk 的完整功能
- [**完整部署指南**](/docs/deployment/docker) - 了解生产环境部署和性能优化
- [**API 文档**](/docs/api/upload) - 使用 API 接口集成到你的应用

## 获取帮助

遇到问题？我们随时为你提供帮助：

- 📦 [GitHub Issues](https://github.com/CooperJiang/PixelPunk-v1/issues) - 报告 Bug 或提出功能建议
- 💬 [GitHub Discussions](https://github.com/CooperJiang/PixelPunk-v1/discussions) - 社区讨论和问答
- 🌍 [官方网站](https://pixelpunk.cc/) - 查看最新动态和文档
- 🎮 [在线体验](https://v1.pixelpunk.cc/) - 在线演示环境
