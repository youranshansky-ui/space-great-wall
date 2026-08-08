import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const body = await readBody(event)
  const result = db.prepare(
    'INSERT INTO technologies (tech_id, icon, name, subtitle, city, content, metrics, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(body.tech_id, body.icon || '', body.name, body.subtitle || '', body.city || '', body.content, body.metrics || '[]', body.sort_order || 0)
  return { success: true, data: { id: result.lastInsertRowid } }
})
