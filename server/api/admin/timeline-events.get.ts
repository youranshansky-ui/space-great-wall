import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const query = getQuery(event)
  const page = parseInt(query.page) || 1
  const pageSize = parseInt(query.pageSize) || 15
  const era = query.era || ''
  const offset = (page - 1) * pageSize

  let total, list
  if (era) {
    total = db.prepare('SELECT COUNT(*) as cnt FROM timeline_events WHERE era = ?').get(era).cnt
    list = db.prepare('SELECT * FROM timeline_events WHERE era = ? ORDER BY sort_order, year LIMIT ? OFFSET ?').all(era, pageSize, offset)
  } else {
    total = db.prepare('SELECT COUNT(*) as cnt FROM timeline_events').get().cnt
    list = db.prepare('SELECT * FROM timeline_events ORDER BY sort_order, year LIMIT ? OFFSET ?').all(pageSize, offset)
  }
  return { success: true, data: { list, total, page, pageSize } }
})
