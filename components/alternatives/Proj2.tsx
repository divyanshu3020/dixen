"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MeteoconsStarFill } from "@/common/Iconset";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "SignBridge",
    description:
      "Real-time sign language detection web app using ML models. Bridges communication between deaf and hearing communities.",
    tags: ["Next.js", "Python", "TensorFlow", "WebRTC"],
    image: "/videos/signbridge-gif.gif",
    color: "#1a7a3a",
    year: "2024",
    link: "#",
  },
  {
    title: "Tutor Platform",
    description:
      "Full-stack tutoring platform with live sessions, scheduling, payments and real-time chat built for scale.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "/videos/tutor.gif",
    color: "#0d4d6e",
    year: "2024",
    link: "#",
  },
  {
    title: "Portfolio v1",
    description:
      "First iteration of my personal portfolio. Minimalist, fast, and focused on the work. Built before I discovered GSAP.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    image: "/images/meava.png",
    color: "#6b21a8",
    year: "2023",
    link: "#",
  },
  {
    title: "DevDash",
    description:
      "Developer productivity dashboard. Aggregates GitHub activity, todos, and Pomodoro timer in one focused view.",
    tags: ["React", "GitHub API", "TypeScript"],
    image: "/images/meava.png",
    color: "#92400e",
    year: "2023",
    link: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const isHoveringRef = useRef(false);

  // ── Custom cursor tracking ──────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const showCursor = () => {
    isHoveringRef.current = true;
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const hideCursor = () => {
    isHoveringRef.current = false;
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  // ── GSAP scroll animations ──────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards staggered reveal
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.94, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
            duration: 0.9,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Magnetic hover on cards ─────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      x: x * 0.06,
      y: y * 0.06,
      rotateX: -(y * 0.04),
      rotateY: x * 0.04,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card, {
      x: 0, y: 0, rotateX: 0, rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)",
    });
    hideCursor();
  };

  return (
    <>
      {/* ── CUSTOM CURSOR ── */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          top: 0, left: 0,
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
          width: 110, height: 110,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "difference",
        }}
      >
        <span
          ref={cursorTextRef}
          className="text-black font-semibold text-xs text-center leading-tight px-2"
          style={{ mixBlendMode: "normal" }}
        >
          Wanna<br />see??
        </span>
      </div>

      <section
        ref={sectionRef}
        className="relative w-full bg-black py-24 px-4 md:px-12 overflow-hidden"
      >
        {/* ── BACKGROUND ATMOSPHERE ── */}

        {/* Top-left orb */}
        <div className="absolute pointer-events-none" style={{
          top: "-5%", left: "-5%", width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,122,58,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        {/* Bottom-right orb */}
        <div className="absolute pointer-events-none" style={{
          bottom: "0%", right: "-10%", width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,33,168,0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
        }} />
        {/* Center orb */}
        <div className="absolute pointer-events-none" style={{
          top: "40%", left: "40%", width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13,77,110,0.07) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} />

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
        }} />

        {/* Noise grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }} />

        {/* Top + bottom edge lines */}
        {["top", "bottom"].map((pos) => (
          <div key={pos} className={`absolute ${pos}-0 left-1/2 -translate-x-1/2 pointer-events-none`}
            style={{ width: "70%", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)" }}
          />
        ))}

        {/* ── HEADING ── */}
        <div ref={headingRef} className="flex items-center justify-center gap-6 mb-20 relative z-10">
          <MeteoconsStarFill />
          <p className="font-docallisme text-white text-7xl leading-none tracking-wide">
            Projects
          </p>
          <MeteoconsStarFill />
        </div>

        {/* ── PROJECT CARDS GRID ── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseEnter={showCursor}
              onMouseLeave={() => handleMouseLeave(i)}
              onClick={() => window.open(project.link, "_blank")}
              className="relative group rounded-3xl overflow-hidden cursor-none border border-white/5"
              style={{
                background: "#050505",
                // Make first card span full width on desktop
                ...(i === 0 ? { gridColumn: "1 / -1" } : {}),
              }}
            >
              {/* Glow blobs per card */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <div style={{
                  position: "absolute", top: "-40px", left: "-40px",
                  width: "300px", height: "300px", borderRadius: "50%",
                  background: `radial-gradient(circle, ${project.color}55 0%, transparent 70%)`,
                  filter: "blur(60px)",
                  transition: "opacity 0.5s ease",
                }} />
                <div style={{
                  position: "absolute", bottom: "-40px", right: "-40px",
                  width: "250px", height: "250px", borderRadius: "50%",
                  background: `radial-gradient(circle, ${project.color}33 0%, transparent 70%)`,
                  filter: "blur(50px)",
                }} />
              </div>

              {/* Image — taller for featured (first) card */}
              <div
                className="relative w-full overflow-hidden"
                style={{ height: i === 0 ? "380px" : "220px" }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Image overlay */}
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom, transparent 30%, #050505 100%)` }}
                />
              </div>

              {/* Card content */}
              <div className="relative z-10 p-7 pt-4">
                {/* Top meta row */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border"
                    style={{
                      color: project.color,
                      borderColor: `${project.color}44`,
                      background: `${project.color}11`,
                    }}
                  >
                    {project.year}
                  </span>
                  {/* Arrow icon — slides in on hover */}
                  <div
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/5"
                    style={{ transform: "translateX(0)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="transition-all duration-300 group-hover:stroke-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                    </svg>
                  </div>
                </div>

                <h3
                  className="text-white font-docallisme text-3xl md:text-4xl leading-none mb-3 transition-colors duration-300"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {project.title}
                </h3>

                <p className="text-white/45 text-sm leading-relaxed mb-5 max-w-lg">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/8 text-white/35"
                      style={{ background: `${project.color}18` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Noise texture */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-[0.04]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "160px 160px",
              }} />
            </div>
          ))}
        </div>

        {/* ── VIEW ALL BUTTON ── */}
        <div className="flex justify-center mt-16 relative z-10">
          <button
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300 text-white/60 hover:text-white text-sm font-medium tracking-wide"
          >
            View all projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}