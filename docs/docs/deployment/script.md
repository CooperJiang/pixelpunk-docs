# 脚本部署

使用一键安装脚本快速部署 PixelPunk（适用于 Linux 和 macOS）。

::: tip 待完善
本文档正在编写中，敬请期待...
:::

## 概述

一键安装脚本提供最简单的部署方式，自动完成：
- 系统架构检测
- 安装包下载
- 服务配置
- 系统服务创建

## 环境要求

- 操作系统：Linux (x86_64/ARM64) 或 macOS (Intel/Apple Silicon)
- 权限：sudo 权限
- 可选：MySQL 8.0+、Redis（安装向导中配置）

## 快速安装

```bash
curl -fsSL http://download.pixelpunk.cc/shell/setup.sh | bash
```

## 内置组件

安装包已内置：
- ✅ SQLite 数据库
- ✅ Qdrant 向量数据库

## 访问应用

```
http://your-ip:9520
```

## 下一步

详细的脚本部署文档正在编写中...
