"use client";

import { motion } from "framer-motion";
import { Plane, ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-ocean-600 via-ocean-500 to-teal-500 px-8 py-16 sm:px-16 sm:py-20 text-center">
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-8 sm:left-16 text-white/25"
            aria-hidden="true"
          >
            <Plane className="h-16 w-16 -rotate-45" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [4, -4, 4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-8 sm:right-16 text-white/20"
            aria-hidden="true"
          >
            <Plane className="h-24 w-24 rotate-[135deg]" />
          </motion.div>

          <span className="inline-block route-code text-xs font-semibold uppercase tracking-widest text-white/80 bg-white/10 rounded-full px-4 py-1.5">
            Ready when you are
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-5xl font-semibold text-white max-w-2xl mx-auto leading-tight">
            Your next journey is one search away
          </h2>
          <p className="mt-5 text-ocean-50 max-w-lg mx-auto">
            Join thousands of travelers planning smarter trips with Wanderly —
            no credit card required to get started.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full bg-white text-ocean-700 font-semibold px-7 py-3.5 hover:bg-sand-50 transition-colors"
            >
              Start planning free <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-semibold px-7 py-3.5 hover:bg-white/10 transition-colors"
            >
              See pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
