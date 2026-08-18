"use client";

import { useEffect, useState } from "react";
import { Search, MapPin, CalendarDays, Users, Plane, ArrowRight } from "lucide-react";
import { saveSelectedDestination, saveTripSearch } from "@/lib/trip";
import { destinations } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { value: "2.4M+", label: "Trips planned" },
  { value: "180+", label: "Countries covered" },
  { value: "4.8/5", label: "Average traveler rating" },
];

export default function Hero() {
  const [from, setFrom] = useState("Mumbai (BOM)");
  const [to, setTo] = useState("Santorini (JTR)");
  const [dates, setDates] = useState("12 – 19 Oct");
  const [travelers, setTravelers] = useState("2 adults");
  const [searchMessage, setSearchMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!showDropdown) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".destination-search-container")) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [showDropdown]);

  const filteredDestinations = destinations.filter((item) => {
    const term = to.toLowerCase();
    // If it's a specific format e.g. "Santorini (JTR)" but they are typing "Santorini"
    const parsedInput = term.split(" (")[0];
    return (
      item.name.toLowerCase().includes(parsedInput) ||
      item.code.toLowerCase().includes(parsedInput) ||
      item.country.toLowerCase().includes(parsedInput)
    );
  });

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const destination = to.trim();
    if (!destination) {
      setSearchMessage("Enter a destination to start planning.");
      return;
    }

    saveTripSearch({ from, to: destination, dates, travelers });
    const matchingDestination = destinations.find((item) =>
      `${item.name} ${item.code} ${item.country}`.toLowerCase().includes(destination.split(" (")[0].toLowerCase())
    );
    if (matchingDestination) {
      saveSelectedDestination(matchingDestination);
      setSearchMessage(`Showing trip ideas for ${matchingDestination.name}.`);
    } else {
      setSearchMessage(`Showing trip ideas for ${destination}.`);
    }
    setShowDropdown(false);
    setTimeout(() => {
      document.querySelector("#itinerary")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ocean-50 via-sand-50 to-sand-50" />
      <div
        className="absolute -top-24 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-sunset-300/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 -left-32 -z-10 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-ink-700/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ocean-600 route-code"
          >
            <MapPin className="h-3.5 w-3.5" /> Boarding: Your Next Adventure
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-ink-700"
          >
            Plan Your Perfect{" "}
            <span className="relative inline-block text-sunset-600">
              Journey
              <svg
                className="absolute left-0 -bottom-2 w-full"
                height="10"
                viewBox="0 0 200 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7C40 2 160 2 198 7"
                  stroke="#FF7A45"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-ink-500 max-w-xl"
          >
            Discover destinations, explore them on an interactive map, and build a
            personalized itinerary with real-time hotel and activity availability —
            all in one calm, uncluttered place.
          </motion.p>

          {/* Search / boarding pass card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 rounded-3xl bg-white shadow-lift p-2"
          >
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-stretch gap-2"
            >
              <label className="flex-1 flex items-center gap-3 rounded-2xl px-4 py-3.5 hover:bg-sand-100/60 transition-colors">
                <MapPin className="h-5 w-5 text-ocean-500 shrink-0" aria-hidden="true" />
                <span className="w-full">
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                    From
                  </span>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-ink-700 outline-none"
                    aria-label="Departure city"
                  />
                </span>
              </label>

              <div className="hidden sm:flex items-center justify-center text-ink-300">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>

              <div className="flex-1 relative destination-search-container">
                <div
                  className="flex h-full items-center gap-3 rounded-2xl px-4 py-3.5 hover:bg-sand-100/60 transition-colors"
                >
                  <Plane className="h-5 w-5 text-sunset-500 shrink-0 -rotate-45" aria-hidden="true" />
                  <span className="w-full">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                      Destination
                    </span>
                    <input
                      value={to}
                      onChange={(e) => {
                        setTo(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      className="w-full bg-transparent text-sm font-semibold text-ink-700 outline-none"
                      aria-label="Destination city"
                      placeholder="Search destination..."
                    />
                  </span>
                </div>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 mt-2 rounded-2xl bg-white shadow-lift border border-ink-700/5 p-2 z-30 max-h-60 overflow-y-auto"
                    >
                      {filteredDestinations.length > 0 ? (
                        filteredDestinations.map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => {
                              setTo(`${d.name} (${d.code})`);
                              saveSelectedDestination(d);
                              setShowDropdown(false);
                            }}
                            className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-ink-700 hover:bg-sand-100 transition-colors text-left"
                          >
                            <div>
                              <span className="font-semibold block text-ink-750">{d.name}</span>
                              <span className="text-xs text-ink-400">{d.country}</span>
                            </div>
                            <span className="route-code text-xs font-semibold text-ocean-600 bg-ocean-50 rounded-full px-2.5 py-1">
                              {d.code}
                            </span>
                          </button>
                        ))
                      ) : (
                        <p className="text-xs text-ink-405 p-3 text-center">No matching destinations</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <label className="flex-1 flex items-center gap-3 rounded-2xl px-4 py-3.5 hover:bg-sand-100/60 transition-colors">
                <CalendarDays className="h-5 w-5 text-forest-500 shrink-0" aria-hidden="true" />
                <span className="w-full">
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                    Dates
                  </span>
                  <input
                    type="text"
                    value={dates}
                    onChange={(event) => setDates(event.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-ink-700 outline-none"
                    aria-label="Travel dates"
                  />
                </span>
              </label>

              <label className="flex-1 flex items-center gap-3 rounded-2xl px-4 py-3.5 hover:bg-sand-100/60 transition-colors">
                <Users className="h-5 w-5 text-teal-500 shrink-0" aria-hidden="true" />
                <span className="w-full">
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                    Travelers
                  </span>
                  <input
                    type="text"
                    value={travelers}
                    onChange={(event) => setTravelers(event.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-ink-700 outline-none"
                    aria-label="Number of travelers"
                  />
                </span>
              </label>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-2xl bg-ocean-500 hover:bg-ocean-600 text-white font-semibold px-6 py-3.5 transition-colors shrink-0"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span>Search</span>
              </button>
            </form>
            {searchMessage && (
              <p role="status" className="px-4 pb-3 text-sm font-medium text-ocean-700">
                {searchMessage}
              </p>
            )}
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold text-ink-700">
                  {s.value}
                </dd>
                <span className="text-xs text-ink-400">{s.label}</span>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Signature flight-path visual */}
        <div className="relative h-[420px] sm:h-[480px]" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 rounded-4xl overflow-hidden shadow-lift"
          >
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-800/50 via-ink-800/0 to-transparent" />
          </motion.div>

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 480"
            fill="none"
          >
            <path
              id="hero-route"
              d="M40 400 C 120 320, 100 200, 200 160 S 340 100, 360 40"
              stroke="white"
              strokeOpacity="0.85"
              strokeWidth="2.5"
              strokeDasharray="2 10"
              strokeLinecap="round"
              className="animate-dash-move"
            />
            <circle cx="40" cy="400" r="6" fill="#FF7A45" />
            <circle cx="360" cy="40" r="6" fill="#17A6A1" />
          </svg>

          <motion.div
            className="absolute"
            style={{ offsetPath: "path('M40 400 C 120 320, 100 200, 200 160 S 340 100, 360 40')" } as React.CSSProperties}
            initial={{ offsetDistance: "0%" } as any}
            animate={{ offsetDistance: "100%" } as any}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lift">
              <Plane className="h-4 w-4 text-sunset-600 rotate-45" />
            </div>
          </motion.div>

          <div className="absolute left-4 bottom-6 rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-card flex items-center gap-2 route-code text-xs font-semibold text-ink-600">
            BOM <ArrowRight className="h-3 w-3 text-sunset-500" /> JTR
          </div>

          <div className="absolute right-4 top-6 rounded-2xl bg-white/95 backdrop-blur px-3 py-2 shadow-card text-xs font-semibold text-forest-600 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-forest-500 animate-pulse" />
            14 travelers viewing now
          </div>
        </div>
      </div>
    </section>
  );
}
