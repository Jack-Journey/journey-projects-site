/**
 * Root layout for the Journey Projects corporate site.
 * Wraps all pages with shared header, footer, and global styles.
 * Uses Inter font from Google Fonts for clean sans-serif typography.
 */

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Jack Hsu — Fractional Product Design Partner",
  description:
    "Product Designer with 15+ years experience creating end-to-end digital solutions for healthcare, environment, social impact, and enterprise systems.",
  openGraph: {
    title: "Jack Hsu — Fractional Product Design Partner",
    description:
      "Product Designer with 15+ years experience creating end-to-end digital solutions.",
    type: "website",
    url: "https://journeyprojects.co",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
