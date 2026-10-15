import { Metadata } from "next";
import BlogClient from "./BlogClient";
import { SEO_ARTICLES } from "@/data/seoArticles";

export const metadata: Metadata = {
  title: "Wedding Photography & Cinema Journal | White Frog Productions",
  description:
    "Explore authoritative wedding guides, destination spotlights, venue breakdowns, and cinematic filmmaking secrets by Kunal Khanna & Madhavi Singh.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/blog",
  },
  openGraph: {
    title: "Luxury Wedding Cinema & Story Journal | White Frog Productions",
    description:
      "Award-winning destination wedding filmmakers Kunal Khanna & Madhavi Singh share expert venue guides, photography advice, and cinema inspiration.",
    url: "https://www.whitefrogproductions.com/blog",
    siteName: "White Frog Productions",
    type: "website",
    images: [
      {
        url: "https://images-pw.pixieset.com/elementfield/1naox6/DSCF0325copy-8ff17774-1500.jpg",
        width: 1500,
        height: 1000,
        alt: "White Frog Productions Wedding Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Photography & Cinema Journal | White Frog Productions",
    description:
      "Authoritative destination wedding guides, luxury venue insights, and cinematography secrets.",
  },
};

export default function BlogPage() {
  return <BlogClient articles={SEO_ARTICLES} />;
}
