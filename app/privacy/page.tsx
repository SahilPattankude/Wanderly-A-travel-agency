import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Wanderly",
  description: "Learn how Wanderly handles your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream-50 px-5 py-16 text-ink-700 sm:px-8">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-card sm:p-12">
        <Link href="/" className="text-sm font-semibold text-ocean-600 hover:text-ocean-700">← Back to Wanderly</Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-sunset-600">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink-400">Last updated: August 13, 2026</p>
        <div className="mt-10 space-y-8 leading-7 text-ink-600">
          <section><h2 className="font-display text-2xl font-semibold text-ink-700">Information we collect</h2><p className="mt-3">We collect information you provide when creating or using a Wanderly account, such as contact details and trip preferences.</p></section>
          <section><h2 className="font-display text-2xl font-semibold text-ink-700">How we use information</h2><p className="mt-3">We use your information to provide travel-planning features, improve Wanderly, and communicate about your account when needed.</p></section>
          <section><h2 className="font-display text-2xl font-semibold text-ink-700">Your choices</h2><p className="mt-3">You can request access to, correction of, or deletion of your personal information by contacting Wanderly support.</p></section>
          <section><h2 className="font-display text-2xl font-semibold text-ink-700">Contact</h2><p className="mt-3">For privacy questions, contact us through the Wanderly support channels.</p></section>
        </div>
      </article>
    </main>
  );
}
