"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, BedDouble, Ticket, Flame } from "lucide-react";
import { stays } from "@/lib/data";
import { saveTripItems, readSavedTripItems, readSelectedDestination, destinationUpdatedEvent, tripUpdatedEvent } from "@/lib/trip";

const filters = ["All", "Hotel", "Activity"] as const;

const availabilityCopy: Record<
  string,
  { label: string; dot: string; text: string }
> = {
  high: { label: "Available", dot: "bg-forest-500", text: "text-forest-600" },
  low: { label: "Almost full", dot: "bg-sunset-500", text: "text-sunset-600" },
  soldout: { label: "Sold out", dot: "bg-ink-400", text: "text-ink-400" },
};

export default function HotelsActivities() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [message, setMessage] = useState("");
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [activeDestination, setActiveDestination] = useState<any>(null);
  const [showAllLocations, setShowAllLocations] = useState(false);

  useEffect(() => {
    const syncDestination = () => {
      const selected = readSelectedDestination();
      setActiveDestination(selected);
    };

    const syncAdded = () => {
      const selected = readSelectedDestination();
      const saved = readSavedTripItems(selected?.id);
      setAddedIds(saved.map((item) => item.id.replace("stay-", "")));
    };

    syncDestination();
    syncAdded();

    window.addEventListener(destinationUpdatedEvent, syncDestination);
    window.addEventListener(destinationUpdatedEvent, syncAdded);
    window.addEventListener(tripUpdatedEvent, syncAdded);

    return () => {
      window.removeEventListener(destinationUpdatedEvent, syncDestination);
      window.removeEventListener(destinationUpdatedEvent, syncAdded);
      window.removeEventListener(tripUpdatedEvent, syncAdded);
    };
  }, []);

  // Sync added items specifically when activeDestination changes
  useEffect(() => {
    const saved = readSavedTripItems(activeDestination?.id);
    setAddedIds(saved.map((item) => item.id.replace("stay-", "")));
  }, [activeDestination]);

  const visible = stays.filter((s) => {
    const matchesType = filter === "All" || s.type === filter;
    const matchesLocation =
      !activeDestination ||
      showAllLocations ||
      s.location.toLowerCase().includes(activeDestination.name.toLowerCase());
    return matchesType && matchesLocation;
  });

  // Limit to a max of 6 items (2 rows in the 3-column grid) when showing all locations, to keep the UI clean
  const displayedStays = (!activeDestination || showAllLocations)
    ? visible.slice(0, 6)
    : visible;

  function addToTrip(item: (typeof stays)[number]) {
    const saved = readSavedTripItems(activeDestination?.id);
    if (saved.some((savedItem) => savedItem.title === item.name)) {
      setMessage(`${item.name} is already in your itinerary.`);
      return;
    }
    saveTripItems([
      ...saved,
      {
        id: `stay-${item.id}`,
        day: 2,
        time: item.type === "Hotel" ? "15:00" : "11:00",
        title: item.name,
        place: item.location,
      },
    ], activeDestination?.id);
    setAddedIds((current) => [...current, item.id]);
    setMessage(`${item.name} was added to Day 2 of your itinerary.`);
    window.setTimeout(() => document.querySelector("#itinerary")?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
  }

  return (
    <section id="stays" className="py-24 sm:py-28 bg-sand-100/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest route-code text-forest-600">
              Stays & experiences
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink-700">
              Hotels and activities with live availability
            </h2>
            {activeDestination && (
              <p className="mt-2 text-sm text-ink-500 flex items-center gap-2">
                <span>Showing options for <strong className="text-forest-600">{activeDestination.name}</strong>.</span>
                <button
                  onClick={() => setShowAllLocations((v) => !v)}
                  className="text-xs font-bold text-ocean-600 hover:text-ocean-700 underline"
                >
                  {showAllLocations ? `Show only ${activeDestination.name}` : "Show all locations"}
                </button>
              </p>
            )}
          </div>

          <div
            role="group"
            aria-label="Filter by type"
            className="inline-flex rounded-full bg-white p-1 shadow-card"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  filter === f
                    ? "bg-ocean-500 text-white"
                    : "text-ink-500 hover:text-ocean-600"
                }`}
              >
                {f === "All" ? "All" : `${f}s`}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedStays.map((item, i) => {
            const avail = availabilityCopy[item.availability];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                className="rounded-4xl bg-white shadow-card hover:shadow-lift transition-shadow overflow-hidden flex flex-col"
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink-600">
                    {item.type === "Hotel" ? (
                      <BedDouble className="h-3.5 w-3.5" />
                    ) : (
                      <Ticket className="h-3.5 w-3.5" />
                    )}
                    {item.type}
                  </span>
                  {item.availability === "low" && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-sunset-500 px-2.5 py-1 text-[11px] font-semibold text-white">
                      <Flame className="h-3 w-3" /> {item.spotsLeft} left
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-ink-700">
                    {item.name}
                  </h3>
                  <p className="text-xs text-ink-400 mt-0.5">{item.location}</p>

                  <div className="mt-3 flex items-center gap-1.5 text-sm">
                    <Star className="h-4 w-4 fill-sunset-500 text-sunset-500" />
                    <span className="font-semibold text-ink-700">{item.rating}</span>
                    <span className="text-ink-400">({item.reviews.toLocaleString()})</span>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
                    <span className={`h-1.5 w-1.5 rounded-full ${avail.dot}`} />
                    <span className={avail.text}>{avail.label}</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wide text-ink-400">
                        {item.type === "Hotel" ? "Per night" : "Per person"}
                      </span>
                      <span className="font-display text-base font-semibold text-ink-700">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <button
                      disabled={item.availability === "soldout" || addedIds.includes(item.id)}
                      onClick={() => addToTrip(item)}
                      className="rounded-full bg-ink-700 disabled:bg-ink-400/40 disabled:cursor-not-allowed hover:bg-ink-800 text-white text-sm font-semibold px-4 py-2.5 transition-colors"
                    >
                      {item.availability === "soldout" ? "Notify me" : addedIds.includes(item.id) ? "Added" : "Add to trip"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {message && <p role="status" className="mt-6 text-sm font-semibold text-forest-600">{message}</p>}
      </div>
    </section>
  );
}
