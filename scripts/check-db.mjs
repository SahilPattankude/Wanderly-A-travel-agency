import fs from 'fs';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createClient as createSanityClient } from '@sanity/client';

const bold = (str) => `\x1b[1m${str}\x1b[22m`;
const green = (str) => `\x1b[32m${str}\x1b[39m`;
const red = (str) => `\x1b[31m${str}\x1b[39m`;

// Helper to manually parse .env if it exists
let env = {};
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let val = match[2] || '';
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      env[match[1]] = val.trim();
    }
  });
}

console.log(bold('\nChecking services connection...'));

async function checkSupabase() {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.log(red('❌ Supabase Database: Configuration missing in .env'));
    return;
  }

  try {
    const supabase = createSupabaseClient(url, key);
    const { error } = await supabase.from('destinations').select('id').limit(1);
    if (error) throw error;
    console.log(green('✅ Supabase Database connected successfully!'));
  } catch (err) {
    console.log(red(`❌ Supabase Database connection failed: ${err.message}`));
  }
}

async function checkSanity() {
  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  if (!projectId) {
    console.log(red('❌ Sanity CMS: Configuration missing in .env'));
    return;
  }

  try {
    const sanity = createSanityClient({
      projectId,
      dataset,
      apiVersion: '2026-08-13',
      useCdn: false,
    });
    await sanity.fetch('*[_type == "post"][0]{_id}');
    console.log(green('✅ Sanity CMS connected successfully!'));
  } catch (err) {
    console.log(red(`❌ Sanity CMS connection failed: ${err.message}`));
  }
}

try {
  await Promise.all([checkSupabase(), checkSanity()]);
} catch (err) {
  // Silent catch to ensure dev server still starts
}
console.log('');
