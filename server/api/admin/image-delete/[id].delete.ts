import { unlink } from 'fs/promises'
import { join } from 'path'
import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')

  const image = db.prepare('SELECT * FROM images WHERE id = ?').get(id)
  if (!image) {
    throw createError({ statusCode: 404, message: 'Image not found' })
  }

  const filePath = join(process.cwd(), 'public', image.url)
  try {
    await unlink(filePath)
  } catch (e) {
    // File may not exist on disk, continue
  }

  db.prepare('DELETE FROM images WHERE id = ?').run(id)
  return { success: true }
})
