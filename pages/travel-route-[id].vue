<template>
  <div class="page-container min-h-screen">
    <!-- Back link -->
    <div class="max-w-4xl mx-auto px-6 pt-8 pb-4">
      <NuxtLink to="/travel#routes" class="inline-flex items-center gap-2 text-sm text-stellar-warm/60 hover:text-stellar-warm transition-colors">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        返回 旅游研学
      </NuxtLink>
    </div>

    <div v-if="!route" class="max-w-4xl mx-auto px-6 py-20 text-center">
      <p class="text-lg text-hologram-ice/30">路线未找到</p>
      <NuxtLink to="/travel" class="inline-block mt-4 text-sm text-stellar-warm/60 hover:text-stellar-warm">返回旅游研学</NuxtLink>
    </div>

    <template v-else>
      <!-- Hero -->
      <div class="max-w-4xl mx-auto px-6 pb-12 text-center">
        <div class="text-5xl mb-6">{{ route.icon }}</div>
        <div class="flex items-center justify-center gap-3 mb-4 flex-wrap">
          <span class="text-sm font-mono text-stellar-warm/50 tracking-widest">{{ route.id }}</span>
          <span class="text-sm px-3 py-1 rounded-full border" :class="route.levelClass">{{ route.level }}</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-display font-bold text-hologram-ice mb-4">{{ route.title }}</h1>
        <p class="text-lg text-hologram-ice/40 max-w-2xl mx-auto mb-8">{{ route.desc }}</p>

        <!-- Stats -->
        <div class="flex items-center justify-center gap-8 flex-wrap">
          <div class="text-center">
            <div class="text-2xl font-mono font-bold text-stellar-warm">{{ route.duration }}</div>
            <div class="text-xs text-hologram-ice/25 mt-1">行程时长</div>
          </div>
          <div class="w-px h-10 bg-hologram-ice/[0.06]"></div>
          <div class="text-center">
            <div class="text-2xl font-mono font-bold text-stellar-warm">{{ route.budget }}</div>
            <div class="text-xs text-hologram-ice/25 mt-1">星币/人</div>
          </div>
          <div class="w-px h-10 bg-hologram-ice/[0.06]"></div>
          <div class="text-center">
            <div class="text-2xl font-mono font-bold text-hologram-ice/60">限{{ route.maxPeople }}人</div>
            <div class="text-xs text-hologram-ice/25 mt-1">每团人数</div>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex justify-center gap-2 mt-8">
          <span v-for="tag in route.tags" :key="tag" class="text-xs text-hologram-ice/25 bg-white/[0.02] border border-hologram-ice/[0.05] rounded-full px-3 py-1">{{ tag }}</span>
        </div>
      </div>

      <!-- Itinerary -->
      <div class="max-w-3xl mx-auto px-6 pb-20">
        <h2 class="text-2xl font-display font-bold text-hologram-ice mb-10 text-center">行程安排</h2>

        <div class="relative pl-8 border-l border-hologram-ice/[0.08] space-y-10">
          <div v-for="(item, idx) in route.itinerary" :key="idx" class="relative">
            <!-- Timeline dot -->
            <div class="absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2" :class="idx === 0 ? 'bg-stellar-gold/30 border-stellar-gold' : 'bg-deep-space-800 border-hologram-ice/[0.15]'"></div>

            <span class="text-xs font-mono text-stellar-warm/40 tracking-widest block mb-2">{{ item.day }}</span>
            <h3 class="text-lg font-display font-bold text-hologram-ice mb-3">{{ item.title }}</h3>
            <p class="text-base lg:text-lg text-hologram-ice/45 leading-[2.2]">{{ item.content }}</p>
          </div>
        </div>

        <!-- Bottom navigation -->
        <div class="flex items-center justify-between mt-16 pt-8 border-t border-hologram-ice/[0.06]">
          <NuxtLink
            v-if="prevRoute"
            :to="'/travel-route-' + prevRoute"
            class="flex items-center gap-2 text-sm text-stellar-warm/60 hover:text-stellar-warm transition-colors group"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span class="hidden sm:inline">上一条路线</span>
          </NuxtLink>
          <span v-else class="text-sm text-hologram-ice/10">没有更早的路线</span>

          <NuxtLink to="/travel#routes" class="text-sm text-stellar-warm/60 hover:text-stellar-warm transition-colors">
            返回路线列表
          </NuxtLink>

          <NuxtLink
            v-if="nextRoute"
            :to="'/travel-route-' + nextRoute"
            class="flex items-center gap-2 text-sm text-stellar-warm/60 hover:text-stellar-warm transition-colors group"
          >
            <span class="hidden sm:inline">下一条路线</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </NuxtLink>
          <span v-else class="text-sm text-hologram-ice/10">没有更多路线</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { routes } from '@/data/travel-routes'

const routeId = computed(() => {
  const id = useRoute().params.id
  return parseInt(id)
})

const route = computed(() => {
  const idx = routeId.value
  if (idx >= 1 && idx <= routes.length) {
    return routes[idx - 1]
  }
  return null
})

const prevRoute = computed(() => {
  const idx = routeId.value
  return idx > 1 ? idx - 1 : null
})

const nextRoute = computed(() => {
  const idx = routeId.value
  return idx < routes.length ? idx + 1 : null
})
</script>
