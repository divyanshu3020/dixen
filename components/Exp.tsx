"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowCard from "./GlowCard";
import { MeteoconsStarFill } from "@/common/Iconset";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Full Stack Developer Intern",
    company: "Cladbe / Property.new",
    period: "Jan 2026 – Mar 2026",
    location: "On-site",
    description:
      "Built production-ready frontend pages from Figma designs using Next.js, React, Tailwind CSS, and Framer Motion. Integrated Google Maps API for property visualization, implemented CMS-driven content using Payload Headless CMS, and worked with modern DevOps workflows including Docker, CI/CD pipelines, Cloudflare CDN, and media optimization.",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "Payload CMS",
      "Google Maps API",
      "Docker",
      "CI/CD",
    ],
    color: "#0f766e",
  },
  {
    role: "Shopify Developer Intern",
    company: "Ellemora",
    period: "Dec 2025 – Jan 2026",
    location: "On-site",
    description:
      "Developed and customized Shopify storefront components, improving UI responsiveness and user experience. Worked with theme customization, Liquid templates, and modern frontend practices to implement design updates and optimize storefront performance.",
    tags: ["Shopify", "Liquid", "Shopify CMS", "JavaScript", "HTML", "CSS"],
    color: "#7c3aed",
  },
  {
    role: "Full Stack Developer",
    company: "EVO-A Pvt. limited",
    period: "Jun 2025 – Nov 2025",
    location: "Hybrid",
    description:
      "Built scalable, real-time chat architecture supporting multi-role AI interactions and streaming responses. Improved response quality by 80% through dynamic system prompt management and Gemini API integration.",
    tags: [
      "Next.js",
      "TypeScript",
      "React.js",
      "Tailwind",
      "Framer-motion",
      "Supabase Auth",
      "Supabase Database",
      "Gemini API",
      "Node.js",
      "ShadCN",
    ],
    color: "#0d4d6e",
  },
  {
    role: "UI/UX Designer",
    company: "EVO-A Pvt. limited",
    period: "Apr 2025 – Jun 2025",
    location: "On-site",
    description:
      "Designed and documented a reusable Figma design system to improve scalability and consistency. Created role-based user flows and high-fidelity prototypes, enhancing onboarding and user interaction efficiency.",
    tags: [
      "Figma",
      "UX Research",
      "Interface Design",
      "Wireframing",
      "Prototyping",
    ],
    color: "#1F2684",
  },
  // {
  //   role: "Frontend Developer Intern",
  //   company: "TechCorp",
  //   period: "Jan 2024 – Present",
  //   location: "Remote",
  //   description:
  //     "Built and shipped production-grade React + Next.js features. Owned the redesign of the dashboard UI, cutting load time by 40% and improving design consistency across 12+ components.",
  //   tags: ["React", "Next.js", "TypeScript", "Tailwind"],
  //   color: "#1a7a3a",
  // },
  // {
  //   role: "UI/UX Designer & Developer",
  //   company: "Freelance",
  //   period: "Jun 2023 – Dec 2023",
  //   location: "Remote",
  //   description:
  //     "Designed and developed 5+ client websites end-to-end — from Figma wireframes to deployed Next.js apps. Focused heavily on micro-interactions, animation, and pixel-perfect execution.",
  //   tags: ["Figma", "Framer", "Next.js", "GSAP"],
  //   color: "#0d4d6e",
  // },
  // {
  //   role: "Open Source Contributor",
  //   company: "GitHub",
  //   period: "2023 – Present",
  //   location: "Remote",
  //   description:
  //     "Contributed UI fixes and feature additions to open source projects. Improved accessibility, refactored CSS architecture, and added dark mode support across multiple repos.",
  //   tags: ["React", "CSS", "Git", "GitHub"],
  //   color: "#4a1a7a",
  // },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
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

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(
          card,
          { opacity: 0, x: fromX, y: 50, scale: 0.95, filter: "blur(8px)" },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-24 px-4 md:px-8 overflow-hidden">
      {/* ── BACKGROUND ATMOSPHERE ── */}

      {/* Large ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,122,58,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          right: "-15%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,77,110,0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          left: "20%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,26,122,0.1) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Horizontal scan lines — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Floating decorative year markers on the sides */}
      <div className="absolute left-6 top-1/4 pointer-events-none hidden lg:flex flex-col gap-2 items-center">
        <div className="w-px h-16 bg-linear-to-b from-transparent to-white/10" />
        <span className="text-white/10 text-xs tracking-[0.3em] uppercase rotate-90 mt-2">
          2026
        </span>
      </div>
      <div className="absolute right-6 top-2/4 pointer-events-none hidden lg:flex flex-col gap-2 items-center">
        <div className="w-px h-16 bg-linear-to-b from-transparent to-white/10" />
        <span className="text-white/10 text-xs tracking-[0.3em] uppercase rotate-90 mt-2">
          2025
        </span>
      </div>
      <div className="absolute left-6 top-3/4 pointer-events-none hidden lg:flex flex-col gap-2 items-center">
        <div className="w-px h-16 bg-linear-to-b from-transparent to-white/10" />
        <span className="text-white/10 text-xs tracking-[0.3em] uppercase rotate-90 mt-2">
          2025
        </span>
      </div>

      {/* Top edge glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "60%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Bottom edge glow line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "60%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* ── HEADING ── */}
      <div
        ref={headingRef}
        className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20 relative z-10">
        <MeteoconsStarFill />
        <p className="font-docallisme text-white text-4xl sm:text-7xl leading-none tracking-wide">
          Experience
        </p>
        <MeteoconsStarFill />
      </div>

      {/* ── CARDS ── */}
      <div className="relative flex flex-col items-center gap-8 max-w-3xl mx-auto z-10">
        {/* Vertical timeline line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)",
          }}
        />

        {experiences.map((exp, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`relative w-full max-w-xl ${
              i % 2 === 0
                ? "sm:self-start"
                : "sm:self-end"
            }`}>
            {/* Timeline dot — hidden on mobile to avoid overlap */}
            <div
              className="absolute top-8 w-3 h-3 rounded-full border border-white/20 z-10 hidden sm:block"
              style={{
                background: exp.color,
                boxShadow: `0 0 12px ${exp.color}, 0 0 24px ${exp.color}55`,
                [i % 2 === 0 ? "right" : "left"]: "-2rem",
              }}
            />

            {/* Connector line — hidden on mobile */}
            <div
              className="absolute top-[2.6rem] h-px w-8 pointer-events-none hidden sm:block"
              style={{
                [i % 2 === 0 ? "right" : "left"]: "-2rem",
                background: `linear-gradient(${
                  i % 2 === 0 ? "to left" : "to right"
                }, ${exp.color}66, transparent)`,
              }}
            />

            <GlowCard glowColor={exp.color}>
              <div className="flex flex-col justify-between h-full p-4 sm:p-7 gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold text-xl leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-white/50 text-sm mt-1 font-medium tracking-wide">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white/40 text-xs tracking-widest uppercase">
                      {exp.period}
                    </p>
                    <p className="text-white/30 text-xs mt-1">{exp.location}</p>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/40"
                      style={{ background: `${exp.color}22` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </div>
        ))}
      </div>
    </section>
  );
}
