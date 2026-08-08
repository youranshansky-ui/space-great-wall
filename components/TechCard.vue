<template>
  <div class="holo-panel p-6 group transition-all duration-300">
    <div class="flex items-center gap-3 mb-4">
      <span class="text-xl">{{ tech.icon }}</span>
      <span class="text-[10px] tracking-widest text-hologram-ice/30 border border-hologram-cyan/10 rounded px-2 py-0.5">NO.{{ tech.id }}</span>
    </div>
    <h3 class="text-base font-semibold text-hologram-ice mb-3 group-hover:text-stellar-warm/90 transition-colors">{{ tech.title }}</h3>
    <p class="text-xs text-hologram-ice/40 leading-relaxed mb-4">{{ tech.desc }}</p>
    <div class="grid grid-cols-2 gap-2 pt-4 border-t border-white/[0.03]">
      <div v-for="(f, j) in tech.features" :key="j" class="text-[11px] text-hologram-ice/30 flex items-center gap-1.5">
        <span class="w-1 h-1 rounded-full bg-stellar-gold/60"></span>
        {{ f }}
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({ tech: Object })
</script>
