# 手动部署

通过手动方式部署 PixelPunk，适合高级用户和自定义需求。

::: tip 待完善
本文档正在编写中，敬请期待...
:::

## 概述

手动部署提供最大的灵活性，适合：
- 自定义部署环境
- 深度定制配置
- 特殊安全要求
- 生产环境优化

## 环境要求

**必需组件**：
- 操作系统：Linux / macOS / Windows
- 数据库：MySQL 8.0+ 或 SQLite
- 向量数据库：Qdrant

**可选组件**：
- Redis（缓存加速）
- Nginx / Caddy（反向代理）

## 部署步骤

### 1. 下载安装包

从 [GitHub Releases](https://github.com/CooperJiang/PixelPunk-v1/releases) 下载对应平台的二进制文件。

### 2. 解压文件

```bash
# 解压到指定目录
tar -xzf pixelpunk-linux-amd64.tar.gz -C /opt/pixelpunk
```

### 3. 配置服务

详细配置步骤编写中...

### 4. 启动服务

```bash
# 启动 PixelPunk
./pixelpunk
```

## 访问应用

```
http://your-ip:9520
```

## 下一步

详细的手动部署文档正在编写中...
