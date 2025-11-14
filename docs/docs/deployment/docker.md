# Docker 部署

使用 Docker Compose 快速部署 PixelPunk 完整服务栈。

::: tip 待完善
本文档正在编写中，敬请期待...
:::

## 概述

Docker Compose 是推荐的部署方式，提供开箱即用的完整服务栈，包括：
- PixelPunk 主服务
- MySQL 数据库
- Redis 缓存
- Qdrant 向量数据库

## 环境要求

- Docker 20.10.0+
- Docker Compose 2.0.0+
- 内存 2GB+
- 磁盘 10GB+

## 快速部署

```bash
# 1. 拉取镜像
docker pull snine98/pixelpunk:latest

# 2. 下载 docker-compose.yml
curl -O https://download.pixelpunk.cc/docker/docker-compose.yml

# 3. 启动服务
docker-compose up -d
```

## 访问应用

```
http://your-ip:9520
```

## 下一步

详细的 Docker 部署文档正在编写中...
