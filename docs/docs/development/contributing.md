# 贡献指南

感谢你有兴趣为 PixelPunk 贡献代码！本指南将帮助你了解如何参与项目开发。

## 贡献方式

### 报告 Bug

在提交 Bug 前，请先：
- 搜索 [现有 Issues](https://github.com/CooperJiang/PixelPunk-v1/issues)，避免重复
- 确认问题可复现
- 准备好复现步骤

**Bug 报告应包含**：
- **环境信息**：操作系统、浏览器版本、PixelPunk 版本
- **复现步骤**：详细的步骤说明
- **预期行为**：应该发生什么
- **实际行为**：实际发生了什么
- **截图/日志**：相关的截图或错误日志

[→ 报告 Bug](https://github.com/CooperJiang/PixelPunk-v1/issues/new?labels=bug)

### 提出新功能

我们欢迎功能建议！在提交前：
- 检查功能是否已在 [Roadmap](https://github.com/CooperJiang/PixelPunk-v1/issues?q=label%3Aenhancement) 中
- 说明功能的使用场景
- 描述期望的实现方式

**功能请求应包含**：
- **问题描述**：当前遇到的问题
- **解决方案**：建议的功能设计
- **使用场景**：谁会使用这个功能，如何使用
- **替代方案**：是否考虑过其他实现方式

[→ 提出新功能](https://github.com/CooperJiang/PixelPunk-v1/issues/new?labels=enhancement)

### 改进文档

文档的贡献同样重要！你可以：
- 修正错别字和语法错误
- 补充缺失的文档
- 改进文档结构和可读性
- 翻译文档到其他语言

[→ 改进文档](https://github.com/CooperJiang/PixelPunk-v1/issues/new?labels=documentation)

### 提交代码

请按照以下流程提交代码贡献。

## 代码贡献流程

### 1. Fork 仓库

点击项目页面右上角的 **Fork** 按钮，将项目复制到你的 GitHub 账户。

### 2. 克隆到本地

```bash
git clone https://github.com/YOUR_USERNAME/PixelPunk-v1.git
cd PixelPunk-v1

# 添加上游仓库
git remote add upstream https://github.com/CooperJiang/PixelPunk-v1.git
```

### 3. 创建分支

```bash
# 更新主分支
git checkout main
git pull upstream main

# 创建功能分支
git checkout -b feature/your-feature-name
# 或修复分支
git checkout -b fix/your-bug-fix
```

**分支命名规范**：
- `feature/xxx` - 新功能
- `fix/xxx` - Bug 修复
- `docs/xxx` - 文档改进
- `refactor/xxx` - 代码重构
- `style/xxx` - 样式调整
- `test/xxx` - 测试相关

### 4. 搭建开发环境

详见 [开发环境](/docs/development/environment) 文档。

**快速启动**（0 配置设计）：

```bash
# 1. 启动 Qdrant（可选，用于向量搜索）
make qdrant-start

# 2. 启动后端（新终端）
go run cmd/main.go

# 3. 启动前端（新终端）
cd web
pnpm install
npm run dev

# 4. 访问安装向导
# 浏览器访问 http://localhost:3800
# 首次启动会自动跳转到 /setup 页面进行配置
```

::: tip 0 配置启动
PixelPunk 采用 **0 配置设计**，无需手动创建配置文件。首次启动后，访问 `/setup` 页面完成安装向导，系统会自动生成所有配置。
:::

### 5. 编写代码

**编码规范**：

#### 后端（Go）

- 遵循 [Effective Go](https://go.dev/doc/effective_go) 规范
- 使用 `gofmt` 格式化代码
- 函数和方法添加注释
- 单元测试覆盖关键逻辑

```go
// ✅ 好的示例
// UploadFile 上传文件到服务器
// 参数：file - 文件数据，userID - 用户ID
// 返回：文件ID 和错误信息
func UploadFile(file *multipart.FileHeader, userID uint) (string, error) {
    // 实现逻辑
}

// ❌ 不好的示例
func upload(f *multipart.FileHeader, u uint) (string, error) {
    // 缺少注释，命名不清晰
}
```

#### 前端（Vue 3 + TypeScript）

- 使用 `ESLint` 和 `Prettier` 检查代码
- 组件使用 `<script setup>` 语法
- Props 和 Emits 定义类型
- 避免使用 `any` 类型

```vue
<!-- ✅ 好的示例 -->
<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  count?: number
}

interface Emits {
  (e: 'update', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const emit = defineEmits<Emits>()
</script>

<!-- ❌ 不好的示例 -->
<script setup>
const props = defineProps(['title', 'count']) // 缺少类型
</script>
```

### 6. 提交代码

```bash
# 添加文件
git add .

# 提交（遵循提交规范）
git commit -m "feat: 添加图片批量下载功能"
```

**提交信息规范**（遵循 [Conventional Commits](https://www.conventionalcommits.org/)）：

```
<类型>: <简短描述>

[可选的详细描述]

[可选的 Issue 引用]
```

**类型**：
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式调整（不影响功能）
- `refactor` - 重构代码
- `perf` - 性能优化
- `test` - 测试相关
- `chore` - 构建工具、依赖更新

**示例**：

```bash
# 新功能
git commit -m "feat: 添加图片水印功能"

# Bug 修复
git commit -m "fix: 修复上传大文件时内存溢出问题"

# 文档
git commit -m "docs: 更新部署文档中的 Docker 配置"

# 带详细说明
git commit -m "feat: 支持 WebP 图片格式

- 添加 WebP 解码器
- 支持 WebP 格式转换
- 更新上传白名单

Closes #123"
```

### 7. 推送分支

```bash
git push origin feature/your-feature-name
```

### 8. 创建 Pull Request

1. 访问你的 Fork 仓库页面
2. 点击 **Compare & pull request** 按钮
3. 填写 PR 标题和描述

**PR 描述模板**：

```markdown
## 变更类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化

## 变更说明
简要说明这个 PR 做了什么。

## 相关 Issue
Closes #123

## 测试
- [ ] 已通过本地测试
- [ ] 已添加单元测试
- [ ] 已测试不同浏览器

## 截图（如适用）
贴上相关截图。

## Checklist
- [ ] 代码遵循项目规范
- [ ] 已更新相关文档
- [ ] 已添加必要的注释
- [ ] 无明显的性能问题
```

### 9. 代码审查

维护者会审查你的代码，可能会：
- 提出修改建议
- 请求补充测试
- 要求优化实现

请及时回应审查意见，并根据反馈修改代码：

```bash
# 继续在功能分支上修改
git add .
git commit -m "fix: 根据审查意见优化代码"
git push origin feature/your-feature-name
```

### 10. 合并

审查通过后，维护者会合并你的 PR。恭喜你成为贡献者！🎉

## 代码检查

### 后端检查

```bash
# 格式化
gofmt -w .

# 静态检查
go vet ./...

# 运行测试
go test ./...
```

### 前端检查

```bash
cd web

# 代码检查
pnpm lint:check

# 自动修复
pnpm lint:fix

# 类型检查
pnpm run type-check
```

## 调试技巧

### 后端调试

**使用 Air 热重载**：
```bash
# 安装 Air
go install github.com/cosmtrek/air@latest

# 启动热重载
air
```

**查看日志**：
```bash
tail -f logs/app.log
```

**API 测试**：
- 使用 Postman 或 cURL 测试接口
- 后端 API 地址：`http://localhost:9520`

### 前端调试

**开发工具**：
- 使用浏览器开发者工具（F12）
- 安装 Vue DevTools 浏览器扩展
- 查看控制台错误和网络请求

**常见问题排查**：
```bash
# 清理缓存重新安装
rm -rf web/node_modules web/pnpm-lock.yaml
cd web && pnpm install

# 检查端口占用
lsof -ti:3800 | xargs kill -9  # 清理前端端口
lsof -ti:9520 | xargs kill -9  # 清理后端端口
```

## 开发规范细则

### Go 代码规范

1. **错误处理**
   ```go
   // ✅ 好的示例
   if err != nil {
       return fmt.Errorf("failed to upload file: %w", err)
   }

   // ❌ 不好的示例
   if err != nil {
       return err  // 缺少上下文信息
   }
   ```

2. **变量命名**
   - 包名：小写，简洁（如 `storage`、`ai`）
   - 变量：驼峰式（如 `userID`、`fileName`）
   - 常量：大写下划线（如 `MAX_FILE_SIZE`）
   - 接口：名词或形容词（如 `Storage`、`Uploadable`）

3. **代码组织**
   - Controllers 处理 HTTP 请求
   - Services 实现业务逻辑
   - Models 定义数据结构
   - 公共功能放在 `pkg/` 下

### Vue 代码规范

1. **组件命名**
   ```
   ✅ Button.vue, FileUpload.vue, UserAvatar.vue
   ❌ button.vue, file-upload.vue, user_avatar.vue
   ```

2. **文件组织**
   ```
   src/components/Button/
   ├── Button.vue          # 组件主文件
   ├── types.ts            # 类型定义
   └── index.ts            # 导出
   ```

3. **样式规范**
   - 使用 `scoped` CSS
   - 优先使用 Tailwind CSS 工具类
   - 复杂样式使用 CSS 变量

4. **状态管理**
   - 组件内状态使用 `ref` / `reactive`
   - 跨组件状态使用 Pinia Store
   - 持久化状态使用 localStorage

### 提交前检查清单

- [ ] 代码已格式化（`gofmt` / `prettier`）
- [ ] 通过静态检查（`go vet` / `eslint`）
- [ ] 通过类型检查（TypeScript）
- [ ] 添加必要的注释
- [ ] 编写或更新单元测试
- [ ] 本地测试通过
- [ ] 提交信息符合规范
- [ ] 更新相关文档

## 行为准则

### 我们的承诺

为了营造开放和友好的环境，我们承诺：
- 尊重不同的观点和经验
- 接受建设性的批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为

- 使用性别化语言或图像
- 发表侮辱性/贬损性评论
- 骚扰行为（公开或私下）
- 未经明确许可发布他人私人信息
- 其他不道德或不专业的行为

### 举报

如遇到不当行为，请通过 Issue 或邮件联系维护者。

## 交流渠道

- **GitHub Issues**: 报告 Bug 和功能请求
- **GitHub Discussions**: 一般性讨论和问答
- **Pull Request**: 代码贡献

## 其他资源

- [开发环境](/docs/development/environment) - 搭建本地开发环境
- [源码结构](/docs/development/structure) - 了解项目代码组织
- [快速开始](/docs/getting-started) - 快速部署 PixelPunk
- [API 文档](/docs/api/upload) - API 接口说明

## 贡献者

感谢所有贡献者！每一个 PR 都让 PixelPunk 变得更好。

<!-- 贡献者墙将在项目发展后添加 -->

---

再次感谢你的贡献！❤️
