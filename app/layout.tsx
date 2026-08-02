/**
 * Root layout for the Journey Projects corporate site.
 * Wraps all pages with shared header, footer, and global styles.
 * Uses Poppins font from Google Fonts for clean sans-serif typography.
 */

import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { HeaderOffset } from "@/components/HeaderOffset";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Journey Projects",
  description:
    "Product Designer with 15+ years experience creating end-to-end digital solutions for healthcare, environment, social impact, and enterprise systems.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Journey Projects",
  },
  openGraph: {
    title: "Journey Projects",
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FXGF1CTS0K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FXGF1CTS0K');
          `}
        </Script>
      </head>
      <body className="font-sans">
        <Header />
        {/* Renders nothing — keeps --jp-header-h in step with the header's
            real height so the sticky back bar clears it at any text size. */}
        <HeaderOffset />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
