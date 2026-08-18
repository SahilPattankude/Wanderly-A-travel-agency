import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Wanderly",
  description:
    "Read the terms and conditions that apply to your use of Wanderly's travel planning, booking, and AI-powered services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-cream-50 px-5 py-16 text-ink-700 sm:px-8"
    >
      <article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-card sm:p-12">
        {/* Back */}
        <Link
          href="/"
          className="text-sm font-semibold text-ocean-600 hover:text-ocean-700"
        >
          ← Back to Wanderly
        </Link>

        {/* Header */}
        <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-sunset-600">
          Legal
        </p>

        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Terms of Service
        </h1>

        <p className="mt-3 text-sm text-ink-400">
          Last updated: August 18, 2026
        </p>

        <p className="mt-6 text-lg leading-8 text-ink-600">
          These Terms of Service explain the rules and conditions that
          apply when you use Wanderly's website, travel planning tools,
          booking features, and AI-powered services.
        </p>

        {/* Content */}
        <div className="mt-10 space-y-10 leading-7 text-ink-600">
          {/* 1 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              1. Using Wanderly
            </h2>

            <p className="mt-3">
              You may use Wanderly for lawful personal and travel
              planning purposes. By using the website, you agree to
              follow these Terms of Service and any applicable laws and
              regulations.
            </p>

            <p className="mt-3">
              You agree not to misuse Wanderly, interfere with its
              operation, attempt to gain unauthorized access, or use the
              service for fraudulent or unlawful purposes.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              2. Accounts
            </h2>

            <p className="mt-3">
              Some Wanderly features may require you to create an
              account. You are responsible for providing accurate
              information and keeping your account credentials secure.
            </p>

            <p className="mt-3">
              You are responsible for activity that occurs through your
              account. If you believe your account has been accessed
              without authorization, you should contact us promptly.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              3. Travel Planning and Recommendations
            </h2>

            <p className="mt-3">
              Wanderly provides travel planning information,
              recommendations, itineraries, destination information,
              and other travel-related content for informational and
              planning purposes.
            </p>

            <p className="mt-3">
              Travel information may change without notice. Prices,
              availability, schedules, opening hours, transportation
              information, weather conditions, and other travel details
              may not always be current or accurate.
            </p>

            <p className="mt-3">
              You should independently verify important travel
              information with the relevant provider before making
              decisions or travelling.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              4. AI Trip Planner
            </h2>

            <p className="mt-3">
              Wanderly may provide AI-powered travel planning features
              that generate itineraries and recommendations based on
              information you provide.
            </p>

            <p className="mt-3">
              AI-generated content is provided for informational and
              planning purposes. AI responses may contain errors,
              omissions, outdated information, or recommendations that
              may not be suitable for your individual circumstances.
            </p>

            <p className="mt-3">
              You should verify important information such as prices,
              opening hours, transportation schedules, visa requirements,
              entry requirements, safety information, and availability
              before relying on it.
            </p>

            <p className="mt-3">
              Do not rely on AI-generated information as professional
              legal, medical, financial, immigration, or safety advice.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              5. Bookings
            </h2>

            <p className="mt-3">
              Wanderly may provide booking functionality for travel
              services. A booking may be subject to additional terms,
              cancellation policies, fees, and conditions imposed by the
              relevant travel provider.
            </p>

            <p className="mt-3">
              When booking a third-party travel service, you should
              review the provider's terms, cancellation policy, refund
              policy, and other conditions before completing the booking.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              6. Payments
            </h2>

            <p className="mt-3">
              Payments made through Wanderly may be processed by
              third-party payment service providers.
            </p>

            <p className="mt-3">
              Payment processing may be subject to the terms and
              policies of the applicable payment provider.
            </p>

            <p className="mt-3">
              Wanderly may receive transaction information necessary to
              confirm and manage your booking, such as payment status
              and transaction references.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              7. Third-Party Services and Links
            </h2>

            <p className="mt-3">
              Wanderly may contain links to or integrations with
              third-party websites and services.
            </p>

            <p className="mt-3">
              Third-party services may have their own terms, privacy
              policies, prices, availability, and conditions. Wanderly
              is not responsible for the content, policies, availability,
              or performance of third-party services that are outside
              our control.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              8. User Content and Information
            </h2>

            <p className="mt-3">
              When you submit information to Wanderly, including travel
              preferences, itinerary details, or other content, you are
              responsible for ensuring that the information is accurate
              and that you have the right to provide it.
            </p>

            <p className="mt-3">
              You should not submit confidential or sensitive information
              that is unnecessary for using the service.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              9. Intellectual Property
            </h2>

            <p className="mt-3">
              The Wanderly website, branding, logos, design, software,
              original content, and other materials provided by
              Wanderly are protected by applicable intellectual property
              laws.
            </p>

            <p className="mt-3">
              You may use Wanderly for its intended personal purposes,
              but you may not copy, reproduce, modify, distribute, sell,
              or commercially exploit Wanderly's proprietary materials
              without appropriate permission.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              10. Prohibited Activities
            </h2>

            <p className="mt-3">
              You must not use Wanderly to:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Break applicable laws or regulations</li>
              <li>Commit fraud or impersonate another person</li>
              <li>Attempt unauthorized access to our systems</li>
              <li>Disrupt or interfere with the website</li>
              <li>Introduce malicious software or harmful code</li>
              <li>Abuse booking or payment functionality</li>
              <li>
                Scrape or systematically copy substantial portions of
                the website without permission
              </li>
            </ul>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              11. Availability of the Service
            </h2>

            <p className="mt-3">
              We aim to keep Wanderly available and reliable, but we do
              not guarantee that the website or any feature will always
              be available, uninterrupted, secure, or error-free.
            </p>

            <p className="mt-3">
              We may temporarily suspend, modify, or discontinue
              features for maintenance, security, technical reasons, or
              other operational purposes.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              12. Disclaimers
            </h2>

            <p className="mt-3">
              Wanderly provides travel information and planning tools on
              an "as is" and "as available" basis to the extent permitted
              by applicable law.
            </p>

            <p className="mt-3">
              We do not guarantee that travel recommendations,
              itineraries, prices, availability, schedules, or other
              information will always be accurate, complete, current, or
              suitable for your specific circumstances.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              13. Limitation of Liability
            </h2>

            <p className="mt-3">
              To the maximum extent permitted by applicable law,
              Wanderly and its operators will not be responsible for
              indirect, incidental, consequential, special, or
              unforeseeable losses arising from your use of the website
              or reliance on travel information provided through the
              service.
            </p>

            <p className="mt-3">
              Nothing in these Terms is intended to exclude or limit
              liability where such exclusion or limitation is prohibited
              by applicable law.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              14. Privacy
            </h2>

            <p className="mt-3">
              Your use of Wanderly is also subject to our Privacy Policy,
              which explains how we collect, use, store, and protect
              personal information.
            </p>

            <p className="mt-3">
              <Link
                href="/privacy"
                className="font-semibold text-ocean-600 hover:text-ocean-700"
              >
                View Wanderly's Privacy Policy →
              </Link>
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              15. Changes to These Terms
            </h2>

            <p className="mt-3">
              We may update these Terms from time to time as Wanderly
              evolves, our services change, or legal requirements change.
            </p>

            <p className="mt-3">
              When we make material changes, we may update the "Last
              updated" date displayed at the beginning of this page.
              Your continued use of Wanderly after an update means that
              you agree to the revised Terms to the extent permitted by
              applicable law.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-700">
              16. Contact Us
            </h2>

            <p className="mt-3">
              If you have questions about these Terms or Wanderly's
              services, please contact us.
            </p>

            <div className="mt-5 rounded-2xl bg-cream-50 p-5">
              <p className="font-semibold text-ink-700">
                Wanderly
              </p>

              <p className="mt-2 text-ink-600">
                Email:{" "}
                <a
                  href="mailto:YOUR_EMAIL@example.com"
                  className="font-semibold text-ocean-600 hover:text-ocean-700"
                >
                  YOUR_EMAIL@example.com
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Notice */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          <strong>Important:</strong> These Terms are a general
          website-use template and should be reviewed and customized
          for Wanderly's actual business model, booking arrangements,
          payment providers, applicable laws, and operating policies
          before being used as a final legal agreement.
        </div>
      </article>
    </main>
  );
}