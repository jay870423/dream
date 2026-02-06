import { lookupSymbol } from "@/lib/dictionary";
import { chatCompletion, extractJson } from "@/lib/llm";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    symbol?: string;
    model?: "deepseek" | "qwen";
  };
  const symbol = body.symbol?.trim();
  if (!symbol) {
    return Response.json({ error: "Missing symbol" }, { status: 400 });
  }

  const local = lookupSymbol(symbol);
  if (local) {
    return Response.json({ ...local, source: "local" });
  }

  const provider = body.model === "qwen" ? "qwen" : "deepseek";
  const system = [
    "You are a dream symbol dictionary.",
    "Return JSON with keys: symbol, meaning, actions (string[]).",
    "Keep response in Chinese.",
  ].join(" ");

  const content = await chatCompletion({
    provider,
    messages: [
      { role: "system", content: system },
      { role: "user", content: `Symbol: ${symbol}` },
    ],
    temperature: 0.6,
  });

  const fallback = {
    symbol,
    meaning: "这是一个指向内在变化的象征。",
    actions: ["记录最近的感受", "保持开放的观察"],
  };

  const data = extractJson(content, fallback);
  return Response.json({ ...data, source: "ai" });
}
