import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const body = await readBody(event)
  const result = db.prepare(
    'INSERT INTO travel_routes (route_id, icon, title, duration, level, budget, max_people, desc, tags, itinerary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(body.route_id, body.icon || '', body.title, body.duration || '', body.level || '', body.budget || '', body.max_people || 20, body.desc || '', body.tags || '[]', body.itinerary || '[]')
  return { success: true, data: { id: result.lastInsertRowid } }
})
