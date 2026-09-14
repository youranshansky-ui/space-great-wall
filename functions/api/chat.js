// Cloudflare Pages Function - AI 聊天代理（流式转发）
// 将前端的 /api/chat 请求转发到 DeepSeek API，密钥存于 Cloudflare 环境变量，不暴露在前端
// 采用 stream: true，让 DeepSeek 逐字返回，避免长时间等待导致 Cloudflare 函数超时

export async function onRequestPost(context) {
  const { request, env } = context

  const apiKey = env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return json({ error: 'DEEPSEEK_API_KEY not configured' }, 500)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const { messages } = body || {}
  if (!messages || !Array.isArray(messages)) {
    return json({ error: 'messages array required' }, 400)
  }

  const systemMsg = {
    role: 'system',
    content: '你是太空人小月月，今年14岁。你喜欢驾驶飞船往返于地球和月球之间，热爱和各种外星人、外国人交朋友。你了解很多太空知识，天文、航天、外星文明、月球建设等等都难不倒你，有什么问题都可以向你提问。你性格开朗热情，对新河北太空长城的一切了如指掌，总是乐于帮助每一位来访者。回答问题时保持亲切、活泼、有太空特色的语气，偶尔提到你的星际见闻。回答请控制在 300 字以内。',
  }

  // 限制历史消息，避免请求体过大、生成过慢
  const history = messages.slice(-10)

  let upstream
  try {
    upstream = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [systemMsg, ...history],
        temperature: 0.8,
        max_tokens: 800,
        stream: true,
      }),
    })
  } catch (err) {
    return json({ error: '上游服务连接失败：' + (err?.message || 'unknown') }, 502)
  }

  if (!upstream.ok) {
    const data = await upstream.text()
    return json({ error: parseUpstreamError(data, upstream.status) }, upstream.status)
  }

  // 将 DeepSeek 的 SSE 流原样转发给前端
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  })
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function parseUpstreamError(data, status) {
  try {
    const parsed = JSON.parse(data)
    if (parsed?.error?.message) return parsed.error.message
    if (parsed?.error && typeof parsed.error === 'string') return parsed.error
    return JSON.stringify(parsed)
  } catch {
    return `上游返回错误（HTTP ${status}）`
  }
}
