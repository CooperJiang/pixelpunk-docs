# 开发环境

本文档帮助开发者快速搭建 PixelPunk 本地开发环境，开始参与项目开发。

## 环境要求

在开始之前，请确保你的开发环境满足以下要求：

| 工具 | 版本要求 | 说明 |
|------|---------|------|
| **Go** | 1.23.0+ | 后端开发语言 |
| **Node.js** | 18.0+ | 前端开发环境 |
| **pnpm** | 最新版 | 前端包管理器 |
| **Docker** | 最新版 | 用于运行 Qdrant（可选） |

::: tip 0 配置设计
PixelPunk 采用 **0 配置启动**设计，无需手动创建或编辑配置文件，所有配置都通过 Web 安装向导完成。
:::

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/CooperJiang/PixelPunk-v1.git
cd PixelPunk-v1
```

### 2. 启动后端

直接运行，无需任何配置：

```bash
go run cmd/main.go
```

后端启动后访问地址：`http://localhost:9520`

### 3. 启动前端

```bash
cd web

# 安装依赖（首次运行）
pnpm install

# 启动开发服务器
npm run dev
```

前端启动后访问地址：`http://localhost:3800`

### 4. 完成安装向导

首次启动时，浏览器会自动跳转到 `/setup` 页面，按照向导完成配置：

1. **数据库配置** - 选择 SQLite（开发推荐）或 MySQL
2. **管理员账户** - 设置管理员用户名和密码
3. **存储配置** - 选择本地存储或云存储
4. **AI 配置** - 配置 OpenAI API Key（可选）
5. **完成安装** - 系统自动生成配置文件并重启

::: tip 自动配置
安装向导完成后，系统会自动生成 `configs/config.yaml` 文件，包括：
- 自动生成的 JWT Secret
- 数据库连接配置
- 存储配置
- AI 配置

所有敏感信息（如 JWT Secret）都由系统自动生成，无需手动配置。
:::

## 启用向量搜索（可选）

如果需要使用向量搜索功能（以图搜图、语义搜索），需要启动 Qdrant 向量数据库：

```bash
make qdrant-start
```

这个命令会自动：
- 检测 Docker 环境
- 下载 Qdrant 镜像
- 启动 Qdrant 服务（端口 6333）

其他 Qdrant 管理命令：
```bash
make qdrant-stop      # 停止 Qdrant
make qdrant-restart   # 重启 Qdrant
make qdrant-status    # 查看运行状态
```

::: warning 向量搜索依赖
向量搜索功能依赖 Qdrant 向量数据库。如果不启动 Qdrant，以图搜图和语义搜索功能将无法使用，但不影响其他功能。
:::

## 推荐的启动顺序

建议打开 **2-3 个终端窗口**，按顺序执行：

### 最小启动（无向量搜索）

1. **终端 1**: `go run cmd/main.go` - 启动后端
2. **终端 2**: `cd web && npm run dev` - 启动前端
3. **浏览器**: 访问 `http://localhost:3800` - 完成安装向导

### 完整启动（含向量搜索）

1. **终端 1**: `make qdrant-start` - 启动 Qdrant（首次会自动下载）
2. **终端 2**: `go run cmd/main.go` - 启动后端
3. **终端 3**: `cd web && npm run dev` - 启动前端
4. **浏览器**: 访问 `http://localhost:3800` - 完成安装向导

## 验证环境

启动所有服务后，访问以下地址验证：

| 服务 | 地址 | 说明 |
|------|------|------|
| **前端** | http://localhost:3800 | 主界面（首次访问自动跳转 /setup） |
| **后端 API** | http://localhost:9520 | API 服务 |
| **Qdrant** | http://localhost:6333/dashboard | 向量数据库控制台（可选） |

如果前端能正常访问并显示安装向导，说明开发环境搭建成功！

## 常用开发命令

### 后端命令

```bash
# 启动后端
go run cmd/main.go

# 编译项目
go build -o bin/pixelpunk cmd/main.go

# 运行测试
go test ./...

# 代码格式化
gofmt -s -w .
```

### 前端命令

```bash
cd web

# 安装依赖
pnpm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint:check

# 自动修复代码问题
npm run lint:fix

# 类型检查
npm run type-check
```

### Qdrant 命令

```bash
# 启动 Qdrant（自动下载镜像）
make qdrant-start

# 停止 Qdrant
make qdrant-stop

# 重启 Qdrant
make qdrant-restart

# 查看 Qdrant 状态
make qdrant-status
```

## 常见问题

### 首次访问没有跳转到安装向导？

如果首次访问没有自动跳转到 `/setup` 页面：

1. 检查后端是否正常启动（`http://localhost:9520`）
2. 检查前端是否正常启动（`http://localhost:3800`）
3. 手动访问：`http://localhost:3800/setup`

### 端口被占用

如果启动时提示端口被占用，可以手动清理进程：

```bash
# 清理后端端口 9520
lsof -ti:9520 | xargs kill -9

# 清理前端端口 3800
lsof -ti:3800 | xargs kill -9

# 清理 Qdrant 端口 6333
lsof -ti:6333 | xargs kill -9
```

### 安装向导完成后需要重启吗？

完成安装向导后，系统会自动生成配置文件。建议重启后端服务：

```bash
# 在后端终端按 Ctrl+C 停止，然后重新运行
go run cmd/main.go
```

### Qdrant 启动失败

如果 `make qdrant-start` 失败：

1. 确保 Docker 已安装并运行
2. 检查端口 6333 是否被占用
3. 查看详细错误信息，可能需要拉取镜像权限

### 前端依赖安装失败

如果 `pnpm install` 失败：

```bash
# 清理缓存
rm -rf web/node_modules
rm -rf web/pnpm-lock.yaml

# 重新安装
cd web
pnpm install
```

### Go 依赖下载慢

如果 Go 依赖下载慢，可以设置国内镜像：

```bash
go env -w GOPROXY=https://goproxy.cn,direct
```

### 如何重置配置？

如果需要重新进行安装向导：

```bash
# 删除配置文件
rm configs/config.yaml

# 删除数据库文件（如果使用 SQLite）
rm -rf data/

# 重新启动后端，会自动跳转到安装向导
go run cmd/main.go
```

## 开发工具推荐

### IDE / 编辑器

- **GoLand** / **VS Code** - Go 开发
- **WebStorm** / **VS Code** - 前端开发

### VS Code 推荐插件

**Go 开发：**
- Go (官方)
- Go Nightly

**Vue 开发：**
- Vue - Official (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier

**通用：**
- GitLens
- Error Lens
- Path Intellisense

## 下一步

开发环境搭建完成后，你可以：

- [查看源码结构](/docs/development/structure) - 了解项目代码组织
- [阅读贡献指南](/docs/development/contributing) - 学习如何贡献代码
