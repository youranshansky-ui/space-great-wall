import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE home_cities SET name = ?, subtitle = ?, image = ?, desc = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.name, body.subtitle || '', body.image || '', body.desc || '', body.sort_order || 0, id)
  return { success: true }
})
