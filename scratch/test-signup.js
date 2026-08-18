const { createClient } = require("@supabase/supabase-js");
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

// Ensure local fallback env
if (!process.env.SUPABASE_URL) {
  process.env.SUPABASE_URL = "https://waaathuznykuefogrcld.supabase.co";
}
if (!process.env.SUPABASE_SECRET_KEY) {
  // Use anon key for sign up simulation
  process.env.SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

async function testSignUp() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return;
  }

  const supabase = createClient(url, anonKey);
  const testEmail = `test-user-${Date.now()}@example.com`;
  const testPassword = "Password123!";

  console.log("Testing signUp on:", url);
  console.log("Testing email:", testEmail);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: "Test User",
          avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
        }
      }
    });

    if (error) {
      console.error("❌ SignUp Failed with Supabase Error:");
      console.error(error);
    } else {
      console.log("✅ SignUp Succeeded!");
      console.log("User Data:", data.user ? {
        id: data.user.id,
        email: data.user.email,
        identities: data.user.identities,
        role: data.user.role
      } : "No user returned (requires confirmation)");
      console.log("Session:", data.session);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

testSignUp();
