import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const body = await readBody(event)
  const result = db.prepare(
    'INSERT INTO narratives (image, num, title, desc, slogan, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(body.image || '', body.num || '', body.title, body.desc || '', body.slogan || '', body.sort_order || 0)
  return { success: true, data: { id: result.lastInsertRowid } }
})
