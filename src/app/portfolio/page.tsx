import { Metadata } from "next";
import GalleryOfEmotionsPage from "@/app/gallery-of-emotions/page";
import { GALLERY_PHOTOS } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Portfolio · Fine-Art Photography | White Frog Productions",
  description:
    "Handcrafted, luxury & contemporary wedding photographs from celebrations worldwide by White Frog Productions.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/portfolio",
  },
  openGraph: {
    title: "Portfolio · Fine-Art Wedding Photography | White Frog Productions",
    description:
      "Handcrafted, luxury & contemporary wedding photographs from celebrations worldwide by White Frog Productions.",
    url: "https://www.whitefrogproductions.com/portfolio",
    siteName: "White Frog Productions",
    type: "website",
    images: [
      {
        url: "https://images-pw.pixieset.com/elementfield/rLYl8D/DSCF0418-cf337b07-1500.JPEG",
        width: 1500,
        height: 1000,
        alt: "White Frog Productions Fine-Art Wedding Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio · Fine-Art Wedding Photography | White Frog Productions",
    description:
      "Handcrafted, luxury & contemporary wedding photographs from celebrations worldwide.",
    images: [
      "https://images-pw.pixieset.com/elementfield/rLYl8D/DSCF0418-cf337b07-1500.JPEG",
    ],
  },
};

export default function PortfolioPage() {
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
        name: "Portfolio",
        item: "https://www.whitefrogproductions.com/portfolio",
      },
    ],
  };

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "White Frog Productions · Fine-Art Wedding Photography Portfolio",
    description:
      "Handcrafted, luxury and contemporary wedding photographs from celebrations worldwide by White Frog Productions.",
    url: "https://www.whitefrogproductions.com/portfolio",
    creator: {
      "@type": "Organization",
      name: "White Frog Productions",
      url: "https://www.whitefrogproductions.com",
    },
    image: GALLERY_PHOTOS.slice(0, 30).map((photoUrl, index) => ({
      "@type": "ImageObject",
      name: `Fine-Art Luxury Wedding Still ${index + 1}`,
      contentUrl: photoUrl,
      thumbnailUrl: photoUrl,
      creator: {
        "@type": "Organization",
        name: "White Frog Productions",
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <GalleryOfEmotionsPage />
    </>
  );
}
