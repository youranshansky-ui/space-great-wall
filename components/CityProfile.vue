<template>
  <div class="holo-panel p-6 lg:p-10">
    <div class="flex flex-wrap items-baseline gap-3 mb-4">
      <h2 class="text-2xl lg:text-3xl font-display font-bold text-stellar-warm">{{ city.name }}</h2>
      <span class="tag text-[11px]">{{ city.position }}</span>
    </div>
    <p class="text-sm text-hologram-ice/60 mb-6 leading-relaxed">{{ city.subtitle }}</p>
    <div class="text-sm text-hologram-ice/45 leading-relaxed space-y-4" style="white-space: pre-line;">{{ city.profile }}</div>
    <div class="mt-8 pt-6 border-t border-hologram-cyan/[0.06]">
      <span class="text-[10px] font-mono text-hologram-ice/25 tracking-wider">
        {{ city.profile.length }} 字 · 新河北太空长城城市档案
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({ city: Object })
</script>
