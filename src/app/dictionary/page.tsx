"use client";

import { useMemo, useState } from "react";
import { dictionaryEntries } from "@/data/dictionary";

type DictionaryResult = {
  symbol: string;
  meaning: string;
  actions: string[];
  source: "local" | "ai";
};

export default function DictionaryPage() {
  const [query, setQuery] = useState("水");
  const [model, setModel] = useState<"deepseek" | "qwen">("deepseek");
  const [result, setResult] = useState<DictionaryResult | null>(null);
  const [loading, setLoading] = useState(false);

  const suggestionList = useMemo(() => {
    return dictionaryEntries.slice(0, 8);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch("/api/dictionary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol: query, model }),
    });
    if (response.ok) {
      const data = (await response.json()) as DictionaryResult;
      setResult(data);
    }
    setLoading(false);
  };

  return (
    <section className="shell pb-24 pt-12">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card glass">
          <p className="pill">Dream Dictionary</p>
          <h1 className="title-display mt-5 text-3xl">梦境符号词典</h1>
          <p className="muted mt-3 text-sm leading-relaxed">
            内置常见符号词条，若词条缺失会由 AI 自动补齐。
          </p>
          <div className="mt-6 space-y-4">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              符号
            </label>
            <input
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-300"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {suggestionList.map((entry) => (
                <button
                  key={entry.symbol}
                  type="button"
                  onClick={() => setQuery(entry.symbol)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:border-white/30"
                >
                  {entry.symbol}
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
            <button className="btn btn-primary" onClick={handleSearch}>
              {loading ? "查询中..." : "查找含义"}
            </button>
          </div>
        </div>

        <div className="card">
          <p className="pill">Result</p>
          {!result && (
            <div className="mt-6 text-sm text-white/60">
              <p>输入符号后可查看含义、情绪暗示与建议行动。</p>
            </div>
          )}
          {result && (
            <div className="mt-6 space-y-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  符号
                </p>
                <h2 className="title-display mt-2 text-2xl">
                  {result.symbol}
                </h2>
                <p className="muted mt-3 leading-relaxed">{result.meaning}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  行动建议
                </p>
                <ul className="mt-3 space-y-2">
                  {result.actions.map((action) => (
                    <li
                      key={action}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-white/40">
                来源：{result.source === "local" ? "本地词典" : "AI 补全"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
