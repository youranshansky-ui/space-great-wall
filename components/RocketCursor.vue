<template>
  <div>
    <canvas ref="dustCanvas" class="fixed inset-0 pointer-events-none z-[200001]"></canvas>
    <div
      ref="rocketRef"
      class="fixed pointer-events-none z-[200001]"
      style="width:28px;height:28px;transform:translate(-50%,-50%)"
    >
      <svg viewBox="0 0 32 32" class="w-full h-full">
        <defs>
          <linearGradient id="rkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#d4a853"/>
            <stop offset="50%" stop-color="#e8c97a"/>
            <stop offset="100%" stop-color="#88ccdd"/>
          </linearGradient>
          <filter id="rkGlow">
            <feGaussianBlur stdDeviation="1" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g transform="rotate(45, 16, 16)" filter="url(#rkGlow)">
          <path d="M16 2 L12 14 L16 12 L20 14 Z" fill="url(#rkGrad)"/>
          <rect x="14" y="14" width="4" height="6" rx="1" fill="#c8923a"/>
          <path d="M13 20 L16 28 L19 20" fill="#d4a853" opacity="0.7"/>
          <circle cx="16" cy="8" r="2.5" fill="white" opacity="0.9"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const rocketRef = ref(null)
const dustCanvas = ref(null)
let mouseX = 0, mouseY = 0
let targetX = 0, targetY = 0
let particles = []
let animId = null

onMounted(() => {
  const canvas = dustCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  resize()
  window.addEventListener('resize', resize)

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  class DustParticle {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.vx = (Math.random() - 0.5) * 0.8
      this.vy = (Math.random() - 0.5) * 0.8 - 0.3
      this.life = 1
      this.decay = 0.012 + Math.random() * 0.025
      this.size = Math.random() * 2 + 0.5
      this.gold = Math.random() > 0.6
    }
    update() {
      this.x += this.vx
      this.y += this.vy
      this.life -= this.decay
      this.size *= 0.993
    }
    draw(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      const base = this.gold ? '230,210,160' : '180,210,230'
      const alpha = this.life.toFixed(2)
      ctx.fillStyle = `rgba(${base},${alpha})`
      ctx.fill()
    }
  }

  function onMouseMove(e) {
    targetX = e.clientX
    targetY = e.clientY
  }

  function animate() {
    mouseX += (targetX - mouseX) * 0.12
    mouseY += (targetY - mouseY) * 0.12

    if (rocketRef.value) {
      rocketRef.value.style.left = mouseX + 'px'
      rocketRef.value.style.top = mouseY + 'px'
    }

    const dx = targetX - mouseX
    const dy = targetY - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > 2) {
      const count = Math.min(Math.floor(dist / 5), 3)
      for (let i = 0; i < count; i++) {
        particles.push(new DustParticle(mouseX, mouseY))
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles = particles.filter(p => p.life > 0)
    for (const p of particles) {
      p.update()
      p.draw(ctx)
    }
    animId = requestAnimationFrame(animate)
  }

  window.addEventListener('mousemove', onMouseMove)
  animate()
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>
