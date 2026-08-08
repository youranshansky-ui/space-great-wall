<template>
  <div class="flex flex-col items-center text-center p-5 rounded-xl holo-panel">
    <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-glow-gold mb-1">
      {{ number }}<span class="text-base sm:text-lg ml-1 text-stellar-warm/70">{{ unit }}</span>
    </div>
    <div class="text-[11px] text-hologram-ice/40 tracking-widest uppercase">{{ label }}</div>
  </div>
</template>
<script setup>
defineProps({ number: String, unit: String, label: String })
</script>
