import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-brand-dark pb-24">
      {/* 1. Main Bio Section (Exact 1:1 match to screenshot) */}
      <section className="max-w-[1350px] mx-auto px-6 sm:px-12 pt-8 sm:pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left Text Column (Col 7) */}
          <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-8">
            <span className="text-xs tracking-[0.25em] text-brand-muted uppercase font-sans block">
              HELLO, WE ARE MADHAVI &amp; KUNAL
            </span>

            <div className="font-forum text-xl sm:text-2xl text-brand-dark/95 leading-[1.8] space-y-6">
              <p>
                We had our humble beginnings in September 2012, as a Video Production House, indulged in filming and producing Music Videos, Corporate AVs and Short Films, essentially.
              </p>
              <p>
                It was not until 2014 that we decided to give weddings a shot, while actually looking for some creative change. We have progressively evolved over the 500 films that we have shot till date. The journey so far, making our ways through so much of love and passion, has been amazing, and we hope to keep working with as much zeal and love!
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/gallery-of-emotions"
                className="inline-block font-forum text-xs tracking-[0.25em] uppercase text-brand-dark/80 hover:text-brand-dark border-b border-brand-dark/40 pb-1.5 transition-colors"
              >
                SEE OUR WORK
              </Link>
            </div>
          </div>

          {/* Right Image Column (Col 5) with Vertical Rotated Text */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* The Photo of Kunal & Madhavi in the Mountains */}
            <div className="relative w-full max-w-[460px] aspect-[4/5] bg-brand-cream overflow-hidden shadow-sm">
              <Image
                src="https://images-pw.pixieset.com/elementfield/blKlee/Screenshot2024-08-15at2.53.59PM-ebbfbad4-1500.png"
                alt="Madhavi & Kunal"
                fill
                unoptimized
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Rotated Subtitle on the Right Margin (Exact 1:1 to screenshot) */}
            <div className="hidden sm:block absolute -right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none">
              <span
                className="text-[10px] tracking-[0.35em] text-brand-muted/70 uppercase font-sans whitespace-nowrap block"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                SIMPLY PUT — WE LOVE, LOVE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Divider */}
      <div className="w-full max-w-[1350px] mx-auto px-6 sm:px-12">
        <div className="w-full h-[1px] bg-brand-sand/60" />
      </div>

      {/* 3. Testimonials Banner */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden my-16">
        <Image
          src="https://images-pw.pixieset.com/elementfield/959566321/IMG_0329-37db18f0.jpg"
          alt="Kind Words from our clients"
          fill
          unoptimized
          className="object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-6 space-y-3 text-white">
          <span className="text-xs tracking-[0.3em] uppercase text-white/80 font-sans">
            Kind Words from our clients
          </span>
          <h2 className="font-forum text-4xl sm:text-6xl tracking-wide uppercase drop-shadow-sm">
            Testimonials
          </h2>
        </div>
      </section>

      {/* 4. Testimonials Quotes Section (Word by Word) */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 space-y-16 py-8">
        {/* Review 1 */}
        <div className="text-center space-y-6">
          <h3 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide uppercase">
            tamanna &amp; jas // chandigarh
          </h3>
          <p className="font-cormorant text-xl sm:text-2xl text-brand-muted leading-relaxed italic max-w-3xl mx-auto">
            &ldquo;Kunal and his team are the best professionals to hire. They know the strengths and work on areas of clients and make sure they connect to bring the best out. Very quick with deliverables and above all, really polite with the guests. It&rsquo;s almost like friends taking shots without any awkwardness. The technology they use is the best in the world. Highly recommend them&rdquo;
          </p>
        </div>

        <div className="w-24 h-[1px] bg-brand-sand/60 mx-auto" />

        {/* Review 2 */}
        <div className="text-center space-y-6">
          <h3 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide uppercase">
            PINKY &amp; HEMANT // NEEMRANA
          </h3>
          <p className="font-cormorant text-xl sm:text-2xl text-brand-muted leading-relaxed italic max-w-3xl mx-auto">
            &ldquo;Great work!! Super enthusiastic team and would work as per your pocket! They covered my wedding with a very prompt confirmation (as opposed to the many who had to check their calendars twice!!), Got in a very no-hassle young team and we loved the product!! Open to positive criticism and feedback. (being a TV producer I had long long feedback mails on the videos :)) but all was done very well and with commitment. They are young, spirited, and fun! Recommended :)&rdquo;
          </p>
        </div>

        {/* 5. Get in Touch Button */}
        <div className="text-center pt-8">
          <Link
            href="/reserve-your-experience"
            className="inline-block px-10 py-4 bg-brand-dark text-white font-forum text-xs tracking-[0.25em] uppercase hover:bg-black transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
