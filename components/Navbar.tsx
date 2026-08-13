"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X } from "lucide-react";

const links = [
  { href: "#destinations", label: "Destinations" },
  { href: "#map", label: "Explore Map" },
  { href: "#stays", label: "Hotels & Activities" },
  { href: "#itinerary", label: "Itinerary Builder" },
  { href: "/blog", label: "Travel Guides" },
  { href: "#pricing", label: "Pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-sand-50/90 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-20"
      >
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ocean-500 text-white shadow-card">
            <Compass className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-semibold text-ink-700">
            Wanderly
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink-500 hover:text-sunset-600 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/register"
            className="text-sm font-semibold text-ink-600 hover:text-ocean-600 transition-colors px-3 py-2"
          >
            Register
          </a>
          <a
            href="/sign-in"
            className="text-sm font-semibold text-ink-600 hover:text-ocean-600 transition-colors px-3 py-2"
          >
            Sign in
          </a>
          <a
            href="#itinerary"
            className="text-sm font-semibold text-white bg-sunset-500 hover:bg-sunset-600 transition-colors px-5 py-2.5 rounded-full shadow-card"
          >
            Plan a trip
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-full p-2 text-ink-700 hover:bg-ink-700/5"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-sand-50 border-t border-ink-700/10"
          >
            <ul className="px-5 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-ink-600 hover:text-sunset-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex gap-3 pt-3">
                <a
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center text-sm font-semibold text-ink-600 border border-ink-700/15 rounded-full py-2.5"
                >
                  Register
                </a>
                <a
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center text-sm font-semibold text-ink-600 border border-ink-700/15 rounded-full py-2.5"
                >
                  Sign in
                </a>
                <a
                  href="#itinerary"
                  className="flex-1 text-center text-sm font-semibold text-white bg-sunset-500 rounded-full py-2.5"
                >
                  Plan a trip
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
