"use client";

import {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useCallback,
  memo,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Draggable from "gsap/dist/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

const NAVBAR_H = 88;

interface ContentStep {
  text: string;
  gif?: string | string[];
  badge?: string;
  tag?: string;
}

const content: ContentStep[] = [
  {
    text: "Yes I'm a Developer",
    gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnR3OWY2eGw1ZWMwbGxjcDloeW95NnBmbzNsa2V6ZGUzdXJvOXc1eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ws6T5PN7wHv3cY8xy8/giphy.gif",
    badge: "🧑‍💻 confirmed",
  },
  { text: "Someone who speaks fluent JS and React", tag: "since 2021" },
  {
    text: "I build high-performance, interactive, seamless UIs",
    badge: "⚡ 99 perf score",
  },
  {
    text: "And you know what?",
    gif: "https://tenor.com/en-GB/view/shrek-shrek-rizz-rizz-gif-11157824601050747846.gif",
    tag: "plot twist incoming",
  },
  {
    text: "I Design too!!",
    gif: ["/videos/tutor.gif", "/videos/signbridge-gif.gif"],
    badge: "🎨 figma native",
  },
  {
    text: "I have these Designer Eyes",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODF3YmlocWtzNHI2ZW9hdWptb2YyemU0dThnazZmcGszdHVmcnQ4OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/RILsqUte1MME7TzQJ9/giphy.gif",
    tag: "4px detector",
  },
  {
    text: "It's a blessing and a curse, honestly",
    gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGlxMjhmbnh6NGdnOGd3dGprbnJla3IyeG55c3Z0YWZ6MGc3dTEzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2rqEdFfkMzXmo/giphy.gif",
    badge: "🤌 pixel perfect",
  },
  {
    text: "It refuses to let me build anything static.",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzZlaXVyM2tkamM4aXBlYmY1NGZrZHVsc2FzY3JkN3FleGlxYnExZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wggy65RuNuVmNvwh5V/giphy.gif",
    tag: "no boring UIs",
  },
  {
    text: "I see the 4px misalignment no one else notices.",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2dma2ZuenBweml3dnp1MGl3Z3QzMmZnejJ2Y3BjbWlhdDNxZHIxeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kd9BlRovbPOykLBMqX/giphy.gif",
    badge: "🔍 OCD level: max",
  },
  {
    text: "I obsess over how a button feels on hover.",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bmZ3bmZ3bmZ3bmZ3bmZ3bmZ3bmZ3bmZ3bmZ3bmZ3JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif",
    tag: "micro-interactions",
  },
  {
    text: "I don't just make it work. I make it an experience.",
    gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHozbzI4d2hrYzQ1bXV5b25oMXF1dGlmcXFnbGs3OWxyNnUzYnR4NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ffzhLUixCtlsc/giphy.gif",
    badge: "✨ craft > output",
  },
  {
    text: "So... what exactly am I?",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdncxZzByaDJmZ2twYjBuZ3dtZG00aXM2MXZtbmtyaTg1M2VsbXB4ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ueSNnJrKvsb5rK26kg/giphy.gif",
    tag: "great question",
  },
  {
    text: "A Developer?",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdncxZzByaDJmZ2twYjBuZ3dtZG00aXM2MXZtbmtyaTg1M2VsbXB4ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TSuR7EyTAL71dz5Tsv/giphy.gif",
    badge: "maybe...",
  },
  {
    text: "A Designer?",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdncxZzByaDJmZ2twYjBuZ3dtZG00aXM2MXZtbmtyaTg1M2VsbXB4ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ueSNnJrKvsb5rK26kg/giphy.gif",
    tag: "also maybe...",
  },
  {
    text: "Actually — it's the best of both worlds.",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjNwdGkzMnV5ejl0bjQwOTM2ZWRhZXp4cnhmbTFidHp0eDNnNjV0diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pHb82xtBPfqEg/giphy.gif",
    badge: "🌍 confirmed.",
  },
];

interface CardData {
  id: string;
  side: "left" | "right";
  stackIndex: number;
  offsetX: number;
  offsetY: number;
  baseRotate: number;
  floatAmp: number;
  floatDur: number;
  floatDelay: number;
  gradient: string;
  accent: string;
  eyebrow: string;
  headline: string;
  headlineSize: number; // used as a ratio multiplier now, not raw px
  subline?: string;
  caption: string;
  captionAccent?: string;
}

const CARDS: CardData[] = [
  {
    id: "identity",
    side: "left",
    stackIndex: 0,
    offsetX: -10,
    offsetY: 20,
    baseRotate: -8,
    floatAmp: 9,
    floatDur: 3.9,
    floatDelay: 0,
    gradient: "linear-gradient(150deg,#1c0a38 0%,#2e1060 55%,#180830 100%)",
    accent: "#a855f7",
    eyebrow: "identity crisis?",
    headline: "Dev.\nDesigner.",
    headlineSize: 38,
    caption: "i refused to pick one.",
    captionAccent: "turns out, that's the cheat code.",
  },
  {
    id: "craft",
    side: "left",
    stackIndex: 1,
    offsetX: -2,
    offsetY: 6,
    baseRotate: -1,
    floatAmp: 7,
    floatDur: 4.5,
    floatDelay: 0.55,
    gradient: "linear-gradient(135deg,#041c10 0%,#083d22 50%,#020e08 100%)",
    accent: "#22c55e",
    eyebrow: "designer eyes",
    headline: "Pixel\nPerfect.",
    headlineSize: 36,
    subline: "the gap no one else sees",
    caption: "i will find the misalignment.",
  },
  {
    id: "ocd",
    side: "left",
    stackIndex: 2,
    offsetX: 8,
    offsetY: -10,
    baseRotate: 6,
    floatAmp: 11,
    floatDur: 3.3,
    floatDelay: 1.1,
    gradient: "linear-gradient(140deg,#1a0e00 0%,#3a2200 55%,#120900 100%)",
    accent: "#fbbf24",
    eyebrow: "obsession",
    headline: "Craft\n> Output.",
    headlineSize: 36,
    caption: "it refuses to be static.",
    captionAccent: "and so do i",
  },
  {
    id: "stack",
    side: "right",
    stackIndex: 0,
    offsetX: 10,
    offsetY: 18,
    baseRotate: 7,
    floatAmp: 10,
    floatDur: 4.2,
    floatDelay: 0.3,
    gradient: "linear-gradient(145deg,#0a0818 0%,#151035 55%,#060410 100%)",
    accent: "#60a5fa",
    eyebrow: "what I actually do",
    headline: "Build.\nDesign.\nShip.",
    headlineSize: 32,
    caption: "in that order.",
    captionAccent: "usually.",
  },
  {
    id: "status",
    side: "right",
    stackIndex: 1,
    offsetX: -4,
    offsetY: -2,
    baseRotate: -4,
    floatAmp: 8,
    floatDur: 3.7,
    floatDelay: 0.85,
    gradient: "linear-gradient(140deg,#001814 0%,#003328 55%,#000f0c 100%)",
    accent: "#34d399",
    eyebrow: "right now",
    headline: "Open\nto work.",
    headlineSize: 36,
    caption: "no ghosting.",
    captionAccent: "i actually reply.",
  },
];

function CardNoise() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.04,
        pointerEvents: "none",
        zIndex: 10,
        borderRadius: "inherit",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "120px 120px",
      }}
    />
  );
}

interface DraggableCardProps {
  card: CardData;
  zBase: number;
  cardW: number;
  cardH: number;
  scale: number; // vw-based scale factor
}

const DraggableCard = memo(function DraggableCard({
  card,
  zBase,
  cardW,
  cardH,
  scale,
}: DraggableCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragPrev = useRef({ x: 0, y: 0 });
  const floatTween = useRef<gsap.core.Tween | null>(null);
  const [zBoost, setZBoost] = useState(0);

  const startFloat = useCallback(() => {
    const el = outerRef.current;
    if (!el) return;
    floatTween.current = gsap.to(el, {
      y: `+=${card.floatAmp * scale}`,
      rotate: card.baseRotate + (Math.random() - 0.5) * 2.2,
      duration: card.floatDur,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: card.floatDelay,
    });
  }, [card.floatAmp, card.floatDur, card.floatDelay, card.baseRotate, scale]);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        scale: 0.7,
        rotate: card.baseRotate + (Math.random() > 0.5 ? 20 : -20),
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        rotate: card.baseRotate,
        y: 0,
        duration: 1.1,
        ease: "back.out(1.5)",
        delay: card.floatDelay * 0.35,
        onComplete: startFloat,
      },
    );

    let rectCache: DOMRect | null = null;
    let rafId: number | null = null;
    let mouseX = 0;
    let mouseY = 0;

    const onEnter = () => {
      if (isDragging.current) return;
      rectCache = el.getBoundingClientRect();
      gsap.to(el, {
        scale: 1.05,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const updateRotation = () => {
      if (!rectCache) return;
      const dx = (mouseX - rectCache.left - rectCache.width / 2) / (rectCache.width / 2);
      const dy = (mouseY - rectCache.top - rectCache.height / 2) / (rectCache.height / 2);
      gsap.to(el, {
        rotateX: -dy * 13,
        rotateY: dx * 13,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
      rafId = null;
    };

    const onMove = (e: MouseEvent) => {
      if (isDragging.current || !rectCache) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateRotation);
      }
    };

    const onLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      rectCache = null;
      if (isDragging.current) return;
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1,0.5)",
        overwrite: "auto",
      });
    };
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      setZBoost(60);
      floatTween.current?.pause();
      el.setPointerCapture(e.pointerId);
      dragPrev.current = { x: e.clientX, y: e.clientY };
      gsap.to(el, {
        scale: 1.09,
        rotateX: 0,
        rotateY: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragPrev.current.x;
      const dy = e.clientY - dragPrev.current.y;
      gsap.set(el, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        rotateX: Math.max(-16, Math.min(16, -dy * 0.2)),
        rotateY: Math.max(-16, Math.min(16, dx * 0.2)),
      });
      dragPrev.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setZBoost(0);
      gsap.to(el, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotate: card.baseRotate,
        scale: 1,
        duration: 0.95,
        ease: "elastic.out(1,0.5)",
        onComplete: startFloat,
      });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      floatTween.current?.kill();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [card.baseRotate, card.floatDelay, startFloat]);

  const lines = card.headline.split("\n");
  const headlinePx = Math.round(card.headlineSize * scale);
  const eyebrowPx = Math.round(9 * scale);
  const captionPx = Math.round(11 * scale);
  const sublinePx = Math.round(9 * scale);
  const pad = Math.round(16 * scale);

  return (
    <div
      ref={outerRef}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{
        width: cardW,
        height: cardH,
        left: "50%",
        top: "50%",
        marginLeft: -cardW / 2 + card.offsetX * scale,
        marginTop: -cardH / 2 + card.offsetY * scale,
        transformStyle: "preserve-3d",
        zIndex: zBase + zBoost,
        willChange: "transform",
        touchAction: "none",
      }}>
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between"
        style={{
          padding: pad,
          background: card.gradient,
          border: `1px solid ${card.accent}28`,
          boxShadow: `0 16px 56px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 40px ${card.accent}0d`,
        }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: 1,
            background: `linear-gradient(to right, transparent, ${card.accent}60, transparent)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: card.stackIndex === 0 ? -20 : "auto",
            bottom: card.stackIndex !== 0 ? -20 : "auto",
            left: card.side === "left" ? -20 : "auto",
            right: card.side === "right" ? -20 : "auto",
            width: 90 * scale,
            height: 90 * scale,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${card.accent}2a 0%, transparent 70%)`,
            filter: "blur(14px)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            position: "relative",
            zIndex: 20,
            fontSize: eyebrowPx,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: `${card.accent}88`,
          }}>
          {card.eyebrow}
        </p>
        <div style={{ position: "relative", zIndex: 20 }}>
          {lines.map((line, i) => (
            <p
              key={i}
              className="font-docallisme"
              style={{
                fontSize: headlinePx,
                lineHeight: 1.05,
                color:
                  i === lines.length - 1
                    ? `${card.accent}dd`
                    : `rgba(255,255,255,${0.92 - i * 0.06})`,
                letterSpacing: "-0.01em",
              }}>
              {line}
            </p>
          ))}
          {card.subline && (
            <p
              style={{
                fontSize: sublinePx,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: `${card.accent}55`,
                marginTop: 3,
              }}>
              {card.subline}
            </p>
          )}
        </div>
        <p
          style={{
            position: "relative",
            zIndex: 20,
            fontSize: captionPx,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.01em",
          }}>
          {card.caption}{" "}
          <span style={{ color: `${card.accent}88` }}>
            {card.captionAccent}
          </span>
        </p>
      </div>
    </div>
  );
});

function CardColumn({ side }: { side: "left" | "right" }) {
  const cards = CARDS.filter((c) => c.side === side).sort(
    (a, b) => a.stackIndex - b.stackIndex,
  );

  // All sizes driven by vw — consistent ratio at every breakpoint
  const [dims, setDims] = useState({ w: 160, h: 176, scale: 1 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setDims({ w: 0, h: 0, scale: 0 });
      } else if (vw < 640) {
        // sm
        const w = Math.round(vw * 0.28);
        const h = Math.round(w * 1.1);
        setDims({ w, h, scale: w / 168 });
      } else if (vw < 1024) {
        // md
        const w = Math.round(vw * 0.155);
        const h = Math.round(w * 1.1);
        setDims({ w, h, scale: w / 168 });
      } else if (vw < 1536) {
        // lg / xl
        const w = Math.round(vw * 0.135);
        const h = Math.round(w * 1.1);
        setDims({ w, h, scale: w / 168 });
      } else {
        // 2xl+
        const w = Math.round(vw * 0.115);
        const h = Math.round(w * 1.1);
        setDims({ w, h, scale: w / 168 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (dims.w === 0) return null;

  const containerW = dims.w + Math.round(24 * dims.scale);
  const containerH = dims.h + Math.round(32 * dims.scale);

  return (
    <div
      style={{
        position: "absolute",
        [side]: "clamp(8px, 2vw, 56px)",
        top: "50%",
        transform: "translateY(-50%)",
        width: containerW,
        height: containerH,
        zIndex: 3,
        pointerEvents: "none",
      }}>
      {[...cards].reverse().map((card, i) => (
        <div
          key={card.id}
          style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}>
          <DraggableCard
            card={card}
            zBase={i + 1}
            cardW={dims.w}
            cardH={dims.h}
            scale={dims.scale}
          />
        </div>
      ))}
      <p
        style={{
          position: "absolute",
          bottom: -Math.round(42 * dims.scale),
          left: "30%",
          transform: "translateX(-50%)",
          fontSize: Math.round(9 * dims.scale),
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.16)",
          whiteSpace: "nowrap",
          animation: "fadeHint 1s ease 2.5s both",
          pointerEvents: "none",
        }}>
        drag &amp; release
      </p>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const navNameRef = useRef<HTMLDivElement>(null);
  const navImageRef = useRef<HTMLDivElement>(null);
  const introAreaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const peekRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId = 0;
    let t = 0;
    let isVisible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const blobs: Array<{
      cx: number;
      cy: number;
      rx: number;
      ry: number;
      sx: number;
      sy: number;
      c: [number, number, number];
    }> = [
        {
          cx: 0.18,
          cy: 0.22,
          rx: 0.55,
          ry: 0.45,
          sx: 0.00018,
          sy: 0.00013,
          c: [88, 28, 135],
        },
        {
          cx: 0.75,
          cy: 0.68,
          rx: 0.5,
          ry: 0.4,
          sx: 0.00015,
          sy: 0.0002,
          c: [15, 50, 120],
        },
        {
          cx: 0.5,
          cy: 0.5,
          rx: 0.4,
          ry: 0.35,
          sx: 0.0001,
          sy: 0.00015,
          c: [5, 60, 40],
        },
        {
          cx: 0.85,
          cy: 0.18,
          rx: 0.35,
          ry: 0.3,
          sx: 0.00022,
          sy: 0.00011,
          c: [60, 30, 10],
        },
        {
          cx: 0.12,
          cy: 0.8,
          rx: 0.38,
          ry: 0.32,
          sx: 0.00013,
          sy: 0.00018,
          c: [20, 5, 60],
        },
      ];

    const draw = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(draw);
        return;
      }
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach((b, i) => {
        const cx = (b.cx + Math.sin(t * b.sx + i * 1.3) * 0.18) * canvas.width;
        const cy = (b.cy + Math.cos(t * b.sy + i * 0.9) * 0.15) * canvas.height;
        const rx = b.rx * canvas.width;
        const ry = b.ry * canvas.height;
        const maxR = Math.max(rx, ry);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.22)`);
        g.addColorStop(0.5, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.08)`);
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(rx / maxR, ry / maxR);
        ctx.translate(-cx, -cy);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sentences = gsap.utils.toArray<HTMLElement>(".sentence-item");
      gsap.set(
        [
          navNameRef.current,
          navImageRef.current,
          introAreaRef.current,
          ...sentences,
        ],
        { opacity: 0 },
      );
      gsap.set([navNameRef.current, navImageRef.current], { scale: 0.7 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${(content.length + 1) * 100}%`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        [titleGroupRef.current, heroWrapperRef.current],
        {
          opacity: 0,
          y: -40,
          scale: 0.75,
          duration: 1.8,
          ease: "power3.in",
        },
        0,
      );
      tl.to(
        [navNameRef.current, navImageRef.current],
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        0.8,
      );
      tl.to(introAreaRef.current, { opacity: 1, duration: 0.8 }, 1.6);

      sentences.forEach((s) => {
        tl.fromTo(
          s,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
        )
          .to(s, { duration: 0.8 })
          .to(
            s,
            {
              opacity: 0,
              y: -44,
              duration: 1,
              ease: "power2.in",
            },
            "-=0.2",
          );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const el = heroImageRef.current;
    if (!el) return;
    let originX = 0;
    let originY = 0;
    const draggable = Draggable.create(el, {
      type: "x,y",
      onDragStart() {
        originX = gsap.getProperty(el, "x") as number;
        originY = gsap.getProperty(el, "y") as number;
        if (peekRef.current) peekRef.current.style.opacity = "1";
      },
      onDragEnd() {
        if (peekRef.current) peekRef.current.style.opacity = "0";
        gsap.to(el, {
          x: originX,
          y: originY,
          duration: 0.9,
          ease: "elastic.out(1, 0.45)",
        });
      },
    });
    return () => draggable.forEach((d: { kill: () => void }) => d.kill());
  }, []);

  return (
    <div ref={containerRef} className="bg-black">
      <div
        ref={triggerRef}
        className="relative w-full"
        style={{ height: "100vh", background: "#03030a", overflow: "hidden" }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(2,2,10,0.93) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.038,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.055,
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, black 5%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, black 5%, transparent 100%)",
            }}
          />
        </div>

        <CardColumn side="left" />
        <CardColumn side="right" />

        <div style={{ position: "relative", zIndex: 100 }}>
          <Navbar nameSlotRef={navNameRef} imageSlotRef={navImageRef} />
        </div>

        {/* Title group */}
        <div
          ref={titleGroupRef}
          className="absolute flex flex-col items-center text-center pointer-events-none select-none w-full px-6"
          style={{
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -58%)",
            zIndex: 20,
          }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              style={{
                height: 1,
                width: "clamp(18px,1.5vw,32px)",
                background:
                  "linear-gradient(to right,transparent,rgba(255,255,255,0.15))",
              }}
            />
            <p
              className="font-comforter"
              style={{
                fontSize: "clamp(18px,2.2vw,36px)",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.06em",
              }}>
              hi, i&apos;m
            </p>
            <div
              style={{
                height: 1,
                width: "clamp(18px,1.5vw,32px)",
                background:
                  "linear-gradient(to left,transparent,rgba(255,255,255,0.15))",
              }}
            />
          </div>

          <h1
            className="font-docallisme uppercase"
            style={{
              fontSize: "clamp(48px, 8.5vw, 140px)",
              lineHeight: 0.88,
              marginBottom: "0.12em",
              background:
                "linear-gradient(135deg,#ea580c 0%,#fbbf24 25%,#10b981 50%,#3b82f6 75%,#ea580c 100%)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "colorFlow 8s linear infinite",
              padding: "0.05em 0.08em",
            }}>
            Divyanshu
            <br />
            Singh
          </h1>

          <div
            className="flex items-center gap-2"
            style={{
              marginTop: "clamp(12px,1.8vw,28px)",
              animation: "fadeHint 1s ease 3.2s both",
            }}>
            <div
              style={{
                height: 1,
                width: "clamp(14px,1.2vw,22px)",
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <p
              style={{
                fontSize: "clamp(11px,0.6vw,11px)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.16)",
              }}>
              scroll to know me
            </p>
            <div
              style={{
                height: 1,
                width: "clamp(14px,1.2vw,22px)",
                background: "rgba(255,255,255,0.1)",
              }}
            />
          </div>
        </div>

        {/* Hero avatar + peekaboo */}
        <div
          ref={heroWrapperRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, clamp(28px, 4vh, 72px))",
            zIndex: 30,
            width: "clamp(160px, 16vw, 300px)",
            height: "clamp(160px, 16vw, 300px)",
          }}>
          {/* Peekaboo */}
          <div
            ref={peekRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 0,
              userSelect: "none",
              gap: 6,
              opacity: 0,
              transition: "opacity 0.2s ease",
              pointerEvents: "none",
            }}>
            <p
              className="font-poppins"
              style={{
                fontSize: "clamp(11px,0.6vw,12px)",
                letterSpacing: "0.04em",
                lineHeight: 1,
                color: "rgba(255,255,255,0.5)",
              }}>
              peek-a-boo!
            </p>
          </div>

          {/* Draggable image */}
          <div
            ref={heroImageRef}
            className="absolute inset-0 select-none cursor-grab active:cursor-grabbing"
            style={{
              borderRadius: "clamp(14px,1.2vw,22px)",
              border: "1px solid rgba(74,222,128,0.1)",
              boxShadow:
                "0 0 50px rgba(74,222,128,0.07), 0 24px 64px rgba(0,0,0,0.8)",
              zIndex: 1,
            }}>
            <Image
              src="/images/meava.png"
              alt="Divyanshu Singh"
              fill
              priority
              className="object-cover"
              style={{ borderRadius: "clamp(14px,1.2vw,22px)" }}
              draggable={false}
            />
            <div
              style={{
                position: "absolute",
                inset: -10,
                borderRadius: "clamp(18px,1.6vw,28px)",
                border: "1px solid rgba(74,222,128,0.04)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Status pill */}
        {/* <div
          className="absolute pointer-events-none select-none"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: NAVBAR_H + 16,
            zIndex: 5,
          }}>
          <div
            style={{
              padding: "clamp(4px,0.4vh,7px) clamp(10px,1vw,18px)",
              borderRadius: 999,
              border: "1px solid rgba(74, 222, 128, 1)",
              background: "rgba(74,222,128,0.04)",
              color: "#4ade80",
              fontSize: "clamp(9px,0.7vw,12px)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              backdropFilter: "blur(8px)",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
            <span
              style={{
                width: "clamp(4px,0.35vw,6px)",
                height: "clamp(4px,0.35vw,6px)",
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                boxShadow: "0 0 6px #4ade80",
                animation: "heroPulse 2s ease-in-out infinite",
              }}
            />
            available for work
          </div>
        </div> */}

        {/* Corner watermarks */}
        <div
          className="absolute pointer-events-none select-none font-docallisme"
          style={{
            bottom: "clamp(14px,2vw,32px)",
            left: "clamp(14px,2vw,32px)",
            fontSize: "clamp(24px,3.8vw,80px)",
            color: "rgba(255,255,255,0.035)",
            lineHeight: 0.88,
            zIndex: 2,
          }}>
          dixen
        </div>
        <div
          className="absolute pointer-events-none select-none font-sedgwick text-right"
          style={{
            bottom: "clamp(14px,2vw,32px)",
            right: "clamp(14px,2vw,32px)",
            fontSize: "clamp(16px,2.2vw,48px)",
            color: "rgba(255,255,255,0.025)",
            lineHeight: 0.88,
            zIndex: 2,
          }}>
          2026
        </div>

        {/* Scroll story */}
        <div
          ref={introAreaRef}
          className="absolute inset-x-0 bottom-0 flex items-center font-comforter justify-center pointer-events-none"
          style={{ top: NAVBAR_H + 16, zIndex: 25 }}>
          {content.map((item, i) => (
            <div
              key={i}
              className="sentence-item absolute opacity-0 flex flex-col items-center px-8 w-full"
              style={{
                gap: "clamp(10px,1.2vw,22px)",
                maxWidth: "min(1000px, 88vw)",
              }}>
              {(item.badge || item.tag) && (
                <div
                  style={{
                    padding: "3px clamp(10px,0.9vw,16px)",
                    fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
                    borderRadius: 999,
                    background: item.badge
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.02)",
                    border: item.badge
                      ? "1px solid rgba(255,255,255,0.12)"
                      : "1px solid rgba(255,255,255,0.06)",
                    color: item.badge
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.3)",
                    fontSize: "clamp(9px,0.7vw,12px)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    backdropFilter: "blur(8px)",
                  }}>
                  {item.badge ?? `# ${item.tag}`}
                </div>
              )}
              <p
                style={{
                  fontSize: "clamp(26px,4.5vw,72px)",
                  color: "rgba(255,255,255,0.92)",
                  textAlign: "center",
                  lineHeight: 1.18,
                  fontFamily: "inherit",
                  textShadow: "0 4px 32px rgba(0,0,0,0.8)",
                }}>
                {item.text}
              </p>
              {item.gif && (
                <div
                  className="flex justify-center"
                  style={{ gap: "clamp(8px,0.9vw,18px)" }}>
                  {(Array.isArray(item.gif) ? item.gif : [item.gif]).map(
                    (src, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-2xl overflow-hidden"
                        style={{
                          width: "clamp(130px,16vw,340px)",
                          height: "clamp(80px,10vw,210px)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
                          flexShrink: 0,
                        }}>
                        <Image
                          src={src}
                          alt="showcase"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(135deg,rgba(0,0,0,0.12) 0%,transparent 50%)",
                            pointerEvents: "none",
                          }}
                        />
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes colorFlow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes heroPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:0.4; transform:scale(0.72); }
        }
        @keyframes fadeHint {
          from { opacity:0; transform:translateY(5px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}
