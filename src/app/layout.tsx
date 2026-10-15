import type { Metadata } from "next";
import { Cormorant_Garamond, Forum } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-forum",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "White Frog Productions | Cinematic Wedding Heirlooms & Photography",
  description:
    "Contemporary luxury wedding filmmaking and fine-art photography by Kunal Khanna & Madhavi Singh. Delhi NCR & Worldwide.",
  icons: {
    icon: "https://images-pw.pixieset.com/profile/894901/5401b7ff60df951c77d0ea7747e43f53e1171ae982ae899b31ff04c1bc44f01d.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${forum.variable} ${cormorant.variable}`}>
      <body className="bg-brand-bg text-brand-dark min-h-screen flex flex-col antialiased selection:bg-brand-dark selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
