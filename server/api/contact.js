export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, message: 'Method not allowed' })
  }

  const body = await readBody(event)
  if (!body.name || !body.email || !body.message) {
    throw createError({ statusCode: 400, message: 'All fields are required' })
  }

  // In production, this would send an email or store in database
  return { success: true, message: 'Message sent to Moon Base' }
})
