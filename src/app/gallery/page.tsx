import { Metadata } from "next";
import CinematicHeirloomsPage from "@/app/cinematic-heirlooms/page";

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

export default CinematicHeirloomsPage;
