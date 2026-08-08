<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled
      ? 'bg-deep-space-950/80 backdrop-blur-xl border-b border-hologram-cyan/5'
      : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-end h-16 lg:h-20">
        <!-- 桌面端导航菜单（靠右对齐） -->
        <div class="hidden lg:flex items-center gap-1">
          <NavLink to="/">首页</NavLink>
          <NavLink to="/story">背景故事</NavLink>
          <NavLink to="/technology">核心科技</NavLink>
          <NavLink to="/comics">漫画故事</NavLink>
          <NavLink to="/aliens">外星人交流</NavLink>
          <NavLink to="/hebei">地月河北</NavLink>
          <NavLink to="/shop">太空文创</NavLink>
          <NavLink to="/travel">旅游研学</NavLink>
          <NavLink to="/contact">联系我们</NavLink>
        </div>

        <button class="lg:hidden p-2 rounded-lg hover:bg-white/[0.03] transition-colors" @click="mobileOpen = !mobileOpen">
          <div class="w-5 h-4 flex flex-col justify-between">
            <span class="block h-px bg-hologram-ice transition-all" :class="mobileOpen ? 'rotate-45 translate-y-[7px]' : ''"></span>
            <span class="block h-px bg-hologram-ice transition-all" :class="mobileOpen ? 'opacity-0' : ''"></span>
            <span class="block h-px bg-hologram-ice transition-all" :class="mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''"></span>
          </div>
        </button>
      </div>

      <div class="lg:hidden overflow-hidden transition-all duration-300" :class="mobileOpen ? 'max-h-96 pb-4' : 'max-h-0'">
        <div class="flex flex-col gap-1 frost-card p-4">
          <MobileNavLink to="/" @click="mobileOpen = false">首页</MobileNavLink>
          <MobileNavLink to="/story" @click="mobileOpen = false">背景故事</MobileNavLink>
          <MobileNavLink to="/technology" @click="mobileOpen = false">核心科技</MobileNavLink>
          <MobileNavLink to="/comics" @click="mobileOpen = false">漫画故事</MobileNavLink>
          <MobileNavLink to="/aliens" @click="mobileOpen = false">外星人交流</MobileNavLink>
          <MobileNavLink to="/hebei" @click="mobileOpen = false">地月河北</MobileNavLink>
          <MobileNavLink to="/shop" @click="mobileOpen = false">太空文创</MobileNavLink>
          <MobileNavLink to="/travel" @click="mobileOpen = false">旅游研学</MobileNavLink>
          <MobileNavLink to="/contact" @click="mobileOpen = false">联系我们</MobileNavLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const scrolled = ref(false)
const mobileOpen = ref(false)
if (process.client) {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 20 })
}
</script>
