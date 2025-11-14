#!/bin/bash

ICON_DIR="docs/public/images/tech-icons"

# 下载函数
download_icon() {
  name=$1
  slug=$2
  url="https://cdn.simpleicons.org/${slug}"
  output="${ICON_DIR}/${name}.svg"

  curl -s "$url" -o "$output" 2>/dev/null
  if [ -f "$output" ] && [ -s "$output" ]; then
    echo "✓ ${name}"
  else
    echo "✗ ${name} 失败"
  fi
}

echo "开始下载技术栈图标..."

# 下载所有图标
download_icon "go" "go"
download_icon "vue" "vuedotjs"
download_icon "typescript" "typescript"
download_icon "gin" "gin"
download_icon "gorm" "go"
download_icon "mysql" "mysql"
download_icon "sqlite" "sqlite"
download_icon "redis" "redis"
download_icon "qdrant" "qdrant"
download_icon "vite" "vite"
download_icon "tailwindcss" "tailwindcss"
download_icon "pinia" "pinia"
download_icon "vue-router" "vuerouter"
download_icon "axios" "axios"
download_icon "openai" "openai"
download_icon "claude" "anthropic"
download_icon "vector-search" "vectorworks"
download_icon "aws-s3" "amazons3"
download_icon "aliyun" "alibabacloud"
download_icon "tencent" "tencentqq"
download_icon "cloudflare" "cloudflare"
download_icon "webp" "webp"
download_icon "image-processing" "imagemagick"
download_icon "websocket" "socketdotio"
download_icon "jwt" "jsonwebtokens"
download_icon "oauth" "auth0"
download_icon "gsap" "greensock"
download_icon "echarts" "apacheecharts"
download_icon "docker" "docker"
download_icon "markdown" "markdown"

echo "图标下载完成！"
