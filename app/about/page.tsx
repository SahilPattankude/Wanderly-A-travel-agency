import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Wanderly",
  description:
    "Learn about Wanderly's mission, values, and how we are building a calm, uncluttered space for travel planning.",
  alternates: {
    canonical: "https://wanderly-a-travel-agency.vercel.app/about",
  },
};

export default function AboutUsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50">
      {/* Back to Wanderly */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <a
          href="/"
          className="inline-flex items-center text-base font-medium text-blue-700 transition-colors hover:text-orange-600"
        >
          ← Back to Wanderly
        </a>
      </div>

      {/* Header */}
      <section className="px-6 pb-10 pt-12">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-orange-600">
            About Us
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Our Journey
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Calm, considered travel planning.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Wanderly was created to give travelers a calm, uncluttered place to
            discover destinations, customize itineraries, and book stays and
            activities securely. We believe planning a trip should be just as
            enjoyable as going on one.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="px-6 pb-20">
        <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <AboutSection title="1. Our Mission">
            <p>
              Traditional travel platforms are often crowded, stressful, and
              filled with dark UX patterns trying to force upsells. Our mission
              is to strip away the noise. We build tools that make planning
              simple, collaborative, and beautiful.
            </p>
          </AboutSection>

          <AboutSection title="2. Custom Itineraries">
            <p>
              With our interactive maps and timeline builder, you are in full
              control. You can add hotels, schedule activities day-by-day,
              reorder stops, and visualize your entire route. There are no
              surprise packages—everything is tailored directly to your
              preferences.
            </p>
          </AboutSection>

          <AboutSection title="3. Trust & Security">
            <p>
              We prioritize your privacy and data security. All user bookings
              are stored securely using Supabase databases, and payment
              transactions are processed and verified using secure industry
              standards via Razorpay. We do not sell your personal data or
              travel preferences to third-party advertisers.
            </p>
          </AboutSection>

          <AboutSection title="4. Contact Us">
            <p>
              Whether you have questions about a booking, want to partner with
              us, or have feedback about the app, we would love to hear from
              you.
            </p>

            <div className="mt-5 rounded-2xl bg-gray-50 p-5">
              <p className="font-semibold text-gray-900">Wanderly HQ</p>

              <p className="mt-2 text-gray-600">
                Email:{" "}
                <a
                  href="mailto:hello@wanderly.example"
                  className="font-medium text-blue-700 hover:text-orange-600"
                >
                  hello@wanderly.example
                </a>
              </p>
            </div>
          </AboutSection>
        </article>
      </section>
    </main>
  );
}

function AboutSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-gray-200 py-8 first:pt-0 last:border-b-0">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <div className="mt-4 space-y-4 text-base leading-7 text-gray-600">
        {children}
      </div>
    </section>
  );
}
