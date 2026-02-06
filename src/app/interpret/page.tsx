"use client";

import { useMemo, useState } from "react";

type Interpretation = {
  title: string;
  summary: string;
  themes: string[];
  emotions: string[];
  symbols: { symbol: string; meaning: string }[];
  actions: string[];
  light: string;
  shadow: string;
};

const moodOptions = [
  "潮湿",
  "兴奋",
  "迷惘",
  "温柔",
  "焦灼",
  "超现实",
  "复古",
];

const toneOptions = [
  "现实感强",
  "抽象感强",
  "故事性强",
  "片段感强",
];

const sampleDreams = [
  "梦到在旧影院里寻找座位，灯光像海浪一样起伏。",
  "我在高楼之间漂浮，手里握着一束发光的草。",
  "梦见家里被森林包围，窗外有一列安静的火车。",
];

export default function InterpretPage() {
  const [dream, setDream] = useState(sampleDreams[0]);
  const [mood, setMood] = useState(moodOptions[0]);
  const [tone, setTone] = useState(toneOptions[0]);
  const [model, setModel] = useState<"deepseek" | "qwen">("deepseek");
  const [result, setResult] = useState<Interpretation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hint = useMemo(() => {
    return `梦境关键词：${mood} · ${tone}`;
  }, [mood, tone]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream, mood, tone, model }),
      });
      if (!response.ok) {
        throw new Error("解梦服务暂时不可用，请稍后再试。");
      }
      const data = (await response.json()) as Interpretation;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "解梦失败，请重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="shell pb-24 pt-12">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="card glass">
          <p className="pill">Interpret</p>
          <h1 className="title-display mt-5 text-3xl">
            梦境工作台 · 解梦模块
          </h1>
          <p className="muted mt-3 text-sm leading-relaxed">
            以结构化视角拆解梦境，输出象征、情绪轨迹与建议清单。支持 DeepSeek 与
            Qwen 双模型切换。
          </p>

          <div className="mt-6 space-y-4">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              梦境内容
            </label>
            <textarea
              className="min-h-[160px] w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-300"
              value={dream}
              onChange={(event) => setDream(event.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {sampleDreams.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setDream(sample)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 transition hover:border-white/30"
                >
                  {sample.slice(0, 10)}...
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                情绪基调
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {moodOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMood(item)}
                    className={`rounded-full border px-3 py-2 text-xs transition ${
                      mood === item
                        ? "border-orange-300 bg-orange-300/20 text-white"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                叙事结构
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {toneOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTone(item)}
                    className={`rounded-full border px-3 py-2 text-xs transition ${
                      tone === item
                        ? "border-teal-300 bg-teal-300/20 text-white"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-white/60">
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
            <span className="text-xs text-white/40">{hint}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {loading ? "解析中..." : "生成解梦报告"}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setResult(null)}
            >
              清空结果
            </button>
          </div>
          {error ? (
            <p className="mt-4 text-sm text-orange-200">{error}</p>
          ) : null}
        </div>

        <div className="card">
          <p className="pill">Report</p>
          {!result && (
            <div className="mt-6 space-y-4 text-sm text-white/60">
              <p>结果会以结构化面板展示，便于保存与复盘。</p>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  模块预览
                </p>
                <ul className="mt-3 space-y-2">
                  <li>梦境标题与一句话概要</li>
                  <li>象征符号与关联意义</li>
                  <li>情绪轨迹与行动建议</li>
                </ul>
              </div>
            </div>
          )}
          {result && (
            <div className="mt-6 space-y-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  标题
                </p>
                <h2 className="title-display mt-2 text-2xl">
                  {result.title}
                </h2>
                <p className="muted mt-3 leading-relaxed">{result.summary}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    主题
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.themes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    情绪
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.emotions.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  象征
                </p>
                <div className="mt-3 space-y-3">
                  {result.symbols.map((symbol) => (
                    <div
                      key={symbol.symbol}
                      className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <p className="font-semibold">{symbol.symbol}</p>
                      <p className="muted mt-1 text-xs">{symbol.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  行动建议
                </p>
                <ul className="mt-3 space-y-2">
                  {result.actions.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    影面
                  </p>
                  <p className="muted mt-2 text-xs">{result.shadow}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    光面
                  </p>
                  <p className="muted mt-2 text-xs">{result.light}</p>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/50">
                解析结果由 {model === "deepseek" ? "DeepSeek" : "Qwen"} 生成，可在
                梦境地图中保存。
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
