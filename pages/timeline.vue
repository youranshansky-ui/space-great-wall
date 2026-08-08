<template>
  <div class="page-container">
    <!-- Hero -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-display font-bold text-hologram-ice mb-4">
          时空<span class="text-glow-gold glow-text">编年史</span>
        </h1>
        <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">从公元前369年中山长城始筑，到公元2250年星际文明共同体成立</p>
        <p class="text-xs text-hologram-ice/20 mt-3">守护 · 连接 · 协作 · 开放</p>
      </div>
    </section>

    <!-- 历史纪元 -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-3">
            历史<span class="text-glow-gold glow-text">纪元</span>
          </h2>
          <p class="text-sm text-hologram-ice/30">前369年 — 1987年</p>
        </div>

        <div class="timeline">
          <div
            v-for="(evt, i) in historyEvents"
            :key="i"
            class="timeline-item"
            :class="{ left: i % 2 === 0, right: i % 2 !== 0 }"
          >
            <div class="timeline-card" @click="toggleEvent(evt)">
              <div class="timeline-year">{{ evt.year }}</div>
              <div class="w-2 h-2 rounded-full flex-shrink-0" :class="expanded.has(evt) ? 'bg-stellar-warm shadow-[0_0_8px_rgba(212,168,83,0.5)]' : 'bg-hologram-ice/30'"></div>
              <div class="timeline-content">
                <h3 class="text-lg font-display font-bold text-hologram-ice mb-1.5">{{ evt.title }}</h3>
                <p class="text-sm text-hologram-ice/40 leading-relaxed">{{ evt.event }}</p>
                <Transition name="expand">
                  <div v-if="expanded.has(evt)" class="mt-4 pt-4 border-t border-hologram-ice/[0.06]">
                    <p v-for="(para, pi) in evt.story.split('\n\n').filter(Boolean)" :key="pi" class="text-sm text-hologram-ice/45 leading-relaxed mb-3 last:mb-0">
                      {{ para }}
                    </p>
                  </div>
                </Transition>
                <span class="inline-block mt-3 text-xs tracking-widest text-stellar-warm/40">
                  {{ expanded.has(evt) ? '收起 ▲' : '展开阅读 ▼' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 分隔线 -->
    <div class="max-w-4xl mx-auto px-6 lg:px-8">
      <div class="relative py-8">
        <div class="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-hologram-ice/[0.08] via-stellar-gold/20 to-hologram-ice/[0.08]"></div>
        <div class="relative z-10 flex items-center justify-center">
          <div class="px-6 py-2 rounded-full border border-stellar-gold/20 bg-deep-space-800/80 backdrop-blur-sm">
            <span class="text-xs tracking-[0.3em] text-stellar-warm/60">▼ 星际时代 ▼</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 未来纪元 -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-3">
            未来<span class="text-glow-gold glow-text">纪元</span>
          </h2>
          <p class="text-sm text-hologram-ice/30">2035年 — 2250年</p>
        </div>

        <div class="timeline">
          <div
            v-for="(evt, i) in futureEvents"
            :key="i"
            class="timeline-item"
            :class="{ left: i % 2 === 0, right: i % 2 !== 0 }"
          >
            <div class="timeline-card" @click="toggleEvent(evt)">
              <div class="timeline-year">{{ evt.year }}</div>
              <div class="w-2 h-2 rounded-full flex-shrink-0" :class="expanded.has(evt) ? 'bg-stellar-warm shadow-[0_0_8px_rgba(212,168,83,0.5)]' : 'bg-hologram-ice/30'"></div>
              <div class="timeline-content">
                <h3 class="text-lg font-display font-bold text-hologram-ice mb-1.5">{{ evt.title }}</h3>
                <p class="text-sm text-hologram-ice/40 leading-relaxed">{{ evt.event }}</p>
                <Transition name="expand">
                  <div v-if="expanded.has(evt)" class="mt-4 pt-4 border-t border-hologram-ice/[0.06]">
                    <p v-for="(para, pi) in evt.story.split('\n\n').filter(Boolean)" :key="pi" class="text-sm text-hologram-ice/45 leading-relaxed mb-3 last:mb-0">
                      {{ para }}
                    </p>
                  </div>
                </Transition>
                <span class="inline-block mt-3 text-xs tracking-widest text-stellar-warm/40">
                  {{ expanded.has(evt) ? '收起 ▲' : '展开阅读 ▼' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部附录 -->
    <section class="py-20">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <div class="rounded-2xl border border-hologram-ice/[0.06] bg-deep-space-800/40 backdrop-blur-sm p-8">
          <h3 class="text-lg font-display font-bold text-hologram-ice mb-5 text-center">虚构设定说明</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div class="flex gap-2">
              <span class="text-hologram-ice/25 flex-shrink-0">月球总活动人口</span>
              <span class="text-hologram-ice/50">六千三百万</span>
            </div>
            <div class="flex gap-2">
              <span class="text-hologram-ice/25 flex-shrink-0">新河北省居民</span>
              <span class="text-hologram-ice/50">二千五百万</span>
            </div>
            <div class="flex gap-2">
              <span class="text-hologram-ice/25 flex-shrink-0">外星常住与游客</span>
              <span class="text-hologram-ice/50">八十五万</span>
            </div>
            <div class="flex gap-2">
              <span class="text-hologram-ice/25 flex-shrink-0">城市数量</span>
              <span class="text-hologram-ice/50">十一座（含新山海关特别关城）</span>
            </div>
            <div class="flex gap-2">
              <span class="text-hologram-ice/25 flex-shrink-0">结算单位</span>
              <span class="text-hologram-ice/50">星币（清洁能源·运输时间·公共信用）</span>
            </div>
            <div class="flex gap-2">
              <span class="text-hologram-ice/25 flex-shrink-0">翻译系统</span>
              <span class="text-hologram-ice/50">共语场（不读取思想）</span>
            </div>
          </div>
        </div>

        <p class="text-center text-xs text-hologram-ice/20 mt-10 italic">
          "旧长城守护记忆，新长城守护生命。" — 月球新河北新春信标语
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { timelineEvents } from '~/data/timeline'

const expanded = reactive(new Set())

const historyEvents = computed(() => timelineEvents.filter(e => e.category === 'history'))
const futureEvents = computed(() => timelineEvents.filter(e => e.category === 'future'))

function toggleEvent(evt) {
  if (expanded.has(evt)) {
    expanded.delete(evt)
  } else {
    expanded.add(evt)
  }
}
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 0;
}

/* Center line on desktop */
@media (min-width: 768px) {
  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(136,204,221,0.08) 10%, rgba(136,204,221,0.08) 90%, transparent);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
  display: flex;
}

@media (min-width: 768px) {
  .timeline-item.left {
    justify-content: flex-start;
    padding-right: calc(50% + 28px);
  }
  .timeline-item.right {
    justify-content: flex-end;
    padding-left: calc(50% + 28px);
    text-align: left;
  }
}

.timeline-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 18px 20px;
  border: 1px solid rgba(136,204,221,0.06);
  border-radius: 16px;
  background: rgba(10,18,46,0.5);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.35s ease;
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
.timeline-card:hover {
  border-color: rgba(212,168,83,0.2);
  background: rgba(10,18,46,0.7);
}

.timeline-year {
  font-family: 'Space Mono', 'Courier New', monospace;
  font-size: 20px;
  font-weight: 700;
  color: rgba(212,168,83,0.7);
  white-space: nowrap;
  min-width: 80px;
  text-align: right;
  line-height: 1.3;
}

.timeline-content {
  flex: 1;
  min-width: 0;
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.35s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
  border-top-width: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 2000px;
}

/* Mobile tweaks */
@media (max-width: 767px) {
  .timeline-year {
    font-size: 16px;
    min-width: 60px;
  }
  .timeline-card {
    padding: 14px 16px;
    gap: 10px;
  }
}
</style>
