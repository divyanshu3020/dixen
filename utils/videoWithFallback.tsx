import { useState } from "react";

// ── Video with graceful fallback ─────────────────────────────
// Renders a native <video> for .mp4 sources. If the file is
// missing or fails to load, swaps to a placeholder that
// preserves the wrapper's dimensions and dark aesthetic.
export default function VideoWithFallback({
  src,
  opacity,
}: {
  src: string;
  opacity: number;
}) {
  const [failed, setFailed] = useState(false);
  const fail = () => setFailed(true);

  if (failed) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,8,20,0.92) 0%, rgba(18,18,38,0.88) 100%)",
        }}>
        {/* Muted camera icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      </div>
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{ opacity: opacity }}
      className="absolute inset-0 w-full h-full object-cover"
      onError={fail}>
      <source src={src} type="video/mp4" onError={fail} />
    </video>
  );
}
