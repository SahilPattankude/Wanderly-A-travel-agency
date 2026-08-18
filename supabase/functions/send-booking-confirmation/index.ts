import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import nodemailer from "npm:nodemailer@6.9.10";

// Define TypeScript interfaces for the webhook payload and database schema
interface TripItem {
  id: string;
  day: number;
  time: string;
  title: string;
  place: string;
}

interface TripSearch {
  from: string;
  to: string;
  dates: string;
  travelers: string;
}

interface BookingRecord {
  id: string;
  user_id: string;
  reference: string;
  search: TripSearch;
  items: TripItem[];
  status: string;
  payment_status: string;
  payment_provider?: string;
  payment_id?: string;
  payment_paid_at?: string;
  email_status: string;
  total_amount: number;
  created_at: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Parse payload and extract booking ID
    const body = await req.json().catch(() => ({}));
    console.log("Received webhook body:", JSON.stringify(body));

    // The webhook payload from Supabase has the structure: { record: { id: "..." }, ... }
    // Or it could be a direct invocation: { booking_id: "..." } or { id: "..." }
    const bookingId = body.record?.id || body.booking_id || body.bookingId || body.id;

    if (!bookingId) {
      console.error("Missing booking ID in payload");
      return new Response(JSON.stringify({ error: "Missing booking ID in payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Initialize Supabase Admin Client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration environment variables");
      return new Response(JSON.stringify({ error: "Supabase configuration is missing on server" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 3. Retrieve the booking securely from database
    const { data: booking, error: fetchBookingError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (fetchBookingError || !booking) {
      console.error(`Failed to fetch booking ${bookingId}:`, fetchBookingError?.message || "Not found");
      return new Response(JSON.stringify({ error: `Booking not found: ${bookingId}` }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const typedBooking = booking as BookingRecord;

    // 3.5 Check booking and payment status before sending
    if (typedBooking.status !== "confirmed" || typedBooking.payment_status !== "paid") {
      console.log(`Skipping email: status is ${typedBooking.status}, payment_status is ${typedBooking.payment_status}`);
      return new Response(JSON.stringify({ success: true, message: "Skipping email: booking not confirmed or paid" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (typedBooking.email_status === "sent") {
      console.log(`Skipping email: email already sent for booking ${bookingId}`);
      return new Response(JSON.stringify({ success: true, message: "Email already sent" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 4. Retrieve the associated user's email securely from Auth
    const { data: userData, error: fetchUserError } = await supabaseAdmin.auth.admin.getUserById(
      typedBooking.user_id
    );

    if (fetchUserError || !userData?.user) {
      console.error(`Failed to fetch user for booking ${bookingId}:`, fetchUserError?.message || "User not found");
      
      // Update email_status to failed in the database
      await supabaseAdmin
        .from("bookings")
        .update({ email_status: "failed" })
        .eq("id", bookingId);

      return new Response(JSON.stringify({ error: "Associated user not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const user = userData.user;
    const recipientEmail = user.email;

    if (!recipientEmail) {
      console.error(`User ${user.id} has no email address`);
      
      await supabaseAdmin
        .from("bookings")
        .update({ email_status: "failed" })
        .eq("id", bookingId);

      return new Response(JSON.stringify({ error: "User has no email address" }), {
        status: 422,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 5. Retrieve SMTP credentials
    const smtpUser = Deno.env.get("GMAIL_SMTP_USER");
    const smtpPassword = Deno.env.get("GMAIL_SMTP_PASSWORD");

    if (!smtpUser || !smtpPassword) {
      console.error("Missing SMTP credentials secrets (GMAIL_SMTP_USER or GMAIL_SMTP_PASSWORD)");
      
      await supabaseAdmin
        .from("bookings")
        .update({ email_status: "failed" })
        .eq("id", bookingId);

      return new Response(JSON.stringify({ error: "SMTP configuration is missing on server" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine customer name from metadata or fall back to email
    const customerName = user.user_metadata?.full_name || user.user_metadata?.name || recipientEmail;

    // Format itinerary list
    const itineraryHtml = typedBooking.items && typedBooking.items.length > 0
      ? typedBooking.items
          .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
          .map((item) => `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; font-weight: 600; color: #0ea5e9; width: 80px; text-align: left;">Day ${item.day}</td>
              <td style="padding: 12px 8px; font-weight: 500; color: #475569; width: 80px; text-align: left;">${item.time}</td>
              <td style="padding: 12px 8px; text-align: left;">
                <span style="font-weight: 600; color: #1e293b; display: block;">${item.title}</span>
                <span style="font-size: 12px; color: #64748b; display: block;">${item.place}</span>
              </td>
            </tr>
          `)
          .join("")
      : `<tr><td colspan="3" style="padding: 16px; text-align: center; color: #64748b;">No scheduled stops in this itinerary.</td></tr>`;

    const itineraryText = typedBooking.items && typedBooking.items.length > 0
      ? typedBooking.items
          .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
          .map((item) => `Day ${item.day} at ${item.time} - ${item.title} (${item.place})`)
          .join("\n")
      : "No scheduled stops in this itinerary.";

    const formattedAmount = `₹${typedBooking.total_amount.toLocaleString("en-IN")}`;
    
    // Format receipt details
    const paymentId = typedBooking.payment_id || "N/A";
    const paymentProvider = typedBooking.payment_provider || "N/A";
    const paymentDate = typedBooking.payment_paid_at 
      ? new Date(typedBooking.payment_paid_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      : "N/A";

    // 6. Generate confirmation HTML & Text emails
    const emailSubject = `Wanderly Booking Confirmation - ${typedBooking.reference}`;
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Wanderly Trip Confirmation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 20px 10px; margin: 0; color: #1e293b;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #f1f5f9;">
    <!-- Header banner -->
    <tr>
      <td style="background-color: #f97316; padding: 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Wanderly</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 6px 0 0 0; font-size: 14px; font-weight: 500;">Your adventure starts here</p>
      </td>
    </tr>
    <!-- Content Body -->
    <tr>
      <td style="padding: 32px;">
        <h2 style="font-size: 20px; font-weight: 600; margin-top: 0; color: #0f172a;">Trip Confirmed!</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
          Hi <strong>${customerName}</strong>,<br><br>
          We are thrilled to confirm your upcoming reservation. Below you'll find your complete booking details and day-by-day itinerary. A copy has been saved to your Wanderly account.
        </p>

        <!-- Summary Box -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 16px; padding: 20px; margin-bottom: 28px; border: 1px solid #e2e8f0;">
          <tr>
            <td style="padding-bottom: 12px; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase;">Booking Details</td>
            <td style="padding-bottom: 12px; text-align: right; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase;">Status</td>
          </tr>
          <tr>
            <td style="font-size: 16px; font-weight: 700; color: #0f172a; padding-bottom: 4px;">${typedBooking.search.to}</td>
            <td style="text-align: right; padding-bottom: 4px;">
              <span style="background-color: #dcfce7; color: #166534; font-size: 12px; font-weight: 700; padding: 4px 8px; border-radius: 9999px; text-transform: uppercase;">${typedBooking.status}</span>
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px; color: #475569;" colspan="2">
              <strong>Dates:</strong> ${typedBooking.search.dates}<br>
              <strong>Route:</strong> ${typedBooking.search.from} &rarr; ${typedBooking.search.to}<br>
              <strong>Travelers:</strong> ${typedBooking.search.travelers}<br>
              <strong>Booking Reference:</strong> <code>${typedBooking.reference}</code><br>
              <strong>Payment Method:</strong> ${paymentProvider.toUpperCase()}<br>
              <strong>Transaction ID:</strong> <code>${paymentId}</code><br>
              <strong>Paid Date:</strong> ${paymentDate}<br>
              <span style="font-size: 11px; color: #94a3b8;"><strong>Booking ID:</strong> ${typedBooking.id}</span>
            </td>
          </tr>
          <tr>
            <td style="border-top: 1px solid #e2e8f0; margin-top: 12px; padding-top: 12px; font-size: 14px; font-weight: 600; color: #0f172a;">Total Price Paid</td>
            <td style="border-top: 1px solid #e2e8f0; margin-top: 12px; padding-top: 12px; text-align: right; font-size: 18px; font-weight: 700; color: #0f172a;">${formattedAmount}</td>
          </tr>
        </table>

        <!-- Itinerary -->
        <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 0; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Your Scheduled Itinerary</h3>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 24px;">
          ${itineraryHtml}
        </table>

        <p style="font-size: 14px; line-height: 1.5; color: #64748b; margin-bottom: 0;">
          Need to make changes to your itinerary? Log in to the Wanderly app, navigate to "My bookings" and customize your stays and activities dynamically.
        </p>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color: #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
        Thank you for booking your journey with Wanderly.<br>
        &copy; 2026 Wanderly. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const textContent = `
WANDERLY BOOKING CONFIRMATION

Thank you for booking with Wanderly, ${customerName}!

Your trip is CONFIRMED.

Trip Summary:
- Destination: ${typedBooking.search.to}
- Route: ${typedBooking.search.from} -> ${typedBooking.search.to}
- Dates: ${typedBooking.search.dates}
- Travelers: ${typedBooking.search.travelers}
- Status: ${typedBooking.status}
- Reference: ${typedBooking.reference}
- Booking UUID: ${typedBooking.id}
- Payment Method: ${paymentProvider.toUpperCase()}
- Transaction ID: ${paymentId}
- Paid Date: ${paymentDate}
- Total Price: ${formattedAmount}

Your Itinerary:
${itineraryText}

Log in to Wanderly at any time to view, edit, or customize your booking details.

Thank you for planning with Wanderly!
`;

    // 7. Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Port 465 is secure (SSL/TLS)
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // 8. Send the email
    console.log(`Attempting to send booking confirmation email to ${recipientEmail}...`);
    
    await transporter.sendMail({
      from: `"Wanderly Bookings" <${smtpUser}>`,
      to: recipientEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`Confirmation email sent successfully to ${recipientEmail}`);

    // 9. Update the bookings table email_status to 'sent'
    const { error: updateSentError } = await supabaseAdmin
      .from("bookings")
      .update({ email_status: "sent" })
      .eq("id", bookingId);

    if (updateSentError) {
      console.error(`Failed to update booking email_status to 'sent':`, updateSentError.message);
    }

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    // 10. Handle errors without throwing back to the user/db trigger
    console.error("Global Edge Function Error:", error.message || error);

    // If we have a booking ID, let's try to update its status to 'failed'
    try {
      const body = await req.json().catch(() => ({}));
      const bookingId = body.record?.id || body.booking_id || body.bookingId || body.id;
      
      if (bookingId) {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
        
        await supabaseAdmin
          .from("bookings")
          .update({ email_status: "failed" })
          .eq("id", bookingId);
      }
    } catch (innerErr) {
      console.error("Failed to mark booking as failed in catch block:", innerErr.message);
    }

    // Always return a 200 response to log errors but NOT throw back to database webhook
    return new Response(JSON.stringify({ success: false, error: error.message || "An unexpected error occurred" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
