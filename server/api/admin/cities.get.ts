import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const query = getQuery(event)
  const page = parseInt(query.page) || 1
  const pageSize = parseInt(query.pageSize) || 15
  const type = query.type || ''
  const offset = (page - 1) * pageSize

  let total, list
  if (type) {
    total = db.prepare('SELECT COUNT(*) as cnt FROM cities WHERE type = ?').get(type).cnt
    list = db.prepare('SELECT * FROM cities WHERE type = ? ORDER BY sort_order, id LIMIT ? OFFSET ?').all(type, pageSize, offset)
  } else {
    total = db.prepare('SELECT COUNT(*) as cnt FROM cities').get().cnt
    list = db.prepare('SELECT * FROM cities ORDER BY sort_order, id LIMIT ? OFFSET ?').all(pageSize, offset)
  }
  return { success: true, data: { list, total, page, pageSize } }
})
