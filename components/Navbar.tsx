"use client";

import { forwardRef, useState } from "react";
import ResumeModal from "@/common/ResumeModal";
import Image from "next/image";

export interface NavbarSlotRefs {
  nameSlotRef: React.RefObject<HTMLDivElement | null>;
  imageSlotRef: React.RefObject<HTMLDivElement | null>;
}

const Navbar = forwardRef<HTMLElement, NavbarSlotRefs>(
  ({ nameSlotRef, imageSlotRef }, ref) => {
    const [resumeOpen, setResumeOpen] = useState(false);

    return (
      <>
        <nav
          ref={ref}
          className="fixed z-100"
          style={{
            top: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 48px)",
            maxWidth: "1160px",
            height: "64px",
            background: "rgba(4,4,12,0.65)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            boxShadow:
              "0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex justify-between items-center h-full px-4">

            {/* LEFT: Logo + animated name slot */}
            <div className="flex items-center gap-2">
              <div style={{ width: 92, height: 92, flexShrink: 0 }}>
                <Image
                  src="/images/dori.png"
                  alt="logo"
                  width={152}
                  height={152}
                  className="object-contain w-full h-full"
                />
              </div>

              <div
                ref={nameSlotRef}
                style={{
                  opacity: 0,
                  transform: "scale(0.8) translateX(-8px)",
                  transformOrigin: "left center",
                }}
                className="flex flex-col leading-none"
              >
                <span className="font-comforter text-[11px] text-white/40 italic leading-none mb-0.5">
                  the one &amp; only
                </span>
                <span className="font-docallisme text-[17px] text-white uppercase tracking-tight leading-none">
                  Divyanshu Singh
                </span>
              </div>
            </div>

            {/* RIGHT: Animated avatar + Resume */}
            <div className="flex items-center gap-3">
              <div
                ref={imageSlotRef}
                style={{
                  opacity: 0,
                  transform: "scale(0.7)",
                  transformOrigin: "right center",
                }}
              >
                <Image
                  src="/images/meava.png"
                  alt="Divyanshu Singh"
                  width={36}
                  height={36}
                  className="object-cover"
                  style={{
                    width: 36,
                    height: 36,
                    display: "block",
                    borderRadius: "10px",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                />
              </div>

              {/* Resume button — now opens modal */}
              <button
                onClick={() => setResumeOpen(true)}
                className="flex items-center gap-1.5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.1)";
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Resume
                </span>
                {/* Eye icon — signals "view" not "open new tab" */}
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>

          </div>
        </nav>

        {/* Resume modal — rendered outside nav so z-index stacking is clean */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </>
    );
  }
);

Navbar.displayName = "Navbar";
export default Navbar;