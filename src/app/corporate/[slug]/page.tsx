import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
  Award,
  Video,
  Play,
  Briefcase,
  MapPin,
  Clock,
  PhoneCall,
  Download,
} from "lucide-react";
import {
  CORPORATE_ARTICLES,
  getCorporateArticleBySlug,
  getRelatedCorporateArticles,
  CorporateArticle,
} from "@/data/corporateSeoArticles";
import VideoModal from "@/components/VideoModal";
import CorporateVideoPlayer from "./CorporateVideoPlayer";

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all 330 programmatic corporate pages
export async function generateStaticParams() {
  return CORPORATE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getCorporateArticleBySlug(params.slug);
  if (!article) return {};

  const url = `https://www.whitefrogproductions.com/corporate/${article.slug}`;

  return {
    title: `${article.title}`,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url,
      siteName: "White Frog Productions",
      type: "article",
      publishedTime: article.date,
      authors: ["White Frog Productions Corporate Unit"],
      images: [
        {
          url: article.coverImage,
          width: 1600,
          height: 900,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [article.coverImage],
    },
  };
}

export default function CorporateArticlePage({ params }: PageProps) {
  const article = getCorporateArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedCorporateArticles(article.slug, 4);

  // Structured Data Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: [article.coverImage],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "White Frog Productions",
      url: "https://www.whitefrogproductions.com/corporate",
    },
    publisher: {
      "@type": "Organization",
      name: "White Frog Productions",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/lyoxtgem/image/upload/v1792099306/whitefrog/brand/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.whitefrogproductions.com/corporate/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
  };

  const faqSchema = {
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
  };

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
        name: "Corporate",
        item: "https://www.whitefrogproductions.com/corporate",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${article.city} (${article.hub})`,
        item: `https://www.whitefrogproductions.com/corporate/${article.slug}`,
      },
    ],
  };

  const videoSchema = article.videoId
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${article.title} · Showreel`,
        description: article.metaDescription,
        thumbnailUrl: [article.coverImage],
        uploadDate: `${article.date}T08:00:00+05:30`,
        contentUrl:
          article.videoType === "vimeo"
            ? `https://vimeo.com/${article.videoId}`
            : `https://www.youtube.com/watch?v=${article.videoId}`,
        embedUrl:
          article.videoType === "vimeo"
            ? `https://player.vimeo.com/video/${article.videoId}`
            : `https://www.youtube.com/embed/${article.videoId}`,
        publisher: {
          "@type": "Organization",
          name: "White Frog Productions",
          logo: {
            "@type": "ImageObject",
            url: "https://res.cloudinary.com/lyoxtgem/image/upload/v1792099306/whitefrog/brand/logo.png",
          },
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      <article className="min-h-screen bg-[#faf8f5] text-brand-dark pt-28 pb-24">
        {/* Breadcrumb Navigation */}
        <nav className="max-w-5xl mx-auto px-6 sm:px-8 py-4 mb-2">
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
              <Link href="/corporate" className="hover:text-brand-dark transition-colors">
                Corporate
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-brand-sand" />
            </li>
            <li className="text-brand-dark font-medium truncate max-w-[200px] sm:max-w-none">
              {article.service} · {article.city}
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="max-w-5xl mx-auto px-6 sm:px-8 pt-4 pb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/15 text-brand-dark font-forum text-xs tracking-widest uppercase rounded-full border border-brand-gold/30">
              <Briefcase className="w-3.5 h-3.5 text-brand-gold" />
              {article.service}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-brand-muted font-forum text-xs tracking-wider uppercase rounded-full border border-brand-sand">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              {article.hub}, {article.city}
            </span>
            <span className="text-xs text-brand-muted font-forum tracking-wider uppercase">
              {article.readingTime}
            </span>
          </div>

          <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl text-brand-dark leading-[1.15] tracking-tight">
            {article.headline}
          </h1>

          <p className="font-cormorant text-xl sm:text-2xl text-brand-dark/80 leading-relaxed font-light max-w-4xl">
            {article.metaDescription}
          </p>
        </header>

        {/* Hero Media / Client Video Showcase */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 mb-16">
          <CorporateVideoPlayer
            coverImage={article.coverImage}
            title={article.title}
            videoType={article.videoType}
            videoId={article.videoId}
          />
        </div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-16">
          {/* Key Deliverables & Scope of Work */}
          <section className="bg-white border border-brand-sand/80 p-8 sm:p-10 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center gap-3 font-forum text-lg tracking-wide uppercase text-brand-dark border-b border-brand-sand/60 pb-4">
              <Sparkles className="w-5 h-5 text-brand-gold" />
              <span>Scope of Work & Technical Deliverables</span>
            </div>
            <ul className="space-y-4 font-cormorant text-lg sm:text-xl text-brand-dark/90 leading-relaxed">
              {article.keyDeliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Localized Industrial Context */}
          <section className="space-y-5">
            <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide">
              Production Capabilities Across {article.hub} & {article.city}
            </h2>
            <p className="font-cormorant text-lg sm:text-xl text-brand-dark/85 leading-relaxed font-light">
              White Frog Productions operates as a high-tier corporate cinematography and visual production partner across {article.city}, regularly serving enterprise enterprises located around {article.landmark}. Our crews are equipped for fast on-site mobilization with zero interruption to your enterprise workflows.
            </p>
            <p className="font-cormorant text-lg sm:text-xl text-brand-dark/85 leading-relaxed font-light">
              Whether orchestrating multi-camera keynote coverage, documenting high-security industrial robotics in manufacturing facilities, or composing bespoke C-suite executive portraits, our productions adhere to rigorous safety protocols, strict NDAs, and international cinema grading benchmarks.
            </p>
          </section>

          {/* Cinema Equipment & Technology Stack */}
          <section className="bg-[#f4efe8] p-8 sm:p-10 rounded-2xl border border-brand-sand space-y-6">
            <div className="flex items-center gap-3 font-forum text-lg tracking-wide uppercase text-brand-dark border-b border-brand-sand pb-4">
              <Layers className="w-5 h-5 text-brand-gold" />
              <span>Enterprise Equipment & Production Standards</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.equipmentStack.map((gear, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-brand-sand/60 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span className="font-forum text-sm tracking-wide text-brand-dark">{gear}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Trusted Corporate Client Roster */}
          <section className="space-y-6 text-center border-t border-b border-brand-sand/60 py-12">
            <div className="flex items-center justify-center gap-2 font-forum text-xs tracking-[0.25em] uppercase text-brand-muted">
              <Award className="w-4 h-4 text-brand-gold" />
              <span>Trusted By Industry Leaders & Government Institutions</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 pt-2">
              {article.clientShowcase.map((client, idx) => (
                <span
                  key={idx}
                  className="font-forum text-base sm:text-lg tracking-wider text-brand-dark/80 bg-white px-5 py-2 rounded-full border border-brand-sand shadow-xs"
                >
                  {client}
                </span>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-forum tracking-[0.25em] uppercase text-brand-gold block">
                Enterprise Guidelines
              </span>
              <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide">
                Frequently Asked Questions ({article.city})
              </h2>
            </div>
            <div className="space-y-5">
              {article.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-brand-sand/70 p-6 sm:p-8 rounded-xl shadow-xs space-y-3"
                >
                  <h3 className="font-forum text-lg sm:text-xl text-brand-dark flex items-start gap-3">
                    <span className="text-brand-gold font-bold">Q{idx + 1}.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="font-cormorant text-base sm:text-lg text-brand-muted leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* B2B Call to Action */}
          <section className="bg-brand-dark text-white p-8 sm:p-12 rounded-2xl shadow-xl text-center space-y-6">
            <span className="font-forum text-xs tracking-[0.3em] uppercase text-brand-gold block">
              Inquire For Production
            </span>
            <h2 className="font-forum text-2xl sm:text-4xl text-white tracking-wide">
              Commission {article.service} in {article.city}
            </h2>
            <p className="font-cormorant text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Contact our executive production desk to request our full corporate showreel, technical rate card, or schedule an on-site technical inspection in {article.hub === "City-Wide Operations" ? article.city : `${article.hub}, ${article.city}`}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/reserve-your-experience"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-gold text-brand-dark font-forum text-sm tracking-widest uppercase rounded hover:bg-white transition-all shadow-md"
              >
                <span>Request Corporate Reel & Rate Card</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/919899263434?text=${encodeURIComponent(
                  `Hello White Frog Productions, we are inquiring about corporate production services in ${article.city}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-forum text-sm tracking-widest uppercase rounded transition-all border border-white/20"
              >
                <PhoneCall className="w-4 h-4 text-brand-gold" />
                <span>Direct WhatsApp Inquiries</span>
              </a>
            </div>
          </section>

          {/* Related Regional Services */}
          {relatedArticles.length > 0 && (
            <section className="space-y-6 pt-10 border-t border-brand-sand/60">
              <h3 className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide">
                Explore More Corporate Production Hubs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((rel, idx) => (
                  <Link
                    key={idx}
                    href={`/corporate/${rel.slug}`}
                    className="group bg-white p-6 rounded-xl border border-brand-sand hover:border-brand-gold/60 transition-all shadow-xs space-y-2"
                  >
                    <span className="text-[11px] font-forum tracking-widest uppercase text-brand-gold block">
                      {rel.service} · {rel.city}
                    </span>
                    <h4 className="font-forum text-lg text-brand-dark group-hover:text-brand-gold transition-colors leading-snug">
                      {rel.headline}
                    </h4>
                    <p className="font-cormorant text-sm text-brand-muted line-clamp-2">
                      {rel.metaDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
