import { randomUUID } from "crypto";
import { addDream, aggregateRegions, listDreams } from "@/lib/dreams-store";

export const runtime = "nodejs";

export async function GET() {
  const regions = await aggregateRegions();
  const recent = (await listDreams())
    .filter((dream) => dream.isPublic)
    .slice(0, 6);
  return Response.json({ regions, recent });
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    title?: string;
    dream?: string;
    region?: string;
    isPublic?: boolean;
  };
  if (!body.title || !body.dream || !body.region) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const entry = {
    id: randomUUID(),
    title: body.title,
    dream: body.dream,
    region: body.region,
    createdAt: new Date().toISOString(),
    isPublic: body.isPublic ?? true,
  };
  await addDream(entry);
  return Response.json({ ok: true });
}
