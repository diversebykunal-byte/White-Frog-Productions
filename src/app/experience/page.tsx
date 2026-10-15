import Image from "next/image";
import Link from "next/link";

export default function ExperiencePage() {
  return (
    <div className="relative bg-white min-h-screen text-brand-dark pb-24">
      {/* 1. Framed Hero Header (Exact 1:1 match to Pixieset Block 0) */}
      <section className="relative px-4 sm:px-12 md:px-16 lg:px-24 pt-2 pb-6 max-w-[1550px] mx-auto select-none">
        {/* Left Vertical Subtitle (Positioned absolute to hero section, scrolls with hero) */}
        <div className="hidden lg:block absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 select-none pointer-events-none">
          <span
            className="text-[10px] tracking-[0.35em] text-brand-muted/70 uppercase font-sans whitespace-nowrap block"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            AUTHENTIC LOVE STORIES
          </span>
        </div>

        {/* Right Vertical "CONTACT US" Link (Exact match to Pixieset Theme-5) */}
        <div className="hidden lg:block absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20">
          <Link
            href="/reserve-your-experience"
            className="text-[10px] tracking-[0.35em] text-brand-muted/70 hover:text-brand-dark uppercase font-sans whitespace-nowrap block transition-colors"
            style={{ writingMode: "vertical-rl" }}
          >
            CONTACT US
          </Link>
        </div>

        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/11] max-h-[82vh] overflow-hidden bg-brand-cream shadow-sm">
          <Image
            src="https://images-pw.pixieset.com/elementfield/yKpv3b/0A6A4650copy-8f6d78d0-1500.jpg"
            alt="The Experience - White Frog Productions"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          {/* Subtle darkened vignette for contrast */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Centered Editorial Title Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 space-y-4">
            <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[0.18em] leading-tight uppercase drop-shadow-md">
              The Experience
            </h1>
            <div className="pt-2">
              <Link
                href="/reserve-your-experience"
                className="inline-block font-forum text-xs tracking-[0.25em] uppercase text-white/90 hover:text-white border-b border-white/60 pb-1 transition-colors"
              >
                contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introductory Manifesto Text (Exact 1:1 match to User Screenshot 2) */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-20 sm:py-28 text-center">
        <div className="space-y-6">
          <p className="font-forum text-xs sm:text-sm md:text-base text-brand-dark/85 tracking-[0.22em] leading-loose uppercase">
            We&rsquo;re going to do things a bit differently. This is about you.
          </p>
          <p className="font-forum text-xs sm:text-sm md:text-base text-brand-dark/85 tracking-[0.22em] leading-loose uppercase">
            this is about telling your story. Each love story is different and unique. there are no stories alike! we love investing time in getting to know you and what&rsquo;s important for you.
          </p>
        </div>
      </section>

      {/* 3. Photo with Text Overlay "We're here for you." */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden my-4">
        <Image
          src="https://images-pw.pixieset.com/elementfield/LQjQPX/0A6A7651copy-05ecf05e-1500.jpg"
          alt="We're here for you"
          fill
          unoptimized
          className="object-cover object-center brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-center px-6">
          <h2 className="font-forum text-4xl sm:text-6xl md:text-7xl text-white tracking-[0.15em] uppercase drop-shadow-md">
            We&rsquo;re here for you.
          </h2>
        </div>
      </section>

      {/* 4. Slider Banner: FOR THE SEEKERS, DREAMERS, & SUNSET CHASERS */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] overflow-hidden my-16">
        <Image
          src="https://images-pw.pixieset.com/elementfield/322666321/4G7A8548_copy-5d0a7131.jpg"
          alt="For the seekers, dreamers, & sunset chasers"
          fill
          unoptimized
          className="object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center px-6 space-y-5 text-white">
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/80 font-sans">
            We capture moments
          </span>
          <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl tracking-[0.12em] uppercase max-w-4xl leading-tight drop-shadow-sm">
            FOR THE SEEKERS, DREAMERS, &amp; SUNSET CHASERS
          </h1>
          <div className="pt-4">
            <Link
              href="/gallery-of-emotions"
              className="inline-block px-8 py-3.5 border border-white text-white hover:bg-white hover:text-brand-dark font-forum text-xs tracking-[0.25em] uppercase transition-all backdrop-blur-sm"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Photo with Overlay: READY TO TELL YOUR STORY? */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] overflow-hidden my-16">
        <Image
          src="https://images-pw.pixieset.com/elementfield/499566321/_DSC4326_copy-1386b567.jpg"
          alt="Ready to tell your story?"
          fill
          unoptimized
          className="object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-center px-6">
          <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.15em] uppercase drop-shadow-md">
            READY TO TELL YOUR STORY?
          </h1>
        </div>
      </section>

      {/* 6. Get In Touch Button */}
      <section className="text-center pt-4 pb-12">
        <Link
          href="/reserve-your-experience"
          className="inline-block px-10 py-4 bg-brand-dark text-white font-forum text-xs tracking-[0.25em] uppercase hover:bg-black transition-colors"
        >
          Get In Touch
        </Link>
      </section>
    </div>
  );
}
