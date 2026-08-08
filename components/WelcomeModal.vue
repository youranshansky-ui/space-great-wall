<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="fixed inset-0 z-[200000] flex items-center justify-center p-4" @click.self="onBgClick">
        <!-- 遮罩 -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <!-- ===== 阶段一：欢迎弹窗 ===== -->
        <Transition name="stage" mode="out-in">
          <div v-if="stage === 'welcome'" key="welcome" class="relative z-10 w-full max-w-md">
            <div class="holo-panel rounded-2xl p-8 text-center" style="background: rgba(6, 12, 36, 0.92); backdrop-filter: blur(24px);">
              <!-- 装饰星点 -->
              <div class="absolute top-4 right-4 w-1 h-1 rounded-full bg-stellar-warm/60 animate-pulse"></div>
              <div class="absolute top-6 right-8 w-0.5 h-0.5 rounded-full bg-hologram-ice/40" style="animation: twinkle 2s ease-in-out infinite;"></div>
              <div class="absolute bottom-6 left-6 w-0.5 h-0.5 rounded-full bg-hologram-ice/30" style="animation: twinkle 3s ease-in-out 0.5s infinite;"></div>

              <!-- 图标 -->
              <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-stellar-gold/15 to-stellar-gold/5 border border-stellar-gold/20 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d4a853" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
                </svg>
              </div>

              <h2 class="text-2xl font-display font-bold text-hologram-ice mb-2">欢迎来到</h2>
              <h2 class="text-xl font-display font-bold text-stellar-warm mb-6">新河北太空长城</h2>

              <p class="text-sm text-hologram-ice/40 leading-relaxed mb-8">
                月球表面的第一座中国文化永久基地<br>
                一段跨越38万公里的文明史诗
              </p>

              <!-- 按钮 A -->
              <button
                @click="stage = 'guide'"
                class="w-full mb-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-stellar-gold/20 to-stellar-gold/10 border border-stellar-gold/20 text-stellar-warm text-sm font-medium tracking-wide hover:from-stellar-gold/30 hover:to-stellar-gold/15 hover:border-stellar-gold/30 transition-all duration-300"
              >
                <span class="text-stellar-warm/60 mr-2">A.</span>我是新游客，请带我了解
              </button>

              <!-- 按钮 B -->
              <button
                @click="close"
                class="w-full px-6 py-3.5 rounded-xl bg-white/[0.03] border border-hologram-ice/[0.08] text-hologram-ice/60 text-sm tracking-wide hover:bg-white/[0.06] hover:text-hologram-ice/85 hover:border-hologram-ice/[0.15] transition-all duration-300"
              >
                <span class="text-hologram-ice/30 mr-2">B.</span>我是居民，直接进入
              </button>

              <!-- 跳过 -->
              <p class="text-[11px] text-hologram-ice/15 mt-5 cursor-pointer hover:text-hologram-ice/30 transition-colors" @click="close">
                不再显示此提示
              </p>
            </div>
          </div>

          <!-- ===== 阶段二：导览页 ===== -->
          <div v-else key="guide" class="relative z-10 w-full max-w-lg" @click.stop>
            <div class="holo-panel rounded-2xl p-6" style="background: rgba(6, 12, 36, 0.92); backdrop-filter: blur(24px);">
              <!-- 顶部关闭按钮 -->
              <button class="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-hologram-ice/20 hover:text-hologram-ice/60 hover:bg-white/[0.04] transition-all" @click="close">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <!-- 进度指示器 -->
              <div class="flex items-center justify-center gap-2 mb-6 pt-2">
                <div
                  v-for="i in 3" :key="i"
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  :class="i <= guidePage ? 'bg-stellar-warm/80 w-4' : 'bg-hologram-ice/15'"
                ></div>
              </div>

              <!-- 导览内容 -->
              <Transition name="guide" mode="out-in">
                <div :key="guidePage" class="text-center min-h-[260px] flex flex-col justify-center">
                  <!-- 第1页：导航与快捷操作 -->
                  <template v-if="guidePage === 1">
                    <div class="w-14 h-14 mx-auto mb-5 rounded-2xl bg-stellar-gold/10 border border-stellar-gold/15 flex items-center justify-center">
                      <svg width="24" height="24" fill="none" stroke="#d4a853" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                      </svg>
                    </div>
                    <h3 class="text-lg font-display font-bold text-hologram-ice mb-3">轻松浏览全站</h3>
                    <p class="text-sm text-hologram-ice/40 leading-relaxed mb-4">
                      点击左上角<strong class="text-stellar-warm/60">汉堡菜单</strong>浏览所有版块<br>
                      右下角的<strong class="text-stellar-warm/60">小月月</strong>可以和你对话聊天<br>
                      点击<strong class="text-stellar-warm/60">空白处</strong>随时关闭弹窗和菜单
                    </p>
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-hologram-ice/[0.06] text-xs text-hologram-ice/25">
                      按 Esc 或点击空白处 → 快速返回
                    </div>
                  </template>

                  <!-- 第2页：登录注册 -->
                  <template v-if="guidePage === 2">
                    <div class="w-14 h-14 mx-auto mb-5 rounded-2xl bg-stellar-gold/10 border border-stellar-gold/15 flex items-center justify-center">
                      <svg width="24" height="24" fill="none" stroke="#d4a853" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <h3 class="text-lg font-display font-bold text-hologram-ice mb-3">注册成为太空居民</h3>
                    <p class="text-sm text-hologram-ice/40 leading-relaxed mb-4">
                      点击右上角<strong class="text-stellar-warm/60">头像图标</strong>即可注册登录<br>
                      注册后可以在下方<strong class="text-stellar-warm/60">留言</strong>、收藏内容<br>
                      还能记录你的浏览足迹
                    </p>
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-hologram-ice/[0.06] text-xs text-hologram-ice/25">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      右上角头像 → 点击登录
                    </div>
                  </template>

                  <!-- 第3页：留言互动 -->
                  <template v-if="guidePage === 3">
                    <div class="w-14 h-14 mx-auto mb-5 rounded-2xl bg-stellar-gold/10 border border-stellar-gold/15 flex items-center justify-center">
                      <svg width="24" height="24" fill="none" stroke="#d4a853" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                      </svg>
                    </div>
                    <h3 class="text-lg font-display font-bold text-hologram-ice mb-3">留言互动与社区</h3>
                    <p class="text-sm text-hologram-ice/40 leading-relaxed mb-4">
                      每个页面底部都有<strong class="text-stellar-warm/60">留言区</strong><br>
                      写下你的太空梦想、分享旅行计划<br>
                      或与其他太空爱好者<strong class="text-stellar-warm/60">互动交流</strong>
                    </p>
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-hologram-ice/[0.06] text-xs text-hologram-ice/25">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                      滚动至底部 → 留言互动
                    </div>
                  </template>
                </div>
              </Transition>

              <!-- 导航按钮 -->
              <div class="flex items-center justify-between mt-6">
                <button
                  v-if="guidePage > 1"
                  @click="guidePage--"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-hologram-ice/[0.08] text-sm text-hologram-ice/40 hover:border-hologram-ice/[0.2] hover:text-hologram-ice/70 transition-all"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  上一步
                </button>
                <div v-else></div>

                <button
                  v-if="guidePage < 3"
                  @click="guidePage++"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stellar-gold/10 border border-stellar-gold/15 text-sm text-stellar-warm hover:bg-stellar-gold/20 transition-all"
                >
                  下一步
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button
                  v-else
                  @click="close"
                  class="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-stellar-gold/25 to-stellar-gold/15 border border-stellar-gold/30 text-sm text-stellar-warm font-medium hover:from-stellar-gold/35 hover:to-stellar-gold/20 transition-all"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  开始探索
                </button>
              </div>

              <!-- 页码 -->
              <p class="text-center text-[11px] text-hologram-ice/15 mt-4">{{ guidePage }} / 3</p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const stage = ref('welcome')
const guidePage = ref(1)

function show() {
  const dismissed = sessionStorage.getItem('welcome_dismissed')
  if (dismissed) return
  visible.value = true
  stage.value = 'welcome'
  guidePage.value = 1
}

function close() {
  visible.value = false
  sessionStorage.setItem('welcome_dismissed', '1')
}

function onBgClick() {
  if (stage.value === 'welcome') {
    // 欢迎页点击空白处关闭
  }
}

function onKeydown(e) {
  if (!visible.value) return
  if (e.key === 'Escape') {
    close()
  }
  if (stage.value === 'guide') {
    if (e.key === 'ArrowLeft' && guidePage.value > 1) {
      guidePage.value--
    }
    if (e.key === 'ArrowRight' && guidePage.value < 3) {
      guidePage.value++
    }
  }
}

watch(visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

defineExpose({ show })
</script>

<style scoped>
.modal-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-leave-active {
  transition: all 0.25s ease-in;
}
.modal-enter-from {
  opacity: 0;
}
.modal-enter-from > div {
  transform: translateY(30px) scale(0.95);
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-leave-to > div {
  transform: translateY(10px) scale(0.98);
  opacity: 0;
}

.stage-enter-active,
.stage-leave-active {
  transition: all 0.3s ease;
}
.stage-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.stage-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.guide-enter-active,
.guide-leave-active {
  transition: all 0.25s ease;
}
.guide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.guide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.8; }
}
</style>
