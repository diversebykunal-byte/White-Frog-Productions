import { Metadata } from "next";
import CinematicHeirloomsPage from "@/app/cinematic-heirlooms/page";
import { STORIES } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Gallery · Client Wedding Stories | White Frog Productions",
  description:
    "Bespoke cinematic wedding films and fine-art photography stories captured worldwide by White Frog Productions.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/gallery",
  },
  openGraph: {
    title: "Gallery · Client Wedding Stories | White Frog Productions",
    description:
      "Bespoke cinematic wedding films and fine-art photography stories captured worldwide by White Frog Productions.",
    url: "https://www.whitefrogproductions.com/gallery",
    siteName: "White Frog Productions",
    type: "website",
    images: [
      {
        url: "https://images-pw.pixieset.com/elementfield/yvXXe8/DSC00158-0a7488a1-1500.jpg",
        width: 1500,
        height: 1000,
        alt: "White Frog Productions - Client Wedding Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery · Client Wedding Stories | White Frog Productions",
    description:
      "Bespoke cinematic wedding films and fine-art photography stories captured worldwide.",
    images: [
      "https://images-pw.pixieset.com/elementfield/yvXXe8/DSC00158-0a7488a1-1500.jpg",
    ],
  },
};

export default function GalleryPage() {
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.whitefrogproductions.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gallery",
        item: "https://www.whitefrogproductions.com/gallery",
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "White Frog Productions · Wedding Cinema & Heirlooms Gallery",
    description:
      "Bespoke cinematic wedding films and fine-art photography stories captured worldwide by White Frog Productions.",
    url: "https://www.whitefrogproductions.com/gallery",
    hasPart: STORIES.map((story) => ({
      "@type": "CreativeWork",
      name: `${story.couple} · Wedding Cinema & Photography at ${story.location}`,
      url: `https://www.whitefrogproductions.com/${story.slug}`,
      image: story.coverImage,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <CinematicHeirloomsPage />
    </>
  );
}
