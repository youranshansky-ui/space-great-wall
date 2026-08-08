export function useAdminApi() {
  const router = useRouter()

  function getToken() {
    if (process.client) {
      return sessionStorage.getItem('admin_token') || ''
    }
    return ''
  }

  async function apiFetch<T = any>(url: string, options: any = {}): Promise<T> {
    const token = getToken()
    const headers: Record<string, string> = { ...(options.headers || {}) }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      const res = await $fetch<T>(url, {
        ...options,
        headers
      })
      return res
    } catch (e: any) {
      if (e?.response?.status === 401) {
        if (process.client) {
          sessionStorage.removeItem('admin_token')
          router.push('/admin/login')
        }
      }
      throw e
    }
  }

  return { apiFetch }
}
