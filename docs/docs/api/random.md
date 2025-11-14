# 随机图片 API

提供随机图片接口，每次请求返回一张随机图片，支持文件夹绑定和多种返回方式。

## 概述

随机图片 API 允许你从 PixelPunk 中随机获取一张图片，非常适合以下场景：

- **网站背景图** - 每次访问展示不同的背景
- **随机壁纸** - 提供壁纸 API 服务
- **占位图片** - 开发测试时的图片占位
- **图片轮播** - 随机展示图片内容
- **头像服务** - 随机头像 API

## 创建随机图片 API

在使用随机图片 API 之前，需要先在 PixelPunk 后台创建：

1. 登录 PixelPunk 管理后台
2. 进入「开放 API」页面（`/open-api`）
3. 点击「创建随机图片 API」
4. 配置 API 参数

### 配置选项

**API 名称**
- 用于标识和管理该 API
- 必填，最多 100 个字符

**图片范围**
- **全部公开图片** - 从账户所有公开权限的图片中随机返回
- **指定文件夹** - 仅从指定文件夹中随机返回图片

**返回方式**
- **302 重定向** - 返回图片真实地址，性能更好，支持 CDN 加速
- **直接返回图片** - 每次刷新都是新图片，URL 固定不变，适合网站背景/壁纸抓取

::: tip 选择建议
- 如果需要浏览器缓存图片、减少服务器压力，选择「302 重定向」
- 如果需要每次刷新都显示新图片、URL 保持不变，选择「直接返回图片」
:::

## 接口信息

### 基本信息

**接口地址**
```
GET https://yourdomain.com/api/v1/random/{api_key}
```

请将 `yourdomain.com` 替换为你的 PixelPunk 部署域名，`{api_key}` 替换为创建的 API Key。

**认证方式**

无需额外认证，API Key 包含在 URL 中。

**请求方法**

仅支持 `GET` 请求。

## 使用示例

### 基础用法

<script setup>
const randomExamples = [
  {
    label: 'HTML',
    value: 'html',
    language: 'html',
    code: `<!-- 作为图片源 -->
<img src="https://your-domain.com/api/v1/random/your_api_key" alt="Random Image">

<!-- 作为背景图 -->
<div style="background-image: url('https://your-domain.com/api/v1/random/your_api_key');"></div>

<!-- 每次刷新显示新图片（需使用直接返回模式） -->
<img src="https://your-domain.com/api/v1/random/your_api_key?t=${Date.now()}" alt="Random Image">`
  },
  {
    label: 'CSS',
    value: 'css',
    language: 'css',
    code: `.random-bg {
  background-image: url('https://your-domain.com/api/v1/random/your_api_key');
  background-size: cover;
  background-position: center;
}

/* 每次页面加载显示新背景 */
body {
  background: url('https://your-domain.com/api/v1/random/your_api_key') no-repeat center center fixed;
  background-size: cover;
}`
  },
  {
    label: 'JavaScript',
    value: 'javascript',
    language: 'javascript',
    code: `// 动态加载随机图片
function loadRandomImage() {
  const img = document.querySelector('#random-img');
  const apiUrl = 'https://your-domain.com/api/v1/random/your_api_key';

  // 添加时间戳防止缓存
  img.src = apiUrl + '?t=' + Date.now();
}

// 定时切换图片
setInterval(loadRandomImage, 5000);

// 使用 fetch 获取图片信息
async function getRandomImage() {
  const response = await fetch('https://your-domain.com/api/v1/random/your_api_key');

  if (response.redirected) {
    // 302 重定向模式，获取真实图片 URL
    console.log('Image URL:', response.url);
  } else {
    // 直接返回模式，获取图片 Blob
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    document.querySelector('#random-img').src = imageUrl;
  }
}`
  },
  {
    label: 'Markdown',
    value: 'markdown',
    language: 'markdown',
    code: `<!-- 在 Markdown 中使用 -->
![Random Image](https://your-domain.com/api/v1/random/your_api_key)

<!-- 图床链接 -->
[查看随机图片](https://your-domain.com/api/v1/random/your_api_key)`
  }
]
</script>

<CodeTabs :tabs="randomExamples" />

### 高级用法

**防止缓存**

如果使用「直接返回图片」模式，想要每次刷新都显示新图片，可以添加时间戳参数：

```javascript
// 方式1：添加时间戳
const url = `https://your-domain.com/api/v1/random/your_api_key?t=${Date.now()}`

// 方式2：添加随机数
const url = `https://your-domain.com/api/v1/random/your_api_key?r=${Math.random()}`
```

**定时轮播**

```javascript
const imageElement = document.querySelector('#bg-image')
const apiKey = 'your_api_key'
const apiUrl = `https://your-domain.com/api/v1/random/${apiKey}`

// 每 10 秒切换一张图片
setInterval(() => {
  imageElement.src = `${apiUrl}?t=${Date.now()}`
}, 10000)
```

**预加载下一张**

```javascript
function preloadNextImage(currentImg, apiUrl) {
  const nextImg = new Image()
  nextImg.src = `${apiUrl}?t=${Date.now()}`

  nextImg.onload = () => {
    // 淡入淡出切换
    currentImg.style.opacity = 0
    setTimeout(() => {
      currentImg.src = nextImg.src
      currentImg.style.opacity = 1
    }, 500)
  }
}
```

## 响应说明

### 302 重定向模式

**响应状态码**: `302 Found`

**响应头**:
```
Location: https://your-domain.com/file/user_xxx/image.jpg
```

浏览器会自动重定向到图片的真实地址，支持 CDN 加速和浏览器缓存。

### 直接返回模式

**响应状态码**: `200 OK`

**响应头**:
```
Content-Type: image/jpeg  (或 image/png, image/gif 等)
Content-Length: xxxxx
Cache-Control: no-cache
```

**响应体**: 图片的二进制数据

## 常见问题

### 如何获取 API Key？

1. 登录 PixelPunk 管理后台
2. 进入「开放 API」页面
3. 点击「创建随机图片 API」
4. 创建成功后，系统会生成唯一的 API Key
5. 复制 API 链接直接使用

### 图片范围如何选择？

- **全部公开图片**: 适合图片数量多、希望随机性更强的场景
- **指定文件夹**: 适合特定主题的图片轮播，如「风景」、「美食」等分类

::: warning 权限说明
- 仅返回「公开」访问权限的图片
- 私有和受保护图片不会通过此 API 返回
- 绑定文件夹时，仅返回该文件夹内的公开图片
:::

### 返回方式如何选择？

| 返回方式 | 优点 | 缺点 | 适用场景 |
|---------|------|------|---------|
| **302 重定向** | 性能好、支持 CDN、可缓存 | URL 会变化、不利于固定链接 | 网站背景图、头像服务 |
| **直接返回** | URL 固定、每次刷新必是新图 | 服务器压力大、不可缓存 | 壁纸 API、需要固定 URL 的场景 |

### API 有调用限制吗？

创建的随机图片 API 会记录调用次数和最后调用时间，但默认无调用频率限制。建议合理使用，避免对服务器造成过大压力。

### 没有符合条件的图片怎么办？

如果指定的文件夹中没有公开图片，或账户中没有公开图片，API 会返回：

```json
{
  "code": 404,
  "message": "没有可用的随机图片",
  "data": null
}
```

### 如何管理 API？

在「开放 API」页面可以：
- 查看 API 调用统计
- 启用/禁用 API
- 修改绑定文件夹
- 修改返回方式
- 删除 API

### 可以创建多个随机图片 API 吗？

可以。你可以创建多个随机图片 API，每个 API 可以绑定不同的文件夹，适用于不同的使用场景。

## 下一步

- [开放上传 API](/docs/api/upload) - 上传图片到 PixelPunk
- [配置指南](/docs/config/basic) - 配置存储和 API 限制
- [快速开始](/docs/getting-started) - 部署 PixelPunk
