<template>
  <div class="min-h-screen bg-deep-space-950 flex items-center justify-center relative overflow-hidden">
    <!-- Ambient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-deep-space-950 via-cosmic-cobalt to-deep-space-950" />
    <div class="absolute inset-0 opacity-20" style="background: radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.08) 0%, transparent 70%);" />

    <div class="relative z-10 w-full max-w-md mx-4">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-display font-bold text-hologram-ice tracking-wider mb-2">太空长城</h1>
        <p class="text-sm text-hologram-ice/30 tracking-widest">管理后台</p>
      </div>

      <form @submit.prevent="login" class="bg-deep-space-900/60 backdrop-blur-xl border border-hologram-ice/[0.08] rounded-2xl p-8 space-y-6">
        <div>
          <label class="block text-xs text-hologram-ice/30 mb-2 tracking-wider">管理员密码</label>
          <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            class="w-full px-4 py-3 rounded-lg bg-deep-space-800/60 border border-hologram-ice/[0.1] text-hologram-ice placeholder-hologram-ice/15 text-sm outline-none focus:border-stellar-gold/30 focus:ring-1 focus:ring-stellar-gold/10 transition-all"
            :disabled="loading"
          />
        </div>

        <p v-if="error" class="text-xs text-red-400/80">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading || !password"
          class="w-full py-3 rounded-lg bg-stellar-gold/15 border border-stellar-gold/20 text-stellar-warm text-sm font-medium hover:bg-stellar-gold/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed tracking-wider"
        >
          {{ loading ? '登录中...' : '进入后台' }}
        </button>
      </form>

      <p class="text-center mt-6 text-xs text-hologram-ice/15">
        Space Great Wall &copy; {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const password = ref('')
const loading = ref(false)
const error = ref('')

async function login() {
  if (!password.value) return
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch('/api/admin/login', {
      method: 'POST',
      body: { password: password.value }
    })
    if (res.success && res.data?.token) {
      sessionStorage.setItem('admin_token', res.data.token)
      await navigateTo('/admin')
    } else {
      error.value = '密码错误'
    }
  } catch (e) {
    error.value = e?.data?.message || '登录失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>
