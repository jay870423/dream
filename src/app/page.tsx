import Link from "next/link";

const featureCards = [
  {
    title: "深度解梦",
    desc: "结构化分析梦境线索、象征与情绪轨迹，给出可执行的心理建议。",
  },
  {
    title: "梦境艺术",
    desc: "把文字梦境转译成色彩与构图，生成专属的梦境情绪画。",
  },
  {
    title: "梦境地图",
    desc: "以地域为维度沉淀梦境样本，观察你与世界的潜意识共振。",
  },
  {
    title: "符号词典",
    desc: "随查随用的梦境符号库，支持 AI 补全与个性化注解。",
  },
];

const flowSteps = [
  {
    title: "记录梦境",
    desc: "输入梦境文字，选择情绪与场景标签。",
  },
  {
    title: "双模型解析",
    desc: "DeepSeek 与 Qwen 交叉拆解象征与情绪动线。",
  },
  {
    title: "保存与复盘",
    desc: "一键存入梦境地图与个人档案。",
  },
];

export default function Home() {
  return (
    <div>
      <section className="shell relative overflow-hidden pb-20 pt-16">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="pill reveal">AI Dreamcraft</span>
            <h1 className="title-display reveal reveal-delay-1 mt-6 text-4xl leading-tight md:text-6xl">
              用更沉浸的方式复刻梦境，
              <br />
              让潜意识拥有可视化的地图。
            </h1>
            <p className="muted reveal reveal-delay-2 mt-5 text-base leading-relaxed md:text-lg">
              这是一套完整的梦境工作流：记录、解析、艺术化呈现与长期追踪。
              交互重构为可操作的“梦境工作台”，帮助你从一次梦里提取长期洞见。
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
              <Link href="/interpret" className="btn btn-primary">
                立即解梦
              </Link>
              <Link href="/art" className="btn btn-ghost">
                先看梦境艺术
              </Link>
            </div>
            <div className="reveal reveal-delay-4 mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em] text-white/40">
              <span>DeepSeek</span>
              <span>Qwen</span>
              <span>Vercel Ready</span>
            </div>
          </div>
          <div className="relative">
            <div className="card glass float">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                <span>Interpretation</span>
                <span>03:14 AM</span>
              </div>
              <h2 className="title-display mt-4 text-2xl">
                梦见潮水漫过旧城。
              </h2>
              <p className="muted mt-3 text-sm leading-relaxed">
                你正在经历一段旧模式的消退，水象征情绪的积累，旧城代表旧有的身份结构。
              </p>
              <div className="mt-6 grid gap-3 text-sm">
                {[
                  "主题：情绪释放 / 旧我松动",
                  "象征：水 / 城墙 / 黄昏",
                  "建议：给正在变化的关系留出弹性",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-8 -right-6 hidden w-44 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-white/70 md:block">
              <p className="uppercase tracking-[0.3em] text-white/40">Mood</p>
              <p className="mt-2 text-lg font-semibold text-white">
                潮湿 · 朦胧
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 bg-gradient-to-r from-amber-300 to-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card) => (
            <div key={card.title} className="card reveal">
              <h3 className="title-display text-lg">{card.title}</h3>
              <p className="muted mt-3 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card glass">
            <p className="pill">Workflow</p>
            <h3 className="title-display mt-5 text-2xl">
              让梦境也拥有可操作的流程。
            </h3>
            <p className="muted mt-4 text-sm leading-relaxed">
              我们把“梦境记录”改造成一套可执行的工作流，既有 AI 生成的洞察，也有
              你可以持续跟踪的结构化内容。
            </p>
            <div className="mt-8 space-y-4">
              {flowSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <div className="title-display text-xl text-white/80">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="muted mt-1 text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <p className="pill">Dream Log</p>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: "梦到森林在逆光中开合",
                  date: "昨天 · 上海",
                  note: "象征隐藏的决心正在成形。",
                },
                {
                  title: "梦见列车向海边驶去",
                  date: "两天前 · 成都",
                  note: "迁移与选择带来的安全感需求。",
                },
                {
                  title: "梦里反复寻找一扇门",
                  date: "四天前 · 北京",
                  note: "等待新身份的进入许可。",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{item.date}</span>
                    <span className="uppercase tracking-[0.3em]">Map</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold">{item.title}</p>
                  <p className="muted mt-2 text-xs">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-24">
        <div className="card glass grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="pill">Interactive Upgrade</p>
            <h3 className="title-display mt-5 text-2xl">
              交互改版：从回答式体验升级为“梦境工作台”。
            </h3>
            <p className="muted mt-4 text-sm leading-relaxed">
              每个模块都能接续上一步的结果：解梦完成后可直接生成艺术场景，
              同时在地图上留存记录；词典支持快速补齐象征意义。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/interpret" className="btn btn-primary">
                试用全流程
              </Link>
              <Link href="/dictionary" className="btn btn-ghost">
                查找梦境符号
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Live Modules
            </p>
            <div className="mt-4 space-y-4 text-sm">
              {[
                "解梦结构化面板",
                "情绪曲线追踪",
                "梦境艺术卡片",
                "共享梦境地图",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
