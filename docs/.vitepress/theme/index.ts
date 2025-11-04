import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './cyber.css'
import Layout from './Layout.vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import ProductDemo from './components/ProductDemo.vue'
import Stats from './components/Stats.vue'
import Testimonials from './components/Testimonials.vue'
import TestimonialCarousel from './components/TestimonialCarousel.vue'
import CommunityStats from './components/CommunityStats.vue'
import UseCases from './components/UseCases.vue'
import CommunityCTA from './components/CommunityCTA.vue'
import UpdateLog from './components/UpdateLog.vue'
import VersionPreview from './components/VersionPreview.vue'
import DownloadPage from './components/DownloadPage.vue'
import FeaturesPage from './components/FeaturesPage.vue'
import Contributors from './components/Contributors.vue'
import ContributorModal from './components/ContributorModal.vue'
import CustomFooter from './components/CustomFooter.vue'
import FeedbackPage from './components/FeedbackPage.vue'
import ProductScreenshots from './components/ProductScreenshots.vue'
import QuickDeploy from './components/QuickDeploy.vue'
import Updates from './components/Updates.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('Hero', Hero)
    app.component('Features', Features)
    app.component('ProductDemo', ProductDemo)
    app.component('Stats', Stats)
    app.component('Testimonials', Testimonials)
    app.component('TestimonialCarousel', TestimonialCarousel)
    app.component('CommunityStats', CommunityStats)
    app.component('UseCases', UseCases)
    app.component('CommunityCTA', CommunityCTA)
    app.component('UpdateLog', UpdateLog)
    app.component('VersionPreview', VersionPreview)
    app.component('DownloadPage', DownloadPage)
    app.component('FeaturesPage', FeaturesPage)
    app.component('Contributors', Contributors)
    app.component('ContributorModal', ContributorModal)
    app.component('CustomFooter', CustomFooter)
    app.component('FeedbackPage', FeedbackPage)
    app.component('ProductScreenshots', ProductScreenshots)
    app.component('QuickDeploy', QuickDeploy)
    app.component('Updates', Updates)

    // 主题切换处理
    if (typeof window !== 'undefined') {
      const updateDataTheme = () => {
        const isDark = document.documentElement.classList.contains('dark')
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
      }
      
      // 监听主题变化
      const observer = new MutationObserver(updateDataTheme)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })
      
      // 初始设置
      updateDataTheme()
      
      // 处理搜索框在首页的显示/隐藏 - 默认隐藏，避免刷新时闪烁
      const handleSearchVisibility = () => {
        const searchElement = document.querySelector('.VPNavBarSearch')
        if (searchElement) {
          const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html'
          // 移除之前的状态
          searchElement.classList.remove('show')
          // 只在非首页时添加show类
          if (!isHomePage) {
            searchElement.classList.add('show')
          }
        }
      }
      
      // 路由变化时检查搜索框显示状态
      router.onAfterRouteChanged = (to) => {
        setTimeout(handleSearchVisibility, 100)
      }
      
      // 初始页面加载时立即检查，避免闪烁
      handleSearchVisibility()
      // 确保VitePress完全加载后再次检查
      setTimeout(handleSearchVisibility, 50)
    }
  }
} satisfies Theme