"use client";

import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { destinations as fallbackDestinations, type Destination } from "@/lib/data";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { saveSelectedDestination } from "@/lib/trip";

type SupabaseDestination = {
  id: string;
  name: string;
  country: string;
  code: string;
  image: string;
  price_from: number;
  rating: number;
  reviews: number;
  tag: string;
  x: number;
  y: number;
};

function toDestination(destination: SupabaseDestination): Destination {
  return {
    id: destination.id,
    name: destination.name,
    country: destination.country,
    code: destination.code,
    image: destination.image,
    priceFrom: destination.price_from,
    rating: destination.rating,
    reviews: destination.reviews,
    tag: destination.tag,
    x: destination.x,
    y: destination.y,
  };
}

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>(fallbackDestinations);

  useEffect(() => {
    async function loadDestinations() {
      if (!supabase) return;
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Could not load Supabase destinations:", error.message);
        return;
      }

      if (data && data.length > 0) {
        setDestinations((data as SupabaseDestination[]).map(toDestination));
      }
    }

    loadDestinations();
  }, []);

  return (
    <section id="destinations" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest route-code text-sunset-600">
              Popular this season
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink-700">
              Destinations travelers are booking right now
            </h2>
          </div>
          <a
            href="#map"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 hover:text-ocean-700"
          >
            View all on map <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <motion.a
              href="#itinerary"
              onClick={() => saveSelectedDestination(d)}
              key={d.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group perforated-edge perforated-notch relative rounded-4xl bg-white shadow-card hover:shadow-lift transition-shadow overflow-hidden"
              style={{ "--perf-left": "100%" } as React.CSSProperties}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={d.image}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={`${d.name}, ${d.country}`}
                  
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-800/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-semibold text-sunset-600">
                  {d.tag}
                </span>
                <span className="absolute top-4 right-4 route-code rounded-full bg-ink-800/60 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-white">
                  {d.code}
                </span>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-display text-xl font-semibold">{d.name}</h3>
                  <p className="text-xs text-white/80">{d.country}</p>
                </div>
              </div>

              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm">
                  <Star className="h-4 w-4 fill-sunset-500 text-sunset-500" aria-hidden="true" />
                  <span className="font-semibold text-ink-700">{d.rating}</span>
                  <span className="text-ink-400">({d.reviews.toLocaleString()})</span>
                </div>
                <div className="text-right">
                  <span className="block text-[11px] uppercase tracking-wide text-ink-400">
                    From
                  </span>
                  <span className="font-display text-base font-semibold text-ink-700">
                    ₹{d.priceFrom.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
