<template>
  <div class="page-container">
    <PageHero title="旅游研学" subtitle="五条热门路线 · 报名参团 · 月球城市深度探索" />

    <!-- ===== 五条热门路线 ===== -->
    <section id="routes" class="py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-4">
            五条热门<span class="text-glow-gold glow-text">路线</span>
          </h2>
          <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">从地月航线到月球城市群，精心设计的五条深度研学路线</p>
        </div>

        <div class="space-y-6">
          <NuxtLink
            v-for="(route, i) in routes" :key="i"
            :to="'/travel-route-' + (i + 1)"
            class="block rounded-2xl border border-hologram-ice/[0.06] bg-deep-space-800/40 p-6 md:p-8 hover:border-stellar-gold/20 hover:bg-deep-space-800/60 transition-all duration-500 group cursor-pointer"
          >
            <div class="flex flex-col md:flex-row md:items-start gap-6">
              <div class="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-stellar-gold/15 to-stellar-gold/5 border border-stellar-gold/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {{ route.icon }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3 flex-wrap">
                  <span class="text-xs font-mono text-stellar-warm/50 tracking-widest">{{ route.id }}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-stellar-gold/10 border border-stellar-gold/10 text-stellar-warm/60">{{ route.duration }}</span>
                  <span class="text-sm font-semibold px-3 py-1 rounded-full" :class="route.levelClass">{{ route.level }}</span>
                </div>
                <h3 class="text-xl font-display font-bold text-hologram-ice mb-3 group-hover:text-stellar-warm transition-colors duration-300">{{ route.title }}</h3>
                <p class="text-sm text-hologram-ice/40 leading-relaxed mb-4">{{ route.desc }}</p>
                <div class="flex items-center gap-5 flex-wrap">
                  <div class="flex items-center gap-1.5 text-sm text-stellar-warm/80">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 8h-4a2 2 0 00-2 2v4a2 2 0 002 2h4"/><line x1="10" y1="12" x2="16" y2="12"/></svg>
                    <span class="font-mono font-semibold">{{ route.budget }}</span>
                    <span class="text-xs text-hologram-ice/25">星币/人</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-sm text-hologram-ice/40">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                    <span>限{{ route.maxPeople }}人/团</span>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2 mt-4">
                  <span v-for="tag in route.tags" :key="tag" class="text-[11px] text-hologram-ice/25 bg-white/[0.02] border border-hologram-ice/[0.05] rounded-full px-3 py-1">{{ tag }}</span>
                </div>
              </div>
              <div class="flex-shrink-0 self-center text-hologram-ice/15 group-hover:text-stellar-warm/50 group-hover:translate-x-1 transition-all duration-300 hidden md:block">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== 报名参团 ===== -->
    <section id="signup" class="py-16">
      <div class="max-w-2xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-4">
            报名<span class="text-glow-gold glow-text">参团</span>
          </h2>
          <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">填写信息，我们的研学顾问将在48小时内与你联系</p>
        </div>

        <div class="rounded-2xl border border-hologram-ice/[0.06] bg-deep-space-800/40 p-8">
          <form class="space-y-5" @submit.prevent>
            <div>
              <label class="block text-sm text-hologram-ice/40 mb-2">姓名</label>
              <input type="text" placeholder="你的名字" class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-3 text-sm text-hologram-ice/80 placeholder-hologram-ice/15 outline-none focus:border-stellar-gold/30 transition-colors" />
            </div>
            <div>
              <label class="block text-sm text-hologram-ice/40 mb-2">联系方式</label>
              <input type="text" placeholder="邮箱或电话号码" class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-3 text-sm text-hologram-ice/80 placeholder-hologram-ice/15 outline-none focus:border-stellar-gold/30 transition-colors" />
            </div>
            <div>
              <label class="block text-sm text-hologram-ice/40 mb-2">意向路线</label>
              <select class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-3 text-sm text-hologram-ice/60 outline-none focus:border-stellar-gold/30 transition-colors appearance-none cursor-pointer">
                <option value="">请选择研学路线</option>
                <option v-for="r in routes" :key="r.id" :value="r.title">{{ r.title }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-hologram-ice/40 mb-2">参团人数</label>
              <input type="number" min="1" max="50" value="1" class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-3 text-sm text-hologram-ice/80 placeholder-hologram-ice/15 outline-none focus:border-stellar-gold/30 transition-colors" />
            </div>
            <div>
              <label class="block text-sm text-hologram-ice/40 mb-2">留言（可选）</label>
              <textarea rows="3" placeholder="如有特殊需求请在此说明" class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-3 text-sm text-hologram-ice/80 placeholder-hologram-ice/15 outline-none focus:border-stellar-gold/30 transition-colors resize-none"></textarea>
            </div>
            <button class="w-full py-3 rounded-xl bg-gradient-to-r from-stellar-gold/25 to-stellar-gold/10 border border-stellar-gold/20 text-stellar-warm text-sm font-medium tracking-wide hover:from-stellar-gold/35 hover:to-stellar-gold/15 transition-all">
              提交报名
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { routes } from '@/data/travel-routes'
</script>
