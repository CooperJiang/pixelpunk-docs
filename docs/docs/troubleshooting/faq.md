# 常见问题

本页面收集了用户在使用 PixelPunk 过程中最常遇到的问题和解决方案。

## 安装和部署

### 首次访问没有跳转到安装向导？

如果首次访问没有自动跳转到 `/setup` 页面：

1. **检查后端服务**：访问 `http://localhost:9520/api/health` 确认后端正常运行
2. **检查前端服务**：确认前端开发服务器在 `http://localhost:3800` 运行（开发环境）
3. **手动访问安装向导**：直接访问 `http://localhost:9520/setup`
4. **查看日志**：检查 `logs/app.log` 查看是否有错误信息

### Docker 容器启动失败

**问题描述**：运行 `docker-compose up -d` 后容器无法启动

**可能原因和解决方案**：

1. **端口被占用**
   ```bash
   # 检查端口占用
   lsof -i:9520  # PixelPunk 主服务
   lsof -i:3306  # MySQL
   lsof -i:6379  # Redis
   lsof -i:6333  # Qdrant

   # 修改 docker-compose.yml 中的端口映射
   ports:
     - "8080:9520"  # 使用其他端口
   ```

2. **Docker 镜像拉取失败**
   ```bash
   # 手动拉取镜像
   docker pull snine98/pixelpunk:latest
   docker pull mysql:8.0
   docker pull redis:7-alpine
   docker pull qdrant/qdrant:latest

   # 或使用国内镜像源
   # 编辑 /etc/docker/daemon.json 添加镜像加速器
   ```

3. **数据卷权限问题**
   ```bash
   # 检查数据目录权限
   ls -la ./data ./uploads

   # 修改权限
   sudo chown -R 1000:1000 ./data ./uploads
   ```

### 一键安装脚本失败

**问题描述**：使用安装脚本时报错

```bash
curl: (7) Failed to connect to download.pixelpunk.cc
```

**解决方案**：

1. **检查网络连接**：确保服务器可以访问外网
2. **手动下载安装包**：
   ```bash
   # 访问 GitHub Releases 页面手动下载
   wget https://github.com/CooperJiang/PixelPunk-v1/releases/latest/download/pixelpunk-linux-amd64.tar.gz

   # 解压并运行
   tar -xzf pixelpunk-linux-amd64.tar.gz
   cd pixelpunk
   ./pixelpunk
   ```

## 配置问题

### 如何重置配置？

如果需要重新进行安装向导：

```bash
# 1. 停止服务
docker-compose down  # Docker 部署
# 或
pkill pixelpunk      # 脚本部署

# 2. 删除配置文件
rm configs/config.yaml

# 3. 删除数据库文件（可选，会清空所有数据）
rm -rf data/

# 4. 重新启动服务
docker-compose up -d
# 或
./pixelpunk
```

::: warning 注意
删除 `data/` 目录会清空所有用户数据、图片记录和设置，请谨慎操作！
:::

### 安装向导完成后需要重启吗？

**需要**。安装向导完成后，系统会自动生成配置文件 `configs/config.yaml`。建议重启服务以加载新配置：

**Docker 部署**：
```bash
docker-compose restart
```

**脚本部署**：
```bash
# 停止服务（Ctrl+C）然后重新启动
./pixelpunk
```

**源码部署**：
```bash
# 在后端终端按 Ctrl+C 停止，然后重新运行
go run cmd/main.go
```

### 修改了配置文件但未生效？

1. **检查配置文件格式**：确保 YAML 格式正确，注意缩进
2. **重启服务**：修改配置后必须重启服务
3. **检查日志**：查看 `logs/app.log` 确认配置是否加载成功
4. **环境变量优先级**：环境变量会覆盖配置文件，检查是否设置了环境变量

## 服务和端口

### 端口被占用

**问题描述**：启动时提示端口被占用

```bash
Error: listen tcp :9520: bind: address already in use
```

**解决方案**：

**方式一：清理占用进程**
```bash
# 查看占用进程
lsof -i:9520

# 杀死进程
lsof -ti:9520 | xargs kill -9

# 前端端口（开发环境）
lsof -ti:3800 | xargs kill -9

# Qdrant 端口
lsof -ti:6333 | xargs kill -9
```

**方式二：修改端口**
```yaml
# configs/config.yaml
server:
  port: 8080  # 修改为其他端口
```

### 无法访问服务

**问题描述**：浏览器无法访问 PixelPunk

**排查步骤**：

1. **检查服务状态**
   ```bash
   # Docker 部署
   docker-compose ps

   # 查看日志
   docker-compose logs -f pixelpunk
   ```

2. **检查防火墙**
   ```bash
   # CentOS/RHEL
   sudo firewall-cmd --add-port=9520/tcp --permanent
   sudo firewall-cmd --reload

   # Ubuntu/Debian
   sudo ufw allow 9520/tcp
   ```

3. **检查云服务器安全组**
   - 阿里云：安全组规则添加 9520 端口
   - 腾讯云：安全组规则添加 9520 端口
   - AWS：Security Group 添加入站规则

4. **使用 curl 测试**
   ```bash
   curl http://localhost:9520/api/health
   ```

## 数据库问题

### MySQL 连接失败

**问题描述**：安装向导配置 MySQL 时连接失败

**常见原因**：

1. **数据库不存在**
   ```sql
   -- 先创建数据库
   CREATE DATABASE pixelpunk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **用户权限不足**
   ```sql
   -- 授予权限
   GRANT ALL PRIVILEGES ON pixelpunk.* TO 'pixelpunk'@'%';
   FLUSH PRIVILEGES;
   ```

3. **连接地址错误**
   - Docker 内部连接使用服务名：`mysql:3306`
   - 外部连接使用 IP：`192.168.1.100:3306`
   - 本地连接使用：`localhost:3306` 或 `127.0.0.1:3306`

### SQLite 数据库损坏

**问题描述**：SQLite 数据库文件损坏导致服务无法启动

**解决方案**：

```bash
# 1. 备份当前数据库
cp data/pixelpunk.db data/pixelpunk.db.backup

# 2. 尝试修复
sqlite3 data/pixelpunk.db "PRAGMA integrity_check;"

# 3. 如果无法修复，使用备份或重新初始化
rm data/pixelpunk.db
# 重启服务会自动创建新数据库
```

## 上传和存储

### 文件上传失败

**问题描述**：图片上传时报错或一直卡在上传中

**排查步骤**：

1. **检查文件大小**
   - 默认单文件限制 100MB
   - 在「系统设置」→「上传配置」中查看和修改限制

2. **检查文件格式**
   - 支持的格式：JPG、PNG、GIF、WebP、BMP、TIFF
   - 在「系统设置」→「上传配置」中查看允许的格式

3. **检查存储空间**
   ```bash
   # 查看磁盘空间
   df -h

   # 查看上传目录大小
   du -sh uploads/
   ```

4. **检查存储配置**
   - 确认存储类型配置正确（本地/S3/OSS 等）
   - 检查云存储的访问密钥是否正确
   - 查看日志中的详细错误信息

### 云存储配置后无法上传

**问题描述**：配置了 S3/OSS 等云存储后，上传失败

**常见问题**：

1. **AccessKey/SecretKey 错误**
   - 重新检查并配置正确的密钥
   - 确认密钥有上传权限

2. **Bucket/区域配置错误**
   ```yaml
   # 确认配置正确
   storage:
     type: s3
     s3:
       bucket: "your-bucket-name"  # 正确的 bucket 名称
       region: "us-west-2"         # 正确的区域
       endpoint: ""                # 某些服务需要自定义 endpoint
   ```

3. **网络连接问题**
   - 确保服务器能访问云存储服务
   - 检查防火墙和代理设置

### 本地存储文件无法访问

**问题描述**：上传成功但无法预览或下载

**解决方案**：

1. **检查文件权限**
   ```bash
   # 确保 uploads 目录有读写权限
   chmod -R 755 uploads/
   ```

2. **检查静态文件服务**
   - 确认配置文件中 `file_url_prefix` 设置正确
   - 检查反向代理配置（Nginx/Caddy）是否正确代理静态文件

## 向量搜索和 AI

### Qdrant 启动失败

**问题描述**：`make qdrant-start` 失败

**解决方案**：

1. **确保 Docker 已安装并运行**
   ```bash
   docker --version
   docker ps

   # 如果 Docker 未运行，启动 Docker 服务
   sudo systemctl start docker  # Linux
   # 或打开 Docker Desktop (macOS/Windows)
   ```

2. **端口被占用**
   ```bash
   # 检查 6333 端口
   lsof -i:6333

   # 清理占用进程
   lsof -ti:6333 | xargs kill -9
   ```

3. **手动启动 Qdrant**
   ```bash
   docker run -d \
     --name qdrant \
     -p 6333:6333 \
     -v $(pwd)/qdrant_storage:/qdrant/storage \
     qdrant/qdrant:latest
   ```

### 向量搜索功能不可用

**问题描述**：以图搜图、语义搜索功能无法使用

**原因和解决**：

1. **Qdrant 未启动**
   ```bash
   # 检查 Qdrant 状态
   curl http://localhost:6333/healthz

   # 启动 Qdrant
   make qdrant-start
   ```

2. **未配置 Qdrant 连接**
   - 在「系统设置」→「向量搜索」中配置 Qdrant 地址
   - 默认地址：`http://localhost:6333`

3. **向量索引未创建**
   - 上传图片后需要等待 AI 处理完成
   - 在「系统设置」→「向量搜索」中手动触发重建索引

### AI 功能不工作

**问题描述**：自动分类、标签、NSFW 检测等 AI 功能不生效

**排查步骤**：

1. **检查 OpenAI API 配置**
   - 在「系统设置」→「AI 配置」中确认 API Key 正确
   - 检查 API 余额是否充足
   - 确认 API 服务可访问（国内可能需要代理）

2. **检查 AI 功能开关**
   - 在「系统设置」→「AI 配置」中检查各项功能是否启用

3. **查看任务队列**
   - 在「系统设置」→「后台任务」中查看 AI 处理任务状态
   - 检查是否有失败的任务

## 开发环境

### 前端依赖安装失败

**问题描述**：`pnpm install` 失败

**解决方案**：

```bash
# 清理缓存
rm -rf web/node_modules
rm -rf web/pnpm-lock.yaml

# 使用淘宝镜像
pnpm config set registry https://registry.npmmirror.com

# 重新安装
cd web
pnpm install
```

### Go 依赖下载慢

**问题描述**：Go 依赖下载缓慢或超时

**解决方案**：

```bash
# 设置国内代理
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOSUMDB=sum.golang.google.cn

# 重新下载依赖
go mod download
```

### 热重载不工作

**问题描述**：修改代码后需要手动重启

**后端热重载**：
```bash
# 安装 Air
go install github.com/cosmtrek/air@latest

# 使用 Air 启动
air
```

**前端热重载**：
```bash
# 确保使用开发模式启动
cd web
npm run dev

# 检查 Vite 配置
# vite.config.ts 中确认 server.hmr 配置
```

## 性能问题

### 图片加载缓慢

**可能原因和优化**：

1. **启用缩略图**
   - 在「系统设置」→「图片处理」中启用缩略图生成
   - 列表页会自动使用缩略图加载

2. **启用 CDN**
   - 配置 CDN 加速静态资源
   - 在配置文件中设置 `cdn_url`

3. **启用 WebP 格式**
   - 在「系统设置」→「图片处理」中启用 WebP 转换
   - WebP 格式比 JPG/PNG 小 25-35%

4. **配置 Redis 缓存**
   - 启用 Redis 可以显著提升查询性能
   - 在安装向导或配置文件中启用 Redis

### 数据库查询慢

**优化建议**：

1. **使用 MySQL 替代 SQLite**
   - 生产环境推荐使用 MySQL
   - MySQL 在高并发下性能更好

2. **定期清理数据**
   - 清理已删除的图片记录
   - 清理过期的分享链接
   - 在「系统管理」→「数据维护」中执行

3. **检查索引**
   - PixelPunk 会自动创建必要的索引
   - 如有性能问题，查看慢查询日志

## 其他问题

### 忘记管理员密码

**解决方案**：

```bash
# 使用命令行重置密码（即将支持）
./pixelpunk reset-password --username=admin

# 或者直接修改数据库
sqlite3 data/pixelpunk.db
# 或登录 MySQL
UPDATE users SET password = '$2a$10$...' WHERE username = 'admin';
```

### 如何备份数据？

**备份内容**：
1. 数据库文件/数据
2. 上传的图片文件
3. 配置文件

**备份方法**：

```bash
# 1. 备份 SQLite
cp data/pixelpunk.db /backup/pixelpunk_$(date +%Y%m%d).db

# 2. 备份 MySQL
mysqldump -u pixelpunk -p pixelpunk > /backup/pixelpunk_$(date +%Y%m%d).sql

# 3. 备份上传文件
tar -czf /backup/uploads_$(date +%Y%m%d).tar.gz uploads/

# 4. 备份配置
cp configs/config.yaml /backup/config_$(date +%Y%m%d).yaml
```

**定时备份脚本**：
```bash
#!/bin/bash
# 添加到 crontab: 0 2 * * * /path/to/backup.sh

BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d)

# 备份数据库
cp data/pixelpunk.db $BACKUP_DIR/pixelpunk_$DATE.db

# 备份上传文件（增量备份）
rsync -av --delete uploads/ $BACKUP_DIR/uploads/

# 保留最近 7 天的备份
find $BACKUP_DIR -name "pixelpunk_*.db" -mtime +7 -delete
```

### 如何升级到新版本？

**Docker 部署**：
```bash
# 拉取最新镜像
docker pull snine98/pixelpunk:latest

# 重启服务
docker-compose down
docker-compose up -d
```

**脚本部署**：
```bash
# 下载新版本
wget https://github.com/CooperJiang/PixelPunk-v1/releases/latest/download/pixelpunk-linux-amd64.tar.gz

# 停止服务
pkill pixelpunk

# 备份旧版本
mv pixelpunk pixelpunk.old

# 解压新版本
tar -xzf pixelpunk-linux-amd64.tar.gz

# 复制配置和数据
cp -r pixelpunk.old/configs pixelpunk/
cp -r pixelpunk.old/data pixelpunk/
cp -r pixelpunk.old/uploads pixelpunk/

# 启动新版本
cd pixelpunk
./pixelpunk
```

::: tip 数据库迁移
升级时会自动执行数据库迁移，无需手动操作。建议升级前先备份数据。
:::

## 获取帮助

如果以上解决方案无法解决你的问题，可以通过以下方式获取帮助：

- **GitHub Issues**：[报告问题](https://github.com/CooperJiang/PixelPunk-v1/issues)
- **GitHub Discussions**：[社区讨论](https://github.com/CooperJiang/PixelPunk-v1/discussions)
- **查看日志**：`logs/app.log` 中有详细的错误信息

提问时请提供：
- PixelPunk 版本
- 部署方式（Docker/脚本/源码）
- 操作系统和版本
- 详细的错误日志
- 复现步骤
