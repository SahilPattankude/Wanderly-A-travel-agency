"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Plus, X } from "lucide-react";
import { reviews as defaultReviews } from "@/lib/data";
import { supabase } from "@/lib/supabase/client";

type Review = {
  id: string | number;
  name: string;
  location: string;
  trip: string;
  rating: number;
  text: string;
  avatar: string;
};

export default function Reviews() {
  const [allReviews, setAllReviews] = useState<Review[]>(
    defaultReviews as Review[],
  );

  const [formOpen, setFormOpen] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [trip, setTrip] = useState("Santorini, Greece");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const [success, setSuccess] = useState("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState("");

  useEffect(() => {
    // Load reviews saved in browser
    try {
      const stored = window.localStorage.getItem("wanderly-reviews");

      if (stored) {
        const userReviews: Review[] = JSON.parse(stored);

        setAllReviews([...userReviews, ...(defaultReviews as Review[])]);
      }
    } catch (error) {
      console.error("Failed to load saved reviews:", error);
    }

    // Load logged-in user's profile
    if (supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) return;

        const metadata = user.user_metadata ?? {};

        setName(
          metadata.full_name ||
            metadata.name ||
            user.email?.split("@")[0] ||
            "",
        );

        setLocation(metadata.location || "Wanderly member");

        if (metadata.avatar_url) {
          setCurrentUserAvatar(metadata.avatar_url);
        }
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) return;

    const newReview: Review = {
      id: `user-rev-${Date.now()}`,
      name: name.trim(),
      location: location.trim() || "Traveler",
      trip,
      rating,
      text: text.trim(),

      // Use logged-in user's avatar or a reliable fallback.
      avatar:
        currentUserAvatar ||
        `https://i.pravatar.cc/200?img=${Math.floor(
          Math.random() * 70 + 1,
        )}`,
    };

    try {
      const stored = window.localStorage.getItem("wanderly-reviews");

      const userReviews: Review[] = stored ? JSON.parse(stored) : [];

      const updatedReviews = [newReview, ...userReviews];

      window.localStorage.setItem(
        "wanderly-reviews",
        JSON.stringify(updatedReviews),
      );
    } catch (error) {
      console.error("Failed to save review:", error);
    }

    setAllReviews((previousReviews) => [
      newReview,
      ...previousReviews,
    ]);

    setSuccess("Thank you! Your review has been added successfully.");

    setText("");
    setFormOpen(false);

    window.setTimeout(() => {
      setSuccess("");
    }, 4000);
  };

  return (
    <section
      id="reviews"
      className="bg-sand-100/70 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="route-code text-xs font-semibold uppercase tracking-widest text-sunset-600">
              Traveler stories
            </span>

            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-700 sm:text-4xl">
              Reviews from people who actually went
            </h2>

            <p className="mt-3 text-sm leading-6 text-ink-500">
              See what travelers are saying about planning and exploring
              their trips with Wanderly.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFormOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full bg-ink-700 px-5 py-3.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-ink-800"
          >
            {formOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}

            {formOpen ? "Close form" : "Write a review"}
          </button>
        </div>

        {/* Review Form */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-8 overflow-hidden"
            >
              <form
                onSubmit={handleSubmit}
                className="mx-auto grid max-w-3xl gap-5 rounded-4xl border border-ink-700/5 bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8"
              >
                {/* User profile */}
                <div className="flex items-center gap-3 border-b border-ink-700/5 pb-4 sm:col-span-2">
                  {currentUserAvatar ? (
                    <Image
                      src={currentUserAvatar}
                      alt="Your profile"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border border-sunset-500/20 object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700/5 bg-sand-100 text-sm">
                      👤
                    </div>
                  )}

                  <div>
                    <h3 className="font-display text-sm font-semibold text-ink-700">
                      Posting as {name || "Traveler"}
                    </h3>

                    <p className="text-[11px] text-ink-400">
                      Your profile picture will appear with your review.
                    </p>
                  </div>
                </div>

                {/* Name */}
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

                {/* Location */}
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

                {/* Destination */}
                <label className="block text-xs font-semibold text-ink-500">
                  Destination Visited

                  <select
                    value={trip}
                    onChange={(e) => setTrip(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-ink-700/15 bg-white px-2.5 py-2.5 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  >
                    <option value="Santorini, Greece">
                      Santorini, Greece
                    </option>

                    <option value="Kyoto, Japan">
                      Kyoto, Japan
                    </option>

                    <option value="Bali, Indonesia">
                      Bali, Indonesia
                    </option>

                    <option value="Banff, Canada">
                      Banff, Canada
                    </option>

                    <option value="Marrakech, Morocco">
                      Marrakech, Morocco
                    </option>

                    <option value="Patagonia, Argentina">
                      Patagonia, Argentina
                    </option>

                    <option value="Mumbai, India">
                      Mumbai, India
                    </option>

                    <option value="Pune, India">
                      Pune, India
                    </option>

                    <option value="Delhi, India">
                      Delhi, India
                    </option>

                    <option value="Hyderabad, India">
                      Hyderabad, India
                    </option>

                    <option value="Bengaluru, India">
                      Bengaluru, India
                    </option>
                  </select>
                </label>

                {/* Rating */}
                <label className="block text-xs font-semibold text-ink-500">
                  Rating

                  <select
                    value={rating}
                    onChange={(e) =>
                      setRating(Number(e.target.value))
                    }
                    className="mt-1.5 block w-full rounded-xl border border-ink-700/15 bg-white px-2.5 py-2.5 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  >
                    <option value={5}>5 Stars — Perfect</option>
                    <option value={4}>4 Stars — Very Good</option>
                    <option value={3}>3 Stars — Average</option>
                    <option value={2}>2 Stars — Poor</option>
                    <option value={1}>1 Star — Terrible</option>
                  </select>
                </label>

                {/* Review */}
                <label className="block text-xs font-semibold text-ink-500 sm:col-span-2">
                  Review Text

                  <textarea
                    required
                    minLength={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us about your Wanderly experience..."
                    rows={4}
                    className="mt-1.5 block w-full resize-none rounded-xl border border-ink-700/15 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  />

                  <span className="mt-1 block text-[11px] font-normal text-ink-400">
                    Minimum 10 characters
                  </span>
                </label>

                {/* Buttons */}
                <div className="mt-2 flex justify-end gap-3 sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="rounded-full border border-ink-700/10 px-5 py-2.5 text-xs font-semibold text-ink-650 transition-colors hover:bg-sand-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-full bg-sunset-500 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-sunset-600"
                  >
                    Submit review
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence>
          {success && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              role="status"
              className="mt-6 rounded-2xl border border-forest-100 bg-forest-50 px-4 py-3 text-center text-sm font-semibold text-forest-600"
            >
              {success}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Reviews */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {allReviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: "-60px",
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
              }}
              className="flex flex-col rounded-4xl bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Quote */}
              <Quote
                className="h-6 w-6 text-ocean-200"
                aria-hidden="true"
              />

              {/* Rating */}
              <div
                className="mt-3 flex items-center gap-1"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, index) => {
                  const filled =
                    index < Math.round(review.rating);

                  return (
                    <Star
                      key={index}
                      className={`h-3.5 w-3.5 ${
                        filled
                          ? "fill-sunset-500 text-sunset-500"
                          : "fill-ink-700/10 text-ink-700/10"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Review text */}
              <p className="mt-3 flex-1 text-sm leading-6 text-ink-600">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* User */}
              <div className="mt-5 flex items-center gap-3">
                <Image
                  src={review.avatar}
                  alt={`${review.name}'s avatar`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                  unoptimized
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-700">
                    {review.name}
                  </p>

                  <p className="truncate text-xs text-ink-400">
                    {review.location}
                  </p>
                </div>
              </div>

              {/* Trip */}
              <span className="route-code mt-4 inline-block w-fit rounded-full bg-ocean-50 px-2.5 py-1 text-[10px] font-semibold text-ocean-600">
                Trip: {review.trip}
              </span>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}