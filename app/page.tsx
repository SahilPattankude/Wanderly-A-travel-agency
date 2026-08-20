import type { Metadata } from "next";
import Link from "next/link";
import nextDynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const PopularDestinations = nextDynamic(() => import("@/components/PopularDestinations"));
const InteractiveMap = nextDynamic(() => import("@/components/InteractiveMap"));
const HotelsActivities = nextDynamic(() => import("@/components/HotelsActivities"));
const ItineraryBuilder = nextDynamic(() => import("@/components/ItineraryBuilder"));
const Reviews = nextDynamic(() => import("@/components/Reviews"));
const TravelGuides = nextDynamic(() => import("@/components/TravelGuides"));
const Testimonials = nextDynamic(() => import("@/components/Testimonials"));
const FAQ = nextDynamic(() => import("@/components/FAQ"));
const CTA = nextDynamic(() => import("@/components/CTA"));
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blogs";
import { guides } from "@/lib/data";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getAllPosts();

  const publishedGuides = posts.slice(0, 3).map((post, index) => ({
    id: post._id,
    title: post.title,
    excerpt: post.excerpt,
    image: guides[index % guides.length].image,
    category: post.category,
    readTime: post.readTime,
    href: `/blog/${post.slug}`,
  }));

  return (
    <>
      <StructuredData />

      <Navbar />

      <main id="main-content">
        <Hero />

        {/* AI Trip Planner */}
        <section className="px-6 py-14">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-ocean-700 px-6 py-10 text-center text-white shadow-card sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
              ✨ Wanderly AI
            </p>

            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Plan Your Next Trip With AI
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">
              Tell Wanderly your destination, budget, interests, and travel
              style. Get a personalized day-by-day itinerary in seconds.
            </p>

            <Link
              href="/ai-planner"
              className="mt-6 inline-flex items-center rounded-2xl bg-white px-6 py-3.5 font-semibold text-ocean-700 transition hover:bg-cream-50"
            >
              ✨ Try AI Trip Planner
            </Link>
          </div>
        </section>

        <PopularDestinations />

        <InteractiveMap />

        <HotelsActivities />

        <ItineraryBuilder />

        <Reviews />

        <TravelGuides publishedGuides={publishedGuides} />

        <Testimonials />

        <FAQ />

        <CTA />
      </main>

      <Footer />
    </>
  );
}