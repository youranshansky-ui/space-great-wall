import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const query = getQuery(event)
  const page = parseInt(query.page) || 1
  const pageSize = parseInt(query.pageSize) || 15
  const series = query.series || 'prologue'
  const offset = (page - 1) * pageSize

  const total = db.prepare('SELECT COUNT(*) as cnt FROM story_chapters WHERE series = ?').get(series).cnt
  const list = db.prepare('SELECT * FROM story_chapters WHERE series = ? ORDER BY chapter_num LIMIT ? OFFSET ?').all(series, pageSize, offset)
  return { success: true, data: { list, total, page, pageSize } }
})
