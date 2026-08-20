"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import { destinations } from "@/lib/data";
import {
  destinationUpdatedEvent,
  readSelectedDestination,
  saveSelectedDestination,
} from "@/lib/trip";

export default function InteractiveMap() {
  const [active, setActive] = useState(destinations[0].id);

  const activeDestination =
    destinations.find((d) => d.id === active) ?? destinations[0];

  useEffect(() => {
    const syncDestination = () => {
      const selected = readSelectedDestination();

      if (
        selected &&
        destinations.some((item) => item.id === selected.id)
      ) {
        setActive(selected.id);
      }
    };

    syncDestination();

    window.addEventListener(
      destinationUpdatedEvent,
      syncDestination
    );

    return () => {
      window.removeEventListener(
        destinationUpdatedEvent,
        syncDestination
      );
    };
  }, []);

  return (
    <section
      id="map"
      className="relative overflow-hidden bg-ocean-900 py-24 sm:py-28"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <div className="max-w-2xl">
          <span className="route-code text-xs font-semibold uppercase tracking-widest text-teal-400">
            Explore visually
          </span>

          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            An interactive map of where you could be next
          </h2>

          <p className="mt-4 text-ocean-200">
            Tap a pin to preview the destination — see pricing, ratings,
            and how it connects to everywhere else on your list.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Map */}
          <div className="relative h-[420px] overflow-hidden rounded-4xl border border-white/10 bg-ocean-800/70 sm:h-[520px]">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {destinations.map((destination, index) => {
                const next =
                  destinations[(index + 1) % destinations.length];

                return (
                  <path
                    key={destination.id}
                    d={`M ${destination.x} ${destination.y} Q ${
                      (destination.x + next.x) / 2
                    } ${Math.min(destination.y, next.y) - 10} ${
                      next.x
                    } ${next.y}`}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="0.3"
                    strokeDasharray="0.6 1.4"
                    fill="none"
                  />
                );
              })}
            </svg>

            {/* Destination pins */}
            {destinations.map((destination) => (
              <button
                key={destination.id}
                type="button"
                onClick={() => {
                  setActive(destination.id);
                  saveSelectedDestination(destination);
                }}
                style={{
                  left: `${destination.x}%`,
                  top: `${destination.y}%`,
                }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                aria-pressed={active === destination.id}
                aria-label={`Preview ${destination.name}, ${destination.country}`}
              >
                <span
                  className={`absolute inset-0 -m-2 rounded-full ${
                    active === destination.id
                      ? "bg-sunset-500/40"
                      : "bg-teal-400/30"
                  } animate-pulse-ring`}
                  aria-hidden="true"
                />

                <span
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lift transition-transform group-hover:scale-110 ${
                    active === destination.id
                      ? "bg-sunset-500"
                      : "bg-teal-500"
                  }`}
                >
                  <MapPin
                    className="h-4 w-4 text-white"
                    aria-hidden="true"
                  />
                </span>
              </button>
            ))}

            <div className="route-code absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
              {destinations.length} destinations mapped
            </div>
          </div>

          {/* Destination preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDestination.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col rounded-4xl bg-white p-3 shadow-lift"
            >
              {/* Destination image */}
              <div className="relative h-52 shrink-0 overflow-hidden rounded-3xl">
                <Image
                  src={activeDestination.image}
                  alt={`${activeDestination.name}, ${activeDestination.country}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 533px"
                  quality={70}
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-sunset-600">
                  {activeDestination.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                {/* Destination name */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-700">
                      {activeDestination.name}
                    </h3>

                    <p className="text-sm text-ink-400">
                      {activeDestination.country}
                    </p>
                  </div>

                  <span className="route-code rounded-full border border-ink-700/10 px-2.5 py-1 text-xs font-semibold text-ink-400">
                    {activeDestination.code}
                  </span>
                </div>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-1.5 text-sm">
                  <Star
                    className="h-4 w-4 fill-sunset-500 text-sunset-500"
                    aria-hidden="true"
                  />

                  <span className="font-semibold text-ink-700">
                    {activeDestination.rating}
                  </span>

                  <span className="text-ink-400">
                    ({activeDestination.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 flex-1 text-sm text-ink-500">
                  Handpicked stays, local guides, and top-rated activities —
                  Wanderly builds a route around{" "}
                  {activeDestination.name} so you spend less time planning
                  and more time there.
                </p>

                {/* CTA */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-ink-400">
                      From
                    </span>

                    <span className="font-display text-lg font-semibold text-ink-700">
                      ₹
                      {activeDestination.priceFrom.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <a
                    href="#itinerary"
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
                  >
                    Build itinerary

                    <ArrowUpRight
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
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