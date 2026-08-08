import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { existsSync } from 'fs'
import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const file = formData[0]
  if (!file.filename) {
    throw createError({ statusCode: 400, message: 'Invalid file' })
  }

  const ext = extname(file.filename).toLowerCase()
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp3', '.wav', '.ogg', '.mp4', '.webm']
  if (!allowedTypes.includes(ext)) {
    throw createError({ statusCode: 400, message: 'File type not allowed' })
  }

  const uploadDir = join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 8)
  const filename = `${timestamp}-${randomStr}${ext}`
  const filePath = join(uploadDir, filename)

  await writeFile(filePath, file.data)

  const db = getDb()
  const result = db.prepare(
    'INSERT INTO images (filename, original_name, file_size, mime_type, url) VALUES (?, ?, ?, ?, ?)'
  ).run(filename, file.filename, file.data.length, file.type || '', `/uploads/${filename}`)

  return {
    success: true,
    data: {
      id: result.lastInsertRowid,
      filename,
      original_name: file.filename,
      file_size: file.data.length,
      url: `/uploads/${filename}`
    }
  }
})
