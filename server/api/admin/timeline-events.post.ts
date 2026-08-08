import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const body = await readBody(event)
  const result = db.prepare(
    'INSERT INTO timeline_events (year, title, summary, content, era, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(body.year, body.title, body.summary || '', body.content || '', body.era || 'history', body.sort_order || 0)
  return { success: true, data: { id: result.lastInsertRowid } }
})
