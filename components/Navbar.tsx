"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, UserRound, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";

const mobileLinks = [
  //  { href: "/", label: "Home" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/#map", label: "Explore Map" },
  { href: "/#stays", label: "Hotels & Activities" },
  { href: "/#itinerary", label: "Itinerary Builder" },
  { href: "/ai-planner", label: "✨ AI Planner" },
  { href: "/blog", label: "Travel Guides" },
  { href: "/bookings", label: "My bookings" },
  
];

const desktopLinks = [
  //  { href: "/", label: "Home" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/#map", label: "Explore Map" },
  { href: "/#stays", label: "Stays & Activities" },
  { href: "/#itinerary", label: "Itinerary" },
   { href: "/ai-planner", label: "✨ AI Planner" },
  { href: "/blog", label: "Travel Guides" },
  { href: "/bookings", label: "My bookings" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    
    if (supabase) {
      // Fetch initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
        if (event === "SIGNED_OUT") {
          localStorage.removeItem("wanderly-bookings");
          localStorage.removeItem("wanderly-last-search");
          localStorage.removeItem("wanderly-selected-destination");
          localStorage.removeItem("wanderly-just-booked-ref");
          localStorage.removeItem("wanderly-pending-booking");
          Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("wanderly-trip-items-")) {
              localStorage.removeItem(key);
            }
          });
        }
      });

      return () => {
        window.removeEventListener("scroll", onScroll);
        subscription.unsubscribe();
      };
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();

    // Clear local storage keys immediately
    if (typeof window !== "undefined") {
      localStorage.removeItem("wanderly-bookings");
      localStorage.removeItem("wanderly-last-search");
      localStorage.removeItem("wanderly-selected-destination");
      localStorage.removeItem("wanderly-just-booked-ref");
      localStorage.removeItem("wanderly-pending-booking");
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("wanderly-trip-items-")) {
          localStorage.removeItem(key);
        }
      });
    }

    setUser(null);
    window.location.assign("/");
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";
  const truncatedName = displayName.length > 10 ? `${displayName.slice(0, 10)}...` : displayName;

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
        <a href="#top" className="flex items-center gap-2.5 group shrink-0">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-card overflow-hidden border border-ink-700/5">
            <Image
              src="/logo.png"
              alt="Wanderly Logo"
              width={44}
              height={44}
              priority
              className="object-cover"
            />
          </span>
          <span className="font-display text-xl font-semibold text-ink-700">
            Wander<span className="text-ocean-500">ly</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-x-5 xl:gap-x-8">
          {desktopLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <a
                href={link.href}
                className="text-sm font-medium text-ink-500 hover:text-sunset-600 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-x-2 xl:gap-x-3 shrink-0">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className="group flex items-center gap-2 rounded-full border border-ocean-500/15 bg-white/80 py-1 pl-1 pr-3 shadow-sm transition-colors hover:border-ocean-500/40 hover:bg-ocean-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2"
                title={user.email}
              >
                {user?.user_metadata?.avatar_url ? (
                  <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-ocean-100 transition-transform group-hover:scale-105">
                    <img
                      src={user.user_metadata.avatar_url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </span>
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 text-white shadow-sm ring-2 ring-ocean-100 transition-transform group-hover:scale-105">
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
                <span className="max-w-24 truncate text-sm font-semibold text-ink-600">
                  {truncatedName}
                </span>
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    role="menu"
                    className="absolute right-0 top-full z-10 mt-2 w-36 rounded-xl border border-ocean-500/15 bg-white p-1.5 shadow-lift"
                  >
                    <button
                      type="button"
                      onClick={handleSignOut}
                      role="menuitem"
                      className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-sunset-600 transition-colors hover:bg-sunset-300/25 hover:text-sunset-700"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <a
                href="/register"
                className="rounded-full border border-ocean-500/30 bg-white/70 px-4 py-2 text-sm font-semibold text-ocean-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-ocean-500 hover:bg-ocean-50 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2"
              >
                Register
              </a>
              <a
                href="/sign-in"
                className="rounded-full bg-sunset-500 px-4 py-2 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-sunset-600 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 focus-visible:ring-offset-2"
              >
                Sign in
              </a>
            </>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-full p-2 text-ink-700 hover:bg-ink-700/5 shrink-0"
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
              {mobileLinks.map((link) => (
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
              <li className="flex flex-wrap gap-3 pt-3">
                {user ? (
                  <div className="w-full rounded-2xl border border-ocean-500/15 bg-white p-2 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setProfileOpen((value) => !value)}
                      aria-expanded={profileOpen}
                      className="flex w-full items-center gap-3 rounded-xl px-1 py-1 text-left"
                    >
                      {user?.user_metadata?.avatar_url ? (
                        <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-ocean-100">
                          <img
                            src={user.user_metadata.avatar_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </span>
                      ) : (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 text-white shadow-sm ring-2 ring-ocean-100">
                          <UserRound className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink-700">{displayName}</span>
                        <span className="block truncate text-xs text-ink-400">{user.email}</span>
                      </span>
                    </button>
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.button
                          type="button"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.16 }}
                          onClick={() => {
                            setOpen(false);
                            handleSignOut();
                          }}
                          className="mt-1 w-full overflow-hidden rounded-xl bg-sunset-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-sunset-600"
                        >
                          Sign out
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <a
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded-full border border-ocean-500/30 bg-ocean-50 py-2.5 text-center text-sm font-semibold text-ocean-700 transition-colors hover:border-ocean-500 hover:bg-ocean-100"
                    >
                      Register
                    </a>
                    <a
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded-full bg-sunset-500 py-2.5 text-center text-sm font-semibold text-white shadow-card transition-colors hover:bg-sunset-600"
                    >
                      Sign in
                    </a>
                  </>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
