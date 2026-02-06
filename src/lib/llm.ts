type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type Provider = "deepseek" | "qwen";

const MODEL_MAP: Record<Provider, string> = {
  deepseek: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
  qwen: process.env.QWEN_MODEL ?? "qwen-plus",
};

const BASE_URL_MAP: Record<Provider, string> = {
  deepseek: process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
  qwen:
    process.env.QWEN_BASE_URL ??
    "https://dashscope.aliyuncs.com/compatible-mode/v1",
};

const KEY_MAP: Record<Provider, string | undefined> = {
  deepseek: process.env.DEEPSEEK_API_KEY,
  qwen: process.env.QWEN_API_KEY,
};

export async function chatCompletion(options: {
  provider: Provider;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}) {
  const { provider, messages, temperature = 0.7, maxTokens = 800 } = options;
  const apiKey = KEY_MAP[provider];
  if (!apiKey) {
    throw new Error(`Missing API key for ${provider}`);
  }
  const response = await fetch(`${BASE_URL_MAP[provider]}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL_MAP[provider],
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`${provider} error: ${errText}`);
  }

  const payload = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = payload.choices?.[0]?.message?.content ?? "";
  return content.trim();
}

export function extractJson<T>(content: string, fallback: T): T {
  try {
    return JSON.parse(content) as T;
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]) as T;
      } catch {
        return fallback;
      }
    }
    return fallback;
  }
}
