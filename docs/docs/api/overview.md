# API 概览

PixelPunk 提供完整的 RESTful API，支持所有平台功能，方便第三方集成和自定义开发。

## 基础信息

### API 地址

```
生产环境: https://api.pixelpunk.io/v1
测试环境: https://demo-api.pixelpunk.io/v1
本地开发: http://localhost:8080/api/v1
```

### 协议和格式

- **协议**: HTTPS (生产环境) / HTTP (开发环境)
- **格式**: JSON
- **编码**: UTF-8
- **版本**: v1 (当前版本)

### 认证方式

PixelPunk API 支持多种认证方式：

1. **API Key** - 适用于服务端应用
2. **JWT Token** - 适用于用户会话
3. **OAuth 2.0** - 适用于第三方应用 (即将推出)

## 快速开始

### 1. 获取 API Key

```bash
# 通过 CLI 创建 API Key
./pixelpunk api:create-key --name="My App" --scopes="read,write"

# 或通过管理后台创建
# 登录管理后台 -> 设置 -> API 密钥 -> 创建新密钥
```

### 2. 第一个 API 调用

```bash
curl -X GET \
  https://api.pixelpunk.io/v1/images \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### 3. 上传图片

```bash
curl -X POST \
  https://api.pixelpunk.io/v1/images/upload \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@/path/to/your/image.jpg" \
  -F "folder_id=1" \
  -F "tags=landscape,sunset"
```

## API 分类

### 认证授权 (8 个接口)

| 接口 | 方法 | 路径 | 描述 |
|------|------|------|------|
| 用户注册 | POST | `/auth/register` | 注册新用户 |
| 用户登录 | POST | `/auth/login` | 用户登录获取 Token |
| 刷新 Token | POST | `/auth/refresh` | 刷新访问令牌 |
| 用户注销 | POST | `/auth/logout` | 注销用户会话 |
| 忘记密码 | POST | `/auth/forgot-password` | 发送重置密码邮件 |
| 重置密码 | POST | `/auth/reset-password` | 重置用户密码 |
| 验证邮箱 | POST | `/auth/verify-email` | 验证邮箱地址 |
| 获取用户信息 | GET | `/auth/me` | 获取当前用户信息 |

### 图片管理 (15 个接口)

| 接口 | 方法 | 路径 | 描述 |
|------|------|------|------|
| 上传图片 | POST | `/images/upload` | 上传单张或多张图片 |
| 获取图片列表 | GET | `/images` | 获取图片列表 |
| 获取图片详情 | GET | `/images/{id}` | 获取指定图片详情 |
| 更新图片信息 | PUT | `/images/{id}` | 更新图片标题、描述等 |
| 删除图片 | DELETE | `/images/{id}` | 删除指定图片 |
| 批量操作 | POST | `/images/batch` | 批量移动、删除、标签 |
| 搜索图片 | GET | `/images/search` | 按关键词搜索图片 |
| 获取缩略图 | GET | `/images/{id}/thumbnail` | 获取图片缩略图 |
| 下载原图 | GET | `/images/{id}/download` | 下载原始图片 |
| 图片统计 | GET | `/images/stats` | 获取图片统计信息 |
| 获取 EXIF | GET | `/images/{id}/exif` | 获取图片 EXIF 信息 |
| 转换格式 | POST | `/images/{id}/convert` | 转换图片格式 |
| 压缩图片 | POST | `/images/{id}/compress` | 压缩图片文件 |
| 图片历史 | GET | `/images/{id}/history` | 获取图片操作历史 |
| 恢复图片 | POST | `/images/{id}/restore` | 恢复已删除图片 |

### 文件夹管理 (8 个接口)

| 接口 | 方法 | 路径 | 描述 |
|------|------|------|------|
| 创建文件夹 | POST | `/folders` | 创建新文件夹 |
| 获取文件夹列表 | GET | `/folders` | 获取文件夹树形结构 |
| 获取文件夹详情 | GET | `/folders/{id}` | 获取文件夹内容 |
| 更新文件夹 | PUT | `/folders/{id}` | 更新文件夹信息 |
| 删除文件夹 | DELETE | `/folders/{id}` | 删除文件夹 |
| 移动文件夹 | POST | `/folders/{id}/move` | 移动文件夹位置 |
| 复制文件夹 | POST | `/folders/{id}/copy` | 复制文件夹 |
| 文件夹统计 | GET | `/folders/{id}/stats` | 获取文件夹统计 |

### AI 分析 (12 个接口)

| 接口 | 方法 | 路径 | 描述 |
|------|------|------|------|
| 智能分析 | POST | `/ai/analyze` | 对图片进行 AI 分析 |
| 批量分析 | POST | `/ai/batch-analyze` | 批量 AI 分析 |
| 获取分析结果 | GET | `/ai/results/{id}` | 获取分析结果 |
| 标签建议 | GET | `/ai/tag-suggestions` | 获取标签建议 |
| 内容检测 | POST | `/ai/content-safety` | 内容安全检测 |
| 质量评估 | POST | `/ai/quality-assessment` | 图片质量评估 |
| 色彩分析 | POST | `/ai/color-analysis` | 图片色彩分析 |
| 相似图片 | GET | `/ai/similar-images/{id}` | 查找相似图片 |
| 描述生成 | POST | `/ai/generate-description` | 生成图片描述 |
| 分析历史 | GET | `/ai/analysis-history` | 获取分析历史 |
| 分析统计 | GET | `/ai/stats` | 获取 AI 分析统计 |
| 模型信息 | GET | `/ai/models` | 获取可用 AI 模型 |

### 分享管理 (10 个接口)

| 接口 | 方法 | 路径 | 描述 |
|------|------|------|------|
| 创建分享 | POST | `/shares` | 创建分享链接 |
| 获取分享列表 | GET | `/shares` | 获取分享列表 |
| 获取分享详情 | GET | `/shares/{id}` | 获取分享详情 |
| 更新分享配置 | PUT | `/shares/{id}` | 更新分享设置 |
| 删除分享 | DELETE | `/shares/{id}` | 删除分享链接 |
| 访问分享 | GET | `/public/shares/{token}` | 访问公开分享 |
| 分享统计 | GET | `/shares/{id}/stats` | 获取分享统计 |
| 访问日志 | GET | `/shares/{id}/logs` | 获取访问日志 |
| 批量分享 | POST | `/shares/batch` | 批量创建分享 |
| 分享设置 | GET | `/shares/settings` | 获取分享设置 |

### 标签管理 (6 个接口)

| 接口 | 方法 | 路径 | 描述 |
|------|------|------|------|
| 获取标签列表 | GET | `/tags` | 获取所有标签 |
| 创建标签 | POST | `/tags` | 创建新标签 |
| 更新标签 | PUT | `/tags/{id}` | 更新标签信息 |
| 删除标签 | DELETE | `/tags/{id}` | 删除标签 |
| 标签统计 | GET | `/tags/stats` | 获取标签使用统计 |
| 合并标签 | POST | `/tags/merge` | 合并重复标签 |

### 用户管理 (8 个接口)

| 接口 | 方法 | 路径 | 描述 |
|------|------|------|------|
| 获取用户列表 | GET | `/users` | 获取用户列表 |
| 创建用户 | POST | `/users` | 创建新用户 |
| 获取用户详情 | GET | `/users/{id}` | 获取用户详情 |
| 更新用户信息 | PUT | `/users/{id}` | 更新用户信息 |
| 删除用户 | DELETE | `/users/{id}` | 删除用户 |
| 用户统计 | GET | `/users/stats` | 获取用户统计 |
| 用户活动 | GET | `/users/{id}/activities` | 获取用户活动日志 |
| 重置密码 | POST | `/users/{id}/reset-password` | 管理员重置用户密码 |

### 系统管理 (12 个接口)

| 接口 | 方法 | 路径 | 描述 |
|------|------|------|------|
| 系统信息 | GET | `/system/info` | 获取系统信息 |
| 健康检查 | GET | `/system/health` | 系统健康检查 |
| 系统统计 | GET | `/system/stats` | 获取系统统计 |
| 配置管理 | GET | `/system/config` | 获取系统配置 |
| 更新配置 | PUT | `/system/config` | 更新系统配置 |
| 日志查询 | GET | `/system/logs` | 查询系统日志 |
| 性能指标 | GET | `/system/metrics` | 获取性能指标 |
| 备份数据 | POST | `/system/backup` | 创建数据备份 |
| 恢复数据 | POST | `/system/restore` | 恢复数据备份 |
| 清理缓存 | POST | `/system/cache/clear` | 清理系统缓存 |
| 存储信息 | GET | `/system/storage` | 获取存储信息 |
| 任务队列 | GET | `/system/queues` | 获取任务队列状态 |

## 通用规范

### 请求格式

#### HTTP Headers

```http
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
Accept: application/json
User-Agent: YourApp/1.0.0
```

#### 请求参数

**查询参数** (GET 请求):
```
GET /api/v1/images?page=1&limit=20&sort=created_at&order=desc
```

**请求体** (POST/PUT 请求):
```json
{
  "title": "My Image",
  "description": "Image description",
  "tags": ["tag1", "tag2"],
  "folder_id": 1
}
```

**文件上传** (multipart/form-data):
```
Content-Type: multipart/form-data

image: (binary)
title: "My Image"
folder_id: 1
```

### 响应格式

#### 成功响应

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "My Image",
    "url": "https://cdn.pixelpunk.io/images/abc123.jpg",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "message": "操作成功",
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

#### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": [
      {
        "field": "title",
        "message": "标题不能为空"
      }
    ]
  },
  "request_id": "req_1234567890"
}
```

### 状态码

| 状态码 | 描述 | 说明 |
|--------|------|------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 204 | No Content | 删除成功，无内容返回 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权，需要认证 |
| 403 | Forbidden | 禁止访问，权限不足 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突 |
| 422 | Unprocessable Entity | 请求格式正确但语义错误 |
| 429 | Too Many Requests | 请求频率超限 |
| 500 | Internal Server Error | 服务器内部错误 |

### 分页

#### 分页参数

```
GET /api/v1/images?page=1&limit=20
```

- `page`: 页码，从 1 开始 (默认: 1)
- `limit`: 每页数量 (默认: 20，最大: 100)

#### 分页响应

```json
{
  "data": [...],
  "meta": {
    "total": 1000,
    "page": 1,
    "limit": 20,
    "pages": 50,
    "has_next": true,
    "has_prev": false
  },
  "links": {
    "first": "/api/v1/images?page=1&limit=20",
    "last": "/api/v1/images?page=50&limit=20",
    "next": "/api/v1/images?page=2&limit=20",
    "prev": null
  }
}
```

### 排序和筛选

#### 排序参数

```
GET /api/v1/images?sort=created_at&order=desc
```

- `sort`: 排序字段 (created_at, updated_at, title, size)
- `order`: 排序方向 (asc, desc)

#### 筛选参数

```
GET /api/v1/images?tags=landscape,sunset&folder_id=1&date_from=2024-01-01
```

常用筛选参数：
- `tags`: 标签筛选 (逗号分隔)
- `folder_id`: 文件夹 ID
- `date_from`/`date_to`: 日期范围
- `search`: 关键词搜索

### 批量操作

#### 批量请求格式

```json
{
  "operation": "delete",
  "ids": [1, 2, 3, 4, 5],
  "options": {
    "force": false,
    "notify": true
  }
}
```

#### 批量响应格式

```json
{
  "success": true,
  "data": {
    "total": 5,
    "success": 4,
    "failed": 1,
    "results": [
      {"id": 1, "status": "success"},
      {"id": 2, "status": "success"},
      {"id": 3, "status": "success"},
      {"id": 4, "status": "failed", "error": "权限不足"},
      {"id": 5, "status": "success"}
    ]
  }
}
```

## 限流策略

### 限流规则

| 类型 | 限制 | 窗口期 | 说明 |
|------|------|--------|------|
| API 调用 | 1000 次 | 1 小时 | 通用 API 限制 |
| 图片上传 | 100 次 | 1 小时 | 上传频率限制 |
| AI 分析 | 50 次 | 1 小时 | AI 功能限制 |
| 搜索请求 | 200 次 | 1 小时 | 搜索频率限制 |

### 限流响应

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "请求频率超限，请稍后重试"
  },
  "meta": {
    "limit": 1000,
    "remaining": 0,
    "reset_at": "2024-01-15T11:00:00Z"
  }
}
```

### 限流头部

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642248000
X-RateLimit-Window: 3600
```

## 错误处理

### 错误代码

| 错误代码 | HTTP 状态 | 描述 |
|----------|-----------|------|
| `VALIDATION_ERROR` | 400 | 请求参数验证失败 |
| `AUTHENTICATION_REQUIRED` | 401 | 需要身份验证 |
| `INVALID_TOKEN` | 401 | 无效的认证令牌 |
| `TOKEN_EXPIRED` | 401 | 认证令牌已过期 |
| `INSUFFICIENT_PRIVILEGES` | 403 | 权限不足 |
| `RESOURCE_NOT_FOUND` | 404 | 资源不存在 |
| `RESOURCE_CONFLICT` | 409 | 资源冲突 |
| `RATE_LIMIT_EXCEEDED` | 429 | 请求频率超限 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |
| `SERVICE_UNAVAILABLE` | 503 | 服务暂不可用 |

### 错误处理最佳实践

```javascript
// JavaScript 示例
async function callAPI(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new APIError(data.error, response.status);
    }
    
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      handleAPIError(error);
    } else {
      handleNetworkError(error);
    }
    throw error;
  }
}

class APIError extends Error {
  constructor(errorData, status) {
    super(errorData.message);
    this.code = errorData.code;
    this.status = status;
    this.details = errorData.details;
  }
}
```

## SDK 支持

### 官方 SDK

我们提供多种语言的官方 SDK：

- **JavaScript/Node.js**: `npm install @pixelpunk/sdk`
- **Python**: `pip install pixelpunk-sdk`
- **Go**: `go get github.com/CooperJiang/PixelPunk/go-sdk`
- **PHP**: `composer require pixelpunk/php-sdk`

### SDK 示例

```javascript
// JavaScript SDK 示例
import { PixelPunk } from '@pixelpunk/sdk';

const client = new PixelPunk({
  apiKey: 'your_api_key',
  baseURL: 'https://api.pixelpunk.io/v1'
});

// 上传图片
const image = await client.images.upload({
  file: imageFile,
  title: 'My Image',
  tags: ['landscape', 'sunset']
});

// 获取图片列表
const images = await client.images.list({
  page: 1,
  limit: 20,
  tags: ['landscape']
});

// AI 分析
const analysis = await client.ai.analyze(image.id, {
  features: ['tags', 'description', 'safety']
});
```

## 调试工具

### API 测试工具

访问内置的 API 测试工具：
- **Swagger UI**: `https://api.pixelpunk.io/docs`
- **Postman Collection**: [下载链接](https://api.pixelpunk.io/postman)

### 调试技巧

1. **使用请求 ID**: 每个响应包含 `request_id`，便于问题追踪
2. **查看响应头**: 包含限流、缓存等重要信息
3. **启用详细日志**: 在测试环境开启详细日志
4. **使用 webhook**: 接收异步操作结果

## 下一步

- [用户接口详解](./user.md)
- [图片接口详解](./image.md)
- [AI 分析接口](./ai.md)
- [分享接口详解](./sharing.md)

更多详细的 API 文档请访问：[https://api.pixelpunk.io/docs](https://api.pixelpunk.io/docs)