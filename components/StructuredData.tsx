import { faqs } from "@/lib/data";

const baseUrl = "https://wanderly-a-travel-agency.vercel.app";

export default function StructuredData() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": `${baseUrl}/#organization`,
      name: "Wanderly",
      url: baseUrl,
      description:
        "Discover destinations, build personalized itineraries, and organize your next trip with Wanderly.",
    },

    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "Wanderly",
      url: baseUrl,
      description:
        "Travel inspiration, personalized itineraries, destinations, and trip planning tools.",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
    },

    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${baseUrl}/#webpage`,
      url: baseUrl,
      name: "Wanderly | Travel Agency & AI Trip Planner",
      description:
        "Discover destinations, explore travel guides, and create personalized itineraries with Wanderly.",
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
      about: {
        "@id": `${baseUrl}/#organization`,
      },
    },

    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}