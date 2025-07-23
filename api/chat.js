// /api/chat.js
// 这是一个在Vercel平台上运行的无服务器函数

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // 从请求中获取用户输入
  const { prompt } = await req.json();

  // 关键：从环境变量中安全地读取API密钥
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OpenAI API key not found.' }), { status: 500 });
  }

  // 这是你给AI的"人设"定义，告诉它应该扮演什么角色
  // 请务必用你自己的真实信息填充！
  const systemPrompt = `你是我的个人AI助手。你的任务是根据我提供的信息，友好、专业地回答关于我的问题。
  我的信息如下：
  - 姓名: [你的名字]
  - 职业: [你的职业，例如：软件工程师]
  - 教育背景: 毕业于[你的大学]，专业是[你的专业]。
  - 主要项目: [项目A的简短描述]，[项目B的简短描述]。
  - 技术栈: [你的技能，例如：JavaScript, React, Node.js, Python]。
  - 兴趣爱好: [你的爱好，例如：篮球，阅读，旅行]。
  如果被问到这些信息以外的内容，请礼貌地回答你只被授权讨论我的专业背景。`;

  try {
    // 调用OpenAI的Chat Completions API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // 或 'gpt-4'
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to call OpenAI API.' }), { status: 500 });
  }
}
