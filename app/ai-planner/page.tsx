import type { Metadata } from "next";
import AITripPlanner from "@/components/AITripPlanner";

export const metadata: Metadata = {
  title: "AI Trip Planner | Wanderly",
  description:
    "Create personalized travel itineraries with Wanderly's AI Trip Planner.",
};

export default function AIPlannerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Back to Wanderly */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <a
          href="/"
          className="inline-flex items-center text-base font-medium text-ocean-700 transition-colors hover:text-sunset-600"
        >
          ← Back to Wanderly
        </a>
      </div>

      {/* Hero */}
      <section className="px-6 pb-10 pt-8 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider">
            ✨ Wanderly AI
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Plan Your Perfect Trip With AI
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Tell us where you want to go, your budget, travel
            style and interests. Wanderly AI will create a
            personalized day-by-day itinerary for you.
          </p>
        </div>
      </section>

      {/* Planner */}
      <section className="px-6 pb-20">
        <AITripPlanner />
      </section>
    </main>
  );
}