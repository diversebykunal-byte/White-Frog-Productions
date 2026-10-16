import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Forum, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0d0d0d",
};

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-forum",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const aristotelicaFallback = Outfit({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-aristotelica-fallback",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.whitefrogproductions.com"),
  title: "White Frog Productions | Cinematic Wedding Heirlooms & Photography",
  description:
    "Contemporary luxury wedding filmmaking and fine-art photography by White Frog Productions. Delhi NCR & Worldwide.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.whitefrogproductions.com",
    siteName: "White Frog Productions",
    title: "White Frog Productions | Cinematic Wedding Heirlooms & Photography",
    description:
      "Contemporary luxury wedding filmmaking and fine-art photography by White Frog Productions. Delhi NCR & Worldwide.",
    images: [
      {
        url: "https://images-pw.pixieset.com/elementfield/blK9LJ/Screenshot2025-05-31at12.38.52AM-223909a0-1500.png",
        width: 1500,
        height: 1000,
        alt: "White Frog Productions - Luxury Wedding Cinema & Fine-Art Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "White Frog Productions | Cinematic Wedding Heirlooms & Photography",
    description:
      "Contemporary luxury wedding filmmaking and fine-art photography by White Frog Productions. Delhi NCR & Worldwide.",
    images: [
      "https://images-pw.pixieset.com/elementfield/blK9LJ/Screenshot2025-05-31at12.38.52AM-223909a0-1500.png",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": "https://www.whitefrogproductions.com/#organization",
      "name": "White Frog Productions",
      "url": "https://www.whitefrogproductions.com",
      "logo": "https://res.cloudinary.com/lyoxtgem/image/upload/v1792099306/whitefrog/brand/logo.png",
      "image": "https://images-pw.pixieset.com/elementfield/OWDoZpG/DSCF0468copy2-1473eecb-1000.jpg",
      "description": "Award-winning luxury wedding filmmaking and fine-art photography studio helmed by Kunal Khanna & Madhavi Singh. Documenting destination weddings across Delhi NCR, Rajasthan, Goa, Europe, and worldwide.",
      "telephone": "+91-98711-11762",
      "email": "kunal@whitefrogproductions.com",
      "priceRange": "₹₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi NCR",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.6139,
        "longitude": 77.2090
      },
      "areaServed": [
        "Delhi NCR",
        "Udaipur",
        "Jaipur",
        "Jodhpur",
        "Jaisalmer",
        "Goa",
        "Jim Corbett",
        "Mussoorie",
        "Rishikesh",
        "Chandigarh",
        "Mumbai",
        "Hyderabad",
        "Bangalore",
        "Italy",
        "Thailand",
        "United Arab Emirates",
        "Worldwide"
      ],
      "sameAs": [
        "https://www.instagram.com/whitefrogproductions/",
        "https://www.youtube.com/c/WhiteFrogProductions",
        "https://vimeo.com/user20224514",
        "https://www.facebook.com/whitefrogproductions",
        "https://www.linkedin.com/company/whitefrogproductions/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.whitefrogproductions.com/#website",
      "url": "https://www.whitefrogproductions.com",
      "name": "White Frog Productions",
      "publisher": {
        "@id": "https://www.whitefrogproductions.com/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${forum.variable} ${cormorant.variable} ${aristotelicaFallback.variable}`}
    >
      <body className="bg-brand-bg text-brand-dark min-h-screen flex flex-col antialiased selection:bg-brand-dark selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
