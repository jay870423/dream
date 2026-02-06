import { chatCompletion, extractJson } from "@/lib/llm";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    dream?: string;
    style?: string;
    model?: "deepseek" | "qwen";
  };

  const dream = body.dream?.trim();
  if (!dream) {
    return Response.json({ error: "Missing dream" }, { status: 400 });
  }

  const provider = body.model === "deepseek" ? "deepseek" : "qwen";
  const system = [
    "You are a visual art director for dreams.",
    "Return JSON with keys: palette (hex colors array), motifs (string[]),",
    "composition (string), prompt (string), seed (number).",
    "Palette should contain 4-6 colors.",
    "Keep text in Chinese.",
  ].join(" ");

  const user = [
    `Dream: ${dream}`,
    `Style: ${body.style ?? ""}`,
  ].join("\n");

  const content = await chatCompletion({
    provider,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.8,
  });

  const fallback = {
    palette: ["#ff6f3c", "#f7c59f", "#1b998b", "#0b0c10", "#f6f1e9"],
    motifs: ["潮水", "路面", "光点"],
    composition: "中央留白，左右延展出流动的光路，整体偏梦幻。",
    prompt: "梦境水面上的光路，微粒与雾气营造安静氛围。",
    seed: Math.floor(Math.random() * 10000),
  };

  const data = extractJson(content, fallback);
  if (!data.seed) {
    data.seed = Math.floor(Math.random() * 10000);
  }
  return Response.json(data);
}
