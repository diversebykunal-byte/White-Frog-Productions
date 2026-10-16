import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Intake Questionnaire | White Frog Productions",
  description:
    "Help us understand your celebration, priorities, and emotional vision so we can curate your bespoke wedding film experience.",
  alternates: {
    canonical: "https://www.whitefrogproductions.com/intake",
  },
  openGraph: {
    title: "Wedding Cinema Intake Questionnaire | White Frog Productions",
    description:
      "Help us understand your celebration, priorities, and emotional vision so we can curate your bespoke wedding film experience.",
    url: "https://www.whitefrogproductions.com/intake",
    siteName: "White Frog Productions",
    type: "website",
    images: [
      {
        url: "https://images-pw.pixieset.com/elementfield/587566321/5G4A2096-40f47ed3.jpg",
        width: 1500,
        height: 1000,
        alt: "Client Intake Questionnaire - White Frog Productions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Cinema Intake Questionnaire | White Frog Productions",
    description:
      "Help us understand your celebration, priorities, and emotional vision.",
    images: [
      "https://images-pw.pixieset.com/elementfield/587566321/5G4A2096-40f47ed3.jpg",
    ],
  },
};

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
