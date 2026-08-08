import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const query = getQuery(event)
  const page = parseInt(query.page) || 1
  const pageSize = parseInt(query.pageSize) || 15
  const track = query.track || ''
  const offset = (page - 1) * pageSize

  let total, list
  if (track) {
    total = db.prepare('SELECT COUNT(*) as cnt FROM essays WHERE track = ?').get(track).cnt
    list = db.prepare('SELECT * FROM essays WHERE track = ? ORDER BY sort_order, id LIMIT ? OFFSET ?').all(track, pageSize, offset)
  } else {
    total = db.prepare('SELECT COUNT(*) as cnt FROM essays').get().cnt
    list = db.prepare('SELECT * FROM essays ORDER BY sort_order, id LIMIT ? OFFSET ?').all(pageSize, offset)
  }
  return { success: true, data: { list, total, page, pageSize } }
})
