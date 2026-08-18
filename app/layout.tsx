import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wanderly",
  description: "Plan and book your perfect trip with Wanderly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}