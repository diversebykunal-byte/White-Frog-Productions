"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ExternalLink, ChevronRight, Briefcase, Award, MapPin, Sparkles, PhoneCall, Layers, ShieldCheck } from "lucide-react";
import VideoModal from "@/components/VideoModal";

type CategoryTab =
  | "All"
  | "Brand Films & Commercials"
  | "Government & PSUs"
  | "MICE & Global Summits"
  | "Industrial & Manufacturing"
  | "Hospitality & Aerial"
  | "Commercial Campaigns & Headshots";

interface CorporateProject {
  client: string;
  title: string;
  category: CategoryTab;
  type: "youtube" | "vimeo" | "external";
  videoId?: string;
  externalUrl?: string;
  coverImage: string;
  badge?: string;
}

const CATEGORIES: CategoryTab[] = [
  "All",
  "Brand Films & Commercials",
  "Government & PSUs",
  "MICE & Global Summits",
  "Industrial & Manufacturing",
  "Hospitality & Aerial",
  "Commercial Campaigns & Headshots",
];

const CORPORATE_PROJECTS: CorporateProject[] = [
  // --- Brand Films & Commercials ---
  {
    client: "PORSCHE",
    title: "Brand Film",
    category: "Brand Films & Commercials",
    type: "external",
    externalUrl: "https://drive.google.com/file/d/1s3Vd7o7Ct6ILPuKaiDpMo8ibMDzA2x_b/view",
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Cinema Master",
  },
  {
    client: "REEBOK",
    title: "Zoku Brand Launch Film",
    category: "Brand Films & Commercials",
    type: "youtube",
    videoId: "xDCrBPbjze8",
    coverImage: "https://img.youtube.com/vi/xDCrBPbjze8/hqdefault.jpg",
  },
  {
    client: "UJALA BRAND AV",
    title: "Featuring 'The Great Khali'",
    category: "Brand Films & Commercials",
    type: "youtube",
    videoId: "XjZ0FaY7Kms",
    coverImage: "https://img.youtube.com/vi/XjZ0FaY7Kms/hqdefault.jpg",
  },
  {
    client: "KAJARIA CERAMICS",
    title: "Brand Commercial AV",
    category: "Brand Films & Commercials",
    type: "youtube",
    videoId: "ukT3G8TiT9E",
    coverImage: "https://img.youtube.com/vi/ukT3G8TiT9E/hqdefault.jpg",
  },
  {
    client: "WORLDS OF WONDER",
    title: "Brand Commercial Film",
    category: "Brand Films & Commercials",
    type: "youtube",
    videoId: "w4-ixVkJhbs",
    coverImage: "https://img.youtube.com/vi/w4-ixVkJhbs/hqdefault.jpg",
  },
  {
    client: "DUCATI OFFICIAL CLUB",
    title: "Launch Event Film",
    category: "Brand Films & Commercials",
    type: "youtube",
    videoId: "MZLJI48_r-o",
    coverImage: "https://img.youtube.com/vi/MZLJI48_r-o/hqdefault.jpg",
  },
  {
    client: "PANASONIC LUMIX",
    title: "Lumix S1R Brand Film",
    category: "Brand Films & Commercials",
    type: "youtube",
    videoId: "773TXYifAns",
    coverImage: "https://img.youtube.com/vi/773TXYifAns/hqdefault.jpg",
  },
  {
    client: "TARUN TAHILIANI & OBEETEE",
    title: "Luxury Collection Launch",
    category: "Brand Films & Commercials",
    type: "youtube",
    videoId: "sxXB7OjoF1I",
    coverImage: "https://img.youtube.com/vi/sxXB7OjoF1I/hqdefault.jpg",
  },
  {
    client: "DIACOLOR",
    title: "Fine Jewellery Brand Film",
    category: "Brand Films & Commercials",
    type: "youtube",
    videoId: "DWVIfSQIoNM",
    coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  },

  // --- Government & PSUs ---
  {
    client: "INCOME TAX INDIA",
    title: "Annual Film",
    category: "Government & PSUs",
    type: "youtube",
    videoId: "kL4Noppj1rY",
    coverImage: "https://img.youtube.com/vi/kL4Noppj1rY/hqdefault.jpg",
  },
  {
    client: "C-DOT (TELECOM)",
    title: "XGS-PON High-Speed Optical Project",
    category: "Government & PSUs",
    type: "youtube",
    videoId: "P72Yb1wkJRA",
    coverImage: "https://img.youtube.com/vi/P72Yb1wkJRA/hqdefault.jpg",
  },
  {
    client: "C-DOT (TELECOM)",
    title: "DWDM Optical Network Project",
    category: "Government & PSUs",
    type: "youtube",
    videoId: "kL4Noppj1rY",
    coverImage: "https://img.youtube.com/vi/kL4Noppj1rY/hqdefault.jpg",
  },
  {
    client: "C-DOT (TELECOM)",
    title: "Solar Power Green Initiative",
    category: "Government & PSUs",
    type: "youtube",
    videoId: "piPQQ5K2t5U",
    coverImage: "https://img.youtube.com/vi/piPQQ5K2t5U/hqdefault.jpg",
  },

  // --- MICE & Global Summits ---
  {
    client: "MILT CONGRESS 2018",
    title: "Official Summit Teaser",
    category: "MICE & Global Summits",
    type: "youtube",
    videoId: "uLcsfn57IL8",
    coverImage: "https://img.youtube.com/vi/uLcsfn57IL8/hqdefault.jpg",
  },
  {
    client: "MILT CONGRESS 2018",
    title: "Official 7-Minute Summit Film",
    category: "MICE & Global Summits",
    type: "youtube",
    videoId: "SqI3hj1S338",
    coverImage: "https://img.youtube.com/vi/SqI3hj1S338/hqdefault.jpg",
  },
  {
    client: "UTI MUTUAL FUNDS",
    title: "Paris International Summit (Film)",
    category: "MICE & Global Summits",
    type: "external",
    externalUrl: "https://drive.google.com/file/d/1azZoybtlqGPDVx9ENS5MIGgjknNLk3Dj/view?usp=sharing",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Video Master",
  },
  {
    client: "UTI MUTUAL FUNDS",
    title: "Paris International Summit (Photos)",
    category: "MICE & Global Summits",
    type: "external",
    externalUrl: "https://drive.google.com/drive/folders/1-L8giohouH5vU9RimJHkpelQGdHLex3B?usp=sharing",
    coverImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Gallery",
  },
  {
    client: "UTI MUTUAL FUNDS",
    title: "Israel International Delegation",
    category: "MICE & Global Summits",
    type: "external",
    externalUrl: "https://drive.google.com/a/whitefrogproductions.org/file/d/0B8I2GSk8uTYbVHhQbVU3UGxQTk0/view?usp=drive_web",
    coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Archive",
  },
  {
    client: "NETWORK 18",
    title: "Uzbekistan International Summit AV",
    category: "MICE & Global Summits",
    type: "external",
    externalUrl: "https://drive.google.com/a/whitefrogproductions.org/file/d/0B8I2GSk8uTYbVEJZSVpnbjhhUHM/view?usp=drive_web",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Archive",
  },
  {
    client: "FRENCH EMBASSY",
    title: "European Cheese Summit Event",
    category: "MICE & Global Summits",
    type: "vimeo",
    videoId: "153960571",
    coverImage: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    client: "FRENCH EMBASSY",
    title: "Grand Prix Gala Event",
    category: "MICE & Global Summits",
    type: "external",
    externalUrl: "https://drive.google.com/drive/u/3/folders/1ex5M9DwS_1tZESbe8gXCbis1ROdXpseL",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Gallery",
  },
  {
    client: "FRENCH EMBASSY",
    title: "La French Tech Summit",
    category: "MICE & Global Summits",
    type: "external",
    externalUrl: "https://drive.google.com/file/d/1bBOck6lmU1GxDSggWkJLcPvzjsh42OyU/view?usp=sharing",
    coverImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Master",
  },
  {
    client: "LADAKH EXPEDITION",
    title: "Corporate Travelogue Film",
    category: "MICE & Global Summits",
    type: "youtube",
    videoId: "MGNk6_8PSzg",
    coverImage: "https://img.youtube.com/vi/MGNk6_8PSzg/hqdefault.jpg",
  },
  {
    client: "ISRAEL EXPEDITION",
    title: "Corporate Travelogue Film",
    category: "MICE & Global Summits",
    type: "youtube",
    videoId: "YaCJZ1O4_qA",
    coverImage: "https://img.youtube.com/vi/YaCJZ1O4_qA/hqdefault.jpg",
  },

  // --- Industrial & Manufacturing ---
  {
    client: "RECKITT BENCKISER",
    title: "Plant & Manufacturing Film",
    category: "Industrial & Manufacturing",
    type: "external",
    externalUrl: "https://1drv.ms/v/s!AhyLF0gWQPtsgfU3qiGXqxHmxIFK9Q?e=YO2BHv",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    badge: "OneDrive Video Master",
  },
  {
    client: "ROTO PUMPS",
    title: "Heavy Engineering & Manufacturing AV",
    category: "Industrial & Manufacturing",
    type: "external",
    externalUrl: "https://drive.google.com/file/d/1Ae_eaaVzMnKd3AVt4Ap_5l4uYPDq4wNq/view?usp=drivesdk",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Video Master",
  },
  {
    client: "GEM ENGINEERING",
    title: "Industrial Plant & Machinery AV",
    category: "Industrial & Manufacturing",
    type: "external",
    externalUrl: "https://drive.google.com/file/d/1nogtLttjDFP0yvcaoH9E2vUnPZv8PkWA/view?usp=drivesdk",
    coverImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Video Master",
  },
  {
    client: "PHANTOM DC",
    title: "Hyperscale Data Center Infrastructure",
    category: "Industrial & Manufacturing",
    type: "external",
    externalUrl: "https://drive.google.com/file/d/1FLeTTez36jxPxApKEsjonrL69ciL-TZ8/view?usp=drivesdk",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Video Master",
  },

  // --- Hospitality, Food & Aerials ---
  {
    client: "JW MARRIOTT",
    title: "Tunday Kabab Food Festival",
    category: "Hospitality & Aerial",
    type: "youtube",
    videoId: "KsvwPe73VQw",
    coverImage: "https://img.youtube.com/vi/KsvwPe73VQw/hqdefault.jpg",
  },
  {
    client: "FOOD CINEMATOGRAPHY",
    title: "Commercial Food Photography",
    category: "Hospitality & Aerial",
    type: "external",
    externalUrl: "https://drive.google.com/drive/folders/1N88X9qWPmqhniFG1GgRUduU6Ct2_J4Ot?usp=sharing",
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Gallery",
  },
  {
    client: "MANGO TREE RESORT",
    title: "Luxury Hospitality Photoshoot",
    category: "Hospitality & Aerial",
    type: "external",
    externalUrl: "https://1drv.ms/u/s!AhyLF0gWQPtsgZcrByvk2rkByVRuiQ?e=L2hc8V",
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    badge: "OneDrive Gallery",
  },
  {
    client: "SAMODE PALACE",
    title: "Cinematic Aerial Architecture",
    category: "Hospitality & Aerial",
    type: "vimeo",
    videoId: "131757127",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  },
  {
    client: "BHANWAR SINGH PALACE",
    title: "Cinematic Aerial Architecture",
    category: "Hospitality & Aerial",
    type: "vimeo",
    videoId: "131909015",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },

  // --- Commercial Campaigns & Headshots ---
  {
    client: "VEET (BALI CAMPAIGN)",
    title: "Featuring Shraddha Kapoor",
    category: "Commercial Campaigns & Headshots",
    type: "external",
    externalUrl: "https://drive.google.com/drive/folders/0B7EIuFDicfOpeVlIQ0ZYaDR1Zms?usp=sharing",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Campaign Master",
  },
  {
    client: "COX & KINGS",
    title: "Lifestyle Campaign · Shot in Kullu",
    category: "Commercial Campaigns & Headshots",
    type: "external",
    externalUrl: "https://drive.google.com/drive/folders/1bbqbG_yUOIOmw7rxIUJhxJL08FBLEHoZ?usp=sharing",
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Gallery",
  },
  {
    client: "GANGA WOOLS",
    title: "Commercial Textile Photoshoot",
    category: "Commercial Campaigns & Headshots",
    type: "external",
    externalUrl: "https://drive.google.com/drive/folders/1sG9_zG-FOl4HAJnARpewl16tcoBMo7tW?usp=sharing",
    coverImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Gallery",
  },
  {
    client: "NIKON SCHOOL",
    title: "D-SLR Masterclass Tutorials Series",
    category: "Commercial Campaigns & Headshots",
    type: "youtube",
    videoId: "2gQVXesteCw",
    coverImage: "https://img.youtube.com/vi/2gQVXesteCw/hqdefault.jpg",
  },
  {
    client: "EXECUTIVE PORTRAITURE",
    title: "Corporate C-Suite Headshots",
    category: "Commercial Campaigns & Headshots",
    type: "external",
    externalUrl: "https://drive.google.com/drive/u/3/folders/1xeHGgNFSitEa-lQL71EEnitqIRUAxflR",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    badge: "Drive Gallery",
  },
];

const FEATURED_CORPORATE_HUBS = [
  { name: "Gurgaon Cyber City", slug: "corporate-film-makers-gurgaon-cyber-city" },
  { name: "Manesar IMT Industrial", slug: "factory-video-production-manesar-imt-manesar" },
  { name: "Delhi Aerocity MICE", slug: "mice-event-videography-delhi-aerocity" },
  { name: "Noida Expressway Tech", slug: "corporate-film-makers-noida-sector-125-expressway" },
  { name: "Mumbai BKC Financial", slug: "corporate-headshot-photographer-mumbai-bandra-kurla-complex-bkc" },
  { name: "Bangalore Whitefield IT", slug: "corporate-film-makers-bangalore-whitefield" },
  { name: "Pune Chakan Auto Belt", slug: "factory-video-production-pune-chakan-industrial-corridor" },
  { name: "Ahmedabad Sanand GIDC", slug: "factory-video-production-ahmedabad-sanand-gidc" },
];

export default function CorporatePage() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("All");
  const [activeVideo, setActiveVideo] = useState<{
    id: string;
    type: "youtube" | "vimeo";
    title: string;
  } | null>(null);

  const filteredProjects =
    activeTab === "All"
      ? CORPORATE_PROJECTS
      : CORPORATE_PROJECTS.filter((p) => p.category === activeTab);

  const handleCardClick = (project: CorporateProject) => {
    if (project.type === "youtube" && project.videoId) {
      setActiveVideo({
        id: project.videoId,
        type: "youtube",
        title: `${project.client} · ${project.title}`,
      });
    } else if (project.type === "vimeo" && project.videoId) {
      setActiveVideo({
        id: project.videoId,
        type: "vimeo",
        title: `${project.client} · ${project.title}`,
      });
    } else if (project.externalUrl) {
      window.open(project.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-white min-h-screen text-brand-dark pb-24">
      {/* 1. Header Banner */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 pt-12 sm:pt-20 pb-12 text-center space-y-4">
        <span className="text-xs font-forum tracking-[0.3em] uppercase text-brand-gold block">
          Enterprise Cinematography & Commercial Visuals
        </span>
        <h1 className="font-forum text-4xl sm:text-6xl text-brand-dark tracking-wide uppercase">
          Corporate Films & Campaigns
        </h1>
        <p className="font-cormorant text-lg sm:text-xl text-brand-muted max-w-3xl mx-auto font-light leading-relaxed">
          Founded in 2014, White Frog Productions pioneered cinematic brand films and corporate documentaries across India—partnering with Fortune 500 leaders, government institutions, and global brands before bringing that same masterclass storytelling to worldwide destination cinema.
        </p>
      </section>

      {/* 2. Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 mb-12">
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 py-2 border-b border-brand-sand/60">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-forum tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                activeTab === cat
                  ? "bg-brand-dark text-white shadow-sm"
                  : "bg-brand-cream/60 text-brand-muted hover:text-brand-dark hover:bg-brand-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Grid of Filtered Corporate Projects */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {filteredProjects.map((proj, idx) => (
            <div
              key={`${proj.client}-${proj.title}-${idx}`}
              onClick={() => handleCardClick(proj)}
              className="group cursor-pointer space-y-4 flex flex-col"
            >
              <div className="editorial-card relative aspect-video bg-brand-cream overflow-hidden shadow-sm rounded-lg border border-brand-sand/40">
                <Image
                  src={proj.coverImage}
                  alt={`${proj.client} · ${proj.title}`}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                />

                {/* Badge Overlay */}
                {proj.badge && (
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-forum tracking-wider uppercase text-white/90 flex items-center gap-1 border border-white/20">
                    <ExternalLink className="w-3 h-3 text-brand-gold" />
                    <span>{proj.badge}</span>
                  </div>
                )}

                {/* Hover Play / Open Overlay */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white text-brand-dark flex items-center justify-center pl-0.5 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    {proj.type === "external" ? (
                      <ExternalLink className="w-5 h-5 text-brand-dark" />
                    ) : (
                      <Play className="w-5 h-5 fill-brand-dark" />
                    )}
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 text-[10px] font-forum tracking-widest uppercase bg-black/60 backdrop-blur-xs text-white/85 px-2 py-0.5 rounded">
                  {proj.category}
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide uppercase group-hover:text-brand-gold transition-colors">
                  {proj.client}
                </h3>
                <span className="text-xs tracking-[0.2em] uppercase text-brand-muted font-sans block">
                  {proj.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Enterprise Client Roster Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-24 pt-16 border-t border-brand-sand/60 text-center space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-forum tracking-[0.25em] uppercase text-brand-gold block">
            Institutional Trust
          </span>
          <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide uppercase">
            Commissioned By Global & National Leaders
          </h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-brand-dark/75">
          {[
            "Porsche",
            "Reckitt Benckiser",
            "Income Tax India",
            "C-DOT",
            "French Embassy",
            "JW Marriott",
            "Reebok",
            "UTI Mutual Funds",
            "Kajaria",
            "Panasonic Lumix",
            "Roto Pumps",
            "Veet",
            "Tarun Tahiliani",
            "Worlds of Wonder",
          ].map((client, i) => (
            <div
              key={i}
              className="px-5 py-2.5 rounded-lg bg-brand-cream/50 border border-brand-sand/70 font-forum text-sm sm:text-base tracking-wider uppercase"
            >
              {client}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Programmatic Corporate SEO Hubs Directory */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-20 pt-16 border-t border-brand-sand/60 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-forum tracking-[0.25em] uppercase text-brand-gold block">
              Pan-India Capabilities
            </span>
            <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide uppercase">
              Corporate Video Production Hubs
            </h2>
          </div>
          <Link
            href="/reserve-your-experience"
            className="text-xs font-forum tracking-widest uppercase text-brand-gold hover:text-brand-dark transition-colors inline-flex items-center gap-1.5"
          >
            <span>Request Showreel & Rate Card</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {FEATURED_CORPORATE_HUBS.map((hub, idx) => (
            <Link
              key={idx}
              href={`/corporate/${hub.slug}`}
              className="p-4 rounded-xl bg-[#faf8f5] border border-brand-sand/60 hover:border-brand-gold transition-all group space-y-1 block"
            >
              <div className="flex items-center gap-1.5 text-brand-gold">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[11px] font-forum tracking-wider uppercase text-brand-muted group-hover:text-brand-dark">
                  Corporate Hub
                </span>
              </div>
              <h4 className="font-forum text-sm sm:text-base text-brand-dark group-hover:text-brand-gold transition-colors font-medium">
                {hub.name}
              </h4>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Bottom Navigation Feature Links (About Us, Contact, Testimonials) */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 pt-24 pb-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center border-t border-brand-sand/60 mt-20">
        <div className="space-y-2">
          <Link href="/about" className="group">
            <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase group-hover:underline">
              About Us
            </h3>
            <p className="font-cormorant text-sm text-brand-muted">Get to know our pedigree</p>
          </Link>
        </div>

        <div className="space-y-2">
          <Link href="/reserve-your-experience" className="group">
            <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase group-hover:underline">
              Contact Desk
            </h3>
            <p className="font-cormorant text-sm text-brand-muted">Inquire for enterprise RFPs</p>
          </Link>
        </div>

        <div className="space-y-2">
          <Link href="/about" className="group">
            <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase group-hover:underline">
              Testimonials
            </h3>
            <p className="font-cormorant text-sm text-brand-muted">Words from our corporate clients</p>
          </Link>
        </div>
      </section>

      {/* Video Modal Player (Supports YouTube & Vimeo) */}
      <VideoModal
        videoId={activeVideo?.id || null}
        videoType={activeVideo?.type}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
