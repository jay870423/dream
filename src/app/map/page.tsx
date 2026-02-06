"use client";

import { useEffect, useState } from "react";
import DreamMap from "@/components/dream-map";

type DreamEntry = {
  id: string;
  title: string;
  dream: string;
  region: string;
  createdAt: string;
};

type MapResponse = {
  regions: { region: string; count: number }[];
  recent: DreamEntry[];
};

const regionOptions = [
  "北美",
  "南美",
  "欧洲",
  "非洲",
  "中东",
  "东亚",
  "南亚",
  "大洋洲",
];

export default function MapPage() {
  const [title, setTitle] = useState("梦到海风吹开一扇门");
  const [dream, setDream] = useState(
    "我在海边的城市里奔跑，建筑像折叠的纸一样展开。"
  );
  const [region, setRegion] = useState(regionOptions[5]);
  const [data, setData] = useState<MapResponse>({
    regions: [],
    recent: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const response = await fetch("/api/dreams");
    if (response.ok) {
      const payload = (await response.json()) as MapResponse;
      setData(payload);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/dreams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        dream,
        region,
        isPublic: true,
      }),
    });
    await fetchData();
    setLoading(false);
  };

  return (
    <section className="shell pb-24 pt-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="card glass">
          <p className="pill">Dream Map</p>
          <h1 className="title-display mt-5 text-3xl">梦境地图</h1>
          <p className="muted mt-3 text-sm leading-relaxed">
            把梦境作为空间坐标，让潜意识的情绪在地图上留下足迹。
          </p>
          <div className="mt-6">
            <DreamMap data={data.regions} />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {data.regions.map((item) => (
              <div
                key={item.region}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {item.region}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {item.count} 次梦境
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="pill">Add Dream</p>
          <h2 className="title-display mt-5 text-2xl">添加新的梦境坐标</h2>
          <p className="muted mt-3 text-sm leading-relaxed">
            选择你所在的区域，将梦境记录进地图。公开记录仅展示摘要。
          </p>
          <div className="mt-6 space-y-4">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              梦境标题
            </label>
            <input
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-300"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              梦境摘要
            </label>
            <textarea
              className="min-h-[120px] w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-300"
              value={dream}
              onChange={(event) => setDream(event.target.value)}
            />
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              区域
            </label>
            <div className="flex flex-wrap gap-2">
              {regionOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRegion(item)}
                  className={`rounded-full border px-3 py-2 text-xs transition ${
                    region === item
                      ? "border-orange-300 bg-orange-300/20 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {loading ? "保存中..." : "保存到梦境地图"}
            </button>
          </div>
          <div className="mt-8 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              最近记录
            </p>
            {data.recent.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{item.region}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 font-semibold">{item.title}</p>
                <p className="muted mt-1 text-xs">{item.dream}</p>
              </div>
            ))}
            {!data.recent.length && (
              <p className="text-sm text-white/50">还没有公开梦境记录。</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
