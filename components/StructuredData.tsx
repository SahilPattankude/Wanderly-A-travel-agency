"use client";

import type { FAQItem } from "@/lib/trip";

interface StructuredDataProps {
  /** Page-specific FAQs for FAQPage schema */
  faqs?: FAQItem[];
  /** Page URL for canonical/WebPage schema */
  pageUrl?: string;
  /** Page title for WebPage schema */
  pageTitle?: string;
  /** Page description for WebPage schema */
  pageDescription?: string;
  /** Whether this is the AI Trip Planner page (adds SoftwareApplication) */
  isAiPlanner?: boolean;
}

const baseUrl = "https://wanderly-a-travel-agency.vercel.app";

export default function StructuredData({
  faqs = [],
  pageUrl = baseUrl,
  pageTitle = "Wanderly | Travel Agency & AI Trip Planner",
  pageDescription = "Discover destinations, explore travel guides, and create personalized itineraries with Wanderly.",
  isAiPlanner = false,
}: StructuredDataProps) {
  const schema = [
    // Organization - consistent across all pages
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": `${baseUrl}/#organization`,
      name: "Wanderly",
      url: baseUrl,
      description:
        "Discover destinations, build personalized itineraries, and organize your next trip with Wanderly.",
      logo: `${baseUrl}/logo.png`,
      sameAs: [
        "https://twitter.com/wanderly",
        "https://instagram.com/wanderly",
        "https://linkedin.com/company/wanderly",
      ],
    },

    // WebSite - consistent across all pages
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
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // WebPage - page-specific
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
      about: {
        "@id": `${baseUrl}/#organization`,
      },
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
    },

    // SoftwareApplication - only for AI Trip Planner page
    ...(isAiPlanner
      ? [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": `${baseUrl}/ai-planner#software`,
            name: "Wanderly AI Trip Planner",
            applicationCategory: "TravelApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript and modern browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            description:
              "AI-powered personalized travel itinerary generator. Create custom day-by-day travel plans based on destination, budget, interests, travel style, and trip duration.",
            featureList: [
              "Personalized day-by-day itineraries",
              "Budget estimation",
              "Activity and restaurant recommendations",
              "Travel style customization",
              "Interest-based suggestions",
              "Travel tips and practical advice",
            ],
            author: {
              "@id": `${baseUrl}/#organization`,
            },
            url: `${baseUrl}/ai-planner`,
          },
        ]
      : []),

    // FAQPage - only if FAQs provided
    ...(faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]
      : []),
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