"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  BedDouble,
  Ticket,
  Flame,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { stays } from "@/lib/data";
import {
  saveTripItems,
  readSavedTripItems,
  readSelectedDestination,
  destinationUpdatedEvent,
  tripUpdatedEvent,
} from "@/lib/trip";

const filters = ["All", "Hotel", "Activity"] as const;

const availabilityCopy: Record<
  string,
  { label: string; dot: string; text: string }
> = {
  high: {
    label: "Available",
    dot: "bg-forest-500",
    text: "text-forest-600",
  },
  low: {
    label: "Almost full",
    dot: "bg-sunset-500",
    text: "text-sunset-600",
  },
  soldout: {
    label: "Sold out",
    dot: "bg-ink-400",
    text: "text-ink-400",
  },
};

export default function HotelsActivities() {
  const [filter, setFilter] =
    useState<(typeof filters)[number]>("All");

  const [message, setMessage] = useState("");
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [activeDestination, setActiveDestination] =
    useState<any>(null);

  const [showAllLocations, setShowAllLocations] =
    useState(false);

  useEffect(() => {
    const syncDestination = () => {
      const selected = readSelectedDestination();
      setActiveDestination(selected);
    };

    const syncAdded = () => {
      const selected = readSelectedDestination();
      const saved = readSavedTripItems(selected?.id);

      setAddedIds(
        saved.map((item) => item.id.replace("stay-", ""))
      );
    };

    syncDestination();
    syncAdded();

    window.addEventListener(
      destinationUpdatedEvent,
      syncDestination
    );

    window.addEventListener(
      destinationUpdatedEvent,
      syncAdded
    );

    window.addEventListener(
      tripUpdatedEvent,
      syncAdded
    );

    return () => {
      window.removeEventListener(
        destinationUpdatedEvent,
        syncDestination
      );

      window.removeEventListener(
        destinationUpdatedEvent,
        syncAdded
      );

      window.removeEventListener(
        tripUpdatedEvent,
        syncAdded
      );
    };
  }, []);

  useEffect(() => {
    const saved = readSavedTripItems(
      activeDestination?.id
    );

    setAddedIds(
      saved.map((item) => item.id.replace("stay-", ""))
    );
  }, [activeDestination]);

  const visible = stays.filter((s) => {
    const matchesType =
      filter === "All" || s.type === filter;

    const matchesLocation =
      !activeDestination ||
      showAllLocations ||
      s.location
        .toLowerCase()
        .includes(activeDestination.name.toLowerCase());

    return matchesType && matchesLocation;
  });

  const displayedStays =
    !activeDestination || showAllLocations
      ? visible.slice(0, 6)
      : visible;

  function addToTrip(item: (typeof stays)[number]) {
    const saved = readSavedTripItems(
      activeDestination?.id
    );

    if (
      saved.some(
        (savedItem) => savedItem.title === item.name
      )
    ) {
      setMessage(
        `${item.name} is already in your itinerary.`
      );
      return;
    }

    saveTripItems(
      [
        ...saved,
        {
          id: `stay-${item.id}`,
          day: 2,
          time:
            item.type === "Hotel"
              ? "15:00"
              : "11:00",
          title: item.name,
          place: item.location,
        },
      ],
      activeDestination?.id
    );

    setAddedIds((current) => [
      ...current,
      item.id,
    ]);

    setMessage(
      `${item.name} was added to Day 2 of your itinerary.`
    );

    window.setTimeout(() => {
      document
        .querySelector("#itinerary")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 150);
  }

  return (
    <section
      id="stays"
      className="bg-sand-100/70 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="route-code text-xs font-semibold uppercase tracking-widest text-forest-600">
              Stays & experiences
            </span>

            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink-700 sm:text-4xl">
              Places worth staying. Experiences worth remembering.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-500">
              Handpicked hotels and activities with availability,
              ratings and pricing — ready to add directly to your trip.
            </p>

            {activeDestination && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink-500">
                <span>
                  Showing options for{" "}
                  <strong className="text-forest-600">
                    {activeDestination.name}
                  </strong>
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setShowAllLocations((v) => !v)
                  }
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ocean-600 shadow-sm transition-colors hover:bg-ocean-50"
                >
                  {showAllLocations
                    ? `Only ${activeDestination.name}`
                    : "Show all locations"}
                </button>
              </div>
            )}
          </div>

          {/* Filters */}
          <div
            role="group"
            aria-label="Filter by type"
            className="inline-flex w-fit rounded-full border border-ink-700/5 bg-white p-1 shadow-card"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  filter === f
                    ? "bg-ocean-500 text-white shadow-sm"
                    : "text-ink-500 hover:bg-ocean-50 hover:text-ocean-600"
                }`}
              >
                {f === "All" ? "All" : `${f}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayedStays.map((item, i) => {
            const avail =
              availabilityCopy[item.availability];

            const isAdded = addedIds.includes(item.id);
            const isSoldOut =
              item.availability === "soldout";

            return (
              <motion.article
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-50px",
                }}
                transition={{
                  duration: 0.4,
                  delay: (i % 3) * 0.06,
                }}
                className="group overflow-hidden rounded-[1.75rem] border border-ink-700/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Type */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-ink-600 shadow-sm backdrop-blur">
                    {item.type === "Hotel" ? (
                      <BedDouble className="h-3.5 w-3.5 text-ocean-600" />
                    ) : (
                      <Ticket className="h-3.5 w-3.5 text-ocean-600" />
                    )}
                    {item.type}
                  </span>

                  {/* Availability badge */}
                  {item.availability === "low" && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-sunset-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm">
                      <Flame className="h-3 w-3" />
                      {item.spotsLeft} left
                    </span>
                  )}

                  {isSoldOut && (
                    <span className="absolute right-3 top-3 rounded-full bg-ink-700/80 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                      Sold out
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold leading-snug text-ink-700">
                        {item.name}
                      </h3>

                      <p className="mt-1 truncate text-xs text-ink-400">
                        {item.location}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 rounded-full bg-sunset-50 px-2 py-1">
                      <Star className="h-3.5 w-3.5 fill-sunset-500 text-sunset-500" />

                      <span className="text-xs font-bold text-ink-700">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  {/* Reviews + availability */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-ink-400">
                      {item.reviews.toLocaleString()} reviews
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${avail.dot}`}
                      />
                      <span className={avail.text}>
                        {avail.label}
                      </span>
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t border-ink-700/5" />

                  {/* Bottom */}
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                        {item.type === "Hotel"
                          ? "Per night"
                          : "Per person"}
                      </span>

                      <span className="mt-0.5 block font-display text-xl font-semibold text-ink-700">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isSoldOut || isAdded}
                      onClick={() => addToTrip(item)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                        isAdded
                          ? "bg-forest-50 text-forest-600"
                          : isSoldOut
                            ? "cursor-not-allowed bg-ink-100 text-ink-400"
                            : "bg-ink-700 text-white hover:-translate-y-0.5 hover:bg-ink-800"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Added
                        </>
                      ) : isSoldOut ? (
                        "Notify me"
                      ) : (
                        <>
                          Add to trip
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Empty state */}
        {displayedStays.length === 0 && (
          <div className="mt-10 rounded-3xl bg-white px-6 py-12 text-center shadow-card">
            <p className="font-display text-lg font-semibold text-ink-700">
              No options found
            </p>

            <p className="mt-1 text-sm text-ink-400">
              Try another filter or explore all locations.
            </p>

            <button
              type="button"
              onClick={() => {
                setFilter("All");
                setShowAllLocations(true);
              }}
              className="mt-4 rounded-full bg-ocean-500 px-4 py-2 text-sm font-semibold text-white hover:bg-ocean-600"
            >
              Show all options
            </button>
          </div>
        )}

        {/* Status message */}
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            className="mt-5 rounded-2xl bg-forest-50 px-4 py-3 text-center text-sm font-semibold text-forest-600"
          >
            {message}
          </motion.p>
        )}
      </div>
    </section>
  );
}