import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import InteractiveMap from "@/components/InteractiveMap";
import HotelsActivities from "@/components/HotelsActivities";
import ItineraryBuilder from "@/components/ItineraryBuilder";
import Reviews from "@/components/Reviews";
import TravelGuides from "@/components/TravelGuides";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
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
