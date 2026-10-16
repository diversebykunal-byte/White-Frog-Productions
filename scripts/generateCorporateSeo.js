const fs = require('fs');
const path = require('path');

const SERVICES = [
  {
    name: "Factory & Industrial Video Production",
    shortName: "Industrial & Factory Filming",
    slugPrefix: "factory-video-production",
    serviceSlug: "industrial-factory",
    heroHeading: "Plant Walkthroughs, Safety Induction & Manufacturing Process Films",
    defaultVideo: { type: "youtube", id: "kL4Noppj1rY" },
    coverImages: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "Cinematic 4K/6K plant & machinery walkthroughs capturing automation and scale",
      "OSHA & ISO compliant multilingual safety induction training modules",
      "High-speed macro cinematography highlighting precision CNC tolerances and robotics",
      "B2B investor & global export marketing reels optimized for trade expos",
      "Licensed DGCA internal/external drone aerial mapping of industrial acreage"
    ],
    equipment: ["Sony FX6 & FX3 Cinema Cameras", "G Master Cine Primes", "DJI Ronin 4D 4-Axis Gimbal", "Aputure 600d & Nova Soft Panels", "Sennheiser Wireless Audio Systems"],
    clients: ["Reckitt Benckiser", "Roto Pumps", "Phantom Data Centers", "C-DOT", "GEM Engineering"],
    faqTemplates: (hub, city) => [
      {
        question: `How does White Frog manage safety compliance when filming inside operational manufacturing plants in ${hub}?`,
        answer: `Our cinema crew is fully trained in industrial site safety protocols. We arrive with certified PPE (steel-toe boots, hardhats, high-visibility vests, safety goggles, and fire-retardant gear). We coordinate directly with your EHS (Environment, Health & Safety) team to conduct pre-shoot hazard assessments without halting production lines.`
      },
      {
        question: `Can you film proprietary manufacturing processes under strict NDA in ${city}?`,
        answer: `Yes. Over 70% of our industrial clientele—including Fortune 500 multinationals and defence suppliers—require strict NDAs. All footage is captured onto encrypted SSDs, processed in air-gapped edit suites, and no clips are shared without corporate communications signoff.`
      },
      {
        question: `What is the typical turnaround time for an industrial corporate video project in ${city}?`,
        answer: `Production typically spans 1 to 3 shoot days depending on floor area. We deliver a director's first rough cut within 7 to 10 business days, followed by professional color grading, sound design, licensed voiceover, and motion graphics.`
      }
    ]
  },
  {
    name: "MICE & Corporate Event Videography",
    shortName: "MICE & Global Summits",
    slugPrefix: "mice-event-videography",
    serviceSlug: "mice-events",
    heroHeading: "Conferences, International Summits & Corporate Expo Filming",
    defaultVideo: { type: "youtube", id: "SqI3hj1S338" },
    coverImages: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "Multi-camera 4K live-switched recording and global low-latency RTMP streaming",
      "Same-day evening executive highlight reels for PR, LinkedIn and delegate recaps",
      "Keynote speaker isolation audio and multi-track board feeds",
      "Exhibition booth showcases and attendee Vox-pop testimonial interviews",
      "Archival plenary session delivery with indexed timestamps and slide integration"
    ],
    equipment: ["Multi-Cam Sony Cinema Rigs", "Blackmagic ATEM Constellation 4K Switcher", "Sennheiser EW-DX Digital Wireless Mics", "Teleprompters & Confidence Monitors"],
    clients: ["MILT Congress", "French Embassy", "UTI Mutual Funds (Paris & Israel)", "Network 18 (Uzbekistan)", "Ministry of Finance"],
    faqTemplates: (hub, city) => [
      {
        question: `Can your team deliver a highlight video on the same evening of the summit in ${hub}?`,
        answer: `Yes. We routinely deploy on-site DIT (Digital Imaging Technician) and fast-turnaround editorial editors in convention venues. A 60-to-90 second cinematic highlight reel can be ready for the gala dinner or instant LinkedIn release.`
      },
      {
        question: `How many camera angles do you deploy for keynote stages in ${city}?`,
        answer: `Standard MICE setups feature 3 to 5 synced cinema cameras: wide audience master, tight speaker follow, reverse audience reaction, automated slider, and stage-side roaming gimbal for dynamic cutaways.`
      },
      {
        question: `Do you provide multi-city and international delegation coverage?`,
        answer: `White Frog has documented international corporate delegations across Paris, Israel, Uzbekistan, and Bali, as well as flagship summits in Delhi NCR, Mumbai, and Bangalore.`
      }
    ]
  },
  {
    name: "Corporate Brand Films & AV Production",
    shortName: "Brand Films & Corporate AVs",
    slugPrefix: "corporate-film-makers",
    serviceSlug: "brand-films",
    heroHeading: "Cinematic Brand Identity Films, Founder Stories & Investor AVs",
    defaultVideo: { type: "youtube", id: "MZLJI48_r-o" },
    coverImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "High-concept brand narrative films with scripted storytelling and emotional arcs",
      "Founder and executive leadership journey profile documentaries",
      "Investor pitch AVs and pre-IPO roadshow brand presentation films",
      "Bespoke motion graphics, 2D/3D brand asset integration and 35mm film grading",
      "Custom cinema audio mastering, original score curation and voiceover licensing"
    ],
    equipment: ["RED Digital Cinema / Sony FX9", "Arri Signature Primes / Cooke Anamorphic Lenses", "Full Grip & Lighting Packages", "Pro Sound Recordists with Sound Devices Mixers"],
    clients: ["Porsche", "Reebok", "Income Tax India", "C-DOT", "Kajaria", "Panasonic", "Worlds of Wonder"],
    faqTemplates: (hub, city) => [
      {
        question: `What distinguishes White Frog's corporate brand films in ${city}?`,
        answer: `We discard boring corporate clichés. Infused with our world-renowned visual pedigree, we treat corporate stories with the aesthetic grandeur of fine cinema—authentic emotions, masterful lighting, and compelling narrative tension.`
      },
      {
        question: `Do you handle scriptwriting, storyboarding, and voiceover casting?`,
        answer: `Yes, we provide turnkey end-to-end production: creative conceptualization, script drafting, storyboarding, location scouting, international voice talent casting, orchestral scoring, and broadcast mastering.`
      },
      {
        question: `Can the final corporate film be formatted for multiple distribution channels?`,
        answer: `We export deliverable packages including 16:9 4K UHD masters for theatre/AGM projections, 9:16 vertical cuts for Instagram/YouTube Shorts, and 1:1 cutdowns for LinkedIn campaigns.`
      }
    ]
  },
  {
    name: "Corporate Headshot & Executive Photography",
    shortName: "Executive Headshots & Portraiture",
    slugPrefix: "corporate-headshot-photographer",
    serviceSlug: "headshots-portraiture",
    heroHeading: "C-Suite Executive Portraits, LinkedIn Imagery & Leadership Team Shoots",
    defaultVideo: { type: "youtube", id: "2gQVXesteCw" },
    coverImages: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "Mobile studio setup brought directly to corporate offices and boardrooms",
      "High-end magazine-style editorial portraits for Annual Reports and Forbes/PR features",
      "Consistent white/neutral/contextual executive backgrounds across 100+ team members",
      "Real-time iPad tethering so executives can select their preferred shot instantly",
      "Subtle, natural skin retouching that retains texture and authenticity"
    ],
    equipment: ["Medium Format Hasselblad & High-Res Sony Alpha", "Profoto B10X Location Lighting & Deep Umbrellas", "Capture One Pro Tethered Live Proofing", "Calibrated Color Checkers"],
    clients: ["Global Consulting Firms", "Venture Capital Partners", "C-DOT Senior Directorate", "Tech Founders & Unicorn C-Suite"],
    faqTemplates: (hub, city) => [
      {
        question: `Can you photograph our entire executive leadership team on-site in ${hub}?`,
        answer: `Yes. We bring our full mobile studio—complete with Profoto strobe lighting, seamless backdrops, and tethered monitors—directly to your corporate offices in ${hub}, ensuring zero downtime for busy executives.`
      },
      {
        question: `How quickly can executives view and select their favorite frames?`,
        answer: `With live tethering to Capture One Pro, leaders review their portraits on an iPad immediately after taking the shot. Selections are made in real time, ensuring 100% satisfaction before walking away.`
      },
      {
        question: `How do you ensure brand consistency across offices in different cities?`,
        answer: `We establish strict lighting ratios, camera heights, lens focal lengths, and backdrop hex codes in a Corporate Style Guide so future hires match existing team portraits seamlessly.`
      }
    ]
  },
  {
    name: "Commercial Real Estate & Drone Filming",
    shortName: "Real Estate & Drone Cinematography",
    slugPrefix: "real-estate-drone-videography",
    serviceSlug: "real-estate-drone",
    heroHeading: "DGCA-Compliant Aerial Cinematography, Architectural Tours & Logistics Parks",
    defaultVideo: { type: "vimeo", id: "131757127" },
    coverImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "DGCA-certified drone operations with verified digital sky permissions",
      "Ultra-smooth interior FPV drone walkthroughs weaving through architecture",
      "HDR architectural day-to-dusk twilight photography and golden hour cinema reels",
      "Industrial logistics parks, Grade-A IT parks and township aerial documentation",
      "3D spatial tracking, animated boundary line callouts and infrastructure overlays"
    ],
    equipment: ["DJI Inspire 3 & Mavic 3 Pro Cine with Apple ProRes", "Custom Avata FPV Cinewhoop Rigs", "Tilt-Shift Architectural Lenses", "Full Polarization & ND Filter Kits"],
    clients: ["Samode Palace", "Bhanwar Singh Palace", "Luxury Real Estate Developers", "Grade-A IT Park Promoters", "Hospitality Chains"],
    faqTemplates: (hub, city) => [
      {
        question: `Are your drone pilots licensed and compliant with DGCA regulations in ${city}?`,
        answer: `Yes. All White Frog drone operators hold valid DGCA Remote Pilot Certificates (RPC). We handle Digital Sky flight permissions, green-zone verification, and security clearances before taking flight.`
      },
      {
        question: `Can your drones fly indoors through corporate offices or warehouses in ${hub}?`,
        answer: `Yes. We operate custom prop-guarded Cinewhoop FPV drones piloted via HD goggles, allowing safe, dynamic flights through office atriums, manufacturing halls, and narrow corridors.`
      },
      {
        question: `Do you provide architectural photography alongside video walkthroughs?`,
        answer: `Yes. Our architectural package includes high-resolution perspective-corrected photography using specialized tilt-shift lenses to capture accurate vertical lines and spatial elegance.`
      }
    ]
  },
  {
    name: "Commercial Advertising & Product Campaigns",
    shortName: "Commercial Campaigns & Ad Films",
    slugPrefix: "commercial-campaign-photographer",
    serviceSlug: "commercial-campaigns",
    heroHeading: "Fashion Lookbooks, FMCG Campaigns & Celebrity Ambassador Films",
    defaultVideo: { type: "youtube", id: "sxXB7OjoF1I" },
    coverImages: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "High-fashion and lifestyle advertising campaigns shot on cinema primes",
      "FMCG product photography and high-speed food styling cinematography",
      "Celebrity brand ambassador campaign production and digital assets",
      "Print-ready ultra-high-resolution billboard files and packaging photography",
      "Multi-platform social media ad cutdowns (4:5, 9:16, 16:9) optimized for conversion"
    ],
    equipment: ["High-speed Phantom 4K Slow-Motion", "Medium Format 100MP Cameras", "Motion Control Robotic Arms", "Broncolor Strobe Lighting Packages"],
    clients: ["Veet (featuring Shraddha Kapoor)", "Tarun Tahiliani & Obeetee", "Cox & Kings", "Ganga Wools", "Diacolor Luxury Jewellery", "JW Marriott"],
    faqTemplates: (hub, city) => [
      {
        question: `Can White Frog manage celebrity brand shoots and tight call-sheets in ${city}?`,
        answer: `Yes. Having directed campaigns featuring Shraddha Kapoor (Veet Bali) and The Great Khali (Ujala), our production managers orchestrate meticulous call-sheets, VIP green rooms, and seamless multi-camera schedules.`
      },
      {
        question: `Do you provide art direction, styling, and location management in ${hub}?`,
        answer: `Yes. We provide complete creative execution: wardrobe stylists, food stylists, hair & makeup teams, art directors, studio space, and location permits across all major Indian metros.`
      },
      {
        question: `How do you handle color accuracy for apparel and luxury products?`,
        answer: `We use X-Rite ColorCheckers and hardware-calibrated EIZO reference monitors to guarantee exact Pantone and textile color fidelity across digital screens and print billboards.`
      }
    ]
  },
  {
    name: "Safety Induction & EHS Training Video Production",
    shortName: "Safety Induction & EHS Training Films",
    slugPrefix: "safety-induction-video-production",
    serviceSlug: "safety-training",
    heroHeading: "OSHA Compliant Safety Modules, Factory SOPs & Hazard Prevention Films",
    defaultVideo: { type: "youtube", id: "kL4Noppj1rY" },
    coverImages: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "Interactive visitor and contractor safety induction video modules",
      "Standard Operating Procedure (SOP) step-by-step machinery operation videos",
      "Multilingual voiceover localization in Hindi, English, and regional Indian languages",
      "2D/3D safety hazard animation and emergency evacuation graphics",
      "LMS-compatible video files formatted with interactive quiz milestones"
    ],
    equipment: ["Sony FX6 Cinema Package", "Wireless Audio with Noise Cancellation", "High-Visibility Grip Gear", "Multilingual Voice Talent Roster"],
    clients: ["Reckitt Benckiser", "Heavy Engineering Multinationals", "Automotive Assembly Plants", "Chemical & Pharma Units"],
    faqTemplates: (hub, city) => [
      {
        question: `Can your safety induction videos be produced in multiple regional languages in ${city}?`,
        answer: `Yes. We routinely produce safety induction videos with voiceovers and synchronized subtitles in Hindi, English, Tamil, Telugu, Marathi, Gujarati, and Bengali to ensure complete worker comprehension.`
      },
      {
        question: `Do you integrate animated safety graphics and warning icons?`,
        answer: `Yes. We overlay custom 2D/3D motion graphics, PPE checklists, emergency exit paths, and chemical hazard diamond callouts to reinforce vital EHS standards.`
      },
      {
        question: `How do you shoot around active machinery safely in ${hub}?`,
        answer: `Our crew uses wireless follow focus and telephoto cinema primes to film machine operators from safe designated safety boundaries without interrupting factory operations.`
      }
    ]
  },
  {
    name: "CSR Documentary & ESG Impact Video Production",
    shortName: "CSR & ESG Impact Films",
    slugPrefix: "csr-film-makers",
    serviceSlug: "csr-esg",
    heroHeading: "Documentary Storytelling for Corporate Social Responsibility & Sustainability",
    defaultVideo: { type: "youtube", id: "piPQQ5K2t5U" },
    coverImages: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "Human-centric documentary films showcasing grassroots community impact",
      "Renewable energy, solar, and environmental sustainability initiatives documentation",
      "Annual CSR compliance video reports for Board meetings and Ministry submissions",
      "Authentic beneficiary and community elder interviews captured with empathy",
      "Social-first bite-sized impact vignettes for corporate LinkedIn and investor decks"
    ],
    equipment: ["Lightweight Run-and-Gun Cinema Rigs", "Super-Cardioid Shotgun Microphones", "Compact LED Battery Lights", "Rugged All-Terrain Drones"],
    clients: ["C-DOT Green Initiatives", "Fortune 500 Foundations", "Public Sector Undertakings (PSUs)", "Clean Energy Enterprises"],
    faqTemplates: (hub, city) => [
      {
        question: `Can your documentary crew travel to remote village sites outside ${city}?`,
        answer: `Yes. White Frog's documentary teams are experienced in field productions across rural India, navigating remote villages, tribal areas, and rugged terrains with lightweight, self-sufficient production rigs.`
      },
      {
        question: `How do you capture authentic beneficiary stories without making them feel staged?`,
        answer: `Drawing from our documentary wedding and cinematic storytelling heritage, we spend time building rapport before turning on the cameras, capturing honest emotion and unfiltered dignity.`
      },
      {
        question: `Can the CSR film fulfill statutory Corporate Social Responsibility reporting requirements?`,
        answer: `Yes. We structure the documentary to highlight measurable metrics (beneficiaries reached, carbon offset, literacy rates) aligned with MCA and ESG reporting frameworks.`
      }
    ]
  },
  {
    name: "Investor Pitch & Pre-IPO Roadshow Films",
    shortName: "Investor Pitch & Pre-IPO Films",
    slugPrefix: "investor-pitch-video-production",
    serviceSlug: "investor-pitch",
    heroHeading: "High-Conviction Pre-IPO Roadshow Videos, Founder Pitches & Shareholder AVs",
    defaultVideo: { type: "youtube", id: "MZLJI48_r-o" },
    coverImages: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "Dynamic 3-to-5 minute investor pitch films designed to open pre-IPO roadshows",
      "Financial milestone visualization, TAM/SAM market graphics and kinetic typography",
      "High-calibre founder & leadership vision interviews with cinematic lighting",
      "Global institutional investor cutdowns compliant with SEBI & SEC guidelines",
      "Encrypted cloud delivery with password-protected private screening links"
    ],
    equipment: ["Arri Alexa / Sony FX9 Systems", "Cooke Anamorphic Lenses", "Full Cinematic Lighting Package", "Motion Graphics Workstations"],
    clients: ["Pre-IPO Enterprise Unicorns", "Leading Venture Capital Portfolios", "Financial Institutions", "C-DOT"],
    faqTemplates: (hub, city) => [
      {
        question: `What makes White Frog's investor pitch films effective in ${city}?`,
        answer: `We combine quantitative financial clarity with emotional narrative conviction. We transform complex cap-table data and technical moats into a compelling cinematic story that commands investment committee attention.`
      },
      {
        question: `How do you protect non-public financial information during production in ${hub}?`,
        answer: `We sign airtight bilateral NDAs before receiving sensitive decks. Post-production is performed offline on encrypted drives, and rough cuts are shared via DRM-secured watermarked links.`
      },
      {
        question: `Can you produce fast-turnaround video cutdowns for roadshow meetings?`,
        answer: `Yes. We provide 90-second teaser cuts for investor emails, full 5-minute plenary presentations for bankers, and 60-second summary reels for social media announcement day.`
      }
    ]
  },
  {
    name: "Client Testimonial & B2B Case Study Video Production",
    shortName: "Client Testimonials & Case Studies",
    slugPrefix: "client-testimonial-video-production",
    serviceSlug: "client-testimonials",
    heroHeading: "High-Impact Enterprise Case Studies, Customer Success Stories & B2B Proof",
    defaultVideo: { type: "youtube", id: "SqI3hj1S338" },
    coverImages: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
    ],
    deliverables: [
      "Executive two-camera conversational interviews conducted at client offices",
      "Dynamic B-roll footage showing software adoption, factory output, and business results",
      "Quantitative ROI metrics callouts and animated pull-quote titles",
      "Full 3-minute case study documentary plus 45-second LinkedIn conversion cuts",
      "Turnkey interview coaching so non-actor clients speak naturally and confidently"
    ],
    equipment: ["Two-Camera Matched Sony Cinema Rigs", "Soft Eye-Light Key and Hair Lighting", "Broadcast Lavaliers & Boom Microphones", "Portable Sound Dampening"],
    clients: ["SaaS & Tech Unicorns", "Enterprise Industrial Suppliers", "Consulting & Financial Advisory Firms"],
    faqTemplates: (hub, city) => [
      {
        question: `Can you conduct testimonial interviews at our client's office in ${hub}?`,
        answer: `Yes. Our mobile documentary crew sets up in your client's boardroom or executive suite within 45 minutes, creating a studio-quality look without disrupting their workday.`
      },
      {
        question: `How do you help nervous executives speak naturally on camera in ${city}?`,
        answer: `We use a conversational interview approach rather than rigid teleprompters. Our directors ask guided questions that evoke spontaneous, authentic enthusiasm and credible business proof.`
      },
      {
        question: `Do you provide customer release forms and legal consent templates?`,
        answer: `Yes. We provide standard enterprise video release agreements to ensure clear copyright assignment and client signoff for marketing usage.`
      }
    ]
  }
];

const HUBS = [
  { city: "Gurgaon", hub: "Cyber City", state: "Haryana", landmark: "DLF CyberHub & DLF Cyber City corporate towers" },
  { city: "Gurgaon", hub: "Golf Course Road", state: "Haryana", landmark: "One Horizon Center & Two Horizon Center" },
  { city: "Gurgaon", hub: "Udyog Vihar", state: "Haryana", landmark: "Udyog Vihar Phase 1 to 5 corporate belt" },
  { city: "Gurgaon", hub: "Sohna Road", state: "Haryana", landmark: "Sohna Road IT parks & Spaze i-Tech Park" },
  { city: "Manesar", hub: "IMT Manesar", state: "Haryana", landmark: "Industrial Model Township (IMT) automotive and manufacturing cluster" },
  { city: "Bawal", hub: "Bawal Industrial Area", state: "Haryana", landmark: "Bawal HSIIDC industrial corridor" },
  { city: "Dharuhera", hub: "Dharuhera Industrial Zone", state: "Haryana", landmark: "Delhi-Jaipur Highway manufacturing belt" },
  { city: "Noida", hub: "Sector 62 & 63", state: "Uttar Pradesh", landmark: "Noida Electronic City & Sector 62 IT corridor" },
  { city: "Noida", hub: "Sector 125 & Expressway", state: "Uttar Pradesh", landmark: "Noida-Greater Noida Expressway corporate towers" },
  { city: "Noida", hub: "Sector 132 & 142", state: "Uttar Pradesh", landmark: "Advant Navis Business Park and Sector 142 tech zone" },
  { city: "Greater Noida", hub: "Knowledge Park", state: "Uttar Pradesh", landmark: "Knowledge Park corporate and educational zone" },
  { city: "Greater Noida", hub: "Ecotech Industrial Park", state: "Uttar Pradesh", landmark: "Ecotech electronics and heavy manufacturing corridor" },
  { city: "Delhi", hub: "Aerocity", state: "Delhi", landmark: "Worldmark Aerocity luxury hospitality and corporate district" },
  { city: "Delhi", hub: "Connaught Place", state: "Delhi", landmark: "Barakhamba Road & Connaught Place Central Business District" },
  { city: "Delhi", hub: "Okhla Industrial Area", state: "Delhi", landmark: "Okhla Phase 1, Phase 2, and Phase 3 commercial belt" },
  { city: "Delhi", hub: "Nehru Place", state: "Delhi", landmark: "Nehru Place commercial towers and IT market" },
  { city: "Delhi", hub: "Naraina & Mayapuri", state: "Delhi", landmark: "Naraina Industrial Area & Mayapuri manufacturing zone" },
  { city: "Faridabad", hub: "Mathura Road Corridor", state: "Haryana", landmark: "Faridabad industrial corridor along NH-19" },
  { city: "Ghaziabad", hub: "Sahibabad Industrial Area", state: "Uttar Pradesh", landmark: "Sahibabad manufacturing and warehousing cluster" },
  { city: "Neemrana", hub: "Japanese Industrial Zone", state: "Rajasthan", landmark: "RIICO Japanese Industrial Zone on Delhi-Jaipur highway" },
  { city: "Bhiwadi", hub: "RIICO Industrial Belt", state: "Rajasthan", landmark: "Bhiwadi & Khushkhera manufacturing zones" },
  { city: "Jaipur", hub: "Sitapura Industrial Area", state: "Rajasthan", landmark: "Sitapura & Mahindra World City corporate SEZ" },
  { city: "Mumbai", hub: "Bandra Kurla Complex (BKC)", state: "Maharashtra", landmark: "Bandra Kurla Complex financial and corporate epicentre" },
  { city: "Mumbai", hub: "Lower Parel & Worli", state: "Maharashtra", landmark: "Kamala Mills, High Street Phoenix & Peninsula Corporate Park" },
  { city: "Mumbai", hub: "Nariman Point & Fort", state: "Maharashtra", landmark: "South Mumbai Heritage Business District" },
  { city: "Mumbai", hub: "Andheri East & MIDC", state: "Maharashtra", landmark: "MIDC Andheri East & SEEPZ corporate zone" },
  { city: "Mumbai", hub: "Powai Tech District", state: "Maharashtra", landmark: "Hiranandani Business Park & Powai startup cluster" },
  { city: "Navi Mumbai", hub: "Airoli Mindspace", state: "Maharashtra", landmark: "Mindspace Airoli & TTC Industrial Area" },
  { city: "Navi Mumbai", hub: "Vashi & Belapur", state: "Maharashtra", landmark: "CBD Belapur and International Infotech Park Vashi" },
  { city: "Thane", hub: "Wagle Estate", state: "Maharashtra", landmark: "Wagle Industrial Estate IT & engineering corridor" },
  { city: "Pune", hub: "Hinjawadi", state: "Maharashtra", landmark: "Rajiv Gandhi Infotech Park Phase 1, 2 & 3" },
  { city: "Pune", hub: "Magarpatta & Kharadi", state: "Maharashtra", landmark: "Magarpatta Cybercity & EON Free Zone Kharadi" },
  { city: "Pune", hub: "Chakan Industrial Corridor", state: "Maharashtra", landmark: "Chakan MIDC automotive and engineering belt" },
  { city: "Pune", hub: "Bhosari & PCMC", state: "Maharashtra", landmark: "Bhosari MIDC & Pimpri Chinchwad industrial hub" },
  { city: "Pune", hub: "Talegaon & Ranjangaon", state: "Maharashtra", landmark: "Talegaon & Ranjangaon 5-star MIDC manufacturing corridor" },
  { city: "Bangalore", hub: "Whitefield", state: "Karnataka", landmark: "ITPB International Tech Park & EPIP Zone Whitefield" },
  { city: "Bangalore", hub: "Electronic City", state: "Karnataka", landmark: "Electronic City Phase 1 & 2 technology campus corridor" },
  { city: "Bangalore", hub: "Manyata Embassy Business Park", state: "Karnataka", landmark: "Manyata Tech Park North Bangalore corridor" },
  { city: "Bangalore", hub: "Koramangala & Indiranagar", state: "Karnataka", landmark: "Koramangala startup corridor & 100 Feet Road corporate hubs" },
  { city: "Bangalore", hub: "Outer Ring Road (ORR)", state: "Karnataka", landmark: "Bellandur, Ecospace & Marathahalli tech parks" },
  { city: "Bangalore", hub: "Peenya Industrial Area", state: "Karnataka", landmark: "Peenya Industrial Area, Asia's largest industrial estate" },
  { city: "Bangalore", hub: "Bidadi Industrial Area", state: "Karnataka", landmark: "Bidadi KIADB industrial manufacturing belt" },
  { city: "Hyderabad", hub: "HITEC City", state: "Telangana", landmark: "Cyber Towers, Mindspace Madhapur & HITEC City corridor" },
  { city: "Hyderabad", hub: "Gachibowli Financial District", state: "Telangana", landmark: "Nanakramguda Financial District & WaveRock SEZ" },
  { city: "Hyderabad", hub: "Madhapur", state: "Telangana", landmark: "Madhapur corporate corridor & Inorbit Mall commercial belt" },
  { city: "Hyderabad", hub: "Jeedimetla & Patancheru", state: "Telangana", landmark: "Jeedimetla & Patancheru pharma & engineering zones" },
  { city: "Ahmedabad", hub: "SG Highway", state: "Gujarat", landmark: "Sarkhej-Gandhinagar Highway corporate skyscrapers" },
  { city: "Ahmedabad", hub: "Sanand GIDC", state: "Gujarat", landmark: "Sanand GIDC automotive & mega manufacturing corridor" },
  { city: "Ahmedabad", hub: "Changodar Industrial Belt", state: "Gujarat", landmark: "Changodar & Moraiya industrial manufacturing belt" },
  { city: "Vadodara", hub: "Savli & Makarpura", state: "Gujarat", landmark: "Savli GIDC & Makarpura engineering & power equipment hub" },
  { city: "Surat", hub: "Hazira & Diamond Bourse", state: "Gujarat", landmark: "Hazira industrial manufacturing belt & Surat Diamond Bourse" },
  { city: "Chennai", hub: "OMR IT Corridor", state: "Tamil Nadu", landmark: "Old Mahabalipuram Road (OMR) Rajiv Gandhi Salai tech expressway" },
  { city: "Chennai", hub: "Sriperumbudur & Oragadam", state: "Tamil Nadu", landmark: "Sriperumbudur & Oragadam automotive & electronics corridor" },
  { city: "Baddi", hub: "Baddi Pharma Hub", state: "Himachal Pradesh", landmark: "Baddi-Barotiwala-Nalagarh (BBN) pharmaceutical manufacturing corridor" },
  { city: "Chandigarh", hub: "IT Park & Mohali", state: "Punjab/UT", landmark: "Rajiv Gandhi Chandigarh Technology Park & Mohali Sector 82 industrial area" }
];

const CITIES = [
  { city: "Delhi", state: "Delhi", landmark: "Central Business District, Aerocity, Okhla & Connaught Place" },
  { city: "Gurgaon", state: "Haryana", landmark: "Cyber City, Golf Course Road, Udyog Vihar & Manesar" },
  { city: "Noida", state: "Uttar Pradesh", landmark: "Sector 62 IT Corridor, Sector 125 Expressway & Sector 132" },
  { city: "Greater Noida", state: "Uttar Pradesh", landmark: "Knowledge Park, Ecotech Industrial Park & Techzone" },
  { city: "Faridabad", state: "Haryana", landmark: "Mathura Road NH-19 Industrial & Engineering Corridor" },
  { city: "Ghaziabad", state: "Uttar Pradesh", landmark: "Sahibabad Industrial Area & Mohan Nagar Commercial Belt" },
  { city: "Manesar", state: "Haryana", landmark: "IMT Manesar Automotive & Heavy Manufacturing Cluster" },
  { city: "Neemrana", state: "Rajasthan", landmark: "Japanese Industrial Zone & RIICO Industrial Corridor" },
  { city: "Mumbai", state: "Maharashtra", landmark: "BKC (Bandra Kurla Complex), Lower Parel, Powai & Nariman Point" },
  { city: "Navi Mumbai", state: "Maharashtra", landmark: "Mindspace Airoli, Vashi Infotech Park & CBD Belapur" },
  { city: "Thane", state: "Maharashtra", landmark: "Wagle Industrial Estate & Ghodbunder Corporate Towers" },
  { city: "Pune", state: "Maharashtra", landmark: "Hinjawadi Infotech Park, Chakan Auto Cluster & Magarpatta Cybercity" },
  { city: "Bangalore", state: "Karnataka", landmark: "Whitefield Tech Corridor, Electronic City, Manyata & ORR Bellandur" },
  { city: "Hyderabad", state: "Telangana", landmark: "HITEC City, Gachibowli Financial District & Madhapur" },
  { city: "Chennai", state: "Tamil Nadu", landmark: "OMR IT Highway, Sriperumbudur & Oragadam Automotive Hub" },
  { city: "Ahmedabad", state: "Gujarat", landmark: "SG Highway Corporate Corridor, Sanand GIDC & Changodar" },
  { city: "Surat", state: "Gujarat", landmark: "Hazira Industrial Port Belt & Surat Diamond Bourse" },
  { city: "Vadodara", state: "Gujarat", landmark: "Savli GIDC & Makarpura Engineering Equipment Zone" },
  { city: "Jaipur", state: "Rajasthan", landmark: "Sitapura Industrial Area & Mahindra World City SEZ" },
  { city: "Chandigarh", state: "Punjab/UT", landmark: "Rajiv Gandhi IT Park & Tri-City Corporate Enclaves" },
  { city: "Mohali", state: "Punjab", landmark: "Sector 82 Industrial Area & Quark City IT Zone" },
  { city: "Ludhiana", state: "Punjab", landmark: "Focal Point Industrial Estate & Textile Manufacturing Belt" },
  { city: "Kolkata", state: "West Bengal", landmark: "Salt Lake Sector V IT Hub & Rajarhat New Town" },
  { city: "Lucknow", state: "Uttar Pradesh", landmark: "Gomti Nagar IT City & Amausi Industrial Corridor" },
  { city: "Indore", state: "Madhya Pradesh", landmark: "Super Corridor Tech Park & Pithampur Auto Cluster" },
  { city: "Bhopal", state: "Madhya Pradesh", landmark: "Govindpura & Mandideep Industrial Area" },
  { city: "Nagpur", state: "Maharashtra", landmark: "MIHAN SEZ Multi-modal Cargo Hub & Butibori MIDC" },
  { city: "Coimbatore", state: "Tamil Nadu", landmark: "TIDEL Park & Peelamedu Industrial Corridor" },
  { city: "Kochi", state: "Kerala", landmark: "Infopark Kakkanad, SmartCity & Cochin SEZ" },
  { city: "Visakhapatnam", state: "Andhra Pradesh", landmark: "APIIC Autonagar & Cyber Valley IT SEZ" },
  { city: "Bhubaneswar", state: "Odisha", landmark: "Infocity IT Park & Chandaka Industrial Estate" },
  { city: "Dehradun", state: "Uttarakhand", landmark: "IT Park Sahastradhara & Selaqui Pharma Corridor" },
  { city: "Baddi", state: "Himachal Pradesh", landmark: "BBN Pharmaceutical Manufacturing Special Zone" }
];

function generateSlug(service, hubObj) {
  const cleanHub = hubObj.hub
    .toLowerCase()
    .replace(/[&(),.]/g, '')
    .replace(/\s+/g, '-');
  const cleanCity = hubObj.city.toLowerCase().replace(/[\s/]/g, '-');
  return `${service.slugPrefix}-${cleanCity}-${cleanHub}`;
}

function generateCitySlug(service, cityObj) {
  const cleanCity = cityObj.city.toLowerCase().replace(/[\s/]/g, '-');
  return `${service.slugPrefix}-${cleanCity}`;
}

const articles = [];
let idCounter = 1;

// 1. Generate City-Wide Flagship Articles
for (const cityObj of CITIES) {
  for (const service of SERVICES) {
    const slug = generateCitySlug(service, cityObj);
    const title = `Best ${service.name} in ${cityObj.city} | White Frog Productions`;
    const headline = `Top ${service.shortName} in ${cityObj.city}`;
    const metaDescription = `Leading corporate video production agency in ${cityObj.city}. High-impact ${service.name.toLowerCase()} across ${cityObj.landmark} with 4K/6K cinema gear, licensed drones, and masterclass storytelling.`;

    const imageIdx = (idCounter + cityObj.city.length) % service.coverImages.length;
    const coverImage = service.coverImages[imageIdx];

    const keywords = [
      `corporate video production company in ${cityObj.city}`,
      `best corporate film makers in ${cityObj.city}`,
      `${service.slugPrefix.replace(/-/g, ' ')} ${cityObj.city}`,
      `corporate video production agency ${cityObj.city}`,
      `corporate film production house ${cityObj.city}`,
      `top corporate filmmakers ${cityObj.city}`,
      `business promotional video ${cityObj.city}`,
      `${service.shortName.toLowerCase()} ${cityObj.state}`
    ];

    const keyDeliverables = service.deliverables;
    const equipmentStack = service.equipment;
    const clientShowcase = service.clients;
    const faqs = service.faqTemplates(`All Major Districts of ${cityObj.city}`, cityObj.city);

    articles.push({
      slug,
      title,
      headline,
      service: service.name,
      serviceSlug: service.serviceSlug,
      city: cityObj.city,
      hub: "City-Wide Operations",
      state: cityObj.state,
      landmark: cityObj.landmark,
      metaDescription,
      heroHeading: service.heroHeading,
      keywords,
      coverImage,
      readingTime: "6 min read",
      date: "2026-09-22",
      featured: true,
      videoType: service.defaultVideo.type,
      videoId: service.defaultVideo.id,
      keyDeliverables,
      equipmentStack,
      clientShowcase,
      faqs
    });

    idCounter++;
  }
}

for (const hubObj of HUBS) {
  for (const service of SERVICES) {
    const slug = generateSlug(service, hubObj);
    const title = `${service.name} in ${hubObj.city} (${hubObj.hub}) | White Frog Productions`;
    const headline = `Premier ${service.shortName} in ${hubObj.city} · ${hubObj.hub}`;
    const metaDescription = `Award-winning ${service.name.toLowerCase()} in ${hubObj.city} across ${hubObj.landmark}. Specializing in 4K/6K cinema production, drone filming, and B2B visual storytelling for industry leaders.`;
    
    // Pick deterministic image & video
    const imageIdx = (idCounter + hubObj.city.length) % service.coverImages.length;
    const coverImage = service.coverImages[imageIdx];
    
    const keywords = [
      `${service.slugPrefix.replace(/-/g, ' ')} ${hubObj.city}`,
      `${service.slugPrefix.replace(/-/g, ' ')} ${hubObj.hub}`,
      `corporate video production company in ${hubObj.city}`,
      `best corporate film makers in ${hubObj.city}`,
      `corporate video production agency ${hubObj.hub}`,
      `industrial video makers in ${hubObj.city}`,
      `company profile video production services ${hubObj.city}`,
      `${service.shortName.toLowerCase()} ${hubObj.state}`,
      `corporate cinematography services ${hubObj.city}`,
      `business video production ${hubObj.city}`
    ];

    const keyDeliverables = service.deliverables;
    const equipmentStack = service.equipment;
    const clientShowcase = service.clients;
    const faqs = service.faqTemplates(hubObj.hub, hubObj.city);

    articles.push({
      slug,
      title,
      headline,
      service: service.name,
      serviceSlug: service.serviceSlug,
      city: hubObj.city,
      hub: hubObj.hub,
      state: hubObj.state,
      landmark: hubObj.landmark,
      metaDescription,
      heroHeading: service.heroHeading,
      keywords,
      coverImage,
      readingTime: "5 min read",
      date: "2026-09-20",
      featured: idCounter % 15 === 0,
      videoType: service.defaultVideo.type,
      videoId: service.defaultVideo.id,
      keyDeliverables,
      equipmentStack,
      clientShowcase,
      faqs
    });

    idCounter++;
  }
}

console.log(`Generated ${articles.length} corporate programmatic SEO articles.`);

const fileContent = `// Programmatic B2B Corporate SEO Database for White Frog Productions
// High-intent Enterprise Queries for Corporate Films, MICE, Factory Tours, Headshots, Real Estate & Commercials
// Total Articles: ${articles.length}

export interface CorporateFAQ {
  question: string;
  answer: string;
}

export interface CorporateArticle {
  slug: string;
  title: string;
  headline: string;
  service: string;
  serviceSlug: string;
  city: string;
  hub: string;
  state: string;
  landmark: string;
  metaDescription: string;
  heroHeading: string;
  keywords: string[];
  coverImage: string;
  readingTime: string;
  date: string;
  featured: boolean;
  videoType: "youtube" | "vimeo";
  videoId: string;
  keyDeliverables: string[];
  equipmentStack: string[];
  clientShowcase: string[];
  faqs: CorporateFAQ[];
}

export const CORPORATE_SERVICES = [
  "All Services",
  "Factory & Industrial Video Production",
  "MICE & Corporate Event Videography",
  "Corporate Brand Films & AV Production",
  "Corporate Headshot & Executive Photography",
  "Commercial Real Estate & Drone Filming",
  "Commercial Advertising & Product Campaigns",
  "Safety Induction & EHS Training Video Production",
  "CSR Documentary & ESG Impact Video Production",
  "Investor Pitch & Pre-IPO Roadshow Films",
  "Client Testimonial & B2B Case Study Video Production"
] as const;

export const CORPORATE_ARTICLES: CorporateArticle[] = ${JSON.stringify(articles, null, 2)};

export function getCorporateArticleBySlug(slug: string): CorporateArticle | undefined {
  return CORPORATE_ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedCorporateArticles(currentSlug: string, count = 3): CorporateArticle[] {
  const current = getCorporateArticleBySlug(currentSlug);
  if (!current) return CORPORATE_ARTICLES.slice(0, count);

  return CORPORATE_ARTICLES.filter(
    (a) => a.slug !== currentSlug && (a.serviceSlug === current.serviceSlug || a.city === current.city)
  ).slice(0, count);
}

export function getCorporateAsSEOArticles() {
  return CORPORATE_ARTICLES.map((ca) => ({
    slug: ca.slug,
    title: ca.title,
    category: "Corporate Films",
    description: ca.metaDescription,
    keywords: ca.keywords,
    coverImage: ca.coverImage,
    readingTime: ca.readingTime,
    date: ca.date,
    featured: ca.featured,
    youtubeId: ca.videoType === "youtube" ? ca.videoId : undefined,
    location: ca.hub + ", " + ca.city,
    keyTakeaways: ca.keyDeliverables,
    faqs: ca.faqs,
    href: "/corporate/" + ca.slug,
  }));
}
`;

const outputPath = path.join(__dirname, '../src/data/corporateSeoArticles.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully wrote ${articles.length} articles to ${outputPath}`);
