<template>
  <div
    class="float-card holo-panel overflow-hidden group cursor-pointer"
    :style="animationStyle"
    @click.stop="handleClick"
  >
    <!-- Shadow layer -->
    <div class="absolute inset-0 rounded-xl bg-stellar-gold/5 blur-md -z-10 scale-90 transition-all duration-700 group-hover:scale-95 group-hover:bg-stellar-gold/10"></div>

    <!-- Image container -->
    <div class="aspect-[4/3] bg-deep-space-800 relative overflow-hidden rounded-xl">
      <img
        :src="item.src"
        :alt="item.title"
        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/90 via-deep-space-950/15 to-transparent pointer-events-none"></div>
      <!-- Hover gold shimmer -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-stellar-gold/[0.04] pointer-events-none"></div>

      <!-- Bottom info -->
      <div class="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
        <span v-if="item.city" class="tag text-[10px] mb-2 inline-block">{{ item.city }}</span>
        <h4 class="text-sm font-display font-bold text-stellar-warm leading-snug line-clamp-2">{{ item.title }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  delay: { type: Number, default: 0 }
})

const emit = defineEmits(['click'])

// Deterministic animation duration based on delay, avoiding Math.random() in template
const animationStyle = computed(() => {
  // Use delay-derived seed for variety without randomness
  const seed = ((props.delay * 7) % 10) / 10
  const duration = 3.2 + seed * 1.6 // 3.2s ~ 4.8s
  return {
    animationDelay: `${props.delay}s`,
    animationDuration: `${duration}s`,
  }
})

function handleClick() {
  emit('click')
}
</script>

<style scoped>
.float-card {
  animation: floatCard 4s ease-in-out infinite;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
.float-card:hover {
  transform: translateY(-6px);
  animation-play-state: paused;
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
</style>
