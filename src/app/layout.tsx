import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { BackToTop } from "@/components/ui/BackToTop";
import { CookieConsent } from "@/components/ui/CookieConsent";

export const dynamic = "force-dynamic";

const inter = Manrope({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Sora({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://blessing-movement.vercel.app",
  ),
  title: {
    default: "Blessings Global Outreach | Spreading the Love of Christ",
    template: "%s | Blessings Global Outreach",
  },
  description:
    "Sharing the love of Christ through medical and welfare outreach, worship, prayer and community.",
  keywords: [
    "Christian outreach",
    "ministry",
    "Nigeria",
    "Praise and Prophesy",
    "Blessings Movement",
    "charity",
    "donation",
  ],
  authors: [{ name: "Blessings Global Outreach" }],
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "16x16 32x32 48x48" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Blessings Global Outreach",
    title:
      "Blessings Global Outreach | Spreading the Love of Christ. Blessing Nations.",
    description:
      "Physical blessings, spiritual empowerment, and community. Join the movement.",
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
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans">
        <noscript>
          <style>{`.blur-word,.reveal{opacity:1!important;filter:none!important;transform:none!important;}`}</style>
        </noscript>
        <ThemeProvider>
          <SessionProvider>
            <Navbar />
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <BackToTop />
            <CookieConsent />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
