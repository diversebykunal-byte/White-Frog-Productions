import { Metadata } from "next";
import { MEDIA_FEATURES } from "@/data/siteData";

export const metadata: Metadata = {
  title: "In Media & Press | White Frog Productions",
  description:
    "Explore media features and broadcast interviews featuring White Frog Productions, including WION TV Global News Tech It Out exploring digital cinema and luxury wedding filmmaking.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/in-media",
  },
  openGraph: {
    title: "In Media & Press · National Television Broadcasts | White Frog Productions",
    description:
      "Co-Founder Kunal Khanna featured on WION TV's Tech It Out exploring the craft of digital filmmaking, aerial cinematography, and modern luxury wedding cinema.",
    url: "https://www.whitefrogproductions.com/in-media",
    siteName: "White Frog Productions",
    type: "video.other",
    images: [
      {
        url: "https://i.ytimg.com/vi/AKl95ggzdgM/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "White Frog Productions on WION TV Tech It Out",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "In Media & Press | White Frog Productions",
    description:
      "Co-Founder Kunal Khanna featured on WION TV exploring digital filmmaking and luxury wedding cinema.",
    images: [
      "https://i.ytimg.com/vi/AKl95ggzdgM/maxresdefault.jpg",
    ],
  },
};

export default function InMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mediaSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "White Frog Productions In Media & Press",
    description:
      "Broadcast interviews and media coverage featuring White Frog Productions.",
    numberOfItems: MEDIA_FEATURES.length,
    itemListElement: MEDIA_FEATURES.map((feature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: feature.title,
        description: feature.description,
        thumbnailUrl: [
          feature.coverImage,
          `https://i.ytimg.com/vi/${feature.youtubeId}/hqdefault.jpg`,
        ],
        uploadDate: "2024-01-01T08:00:00+05:30",
        contentUrl: `https://www.youtube.com/watch?v=${feature.youtubeId}`,
        embedUrl: `https://www.youtube.com/embed/${feature.youtubeId}`,
        publisher: {
          "@type": "NewsMediaOrganization",
          name: feature.network,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaSchema) }}
      />
      {children}
    </>
  );
}
