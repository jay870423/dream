"use client";

import { useState } from "react";
import DreamCanvas from "@/components/dream-canvas";

type ArtSpec = {
  palette: string[];
  motifs: string[];
  composition: string;
  prompt: string;
  seed: number;
};

const styles = [
  "梦幻水彩",
  "剪影拼贴",
  "超现实海报",
  "纸感浮雕",
  "极简几何",
  "夜光霓虹",
];

export default function ArtPage() {
  const [dream, setDream] = useState(
    "梦到我在水面上行走，脚下的光变成了一条路。"
  );
  const [style, setStyle] = useState(styles[0]);
  const [model, setModel] = useState<"deepseek" | "qwen">("qwen");
  const [artSpec, setArtSpec] = useState<ArtSpec | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream, style, model }),
      });
      if (!response.ok) {
        throw new Error("艺术生成失败，请稍后重试。");
      }
      const data = (await response.json()) as ArtSpec;
      setArtSpec(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请重试。");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const canvas = document.getElementById("dream-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "dream-art.png";
    link.click();
  };

  return (
    <section className="shell pb-24 pt-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="card glass">
          <p className="pill">Dream Art</p>
          <h1 className="title-display mt-5 text-3xl">梦境艺术生成器</h1>
          <p className="muted mt-3 text-sm leading-relaxed">
            用 AI 解析结果转译为视觉语言。你可以把梦境转换成色彩、构图与氛围，
            并生成可下载的梦境艺术卡。
          </p>
          <div className="mt-6 space-y-4">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              梦境内容
            </label>
            <textarea
              className="min-h-[150px] w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-300"
              value={dream}
              onChange={(event) => setDream(event.target.value)}
            />
          </div>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              艺术风格
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {styles.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStyle(item)}
                  className={`rounded-full border px-3 py-2 text-xs transition ${
                    style === item
                      ? "border-orange-300 bg-orange-300/20 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/60">
            <span className="uppercase tracking-[0.3em]">Model</span>
            <button
              type="button"
              onClick={() => setModel("deepseek")}
              className={`rounded-full border px-3 py-2 ${
                model === "deepseek"
                  ? "border-orange-300 bg-orange-300/20 text-white"
                  : "border-white/10 bg-white/5 text-white/50"
              }`}
            >
              DeepSeek
            </button>
            <button
              type="button"
              onClick={() => setModel("qwen")}
              className={`rounded-full border px-3 py-2 ${
                model === "qwen"
                  ? "border-teal-300 bg-teal-300/20 text-white"
                  : "border-white/10 bg-white/5 text-white/50"
              }`}
            >
              Qwen
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn btn-primary" onClick={handleGenerate}>
              {loading ? "生成中..." : "生成梦境艺术"}
            </button>
            <button className="btn btn-ghost" onClick={() => setArtSpec(null)}>
              清空结果
            </button>
          </div>
          {error ? <p className="mt-4 text-sm text-orange-200">{error}</p> : null}
        </div>

        <div className="card">
          <p className="pill">Output</p>
          {!artSpec && (
            <div className="mt-6 text-sm text-white/60">
              <p>生成后将展示色彩、构图与梦境元素，并生成视觉卡片。</p>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  预览模块
                </p>
                <ul className="mt-3 space-y-2">
                  <li>色彩调色板</li>
                  <li>梦境元素与构图说明</li>
                  <li>可下载艺术图</li>
                </ul>
              </div>
            </div>
          )}
          {artSpec && (
            <div className="mt-6 space-y-6 text-sm">
              <DreamCanvas
                id="dream-canvas"
                seed={artSpec.seed}
                palette={artSpec.palette}
                motif={artSpec.motifs[0] ?? "Dream"}
              />
              <div className="flex flex-wrap gap-2">
                {artSpec.palette.map((color) => (
                  <div
                    key={color}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs"
                  >
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {color}
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  视觉说明
                </p>
                <p className="mt-2 text-sm">{artSpec.composition}</p>
                <p className="muted mt-2 text-xs">{artSpec.prompt}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {artSpec.motifs.map((motif) => (
                  <span
                    key={motif}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
                  >
                    {motif}
                  </span>
                ))}
              </div>
              <button className="btn btn-ghost" onClick={handleDownload}>
                下载艺术图
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
