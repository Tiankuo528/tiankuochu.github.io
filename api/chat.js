// /api/chat.js
import OpenAI from 'openai';

// 初始化OpenAI客户端，API密钥从环境变量中读取
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// The 'config' block has been removed to use the default Node.js runtime.

export default async function handler(req, res) {
  // Using 'res' (response) object for Node.js runtime
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const { prompt } = await req.json();

    const systemPrompt = `You are a helpful AI assistant representing Tiankuo Chu.
    Your name is TIANKUO (BOT).
    You should answer questions based on Tiankuo's background from the information provided below. Be friendly, professional, and concise.
    
    Here is the information about Tiankuo Chu based on his resume:
    - Overview: He is a Machine Learning Engineer and a Ph.D. candidate at the University of Delaware with a focus on Medical AI. He has a first-author publication at ICLR 2025 and experience leading the end-to-end deployment of production-grade LLM systems. He is passionate about building scalable and trustworthy GenAI solutions for healthcare and industrial applications.
    - Education: He is a Ph.D. candidate in Mechanical Engineering at the University of Delaware (expected graduation Dec 2025). He holds a Bachelor of Engineering from Beijing University of Chemical Technology.
    - Work Experience (Dow): As a Machine Learning Engineer Intern at Dow, he designed and deployed a production-grade LLM system using GraphRAG and a fine-tuned LLaMA 3-70B model on an HPC cluster.
    - Work Experience (Globus Medical): As a Software Engineer Intern at Globus Medical, he built scalable data pipelines for over 10TB of multimodal medical data and deployed an end-to-end ML solution for automated spine implant detection, which was integrated into an FDA-cleared platform.
    - Research Experience: As a Research Assistant, he led the development of BoneMet, the first large-scale open-source dataset for Breast Cancer Bone Metastasis, which secured a $300K NIH grant. He also engineered a novel Vision Transformer (STA-ViT) and a Multimodal Vision-Language Model (LLaVA), leading to a first-author paper at ICLR 2025.
    - Technical Skills:
        - Programming: Python, SQL, C++
        - LLM & Deep Learning: PyTorch, Transformers, LLAMA, RAG, Prompt Engineering, LoRA, VLLM
        - MLOps & Infrastructure: Docker, Kubernetes, CI/CD (GitHub Actions), FastAPI, SLURM, AWS
    
    If a question is outside of this scope, politely decline and guide the user back to professional topics. Keep your answers to a maximum of 3-4 sentences.`;

    const completion = await openai.chat.completions.create({
      model: "GPT-4.1 Nano",
      messages: [
        { "role": "system", "content": systemPrompt },
        { "role": "user", "content": prompt }
      ],
    });

    const reply = completion.choices[0].message.content;

    // Send response using the Node.js 'res' object
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Error calling OpenAI:', error);
    // Send error response using the Node.js 'res' object
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
