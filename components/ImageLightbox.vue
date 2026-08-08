<template>
  <Teleport to="body">
    <div
      v-if="item"
      class="fixed inset-0 z-[100000] flex items-center justify-center"
      @click.self="close"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>

      <!-- Close button -->
      <button
        class="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] text-hologram-ice/60 hover:text-hologram-ice hover:bg-white/[0.1] transition-all z-20"
        @click.stop="close"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      <!-- Prev -->
      <button
        v-if="hasPrev"
        class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] text-hologram-ice/50 hover:text-hologram-ice hover:bg-white/[0.08] transition-all z-20"
        @click.stop="$emit('prev')"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <!-- Next -->
      <button
        v-if="hasNext"
        class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] text-hologram-ice/50 hover:text-hologram-ice hover:bg-white/[0.08] transition-all z-20"
        @click.stop="$emit('next')"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <!-- Content -->
      <div class="relative z-10 max-w-6xl w-full max-h-[90vh] flex flex-col lg:flex-row gap-6 px-4 sm:px-8">
        <div class="lg:flex-1 flex items-center justify-center min-h-0">
          <img
            :src="item.src"
            :alt="item.title || ''"
            class="max-w-full max-h-[75vh] object-contain rounded-2xl"
            style="border: 1px solid rgba(136,204,221,0.08);"
            @error="onImgError"
            @load="onImgLoad"
          />
        </div>
        <div class="lg:w-80 flex flex-col justify-center">
          <span v-if="item.city" class="tag text-[11px] mb-3 inline-block w-fit">{{ item.city }}</span>
          <h3 class="text-xl lg:text-2xl font-display font-bold text-stellar-warm mb-4">{{ item.title }}</h3>
          <p v-if="item.desc" class="text-sm text-hologram-ice/55 leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  item: { type: Object, default: null },
  hasPrev: { type: Boolean, default: false },
  hasNext: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'prev', 'next'])

function close() {
  emit('close')
}

function onImgError(e) {
  console.error('[ImageLightbox] 图片加载失败:', props.item?.src, e)
}

function onImgLoad() {
  console.log('[ImageLightbox] 图片加载成功:', props.item?.src)
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft' && props.hasPrev) emit('prev')
  if (e.key === 'ArrowRight' && props.hasNext) emit('next')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  // 防止背景滚动
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>
