import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { SkipToMain } from "@/lib/accessibility";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ghar Bazaar - Premium B2B E-Commerce Marketplace",
    template: "%s | Ghar Bazaar",
  },
  description: "Discover millions of products from verified suppliers worldwide. Ghar Bazaar is your trusted B2B marketplace for quality products at competitive prices.",
  keywords: ["B2B marketplace", "wholesale", "suppliers", "manufacturers", "trade", "e-commerce", "bulk orders"],
  authors: [{ name: "Ghar Bazaar" }],
  creator: "Ghar Bazaar",
  publisher: "Ghar Bazaar",
  openGraph: {
    title: "Ghar Bazaar - Premium B2B E-Commerce Marketplace",
    description: "Discover millions of products from verified suppliers worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Ghar Bazaar",
    url: "https://gharbazaar.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghar Bazaar - Premium B2B E-Commerce Marketplace",
    description: "Discover millions of products from verified suppliers worldwide.",
    creator: "@gharbazaar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ghar Bazaar",
  url: "https://gharbazaar.com",
  logo: "https://gharbazaar.com/logo.png",
  sameAs: [
    "https://twitter.com/gharbazaar",
    "https://facebook.com/gharbazaar",
    "https://linkedin.com/company/gharbazaar",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-800-123-4567",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        <SkipToMain />
        <Providers>
          <main id="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
