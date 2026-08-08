<template>
  <div>
    <StarsBackground />
    <RocketCursor v-if="!isAdminRoute" />
    <NavDrawer v-if="!isAdminRoute" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <CrawlIntro v-if="showIntro && !isAdminRoute" @done="onIntroDone" />

    <!-- Site-wide background music (after intro) -->
    <audio v-if="!isAdminRoute" ref="bgmRef" src="/music/Advancing through space.mp3" loop playsinline preload="auto"></audio>

    <!-- Music toggle - top right (only after intro) -->
    <Teleport to="body">
      <button v-show="!showIntro && !isAdminRoute" class="site-music-btn" :class="{ muted: isMuted }" @click.stop="toggleMusic" :aria-label="isMuted ? '取消静音' : '静音'">
        <svg v-if="!isMuted" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
        </svg>
        <svg v-else width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      </button>
    </Teleport>

    <!-- Auth button - top right -->
    <AuthButton v-if="!isAdminRoute" :show-intro="showIntro" />

    <!-- Back to top button - below SpaceAgent -->
    <BackToTop v-if="!showIntro && !isAdminRoute" />

    <SpaceAgent v-if="!showIntro && !isAdminRoute" />
    <WelcomeModal v-if="!isAdminRoute" ref="welcomeRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const hasSeenIntro = process.client ? sessionStorage.getItem('seen_intro') : null
const showIntro = ref(!hasSeenIntro)
const welcomeRef = ref(null)

// --- BGM ---
const bgmRef = ref(null)
const isMuted = ref(false)

function toggleMusic() {
  isMuted.value = !isMuted.value
  const audio = bgmRef.value
  if (!audio) return
  if (isMuted.value) {
    audio.muted = true
  } else {
    audio.muted = false
    audio.play().catch(() => {})
  }
}

function onIntroDone() {
  showIntro.value = false
  if (process.client) sessionStorage.setItem('seen_intro', '1')
  setTimeout(() => welcomeRef.value?.show(), 600)
  const audio = bgmRef.value
  if (audio) {
    audio.currentTime = 0
    audio.muted = false
    audio.play().then(() => {
      isMuted.value = false
    }).catch(() => {
      isMuted.value = true
      function unmuteOnInteraction() {
        audio.muted = false
        audio.play().then(() => { isMuted.value = false }).catch(() => {})
        document.removeEventListener('click', unmuteOnInteraction)
        document.removeEventListener('keydown', unmuteOnInteraction)
        document.removeEventListener('touchstart', unmuteOnInteraction)
      }
      document.addEventListener('click', unmuteOnInteraction, { once: true })
      document.addEventListener('keydown', unmuteOnInteraction, { once: true })
      document.addEventListener('touchstart', unmuteOnInteraction, { once: true })
    })
  }
}

onMounted(() => {
  if (!showIntro.value) {
    setTimeout(() => welcomeRef.value?.show(), 400)
    const audio = bgmRef.value
    if (audio) {
      audio.play().then(() => {
        isMuted.value = false
      }).catch(() => {
        isMuted.value = true
        function unmuteOnInteraction() {
          audio.muted = false
          audio.play().then(() => { isMuted.value = false }).catch(() => {})
          document.removeEventListener('click', unmuteOnInteraction)
          document.removeEventListener('keydown', unmuteOnInteraction)
          document.removeEventListener('touchstart', unmuteOnInteraction)
        }
        document.addEventListener('click', unmuteOnInteraction, { once: true })
        document.addEventListener('keydown', unmuteOnInteraction, { once: true })
        document.addEventListener('touchstart', unmuteOnInteraction, { once: true })
      })
    }
  }
})
</script>

<style>
.site-music-btn {
  position: fixed; top: 28px; right: 28px; z-index: 1000;
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.45); display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px); transition: all 0.3s ease;
}
.site-music-btn:hover { border-color: rgba(136,204,221,0.5); color: rgba(136,204,221,0.85); }
.site-music-btn.muted { color: rgba(255,100,100,0.55); border-color: rgba(255,100,100,0.2); }
.site-music-btn.muted:hover { border-color: rgba(255,130,130,0.5); color: rgba(255,130,130,0.75); }

@media (max-width: 640px) {
  .site-music-btn { top: 16px; right: 12px; width: 34px; height: 34px; }
}
</style>
