import { faqs } from "@/lib/data";

const baseUrl = "https://wanderly-a-travel-agency.vercel.app";

export default function StructuredData() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Wanderly",
      url: baseUrl,
      description: "Discover destinations, build personalized itineraries, and organise your next trip with Wanderly.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Wanderly",
      url: baseUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
