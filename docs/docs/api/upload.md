# 开放上传 API

提供开放的图片上传接口，支持第三方应用快速接入 PixelPunk 图床服务。

## 概述

开放上传 API 允许第三方应用通过 HTTP 接口上传图片到 PixelPunk，支持单文件和批量上传，提供完整的权限控制和优化选项。

### 核心特性

- ✅ **简单易用** - 标准的 multipart/form-data 上传
- ✅ **Token 认证** - 基于 API Key 的安全认证
- ✅ **批量上传** - 一次请求支持上传多个文件
- ✅ **灵活配置** - 支持文件夹、路径、权限、优化等多种参数
- ✅ **详细响应** - 返回完整的文件信息和上传状态
- ✅ **错误处理** - 清晰的错误提示和部分成功处理

## 接口信息

### 基本信息

**接口地址**
```
POST https://yourdomain.com/api/v1/external/upload
```

请将 `yourdomain.com` 替换为你的 PixelPunk 部署域名。

**认证方式**

使用 HTTP Header 传递 API Key：

```
x-pixelpunk-key: YOUR_API_KEY
```

::: tip 获取 API Key
登录 PixelPunk 后台，进入「系统设置」→「API 配置」→「生成 API Key」
:::

### 请求参数

| 参数名 | 类型 | 必需 | 说明 |
|--------|------|------|------|
| `file` | File | 是* | 单文件上传时使用 |
| `files[]` | File[] | 是* | 批量上传时使用（支持 `files[]`、`images[]` 等字段名） |
| `folderId` | String | 否 | 目标文件夹 ID，优先级高于 `filePath` |
| `filePath` | String | 否 | 文件路径（如 `projects/website`），未指定则上传到根目录 |
| `access_level` | String | 否 | 访问权限：`public`（公开）、`private`（私有）、`protected`（受保护），默认 `private` |
| `optimize` | String/Boolean | 否 | 是否优化图片，支持 `true`/`false` 或 `"true"`/`"false"`，默认 `false` |

::: warning 参数说明
`file` 和 `files[]` 二选一，不能同时使用。批量上传时使用 `files[]` 字段，支持多种字段名格式（如 `files[]`、`images[]`）。
:::

### 支持的文件格式

支持格式：JPG、JPEG、PNG、GIF、WebP、BMP、TIFF、SVG、HEIC 等

::: tip 自定义配置
创建 API Key 时可以动态配置允许上传的文件格式，灵活控制接口的上传权限。
:::

### 文件大小限制

::: tip 可自定义限制
创建 API Key 时可以自定义单文件大小限制，默认为 20MB。超出限制的文件会在响应中标记为 `oversized_files`。
:::

## 响应格式

### 成功响应

**单文件上传成功**

```json
{
  "code": 0,
  "message": "上传成功",
  "data": {
    "uploaded": {
      "id": "img_1a2b3c4d5e",
      "url": "https://your-domain.com/file/user_1/image.jpg",
      "thumb_url": "https://your-domain.com/thumb/user_1/image.jpg",
      "original_name": "image.jpg",
      "size": 1024000,
      "width": 1920,
      "height": 1080,
      "format": "jpg",
      "access_level": "private",
      "created_at": "2024-01-15T08:30:45Z"
    }
  }
}
```

**批量上传成功（部分成功）**

```json
{
  "code": 0,
  "message": "部分文件上传成功",
  "data": {
    "uploaded": [
      {
        "id": "img_1a2b3c4d5e",
        "url": "https://your-domain.com/file/user_1/image1.jpg",
        "thumb_url": "https://your-domain.com/thumb/user_1/image1.jpg",
        "original_name": "image1.jpg",
        "size": 1024000,
        "width": 1920,
        "height": 1080,
        "format": "jpg",
        "access_level": "private",
        "created_at": "2024-01-15T08:30:45Z"
      }
    ],
    "oversized_files": ["large_image.jpg"],
    "size_limit": "20.0MB",
    "upload_errors": ["corrupted.jpg: 文件损坏无法处理"]
  }
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | Integer | 状态码，0 表示成功 |
| `message` | String | 响应消息 |
| `data.uploaded` | Object/Array | 成功上传的文件信息 |
| `data.oversized_files` | Array | 超出大小限制的文件列表 |
| `data.size_limit` | String | 文件大小限制说明 |
| `data.upload_errors` | Array | 上传失败的文件及错误信息 |

**上传文件对象字段**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | String | 文件唯一标识 |
| `url` | String | 文件访问地址 |
| `thumb_url` | String | 缩略图地址 |
| `original_name` | String | 原始文件名 |
| `size` | Integer | 文件大小（字节） |
| `width` | Integer | 图片宽度（像素） |
| `height` | Integer | 图片高度（像素） |
| `format` | String | 文件格式 |
| `access_level` | String | 访问权限 |
| `created_at` | String | 创建时间（ISO 8601 格式） |

### 错误响应

```json
{
  "code": 401,
  "message": "API Key 无效或已过期",
  "data": null
}
```

**常见错误码**

| 错误码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 认证失败（API Key 无效或过期） |
| 403 | 权限不足 |
| 413 | 文件过大 |
| 429 | 请求次数超限 |
| 500 | 服务器内部错误 |

<script setup>
const uploadExamples = [
  {
    label: 'cURL',
    value: 'curl',
    language: 'bash',
    code: `# 基础上传
curl -X POST \\
  "https://your-domain.com/api/v1/external/upload" \\
  -H "x-pixelpunk-key: YOUR_API_KEY" \\
  -F "file=@image.jpg"

# 带参数上传
curl -X POST \\
  "https://your-domain.com/api/v1/external/upload" \\
  -H "x-pixelpunk-key: YOUR_API_KEY" \\
  -F "file=@image.jpg" \\
  -F "access_level=public" \\
  -F "optimize=true" \\
  -F "filePath=projects/website"

# 批量上传
curl -X POST \\
  "https://your-domain.com/api/v1/external/upload" \\
  -H "x-pixelpunk-key: YOUR_API_KEY" \\
  -F "files[]=@image1.jpg" \\
  -F "files[]=@image2.png" \\
  -F "files[]=@image3.gif" \\
  -F "filePath=batch/2024"`
  },
  {
    label: 'JavaScript',
    value: 'javascript',
    language: 'javascript',
    code: `async function uploadFile(file, options = {}) {
  const formData = new FormData();
  formData.append('file', file);

  // 添加可选参数
  if (options.access_level) formData.append('access_level', options.access_level);
  if (options.optimize) formData.append('optimize', options.optimize.toString());
  if (options.filePath) formData.append('filePath', options.filePath);
  if (options.folderId) formData.append('folderId', options.folderId);

  try {
    const response = await fetch('https://your-domain.com/api/v1/external/upload', {
      method: 'POST',
      headers: {
        'x-pixelpunk-key': 'YOUR_API_KEY'
      },
      body: formData
    });

    const result = await response.json();

    if (result.code === 0) {
      console.log('上传成功:', result.data.uploaded);
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('上传失败:', error);
    throw error;
  }
}

// 使用示例
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  try {
    const result = await uploadFile(file, {
      access_level: 'public',
      optimize: true,
      filePath: 'website/images'
    });
    console.log('文件URL:', result.uploaded.url);
  } catch (error) {
    console.error('上传失败:', error);
  }
});`
  },
  {
    label: 'Node.js',
    value: 'nodejs',
    language: 'javascript',
    code: `const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function uploadToAPI(filePath, options = {}) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  // 添加可选参数
  if (options.access_level) formData.append('access_level', options.access_level);
  if (options.optimize) formData.append('optimize', options.optimize.toString());
  if (options.filePath) formData.append('filePath', options.filePath);
  if (options.folderId) formData.append('folderId', options.folderId);

  try {
    const response = await axios.post(
      'https://your-domain.com/api/v1/external/upload',
      formData,
      {
        headers: {
          'x-pixelpunk-key': 'YOUR_API_KEY',
          ...formData.getHeaders()
        },
        timeout: 30000
      }
    );

    return response.data;
  } catch (error) {
    console.error('上传失败:', error.response?.data || error.message);
    throw error;
  }
}

// 使用示例
uploadToAPI('./image.jpg', {
  access_level: 'public',
  optimize: true,
  filePath: 'uploads/2024'
})
  .then(result => console.log('上传成功:', result.data.uploaded))
  .catch(error => console.error('上传失败:', error));`
  },
  {
    label: 'Python',
    value: 'python',
    language: 'python',
    code: `import requests

def upload_image(file_path, api_key, options=None):
    """上传图片到 PixelPunk"""
    url = "https://your-domain.com/api/v1/external/upload"

    headers = {
        "x-pixelpunk-key": api_key
    }

    files = {
        "file": open(file_path, "rb")
    }

    # 可选参数
    data = options or {}

    try:
        response = requests.post(
            url,
            headers=headers,
            files=files,
            data=data,
            timeout=30
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"上传失败: {e}")
        return None
    finally:
        files["file"].close()

# 使用示例
result = upload_image(
    'image.jpg',
    'YOUR_API_KEY',
    {
        'access_level': 'public',
        'optimize': 'true',
        'filePath': 'uploads/2024'
    }
)

if result and result['code'] == 0:
    print(f"上传成功: {result['data']['uploaded']['url']}")
else:
    print(f"上传失败: {result['message'] if result else 'Unknown error'}")`
  },
  {
    label: 'Go',
    value: 'go',
    language: 'go',
    code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "mime/multipart"
    "net/http"
    "os"
    "path/filepath"
)

type UploadResponse struct {
    Code    int    \`json:"code"\`
    Message string \`json:"message"\`
    Data    struct {
        Uploaded struct {
            ID           string \`json:"id"\`
            URL          string \`json:"url"\`
            ThumbURL     string \`json:"thumb_url"\`
            OriginalName string \`json:"original_name"\`
            Size         int64  \`json:"size"\`
            Format       string \`json:"format"\`
        } \`json:"uploaded"\`
    } \`json:"data"\`
}

func uploadFile(filePath, apiKey string) (*UploadResponse, error) {
    // 打开文件
    file, err := os.Open(filePath)
    if err != nil {
        return nil, err
    }
    defer file.Close()

    // 创建 multipart form
    var requestBody bytes.Buffer
    writer := multipart.NewWriter(&requestBody)

    // 添加文件
    part, err := writer.CreateFormFile("file", filepath.Base(filePath))
    if err != nil {
        return nil, err
    }
    io.Copy(part, file)

    // 添加其他字段
    writer.WriteField("access_level", "public")
    writer.WriteField("optimize", "true")
    writer.Close()

    // 创建请求
    req, err := http.NewRequest(
        "POST",
        "https://your-domain.com/api/v1/external/upload",
        &requestBody,
    )
    if err != nil {
        return nil, err
    }

    // 设置请求头
    req.Header.Set("Content-Type", writer.FormDataContentType())
    req.Header.Set("x-pixelpunk-key", apiKey)

    // 发送请求
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    // 解析响应
    var result UploadResponse
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, err
    }

    return &result, nil
}

func main() {
    result, err := uploadFile("image.jpg", "YOUR_API_KEY")
    if err != nil {
        fmt.Printf("上传失败: %v\\n", err)
        return
    }

    if result.Code == 0 {
        fmt.Printf("上传成功: %s\\n", result.Data.Uploaded.URL)
    } else {
        fmt.Printf("上传失败: %s\\n", result.Message)
    }
}`
  }
]
</script>

## 使用示例

<CodeTabs :tabs="uploadExamples" />

## 最佳实践

### 1. 错误处理

始终检查响应中的 `oversized_files` 和 `upload_errors` 字段：

```javascript
const result = await uploadFile(file);
if (result.data.oversized_files && result.data.oversized_files.length > 0) {
  console.warn('以下文件超出大小限制:', result.data.oversized_files);
  console.log('大小限制:', result.data.size_limit);
}
if (result.data.upload_errors && result.data.upload_errors.length > 0) {
  console.error('部分文件上传失败:', result.data.upload_errors);
}
```

### 2. 批量上传优化

对于大量文件，建议分批上传：

```javascript
async function uploadInBatches(files, batchSize = 10) {
  const results = [];
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const result = await uploadMultipleFiles(batch);
    results.push(result);
  }
  return results;
}
```

### 3. 重试机制

网络不稳定时添加重试逻辑：

```javascript
async function uploadWithRetry(file, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await uploadFile(file);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### 4. 进度跟踪

使用 XMLHttpRequest 或 Axios 跟踪上传进度：

```javascript
function uploadWithProgress(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Upload failed')));

    xhr.open('POST', 'https://your-domain.com/api/v1/external/upload');
    xhr.setRequestHeader('x-pixelpunk-key', 'YOUR_API_KEY');
    xhr.send(formData);
  });
}
```

## 常见问题

### 如何获取 API Key？

1. 登录 PixelPunk 管理后台
2. 进入「系统设置」→「API 配置」
3. 点击「生成 API Key」
4. 复制生成的 API Key 妥善保管

::: warning 安全提示
API Key 具有完整的上传权限，请妥善保管，不要泄露给他人。如果 API Key 泄露，请立即在后台重新生成。
:::

### 单次请求可以上传多少文件？

建议单次请求上传文件数不超过 50 个。如需上传大量文件，建议分批上传以提高成功率。

### 如何指定上传到特定文件夹？

有两种方式：

1. **使用 folderId**（推荐）：传递文件夹的 ID
2. **使用 filePath**：传递文件夹路径，如 `projects/website`

`folderId` 优先级高于 `filePath`。

### 支持哪些访问权限？

- `public`: 公开访问，任何人可访问
- `private`: 私有访问，仅限账户所有者
- `protected`: 受保护，需要特定权限

默认为 `private`。

### 如何处理上传失败的文件？

响应中的 `upload_errors` 数组包含失败文件和错误原因。建议：

1. 记录失败文件
2. 分析错误原因
3. 对可恢复的错误进行重试
4. 提示用户处理无法自动恢复的错误

## 下一步

- [随机图片 API](/docs/api/random) - 了解随机图片接口
- [配置指南](/docs/config/basic) - 配置 API 限制和权限
- [快速开始](/docs/getting-started) - 部署 PixelPunk
