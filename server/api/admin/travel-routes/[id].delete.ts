import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  db.prepare('DELETE FROM travel_routes WHERE id = ?').run(id)
  return { success: true }
})
