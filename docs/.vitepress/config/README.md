# 多语言配置说明

## 📁 目录结构

```
docs/.vitepress/
├── config/
│   ├── index.ts           # 主配置入口 (已废弃，现在使用 ../config.ts)
│   ├── shared.ts          # 共享配置（所有语言通用）
│   ├── zh.ts              # 中文特定配置
│   ├── en.ts              # 英文特定配置
│   └── i18n/              # 翻译文件
│       ├── zh-CN.ts       # 中文 UI 翻译
│       └── en-US.ts       # 英文 UI 翻译
├── config.ts              # 主配置文件（引用 config/ 下的配置）
└── theme/
    ├── components/
    │   └── LanguageSwitcher.vue  # 语言切换组件
    └── composables/
        └── useI18n.ts     # i18n 组合函数
```

## 🎯 配置文件说明

### 1. shared.ts - 共享配置

包含所有语言通用的配置：
- 网站基础信息（title, appearance 等）
- head 标签配置
- Vite 配置
- Markdown 配置
- 主题配置（logo, socialLinks 等）

### 2. zh.ts - 中文配置

包含中文特定的配置：
- 描述信息
- 导航栏（nav）
- 侧边栏（sidebar）
- 搜索配置
- UI 文本（如"上一页"、"下一页"等）

### 3. en.ts - 英文配置

包含英文特定的配置：
- 英文描述
- 英文导航栏
- 英文侧边栏
- 英文搜索配置
- 英文 UI 文本

### 4. i18n/ - 翻译文件

用于组件中的文本翻译：
- `zh-CN.ts`: 中文 UI 组件翻译
- `en-US.ts`: 英文 UI 组件翻译

## 🔧 如何修改配置

### 修改共享配置

编辑 `config/shared.ts`，修改会影响所有语言版本。

### 修改中文配置

编辑 `config/zh.ts`，只影响中文版本。

### 修改英文配置

编辑 `config/en.ts`，只影响英文版本。

### 添加新的翻译文本

1. 在 `config/i18n/zh-CN.ts` 中添加中文翻译
2. 在 `config/i18n/en-US.ts` 中添加对应的英文翻译
3. 在组件中使用 `useI18n` 获取翻译

## 📝 如何在组件中使用翻译

```vue
<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t, lang } = useI18n()
</script>

<template>
  <div>
    <h1>{{ t('hero.title') }}</h1>
    <p>{{ t('hero.description') }}</p>
    <p>Current language: {{ lang }}</p>
  </div>
</template>
```

## 🌐 URL 结构

- **中文**: `/` (根路径)
  - 例如: `/`, `/features`, `/docs/getting-started`

- **英文**: `/en/` (前缀路径)
  - 例如: `/en/`, `/en/features`, `/en/docs/getting-started`

## 🎨 语言切换组件

`LanguageSwitcher.vue` 组件已经集成到导航栏右侧。

特性：
- 赛博朋克风格设计
- 下拉菜单选择语言
- 自动检测当前语言
- 点击外部自动关闭
- 响应式设计（移动端友好）

## ✅ 已完成的功能

- [x] 配置文件结构拆分
- [x] 中文配置完整迁移
- [x] 英文配置基础结构
- [x] i18n 翻译文件
- [x] useI18n composable
- [x] 语言切换组件
- [x] Layout 集成
- [x] /en/ 目录结构
- [x] 占位页面

## 📋 待完成事项

### 短期任务

- [ ] 完善英文翻译内容
- [ ] 翻译所有页面到英文
- [ ] 优化语言切换体验
- [ ] 添加语言自动检测

### 长期规划

- [ ] 添加更多语言支持（如日语、韩语等）
- [ ] SEO 优化（hreflang 标签）
- [ ] 语言切换时的过渡动画
- [ ] 浏览器语言偏好记忆

## 🚀 下一步操作

1. **完善中文内容**: 继续完善中文文档
2. **准备英文翻译**: 当中文内容稳定后，开始翻译英文版本
3. **测试**: 确保所有路由和链接正常工作
4. **优化**: 根据用户反馈优化体验

## 💡 注意事项

1. **链接一致性**: 确保中英文页面的链接结构一致
2. **图片路径**: 使用绝对路径 `/images/xxx.png` 而不是相对路径
3. **组件复用**: UI 组件可以在两种语言中共享，只需翻译文本
4. **配置同步**: 修改导航结构时，记得同步更新中英文配置

## 🔗 相关文档

- [VitePress 多语言官方文档](https://vitepress.dev/guide/i18n)
- [Vue I18n 文档](https://vue-i18n.intlify.dev/)
