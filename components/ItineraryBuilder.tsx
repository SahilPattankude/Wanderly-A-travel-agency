"use client";

import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { GripVertical, Plus, Trash2, Share2, Link2, Facebook, Twitter } from "lucide-react";

type Item = { id: string; day: number; time: string; title: string; place: string };

const initialItems: Item[] = [
  { id: "1", day: 1, time: "09:00", title: "Arrive & check in", place: "Azure Cliff Resort, Santorini" },
  { id: "2", day: 1, time: "13:00", title: "Walk the caldera path", place: "Fira to Oia" },
  { id: "3", day: 1, time: "18:30", title: "Sunset sailing trip", place: "Ammoudi Bay" },
  { id: "4", day: 2, time: "10:00", title: "Wine tasting tour", place: "Santo Wines Winery" },
];

const suggestions = [
  { id: "s1", time: "08:00", title: "Beach morning", place: "Red Beach, Akrotiri" },
  { id: "s2", time: "16:00", title: "Museum visit", place: "Museum of Prehistoric Thera" },
];

export default function ItineraryBuilder() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [shareOpen, setShareOpen] = useState(false);

  const addSuggestion = (s: (typeof suggestions)[number]) => {
    setItems((prev) => [
      ...prev,
      { id: `${s.id}-${Date.now()}`, day: 2, time: s.time, title: s.title, place: s.place },
    ]);
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const days = Array.from(new Set(items.map((i) => i.day))).sort();

  return (
    <section id="itinerary" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest route-code text-ocean-600">
            Your trip, your order
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink-700">
            Build a personalized itinerary in minutes
          </h2>
          <p className="mt-4 text-ink-500">
            Reorder stops to match how you actually want to move through a day, add
            suggestions with one tap, then share the plan with anyone joining you.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          {/* Timeline */}
          <div className="rounded-4xl bg-white shadow-card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-ink-700">
                Santorini · 3 days
              </h3>
              <div className="relative">
                <button
                  onClick={() => setShareOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-700/10 hover:border-ocean-400 px-4 py-2 text-sm font-semibold text-ink-600 transition-colors"
                  aria-expanded={shareOpen}
                  aria-haspopup="true"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
                <AnimatePresence>
                  {shareOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-lift border border-ink-700/5 p-2 z-20"
                    >
                      {[
                        { icon: Link2, label: "Copy link" },
                        { icon: Facebook, label: "Share to Facebook" },
                        { icon: Twitter, label: "Share to X" },
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink-600 hover:bg-sand-100 transition-colors"
                        >
                          <opt.icon className="h-4 w-4 text-ocean-500" />
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {days.map((day) => (
              <div key={day} className="mb-6 last:mb-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="route-code text-xs font-bold text-white bg-ocean-500 rounded-full h-7 w-7 flex items-center justify-center">
                    {day}
                  </span>
                  <span className="text-sm font-semibold text-ink-500">Day {day}</span>
                </div>

                <Reorder.Group
                  axis="y"
                  values={items.filter((i) => i.day === day)}
                  onReorder={(newOrder) =>
                    setItems((prev) => [
                      ...prev.filter((i) => i.day !== day),
                      ...newOrder,
                    ])
                  }
                  className="space-y-2 ml-3.5 pl-6 border-l-2 border-dashed border-ink-700/10"
                >
                  {items
                    .filter((i) => i.day === day)
                    .map((item) => (
                      <Reorder.Item
                        key={item.id}
                        value={item}
                        className="group flex items-center gap-3 rounded-2xl bg-sand-50 hover:bg-sand-100 border border-ink-700/5 px-4 py-3 cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="h-4 w-4 text-ink-300 shrink-0" aria-hidden="true" />
                        <span className="route-code text-xs font-semibold text-ocean-600 shrink-0 w-12">
                          {item.time}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold text-ink-700 truncate">
                            {item.title}
                          </span>
                          <span className="block text-xs text-ink-400 truncate">{item.place}</span>
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.title} from itinerary`}
                          className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity text-ink-300 hover:text-sunset-600 shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </Reorder.Item>
                    ))}
                </Reorder.Group>
              </div>
            ))}
            <p className="text-xs text-ink-400 mt-4">
              Drag any stop by its handle to reorder your day.
            </p>
          </div>

          {/* Suggestions */}
          <div className="rounded-4xl bg-ocean-50 border border-ocean-100 p-6">
            <h3 className="font-display text-lg font-semibold text-ink-700">
              Suggested for your trip
            </h3>
            <p className="text-sm text-ink-500 mt-1">
              Based on your Santorini itinerary and travel dates.
            </p>

            <div className="mt-5 space-y-3">
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card"
                >
                  <span className="route-code text-xs font-semibold text-teal-600 shrink-0 w-12">
                    {s.time}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-ink-700 truncate">
                      {s.title}
                    </span>
                    <span className="block text-xs text-ink-400 truncate">{s.place}</span>
                  </span>
                  <button
                    onClick={() => addSuggestion(s)}
                    aria-label={`Add ${s.title} to itinerary`}
                    className="shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-ocean-500 hover:bg-ocean-600 text-white transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <a
              href="#stays"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sunset-500 hover:bg-sunset-600 text-white text-sm font-semibold px-5 py-3 transition-colors"
            >
              Browse more activities
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
