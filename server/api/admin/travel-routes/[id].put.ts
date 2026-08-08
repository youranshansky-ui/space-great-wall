import { requireAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  db.prepare(
    `UPDATE travel_routes SET route_id = ?, icon = ?, title = ?, duration = ?, level = ?, budget = ?, max_people = ?, desc = ?, tags = ?, itinerary = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(body.route_id, body.icon || '', body.title, body.duration || '', body.level || '', body.budget || '', body.max_people || 20, body.desc || '', body.tags || '[]', body.itinerary || '[]', id)
  return { success: true }
})
