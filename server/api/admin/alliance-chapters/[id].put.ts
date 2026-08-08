import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE alliance_chapters SET chapter_num = ?, title = ?, desc = ?, content = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.chapter_num, body.title, body.desc || '', body.content, id)
  return { success: true }
})
