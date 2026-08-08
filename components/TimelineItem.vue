<template>
  <div class="relative flex items-start gap-6" :class="side === 'right' ? 'md:flex-row-reverse md:text-right' : ''">
    <div class="hidden md:flex flex-1" :class="side === 'right' ? 'justify-start' : 'justify-end'">
      <div class="holo-panel px-5 py-4 max-w-sm">
        <span class="text-xs font-mono text-stellar-warm/60 tracking-widest">{{ event.year }}</span>
        <h4 class="text-sm font-display font-bold text-hologram-ice mt-1 mb-1">{{ event.title }}</h4>
        <p class="text-xs text-hologram-ice/40 leading-relaxed">{{ event.desc }}</p>
      </div>
    </div>
    <div class="hidden md:flex w-3 h-3 rounded-full bg-stellar-gold/30 border border-stellar-gold/50 flex-shrink-0 mt-5 relative z-10 shadow-[0_0_12px_rgba(212,168,83,0.3)]"></div>
    <!-- Mobile: no alternating -->
    <div class="md:hidden flex items-start gap-4 w-full">
      <div class="w-2.5 h-2.5 rounded-full bg-stellar-gold/30 border border-stellar-gold/50 flex-shrink-0 mt-1.5 shadow-[0_0_10px_rgba(212,168,83,0.3)]"></div>
      <div class="holo-panel px-4 py-3 flex-1">
        <span class="text-xs font-mono text-stellar-warm/60 tracking-widest">{{ event.year }}</span>
        <h4 class="text-sm font-display font-bold text-hologram-ice mt-0.5 mb-0.5">{{ event.title }}</h4>
        <p class="text-xs text-hologram-ice/40 leading-relaxed">{{ event.desc }}</p>
      </div>
    </div>
    <div class="hidden md:block flex-1"></div>
  </div>
</template>

<script setup>
defineProps({ event: Object, side: String })
</script>
