# Wanderly — Travel Planning Website

A modern, premium travel planning site built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- Responsive navbar with mobile menu
- Hero with destination search and an animated flight-path signature visual
- Popular destinations grid (boarding-pass styled cards)
- Interactive map with clickable pins, animated routes, and a live preview card
- Hotels & activities with real-time availability indicators and filtering
- Personalized itinerary builder (drag-to-reorder days, add suggestions, social sharing menu)
- User reviews & ratings
- Travel guides / blog section
- Testimonials marquee
- Pricing tiers
- Accessible FAQ accordion
- Final call-to-action with floating plane animations
- Footer with sitemap-style link columns

## Design system

- **Palette:** ocean blue, teal, sunset orange, forest green, warm sand background, ink navy text
- **Type:** Fraunces (display), Plus Jakarta Sans (body/UI), JetBrains Mono (route-code labels)
- **Signature motif:** boarding-pass perforation + route-code tags + animated flight paths, echoing real travel documents

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

## Notes

- All destination/hotel/review data lives in `lib/data.ts` — swap in real API data there.
- Images are pulled from Unsplash via `next/image`-compatible remote patterns configured in `next.config.mjs`.
- Respects `prefers-reduced-motion` and includes visible keyboard focus states throughout.
- No dark/light mode toggle, per the design brief — the palette is tuned to work as a single warm, light theme.
