import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Films & Brand Cinema | White Frog Productions",
  description:
    "High-impact corporate documentaries, brand films, and commercial storytelling for global brands like Ducati, Nikon, Panasonic, and Reebok.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/corporate",
  },
  openGraph: {
    title: "Corporate Films & Commercial Storytelling | White Frog Productions",
    description:
      "High-impact corporate documentaries, brand films, and commercial storytelling for global brands like Ducati, Nikon, Panasonic, and Reebok.",
    url: "https://www.whitefrogproductions.com/corporate",
    siteName: "White Frog Productions",
    type: "video.other",
    images: [
      {
        url: "https://img.youtube.com/vi/MZLJI48_r-o/hqdefault.jpg",
        width: 1280,
        height: 720,
        alt: "White Frog Productions Corporate Brand Cinema",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Films & Commercial Storytelling | White Frog Productions",
    description:
      "High-impact corporate documentaries, brand films, and commercial storytelling for global brands.",
    images: [
      "https://img.youtube.com/vi/MZLJI48_r-o/hqdefault.jpg",
    ],
  },
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
