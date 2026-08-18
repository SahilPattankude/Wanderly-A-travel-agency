import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || "";
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "";
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "";

if (
  !supabaseUrl ||
  !supabaseSecretKey ||
  !razorpayKeyId ||
  !razorpayKeySecret
) {
  throw new Error(
    "Missing Supabase or Razorpay server environment variables."
  );
}

const supabase = createClient(
  supabaseUrl,
  supabaseSecretKey
);

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        {
          error: "Booking ID is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Get the booking from Supabase.
     *
     * The amount is taken from the database.
     * We never trust an amount sent by the browser.
     */
    const { data: booking, error: bookingError } =
      await supabase
        .from("bookings")
        .select(
          "id, reference, total_amount, status, payment_status"
        )
        .eq("id", bookingId)
        .single();

    if (bookingError || !booking) {
      console.error(
        "Booking lookup error:",
        bookingError
      );

      return NextResponse.json(
        {
          error: "Booking not found.",
        },
        { status: 404 }
      );
    }

    /*
     * Only pending bookings can create
     * a Razorpay order.
     */
    if (booking.status !== "pending") {
      return NextResponse.json(
        {
          error:
            "This booking is not pending payment.",
        },
        { status: 400 }
      );
    }

    /*
     * Don't create another payment order
     * for an already-paid booking.
     */
    if (booking.payment_status !== "pending") {
      return NextResponse.json(
        {
          error:
            "This booking does not have a pending payment.",
        },
        { status: 400 }
      );
    }

    /*
     * Amount comes from Supabase.
     */
    const amount = Number(
      booking.total_amount
    );

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        {
          error: "Invalid booking amount.",
        },
        { status: 400 }
      );
    }

    /*
     * Razorpay expects the amount in paise.
     */
    const amountInPaise = Math.round(
      amount * 100
    );

    const order =
      await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: booking.reference,
      });

    /*
     * Save the Razorpay order ID immediately.
     */
    const { error: updateError } =
      await supabase
        .from("bookings")
        .update({
          payment_provider: "razorpay",
          payment_order_id: order.id,
        })
        .eq("id", booking.id);

    if (updateError) {
      console.error(
        "Failed to save Razorpay order ID:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            "Payment order was created but could not be saved.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId,
      bookingId: booking.id,
    });
  } catch (error) {
    console.error(
      "Razorpay order creation error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create payment order.",
      },
      { status: 500 }
    );
  }
}