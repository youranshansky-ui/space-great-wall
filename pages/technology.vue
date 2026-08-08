<template>
  <div class="page-container">
    <PageHero title="守护月球的科技长城" subtitle="六大核心技术，支撑月球基地的生存与发展" />

    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="tech in technologies"
            :key="tech.id"
            :to="`/technology-detail-${tech.id}`"
            class="tech-card group relative rounded-2xl border border-hologram-ice/[0.06] bg-deep-space-800/60 backdrop-blur-sm p-6 transition-all duration-500 hover:border-stellar-gold/20"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-stellar-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 flex flex-col h-full">
              <!-- Card header -->
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl bg-white/[0.03] border border-hologram-ice/[0.08] flex items-center justify-center text-2xl flex-shrink-0">
                  {{ tech.icon }}
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-mono text-stellar-warm/50 tracking-widest">NO.{{ tech.id }}</span>
                    <span class="text-[10px] text-hologram-ice/20">{{ tech.city }}</span>
                  </div>
                  <h3 class="text-lg font-display font-bold text-hologram-ice group-hover:text-stellar-warm transition-colors">
                    {{ tech.title }}
                  </h3>
                  <p class="text-xs text-hologram-ice/35 mt-1.5 leading-relaxed">{{ tech.subtitle }}</p>
                </div>
              </div>

              <!-- Stats grid -->
              <div class="grid grid-cols-2 gap-2 mb-5">
                <div v-for="stat in tech.stats" :key="stat.label" class="rounded-lg bg-white/[0.02] border border-hologram-ice/[0.04] px-3 py-2">
                  <div class="text-[10px] text-hologram-ice/25 mb-0.5">{{ stat.label }}</div>
                  <div class="text-xs font-semibold text-hologram-ice/55">{{ stat.value }}</div>
                </div>
              </div>

              <!-- Bottom-right link -->
              <div class="flex justify-end mt-auto">
                <span class="inline-flex items-center gap-1.5 text-xs tracking-widest text-stellar-warm/40 group-hover:text-stellar-warm transition-colors">
                  了解详情 →
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 底部引用 -->
    <section class="pb-20">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-hologram-ice/[0.08] to-transparent mx-auto mb-6"></div>
        <p class="text-sm text-hologram-ice/20 italic leading-relaxed">
          "技术不是冷的。每一行代码、每一块月壤砖、每一颗螺丝钉的背后，都是想让人类在月球上活下去的人。"
        </p>
        <p class="text-xs text-hologram-ice/15 mt-2">—— 总系统工程师 罗知微</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { technologies } from '~/data/technologies'
</script>
