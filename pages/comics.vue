<template>
  <div class="page-container">
    <PageHero title="太空长城的漫画宇宙" subtitle="三个系列，用漫画讲述月球基地的传奇" />

    <!-- 系列标签切换 -->
    <section class="pt-12 pb-6">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-center gap-3">
          <button
            v-for="(s, si) in series" :key="si"
            :id="'series-' + s.anchor"
            @click="switchSeries(si)"
            class="relative px-6 py-3 rounded-xl text-sm tracking-wide transition-all duration-300"
            :class="activeSeries === si
              ? 'bg-stellar-gold/10 border border-stellar-gold/20 text-stellar-warm'
              : 'bg-white/[0.02] border border-hologram-ice/[0.06] text-hologram-ice/35 hover:text-hologram-ice/55 hover:border-hologram-ice/[0.12]'"
          >
            {{ s.label }}
            <span class="block text-[10px] opacity-50 mt-0.5">{{ s.sub }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 当前系列标题 -->
    <section class="pb-2">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div class="w-12 h-px bg-gradient-to-r from-transparent via-stellar-gold/20 to-transparent mx-auto mb-4"></div>
        <p class="text-sm text-hologram-ice/35">{{ series[activeSeries].desc }}</p>
      </div>
    </section>

    <!-- 漫画章节网格 -->
    <section class="py-8 lg:py-10">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            v-for="(ch, ci) in currentChapters" :key="ci"
            class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/15"
            @click="openViewer(activeSeries, ci)"
          >
            <div class="p-3">
              <div class="flex items-center justify-between mb-2.5">
                <span class="tag"><span class="tag-dot"></span>第{{ ci + 1 }}话</span>
                <span class="text-[10px] text-hologram-ice/25 font-mono">{{ ch.length }} 页</span>
              </div>
              <div :class="ch.length === 4 ? 'grid grid-cols-2 grid-rows-2 gap-1' : 'grid grid-cols-3 gap-1'">
                <div v-for="n in ch" :key="n" class="aspect-[4/3] bg-deep-space-800 rounded overflow-hidden">
                  <img :src="`/images/${series[activeSeries].folder}/${n}.png`" class="w-full h-full object-cover" loading="lazy" @error="hideImg" />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>



    <!-- Full-screen viewer -->
    <Teleport to="body">
      <div v-if="viewerOpen" class="fixed inset-0 z-[10010] bg-black/95 backdrop-blur-sm"
        @click.self="closeViewer" @keydown="onKey">
        <button class="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.15] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          @click="closeViewer">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="w-full h-full flex items-center justify-center px-24 pt-12 pb-14" @click.self="closeViewer">
          <img :src="currentImgSrc" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        </div>

        <button v-if="hasPrev" class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.12] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.25] transition-all z-20"
          @click="prevImg">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button v-if="hasNext" class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.12] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.25] transition-all z-20"
          @click="nextImg">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div class="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center gap-3 px-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <span class="text-sm text-hologram-ice/50">第{{ viewerChapter + 1 }}话</span>
          <span class="text-[10px] text-hologram-ice/25 font-mono">·</span>
          <span class="text-sm text-hologram-ice/50">{{ viewerImgIndex + 1 }} / {{ viewerTotal }}</span>
          <span class="text-[10px] text-hologram-ice/25 font-mono">·</span>
          <span class="text-xs text-stellar-warm/50">{{ series[viewerSeries].label }}</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// --- Series config ---
const series = [
  { label: '系列一 · 阿澜的月球日记', sub: '可爱治愈', desc: '可爱外星人"阿澜"与中外建设者共同见证月球基地建设。', folder: 'alien-danyuan', anchor: 'alan' },
  { label: '系列二 · 许青的星际穿越', sub: '时空传奇', desc: '明代河北长城守军许青，穿越到四百多年后的月球新河北。', folder: 'xuqing-chuanyue', anchor: 'xuqing' },
  { label: '系列三 · 林老师的研学班', sub: '研学探索', desc: '跟随中外研学团，用画笔记录月球新河北的每一座城市。', folder: 'yanxue-danyuan', anchor: 'yanxue' },
]

const activeSeries = ref(0)

function switchSeries(idx) {
  activeSeries.value = idx
  const anchor = series[idx].anchor
  window.location.hash = 'series-' + anchor
  // Scroll to anchor
  const el = document.getElementById('series-' + anchor)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const seriesTotal = { alan: 10, xuqing: 11, yanxue: 10 }
const seriesTotalLabels = { alan: '阿澜', xuqing: '许青', yanxue: '研学' }

// Group images: 3 per chapter, last chapter gets 4
function groupImages(count) {
  const chapters = []
  let i = 1
  while (i <= count) {
    const remaining = count - i + 1
    if (remaining <= 4) {
      chapters.push(Array.from({ length: remaining }, (_, k) => i + k))
      break
    }
    chapters.push([i, i + 1, i + 2])
    i += 3
  }
  return chapters
}

const alanChapters = groupImages(10)
const xuqingChapters = groupImages(11)
const yanxueChapters = groupImages(10)

const allChapters = [alanChapters, xuqingChapters, yanxueChapters]
const currentChapters = computed(() => allChapters[activeSeries.value])

// Viewer state
const viewerOpen = ref(false)
const viewerSeries = ref(0)
const viewerChapter = ref(0)
const viewerImgIndex = ref(0)

const viewerTotal = computed(() => {
  return allChapters[viewerSeries.value].flat().length
})

const currentImgSrc = computed(() => {
  const ch = allChapters[viewerSeries.value][viewerChapter.value]
  if (!ch) return ''
  const n = ch[viewerImgIndex.value]
  return `/images/${series[viewerSeries.value].folder}/${n}.png`
})

const hasPrev = computed(() => {
  return viewerImgIndex.value > 0 || viewerChapter.value > 0
})

const hasNext = computed(() => {
  const ch = allChapters[viewerSeries.value][viewerChapter.value]
  if (!ch) return false
  if (viewerImgIndex.value < ch.length - 1) return true
  return viewerChapter.value < allChapters[viewerSeries.value].length - 1
})

function openViewer(seriesIdx, chapter) {
  viewerSeries.value = seriesIdx
  viewerChapter.value = chapter
  viewerImgIndex.value = 0
  viewerOpen.value = true
}

function closeViewer() {
  viewerOpen.value = false
}

function prevImg() {
  const chs = allChapters[viewerSeries.value]
  if (viewerImgIndex.value > 0) {
    viewerImgIndex.value--
  } else if (viewerChapter.value > 0) {
    viewerChapter.value--
    viewerImgIndex.value = chs[viewerChapter.value].length - 1
  }
}

function nextImg() {
  const chs = allChapters[viewerSeries.value]
  const ch = chs[viewerChapter.value]
  if (viewerImgIndex.value < ch.length - 1) {
    viewerImgIndex.value++
  } else if (viewerChapter.value < chs.length - 1) {
    viewerChapter.value++
    viewerImgIndex.value = 0
  }
}

function onKey(e) {
  if (e.key === 'ArrowLeft') prevImg()
  else if (e.key === 'ArrowRight') nextImg()
  else if (e.key === 'Escape') closeViewer()
}

function hideImg(e) {
  e.target.style.display = 'none'
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  // Read hash for series navigation
  const hash = window.location.hash
  if (hash) {
    const anchor = hash.replace('#series-', '')
    const idx = series.findIndex(s => s.anchor === anchor)
    if (idx >= 0) {
      activeSeries.value = idx
      nextTick(() => {
        const el = document.getElementById('series-' + anchor)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
})
</script>
