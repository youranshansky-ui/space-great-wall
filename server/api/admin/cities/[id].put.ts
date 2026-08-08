import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE cities SET name = ?, subtitle = ?, image = ?, desc = ?, type = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.name, body.subtitle || '', body.image || '', body.desc || '', body.type || 'city', body.sort_order || 0, id)
  return { success: true }
})
