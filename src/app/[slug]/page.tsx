import { Metadata } from "next";
import { notFound } from "next/navigation";
import { STORIES } from "@/data/siteData";
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

  return {
    title: `${story.couple} | White Frog Productions`,
    description: `Fine-art wedding cinematography and photography heirlooms of ${story.couple} at ${story.location} by White Frog Productions.`,
    openGraph: {
      title: `${story.couple} · ${story.location} | White Frog Productions`,
      description: `Fine-art wedding story captured at ${story.location}.`,
      images: [story.coverImage],
    },
  };
}

export default function StoryPage({ params }: PageProps) {
  const story = STORIES.find(
    (s) => s.slug.toLowerCase() === params.slug.toLowerCase()
  );

  if (!story) {
    notFound();
  }

  return (
    <ClientStoryGallery
      couple={story.couple}
      location={story.location}
      coverImage={story.coverImage}
      photos={story.photos}
    />
  );
}
