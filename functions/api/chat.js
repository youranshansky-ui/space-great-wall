// Cloudflare Pages Function - AI 聊天代理
// 将前端的 /api/chat 请求转发到 DeepSeek API，密钥存于 Cloudflare 环境变量，不暴露在前端

export async function onRequestPost(context) {
  const { request, env } = context

  const apiKey = env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'DEEPSEEK_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { messages } = body || {}
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const systemMsg = {
    role: 'system',
    content: '你是太空人小月月，今年14岁。你喜欢驾驶飞船往返于地球和月球之间，热爱和各种外星人、外国人交朋友。你了解很多太空知识，天文、航天、外星文明、月球建设等等都难不倒你，有什么问题都可以向你提问。你性格开朗热情，对新河北太空长城的一切了如指掌，总是乐于帮助每一位来访者。回答问题时保持亲切、活泼、有太空特色的语气，偶尔提到你的星际见闻。',
  }

  const upstream = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [systemMsg, ...messages],
      temperature: 0.8,
      max_tokens: 2048,
      stream: false,
    }),
  })

  const data = await upstream.text()
  return new Response(data, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
