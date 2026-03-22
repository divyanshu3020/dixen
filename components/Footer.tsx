"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const platforms = [
  {
    name: "GitHub",
    handle: "@divyanshu3020",
    url: "https://github.com/divyanshu3020",
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
    url: "https://linkedin.com/in/divyanshu3020",
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
    handle: "di.vyanshu341",
    url: "https://www.instagram.com/di.vyanshu341/",
    color: "#e1306c",
    bg: "#0d0a0e",
    desc: "Just for the presence on IG (Don't like insta btw)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@dixen",
    url: "https://www.youtube.com/watch?v=RLJ7NnJ7Rpo",
    color: "#ff0000",
    bg: "#0f0a0a",
    desc: "Not there yet but click it",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    handle: "divyanshu3811",
    url: "https://discord.com/channels/divyanshu3811",
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
    handle: "@Divyans25218905",
    url: "https://x.com/Divyans25218905",
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
    url: "https://www.figma.com/design/a6VCNhB0LH8250bUB2XQvI/SHOWCASE?node-id=0-1&t=zZbVTAKwuRvHSwxl-1",
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
    handle: "jackalx1",
    url: "https://www.duolingo.com/profile/jackalx1",
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

const existingMessages = [
  { name: "Sumit", msg: "Nice work bro !!. 🔥", liked: false },
  // { name: "Sarah M.", msg: "The GSAP animations are insane bro", liked: true },
  // { name: "Rahul D.", msg: "Hired. Let's build something.", liked: false },
];

const SPRAY_COLORS = [
  "#ff3c00",
  "#ff9900",
  "#ffd700",
  "#00ff87",
  "#00cfff",
  "#bf00ff",
  "#ff006e",
  "#ffffff",
];
const GLITCH_CHARS = "!?#@%^&*<>/\\~+=|{}[]";
const VIBES = [
  { emoji: "🥶", label: "No vibe", color: "#00cfff" },
  { emoji: "😐", label: "Meh", color: "#888888" },
  { emoji: "🔥", label: "Fire", color: "#ff3c00" },
  { emoji: "💀", label: "Dead", color: "#bf00ff" },
  { emoji: "👑", label: "King", color: "#ffd700" },
];

// ─────────────────────────────────────────────────────────────
// GLITCH HEADING — overlay approach, zero layout impact
// ─────────────────────────────────────────────────────────────
function GlitchLine({
  text,
  active,
  gradientStyle,
  style,
}: {
  text: string;
  active: boolean;
  gradientStyle: React.CSSProperties;
  style?: React.CSSProperties;
}) {
  const [glitch, setGlitch] = useState<string[]>(() => text.split(""));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!active) {
      frameRef.current = 0;
      setGlitch(text.split(""));
      return;
    }

    const scramblable = text.split("").filter((c) => c !== " ");
    const total = scramblable.length;
    frameRef.current = 0;

    const run = () => {
      frameRef.current++;
      const resolved = Math.floor(frameRef.current / 3);
      let ri = 0;
      setGlitch(
        text.split("").map((ch) => {
          if (ch === " ") return " ";
          ri++;
          if (ri <= resolved) return ch;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }),
      );
      if (frameRef.current < total * 3) timerRef.current = setTimeout(run, 40);
      else setGlitch(text.split(""));
    };
    run();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, text]);

  const shared: React.CSSProperties = {
    ...gradientStyle,
    display: "block",
    lineHeight: "inherit",
    letterSpacing: "inherit",
  };

  return (
    <span style={{ position: "relative", display: "block", ...style }}>
      {/* invisible — owns the layout */}
      <span
        style={{ ...shared, visibility: "hidden", userSelect: "none" }}
        aria-hidden="false">
        {text}
      </span>
      {/* visible glitch — absolute, never touches layout */}
      <span
        style={{
          ...shared,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden="true">
        {glitch.join("")}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// STAT COUNTER
// ─────────────────────────────────────────────────────────────
function StatCounter({
  end,
  label,
  suffix = "",
}: {
  end: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let v = 0;
          const step = Math.max(1, Math.ceil(end / 60));
          const id = setInterval(() => {
            v = Math.min(v + step, end);
            setCount(v);
            if (v >= end) clearInterval(id);
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5">
      <span
        className="font-serif text-white leading-none"
        style={{ fontSize: "clamp(30px,4vw,56px)" }}>
        {count}
        {suffix}
      </span>
      <span className="text-white/25 text-[9px] tracking-[0.3em] uppercase text-center mt-2">
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const graffitiRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sprayRef = useRef<HTMLDivElement>(null);
  const vibeRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // spray
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const activeColorRef = useRef(SPRAY_COLORS[0]);
  const brushSizeRef = useRef(18);
  const wallLoadedRef = useRef(false);
  const showingWarningRef = useRef(false);
  const [activeColor, setActiveColor] = useState(SPRAY_COLORS[0]);
  const [brushSize, setBrushSize] = useState(18);
  const [hasTagged, setHasTagged] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  useEffect(() => {
    activeColorRef.current = activeColor;
  }, [activeColor]);
  useEffect(() => {
    brushSizeRef.current = brushSize;
  }, [brushSize]);

  // guestbook
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] =
    useState<Array<{ name: string; msg: string; liked: boolean }>>(
      existingMessages,
    );
  const [messagesLoading, setMessagesLoading] = useState(true);
  const likeRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // misc
  const [hoveredPlatform, setHoveredPlatform] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<number | null>(null);
  const [vibeCounts, setVibeCounts] = useState<number[]>([0, 0, 0, 0, 0]);
  const [vibesLoading, setVibesLoading] = useState(true);
  const [headingHovered, setHeadingHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sprayDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── mark component as mounted (prevents hydration mismatch) ──
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── scroll reveals ──────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reveal = (el: Element | null, y = 55, delay = 0) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      };
      reveal(graffitiRef.current, 80);
      reveal(statsRef.current, 50, 0.08);
      reveal(sprayRef.current, 50);
      reveal(vibeRef.current, 35);
      reveal(guestRef.current, 50, 0.08);
      reveal(contactRef.current, 40);
    }, footerRef);
    return () => ctx.revert();
  }, []);

  // ── fetch likes on mount ────────────────────────────────
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch("/api/likes");
        if (!res.ok) throw new Error("Failed to fetch likes");
        const data = (await res.json()) as { likes: number };
        setLikeCount(data.likes);
      } catch (err) {
        console.error("Error fetching likes:", err);
        setLikeCount(0);
      }
    };
    fetchLikes();
  }, []);

  // ── fetch guestbook entries on mount ────────────────────
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setMessagesLoading(true);
        const res = await fetch("/api/guestbook");
        if (!res.ok) throw new Error("Failed to fetch entries");
        const data = (await res.json()) as {
          data: Array<{ name: string; message: string; liked: boolean }>;
        };
        if (data.data && data.data.length > 0) {
          setMessages(
            data.data.map((e) => ({
              name: e.name,
              msg: e.message,
              liked: e.liked,
            })),
          );
        }
      } catch (err) {
        console.error("Error fetching entries:", err);
      } finally {
        setMessagesLoading(false);
      }
    };
    fetchEntries();
  }, []);

  // ── fetch vibes on mount ────────────────────────────────
  useEffect(() => {
    const fetchVibes = async () => {
      try {
        setVibesLoading(true);
        const res = await fetch("/api/vibes");
        if (!res.ok) throw new Error("Failed to fetch vibes");
        const data = (await res.json()) as {
          data: Array<{ vibe_type: string; count: number }>;
        };
        if (data.data) {
          const vibeLabels = ["No vibe", "Meh", "Fire", "Dead", "King"];

          const counts = vibeLabels.map((label) => {
            const vibe = data.data.find((v) => v.vibe_type === label);
            return vibe?.count ?? 0;
          });
          setVibeCounts(counts);
        }
      } catch (err) {
        console.error("Error fetching vibes:", err);
        setVibeCounts([0, 0, 0, 0, 0]);
      } finally {
        setVibesLoading(false);
      }
    };
    fetchVibes();
  }, []);

  // ── spray canvas ─────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const snap = ctx2d.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (snap.width > 0) ctx2d.putImageData(snap, 0, 0);
    };
    resize();

    const spray = (x: number, y: number) => {
      const color = activeColorRef.current;
      const size = brushSizeRef.current;
      for (let i = 0; i < 48; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * size;
        ctx2d.globalAlpha = Math.random() * 0.28 + 0.04;
        ctx2d.fillStyle = color;
        const dot = Math.random() * 2.4 + 0.5;
        ctx2d.beginPath();
        ctx2d.arc(
          x + Math.cos(angle) * radius,
          y + Math.sin(angle) * radius,
          dot,
          0,
          Math.PI * 2,
        );
        ctx2d.fill();
      }
      ctx2d.globalAlpha = 1;
    };

    const pos = (e: MouseEvent | TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      if ("touches" in e)
        return {
          x: e.touches[0].clientX - r.left,
          y: e.touches[0].clientY - r.top,
        };
      return {
        x: (e as MouseEvent).clientX - r.left,
        y: (e as MouseEvent).clientY - r.top,
      };
    };

    const onDown = (e: MouseEvent | TouchEvent) => {
      if (showingWarningRef.current) {
        clearCanvas();
        showingWarningRef.current = false;
      }
      isDrawingRef.current = true;
      setIsDrawing(true);
      const p = pos(e);
      spray(p.x, p.y);
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      const p = pos(e);
      spray(p.x, p.y);
      setHasTagged(true);
    };
    const onUp = () => {
      isDrawingRef.current = false;
      setIsDrawing(false);
    };

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
  }, []);

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.getContext("2d")?.clearRect(0, 0, c.width, c.height);
    setHasTagged(false);
  };

  const saveSnapshot = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!hasTagged) {
      const ctx2d = canvas.getContext("2d");
      if (ctx2d) {
        ctx2d.font = "italic 24px 'Comforter', sans-serif";
        ctx2d.fillStyle = activeColorRef.current;
        ctx2d.textAlign = "center";

        ctx2d.globalAlpha = 1;
        ctx2d.fillText(
          "first spray something then save",
          canvas.width / 2,
          canvas.height / 2,
        );
        showingWarningRef.current = true;
      }
      return;
    }

    try {
      const off = document.createElement("canvas");
      const sc = Math.min(1, 600 / canvas.width);
      off.width = Math.round(canvas.width * sc);
      off.height = Math.round(canvas.height * sc);
      off.getContext("2d")!.drawImage(canvas, 0, 0, off.width, off.height);
      const canvasData = off.toDataURL("image/webp", 0.55);

      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2200);

      await fetch("/api/spray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canvas_data: canvasData }),
      });

      clearCanvas();
    } catch (err) {
      console.error("Error saving spray wall to database:", err);
    }
  };

  // ── interactions ─────────────────────────────────────────
  const handleLike = async () => {
    if (liked || likeLoading) return;
    try {
      setLikeLoading(true);
      setLiked(true);

      const res = await fetch("/api/likes", { method: "POST" });
      if (!res.ok) {
        setLiked(false);
        throw new Error("Failed to increment likes");
      }

      const data = (await res.json()) as { likes: number };
      setLikeCount(data.likes);

      // Animation
      gsap
        .timeline()
        .to(likeRef.current, { scale: 1.4, duration: 0.15, ease: "power2.out" })
        .to(likeRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1,0.4)",
        });

      if (particlesRef.current) {
        for (let i = 0; i < 12; i++) {
          const p = document.createElement("div");
          const cols = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6bff"];
          p.style.cssText = `position:absolute;width:6px;height:6px;border-radius:50%;background:${cols[i % cols.length]};pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%);`;
          particlesRef.current.appendChild(p);
          const a = (i / 12) * Math.PI * 2,
            d = 40 + Math.random() * 30;
          gsap.to(p, {
            x: Math.cos(a) * d,
            y: Math.sin(a) * d,
            opacity: 0,
            scale: 0,
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => p.remove(),
          });
        }
      }
    } catch (err) {
      console.error("Error liking:", err);
      setLiked(false);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !msg.trim()) return;

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: msg.trim() }),
      });

      if (!res.ok) throw new Error("Failed to post message");

      const data = (await res.json()) as {
        data: { name: string; message: string; liked: boolean };
      };

      setMessages((prev) => [
        {
          name: data.data.name,
          msg: data.data.message,
          liked: data.data.liked,
        },
        ...prev,
      ]);
      setSubmitted(true);
      setName("");
      setMsg("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleVibe = async (i: number) => {
    if (selectedVibe !== null) return;

    const vibeLabels = ["No vibe", "Meh", "Fire", "Dead", "King"];
    const vibeType = vibeLabels[i];

    try {
      setSelectedVibe(i);
      const res = await fetch("/api/vibes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vibe_type: vibeType }),
      });

      if (!res.ok) throw new Error("Failed to submit vibe");

      const data = (await res.json()) as { data: { count: number } };
      setVibeCounts((prev) =>
        prev.map((c, idx) => (idx === i ? data.data.count : c)),
      );
    } catch (err) {
      console.error("Error submitting vibe:", err);
      setSelectedVibe(null);
    }
  };

  const totalVibes = vibeCounts.reduce((a, b) => a + b, 0);

  const makeGrad = (from: string, to: string): React.CSSProperties => ({
    background: `linear-gradient(135deg, ${from} 0%, ${to} 50%, #ffffff 70%, ${from} 100%)`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "graffFlow 6s linear infinite",
  });

  const cursorSVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='18' r='13' fill='none' stroke='${encodeURIComponent(activeColor)}' stroke-width='1.5' stroke-dasharray='4 3' opacity='0.9'/%3E%3Ccircle cx='18' cy='18' r='2.5' fill='${encodeURIComponent(activeColor)}'/%3E%3C/svg%3E") 18 18, crosshair`;

  // Shared input focus handler — warm white, no green
  const inputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "rgba(255,255,255,0.18)";
    e.target.style.background = "rgba(255,255,255,0.04)";
  };
  const inputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "rgba(255,255,255,0.07)";
    e.target.style.background = "rgba(255,255,255,0.025)";
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#020202" }}
      suppressHydrationWarning={true}>
      {/* ── AMBIENT BG ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(255,60,0,0.07) 0%,transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-10%",
            width: "700px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(255,160,0,0.05) 0%,transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "30%",
            width: "500px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(200,0,255,0.05) 0%,transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-5%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(255,220,0,0.04) 0%,transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${12 + i * 17}%`,
              left: `${-5 + i * 9}%`,
              width: `${180 + i * 35}px`,
              height: "1px",
              background: `linear-gradient(to right,transparent,rgba(255,${80 + i * 22},0,0.06),transparent)`,
              transform: `rotate(${-14 + i * 6}deg)`,
              filter: "blur(1px)",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        {/* ══════════════════════════════════════════════════
            1 · HEADING
        ══════════════════════════════════════════════════ */}
        <div
          ref={graffitiRef}
          className="relative mb-16 overflow-visible"
          onMouseEnter={() => setHeadingHovered(true)}
          onMouseLeave={() => setHeadingHovered(false)}>
          <h2
            className="font-docallisme select-none cursor-default"
            style={{
              fontSize: "clamp(56px,14vw,200px)",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              filter: headingHovered
                ? "drop-shadow(0 0 30px rgba(255,80,0,0.38))"
                : "none",
              transition: "filter 0.25s",
            }}>
            <GlitchLine
              text="Let's"
              active={headingHovered}
              gradientStyle={makeGrad("#ff3c00", "#ff9900")}
            />
            <GlitchLine
              text="Build."
              active={headingHovered}
              gradientStyle={makeGrad("#ff9900", "#ffd700")}
              style={{ marginLeft: "clamp(20px,8vw,120px)" }}
            />
          </h2>
          <p
            className="font-comforter text-white/30 italic mt-5 ml-1"
            style={{ fontSize: "clamp(15px,2vw,22px)" }}>
            — open to work, collabs &amp; conversations
          </p>
          {/* single watermark — only appears once in the whole footer */}
          <div
            className="absolute bottom-0 right-0 font-comforter italic pointer-events-none select-none"
            style={{
              fontSize: "clamp(36px,5.5vw,80px)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.04)",
            }}>
            dixen&lsquo;26
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            2 · STATS
            Fix: watermark text is now visible + intentional
        ══════════════════════════════════════════════════ */}
        <div
          ref={statsRef}
          className="relative mb-16 p-8 rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%,rgba(255,80,0,0.04) 0%,transparent 60%)",
            }}
          />

          {/* Watermark — properly visible as a design element, not invisible noise */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span
              className="font-docallisme leading-none tracking-tighter whitespace-nowrap"
              style={{
                fontSize: "clamp(48px,9vw,130px)",
                color: "rgba(255,255,255,0.04)",
                letterSpacing: "-0.04em",
              }}>
              by the numbers
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter end={2} suffix="+" label="Years crafting" />
            <StatCounter end={3} suffix="+" label="Miles run daily" />
            <StatCounter end={70} suffix="kg" label="PR of Bench presh" />
            <StatCounter end={99} suffix="+" label="Cups of coffee" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            3 · SPRAY WALL
        ══════════════════════════════════════════════════ */}
        <div ref={sprayRef} className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: activeColor,
                    boxShadow: `0 0 8px ${activeColor}`,
                    animation: "neonPulse 2s ease-in-out infinite",
                  }}
                />
                <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                  spray wall
                </p>
              </div>
              <h3
                className="font-docallisme text-white leading-none"
                style={{ fontSize: "clamp(28px,4vw,50px)" }}>
                The wall is yours.
              </h3>
              <p className="text-white/30 text-xs mt-2 max-w-sm leading-relaxed">
                Pick a color, pick a size, drag to spray. Saves as a memory.
                <br />
                <Link
                  href="/spraywall"
                  className="text-[#ff9900]/80 hover:text-[#ff9900] underline underline-offset-4 decoration-[#ff9900]/30 transition-colors mt-1 inline-block">
                  View the Spray Wall Gallery &rarr;
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                <span className="text-white/20 text-[9px] tracking-widest uppercase">
                  size
                </span>
                {([8, 18, 32] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setBrushSize(s)}
                    className="rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      width: `${s * 0.65 + 14}px`,
                      height: `${s * 0.65 + 14}px`,
                      background:
                        brushSize === s
                          ? activeColor + "22"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${brushSize === s ? activeColor + "55" : "rgba(255,255,255,0.07)"}`,
                    }}>
                    <div
                      style={{
                        width: `${s * 0.35 + 3}px`,
                        height: `${s * 0.35 + 3}px`,
                        borderRadius: "50%",
                        background:
                          brushSize === s
                            ? activeColor
                            : "rgba(255,255,255,0.25)",
                        transition: "background 0.2s",
                      }}
                    />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {hasTagged && (
                  <button
                    onClick={clearCanvas}
                    className="px-4 py-2 rounded-xl text-xs transition-all duration-200"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(255,80,80,0.7)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                    }>
                    clear ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* palette */}
          <div className="flex gap-2.5 mb-4 flex-wrap items-center">
            {SPRAY_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setActiveColor(c)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: activeColor === c ? "40px" : "28px",
                  height: activeColor === c ? "40px" : "28px",
                  background: c,
                  boxShadow:
                    activeColor === c
                      ? `0 0 18px ${c}99, 0 0 6px ${c}`
                      : "none",
                  outline: activeColor === c ? `2px solid ${c}55` : "none",
                  outlineOffset: "3px",
                  border: "none",
                }}
              />
            ))}
          </div>

          {/* canvas */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              height: "300px",
              background: "#070707",
              border: `1px solid ${isDrawing ? activeColor + "44" : "rgba(255,255,255,0.06)"}`,
              boxShadow: isDrawing
                ? `0 0 50px ${activeColor}1a,inset 0 0 40px ${activeColor}08`
                : "inset 0 0 60px rgba(0,0,0,0.5)",
              transition: "border-color 0.25s,box-shadow 0.25s",
              cursor: cursorSVG,
            }}>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,0.65) 100%)",
              }}
            />
            {!hasTagged && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none gap-2">
                <span style={{ fontSize: "44px", opacity: 0.07 }}>🎨</span>
                <p className="font-comforter italic text-white/10 text-sm">
                  drag to spray...
                </p>
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 mb-4">
            <button
              onClick={saveSnapshot}
              className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              style={{
                color: "#000",
                background: "linear-gradient(135deg, #ff3c00, #ff9900)",
                boxShadow: "0 0 25px rgba(255,100,0,0.25)",
                border: "none",
                minHeight: "44px",
              }}>
              <span>📸</span> Capture & Send to Gallery
            </button>
            {savedToast && (
              <span
                className="text-[10px] tracking-widest uppercase px-3 py-2 rounded-xl"
                style={{
                  color: "#00ff87",
                  background: "rgba(0,255,135,0.07)",
                  border: "1px solid rgba(0,255,135,0.15)",
                  animation: "fadeInUp 0.3s ease",
                }}>
                ✓ saved
              </span>
            )}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className="w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)",
          }}
        />

        {/* ══════════════════════════════════════════════════
            4+5 · GUESTBOOK — unified section
            Vibe pick is embedded as the first step of the
            guestbook flow so context is crystal clear.
            Form + wall are both minimal, match the footer's
            dark warm palette — no CRT, no green, no drama.
        ══════════════════════════════════════════════════ */}
        <div ref={guestRef} className="mb-16">
          {/* section header + like — same pattern as other sections */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "#ff9900",
                    boxShadow: "0 0 8px #ff9900",
                    animation: "neonPulse 2s ease-in-out infinite",
                  }}
                />
                <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                  guestbook
                </p>
              </div>
              <h3
                className="font-docallisme text-white leading-none"
                style={{ fontSize: "clamp(28px,4vw,52px)" }}>
                Leave your mark.
              </h3>
              <p className="text-white/30 text-sm mt-3 max-w-md leading-relaxed">
                You made it to the end — drop a note, pick a vibe. No signup.
                Just you. 🖊️
              </p>
            </div>

            {/* like button — unchanged */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                liked it?
              </p>
              <div className="relative" ref={particlesRef}>
                <button
                  ref={likeRef}
                  onClick={handleLike}
                  className="relative flex flex-col items-center gap-1.5 px-6 py-4 rounded-2xl transition-all duration-300"
                  style={{
                    background: liked
                      ? "rgba(255,80,80,0.12)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${liked ? "rgba(255,80,80,0.3)" : "rgba(255,255,255,0.08)"}`,
                    cursor: liked ? "default" : "pointer",
                    boxShadow: liked ? "0 0 30px rgba(255,80,80,0.15)" : "none",
                  }}>
                  <span
                    style={{
                      fontSize: "28px",
                      filter: liked ? "none" : "grayscale(1) opacity(0.4)",
                      transition: "filter 0.3s",
                    }}>
                    ❤️
                  </span>
                  <span
                    className="font-docallisme text-2xl leading-none"
                    style={{
                      color: liked ? "#ff5050" : "rgba(255,255,255,0.3)",
                    }}>
                    {likeCount}
                  </span>
                  <span className="text-white/20 text-[9px] tracking-widest uppercase">
                    {liked ? "thank you!" : "tap to like"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* main guestbook card — one unified surface */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
            {/* ── VIBE STRIP — top of the card, clearly "before you write" ── */}
            <div
              ref={vibeRef}
              className="px-6 pt-5 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="text-white/35 text-xs shrink-0">
                  How did the portfolio feel?
                </p>
                <div className="flex gap-2 flex-wrap">
                  {VIBES.map((v, i) => {
                    const pct =
                      totalVibes > 0
                        ? Math.round((vibeCounts[i] / totalVibes) * 100)
                        : 0;
                    const isSel = selectedVibe === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleVibe(i)}
                        disabled={selectedVibe !== null}
                        className="relative flex items-center gap-1.5 px-3 py-2 sm:py-1 rounded-full overflow-hidden transition-all duration-300 text-[11px]"
                        style={{
                          background: isSel
                            ? v.color + "16"
                            : "rgba(255,255,255,0.04)",
                          border: `1px solid ${isSel ? v.color + "50" : "rgba(255,255,255,0.08)"}`,
                          color: isSel
                            ? v.color
                            : selectedVibe !== null
                              ? "rgba(255,255,255,0.2)"
                              : "rgba(255,255,255,0.5)",
                          cursor: selectedVibe !== null ? "default" : "pointer",
                          transform: isSel ? "scale(1.04)" : "none",
                          opacity: selectedVibe !== null && !isSel ? 0.4 : 1,
                          transition: "all 0.25s",
                        }}>
                        {selectedVibe !== null && (
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: `${pct}%`,
                              background: `${v.color}10`,
                              transition: "width 0.8s ease",
                              borderRadius: "inherit",
                            }}
                          />
                        )}
                        <span className="relative z-10">{v.emoji}</span>
                        <span className="relative z-10">{v.label}</span>
                        {isSel && (
                          <span
                            className="relative z-10 ml-0.5 font-semibold"
                            style={{ color: v.color }}>
                            {pct}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {selectedVibe !== null && (
                  <span className="text-white/15 text-[10px] tracking-widest uppercase shrink-0">
                    {totalVibes} votes
                  </span>
                )}
              </div>
            </div>

            {/* ── FORM + MESSAGES in two columns ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT — write a message */}
              <div
                className="p-6 flex flex-col gap-4"
                style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                    <span style={{ fontSize: "36px" }}>🎨</span>
                    <p className="font-docallisme text-white text-2xl">
                      Tagged. Respect.
                    </p>
                    <p className="text-white/25 text-xs mt-1 tracking-widest uppercase">
                      your message is on the wall
                    </p>
                  </div>
                ) : (
                  <>
                    {/* name field */}
                    <div>
                      <label className="block text-white/25 text-[10px] tracking-[0.25em] uppercase mb-2">
                        Your name or handle
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="@yourname eg: Enshu, etc"
                        className="w-full outline-none rounded-xl px-4 py-3 text-sm transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.025)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.8)",
                          caretColor: "#ff9900",
                        }}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                      />
                    </div>

                    {/* message field */}
                    <div>
                      <label className="block text-white/25 text-[10px] tracking-[0.25em] uppercase mb-2">
                        Leave a message
                      </label>
                      <textarea
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="say whatever's on your mind..."
                        rows={4}
                        className="w-full outline-none rounded-xl px-4 py-3 text-sm resize-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.025)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.8)",
                          caretColor: "#ff9900",
                        }}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                      />
                    </div>

                    {/* submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={!name.trim() || !msg.trim()}
                      className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
                      style={{
                        background:
                          name.trim() && msg.trim()
                            ? "linear-gradient(135deg,#ff3c00,#ff9900)"
                            : "rgba(255,255,255,0.04)",
                        color:
                          name.trim() && msg.trim()
                            ? "#000"
                            : "rgba(255,255,255,0.2)",
                        boxShadow:
                          name.trim() && msg.trim()
                            ? "0 0 28px rgba(255,80,0,0.25)"
                            : "none",
                      }}>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                      Post it
                    </button>
                  </>
                )}
              </div>

              {/* RIGHT — message wall, same surface */}
              <div className="flex flex-col">
                {/* wall header */}
                <div
                  className="flex items-center justify-between px-6 pt-5 pb-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">
                    what people said
                  </span>
                  <span className="text-white/15 text-[10px]">
                    {messages.length} notes
                  </span>
                </div>

                {/* messages */}
                <div
                  className="flex flex-col gap-px max-h-72 overflow-y-auto"
                  style={{ scrollbarWidth: "none" }}>
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-6 py-4 transition-all duration-200"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        animation:
                          i === 0 && messages.length > existingMessages.length
                            ? "slideIn 0.4s ease-out"
                            : "none",
                      }}>
                      {/* avatar */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                        style={{
                          background: `hsl(${(m.name.charCodeAt(0) * 37) % 360},35%,14%)`,
                          border: `1px solid hsl(${(m.name.charCodeAt(0) * 37) % 360},35%,25%)`,
                          color: `hsl(${(m.name.charCodeAt(0) * 37) % 360},65%,60%)`,
                        }}>
                        {m.name[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/50 text-xs font-semibold">
                          {m.name}
                        </p>
                        <p className="text-white/30 text-xs mt-0.5 leading-relaxed">
                          {m.msg}
                        </p>
                      </div>
                      {m.liked && (
                        <span className="text-xs shrink-0 opacity-40 mt-0.5">
                          ♥
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className="w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)",
          }}
        />

        {/* ══════════════════════════════════════════════════
            6 · CONTACT + PLATFORMS
        ══════════════════════════════════════════════════ */}
        <div
          ref={contactRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="flex flex-col gap-6">
            <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
              reach out
            </p>
            <button
              onClick={() => handleCopy("divyanshus068@gmail.com", "email")}
              className="group flex items-start gap-4 text-left transition-all duration-200 hover:translate-x-1">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: "rgba(255,60,0,0.08)",
                  border: "1px solid rgba(255,60,0,0.15)",
                }}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,100,0,0.8)"
                  strokeWidth="1.8"
                  strokeLinecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <p className="text-white/50 text-[10px] tracking-widest uppercase mb-0.5">
                  Email
                </p>
                <p className="text-white text-sm font-medium">
                  divyanshus068@gmail.com
                </p>
                <p className="text-white/25 text-xs mt-0.5 group-hover:text-white/50 transition-colors">
                  {copied === "email" ? "✓ copied!" : "click to copy"}
                </p>
              </div>
            </button>
            <button
              onClick={() => handleCopy("+91 7617639230", "phone")}
              className="group flex items-start gap-4 text-left transition-all duration-200 hover:translate-x-1">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: "rgba(255,160,0,0.08)",
                  border: "1px solid rgba(255,160,0,0.15)",
                }}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,160,0,0.8)"
                  strokeWidth="1.8"
                  strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-white/50 text-[10px] tracking-widest uppercase mb-0.5">
                  Phone
                </p>
                <p className="text-white text-sm font-medium">+91 7617639230</p>
                <p className="text-white/25 text-xs mt-0.5 group-hover:text-white/50 transition-colors">
                  {copied === "phone" ? "✓ copied!" : "click to copy"}
                </p>
              </div>
            </button>
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-fit"
              style={{
                background: "rgba(0,255,100,0.05)",
                border: "1px solid rgba(0,255,100,0.12)",
              }}>
              <div
                className="w-2 h-2 rounded-full bg-green-400"
                style={{
                  animation: "neonPulse 2s ease-in-out infinite",
                  boxShadow: "0 0 8px #4ade80",
                }}
              />
              <span className="text-green-400/80 text-xs font-medium tracking-wide">
                Available — Mar 2026
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-5">
              find me everywhere
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {platforms.map((p, i) => (
                <a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredPlatform(i)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  className="group relative flex flex-col items-start gap-2 p-4 rounded-2xl transition-all duration-300"
                  style={{
                    background:
                      hoveredPlatform === i ? p.bg : "rgba(255,255,255,0.02)",
                    border: `1px solid ${hoveredPlatform === i ? p.color + "33" : "rgba(255,255,255,0.05)"}`,
                    transform:
                      hoveredPlatform === i ? "translateY(-3px)" : "none",
                    boxShadow:
                      hoveredPlatform === i
                        ? `0 8px 30px ${p.color}15`
                        : "none",
                  }}>
                  <div
                    className="transition-colors duration-300"
                    style={{
                      color:
                        hoveredPlatform === i
                          ? p.color
                          : "rgba(255,255,255,0.3)",
                    }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-white/80 text-xs font-semibold tracking-wide">
                      {p.name}
                    </p>
                    <p className="text-white/25 text-[10px] mt-0.5 group-hover:text-white/40 transition-colors truncate">
                      {p.handle}
                    </p>
                  </div>
                  <p
                    className="text-[9px] tracking-wide transition-all duration-300"
                    style={{
                      color:
                        hoveredPlatform === i ? `${p.color}99` : "transparent",
                      transform:
                        hoveredPlatform === i
                          ? "translateY(0)"
                          : "translateY(4px)",
                    }}>
                    {p.desc}
                  </p>
                  <svg
                    className="absolute top-3 right-3 transition-all duration-300"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={
                      hoveredPlatform === i ? p.color : "rgba(255,255,255,0.1)"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ opacity: hoveredPlatform === i ? 1 : 0.4 }}>
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            7 · BOTTOM BAR
            Fix: removed redundant "dixen" from left side
            Credit link is the only brand mention at bottom
        ══════════════════════════════════════════════════ */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-[9px]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {/* left — just copyright + tagline, no brand name */}
          <div className="flex items-center gap-3 text-white/15  flex-wrap justify-center uppercase md:justify-start">
            <span>© 2026</span>
            <span style={{ color: "rgba(255,255,255,0.06)" }}>·</span>
            <span className="italic text-white/20">
              made with ❤️ not templates
            </span>
          </div>

          {/* right — designed & developed by Dixen → LinkedIn */}
          <a
            href="https://linkedin.com/in/divyanshu3020/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 flex-wrap justify-center transition-all duration-300"
            style={{ textDecoration: "none" }}>
            <span className="text-white/15 text-[9px] tracking-widest uppercase">
              designed &amp; developed by
            </span>
            <span
              className="font-docallisme leading-none transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,120,0,0.55)]"
              style={{
                fontSize: "clamp(15px,1.8vw,22px)",
                background: "linear-gradient(135deg,#ff3c00,#ff9900,#ffd700)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "graffFlow 4s linear infinite",
              }}>
              Dixen
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transition-all duration-300 group-hover:scale-110"
              style={{ color: "rgba(10,102,194,0.5)" }}>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span
              className="text-[9px] transition-colors duration-300 group-hover:text-blue-400/50"
              style={{ color: "rgba(255,255,255,0.1)" }}>
              ↗
            </span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes graffFlow  { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes neonPulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes slideIn    { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInUp   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

      `}</style>
    </footer>
  );
}
