import type { Metadata } from "next";
import Link from "next/link";
import AITripPlanner from "@/components/AITripPlanner";
import { getAllPosts } from "@/sanity/queries";
import StructuredData from "@/components/StructuredData";
import type { FAQItem } from "@/lib/trip";

/**
 * Optimize title for SEO: 50-60 characters (brand added by root layout template)
 */
function optimizeTitle(rawTitle: string): string {
  const maxLen = 60; // template adds " | Wanderly" (10 chars) → keep page part ≤ 50

  // If already has brand, remove it first
  let title = rawTitle.replace(/\s*\|\s*Wanderly$/, "").trim();

  // If within range (≤ 50 for page part), return as-is
  if (title.length <= maxLen - 10) {
    return title;
  }

  // Too long → truncate at word boundary + ellipsis
  const available = maxLen - 10 - 1; // reserve space for ellipsis
  const truncated = title.slice(0, available).replace(/\s+\S*$/, "");
  return (truncated || title.slice(0, available)) + "…";
}

const rawTitle = "AI Trip Planner | Create Personalized Itineraries";
const optimizedTitle = optimizeTitle(rawTitle);

// Meta description: 150-160 chars for optimal SERP display (156 chars)
const metaDescription =
  "Create custom travel itineraries with Wanderly's AI Trip Planner. Personalized day-by-day plans for your destination, budget, interests, and travel style.";

export const metadata: Metadata = {
  title: optimizedTitle,
  description: metaDescription,
  alternates: {
    canonical: "https://wanderly-a-travel-agency.vercel.app/ai-planner",
  },
  openGraph: {
    title: optimizedTitle,
    description: metaDescription,
    url: "https://wanderly-a-travel-agency.vercel.app/ai-planner",
    siteName: "Wanderly",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: optimizedTitle,
    description: metaDescription,
  },
};

const faqs = [
  {
    question: "What is Wanderly AI Trip Planner?",
    answer:
      "Wanderly AI Trip Planner creates personalized travel itineraries based on your destination, trip duration, budget, travel style, travelers, and interests.",
  },
  {
    question: "What information do I need to plan a trip?",
    answer:
      "Enter your destination, number of days, travelers, budget, travel style, and interests. You can also add custom preferences such as hidden cafes, photography, or local markets.",
  },
  {
    question: "What does the AI-generated itinerary include?",
    answer:
      "Your itinerary can include a trip summary, estimated budget, day-by-day activities, places to visit, food recommendations, and practical travel tips.",
  },
  {
    question: "Can I create another itinerary?",
    answer:
      "Yes. After viewing your itinerary, you can choose to plan another trip and create a new personalized itinerary.",
  },
];

export default async function AIPlannerPage() {
  // Fetch the latest travel guides from Sanity
  const posts = await getAllPosts();

  // Show the 3 most recent travel guides
  const travelGuides = posts.slice(0, 3);

  const pageUrl = "https://wanderly-a-travel-agency.vercel.app/ai-planner";
  const pageTitle = "AI Trip Planner | Create Personalized Itineraries | Wanderly";
  const pageDescription =
    "Plan your next adventure with Wanderly's AI Trip Planner. Get personalized travel itineraries based on your destination, budget, interests, travel style, and trip duration.";

  return (
    <>
      <StructuredData
        faqs={faqs}
        pageUrl={pageUrl}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        isAiPlanner={true}
      />
      <main className="min-h-screen bg-gray-50">
      {/* Back to Wanderly */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-ocean-700 transition-colors hover:text-sunset-600"
        >
          ← Back to Wanderly
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 pb-10 pt-8 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sunset-600">
            ✨ Wanderly AI
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-ink-700 md:text-6xl">
            Plan Your Perfect Trip With AI
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Tell us your destination, budget, travel style, interests, and trip
            duration. Wanderly AI creates a personalized day-by-day itinerary
            designed around the way you want to travel.
          </p>
        </div>
      </section>

      {/* AI Planner */}
      <section className="px-6 pb-16">
        <AITripPlanner />
      </section>

      {/* How It Works */}
      <section className="border-t border-ink-700/10 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sunset-600">
              Simple trip planning
            </p>

            <h2 className="mt-2 font-display text-3xl font-semibold text-ink-700 md:text-4xl">
              How Wanderly AI Works
            </h2>

            <p className="mt-4 text-gray-600">
              Create a personalized travel plan in three simple steps.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Tell us about your trip",
                text: "Choose your destination, trip duration, travelers, budget, travel style, and interests.",
              },
              {
                number: "02",
                title: "Let AI plan your trip",
                text: "Wanderly AI uses your preferences to create a personalized day-by-day travel itinerary.",
              },
              {
                number: "03",
                title: "Explore your itinerary",
                text: "Discover activities, places to visit, food recommendations, estimated costs, and travel tips.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-ink-700/10 bg-cream-50 p-6"
              >
                <span className="text-sm font-bold text-sunset-600">
                  {step.number}
                </span>

                <h3 className="mt-3 text-lg font-semibold text-ink-700">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sunset-600">
                Your personalized plan
              </p>

              <h2 className="mt-2 font-display text-3xl font-semibold text-ink-700 md:text-4xl">
                Everything you need for your trip
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Wanderly AI turns your travel preferences into a practical
                itinerary that helps you decide what to do, where to go, and
                what to experience during your trip.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Day-by-day itinerary",
                "Estimated trip budget",
                "Places to visit",
                "Food recommendations",
                "Morning, afternoon & evening activities",
                "Travel tips",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-ink-700/10 bg-white p-4 shadow-sm"
                >
                  <span className="mr-2 font-bold text-ocean-600">✓</span>

                  <span className="text-sm font-medium text-ink-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Inspiration */}
      {travelGuides.length > 0 && (
        <section className="border-t border-ink-700/10 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-sunset-600">
                Need inspiration?
              </p>

              <h2 className="mt-2 font-display text-3xl font-semibold text-ink-700 md:text-4xl">
                Explore Our Travel Guides
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Not sure where to go next? Explore our travel guides for
                destination ideas, itineraries, and travel tips.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {travelGuides.map((guide) => (
                <Link
                  key={guide._id}
                  href={`/blog/${guide.slug}`}
                  className="group rounded-2xl border border-ink-700/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-sunset-600">
                    {guide.category}
                  </p>

                  <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-ink-700 transition-colors group-hover:text-ocean-600">
                    {guide.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {guide.excerpt}
                  </p>

                  <span className="mt-5 inline-block text-sm font-semibold text-ocean-600">
                    Read travel guide →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="text-sm font-semibold text-ocean-600 transition-colors hover:text-sunset-600"
              >
                View all travel guides →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-ink-700/10 bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sunset-600">
              FAQ
            </p>

            <h2 className="mt-2 font-display text-3xl font-semibold text-ink-700">
              AI Trip Planner FAQs
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-ink-700/10 bg-cream-50 p-5"
              >
                <summary className="cursor-pointer list-none font-semibold text-ink-700">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}

                    <span className="text-xl text-ocean-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <p className="mt-3 pr-6 text-sm leading-6 text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
