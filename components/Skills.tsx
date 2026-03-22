"use client";

import { MeteoconsStarFill } from "@/common/Iconset";

// ── Skill data with brand colors + categories ───────────────
const skills = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61dafb", cat: "Frontend" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#ffffff", cat: "Framework", invert: true },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178c6", cat: "Language" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#f7df1e", cat: "Language" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#68a063", cat: "Runtime" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#ffffff", cat: "Backend", invert: true },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#38bdf8", cat: "Styling" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#336791", cat: "Database" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ed", cat: "DevOps" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#f05032", cat: "VCS" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "#ffffff", cat: "Platform", invert: true },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", color: "#fcc624", cat: "OS" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#a259ff", cat: "Design" },
  { name: "Framer", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg", color: "#0055ff", cat: "Motion" },
  { name: "Notion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg", color: "#ffffff", cat: "Productivity", invert: true },
];

const row1 = skills;
const row2 = [...skills.slice(7), ...skills.slice(0, 7)];

// ── Size config — xs added for mobile ──────────────────────
const sizeConfig = {
  xs: { w: 80,  h: 92,  iconSize: 26, nameFontSize: "10px", catFontSize: "8px",  iconWrap: 42, gap: 3 },
  sm: { w: 112, h: 128, iconSize: 36, nameFontSize: "11px", catFontSize: "9px",  iconWrap: 54, gap: 3 },
  md: { w: 130, h: 148, iconSize: 44, nameFontSize: "12px", catFontSize: "9px",  iconWrap: 62, gap: 3 },
};

// ── Single skill card ───────────────────────────────────────
function SkillCard({ skill, size = "md" }: {
  skill: typeof skills[0];
  size?: "xs" | "sm" | "md";
}) {
  const cfg = sizeConfig[size];

  return (
    <div
      className="group relative shrink-0 cursor-default select-none"
      style={{ width: cfg.w, height: cfg.h }}
    >
      <div
        className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl overflow-hidden"
        style={{
          gap: cfg.gap,
          background: "rgba(18,18,38,0.75)",
          border: `1px solid ${skill.color}28`,
          backdropFilter: "blur(16px)",
          boxShadow: `0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)`,
          transition: "border-color 0.4s, box-shadow 0.4s, background 0.4s",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${skill.color}70`;
          el.style.background = `rgba(22,22,48,0.88)`;
          el.style.boxShadow = `0 8px 40px rgba(0,0,0,0.6), 0 0 32px ${skill.color}30, inset 0 1px 0 rgba(255,255,255,0.09)`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${skill.color}28`;
          el.style.background = `rgba(18,18,38,0.75)`;
          el.style.boxShadow = `0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)`;
        }}
      >
        {/* Corner accent blob — top left */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: 56,
            height: 56,
            background: `radial-gradient(circle at 0% 0%, ${skill.color}35 0%, transparent 70%)`,
          }}
        />

        {/* Bottom-right subtle counter-blob */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: 40,
            height: 40,
            background: `radial-gradient(circle at 100% 100%, ${skill.color}18 0%, transparent 70%)`,
          }}
        />

        {/* Icon container */}
        <div
          className="relative flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
          style={{
            width: cfg.iconWrap,
            height: cfg.iconWrap,
            background: `${skill.color}1e`,
            border: `1px solid ${skill.color}38`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.icon}
            alt={skill.name}
            width={cfg.iconSize}
            height={cfg.iconSize}
            style={{
              filter: skill.invert ? "invert(1) brightness(0.88)" : "none",
              display: "block",
            }}
          />
        </div>

        {/* Name + category */}
        <div style={{ textAlign: "center" }}>
          <p
            className="font-semibold leading-none"
            style={{
              fontSize: cfg.nameFontSize,
              color: "rgba(255,255,255,0.88)",
              letterSpacing: "0.02em",
            }}
          >
            {skill.name}
          </p>
          <p
            className="mt-1"
            style={{
              fontSize: cfg.catFontSize,
              color: skill.color,
              opacity: 0.6,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "opacity 0.3s",
            }}
          >
            {skill.cat}
          </p>
        </div>

        {/* Bottom glow line — visible on hover */}
        <div
          className="absolute bottom-0 left-[12%] right-[12%] pointer-events-none"
          style={{
            height: "1px",
            background: `linear-gradient(to right, transparent, ${skill.color}80, transparent)`,
            opacity: 0,
            transition: "opacity 0.4s",
          }}
          ref={el => {
            if (!el) return;
            const parent = el.closest(".group") as HTMLElement;
            if (!parent) return;
            parent.addEventListener("mouseenter", () => { el.style.opacity = "1"; });
            parent.addEventListener("mouseleave", () => { el.style.opacity = "0"; });
          }}
        />

        {/* Top shimmer line — always visible */}
        <div
          className="absolute top-0 left-[18%] right-[18%] pointer-events-none"
          style={{
            height: "1px",
            background: `linear-gradient(to right, transparent, ${skill.color}55, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

// ── Responsive marquee row — auto switches to xs on mobile ──
function ResponsiveMarqueeRow({
  items,
  direction = "left",
  speed = 38,
  size = "md",
}: {
  items: typeof skills;
  direction?: "left" | "right";
  speed?: number;
  size?: "xs" | "sm" | "md";
}) {
  const doubled = [...items, ...items];
  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";

  return (
    <div className="relative w-full overflow-hidden" style={{ padding: "8px 0" }}>
      {/* Left fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full z-10 hidden sm:block"
        style={{ width: "180px", background: "linear-gradient(to right, #03030a 20%, transparent)" }}
      />
      {/* Left fade — narrower on mobile */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full z-10 sm:hidden"
        style={{ width: "40px", background: "linear-gradient(to right, #03030a 20%, transparent)" }}
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full z-10 hidden sm:block"
        style={{ width: "180px", background: "linear-gradient(to left, #03030a 20%, transparent)" }}
      />
      {/* Right fade — narrower on mobile */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full z-10 sm:hidden"
        style={{ width: "40px", background: "linear-gradient(to left, #03030a 20%, transparent)" }}
      />

      {/* Desktop row */}
      <div
        className="hidden sm:flex"
        style={{
          width: "max-content",
          gap: "14px",
          animation: `${animName} ${speed}s linear infinite`,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
      >
        {doubled.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} size={size} />
        ))}
      </div>

      {/* Mobile row — xs size, slightly faster */}
      <div
        className="flex sm:hidden"
        style={{
          width: "max-content",
          gap: "8px",
          animation: `${animName} ${Math.round(speed * 0.75)}s linear infinite`,
        }}
      >
        {doubled.map((skill, i) => (
          <SkillCard key={`xs-${skill.name}-${i}`} skill={skill} size="xs" />
        ))}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
export default function SkillsMarquee() {
  return (
    <section className="relative w-full bg-[#03030a] py-20 sm:py-20 overflow-hidden">

      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* ── BACKGROUND ATMOSPHERE ── */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Ambient orbs */}
        <div style={{
          position: "absolute", top: "5%", left: "-8%",
          width: 640, height: 520,
          background: "radial-gradient(ellipse, rgba(97,218,251,0.18) 0%, transparent 65%)",
          filter: "blur(55px)",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", right: "-6%",
          width: 600, height: 480,
          background: "radial-gradient(ellipse, rgba(162,89,255,0.20) 0%, transparent 65%)",
          filter: "blur(55px)",
        }} />
        <div style={{
          position: "absolute", top: "35%", left: "30%",
          width: 520, height: 400,
          background: "radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, transparent 65%)",
          filter: "blur(70px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "5%",
          width: 360, height: 280,
          background: "radial-gradient(ellipse, rgba(251,191,36,0.10) 0%, transparent 65%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", top: "0%", right: "15%",
          width: 320, height: 260,
          background: "radial-gradient(ellipse, rgba(240,80,50,0.10) 0%, transparent 65%)",
          filter: "blur(60px)",
        }} />

        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.10,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.65) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%)",
        }} />

        {/* Noise */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }} />

        {/* Edge lines */}
        <div style={{
          position: "absolute", top: 0, left: "6%", right: "6%", height: "1px",
          background: "linear-gradient(to right, transparent, rgba(97,218,251,0.25), transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: "6%", right: "6%", height: "1px",
          background: "linear-gradient(to right, transparent, rgba(162,89,255,0.22), transparent)",
        }} />
      </div>

      {/* ── HEADING ── */}
      <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-14">
        <MeteoconsStarFill />
        <p className="font-docallisme text-white text-5xl sm:text-7xl text-center leading-none tracking-wide">
          What I use
        </p>
        <MeteoconsStarFill />
      </div>

      {/* ── HELPER TEXT — desktop shows hover hint, mobile shows swipe hint ── */}
      <p className="relative z-10 text-center text-white/30 text-xs tracking-[0.3em] uppercase mb-8 sm:mb-10 hidden sm:block">
        hover to pause · 15 tools in rotation
      </p>
      <p className="relative z-10 text-center text-white/30 text-xs tracking-[0.3em] uppercase mb-8 sm:hidden">
        swipe to explore · 15 tools
      </p>

      {/* ── ROW 1 — left ── */}
      <div className="relative z-10 mb-3">
        <ResponsiveMarqueeRow items={row1} direction="left" speed={40} size="md" />
      </div>

      {/* ── ROW 2 — right ── */}
      <div className="relative z-10">
        <ResponsiveMarqueeRow items={row2} direction="right" speed={34} size="sm" />
      </div>

      {/* ── COUNT PILL ── */}
      <div className="relative z-10 flex justify-center mt-10 sm:mt-12 px-4">
        <div
          className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
          style={{
            padding: "14px 28px",
            borderRadius: "999px",
            background: "rgba(4, 4, 4, 0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.32)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.12em",
          }}>
          {skills.length} TECHNOLOGIES · AND COUNTING
        </div>
      </div>

    </section>
  );
}