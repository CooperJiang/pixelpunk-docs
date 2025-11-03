# PixelPunk Website Makefile

.PHONY: help install dev build preview clean deploy setup

# 默认目标
help: ## 显示帮助信息
	@echo "PixelPunk 官方网站构建工具"
	@echo ""
	@echo "可用命令:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## 初始化项目环境
	@echo "🚀 初始化 PixelPunk 官网项目..."
	@if ! command -v node >/dev/null 2>&1; then \
		echo "❌ 未找到 Node.js，请先安装 Node.js 18+"; \
		exit 1; \
	fi
	@echo "✅ Node.js 版本: $$(node --version)"
	@echo "✅ npm 版本: $$(npm --version)"
	@echo "📦 安装依赖..."
	@npm install
	@echo "✅ 项目初始化完成！"
	@echo ""
	@echo "下一步："
	@echo "  make dev     # 启动开发服务器"
	@echo "  make build   # 构建生产版本"

install: ## 安装项目依赖
	@echo "📦 安装项目依赖..."
	@npm install
	@echo "✅ 依赖安装完成"

dev: ## 启动开发服务器
	@echo "🌐 启动开发服务器..."
	@echo "📍 访问地址: http://localhost:5173"
	@echo "🎯 赛博朋克风格的 PixelPunk 官网"
	@echo ""
	@npm run dev

build: ## 构建生产版本
	@echo "🔨 构建生产版本..."
	@npm run build
	@echo "✅ 构建完成，文件位于 docs/.vitepress/dist/"

preview: ## 预览构建结果
	@echo "👀 预览构建结果..."
	@npm run preview

clean: ## 清理构建文件
	@echo "🧹 清理构建文件..."
	@rm -rf docs/.vitepress/dist
	@rm -rf docs/.vitepress/cache
	@rm -rf node_modules/.vite
	@echo "✅ 清理完成"

fix-deps: ## 修复依赖问题
	@echo "🔧 修复依赖问题..."
	@rm -rf node_modules package-lock.json
	@npm install
	@echo "✅ 依赖修复完成"

lint: ## 代码检查
	@echo "🔍 运行代码检查..."
	@if command -v eslint >/dev/null 2>&1; then \
		npm run lint; \
	else \
		echo "⚠️  ESLint 未安装，跳过代码检查"; \
	fi

format: ## 格式化代码
	@echo "🎨 格式化代码..."
	@if command -v prettier >/dev/null 2>&1; then \
		npm run format; \
	else \
		echo "⚠️  Prettier 未安装，跳过代码格式化"; \
	fi

check: ## 检查项目状态
	@echo "🔍 检查项目状态..."
	@echo "Node.js: $$(node --version)"
	@echo "npm: $$(npm --version)"
	@echo "项目目录: $$(pwd)"
	@if [ -f "package.json" ]; then \
		echo "✅ package.json 存在"; \
	else \
		echo "❌ package.json 不存在"; \
	fi
	@if [ -d "node_modules" ]; then \
		echo "✅ 依赖已安装"; \
	else \
		echo "❌ 依赖未安装，运行 make install"; \
	fi
	@if [ -f "docs/.vitepress/config.ts" ]; then \
		echo "✅ VitePress 配置存在"; \
	else \
		echo "❌ VitePress 配置不存在"; \
	fi

# Docker 相关命令
docker-build: ## 构建 Docker 镜像
	@echo "🐳 构建 Docker 镜像..."
	@docker build -t pixelpunk-website .
	@echo "✅ Docker 镜像构建完成"

docker-run: ## 运行 Docker 容器
	@echo "🐳 运行 Docker 容器..."
	@docker run -d -p 80:80 --name pixelpunk-website pixelpunk-website
	@echo "✅ 容器已启动，访问 http://localhost"

docker-stop: ## 停止 Docker 容器
	@echo "🛑 停止 Docker 容器..."
	@docker stop pixelpunk-website || true
	@docker rm pixelpunk-website || true
	@echo "✅ 容器已停止"

# 部署相关命令
deploy-vercel: ## 部署到 Vercel
	@echo "🚀 部署到 Vercel..."
	@if command -v vercel >/dev/null 2>&1; then \
		vercel --prod; \
	else \
		echo "❌ Vercel CLI 未安装，请运行: npm i -g vercel"; \
	fi

deploy-netlify: ## 部署到 Netlify
	@echo "🚀 部署到 Netlify..."
	@if command -v netlify >/dev/null 2>&1; then \
		npm run build && netlify deploy --prod --dir docs/.vitepress/dist; \
	else \
		echo "❌ Netlify CLI 未安装，请运行: npm i -g netlify-cli"; \
	fi

deploy-github: ## 部署到 GitHub Pages
	@echo "🚀 部署到 GitHub Pages..."
	@npm run build
	@if [ -d "docs/.vitepress/dist" ]; then \
		cd docs/.vitepress/dist && \
		git init && \
		git add -A && \
		git commit -m "Deploy to GitHub Pages" && \
		git push -f git@github.com:CooperJiang/PixelPunk.git main:gh-pages; \
	else \
		echo "❌ 构建目录不存在，请先运行 make build"; \
	fi

# 开发工具
serve: ## 使用简单HTTP服务器预览
	@echo "🌐 启动简单HTTP服务器..."
	@if [ -d "docs/.vitepress/dist" ]; then \
		cd docs/.vitepress/dist && python3 -m http.server 8080; \
	else \
		echo "❌ 构建目录不存在，请先运行 make build"; \
	fi

analyze: ## 分析构建产物
	@echo "📊 分析构建产物..."
	@if [ -d "docs/.vitepress/dist" ]; then \
		echo "构建目录大小:"; \
		du -sh docs/.vitepress/dist; \
		echo ""; \
		echo "文件数量:"; \
		find docs/.vitepress/dist -type f | wc -l; \
		echo ""; \
		echo "最大的文件:"; \
		find docs/.vitepress/dist -type f -exec ls -lh {} \; | sort -k5 -hr | head -10; \
	else \
		echo "❌ 构建目录不存在，请先运行 make build"; \
	fi

# 维护命令
update: ## 更新依赖
	@echo "📦 更新项目依赖..."
	@npm update
	@echo "✅ 依赖更新完成"

reset: clean install ## 重置项目（清理后重新安装）
	@echo "🔄 项目重置完成"

# 信息命令
info: ## 显示项目信息
	@echo "PixelPunk 官方网站"
	@echo "=================="
	@echo "项目描述: AI 智能图床平台官方网站"
	@echo "技术栈: VitePress + Vue 3 + TypeScript + Tailwind CSS + GSAP"
	@echo "风格: 赛博朋克"
	@echo "版本: 1.0.0"
	@echo ""
	@echo "目录结构:"
	@echo "├── docs/                 # 文档和页面内容"
	@echo "├── docs/.vitepress/      # VitePress 配置"
	@echo "├── docs/.vitepress/theme/# 自定义主题"
	@echo "├── tailwind.config.js    # Tailwind 配置"
	@echo "├── package.json          # 项目配置"
	@echo "└── Makefile             # 构建脚本"

# 快速命令别名
start: dev ## 别名: 启动开发服务器
stop: ## 停止开发服务器 (Ctrl+C)
	@echo "💡 使用 Ctrl+C 停止开发服务器"

# 一键命令
all: clean install build ## 完整构建流程
	@echo "🎉 完整构建流程完成！"

quick: ## 快速开发设置
	@echo "⚡ 快速开发设置..."
	@make check
	@if [ ! -d "node_modules" ]; then make install; fi
	@make dev