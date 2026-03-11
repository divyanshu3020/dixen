"use client";

interface GlowCardProps {
  children?: React.ReactNode;
  glowColor?: string; // e.g. "#1a7a3a"
  width?: number;
  height?: number;
}

export default function GlowCard({
  children,
  glowColor = "#1a7a3a",
  width = 560,
  height = 280,
}: GlowCardProps) {
  return (
    <div style={{ background: "#000", padding: "1px", borderRadius: "22px", width: "100%" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: height,
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          background: "#050505",
        }}
      >
        {/* Glow blobs */}
        <div style={{
          position: "absolute", top: "-60px", left: "-40px",
          width: "320px", height: "280px", borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor}cc 0%, transparent 70%)`,
          filter: "blur(60px)", opacity: 0.7,
        }} />
        <div style={{
          position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)",
          width: "360px", height: "300px", borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor}99 0%, transparent 65%)`,
          filter: "blur(70px)", opacity: 0.6,
        }} />
        <div style={{
          position: "absolute", top: "20px", right: "-60px",
          width: "280px", height: "260px", borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor}bb 0%, transparent 70%)`,
          filter: "blur(55px)", opacity: 0.7,
        }} />

        {/* Dark center */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -30%)",
          width: "200px", height: "180px", borderRadius: "50%",
          background: "radial-gradient(circle, #050505 0%, transparent 70%)",
          filter: "blur(40px)", opacity: 1,
        }} />

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(to top, #050505 0%, transparent 100%)",
        }} />

        {/* Noise */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px", opacity: 0.06, mixBlendMode: "overlay",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
          {children}
        </div>
      </div>
    </div>
  );
}