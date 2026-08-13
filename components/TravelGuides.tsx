"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { guides } from "@/lib/data";

type Guide = (typeof guides)[number] & { href?: string };

export default function TravelGuides({ publishedGuides }: { publishedGuides?: Guide[] }) {
  const visibleGuides = publishedGuides && publishedGuides.length > 0 ? publishedGuides : guides;

  return (
    <section id="guides" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest route-code text-forest-600">
              From the journal
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink-700">
              Travel guides worth reading before you go
            </h2>
          </div>
          <a
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 hover:text-ocean-700"
          >
            Visit the journal <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          {visibleGuides.map((g, i) => (
            <motion.a
              href={g.href ?? "/blog"}
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group rounded-4xl bg-white shadow-card hover:shadow-lift transition-shadow overflow-hidden flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={g.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-forest-600">
                  {g.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-lg font-semibold text-ink-700 leading-snug">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500 flex-1">{g.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-ink-400">
                  <span>{g.readTime}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-ocean-600 group-hover:gap-2 transition-all">
                    Read <ArrowUpRight className="h-3.5 w-3.5" />
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
