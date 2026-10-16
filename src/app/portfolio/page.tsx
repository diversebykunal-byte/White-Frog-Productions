import { Metadata } from "next";
import GalleryOfEmotionsPage from "@/app/gallery-of-emotions/page";

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

export default GalleryOfEmotionsPage;
