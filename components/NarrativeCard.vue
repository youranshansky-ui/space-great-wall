<template>
  <div class="fade-in" ref="cardRef">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div :class="reverse ? 'lg:order-2' : ''">
        <div class="relative rounded-2xl overflow-hidden holo-border aspect-[16/9] bg-deep-space-800 group">
          <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/70 via-transparent to-transparent z-10"></div>
          <img :src="item.img" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" @error="onImgErr" />
          <div class="absolute top-4 left-4 z-20 tag">
            <span class="tag-dot"></span>
            {{ item.num }}
          </div>
          <div v-if="item.slogan" class="absolute bottom-4 right-4 z-20">
            <span class="px-4 py-1.5 rounded-full border border-stellar-gold/15 bg-deep-space-900/70 backdrop-blur text-xs text-stellar-warm/90">
              {{ item.slogan }}
            </span>
          </div>
        </div>
      </div>

      <div :class="reverse ? 'lg:order-1' : ''">
        <div class="tag mb-4"><span class="tag-dot"></span>NO.{{ item.num }}</div>
        <h3 class="text-2xl lg:text-3xl font-display font-bold text-hologram-ice mb-4 leading-tight">{{ item.title }}</h3>
        <p class="text-sm text-hologram-ice/45 leading-relaxed">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({ item: Object, index: Number, reverse: Boolean })
const cardRef = ref(null)
function onImgErr(e) { e.target.style.display = 'none' }
onMounted(() => {
  if (!process.client) return
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.15 })
  if (cardRef.value) obs.observe(cardRef.value)
})
</script>
