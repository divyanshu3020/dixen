/**
 * Central GSAP singleton.
 *
 * Import gsap and its plugins exclusively from here — NEVER
 * from "gsap" directly — to guarantee a single bundle instance
 * and prevent duplicate plugin registrations.
 *
 * Usage:
 *   import { gsap, ScrollTrigger, Draggable } from "@/lib/gsap";
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/dist/Draggable";

// Register once for the entire app. Subsequent calls are no-ops
// but we keep them here to make the intent explicit.
gsap.registerPlugin(ScrollTrigger, Draggable);

export { gsap, ScrollTrigger, Draggable };
