import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const body = await readBody(event)
  const result = db.prepare(
    'INSERT INTO alliance_chapters (chapter_num, title, desc, content) VALUES (?, ?, ?, ?)'
  ).run(body.chapter_num, body.title, body.desc || '', body.content)
  return { success: true, data: { id: result.lastInsertRowid } }
})
