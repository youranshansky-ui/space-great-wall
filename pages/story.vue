<template>
  <div class="page-container">
    <!-- ===== 地月纪元的序章 ===== -->
    <section id="prologue" class="py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-4">
            地月纪元的<span class="text-glow-gold glow-text">序章</span>
          </h2>
          <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">从地球长城的第一块城砖，到比邻星的第一次回声</p>
        </div>

        <!-- 五章横幅卡片 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NuxtLink
            v-for="ch in chapters"
            :key="ch.id"
            :to="`/story-chapter-${ch.id}`"
            class="group relative rounded-2xl holo-border overflow-hidden transition-all duration-500 hover:border-stellar-gold/30 hover:shadow-[0_0_40px_rgba(212,168,83,0.1)]"
            style="background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(212,168,83,0.05) 100%);"
          >
            <!-- 序号角标 -->
            <div class="absolute top-5 right-5 text-5xl lg:text-6xl font-display font-black text-white/[0.03] select-none">{{ String(ch.id).padStart(2, '0') }}</div>
            <div class="relative p-8 lg:p-10">
              <span class="block mb-3 text-lg font-semibold tracking-widest text-stellar-warm/70">第{{ ['一','二','三','四','五'][ch.id - 1] }}章</span>
              <h3 class="text-xl lg:text-2xl font-display font-bold text-hologram-ice mb-4 group-hover:text-stellar-warm transition-colors duration-300">
                {{ ch.title }}
              </h3>
              <p class="text-sm text-hologram-ice/35 leading-relaxed line-clamp-3">{{ ch.tagline }}</p>
              <!-- 悬停指示 -->
              <div class="mt-6 flex items-center gap-2 text-xs text-stellar-gold/0 group-hover:text-stellar-gold/40 transition-all duration-300">
                <span>阅读全文</span>
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== 星际文明的联合 ===== -->
    <section id="alliance" class="py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-4">
            星际文明的<span class="text-glow-gold glow-text">联合</span>
          </h2>
          <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">从十座月球城市到多星球命运共同体</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink
            v-for="ch in allianceChapters"
            :key="ch.id"
            :to="`/alliance-chapter-${ch.id}`"
            class="block group relative rounded-2xl border border-hologram-ice/[0.06] bg-deep-space-800/60 backdrop-blur-sm p-8 hover:border-stellar-gold/30 transition-all duration-500"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-stellar-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <span class="block mb-3 text-lg font-semibold tracking-widest text-stellar-warm/70">第{{ ['一','二','三','四','五'][ch.id - 1] }}章</span>
              <h3 class="text-xl lg:text-2xl font-display font-bold text-hologram-ice mb-4 group-hover:text-stellar-warm transition-colors">
                {{ ch.title }}
              </h3>
              <p class="text-sm text-hologram-ice/40 leading-relaxed line-clamp-3">{{ ch.tagline }}</p>
              <span class="inline-block mt-6 text-xs tracking-widest text-stellar-warm/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">阅读全文 →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { chapters, allianceChapters } from '~/data/chapters'
</script>
