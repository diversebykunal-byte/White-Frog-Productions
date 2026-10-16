import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The FAQ | White Frog Productions",
  description:
    "Preparing for your big day. Everything you need to know about our approach, deliverables, timelines, and destination wedding cinema.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/faq",
  },
  openGraph: {
    title: "FAQ · Preparing for Your Wedding Day | White Frog Productions",
    description:
      "Everything you need to know about our approach, deliverables, timelines, and destination wedding cinema.",
    url: "https://www.whitefrogproductions.com/faq",
    siteName: "White Frog Productions",
    type: "website",
    images: [
      {
        url: "https://images-pw.pixieset.com/elementfield/501666321/WFP-19-d14aa76f.jpg",
        width: 1500,
        height: 1000,
        alt: "White Frog Productions Wedding FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ · Preparing for Your Wedding Day | White Frog Productions",
    description:
      "Everything you need to know about our approach, deliverables, timelines, and destination wedding cinema.",
    images: [
      "https://images-pw.pixieset.com/elementfield/501666321/WFP-19-d14aa76f.jpg",
    ],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
