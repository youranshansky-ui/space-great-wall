import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE narratives SET image = ?, num = ?, title = ?, desc = ?, slogan = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.image || '', body.num || '', body.title, body.desc || '', body.slogan || '', body.sort_order || 0, id)
  return { success: true }
})
