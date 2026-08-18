"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  GripVertical,
  Plus,
  Trash2,
  Share2,
  Link2,
  Facebook,
  Twitter,
} from "lucide-react";

import {
  readSavedTripItems,
  saveTripItems,
  tripUpdatedEvent,
  readTripSearch,
  saveBooking,
  readSelectedDestination,
  destinationUpdatedEvent,
  type TripItem,
} from "@/lib/trip";

import {
  defaultItineraries,
  destinationSuggestions,
  destinations,
  stays,
} from "@/lib/data";

import { supabase } from "@/lib/supabase/client";

type Item = TripItem;

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function ItineraryBuilder() {
  const [activeDestination, setActiveDestination] =
    useState<any>(null);

  const [items, setItems] = useState<Item[]>([]);

  const [shareOpen, setShareOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const [bookingMessage, setBookingMessage] =
    useState("");

  const [isBooking, setIsBooking] =
    useState(false);

  const [customDay, setCustomDay] = useState(1);
  const [customTime, setCustomTime] =
    useState("12:00");

  const [customTitle, setCustomTitle] =
    useState("");

  const [customPlace, setCustomPlace] =
    useState("");

  /*
   * --------------------------------------------------
   * Destination
   * --------------------------------------------------
   */

  useEffect(() => {
    const syncActiveDestination = () => {
      const selected =
        readSelectedDestination();

      setActiveDestination(selected);
    };

    syncActiveDestination();

    window.addEventListener(
      destinationUpdatedEvent,
      syncActiveDestination
    );

    return () => {
      window.removeEventListener(
        destinationUpdatedEvent,
        syncActiveDestination
      );
    };
  }, []);

  /*
   * --------------------------------------------------
   * Load itinerary
   * --------------------------------------------------
   */

  useEffect(() => {
    const destId =
      activeDestination?.id ||
      "santorini";

    const saved =
      readSavedTripItems(destId);

    if (saved.length > 0) {
      setItems(saved);
    } else {
      const template =
        defaultItineraries[destId] ||
        defaultItineraries.santorini;

      saveTripItems(
        template,
        destId
      );

      setItems(template);
    }
  }, [activeDestination]);

  /*
   * --------------------------------------------------
   * Listen for itinerary updates
   * --------------------------------------------------
   */

  useEffect(() => {
    const handleTripUpdate = () => {
      const destId =
        activeDestination?.id ||
        "santorini";

      const saved =
        readSavedTripItems(destId);

      if (saved.length > 0) {
        setItems(saved);
      }
    };

    window.addEventListener(
      tripUpdatedEvent,
      handleTripUpdate
    );

    return () =>
      window.removeEventListener(
        tripUpdatedEvent,
        handleTripUpdate
      );
  }, [activeDestination]);

  /*
   * --------------------------------------------------
   * Add suggestion
   * --------------------------------------------------
   */

  const addSuggestion = (s: any) => {
    const destId =
      activeDestination?.id ||
      "santorini";

    const updated = [
      ...items,
      {
        id: `${s.id}-${Date.now()}`,
        day: 2,
        time: s.time,
        title: s.title,
        place: s.place,
      },
    ];

    setItems(updated);

    saveTripItems(
      updated,
      destId
    );
  };

  /*
   * --------------------------------------------------
   * Remove item
   * --------------------------------------------------
   */

  const removeItem = (id: string) => {
    const destId =
      activeDestination?.id ||
      "santorini";

    const updated =
      items.filter(
        (i) => i.id !== id
      );

    setItems(updated);

    saveTripItems(
      updated,
      destId
    );
  };

  /*
   * --------------------------------------------------
   * Reorder itinerary
   * --------------------------------------------------
   */

  const handleReorder = (
    newOrder: Item[],
    day: number
  ) => {
    const destId =
      activeDestination?.id ||
      "santorini";

    const updated = [
      ...items.filter(
        (i) => i.day !== day
      ),
      ...newOrder,
    ];

    setItems(updated);

    saveTripItems(
      updated,
      destId
    );
  };

  /*
   * --------------------------------------------------
   * Add custom stop
   * --------------------------------------------------
   */

  const addCustomStop = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !customTitle.trim() ||
      !customPlace.trim()
    ) {
      return;
    }

    const destId =
      activeDestination?.id ||
      "santorini";

    const newItem: Item = {
      id: `custom-${Date.now()}`,
      day: Number(customDay),
      time: customTime,
      title: customTitle.trim(),
      place: customPlace.trim(),
    };

    const updated = [
      ...items,
      newItem,
    ];

    setItems(updated);

    saveTripItems(
      updated,
      destId
    );

    setCustomTitle("");
    setCustomPlace("");
  };

  /*
   * --------------------------------------------------
   * Sharing
   * --------------------------------------------------
   */

  async function share(
    option: string
  ) {
    const url =
      window.location.href.split(
        "#"
      )[0] + "#itinerary";

    if (option === "Copy link") {
      try {
        await navigator.clipboard.writeText(
          url
        );

        setShareMessage(
          "Share link copied to your clipboard."
        );
      } catch {
        setShareMessage(
          `Copy this link: ${url}`
        );
      }
    } else {
      const shareUrl =
        option ===
        "Share to Facebook"
          ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`
          : `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "My Wanderly itinerary"
            )}&url=${encodeURIComponent(
              url
            )}`;

      window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer"
      );

      setShareMessage(
        "Your sharing window has opened."
      );
    }

    setShareOpen(false);
  }

  /*
   * --------------------------------------------------
   * Load Razorpay Checkout
   * --------------------------------------------------
   */

  async function loadRazorpay() {
    if (window.Razorpay) {
      return;
    }

    await new Promise<void>(
      (resolve, reject) => {
        const existingScript =
          document.querySelector(
            'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
          );

        if (existingScript) {
          existingScript.addEventListener(
            "load",
            () => resolve()
          );

          existingScript.addEventListener(
            "error",
            () =>
              reject(
                new Error(
                  "Could not load Razorpay Checkout."
                )
              )
          );

          return;
        }

        const script =
          document.createElement(
            "script"
          );

        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        script.async = true;

        script.onload = () =>
          resolve();

        script.onerror = () =>
          reject(
            new Error(
              "Could not load Razorpay Checkout."
            )
          );

        document.body.appendChild(
          script
        );
      }
    );

    if (!window.Razorpay) {
      throw new Error(
        "Razorpay Checkout is unavailable."
      );
    }
  }

  /*
   * --------------------------------------------------
   * Mark payment failed
   * --------------------------------------------------
   */

  async function markPaymentFailed(
    bookingId: string
  ) {
    if (!supabase) return;

    const {
      error,
    } = await supabase
      .from("bookings")
      .update({
        payment_status: "failed",
      })
      .eq("id", bookingId);

    if (error) {
      console.error(
        "Could not update failed payment:",
        error.message
      );
    }
  }

  /*
   * --------------------------------------------------
   * BOOKING + PAYMENT
   * --------------------------------------------------
   */

  async function confirmBooking() {
    if (isBooking) return;

    if (!items.length) {
      setBookingMessage(
        "Add at least one hotel or activity before confirming your trip."
      );

      return;
    }

    const destId =
      activeDestination?.id ||
      "santorini";

    const lastSearch =
      readTripSearch();

    const search = {
      from:
        lastSearch?.from ||
        "Mumbai (BOM)",

      to: activeDestination
        ? `${activeDestination.name} (${activeDestination.code})`
        : lastSearch?.to ||
          "Santorini (JTR)",

      dates:
        lastSearch?.dates ||
        "Dates to be confirmed",

      travelers:
        lastSearch?.travelers ||
        "2 adults",
    };

    /*
     * ----------------------------------------------
     * Calculate booking amount
     * ----------------------------------------------
     */

    const destPrice =
      destinations.find(
        (d) =>
          d.id === destId
      )?.priceFrom ||
      30000;

    let itemsPrice = 0;

    items.forEach((item) => {
      const matchedStay =
        stays.find(
          (s) =>
            s.name.toLowerCase() ===
            item.title.toLowerCase()
        );

      if (matchedStay) {
        itemsPrice +=
          matchedStay.price;
      }
    });

    const travelersMatch =
      search.travelers.match(
        /(\d+)/
      );

    const numTravelers =
      travelersMatch
        ? parseInt(
            travelersMatch[1],
            10
          )
        : 1;

    // Scaled down by 100 for Razorpay test mode (e.g. ₹30,000 becomes ₹300)
    const totalAmount = Math.round(
      ((destPrice + itemsPrice) * numTravelers) / 100
    );

    const reference =
      `WND-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;

    setIsBooking(true);

    setBookingMessage(
      "Preparing your booking..."
    );

    try {
      /*
       * ----------------------------------------------
       * Supabase must be configured
       * ----------------------------------------------
       */

      if (!supabase) {
        throw new Error(
          "Payment is unavailable because Supabase is not configured."
        );
      }

      /*
       * ----------------------------------------------
       * Get authenticated user
       * ----------------------------------------------
       */

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        window.localStorage.setItem(
          "wanderly-pending-booking",
          JSON.stringify({
            reference,
            search,
            items,
            totalAmount,
          })
        );

        setBookingMessage(
          "Please sign in before booking your trip."
        );

        setIsBooking(false);

        window.location.assign(
          "/sign-in?next=/"
        );

        return;
      }

      /*
       * ----------------------------------------------
       * 1. Create PENDING booking
       * ----------------------------------------------
       *
       * IMPORTANT:
       *
       * We do NOT create a confirmed booking here.
       * The booking becomes confirmed only after
       * server-side payment verification.
       */

      setBookingMessage(
        "Creating your booking..."
      );

      const {
        data: createdBooking,
        error: bookingError,
      } =
        await supabase
          .from("bookings")
          .insert({
            user_id: user.id,
            reference,
            search,
            items,
            status: "pending",
            total_amount:
              totalAmount,
            email_status:
              "pending",
            payment_status:
              "pending",
          })
          .select(
            "id, reference"
          )
          .single();

      if (
        bookingError ||
        !createdBooking
      ) {
        throw new Error(
          bookingError?.message ||
            "Could not create your booking."
        );
      }

      /*
       * ----------------------------------------------
       * 2. Create Razorpay order
       * ----------------------------------------------
       *
       * Only bookingId is sent to the server.
       *
       * The server must calculate/read the amount
       * from the database.
       */

      setBookingMessage(
        "Creating secure payment..."
      );

      const orderResponse =
        await fetch(
          "/api/payment/create-order",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              bookingId:
                createdBooking.id,
            }),
          }
        );

      let orderData: any = {};

      try {
        orderData =
          await orderResponse.json();
      } catch {
        throw new Error(
          "Invalid response from payment server."
        );
      }

      if (
        !orderResponse.ok
      ) {
        throw new Error(
          orderData.error ||
            "Could not create the payment order."
        );
      }

      if (
        !orderData.orderId ||
        !orderData.keyId ||
        !orderData.amount
      ) {
        throw new Error(
          "Payment server returned incomplete order information."
        );
      }

      /*
       * ----------------------------------------------
       * 3. Save Razorpay order ID
       * ----------------------------------------------
       */

      const {
        error:
          orderUpdateError,
      } = await supabase
        .from("bookings")
        .update({
          payment_provider:
            "razorpay",

          payment_order_id:
            orderData.orderId,
        })
        .eq(
          "id",
          createdBooking.id
        )
        .eq(
          "user_id",
          user.id
        );

      if (orderUpdateError) {
        throw new Error(
          "Could not save payment information."
        );
      }

      /*
       * ----------------------------------------------
       * 4. Load Razorpay
       * ----------------------------------------------
       */

      setBookingMessage(
        "Opening secure payment..."
      );

      await loadRazorpay();

      /*
       * ----------------------------------------------
       * 5. Razorpay Checkout
       * ----------------------------------------------
       */

      const options = {
        key: orderData.keyId,

        amount:
          orderData.amount,

        currency:
          orderData.currency ||
          "INR",

        name: "Wanderly",

        description:
          `Trip booking ${createdBooking.reference}`,

        order_id:
          orderData.orderId,

        prefill: {
          name:
            user.user_metadata
              ?.full_name ||
            user.user_metadata
              ?.name ||
            "",

          email:
            user.email || "",
        },

        notes: {
          booking_reference:
            createdBooking.reference,
        },

        theme: {
          color:
            "#0ea5e9",
        },

        /*
         * ------------------------------------------
         * Payment successful on Razorpay
         * ------------------------------------------
         */

        handler:
          async function (
            response: any
          ) {
            try {
              setBookingMessage(
                "Payment received. Verifying..."
              );

              /*
               * ------------------------------------
               * 6. SERVER-SIDE VERIFICATION
               * ------------------------------------
               */

              const verifyResponse =
                await fetch(
                  "/api/payment/verify",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify({
                      razorpay_order_id:
                        response.razorpay_order_id,

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_signature:
                        response.razorpay_signature,

                      booking_id:
                        createdBooking.id,
                    }),
                  }
                );

              let verifyData: any =
                {};

              try {
                verifyData =
                  await verifyResponse.json();
              } catch {
                throw new Error(
                  "Invalid payment verification response."
                );
              }

              if (
                !verifyResponse.ok ||
                !verifyData.success
              ) {
                throw new Error(
                  verifyData.error ||
                    "Payment verification failed."
                );
              }

              /*
               * ------------------------------------
               * 7. Save local confirmed booking
               * ------------------------------------
               */

              saveBooking({
                id:
                  createdBooking.id,

                reference:
                  createdBooking.reference,

                createdAt:
                  new Date().toISOString(),

                search,

                items,

                status:
                  "confirmed",

                totalAmount:
                  totalAmount,

                emailStatus:
                  "pending",

                paymentStatus:
                  "paid",

                paymentProvider:
                  "razorpay",

                paymentOrderId:
                  response.razorpay_order_id,

                paymentId:
                  response.razorpay_payment_id,

                paymentPaidAt:
                  new Date().toISOString(),
              });

              /*
               * ------------------------------------
               * Clear itinerary after successful
               * payment.
               * ------------------------------------
               */

              saveTripItems(
                [],
                destId
              );

              /*
               * ------------------------------------
               * Tell bookings page which booking
               * was just completed.
               * ------------------------------------
               */

              window.sessionStorage.setItem(
                "wanderly-just-booked-ref",
                createdBooking.reference
              );

              setBookingMessage(
                "Payment successful! Your trip has been confirmed."
              );

              setIsBooking(false);

              /*
               * ------------------------------------
               * Redirect to My Bookings
               * ------------------------------------
               */

              window.location.assign(
                "/bookings"
              );
            } catch (error) {
              console.error(
                "Payment verification error:",
                error
              );

              /*
               * If verification fails, do NOT mark
               * the booking as confirmed locally.
               */

              setBookingMessage(
                error instanceof Error
                  ? error.message
                  : "Payment verification failed."
              );

              setIsBooking(false);
            }
          },

        /*
         * ------------------------------------------
         * Razorpay modal dismissed
         * ------------------------------------------
         */

        modal: {
          ondismiss:
            function () {
              setBookingMessage(
                "Payment was cancelled. Your booking remains pending."
              );

              setIsBooking(false);
            },
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      /*
       * ----------------------------------------------
       * Payment failed
       * ----------------------------------------------
       */

      razorpay.on(
        "payment.failed",
        async function (
          response: any
        ) {
          console.error(
            "Razorpay payment failed:",
            response
          );

          await markPaymentFailed(
            createdBooking.id
          );

          setBookingMessage(
            response?.error
              ?.description ||
              "Payment failed. Please try again."
          );

          setIsBooking(false);
        }
      );

      /*
       * ----------------------------------------------
       * Open checkout
       * ----------------------------------------------
       */

      razorpay.open();
    } catch (error) {
      console.error(
        "Booking/payment error:",
        error
      );

      setBookingMessage(
        error instanceof Error
          ? error.message
          : "We couldn't start the payment."
      );

      setIsBooking(false);
    }
  }

  /*
   * --------------------------------------------------
   * UI calculations
   * --------------------------------------------------
   */

  const days = Array.from(
    new Set(
      items.map(
        (i) => i.day
      )
    )
  ).sort();

  const destName =
    activeDestination?.name ||
    "Santorini";

  const suggestions =
    activeDestination
      ? destinationSuggestions[
          activeDestination.id
        ] || []
      : destinationSuggestions.santorini;

  const maxDay =
    items.length > 0
      ? Math.max(
          ...items.map(
            (i) => i.day
          )
        )
      : 3;

  const dayOptions =
    Array.from(
      {
        length:
          Math.max(
            maxDay,
            3
          ),
      },
      (_, i) => i + 1
    );

  /*
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */

  return (
    <section
      id="itinerary"
      className="py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest route-code text-ocean-600">
            Your trip, your order
          </span>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink-700">
            Build a personalized itinerary
            in minutes
          </h2>

          <p className="mt-4 text-ink-500">
            Reorder stops to match how you
            actually want to move through a
            day, add suggestions with one tap,
            then share the plan with anyone
            joining you.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          <div className="rounded-4xl bg-white shadow-card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-ink-700">
                {destName} ·{" "}
                {days.length || 3} days
              </h3>

              <div className="relative">
                <button
                  onClick={() =>
                    setShareOpen(
                      (v) => !v
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-ink-700/10 hover:border-ocean-400 px-4 py-2 text-sm font-semibold text-ink-600 transition-colors"
                  aria-expanded={
                    shareOpen
                  }
                  aria-haspopup="true"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>

                <AnimatePresence>
                  {shareOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.18,
                      }}
                      className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-lift border border-ink-700/5 p-2 z-20"
                    >
                      {[
                        {
                          icon: Link2,
                          label: "Copy link",
                        },
                        {
                          icon: Facebook,
                          label:
                            "Share to Facebook",
                        },
                        {
                          icon: Twitter,
                          label:
                            "Share to X",
                        },
                      ].map(
                        (opt) => (
                          <button
                            key={
                              opt.label
                            }
                            onClick={() =>
                              share(
                                opt.label
                              )
                            }
                            className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink-600 hover:bg-sand-100 transition-colors"
                          >
                            <opt.icon className="h-4 w-4 text-ocean-500" />
                            {
                              opt.label
                            }
                          </button>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {days.length === 0 ? (
              <p className="text-sm text-ink-400 py-6 text-center">
                Add stays or activities
                to start your timeline.
              </p>
            ) : (
              days.map((day) => (
                <div
                  key={day}
                  className="mb-6 last:mb-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="route-code text-xs font-bold text-white bg-ocean-500 rounded-full h-7 w-7 flex items-center justify-center">
                      {day}
                    </span>

                    <span className="text-sm font-semibold text-ink-500">
                      Day {day}
                    </span>
                  </div>

                  <Reorder.Group
                    axis="y"
                    values={items.filter(
                      (i) =>
                        i.day === day
                    )}
                    onReorder={(
                      newOrder
                    ) =>
                      handleReorder(
                        newOrder,
                        day
                      )
                    }
                    className="space-y-2 ml-3.5 pl-6 border-l-2 border-dashed border-ink-700/10"
                  >
                    {items
                      .filter(
                        (i) =>
                          i.day === day
                      )
                      .map(
                        (item) => (
                          <Reorder.Item
                            key={
                              item.id
                            }
                            value={item}
                            className="group flex items-center gap-3 rounded-2xl bg-sand-50 hover:bg-sand-100 border border-ink-700/5 px-4 py-3 cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical
                              className="h-4 w-4 text-ink-300 shrink-0"
                              aria-hidden="true"
                            />

                            <span className="route-code text-xs font-semibold text-ocean-600 shrink-0 w-12">
                              {
                                item.time
                              }
                            </span>

                            <span className="flex-1 min-w-0">
                              <span className="block text-sm font-semibold text-ink-700 truncate">
                                {
                                  item.title
                                }
                              </span>

                              <span className="block text-xs text-ink-400 truncate">
                                {
                                  item.place
                                }
                              </span>
                            </span>

                            <button
                              onClick={() =>
                                removeItem(
                                  item.id
                                )
                              }
                              aria-label={`Remove ${item.title} from itinerary`}
                              className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity text-ink-300 hover:text-sunset-600 shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </Reorder.Item>
                        )
                      )}
                  </Reorder.Group>
                </div>
              ))
            )}

            <p className="text-xs text-ink-400 mt-4">
              Drag any stop by its handle to
              reorder your day.
            </p>

            <form
              onSubmit={
                addCustomStop
              }
              className="mt-8 border-t border-ink-700/10 pt-6"
            >
              <h4 className="text-sm font-semibold text-ink-700 mb-3">
                Add a custom stop
              </h4>

              <div className="grid gap-3 sm:grid-cols-[1fr_1fr_2.5fr_2.5fr_auto] items-end">
                <label className="block text-xs font-semibold text-ink-500">
                  Day

                  <select
                    value={
                      customDay
                    }
                    onChange={(e) =>
                      setCustomDay(
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    className="mt-1 block w-full rounded-xl border border-ink-700/15 bg-white px-2 py-2 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  >
                    {dayOptions.map(
                      (d) => (
                        <option
                          key={d}
                          value={d}
                        >
                          Day {d}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label className="block text-xs font-semibold text-ink-500">
                  Time

                  <input
                    type="text"
                    value={
                      customTime
                    }
                    onChange={(e) =>
                      setCustomTime(
                        e.target
                          .value
                      )
                    }
                    placeholder="12:00"
                    className="mt-1 block w-full rounded-xl border border-ink-700/15 bg-white px-2.5 py-2 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  />
                </label>

                <label className="block text-xs font-semibold text-ink-500">
                  Activity Title

                  <input
                    type="text"
                    required
                    value={
                      customTitle
                    }
                    onChange={(e) =>
                      setCustomTitle(
                        e.target
                          .value
                      )
                    }
                    placeholder="e.g. Dinner"
                    className="mt-1 block w-full rounded-xl border border-ink-700/15 bg-white px-3 py-2 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  />
                </label>

                <label className="block text-xs font-semibold text-ink-500">
                  Location

                  <input
                    type="text"
                    required
                    value={
                      customPlace
                    }
                    onChange={(e) =>
                      setCustomPlace(
                        e.target
                          .value
                      )
                    }
                    placeholder="e.g. Restaurant name"
                    className="mt-1 block w-full rounded-xl border border-ink-700/15 bg-white px-3 py-2 text-sm text-ink-700 outline-none focus:border-ocean-500"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-ocean-500 hover:bg-ocean-600 text-white text-xs font-semibold px-4 py-2.5 transition-colors h-[38px] flex items-center justify-center gap-1 mt-1 sm:mt-0"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
            </form>

            {shareMessage && (
              <p
                role="status"
                className="mt-3 text-sm font-medium text-forest-600"
              >
                {shareMessage}
              </p>
            )}

            <div className="mt-6 border-t border-ink-700/10 pt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-sm text-ink-500">
                Payment is required to confirm
                your itinerary.
              </p>

              <button
                type="button"
                onClick={
                  confirmBooking
                }
                disabled={
                  isBooking
                }
                className="rounded-full bg-sunset-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sunset-600 disabled:opacity-60"
              >
                {isBooking
                  ? "Processing…"
                  : "Pay & Confirm Trip"}
              </button>
            </div>

            {bookingMessage && (
              <p
                role="status"
                className="mt-3 text-sm font-medium text-forest-600"
              >
                {bookingMessage}
              </p>
            )}
          </div>

          <div className="rounded-4xl bg-ocean-50 border border-ocean-100 p-6">
            <h3 className="font-display text-lg font-semibold text-ink-700">
              Suggested for your trip
            </h3>

            <p className="text-sm text-ink-500 mt-1">
              Based on your{" "}
              {destName} itinerary and
              travel dates.
            </p>

            {suggestions.length === 0 ? (
              <p className="text-sm text-ink-400 mt-5">
                No suggestions available
                for this destination.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {suggestions.map(
                  (s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card"
                    >
                      <span className="route-code text-xs font-semibold text-teal-600 shrink-0 w-12">
                        {
                          s.time
                        }
                      </span>

                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-ink-700 truncate">
                          {
                            s.title
                          }
                        </span>

                        <span className="block text-xs text-ink-400 truncate">
                          {
                            s.place
                          }
                        </span>
                      </span>

                      <button
                        onClick={() =>
                          addSuggestion(
                            s
                          )
                        }
                        aria-label={`Add ${s.title} to itinerary`}
                        className="shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-ocean-500 hover:bg-ocean-600 text-white transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}

            <a
              href="#stays"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sunset-500 hover:bg-sunset-600 text-white text-sm font-semibold px-5 py-3 transition-colors"
            >
              Browse more activities
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}