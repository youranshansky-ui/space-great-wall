<template>
  <div
    ref="cardRef"
    class="tilt-card holo-panel overflow-hidden group cursor-pointer"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @click="$emit('click')"
  >
    <div class="tilt-card-inner" :style="tiltStyle">
      <div class="aspect-[4/3] bg-deep-space-800 relative overflow-hidden">
        <img :src="item.src" :alt="item.title" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/90 via-deep-space-950/15 to-transparent"></div>
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-stellar-gold/[0.04]"></div>
        <div class="absolute bottom-0 left-0 right-0 p-5">
          <span v-if="item.city" class="tag text-[10px] mb-2 inline-block">{{ item.city }}</span>
          <h4 class="text-sm font-display font-bold text-stellar-warm leading-snug">{{ item.title }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ item: Object })
defineEmits(['click'])

const cardRef = ref(null)
const tiltX = ref(0)
const tiltY = ref(0)

function onMouseMove(e) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  tiltX.value = y * -12
  tiltY.value = x * 12
}

function onMouseLeave() {
  tiltX.value = 0
  tiltY.value = 0
}

const tiltStyle = computed(() => ({
  transform: `perspective(800px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg) scale3d(1, 1, 1)`,
  transition: tiltX.value === 0 && tiltY.value === 0 ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.1s ease-out',
}))
</script>

<style scoped>
.tilt-card { perspective: 800px; }
.tilt-card-inner { will-change: transform; }
</style>
