<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-display font-bold text-hologram-ice">旅游研学</h1>
      <button @click="openCreate" class="px-4 py-2 rounded-lg bg-stellar-gold/15 border border-stellar-gold/20 text-stellar-warm text-sm hover:bg-stellar-gold/20 transition-all">
        + 新增
      </button>
    </div>

    <div class="rounded-xl border border-hologram-ice/[0.06] bg-deep-space-800/40 overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-hologram-ice/[0.06] text-hologram-ice/30 text-left">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">编号</th>
            <th class="px-4 py-3">标题</th>
            <th class="px-4 py-3">时长</th>
            <th class="px-4 py-3">等级</th>
            <th class="px-4 py-3">预算</th>
            <th class="px-4 py-3">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id" class="border-b border-hologram-ice/[0.03] hover:bg-white/[0.01]">
            <td class="px-4 py-3 text-hologram-ice/20 font-mono text-xs">{{ item.id }}</td>
            <td class="px-4 py-3 text-hologram-ice/50 font-mono text-xs">{{ item.route_id }}</td>
            <td class="px-4 py-3 text-hologram-ice/60">{{ item.title }}</td>
            <td class="px-4 py-3 text-hologram-ice/50">{{ item.duration }}</td>
            <td class="px-4 py-3 text-hologram-ice/50">{{ item.level }}</td>
            <td class="px-4 py-3 text-hologram-ice/50">{{ item.budget }}</td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <button @click="openEdit(item)" class="text-xs text-hologram-cyan/50 hover:text-hologram-cyan transition-colors">编辑</button>
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

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" @click.self="showModal = false">
      <div class="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-deep-space-900 border border-hologram-ice/[0.1] rounded-2xl p-6 mx-4">
        <h2 class="text-lg font-display font-bold text-hologram-ice mb-6">{{ editingItem?.id ? '编辑' : '新增' }}</h2>
        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-xs text-hologram-ice/30 mb-2">编号</label>
            <input v-model="form.route_id" type="text" class="w-full px-4 py-2.5 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice text-sm outline-none focus:border-stellar-gold/30 transition-all" />
          </div>
          <div>
            <label class="block text-xs text-hologram-ice/30 mb-2">图标</label>
            <input v-model="form.icon" type="text" class="w-full px-4 py-2.5 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice text-sm outline-none focus:border-stellar-gold/30 transition-all" />
          </div>
          <div>
            <label class="block text-xs text-hologram-ice/30 mb-2">标题</label>
            <input v-model="form.title" type="text" class="w-full px-4 py-2.5 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice text-sm outline-none focus:border-stellar-gold/30 transition-all" />
          </div>
          <div>
            <label class="block text-xs text-hologram-ice/30 mb-2">时长</label>
            <input v-model="form.duration" type="text" class="w-full px-4 py-2.5 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice text-sm outline-none focus:border-stellar-gold/30 transition-all" />
          </div>
          <div>
            <label class="block text-xs text-hologram-ice/30 mb-2">等级</label>
            <input v-model="form.level" type="text" class="w-full px-4 py-2.5 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice text-sm outline-none focus:border-stellar-gold/30 transition-all" />
          </div>
          <div>
            <label class="block text-xs text-hologram-ice/30 mb-2">预算</label>
            <input v-model="form.budget" type="text" class="w-full px-4 py-2.5 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice text-sm outline-none focus:border-stellar-gold/30 transition-all" />
          </div>
          <div>
            <label class="block text-xs text-hologram-ice/30 mb-2">最大人数</label>
            <input v-model.number="form.max_people" type="number" class="w-full px-4 py-2.5 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice text-sm outline-none focus:border-stellar-gold/30 transition-all" />
          </div>
          <div>
            <label class="block text-xs text-hologram-ice/30 mb-2">描述</label>
            <textarea v-model="form.desc" rows="4" class="w-full px-4 py-2.5 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice text-sm outline-none focus:border-stellar-gold/30 transition-all resize-none" />
          </div>
          <div>
            <label class="block text-xs text-hologram-ice/30 mb-2">标签（逗号分隔）</label>
            <input v-model="form.tags" type="text" class="w-full px-4 py-2.5 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice text-sm outline-none focus:border-stellar-gold/30 transition-all" />
          </div>
          <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-hologram-ice/[0.06]">
            <button type="button" @click="showModal = false" class="px-4 py-2 rounded-lg border border-hologram-ice/[0.08] text-sm text-hologram-ice/40 hover:text-hologram-ice/60 transition-colors">取消</button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-stellar-gold/20 border border-stellar-gold/20 text-stellar-warm text-sm hover:bg-stellar-gold/30 transition-all">保存</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" @click.self="showDelete = false">
      <div class="bg-deep-space-900 border border-hologram-ice/[0.1] rounded-2xl p-6 mx-4 max-w-sm w-full">
        <h3 class="text-lg font-semibold text-hologram-ice mb-2">确认删除</h3>
        <p class="text-sm text-hologram-ice/40 mb-6">确定要删除 "{{ deleteTarget?.title }}" 吗？此操作不可撤销。</p>
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
const API = '/api/admin/travel-routes'

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(15)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

const showModal = ref(false)
const editingItem = ref(null)
const form = ref({ route_id: '', icon: '', title: '', duration: '', level: '', budget: '', max_people: 0, desc: '', tags: '' })

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

function openCreate() {
  editingItem.value = null
  form.value = { route_id: '', icon: '', title: '', duration: '', level: '', budget: '', max_people: 0, desc: '', tags: '' }
  showModal.value = true
}

function openEdit(item) {
  editingItem.value = item
  form.value = { route_id: item.route_id || '', icon: item.icon || '', title: item.title || '', duration: item.duration || '', level: item.level || '', budget: item.budget || '', max_people: item.max_people || 0, desc: item.desc || '', tags: item.tags || '' }
  showModal.value = true
}

async function save() {
  try {
    if (editingItem.value?.id) {
      await apiFetch(`${API}/${editingItem.value.id}`, { method: 'PUT', body: form.value })
    } else {
      await apiFetch(API, { method: 'POST', body: form.value })
    }
    showModal.value = false
    fetchData()
  } catch (e) {
    alert('保存失败')
  }
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
