# Divyanshu Singh — Portfolio

> *Not a portfolio. A story.*

A dark, cinematic web experience that doesn't just show you what I do — it walks you through who I am, one scroll at a time. Built for people who believe that UI is a medium, not a utility.

**[→ Live Site](https://dixen.vercel.app)**

---

## What Makes This Different

Most portfolios are glorified resumes. This one has a perspective.

### 🎬 Scroll Storytelling
The Hero section is an interactive narrative. Each scroll gesture advances exactly one "chapter" — no scrubbing, no skipping. A custom **Step-Lock architecture** intercepts wheel and touch events, fires a GSAP timeline, and blocks all new input until the animation settles. You read the story at the pace it was written.

### 🤝 The "Creation of Adam" Moment
A cinematic scroll section where two hands — *Designer* on the left, *Developer* on the right — start off-screen and converge toward center as you scroll. At the moment they meet, a green divine glow sparks between the fingertips and a bridge statement rises in accent green. GSAP scrub + parallax. No frills. Just intention.

### 🎨 Interactive Spray Wall
The footer isn't a footer — it's a canvas. Visitors can spray-paint their presence on the wall, pick colors from a live palette, and save snapshots of their art to a persistent gallery backed by **Supabase**. Each snapshot is unique. The wall remembers.

### 🧠 Navbar That Earns Its Place
On load, the navbar is half-invisible — two empty slots waiting. As you scroll past the hero, your name and photo migrate from the center of the page into those slots with a blur + scale animation. The navbar doesn't just exist. It arrives.

---

## Soft Skills Baked Into the Design

- **Storytelling** — The site has a narrative arc. It opens with an identity, deconstructs it, and resolves it.
- **Designer Eyes** — Every pixel of misalignment is felt. Every hover state is deliberate. The 4px obsession is real.
- **Empathy for Experience** — Animations aren't decorative. They're paced so you *feel* the transition, not just see it.
- **Bridging Disciplines** — The whole thesis of the site: *"I bridge the gap between fluid architecture and refined aesthetics."*

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** |
| Animation | **GSAP 3** + ScrollTrigger |
| Motion | **Motion (Framer)** |
| Backend | **Supabase** (Spray Wall persistence) |
| Fonts | Ruslan Display · Comforter |
| Runtime | **Bun** |
| Deploy | **Vercel** |

---

## Aesthetic

`#000000` background. `#ffffff` type. `#7fff9a` accent.  
Cinematic. Intentional. Alive.

---

## Project Structure

```
app/            → Next.js App Router pages
components/     → Hero · Hand · Skills · Exp · Proj · Footer · Navbar
common/         → Shared iconset, utilities
lib/            → Supabase client
public/         → Images, GIFs, videos
types/          → Shared TypeScript types
```

---

## ⚠️ Contributions

This is a personal portfolio. **Contributions are not accepted.**  
No PRs. No issues. No forks for reuse.  
Feel free to get inspired — just build your own story.

---

*Designed & developed by Divyanshu Singh.*
