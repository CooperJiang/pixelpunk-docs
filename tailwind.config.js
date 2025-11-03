/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.{js,ts,vue,md}",
    "./docs/.vitepress/**/*.{js,ts,vue}"
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '2560px', // 添加超大屏幕断点
        '4xl': '3840px', // 4K屏幕
      },
      colors: {
        // 主要品牌色 - 赛博朋克经典配色
        'cyber-pink': '#ff2a6d',
        'cyber-blue': '#05d9e8', 
        'cyber-purple': '#9d4edd',
        'cyber-yellow': '#f9c80e',

        // 背景颜色系统 - 深色层次化设计
        'cyber-dark': '#0d1117', // 最深背景
        'cyber-gray': '#161b22', // 主背景
        'cyber-surface': '#1c2128', // 表面背景
        'cyber-card': '#22272e', // 卡片背景
        'cyber-hover': '#2d333b', // 悬浮状态

        // 文字颜色系统
        'cyber-text': '#c9d1d9', // 主要文字
        'cyber-text-muted': '#8b949e', // 次要文字
        'cyber-text-dim': '#6e7681', // 暗淡文字

        // 边框和分割线
        'cyber-border': '#30363d', // 主要边框
        'cyber-border-subtle': '#21262d', // 细微边框

        // 状态色系统
        'cyber-success': '#238636',
        'cyber-warning': '#d29922', 
        'cyber-danger': '#da3633',
        'cyber-info': '#0969da',

        // 透明度变体
        'cyber-overlay': 'rgba(22, 27, 34, 0.8)',
        'cyber-glass': 'rgba(22, 27, 34, 0.6)',
        
        'cyber-light': '#d1f7ff',

        // 兼容原有的cyber命名空间
        'cyber': {
          primary: '#05d9e8',
          secondary: '#ff2a6d',  
          accent: '#9d4edd',
          dark: '#0d1117',
          'dark-secondary': '#161b22',
          'dark-tertiary': '#1c2128',
          'neon-green': '#39ff14',
          'neon-pink': '#ff2a6d',
          'neon-blue': '#05d9e8',
          'neon-purple': '#9d4edd'
        }
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(5, 217, 232, 0.2)',
        'glow-md': '0 0 15px rgba(5, 217, 232, 0.3)', 
        'glow-lg': '0 0 20px rgba(5, 217, 232, 0.4)',
        'cyber-glow': '0 0 20px rgba(5, 217, 232, 0.5)',
        'cyber-pink-glow': '0 0 20px rgba(255, 42, 109, 0.5)',
        'cyber-purple-glow': '0 0 20px rgba(157, 76, 237, 0.5)'
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slide-down 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'matrix': 'matrix 20s linear infinite'
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-5px, 2px)' },
          '66%': { transform: 'translate(5px, -2px)' },
        },
        glow: {
          '0%': { 
            'text-shadow': '0 0 5px #05d9e8, 0 0 10px #05d9e8',
            'box-shadow': '0 0 20px rgba(5, 217, 232, 0.5)'
          },
          '100%': { 
            'text-shadow': '0 0 10px #ff2a6d, 0 0 20px #ff2a6d',
            'box-shadow': '0 0 30px rgba(255, 42, 109, 0.8)'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'matrix': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      },
      fontFamily: {
        // 使用IBM Plex字体系列 - 专业赛博朋克风格
        'orbitron': ['IBM Plex Sans', 'Arial', 'sans-serif'],
        'roboto-mono': ['IBM Plex Mono', 'Monaco', 'Consolas', 'monospace'],
        'heading': ['IBM Plex Sans', 'Arial', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'Monaco', 'Consolas', 'monospace'],
        'sans': ['IBM Plex Sans', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #05d9e8 0%, #9d4edd 50%, #ff2a6d 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2128 100%)',
        'grid': 'url("data:image/svg+xml,%3csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cdefs%3e%3cpattern id=\'grid\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3e%3cpath d=\'M 40 0 L 0 0 0 40\' fill=\'none\' stroke=\'%2330363d\' stroke-width=\'1\'/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\'/%3e%3c/svg%3e")',
        'cyber-grid': 'radial-gradient(circle at 50% 50%, rgba(5, 217, 232, 0.1) 0%, transparent 50%), linear-gradient(90deg, rgba(5, 217, 232, 0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(5, 217, 232, 0.05) 1px, transparent 1px)',
      }
    }
  },
  plugins: []
}