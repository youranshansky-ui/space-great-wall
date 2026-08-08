<template>
  <div class="page-container">
    <div class="py-20">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <!-- 返回链接 -->
        <NuxtLink to="/technology" class="inline-flex items-center gap-2 text-sm text-stellar-warm/60 hover:text-stellar-warm transition-colors mb-10">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>返回 守护月球的科技长城</span>
        </NuxtLink>

        <!-- 标题区 -->
        <div class="text-center mb-16">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="w-14 h-14 rounded-2xl bg-white/[0.03] border border-hologram-ice/[0.08] flex items-center justify-center text-3xl">{{ tech.icon }}</span>
          </div>
          <div class="flex items-center justify-center gap-2 mb-3">
            <span class="text-sm font-mono text-stellar-warm/50 tracking-widest">NO.{{ tech.id }}</span>
            <span class="text-sm text-hologram-ice/25">{{ tech.city }}</span>
          </div>
          <h1 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-3">
            {{ tech.title }}
          </h1>
          <p class="text-sm text-hologram-ice/35">{{ tech.subtitle }}</p>
          <div class="w-16 h-px bg-gradient-to-r from-transparent via-stellar-gold/30 to-transparent mx-auto mt-6"></div>
        </div>

        <!-- 核心数据 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          <div v-for="stat in tech.stats" :key="stat.label" class="rounded-xl border border-hologram-ice/[0.06] bg-deep-space-800/40 p-4 text-center">
            <div class="text-xs text-hologram-ice/25 mb-1.5">{{ stat.label }}</div>
            <div class="text-sm font-bold text-hologram-ice/65">{{ stat.value }}</div>
          </div>
        </div>

        <!-- 正文 -->
        <div class="space-y-6">
          <p v-for="(para, pi) in tech.detail" :key="pi" class="text-base lg:text-lg text-hologram-ice/50 leading-[2.2] tracking-wide">
            {{ para }}
          </p>
        </div>

        <!-- 底部分隔线 -->
        <div class="mt-16 mb-10 w-full h-px bg-gradient-to-r from-transparent via-hologram-ice/[0.08] to-transparent"></div>

        <!-- 底部导航 -->
        <div class="flex items-center justify-between">
          <NuxtLink
            v-if="prevTech"
            :to="`/technology-detail-${prevTech.id}`"
            class="flex items-center gap-2 text-base text-stellar-warm/60 hover:text-stellar-warm transition-colors group"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span class="hidden sm:inline">上一项</span>
            <span class="text-hologram-ice/30 group-hover:text-stellar-warm/60 transition-colors">· {{ prevTech.title }}</span>
          </NuxtLink>
          <div v-else></div>

          <NuxtLink to="/technology" class="text-base text-stellar-warm/60 hover:text-stellar-warm transition-colors">
            返回目录
          </NuxtLink>

          <NuxtLink
            v-if="nextTech"
            :to="`/technology-detail-${nextTech.id}`"
            class="flex items-center gap-2 text-base text-stellar-warm/60 hover:text-stellar-warm transition-colors group"
          >
            <span class="text-hologram-ice/30 group-hover:text-stellar-warm/60 transition-colors">{{ nextTech.title }} · </span>
            <span class="hidden sm:inline">下一项</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </NuxtLink>
          <div v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { technologies } from '~/data/technologies'

const route = useRoute()
const techId = computed(() => route.params.id)

const tech = computed(() => {
  return technologies.find(t => t.id === techId.value) || technologies[0]
})

const prevTech = computed(() => {
  const idx = technologies.findIndex(t => t.id === techId.value)
  return idx > 0 ? technologies[idx - 1] : null
})

const nextTech = computed(() => {
  const idx = technologies.findIndex(t => t.id === techId.value)
  return idx < technologies.length - 1 ? technologies[idx + 1] : null
})
</script>
