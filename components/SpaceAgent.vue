<template>
  <Teleport to="body">
    <!-- Floating chat dialog -->
    <Transition name="dialog">
      <div v-if="chatOpen" class="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center sm:justify-end"
        @click.self="chatOpen = false">
        <div class="pointer-events-auto w-full sm:w-[420px] h-[520px] max-h-[80vh] sm:mr-6 sm:mb-24 mx-0 sm:mx-0 mb-0 rounded-t-2xl sm:rounded-2xl holo-panel flex flex-col overflow-hidden shadow-2xl shadow-black/50"
          style="background: rgba(6, 12, 36, 0.95); backdrop-filter: blur(24px);">
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-hologram-ice/[0.06]">
            <div class="flex items-center gap-3">
              <img src="/images/xiaoyueyuetouxiang.png" alt="小月月" class="w-9 h-9 rounded-full object-cover border border-stellar-gold/20" />
              <div>
                <span class="text-sm font-semibold text-hologram-ice">太空人小月月</span>
                <span class="block text-[10px] text-hologram-ice/30">14岁 · 地月旅行家</span>
              </div>
            </div>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center text-hologram-ice/30 hover:text-hologram-ice hover:bg-white/[0.04] transition-all"
              @click="chatOpen = false">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Messages -->
          <div ref="msgContainer" class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div v-for="(msg, i) in messages" :key="i" class="flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
              <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                :class="msg.role === 'user'
                  ? 'bg-stellar-gold/15 text-hologram-ice/90 rounded-br-md'
                  : 'bg-white/[0.04] text-hologram-ice/70 rounded-bl-md border border-hologram-ice/[0.06]'">
                {{ msg.content }}
              </div>
            </div>
            <div v-if="loading" class="flex justify-start">
              <div class="bg-white/[0.04] border border-hologram-ice/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                <span class="flex gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-hologram-ice/40 animate-bounce" style="animation-delay: 0ms"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-hologram-ice/40 animate-bounce" style="animation-delay: 150ms"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-hologram-ice/40 animate-bounce" style="animation-delay: 300ms"></span>
                </span>
              </div>
            </div>
          </div>

          <!-- Input -->
          <div class="px-4 py-3 border-t border-hologram-ice/[0.06]">
            <form class="flex items-center gap-2" @submit.prevent="sendMsg">
              <input
                ref="inputRef"
                v-model="input"
                type="text"
                placeholder="输入消息..."
                class="flex-1 bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-2.5 text-sm text-hologram-ice/80 placeholder-hologram-ice/20 outline-none focus:border-stellar-gold/30 transition-colors"
                :disabled="loading"
              />
              <button type="submit" :disabled="loading || !input.trim()"
                class="w-10 h-10 rounded-xl bg-stellar-gold/20 border border-stellar-gold/20 flex items-center justify-center text-stellar-warm disabled:opacity-30 hover:bg-stellar-gold/30 transition-all flex-shrink-0">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>

    <!-- GLB Model corner button -->
    <div
      class="fixed right-0 bottom-[115px] z-[99999] cursor-pointer group"
      @click="toggleChat"
      :title="chatOpen ? '关闭对话' : '点击和我对话'"
    >
      <div class="relative w-[88px] h-[88px] transition-all duration-300">
        <canvas ref="canvasRef" class="w-full h-full"></canvas>
        <!-- Tooltip on hover -->
        <div class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
          <span class="text-[10px] text-stellar-warm font-semibold tracking-wider">和我对话</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// --- Chat state ---
const chatOpen = ref(false)
const input = ref('')
const messages = ref([
  { role: 'assistant', content: '嗨！我是小月月，太空长城的小向导。14岁的太空爱好者，爱探索、爱交友，关于月球新河北的一切都可以问我哦~' }
])
const loading = ref(false)
const msgContainer = ref(null)
const inputRef = ref(null)

// --- 3D model ---
const canvasRef = ref(null)
let scene, camera, renderer, model, animationId

function webglSupported() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch { return false }
}

function initScene() {
  const canvas = canvasRef.value
  if (!canvas || !webglSupported()) return

  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(88, 88)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0.6, 3.5)
    camera.lookAt(0, 0.3, 0)

    scene.add(new THREE.AmbientLight(0x445566, 1.8))
    const key = new THREE.DirectionalLight(0xffeedd, 2.5)
    key.position.set(2, 3, 4)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x88ccdd, 1.2)
    rim.position.set(-2, -0.5, -1)
    scene.add(rim)
  } catch (e) {
    console.warn('SpaceAgent WebGL init failed:', e)
  }
}

function loadModel() {
  if (!renderer) return
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  loader.setDRACOLoader(dracoLoader)
  loader.load('/space man.glb',
    (gltf) => {
      model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const sz = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(sz.x, sz.y, sz.z)
      const scale = 1.8 / maxDim
      model.scale.setScalar(scale)
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
      scene.add(model)
    },
    undefined,
    (err) => console.warn('SpaceAgent model load error:', err)
  )
}

function animate() {
  animationId = requestAnimationFrame(animate)
  if (!renderer || !scene || !camera) return
  if (model) model.rotation.y += 0.003
  renderer.render(scene, camera)
}

// --- Chat logic ---
function toggleChat() {
  chatOpen.value = !chatOpen.value
}

async function sendMsg() {
  const text = input.value.trim()
  if (!text || loading.value) return

  messages.value.push({ role: 'user', content: text })
  input.value = ''
  loading.value = true

  await nextTick()
  scrollToBottom()

  try {
    const res = await $fetch('/api/chat', {
      method: 'POST',
      body: { messages: messages.value.map(m => ({ role: m.role, content: m.content })) }
    })

    const reply = res.choices?.[0]?.message?.content || '（未收到回复）'
    messages.value.push({ role: 'assistant', content: reply })
  } catch (e) {
    messages.value.push({ role: 'assistant', content: '通讯故障，请稍后再试。' })
  } finally {
    loading.value = false
    await nextTick()
    scrollToBottom()
    setTimeout(() => inputRef.value?.focus(), 50)
  }
}

function scrollToBottom() {
  const el = msgContainer.value
  if (el) el.scrollTop = el.scrollHeight
}

watch(chatOpen, async (open) => {
  if (open) {
    await nextTick()
    inputRef.value?.focus()
  }
})

onMounted(() => {
  initScene()
  loadModel()
  animate()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) renderer.dispose()
})
</script>

<style scoped>
.dialog-enter-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.dialog-leave-active { transition: all 0.2s ease-in; }
.dialog-enter-from { opacity: 0; transform: translateY(20px) scale(0.95); }
.dialog-leave-to { opacity: 0; transform: translateY(10px) scale(0.98); }
</style>
