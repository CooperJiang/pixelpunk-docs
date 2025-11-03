# PixelPunk Website Dockerfile

# 构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制包文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建项目
RUN npm run build

# 生产阶段
FROM nginx:alpine

# 安装必要工具
RUN apk add --no-cache curl

# 复制自定义 nginx 配置
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S pixelpunk -u 1001

# 设置正确的权限
RUN chown -R pixelpunk:nodejs /usr/share/nginx/html && \
    chown -R pixelpunk:nodejs /var/cache/nginx && \
    chown -R pixelpunk:nodejs /var/log/nginx && \
    chown -R pixelpunk:nodejs /etc/nginx/conf.d

# 切换到非 root 用户
USER pixelpunk

# 暴露端口
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# 启动命令
CMD ["nginx", "-g", "daemon off;"]