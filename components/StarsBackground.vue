<template>
  <div class="star-layer">
    <!-- Nebula -->
    <canvas ref="nebulaCanvas" class="absolute inset-0 opacity-40"></canvas>
    <!-- Deep stars (slow parallax) -->
    <canvas ref="deepStarsCanvas" class="absolute inset-0"></canvas>
    <!-- Mid stars (medium parallax) -->
    <canvas ref="midStarsCanvas" class="absolute inset-0"></canvas>
    <!-- Near stars + dust (fast parallax) -->
    <canvas ref="nearStarsCanvas" class="absolute inset-0"></canvas>
    <!-- Orbit ring -->
    <canvas ref="orbitCanvas" class="absolute inset-0"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const nebulaCanvas = ref(null)
const deepStarsCanvas = ref(null)
const midStarsCanvas = ref(null)
const nearStarsCanvas = ref(null)
const orbitCanvas = ref(null)

let animationId = null
let scrollY = 0

onMounted(() => {
  const W = window.innerWidth
  const H = window.innerHeight

  // ========== Nebula ==========
  function initNebula() {
    const canvas = nebulaCanvas.value
    if (!canvas) return
    canvas.width = W; canvas.height = H
    const ctx = canvas.getContext('2d')

    // Large soft color blobs
    const blobs = [
      { x: W * 0.2, y: H * 0.3, r: W * 0.5, c: 'rgba(26,16,64,0.6)' },
      { x: W * 0.75, y: H * 0.6, r: W * 0.45, c: 'rgba(13,27,62,0.5)' },
      { x: W * 0.5, y: H * 0.15, r: W * 0.4, c: 'rgba(30,24,69,0.4)' },
      { x: W * 0.85, y: H * 0.25, r: W * 0.35, c: 'rgba(212,168,83,0.03)' },
      { x: W * 0.1, y: H * 0.7, r: W * 0.5, c: 'rgba(21,32,85,0.3)' },
    ]

    for (const b of blobs) {
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
      grad.addColorStop(0, b.c)
      grad.addColorStop(0.5, b.c.replace(/[\d.]+\)$/, '0.15)'))
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
    }
  }

  // ========== Star Layers ==========
  function createStarLayer(canvas, count, sizeRange, opacityRange, speedFactor) {
    canvas.width = W; canvas.height = H * 2 // double for scroll
    const ctx = canvas.getContext('2d')
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 2,
      r: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      baseOpacity: Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.002 + Math.random() * 0.01,
      warm: Math.random() > 0.85, // some warm stars
    }))

    return { ctx, stars, speedFactor }
  }

  let deepSS, midSS, nearSS

  function initStarLayers() {
    deepSS = createStarLayer(deepStarsCanvas.value, 400, [0.3, 1.0], [0.15, 0.5], 0.1)
    midSS = createStarLayer(midStarsCanvas.value, 250, [0.5, 1.5], [0.2, 0.7], 0.3)
    nearSS = createStarLayer(nearStarsCanvas.value, 120, [0.8, 2.2], [0.25, 0.9], 0.6)
  }

  function drawStarLayer({ ctx, stars, speedFactor }, time, scrollOffset) {
    ctx.clearRect(0, 0, W, H * 2)
    for (const s of stars) {
      const dy = scrollOffset * speedFactor
      const sy = (s.y + dy) % (H * 2)
      if (sy < 0 || sy > H * 2) continue

      const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed * 60 + s.twinklePhase)
      let alpha = s.baseOpacity * (0.6 + 0.4 * twinkle)

      // Glow
      ctx.beginPath()
      ctx.arc(s.x, sy, s.r * 3, 0, Math.PI * 2)
      const glowColor = s.warm
        ? `rgba(212,168,83,${alpha * 0.08})`
        : `rgba(136,204,221,${alpha * 0.06})`
      ctx.fillStyle = glowColor
      ctx.fill()

      // Core
      ctx.beginPath()
      ctx.arc(s.x, sy, s.r, 0, Math.PI * 2)
      const coreColor = s.warm
        ? `rgba(255,220,180,${alpha})`
        : `rgba(200,220,240,${alpha})`
      ctx.fillStyle = coreColor
      ctx.fill()
    }
  }

  // ========== Orbit Ring ==========
  function initOrbit() {
    const canvas = orbitCanvas.value
    if (!canvas) return
    canvas.width = W; canvas.height = H
    const ctx = canvas.getContext('2d')

    const cx = W * 0.7, cy = H * 0.5
    const rx = W * 0.6, ry = H * 0.4
    let angle = 0

    return { ctx, cx, cy, rx, ry, angle }
  }

  function drawOrbit(orbit, time) {
    if (!orbit) return
    const { ctx, cx, cy, rx, ry } = orbit
    ctx.clearRect(0, 0, W, H)

    const a = time * 0.0002 + scrollY * 0.0002
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(a * 0.3)

    ctx.beginPath()
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(136,204,221,0.04)'
    ctx.lineWidth = 1
    ctx.setLineDash([2, 8])
    ctx.stroke()

    // Small dot on orbit
    const dotAngle = a
    const dx = rx * Math.cos(dotAngle)
    const dy = ry * Math.sin(dotAngle)
    ctx.beginPath()
    ctx.arc(dx, dy, 2, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(212,168,83,0.4)'
    ctx.shadowColor = 'rgba(212,168,83,0.6)'
    ctx.shadowBlur = 8
    ctx.fill()
    ctx.shadowBlur = 0

    ctx.restore()
  }

  // ========== Animation ==========
  let orbit = null
  const resize = () => {
    const nW = window.innerWidth, nH = window.innerHeight
    initNebula()
    initStarLayers()
    orbit = initOrbit()
  }

  window.addEventListener('resize', resize)
  window.addEventListener('scroll', () => { scrollY = window.scrollY })

  initNebula()
  initStarLayers()
  orbit = initOrbit()

  function animate(time) {
    const t = time * 0.001

    drawStarLayer(deepSS, t, scrollY)
    drawStarLayer(midSS, t, scrollY)
    drawStarLayer(nearSS, t, scrollY)
    drawOrbit(orbit, t)

    animationId = requestAnimationFrame(animate)
  }

  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>
