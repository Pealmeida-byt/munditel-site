"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { side: "in" | "out"; text: string };

export type RcsContent = {
  tag: string;
  title: string;
  verified: string;
  placeholder: string;
  replay: string;
  messages: Msg[];
};

export default function RcsPhone({ content }: { content: RcsContent }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [runId, setRunId] = useState(0);

  // ── Fundo de luz azul difusa (canvas) ──
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0, t = 0, raf = 0;
    const size = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
    size();
    window.addEventListener("resize", size);

    const blobs = [
      { x: 0.15, y: 0.45, r: 0.55, hue: "220,90%,55%", a: 0.55, px: 0.00013, py: 0.00009, ph: 0 },
      { x: 0.55, y: 0.35, r: 0.42, hue: "225,95%,50%", a: 0.45, px: 0.00017, py: 0.00011, ph: 2 },
      { x: 0.75, y: 0.55, r: 0.50, hue: "215,90%,48%", a: 0.40, px: 0.00011, py: 0.00014, ph: 4 },
      { x: 0.40, y: 0.60, r: 0.38, hue: "230,95%,58%", a: 0.35, px: 0.00019, py: 0.00008, ph: 1 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b) => {
        const cx = (b.x + Math.sin(t * b.px + b.ph) * 0.12) * W;
        const cy = (b.y + Math.cos(t * b.py + b.ph) * 0.10) * H;
        const rad = b.r * W * (0.9 + 0.1 * Math.sin(t * 0.0006 + b.ph));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `hsla(${b.hue},${b.a})`);
        g.addColorStop(0.5, `hsla(${b.hue},${b.a * 0.35})`);
        g.addColorStop(1, `hsla(${b.hue},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });
      ctx.globalCompositeOperation = "source-over";
      t += 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);

  // ── Animação da conversa ──
  useEffect(() => {
    const chat = chatRef.current;
    const phone = phoneRef.current;
    if (!chat || !phone) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const bubble = (m: Msg) => {
      const w = document.createElement("div");
      w.style.cssText = `display:flex;justify-content:${m.side === "out" ? "flex-end" : "flex-start"};`;
      const b = document.createElement("div");
      b.textContent = m.text;
      b.style.cssText =
        "max-width:80%;font-size:11px;line-height:1.45;padding:8px 11px;border-radius:14px;" +
        (m.side === "out"
          ? "background:#2563eb;color:#fff;border-bottom-right-radius:4px;"
          : "background:#16233b;color:#dbe4f0;border-bottom-left-radius:4px;");
      b.style.opacity = "0";
      b.style.transform = "translateY(6px)";
      b.style.transition = "opacity .3s, transform .3s";
      w.appendChild(b);
      chat.appendChild(w);
      requestAnimationFrame(() => { b.style.opacity = "1"; b.style.transform = "translateY(0)"; });
    };

    const typing = (cb: () => void) => {
      const w = document.createElement("div");
      w.style.cssText = "display:flex;justify-content:flex-start;";
      w.innerHTML =
        '<div style="background:#16233b;padding:9px 12px;border-radius:14px;border-bottom-left-radius:4px;display:flex;gap:3px;"><span class="rcs-d"></span><span class="rcs-d"></span><span class="rcs-d"></span></div>';
      chat.appendChild(w);
      timers.push(setTimeout(() => { chat.removeChild(w); cb(); }, 900));
    };

    chat.innerHTML = "";
    phone.style.transform = "rotateY(-24deg) rotateX(4deg) rotateZ(-2deg) translateY(40px)";
    phone.style.opacity = "0";
    timers.push(setTimeout(() => {
      phone.style.transform = "rotateY(-22deg) rotateX(3deg) rotateZ(-1deg) translateY(0)";
      phone.style.opacity = "1";
    }, 100));

    let delay = 1000;
    content.messages.forEach((m) => {
      if (m.side === "in") {
        timers.push(setTimeout(() => typing(() => bubble(m)), delay));
        delay += 1400;
      } else {
        timers.push(setTimeout(() => bubble(m), delay));
        delay += 700;
      }
    });
    timers.push(setTimeout(() => setRunId((n) => n + 1), delay + 4000));

    return () => timers.forEach(clearTimeout);
  }, [content, runId]);

  return (
    <section id="rcs" style={{ position: "relative", background: "#020814", borderTop: "1px solid #0e2a4a", borderBottom: "1px solid #0e2a4a", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 section-pad" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <p style={{ color: "#5aa8ff", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 10px" }}>{content.tag}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#fff", letterSpacing: "-0.02em", maxWidth: 560, margin: "0 auto" }}>{content.title}</h2>
        </div>

        <div style={{ position: "relative", width: "100%", height: 520, display: "flex", alignItems: "center", justifyContent: "center", perspective: 1400 }}>
          <div ref={phoneRef} style={{ position: "relative", zIndex: 2, opacity: 0, transformStyle: "preserve-3d", transition: "transform 1s cubic-bezier(.16,1,.3,1), opacity 1s" }}>
            <div style={{ width: 250, background: "linear-gradient(145deg, #c88a3c 0%, #8a5a24 30%, #3a2610 55%, #7a4f22 80%, #b07d38 100%)", borderRadius: 38, padding: 6, boxShadow: "0 30px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(255,210,140,.3)" }}>
              <div style={{ background: "#1a1206", borderRadius: 34, padding: 6 }}>
                <div style={{ position: "relative", background: "#0a1420", borderRadius: 30, overflow: "hidden", height: 452, display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,.08) 0%, transparent 35%, transparent 65%, rgba(255,255,255,.05) 100%)", zIndex: 6, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, background: "#000", borderRadius: "50%", zIndex: 7, boxShadow: "inset 0 0 0 1.5px #2a2a2a" }} />

                  <div style={{ background: "rgba(10,22,40,.85)", backdropFilter: "blur(4px)", padding: "26px 14px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #1e3a5f" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#c88a3c,#8a5a24)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 14 }}>M</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Munditel</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#5aa8ff" aria-hidden="true"><path d="M12 2l2.4 1.8 3 .2.9 2.9L21 9l-1.2 2.8L21 15l-2.8 1.9-.9 2.9-3 .2L12 22l-2.4-1.8-3-.2-.9-2.9L3 15l1.2-2.8L3 9l2.8-1.9.9-2.9 3-.2z"/><path d="M10.5 14.2l-2-2 1.1-1 .9.9 3-3 1.1 1z" fill="#020814"/></svg>
                      </div>
                      <span style={{ color: "#5dcaa5", fontSize: 10 }}>{content.verified}</span>
                    </div>
                  </div>

                  <div ref={chatRef} style={{ flex: 1, padding: "14px 12px", display: "flex", flexDirection: "column", gap: 8, overflow: "hidden", background: "linear-gradient(180deg, #0a1420 0%, #0c1830 100%)" }} />

                  <div style={{ padding: "8px 12px 12px", display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid #14213a", background: "rgba(10,22,40,.85)" }}>
                    <div style={{ flex: 1, background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 99, padding: "7px 12px", color: "#334155", fontSize: 11 }}>{content.placeholder}</div>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#c88a3c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a1206" aria-hidden="true"><path d="M3 20l18-8L3 4l4 8-4 8z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => setRunId((n) => n + 1)} style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid #0e2a4a", color: "#5aa8ff", fontSize: 13, padding: "8px 18px", borderRadius: 99, cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 12a9 9 0 019-9 9 9 0 016.7 3M21 12a9 9 0 01-9 9 9 9 0 01-6.7-3M21 3v6h-6M3 21v-6h6" /></svg>
          {content.replay}
        </button>
      </div>

      <style>{`.rcs-d{width:5px;height:5px;border-radius:50%;background:#64748b;animation:rcs-dd 1s infinite}.rcs-d:nth-child(2){animation-delay:.15s}.rcs-d:nth-child(3){animation-delay:.3s}@keyframes rcs-dd{0%,60%,100%{opacity:.3}30%{opacity:1}}`}</style>
    </section>
  );
}