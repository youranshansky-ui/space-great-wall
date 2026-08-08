import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE essays SET title = ?, author = ?, school = ?, track = ?, content = ?, image = ?, likes = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.title, body.author || '', body.school || '', body.track || '', body.content, body.image || '', body.likes || 0, body.sort_order || 0, id)
  return { success: true }
})
