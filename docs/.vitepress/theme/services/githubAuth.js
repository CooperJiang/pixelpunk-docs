import { feedbackConfig } from '../config/feedback.js'

/**
 * GitHub OAuth 认证服务
 */
export class GitHubAuthService {
  constructor() {
    this.config = feedbackConfig
    this.tokenKey = this.config.githubTokenKey
  }

  /**
   * 获取存储的token
   */
  getToken() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.tokenKey)
  }

  /**
   * 存储token
   */
  setToken(token) {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.tokenKey, token)
  }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    if (typeof window === 'undefined') return null
    const userInfoStr = localStorage.getItem('github_user_info')
    if (userInfoStr) {
      try {
        return JSON.parse(userInfoStr)
      } catch (error) {
        console.error('解析用户信息失败:', error)
        return null
      }
    }
    return null
  }

  /**
   * 存储用户信息
   */
  setUserInfo(userInfo) {
    if (typeof window === 'undefined') return
    localStorage.setItem('github_user_info', JSON.stringify(userInfo))
  }

  /**
   * 清除token
   */
  clearToken() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem('github_user_info')
  }

  /**
   * 检查用户是否已登录
   */
  isLoggedIn() {
    return !!this.getToken()
  }

  /**
   * 启动GitHub登录流程
   */
  login() {
    try {
      // 构建第三方系统的登录URL，系统会处理GitHub重定向
      const params = new URLSearchParams({
        api_key: this.config.apiKey
      })
      
      if (this.config.redirectUri) {
        params.append('redirect_uri', this.config.redirectUri)
      }
      
      const loginUrl = `${this.config.authBaseUrl}/login?${params.toString()}`
      
      console.log('🔐 GitHub登录流程开始')
      console.log('📍 API Key:', this.config.apiKey)
      console.log('📍 Auth Base URL:', this.config.authBaseUrl)
      console.log('📍 Redirect URI:', this.config.redirectUri)
      console.log('📍 完整登录URL:', loginUrl)
      console.log('🚀 即将跳转到第三方系统登录地址...')
      
      // 跳转到第三方系统的登录地址（系统会302重定向到GitHub）
      if (typeof window !== 'undefined') {
        console.log('✅ 执行页面跳转:', loginUrl)
        window.location.href = loginUrl
      }
      
      return loginUrl
    } catch (error) {
      console.error('❌ GitHub登录失败:', error)
      throw error
    }
  }

  /**
   * 处理GitHub回调
   */
  handleCallback() {
    if (typeof window === 'undefined') return false

    const urlParams = new URLSearchParams(window.location.search)
    const sessionToken = urlParams.get('session_token')
    
    if (sessionToken) {
      this.setToken(sessionToken)
      
      // 清理URL参数
      const cleanUrl = window.location.origin + window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
      
      return true
    }
    
    return false
  }

  /**
   * 验证当前session是否有效
   */
  async verifySession() {
    const token = this.getToken()
    if (!token) return false

    try {
      const response = await fetch(`${this.config.authBaseUrl}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        let data
        try {
          data = await response.json()
        } catch (parseError) {
          console.error('验证session响应解析错误:', parseError)
          return false
        }
        
        // 如果返回了用户数据，存储到localStorage
        if (data.data) {
          this.setUserInfo(data.data)
          return data.data
        }
        
        return data.data || true
      } else if (response.status === 401) {
        // Token无效，清除本地存储
        this.clearToken()
        return false
      } else {
        return false
      }
    } catch (error) {
      console.error('验证session失败:', error)
      return false
    }
  }

  /**
   * 退出登录
   */
  async logout() {
    const token = this.getToken()
    
    if (token) {
      try {
        await fetch(`${this.config.authBaseUrl}/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (error) {
        console.error('退出登录请求失败:', error)
      }
    }
    
    // 无论请求是否成功，都清除本地token
    this.clearToken()
  }

  /**
   * 获取认证头部
   */
  getAuthHeaders() {
    const token = this.getToken()
    if (!token) return {}
    
    return {
      'Authorization': `Bearer ${token}`
    }
  }
}

// 创建单例实例
export const githubAuth = new GitHubAuthService()