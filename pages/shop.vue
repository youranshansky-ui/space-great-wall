<template>
  <div class="page-container">
    <PageHero title="太空文创" subtitle="月球基地官方周边 · 收藏来自新河北的星际记忆" />

    <!-- ==================== 商品展示 ==================== -->
    <section id="products" class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle>星际文创饰品</SectionTitle>
        <p class="text-center text-hologram-ice/35 text-sm mb-12 max-w-xl mx-auto">
          致敬太空长城的每一寸砖石，来自新河北的限量收藏品
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <template v-for="item in products" :key="item.name">
            <!-- 太空长城纪念币 / 月球基地徽章套装 - 可点击查看正反面 -->
            <button v-if="item.name === '太空长城纪念币' || item.name === '月球基地徽章套装' || item.name === '太空长城拼图'" class="holo-panel overflow-hidden group text-left w-full transition-all duration-300 hover:border-stellar-gold/20"
              @click="openGallery(item)">
              <div class="aspect-[4/3] bg-deep-space-800 relative overflow-hidden">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" @error="hideImg" />
                <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/70 via-transparent to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <span class="tag text-[10px]"><span class="tag-dot"></span>{{ item.category }}</span>
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-sm font-display font-bold text-hologram-ice mb-1">{{ item.name }}</h3>
                <p class="text-[11px] text-hologram-ice/35 leading-relaxed">{{ item.desc }}</p>
                <div class="flex items-center justify-between mt-3">
                  <span class="flex items-center gap-1">
                    <span class="text-sm text-stellar-gold/80 font-mono">{{ item.price }}</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="flex-shrink-0"><circle cx="8" cy="8" r="6.5" stroke="#d4a853" stroke-width="1.2"/><polygon points="8,2.5 9.5,6 13.5,6.5 10.5,9 11.5,13 8,10.8 4.5,13 5.5,9 2.5,6.5 6.5,6" fill="#d4a853" opacity="0.85"/></svg>
                  </span>
                  <span class="text-xs text-stellar-warm/70">点击查看</span>
                </div>
              </div>
            </button>

            <!-- 其他商品 -->
            <div v-else class="holo-panel overflow-hidden group">
              <div class="aspect-[4/3] bg-deep-space-800 relative overflow-hidden">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" @error="hideImg" />
                <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/70 via-transparent to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <span class="tag text-[10px]"><span class="tag-dot"></span>{{ item.category }}</span>
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-sm font-display font-bold text-hologram-ice mb-1">{{ item.name }}</h3>
                <p class="text-[11px] text-hologram-ice/35 leading-relaxed">{{ item.desc }}</p>
                <div class="flex items-center justify-between mt-3">
                  <span class="text-stellar-warm text-sm font-mono">{{ item.price }}</span>
                  <span class="text-[10px] text-hologram-ice/25">{{ item.stock }}</span>
                </div>
              </div>
            </div>
          </template>

          <!-- 查看材质及设计故事 -->
          <button class="holo-panel overflow-hidden group text-left w-full transition-all duration-300 hover:border-stellar-gold/20"
            @click="materialOpen = true">
            <div class="aspect-[4/3] bg-deep-space-800/50 relative overflow-hidden flex items-center justify-center">
              <div class="text-center">
                <svg width="40" height="40" fill="none" stroke="rgba(212,168,83,0.5)" stroke-width="1" viewBox="0 0 48 48" class="mx-auto mb-3 group-hover:scale-110 transition-transform duration-500">
                  <rect x="6" y="8" width="36" height="32" rx="3"/>
                  <path d="M6 20h36" stroke-linejoin="round"/>
                  <circle cx="16" cy="14" r="2" fill="rgba(212,168,83,0.3)"/>
                  <path d="M16 30l8-6 4 3 8-6" stroke-linejoin="round"/>
                </svg>
                <p class="text-sm text-hologram-ice/40 group-hover:text-stellar-warm/70 transition-colors">了解产品材质与背后的设计故事</p>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/85 via-deep-space-950/10 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <h3 class="text-lg font-display font-bold text-stellar-warm mb-1">查看材质及设计故事</h3>
                <p class="text-xs text-stellar-warm/70">点击查看</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <hr class="section-divider" />

    <!-- ==================== 3D 预览 ==================== -->
    <section id="preview" class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle>太空长城潮玩手办</SectionTitle>
        <p class="text-center text-hologram-ice/35 text-sm mb-12 max-w-xl mx-auto">
          旋转查看模型细节 · 点击进入全屏预览
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- 太空战士 -->
          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/20"
            @click="openViewer('太空战士', '/taikong shouban.glb')">
            <div class="aspect-[4/3] bg-deep-space-800 relative overflow-hidden">
              <img src="/images/zhanshi0.png" alt="太空战士" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" @error="hideImg" />
              <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/85 via-deep-space-950/10 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <h3 class="text-lg font-display font-bold text-stellar-warm mb-1 flex items-center gap-1.5">
                  太空战士
                  <span class="text-sm text-stellar-gold/80 font-mono">300</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="flex-shrink-0"><circle cx="8" cy="8" r="6.5" stroke="#d4a853" stroke-width="1.2"/><polygon points="8,2.5 9.5,6 13.5,6.5 10.5,9 11.5,13 8,10.8 4.5,13 5.5,9 2.5,6.5 6.5,6" fill="#d4a853" opacity="0.85"/></svg>
                </h3>
                <p class="text-xs text-stellar-warm/70">点击查看</p>
              </div>
            </div>
          </button>

          <!-- 阿澜 -->
          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/20"
            @click="openViewer('阿澜', '/alien.glb')">
            <div class="aspect-[4/3] bg-deep-space-800 relative overflow-hidden">
              <img src="/images/alan0.png" alt="阿澜" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" @error="hideImg" />
              <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/85 via-deep-space-950/10 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <h3 class="text-lg font-display font-bold text-stellar-warm mb-1 flex items-center gap-1.5">
                  阿澜
                  <span class="text-sm text-stellar-gold/80 font-mono">269</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="flex-shrink-0"><circle cx="8" cy="8" r="6.5" stroke="#d4a853" stroke-width="1.2"/><polygon points="8,2.5 9.5,6 13.5,6.5 10.5,9 11.5,13 8,10.8 4.5,13 5.5,9 2.5,6.5 6.5,6" fill="#d4a853" opacity="0.85"/></svg>
                </h3>
                <p class="text-xs text-stellar-warm/70">点击查看</p>
              </div>
            </div>
          </button>

          <!-- 太空敌楼 -->
          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/20"
            @click="openViewer('太空敌楼', '/dilou.glb')">
            <div class="aspect-[4/3] bg-deep-space-800 relative overflow-hidden">
              <img src="/images/dilou0.png" alt="太空敌楼" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" @error="hideImg" />
              <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/85 via-deep-space-950/10 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <h3 class="text-lg font-display font-bold text-stellar-warm mb-1 flex items-center gap-1.5">
                  太空敌楼
                  <span class="text-sm text-stellar-gold/80 font-mono">499</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="flex-shrink-0"><circle cx="8" cy="8" r="6.5" stroke="#d4a853" stroke-width="1.2"/><polygon points="8,2.5 9.5,6 13.5,6.5 10.5,9 11.5,13 8,10.8 4.5,13 5.5,9 2.5,6.5 6.5,6" fill="#d4a853" opacity="0.85"/></svg>
                </h3>
                <p class="text-xs text-stellar-warm/70">点击查看</p>
              </div>
            </div>
          </button>

          <!-- 查看建模设定 -->
          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/20"
            @click="loreOpen = true">
            <div class="aspect-[4/3] bg-deep-space-800/50 relative overflow-hidden flex items-center justify-center">
              <div class="text-center">
                <svg width="40" height="40" fill="none" stroke="rgba(212,168,83,0.5)" stroke-width="1" viewBox="0 0 48 48" class="mx-auto mb-3 group-hover:scale-110 transition-transform duration-500">
                  <circle cx="24" cy="24" r="20"/>
                  <path d="M24 10v28M10 24h28" stroke-linejoin="round"/>
                  <path d="M16 16l8 8 8-8M16 32l8-8 8 8" stroke-linejoin="round" opacity="0.5"/>
                </svg>
                <p class="text-sm text-hologram-ice/40 group-hover:text-stellar-warm/70 transition-colors">了解每个模型背后的故事与设定</p>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/85 via-deep-space-950/10 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <h3 class="text-lg font-display font-bold text-stellar-warm mb-1">查看建模设定</h3>
                <p class="text-xs text-stellar-warm/70">点击查看</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- ==================== 3D Viewer Modal ==================== -->
    <Teleport to="body">
      <div v-if="viewerOpen" class="fixed inset-0 z-[10010] bg-black/95 backdrop-blur-sm"
        @click.self="closeViewer" @keydown.escape="closeViewer">
        <!-- Close -->
        <button class="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.15] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          @click="closeViewer">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <!-- Model viewer -->
        <div class="w-full h-full flex flex-col items-center justify-center px-6 pt-14 pb-20">
          <ClientOnly>
            <div class="w-full max-w-3xl aspect-[4/3] rounded-xl overflow-hidden">
              <ModelViewer :src="viewerSrc" :key="viewerSrc" />
            </div>
            <template #fallback>
              <div class="w-full max-w-3xl aspect-[4/3] bg-deep-space-900 rounded-xl flex items-center justify-center">
                <div class="flex flex-col items-center gap-3">
                  <div class="w-8 h-8 border-2 border-hologram-ice/30 border-t-stellar-warm rounded-full animate-spin"></div>
                  <span class="text-sm text-hologram-ice/30">加载 3D 查看器...</span>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>

        <!-- Bottom info -->
        <div class="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center gap-3 px-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <span class="text-sm text-hologram-ice/50">{{ viewerName }}</span>
          <span class="text-[10px] text-hologram-ice/25 font-mono">·</span>
          <span class="text-xs text-stellar-warm/50">按住鼠标左键旋转查看</span>
        </div>
      </div>
    </Teleport>

    <!-- ==================== 建模设定 - 角色选择弹窗 ==================== -->
    <Teleport to="body">
      <div v-if="loreOpen" class="fixed inset-0 z-[10020] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
        @click.self="loreOpen = false" @keydown.escape="loreOpen = false">
        <button class="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.15] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          @click="loreOpen = false">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="max-w-2xl w-full flex flex-col gap-6">
          <h2 class="text-2xl font-display font-bold text-hologram-ice text-center mb-2">选择角色</h2>

          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/25 w-full"
            @click="openLoreDetail('太空战士')">
            <div class="flex items-center gap-6 p-6">
              <div class="w-20 h-20 rounded-xl bg-deep-space-800 overflow-hidden flex-shrink-0">
                <img src="/images/zhanshi0.png" alt="太空战士" class="w-full h-full object-cover" @error="hideImg" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-display font-bold text-stellar-warm mb-1">太空战士</h3>
                <p class="text-sm text-hologram-ice/40">月球基地的首批守卫者，代号"玄武-7"</p>
              </div>
              <svg width="20" height="20" fill="none" stroke="rgba(136,204,221,0.4)" stroke-width="1.5" viewBox="0 0 24 24" class="flex-shrink-0 group-hover:translate-x-1 transition-transform"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </button>

          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/25 w-full"
            @click="openLoreDetail('阿澜')">
            <div class="flex items-center gap-6 p-6">
              <div class="w-20 h-20 rounded-xl bg-deep-space-800 overflow-hidden flex-shrink-0">
                <img src="/images/alan0.png" alt="阿澜" class="w-full h-full object-cover" @error="hideImg" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-display font-bold text-stellar-warm mb-1">阿澜</h3>
                <p class="text-sm text-hologram-ice/40">来自鲸鱼座T星的外星小朋友</p>
              </div>
              <svg width="20" height="20" fill="none" stroke="rgba(136,204,221,0.4)" stroke-width="1.5" viewBox="0 0 24 24" class="flex-shrink-0 group-hover:translate-x-1 transition-transform"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </button>

          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/25 w-full"
            @click="openLoreDetail('太空敌楼')">
            <div class="flex items-center gap-6 p-6">
              <div class="w-20 h-20 rounded-xl bg-deep-space-800 overflow-hidden flex-shrink-0">
                <img src="/images/dilou0.png" alt="太空敌楼" class="w-full h-full object-cover" @error="hideImg" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-display font-bold text-stellar-warm mb-1">太空敌楼</h3>
                <p class="text-sm text-hologram-ice/40">月球新河北防御体系的核心节点</p>
              </div>
              <svg width="20" height="20" fill="none" stroke="rgba(136,204,221,0.4)" stroke-width="1.5" viewBox="0 0 24 24" class="flex-shrink-0 group-hover:translate-x-1 transition-transform"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </button>
        </div>
      </div>
    </Teleport>

    <!-- ==================== 建模设定 - 详情弹窗 ==================== -->
    <Teleport to="body">
      <div v-if="loreDetailOpen" class="fixed inset-0 z-[10030] bg-black/95 backdrop-blur-sm overflow-y-auto"
        @click.self="loreDetailOpen = false" @keydown.escape="loreDetailOpen = false">
        <button class="fixed top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.15] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          @click="loreDetailOpen = false">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="max-w-3xl mx-auto px-6 py-20">
          <div class="holo-panel p-8 lg:p-12">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-16 h-16 rounded-xl bg-deep-space-800 overflow-hidden flex-shrink-0">
                <img :src="loreDetail.image" :alt="loreDetail.name" class="w-full h-full object-cover" @error="hideImg" />
              </div>
              <div>
                <h2 class="text-2xl lg:text-3xl font-display font-bold text-stellar-warm mb-1">{{ loreDetail.name }}</h2>
                <p class="text-sm text-hologram-ice/40">{{ loreDetail.subtitle }}</p>
              </div>
            </div>

            <div class="prose prose-invert max-w-none">
              <p class="text-hologram-ice/60 leading-relaxed whitespace-pre-line">{{ loreDetail.content }}</p>
            </div>

            <div class="mt-8 pt-6 border-t border-white/[0.06]">
              <button class="text-sm text-stellar-warm/60 hover:text-stellar-warm/70 transition-colors flex items-center gap-1"
                @click="loreDetailOpen = false; loreOpen = true">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                返回角色列表
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ==================== 产品图片查看器（纪念币/徽章正反面） ==================== -->
    <Teleport to="body">
      <div v-if="galleryOpen" class="fixed inset-0 z-[10025] bg-black/95 backdrop-blur-sm"
        @click.self="galleryOpen = false" @keydown="onGalleryKey">
        <button class="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.15] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          @click="galleryOpen = false">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="w-full h-full flex items-center justify-center px-24 pt-12 pb-14">
          <img :src="galleryImages[galleryIndex]" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        </div>

        <button v-if="galleryIndex > 0" class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.12] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.25] transition-all z-20"
          @click="galleryIndex--">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button v-if="galleryIndex < galleryImages.length - 1" class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.12] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.25] transition-all z-20"
          @click="galleryIndex++">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div class="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center gap-3 px-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <span class="text-sm text-hologram-ice/50">{{ galleryIndex === 0 ? '正面' : '背面' }}</span>
          <span class="text-[10px] text-hologram-ice/25 font-mono">·</span>
          <span class="text-sm text-hologram-ice/50">{{ galleryIndex + 1 }} / {{ galleryImages.length }}</span>
          <span class="text-[10px] text-hologram-ice/25 font-mono">·</span>
          <span class="text-xs text-stellar-warm/50">{{ galleryName }}</span>
        </div>
      </div>
    </Teleport>

    <!-- ==================== 材质及设计故事 - 产品选择弹窗 ==================== -->
    <Teleport to="body">
      <div v-if="materialOpen" class="fixed inset-0 z-[10025] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
        @click.self="materialOpen = false" @keydown.escape="materialOpen = false">
        <button class="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.15] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          @click="materialOpen = false">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="max-w-2xl w-full flex flex-col gap-6">
          <h2 class="text-2xl font-display font-bold text-hologram-ice text-center mb-2">材质及设计故事</h2>

          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/25 w-full"
            @click="openMaterialDetail('太空长城纪念币')">
            <div class="flex items-center gap-6 p-6">
              <div class="w-20 h-20 rounded-xl bg-deep-space-800 overflow-hidden flex-shrink-0">
                <img src="/images/纪念币正面.jpg" alt="纪念币" class="w-full h-full object-cover" @error="hideImg" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-display font-bold text-stellar-warm mb-1">太空长城纪念币</h3>
                <p class="text-sm text-hologram-ice/40">Kepler-442b行星特殊材料 · 重料精工</p>
              </div>
              <svg width="20" height="20" fill="none" stroke="rgba(136,204,221,0.4)" stroke-width="1.5" viewBox="0 0 24 24" class="flex-shrink-0 group-hover:translate-x-1 transition-transform"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </button>

          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/25 w-full"
            @click="openMaterialDetail('月球基地徽章套装')">
            <div class="flex items-center gap-6 p-6">
              <div class="w-20 h-20 rounded-xl bg-deep-space-800 overflow-hidden flex-shrink-0">
                <img src="/images/徽章正面.jpg" alt="徽章" class="w-full h-full object-cover" @error="hideImg" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-display font-bold text-stellar-warm mb-1">月球基地徽章套装</h3>
                <p class="text-sm text-hologram-ice/40">地球钢材 · 中国红与金色完美结合</p>
              </div>
              <svg width="20" height="20" fill="none" stroke="rgba(136,204,221,0.4)" stroke-width="1.5" viewBox="0 0 24 24" class="flex-shrink-0 group-hover:translate-x-1 transition-transform"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </button>

          <button class="holo-panel overflow-hidden group text-left transition-all duration-300 hover:border-stellar-gold/25 w-full"
            @click="openMaterialDetail('太空长城拼图')">
            <div class="flex items-center gap-6 p-6">
              <div class="w-20 h-20 rounded-xl bg-deep-space-800 overflow-hidden flex-shrink-0">
                <img src="/images/拼图1.jpg" alt="拼图" class="w-full h-full object-cover" @error="hideImg" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-display font-bold text-stellar-warm mb-1">太空长城拼图</h3>
                <p class="text-sm text-hologram-ice/40">500片高清拼图 · 地球各国共建新唐山</p>
              </div>
              <svg width="20" height="20" fill="none" stroke="rgba(136,204,221,0.4)" stroke-width="1.5" viewBox="0 0 24 24" class="flex-shrink-0 group-hover:translate-x-1 transition-transform"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </button>
        </div>
      </div>
    </Teleport>

    <!-- ==================== 材质及设计故事 - 详情弹窗 ==================== -->
    <Teleport to="body">
      <div v-if="materialDetailOpen" class="fixed inset-0 z-[10035] bg-black/95 backdrop-blur-sm overflow-y-auto"
        @click.self="materialDetailOpen = false" @keydown.escape="materialDetailOpen = false">
        <button class="fixed top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.15] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          @click="materialDetailOpen = false">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="max-w-3xl mx-auto px-6 py-20">
          <div class="holo-panel p-8 lg:p-12">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-16 h-16 rounded-xl bg-deep-space-800 overflow-hidden flex-shrink-0">
                <img :src="materialDetail.image" :alt="materialDetail.name" class="w-full h-full object-cover" @error="hideImg" />
              </div>
              <div>
                <h2 class="text-2xl lg:text-3xl font-display font-bold text-stellar-warm mb-1">{{ materialDetail.name }}</h2>
                <p class="text-sm text-hologram-ice/40">材质及设计故事</p>
              </div>
            </div>

            <div class="prose prose-invert max-w-none">
              <p class="text-hologram-ice/60 leading-relaxed whitespace-pre-line">{{ materialDetail.content }}</p>
            </div>

            <div class="mt-8 pt-6 border-t border-white/[0.06]">
              <button class="text-sm text-stellar-warm/60 hover:text-stellar-warm/70 transition-colors flex items-center gap-1"
                @click="materialDetailOpen = false; materialOpen = true">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                返回产品列表
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const viewerOpen = ref(false)
const viewerName = ref('')
const viewerSrc = ref('')

// 产品图片查看器（纪念币/徽章）
const galleryOpen = ref(false)
const galleryIndex = ref(0)
const galleryImages = ref([])
const galleryName = ref('')

const galleryData = {
  '太空长城纪念币': ['/images/纪念币正面.jpg', '/images/纪念币背面.jpg'],
  '月球基地徽章套装': ['/images/徽章正面.jpg', '/images/徽章背面.jpg'],
  '太空长城拼图': ['/images/拼图1.jpg', '/images/拼图2.jpg'],
}

function openGallery(item) {
  galleryName.value = item.name
  galleryImages.value = galleryData[item.name] || []
  galleryIndex.value = 0
  galleryOpen.value = true
}

function onGalleryKey(e) {
  if (e.key === 'ArrowLeft' && galleryIndex.value > 0) galleryIndex.value--
  else if (e.key === 'ArrowRight' && galleryIndex.value < galleryImages.value.length - 1) galleryIndex.value++
  else if (e.key === 'Escape') galleryOpen.value = false
}

// 材质及设计故事
const materialOpen = ref(false)
const materialDetailOpen = ref(false)

const materialData = {
  '太空长城纪念币': {
    name: '太空长城纪念币',
    image: '/images/纪念币正面.jpg',
    content: `这枚纪念币是为庆祝星际文明共同体成立20周年而特别铸造的限量藏品。其材质并非源自地球或月球，而是来自距离地球约1200光年的Kepler-442b行星——一颗被证实存在液态水和大气层的超级地球。该行星表面的"星辉矿"富含一种名为"Luxite"的稀有金属，在光线照射下会呈现从银白到淡紫的渐变光泽。

纪念币的正面以激光微雕技术刻画了太空长城敌楼的内部结构图——从量子雷达阵列到穹顶锚点枢纽，每一层功能区都纤毫毕现。背景是月球表面的环形山与地月航线星图，象征着人类从地球走向深空的伟大征程。边缘蚀刻着中、英及Kepler-186f行星原生文字三种语言的"星际文明共同体"字样。

背面则是壮丽的仙女座星系景象，以多层套色浮雕工艺呈现，每一颗恒星的位置都经过天文数据校准，既是艺术品，也是科普教具。纪念币边缘镶嵌了一圈由Kepler-442b陨石尘埃烧制的微型陶瓷珠，触感温润如古玉。整体直径40毫米，厚度3.5毫米，是一件连接三个星系的文明信物。`
  },
  '月球基地徽章套装': {
    name: '月球基地徽章套装',
    image: '/images/徽章正面.jpg',
    content: `月球基地徽章套装选用了来自中国河北省的优质钢材——这种钢材同样被用于建造真实的地月运输飞船结构件，因此每一枚徽章都与太空工程血脉相连。钢材经过真空淬火与纳米镀层处理后，表面硬度达到莫氏8.5级，可抵御月表极端温差和微陨石冲击。

徽章的色彩设计致敬了中华人民共和国国旗的配色方案。主体采用了高温烧制的中国红珐琅，经过七次分层填釉、每次800摄氏度高温定色，呈现出深邃而热烈的红色。金色部分为24K镀金工艺，以激光蚀刻出月球车与长城敌楼并肩而立的经典画面——左侧是2090年代服役的"玉兔-9"型月球运输车，右侧则是明代河北长城的标志性敌楼。

每套包含六枚徽章，分别对应月球新河北的六座城市：新唐山、新秦皇岛、新承德、新张家口、新保定和新邯郸。背面采用磁吸式快拆结构，无需针扣即可牢固吸附在宇航服外挂标准接口上。外包装盒由回收的航天级铝合金铣削而成，内衬为月壤陶瓷纤维织物，可直接作为展示架使用。`
  },
  '太空长城拼图': {
    name: '太空长城拼图',
    image: '/images/拼图1.jpg',
    content: `太空长城拼图以500片精密模切的环保纸板组成，纸张选用了通过FSC森林认证的可持续木浆，表面覆以哑光防眩涂层，即使在穹顶基地的强光环境下也能舒适拼玩。印刷采用了航天级大豆油墨，无毒无味，通过了月球居住区空气质量标准认证。

画面的核心场景是2225年新唐山市第三次扩建工程的施工现场。来自中国、俄罗斯、巴西、南非、法国、印度、阿联酋等五十余国的工程师与建筑工人齐心协力，在月球低重力环境下铺设穹顶基座。画面中央，一面巨大的五星红旗与联合国旗帜并列飘扬，背景是蔚蓝色的地球从月平线上升起，星辰如钻石般镶嵌在深空之中。

特别值得一提的是，画面右下角描绘了一位年仅8岁的中国小女孩，她手握一支画笔，蹲在月壤上画下了一个小小的长城敌楼——这致敬了"阿澜的月球日记"漫画中的经典一幕。整幅画面传递出人类命运共同体的温暖理念，也呼应了太空长城"守护、连接、协作、开放"的核心精神。拼图完成尺寸为70厘米×50厘米，随附一张编号收藏卡和管装拼图胶。`
  }
}

const materialDetail = reactive({
  name: '',
  image: '',
  content: ''
})

function openMaterialDetail(name) {
  const data = materialData[name]
  if (!data) return
  materialDetail.name = data.name
  materialDetail.image = data.image
  materialDetail.content = data.content
  materialDetailOpen.value = true
}

function openViewer(name, src) {
  viewerName.value = name
  viewerSrc.value = src
  viewerOpen.value = true
}

function closeViewer() {
  viewerOpen.value = false
}

function hideImg(e) {
  e.target.style.display = 'none'
}

// 建模设定
const loreOpen = ref(false)
const loreDetailOpen = ref(false)
const activeLore = ref('')

const loreData = {
  '太空战士': {
    name: '太空战士',
    subtitle: '月球基地的首批守卫者，代号"玄武-7"',
    image: '/images/zhanshi0.png',
    content: `太空战士是月球新河北基地的首批守卫者，代号"玄武-7"。他出生于2098年的新唐山市，父母都是月球基地的早期建设者。在月球低重力环境下成长的他，拥有远超地球人的敏捷身手和空间感知能力。

2105年，年仅7岁的他在一次基地陨石防御演练中，凭借惊人的反应速度手动校准了偏移的拦截炮台，成功阻止了一场可能造成穹顶破裂的灾难。从此，他被破格选入"太空长城守卫者"计划，接受了长达十年的特种训练。

如今的太空战士身着银灰相间的轻量化太空装甲，背部装备了微型离子推进器，可在月表进行短距离飞行。他的标志性武器是一柄由月球钛矿锻造的长刀，刀身铭刻着长城敌楼的轮廓，在月球微光下泛着冷冽的银芒。

他精通月面低重力格斗术和陨石轨道计算，被队员们称为"行走的防御系统"。在基地孩子们心中，他是比任何超级英雄都更真实的偶像。他常说的一句话是："长城守了地球两千年，现在轮到我们守长城了。"`
  },
  '阿澜': {
    name: '阿澜',
    subtitle: '来自鲸鱼座T星的外星小朋友',
    image: '/images/alan0.png',
    content: `阿澜是一个来自鲸鱼座T星的外星小朋友，全名叫"阿澜·星语"。2187年，她随父母的外交使团来到月球新河北基地，成为第一批在地月系定居的外星幼童。

阿澜的皮肤呈淡蓝紫色，会随着情绪变化而闪烁微光——开心时是温暖的粉紫色，难过时则是深邃的海蓝色。她头顶的触角能感知周围人类的情绪波动，刚到基地时因为语言不通和外形差异，常常独自坐在穹顶花园里望着地球发呆。

后来，新河北国际学校的林老师在研学课上发现了她的绘画天赋——阿澜能用一种地球人从未见过的矿物颜料，画出会随着光线变化而流动的画面。她的第一幅作品《长城与星河》被悬挂在基地中央大厅，画中金色的长城蜿蜒在月球表面，与银河交相辉映，所有看过的人都说"这幅画在呼吸"。

阿澜最爱吃的是新唐山工厂生产的草莓味太空冰淇淋，她说这是"全宇宙最好吃的东西"。如今阿澜已经能用流利的中文和英文交流，她的梦想是长大后当一名星际艺术家，把地球和所有去过的星球都画进同一幅画里。`
  },
  '太空敌楼': {
    name: '太空敌楼',
    subtitle: '月球新河北防御体系的核心节点',
    image: '/images/dilou0.png',
    content: `太空敌楼是新河北太空长城防御体系的核心节点，全称为"长城-2090型多功能太空敌楼"。每一座太空敌楼高约30米，采用钛合金框架与月壤3D打印技术建造，外形致敬明代河北长城的空心敌楼，但内部集成了远超古代想象的尖端科技。

【量子雷达阵列】敌楼顶部装备了六组量子相控阵雷达，可同时追踪三千公里范围内的数千个小天体目标，精度达到厘米级，预警时间比传统雷达提前四十分钟。

【定向能拦截系统】敌楼中层装配了高功率微波发射器与激光拦截模块，能在数秒内汽化直径小于2米的陨石碎片。对于更大目标，系统会发射动能拦截弹进行偏转。

【穹顶锚点枢纽】每座敌楼都是基地生态穹顶的锚定节点，通过磁约束场将穹顶膜材牢牢固定在月表，同时精准调控内部气压、温度与氧气浓度，是六大城市赖以生存的生命之塔。

【量子通讯中继】敌楼之间通过量子纠缠通讯链路互联，地月通讯延迟从此降至接近零。即使一座敌楼被毁，其余节点也能自动重组通讯网络。

【应急避难所】敌楼地下部分设有可容纳500人的辐射避难层，配备独立水循环和空气再生系统，可在无外部补给的情况下维持六个月。六座敌楼均匀分布在月球新河北六大城市周围，构成了人类在月球上最坚固的安全屏障。`
  }
}

const loreDetail = reactive({
  name: '',
  subtitle: '',
  image: '',
  content: ''
})

function openLoreDetail(name) {
  const data = loreData[name]
  if (!data) return
  loreDetail.name = data.name
  loreDetail.subtitle = data.subtitle
  loreDetail.image = data.image
  loreDetail.content = data.content
  loreDetailOpen.value = true
}

const products = [
  {
    name: '太空长城纪念币',
    category: '限量收藏',
    image: '/images/纪念币正面.jpg',
    desc: '星际文明共同体成立20周年纪念！由Kepler-186f行星协会主席អាចារ្យបៃតង（Achar Baytong）设计，采用来自Kepler-442b行星的特殊材料制作，正面为太空长城敌楼的内部结构科技展示，衬以月球背景，背面为银河系仙女星系，重料精工，浪漫唯美。',
    price: '75',
    stock: ''
  },
  {
    name: '月球基地徽章套装',
    category: '服饰配件',
    image: '/images/徽章正面.jpg',
    desc: '地球钢材制作，中国国旗配色，将中国红与金色完美结合，月球车与地球长城并立，未来科技与古代技艺交相辉映。',
    price: '39',
    stock: ''
  },
  {
    name: '太空长城拼图',
    category: '益智玩具',
    image: '/images/拼图1.jpg',
    desc: '500片高清拼图，画面为地球各国工作者共同建设新唐山市的团结情景，背后是地球星辰，场景壮丽。',
    price: '98',
    stock: ''
  },
]
</script>
