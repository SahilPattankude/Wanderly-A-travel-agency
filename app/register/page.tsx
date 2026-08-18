"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";

const DEFAULT_AVATARS = [
  {
    id: "avatar-1",
    name: "Explorer",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "avatar-2",
    name: "Backpacker",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "avatar-3",
    name: "Adventurer",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "avatar-4",
    name: "Traveler",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "avatar-5",
    name: "Nature Lover",
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
];

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATARS[0].url);
  const [customAvatar, setCustomAvatar] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage("Account creation is not configured yet. Add the Supabase public environment variables to enable it.");
      return;
    }
    setIsSubmitting(true);
    setMessage("");

    const finalAvatar = customAvatar.trim() || avatarUrl;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        emailRedirectTo: `${window.location.origin}/sign-in`,
        data: {
          full_name: fullName.trim() || email.split("@")[0],
          avatar_url: finalAvatar,
        }
      },
    });

    setIsSubmitting(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.session) {
      window.location.assign("/");
      return;
    }
    setMessage("Account created. Check your email to confirm your account, then sign in.");
  }

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-cream-50 px-5 py-16">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card sm:p-10">
        <Link href="/" className="text-sm font-semibold text-ocean-600 hover:text-ocean-700">← Back to Wanderly</Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-sunset-600">Start planning</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-700">Create an account</h1>
        <p className="mt-3 text-sm text-ink-500">Already have an account? <Link href="/sign-in" className="font-semibold text-ocean-600 hover:text-ocean-700">Sign in</Link>.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-ink-700">Full Name
            <input type="text" placeholder="e.g. Rahul Sharma" required value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-2 w-full rounded-xl border border-ink-700/15 px-4 py-3 text-ink-700 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20" />
          </label>
          <label className="block text-sm font-semibold text-ink-700">Email address
            <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-ink-700/15 px-4 py-3 text-ink-700 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20" />
          </label>
          <label className="block text-sm font-semibold text-ink-700">Password
            <input type="password" autoComplete="new-password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-ink-700/15 px-4 py-3 text-ink-700 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20" />
          </label>
          <p className="text-xs text-ink-400">Use at least 6 characters.</p>

          {/* Avatar Selector Component */}
          <div className="space-y-3">
            <span className="block text-sm font-semibold text-ink-700">Choose Profile Picture</span>
            <div className="flex justify-between items-center gap-2">
              {DEFAULT_AVATARS.map((avatar) => {
                const isSelected = avatarUrl === avatar.url && !customAvatar;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => {
                      setAvatarUrl(avatar.url);
                      setCustomAvatar("");
                    }}
                    className={`relative h-10 w-10 rounded-full overflow-hidden transition-all duration-200 border-2 ${
                      isSelected ? "border-sunset-500 scale-110 shadow-md ring-2 ring-sunset-500/20" : "border-transparent hover:scale-105"
                    }`}
                  >
                    <Image
                      src={avatar.url}
                      alt={avatar.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
            <label className="block text-xs font-semibold text-ink-500">
              Or paste custom profile image URL
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={customAvatar}
                onChange={(event) => setCustomAvatar(event.target.value)}
                className="mt-1.5 block w-full rounded-xl border border-ink-700/15 bg-white px-3 py-2 text-xs text-ink-700 outline-none transition focus:border-ocean-500"
              />
            </label>
          </div>

          {message && <p role="status" className="text-sm text-ink-600">{message}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-sunset-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sunset-600 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </section>
    </main>
  );
}
