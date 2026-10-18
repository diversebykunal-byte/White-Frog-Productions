import { Metadata } from "next";
import { PRE_WEDDING_FILMS } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Pre-Wedding Films & Concept Proposals | White Frog Productions",
  description:
    "Explore 20 bespoke pre-wedding films and concept love stories directed by White Frog Productions across Neemrana Fort, Goa, Rann of Kutch, Noor Mahal, and Himachal.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/pre-weddings",
  },
  openGraph: {
    title: "Pre-Wedding Films & Concept Proposals | White Frog Productions",
    description:
      "20 bespoke pre-wedding films and cinematic love stories captured across iconic royal forts, coastal retreats, and mountain landscapes.",
    url: "https://www.whitefrogproductions.com/pre-weddings",
    siteName: "White Frog Productions",
    type: "video.other",
    images: [
      {
        url: "https://i.ytimg.com/vi/CIX3mKNVFR0/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "White Frog Productions Pre-Wedding Films",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pre-Wedding Films | White Frog Productions",
    description:
      "20 bespoke pre-wedding films and cinematic love stories captured across iconic royal forts, coastal retreats, and mountain landscapes.",
    images: [
      "https://i.ytimg.com/vi/CIX3mKNVFR0/maxresdefault.jpg",
    ],
  },
};

export default function PreWeddingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const preWeddingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "White Frog Productions Pre-Wedding Films",
    description:
      "A curated collection of bespoke pre-wedding films and concept love stories directed by White Frog Productions.",
    numberOfItems: PRE_WEDDING_FILMS.length,
    itemListElement: PRE_WEDDING_FILMS.map((film, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: `${film.title} · Pre-Wedding Film`,
        description: `Bespoke pre-wedding film for ${film.couple} at ${film.location} by White Frog Productions.`,
        thumbnailUrl: [
          film.coverImage,
          `https://i.ytimg.com/vi/${film.youtubeId}/hqdefault.jpg`,
        ],
        uploadDate: "2024-01-01T08:00:00+05:30",
        contentUrl: `https://www.youtube.com/watch?v=${film.youtubeId}`,
        embedUrl: `https://www.youtube.com/embed/${film.youtubeId}`,
        publisher: {
          "@type": "Organization",
          name: "White Frog Productions",
          logo: {
            "@type": "ImageObject",
            url: "https://res.cloudinary.com/lyoxtgem/image/upload/v1792099306/whitefrog/brand/logo.png",
          },
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(preWeddingSchema) }}
      />
      {children}
    </>
  );
}
