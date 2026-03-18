"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import type { SprayWall } from "@/types/database";

export default function SprayWallGallery() {
  const [snapshots, setSnapshots] = useState<SprayWall[]>([]);
  const [loading, setLoading] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSnapshots = async () => {
      try {
        const res = await fetch("/api/spray", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setSnapshots(json.data || []);
        }
      } catch (err) {
        console.error("Failed to load snapshots", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSnapshots();
  }, []);

  useEffect(() => {
    if (!loading && snapshots.length > 0 && galleryRef.current) {
      gsap.fromTo(
        galleryRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, [loading, snapshots]);

  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-hidden font-sans relative">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(255,60,0,0.05) 0%,transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(255,153,0,0.04) 0%,transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
        {/* Navigation back */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-12 text-white/50 hover:text-white transition-colors text-sm tracking-widest uppercase font-semibold">
          <span className="text-xl leading-none">&larr;</span> Back to Portfolio
        </Link>
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: "#ff9900",
                boxShadow: "0 0 10px #ff9900",
                animation: "neonPulse 2s ease-in-out infinite",
              }}
            />
            <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase">
              memory snapshots
            </p>
          </div>
          <h1 
            className="font-docallisme text-white leading-none mb-4"
            style={{ fontSize: "clamp(50px, 8vw, 100px)", letterSpacing: "-0.02em" }}>
            The Spray Wall Gallery.
          </h1>
          <p className="text-white/40 max-w-xl text-lg leading-relaxed mix-blend-screen">
            A collective memory made by you. 
            No names attached. Just vibrant expressions left behind.
          </p>
        </div>

        {/* Gallery */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-[#ff9900] animate-spin"></div>
              <p className="text-white/20 text-xs tracking-widest uppercase">Fetching gallery...</p>
            </div>
          </div>
        ) : snapshots.length === 0 ? (
          <div className="text-center py-32 rounded-3xl" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-5xl opacity-20 mb-4 block">🎨</span>
            <p className="text-white/40 text-lg font-medium">The gallery is empty right now.</p>
            <p className="text-white/20 text-sm mt-2">Go back to the portfolio and be the first to spray.</p>
          </div>
        ) : (
          <div 
            ref={galleryRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {snapshots.map((snap) => (
              <div 
                key={snap.id} 
                className="group relative rounded-3xl overflow-hidden bg-[#070707] transition-all duration-500 hover:-translate-y-2"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
                }}>
                {/* Glow behind image on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(255,100,0,0.15) 0%, transparent 70%)"
                  }}
                />
                <img 
                  src={snap.canvas_data} 
                  alt="Spray wall snapshot" 
                  className="w-full h-auto aspect-[3/2] object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                />
                
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <p className="text-white/50 text-[10px] tracking-widest uppercase font-medium">
                    {new Date(snap.created_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
