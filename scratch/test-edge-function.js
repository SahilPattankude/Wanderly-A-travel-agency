const fs = require("fs");
const path = require("path");

// Manually parse .env file
const envPath = path.join(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const cleanLine = line.trim();
    if (!cleanLine || cleanLine.startsWith("#")) return;
    const firstEquals = cleanLine.indexOf("=");
    if (firstEquals !== -1) {
      const key = cleanLine.substring(0, firstEquals).trim();
      const val = cleanLine.substring(firstEquals + 1).trim();
      process.env[key] = val;
    }
  });
}

async function testEdgeFunction() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;

  if (!url) {
    console.error("Missing SUPABASE_URL in env");
    return;
  }

  const endpoint = `${url}/functions/v1/send-booking-confirmation`;
  console.log("Testing Edge Function endpoint:", endpoint);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${serviceKey}`
      },
      body: JSON.stringify({
        booking_id: "test-nonexistent-id"
      })
    });

    console.log("Response Status:", response.status);
    const bodyText = await response.text();
    console.log("Response Body:", bodyText);
  } catch (error) {
    console.error("HTTP Request failed:", error);
  }
}

testEdgeFunction();
