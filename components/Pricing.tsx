"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/data";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest route-code text-ocean-600">
            Simple pricing
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink-700">
            Plan for free. Upgrade when it's worth it.
          </h2>
          <p className="mt-4 text-ink-500">
            No hidden fees, no surprise upsells at checkout. Cancel anytime.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-start">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`relative rounded-4xl p-8 flex flex-col h-full ${
                plan.highlighted
                  ? "bg-ink-700 text-white shadow-lift md:-translate-y-3"
                  : "bg-white text-ink-700 shadow-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-sunset-500 text-white text-[11px] font-semibold px-3 py-1">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
              <p className={`mt-2 text-sm ${plan.highlighted ? "text-ocean-100" : "text-ink-500"}`}>
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold">
                  {plan.price === 0 ? "Free" : `₹${plan.price}`}
                </span>
                {plan.price !== 0 && (
                  <span className={plan.highlighted ? "text-ocean-200" : "text-ink-400"}>
                    /{plan.period}
                  </span>
                )}
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`h-4 w-4 mt-0.5 shrink-0 ${
                        plan.highlighted ? "text-teal-400" : "text-forest-500"
                      }`}
                    />
                    <span className={plan.highlighted ? "text-ocean-50" : "text-ink-600"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#itinerary"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-sunset-500 hover:bg-sunset-600 text-white"
                    : "bg-ink-700 hover:bg-ink-800 text-white"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
