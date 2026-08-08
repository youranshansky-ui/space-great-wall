import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const body = await readBody(event)
  const result = db.prepare(
    'INSERT INTO essays (title, author, school, track, content, image, likes, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(body.title, body.author || '', body.school || '', body.track || '', body.content, body.image || '', body.likes || 0, body.sort_order || 0)
  return { success: true, data: { id: result.lastInsertRowid } }
})
