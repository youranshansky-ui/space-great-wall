<template>
  <div class="crawl-scene" :class="{ 'fade-out': done }">
    <canvas ref="starsCanvas" class="stars-canvas"></canvas>
    <div class="top-mask"></div>
    <div class="bottom-mask"></div>
    <div class="bottom-bar">
      <!-- Music toggle -->
      <audio ref="bgmRef" src="/music/space1.mp3" loop autoplay playsinline preload="auto"></audio>
      <button class="music-btn" :class="{ muted: isMuted }" @click="toggleMusic" :aria-label="isMuted ? '取消静音' : '静音'">
        <svg v-if="!isMuted" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
        </svg>
        <svg v-else width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      </button>
      <button class="skip-btn" @click.stop="skip">跳过 ▸</button>
    </div>

    <!-- Spaceships -->
    <div class="spaceship ship-left" :class="{ flying: shouldCrawl }" v-show="shouldCrawl || !hasEnded">
      <svg viewBox="0 0 100 40" fill="none">
        <!-- Rocket body -->
        <path d="M2 20 L16 34 L80 26 L76 20 L80 14 L16 6Z" stroke="rgba(255,255,255,0.5)" stroke-width="1" fill="rgba(255,255,255,0.06)"/>
        <!-- Flame -->
        <path d="M75 16 Q90 20 88 20 Q90 20 75 24Z" fill="rgba(255,140,50,0.5)"/>
        <!-- Window -->
        <circle cx="22" cy="20" r="3" fill="rgba(136,204,221,0.5)"/>
        <!-- Fins -->
        <line x1="14" y1="32" x2="8" y2="38" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
        <line x1="14" y1="8" x2="8" y2="2" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
      </svg>
    </div>
    <div class="spaceship ship-right" :class="{ flying: shouldCrawl }" v-show="shouldCrawl || !hasEnded">
      <svg viewBox="0 0 80 40" fill="none">
        <!-- UFO dome -->
        <ellipse cx="50" cy="22" rx="8" ry="9" stroke="rgba(255,255,255,0.5)" stroke-width="1" fill="rgba(136,204,221,0.08)"/>
        <!-- UFO body -->
        <ellipse cx="40" cy="22" rx="30" ry="7" stroke="rgba(255,255,255,0.5)" stroke-width="1" fill="rgba(255,255,255,0.04)"/>
        <!-- Bottom beam -->
        <ellipse cx="40" cy="30" rx="10" ry="4" fill="rgba(212,168,83,0.15)"/>
        <ellipse cx="40" cy="30" rx="6" ry="2.5" fill="rgba(212,168,83,0.25)"/>
        <!-- Lights -->
        <circle cx="18" cy="22" r="1.5" fill="rgba(212,168,83,0.7)"/>
        <circle cx="35" cy="20" r="1.2" fill="rgba(136,204,221,0.6)"/>
        <circle cx="55" cy="20" r="1.2" fill="rgba(136,204,221,0.6)"/>
        <circle cx="68" cy="22" r="1.5" fill="rgba(212,168,83,0.7)"/>
      </svg>
    </div>

    <!-- Logo -->
    <div class="logo-wrap" :class="logoState">
      <GreatWallLogo class="logo-icon" />
      <div class="logo-name">新河北太空长城</div>
    </div>

    <!-- Crawl -->
    <div class="crawl-perspective">
      <div ref="trackRef" class="crawl-track" :class="{ rolling: shouldCrawl }">
        <div class="crawl-text">
          <div class="ep">第一章</div>
          <div class="title">宇宙纪元的序章</div>
          <p>随着中国式现代化建设不断推进，中华民族伟大复兴的光辉愿景正逐步实现。由中国引领的科技时代迎来空前爆发，人类开始大规模建设月球基地。</p>
          <p>长城——这座横亘千年的中华民族精神图腾，在新时代获得了全新的生命。它不仅是故土的守望者，更承载着乡愁与民族精神，跨越三十八万公里，延伸至月球之上。</p>
          <p>河北长城作为中国保存最完好的段落之一，将这份文明荣耀带到了月球。新石家庄、新唐山市、新保定市、新邯郸市、新张家口、新秦皇岛......每一座城市的名字，都在月面找到了新的坐标。</p>
          <div class="ep">第二章</div>
          <div class="title">新河北 · 太空长城</div>
          <p>从地球长城到月球，一条新的航线已经开启。各国建设者在此学习中文、研究长城、并肩筑城。三个大气压的穹顶之下，是工厂、市集、学校、公园与万家灯火。这不仅是技术的奇迹，更是文明的延伸。</p>
          <div class="ep">第三章</div>
          <div class="title">命运与共 · 星际协作</div>
          <p>在人类命运共同体的基础上，地月文明与外星文明积极接触，友好交流，形成了星际文明共同体的共识。人类与外星友好文明建立了深厚联系，以太空长城城市为枢纽，开启了星际合作的全新纪元。地球与月球，过去与未来，不同文明在同一座城墙下共同建设、共同守护、共创未来。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['done'])
const done = ref(false)
const logoState = ref('hidden')
const shouldCrawl = ref(false)
const starsCanvas = ref(null)
const trackRef = ref(null)
const bgmRef = ref(null)
const isMuted = ref(false)
let starAnimId = null
let crawlAnimId = null
let hasEnded = false

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

function finish() {
  if (done.value || hasEnded) return
  hasEnded = true
  if (starAnimId) cancelAnimationFrame(starAnimId)
  if (crawlAnimId) cancelAnimationFrame(crawlAnimId)
  done.value = true
  setTimeout(() => emit('done'), 800)
}

function skip() { finish() }

function startCrawl() {
  const track = trackRef.value
  if (!track) return
  track.style.opacity = '1'

  const totalH = track.scrollHeight
  const viewH = window.innerHeight
  const distance = totalH + viewH * 0.3
  const isMobile = viewH < 700
  const rotateAngle = isMobile ? 18 : 20
  const duration = isMobile ? 32000 : 40000
  const fadeInEnd = 0.03
  const fadeOutStart = 0.97
  const startTime = performance.now()

  function animate(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const y = -progress * distance

    let opacity = 0
    if (progress < fadeInEnd) {
      opacity = progress / fadeInEnd
    } else if (progress > fadeOutStart) {
      opacity = Math.max(0, (1 - progress) / (1 - fadeOutStart))
    } else {
      opacity = 1
    }

    track.style.transform = `translateX(-50%) rotateX(${rotateAngle}deg) translateY(${y}px)`
    track.style.opacity = opacity

    if (progress < 1) {
      crawlAnimId = requestAnimationFrame(animate)
    } else {
      finish()
    }
  }

  crawlAnimId = requestAnimationFrame(animate)
}

onMounted(() => {
  // --- Audio: autoplay handles it ---
  const audio = bgmRef.value
  if (audio) {
    audio.play().catch(() => {
      // Browser blocked unmuted autoplay — fall back to interaction-based unmute
      isMuted.value = true
      audio.muted = true
      audio.play().catch(() => {})
      function unmuteOnInteraction() {
        audio.muted = false
        isMuted.value = false
        audio.play().catch(() => {})
        document.removeEventListener('click', unmuteOnInteraction)
        document.removeEventListener('keydown', unmuteOnInteraction)
        document.removeEventListener('touchstart', unmuteOnInteraction)
      }
      document.addEventListener('click', unmuteOnInteraction, { once: true })
      document.addEventListener('keydown', unmuteOnInteraction, { once: true })
      document.addEventListener('touchstart', unmuteOnInteraction, { once: true })
    })
  }

  const canvas = starsCanvas.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    const rs = () => { canvas.width = innerWidth; canvas.height = innerHeight }
    rs(); window.addEventListener('resize', rs)
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2, t: Math.random() * Math.PI * 2,
      sp: 0.003 + Math.random() * 0.015
    }))
    const COLORS = Array.from({ length: 10 }, (_, i) => `rgba(255,255,255,${0.3 + 0.7 * (i / 9)})`)
    ;(function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = COLORS[Math.floor(Math.abs(Math.sin(time * s.sp * 60 + s.t)) * 9) | 0]
        ctx.fill()
      }
      starAnimId = requestAnimationFrame(draw)
    })(0)
  }

  setTimeout(() => { logoState.value = 'on' }, 600)
  setTimeout(() => {
    logoState.value = 'out'
    setTimeout(() => { logoState.value = 'hidden' }, 800)
    shouldCrawl.value = true
    startCrawl()
  }, 2600)
})

onUnmounted(() => {
  if (starAnimId) cancelAnimationFrame(starAnimId)
  if (crawlAnimId) cancelAnimationFrame(crawlAnimId)
})
</script>

<style scoped>
.crawl-scene {
  position: fixed; inset: 0; z-index: 10000;
  background: #000008; overflow: hidden;
  transition: opacity 0.8s ease;
  font-family: 'Noto Serif SC', serif;
}
.crawl-scene.fade-out { opacity: 0; pointer-events: none; }

.stars-canvas { position: fixed; inset: 0; pointer-events: none; will-change: transform; transform: translateZ(0); }

.top-mask {
  position: fixed; bottom: 55%; left: 0; right: 0; height: 45%; z-index: 2;
  background: linear-gradient(to top, transparent 0%, #000008 85%);
  pointer-events: none; will-change: opacity;
}
.bottom-mask {
  position: fixed; top: 85%; left: 0; right: 0; height: 15%; z-index: 2;
  background: linear-gradient(to bottom, transparent 0%, #000008 70%);
  pointer-events: none; will-change: opacity;
}

.bottom-bar {
  position: fixed; bottom: 36px; right: 36px; z-index: 10;
  display: flex; align-items: center; gap: 12px;
}

.skip-btn {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.45); padding: 10px 28px; border-radius: 24px;
  font-size: 13px; letter-spacing: 0.15em; backdrop-filter: blur(8px);
  line-height: 1;
}
.skip-btn:hover { border-color: rgba(212,168,83,0.5); color: rgba(212,168,83,0.85); }

.music-btn {
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.45); display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px); transition: all 0.3s ease; flex-shrink: 0;
}
.music-btn:hover { border-color: rgba(136,204,221,0.5); color: rgba(136,204,221,0.85); }
.music-btn.muted { color: rgba(255,100,100,0.55); border-color: rgba(255,100,100,0.2); }
.music-btn.muted:hover { border-color: rgba(255,130,130,0.5); color: rgba(255,130,130,0.75); }

.logo-wrap {
  position: fixed; top: 44%; left: 50%; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; gap: 24px;
  z-index: 5; pointer-events: none;
}
.logo-wrap.hidden { opacity: 0; transition: none; }
.logo-wrap.on     { opacity: 1; transition: opacity 0.8s; }
.logo-wrap.out    { opacity: 0; transition: opacity 0.8s; }
.logo-icon { width: 120px; height: 120px; color: #d4a853; filter: drop-shadow(0 0 24px rgba(212,168,83,0.5)); }
.logo-name {
  font-size: 100px; font-weight: 700; letter-spacing: 0.2em; white-space: nowrap;
  background: linear-gradient(180deg, #f5e6c8, #d4a853, #c8923a);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

/* ===== 3D perspective — GPU accelerated via JS rAF ===== */
.crawl-perspective {
  position: fixed; inset: 0; overflow: hidden;
  perspective: 450px; z-index: 1;
  will-change: transform; transform: translateZ(0);
}

.crawl-track {
  position: absolute;
  top: 100%; left: 50%;
  transform: translateX(-50%) rotateX(20deg);
  transform-origin: 50% 50%;
  opacity: 0;
  backface-visibility: hidden;
  will-change: transform, opacity;
}

.crawl-text {
  text-align: center;
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  padding-bottom: 40vh;
}

/* Unified: 17+ chars per line on 2560px */
.crawl-text .ep,
.crawl-text .title,
.crawl-text p {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(65px, 5vw, 128px);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.04em;
  background: linear-gradient(180deg, #f5e6c8 0%, #d4a853 50%, #c8923a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  overflow-wrap: break-word;
  margin: 0 0 0.3em 0;
  padding: 0;
}

.crawl-text .ep { letter-spacing: 0.35em; }
.crawl-text .spirit { letter-spacing: 0.1em; }

/* ===== Spaceships ===== */
.spaceship {
  position: fixed; z-index: 3; pointer-events: none;
  width: clamp(50px, 7vw, 120px);
  opacity: 0;
}
.spaceship.flying { animation: shipFly 8s ease-in-out infinite; }
.spaceship.flying.ship-left  { animation-delay: 0s; }
.spaceship.flying.ship-right { animation-delay: 5s; }

@keyframes shipFly {
  0%   { opacity: 0; }
  8%   { opacity: 0.7; }
  90%  { opacity: 0.6; }
  100% { opacity: 0; }
}

/* Rocket — upper path */
.ship-left {
  top: 3%; left: -8%;
}
.ship-left.flying {
  animation: shipFly 8s ease-in-out 0s infinite,
    shipMoveL 8s ease-in-out 0s infinite;
}
@keyframes shipMoveL {
  0%   { transform: translate(0, 0); }
  100% { transform: translate(75vw, 10vh) rotate(5deg); }
}

/* UFO — mid path, no overlap */
.ship-right {
  top: 22vh; right: -8%;
}
.ship-right.flying {
  animation: shipFly 9s ease-in-out 0s infinite,
    shipMoveR 9s ease-in-out 0s infinite;
}
@keyframes shipMoveR {
  0%   { transform: translate(0, 0); }
  100% { transform: translate(-72vw, -3vh) rotate(-4deg); }
}

@media (max-width: 640px) {
  .crawl-perspective { perspective: 350px; }
  .crawl-track { transform: translateX(-50%) rotateX(18deg); }
  .crawl-text { width: 92%; padding-bottom: 30vh; }
  .crawl-text .ep, .crawl-text .title, .crawl-text p { font-size: 28px; line-height: 1.4; }
  .logo-name { font-size: 40px; }
  .logo-icon { width: 64px; height: 64px; }
  .bottom-bar { bottom: 16px; right: 12px; gap: 8px; }
  .skip-btn { padding: 8px 18px; font-size: 11px; }
  .music-btn { width: 34px; height: 34px; }
}
</style>
