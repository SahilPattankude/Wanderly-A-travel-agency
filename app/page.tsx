import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import InteractiveMap from "@/components/InteractiveMap";
import HotelsActivities from "@/components/HotelsActivities";
import ItineraryBuilder from "@/components/ItineraryBuilder";
import Reviews from "@/components/Reviews";
import TravelGuides from "@/components/TravelGuides";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <PopularDestinations />
        <InteractiveMap />
        <HotelsActivities />
        <ItineraryBuilder />
        <Reviews />
        <TravelGuides />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
