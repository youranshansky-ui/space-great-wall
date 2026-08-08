import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE story_chapters SET series = ?, chapter_num = ?, title = ?, desc = ?, content = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.series || 'prologue', body.chapter_num, body.title, body.desc || '', body.content, id)
  return { success: true }
})
