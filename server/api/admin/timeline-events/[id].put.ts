import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE timeline_events SET year = ?, title = ?, summary = ?, content = ?, era = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.year, body.title, body.summary || '', body.content || '', body.era || 'history', body.sort_order || 0, id)
  return { success: true }
})
