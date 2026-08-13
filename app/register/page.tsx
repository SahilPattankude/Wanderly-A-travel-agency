"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/sign-in` },
    });

    setIsSubmitting(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(data.session ? "Account created. You are now signed in." : "Account created. Check your email to confirm your account, then sign in.");
  }

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-cream-50 px-5 py-16">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card sm:p-10">
        <Link href="/" className="text-sm font-semibold text-ocean-600 hover:text-ocean-700">← Back to Wanderly</Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-sunset-600">Start planning</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-700">Create an account</h1>
        <p className="mt-3 text-sm text-ink-500">Already have an account? <Link href="/sign-in" className="font-semibold text-ocean-600 hover:text-ocean-700">Sign in</Link>.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-ink-700">Email address
            <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-ink-700/15 px-4 py-3 text-ink-700 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20" />
          </label>
          <label className="block text-sm font-semibold text-ink-700">Password
            <input type="password" autoComplete="new-password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-ink-700/15 px-4 py-3 text-ink-700 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20" />
          </label>
          <p className="text-xs text-ink-400">Use at least 6 characters.</p>
          {message && <p role="status" className="text-sm text-ink-600">{message}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-sunset-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sunset-600 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </section>
    </main>
  );
}
