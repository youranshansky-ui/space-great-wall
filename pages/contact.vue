<template>
  <div class="page-container">
    <PageHero title="联系我们" subtitle="跨越地月距离，我们始终在线" />

    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <h3 class="text-xl font-display font-bold text-hologram-ice mb-8">联络信息</h3>
            <div class="space-y-4">
              <div class="holo-panel p-5">
                <h4 class="text-xs font-semibold text-stellar-warm/80 tracking-widest mb-1">月球基地</h4>
                <p class="text-sm text-hologram-ice/45">新河北 · 新唐山市 · 太空长城大道1号</p>
              </div>
              <div class="holo-panel p-5">
                <h4 class="text-xs font-semibold text-stellar-warm/80 tracking-widest mb-1">地球联络处</h4>
                <p class="text-sm text-hologram-ice/45">中国 · 河北省 · 承德市 · 河北长城</p>
              </div>
              <div class="holo-panel p-5">
                <h4 class="text-xs font-semibold text-stellar-warm/80 tracking-widest mb-1">电子邮箱</h4>
                <p class="text-sm text-stellar-warm/60">contact@spacegreatwall.org</p>
              </div>
              <div class="flex gap-3 mt-5">
                <div class="px-4 py-2 rounded-lg border border-hologram-cyan/8 text-xs text-hologram-ice/40 hover:border-stellar-gold/20 hover:text-stellar-warm/80 transition-all cursor-pointer">微信公众号</div>
                <div class="px-4 py-2 rounded-lg border border-hologram-cyan/8 text-xs text-hologram-ice/40 hover:border-stellar-gold/20 hover:text-stellar-warm/80 transition-all cursor-pointer">微博</div>
                <div class="px-4 py-2 rounded-lg border border-hologram-cyan/8 text-xs text-hologram-ice/40 hover:border-stellar-gold/20 hover:text-stellar-warm/80 transition-all cursor-pointer">Bilibili</div>
              </div>
            </div>
          </div>

          <div class="holo-panel p-8">
            <h3 class="text-xl font-display font-bold text-hologram-ice mb-6">发送消息</h3>
            <form @submit.prevent="submitForm" class="space-y-5">
              <div>
                <label class="block text-[11px] text-hologram-ice/30 tracking-widest mb-1.5">您的名字</label>
                <input v-model="form.name" type="text" required class="w-full px-4 py-3 rounded-lg bg-deep-space-800 border border-hologram-cyan/5 text-hologram-ice text-sm placeholder-hologram-ice/15 focus:outline-none focus:border-stellar-gold/25 transition-all" placeholder="请输入您的名字" />
              </div>
              <div>
                <label class="block text-[11px] text-hologram-ice/30 tracking-widest mb-1.5">电子邮箱</label>
                <input v-model="form.email" type="email" required class="w-full px-4 py-3 rounded-lg bg-deep-space-800 border border-hologram-cyan/5 text-hologram-ice text-sm placeholder-hologram-ice/15 focus:outline-none focus:border-stellar-gold/25 transition-all" placeholder="your@email.com" />
              </div>
              <div>
                <label class="block text-[11px] text-hologram-ice/30 tracking-widest mb-1.5">消息内容</label>
                <textarea v-model="form.message" required rows="5" class="w-full px-4 py-3 rounded-lg bg-deep-space-800 border border-hologram-cyan/5 text-hologram-ice text-sm placeholder-hologram-ice/15 focus:outline-none focus:border-stellar-gold/25 transition-all resize-none" placeholder="请写下您想说的话..."></textarea>
              </div>
              <button type="submit" :disabled="submitting" class="btn-primary w-full justify-center disabled:opacity-40">发送消息 → 月球基地</button>
              <p v-if="success" class="text-xs text-stellar-warm/70 text-center mt-2">消息已发出，将通过地月通讯链路送达月球基地！</p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Message Board -->
    <section class="py-16">
      <div class="max-w-2xl mx-auto px-6 lg:px-8">
        <SectionTitle>留言板</SectionTitle>
        <p class="text-center text-hologram-ice/30 text-xs mb-10">写下你想对太空长城说的话。每一条留言都会通过地月通讯链路送达月球基地。</p>

        <div class="holo-panel p-5 mb-8">
          <form @submit.prevent="postMessage" class="flex flex-col sm:flex-row gap-3">
            <input v-model="msgForm.nickname" required placeholder="昵称" class="flex-1 px-4 py-2.5 rounded-lg bg-deep-space-800 border border-hologram-cyan/5 text-hologram-ice text-sm placeholder-hologram-ice/15 focus:outline-none focus:border-stellar-gold/25" />
            <input v-model="msgForm.content" required placeholder="写点什么..." class="flex-[2] px-4 py-2.5 rounded-lg bg-deep-space-800 border border-hologram-cyan/5 text-hologram-ice text-sm placeholder-hologram-ice/15 focus:outline-none focus:border-stellar-gold/25" />
            <button type="submit" :disabled="msgSubmitting" class="btn-primary disabled:opacity-40 whitespace-nowrap">留言</button>
          </form>
        </div>

        <div class="space-y-3">
          <div v-for="msg in messages" :key="msg.id" class="holo-panel p-4">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-sm font-medium text-stellar-warm/80">{{ msg.nickname }}</span>
              <span class="text-[10px] text-hologram-ice/20">{{ formatTime(msg.created_at) }}</span>
            </div>
            <p class="text-xs text-hologram-ice/45">{{ msg.content }}</p>
          </div>
          <div v-if="messages.length === 0 && !loading" class="text-center py-10">
            <p class="text-hologram-ice/20 text-xs">还没有留言，成为第一个写下心声的人吧</p>
          </div>
          <div v-if="loading" class="text-center py-10">
            <p class="text-hologram-ice/20 text-xs">加载中...</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const form = reactive({ name: '', email: '', message: '' })
const submitting = ref(false)
const success = ref(false)
const msgForm = reactive({ nickname: '', content: '' })
const msgSubmitting = ref(false)
const messages = ref([])
const loading = ref(true)

function formatTime(d) { if (!d) return ''; const dt = new Date(d); return dt.toLocaleDateString('zh-CN') + ' ' + dt.toLocaleTimeString('zh-CN', { hour:'2-digit', minute:'2-digit' }) }

async function submitForm() {
  submitting.value = true; success.value = false
  try { await $fetch('/api/contact', { method:'POST', body:form }); success.value = true; form.name = ''; form.email = ''; form.message = '' } catch {}
  submitting.value = false
}

async function postMessage() {
  msgSubmitting.value = true
  try { await $fetch('/api/messages', { method:'POST', body:{ nickname: msgForm.nickname, content: msgForm.content } }); msgForm.nickname = ''; msgForm.content = ''; await fetchMessages() } catch {}
  msgSubmitting.value = false
}

async function fetchMessages() {
  loading.value = true
  try { messages.value = await $fetch('/api/messages') || [] } catch {}
  loading.value = false
}

onMounted(fetchMessages)
</script>
