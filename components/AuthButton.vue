<template>
  <Teleport to="body">
    <div class="site-auth-container" v-show="!showIntro" @mouseenter="showPanel = true" @mouseleave="showPanel = false">
      <!-- Auth button -->
      <button class="site-auth-btn" :class="{ logged: !!user }" @click.stop="user ? (showPanel = !showPanel) : (open = true)" aria-label="用户">
        <!-- Not logged in -->
        <svg v-if="!user" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <!-- Logged in: avatar -->
        <img v-else :src="userAvatar" class="w-full h-full rounded-full object-cover" />
      </button>

      <!-- User detail panel (logged in, hover) -->
      <Transition name="panel-drop">
        <div v-if="user && showPanel" class="user-panel" @click.stop>
          <!-- Header -->
          <div class="flex items-center gap-3 mb-4 pb-4 border-b border-hologram-ice/[0.06]">
            <img :src="userAvatar" class="w-12 h-12 rounded-full object-cover border-2" :class="user.type === 'alien' ? 'border-green-400/30' : 'border-stellar-gold/30'" />
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base font-semibold text-hologram-ice">{{ user.name }}</span>
                <span class="text-sm">{{ user.type === 'alien' ? '👽' : '🌍' }}</span>
              </div>
              <span class="text-[11px] text-hologram-ice/30">{{ user.type === 'alien' ? '外星来客' : '地月居民' }}{{ user.planet && user.planet !== '地月' ? ' · 来自' + user.planet : '' }}</span>
            </div>
          </div>

          <!-- Stats grid -->
          <div class="grid grid-cols-3 gap-2 mb-4">
            <div class="stat-item">
              <span class="stat-value">{{ loginDays }}天</span>
              <span class="stat-label">登录天数</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">Lv.{{ level }}</span>
              <span class="stat-label">经验等级</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ starCoins }}</span>
              <span class="stat-label">星币</span>
            </div>
          </div>

          <!-- Info items -->
          <div class="space-y-1.5">
            <button class="info-row w-full" @click="openDetail('messages')">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              <span>我的留言</span>
              <span class="ml-auto text-hologram-ice/20">{{ myMsgs.length }}</span>
            </button>
            <button class="info-row w-full" @click="openDetail('replies')">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 10h10a8 8 0 018 8v2H3v-10z"/></svg>
              <span>回复我的</span>
              <span class="ml-auto text-hologram-ice/20">{{ myReplies.length }}</span>
            </button>
            <button class="info-row w-full" @click="openDetail('bookmarks')">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              <span>我的收藏</span>
              <span class="ml-auto text-hologram-ice/20">{{ myBookmarks.length }}</span>
            </button>
            <div class="info-row">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span>注册时间</span>
              <span class="ml-auto text-hologram-ice/20 text-[10px]">{{ regDate }}</span>
            </div>
          </div>

          <!-- Detail sub-panel -->
          <Transition name="detail-slide">
            <div v-if="detailType" class="detail-subpanel">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold text-hologram-ice/55">{{ detailTitle }}</span>
                <button class="text-hologram-ice/20 hover:text-hologram-ice/45 transition-colors" @click="detailType = null">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div v-if="currentDetailList.length > 0" class="space-y-2 max-h-40 overflow-y-auto">
                <div v-for="(item, i) in currentDetailList" :key="i" class="text-xs text-hologram-ice/40 leading-relaxed p-2 rounded-lg bg-white/[0.02] border border-white/[0.02]">
                  {{ item }}
                </div>
              </div>
              <div v-else class="text-center py-6">
                <p class="text-xs text-hologram-ice/20">暂无内容，努力探索吧~</p>
              </div>
            </div>
          </Transition>

          <!-- Logout -->
          <button class="w-full mt-4 py-2 rounded-lg border border-hologram-ice/[0.06] text-xs text-hologram-ice/25 hover:text-red-400/60 hover:border-red-400/15 transition-all" @click="logout">
            退出登录
          </button>
        </div>
      </Transition>

      <!-- Login/Register modal (not logged in) -->
      <Transition name="modal-fade">
        <div v-if="open" class="fixed inset-0 z-[300000] flex items-center justify-center p-4" @click.self="open = false">
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

          <Transition name="stage" mode="out-in">
            <div v-if="step === 'choose'" key="choose" class="relative z-10 w-full max-w-md" @click.stop>
              <div class="holo-panel rounded-2xl p-8" style="background: rgba(6,12,36,0.94); backdrop-filter: blur(24px);">
                <button class="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-hologram-ice/20 hover:text-hologram-ice/60 hover:bg-white/[0.04] transition-all" @click="open = false">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>

                <div class="text-center mb-8">
                  <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-stellar-gold/10 border border-stellar-gold/15 flex items-center justify-center">
                    <svg width="28" height="28" fill="none" stroke="#d4a853" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-display font-bold text-hologram-ice mb-2">选择你的身份</h3>
                  <p class="text-xs text-hologram-ice/30">欢迎加入新河北太空长城社区</p>
                </div>

                <div class="space-y-3">
                  <button class="identity-card" @click="selectType('human')">
                    <span class="text-3xl">🌍</span>
                    <div class="text-left">
                      <span class="block text-sm font-medium text-hologram-ice">地月人</span>
                      <span class="block text-[11px] text-hologram-ice/30">来自地球或月球的居民</span>
                    </div>
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" class="ml-auto text-hologram-ice/15" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                  <button class="identity-card" @click="selectType('alien')">
                    <span class="text-3xl">👽</span>
                    <div class="text-left">
                      <span class="block text-sm font-medium text-hologram-ice">外星人</span>
                      <span class="block text-[11px] text-hologram-ice/30">来自其他星球的访客</span>
                    </div>
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" class="ml-auto text-hologram-ice/15" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <div v-else key="form" class="relative z-10 w-full max-w-md" @click.stop>
              <div class="holo-panel rounded-2xl p-8" style="background: rgba(6,12,36,0.94); backdrop-filter: blur(24px);">
                <button class="absolute top-4 left-4 flex items-center gap-1 text-xs text-hologram-ice/25 hover:text-hologram-ice/55 transition-colors" @click="step = 'choose'">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  返回
                </button>
                <button class="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-hologram-ice/20 hover:text-hologram-ice/60 hover:bg-white/[0.04] transition-all" @click="open = false">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>

                <div class="text-center mb-6 pt-4">
                  <span class="text-3xl">{{ userType === 'human' ? '🌍' : '👽' }}</span>
                  <h3 class="text-lg font-display font-bold text-hologram-ice mt-2">{{ userType === 'human' ? '地月人' : '外星来客' }}注册</h3>
                </div>

                <form class="space-y-4" @submit.prevent="submitForm">
                  <div>
                    <label class="block text-xs text-hologram-ice/35 mb-1.5">姓名 / 称呼</label>
                    <input v-model="form.name" type="text" placeholder="你的名字" required class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-2.5 text-sm text-hologram-ice/80 placeholder-hologram-ice/15 outline-none focus:border-stellar-gold/30 transition-colors" />
                  </div>

                  <template v-if="userType === 'alien'">
                    <div>
                      <label class="block text-xs text-hologram-ice/35 mb-1.5">来自星球</label>
                      <input v-model="form.planet" type="text" placeholder="例如：比邻星b、猎户座α" class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-2.5 text-sm text-hologram-ice/80 placeholder-hologram-ice/15 outline-none focus:border-stellar-gold/30 transition-colors" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-xs text-hologram-ice/35 mb-1.5">年龄</label>
                        <input v-model="form.age" type="text" placeholder="地球年/星球年" class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-2.5 text-sm text-hologram-ice/80 placeholder-hologram-ice/15 outline-none focus:border-stellar-gold/30 transition-colors" />
                      </div>
                      <div>
                        <label class="block text-xs text-hologram-ice/35 mb-1.5">物种</label>
                        <input v-model="form.species" type="text" placeholder="你的种族" class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-2.5 text-sm text-hologram-ice/80 placeholder-hologram-ice/15 outline-none focus:border-stellar-gold/30 transition-colors" />
                      </div>
                    </div>
                  </template>

                  <div>
                    <label class="block text-xs text-hologram-ice/35 mb-1.5">联系方式（选填）</label>
                    <input v-model="form.contact" type="text" placeholder="星际通讯码 / 邮箱 / 脑波频率" class="w-full bg-white/[0.03] border border-hologram-ice/[0.08] rounded-xl px-4 py-2.5 text-sm text-hologram-ice/80 placeholder-hologram-ice/15 outline-none focus:border-stellar-gold/30 transition-colors" />
                  </div>

                  <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-stellar-gold/25 to-stellar-gold/10 border border-stellar-gold/20 text-stellar-warm text-sm font-medium tracking-wide hover:from-stellar-gold/35 hover:to-stellar-gold/15 transition-all mt-2">
                    完成注册，进入太空长城
                  </button>
                </form>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps({
  showIntro: { type: Boolean, default: false }
})

const open = ref(false)
const showPanel = ref(false)
const step = ref('choose')
const userType = ref('human')
const user = ref(null)
const detailType = ref(null)

const detailLabels = { messages: '我的留言', replies: '回复我的', bookmarks: '我的收藏' }
const detailTitle = computed(() => detailLabels[detailType.value] || '')

const form = reactive({
  name: '',
  planet: '',
  age: '',
  species: '',
  contact: ''
})

// Avatar based on identity
const userAvatar = computed(() => {
  if (!user.value) return ''
  if (user.value.type === 'alien') {
    return 'https://api.dicebear.com/9.x/bottts/svg?seed=' + encodeURIComponent(user.value.name) + '&backgroundColor=1a1a2e,16213e,0f3460'
  }
  return 'https://api.dicebear.com/9.x/avataaars/svg?seed=' + encodeURIComponent(user.value.name)
})

// Stats computed from registration date
const loginDays = computed(() => {
  if (!user.value?.registeredAt) return 1
  const regDate = new Date(user.value.registeredAt)
  const now = new Date()
  const diff = Math.floor((now - regDate) / (1000 * 60 * 60 * 24))
  return Math.max(1, diff + 1)
})

const level = computed(() => {
  const days = loginDays.value
  if (days >= 365) return Math.floor(days / 30)
  if (days >= 30) return Math.floor(days / 7)
  if (days >= 7) return Math.floor(days / 3)
  return 1
})

const starCoins = computed(() => {
  return loginDays.value * 10 + level.value * 50
})

const regDate = computed(() => {
  if (!user.value?.registeredAt) return ''
  const d = new Date(user.value.registeredAt)
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
})

// Load all messages
function loadAllMessages() {
  if (!process.client) return []
  const saved = localStorage.getItem('space_great_wall_messages')
  if (!saved) return []
  try { return JSON.parse(saved) } catch { return [] }
}

const myMsgs = computed(() => {
  if (!user.value) return []
  return loadAllMessages().filter(m => m.name === user.value.name).map(m => m.content)
})

const myReplies = computed(() => {
  // Placeholder - no reply system yet
  return []
})

const myBookmarks = computed(() => {
  if (!process.client || !user.value) return []
  const saved = localStorage.getItem('space_great_wall_bookmarks')
  if (!saved) return []
  try { return JSON.parse(saved) } catch { return [] }
})

const currentDetailList = computed(() => {
  if (detailType.value === 'messages') return myMsgs.value
  if (detailType.value === 'replies') return myReplies.value
  if (detailType.value === 'bookmarks') return myBookmarks.value
  return []
})

function openDetail(type) {
  detailType.value = detailType.value === type ? null : type
}

// Restore user on mount
if (process.client) {
  const saved = localStorage.getItem('space_great_wall_user')
  if (saved) {
    try { user.value = JSON.parse(saved) } catch {}
  }
}

function selectType(type) {
  userType.value = type
  step.value = 'form'
}

function submitForm() {
  const userData = {
    type: userType.value,
    name: form.name,
    planet: userType.value === 'alien' ? (form.planet || '未知星系') : '地月',
    age: userType.value === 'alien' ? form.age : '',
    species: userType.value === 'alien' ? (form.species || '未知') : '人类',
    contact: form.contact,
    registeredAt: new Date().toISOString()
  }
  user.value = userData
  if (process.client) {
    localStorage.setItem('space_great_wall_user', JSON.stringify(userData))
  }
  Object.keys(form).forEach(k => form[k] = '')
  open.value = false
  step.value = 'choose'
}

function logout() {
  user.value = null
  showPanel.value = false
  if (process.client) {
    localStorage.removeItem('space_great_wall_user')
  }
}
</script>

<style scoped>
.site-auth-container {
  position: fixed; top: 28px; right: 80px; z-index: 1001;
}
.site-auth-btn {
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.45); display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px); transition: all 0.3s ease; cursor: pointer;
  overflow: hidden;
}
.site-auth-btn:hover {
  border-color: rgba(136,204,221,0.5); color: rgba(136,204,221,0.75);
}
.site-auth-btn.logged {
  border-color: rgba(212,168,83,0.35);
}

.user-panel {
  position: absolute; top: 48px; right: 0;
  width: 240px;
  background: rgba(6,12,36,0.96); backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
  padding: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.stat-item {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.04);
  border-radius: 10px; padding: 8px 4px; text-align: center;
}
.stat-value {
  display: block; font-size: 14px; font-weight: 700; font-family: var(--font-display);
  color: rgba(212,168,83,0.8);
}
.stat-label {
  display: block; font-size: 10px; color: rgba(255,255,255,0.2); margin-top: 2px;
}

.info-row {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 8px;
  color: rgba(255,255,255,0.3); font-size: 12px;
  transition: all 0.15s; cursor: pointer;
}
.info-row:hover {
  background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.5);
}

.detail-subpanel {
  border-top: 1px solid rgba(255,255,255,0.04);
  padding-top: 10px; margin-bottom: 8px;
}

.detail-slide-enter-active { transition: all 0.25s ease; }
.detail-slide-leave-active { transition: all 0.15s ease; }
.detail-slide-enter-from { opacity: 0; max-height: 0; }
.detail-slide-enter-to { opacity: 1; max-height: 200px; }
.detail-slide-leave-from { opacity: 1; max-height: 200px; }
.detail-slide-leave-to { opacity: 0; max-height: 0; }

.identity-card {
  display: flex; align-items: center; gap: 12px;
  width: 100%; padding: 14px 16px; border-radius: 14px;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.25s;
}
.identity-card:hover {
  background: rgba(255,255,255,0.04); border-color: rgba(212,168,83,0.2);
}

.modal-fade-enter-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.modal-fade-leave-active { transition: all 0.2s ease-in; }
.modal-fade-enter-from { opacity: 0; }
.modal-fade-leave-to { opacity: 0; }

.stage-enter-active { transition: all 0.25s ease; }
.stage-leave-active { transition: all 0.15s ease; }
.stage-enter-from { opacity: 0; transform: translateX(30px); }
.stage-leave-to { opacity: 0; transform: translateX(-30px); }

.panel-drop-enter-active { transition: all 0.2s ease-out; }
.panel-drop-leave-active { transition: all 0.15s ease-in; }
.panel-drop-enter-from { opacity: 0; transform: translateY(-6px) scale(0.96); }
.panel-drop-leave-to { opacity: 0; transform: translateY(-4px) scale(0.98); }

@media (max-width: 640px) {
  .site-auth-container { top: 16px; right: 54px; }
  .site-auth-btn { width: 34px; height: 34px; }
  .user-panel { width: 220px; }
}
</style>
