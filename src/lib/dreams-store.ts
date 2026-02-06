import { kv } from "@vercel/kv";

export type DreamEntry = {
  id: string;
  title: string;
  dream: string;
  region: string;
  createdAt: string;
  isPublic: boolean;
};

const KV_KEY = "dreams:v1";

const useKv =
  Boolean(process.env.KV_REST_API_URL) &&
  Boolean(process.env.KV_REST_API_TOKEN);

declare global {
  var __dreamStore: DreamEntry[] | undefined;
}

const memoryStore = globalThis.__dreamStore ?? [];
if (!globalThis.__dreamStore) {
  globalThis.__dreamStore = memoryStore;
}

export async function addDream(entry: DreamEntry) {
  if (useKv) {
    await kv.lpush(KV_KEY, JSON.stringify(entry));
    await kv.ltrim(KV_KEY, 0, 199);
    return;
  }
  memoryStore.unshift(entry);
  memoryStore.splice(200);
}

export async function listDreams(): Promise<DreamEntry[]> {
  if (useKv) {
    const items = await kv.lrange<string>(KV_KEY, 0, 199);
    return items
      .map((item) => {
        try {
          return JSON.parse(item) as DreamEntry;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as DreamEntry[];
  }
  return memoryStore;
}

export async function aggregateRegions() {
  const dreams = await listDreams();
  const map = new Map<string, number>();
  dreams.forEach((dream) => {
    if (!dream.isPublic) return;
    map.set(dream.region, (map.get(dream.region) ?? 0) + 1);
  });
  return Array.from(map.entries()).map(([region, count]) => ({
    region,
    count,
  }));
}
