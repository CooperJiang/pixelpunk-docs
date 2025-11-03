<template>
  <section class="testimonials-section py-12">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6" :style="{background: 'linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}">
          用户评价
        </h2>
        <p class="text-xl max-w-3xl mx-auto" :style="{color: 'var(--cyber-text-secondary)'}">
          听听用户们对 PixelPunk 的真实评价和使用体验
        </p>
      </div>
      
      <!-- 评价轮播组件 -->
      <TestimonialCarousel />
      
      <!-- 适用场景组件 -->
      <UseCases />
      
      <!-- 社区统计组件 -->
      <CommunityStats />
      
      <!-- 加入社区组件 -->
      <CommunityCTA />
    </div>
  </section>
</template>

<script setup lang="ts">
// 组件已在全局注册，无需导入
</script>

<style scoped>
.testimonials-section {
  /* 主容器样式保持简洁 */
}
</style>