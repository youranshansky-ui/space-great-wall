<template>
  <section class="relative py-28 lg:py-36 overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-5 text-glow-gold glow-text">{{ title }}</h1>
      <p class="text-base lg:text-lg text-hologram-ice/50 max-w-2xl mx-auto leading-relaxed">{{ subtitle }}</p>
    </div>
  </section>
</template>
<script setup>
defineProps({ title: String, subtitle: String })
</script>
