import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const query = getQuery(event)
  const page = parseInt(query.page) || 1
  const pageSize = parseInt(query.pageSize) || 20
  const offset = (page - 1) * pageSize

  const total = db.prepare('SELECT COUNT(*) as cnt FROM images').get().cnt
  const list = db.prepare('SELECT * FROM images ORDER BY created_at DESC LIMIT ? OFFSET ?').all(pageSize, offset)

  return { success: true, data: { list, total, page, pageSize } }
})
