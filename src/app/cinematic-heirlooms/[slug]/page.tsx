import { Metadata } from "next";
import { notFound } from "next/navigation";
import { STORIES } from "@/data/siteData";
import { SEO_ARTICLES } from "@/data/seoArticles";
import ClientStoryGallery from "@/components/ClientStoryGallery";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const story = STORIES.find(
    (s) => s.slug.toLowerCase() === params.slug.toLowerCase()
  );

  if (!story) {
    return {
      title: "Story Not Found | White Frog Productions",
    };
  }

  const url = `https://www.whitefrogproductions.com/${story.slug}`;

  return {
    title: `${story.couple} · ${story.location} | White Frog Productions`,
    description: `Fine-art destination wedding cinematography and photography heirlooms of ${story.couple} at ${story.location} by White Frog Productions.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${story.couple} · Luxury Wedding Heirlooms at ${story.location}`,
      description: `Fine-art destination wedding cinema and photography by White Frog Productions at ${story.location}.`,
      url,
      siteName: "White Frog Productions",
      type: "article",
      images: [
        {
          url: story.coverImage,
          width: 1500,
          height: 1000,
          alt: `${story.couple} luxury destination wedding photography at ${story.location}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${story.couple} · ${story.location} | White Frog Productions`,
      description: `Fine-art destination wedding cinema and photography heirlooms.`,
      images: [story.coverImage],
    },
  };
}

// Find matching destination or venue guides for this story
function getGuidesForStory(location: string) {
  const locParts = location.toLowerCase().split(/[,&]+/).map((p) => p.trim());
  const matching = SEO_ARTICLES.filter((a) => {
    const text = (a.title + " " + (a.location || "") + " " + a.slug).toLowerCase();
    return locParts.some((p) => p.length > 3 && text.includes(p));
  });

  if (matching.length >= 3) {
    return matching.slice(0, 3).map((a) => ({
      slug: a.slug,
      title: a.title,
      category: a.category,
      readingTime: a.readingTime,
      coverImage: a.coverImage,
    }));
  }

  const featuredSlugs = [
    "udaipur-destination-wedding-guide",
    "jaipur-luxury-palace-wedding-guide",
    "destination-wedding-budget-checklist-guide",
  ];
  const defaults = SEO_ARTICLES.filter((a) => featuredSlugs.includes(a.slug));
  const combined = [...matching, ...defaults];
  const unique = Array.from(
    new Map(combined.map((item) => [item.slug, item])).values()
  );

  return unique.slice(0, 3).map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    readingTime: a.readingTime,
    coverImage: a.coverImage,
  }));
}

export default function StoryPage({ params }: PageProps) {
  const story = STORIES.find(
    (s) => s.slug.toLowerCase() === params.slug.toLowerCase()
  );

  if (!story) {
    notFound();
  }

  const relatedGuides = getGuidesForStory(story.location);

  // Breadcrumbs Schema for Google SERP Navigation Hierarchy
  const breadcrumbSchema = {
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
      {
        "@type": "ListItem",
        position: 3,
        name: `${story.couple} · ${story.location}`,
        item: `https://www.whitefrogproductions.com/${story.slug}`,
      },
    ],
  };

  // VisualArtwork / CreativeWork Schema for Google Images & Knowledge Graph
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: `${story.couple} · Luxury Destination Wedding Cinema & Photography Heirloom`,
    description: `Fine-art destination wedding cinema and photography heirlooms of ${story.couple} at ${story.location} by White Frog Productions.`,
    image: story.coverImage,
    creator: {
      "@type": "Organization",
      name: "White Frog Productions",
      url: "https://www.whitefrogproductions.com",
    },
    artMedium: "Cinematography & Fine-Art Photography",
    artform: "Wedding Cinema Film & Photo Gallery",
    contentLocation: {
      "@type": "Place",
      name: story.location,
    },
  };

  // Video Schema if YouTube film is present
  const videoSchema = story.youtubeId
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${story.couple} · Wedding Cinema Film at ${story.location}`,
        description: `Fine-art destination wedding cinema film of ${story.couple} at ${story.location} by White Frog Productions.`,
        thumbnailUrl: [
          story.coverImage,
          `https://i.ytimg.com/vi/${story.youtubeId}/maxresdefault.jpg`,
          `https://i.ytimg.com/vi/${story.youtubeId}/hqdefault.jpg`,
        ],
        uploadDate: "2024-01-01T08:00:00+05:30",
        contentUrl: `https://www.youtube.com/watch?v=${story.youtubeId}`,
        embedUrl: `https://www.youtube.com/embed/${story.youtubeId}`,
        publisher: {
          "@type": "Organization",
          name: "White Frog Productions",
          logo: {
            "@type": "ImageObject",
            url: "https://res.cloudinary.com/lyoxtgem/image/upload/v1792099306/whitefrog/brand/logo.png",
          },
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}
      <ClientStoryGallery
        couple={story.couple}
        location={story.location}
        coverImage={story.coverImage}
        photos={story.photos}
        youtubeId={story.youtubeId}
        relatedGuides={relatedGuides}
      />
    </>
  );
}
