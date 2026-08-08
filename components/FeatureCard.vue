<template>
  <NuxtLink :to="feature.to" class="holo-panel p-6 group block text-center transition-all duration-500 hover:-translate-y-1">
    <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-stellar-gold/10 to-hologram-cyan/5 border border-stellar-gold/10 flex items-center justify-center group-hover:border-stellar-gold/25 transition-all duration-500">
      <!-- Alien -->
      <svg v-if="feature.icon === 'alien'" class="w-7 h-7 text-stellar-warm/80" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9"/><ellipse cx="8.5" cy="10" rx="1.5" ry="2"/><ellipse cx="15.5" cy="10" rx="1.5" ry="2"/><path d="M8 15c1.5 2 6.5 2 8 0"/>
      </svg>
      <!-- Map -->
      <svg v-else-if="feature.icon === 'map'" class="w-7 h-7 text-stellar-warm/80" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
        <path d="M9 20l-6-3V4l6 3m0 13l6-3m-6 3V7m6 10l6 3V7l-6-3m0 13V7"/>
      </svg>
      <!-- Shop -->
      <svg v-else-if="feature.icon === 'shop'" class="w-7 h-7 text-stellar-warm/80" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
        <path d="M3 9l1.5-5h15L21 9m-18 0v8a2 2 0 002 2h14a2 2 0 002-2V9m-18 0h18"/><path d="M9 13a3 3 0 106 0"/>
      </svg>
      <!-- Travel -->
      <svg v-else class="w-7 h-7 text-stellar-warm/80" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z"/>
      </svg>
    </div>
    <h3 class="text-base font-display font-bold text-hologram-ice mb-2">{{ feature.title }}</h3>
    <p class="text-xs text-hologram-ice/40 leading-relaxed">{{ feature.desc }}</p>
  </NuxtLink>
</template>

<script setup>
defineProps({ feature: Object })
</script>
