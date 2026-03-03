import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { BackToTop } from "@/components/ui/BackToTop";
import { CookieConsent } from "@/components/ui/CookieConsent";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://blessingsglobal.org"),
  title: {
    default: "Blessings Global Outreach | Spreading the Love of Christ",
    template: "%s | Blessings Global Outreach",
  },
  description:
    "Blessings Global Outreach spreads the gospel and love of Jesus Christ through physical outreaches, spiritual empowerment (Praise & Prophesy), and community building (Blessings Movement).",
  keywords: ["Christian outreach", "ministry", "Nigeria", "Praise and Prophesy", "Blessings Movement", "charity", "donation"],
  authors: [{ name: "Blessings Global Outreach" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Blessings Global Outreach",
    title: "Blessings Global Outreach — Spreading the Love of Christ. Blessing Nations.",
    description: "Physical blessings, spiritual empowerment, and community. Join the movement.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@blessingsmove",
    creator: "@blessingsmove",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans theme-transition">
        <ThemeProvider>
          <SessionProvider>
            <AnnouncementBanner />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
            <CookieConsent />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
