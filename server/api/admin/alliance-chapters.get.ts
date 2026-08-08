import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const query = getQuery(event)
  const page = parseInt(query.page) || 1
  const pageSize = parseInt(query.pageSize) || 15
  const offset = (page - 1) * pageSize

  const total = db.prepare('SELECT COUNT(*) as cnt FROM alliance_chapters').get().cnt
  const list = db.prepare('SELECT * FROM alliance_chapters ORDER BY chapter_num LIMIT ? OFFSET ?').all(pageSize, offset)
  return { success: true, data: { list, total, page, pageSize } }
})
