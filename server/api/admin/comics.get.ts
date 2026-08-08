import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const query = getQuery(event)
  const page = parseInt(query.page) || 1
  const pageSize = parseInt(query.pageSize) || 15
  const series = query.series || ''
  const offset = (page - 1) * pageSize

  let total, list
  if (series) {
    total = db.prepare('SELECT COUNT(*) as cnt FROM comics WHERE series = ?').get(series).cnt
    list = db.prepare('SELECT * FROM comics WHERE series = ? ORDER BY chapter_num LIMIT ? OFFSET ?').all(series, pageSize, offset)
  } else {
    total = db.prepare('SELECT COUNT(*) as cnt FROM comics').get().cnt
    list = db.prepare('SELECT * FROM comics ORDER BY series, chapter_num LIMIT ? OFFSET ?').all(pageSize, offset)
  }
  return { success: true, data: { list, total, page, pageSize } }
})
