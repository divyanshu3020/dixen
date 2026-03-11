"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

// ── Platform links ──────────────────────────────────────────
const platforms = [
  {
    name: "GitHub",
    handle: "@dixen",
    url: "https://github.com",
    color: "#f0f0f0",
    bg: "#161b22",
    desc: "code lives here",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Divyanshu Singh",
    url: "https://linkedin.com",
    color: "#0a66c2",
    bg: "#0a0e1a",
    desc: "professional side",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@dixen.dev",
    url: "https://instagram.com",
    color: "#e1306c",
    bg: "#0d0a0e",
    desc: "life & aesthetics",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@dixen",
    url: "https://youtube.com",
    color: "#ff0000",
    bg: "#0f0a0a",
    desc: "building in public",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    handle: "dixen#0001",
    url: "https://discord.com",
    color: "#5865f2",
    bg: "#0a0b1a",
    desc: "come say hi",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.09.12 18.12.143 18.14a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "X",
    handle: "@dixen_dev",
    url: "https://x.com",
    color: "#e7e9ea",
    bg: "#080808",
    desc: "hot takes & builds",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    handle: "@dixen",
    url: "https://figma.com",
    color: "#a259ff",
    bg: "#0c0a14",
    desc: "where pixels get born",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 0 0 0 6.664A3.334 3.334 0 0 0 12 18.664V8.668h3.332zm0 0a3.334 3.334 0 1 1 0 6.667 3.334 3.334 0 0 1 0-6.667z" />
      </svg>
    ),
  },
  {
    name: "Duolingo",
    handle: "dixen",
    url: "https://duolingo.com",
    color: "#58cc02",
    bg: "#060d04",
    desc: "learning languages",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.4 4.2C17.5 1.6 14.4 0 11 0 4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11c0-2.5-.8-4.7-2.1-6.5l-.5-.3zM11 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
        <path d="M8 11.5c0 .8-.7 1.5-1.5 1.5S5 12.3 5 11.5 5.7 10 6.5 10 8 10.7 8 11.5zM19 11.5c0 .8-.7 1.5-1.5 1.5S16 12.3 16 11.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5zM11 15c-2.2 0-4-1.3-4-3h8c0 1.7-1.8 3-4 3z" />
      </svg>
    ),
  },
];

// ── Guestbook entries ────────────────────────────────────────
const existingMessages = [
  { name: "Arjun K.", msg: "This portfolio hit different. 🔥", liked: true },
  { name: "Sarah M.", msg: "The GSAP animations are insane bro", liked: true },
  { name: "Rahul D.", msg: "Hired. Let's build something.", liked: false },
];

// ── Spray colors ─────────────────────────────────────────────
const sprayColors = [
  "#ff3c00", "#ff9900", "#ffd700", "#00ff87",
  "#00cfff", "#bf00ff", "#ff006e", "#ffffff",
];

// ── Scramble hook ────────────────────────────────────────────
const GLITCH_CHARS = "!@#$%^&*<>?/\\|{}[]~`ΩΔΨΛ▓▒░█▄▀■□▪▫";
function useScramble(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!active) { setDisplay(text); iterRef.current = 0; return; }
    const totalFrames = text.length * 3;
    const run = () => {
      iterRef.current++;
      setDisplay(text.split("").map((ch, i) => {
        if (i < iterRef.current / 3) return ch;
        if (ch === " ") return " ";
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }).join(""));
      if (iterRef.current < totalFrames) frameRef.current = setTimeout(run, 30);
      else setDisplay(text);
    };
    run();
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  }, [active, text]);

  return display;
}

// ── Stat counter ─────────────────────────────────────────────
function StatCounter({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(end / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(start);
        }, 16);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-docallisme text-white leading-none" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
        {count}{suffix}
      </span>
      <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">{label}</span>
    </div>
  );
}

// ── Vibe check ───────────────────────────────────────────────
const vibes = [
  { label: "🥶 No vibe", color: "#00cfff" },
  { label: "😐 Meh", color: "#888" },
  { label: "🔥 Fire", color: "#ff3c00" },
  { label: "💀 Dead", color: "#bf00ff" },
  { label: "👑 King", color: "#ffd700" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const graffitiRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const sprayCanvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(142);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState(existingMessages);
  const [hoveredPlatform, setHoveredPlatform] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const likeRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Spray paint state
  const [activeSprayColor, setActiveSprayColor] = useState(sprayColors[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(18);
  const [sprayTagged, setSprayTagged] = useState(false);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Vibe check state
  const [selectedVibe, setSelectedVibe] = useState<number | null>(null);
  const [vibeCounts, setVibeCounts] = useState([12, 8, 47, 23, 31]);

  // Glitch heading
  const [headingHovered, setHeadingHovered] = useState(false);
  const letsBuild = useScramble("Let's Build.", headingHovered);

  // Cursor trail
  const trailRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // ── Scroll reveals ──────────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(graffitiRef.current,
        { opacity: 0, y: 80, filter: "blur(16px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: graffitiRef.current, start: "top 90%", toggleActions: "play none none reverse" } }
      );
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: formRef.current, start: "top 85%", toggleActions: "play none none reverse" } }
      );
      gsap.fromTo(linksRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: linksRef.current, start: "top 88%", toggleActions: "play none none reverse" } }
      );
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 88%", toggleActions: "play none none reverse" } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  // ── Spray paint canvas ──────────────────────────────────────
  useEffect(() => {
    const canvas = sprayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const spray = (x: number, y: number) => {
      const density = 40;
      ctx.fillStyle = activeSprayColor;
      for (let i = 0; i < density; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * brushSize;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        const opacity = Math.random() * 0.35 + 0.05;
        ctx.globalAlpha = opacity;
        const dotSize = Math.random() * 2.5 + 0.5;
        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
      return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
    };

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDrawingRef.current = true;
      setIsDrawing(true);
      const pos = getPos(e);
      lastPosRef.current = pos;
      spray(pos.x, pos.y);
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      const pos = getPos(e);
      spray(pos.x, pos.y);
      lastPosRef.current = pos;
      setSprayTagged(true);
    };

    const onUp = () => { isDrawingRef.current = false; setIsDrawing(false); };

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    canvas.addEventListener("touchmove", onMove, { passive: true });
    canvas.addEventListener("touchend", onUp);
    window.addEventListener("resize", resize);

    return () => {
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mouseleave", onUp);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove", onMove);
      canvas.removeEventListener("touchend", onUp);
      window.removeEventListener("resize", resize);
    };
  }, [activeSprayColor, brushSize]);

  const clearCanvas = () => {
    const canvas = sprayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setSprayTagged(false);
  };

  // ── Like button ─────────────────────────────────────────────
  const handleLike = () => {
    if (liked) return;
    setLiked(true);
    setLikeCount((c) => c + 1);
    gsap.timeline()
      .to(likeRef.current, { scale: 1.4, duration: 0.15, ease: "power2.out" })
      .to(likeRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" });
    if (particlesRef.current) {
      for (let i = 0; i < 12; i++) {
        const p = document.createElement("div");
        const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6bff"];
        p.style.cssText = `position:absolute;width:6px;height:6px;border-radius:50%;background:${colors[i % colors.length]};pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%);`;
        particlesRef.current.appendChild(p);
        const angle = (i / 12) * Math.PI * 2;
        const dist = 40 + Math.random() * 30;
        gsap.to(p, {
          x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
          opacity: 0, scale: 0, duration: 0.7, ease: "power2.out",
          onComplete: () => p.remove(),
        });
      }
    }
  };

  // ── Submit ──────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!name.trim() || !msg.trim()) return;
    setMessages((prev) => [{ name, msg, liked: false }, ...prev]);
    setSubmitted(true);
    setName(""); setMsg("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleVibe = (i: number) => {
    if (selectedVibe !== null) return;
    setSelectedVibe(i);
    setVibeCounts(prev => prev.map((c, idx) => idx === i ? c + 1 : c));
  };

  const totalVibes = vibeCounts.reduce((a, b) => a + b, 0);

  return (
    <>
      <footer
        ref={footerRef}
        className="relative w-full overflow-hidden"
        style={{ background: "#020202" }}
      >
        {/* ── BACKGROUND ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,60,0,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", top: "20%", right: "-10%", width: "700px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,160,0,0.05) 0%, transparent 65%)", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", bottom: "-5%", left: "30%", width: "500px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,0,255,0.05) 0%, transparent 65%)", filter: "blur(90px)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,220,0,0.04) 0%, transparent 65%)", filter: "blur(70px)" }} />
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ position: "absolute", top: `${10 + i * 18}%`, left: `${-5 + i * 8}%`, width: `${200 + i * 30}px`, height: "1px", background: `linear-gradient(to right, transparent, rgba(255,${80 + i * 20},0,0.06), transparent)`, transform: `rotate(${-15 + i * 6}deg)`, filter: "blur(1px)" }} />
          ))}
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px" }} />
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">

          {/* ── GIANT GRAFFITI HEADING ── */}
          <div ref={graffitiRef} className="relative mb-16 overflow-visible">
            <h2
              className="font-docallisme leading-[0.82] select-none cursor-default"
              onMouseEnter={() => setHeadingHovered(true)}
              onMouseLeave={() => setHeadingHovered(false)}
              style={{
                fontSize: "clamp(80px, 14vw, 200px)",
                background: "linear-gradient(135deg, #ff3c00 0%, #ff9900 30%, #ffffff 55%, #ff3c00 80%, #ffd700 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "graffFlow 6s linear infinite",
                letterSpacing: "-0.02em",
                transition: "filter 0.1s",
                filter: headingHovered ? "drop-shadow(0 0 30px rgba(255,80,0,0.4))" : "none",
              }}
            >
              {headingHovered ? letsBuild.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              )) : (
                <>Let&lsquo;s<br /><span style={{ marginLeft: "clamp(40px, 8vw, 120px)" }}>Build.</span></>
              )}
            </h2>
            <p className="font-comforter text-white/30 italic mt-4 ml-1" style={{ fontSize: "clamp(16px, 2vw, 24px)" }}>
              — open to work, collabs & conversations
            </p>
            <div className="absolute bottom-0 right-0 font-comforter italic text-white/10 pointer-events-none select-none" style={{ fontSize: "clamp(40px, 6vw, 90px)", lineHeight: 1 }}>
              dixen&lsquo;26
            </div>
          </div>

          {/* ── STATS ROW ── */}
          <div ref={statsRef} className="relative mb-16 p-8 rounded-3xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(255,80,0,0.04) 0%, transparent 60%)",
            }} />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCounter end={12} label="Projects shipped" suffix="+" />
              <StatCounter end={3} label="Years crafting" suffix="+" />
              <StatCounter end={847} label="Commits this year" />
              <StatCounter end={99} label="Cups of coffee" suffix="%" />
            </div>
            <div className="absolute top-3 right-5 font-comforter italic text-white/5 select-none pointer-events-none" style={{ fontSize: "clamp(20px, 3vw, 42px)" }}>
              by the numbers
            </div>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">

            {/* COL 1: Contact */}
            <div className="flex flex-col gap-6">
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-2">reach out</p>
              <button onClick={() => handleCopy("divyanshu@email.com", "email")}
                className="group flex items-start gap-4 text-left transition-all duration-200 hover:translate-x-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(255,60,0,0.08)", border: "1px solid rgba(255,60,0,0.15)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,100,0,0.8)" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-xs tracking-widest uppercase mb-0.5">Email</p>
                  <p className="text-white text-sm font-medium">divyanshu@email.com</p>
                  <p className="text-white/25 text-xs mt-0.5 group-hover:text-white/50 transition-colors">
                    {copied === "email" ? "✓ copied!" : "click to copy"}
                  </p>
                </div>
              </button>
              <button onClick={() => handleCopy("+91 98765 43210", "phone")}
                className="group flex items-start gap-4 text-left transition-all duration-200 hover:translate-x-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(255,160,0,0.08)", border: "1px solid rgba(255,160,0,0.15)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,160,0,0.8)" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-xs tracking-widest uppercase mb-0.5">Phone</p>
                  <p className="text-white text-sm font-medium">+91 98765 43210</p>
                  <p className="text-white/25 text-xs mt-0.5 group-hover:text-white/50 transition-colors">
                    {copied === "phone" ? "✓ copied!" : "click to copy"}
                  </p>
                </div>
              </button>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-fit mt-2"
                style={{ background: "rgba(0,255,100,0.05)", border: "1px solid rgba(0,255,100,0.12)" }}>
                <div className="w-2 h-2 rounded-full bg-green-400"
                  style={{ animation: "neonPulse 2s ease-in-out infinite", boxShadow: "0 0 8px #4ade80" }} />
                <span className="text-green-400/80 text-xs font-medium tracking-wide">Available for work — Mar 2026</span>
              </div>

              {/* ── VIBE CHECK ── */}
              <div className="mt-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-3">vibe check 🌡️</p>
                <p className="text-white/40 text-xs mb-4">what's the energy rn?</p>
                <div className="flex flex-col gap-2">
                  {vibes.map((v, i) => {
                    const pct = totalVibes > 0 ? Math.round((vibeCounts[i] / totalVibes) * 100) : 0;
                    return (
                      <button
                        key={i}
                        onClick={() => handleVibe(i)}
                        disabled={selectedVibe !== null}
                        className="relative flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-300 overflow-hidden group"
                        style={{
                          border: `1px solid ${selectedVibe === i ? v.color + "44" : "rgba(255,255,255,0.05)"}`,
                          background: selectedVibe === i ? v.color + "11" : "transparent",
                          cursor: selectedVibe !== null ? "default" : "pointer",
                        }}
                      >
                        {/* progress fill */}
                        {selectedVibe !== null && (
                          <div style={{
                            position: "absolute", left: 0, top: 0, bottom: 0,
                            width: `${pct}%`, background: v.color + "15",
                            transition: "width 0.8s ease", borderRadius: "inherit",
                          }} />
                        )}
                        <span className="relative z-10 text-sm">{v.label}</span>
                        {selectedVibe !== null && (
                          <span className="relative z-10 ml-auto text-xs font-bold" style={{ color: v.color }}>
                            {pct}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {selectedVibe !== null && (
                  <p className="text-white/25 text-[10px] mt-3 text-center tracking-widest uppercase">
                    {vibeCounts.reduce((a, b) => a + b, 0)} vibers total
                  </p>
                )}
              </div>
            </div>

            {/* COL 2 & 3: Platform links */}
            <div ref={linksRef} className="lg:col-span-2">
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-5">find me everywhere</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {platforms.map((p, i) => (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredPlatform(i)}
                    onMouseLeave={() => setHoveredPlatform(null)}
                    className="group relative flex flex-col items-start gap-2 p-4 rounded-2xl transition-all duration-300"
                    style={{
                      background: hoveredPlatform === i ? p.bg : "rgba(255,255,255,0.02)",
                      border: `1px solid ${hoveredPlatform === i ? p.color + "33" : "rgba(255,255,255,0.05)"}`,
                      transform: hoveredPlatform === i ? "translateY(-3px)" : "none",
                      boxShadow: hoveredPlatform === i ? `0 8px 30px ${p.color}15` : "none",
                    }}
                  >
                    <div className="transition-colors duration-300"
                      style={{ color: hoveredPlatform === i ? p.color : "rgba(255,255,255,0.3)" }}>
                      {p.icon}
                    </div>
                    <div>
                      <p className="text-white/80 text-xs font-semibold tracking-wide">{p.name}</p>
                      <p className="text-white/25 text-[10px] mt-0.5 group-hover:text-white/40 transition-colors truncate">{p.handle}</p>
                    </div>
                    <p className="text-[9px] tracking-wide transition-all duration-300"
                      style={{
                        color: hoveredPlatform === i ? `${p.color}99` : "transparent",
                        transform: hoveredPlatform === i ? "translateY(0)" : "translateY(4px)",
                      }}>
                      {p.desc}
                    </p>
                    <svg className="absolute top-3 right-3 transition-all duration-300"
                      width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke={hoveredPlatform === i ? p.color : "rgba(255,255,255,0.1)"}
                      strokeWidth="2" strokeLinecap="round"
                      style={{ opacity: hoveredPlatform === i ? 1 : 0.4 }}>
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* ── DESIGNED & BUILT BY DIXEN ── */}
              <a
                href="https://linkedin.com/in/divyanshu-singh"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(10,102,194,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(10,102,194,0.3)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(10,102,194,0.12)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Graffiti credit block */}
                <div className="flex-1">
                  <p className="text-white/15 text-[9px] tracking-[0.4em] uppercase mb-1">designed & developed by</p>
                  <p className="font-docallisme text-white leading-none" style={{
                    fontSize: "clamp(28px, 4vw, 48px)",
                    background: "linear-gradient(135deg, #ff3c00, #ff9900, #ffd700)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "graffFlow 4s linear infinite",
                    backgroundSize: "200% auto",
                  }}>
                    Dixen
                  </p>
                  <p className="text-white/20 text-xs mt-1 group-hover:text-blue-400/50 transition-colors duration-300 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-50">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Divyanshu Singh — LinkedIn ↗
                  </p>
                </div>
                {/* Spray can icon */}
                <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{ background: "rgba(255,60,0,0.06)", border: "1px solid rgba(255,60,0,0.12)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,100,0,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3h8l1 5H7L8 3z" />
                    <rect x="6" y="8" width="12" height="13" rx="2" />
                    <path d="M10 8v13M14 8v13" opacity="0.4" />
                    <path d="M15 2c1 0 2 .5 2 1.5" />
                    <circle cx="17" cy="1.5" r="0.8" fill="rgba(255,100,0,0.6)" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="w-full h-px mb-16" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />

          {/* ── SPRAY PAINT CANVAS ── */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: activeSprayColor, animation: "neonPulse 2s ease-in-out infinite", boxShadow: `0 0 8px ${activeSprayColor}` }} />
                  <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">spray wall — tag it</p>
                </div>
                <h3 className="font-docallisme text-white leading-none" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
                  The wall is yours.
                </h3>
                <p className="text-white/30 text-sm mt-2">Pick a color. Pick a size. Go crazy. Leave your mark on my wall. 🎨</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Brush size */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-white/30 text-[9px] tracking-widest uppercase">size</span>
                  {[8, 18, 32].map(s => (
                    <button key={s} onClick={() => setBrushSize(s)}
                      className="rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        width: `${s * 0.7 + 12}px`, height: `${s * 0.7 + 12}px`,
                        background: brushSize === s ? activeSprayColor + "33" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${brushSize === s ? activeSprayColor + "66" : "rgba(255,255,255,0.08)"}`,
                      }}>
                      <div style={{ width: `${s * 0.35 + 3}px`, height: `${s * 0.35 + 3}px`, borderRadius: "50%", background: brushSize === s ? activeSprayColor : "rgba(255,255,255,0.3)" }} />
                    </button>
                  ))}
                </div>
                {/* Clear */}
                {sprayTagged && (
                  <button onClick={clearCanvas}
                    className="px-4 py-2 rounded-xl text-xs text-white/40 transition-all duration-200 hover:text-white/70"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    clear ×
                  </button>
                )}
              </div>
            </div>

            {/* Color swatches */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {sprayColors.map((c) => (
                <button key={c} onClick={() => setActiveSprayColor(c)}
                  className="transition-all duration-200"
                  style={{
                    width: activeSprayColor === c ? "44px" : "32px",
                    height: activeSprayColor === c ? "44px" : "32px",
                    borderRadius: "50%",
                    background: c,
                    border: `2px solid ${activeSprayColor === c ? c : "transparent"}`,
                    boxShadow: activeSprayColor === c ? `0 0 16px ${c}88` : "none",
                    outline: activeSprayColor === c ? `2px solid ${c}44` : "none",
                    outlineOffset: "3px",
                  }} />
              ))}
            </div>

            {/* Canvas */}
            <div className="relative rounded-3xl overflow-hidden"
              style={{
                height: "280px",
                background: "#0a0a0a",
                border: `1px solid ${isDrawing ? activeSprayColor + "33" : "rgba(255,255,255,0.06)"}`,
                boxShadow: isDrawing ? `0 0 40px ${activeSprayColor}22` : "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
                cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='12' fill='none' stroke='${encodeURIComponent(activeSprayColor)}' stroke-width='2'/%3E%3Ccircle cx='16' cy='16' r='2' fill='${encodeURIComponent(activeSprayColor)}'/%3E%3C/svg%3E") 16 16, crosshair`,
              }}>

              {/* Hint text */}
              {!sprayTagged && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                  <span style={{ fontSize: "48px", opacity: 0.08 }}>🎨</span>
                  <p className="text-white/10 text-sm mt-2 font-comforter italic">drag to spray...</p>
                </div>
              )}

              {/* Faint grid lines */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />

              <canvas ref={sprayCanvasRef} className="absolute inset-0 w-full h-full" />
            </div>
          </div>

          {/* ── GUESTBOOK ── */}
          <div ref={formRef} className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" style={{ animation: "neonPulse 2s ease-in-out infinite" }} />
                  <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">guestbook</p>
                </div>
                <h3 className="font-docallisme text-white leading-none" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
                  Leave your mark.
                </h3>
                <p className="text-white/30 text-sm mt-3 max-w-md leading-relaxed">
                  You just scrolled through my whole world — drop your name, leave a vibe.
                  This is your wall to tag. No signup, no nonsense. Just you and a message. 🖊️
                </p>
              </div>
              {/* Like button */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase text-center">liked it?</p>
                <div className="relative" ref={particlesRef}>
                  <button ref={likeRef} onClick={handleLike}
                    className="relative flex flex-col items-center gap-1.5 px-6 py-4 rounded-2xl transition-all duration-300"
                    style={{
                      background: liked ? "rgba(255,80,80,0.12)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${liked ? "rgba(255,80,80,0.3)" : "rgba(255,255,255,0.08)"}`,
                      cursor: liked ? "default" : "pointer",
                    }}>
                    <span style={{ fontSize: "28px", filter: liked ? "none" : "grayscale(1) opacity(0.4)", transition: "filter 0.3s" }}>❤️</span>
                    <span className="font-docallisme text-2xl leading-none" style={{ color: liked ? "#ff5050" : "rgba(255,255,255,0.3)" }}>{likeCount}</span>
                    <span className="text-white/20 text-[9px] tracking-widest uppercase">{liked ? "thank you!" : "tap to like"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form */}
              <div className="flex flex-col gap-3 p-6 rounded-3xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 py-8 text-center">
                    <span style={{ fontSize: "40px" }}>🎨</span>
                    <p className="font-docallisme text-white text-2xl">Tagged. Respect.</p>
                    <p className="text-white/30 text-sm">Your message is on the wall now.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/30 text-[10px] tracking-[0.25em] uppercase">your name / handle</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Enshu, @design_nerd, Anonymous..."
                        className="w-full bg-transparent text-white text-sm placeholder-white/15 outline-none py-3 px-4 rounded-xl transition-all duration-200"
                        style={{ border: "1px solid rgba(255,255,255,0.07)", caretColor: "#ff6b00" }}
                        onFocus={(e) => e.target.style.borderColor = "rgba(255,107,0,0.3)"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.07)"} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/30 text-[10px] tracking-[0.25em] uppercase">your message</label>
                      <textarea value={msg} onChange={(e) => setMsg(e.target.value)}
                        placeholder="Say anything — feedback, a hire, a meme, a vibe..."
                        rows={3}
                        className="w-full bg-transparent text-white text-sm placeholder-white/15 outline-none py-3 px-4 rounded-xl resize-none transition-all duration-200"
                        style={{ border: "1px solid rgba(255,255,255,0.07)", caretColor: "#ff6b00" }}
                        onFocus={(e) => e.target.style.borderColor = "rgba(255,107,0,0.3)"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.07)"} />
                    </div>
                    <button onClick={handleSubmit} disabled={!name.trim() || !msg.trim()}
                      className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{
                        background: name.trim() && msg.trim() ? "linear-gradient(135deg, #ff3c00, #ff9900)" : "rgba(255,255,255,0.05)",
                        color: name.trim() && msg.trim() ? "#000" : "rgba(255,255,255,0.3)",
                        boxShadow: name.trim() && msg.trim() ? "0 0 20px rgba(255,80,0,0.3)" : "none",
                      }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                      Leave your tag
                    </button>
                  </>
                )}
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
                {messages.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      animation: i === 0 && messages.length > existingMessages.length ? "slideIn 0.4s ease-out" : "none",
                    }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: `hsl(${(m.name.charCodeAt(0) * 37) % 360}, 50%, 20%)`,
                        border: `1px solid hsl(${(m.name.charCodeAt(0) * 37) % 360}, 50%, 35%)`,
                        color: `hsl(${(m.name.charCodeAt(0) * 37) % 360}, 80%, 70%)`,
                      }}>
                      {m.name[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/70 text-xs font-semibold">{m.name}</p>
                      <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{m.msg}</p>
                    </div>
                    {m.liked && <span className="text-sm shrink-0">❤️</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-3">
              <span className="font-docallisme text-white/20 text-lg">dixen</span>
              <span className="text-white/10 text-xs">×</span>
              <span className="text-white/15 text-xs">designed & built with obsession</span>
            </div>
            <div className="flex items-center gap-6 text-white/15 text-xs">
              <span>© 2026</span>
              <span>·</span>
              <span className="font-comforter italic text-white/20">made with 🔥 not templates</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes graffFlow {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          @keyframes neonPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes countUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </footer>
    </>
  );
}