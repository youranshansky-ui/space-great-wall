<template>
  <div>
    <!-- 统计卡片 -->
    <div class="stats-row">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-body">
          <div class="stat-info">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-value">{{ stat.count }}</div>
          </div>
          <div class="stat-icon-box" :style="{ background: stat.color }">
            <span v-html="stat.icon" class="stat-svg"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 两栏布局 -->
    <div class="dashboard-grid">
      <!-- 最近留言 -->
      <div class="panel">
        <div class="panel-header">最近留言</div>
        <div class="panel-body">
          <div v-if="recentMessages.length">
            <div v-for="msg in recentMessages" :key="msg.id" class="msg-row">
              <div class="msg-meta">
                <span class="msg-sender">{{ msg.sender_name || '匿名' }}</span>
                <span class="msg-time">{{ msg.created_at }}</span>
              </div>
              <p class="msg-text">{{ msg.content }}</p>
            </div>
          </div>
          <div v-else class="empty-text">暂无留言</div>
        </div>
      </div>

      <!-- 快捷入口 -->
      <div class="panel">
        <div class="panel-header">快捷入口</div>
        <div class="panel-body">
          <div class="quick-grid">
            <NuxtLink v-for="link in quickLinks" :key="link.to" :to="link.to" class="quick-item">
              <span class="quick-icon" v-html="link.icon"></span>
              <span class="quick-label">{{ link.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// uses default layout with sidebar

const { apiFetch } = useAdminApi()

const stats = ref([
  { label: '地月纪元章节', count: 0, key: 'story_chapters', color: '#e6f7ff', icon: '<svg width="24" height="24" fill="none" stroke="#1890ff" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>' },
  { label: '星际联合章节', count: 0, key: 'alliance_chapters', color: '#fff7e6', icon: '<svg width="24" height="24" fill="none" stroke="#fa8c16" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10"/><path d="M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10"/></svg>' },
  { label: '编年史事件', count: 0, key: 'timeline_events', color: '#f6ffed', icon: '<svg width="24" height="24" fill="none" stroke="#52c41a" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
  { label: '核心科技', count: 0, key: 'technologies', color: '#fff1f0', icon: '<svg width="24" height="24" fill="none" stroke="#f5222d" stroke-width="1.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' },
  { label: '研学路线', count: 0, key: 'travel_routes', color: '#f9f0ff', icon: '<svg width="24" height="24" fill="none" stroke="#722ed1" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="5.5" r="2.5"/><path d="M8 16l11-11"/></svg>' },
  { label: '叙事画卷', count: 0, key: 'narratives', color: '#e6fffb', icon: '<svg width="24" height="24" fill="none" stroke="#13c2c2" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
  { label: '漫画章节', count: 0, key: 'comics', color: '#fff0f6', icon: '<svg width="24" height="24" fill="none" stroke="#eb2f96" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>' },
  { label: '留言消息', count: 0, key: 'messages', color: '#fcffe6', icon: '<svg width="24" height="24" fill="none" stroke="#a0d911" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>' },
])

const recentMessages = ref([])

const quickLinks = [
  { label: '地月纪元', to: '/admin/story-chapters', icon: '<svg width="22" height="22" fill="none" stroke="#1890ff" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>' },
  { label: '星际联合', to: '/admin/alliance-chapters', icon: '<svg width="22" height="22" fill="none" stroke="#fa8c16" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10"/></svg>' },
  { label: '编年史', to: '/admin/timeline', icon: '<svg width="22" height="22" fill="none" stroke="#52c41a" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
  { label: '核心科技', to: '/admin/technologies', icon: '<svg width="22" height="22" fill="none" stroke="#f5222d" stroke-width="1.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' },
  { label: '研学路线', to: '/admin/travel-routes', icon: '<svg width="22" height="22" fill="none" stroke="#722ed1" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="5.5" r="2.5"/><path d="M8 16l11-11"/></svg>' },
  { label: '叙事画卷', to: '/admin/narratives', icon: '<svg width="22" height="22" fill="none" stroke="#13c2c2" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
  { label: '漫画宇宙', to: '/admin/comics', icon: '<svg width="22" height="22" fill="none" stroke="#eb2f96" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>' },
  { label: '城市管理', to: '/admin/cities', icon: '<svg width="22" height="22" fill="none" stroke="#2f54eb" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>' },
  { label: '图片管理', to: '/admin/images', icon: '<svg width="22" height="22" fill="none" stroke="#c41d7f" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
  { label: '留言管理', to: '/admin/messages', icon: '<svg width="22" height="22" fill="none" stroke="#a0d911" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>' },
]

onMounted(async () => {
  try {
    const endpoints = ['story-chapters', 'alliance-chapters', 'timeline-events', 'technologies', 'travel-routes', 'narratives', 'comics', 'cities', 'messages']
    for (const ep of endpoints) {
      const res = await apiFetch(`/api/admin/${ep}?page=1&pageSize=1`)
      const idx = stats.value.findIndex(s => s.key === ep.replace(/-/g, '_'))
      if (idx >= 0) stats.value[idx].count = res.data.total
    }
    const msgRes = await apiFetch('/api/admin/messages?page=1&pageSize=5')
    recentMessages.value = msgRes.data.list
  } catch (e) {
    console.error('Dashboard error:', e)
  }
})
</script>

<style scoped>
/* 统计卡片行 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  transition: box-shadow 0.2s;
}
.stat-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.09); }
.stat-body {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stat-label {
  color: #888;
  font-size: 14px;
  margin-bottom: 8px;
}
.stat-value {
  color: #1a1a1a;
  font-size: 28px;
  font-weight: 600;
  line-height: 1;
}
.stat-icon-box {
  width: 52px; height: 52px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-svg { display: flex; align-items: center; }

/* 面板 */
.panel {
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
}
.panel-header {
  padding: 16px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  border-bottom: 1px solid #f0f0f0;
}
.panel-body { padding: 16px 24px; }

/* 两栏 */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* 留言 */
.msg-row {
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}
.msg-row:last-child { border-bottom: none; padding-bottom: 0; }
.msg-row:first-child { padding-top: 0; }
.msg-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.msg-sender { font-size: 13px; font-weight: 500; color: #1890ff; }
.msg-time { font-size: 12px; color: #bbb; }
.msg-text { font-size: 13px; color: #666; line-height: 1.6; }

/* 快捷入口 */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}
.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 8px;
  border-radius: 4px;
  text-decoration: none;
  border: 1px solid #f0f0f0;
  transition: all 0.2s;
}
.quick-item:hover {
  border-color: #1890ff;
  background: #e6f7ff;
}
.quick-icon { display: flex; align-items: center; }
.quick-label {
  font-size: 12px;
  color: #666;
}
.empty-text {
  text-align: center;
  color: #bbb;
  font-size: 13px;
  padding: 20px 0;
}

@media (max-width: 1200px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .dashboard-grid { grid-template-columns: 1fr; }
  .quick-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
