"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Mount/unmount animation
  useEffect(() => {
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        panel,
        { opacity: 0, y: 32, scale: 0.97, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
        }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleClose = () => {
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;

    gsap.to(panel, {
      opacity: 0,
      y: 24,
      scale: 0.97,
      filter: "blur(6px)",
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(2,2,10,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        padding: "clamp(12px, 3vw, 40px)",
      }}
    >
      {/* Modal panel — stop propagation so clicking inside doesn't close */}
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "820px",
          height: "clamp(500px, 88vh, 960px)",
          background: "rgba(8,8,20,0.92)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          boxShadow:
            "0 32px 96px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Noise texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
            borderRadius: "inherit",
          }}
        />

        {/* Ambient glow top */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: "20%",
            right: "20%",
            height: 120,
            background:
              "radial-gradient(ellipse at center, rgba(74,222,128,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          {/* Left: label */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px #4ade80",
                animation: "resumePulse 2s ease-in-out infinite",
              }}
            />
            <span
              className="font-docallisme"
              style={{
                fontSize: "clamp(13px,1.1vw,17px)",
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Resume
            </span>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                marginLeft: 4,
              }}
            >
              · Divyanshu Singh
            </span>
          </div>

          {/* Right: download + close */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Download button */}
            <a
              href="/resume.pdf"
              download
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: "10px",
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.18)",
                color: "#4ade80",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(74,222,128,0.14)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(74,222,128,0.32)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(74,222,128,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(74,222,128,0.18)";
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>

            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                width: 34,
                height: 34,
                borderRadius: "10px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.09)";
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.8)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.45)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.08)";
              }}
              aria-label="Close modal"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            overflow: "hidden",
            borderRadius: "0 0 24px 24px",
          }}
        >
          <iframe
            ref={iframeRef}
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              background: "transparent",
            }}
            title="Divyanshu Singh — Resume"
          />
        </div>
      </div>

      <style>{`
        @keyframes resumePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}