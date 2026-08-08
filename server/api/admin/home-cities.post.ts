import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const body = await readBody(event)
  const result = db.prepare(
    'INSERT INTO home_cities (name, subtitle, image, desc, sort_order) VALUES (?, ?, ?, ?, ?)'
  ).run(body.name, body.subtitle || '', body.image || '', body.desc || '', body.sort_order || 0)
  return { success: true, data: { id: result.lastInsertRowid } }
})
