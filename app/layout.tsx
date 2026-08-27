import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LangProvider } from "@/components/providers/lang-provider";
import { IDENTITY, content } from "@/lib/content";
import "./globals.css";

const site = IDENTITY.site;

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: content.en.meta.title,
  description: content.en.meta.description,
  applicationName: IDENTITY.name,
  authors: [{ name: IDENTITY.name, url: site }],
  creator: IDENTITY.name,
  keywords: [
    "Ajdin Podrinja",
    "marketing",
    "Sarajevo",
    "Next.js developer",
    "CRM",
    "SaaS",
    "Grow.ba",
  ],
  alternates: { canonical: site },
  openGraph: {
    type: "profile",
    url: site,
    siteName: IDENTITY.name,
    title: content.en.meta.title,
    description: content.en.meta.description,
    locale: "en_US",
    alternateLocale: ["bs_BA"],
  },
  twitter: {
    card: "summary_large_image",
    title: content.en.meta.title,
    description: content.en.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
  colorScheme: "dark light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: IDENTITY.name,
  jobTitle: "Marketing Lead & Builder",
  url: site,
  email: `mailto:${IDENTITY.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: IDENTITY.city,
    addressCountry: "BA",
  },
  sameAs: [IDENTITY.instagram, "https://grow.ba"],
  worksFor: { "@type": "Organization", name: "Grow.ba", url: "https://grow.ba" },
  knowsAbout: [
    "Digital marketing",
    "Meta Ads",
    "Google Ads",
    "Web development",
    "CRM systems",
    "SaaS",
    "AI automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Motion sets its "hidden" state as inline styles during SSR. Without
            JS those never resolve, so force everything visible instead. */}
        <noscript>
          <style>{`[style*="opacity"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
