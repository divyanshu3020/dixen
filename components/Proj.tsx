"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MeteoconsStarFill } from "@/common/Iconset";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "IZARA-AI",
    subtitle: "AI × Dev",
    description:
      "A Simple. Minimalist design, fast and light-weight webapp in which you can set mood and persona and it will help you resolve your queries",
    tags: ["React", "Express", "Gemini API", "Tailwind"],
    image: "/videos/izara.gif",
    color: "#00ff87",
    number: "01",
    link: "https://github.com/divyanshu3020/IZARA-AI",
  },

  {
    title: "D-Bank",
    subtitle: "Blockchain × Dev",
    description:
      "A simple decentralized banking application built using Motoko and deployed on the DFINITY Internet Computer.",
    tags: ["Motoko", "DFINITY Internet Computer", "DFX", "React", "Javascript"],
    image: "/images/dapp.png",
    color: " #bf00ff",
    number: "02",
    link: "https://github.com/divyanshu3020/Web3-blockchain-banking-DApp",
  },
  {
    title: "SignBridge",
    subtitle: "Communication × Design",
    description:
      "Designed Real-time sign language detection web app conducted research on how sign language works. Bridges communication between deaf and hearing communities.",
    tags: ["Figma", "UX Research", "Documentation", "UI Design"],
    image: "/videos/signbridge-gif.gif",
    color: "#ff6b00",
    number: "03",
    link: "https://www.figma.com/design/a6VCNhB0LH8250bUB2XQvI/SHOWCASE?node-id=0-1&t=zZbVTAKwuRvHSwxl-1",
  },
  {
    title: "Tutor Platform",
    subtitle: "EdTech × Design",
    description:
      "Designed the entire platform for connecting students to nearby tutors, from sign-in/sign-up flow to tutor profile, covered everything",
    tags: ["Figma", "UX Research", "UI Design", "Prototyping", "Documentation"],
    image: "/videos/tutor.gif",
    color: "#00cfff",
    number: "04",
    link: "https://www.figma.com/design/a6VCNhB0LH8250bUB2XQvI/SHOWCASE?node-id=0-1&t=zZbVTAKwuRvHSwxl-1",
  },

  {
    title: "Easy To Live",
    subtitle: "Design × Dev",
    description:
      "Designed and Developed a 'Elegent & Minimal' landing page for a real estate wesbite as per client requirements",
    tags: ["React", "Tailwind", "Javascript"],
    image: "/videos/easytolive.gif",
    // color: " #bf00ff",
    color: "#FFD700",
    number: "05",
    link: "https://github.com/divyanshu3020/easytolive-frontend",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Canvas neon grid ────────────────────────────────────────
  useEffect(() => {
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

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const draw = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(draw);
        return;
      }
      t += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = 24,
        rows = 14;
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      for (let i = 0; i <= cols; i++) {
        const wave = Math.sin(t + i * 0.25) * 6;
        const alpha = 0.03 + Math.abs(Math.sin(t * 0.4 + i * 0.18)) * 0.05;
        ctx.beginPath();
        ctx.moveTo(i * cellW, 0);
        ctx.lineTo(i * cellW + wave, canvas.height);
        ctx.strokeStyle = `rgba(0,255,135,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        const wave = Math.sin(t * 0.6 + j * 0.35) * 5;
        const alpha = 0.025 + Math.abs(Math.sin(t * 0.35 + j * 0.25)) * 0.04;
        ctx.beginPath();
        ctx.moveTo(0, j * cellH + wave);
        ctx.lineTo(canvas.width, j * cellH - wave);
        ctx.strokeStyle = `rgba(0,207,255,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      const dotColors = ["#00ff87", "#00cfff", "#bf00ff", "#ff6b00"];
      for (let d = 0; d < 16; d++) {
        const x = (Math.sin(t * 0.25 + d * 1.9) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(t * 0.18 + d * 2.1) * 0.5 + 0.5) * canvas.height;
        const size = 0.8 + Math.abs(Math.sin(t * 1.5 + d)) * 1.8;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = dotColors[d % dotColors.length];
        ctx.globalAlpha = 0.25 + Math.sin(t * 1.8 + d) * 0.2;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  // ── Custom cursor ───────────────────────────────────────────
  useEffect(() => {
    let rafId: number | null = null;
    const move = (e: MouseEvent) => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          gsap.to(cursorRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          });
          rafId = null;
        });
      }
    };
    window.addEventListener("mousemove", move);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const showCursor = (color: string) => {
    if (cursorRef.current) {
      cursorRef.current.style.borderColor = color;
      cursorRef.current.style.boxShadow = `0 0 20px ${color}44`;
    }
    if (cursorTextRef.current) cursorTextRef.current.style.color = color;
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: "back.out(2)",
    });
  };

  const hideCursor = () => {
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  // ── Horizontal scroll ───────────────────────────────────────
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      if (!track || !trigger) return;

      ScrollTrigger.refresh();

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) + window.innerWidth}`,
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      tl.to(track, { x: getScrollAmount, ease: "none" });

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ── CUSTOM CURSOR ── */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          top: 0,
          left: 0,
          width: 108,
          height: 108,
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
          borderRadius: "50%",
          border: "1.5px solid #00ff87",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}>
        <span
          ref={cursorTextRef}
          className="font-semibold text-[10px] text-center leading-tight tracking-widest uppercase"
          style={{ color: "#00ff87", transition: "color 0.2s" }}>
          Wanna
          <br />
          see??
        </span>
      </div>

      {/*
        ── KEY FIX 1: overflow-x: clip on the outer section ──
        "clip" is stronger than "hidden" — it doesn't create a new
        scroll container (which would break GSAP pin), but it DOES
        hard-clip anything that bleeds past 100vw.
      */}
      <section
        ref={sectionRef}
        className="relative w-full bg-black"
        style={{ overflowX: "clip" }}>
        <div
          ref={headingRef}
          className="flex items-center justify-center gap-4 sm:gap-6 pt-16 sm:pt-24 pb-8 sm:pb-12 relative z-10">
          <MeteoconsStarFill />
          <p className="font-docallisme text-white text-4xl sm:text-7xl leading-none tracking-wide">
            Projects
          </p>
          <MeteoconsStarFill />
        </div>

        {/* ── MOBILE VERTICAL LAYOUT — shown on < md breakpoint ── */}
        <div className="md:hidden px-4 pb-16 flex flex-col gap-6">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full rounded-2xl overflow-hidden block"
              style={{
                border: `1px solid ${project.color}22`,
                background: "#060606",
                minHeight: "400px",
              }}
            >
              {/* Image bg */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover"
                  style={{ opacity: 0.3 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, rgba(6,6,6,0.5) 0%, rgba(6,6,6,0.92) 60%, rgba(6,6,6,0.98) 100%)`,
                  }}
                />
              </div>
              {/* Content */}
              <div className="relative z-10 p-5 flex flex-col gap-3">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: project.color,
                        boxShadow: `0 0 8px ${project.color}`,
                      }}
                    />
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase font-medium"
                      style={{ color: `${project.color}cc` }}
                    >
                      {project.subtitle}
                    </span>
                  </div>
                  <span
                    className="font-docallisme leading-none select-none"
                    style={{ fontSize: "clamp(36px,9vw,72px)", color: `${project.color}18` }}
                  >
                    {project.number}
                  </span>
                </div>
                {/* Title */}
                <h2
                  className="font-docallisme text-white"
                  style={{ fontSize: "clamp(28px,6vw,48px)", lineHeight: 0.95 }}
                >
                  {project.title}
                </h2>
                {/* Description */}
                <p className="text-white/40 text-xs leading-relaxed">
                  {project.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 rounded-full"
                      style={{
                        border: `1px solid ${project.color}2a`,
                        color: `${project.color}88`,
                        background: `${project.color}0d`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Tap hint */}
                <p
                  className="text-[9px] tracking-[0.25em] uppercase mt-1"
                  style={{ color: `${project.color}55` }}
                >
                  tap to view →
                </p>
              </div>
              {/* Bottom glow line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: `linear-gradient(to right, transparent 5%, ${project.color}55 50%, transparent 95%)`,
                }}
              />
            </a>
          ))}
        </div>

        {/*
          ── KEY FIX 2: overflow: hidden on the pinned container ──
          This clips the absolute-positioned max-content track
          so it never reports a width wider than the viewport to
          the browser's layout engine.
        */}
        <div
          ref={triggerRef}
          className="relative w-full hidden md:block"
          style={{ height: "100vh", overflow: "hidden" }}>
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px)",
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 35%, rgba(0,0,0,0.92) 100%)",
            }}
          />

          {/* Edge fades */}
          <div
            className="absolute left-0 top-0 h-full w-24 pointer-events-none z-[2]"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.9), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-24 pointer-events-none z-[2]"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0.9), transparent)",
            }}
          />

          {/* Scroll hint */}
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-white/20 text-[10px] tracking-[0.3em] uppercase select-none">

            scroll down to explore
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {/* Project counter */}
          <div className="absolute top-6 right-8 z-20 text-white/15 text-xs tracking-[0.3em] uppercase select-none">
            {projects.length} projects
          </div>

          {/* ── HORIZONTAL TRACK ── */}
          <div
            ref={trackRef}
            className="absolute top-0 left-0 h-full flex items-center will-change-transform"
            style={{
              width: "max-content",
              paddingLeft: "6vw",
              paddingRight: "6vw",
              gap: "3vw",
            }}>
            {projects.map((project, i) => (
              <div
                key={i}
                className="relative shrink-0 cursor-none"
                style={{
                  width: "75vw",
                  maxWidth: "960px",
                  height: "72vh",
                  maxHeight: "72vh",
                }}
                onMouseEnter={() => showCursor(project.color)}
                onMouseLeave={hideCursor}
                onClick={() => window.open(project.link, "_blank")}>
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden"
                  style={{
                    border: `1px solid ${project.color}1a`,
                    background: "#060606",
                  }}>
                  {/* Full bleed image bg */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover"
                      style={{ opacity: 0.35 }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(105deg, rgba(6,6,6,0.97) 0%, rgba(6,6,6,0.82) 35%, rgba(6,6,6,0.3) 65%, rgba(6,6,6,0.15) 100%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `${project.color}12`,
                        mixBlendMode: "color",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-12">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: project.color,
                            boxShadow: `0 0 10px ${project.color}, 0 0 20px ${project.color}88`,
                            animation: "neonPulse 2s ease-in-out infinite",
                          }}
                        />
                        <span
                          className="text-xs tracking-[0.35em] uppercase font-medium"
                          style={{ color: `${project.color}cc` }}>
                          {project.subtitle}
                        </span>
                      </div>
                      <span
                        className="font-docallisme select-none leading-none"
                        style={{
                          fontSize: "clamp(60px, 9vw, 130px)",
                          color: `${project.color}0d`,
                          lineHeight: 1,
                        }}>
                        {project.number}
                      </span>
                    </div>

                    {/* Middle */}
                    <div className="flex flex-col gap-5 max-w-lg">
                      <h2
                        className="font-docallisme text-white leading-[0.88]"
                        style={{ fontSize: "clamp(48px, 6vw, 96px)" }}>
                        {project.title}
                      </h2>
                      <p className="text-white/40 text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-end justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1.5 rounded-full"
                            style={{
                              border: `1px solid ${project.color}2a`,
                              color: `${project.color}88`,
                              background: `${project.color}0d`,
                            }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0 ml-6">
                        <div className="flex gap-1.5 items-center">
                          {projects.map((_, j) => (
                            <div
                              key={j}
                              className="rounded-full transition-all duration-300"
                              style={{
                                width: j === i ? "20px" : "6px",
                                height: "3px",
                                background:
                                  j === i
                                    ? project.color
                                    : "rgba(255,255,255,0.12)",
                                boxShadow:
                                  j === i ? `0 0 6px ${project.color}` : "none",
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-white/15 text-xs tracking-widest">
                          {project.number} / 0{projects.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative edges */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-20"
                    style={{
                      background: `linear-gradient(to right, transparent 5%, ${project.color}55 50%, transparent 95%)`,
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
                    style={{
                      background: `linear-gradient(to right, transparent 20%, ${project.color}22 50%, transparent 80%)`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none z-10"
                    style={{
                      background: `radial-gradient(circle at 100% 100%, ${project.color}18 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: "160px 160px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes neonPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </>
  );
}
