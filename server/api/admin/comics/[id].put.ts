import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE comics SET series = ?, series_label = ?, chapter_num = ?, title = ?, desc = ?, image = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.series, body.series_label || '', body.chapter_num, body.title, body.desc || '', body.image || '', body.sort_order || 0, id)
  return { success: true }
})
