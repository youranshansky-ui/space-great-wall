<template>
  <div ref="containerRef" class="model-viewer-container w-full h-full min-h-[400px]">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-10">
      <div class="flex flex-col items-center gap-3">
        <div class="w-8 h-8 border-2 border-hologram-ice/30 border-t-stellar-warm rounded-full animate-spin"></div>
        <span class="text-xs text-hologram-ice/40">加载模型中...</span>
      </div>
    </div>
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const props = defineProps({
  src: { type: String, required: true }
})

const containerRef = ref(null)
const canvasRef = ref(null)
const loading = ref(true)

let scene, camera, renderer, model, animationId
let isDragging = false
let previousMouse = { x: 0, y: 0 }

onMounted(() => {
  initScene()
  loadModel()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) renderer.dispose()
})

watch(() => props.src, () => {
  if (model) {
    scene.remove(model)
    model = null
  }
  loading.value = true
  loadModel()
})

function initScene() {
  const container = containerRef.value
  if (!container) return

  const width = container.clientWidth
  const height = container.clientHeight || 500

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a122e)

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 1.5, 5)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ 
    canvas: canvasRef.value, 
    antialias: true,
    alpha: true 
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true

  // Lights
  const ambientLight = new THREE.AmbientLight(0x404060, 1.5)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0xffffff, 2)
  keyLight.position.set(5, 5, 5)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x88ccdd, 1)
  fillLight.position.set(-3, 1, -3)
  scene.add(fillLight)

  const rimLight = new THREE.DirectionalLight(0xd4a853, 1.5)
  rimLight.position.set(0, -1, 3)
  scene.add(rimLight)

  // Ground grid helper
  const gridHelper = new THREE.PolarGridHelper(3, 32, 24, 64, 0x334466, 0x223355)
  gridHelper.position.y = -1.5
  scene.add(gridHelper)

  animate()

  // Mouse events on canvas
  const canvas = canvasRef.value
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('mouseleave', onMouseUp)
  canvas.addEventListener('touchstart', onTouchStart, { passive: false })
  canvas.addEventListener('touchmove', onTouchMove, { passive: false })
  canvas.addEventListener('touchend', onMouseUp)
}

function loadModel() {
  if (!scene) return

  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  loader.setDRACOLoader(dracoLoader)
  loader.load(
    props.src,
    (gltf) => {
      model = gltf.scene
      
      // Center and scale model
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2.5 / maxDim
      
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
      model.scale.setScalar(scale)

      // Apply material tweaks
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      scene.add(model)
      loading.value = false
    },
    undefined,
    (err) => {
      console.error('模型加载失败:', err)
      loading.value = false
    }
  )
}

function onMouseDown(e) {
  isDragging = true
  previousMouse.x = e.clientX
  previousMouse.y = e.clientY
}

function onMouseMove(e) {
  if (!isDragging || !model) return
  const deltaX = e.clientX - previousMouse.x
  const deltaY = e.clientY - previousMouse.y
  model.rotation.y += deltaX * 0.01
  model.rotation.x += deltaY * 0.01
  previousMouse.x = e.clientX
  previousMouse.y = e.clientY
}

function onMouseUp() {
  isDragging = false
}

function onTouchStart(e) {
  e.preventDefault()
  isDragging = true
  previousMouse.x = e.touches[0].clientX
  previousMouse.y = e.touches[0].clientY
}

function onTouchMove(e) {
  if (!isDragging || !model) return
  e.preventDefault()
  const deltaX = e.touches[0].clientX - previousMouse.x
  const deltaY = e.touches[0].clientY - previousMouse.y
  model.rotation.y += deltaX * 0.01
  model.rotation.x += deltaY * 0.01
  previousMouse.x = e.touches[0].clientX
  previousMouse.y = e.touches[0].clientY
}

function onResize() {
  const container = containerRef.value
  if (!container || !renderer || !camera) return
  const width = container.clientWidth
  const height = container.clientHeight || 500
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  // Auto-rotate when not dragging
  if (model && !isDragging) {
    model.rotation.y += 0.003
  }
  renderer.render(scene, camera)
}
</script>

<style scoped>
.model-viewer-container {
  position: relative;
  cursor: grab;
}
.model-viewer-container:active {
  cursor: grabbing;
}
</style>
