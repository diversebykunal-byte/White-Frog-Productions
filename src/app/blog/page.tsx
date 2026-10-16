import { Metadata } from "next";
import BlogClient from "./BlogClient";
import { SEO_ARTICLES } from "@/data/seoArticles";
import { getCorporateAsSEOArticles } from "@/data/corporateSeoArticles";

export const metadata: Metadata = {
  title: "Wedding & Corporate Cinema Journal | White Frog Productions",
  description:
    "Explore authoritative destination wedding guides, venue breakdowns, corporate video production insights, and cinematic filmmaking secrets by White Frog Productions.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/blog",
  },
  openGraph: {
    title: "Luxury Wedding & Corporate Cinema Journal | White Frog Productions",
    description:
      "Award-winning cinema and photography studio White Frog Productions shares venue guides, enterprise production case studies, and cinema inspiration.",
    url: "https://www.whitefrogproductions.com/blog",
    siteName: "White Frog Productions",
    type: "website",
    images: [
      {
        url: "https://images-pw.pixieset.com/elementfield/1naox6/DSCF0325copy-8ff17774-1500.jpg",
        width: 1500,
        height: 1000,
        alt: "White Frog Productions Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding & Corporate Cinema Journal | White Frog Productions",
    description:
      "Authoritative destination wedding guides, enterprise production insights, and cinematography secrets.",
  },
};

export default function BlogPage() {
  const corporateArticles = getCorporateAsSEOArticles();
  // Merge wedding and corporate articles
  const allArticles = [...corporateArticles, ...SEO_ARTICLES];
  return <BlogClient articles={allArticles} />;
}
