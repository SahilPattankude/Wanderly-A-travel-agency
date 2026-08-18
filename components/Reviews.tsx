"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Plus, X } from "lucide-react";
import { reviews as defaultReviews } from "@/lib/data";
import { supabase } from "@/lib/supabase/client";

export default function Reviews() {
  const [allReviews, setAllReviews] = useState<any[]>(defaultReviews);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [trip, setTrip] = useState("Santorini, Greece");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [success, setSuccess] = useState("");

  const [currentUserAvatar, setCurrentUserAvatar] = useState<string>("");

  useEffect(() => {
    // Sync reviews from default and localStorage
    const loadReviews = () => {
      const stored = window.localStorage.getItem("wanderly-reviews");
      const userList = stored ? JSON.parse(stored) : [];
      setAllReviews([...userList, ...defaultReviews]);
    };

    loadReviews();

    // Prefill name & avatar if user is signed in
    if (supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setName(
            user.user_metadata?.full_name || user.email?.split("@")[0] || "",
          );
          setLocation("Wanderly member");
          if (user.user_metadata?.avatar_url) {
            setCurrentUserAvatar(user.user_metadata.avatar_url);
          }
        }
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview = {
      id: `user-rev-${Date.now()}`,
      name: name.trim(),
      location: location.trim() || "Traveler",
      trip,
      rating,
      text: text.trim(),
      avatar:
        currentUserAvatar ||
        `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?q=80&w=200&auto=format&fit=crop`,
    };

    const stored = window.localStorage.getItem("wanderly-reviews");
    const userList = stored ? JSON.parse(stored) : [];
    const updatedList = [newReview, ...userList];
    window.localStorage.setItem(
      "wanderly-reviews",
      JSON.stringify(updatedList),
    );

    setAllReviews([newReview, ...allReviews]);
    setSuccess("Thank you! Your review has been added successfully.");
    setText("");
    setFormOpen(false);

    // Reset success message after 4 seconds
    setTimeout(() => setSuccess(""), 4000);
  };

  return (
    <section id="reviews" className="py-24 sm:py-28 bg-sand-100/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest route-code text-sunset-600">
              Traveler stories
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink-700">
              Reviews from people who actually went
            </h2>
          </div>
          <button
            onClick={() => setFormOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full bg-ink-700 hover:bg-ink-800 text-white text-sm font-semibold px-5 py-3 transition-colors shadow-card"
          >
            {formOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {formOpen ? "Close form" : "Write a review"}
          </button>
        </div>

        {/* Review Submission Form */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-8"
            >
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-3xl rounded-4xl bg-white p-6 sm:p-8 shadow-card border border-ink-700/5 grid gap-5 sm:grid-cols-2"
              >
                <div className="sm:col-span-2 flex items-center gap-3 pb-3 border-b border-ink-700/5">
                  {currentUserAvatar ? (
                    <Image
                      src={currentUserAvatar}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover border border-sunset-500/20"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-sand-100 flex items-center justify-center text-ink-400 text-sm font-semibold border border-ink-700/5">
                      👤
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-sm font-semibold text-ink-700">
                      Posting as {name || "Traveler"}
                    </h3>
                    <p className="text-[11px] text-ink-400">
                      Your profile picture will be shown next to your review.
                    </p>
                  </div>
                </div>

                <label className="block text-xs font-semibold text-ink-500">
                  Your Name
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul S."
                    className="mt-1.5 block w-full rounded-xl border border-ink-700/15 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  />
                </label>

                <label className="block text-xs font-semibold text-ink-500">
                  Your Location
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India"
                    className="mt-1.5 block w-full rounded-xl border border-ink-700/15 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  />
                </label>

                <label className="block text-xs font-semibold text-ink-500">
                  Destination Visited
                  <select
                    value={trip}
                    onChange={(e) => setTrip(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-ink-700/15 bg-white px-2.5 py-2.5 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  >
                    <option value="Santorini, Greece">Santorini, Greece</option>
                    <option value="Kyoto, Japan">Kyoto, Japan</option>
                    <option value="Bali, Indonesia">Bali, Indonesia</option>
                    <option value="Banff, Canada">Banff, Canada</option>
                    <option value="Marrakech, Morocco">
                      Marrakech, Morocco
                    </option>
                    <option value="Patagonia, Argentina">
                      Patagonia, Argentina
                    </option>
                  </select>
                </label>

                <label className="block text-xs font-semibold text-ink-500">
                  Rating
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mt-1.5 block w-full rounded-xl border border-ink-700/15 bg-white px-2.5 py-2.5 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  >
                    <option value={5}>5 Stars — Perfect</option>
                    <option value={4}>4 Stars — Very Good</option>
                    <option value={3}>3 Stars — Average</option>
                    <option value={2}>2 Stars — Poor</option>
                    <option value={1}>1 Star — Terrible</option>
                  </select>
                </label>

                <label className="block text-xs font-semibold text-ink-500 sm:col-span-2">
                  Review Text
                  <textarea
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us about the itinerary builder, locations, and how it went..."
                    rows={4}
                    className="mt-1.5 block w-full rounded-xl border border-ink-700/15 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-ocean-500 resize-none"
                  />
                </label>

                <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="rounded-full border border-ink-700/10 px-5 py-2.5 text-xs font-semibold text-ink-650 hover:bg-sand-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-sunset-500 hover:bg-sunset-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors"
                  >
                    Submit review
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {success && (
          <p
            role="status"
            className="mt-6 text-sm font-semibold text-forest-600 bg-forest-50 border border-forest-100 rounded-2xl px-4 py-3 text-center"
          >
            {success}
          </p>
        )}

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allReviews.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-4xl bg-white shadow-card p-6 flex flex-col"
            >
              <Quote className="h-6 w-6 text-ocean-200" aria-hidden="true" />
              <div className="mt-3 flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-3.5 w-3.5 ${
                      idx < Math.round(r.rating)
                        ? "fill-sunset-500 text-sunset-500"
                        : "fill-ink-700/10 text-ink-700/10"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-ink-600 flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3">
                <Image
                  src={r.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-ink-700">{r.name}</p>
                  <p className="text-xs text-ink-400">{r.location}</p>
                </div>
              </div>
              <span className="mt-4 route-code inline-block w-fit text-[10px] font-semibold text-ocean-600 bg-ocean-50 rounded-full px-2.5 py-1">
                Trip: {r.trip}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
