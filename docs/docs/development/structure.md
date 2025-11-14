# 源码结构

PixelPunk 采用前后端分离架构，后端使用 Go 开发，前端使用 Vue 3。本文档详细介绍项目的目录结构和代码组织方式。

## 项目总览

```
PixelPunk/
├── cmd/                    # 程序入口
├── internal/               # 后端核心代码（私有）
├── pkg/                    # 后端公共包（可复用）
├── web/                    # 前端项目
├── migrations/             # 数据库迁移文件
├── configs/                # 配置文件（安装向导自动生成）
├── deploy/                 # 部署脚本和配置
├── docker/                 # Docker 相关文件
├── scripts/                # 辅助脚本
├── qdrant/                 # Qdrant 向量数据库配置
├── docs/                   # 项目文档
├── go.mod                  # Go 依赖管理
└── Makefile                # Make 命令集合
```

## 后端结构

### cmd/ - 程序入口

```
cmd/
└── main.go                 # 主程序入口
```

**职责**：
- 应用启动入口
- 初始化配置、数据库、路由
- 启动 HTTP 服务器
- 优雅关闭处理

### internal/ - 核心业务代码

后端核心代码采用分层架构，目录结构如下：

```
internal/
├── controllers/            # HTTP 控制器层
│   ├── activity/          # 活动日志
│   ├── admin/             # 管理员功能
│   ├── announcement/      # 公告管理
│   ├── apikey/            # API Key 管理
│   ├── auth/              # 认证授权
│   ├── author/            # 作者管理
│   ├── batch/             # 批量操作
│   ├── category/          # 分类管理
│   ├── contentreview/     # 内容审核
│   ├── dashboard/         # 仪表板
│   ├── external/          # 外部 API
│   ├── file/              # 文件管理
│   ├── folder/            # 文件夹管理
│   ├── image/             # 图片处理
│   ├── message/           # 消息系统
│   ├── openapi/           # 开放 API
│   ├── profile/           # 用户资料
│   ├── search/            # 搜索功能
│   ├── setup/             # 安装向导
│   ├── share/             # 分享管理
│   ├── storage/           # 存储配置
│   ├── tag/               # 标签管理
│   ├── upload/            # 上传管理
│   ├── user/              # 用户管理
│   └── workspace/         # 工作空间
├── services/              # 业务逻辑层
│   ├── activity/          # 活动服务
│   ├── ai/                # AI 处理服务
│   ├── announcement/      # 公告服务
│   ├── apikey/            # API Key 服务
│   ├── auth/              # 认证服务
│   ├── author/            # 作者服务
│   ├── background/        # 后台任务
│   ├── batch/             # 批量处理
│   ├── category/          # 分类服务
│   ├── contentreview/     # 内容审核服务
│   ├── dashboard/         # 仪表板服务
│   ├── database/          # 数据库初始化
│   ├── download/          # 下载服务
│   ├── file/              # 文件服务
│   ├── folder/            # 文件夹服务
│   ├── hash/              # 哈希计算
│   ├── image/             # 图片处理
│   ├── message/           # 消息服务
│   ├── openapi/           # 开放 API 服务
│   ├── search/            # 搜索服务
│   ├── security/          # 安全服务
│   ├── setup/             # 安装服务
│   ├── share/             # 分享服务
│   ├── storage/           # 存储服务
│   ├── tag/               # 标签服务
│   ├── upload/            # 上传服务
│   ├── user/              # 用户服务
│   └── workspace/         # 工作空间服务
├── models/                # 数据模型
│   ├── activity.go        # 活动模型
│   ├── announcement.go    # 公告模型
│   ├── apikey.go          # API Key 模型
│   ├── author.go          # 作者模型
│   ├── category.go        # 分类模型
│   ├── config.go          # 配置模型
│   ├── contentreview.go   # 内容审核模型
│   ├── external_api.go    # 外部 API 模型
│   ├── file.go            # 文件模型
│   ├── folder.go          # 文件夹模型
│   ├── message.go         # 消息模型
│   ├── random_api.go      # 随机图片 API 模型
│   ├── share.go           # 分享模型
│   ├── storage_config.go  # 存储配置模型
│   ├── system_config.go   # 系统配置模型
│   ├── tag.go             # 标签模型
│   ├── upload.go          # 上传模型
│   ├── user.go            # 用户模型
│   └── workspace.go       # 工作空间模型
├── middleware/            # 中间件
│   ├── auth.go            # 认证中间件
│   ├── cors.go            # CORS 中间件
│   ├── logger.go          # 日志中间件
│   ├── ratelimit.go       # 限流中间件
│   └── recovery.go        # 错误恢复中间件
├── routes/                # 路由配置
│   ├── api.go             # API 路由
│   ├── admin.go           # 管理路由
│   └── public.go          # 公开路由
└── utils/                 # 工具函数
    ├── hash/              # 哈希工具
    ├── response/          # 响应封装
    └── validator/         # 验证器
```

**分层职责**：

1. **Controllers（控制器层）**
   - 处理 HTTP 请求和响应
   - 参数验证和绑定
   - 调用 Service 层执行业务逻辑
   - 返回格式化的响应数据

2. **Services（服务层）**
   - 实现核心业务逻辑
   - 调用数据模型进行数据操作
   - 处理事务和数据一致性
   - 调用外部服务（AI、存储等）

3. **Models（模型层）**
   - 定义数据结构
   - 数据库映射（GORM）
   - 基础 CRUD 操作

4. **Middleware（中间件层）**
   - 请求预处理
   - 认证授权
   - 日志记录
   - 错误处理

### pkg/ - 公共包

可复用的通用功能模块：

```
pkg/
├── ai/                     # AI 处理模块
│   ├── client.go          # AI 客户端
│   ├── image_analyzer.go  # 图片分析
│   ├── nsfw_detector.go   # NSFW 检测
│   └── tagger.go          # 自动标签
├── storage/               # 存储适配器
│   ├── interface.go       # 存储接口定义
│   ├── local/             # 本地存储
│   ├── s3/                # S3 存储
│   ├── oss/               # 阿里云 OSS
│   ├── cos/               # 腾讯云 COS
│   ├── qiniu/             # 七牛云
│   ├── upyun/             # 又拍云
│   ├── webdav/            # WebDAV
│   ├── ftp/               # FTP
│   ├── sftp/              # SFTP
│   ├── cloudflare/        # Cloudflare R2
│   ├── backblaze/         # Backblaze B2
│   ├── gcs/               # Google Cloud Storage
│   └── azure/             # Azure Blob Storage
├── vector/                # 向量搜索
│   ├── client.go          # Qdrant 客户端
│   ├── embeddings.go      # 向量生成
│   └── search.go          # 语义搜索
├── cache/                 # 缓存模块
│   ├── redis.go           # Redis 缓存
│   └── memory.go          # 内存缓存
├── config/                # 配置管理
│   ├── loader.go          # 配置加载
│   └── validator.go       # 配置验证
├── database/              # 数据库
│   ├── mysql.go           # MySQL 驱动
│   └── sqlite.go          # SQLite 驱动
├── jwt/                   # JWT 处理
│   ├── generator.go       # Token 生成
│   └── validator.go       # Token 验证
├── logger/                # 日志系统
│   └── logger.go          # 日志记录器
└── utils/                 # 通用工具
    ├── file.go            # 文件工具
    ├── hash.go            # 哈希工具
    ├── image.go           # 图片工具
    └── string.go          # 字符串工具
```

**设计原则**：
- `pkg/` 下的包可以被项目外部引用
- 每个包都有明确的职责边界
- 接口驱动设计，易于扩展和测试

### migrations/ - 数据库迁移

```
migrations/
├── 000001_init_schema.up.sql
├── 000001_init_schema.down.sql
├── 000002_add_ai_fields.up.sql
├── 000002_add_ai_fields.down.sql
└── ...
```

**规范**：
- 使用 [golang-migrate](https://github.com/golang-migrate/migrate) 管理
- 命名格式：`{version}_{description}.{up|down}.sql`
- 每个迁移都有 up 和 down 脚本

## 前端结构

### web/ - 前端项目

基于 Vue 3 + TypeScript + Vite 构建：

```
web/
├── src/
│   ├── api/               # API 请求封装
│   │   ├── auth.ts        # 认证 API
│   │   ├── file/          # 文件 API
│   │   ├── folder/        # 文件夹 API
│   │   ├── upload/        # 上传 API
│   │   ├── search/        # 搜索 API
│   │   ├── openapi/       # 开放 API
│   │   └── ...            # 其他模块 API
│   ├── components/        # 组件库
│   │   ├── Button/        # 按钮组件
│   │   ├── Dialog/        # 对话框组件
│   │   ├── File/          # 文件组件
│   │   ├── FileViewer/    # 文件预览
│   │   ├── FolderTree/    # 文件夹树
│   │   ├── GlobalUploadDrawer/  # 全局上传抽屉
│   │   ├── WaterfallLayout/     # 瀑布流布局
│   │   └── ...            # 100+ 组件
│   ├── composables/       # 组合式函数
│   │   ├── useAuth.ts     # 认证逻辑
│   │   ├── useUpload.ts   # 上传逻辑
│   │   ├── useTheme.ts    # 主题切换
│   │   ├── useLocale.ts   # 国际化
│   │   ├── useGlobalUpload.ts   # 全局上传
│   │   ├── useGlobalWebSocket.ts # 全局 WebSocket
│   │   └── ...            # 30+ composables
│   ├── pages/             # 页面组件
│   │   ├── home/          # 首页
│   │   ├── auth/          # 登录/注册
│   │   ├── dashboard/     # 仪表板
│   │   ├── folders/       # 文件夹管理
│   │   ├── explore/       # 探索页面
│   │   ├── search/        # 搜索页面
│   │   ├── settings/      # 设置页面
│   │   ├── admin/         # 管理后台
│   │   ├── setup/         # 安装向导
│   │   ├── open-api/      # 开放 API 管理
│   │   ├── share/         # 分享页面
│   │   └── ...            # 20+ 页面
│   ├── router/            # 路由配置
│   │   ├── index.ts       # 路由实例
│   │   └── routes.ts      # 路由定义
│   ├── store/             # 状态管理（Pinia）
│   │   ├── auth.ts        # 认证状态
│   │   ├── theme.ts       # 主题状态
│   │   ├── layout.ts      # 布局状态
│   │   ├── upload/        # 上传状态
│   │   ├── settings/      # 设置状态
│   │   └── websocket.ts   # WebSocket 状态
│   ├── styles/            # 全局样式
│   │   ├── main.css       # 主样式
│   │   ├── design-system/ # 设计系统
│   │   └── ...            # 样式文件
│   ├── locales/           # 国际化
│   │   ├── zh-CN/         # 简体中文
│   │   ├── en-US/         # 英文
│   │   └── ja-JP/         # 日文
│   ├── types/             # TypeScript 类型
│   │   ├── api.ts         # API 类型
│   │   ├── business.ts    # 业务类型
│   │   ├── ui.ts          # UI 类型
│   │   └── ...            # 类型定义
│   ├── utils/             # 工具函数
│   │   ├── file/          # 文件工具
│   │   ├── network/       # 网络工具
│   │   ├── validation/    # 验证工具
│   │   └── ...            # 工具集合
│   ├── workers/           # Web Workers
│   │   ├── upload.worker.ts        # 上传 Worker
│   │   └── uploadWorkerManager.ts  # Worker 管理
│   ├── directives/        # 自定义指令
│   │   ├── lazy.ts        # 懒加载
│   │   ├── loading.ts     # 加载状态
│   │   └── ...            # 指令集合
│   ├── hooks/             # React-style Hooks
│   │   ├── useDevice.ts   # 设备检测
│   │   ├── useLoading.ts  # 加载状态
│   │   └── ...            # Hooks 集合
│   ├── layouts/           # 布局组件
│   │   ├── MainLayout.vue # 主布局
│   │   └── AdminLayout.vue # 管理布局
│   ├── constants/         # 常量定义
│   │   ├── api.ts         # API 常量
│   │   ├── config.ts      # 配置常量
│   │   └── ...            # 常量集合
│   ├── plugins/           # 插件
│   │   └── textTheme.ts   # 主题插件
│   ├── main.ts            # 应用入口
│   └── App.vue            # 根组件
├── public/                # 公共资源
│   ├── favicon.ico        # 网站图标
│   ├── logo.png           # Logo
│   └── assets/            # 静态资源
├── scripts/               # 构建脚本
│   └── check-i18n.mjs     # 国际化检查
├── package.json           # 依赖管理
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
└── tailwind.config.js     # Tailwind CSS 配置
```

**前端架构特点**：

1. **组件化设计**
   - 100+ 可复用组件
   - 每个组件独立目录，包含样式和类型定义

2. **Composables 模式**
   - 业务逻辑抽离为可复用的组合式函数
   - 状态管理使用 Pinia

3. **TypeScript 严格模式**
   - 完整的类型定义
   - 类型安全的 API 调用

4. **多语言支持**
   - 支持中文、英文、日文
   - 基于 vue-i18n 实现

5. **现代化构建**
   - Vite 快速开发和构建
   - 自动导入组件和 API
   - Web Workers 处理大文件上传

## 配置和部署

### configs/ - 配置文件

```
configs/
└── config.yaml            # 主配置文件（安装向导自动生成）
```

**配置内容**：
- 数据库连接
- JWT Secret（系统自动生成）
- 存储配置
- AI 配置
- Redis 配置
- Qdrant 配置

::: warning 注意
配置文件由安装向导（`/setup`）自动生成，**不需要手动创建或编辑**。
:::

### deploy/ - 部署配置

```
deploy/
├── install.sh             # 一键部署脚本
├── systemd/               # Systemd 服务文件
├── nginx/                 # Nginx 配置示例
└── ...                    # 其他部署配置
```

### docker/ - Docker 配置

```
docker/
├── docker-compose.yml     # Docker Compose 配置
├── Dockerfile.backend     # 后端镜像
├── Dockerfile.frontend    # 前端镜像
└── nginx.conf             # Nginx 配置
```

### scripts/ - 辅助脚本

```
scripts/
├── download-tech-icons.sh # 下载技术图标
├── build.sh               # 构建脚本
└── ...                    # 其他脚本
```

## 开发规范

### 后端代码规范

1. **包命名**：小写，简洁明了
2. **文件命名**：snake_case（如 `user_service.go`）
3. **接口定义**：放在 `pkg/` 或 `internal/` 的接口文件中
4. **错误处理**：使用 `pkg/errors` 包装错误
5. **日志记录**：使用 `pkg/logger` 统一记录

### 前端代码规范

1. **文件命名**：PascalCase 用于组件（如 `Button.vue`），camelCase 用于工具函数（如 `formatDate.ts`）
2. **组件结构**：`<script setup>` + `<template>` + `<style scoped>`
3. **类型定义**：所有 API 调用都要有类型定义
4. **国际化**：所有文本使用 `$t()` 包裹
5. **样式规范**：使用 Tailwind CSS + CSS 变量

### Git 工作流

1. **分支命名**
   - `feature/xxx` - 新功能
   - `fix/xxx` - Bug 修复
   - `docs/xxx` - 文档更新

2. **提交信息**
   - 格式：`type(scope): subject`
   - 类型：feat, fix, docs, style, refactor, test, chore

3. **Pull Request**
   - 代码审查必须通过
   - 测试必须通过
   - 遵循项目代码规范

## 下一步

- [开发环境](/docs/development/environment) - 搭建本地开发环境
- [贡献指南](/docs/development/contributing) - 学习如何贡献代码
- [API 文档](/docs/api/upload) - 了解 API 接口
