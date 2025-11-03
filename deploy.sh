#!/bin/bash

# PixelPunk 文档网站部署脚本
# 本地打包后上传到指定目录

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 配置变量
APP_NAME="PixelPunk Website"
BUILD_DIR="docs/.vitepress/dist"
CONFIG_FILE="deploy.config"

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 显示帮助信息
show_help() {
    cat << EOF
PixelPunk 文档网站部署脚本

用法: $0 [选项]

选项:
  -h, --help      显示帮助信息
  -c, --config    指定配置文件路径 (默认: deploy.config)
  --clean         清理构建目录后重新构建
  --dry-run       模拟部署，不实际上传文件

示例:
  $0                    # 使用默认配置部署
  $0 --clean            # 清理后重新构建部署
  $0 --dry-run          # 模拟部署过程
  $0 -c my.config       # 使用自定义配置文件

配置文件格式 (deploy.config):
  DEPLOY_HOST=your.server.com
  DEPLOY_USER=username
  DEPLOY_PATH=/var/www/html
  DEPLOY_PORT=22

EOF
}

# 解析命令行参数
parse_arguments() {
    CLEAN_BUILD=false
    DRY_RUN=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -c|--config)
                CONFIG_FILE="$2"
                shift 2
                ;;
            --clean)
                CLEAN_BUILD=true
                shift
                ;;
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            *)
                log_error "未知参数: $1"
                show_help
                exit 1
                ;;
        esac
    done
}

# 加载配置文件
load_config() {
    if [[ -f "$CONFIG_FILE" ]]; then
        log_info "加载配置文件: $CONFIG_FILE"
        source "$CONFIG_FILE"
    else
        log_warning "配置文件 $CONFIG_FILE 不存在，使用默认配置或环境变量"
    fi
    
    # 检查必要配置
    if [[ -z "$DEPLOY_HOST" ]]; then
        log_error "DEPLOY_HOST 未配置"
        exit 1
    fi
    
    if [[ -z "$DEPLOY_USER" ]]; then
        log_error "DEPLOY_USER 未配置"
        exit 1
    fi
    
    if [[ -z "$DEPLOY_PATH" ]]; then
        log_error "DEPLOY_PATH 未配置"
        exit 1
    fi
    
    # 设置默认值
    DEPLOY_PORT=${DEPLOY_PORT:-22}
    SSH_KEY=${SSH_KEY:-~/.ssh/id_rsa}
    
    # 验证SSH密钥
    if [[ ! -f "$SSH_KEY" ]]; then
        log_error "SSH密钥文件不存在: $SSH_KEY"
        log_info "请检查SSH_KEY配置或生成SSH密钥对"
        exit 1
    fi
    
    # 构建SSH选项
    SSH_OPTIONS="-P $DEPLOY_PORT -i $SSH_KEY -o StrictHostKeyChecking=no"
    SSH_CONNECT_OPTIONS="-p $DEPLOY_PORT -i $SSH_KEY -o StrictHostKeyChecking=no"
    
    log_info "部署配置:"
    log_info "  主机: $DEPLOY_HOST"
    log_info "  用户: $DEPLOY_USER"
    log_info "  路径: $DEPLOY_PATH"
    log_info "  端口: $DEPLOY_PORT"
    log_info "  SSH密钥: $SSH_KEY"
}

# 检查依赖
check_dependencies() {
    log_info "检查依赖..."
    
    local required_commands=("npm" "tar" "scp" "ssh")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            log_error "缺少必要命令: $cmd"
            exit 1
        fi
    done
    
    log_success "依赖检查通过"
}

# 构建项目
build_project() {
    log_info "开始构建项目..."
    
    # 清理构建目录
    if [[ "$CLEAN_BUILD" == "true" ]]; then
        log_info "清理构建目录..."
        rm -rf "$BUILD_DIR"
        rm -rf node_modules/.cache
    fi
    
    # 安装依赖
    log_info "安装依赖..."
    npm install
    
    # 构建
    log_info "构建文档网站..."
    npm run build
    
    # 检查构建结果
    if [[ ! -d "$BUILD_DIR" ]]; then
        log_error "构建失败：未找到构建目录 $BUILD_DIR"
        exit 1
    fi
    
    log_success "项目构建完成"
}

# 生成构建时间戳
generate_build_timestamp() {
    log_info "生成构建时间戳..."
    
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local timestamp_file="$BUILD_DIR/build-timestamp.json"
    
    cat > "$timestamp_file" << EOF
{
  "buildTime": "$timestamp",
  "buildTimestamp": $(date +%s)
}
EOF
    
    log_success "构建时间戳已生成: $timestamp"
}

# 上传文件
upload_files() {
    log_info "开始上传文件..."
    
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local archive_name="website_${timestamp}.tar.gz"
    local temp_dir="/tmp/pixelpunk-deploy"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "模拟上传模式，显示将要执行的命令："
        echo "1. 压缩: tar -czf $temp_dir/$archive_name -C $BUILD_DIR ."
        echo "2. 清空: ssh $SSH_CONNECT_OPTIONS $DEPLOY_USER@$DEPLOY_HOST 'rm -rf $DEPLOY_PATH/* $DEPLOY_PATH/.*'"
        echo "3. 上传: scp $SSH_OPTIONS $temp_dir/$archive_name $DEPLOY_USER@$DEPLOY_HOST:/tmp/"
        echo "4. 解压: ssh $SSH_CONNECT_OPTIONS $DEPLOY_USER@$DEPLOY_HOST 'cd $DEPLOY_PATH && tar -xzf /tmp/$archive_name'"
        return 0
    fi
    
    # 测试连接
    log_info "测试服务器连接..."
    if ! ssh $SSH_CONNECT_OPTIONS -o ConnectTimeout=10 "$DEPLOY_USER@$DEPLOY_HOST" "echo 'Connection test successful'"; then
        log_error "无法连接到服务器 $DEPLOY_HOST"
        log_info "请检查："
        log_info "  1. 服务器地址和端口是否正确"
        log_info "  2. SSH密钥是否正确配置"
        log_info "  3. 服务器是否已添加公钥到 ~/.ssh/authorized_keys"
        exit 1
    fi
    
    # 创建临时目录
    mkdir -p "$temp_dir"
    
    # 压缩文件
    log_info "压缩文件..."
    cd "$BUILD_DIR"
    tar -czf "$temp_dir/$archive_name" .
    
    if [[ ! -f "$temp_dir/$archive_name" ]]; then
        log_error "文件压缩失败"
        exit 1
    fi
    
    local archive_size=$(du -h "$temp_dir/$archive_name" | cut -f1)
    log_success "文件压缩完成，大小: $archive_size"
    
    # 清空服务器目录
    log_info "清空服务器目录..."
    ssh $SSH_CONNECT_OPTIONS "$DEPLOY_USER@$DEPLOY_HOST" "
        # 创建目录（如果不存在）
        mkdir -p '$DEPLOY_PATH'
        
        # 清空目录内容，保留目录本身
        find '$DEPLOY_PATH' -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true
        
        # 清理可能的隐藏文件
        find '$DEPLOY_PATH' -name '.*' -not -name '.' -not -name '..' -exec rm -rf {} + 2>/dev/null || true
    "
    
    # 上传压缩文件
    log_info "上传压缩文件到服务器..."
    scp $SSH_OPTIONS "$temp_dir/$archive_name" "$DEPLOY_USER@$DEPLOY_HOST:/tmp/"
    
    if [[ $? -ne 0 ]]; then
        log_error "文件上传失败"
        rm -rf "$temp_dir"
        exit 1
    fi
    
    # 解压文件
    log_info "在服务器上解压文件..."
    ssh $SSH_CONNECT_OPTIONS "$DEPLOY_USER@$DEPLOY_HOST" "
        cd '$DEPLOY_PATH' && 
        tar -xzf '/tmp/$archive_name' 2>/dev/null &&
        rm -f '/tmp/$archive_name'
    " >/dev/null 2>&1
    
    if [[ $? -eq 0 ]]; then
        log_success "文件上传和解压完成"
    else
        log_error "文件解压失败"
        exit 1
    fi
    
    # 清理本地临时文件
    rm -rf "$temp_dir"
}

# 验证部署
verify_deployment() {
    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "跳过部署验证（模拟模式）"
        return 0
    fi
    
    log_info "验证部署..."
    
    # 检查远程文件
    if ssh $SSH_CONNECT_OPTIONS "$DEPLOY_USER@$DEPLOY_HOST" "test -f $DEPLOY_PATH/index.html"; then
        log_success "部署验证通过"
    else
        log_warning "部署验证失败：未找到 index.html"
    fi
}

# 显示部署信息
show_deployment_info() {
    echo
    echo "========================================"
    echo "         部署完成！"
    echo "========================================"
    echo
    echo "应用信息:"
    echo "  名称: $APP_NAME"
    echo "  构建目录: $BUILD_DIR"
    echo
    echo "部署信息:"
    echo "  主机: $DEPLOY_HOST"
    echo "  用户: $DEPLOY_USER"
    echo "  路径: $DEPLOY_PATH"
    echo "  端口: $DEPLOY_PORT"
    echo
    echo "访问地址:"
    echo "  http://$DEPLOY_HOST"
    echo "  https://$DEPLOY_HOST"
    echo
    
    if [[ "$DRY_RUN" == "true" ]]; then
        echo "注意: 这是模拟部署，实际文件未上传"
    fi
}

# 主函数
main() {
    echo "========================================"
    echo "    PixelPunk 文档网站部署脚本"
    echo "========================================"
    echo
    
    # 解析参数
    parse_arguments "$@"
    
    # 加载配置
    load_config
    
    # 检查依赖
    check_dependencies
    
    # 构建项目
    build_project
    
    # 生成构建时间戳
    generate_build_timestamp
    
    # 上传文件
    upload_files
    
    # 验证部署
    verify_deployment
    
    # 显示部署信息
    show_deployment_info
}

# 运行主函数
main "$@"