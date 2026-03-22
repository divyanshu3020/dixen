"use client";

import { forwardRef, useState } from "react";
import ResumeModal from "@/common/ResumeModal";
import Image from "next/image";
import Link from "next/link";
import { LetsIconsView } from "@/common/Iconset";

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
          <div className="relative flex justify-between items-center h-full px-4">

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

            {/* CENTER: Spray Gallery Link */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex">
              <Link
                href="/spraywall"
                className="group flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <span className="text-white/40 group-hover:text-[#ff9900] transition-colors text-xs font-semibold tracking-widest">
                  /sprayGallery
                </span>
              </Link>
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
                className="group relative flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl cursor-pointer overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.1)";
                  el.style.borderColor = "rgba(255,255,255,0.22)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.05)";
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(0.96)";
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                {/* top shimmer */}
                <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <span className="text-[13px] font-semibold text-white/70 tracking-widest uppercase transition-colors duration-200 group-hover:text-white/95">
                  Resume
                </span>

                <LetsIconsView
                  color="rgba(255,255,255,0.5)"
                  className="transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
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