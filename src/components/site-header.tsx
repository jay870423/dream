import Link from "next/link";

const navItems = [
  { href: "/interpret", label: "解梦" },
  { href: "/art", label: "梦境艺术" },
  { href: "/map", label: "梦境地图" },
  { href: "/dictionary", label: "符号词典" },
];

export default function SiteHeader() {
  return (
    <header className="shell">
      <div className="flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl border border-white/20 bg-white/5 p-2">
            <div className="h-full w-full rounded-xl bg-gradient-to-br from-orange-400 via-amber-300 to-teal-300" />
          </div>
          <div>
            <p className="title-display text-lg">梦象</p>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Dream Interpreter
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white/90 text-white/70"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/interpret" className="btn btn-primary hidden md:flex">
            立即解梦
          </Link>
          <Link href="/interpret" className="btn btn-ghost md:hidden">
            开始
          </Link>
        </div>
      </div>
      <div className="divider" />
    </header>
  );
}
