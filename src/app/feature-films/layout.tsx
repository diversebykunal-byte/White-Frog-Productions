import { Metadata } from "next";
import { FEATURE_FILMS } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Destination Wedding Feature Films & Cinema | White Frog Productions",
  description:
    "Explore 29 bespoke destination wedding feature films by White Frog Productions. Contemporary cinematography, authentic emotion, and timeless storytelling worldwide.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/feature-films",
  },
  openGraph: {
    title: "Destination Wedding Feature Films | White Frog Productions",
    description:
      "29 bespoke destination wedding films by White Frog Productions across Rajasthan, Delhi NCR, Thailand, and Europe.",
    url: "https://www.whitefrogproductions.com/feature-films",
    siteName: "White Frog Productions",
    type: "video.other",
    images: [
      {
        url: "https://images-pw.pixieset.com/elementfield/012620381/1H3A9414-2bb1136a.jpeg",
        width: 1500,
        height: 1000,
        alt: "White Frog Productions Luxury Wedding Feature Films",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Destination Wedding Feature Films | White Frog Productions",
    description:
      "Watch authentic destination wedding films by White Frog Productions.",
    images: [
      "https://images-pw.pixieset.com/elementfield/012620381/1H3A9414-2bb1136a.jpeg",
    ],
  },
};

export default function FeatureFilmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org ItemList with VideoObject for each film
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "White Frog Productions Wedding Feature Films",
    description:
      "A curated collection of destination wedding films directed by White Frog Productions.",
    numberOfItems: FEATURE_FILMS.length,
    itemListElement: FEATURE_FILMS.map((film, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: `${film.title} · Wedding Cinema Film`,
        description: `Luxury destination wedding film of ${film.title} at ${
          film.location || "destination wedding"
        } by White Frog Productions.`,
        thumbnailUrl: [
          film.coverImage,
          `https://i.ytimg.com/vi/${film.youtubeId}/maxresdefault.jpg`,
          `https://i.ytimg.com/vi/${film.youtubeId}/hqdefault.jpg`,
        ],
        uploadDate: "2024-01-01T08:00:00+05:30",
        contentUrl: `https://www.youtube.com/watch?v=${film.youtubeId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${film.youtubeId}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      {children}
    </>
  );
}
