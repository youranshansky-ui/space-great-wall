<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-display font-bold text-hologram-ice">留言管理</h1>
    </div>

    <div class="rounded-xl border border-hologram-ice/[0.06] bg-deep-space-800/40 overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-hologram-ice/[0.06] text-hologram-ice/30 text-left">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">发送者</th>
            <th class="px-4 py-3">类型</th>
            <th class="px-4 py-3">内容预览</th>
            <th class="px-4 py-3">时间</th>
            <th class="px-4 py-3">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id" class="border-b border-hologram-ice/[0.03] hover:bg-white/[0.01]" :class="{ 'bg-stellar-gold/[0.01]': !item.is_read }">
            <td class="px-4 py-3 text-hologram-ice/20 font-mono text-xs">{{ item.id }}</td>
            <td class="px-4 py-3">
              <div class="text-hologram-ice/60">{{ item.sender_name || '匿名' }}</div>
              <div v-if="item.sender_planet" class="text-hologram-ice/20 text-xs">{{ item.sender_planet }}</div>
            </td>
            <td class="px-4 py-3 text-hologram-ice/50 text-xs">{{ item.sender_type }}</td>
            <td class="px-4 py-3 text-hologram-ice/40 max-w-xs truncate">{{ item.content }}</td>
            <td class="px-4 py-3 text-hologram-ice/25 text-xs">{{ item.created_at }}</td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <button @click="openDetail(item)" class="text-xs text-hologram-cyan/50 hover:text-hologram-cyan transition-colors">查看</button>
                <button @click="confirmDelete(item)" class="text-xs text-red-400/50 hover:text-red-400 transition-colors">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between mt-6">
      <span class="text-xs text-hologram-ice/25">共 {{ total }} 条</span>
      <div class="flex items-center gap-2">
        <button @click="changePage(page - 1)" :disabled="page <= 1" class="px-3 py-1.5 rounded text-xs border border-hologram-ice/[0.08] text-hologram-ice/40 disabled:opacity-20 hover:border-stellar-gold/20 transition-colors">上一页</button>
        <span class="text-xs text-hologram-ice/30">{{ page }} / {{ totalPages }}</span>
        <button @click="changePage(page + 1)" :disabled="page >= totalPages" class="px-3 py-1.5 rounded text-xs border border-hologram-ice/[0.08] text-hologram-ice/40 disabled:opacity-20 hover:border-stellar-gold/20 transition-colors">下一页</button>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="showDetail" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" @click.self="showDetail = false">
      <div class="w-full max-w-lg bg-deep-space-900 border border-hologram-ice/[0.1] rounded-2xl p-6 mx-4">
        <h2 class="text-lg font-display font-bold text-hologram-ice mb-4">留言详情</h2>
        <div class="space-y-3 text-sm">
          <div><span class="text-hologram-ice/30">发送者：</span><span class="text-hologram-ice/60">{{ detailItem?.sender_name || '匿名' }}</span></div>
          <div><span class="text-hologram-ice/30">类型：</span><span class="text-hologram-ice/60">{{ detailItem?.sender_type }}</span></div>
          <div v-if="detailItem?.sender_planet"><span class="text-hologram-ice/30">星球：</span><span class="text-hologram-ice/60">{{ detailItem?.sender_planet }}</span></div>
          <div><span class="text-hologram-ice/30">时间：</span><span class="text-hologram-ice/60">{{ detailItem?.created_at }}</span></div>
          <div>
            <span class="text-hologram-ice/30">内容：</span>
            <p class="text-hologram-ice/60 mt-1 whitespace-pre-wrap">{{ detailItem?.content }}</p>
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-hologram-ice/[0.06]">
          <button @click="showDetail = false" class="px-4 py-2 rounded-lg border border-hologram-ice/[0.08] text-sm text-hologram-ice/40 hover:text-hologram-ice/60 transition-colors">关闭</button>
        </div>
      </div>
    </div>

    <div v-if="showDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" @click.self="showDelete = false">
      <div class="bg-deep-space-900 border border-hologram-ice/[0.1] rounded-2xl p-6 mx-4 max-w-sm w-full">
        <h3 class="text-lg font-semibold text-hologram-ice mb-2">确认删除</h3>
        <p class="text-sm text-hologram-ice/40 mb-6">确定要删除此留言吗？此操作不可撤销。</p>
        <div class="flex justify-end gap-3">
          <button @click="showDelete = false" class="px-4 py-2 rounded-lg border border-hologram-ice/[0.08] text-sm text-hologram-ice/40">取消</button>
          <button @click="doDelete" :disabled="deleting" class="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/20 text-red-400 text-sm disabled:opacity-50">{{ deleting ? '删除中...' : '确认删除' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// uses default sidebar layout

const { apiFetch } = useAdminApi()
const API = '/api/admin/messages'

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(15)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

const showDetail = ref(false)
const detailItem = ref(null)

const showDelete = ref(false)
const deleteTarget = ref(null)
const deleting = ref(false)

async function fetchData() {
  try {
    const res = await apiFetch(`${API}?page=${page.value}&pageSize=${pageSize.value}`)
    list.value = res.data.list
    total.value = res.data.total
  } catch (e) { console.error(e) }
}

function changePage(p) {
  page.value = p
  fetchData()
}

function openDetail(item) {
  detailItem.value = item
  showDetail.value = true
}

function confirmDelete(item) {
  deleteTarget.value = item
  showDelete.value = true
}

async function doDelete() {
  deleting.value = true
  try {
    await apiFetch(`${API}/${deleteTarget.value.id}`, { method: 'DELETE' })
    showDelete.value = false
    fetchData()
  } catch (e) {
    alert('删除失败')
  } finally {
    deleting.value = false
  }
}

onMounted(fetchData)
</script>
