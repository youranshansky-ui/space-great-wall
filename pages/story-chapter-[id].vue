<template>
  <div class="page-container">
    <div class="py-20">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <!-- 返回链接 -->
        <NuxtLink to="/story#prologue" class="inline-flex items-center gap-2 text-sm text-stellar-warm/60 hover:text-stellar-warm transition-colors mb-10">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>返回 地月纪元的序章</span>
        </NuxtLink>

        <!-- 章节标题 -->
        <div class="text-center mb-16">
          <span class="block mb-3 text-lg font-semibold tracking-widest text-stellar-warm/70">第{{ chineseNum }}章</span>
          <h1 class="text-4xl lg:text-5xl font-display font-bold text-hologram-ice mb-4">
            {{ chapter.title }}
          </h1>
          <div class="w-16 h-px bg-gradient-to-r from-transparent via-stellar-gold/30 to-transparent mx-auto"></div>
        </div>

        <!-- 章节正文 -->
        <div class="space-y-6">
          <p v-for="(p, i) in chapter.paragraphs" :key="i" class="text-base lg:text-lg text-hologram-ice/50 leading-[2.2] tracking-wide">
            {{ p }}
          </p>
        </div>

        <!-- 底部分隔线 -->
        <div class="mt-16 mb-10 w-full h-px bg-gradient-to-r from-transparent via-hologram-ice/[0.08] to-transparent"></div>

        <!-- 底部导航 -->
        <div class="flex items-center justify-between">
          <NuxtLink
            v-if="prevChapter"
            :to="`/story-chapter-${prevChapter.id}`"
            class="flex items-center gap-2 text-base text-stellar-warm/60 hover:text-stellar-warm transition-colors group"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span class="hidden sm:inline">上一章</span>
            <span class="text-hologram-ice/30 group-hover:text-stellar-warm/60 transition-colors">· {{ prevChapter.title }}</span>
          </NuxtLink>
          <div v-else></div>

          <NuxtLink to="/story#prologue" class="text-base text-stellar-warm/60 hover:text-stellar-warm transition-colors">
            返回目录
          </NuxtLink>

          <NuxtLink
            v-if="nextChapter"
            :to="`/story-chapter-${nextChapter.id}`"
            class="flex items-center gap-2 text-base text-stellar-warm/60 hover:text-stellar-warm transition-colors group"
          >
            <span class="text-hologram-ice/30 group-hover:text-stellar-warm/60 transition-colors">{{ nextChapter.title }} · </span>
            <span class="hidden sm:inline">下一章</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </NuxtLink>
          <div v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { chapters } from '~/data/chapters'

const route = useRoute()
const chapterId = computed(() => parseInt(route.params.id))

const chineseNums = ['一', '二', '三', '四', '五']
const chineseNum = computed(() => chineseNums[chapterId.value - 1] || '')

const chapter = computed(() => {
  return chapters.find(c => c.id === chapterId.value) || chapters[0]
})

const prevChapter = computed(() => chapters.find(c => c.id === chapterId.value - 1) || null)
const nextChapter = computed(() => chapters.find(c => c.id === chapterId.value + 1) || null)
</script>
