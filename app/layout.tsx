import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const baseUrl = "https://wanderly-a-travel-agency.vercel.app";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Wanderly | Travel Agency & AI Trip Planner",
    template: "%s | Wanderly",
  },

  description:
    "Discover destinations, explore travel guides, and create personalized travel itineraries with Wanderly's AI Trip Planner.",

  applicationName: "Wanderly",

  keywords: [
    "travel agency",
    "AI trip planner",
    "travel planner",
    "travel itineraries",
    "travel guides",
    "holiday planner",
    "trip planning",
    "travel destinations",
  ],

  authors: [
    {
      name: "Wanderly",
      url: baseUrl,
    },
  ],

  creator: "Wanderly",
  publisher: "Wanderly",

  alternates: {
    canonical: baseUrl,
  },

  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "Wanderly",
    title: "Wanderly | Travel Agency & AI Trip Planner",
    description:
      "Discover destinations, explore travel guides, and create personalized travel itineraries with Wanderly's AI Trip Planner.",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Wanderly | Travel Agency & AI Trip Planner",
    description:
      "Discover destinations, explore travel guides, and create personalized travel itineraries with Wanderly.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}