"use client";

import { useState } from "react";

interface ItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  places: string[];
  food: string[];
  estimatedCost: string;
}

interface Itinerary {
  tripTitle: string;
  destination: string;
  summary: string;
  estimatedBudget: string;
  days: ItineraryDay[];
  travelTips: string[];
}

const travelStyles = [
  "Budget",
  "Relaxed",
  "Adventure",
  "Luxury",
  "Family",
  "Honeymoon",
];

const interestOptions = [
  "Beaches",
  "Food",
  "Culture",
  "History",
  "Adventure",
  "Nature",
  "Shopping",
  "Nightlife",
];

export default function AITripPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("3");
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState("");
  const [travelStyle, setTravelStyle] = useState("Relaxed");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterests, setCustomInterests] = useState("");

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleInterest(interest: string) {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  }

  async function generateTrip() {
    setError("");
    setItinerary(null);

    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    if (!days || Number(days) < 1) {
      setError("Please enter a valid number of days.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/ai/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          days: Number(days),
          travelers: Number(travelers),
          budget,
          travelStyle,
          interests: [
            ...interests,
            ...(customInterests.trim()
              ? [customInterests.trim()]
              : []),
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate itinerary."
        );
      }

      setItinerary(data.itinerary);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate your itinerary right now."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetPlanner() {
    setItinerary(null);
    setError("");
    setDestination("");
    setDays("3");
    setTravelers("2");
    setBudget("");
    setTravelStyle("Relaxed");
    setInterests([]);
    setCustomInterests("");
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {!itinerary ? (
        /* =========================
           PLANNER FORM
        ========================== */
        <div className="overflow-hidden rounded-3xl border border-ink-700/10 bg-white shadow-card">
          {/* Form Header */}
          <div className="border-b border-ink-700/10 bg-gradient-to-r from-white to-cream-50 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sunset-100 text-xl">
                ✨
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink-700">
                  Build your trip
                </h2>

                <p className="text-sm text-ink-400">
                  Tell us what kind of experience you want.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Destination */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-ink-700">
                Where do you want to go?
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  📍
                </span>

                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Goa, Bali, Paris"
                  disabled={loading}
                  className="w-full rounded-2xl border border-ink-700/15 bg-cream-50 py-3.5 pl-11 pr-4 text-ink-700 outline-none transition placeholder:text-ink-400 focus:border-ocean-500 focus:bg-white focus:ring-2 focus:ring-ocean-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Days / Travelers / Budget */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink-700">
                  📅 Days
                </label>

                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-ink-700/15 bg-cream-50 px-4 py-3 text-ink-700 outline-none focus:border-ocean-500 focus:bg-white focus:ring-2 focus:ring-ocean-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-ink-700">
                  👥 Travelers
                </label>

                <input
                  type="number"
                  min="1"
                  max="20"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-ink-700/15 bg-cream-50 px-4 py-3 text-ink-700 outline-none focus:border-ocean-500 focus:bg-white focus:ring-2 focus:ring-ocean-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-ink-700">
                  💰 Budget
                </label>

                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="₹50,000"
                  disabled={loading}
                  className="w-full rounded-2xl border border-ink-700/15 bg-cream-50 px-4 py-3 text-ink-700 outline-none placeholder:text-ink-400 focus:border-ocean-500 focus:bg-white focus:ring-2 focus:ring-ocean-500/10"
                />
              </div>
            </div>

            {/* Travel Style */}
            <div className="mt-6">
              <label className="mb-3 block text-sm font-semibold text-ink-700">
                🧳 Travel style
              </label>

              <div className="flex flex-wrap gap-2">
                {travelStyles.map((style) => {
                  const selected = travelStyle === style;

                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setTravelStyle(style)}
                      disabled={loading}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        selected
                          ? "border-ocean-600 bg-ocean-600 text-white shadow-sm"
                          : "border-ink-700/15 bg-white text-ink-600 hover:border-ocean-400 hover:bg-ocean-50"
                      }`}
                    >
                      {style}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interests */}
            <div className="mt-6">
              <label className="mb-3 block text-sm font-semibold text-ink-700">
                ❤️ What are you interested in?
              </label>

              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => {
                  const selected = interests.includes(interest);

                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      disabled={loading}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        selected
                          ? "border-sunset-600 bg-sunset-600 text-white shadow-sm"
                          : "border-ink-700/15 bg-white text-ink-600 hover:border-sunset-400 hover:bg-sunset-50"
                      }`}
                    >
                      {selected ? "✓ " : ""}
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Interests */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-ink-700">
                Anything else?
              </label>

              <input
                type="text"
                value={customInterests}
                onChange={(e) => setCustomInterests(e.target.value)}
                placeholder="e.g. hidden cafes, photography, local markets"
                disabled={loading}
                className="w-full rounded-2xl border border-ink-700/15 bg-cream-50 px-4 py-3 text-sm text-ink-700 outline-none placeholder:text-ink-400 focus:border-ocean-500 focus:bg-white focus:ring-2 focus:ring-ocean-500/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p className="font-semibold">
                  Something went wrong
                </p>

                <p className="mt-1">{error}</p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-ocean-50 p-4">
                <div className="h-9 w-9 shrink-0 animate-spin rounded-full border-2 border-ocean-200 border-t-ocean-600" />

                <div>
                  <p className="font-semibold text-ink-700">
                    Wanderly AI is planning your trip...
                  </p>

                  <p className="text-sm text-ink-500">
                    Creating your personalized itinerary.
                  </p>
                </div>
              </div>
            )}

            {/* Generate */}
            <button
              type="button"
              onClick={generateTrip}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-ocean-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-ocean-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Creating your trip...
                </span>
              ) : (
                "✨ Generate My Trip"
              )}
            </button>

            <p className="mt-3 text-center text-xs text-ink-400">
              AI-generated recommendations • Verify important travel details
              before booking
            </p>
          </div>
        </div>
      ) : (
        /* =========================
           GENERATED ITINERARY
        ========================== */
        <div>
          {/* Trip Header */}
          <div className="overflow-hidden rounded-3xl bg-ocean-700 text-white shadow-card">
            <div className="px-6 py-7 sm:px-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-white/70">
                    ✨ Your AI-generated trip
                  </p>

                  <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {itinerary.tripTitle}
                  </h2>

                  <p className="mt-3 text-white/80">
                    📍 {itinerary.destination}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs text-white/60">
                    Estimated budget
                  </p>

                  <p className="mt-1 font-semibold">
                    {itinerary.estimatedBudget}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/5 px-6 py-5 sm:px-8">
              <p className="leading-7 text-white/80">
                {itinerary.summary}
              </p>
            </div>
          </div>

          {/* Itinerary */}
          <div className="mt-8">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-sunset-600">
                Your itinerary
              </p>

              <h3 className="mt-1 font-display text-2xl font-semibold text-ink-700">
                Day by Day
              </h3>
            </div>

            <div className="space-y-4">
              {itinerary.days.map((day) => (
                <div
                  key={day.day}
                  className="overflow-hidden rounded-3xl border border-ink-700/10 bg-white shadow-sm"
                >
                  {/* Day Header */}
                  <div className="flex flex-col gap-3 border-b border-ink-700/10 bg-cream-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ocean-600 font-bold text-white">
                        {day.day}
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-sunset-600">
                          Day {day.day}
                        </p>

                        <h4 className="font-display text-xl font-semibold text-ink-700">
                          {day.title}
                        </h4>
                      </div>
                    </div>

                    <span className="w-fit rounded-full border border-ink-700/10 bg-white px-3 py-1.5 text-sm font-semibold text-ink-600">
                      💰 {day.estimatedCost}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* Timeline */}
                    <div className="grid gap-4 md:grid-cols-3">
                      <ActivityCard
                        icon="🌅"
                        title="Morning"
                        text={day.morning}
                      />

                      <ActivityCard
                        icon="☀️"
                        title="Afternoon"
                        text={day.afternoon}
                      />

                      <ActivityCard
                        icon="🌙"
                        title="Evening"
                        text={day.evening}
                      />
                    </div>

                    {/* Places + Food */}
                    <div className="mt-5 grid gap-5 border-t border-ink-700/10 pt-5 md:grid-cols-2">
                      <div>
                        <h5 className="mb-3 text-sm font-semibold text-ink-700">
                          📍 Places to visit
                        </h5>

                        <div className="flex flex-wrap gap-2">
                          {day.places.map((place) => (
                            <span
                              key={place}
                              className="rounded-full bg-ocean-50 px-3 py-1.5 text-xs font-medium text-ocean-700"
                            >
                              {place}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="mb-3 text-sm font-semibold text-ink-700">
                          🍜 Food recommendations
                        </h5>

                        <ul className="space-y-2 text-sm text-ink-500">
                          {day.food.map((food) => (
                            <li
                              key={food}
                              className="flex gap-2"
                            >
                              <span className="text-sunset-600">
                                •
                              </span>

                              <span>{food}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 rounded-3xl border border-ink-700/10 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunset-50 text-lg">
                💡
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-sunset-600">
                  Wanderly AI
                </p>

                <h3 className="font-display text-xl font-semibold text-ink-700">
                  Travel Tips
                </h3>
              </div>
            </div>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {itinerary.travelTips.map((tip) => (
                <li
                  key={tip}
                  className="rounded-xl bg-cream-50 p-3 text-sm leading-6 text-ink-500"
                >
                  <span className="mr-2 font-bold text-ocean-600">
                    ✓
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <button
            type="button"
            onClick={resetPlanner}
            className="mt-5 w-full rounded-2xl bg-ocean-600 px-6 py-3.5 font-semibold text-white transition hover:bg-ocean-700"
          >
            ✨ Plan Another Trip
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================
   ACTIVITY CARD
========================= */

function ActivityCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-cream-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <span>{icon}</span>

        <h5 className="text-sm font-semibold text-ink-700">
          {title}
        </h5>
      </div>

      <p className="text-sm leading-6 text-ink-500">
        {text}
      </p>
    </div>
  );
}