import Link from "next/link";

const quickLinks = [
  { href: "/interpret", label: "深度解梦" },
  { href: "/art", label: "梦境艺术" },
  { href: "/map", label: "梦境地图" },
  { href: "/dictionary", label: "符号词典" },
];

export default function SiteFooter() {
  return (
    <footer className="shell pb-10 pt-16">
      <div className="card glass">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <p className="pill mb-4">Dream Studio</p>
            <h3 className="title-display text-2xl md:text-3xl">
              把每一次梦境记录成可回看的心象地图。
            </h3>
            <p className="muted mt-3 text-sm leading-relaxed">
              以 DeepSeek 与 Qwen 双模型驱动，提供解析、艺术化呈现与符号检索。
              结构化结果可直接保存到梦境地图，方便长期追踪。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/interpret" className="btn btn-primary">
                开始记录
              </Link>
              <Link href="/map" className="btn btn-ghost">
                浏览梦境地图
              </Link>
            </div>
          </div>
          <div className="grid w-full max-w-sm grid-cols-2 gap-3 text-sm text-white/70">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/30 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-white/40 md:flex-row md:items-center">
        <p>© 2026 梦象 Dream Interpreter. All rights reserved.</p>
        <p>Designed for Vercel · Powered by DeepSeek & Qwen</p>
      </div>
    </footer>
  );
}
