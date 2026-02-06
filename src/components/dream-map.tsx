"use client";

type RegionDatum = {
  region: string;
  count: number;
};

const regionCenters = [
  { region: "北美", x: 18, y: 38 },
  { region: "南美", x: 26, y: 68 },
  { region: "欧洲", x: 48, y: 34 },
  { region: "非洲", x: 50, y: 58 },
  { region: "中东", x: 58, y: 48 },
  { region: "东亚", x: 72, y: 40 },
  { region: "南亚", x: 66, y: 58 },
  { region: "大洋洲", x: 80, y: 76 },
];

export default function DreamMap({ data }: { data: RegionDatum[] }) {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
      <svg
        viewBox="0 0 900 420"
        className="absolute inset-0 h-full w-full opacity-60"
        aria-hidden
      >
        <path
          d="M72 120c40-50 120-70 200-60 40 4 80 16 110 40 22 18 30 44 20 70-8 22-32 38-64 46-44 10-94 8-132 0-46-10-98-16-122-40-18-18-26-34-12-56z"
          fill="rgba(255,255,255,0.08)"
        />
        <path
          d="M250 280c28-42 88-70 140-70 46 0 78 18 88 44 14 34-8 76-44 94-36 18-90 20-128 10-40-10-76-34-56-78z"
          fill="rgba(255,255,255,0.06)"
        />
        <path
          d="M430 140c50-46 140-60 210-50 46 8 88 30 106 64 18 34 0 66-36 86-48 28-114 36-174 22-52-12-96-32-120-68-16-26-8-38 14-54z"
          fill="rgba(255,255,255,0.08)"
        />
        <path
          d="M530 270c48-46 126-50 188-28 38 14 60 40 64 64 6 34-18 60-58 72-48 14-108 6-152-14-46-22-72-46-60-76 6-16 8-14 18-18z"
          fill="rgba(255,255,255,0.05)"
        />
      </svg>
      {regionCenters.map((center) => {
        const count = data.find((item) => item.region === center.region)?.count ?? 0;
        const size = 10 + count * 4;
        return (
          <div
            key={center.region}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-xs"
            style={{ left: `${center.x}%`, top: `${center.y}%` }}
          >
            <div
              className="flex flex-col items-center gap-1"
              aria-label={`${center.region} ${count} dreams`}
            >
              <div
                className="flex items-center justify-center rounded-full border border-white/30 bg-orange-300/20 text-white shadow-[0_0_18px_rgba(255,111,60,0.45)]"
                style={{ width: size, height: size }}
              />
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1">
                {center.region}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
