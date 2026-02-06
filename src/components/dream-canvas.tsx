"use client";

import { useEffect, useMemo, useRef } from "react";

type DreamCanvasProps = {
  id?: string;
  seed: number;
  palette: string[];
  motif: string;
};

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export default function DreamCanvas({
  id,
  seed,
  palette,
  motif,
}: DreamCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const safePalette = useMemo(
    () => (palette.length ? palette : ["#ff6f3c", "#fcd28a", "#14b8a6"]),
    [palette],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const rand = mulberry32(seed);
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    safePalette.forEach((color, index) => {
      gradient.addColorStop(index / (safePalette.length - 1 || 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 18; i += 1) {
      const radius = 40 + rand() * 160;
      const x = rand() * width;
      const y = rand() * height;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(10,12,16,${0.15 + rand() * 0.25})`;
      ctx.fill();
    }

    for (let i = 0; i < 120; i += 1) {
      const x = rand() * width;
      const y = rand() * height;
      const size = rand() * 2 + 0.4;
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(x, y, size, size);
    }

    ctx.globalCompositeOperation = "overlay";
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i += 1) {
      ctx.beginPath();
      const y = rand() * height;
      ctx.moveTo(0, y);
      for (let x = 0; x <= width; x += 80) {
        ctx.lineTo(x, y + (rand() - 0.5) * 40);
      }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "rgba(10,12,16,0.6)";
    ctx.fillRect(20, height - 70, width - 40, 50);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "12px var(--font-body)";
    ctx.fillText(`Motif: ${motif}`, 32, height - 40);
  }, [palette, safePalette, seed, motif]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className="h-[320px] w-full rounded-3xl border border-white/10"
    />
  );
}
