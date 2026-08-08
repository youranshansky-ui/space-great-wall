<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-show="visible" class="fixed right-0 bottom-4 z-[99998] flex flex-col items-center gap-1.5">
        <button
          class="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500 border-2 border-slate-400/60 flex items-center justify-center hover:scale-110 transition-transform duration-300"
          style="box-shadow: 0 0 25px rgba(168,168,168,0.4)"
          @click="scrollToTop"
          aria-label="回到顶部"
        >
          <svg width="16" height="16" fill="none" stroke="#5a5a6e" stroke-width="2.5" stroke-linecap="round" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          <!-- Craters decoration -->
          <div class="absolute w-2.5 h-2.5 rounded-full bg-slate-500/40 top-1.5 left-1.5"></div>
          <div class="absolute w-2 h-2 rounded-full bg-slate-500/35 bottom-2 right-2"></div>
          <div class="absolute w-1.5 h-1.5 rounded-full bg-slate-500/30 top-3 right-1.5"></div>
        </button>
        <span class="text-[11px] leading-[1.15] text-center text-slate-400/90 font-medium tracking-widest">
          回到<br/>顶部
        </span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
let lastScrollY = 0

function onScroll() {
  lastScrollY = window.scrollY
  visible.value = lastScrollY > window.innerHeight / 3
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
