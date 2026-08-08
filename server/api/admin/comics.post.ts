import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const body = await readBody(event)
  const result = db.prepare(
    'INSERT INTO comics (series, series_label, chapter_num, title, desc, image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(body.series, body.series_label || '', body.chapter_num, body.title, body.desc || '', body.image || '', body.sort_order || 0)
  return { success: true, data: { id: result.lastInsertRowid } }
})
