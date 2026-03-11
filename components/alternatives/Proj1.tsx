"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MeteoconsStarFill } from "@/common/Iconset";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "SignBridge",
    subtitle: "ML × Communication",
    description:
      "Real-time sign language detection web app using ML models. Bridges communication between deaf and hearing communities.",
    tags: ["Next.js", "Python", "TensorFlow", "WebRTC"],
    image: "/videos/signbridge-gif.gif",
    color: "#00ff87",
    number: "01",
    link: "#",
  },
  {
    title: "Tutor Platform",
    subtitle: "EdTech × Scale",
    description:
      "Full-stack tutoring platform with live sessions, scheduling, payments and real-time chat built for scale.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "/videos/tutor.gif",
    color: "#00cfff",
    number: "02",
    link: "#",
  },
  {
    title: "Portfolio v1",
    subtitle: "Design × Identity",
    description:
      "First iteration of my personal portfolio. Minimalist, fast, focused on the work.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    image: "/images/meava.png",
    color: "#bf00ff",
    number: "03",
    link: "#",
  },
  {
    title: "DevDash",
    subtitle: "Productivity × Dev",
    description:
      "Developer productivity dashboard. GitHub activity, todos, and Pomodoro in one focused view.",
    tags: ["React", "GitHub API", "TypeScript"],
    image: "/images/meava.png",
    color: "#ff6b00",
    number: "04",
    link: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Animated neon grid on canvas ───────────────────────────
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

    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = 20;
      const rows = 12;
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      // Draw perspective grid lines
      for (let i = 0; i <= cols; i++) {
        const x = i * cellW;
        const wave = Math.sin(t + i * 0.3) * 8;
        const alpha = 0.04 + Math.abs(Math.sin(t * 0.5 + i * 0.2)) * 0.06;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + wave, canvas.height);
        ctx.strokeStyle = `rgba(0, 255, 135, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let j = 0; j <= rows; j++) {
        const y = j * cellH;
        const wave = Math.sin(t * 0.7 + j * 0.4) * 6;
        const alpha = 0.03 + Math.abs(Math.sin(t * 0.4 + j * 0.3)) * 0.05;
        ctx.beginPath();
        ctx.moveTo(0, y + wave);
        ctx.lineTo(canvas.width, y - wave);
        ctx.strokeStyle = `rgba(0, 207, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Floating glitch dots
      for (let d = 0; d < 12; d++) {
        const x = (Math.sin(t * 0.3 + d * 1.7) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(t * 0.2 + d * 2.3) * 0.5 + 0.5) * canvas.height;
        const size = 1 + Math.abs(Math.sin(t + d)) * 2;
        const colors = ["#00ff87", "#00cfff", "#bf00ff", "#ff6b00"];
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[d % colors.length];
        ctx.globalAlpha = 0.4 + Math.sin(t * 2 + d) * 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Custom cursor ───────────────────────────────────────────
  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX, y: e.clientY,
        duration: 0.12, ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const showCursor = () => gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });
  const hideCursor = () => gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2 });

  // ── Horizontal scroll + animations ─────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - window.innerWidth;

      // Heading glitch in
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 60, filter: "blur(12px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      // Horizontal scroll pinned
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Each project panel — title glitch reveal
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
      panels.forEach((panel, i) => {
        const title = panel.querySelector(".proj-title");
        const meta = panel.querySelector(".proj-meta");
        const img = panel.querySelector(".proj-img");
        const tags = panel.querySelectorAll(".proj-tag");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: () => `top+=${i * (window.innerWidth * 0.75)} top`,
            end: () => `top+=${(i + 0.6) * (window.innerWidth * 0.75)} top`,
            scrub: true,
            containerAnimation: gsap.to(track, { x: -totalWidth, ease: "none" }),
          },
        });

        tl.fromTo(title,
          { opacity: 0, x: -40, filter: "blur(10px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.4 }, 0
        )
        .fromTo(meta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3 }, 0.1
        )
        .fromTo(img,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 }, 0
        )
        .fromTo(tags,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.2 }, 0.2
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── CUSTOM CURSOR ── */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          top: 0, left: 0, width: 100, height: 100,
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0, borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.9)",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="text-white font-bold text-[10px] text-center leading-tight tracking-wide uppercase">
          Wanna<br />see??
        </span>
      </div>

      <section ref={sectionRef} className="relative w-full bg-black">

        {/* ── HEADING (outside pin) ── */}
        <div ref={headingRef} className="flex items-center justify-center gap-6 pt-24 pb-16 relative z-10">
          <MeteoconsStarFill />
          <p className="font-docallisme text-white text-7xl leading-none tracking-wide">
            Projects
          </p>
          <MeteoconsStarFill />
        </div>

        {/* ── PINNED HORIZONTAL SCROLL CONTAINER ── */}
        <div ref={triggerRef} className="relative w-full overflow-hidden" style={{ height: "100vh" }}>

          {/* Animated canvas bg — UNIQUE to this section */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* CRT scanlines */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 4px)",
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-white/20 text-xs tracking-widest uppercase">
            <span>scroll</span>
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-white/20"
                  style={{ animation: `pulse 1.5s ${i * 0.3}s infinite` }}
                />
              ))}
            </div>
            <span>to explore</span>
          </div>

          {/* ── HORIZONTAL TRACK ── */}
          <div
            ref={trackRef}
            className="absolute top-0 left-0 h-full flex items-center"
            style={{ width: `${projects.length * 80}vw`, gap: "0px" }}
          >
            {/* Leading spacer */}
            <div style={{ minWidth: "8vw" }} />

            {projects.map((project, i) => (
              <div
                key={i}
                className="project-panel relative flex-shrink-0 h-[75vh] cursor-none"
                style={{ width: "70vw", maxWidth: "900px", marginRight: "6vw" }}
                onMouseEnter={showCursor}
                onMouseLeave={hideCursor}
                onClick={() => window.open(project.link, "_blank")}
              >
                {/* Outer border glow */}
                <div className="absolute -inset-px rounded-3xl pointer-events-none z-20"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}33, transparent 50%, ${project.color}22)`,
                    borderRadius: "24px",
                  }}
                />

                <div className="relative w-full h-full rounded-3xl overflow-hidden border"
                  style={{ borderColor: `${project.color}22`, background: "#030303" }}
                >
                  {/* Number watermark */}
                  <div
                    className="absolute top-6 right-8 font-docallisme leading-none pointer-events-none select-none z-10"
                    style={{
                      fontSize: "clamp(80px, 12vw, 160px)",
                      color: `${project.color}08`,
                      lineHeight: 1,
                    }}
                  >
                    {project.number}
                  </div>

                  {/* Image — takes right 55% of card */}
                  <div className="proj-img absolute right-0 top-0 h-full pointer-events-none"
                    style={{ width: "58%" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill unoptimized
                      className="object-cover"
                    />
                    {/* Image fade to left */}
                    <div className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to right, #030303 0%, transparent 40%)`,
                      }}
                    />
                    {/* Image color tint */}
                    <div className="absolute inset-0"
                      style={{ background: `${project.color}0d`, mixBlendMode: "color" }}
                    />
                  </div>

                  {/* Left content area */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-10"
                    style={{ width: "52%" }}
                  >
                    {/* Top */}
                    <div className="proj-meta flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full animate-pulse"
                        style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }}
                      />
                      <span className="text-xs tracking-[0.3em] uppercase font-medium"
                        style={{ color: `${project.color}cc` }}
                      >
                        {project.subtitle}
                      </span>
                    </div>

                    {/* Middle — title + desc */}
                    <div className="flex flex-col gap-5">
                      <h2 className="proj-title font-docallisme leading-[0.9] text-white"
                        style={{ fontSize: "clamp(42px, 5vw, 80px)" }}
                      >
                        {project.title}
                      </h2>
                      <p className="text-white/45 text-sm leading-relaxed max-w-xs">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom — tags + index */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="proj-tag text-xs px-3 py-1.5 rounded-full"
                            style={{
                              border: `1px solid ${project.color}33`,
                              color: `${project.color}99`,
                              background: `${project.color}0d`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          {projects.map((_, j) => (
                            <div key={j} className="h-px rounded-full transition-all duration-300"
                              style={{
                                width: j === i ? "24px" : "8px",
                                background: j === i ? project.color : "rgba(255,255,255,0.15)",
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-white/20 text-xs">{project.number} / 0{projects.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom glow line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, transparent, ${project.color}66, transparent)`,
                    }}
                  />

                  {/* Noise */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: "160px 160px",
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Trailing spacer */}
            <div style={{ minWidth: "8vw" }} />
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.4); }
          }
        `}</style>
      </section>
    </>
  );
}