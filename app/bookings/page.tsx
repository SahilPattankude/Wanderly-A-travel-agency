"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  MapPin,
  XCircle,
  Loader2,
  CreditCard,
  Clock3,
} from "lucide-react";
import { readBookings, type Booking } from "@/lib/trip";
import { supabase } from "@/lib/supabase/client";

type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | null;

type BookingWithPayment = Booking & {
  paymentStatus?: PaymentStatus;
  paymentProvider?: string | null;
  paymentOrderId?: string | null;
  paymentId?: string | null;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<
    BookingWithPayment[]
  >([]);

  const [pollingStatus, setPollingStatus] =
    useState<
      "pending" | "sent" | "failed" | null
    >(null);

  useEffect(() => {
    async function loadBookings() {
      // 1. Load local bookings
      const local = readBookings();
      setBookings(local);

      // 2. Load Supabase bookings if signed in
      if (!supabase) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Error loading bookings from Supabase:",
          error.message
        );
        return;
      }

      if (data) {
        const dbBookings: BookingWithPayment[] =
          data.map((b: any) => ({
            id: b.id,
            reference: b.reference,
            createdAt: b.created_at,
            search: b.search,
            items: b.items,
            status: b.status,
            emailStatus: b.email_status,
            totalAmount: b.total_amount,

            paymentStatus:
              b.payment_status ?? null,

            paymentProvider:
              b.payment_provider ?? null,

            paymentOrderId:
              b.payment_order_id ?? null,

            paymentId:
              b.payment_id ?? null,
          }));

        // If signed in, we only display database bookings for this user.
        setBookings(dbBookings);
      }
    }

    loadBookings();
  }, []);

  /*
   * Poll email + payment status for the
   * booking that was just completed.
   */
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !supabase
    ) {
      return;
    }

    const client = supabase;

    const ref =
      window.sessionStorage.getItem(
        "wanderly-just-booked-ref"
      );

    if (!ref) return;

    setPollingStatus("pending");

    let attempts = 0;
    const maxAttempts = 5;

    const intervalId = setInterval(
      async () => {
        attempts++;

        try {
          const { data, error } =
            await client
              .from("bookings")
              .select(
                "email_status, payment_status, status"
              )
              .eq("reference", ref)
              .single();

          if (error) {
            console.error(
              "Error polling booking status:",
              error.message
            );
          }

          if (data) {
            const emailStatus =
              data.email_status;

            if (
              emailStatus === "sent" ||
              emailStatus === "failed"
            ) {
              setPollingStatus(
                emailStatus
              );

              clearInterval(
                intervalId
              );

              window.sessionStorage.removeItem(
                "wanderly-just-booked-ref"
              );

              setBookings((prev) =>
                prev.map((b) =>
                  b.reference === ref
                    ? {
                        ...b,
                        emailStatus:
                          emailStatus,
                        paymentStatus:
                          data.payment_status ??
                          b.paymentStatus,
                        status:
                          data.status ??
                          b.status,
                      }
                    : b
                )
              );

              return;
            }
          }
        } catch (error) {
          console.error(
            "Unexpected booking polling error:",
            error
          );
        }

        if (attempts >= maxAttempts) {
          setPollingStatus("failed");

          clearInterval(intervalId);

          window.sessionStorage.removeItem(
            "wanderly-just-booked-ref"
          );

          setBookings((prev) =>
            prev.map((b) =>
              b.reference === ref &&
              b.emailStatus === "pending"
                ? {
                    ...b,
                    emailStatus: "failed",
                  }
                : b
            )
          );
        }
      },
      2000
    );

    return () =>
      clearInterval(intervalId);
  }, []);

  async function cancelBooking(
    reference: string
  ) {
    const booking = bookings.find(
      (b) =>
        b.reference === reference
    );

    if (!booking) return;

    if (
      booking.paymentStatus ===
      "refunded"
    ) {
      return;
    }

    if (
      !confirm(
        "Are you sure you want to cancel this booking?"
      )
    ) {
      return;
    }

    // Update local storage
    const local = readBookings();

    const updatedLocal = local.map(
      (b) =>
        b.reference === reference
          ? {
              ...b,
              status:
                "cancelled" as const,
            }
          : b
    );

    if (
      typeof window !== "undefined"
    ) {
      window.localStorage.setItem(
        "wanderly-bookings",
        JSON.stringify(
          updatedLocal
        )
      );
    }

    // Update Supabase
    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } =
          await supabase
            .from("bookings")
            .update({
              status: "cancelled",
            })
            .eq(
              "reference",
              reference
            )
            .eq(
              "user_id",
              user.id
            );

        if (error) {
          console.error(
            "Failed to update status in Supabase:",
            error.message
          );
        }
      }
    }

    // Update UI
    setBookings((prev) =>
      prev.map((b) =>
        b.reference === reference
          ? {
              ...b,
              status:
                "cancelled" as const,
            }
          : b
      )
    );
  }

  function renderPaymentStatus(
    booking: BookingWithPayment
  ) {
    if (
      booking.status ===
      "cancelled"
    ) {
      return null;
    }

    if (
      booking.paymentStatus ===
      "paid"
    ) {
      return (
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-forest-600">
          <CreditCard className="h-3.5 w-3.5" />
          Payment successful
        </p>
      );
    }

    if (
      booking.paymentStatus ===
      "pending"
    ) {
      return (
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-sunset-600">
          <Clock3 className="h-3.5 w-3.5" />
          Payment pending
        </p>
      );
    }

    if (
      booking.paymentStatus ===
      "failed"
    ) {
      return (
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600">
          <XCircle className="h-3.5 w-3.5" />
          Payment failed
        </p>
      );
    }

    if (
      booking.paymentStatus ===
      "refunded"
    ) {
      return (
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500">
          <CreditCard className="h-3.5 w-3.5" />
          Payment refunded
        </p>
      );
    }

    return null;
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-cream-50 px-5 py-28 sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-semibold text-ocean-600 hover:text-ocean-700"
        >
          ← Continue planning
        </Link>

        <h1 className="mt-6 font-display text-4xl font-semibold text-ink-700">
          My bookings
        </h1>

        <p className="mt-3 text-ink-500">
          Your Wanderly trips and payment
          details appear here.
        </p>

        {pollingStatus && (
          <div
            className={`mt-6 flex items-center gap-3 rounded-2xl p-4 text-sm font-semibold border ${
              pollingStatus === "sent"
                ? "bg-forest-50 border-forest-400/20 text-forest-650"
                : pollingStatus === "failed"
                ? "bg-red-50 border-red-200 text-red-650"
                : "bg-sunset-50 border-sunset-300/20 text-sunset-600"
            }`}
          >
            {pollingStatus ===
              "sent" && (
              <>
                <CheckCircle2 className="h-5 w-5 text-forest-500 shrink-0" />

                <p>
                  Booking confirmed!
                  A confirmation
                  email has been
                  sent to your
                  registered email.
                </p>
              </>
            )}

            {pollingStatus ===
              "failed" && (
              <>
                <XCircle className="h-5 w-5 text-red-600 shrink-0" />

                <p>
                  Booking confirmed!
                  We couldn't send
                  the confirmation
                  email right now.
                </p>
              </>
            )}

            {pollingStatus ===
              "pending" && (
              <>
                <Loader2 className="h-5 w-5 text-sunset-500 animate-spin shrink-0" />

                <p>
                  Booking confirmed!
                  Preparing your
                  confirmation email...
                </p>
              </>
            )}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-8 text-center shadow-card">
            <p className="font-semibold text-ink-700">
              You have no trips yet.
            </p>

            <Link
              href="/#destinations"
              className="mt-5 inline-flex rounded-full bg-sunset-500 px-5 py-3 text-sm font-semibold text-white"
            >
              Explore destinations
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-5">
            {bookings.map(
              (booking) => (
                <article
                  key={booking.id}
                  className="rounded-3xl bg-white p-6 shadow-card"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      {booking.status ===
                      "cancelled" ? (
                        <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                          <XCircle className="h-4 w-4" />
                          Cancelled
                        </p>
                      ) : booking.status ===
                        "pending" ? (
                        <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-sunset-600">
                          <Clock3 className="h-4 w-4" />
                          Awaiting payment
                        </p>
                      ) : (
                        <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Confirmed
                        </p>
                      )}

                      <h2 className="mt-2 font-display text-2xl font-semibold text-ink-700">
                        {
                          booking.search
                            .to
                        }
                      </h2>

                      <p className="mt-1 text-sm text-ink-500">
                        Reference:{" "}
                        {booking.reference}
                      </p>

                      {booking.totalAmount ? (
                        <p className="mt-1 text-sm font-semibold text-ink-700">
                          Price: ₹
                          {booking.totalAmount.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      ) : null}

                      {renderPaymentStatus(
                        booking
                      )}

                      {booking.paymentId && (
                        <p className="mt-1 text-xs text-ink-400">
                          Payment ID:{" "}
                          {booking.paymentId}
                        </p>
                      )}

                      {booking.emailStatus && (
                        <p className="mt-0.5 text-xs text-ink-400">
                          Email:{" "}
                          <span
                            className={
                              booking.emailStatus ===
                              "sent"
                                ? "text-forest-500 font-semibold"
                                : booking.emailStatus ===
                                  "failed"
                                ? "text-red-650 font-semibold"
                                : "text-sunset-500 font-semibold animate-pulse"
                            }
                          >
                            {
                              booking.emailStatus
                            }
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-ink-400">
                        Created{" "}
                        {new Date(
                          booking.createdAt
                        ).toLocaleDateString()}
                      </p>

                      {booking.status !==
                        "cancelled" &&
                        booking.paymentStatus !==
                          "refunded" && (
                          <button
                            onClick={() =>
                              cancelBooking(
                                booking.reference
                              )
                            }
                            className="mt-3 inline-flex items-center rounded-full bg-red-50 hover:bg-red-100 px-3.5 py-1.5 text-xs font-semibold text-red-650 transition-colors"
                          >
                            Cancel trip
                          </button>
                        )}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 border-y border-ink-700/10 py-4 text-sm text-ink-600 sm:grid-cols-2">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-ocean-500" />
                      {
                        booking.search
                          .from
                      }{" "}
                      →{" "}
                      {
                        booking.search
                          .to
                      }
                    </p>

                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-ocean-500" />
                      {
                        booking.search
                          .dates
                      }{" "}
                      ·{" "}
                      {
                        booking.search
                          .travelers
                      }
                    </p>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {booking.items.map(
                      (item) => (
                        <li
                          key={item.id}
                          className="text-sm text-ink-600"
                        >
                          <span className="font-semibold text-ocean-600">
                            {item.time}
                          </span>{" "}
                          ·{" "}
                          {item.title}{" "}
                          <span className="text-ink-400">
                            —{" "}
                            {item.place}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}