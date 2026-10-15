"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { SEOArticle, ARTICLE_CATEGORIES } from "@/data/seoArticles";
import { cld } from "@/lib/cloudinary";

interface BlogClientProps {
  articles: SEOArticle[];
}

export default function BlogClient({ articles }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 15;

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.description.toLowerCase().includes(q) ||
        (article.location && article.location.toLowerCase().includes(q)) ||
        article.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [articles, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const currentArticles = useMemo(() => {
    const start = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(start, start + articlesPerPage);
  }, [filteredArticles, currentPage]);

  const featured = articles.find((a) => a.featured) || articles[0];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-brand-dark pt-32 pb-24">
      {/* Hero Header */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-sand/30 rounded-full border border-brand-sand/50 text-xs tracking-widest uppercase text-brand-muted">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>The White Frog Journal</span>
        </div>
        <h1 className="font-forum text-4xl sm:text-5xl md:text-6xl tracking-wide text-brand-dark">
          Luxury Wedding Cinema & Stories
        </h1>
        <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-brand-muted max-w-2xl mx-auto italic font-light">
          A curated collection of destination guides, venue insights, and documentary filmmaking secrets by Kunal Khanna & Madhavi Singh.
        </p>
      </div>

      {/* Featured Hero Article (shown only on page 1 when no search query) */}
      {!searchQuery && selectedCategory === "All" && currentPage === 1 && featured && (
        <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-20">
          <div className="relative group bg-white border border-brand-sand/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[450px] overflow-hidden">
                <Image
                  src={cld(featured.coverImage, 1200)}
                  alt={featured.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs tracking-wider uppercase rounded-full">
                    Featured Story
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-brand-muted">
                    <span>{featured.category}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featured.readingTime}
                    </span>
                  </div>
                  <Link href={`/blog/${featured.slug}`}>
                    <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark leading-snug hover:text-brand-gold transition-colors">
                      {featured.title}
                    </h2>
                  </Link>
                  <p className="font-cormorant text-base sm:text-lg text-brand-muted leading-relaxed line-clamp-4">
                    {featured.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-brand-sand/40 flex items-center justify-between">
                  <span className="text-xs tracking-wider text-brand-muted font-forum">
                    By Kunal Khanna & Madhavi Singh
                  </span>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 font-forum text-xs tracking-widest uppercase text-brand-dark hover:text-brand-gold transition-colors"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-12">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search destinations, venues, or wedding advice..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-brand-sand/60 rounded-full font-cormorant text-base text-brand-dark placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-dark transition-colors"
            />
          </div>

          {/* Results count */}
          <div className="text-xs tracking-widest uppercase text-brand-muted font-forum">
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {ARTICLE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-brand-dark text-white shadow-sm"
                    : "bg-white text-brand-dark/80 border border-brand-sand/60 hover:border-brand-dark"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {currentArticles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-brand-sand/40">
            <p className="font-forum text-2xl text-brand-dark">No articles found</p>
            <p className="font-cormorant text-brand-muted mt-2">
              Try adjusting your search query or choosing another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 px-6 py-2.5 bg-brand-dark text-white rounded-full font-forum text-xs tracking-widest uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArticles.map((article) => (
              <article
                key={article.slug}
                className="group bg-white rounded-xl border border-brand-sand/60 overflow-hidden flex flex-col justify-between hover:border-brand-dark/30 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <Link href={`/blog/${article.slug}`} className="block relative h-56 w-full overflow-hidden">
                    <Image
                      src={cld(article.coverImage, 600)}
                      alt={article.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-brand-dark text-[10px] tracking-widest uppercase rounded-full font-medium">
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] tracking-wider uppercase text-brand-muted">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readingTime}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                    </div>

                    <Link href={`/blog/${article.slug}`}>
                      <h3 className="font-forum text-xl text-brand-dark leading-snug group-hover:text-brand-gold transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="font-cormorant text-sm sm:text-base text-brand-muted line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-brand-sand/30 flex items-center justify-between text-xs tracking-wider uppercase font-forum text-brand-muted group-hover:text-brand-dark">
                  <span>{article.location || "White Frog Studio"}</span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-brand-dark group-hover:translate-x-1 transition-transform"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-brand-sand/60 rounded-full font-forum text-xs tracking-widest uppercase disabled:opacity-40 hover:bg-brand-sand/20 transition-colors"
            >
              Previous
            </button>

            <span className="font-forum text-xs tracking-widest uppercase px-4 text-brand-muted">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-brand-sand/60 rounded-full font-forum text-xs tracking-widest uppercase disabled:opacity-40 hover:bg-brand-sand/20 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Editorial Bottom CTA */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mt-24">
        <div className="bg-[#242424] text-white p-8 sm:p-14 rounded-2xl text-center space-y-6 shadow-xl">
          <p className="text-xs uppercase tracking-widest text-[#d8c29d] font-forum">
            Handcrafted For Discerning Couples
          </p>
          <h2 className="font-forum text-3xl sm:text-4xl md:text-5xl tracking-wide leading-tight">
            Ready to immortalize your wedding as a cinematic heirloom?
          </h2>
          <p className="font-cormorant text-lg sm:text-xl text-neutral-300 max-w-xl mx-auto italic font-light">
            We accept a limited number of destination weddings each season to guarantee deep creative focus and bespoke post-production.
          </p>
          <div className="pt-2">
            <Link
              href="/reserve-your-experience"
              className="inline-block px-8 py-3.5 bg-[#d8c29d] text-brand-dark rounded-full font-forum text-xs sm:text-sm tracking-widest uppercase hover:bg-white transition-colors"
            >
              Reserve Your Experience
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
