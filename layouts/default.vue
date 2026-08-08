<template>
  <div>
    <!-- 前台布局 -->
    <div v-if="!isAdminRoute">
      <Navbar />
      <main class="min-h-screen">
        <slot />
      </main>
    </div>

    <!-- 后台布局（含侧边栏） -->
    <div v-else class="admin-layout">
      <aside class="admin-sidebar">
        <!-- Logo -->
        <div class="sidebar-logo">
          <div class="logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
              <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
              <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
              <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
            </svg>
          </div>
          <div class="logo-text">
            <div class="logo-title">太空长城</div>
            <div class="logo-sub">SPACE GREAT WALL</div>
          </div>
        </div>

        <!-- 菜单 -->
        <nav class="sidebar-nav">
          <NuxtLink to="/admin" class="nav-item" :class="{ active: route.path === '/admin' }">
            <span class="nav-icon" v-html="icons.dashboard"></span>
            <span class="nav-label">控制台</span>
          </NuxtLink>

          <div v-for="group in menuGroups" :key="group.key" class="nav-group">
            <button class="nav-group-title" @click="toggleGroup(group.key)">
              <svg class="nav-group-arrow" :class="{ expanded: expandedGroups.has(group.key) }" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              <span v-html="group.icon"></span>
              <span>{{ group.label }}</span>
            </button>
            <div class="nav-group-children" :class="{ collapsed: !expandedGroups.has(group.key) }">
              <NuxtLink
                v-for="child in group.children"
                :key="child.path"
                :to="child.path"
                class="nav-sub-item"
                :class="{ active: route.path === child.path }"
              >
                <span class="nav-sub-dot"></span>
                <span>{{ child.label }}</span>
              </NuxtLink>
            </div>
          </div>
        </nav>

        <div class="sidebar-footer">
          <a href="/" target="_blank" class="footer-link">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            前台网站
          </a>
        </div>
      </aside>

      <!-- 右侧内容 -->
      <div class="admin-main">
        <header class="admin-header">
          <h1 class="header-title">{{ pageTitle }}</h1>
          <span class="header-badge">管理员</span>
        </header>
        <div class="admin-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const pageTitle = computed(() => {
  const map = {
    '/admin': '控制台',
    '/admin/story-chapters': '地月纪元章节',
    '/admin/alliance-chapters': '星际联合章节',
    '/admin/timeline': '时空编年史',
    '/admin/technologies': '核心科技',
    '/admin/travel-routes': '旅游研学',
    '/admin/narratives': '叙事画卷',
    '/admin/comics': '漫画宇宙',
    '/admin/cities': '城市管理',
    '/admin/essays': '作文竞赛',
    '/admin/messages': '留言管理',
    '/admin/images': '图片管理',
  }
  return map[route.path] || '管理后台'
})

const pathGroupMap = {
  '/admin/story-chapters': 'story',
  '/admin/alliance-chapters': 'story',
  '/admin/timeline': 'story',
  '/admin/technologies': 'tech',
  '/admin/travel-routes': 'tech',
  '/admin/narratives': 'content',
  '/admin/comics': 'content',
  '/admin/cities': 'community',
  '/admin/essays': 'community',
  '/admin/messages': 'community',
  '/admin/images': 'system',
}

const expandedGroups = ref(new Set())

function initExpanded() {
  const gk = pathGroupMap[route.path]
  if (gk) expandedGroups.value.add(gk)
}
initExpanded()
watch(() => route.path, initExpanded)

function toggleGroup(key) {
  if (expandedGroups.value.has(key)) {
    expandedGroups.value.delete(key)
  } else {
    expandedGroups.value.add(key)
  }
  expandedGroups.value = new Set(expandedGroups.value)
}

const icons = {
  dashboard: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
}

const menuGroups = [
  {
    key: 'story', label: '背景故事',
    icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
    children: [
      { path: '/admin/story-chapters', label: '地月纪元章节' },
      { path: '/admin/alliance-chapters', label: '星际联合章节' },
      { path: '/admin/timeline', label: '时空编年史' },
    ],
  },
  {
    key: 'tech', label: '科技与探索',
    icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    children: [
      { path: '/admin/technologies', label: '核心科技' },
      { path: '/admin/travel-routes', label: '旅游研学' },
    ],
  },
  {
    key: 'content', label: '内容展示',
    icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    children: [
      { path: '/admin/narratives', label: '叙事画卷' },
      { path: '/admin/comics', label: '漫画宇宙' },
    ],
  },
  {
    key: 'community', label: '社区管理',
    icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    children: [
      { path: '/admin/cities', label: '城市管理' },
      { path: '/admin/essays', label: '作文竞赛' },
      { path: '/admin/messages', label: '留言管理' },
    ],
  },
  {
    key: 'system', label: '系统管理',
    icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    children: [
      { path: '/admin/images', label: '图片管理' },
    ],
  },
]
</script>

<style>
/* ===== 后台光标 ===== */
.admin-layout,
.admin-layout * {
  cursor: auto !important;
}

/* ===== 侧边栏 ===== */
.admin-sidebar {
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: 230px;
  background: #001529;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.sidebar-logo {
  display: flex; align-items: center; gap: 10px;
  padding: 20px 20px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.admin-layout .logo-icon {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, #1890ff, #096dd9);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.logo-title { color: #fff; font-size: 15px; font-weight: 700; letter-spacing: 0.5px; line-height: 1.2; }
.logo-sub { color: rgba(255,255,255,0.35); font-size: 9px; letter-spacing: 1px; margin-top: 1px; line-height: 1.2; }

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 24px;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  margin-bottom: 4px;
}
.nav-item:hover { color: #fff; background: rgba(255,255,255,0.04); }
.nav-item.active { color: #fff; background: #1890ff; border-left-color: #69c0ff; }

.nav-icon { display: flex; align-items: center; width: 20px; height: 20px; flex-shrink: 0; opacity: 0.8; }
.nav-item.active .nav-icon { opacity: 1; }

.nav-group { margin-bottom: 2px; }

.nav-group-title {
  display: flex; align-items: center; gap: 8px;
  width: 100%;
  padding: 10px 24px;
  background: none; border: none;
  color: rgba(255,255,255,0.45);
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s;
  text-align: left;
}
.nav-group-title:hover { color: rgba(255,255,255,0.7); }
.nav-group-arrow { flex-shrink: 0; transition: transform 0.2s; }
.nav-group-arrow.expanded { transform: rotate(90deg); }

.nav-group-children {
  overflow: hidden;
  max-height: 300px;
  transition: max-height 0.25s ease;
}
.nav-group-children.collapsed { max-height: 0; }

.nav-sub-item {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 24px 9px 52px;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}
.nav-sub-item:hover { color: #fff; background: rgba(255,255,255,0.03); }
.nav-sub-item.active { color: #fff; background: #1890ff; border-left-color: #69c0ff; }

.nav-sub-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  flex-shrink: 0;
}
.nav-sub-item.active .nav-sub-dot { background: #69c0ff; }

.sidebar-footer {
  padding: 14px 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.footer-link {
  display: flex; align-items: center; gap: 6px;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  font-size: 12px;
  transition: color 0.2s;
}
.footer-link:hover { color: rgba(255,255,255,0.65); }

/* ===== 右侧主区域 ===== */
.admin-main {
  margin-left: 230px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.admin-header {
  position: sticky;
  top: 0; z-index: 50;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.header-title { font-size: 16px; font-weight: 600; color: #1a1a1a; margin: 0; }
.header-badge {
  font-size: 13px; color: #888;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  padding: 4px 12px; border-radius: 4px;
}
.admin-content {
  flex: 1;
  background: #f0f2f5;
  padding: 24px 32px;
}

.sidebar-nav::-webkit-scrollbar { width: 4px; }
.sidebar-nav::-webkit-scrollbar-track { background: transparent; }
.sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

/* ===== 后台内容区 - 强制浅色主题（覆盖前端深色类） ===== */
.admin-content [class*="bg-deep-space"] { background: #fff !important; }
.admin-content [class*="border-hologram-ice"] { border-color: #e8e8e8 !important; }
.admin-content [class*="text-hologram-ice"] { color: #333 !important; }
.admin-content [class*="text-stellar-warm"] { color: #fa8c16 !important; }
.admin-content [class*="text-stellar-gold"] { color: #d4a853 !important; }
.admin-content [class*="text-hologram-cyan"] { color: #1890ff !important; }
.admin-content [class*="bg-stellar-gold"] { background: #fff7e6 !important; border-color: #ffd591 !important; }

/* 按钮 hover 状态 */
.admin-content button[class*="hover:bg-white"] { background: #f5f5f5 !important; }
.admin-content [class*="hover:bg-stellar-gold"]:hover { background: #ffe7ba !important; }

/* 表格行 hover */
.admin-content [class*="hover:bg-white"]:hover { background: #fafafa !important; }

/* 表单输入 */
.admin-content [class*="placeholder:"]::placeholder { color: #bfbfbf !important; }
.admin-content textarea[class*="bg-deep-space"],
.admin-content input[class*="bg-deep-space"],
.admin-content select[class*="bg-deep-space"] {
  background: #fff !important;
  border-color: #d9d9d9 !important;
  color: #333 !important;
}
.admin-content textarea[class*="bg-deep-space"]:focus,
.admin-content input[class*="bg-deep-space"]:focus,
.admin-content select[class*="bg-deep-space"]:focus {
  border-color: #1890ff !important;
  box-shadow: 0 0 0 2px rgba(24,144,255,0.1) !important;
}

/* 表格 */
.admin-content table {
  color: #333 !important;
  background: #fff !important;
}
.admin-content thead tr {
  color: #666 !important;
  background: #fafafa !important;
  border-color: #f0f0f0 !important;
}
.admin-content tbody tr {
  border-color: #f0f0f0 !important;
}
.admin-content tbody tr:hover {
  background: #fafafa !important;
}

/* 分页按钮 */
.admin-content button[class*="disabled:opacity-"]:disabled {
  color: #d9d9d9 !important;
  border-color: #d9d9d9 !important;
}

/* 删除按钮保持红色 */
.admin-content [class*="text-red-"] { color: #ff4d4f !important; }
.admin-content [class*="bg-red-"] { background: #fff1f0 !important; border-color: #ffa39e !important; }

/* 表单标签 */
.admin-content label[class*="text-hologram-ice"] { color: #666 !important; }

/* 模态框 */
.admin-content [class*="bg-deep-space-900"] {
  background: #fff !important;
  border-color: #e8e8e8 !important;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12) !important;
}
.admin-content [class*="rounded-2xl"] {
  border-radius: 8px !important;
}

/* 标题 */
.admin-content h1 { color: #1a1a1a !important; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important; }
.admin-content h2 { color: #1a1a1a !important; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important; }
.admin-content h3 { color: #333 !important; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important; }

/* 分隔线 */
.admin-content [class*="border-t"][class*="border-hologram-ice"] {
  border-color: #f0f0f0 !important;
}
</style>
