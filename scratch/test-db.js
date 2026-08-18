const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Manually parse .env file
const envPath = path.join(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("../.env").forEach((line) => {
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

// Ensure local fallback env
if (!process.env.SUPABASE_URL) {
  process.env.SUPABASE_URL = "https://waaathuznykuefogrcld.supabase.co";
}
if (!process.env.SUPABASE_SECRET_KEY) {
  console.error("Error: Missing SUPABASE_SECRET_KEY in environment variables. Please check your .env file.");
  process.exit(1);
}

async function run() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;

  const supabase = createClient(url, serviceKey);

  console.log("Connecting to:", url);

  const { data, error } = await supabase
    .from("bookings")
    .select("id, reference, status, email_status, total_amount, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Database query failed:", error);
  } else {
    console.log("Last 5 Bookings:");
    console.log(data);
  }
}

run();
