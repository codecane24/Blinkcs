// layout.tsx or RootLayout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blink-bricks.com"),
  title: "BLINK – Customized Concrete Bricks | Durable & Aesthetic Bricks Supplier",
  description:
    "BLINK offers customized concrete bricks for builders, architects, and homeowners. Eco-friendly, durable, and aesthetic bricks to beautify homes and construction projects. Premium concrete brick supplier since 2022.",
  keywords: [
    "customized concrete bricks",
    "eco-friendly bricks",
    "decorative concrete bricks",
    "durable bricks for construction",
    "architectural bricks",
    "building bricks",
    "custom masonry solutions",
    "bricks for builders",
    "bricks supplier",
  ],
  icons: {
    icon: "/favicon2.webp",
  },
  openGraph: {
    title: "BLINK - Premium Customized Concrete Bricks for Construction",
    description:
      "Discover eco-friendly and durable concrete bricks by BLINK. Perfect for architects, builders, and homeowners seeking high-quality, custom brick solutions.",
    url: "/",
    siteName: "BLINK Bricks",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Eco-Friendly Customized Concrete Bricks",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLINK – Customized Concrete Bricks for Durable & Beautiful Structures",
    description:
      "BLINK provides eco-friendly, durable, and custom-designed concrete bricks ideal for construction, architectural designs, and home improvement.",
    images: ["/og-image.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BLINK",
  url: "https://blink-bricks.com",
  logo: "https://blink-bricks.com/favicon2.webp",
  sameAs: [
    "https://www.facebook.com/blinkbricks",
    "https://twitter.com/blinkbricks",
  ],
  description:
    "BLINK specializes in high-quality customized concrete bricks for builders, architects, and homeowners. Eco-friendly, durable, and aesthetically designed since 2022.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

       
        <SmoothScrollProvider>
            <Sidebar/>
        {children}
        <Footer/>
        </SmoothScrollProvider>
                 <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
