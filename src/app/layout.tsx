import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pavilion Square KL | Luxury Residences & Corporate Suites in Bukit Bintang",
  description:
    "Pavilion Square KL — 67-storey luxury residences and 25-storey corporate suites opposite Pavilion KL Mall. 118m infinity pool, sky wellness, fully furnished units. The epicentre of luxury living in Kuala Lumpur.",
  keywords: [
    "luxury residences Kuala Lumpur",
    "Pavilion Square KL",
    "infinity pool KL",
    "Bukit Bintang luxury condo",
    "serviced residence KL",
    "Pavilion Group development",
    "luxury property Malaysia",
    "sky gym Kuala Lumpur",
    "corporate suites KL",
    "fully furnished condo KL",
    "Jalan Raja Chulan property",
    "KLCC luxury living",
  ],
  openGraph: {
    title: "Pavilion Square KL | The Epicentre of Luxury Living",
    description:
      "960 luxury residences, 106 corporate suites, and over 70,000 sq.ft. of world-class facilities. Connected to Pavilion KL Mall via direct link bridge.",
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.pavillionsquare.com.my/wp-content/uploads/2025/07/Pavillion-Square-Street-View.webp",
        width: 1200,
        height: 630,
        alt: "Pavilion Square KL",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-dark-bg text-champagne`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
