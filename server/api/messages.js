import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')
const DB_FILE = join(DATA_DIR, 'messages.json')

function readMessages() {
  try {
    if (!existsSync(DB_FILE)) return []
    const raw = readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeMessages(messages) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(DB_FILE, JSON.stringify(messages, null, 2), 'utf-8')
}

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return readMessages().sort((a, b) => b.id - a.id).slice(0, 50)
  }

  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.nickname || !body.content) {
      throw createError({ statusCode: 400, message: 'Nickname and content are required' })
    }
    const messages = readMessages()
    const newMsg = {
      id: Date.now(),
      nickname: body.nickname,
      content: body.content,
      created_at: new Date().toISOString()
    }
    messages.push(newMsg)
    writeMessages(messages)
    return { id: newMsg.id }
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})
