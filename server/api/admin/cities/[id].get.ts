import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const item = db.prepare('SELECT * FROM cities WHERE id = ?').get(id)
  if (!item) throw createError({ statusCode: 404, message: 'Not found' })
  return { success: true, data: item }
})
