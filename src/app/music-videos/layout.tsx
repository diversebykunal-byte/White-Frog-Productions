import { Metadata } from "next";
import { MUSIC_VIDEOS } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Original Music Videos & Direction | White Frog Productions",
  description:
    "Explore 14 original music videos directed and produced by White Frog Productions. Featuring official releases for Sony Music India, SagaHits, Moviebox, Swastik The Band, and independent artists.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/music-videos",
  },
  openGraph: {
    title: "Music Videos Directed & Produced | White Frog Productions",
    description:
      "Official music videos and cinematic visuals produced for Sony Music India, SagaHits, Moviebox, Swastik The Band, and leading artists.",
    url: "https://www.whitefrogproductions.com/music-videos",
    siteName: "White Frog Productions",
    type: "video.other",
    images: [
      {
        url: "https://i.ytimg.com/vi/fLZFLP5y4cQ/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "White Frog Productions Music Videos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Music Videos | White Frog Productions",
    description:
      "Official music videos produced for Sony Music India, SagaHits, Moviebox, Swastik The Band, and leading artists.",
    images: [
      "https://i.ytimg.com/vi/fLZFLP5y4cQ/maxresdefault.jpg",
    ],
  },
};

export default function MusicVideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const musicVideoSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "White Frog Productions Music Videos",
    description:
      "A curated collection of original music videos directed and produced by White Frog Productions.",
    numberOfItems: MUSIC_VIDEOS.length,
    itemListElement: MUSIC_VIDEOS.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: `${video.title} · ${video.artist}`,
        description: `Official music video for "${video.title}" by ${video.artist}, produced and directed by White Frog Productions${video.label ? ` for ${video.label}` : ""}.`,
        thumbnailUrl: [
          video.coverImage,
          `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
        ],
        uploadDate: "2024-01-01T08:00:00+05:30",
        contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
        embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicVideoSchema) }}
      />
      {children}
    </>
  );
}
