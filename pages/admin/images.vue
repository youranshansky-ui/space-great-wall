<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-display font-bold text-hologram-ice">图片管理</h1>
    </div>

    <!-- Upload Zone -->
    <div class="rounded-xl border border-dashed border-hologram-ice/[0.1] bg-deep-space-800/20 p-8 mb-8 text-center">
      <label class="cursor-pointer">
        <div class="text-3xl mb-3 text-hologram-ice/20">☁️</div>
        <p class="text-sm text-hologram-ice/30 mb-2">点击或拖拽上传图片</p>
        <p class="text-xs text-hologram-ice/15">支持 JPG、PNG、WebP 格式</p>
        <input type="file" accept="image/*" class="hidden" @change="handleUpload" />
      </label>
      <p v-if="uploading" class="text-xs text-stellar-warm mt-3">上传中...</p>
    </div>

    <!-- Image Grid -->
    <div class="rounded-xl border border-hologram-ice/[0.06] bg-deep-space-800/40 overflow-hidden p-4">
      <div v-if="!list.length && !uploading" class="text-center py-12">
        <p class="text-hologram-ice/20 text-sm">暂无图片</p>
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <div v-for="item in list" :key="item.id" class="group relative rounded-lg border border-hologram-ice/[0.05] bg-deep-space-800/40 overflow-hidden hover:border-hologram-ice/[0.12] transition-all">
          <div class="aspect-square bg-deep-space-900 flex items-center justify-center">
            <img v-if="item.url || item.filename" :src="item.url || `/uploads/${item.filename}`" class="w-full h-full object-cover" :alt="item.original_name || item.filename" loading="lazy" />
            <span v-else class="text-hologram-ice/15 text-xs">No preview</span>
          </div>
          <div class="p-2 space-y-1">
            <p class="text-xs text-hologram-ice/50 truncate" :title="item.original_name || item.filename">{{ item.original_name || item.filename || '-' }}</p>
            <div class="flex items-center justify-between text-[10px] text-hologram-ice/25">
              <span>{{ formatSize(item.file_size) }}</span>
              <span>{{ item.created_at }}</span>
            </div>
          </div>
          <!-- Hover actions -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button v-if="item.url" @click="copyUrl(item.url)" class="px-3 py-1.5 rounded text-xs bg-white/10 border border-white/[0.08] text-hologram-ice/70 hover:bg-white/15 transition-colors">复制URL</button>
            <button @click="confirmDelete(item)" class="px-3 py-1.5 rounded text-xs bg-red-500/15 border border-red-500/15 text-red-400 hover:bg-red-500/20 transition-colors">删除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-6">
      <span class="text-xs text-hologram-ice/25">共 {{ total }} 条</span>
      <div class="flex items-center gap-2">
        <button @click="changePage(page - 1)" :disabled="page <= 1" class="px-3 py-1.5 rounded text-xs border border-hologram-ice/[0.08] text-hologram-ice/40 disabled:opacity-20 hover:border-stellar-gold/20 transition-colors">上一页</button>
        <span class="text-xs text-hologram-ice/30">{{ page }} / {{ totalPages }}</span>
        <button @click="changePage(page + 1)" :disabled="page >= totalPages" class="px-3 py-1.5 rounded text-xs border border-hologram-ice/[0.08] text-hologram-ice/40 disabled:opacity-20 hover:border-stellar-gold/20 transition-colors">下一页</button>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="showDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" @click.self="showDelete = false">
      <div class="bg-deep-space-900 border border-hologram-ice/[0.1] rounded-2xl p-6 mx-4 max-w-sm w-full">
        <h3 class="text-lg font-semibold text-hologram-ice mb-2">确认删除</h3>
        <p class="text-sm text-hologram-ice/40 mb-6">确定要删除 "{{ deleteTarget?.original_name || deleteTarget?.filename }}" 吗？此操作不可撤销。</p>
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
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(20)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

const uploading = ref(false)
const showDelete = ref(false)
const deleteTarget = ref(null)
const deleting = ref(false)

async function fetchData() {
  try {
    const res = await apiFetch(`/api/admin/images?page=${page.value}&pageSize=${pageSize.value}`)
    list.value = res.data.list
    total.value = res.data.total
  } catch (e) { console.error(e) }
}

function changePage(p) {
  page.value = p
  fetchData()
}

async function handleUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  uploading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    await apiFetch('/api/admin/upload', { method: 'POST', body: fd })
    fetchData()
  } catch (e) {
    alert('上传失败')
  } finally {
    uploading.value = false
    e.target.value = ''
  }
}

async function copyUrl(url) {
  try {
    await navigator.clipboard.writeText(url)
    alert('已复制')
  } catch (e) {
    const ta = document.createElement('textarea')
    ta.value = url
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    alert('已复制')
  }
}

function formatSize(bytes) {
  if (!bytes) return '-'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

function confirmDelete(item) {
  deleteTarget.value = item
  showDelete.value = true
}

async function doDelete() {
  deleting.value = true
  try {
    await apiFetch(`/api/admin/image-delete/${deleteTarget.value.id}`, { method: 'DELETE' })
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
