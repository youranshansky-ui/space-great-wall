export default defineNuxtRouteMiddleware((to) => {
  // Admin auth disabled - direct access allowed
  if (to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
