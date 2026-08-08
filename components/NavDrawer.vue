<template>
  <!-- Hamburger button -->
  <button class="hamburger" :class="{ open: isOpen }" @click="toggle" aria-label="菜单">
    <span></span><span></span><span></span>
  </button>

  <!-- 首页 UFO Logo -->
  <NuxtLink v-show="!isOpen" to="/" class="home-ufo" title="首页">
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" class="ufo-icon">
      <!-- UFO dome -->
      <ellipse cx="16" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.2" fill="rgba(136,204,221,0.08)"/>
      <ellipse cx="16" cy="12" rx="5" ry="2.5" fill="rgba(212,168,83,0.12)" stroke="currentColor" stroke-width="0.8"/>
      <!-- Beam -->
      <path d="M10 16 L6 28 M22 16 L26 28 M16 16 L16 28" stroke="rgba(212,168,83,0.25)" stroke-width="1" stroke-linecap="round"/>
      <ellipse cx="16" cy="28" rx="10" ry="2" fill="rgba(212,168,83,0.08)" stroke="rgba(212,168,83,0.15)" stroke-width="0.6"/>
      <!-- Lights -->
      <circle cx="8" cy="11" r="1.2" fill="rgba(212,168,83,0.6)"/>
      <circle cx="16" cy="10" r="1.2" fill="rgba(136,204,221,0.5)"/>
      <circle cx="24" cy="11" r="1.2" fill="rgba(212,168,83,0.6)"/>
    </svg>
    <span class="home-text">首页</span>
  </NuxtLink>

  <!-- Backdrop -->
  <div class="drawer-backdrop" :class="{ show: isOpen }" @click="close" />

  <!-- Drawer panel -->
  <div class="drawer-panel" :class="{ show: isOpen }">
    <div class="drawer-header">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-stellar-gold/30 to-hologram-cyan/20 border border-stellar-gold/20 flex items-center justify-center">
          <GreatWallLogo class="w-4 h-4 text-stellar-warm" />
        </div>
        <span class="text-sm font-semibold text-hologram-ice">太空<span class="text-stellar-warm">长城</span></span>
      </div>
      <button class="drawer-close" @click="close">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="drawer-body">
      <template v-for="item in menu" :key="item.label">
        <!-- Single link -->
        <template v-if="!item.children">
          <NuxtLink :to="item.to" class="drawer-link" @click="close">
            {{ item.label }}
          </NuxtLink>
        </template>
        <!-- Group with children -->
        <template v-else>
          <button class="drawer-group" @click="toggleGroup(item.label)">
            <span>{{ item.label }}</span>
            <svg class="chevron" :class="{ open: openGroups.has(item.label) }" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="drawer-sub" :class="{ open: openGroups.has(item.label) }">
            <NuxtLink
              v-for="child in item.children"
              :key="child.label"
              :to="child.to"
              class="drawer-sublink"
              @click="close"
            >
              <span class="sublink-dot"></span>
              {{ child.label }}
            </NuxtLink>
          </div>
        </template>
      </template>
    </div>

    <div class="drawer-footer">
      <div class="text-[10px] text-hologram-ice/20">
        地月通讯延迟 1.3s · 月球 · 新河北
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isOpen = ref(false)
const openGroups = reactive(new Set())

const menu = [
  { label: '首页', to: '/' },
  {
    label: '背景故事',
    children: [
      { label: '地月纪元的序章', to: '/story#prologue' },
      { label: '星际文明的联合', to: '/story#alliance' },
      { label: '时空编年史', to: '/timeline' },
    ]
  },
  { label: '核心科技', to: '/technology' },
  {
    label: '太空长城的漫画宇宙',
    children: [
      { label: '阿澜的月球日记', to: '/comics#series-alan' },
      { label: '许青的星际穿越', to: '/comics#series-xuqing' },
      { label: '林老师的研学班', to: '/comics#series-yanxue' },
    ]
  },
  {
    label: '新河北 · 城市史诗',
    children: [
      { label: '新石家庄', to: '/cities?city=新石家庄' },
      { label: '新唐山市', to: '/cities?city=新唐山市' },
      { label: '新沧州市', to: '/cities?city=新沧州市' },
      { label: '新山海关', to: '/cities?city=新山海关' },
      { label: '新秦皇岛', to: '/cities?city=新秦皇岛' },
      { label: '新承德', to: '/cities?city=新承德' },
      { label: '新张家口', to: '/cities?city=新张家口' },
      { label: '新保定', to: '/cities?city=新保定' },
      { label: '新邯郸', to: '/cities?city=新邯郸' },
    ]
  },
  {
    label: '外.地人交流中心',
    children: [
      { label: '外·地人留言板', to: '/aliens#messages' },
      { label: '视频通讯站', to: '/aliens#videos' },
      { label: '作文竞赛', to: '/aliens#essays' },
    ]
  },
  {
    label: '地月河北',
    children: [
      { label: '知识问答', to: '/hebei#quiz' },
      { label: '旅游路线', to: '/hebei#routes' },
      { label: '历史沿革', to: '/hebei#history' },
    ]
  },
  {
    label: '太空文创',
    children: [
      { label: '星际文创饰品', to: '/shop' },
      { label: '太空长城潮玩手办', to: '/shop#preview' },
    ]
  },
  {
    label: '旅游研学',
    children: [
      { label: '五条热门路线', to: '/travel#routes' },
      { label: '报名参团', to: '/travel#signup' },
    ]
  },
  { label: '联系我们', to: '/contact' },
]

function toggle() { isOpen.value = !isOpen.value }
function close() { isOpen.value = false }

function toggleGroup(label) {
  if (openGroups.has(label)) {
    openGroups.delete(label)
  } else {
    openGroups.add(label)
  }
}
</script>

<style scoped>
/* Hamburger */
.hamburger {
  position: fixed; top: 18px; left: 18px; z-index: 10010;
  width: 38px; height: 38px;
  background: rgba(10, 18, 46, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(136, 204, 221, 0.12);
  border-radius: 10px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 5px; cursor: pointer; transition: all 0.3s;
}
.hamburger:hover {
  border-color: rgba(212, 168, 83, 0.3);
  background: rgba(10, 18, 46, 0.85);
}
.hamburger span {
  display: block; width: 18px; height: 1.5px;
  background: #88ccdd; border-radius: 2px;
  transition: all 0.3s ease;
}
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }

/* Home UFO logo */
.home-ufo {
  position: fixed; top: 18px; left: 66px; z-index: 10010;
  display: flex; align-items: center; gap: 7px;
  padding: 8px 12px;
  background: rgba(10, 18, 46, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(136, 204, 221, 0.12);
  border-radius: 10px;
  cursor: pointer; transition: all 0.3s;
  text-decoration: none;
  color: rgba(136, 204, 221, 0.6);
}
.home-ufo:hover {
  border-color: rgba(212, 168, 83, 0.3);
  background: rgba(10, 18, 46, 0.85);
  color: rgba(212, 168, 83, 0.8);
}
.home-text {
  font-size: 12px;
  font-weight: 500;
  color: #88ccdd;
  transition: color 0.3s;
}
.home-ufo:hover .home-text {
  color: #d4a853;
}

/* Backdrop */
.drawer-backdrop {
  position: fixed; inset: 0; z-index: 9998;
  background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px);
  opacity: 0; pointer-events: none; transition: opacity 0.3s;
}
.drawer-backdrop.show { opacity: 1; pointer-events: auto; }

/* Drawer panel */
.drawer-panel {
  position: fixed; top: 0; left: 0; bottom: 0; z-index: 9999;
  width: 320px; max-width: 85vw;
  background: rgba(4, 8, 20, 0.95);
  backdrop-filter: blur(24px);
  border-right: 1px solid rgba(136, 204, 221, 0.06);
  transform: translateX(-100%); transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex; flex-direction: column;
}
.drawer-panel.show { transform: translateX(0); }

.drawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(136, 204, 221, 0.06);
}
.drawer-close {
  width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
  border-radius: 8px; color: rgba(255,255,255,0.4);
  transition: all 0.2s;
}
.drawer-close:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); }

.drawer-body {
  flex: 1; overflow-y: auto; padding: 12px 0;
}
.drawer-body::-webkit-scrollbar { width: 3px; }
.drawer-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

/* Links */
.drawer-link {
  display: block; padding: 11px 24px;
  font-size: 14px; color: rgba(200, 214, 229, 0.7);
  transition: all 0.2s;
}
.drawer-link:hover { color: #f0e0c8; background: rgba(212, 168, 83, 0.06); }

/* Group button */
.drawer-group {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 11px 24px;
  font-size: 14px; color: rgba(200, 214, 229, 0.7);
  transition: all 0.2s;
}
.drawer-group:hover { color: #f0e0c8; background: rgba(212, 168, 83, 0.06); }
.chevron { transition: transform 0.25s; opacity: 0.4; }
.chevron.open { transform: rotate(180deg); opacity: 0.7; }

/* Submenu */
.drawer-sub {
  max-height: 0; overflow: hidden;
  transition: max-height 0.3s ease;
}
.drawer-sub.open { max-height: 500px; }
.drawer-sublink {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 24px 8px 40px;
  font-size: 13px; color: rgba(200, 214, 229, 0.5);
  transition: all 0.2s;
}
.drawer-sublink:hover { color: rgba(200, 214, 229, 0.8); background: rgba(255,255,255,0.02); }
.sublink-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: rgba(136, 204, 221, 0.4); flex-shrink: 0;
}

.drawer-footer {
  padding: 14px 24px;
  border-top: 1px solid rgba(136, 204, 221, 0.05);
}
</style>
