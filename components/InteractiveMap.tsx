"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import { destinations } from "@/lib/data";
import { destinationUpdatedEvent, readSelectedDestination, saveSelectedDestination } from "@/lib/trip";

export default function InteractiveMap() {
  const [active, setActive] = useState(destinations[0].id);
  const activeDestination = destinations.find((d) => d.id === active)!;

  useEffect(() => {
    const syncDestination = () => {
      const selected = readSelectedDestination();
      if (selected && destinations.some((item) => item.id === selected.id)) setActive(selected.id);
    };
    syncDestination();
    window.addEventListener(destinationUpdatedEvent, syncDestination);
    return () => window.removeEventListener(destinationUpdatedEvent, syncDestination);
  }, []);

  return (
    <section id="map" className="py-24 sm:py-28 bg-ocean-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest route-code text-teal-400">
            Explore visually
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-white">
            An interactive map of where you could be next
          </h2>
          <p className="mt-4 text-ocean-200">
            Tap a pin to preview the destination — see pricing, ratings, and how it
            connects to everywhere else on your list.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
          {/* Map canvas */}
          <div className="relative rounded-4xl bg-ocean-800/70 border border-white/10 overflow-hidden h-[420px] sm:h-[520px]">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {destinations.map((d, i) => {
                const next = destinations[(i + 1) % destinations.length];
                return (
                  <path
                    key={d.id}
                    d={`M ${d.x} ${d.y} Q ${(d.x + next.x) / 2} ${
                      Math.min(d.y, next.y) - 10
                    } ${next.x} ${next.y}`}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="0.3"
                    strokeDasharray="0.6 1.4"
                    fill="none"
                    className="animate-dash-move"
                  />
                );
              })}
            </svg>

            {destinations.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => { setActive(d.id); saveSelectedDestination(d); }}
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                aria-pressed={active === d.id}
                aria-label={`Preview ${d.name}, ${d.country}`}
              >
                <span
                  className={`absolute inset-0 -m-2 rounded-full ${
                    active === d.id ? "bg-sunset-500/40" : "bg-teal-400/30"
                  } animate-pulse-ring`}
                  aria-hidden="true"
                />
                <span
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lift transition-transform group-hover:scale-110 ${
                    active === d.id ? "bg-sunset-500" : "bg-teal-500"
                  }`}
                >
                  <MapPin className="h-4 w-4 text-white" aria-hidden="true" />
                </span>
              </button>
            ))}

            <div className="absolute top-4 left-4 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-white route-code">
              {destinations.length} destinations mapped
            </div>
          </div>

          {/* Preview card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDestination.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="rounded-4xl bg-white p-3 shadow-lift flex flex-col"
            >
              <div className="relative rounded-3xl overflow-hidden h-52 shrink-0">
                <img
                  src={activeDestination.image}
                  alt={`${activeDestination.name}, ${activeDestination.country}`}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-sunset-600">
                  {activeDestination.tag}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-700">
                      {activeDestination.name}
                    </h3>
                    <p className="text-sm text-ink-400">{activeDestination.country}</p>
                  </div>
                  <span className="route-code text-xs font-semibold text-ink-400 border border-ink-700/10 rounded-full px-2.5 py-1">
                    {activeDestination.code}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-sm">
                  <Star className="h-4 w-4 fill-sunset-500 text-sunset-500" aria-hidden="true" />
                  <span className="font-semibold text-ink-700">{activeDestination.rating}</span>
                  <span className="text-ink-400">
                    ({activeDestination.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                <p className="mt-4 text-sm text-ink-500 flex-1">
                  Handpicked stays, local guides, and top-rated activities — Wanderly
                  builds a route around {activeDestination.name} so you spend less time
                  planning and more time there.
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-ink-400">
                      From
                    </span>
                    <span className="font-display text-lg font-semibold text-ink-700">
                      ₹{activeDestination.priceFrom.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <a
                    href="#itinerary"
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink-700 hover:bg-ink-800 text-white text-sm font-semibold px-4 py-2.5 transition-colors"
                  >
                    Build itinerary
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
