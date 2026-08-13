"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/data";

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 sm:py-28 bg-sand-100/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest route-code text-sunset-600">
            Traveler stories
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink-700">
            Reviews from people who actually went
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
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
              <p className="mt-3 text-sm text-ink-600 flex-1">&ldquo;{r.text}&rdquo;</p>

              <div className="mt-5 flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt=""
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
