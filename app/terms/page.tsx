import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Wanderly",
  description: "The terms that apply to use of Wanderly.",
};

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream-50 px-5 py-16 text-ink-700 sm:px-8">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-card sm:p-12">
        <Link href="/" className="text-sm font-semibold text-ocean-600 hover:text-ocean-700">← Back to Wanderly</Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-sunset-600">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">Terms of Service</h1>
        <p className="mt-3 text-sm text-ink-400">Last updated: August 13, 2026</p>
        <div className="mt-10 space-y-8 leading-7 text-ink-600">
          <section><h2 className="font-display text-2xl font-semibold text-ink-700">Using Wanderly</h2><p className="mt-3">Use Wanderly lawfully and provide accurate information when using its planning and booking features.</p></section>
          <section><h2 className="font-display text-2xl font-semibold text-ink-700">Travel information</h2><p className="mt-3">Travel prices, availability, and third-party information may change. Confirm important details with the relevant provider before booking or travelling.</p></section>
          <section><h2 className="font-display text-2xl font-semibold text-ink-700">Your account</h2><p className="mt-3">You are responsible for keeping your account credentials secure and for activity made through your account.</p></section>
          <section><h2 className="font-display text-2xl font-semibold text-ink-700">Changes to these terms</h2><p className="mt-3">We may update these terms as Wanderly evolves. Continued use after an update means you accept the revised terms.</p></section>
        </div>
      </article>
    </main>
  );
}
