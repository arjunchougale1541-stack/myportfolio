import { ProjectItem, ServiceItem } from '../types';
import axialImg from '../assets/images/axial_graphic_cover.jpg';
import axialDesktopImg from '../assets/images/axial_graphic_desktop_cover.png';
import axialCaseStudyImg from '../assets/images/axial_graphic_case_study_full.jpg';
import candyImg from '../assets/images/candy_cloud_cover.jpg';
import candyDesktopImg from '../assets/images/candy_cloud_desktop_cover.png';
import candyCloudUiuxImg from '../assets/images/candy_cloud_uiux_full.png';
import candyCloudCaseStudyImg from '../assets/images/candy_cloud_case_study_full.webp';
import devsthanImg from '../assets/images/devsthan_samiti_cover.jpg';
import devsthanDesktopImg from '../assets/images/devsthan_samiti_desktop_cover.png';
import devsthanCaseStudyImg from '../assets/images/devsthan_samiti_case_study_full.webp';
import swaraElectricalsImg from '../assets/images/works/swara_electricals_logo.jpg';
import hyperlexLogoImg from '../assets/images/works/hyperlex_logo.png';

export const projectsData: ProjectItem[] = [
  {
    id: 'personal-branding',
    number: '01',
    title: 'AXIAL GRAPHIC - DRIVEN BY DESIGN',
    subtitle: 'PERSONAL DESIGN IDENTITY & BRAND SYSTEM',
    year: '2023',
    client: 'Arjun Chougale / Self Identity',
    description: 'Axial Graphic is my personal design identity, built to represent my creative journey and style as a graphic designer. The word "Axial" symbolizes structure and balance, referencing an axis — the central line around which design elements align.',
    tags: ['Logo Design', 'Branding', 'Visual Identity', 'Stationery'],
    mockupSide: 'left',
    badge: 'BRANDING CASE STUDY',
    category: 'Visual Identity',
    accentColor: '#5362ff',
    bgTone: '#1e1b4b',
    coverImage: axialDesktopImg,
    projectImages: [
      axialCaseStudyImg,
    ],
    images: [
      axialCaseStudyImg,
    ],
    details: {
      overview: 'Axial Graphic is my personal design identity, built to represent my creative journey and style as a graphic designer. The word "Axial" symbolizes structure and balance, referencing an axis — the central line around which design elements align. This logo reflects strength, clarity, and visual stability — qualities I bring to every design project. From logo creation to brand storytelling, this identity serves as the visual voice of my creative career.',
      role: 'Lead Brand Designer, Visual Strategist & 3D Mockup Artist',
      timeline: '4 Weeks (Q3 2023)',
      tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Blender 3D', 'Figma'],
      colors: [
        { name: 'Periwinkle Slate', hex: '#6366f1' },
        { name: 'Deep Midnight Indigo', hex: '#16143c' },
        { name: 'Pure Obsidian', hex: '#0a0a0f' },
        { name: 'Silver Frost', hex: '#e2e8f0' }
      ],
      typography: [
        { name: 'Pricedown BL', usage: 'Logotype & Display Headline' },
        { name: 'Plus Jakarta Sans Bold', usage: 'Headings & Accents' },
        { name: 'Inter Regular', usage: 'Body Copy & ID Specifications' }
      ],
      deliverables: [
        'Modular Wordmark & Symbol System',
        'Physical Corporate Stationery Suite',
        'Staff Lanyard & NFC Smart ID Card',
        'Dark Mode Social Media Asset Kit',
        'Comprehensive 32-Page Brand Guidelines'
      ],
      galleryImages: [
        axialCaseStudyImg,
      ]
    }
  },
  {
    id: 'candy-cloud',
    number: '02',
    title: 'CANDY CLOUD - THE SWEETS SHOP LOGO',
    subtitle: 'Taste the Clouds.',
    year: '2024',
    client: 'Candy Cloud Confectionery Co.',
    description: 'I am proud of the creating logos, brand guidelines, and the visual assets that capture the user\'s needs.',
    tags: ['Logo Design', 'Visual Merch', 'Branding'],
    mockupSide: 'right',
    badge: 'BRANDING CASE STUDY',
    category: 'Packaging & Identity',
    accentColor: '#ec4899',
    bgTone: '#1e1b4b',
    coverImage: candyDesktopImg,
    projectImages: [
      candyCloudCaseStudyImg,
    ],
    images: [
      candyCloudCaseStudyImg,
    ],
    details: {
      overview: 'Candy Cloud is an artisanal confectionery brand specializing in cloud-soft marshmallows, gourmet cotton candy, and bespoke sweets. The identity blends playful pastel pinks with clean, modern typography and tactile packaging that conveys sweetness and joyful indulgence.',
      role: 'Brand Identity Designer, Packaging Developer & Merchandiser',
      timeline: '6 Weeks (Q1 2024)',
      tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Procreate', 'InDesign'],
      colors: [
        { name: 'Bubblegum Dream Pink', hex: '#f472b6' },
        { name: 'Lavender Mist', hex: '#c084fc' },
        { name: 'Deep Berry Violet', hex: '#6b21a8' },
        { name: 'Cream Cotton', hex: '#fdf2f8' }
      ],
      typography: [
        { name: 'Soft Puffy Custom Script', usage: 'Primary Logotype' },
        { name: 'Syne / Outfit Medium', usage: 'Taglines & Secondary Text' },
        { name: 'Plus Jakarta Sans', usage: 'Packaging Nutrition & Details' }
      ],
      deliverables: [
        '3D Sculpted Cloud Logomark & Lockups',
        'Premium Gift Bag & Box Packaging System',
        'Boutique Paper Cups & Straw Sleeves',
        'Staff Apparel & Lanyard Identification',
        'Merchandise & Confectionery Sticker Badges'
      ],
      galleryImages: [
        candyCloudCaseStudyImg,
      ]
    }
  },
  {
    id: 'devsthan-samiti',
    number: '03',
    title: 'A DEVSTHAN SAMITI LOGO AND BRANDING PROJECT.',
    subtitle: 'TRADITION. FAITH. IDENTITY.',
    year: '2024',
    client: 'Devsthan Vyavasthapan Samiti, West Maharashtra, Kolhapur',
    description: 'I am proud of the Development user interface and experience for Dashboard Management System, as as well as the coding documentation',
    tags: ['Logo Design', 'Visual Merch', 'Branding'],
    mockupSide: 'left',
    badge: 'BRANDING CASE STUDY',
    category: 'Cultural Identity & UI',
    accentColor: '#eab308',
    bgTone: '#1e1b4b',
    coverImage: devsthanDesktopImg,
    projectImages: [
      devsthanCaseStudyImg,
    ],
    images: [
      devsthanCaseStudyImg,
    ],
    details: {
      overview: 'Devsthan Vyavasthapan Samiti manages historical and cultural heritage temples across Western Maharashtra, Kolhapur. The branding project unites sacred temple architecture motifs with a majestic golden Ganesha emblem, ceremonial identity collateral, and an intuitive administrative dashboard system.',
      role: 'Lead Cultural Identity Designer & UI/UX Specialist',
      timeline: '8 Weeks (Q2 2024)',
      tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'React/Tailwind'],
      colors: [
        { name: 'Sacred Gold Foil', hex: '#f59e0b' },
        { name: 'Deep Crimson Sindoor', hex: '#991b1b' },
        { name: 'Royal Temple Bronze', hex: '#78350f' },
        { name: 'Ancient Stone Slate', hex: '#1c1917' }
      ],
      typography: [
        { name: 'Devanagari Royal Serif', usage: 'Official Regional Seal & Titles' },
        { name: 'Cinzel Decorative', usage: 'English Identity & Mottos' },
        { name: 'Plus Jakarta Sans', usage: 'Administrative UI & Documents' }
      ],
      deliverables: [
        'Illuminated Gold Ganesha Sacred Seal',
        'Official Bilingual Letterheads & Stamp Seals',
        'Gold-Foiled VIP Badges & Lanyards',
        'Temple Management Dashboard UI System',
        'Architectural Signage & Heritage Display Guides'
      ],
      galleryImages: [
        devsthanCaseStudyImg,
      ]
    }
  },
  {
    id: 'candy-cloud-ecommerce-experience',
    number: 'UI/UX',
    title: 'CANDY CLOUD - D2C E-COMMERCE UI/UX WEBSITE',
    subtitle: 'Taste the Clouds. — Immersive Confectionery Web Storefront',
    year: '2024',
    client: 'Candy Cloud D2C Store',
    description: 'A playful, high-converting digital storefront designed to evoke joy and sweet cravings through pastel aesthetics, interactive categories, and friction-free shopping.',
    tags: ['UI/UX Design', 'E-Commerce', 'Web Design', 'Figma'],
    mockupSide: 'right',
    badge: 'SCROLLABLE WEB UI',
    category: 'UIUX Design',
    accentColor: '#ec4899',
    bgTone: '#1e1430',
    coverImage: candyCloudUiuxImg,
    projectImages: [
      candyCloudCaseStudyImg,
    ],
    images: [
      candyCloudCaseStudyImg,
    ],
    details: {
      overview: 'Candy Cloud D2C Store is an artisanal digital shopping experience built from the ground up to captivate sweet lovers. Featuring an ethereal pastel cloud aesthetic, gamified category exploration (Lollipops, Gummies, Gift Boxes, Seasonal Specials), bestseller highlights with instant quick-add, seasonal promotional banners, and social-proof customer testimonials. The UI balances whimsical delight with clear e-commerce conversion heuristics.',
      role: 'Lead UI/UX Designer, Design System Architect & Prototype Specialist',
      timeline: '6 Weeks (Q2 2024)',
      tools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Procreate', 'React/Tailwind'],
      colors: [
        { name: 'Cotton Candy Pink', hex: '#ec4899' },
        { name: 'Lavender Mist', hex: '#c084fc' },
        { name: 'Deep Berry Violet', hex: '#7e22ce' },
        { name: 'Sweet Honey Amber', hex: '#f59e0b' },
        { name: 'Cream Marshmallow', hex: '#fdf2f8' },
        { name: 'Sky Cloud Blue', hex: '#bae6fd' }
      ],
      typography: [
        { name: 'Puffy Display Script', usage: 'Logotype & Hero Headlines' },
        { name: 'Plus Jakarta Sans Bold', usage: 'Product Titles, Section Headers & CTAs' },
        { name: 'Inter Regular', usage: 'Body Copy, Pricing, Descriptions & Reviews' }
      ],
      deliverables: [
        'Complete Full-Page Desktop & Mobile Responsive Web Layout',
        'Interactive Category Navigation (Lollipops, Gummies, Boxes, Specials)',
        'Bestseller Product Cards with Star Ratings & Instant Add-to-Cart',
        'Dynamic 50% Off Promotional Campaign Banner',
        'Customer Testimonial Carousel & Newsletter Subscription System',
        'Figma Design System with Component Variants & Hover Micro-Interactions'
      ],
      galleryImages: [
        candyCloudUiuxImg,
        candyCloudCaseStudyImg,
      ]
    }
  },
  {
    id: 'swara-electricals-logo',
    number: '04',
    title: 'SWARA ELECTRICALS - LOGO & STORE IDENTITY',
    subtitle: 'Electrical Shop Project',
    year: '2024',
    client: 'Swara Electricals',
    description: 'Modern geometric monogram logomark and complete electrical retail showroom identity featuring circuit-inspired iconography.',
    tags: ['Logo Design', 'Branding', 'Visual Identity'],
    mockupSide: 'right',
    badge: 'PROJECT SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#2563eb',
    bgTone: '#0b162c',
    coverImage: swaraElectricalsImg,
    projectImages: [
      swaraElectricalsImg,
    ],
    images: [
      swaraElectricalsImg,
    ],
    details: {
      overview: 'Swara Electricals is an electrical goods and retail showroom brand. The identity centers around a modern geometric monogram logomark that represents electrical connectivity and circuit flow, paired with an illuminated retail store aesthetic.',
      role: 'Logo Designer & Brand Identity Artist',
      timeline: '2 Weeks (2024)',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      deliverables: [
        'Geometric Circuit Logomark & Lockup',
        'Storefront Signage & Display Mockup',
        'Corporate Stationery & Business Collateral'
      ],
      galleryImages: [
        swaraElectricalsImg,
      ]
    }
  },
  {
    id: 'hyperlex-car-care-logo',
    number: '05',
    title: 'HYPERLEX - PREMIUM CAR CARE LOGO & BRANDING',
    subtitle: 'PPF • Ceramic Coating • Detailing',
    year: '2024',
    client: 'Hyperlex Premium Car Care Center',
    description: 'Dynamic automotive monogram logomark and brand identity for a high-end luxury auto detailing, ceramic coating, and PPF center.',
    tags: ['Logo Design', 'Branding', 'Automotive'],
    mockupSide: 'left',
    badge: 'PROJECT SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#ef4444',
    bgTone: '#180a0a',
    coverImage: hyperlexLogoImg,
    projectImages: [
      hyperlexLogoImg,
    ],
    images: [
      hyperlexLogoImg,
    ],
    details: {
      overview: 'Hyperlex is an elite automotive detailing studio specializing in Paint Protection Film (PPF), ceramic coatings, and precision car detailing. The logo blends an aerodynamic four-point star spark with a bold modern monogram "H", set against a high-contrast crimson and gloss-black automotive palette.',
      role: 'Lead Brand Identity & Automotive Logo Designer',
      timeline: '3 Weeks (2024)',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      deliverables: [
        'Aerodynamic Star Monogram & Vector Logotype',
        'Showroom Signage & Interior Wall Mockups',
        'Staff Apparel & Workwear Badges',
        'Car Care Chemical Product Label Suite'
      ],
      galleryImages: [
        hyperlexLogoImg,
      ]
    }
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'graphic-design',
    number: '01',
    title: 'GRAPHIC DESIGN',
    description: "I'm a Graphic Designer passionate about creating clean, creative, and impactful visuals that bring ideas and brands to life.",
    skills: [
      'Brand Identity & Guidelines',
      'Logo Mark Engineering',
      'Print Media',
      'Social Media Content Systems',
      'UI/UX & Product Design'
    ],
    tools: [
      { name: 'ADOBE PHOTOSHOP' },
      { name: 'ADOBE ILLUSTRATOR' },
      { name: 'INDESIGN' },
      { name: 'COREL DRAW' }
    ],
    highlights: [
      '100% vector-first precision scaling',
      'High-impact visual communication strategy',
      'Complete typography & color system architecture'
    ]
  },
  {
    id: 'video-editor',
    number: '02',
    title: 'VIDEO EDITOR',
    description: "I'm a Video Editor passionate about creating engaging, cinematic, and story-driven videos that turn ideas into impactful visual experiences.",
    skills: [
      'Cinematic Color Grading',
      'Motion Graphics & Kinetic Type',
      'Short-Form Viral Edits (Reels/TikTok/Shorts)',
      'Brand Storytelling & Commercials',
      'Sound Design & Audio Mastering'
    ],
    tools: [
      { name: 'ADOBE PREMIERE' },
      { name: 'ADOBE AFTER EFFECTS' },
      { name: 'CAPCUT' }
    ],
    highlights: [
      'Frame-accurate rhythmic pacing',
      'Custom motion animation transitions',
      'Multi-platform aspect ratio optimization'
    ]
  },
  {
    id: 'content-creation',
    number: '03',
    title: 'CONTENT CREATION',
    description: "I'm a Content Creator passionate about crafting high-engagement digital media, platform-tailored visual assets, and authentic storytelling that amplifies brand presence.",
    skills: [
      'Social Media Strategy & Reels',
      'Visual Storytelling & Copywriting',
      'Creative Direction & Scripting',
      'Carousel & Infographic Design',
      'Viral Hooks & Audience Growth'
    ],
    tools: [
      { name: 'FIGMA' },
      { name: 'CANVA PRO' },
      { name: 'META SUITE' },
      { name: 'NOTION' }
    ],
    highlights: [
      'Audience-centric storytelling framework',
      'Cross-platform algorithmic optimization',
      'Consistent multi-channel brand aesthetics'
    ]
  }
];

export const tickerKeywords = [
  'MARKETING',
  'BRANDING',
  'DESIGNING',
  'DIGITAL MARKETING',
  'CONTENT MAKING',
  'VIDEO EDITING',
  'UI/UX DESIGN',
  'LOGO DESIGN',
  'MOTION GRAPHICS',
  'VISUAL IDENTITY'
];
