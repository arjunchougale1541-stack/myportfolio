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
import auroraPackagingImg from '../assets/images/works/aurora_packaging.jpg';
import fintechUiuxImg from '../assets/images/works/fintech_dashboard.jpg';
import kineticMotionImg from '../assets/images/works/kinetic_typography.jpg';
import fitnessSocialImg from '../assets/images/works/fitness_campaign.jpg';
import auroraLogoImg from '../assets/images/works/aurora_logomark.jpg';
import botanicalPackagingImg from '../assets/images/works/botanical_packaging.jpg';
import streetwearReelImg from '../assets/images/works/streetwear_reel.jpg';
import swaraElectricalsImg from '../assets/images/works/swara_electricals_logo.jpg';
import hyperlexLogoImg from '../assets/images/works/hyperlex_logo.png';
import { ProjectItem } from '../types';

export type WorkCategory =
  | 'Logo Designs'
  | 'Social Media Posts'
  | 'Branding'
  | 'Packaging Design'
  | 'Reels'
  | 'Motion Graphic'
  | 'UIUX Design';

export interface CategorySectionMeta {
  id: string;
  name: WorkCategory;
  subtitle: string;
  count: number;
}

export interface WorkProjectItem {
  id: string;
  title: string;
  category: WorkCategory;
  categories: WorkCategory[];
  image: string;
  coverImage?: string;
  projectImages?: string[];
  images?: string[];
  year: string;
  client?: string;
  description: string;
  badge?: string;
  aspectClass?: string;
  accentColor?: string;
  objectPosition?: string;
  projectItem?: ProjectItem;
}

export const WORK_SECTIONS: CategorySectionMeta[] = [
  {
    id: 'logo-designs',
    name: 'Logo Designs',
    subtitle: 'Vector logomarks, monogram explorations, and brand mark identities.',
    count: 8,
  },
  {
    id: 'social-media-posts',
    name: 'Social Media Posts',
    subtitle: 'High-engagement multi-slide carousels and digital marketing suites.',
    count: 6,
  },
  {
    id: 'branding',
    name: 'Branding',
    subtitle: 'Full-spectrum visual identity systems, typography, and art direction.',
    count: 6,
  },
  {
    id: 'packaging-design',
    name: 'Packaging Design',
    subtitle: 'Luxury rigid boxes, bottles, custom pouches, and unboxing experiences.',
    count: 6,
  },
  {
    id: 'reels',
    name: 'Reels',
    subtitle: 'High-retention cinematic edits, bass-synced drops, and viral video cuts.',
    count: 6,
  },
  {
    id: 'motion-graphic',
    name: 'Motion Graphic',
    subtitle: 'Dynamic 3D kinetic typography, animated ribbons, and living posters.',
    count: 6,
  },
  {
    id: 'uiux-design',
    name: 'UIUX Design',
    subtitle: 'Dark-mode analytics dashboards, fintech mobile apps, and Figma kits.',
    count: 6,
  },
];

export const worksByCategory: Record<string, WorkProjectItem[]> = {
  'logo-designs': [
    {
      id: 'hyperlex-car-care-logo',
      title: 'HYPERLEX - PREMIUM CAR CARE LOGO & BRANDING',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: hyperlexLogoImg,
      coverImage: hyperlexLogoImg,
      projectImages: [
        hyperlexLogoImg,
      ],
      images: [
        hyperlexLogoImg,
      ],
      year: '2024',
      client: 'Hyperlex Premium Car Care Center',
      description: 'Dynamic automotive monogram logomark and brand identity for a high-end luxury auto detailing, ceramic coating, and PPF center.',
      badge: 'PROJECT SHOWCASE',
      accentColor: '#ef4444',
    },
    {
      id: 'swara-electricals-logo',
      title: 'SWARA ELECTRICALS - LOGO & STORE IDENTITY',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: swaraElectricalsImg,
      coverImage: swaraElectricalsImg,
      projectImages: [
        swaraElectricalsImg,
      ],
      images: [
        swaraElectricalsImg,
      ],
      year: '2024',
      client: 'Swara Electricals',
      description: 'Modern geometric monogram logomark and complete electrical retail showroom identity featuring circuit-inspired iconography.',
      badge: 'PROJECT SHOWCASE',
      accentColor: '#2563eb',
    },
    {
      id: 'aurora-technology-logo',
      title: 'AURORA TECH LOGO & IDENTITY SYSTEM',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: auroraLogoImg,
      year: '2024',
      client: 'Aurora Next-Gen Systems',
      description: 'Geometric interlocking lettermark paired with high-contrast corporate typography guidelines.',
      badge: 'LOGO MARK',
      accentColor: '#3b82f6',
    },
    {
      id: 'minimal-vector-logomarks',
      title: 'GEOMETRIC MONOGRAM LOGO COLLECTION',
      category: 'Logo Designs',
      categories: ['Logo Designs'],
      image: auroraLogoImg,
      year: '2024',
      client: 'Various Startups & Creators',
      description: 'Curated compilation of minimalist vector marks, negative-space glyphs, and responsive lockups.',
      badge: 'LOGO EXPLORATION',
      accentColor: '#4757fe',
    },
    {
      id: 'axial-brand-symbol',
      title: 'AXIAL GRAPHIC EMBLEM & VECTOR SYSTEM',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: axialImg,
      coverImage: axialImg,
      projectImages: [
        axialCaseStudyImg,
      ],
      images: [
        axialCaseStudyImg,
      ],
      year: '2023',
      client: 'Axial Graphic Studio',
      description: 'Bold constructivist symbol crafted from pure geometric lines and industrial precision aesthetics.',
      badge: 'STUDIO MARK',
      accentColor: '#5362ff',
    },
    {
      id: 'candy-cloud-mascot-mark',
      title: 'CANDY CLOUD JUBILANT LOGOTYPE',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Packaging Design'],
      image: candyImg,
      coverImage: candyImg,
      projectImages: [
        candyCloudCaseStudyImg,
      ],
      images: [
        candyCloudCaseStudyImg,
      ],
      year: '2024',
      client: 'Candy Cloud Confectionery',
      description: 'Hand-lettered rounded confectionary wordmark with whimsical cloud mascot iconography.',
      badge: 'RETAIL LOGO',
      accentColor: '#ec4899',
    },
    {
      id: 'devsthan-samiti-insignia',
      title: 'DEVSTHAN SACRED ARCHITECTURAL EMBLEM',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: devsthanImg,
      coverImage: devsthanImg,
      projectImages: [
        devsthanCaseStudyImg,
      ],
      images: [
        devsthanCaseStudyImg,
      ],
      year: '2024',
      client: 'Devsthan Vyavasthapan Samiti',
      description: 'Revered temple shikhar silhouette synthesized into a balanced royal emblem lockup.',
      badge: 'CULTURAL MARK',
      accentColor: '#f59e0b',
    },
    {
      id: 'zenpulse-brandmark',
      title: 'ZENPULSE WELLNESS MINIMAL MARK',
      category: 'Logo Designs',
      categories: ['Logo Designs'],
      image: botanicalPackagingImg,
      year: '2024',
      client: 'ZenPulse Organic Life',
      description: 'Organic leaf contour combined with harmonic spiral curves for sustainable wellness branding.',
      badge: 'ORGANIC MARK',
      accentColor: '#10b981',
    },
  ],

  'social-media-posts': [
    {
      id: 'quantum-sports-social',
      title: 'QUANTUM FITNESS SOCIAL MEDIA CAROUSEL',
      category: 'Social Media Posts',
      categories: ['Social Media Posts', 'Branding'],
      image: fitnessSocialImg,
      coverImage: fitnessSocialImg,
      projectImages: [
        fitnessSocialImg,
        streetwearReelImg,
        kineticMotionImg,
      ],
      images: [
        fitnessSocialImg,
        streetwearReelImg,
        kineticMotionImg,
      ],
      year: '2024',
      client: 'Quantum Athletics',
      description: 'Multi-slide Instagram carousel series engineered for high engagement and performance sport storytelling.',
      badge: 'SOCIAL CAMPAIGN',
      accentColor: '#38bdf8',
    },
    {
      id: 'creator-growth-social-pack',
      title: 'CREATOR ACCELERATOR REEL & POST KIT',
      category: 'Social Media Posts',
      categories: ['Social Media Posts', 'Reels'],
      image: fitnessSocialImg,
      coverImage: fitnessSocialImg,
      projectImages: [
        fitnessSocialImg,
        kineticMotionImg,
        axialImg,
      ],
      images: [
        fitnessSocialImg,
        kineticMotionImg,
        axialImg,
      ],
      year: '2024',
      client: 'Digital Vigyapan Media',
      description: 'Cohesive multi-platform graphic toolkit with thumb-stopping covers, reel title cards, and story templates.',
      badge: 'SOCIAL SUITE',
      accentColor: '#8b5cf6',
    },
    {
      id: 'axial-typography-grid',
      title: 'AXIAL INSTAGRAM TYPOGRAPHY SERIES',
      category: 'Social Media Posts',
      categories: ['Social Media Posts', 'Branding'],
      image: axialImg,
      coverImage: axialImg,
      projectImages: [
        axialCaseStudyImg,
        kineticMotionImg,
      ],
      images: [
        axialCaseStudyImg,
        kineticMotionImg,
      ],
      year: '2023',
      client: 'Axial Design Community',
      description: 'Curated 9-post feed grid exploring kinetic type layouts and high-contrast brutalist design rules.',
      badge: 'FEED SYSTEM',
      accentColor: '#6366f1',
    },
    {
      id: 'devsthan-utsav-campaign',
      title: 'DEVSTHAN UTSAV DIGITAL CAMPAIGN & STORIES',
      category: 'Social Media Posts',
      categories: ['Social Media Posts', 'Branding'],
      image: devsthanImg,
      coverImage: devsthanImg,
      projectImages: [
        devsthanCaseStudyImg,
      ],
      images: [
        devsthanCaseStudyImg,
      ],
      year: '2024',
      client: 'Kolhapur Cultural Trust',
      description: 'Rich festive countdown graphics, devotional quotes, and informational story series viewed by millions.',
      badge: 'FESTIVAL SUITE',
      accentColor: '#f59e0b',
    },
    {
      id: 'candy-cloud-promotional-feed',
      title: 'CANDY CLOUD SUMMER TREATS CAROUSEL',
      category: 'Social Media Posts',
      categories: ['Social Media Posts', 'Packaging Design'],
      image: candyImg,
      coverImage: candyImg,
      projectImages: [
        candyCloudCaseStudyImg,
        candyCloudUiuxImg,
      ],
      images: [
        candyCloudCaseStudyImg,
        candyCloudUiuxImg,
      ],
      year: '2024',
      client: 'Candy Cloud D2C',
      description: 'Pastel-toned high-conversion ad creatives and unboxing carousels generating record seasonal conversions.',
      badge: 'D2C CAMPAIGN',
      accentColor: '#f43f5e',
    },
    {
      id: 'fintech-crypto-announcement',
      title: 'NEXUS FEATURE RELEASE POST SERIES',
      category: 'Social Media Posts',
      categories: ['Social Media Posts', 'UIUX Design'],
      image: fintechUiuxImg,
      coverImage: fintechUiuxImg,
      projectImages: [
        fintechUiuxImg,
        kineticMotionImg,
      ],
      images: [
        fintechUiuxImg,
        kineticMotionImg,
      ],
      year: '2024',
      client: 'Nexus Cloud Analytics',
      description: 'Infographic-style carousel explaining complex algorithmic yields with sleek dark neon UI snippets.',
      badge: 'TECH CAROUSEL',
      accentColor: '#06b6d4',
    },
  ],

  'branding': [
    {
      id: 'personal-branding',
      title: 'AXIAL GRAPHIC - DRIVEN BY DESIGN',
      category: 'Branding',
      categories: ['Branding', 'Logo Designs', 'Social Media Posts'],
      image: axialImg,
      coverImage: axialDesktopImg,
      projectImages: [
        axialCaseStudyImg,
      ],
      images: [
        axialCaseStudyImg,
      ],
      year: '2023',
      client: 'Arjun Chougale / Self Identity',
      description: 'Axial Graphic is my personal design identity, built to represent my creative journey and style as a graphic designer. Symbolizing structure, balance, and visual stability, this identity serves as the visual voice of my creative career.',
      badge: 'FEATURED CASE STUDY',
      accentColor: '#5362ff',
    },
    {
      id: 'devsthan-samiti',
      title: 'DEVSTHAN SAMITI CULTURAL HERITAGE IDENTITY',
      category: 'Branding',
      categories: ['Branding', 'Logo Designs', 'UIUX Design'],
      image: devsthanImg,
      coverImage: devsthanDesktopImg,
      projectImages: [
        devsthanCaseStudyImg,
      ],
      images: [
        devsthanCaseStudyImg,
      ],
      year: '2024',
      client: 'Devsthan Vyavasthapan Samiti, Kolhapur',
      description: 'Sacred architectural emblem, bilingual administrative stationery suite, and digital temple portal system.',
      badge: 'CULTURAL IDENTITY',
      accentColor: '#f59e0b',
    },
    {
      id: 'candy-cloud-full-branding',
      title: 'CANDY CLOUD BRAND IDENTITY & SYSTEM',
      category: 'Branding',
      categories: ['Branding', 'Packaging Design'],
      image: candyImg,
      coverImage: candyDesktopImg,
      projectImages: [
        candyCloudCaseStudyImg,
      ],
      images: [
        candyCloudCaseStudyImg,
      ],
      year: '2024',
      client: 'Candy Cloud Confectionery Co.',
      description: 'End-to-end brand guidelines, typography pairing, joyful color systems, and physical packaging assets.',
      badge: 'FULL IDENTITY',
      accentColor: '#ec4899',
    },
    {
      id: 'aurora-corporate-branding',
      title: 'AURORA NEXT-GEN ENTERPRISE BRANDING',
      category: 'Branding',
      categories: ['Branding', 'Logo Designs'],
      image: auroraLogoImg,
      year: '2024',
      client: 'Aurora Systems Global',
      description: 'Comprehensive design manual covering trade show booths, corporate stationery, and digital presence.',
      badge: 'ENTERPRISE SUITE',
      accentColor: '#2563eb',
    },
    {
      id: 'serene-organic-branding',
      title: 'SERENE BOTANICALS VISUAL IDENTITY',
      category: 'Branding',
      categories: ['Branding', 'Packaging Design'],
      image: botanicalPackagingImg,
      year: '2024',
      client: 'Serene Skincare Labs',
      description: 'Minimalist earth-toned identity, debossed tactile print assets, and sustainable packaging ethos.',
      badge: 'SUSTAINABLE BRAND',
      accentColor: '#10b981',
    },
    {
      id: 'quantum-athletics-brand',
      title: 'QUANTUM SPORTS PERFORMANCE SYSTEM',
      category: 'Branding',
      categories: ['Branding', 'Social Media Posts'],
      image: fitnessSocialImg,
      year: '2024',
      client: 'Quantum Athletics USA',
      description: 'High-octane visual identity engineered for competitive athletics, apparel badges, and digital presence.',
      badge: 'PERFORMANCE BRAND',
      accentColor: '#38bdf8',
    },
  ],

  'packaging-design': [
    {
      id: 'candy-cloud',
      title: 'CANDY CLOUD - CONFECTIONERY BRANDING',
      category: 'Packaging Design',
      categories: ['Packaging Design', 'Branding', 'Logo Designs'],
      image: candyImg,
      coverImage: candyDesktopImg,
      projectImages: [
        candyCloudCaseStudyImg,
      ],
      images: [
        candyCloudCaseStudyImg,
      ],
      year: '2024',
      client: 'Candy Cloud Confectionery Co.',
      description: 'Artisanal confectionery branding, custom packaging boxes, paper cups, and joyful brand guidelines.',
      badge: 'PACKAGING',
      accentColor: '#ec4899',
    },
    {
      id: 'aurora-premium-elixir',
      title: 'AURORA ELIXIR LUXURY BEVERAGE PACKAGING',
      category: 'Packaging Design',
      categories: ['Packaging Design', 'Branding'],
      image: auroraPackagingImg,
      year: '2024',
      client: 'Aurora Craft Distillery',
      description: 'Matte obsidian glass bottle with electric foil debossing and luxury rigid gift box packaging.',
      badge: 'LUXURY PACKAGING',
      accentColor: '#6366f1',
    },
    {
      id: 'serene-botanical-oil-box',
      title: 'SERENE BOTANICAL FACE OIL & PACKAGING',
      category: 'Packaging Design',
      categories: ['Packaging Design', 'Branding'],
      image: botanicalPackagingImg,
      year: '2024',
      client: 'Serene Skincare Labs',
      description: 'Minimalist matte frosted dropper bottle with textured unbleached pulp outer cartons.',
      badge: 'ORGANIC PACKAGING',
      accentColor: '#10b981',
    },
    {
      id: 'quantum-electrolyte-pouch',
      title: 'QUANTUM AMINO SUPPLEMENT SACHET & TUB',
      category: 'Packaging Design',
      categories: ['Packaging Design'],
      image: fitnessSocialImg,
      year: '2024',
      client: 'Quantum Athletics Nutrition',
      description: 'Metallic finish nutritional supplement container with holographic seal and moisture-lock pouches.',
      badge: 'SPORT NUTRITION',
      accentColor: '#0ea5e9',
    },
    {
      id: 'artisan-confection-giftbox',
      title: 'SUGARBLISS PREMIUM CHOCOLATE BOX',
      category: 'Packaging Design',
      categories: ['Packaging Design'],
      image: candyImg,
      year: '2024',
      client: 'SugarBliss Chocolatiers',
      description: 'Die-cut magnetic clasp chocolate boxes with gold leaf foiling and bespoke inner confectionery trays.',
      badge: 'GIFT PACKAGING',
      accentColor: '#d946ef',
    },
    {
      id: 'obsidian-noir-fragrance',
      title: 'OBSIDIAN NOIR COLOGNE BOTTLE & CRATE',
      category: 'Packaging Design',
      categories: ['Packaging Design'],
      image: auroraPackagingImg,
      year: '2024',
      client: 'Maison Noir Perfumes',
      description: 'Sculpted heavy-base glass flacon with brushed titanium cap and luxury wooden presentation crate.',
      badge: 'FRAGRANCE DESIGN',
      accentColor: '#4f46e5',
    },
  ],

  'reels': [
    {
      id: 'velocity-reels-showcase',
      title: 'VELOCITY AUTOMOTIVE VIRAL REEL EDIT',
      category: 'Reels',
      categories: ['Reels', 'Motion Graphic', 'Social Media Posts'],
      image: kineticMotionImg,
      year: '2024',
      client: 'Velocity Motors',
      description: 'Speed-ramped cinematic reel edit with synced bass drops, kinetic type overlays, and color grading.',
      badge: 'VIRAL REEL',
      accentColor: '#ec4899',
    },
    {
      id: 'streetwear-urban-reel',
      title: 'URBAN NEON STREETWEAR CAMPAIGN REEL',
      category: 'Reels',
      categories: ['Reels', 'Motion Graphic'],
      image: streetwearReelImg,
      year: '2024',
      client: 'Sync City Apparel',
      description: 'Nighttime neon Tokyo vibe with stutter cuts, dynamic camera whip pans, and glitch transitions.',
      badge: 'FASHION REEL',
      accentColor: '#06b6d4',
    },
    {
      id: 'cyberpulse-festival-reel',
      title: 'CYBERPULSE CONCERT FESTIVAL TEASER',
      category: 'Reels',
      categories: ['Reels', 'Motion Graphic'],
      image: kineticMotionImg,
      year: '2024',
      client: 'CyberPulse Sound Festival',
      description: 'Hard-hitting electronic music teaser reel engineered to maximize story shares and ticket presales.',
      badge: 'MUSIC REEL',
      accentColor: '#a855f7',
    },
    {
      id: 'candy-cloud-asmr-unboxing',
      title: 'CANDY CLOUD ASMR UNBOXING REEL',
      category: 'Reels',
      categories: ['Reels', 'Packaging Design'],
      image: candyImg,
      coverImage: candyImg,
      projectImages: [
        candyCloudCaseStudyImg,
      ],
      images: [
        candyCloudCaseStudyImg,
      ],
      year: '2024',
      client: 'Candy Cloud Confectionery',
      description: 'Crisp macro audio-synced unboxing reel showcasing package textures, tear strips, and vibrant sweets.',
      badge: 'PRODUCT REEL',
      accentColor: '#f43f5e',
    },
    {
      id: 'quantum-athlete-motivation',
      title: 'QUANTUM BURNOUT HIGH-ENERGY REEL',
      category: 'Reels',
      categories: ['Reels', 'Social Media Posts'],
      image: fitnessSocialImg,
      coverImage: fitnessSocialImg,
      projectImages: [
        fitnessSocialImg,
      ],
      images: [
        fitnessSocialImg,
      ],
      year: '2024',
      client: 'Quantum Athletics',
      description: 'Fast-paced motivational reel with rhythm-matched typography and intense color contrast grading.',
      badge: 'ATHLETIC REEL',
      accentColor: '#38bdf8',
    },
    {
      id: 'devsthan-heritage-cinematic',
      title: 'KOLHAPUR TEMPLE ARCHITECTURE REEL',
      category: 'Reels',
      categories: ['Reels', 'Branding'],
      image: devsthanImg,
      coverImage: devsthanImg,
      projectImages: [
        devsthanCaseStudyImg,
      ],
      images: [
        devsthanCaseStudyImg,
      ],
      year: '2024',
      client: 'Devsthan Media Cell',
      description: 'Breathtaking 4K drone transitions, devotional instrumental audio grading, and cultural title typography.',
      badge: 'HERITAGE REEL',
      accentColor: '#f59e0b',
    },
  ],

  'motion-graphic': [
    {
      id: 'kinetic-motion-typography',
      title: 'CYBERPULSE 3D KINETIC TYPOGRAPHY',
      category: 'Motion Graphic',
      categories: ['Motion Graphic', 'Reels'],
      image: kineticMotionImg,
      year: '2024',
      client: 'CyberPulse Sound Festival',
      description: 'Dynamic 3D kinetic typography and neon light trail ribbon animation for concert visuals and reels.',
      badge: 'MOTION REEL',
      accentColor: '#a855f7',
    },
    {
      id: 'synthwave-audio-spectrum',
      title: 'NEON WAVE AUDIO REACTIVE VISUALIZER',
      category: 'Motion Graphic',
      categories: ['Motion Graphic'],
      image: kineticMotionImg,
      year: '2024',
      client: 'Axial Sound Labs',
      description: 'Real-time procedural frequency visualizer built in After Effects with responsive chromatic aberration.',
      badge: 'AUDIO MOTION',
      accentColor: '#ec4899',
    },
    {
      id: 'nexus-fintech-3d-loop',
      title: 'NEXUS LIQUID DATA TRANSACTION LOOP',
      category: 'Motion Graphic',
      categories: ['Motion Graphic', 'UIUX Design'],
      image: fintechUiuxImg,
      year: '2024',
      client: 'Nexus Cloud Analytics',
      description: 'Hypnotic 3D spline data sphere visualizing global financial transfers for marketing landing pages.',
      badge: '3D ABSTRACT',
      accentColor: '#06b6d4',
    },
    {
      id: 'aurora-sonic-logo-reveal',
      title: 'AURORA 3D METALLIC LOGO REVEAL',
      category: 'Motion Graphic',
      categories: ['Motion Graphic', 'Logo Designs'],
      image: auroraLogoImg,
      year: '2024',
      client: 'Aurora Systems',
      description: 'Cinema 4D metallic fluid extrusion assembling the Aurora monogram with precision sound design.',
      badge: 'LOGO REVEAL',
      accentColor: '#3b82f6',
    },
    {
      id: 'streetwear-hud-graphics',
      title: 'CYBER TECHWEAR ANIMATED HUD OVERLAYS',
      category: 'Motion Graphic',
      categories: ['Motion Graphic', 'Reels'],
      image: streetwearReelImg,
      year: '2024',
      client: 'Sync City Apparel',
      description: 'Futuristic sci-fi UI wireframes, rotating reticles, and barcode scanners for video overlays.',
      badge: 'HUD ANIMATION',
      accentColor: '#14b8a6',
    },
    {
      id: 'axial-living-poster',
      title: 'AXIAL GRAPHIC LIVING POSTER SERIES',
      category: 'Motion Graphic',
      categories: ['Motion Graphic', 'Branding'],
      image: axialImg,
      coverImage: axialImg,
      projectImages: [
        axialCaseStudyImg,
      ],
      images: [
        axialCaseStudyImg,
      ],
      year: '2023',
      client: 'Axial Graphic Studio',
      description: 'Continuous kinetic Swiss typography poster loops demonstrating modern grid deconstruction.',
      badge: 'LIVING POSTER',
      accentColor: '#4f46e5',
    },
  ],

  'uiux-design': [
    {
      id: 'fintech-dashboard-uiux',
      title: 'NEXUS CLOUD DASHBOARD & MOBILE APP',
      category: 'UIUX Design',
      categories: ['UIUX Design'],
      image: fintechUiuxImg,
      year: '2024',
      client: 'Nexus Cloud Analytics',
      description: 'Ultra-modern dark mode analytics interface, real-time performance curves, and mobile responsive dashboard.',
      badge: 'UI/UX SYSTEM',
      accentColor: '#06b6d4',
    },
    {
      id: 'fintech-mobile-wallet-ui',
      title: 'PULSE CRYPTO & WALLET MOBILE APP',
      category: 'UIUX Design',
      categories: ['UIUX Design'],
      image: fintechUiuxImg,
      year: '2024',
      client: 'Pulse Decentralized Finance',
      description: 'Seamless onboarding flow, biometric transaction confirmation, and dark mode design system in Figma.',
      badge: 'MOBILE APP UI',
      accentColor: '#10b981',
    },
    {
      id: 'candy-cloud-ecommerce-experience',
      title: 'CANDY CLOUD IMMERSIVE D2C SHOP',
      category: 'UIUX Design',
      categories: ['UIUX Design', 'Packaging Design'],
      image: candyCloudUiuxImg,
      coverImage: candyCloudUiuxImg,
      projectImages: [
        candyCloudCaseStudyImg,
      ],
      images: [
        candyCloudCaseStudyImg,
      ],
      year: '2024',
      client: 'Candy Cloud D2C Store',
      description: 'Full-page responsive D2C web experience featuring cloud-soft aesthetic, interactive categories, and seamless shopping cart flow.',
      badge: 'SCROLLABLE WEB UI',
      accentColor: '#ec4899',
      objectPosition: 'top',
    },
    {
      id: 'devsthan-temple-portal',
      title: 'DEVSTHAN DIGITAL PILGRIM & LIVE DARSHAN',
      category: 'UIUX Design',
      categories: ['UIUX Design', 'Branding'],
      image: devsthanImg,
      coverImage: devsthanImg,
      projectImages: [
        devsthanCaseStudyImg,
      ],
      images: [
        devsthanCaseStudyImg,
      ],
      year: '2024',
      client: 'Devsthan Trust, Kolhapur',
      description: 'Bilingual responsive portal with live darshan stream player, VIP booking, and donation flows.',
      badge: 'WEB PORTAL',
      accentColor: '#f59e0b',
    },
    {
      id: 'aurora-design-system-kit',
      title: 'AURORA ENTERPRISE FIGMA DESIGN SYSTEM',
      category: 'UIUX Design',
      categories: ['UIUX Design', 'Branding'],
      image: auroraLogoImg,
      year: '2024',
      client: 'Aurora Next-Gen Systems',
      description: 'Over 200 component variants, accessible WCAG color scales, typography tokens, and interactive guidelines.',
      badge: 'DESIGN SYSTEM',
      accentColor: '#3b82f6',
    },
    {
      id: 'healthpulse-wearable-companion',
      title: 'HEALTHPULSE REAL-TIME BIOMETRIC APP',
      category: 'UIUX Design',
      categories: ['UIUX Design', 'Social Media Posts'],
      image: fitnessSocialImg,
      year: '2024',
      client: 'HealthPulse Tech',
      description: 'Minimalist dark interface displaying heart rate variability, sleep quality stages, and workout streaks.',
      badge: 'WEARABLE UI',
      accentColor: '#0ea5e9',
    },
  ],
};

// Flattened export for any external references
export const worksData: WorkProjectItem[] = Object.values(worksByCategory).flat();
