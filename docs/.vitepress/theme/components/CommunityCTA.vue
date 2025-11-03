<template>
  <div class="community-cta text-center">
    <div class="cta-content rounded-2xl p-12">
      <h3 class="text-3xl font-bold mb-4" :style="{color: 'var(--cyber-text-primary)'}">
        加入我们的社区
      </h3>
      <p class="text-lg mb-8 max-w-2xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
        与其他用户交流经验，获取技术支持，参与产品开发
      </p>
      <div class="flex justify-center gap-4">
        <a href="https://qm.qq.com/cgi-bin/qm/qr?k=826708512" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          加入QQ群 (826708512)
        </a>
        <a href="https://github.com/pixelpunk/pixelpunk" class="btn btn-secondary">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.community-cta {
  margin-top: 4rem;
}

.cta-content {
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(26, 22, 37, 0.9) 0%, 
    rgba(45, 38, 64, 0.8) 50%, 
    rgba(36, 29, 53, 0.9) 100%) !important;
  border: 1px solid rgba(0, 255, 255, 0.3) !important;
  box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1), 0 0 0 1px rgba(0, 255, 255, 0.1);
}

[data-theme="dark"] .cta-content {
  background: linear-gradient(135deg, 
    rgba(26, 22, 37, 0.95) 0%, 
    rgba(45, 38, 64, 0.9) 50%, 
    rgba(36, 29, 53, 0.95) 100%) !important;
  border: 1px solid rgba(0, 255, 255, 0.4) !important;
  box-shadow: 0 8px 32px rgba(0, 255, 255, 0.15), 0 0 20px rgba(0, 255, 255, 0.1);
}

.cta-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  animation: shimmer 4s ease-in-out infinite;
  z-index: 0;
}

.cta-content > * {
  position: relative;
  z-index: 1;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

[data-theme="light"] .cta-content {
  background: linear-gradient(135deg, 
    rgba(246, 248, 250, 0.95) 0%, 
    rgba(241, 243, 244, 0.9) 100%) !important;
  border: 1px solid var(--cyber-border-hover) !important;
  box-shadow: 0 8px 25px var(--cyber-shadow);
}
</style>