"use client";

import { Star } from "lucide-react";

const testimonials = [
  { quote: "Planned a 12-day Japan trip in one evening. Never going back to spreadsheets.", name: "Rhea K." },
  { quote: "The availability alerts saved our anniversary trip — rebooked in seconds.", name: "Tom & Sara" },
  { quote: "Genuinely the calmest booking experience I've had. No clutter, no pop-ups.", name: "Daniel M." },
  { quote: "Shared our itinerary with 6 friends and everyone could add their own stops.", name: "Group of 6, Goa" },
  { quote: "The map view alone is worth it — finally see what's actually nearby.", name: "Ines P." },
];

export default function Testimonials() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section aria-label="Traveler testimonials" className="py-20 bg-ink-700 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-10 flex items-center justify-between">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
          Loved by travelers everywhere
        </h2>
        <div className="hidden sm:flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-sunset-400 text-sunset-400" />
          ))}
          <span className="ml-2 text-sm text-ocean-200">4.8 average from 38,000+ trips</span>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-700 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-700 to-transparent z-10" />
        <div className="flex gap-5 w-max animate-marquee">
          {loop.map((t, i) => (
            <figure
              key={i}
              className="w-80 shrink-0 rounded-3xl bg-white/5 border border-white/10 p-6"
            >
              <blockquote className="text-sm text-ocean-100 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs font-semibold text-white/70 route-code">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
