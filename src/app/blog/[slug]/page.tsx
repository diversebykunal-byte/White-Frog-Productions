import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  Sparkles,
  Play,
  Film,
  Camera,
  Heart,
  ChevronRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import {
  SEO_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/seoArticles";
import { cld } from "@/lib/cloudinary";

interface PageProps {
  params: {
    slug: string;
  };
}

// Pre-render all 300+ programmatic articles statically
export async function generateStaticParams() {
  return SEO_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const url = `https://www.whitefrogproductions.com/blog/${article.slug}`;

  return {
    title: `${article.title} | White Frog Productions`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: "White Frog Productions",
      type: "article",
      publishedTime: article.date,
      authors: ["Kunal Khanna", "Madhavi Singh"],
      images: [
        {
          url: article.coverImage,
          width: 1500,
          height: 1000,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.coverImage],
    },
  };
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);

  // Structured Data Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: [article.coverImage],
    datePublished: article.date,
    dateModified: article.date,
    author: [
      {
        "@type": "Person",
        name: "Kunal Khanna",
        jobTitle: "Founder & Creative Director",
        url: "https://www.whitefrogproductions.com/about",
      },
      {
        "@type": "Person",
        name: "Madhavi Singh",
        jobTitle: "Co-Founder & Creative Producer",
        url: "https://www.whitefrogproductions.com/about",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "White Frog Productions",
      logo: {
        "@type": "ImageObject",
        url: "https://images-pw.pixieset.com/elementfield/5401b7ff60df43ff8d207ec41d8e13ba.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.whitefrogproductions.com/blog/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
  };

  const faqSchema =
    article.faqs && article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbsSchema = {
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
        name: "Journal",
        item: "https://www.whitefrogproductions.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.category,
        item: `https://www.whitefrogproductions.com/blog?category=${encodeURIComponent(
          article.category
        )}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
        item: `https://www.whitefrogproductions.com/blog/${article.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <article className="min-h-screen bg-[#faf8f5] text-brand-dark pt-28 pb-24">
        {/* Breadcrumb Navigation */}
        <nav className="max-w-4xl mx-auto px-6 sm:px-8 py-4 mb-4">
          <ol className="flex items-center flex-wrap gap-2 text-xs tracking-wider uppercase font-forum text-brand-muted">
            <li>
              <Link href="/" className="hover:text-brand-dark transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-brand-sand" />
            </li>
            <li>
              <Link href="/blog" className="hover:text-brand-dark transition-colors">
                Journal
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-brand-sand" />
            </li>
            <li className="text-brand-dark font-medium truncate max-w-xs sm:max-w-md">
              {article.category}
            </li>
          </ol>
        </nav>

        {/* Article Editorial Header */}
        <header className="max-w-4xl mx-auto px-6 sm:px-8 space-y-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="px-3.5 py-1 bg-brand-sand/40 border border-brand-sand text-brand-dark text-xs tracking-widest uppercase rounded-full font-forum">
              {article.category}
            </span>
            <span className="text-xs tracking-wider uppercase text-brand-muted flex items-center gap-1 font-forum">
              <Clock className="w-3 h-3" />
              {article.readingTime}
            </span>
          </div>

          <h1 className="font-forum text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-brand-dark tracking-wide leading-tight">
            {article.title}
          </h1>

          <p className="font-cormorant text-xl sm:text-2xl text-brand-muted italic max-w-2xl mx-auto leading-relaxed">
            {article.description}
          </p>

          <div className="pt-4 border-t border-brand-sand/50 flex flex-wrap items-center justify-between gap-4 text-xs tracking-widest uppercase text-brand-muted font-forum max-w-xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
              <span>By Kunal Khanna & Madhavi Singh</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 my-12">
          <div className="relative h-[320px] sm:h-[480px] md:h-[580px] w-full rounded-2xl overflow-hidden shadow-lg border border-brand-sand/50">
            <Image
              src={cld(article.coverImage, 1400)}
              alt={article.title}
              fill
              priority
              unoptimized
              className="object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md text-[11px] text-white/90 font-forum tracking-wider uppercase">
              Photo by White Frog Productions
            </div>
          </div>
        </div>

        {/* Content Body Container */}
        <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-12">
          {/* Key Takeaways Box (High Engagement & SEO featured snippet optimization) */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="bg-[#f4efe8] border-l-4 border-brand-gold p-6 sm:p-8 rounded-r-xl space-y-4">
              <div className="flex items-center gap-2 font-forum text-sm tracking-widest uppercase text-brand-dark font-medium">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Executive Summary & Key Takeaways</span>
              </div>
              <ul className="space-y-3 font-cormorant text-base sm:text-lg text-brand-dark/90 leading-relaxed">
                {article.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 1: The Essence of Cinematic Documentary */}
          <section className="space-y-5">
            <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide">
              The Philosophy: Emotion Over Performance
            </h2>
            <p className="font-cormorant text-lg sm:text-xl text-brand-dark/85 leading-relaxed font-light">
              At White Frog Productions, our filmmaking philosophy is anchored in a single, sacred conviction: a wedding is not a Bollywood movie set to be directed, but a profound, unrepeatable emotional chapter in two family histories. When filming in {article.location || "breathtaking destination venues"}, the greatest moments never happen during scripted poses.
            </p>
            <p className="font-cormorant text-lg sm:text-xl text-brand-dark/85 leading-relaxed font-light">
              They happen in the quiet tremble of a father’s hands as he fastens his daughter’s heirloom necklace. They happen in the spontaneous, unrestrained laughter when a sudden gust of wind catches the veil during the golden hour pheras. Our mission is to capture these fleeting micro-moments without disrupting the sacred tempo of your celebration.
            </p>
          </section>

          {/* Section 2: Light, Architecture & Space */}
          <section className="space-y-5">
            <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide">
              Mastering Light & Venue Architecture
            </h2>
            <p className="font-cormorant text-lg sm:text-xl text-brand-dark/85 leading-relaxed font-light">
              Whether documenting within the sunlit stone courtyards of a 15th-century Rajput fort, overlooking the sapphire waters of Lake Como, or navigating the mist-kissed pine ridges of the Himalayas, lighting dictates emotion. High-end wedding cinematography requires an intimate dialogue with the sun’s trajectory.
            </p>

            <div className="my-6 p-6 bg-white border border-brand-sand rounded-xl shadow-sm space-y-3">
              <h3 className="font-forum text-lg text-brand-dark flex items-center gap-2">
                <Camera className="w-4 h-4 text-brand-gold" />
                <span>The Golden 45-Minute Window</span>
              </h3>
              <p className="font-cormorant text-base sm:text-lg text-brand-muted leading-relaxed">
                We strongly advise couples to set aside 45 uninterrupted minutes just before twilight. The soft, directional amber light wraps around embroidered silks and lehengas without harsh shadows, allowing us to compose fine-art frames worthy of heirloom museum prints.
              </p>
            </div>
          </section>

          {/* Featured YouTube Film Embed */}
          {article.youtubeId && (
            <section className="space-y-4 my-10">
              <div className="flex items-center gap-2 font-forum text-xs tracking-widest uppercase text-brand-muted">
                <Film className="w-4 h-4 text-brand-gold" />
                <span>Cinema Highlight by White Frog Productions</span>
              </div>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-brand-sand/60 bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${article.youtubeId}?rel=0&modestbranding=1`}
                  title={article.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <p className="font-cormorant text-sm text-brand-muted italic text-center">
                Watch how White Frog Productions weaves music, vow audio, and raw emotion into cinematic documentary heirlooms.
              </p>
            </section>
          )}

          {/* Section 3: Audio, Sound Design & Color Grading */}
          <section className="space-y-5">
            <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide">
              The Invisible Craft: 32-Bit Float Sound & Bespoke Color Grading
            </h2>
            <p className="font-cormorant text-lg sm:text-xl text-brand-dark/85 leading-relaxed font-light">
              What separates an ordinary wedding video from a transcendent piece of cinema is often what you hear rather than what you see. We deploy broadcast-grade wireless microphones and 32-bit float audio recorders to capture the whispering vows, emotional family toasts, and acoustic instruments without clipping or distortion.
            </p>
            <p className="font-cormorant text-lg sm:text-xl text-brand-dark/85 leading-relaxed font-light">
              In post-production, every single film undergoes bespoke color grading inside DaVinci Resolve. We eschew heavy synthetic orange-and-teal filters, opting instead for timeless 35mm film emulation that honors authentic skin tones, natural sky blues, and the true richness of traditional Indian bridal textiles.
            </p>
          </section>

          {/* Section 4: What Discerning Couples Must Verify */}
          <section className="space-y-5">
            <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide">
              Critical Checklist for Destination Couples
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-brand-sand rounded-xl space-y-2">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
                <h4 className="font-forum text-base text-brand-dark">Integrated Crew Synergy</h4>
                <p className="font-cormorant text-sm text-brand-muted">
                  Hiring separate photo and video teams often results in crew members stepping in front of each other’s lenses. A unified team guarantees harmony.
                </p>
              </div>
              <div className="p-5 bg-white border border-brand-sand rounded-xl space-y-2">
                <Award className="w-5 h-5 text-brand-gold" />
                <h4 className="font-forum text-base text-brand-dark">Dual Camera Redundancy</h4>
                <p className="font-cormorant text-sm text-brand-muted">
                  Every camera in our rig records to dual internal memory cards simultaneously, safeguarding once-in-a-lifetime rituals against digital loss.
                </p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions (FAQ) Section */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="space-y-6 pt-6 border-t border-brand-sand/60">
              <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {article.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white border border-brand-sand/70 rounded-xl space-y-2 shadow-sm"
                  >
                    <h3 className="font-forum text-lg text-brand-dark font-medium">
                      {faq.question}
                    </h3>
                    <p className="font-cormorant text-base sm:text-lg text-brand-muted leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio Box */}
          <div className="my-12 p-8 bg-[#f4efe8] border border-brand-sand/70 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-brand-sand shadow-sm">
              <Image
                src={cld("https://images-pw.pixieset.com/elementfield/mkmNRe/DSCF8554-e9909275-1000.jpg", 300)}
                alt="Madhavi Singh & Kunal Khanna"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <div className="space-y-1">
                <h3 className="font-forum text-xl text-brand-dark tracking-wide">
                  Madhavi Singh & Kunal Khanna
                </h3>
                <p className="text-xs uppercase tracking-widest text-brand-gold font-forum">
                  Founders & Creative Directors · White Frog Productions
                </p>
              </div>
              <p className="font-cormorant text-base text-brand-muted leading-relaxed">
                Pioneering fine-art destination wedding cinema for over a decade. Kunal and Madhavi have personally documented more than 500+ luxury celebrations across Rajasthan, Europe, Thailand, and worldwide, capturing life’s most vulnerable, radiant memories.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 font-forum text-xs tracking-widest uppercase text-brand-dark hover:text-brand-gold transition-colors pt-1"
              >
                Read Our Story <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Sticky Luxury Booking CTA */}
          <div className="bg-[#1f1e1c] text-white p-8 sm:p-12 rounded-2xl text-center space-y-6 shadow-2xl">
            <span className="text-xs uppercase tracking-widest text-[#d8c29d] font-forum">
              Calendar Availability 2026 – 2027
            </span>
            <h3 className="font-forum text-2xl sm:text-3xl md:text-4xl tracking-wide leading-tight">
              Let us preserve your love story as a timeless work of art.
            </h3>
            <p className="font-cormorant text-base sm:text-lg text-neutral-300 max-w-lg mx-auto italic font-light">
              Connect with Kunal & Madhavi to verify date availability, receive our private investment guide, and begin conceptualizing your wedding film.
            </p>
            <div>
              <Link
                href="/reserve-your-experience"
                className="inline-block px-8 py-3.5 bg-[#d8c29d] text-brand-dark rounded-full font-forum text-xs sm:text-sm tracking-widest uppercase hover:bg-white transition-colors font-medium shadow-md"
              >
                Reserve Your Experience
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-24 pt-16 border-t border-brand-sand/60">
            <div className="text-center space-y-2 mb-12">
              <p className="text-xs uppercase tracking-widest text-brand-muted font-forum">
                More From The Journal
              </p>
              <h2 className="font-forum text-3xl text-brand-dark tracking-wide">
                Related Articles & Wedding Guides
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.slug}
                  className="group bg-white rounded-xl border border-brand-sand/60 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <Link href={`/blog/${rel.slug}`} className="block relative h-48 w-full overflow-hidden">
                      <Image
                        src={cld(rel.coverImage, 600)}
                        alt={rel.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/90 text-brand-dark text-[10px] tracking-widest uppercase rounded-full">
                          {rel.category}
                        </span>
                      </div>
                    </Link>
                    <div className="p-6 space-y-2">
                      <p className="text-[11px] tracking-wider uppercase text-brand-muted font-forum">
                        {rel.readingTime}
                      </p>
                      <Link href={`/blog/${rel.slug}`}>
                        <h3 className="font-forum text-lg text-brand-dark leading-snug group-hover:text-brand-gold transition-colors line-clamp-2">
                          {rel.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex justify-end">
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="inline-flex items-center gap-1 font-forum text-xs tracking-widest uppercase text-brand-dark group-hover:translate-x-1 transition-transform"
                    >
                      Read Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
