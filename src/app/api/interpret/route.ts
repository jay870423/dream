import { chatCompletion, extractJson } from "@/lib/llm";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    dream?: string;
    mood?: string;
    tone?: string;
    model?: "deepseek" | "qwen";
  };

  const dream = body.dream?.trim();
  if (!dream) {
    return Response.json({ error: "Missing dream" }, { status: 400 });
  }

  const provider = body.model === "qwen" ? "qwen" : "deepseek";

  const system = [
    "You are a dream interpreter.",
    "Return a JSON object with keys:",
    "title, summary, themes (string[]), emotions (string[]),",
    "symbols (array of {symbol, meaning}), actions (string[]),",
    "light (string), shadow (string).",
    "Keep content in Chinese, concise, empathetic, and practical.",
  ].join(" ");

  const user = [
    `Dream: ${dream}`,
    `Mood: ${body.mood ?? ""}`,
    `Tone: ${body.tone ?? ""}`,
  ].join("\n");

  const content = await chatCompletion({
    provider,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.7,
  });

  const fallback = {
    title: "梦境解析",
    summary: "梦境包含情绪与变化的信号，提示你关注当前的转折。",
    themes: ["变化", "情绪"],
    emotions: ["好奇", "不安"],
    symbols: [{ symbol: "场景", meaning: "象征内在关注点的变化" }],
    actions: ["记录近期的关键事件", "保持与自我的对话"],
    light: "你愿意面对变化并寻找新的节奏。",
    shadow: "对未知的担忧仍在影响你的安全感。",
  };

  const data = extractJson(content, fallback);
  return Response.json(data);
}
