import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || "";
const razorpaySecret = process.env.RAZORPAY_KEY_SECRET || "";

if (!supabaseUrl || !supabaseSecretKey || !razorpaySecret) {
  throw new Error(
    "Missing Supabase or Razorpay server environment variables."
  );
}

const supabase = createClient(
  supabaseUrl,
  supabaseSecretKey
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking_id,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !booking_id
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing payment verification details.",
        },
        { status: 400 }
      );
    }

    /*
     * 1. Get the booking from Supabase.
     *
     * We do not trust booking information
     * coming from the browser.
     */
    const { data: booking, error: bookingError } =
      await supabase
        .from("bookings")
        .select(
          "id, reference, status, payment_status, payment_order_id"
        )
        .eq("id", booking_id)
        .single();

    if (bookingError || !booking) {
      console.error(
        "Booking lookup error:",
        bookingError
      );

      return NextResponse.json(
        {
          success: false,
          error: "Booking not found.",
        },
        { status: 404 }
      );
    }

    /*
     * 2. Make sure the Razorpay order belongs
     *    to this booking.
     */
    if (
      booking.payment_order_id !==
      razorpay_order_id
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Payment order does not match this booking.",
        },
        { status: 400 }
      );
    }

    /*
     * 3. If payment was already verified,
     *    don't process it again.
     */
    if (booking.payment_status === "paid") {
      return NextResponse.json({
        success: true,
        message: "Payment was already verified.",
        bookingId: booking.id,
        reference: booking.reference,
      });
    }

    /*
     * 4. Generate Razorpay signature.
     *
     * Razorpay signs:
     *
     * order_id + "|" + payment_id
     */
    const generatedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    /*
     * 5. Compare Razorpay's signature
     *    with our generated signature.
     */
    const signaturesMatch =
      generatedSignature.length ===
        razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(
          generatedSignature,
          "utf8"
        ),
        Buffer.from(
          razorpay_signature,
          "utf8"
        )
      );

    if (!signaturesMatch) {
      console.error(
        "Invalid Razorpay payment signature."
      );

      await supabase
        .from("bookings")
        .update({
          payment_status: "failed",
        })
        .eq("id", booking.id);

      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed.",
        },
        { status: 400 }
      );
    }

    /*
     * 6. Payment is verified.
     *
     * Only now do we mark the booking
     * as confirmed and paid.
     */
    const { error: updateError } =
      await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          payment_status: "paid",
          payment_provider: "razorpay",
          payment_order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          payment_signature:
            razorpay_signature,
          payment_paid_at:
            new Date().toISOString(),
        })
        .eq("id", booking.id);

    if (updateError) {
      console.error(
        "Booking update error:",
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Payment was verified, but the booking could not be updated.",
        },
        { status: 500 }
      );
    }

    /*
     * Payment is now successfully verified
     * and the booking is confirmed.
     */
    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      bookingId: booking.id,
      reference: booking.reference,
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to verify payment.",
      },
      { status: 500 }
    );
  }
}