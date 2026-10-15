import Link from "next/link";
import Image from "next/image";
import { STORIES } from "@/data/siteData";
import { cld } from "@/lib/cloudinary";
import Theme5FramedHero from "@/components/Theme5FramedHero";

export const metadata = {
  title: "Cinematic Heirlooms | White Frog Productions",
  description: "Bespoke cinematic wedding films and fine-art photography stories captured worldwide by White Frog Productions.",
};

export default function CinematicHeirloomsPage() {
  return (
    <div className="bg-white min-h-screen text-brand-dark">
      {/* 0. Pixieset Theme-5 Framed Hero Header (10000% Parity) */}
      <Theme5FramedHero
        title="Cinematic Heirlooms"
        subtitle="Your stories, by us!"
        image="https://images-pw.pixieset.com/elementfield/yvXXe8/DSC00158-0a7488a1-1500.jpg"
        showContactLink={true}
      />

      {/* Client Stories Quick Navigation Directory */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-6 text-center space-y-6">
        <p className="text-[11px] tracking-[0.35em] text-brand-muted uppercase font-sans">
          Client Story Galleries
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-forum text-sm sm:text-base text-brand-dark/90 max-w-5xl mx-auto">
          {[...STORIES]
            .sort((a, b) => a.couple.localeCompare(b.couple))
            .map((s) => (
              <Link
                key={s.slug}
                href={`/cinematic-heirlooms/${s.slug}`}
                className="hover:text-brand-gold transition-colors underline decoration-brand-sand/70 underline-offset-4 px-2 py-1"
              >
                {s.couple}{" "}
                <span className="text-xs text-brand-muted font-sans font-light">
                  · {s.location}
                </span>
              </Link>
            ))}
        </div>
      </section>

      {/* List of 26 Stories matching Pixieset block-feature-link-single-photo 1:1 */}
      <div className="space-y-16 sm:space-y-24 pt-8 pb-20 max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-16">
        {STORIES.map((story) => (
          <div key={story.slug} className="space-y-4 sm:space-y-6">
            {/* Location subtitle above frame (matching screenshot 2) */}
            <div className="text-center">
              <p className="text-[10px] sm:text-xs tracking-[0.35em] text-brand-muted/90 uppercase font-sans">
                {story.location}
              </p>
            </div>

            {/* Framed photo showcase with dark tint & centered couple title */}
            <Link
              href={`/cinematic-heirlooms/${story.slug}`}
              className="group block relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] max-h-[750px] overflow-hidden bg-brand-cream shadow-sm"
            >
              <Image
                src={cld(story.coverImage, 2000)}
                alt={`${story.couple} luxury destination wedding cinema & photography heirloom at ${story.location} | White Frog Productions`}
                fill
                unoptimized
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              {/* Subtle tint overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Centered Serif Couple Title (matching screenshot 2 typography) */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                <h2 className="font-forum text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-[0.2em] uppercase drop-shadow-md">
                  {story.couple}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pixieset Bottom 2-Column Links: About Us / Contact */}
      <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-center border-t border-brand-sand/50">
        <Link
          href="/about"
          className="p-10 border border-brand-sand/60 hover:border-brand-dark/30 hover:bg-brand-cream/30 transition-all group"
        >
          <span className="text-[11px] tracking-widest uppercase text-brand-muted font-sans block mb-2">
            About Us
          </span>
          <h3 className="font-forum text-2xl text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
            Get to know us
          </h3>
        </Link>

        <Link
          href="/reserve-your-experience"
          className="p-10 border border-brand-sand/60 hover:border-brand-dark/30 hover:bg-brand-cream/30 transition-all group"
        >
          <span className="text-[11px] tracking-widest uppercase text-brand-muted font-sans block mb-2">
            Contact
          </span>
          <h3 className="font-forum text-2xl text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
            get in touch with us
          </h3>
        </Link>
      </section>
    </div>
  );
}
