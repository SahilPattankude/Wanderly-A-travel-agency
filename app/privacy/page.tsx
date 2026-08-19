import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Wanderly",
  description:
    "Learn how Wanderly collects, uses, stores, and protects your personal information.",
  alternates: {
    canonical: "https://wanderly-a-travel-agency.vercel.app/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
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
            Wanderly
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Last updated: August 18, 2026
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Wanderly, we respect your privacy and are committed to
            protecting the personal information you provide while using
            our travel planning, booking, and AI-powered services.
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="px-6 pb-20">
        <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <PolicySection title="1. Information We Collect">
            <p>
              We may collect information that you provide directly when
              you create an account, use Wanderly, make a booking,
              contact us, or use our AI Trip Planner.
            </p>

            <h3 className="mt-6 font-semibold text-gray-900">
              Account Information
            </h3>

            <ul className="list-disc space-y-2 pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Profile information you choose to provide</li>
            </ul>

            <h3 className="mt-6 font-semibold text-gray-900">
              Booking Information
            </h3>

            <ul className="list-disc space-y-2 pl-6">
              <li>Booking details</li>
              <li>Travel dates</li>
              <li>Destination information</li>
              <li>Number of travelers</li>
              <li>Contact information necessary to process a booking</li>
            </ul>

            <h3 className="mt-6 font-semibold text-gray-900">
              Payment Information
            </h3>

            <p>
              When you make a payment through Wanderly, payment
              information may be processed by our third-party payment
              service provider. We may receive transaction-related
              information such as payment status, transaction reference,
              and booking information necessary to complete and manage
              your booking.
            </p>
          </PolicySection>

          <PolicySection title="2. Information Provided to Our AI Trip Planner">
            <p>
              Wanderly provides an AI-powered trip planning feature.
              When you use this feature, information you enter may
              include:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Destination</li>
              <li>Number of travel days</li>
              <li>Number of travelers</li>
              <li>Travel budget</li>
              <li>Travel style</li>
              <li>Travel interests and preferences</li>
            </ul>

            <p>
              This information is sent to our AI service provider,
              Google Gemini, to generate your requested itinerary.
              The information is used to provide the AI-powered travel
              planning service.
            </p>

            <p>
              You should avoid entering sensitive personal information
              that is not necessary for creating your itinerary.
            </p>
          </PolicySection>

          <PolicySection title="3. How We Use Your Information">
            <p>We may use collected information to:</p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Create and manage user accounts</li>
              <li>Provide travel planning services</li>
              <li>Generate personalized AI itineraries</li>
              <li>Process and manage bookings</li>
              <li>Process payments and verify transactions</li>
              <li>
                Send booking confirmations and service-related emails
              </li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Maintain website security and prevent misuse</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. How We Store and Protect Information">
            <p>
              We use reasonable technical and organizational measures
              designed to protect personal information against
              unauthorized access, loss, misuse, alteration, or
              disclosure.
            </p>

            <p>
              Our application may use third-party infrastructure
              providers for services such as authentication, databases,
              hosting, payments, email delivery, and content management.
            </p>

            <p>
              No internet-based service can guarantee absolute security.
              You should use a strong password and avoid sharing your
              account credentials with others.
            </p>
          </PolicySection>

          <PolicySection title="5. Third-Party Service Providers">
            <p>
              Wanderly may use trusted third-party services to operate
              and improve the website. These services may process
              information as necessary to provide their respective
              services.
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Supabase</strong> — authentication and database
                services
              </li>

              <li>
                <strong>Google Gemini</strong> — AI-powered itinerary
                generation
              </li>

              <li>
                <strong>Vercel</strong> — website hosting and application
                infrastructure
              </li>

              <li>
                <strong>Sanity</strong> — travel and blog content
                management
              </li>

              <li>
                <strong>Payment service providers</strong> — payment
                processing and transaction verification
              </li>

              <li>
                <strong>Email service providers</strong> — service and
                booking-related communications
              </li>
            </ul>

            <p>
              Third-party providers may have their own privacy policies
              and terms. We encourage you to review the policies of
              services you interact with.
            </p>
          </PolicySection>

          <PolicySection title="6. Cookies and Local Storage">
            <p>
              Wanderly may use cookies, browser storage, and similar
              technologies to maintain sessions, remember preferences,
              support authentication, and provide website functionality.
            </p>

            <p>
              Some information may be stored locally in your browser to
              improve the user experience. You can manage or delete
              browser storage through your browser settings.
            </p>
          </PolicySection>

          <PolicySection title="7. Data Sharing">
            <p>
              We do not intend to sell your personal information.
            </p>

            <p>
              We may share information with service providers when
              necessary to operate Wanderly, process bookings, process
              payments, provide AI itinerary generation, deliver emails,
              maintain infrastructure, or comply with applicable law.
            </p>

            <p>
              We may also disclose information when reasonably necessary
              to protect the rights, safety, security, or property of
              Wanderly, our users, or others.
            </p>
          </PolicySection>

          <PolicySection title="8. Data Retention">
            <p>
              We retain personal information for as long as reasonably
              necessary to provide our services, maintain records,
              resolve disputes, comply with legal obligations, and
              enforce our agreements.
            </p>

            <p>
              When personal information is no longer reasonably required,
              we may delete, anonymize, or securely dispose of it,
              subject to applicable legal or operational requirements.
            </p>
          </PolicySection>

          <PolicySection title="9. Your Privacy Rights">
            <p>
              Depending on applicable law, you may have rights relating
              to your personal information, including the ability to
              request access, correction, deletion, or other actions
              regarding your data.
            </p>

            <p>
              Where processing is based on consent, applicable law may
              also provide a right to withdraw that consent. Withdrawal
              of consent does not necessarily affect the lawfulness of
              processing carried out before withdrawal.
            </p>

            <p>
              To make a privacy request, contact us using the details
              provided below. We may need to verify your identity before
              processing certain requests.
            </p>
          </PolicySection>

          <PolicySection title="10. Children's Privacy">
            <p>
              Wanderly is not intentionally designed to collect personal
              information from children without appropriate
              authorization.
            </p>

            <p>
              If you believe that a child has provided personal
              information to us inappropriately, please contact us so
              that we can review and take appropriate action.
            </p>
          </PolicySection>

          <PolicySection title="11. External Links">
            <p>
              Wanderly may contain links to third-party websites,
              services, or travel resources. We are not responsible for
              the privacy practices or content of external websites. We
              recommend reviewing their privacy policies before
              providing personal information.
            </p>
          </PolicySection>

          <PolicySection title="12. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to
              reflect changes to our services, technology, legal
              requirements, or privacy practices. When we make changes,
              we will update the "Last updated" date at the beginning of
              this page.
            </p>
          </PolicySection>

          <PolicySection title="13. Contact Us">
            <p>
              If you have questions, concerns, or requests regarding
              this Privacy Policy or your personal information, please
              contact Wanderly.
            </p>

            <div className="mt-5 rounded-2xl bg-gray-50 p-5">
              <p className="font-semibold text-gray-900">
                Wanderly
              </p>

              <p className="mt-2 text-gray-600">
                Email:{" "}
                <a
                  href="mailto:YOUR_EMAIL@example.com"
                  className="font-medium text-blue-700 hover:text-orange-600"
                >
                  YOUR_EMAIL@example.com
                </a>
              </p>
            </div>
          </PolicySection>

          {/* Notice */}
          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <strong>Important:</strong> This Privacy Policy should be
            reviewed and customized to reflect Wanderly's actual
            business operations, data retention practices, payment
            providers, email providers, analytics tools, and applicable
            legal requirements.
          </div>
        </article>
      </section>
    </main>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-gray-200 py-8 first:pt-0 last:border-b-0">
      <h2 className="text-2xl font-bold text-gray-900">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-base leading-7 text-gray-600">
        {children}
      </div>
    </section>
  );
}