# Docker 部署指南

本文档详细介绍 PixelPunk 的 Docker 部署方式，包括 Docker Compose 一键部署和单容器灵活部署。

## 部署方式对比

| 部署方式 | 适用场景 | 配置复杂度 | 资源占用 |
|---------|---------|-----------|---------|
| **Docker Compose 一键部署** | 快速部署、测试环境 | ⭐ 简单 | 中等（包含所有服务） |
| **Docker 单容器 + 外部数据库** | 生产环境、已有数据库 | ⭐⭐ 中等 | 较低（仅应用） |
| **Docker 单容器 + SQLite** | 轻量级部署、个人使用 | ⭐ 简单 | 最低 |

---

## 方式一：Docker Compose 部署（推荐） {#docker-compose}

Docker Compose 会自动启动完整的服务栈，包括 PixelPunk 应用、MySQL、Redis 和 Qdrant 向量数据库。

### 环境要求

- Docker 20.10.0+
- Docker Compose 2.0.0+
- 内存 2GB+
- 磁盘 10GB+

### 一键安装（强烈推荐）

```bash
# 使用 curl
curl -fsSL https://download.pixelpunk.cc/shell/docker-install.sh | bash

# 或使用 wget
wget -qO- https://download.pixelpunk.cc/shell/docker-install.sh | bash
```

安装脚本会自动完成：
- ✅ 检测 Docker 和 Docker Compose 环境
- ✅ 下载 docker-compose.yml 配置文件
- ✅ 交互式配置端口和数据目录
- ✅ 自动创建目录结构
- ✅ 启动所有服务并等待就绪
- ✅ 显示访问地址

### 手动部署

如果你需要手动控制部署过程：

```bash
# 1. 下载 docker-compose.yml
curl -O https://download.pixelpunk.cc/docker/docker-compose.yml

# 2. 启动所有服务
docker-compose up -d

# 3. 查看服务状态
docker-compose ps

# 4. 查看日志
docker-compose logs -f pixelpunk
```

### 服务端口说明

| 服务 | 默认端口 | 访问权限 | 说明 |
|-----|---------|---------|------|
| **PixelPunk** | 9520 | 对外暴露 | 主应用服务 |
| **MySQL** | 3306 | 仅内部 | 数据库服务 |
| **Redis** | 6379 | 仅内部 | 缓存服务 |
| **Qdrant** | 6333 | 仅内部 | 向量数据库 |

::: tip 自动配置初始化
Docker 镜像内置了智能启动脚本（docker-entrypoint.sh），首次启动时会自动：
- 检测并修复配置文件异常
- 从模板生成适合 Docker 环境的配置文件
- 使用容器服务名连接数据库和 Redis

**无需手动创建或编辑配置文件！**
:::

### 环境变量配置

你可以通过环境变量自定义端口和目录：

```bash
# 自定义端口和目录
PORT=8080 \
DATA_DIR=/mnt/storage/data \
LOGS_DIR=/mnt/storage/logs \
UPLOADS_DIR=/mnt/storage/uploads \
docker-compose up -d
```

支持的环境变量：

| 变量名 | 说明 | 默认值 |
|-------|------|--------|
| `PORT` | PixelPunk 主服务端口 | 9520 |
| `DATA_DIR` | 数据目录 | ./data |
| `LOGS_DIR` | 日志目录 | ./logs |
| `UPLOADS_DIR` | 上传文件目录 | ./uploads |
| `MYSQL_DATA_DIR` | MySQL 数据目录 | ./data/mysql |
| `REDIS_DATA_DIR` | Redis 数据目录 | ./data/redis |
| `QDRANT_DATA_DIR` | Qdrant 数据目录 | ./data/qdrant |

### 常用命令

```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 重启服务
docker-compose restart pixelpunk

# 查看日志
docker-compose logs -f pixelpunk

# 查看服务状态
docker-compose ps

# 进入容器
docker-compose exec pixelpunk sh

# 更新镜像
docker-compose pull
docker-compose up -d

# 清理数据（危险操作！会删除所有数据）
docker-compose down -v
```

---

## 方式二：Docker 单容器部署 {#standalone}

单容器模式适合已有数据库和 Redis 的环境，通过环境变量连接外部服务。

### 架构说明

```
┌─────────────────┐
│  PixelPunk      │
│  Docker 容器    │──┐
└─────────────────┘  │
                     ├─→ 外部 MySQL/SQLite
                     ├─→ 外部 Redis
                     └─→ 外部 Qdrant（可选）
```

### 场景 1: 外部 MySQL + Redis

适合生产环境，使用独立的数据库和缓存服务。

```bash
docker run -d \
  --name pixelpunk \
  --restart unless-stopped \
  -p 9520:9520 \
  -v $(pwd)/pixelpunk/data:/app/data \
  -v $(pwd)/pixelpunk/uploads:/app/uploads \
  -v $(pwd)/pixelpunk/logs:/app/logs \
  -e APP_DB_TYPE=mysql \
  -e APP_DB_HOST=192.168.1.100 \
  -e APP_DB_PORT=3306 \
  -e APP_DB_USERNAME=pixelpunk \
  -e APP_DB_PASSWORD=your_password \
  -e APP_DB_NAME=pixelpunk \
  -e APP_REDIS_HOST=192.168.1.101 \
  -e APP_REDIS_PORT=6379 \
  -e APP_REDIS_PASSWORD="" \
  -e APP_VECTOR_ENABLED=false \
  -e TZ=Asia/Shanghai \
  snine98/pixelpunk:latest
```

**前置步骤：准备数据库**

```sql
-- 创建数据库
CREATE DATABASE pixelpunk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户并授权
CREATE USER 'pixelpunk'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON pixelpunk.* TO 'pixelpunk'@'%';
FLUSH PRIVILEGES;
```

### 场景 2: SQLite + 外部 Redis

适合轻量级部署，数据库使用文件存储。

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
  -e APP_REDIS_HOST=192.168.1.101 \
  -e APP_REDIS_PORT=6379 \
  -e APP_VECTOR_ENABLED=false \
  -e TZ=Asia/Shanghai \
  snine98/pixelpunk:latest
```

### 场景 3: 完整配置（含向量搜索）

启用 Qdrant 向量数据库，支持 AI 图像搜索功能。

```bash
docker run -d \
  --name pixelpunk \
  --restart unless-stopped \
  -p 9520:9520 \
  -v $(pwd)/pixelpunk/data:/app/data \
  -v $(pwd)/pixelpunk/uploads:/app/uploads \
  -v $(pwd)/pixelpunk/logs:/app/logs \
  -e APP_DB_TYPE=mysql \
  -e APP_DB_HOST=192.168.1.100 \
  -e APP_DB_PORT=3306 \
  -e APP_DB_USERNAME=pixelpunk \
  -e APP_DB_PASSWORD=your_password \
  -e APP_DB_NAME=pixelpunk \
  -e APP_REDIS_HOST=192.168.1.101 \
  -e APP_REDIS_PORT=6379 \
  -e APP_VECTOR_ENABLED=true \
  -e APP_VECTOR_QDRANT_URL=http://192.168.1.102:6333 \
  -e APP_VECTOR_OPENAI_API_KEY=sk-xxx \
  -e APP_VECTOR_OPENAI_BASE_URL=https://api.openai.com/v1 \
  -e TZ=Asia/Shanghai \
  snine98/pixelpunk:latest
```

### 容器访问宿主机服务

如果 MySQL/Redis 运行在宿主机上，需要使用正确的地址：

#### Linux 系统

**方式 1: 使用 host 网络模式**（推荐）

```bash
docker run -d \
  --name pixelpunk \
  --network host \
  -v $(pwd)/pixelpunk/data:/app/data \
  -v $(pwd)/pixelpunk/uploads:/app/uploads \
  -e APP_DB_TYPE=mysql \
  -e APP_DB_HOST=localhost \
  -e APP_DB_PORT=3306 \
  -e APP_REDIS_HOST=localhost \
  -e APP_REDIS_PORT=6379 \
  snine98/pixelpunk:latest
```

::: warning 注意
使用 `--network host` 时，无需指定 `-p` 端口映射，容器直接使用宿主机网络。
:::

**方式 2: 使用宿主机 IP**

```bash
# 查看宿主机 IP
ip addr show | grep "inet " | grep -v 127.0.0.1

# 使用 IP 地址启动（例如：192.168.1.100）
docker run -d \
  --name pixelpunk \
  -p 9520:9520 \
  -v $(pwd)/pixelpunk/data:/app/data \
  -e APP_DB_HOST=192.168.1.100 \
  -e APP_REDIS_HOST=192.168.1.100 \
  snine98/pixelpunk:latest
```

#### macOS / Windows (Docker Desktop)

使用 Docker Desktop 提供的特殊域名：

```bash
docker run -d \
  --name pixelpunk \
  -p 9520:9520 \
  -v $(pwd)/pixelpunk/data:/app/data \
  -v $(pwd)/pixelpunk/uploads:/app/uploads \
  -e APP_DB_TYPE=mysql \
  -e APP_DB_HOST=host.docker.internal \
  -e APP_DB_PORT=3306 \
  -e APP_REDIS_HOST=host.docker.internal \
  -e APP_REDIS_PORT=6379 \
  snine98/pixelpunk:latest
```

::: tip host.docker.internal
`host.docker.internal` 是 Docker Desktop 提供的特殊域名，自动解析为宿主机 IP。
:::

---

## 环境变量完整列表 {#env-vars}

PixelPunk 支持通过环境变量配置所有参数，优先级：**环境变量 > 配置文件 > 默认值**

### 应用配置

| 环境变量 | 说明 | 默认值 | 示例 |
|---------|------|--------|------|
| `APP_APP_PORT` | 应用监听端口 | 9520 | 9520 |
| `APP_APP_MODE` | 运行模式 | release | release / debug |
| `APP_APP_NS` | 命名空间（缓存隔离） | pixelpunk | pixelpunk |

### 数据库配置

| 环境变量 | 说明 | 必填 | 示例 |
|---------|------|------|------|
| `APP_DB_TYPE` | 数据库类型 | ✅ | mysql / sqlite |
| `APP_DB_HOST` | 数据库地址 | MySQL 必填 | 192.168.1.100 |
| `APP_DB_PORT` | 数据库端口 | MySQL 必填 | 3306 |
| `APP_DB_USERNAME` | 数据库用户名 | MySQL 必填 | pixelpunk |
| `APP_DB_PASSWORD` | 数据库密码 | MySQL 必填 | your_password |
| `APP_DB_NAME` | 数据库名称 | MySQL 必填 | pixelpunk |
| `APP_DB_PATH` | 数据库文件路径 | SQLite 必填 | /app/data/pixelpunk.db |

### Redis 配置

| 环境变量 | 说明 | 默认值 | 示例 |
|---------|------|--------|------|
| `APP_REDIS_HOST` | Redis 地址 | localhost | 192.168.1.101 |
| `APP_REDIS_PORT` | Redis 端口 | 6379 | 6379 |
| `APP_REDIS_PASSWORD` | Redis 密码 | (空) | your_redis_pass |
| `APP_REDIS_DB` | Redis 数据库编号 | 0 | 0 |

### 向量数据库配置

| 环境变量 | 说明 | 默认值 | 示例 |
|---------|------|--------|------|
| `APP_VECTOR_ENABLED` | 是否启用向量搜索 | false | true / false |
| `APP_VECTOR_QDRANT_URL` | Qdrant 地址 | - | http://192.168.1.102:6333 |
| `APP_VECTOR_TIMEOUT` | 请求超时时间(秒) | 30 | 30 |
| `APP_VECTOR_OPENAI_API_KEY` | OpenAI API Key | - | sk-xxx |
| `APP_VECTOR_OPENAI_BASE_URL` | OpenAI API 地址 | - | https://api.openai.com/v1 |
| `APP_VECTOR_OPENAI_MODEL` | 向量化模型 | - | text-embedding-ada-002 |

### 上传配置

| 环境变量 | 说明 | 默认值 | 示例 |
|---------|------|--------|------|
| `APP_UPLOAD_MAX_FILE_SIZE` | 最大文件大小(字节) | - | 104857600 |
| `APP_UPLOAD_ALLOWED_TYPES` | 允许的文件类型 | - | image/jpeg,image/png |

---

## 数据持久化

### 必须挂载的目录

| 目录 | 说明 | 重要性 |
|-----|------|--------|
| `/app/uploads` | 用户上传的图片文件 | ⚠️ **必需** |
| `/app/data` | SQLite 数据库文件（如使用） | ⚠️ **必需**（SQLite） |
| `/app/logs` | 应用日志文件 | 可选 |

### Docker Compose 数据目录

```
pixelpunk/
├── data/              # 应用数据
│   ├── mysql/        # MySQL 数据
│   ├── redis/        # Redis 数据
│   └── qdrant/       # Qdrant 数据
├── uploads/          # 用户上传文件
└── logs/             # 应用日志
```

### 备份建议

```bash
# 备份上传文件
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz pixelpunk/uploads/

# 备份 MySQL 数据库（Docker Compose）
docker-compose exec mysql mysqldump -u pixelpunk -ppixelpunk_pass pixelpunk > backup.sql

# 备份 SQLite 数据库
cp pixelpunk/data/pixelpunk.db pixelpunk-backup-$(date +%Y%m%d).db
```

---

## 故障排查

### 1. 配置文件被创建为目录

**现象：** 启动失败，日志显示 "read configs/config.yaml: is a directory"

**原因：** Docker 挂载不存在的文件时会自动创建为目录

**解决方案：**
镜像内置的 docker-entrypoint.sh 会自动检测并修复。如果仍有问题：

```bash
# 停止容器
docker stop pixelpunk

# 删除错误的目录
rm -rf configs/config.docker.yaml

# 重新启动
docker start pixelpunk
```

### 2. 数据库连接失败

**现象：** 日志显示 "Error connecting to database"

**排查步骤：**

```bash
# 1. 检查数据库服务是否运行
# MySQL
docker-compose exec mysql mysqladmin ping -h localhost -u pixelpunk -ppixelpunk_pass

# 2. 从容器内测试网络连通性
docker exec pixelpunk ping -c 3 mysql

# 3. 检查环境变量是否正确
docker exec pixelpunk env | grep APP_DB_

# 4. 查看详细日志
docker logs pixelpunk
```

**常见原因：**
- MySQL 服务未启动
- 数据库用户名密码错误
- 数据库未授权远程访问（`%` 通配符）
- 防火墙阻止连接

### 3. Redis 连接失败

**现象：** 应用启动正常但缓存功能不工作

**排查步骤：**

```bash
# 1. 检查 Redis 服务
docker-compose exec redis redis-cli ping

# 2. 从容器内测试连接
docker exec pixelpunk ping -c 3 redis

# 3. 检查 Redis 配置
docker exec pixelpunk env | grep APP_REDIS_
```

### 4. 端口冲突

**现象：** 启动失败，错误 "Bind for 0.0.0.0:9520 failed: port is already allocated"

**解决方案：**

```bash
# 方式 1: 更换端口
PORT=8080 docker-compose up -d

# 方式 2: 查找并停止占用端口的进程
lsof -i :9520
kill -9 <PID>
```

### 5. 权限问题

**现象：** 无法写入上传文件，日志显示 "permission denied"

**解决方案：**

```bash
# 修改目录权限
sudo chown -R 1000:1000 pixelpunk/uploads
sudo chmod -R 755 pixelpunk/uploads
```

### 6. 查看配置是否生效

```bash
# 查看环境变量
docker exec pixelpunk env | grep APP_

# 查看生成的配置文件
docker exec pixelpunk cat /app/configs/config.yaml

# 查看容器启动日志
docker logs pixelpunk | head -50
```

---

## 性能优化

### 资源限制

限制容器资源使用，避免单个容器占用过多系统资源：

```yaml
# docker-compose.yml
services:
  pixelpunk:
    # ... 其他配置
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### MySQL 优化

```yaml
mysql:
  # ... 其他配置
  command: >
    --character-set-server=utf8mb4
    --collation-server=utf8mb4_unicode_ci
    --default-authentication-plugin=mysql_native_password
    --max_connections=500
    --innodb_buffer_pool_size=1G
    --innodb_log_file_size=256M
```

### Redis 持久化

```yaml
redis:
  # ... 其他配置
  command: redis-server --appendonly yes --save 60 1000
```

---

## 安全建议

### 1. 修改默认密码

```yaml
# docker-compose.yml
mysql:
  environment:
    MYSQL_ROOT_PASSWORD: your_strong_password_here  # 修改这里
    MYSQL_PASSWORD: your_app_password_here          # 修改这里
```

### 2. 使用 Docker Secrets（生产环境）

```yaml
version: '3.8'
services:
  pixelpunk:
    environment:
      - APP_DB_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

### 3. 限制网络访问

```yaml
# 仅暴露必要端口，数据库端口不对外
mysql:
  ports: []  # 不暴露端口
```

### 4. 定期更新镜像

```bash
# 更新到最新版本
docker-compose pull
docker-compose up -d

# 查看镜像版本
docker images | grep pixelpunk
```

---

## 常见问题

### Q: Docker 镜像包含哪些内容？

A: Docker 镜像（`snine98/pixelpunk:latest`）仅包含：
- PixelPunk 应用程序
- 前端静态文件
- 配置文件模板
- 智能启动脚本

**不包含** MySQL、Redis、Qdrant 数据库软件（这些通过 Docker Compose 或外部服务提供）。

### Q: 如何升级到新版本？

A:

```bash
# Docker Compose 方式
docker-compose pull
docker-compose up -d

# 单容器方式
docker pull snine98/pixelpunk:latest
docker stop pixelpunk
docker rm pixelpunk
# 重新运行 docker run 命令（数据在挂载卷中，不会丢失）
```

### Q: 可以使用已有的 MySQL 数据库吗？

A: 可以！使用单容器部署方式，通过环境变量连接你的 MySQL：

```bash
-e APP_DB_HOST=你的MySQL地址
-e APP_DB_USERNAME=你的用户名
-e APP_DB_PASSWORD=你的密码
```

### Q: 向量搜索功能是必需的吗？

A: 不是。可以通过 `-e APP_VECTOR_ENABLED=false` 禁用。禁用后：
- 不需要 Qdrant 服务
- 不需要 OpenAI API Key
- AI 图像搜索功能将不可用
- 其他功能正常使用

### Q: 如何迁移数据？

A:

```bash
# 1. 备份旧环境数据
tar -czf pixelpunk-backup.tar.gz pixelpunk/

# 2. 在新服务器解压
tar -xzf pixelpunk-backup.tar.gz

# 3. 启动服务（配置文件会自动识别现有数据）
docker-compose up -d
```

---

## 下一步

- [基本配置](/docs/config/basic) - 详细的配置选项说明
- [手动部署](/docs/deployment/manual) - 传统部署方式
- [常见问题](/docs/troubleshooting/faq) - 故障排查和解决方案
- [开放 API](/docs/api/upload) - API 使用和集成指南
