import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Supabase is optional for the demo data shown on the landing page.
// Creating a client with missing values throws during hydration and
// previously made the page unusable in local/preview environments
// without Supabase configured.

export const supabase =
  url && publishableKey
    ? createClient(url, publishableKey)
    : null;