"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MeteoconsStarFill } from "@/common/Iconset";

gsap.registerPlugin(ScrollTrigger);

export default function Hand() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);
  const bridgeTextRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const labelLeftRef = useRef<HTMLDivElement>(null);
  const labelRightRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  // ── Canvas aurora ───────────────────────────────────────────
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const waves = [
      {
        amp: 60,
        freq: 0.0035,
        speed: 0.004,
        y: 0.28,
        color: "rgba(74,222,128,",
        alpha: 0.06,
      },
      {
        amp: 45,
        freq: 0.004,
        speed: 0.003,
        y: 0.42,
        color: "rgba(251,191,36,",
        alpha: 0.045,
      },
      {
        amp: 70,
        freq: 0.003,
        speed: 0.005,
        y: 0.6,
        color: "rgba(74,222,128,",
        alpha: 0.04,
      },
      {
        amp: 35,
        freq: 0.005,
        speed: 0.0035,
        y: 0.75,
        color: "rgba(96,165,250,",
        alpha: 0.04,
      },
    ];

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waves.forEach((w) => {
        const baseY = canvas.height * w.y;
        for (let pass = 0; pass < 2; pass++) {
          ctx.beginPath();
          for (let x = 0; x <= canvas.width; x += 3) {
            const y =
              baseY +
              Math.sin(x * w.freq + t * w.speed) * w.amp +
              Math.sin(x * w.freq * 1.7 + t * w.speed * 0.6) * (w.amp * 0.4);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          if (pass === 0) {
            ctx.strokeStyle = w.color + w.alpha + ")";
            ctx.lineWidth = 1.5;
            ctx.filter = "none";
          } else {
            ctx.strokeStyle = w.color + w.alpha * 0.4 + ")";
            ctx.lineWidth = 6;
            ctx.filter = "blur(4px)";
          }
          ctx.stroke();
          ctx.filter = "none";
        }
      });
      for (let i = 0; i < 18; i++) {
        const px = (Math.sin(t * 0.007 + i * 2.4) * 0.5 + 0.5) * canvas.width;
        const py = (Math.cos(t * 0.005 + i * 1.9) * 0.5 + 0.5) * canvas.height;
        const r = 0.7 + Math.abs(Math.sin(t * 0.02 + i)) * 1.2;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        const cols = [
          "rgba(74,222,128,",
          "rgba(251,191,36,",
          "rgba(96,165,250,",
        ];
        ctx.fillStyle =
          cols[i % 3] + (0.15 + Math.sin(t * 0.03 + i) * 0.08) + ")";
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── GSAP scroll ─────────────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(bridgeTextRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
      });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.4 });
      gsap.set(avatarRef.current, {
        opacity: 0,
        scale: 0.82,
        filter: "blur(6px)",
      });
      gsap.set(headingRef.current, { opacity: 0, y: 28, filter: "blur(6px)" });
      gsap.set(orbsRef.current, { opacity: 0 });
      gsap.set(labelLeftRef.current, { opacity: 0, x: -18 });
      gsap.set(labelRightRef.current, { opacity: 0, x: 18 });
      gsap.set(lineLeftRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
      });
      gsap.set(lineRightRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(taglineRef.current, { opacity: 0, y: 10 });
      gsap.set(leftHandRef.current, { x: "-28%", rotate: -5 });
      gsap.set(rightHandRef.current, { x: "28%", rotate: 5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 2.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(orbsRef.current, { opacity: 1, duration: 0.3 }, 0);
      tl.to(
        headingRef.current,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 },
        0.05,
      );
      tl.to(
        leftHandRef.current,
        { x: "0%", rotate: 0, ease: "power2.out", duration: 0.7 },
        0.1,
      );
      tl.to(
        rightHandRef.current,
        { x: "0%", rotate: 0, ease: "power2.out", duration: 0.7 },
        0.1,
      );
      tl.to(glowRef.current, { opacity: 1, scale: 1, duration: 0.4 }, 0.35);
      tl.to(
        avatarRef.current,
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4 },
        0.3,
      );
      tl.to(lineLeftRef.current, { scaleX: 1, duration: 0.3 }, 0.55);
      tl.to(lineRightRef.current, { scaleX: 1, duration: 0.3 }, 0.55);
      tl.to(labelLeftRef.current, { opacity: 1, x: 0, duration: 0.3 }, 0.65);
      tl.to(labelRightRef.current, { opacity: 1, x: 0, duration: 0.3 }, 0.65);
      tl.to(
        bridgeTextRef.current,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 },
        0.32,
      );
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.45);
      tl.to(
        glowRef.current,
        { scale: 1.35, opacity: 0.6, duration: 0.5 },
        0.85,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black w-full overflow-hidden"
      style={{ height: "100vh" }}>
      {/* ── CANVAS ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* ── STATIC ATMOSPHERE ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.032,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 55%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 55%, black 20%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.88) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "12%",
            right: "12%",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(74,222,128,0.18), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "12%",
            right: "12%",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(251,191,36,0.12), transparent)",
          }}
        />
      </div>

      {/* ── AMBIENT ORBS ── */}
      <div
        ref={orbsRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}>
        <div
          style={{
            position: "absolute",
            top: "-5%",
            left: "-8%",
            width: 540,
            height: 440,
            background:
              "radial-gradient(ellipse, rgba(74,222,128,0.09) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "-10%",
            width: 480,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(251,191,36,0.07) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "25%",
            width: 500,
            height: 320,
            background:
              "radial-gradient(ellipse, rgba(96,165,250,0.06) 0%, transparent 65%)",
            filter: "blur(55px)",
          }}
        />
      </div>

      {/* ── ALL CONTENT — single flex column, perfectly centered ── */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{ zIndex: 10 }}>
        {/* HEADING */}
        <div
          ref={headingRef}
          className="flex items-center justify-center gap-6 mb-8 shrink-0">
          <MeteoconsStarFill />
          <p className="font-docallisme text-white text-7xl leading-none tracking-wide">
            What I actually do
          </p>
          <MeteoconsStarFill />
        </div>

        {/* HANDS + CENTER CLUSTER — all in one relative container */}
        <div
          className="relative w-full flex items-center justify-between shrink-0 pointer-events-none select-none"
          style={{ height: "clamp(280px, 45vh, 520px)" }}>
          {/* LEFT HAND */}
          <div ref={leftHandRef} className="relative shrink-0">
            <Image
              src="/images/left.png"
              alt="Designer hand"
              height={123}
              width={287}
              priority
              className="block"
              style={{
                filter: "drop-shadow(20px 0px 40px rgba(0,0,0,0.95))",
                maxWidth: "44vw",
                height: "auto",
              }}
            />
          </div>

          {/* CENTER CLUSTER — avatar + glow, absolutely centered within the row */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 20 }}>
            {/* Glow */}
            <div
              ref={glowRef}
              className="absolute"
              style={{
                width: 380,
                height: 380,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(74,222,128,0.45) 0%, rgba(74,222,128,0.14) 45%, transparent 72%)",
                filter: "blur(12px)",
              }}
            />
            {/* Decorative ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 252,
                height: 252,
                border: "1px solid rgba(74,222,128,0.1)",
              }}
            />
            {/* Avatar */}
            <div
              ref={avatarRef}
              className="relative"
              style={{
                borderRadius: "50%",
                border: "1.5px solid rgba(74,222,128,0.22)",
                boxShadow:
                  "0 0 40px rgba(74,222,128,0.18), 0 0 80px rgba(74,222,128,0.07)",
                overflow: "hidden",
                width: 180,
                height: 180,
                zIndex: 30,
              }}>
              <Image
                src="/images/meee.png"
                alt="Divyanshu"
                width={180}
                height={180}
                className="object-cover"
                style={{ width: 180, height: 180 }}
              />
            </div>
          </div>

          {/* RIGHT HAND */}
          <div ref={rightHandRef} className="relative shrink-0">
            <Image
              src="/images/right.png"
              alt="Developer hand"
              height={102}
              width={289}
              priority
              className=" block "
              style={{
                filter: "drop-shadow(-20px 0px 40px rgba(0,0,0,0.95))",
                maxWidth: "44vw",
                height: "auto",
              }}
            />
          </div>
        </div>

        {/* BRIDGE TEXT */}
        <div
          ref={bridgeTextRef}
          className="w-full max-w-2xl px-8 text-center mt-6 shrink-0">
          <p
            className="font-comforter italic leading-relaxed text-white/85"
            style={{ fontSize: "clamp(18px, 2.2vw, 32px)" }}>
            I bridge the gap between fluid architecture and refined aesthetics —
            to craft visually stunning experiences.
          </p>
          {/* Tagline */}
          <div
            ref={taglineRef}
            className="flex items-center justify-center gap-3 mt-4">
            <div
              className="h-px w-14"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(74,222,128,0.35))",
              }}
            />
            <span className="text-white/25 text-[10px] tracking-[0.35em] uppercase">
              best of both worlds
            </span>
            <div
              className="h-px w-14"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(251,191,36,0.35))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
