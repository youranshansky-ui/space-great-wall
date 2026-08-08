import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE technologies SET tech_id = ?, icon = ?, name = ?, subtitle = ?, city = ?, content = ?, metrics = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.tech_id, body.icon || '', body.name, body.subtitle || '', body.city || '', body.content, body.metrics || '[]', body.sort_order || 0, id)
  return { success: true }
})
