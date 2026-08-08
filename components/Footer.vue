<template>
  <footer class="relative border-t border-hologram-cyan/5 bg-deep-space-950/70 backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div class="flex items-center gap-3 mb-5">
            <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-stellar-gold/30 to-hologram-cyan/20 border border-stellar-gold/20 flex items-center justify-center">
              <GreatWallLogo class="w-5 h-5 text-stellar-warm" />
            </div>
            <span class="text-base font-semibold text-hologram-ice">太空<span class="text-stellar-warm">长城</span></span>
          </div>
          <p class="text-sm text-hologram-ice/40 leading-relaxed">
            守护 · 连接 · 协作 · 开放<br/>
            从地球到月球，长城从未止步
          </p>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-hologram-ice/60 tracking-widest uppercase mb-5">探索</h4>
          <div class="flex flex-col gap-3">
            <FooterLink to="/story">背景故事</FooterLink>
            <FooterLink to="/technology">核心科技</FooterLink>
            <FooterLink to="/comics">漫画故事</FooterLink>
            <FooterLink to="/aliens">外星人交流</FooterLink>
            <FooterLink to="/hebei">地月河北</FooterLink>
          </div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-hologram-ice/60 tracking-widest uppercase mb-5">联系</h4>
          <div class="flex flex-col gap-3">
            <FooterLink to="/travel">旅游研学</FooterLink>
            <FooterLink to="/shop">太空文创</FooterLink>
            <FooterLink to="/contact">联系我们</FooterLink>
          </div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-hologram-ice/60 tracking-widest uppercase mb-5">基地信息</h4>
          <div class="text-sm text-hologram-ice/40 space-y-2.5">
            <p>月球 · 新河北 · 新唐山市</p>
            <p>太空长城大道1号</p>
            <p class="text-stellar-warm/70">contact@spacegreatwall.org</p>
          </div>
        </div>
      </div>
      <div class="mt-14 pt-8 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-hologram-ice/30">© 2026 新河北太空长城基地. All rights reserved. 同筑长城 共创未来</p>
        <div class="flex gap-6 text-xs text-hologram-ice/30">
          <span>微信公众号</span><span>微博</span><span>Bilibili</span>
        </div>
      </div>
    </div>
  </footer>
</template>
