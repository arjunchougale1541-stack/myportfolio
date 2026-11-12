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
import swaraLogoCoverImg from '../assets/images/works/swara_logo_cover.png';
import swaraLogoCaseStudyImg from '../assets/images/works/swara_logo_case_study.png';
import marbexLogoCoverImg from '../assets/images/works/marbex_logo_cover.png';
import marbexLogoCaseStudyImg from '../assets/images/works/marbex_logo_case_study.png';
import soulFashionLogoCoverImg from '../assets/images/works/soul_fashion_logo_cover.png';
import soulFashionLogoCaseStudyImg from '../assets/images/works/soul_fashion_logo_case_study.png';
import vbEventsLogoCoverImg from '../assets/images/works/vb_events_logo_cover.png';
import vbEventsLogoCaseStudyImg from '../assets/images/works/vb_events_logo_case_study.png';
import swaraElectricalsImg from '../assets/images/works/swara_electricals_logo.jpg';
import hyperlexLogoCoverImg from '../assets/images/works/hyperlex_logo_cover.png';
import hyperlexLogoCaseStudyImg from '../assets/images/works/hyperlex_logo_case_study.png';
import hyperlexLogoImg from '../assets/images/works/hyperlex_logo.png';
import dimoraCoverImg from '../assets/images/works/dimora_logo_cover.png';
import dimoraCaseStudyImg from '../assets/images/works/dimora_case_study.png';
import axialLogoCoverImg from '../assets/images/works/axial_logo_cover.png';
import axialLogoCaseStudyImg from '../assets/images/works/axial_logo_case_study.png';
import candyCloudLogoCoverImg from '../assets/images/works/candy_cloud_logo_cover.png';
import candyCloudLogoCaseStudyImg from '../assets/images/works/candy_cloud_logo_case_study.png';
import devsthanLogoCoverImg from '../assets/images/works/devsthan_samiti_logo_cover.png';
import devsthanLogoCaseStudyImg from '../assets/images/works/devsthan_samiti_logo_case_study.png';
import getItLogoCoverImg from '../assets/images/works/get_it_logo_cover.png';
import getItLogoCaseStudyImg from '../assets/images/works/get_it_logo_case_study.png';
import getItSocialCoverImg from '../assets/images/works/get_it_social_cover.jpg';
import getItSocialPost1Img from '../assets/images/works/get_it_social_post_1.jpg';
import getItSocialPost2Img from '../assets/images/works/get_it_social_post_2.jpg';
import getItSocialPost3Img from '../assets/images/works/get_it_social_post_3.jpg';
import getItSocialPost4Img from '../assets/images/works/get_it_social_post_4.jpg';
import getItSocialPost5Img from '../assets/images/works/get_it_social_post_5.jpg';
import getItSocialPost6Img from '../assets/images/works/get_it_social_post_6.jpg';
import dimoraSocialCoverImg from '../assets/images/works/dimora_social_cover.jpg';
import dimoraSocialPost1Img from '../assets/images/works/dimora_social_post_1.jpg';
import dimoraSocialPost2Img from '../assets/images/works/dimora_social_post_2.jpg';
import dimoraSocialPost3Img from '../assets/images/works/dimora_social_post_3.jpg';
import dimoraSocialPost4Img from '../assets/images/works/dimora_social_post_4.jpg';
import dimoraSocialPost5Img from '../assets/images/works/dimora_social_post_5.jpg';
import dimoraSocialPost6Img from '../assets/images/works/dimora_social_post_6.jpg';
import konnectCompilerSocialCoverImg from '../assets/images/works/konnect_compiler_social_cover.jpg';
import konnectCompilerSocialPost1Img from '../assets/images/works/konnect_compiler_social_post_1.jpg';
import konnectCompilerSocialPost2Img from '../assets/images/works/konnect_compiler_social_post_2.jpg';
import konnectCompilerSocialPost3Img from '../assets/images/works/konnect_compiler_social_post_3.jpg';
import konnectCompilerSocialPost4Img from '../assets/images/works/konnect_compiler_social_post_4.jpg';
import konnectCompilerSocialPost5Img from '../assets/images/works/konnect_compiler_social_post_5.jpg';
import konnectCompilerSocialPost6Img from '../assets/images/works/konnect_compiler_social_post_6.jpg';
import konnectCompilerSocialPost7Img from '../assets/images/works/konnect_compiler_social_post_7.jpg';
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
    count: 10,
  },
  {
    id: 'social-media-posts',
    name: 'Social Media Posts',
    subtitle: 'High-engagement multi-slide carousels and digital marketing suites.',
    count: 3,
  },
  {
    id: 'branding',
    name: 'Branding',
    subtitle: 'Full-spectrum visual identity systems, typography, and art direction.',
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
      id: 'get-it-delivery-logo',
      title: 'GET IT - ON-DEMAND DELIVERY LOGO & IDENTITY',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: getItLogoCoverImg,
      coverImage: getItLogoCoverImg,
      projectImages: [
        getItLogoCaseStudyImg,
      ],
      images: [
        getItLogoCaseStudyImg,
      ],
      year: '2024',
      client: 'Get It Technologies / On-Demand Delivery Co.',
      description: 'Dynamic location-pin spiral monogram and bold delivery branding symbolizing speed, real-time tracking, and seamless quick commerce.',
      badge: 'LOGO SHOWCASE',
      accentColor: '#F7931A',
    },
    {
      id: 'dimora-luxury-fragrance-logo',
      title: 'DIMORA - LUXURY FRAGRANCE LOGO & IDENTITY',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Packaging Design', 'Branding'],
      image: dimoraCoverImg,
      coverImage: dimoraCoverImg,
      projectImages: [
        dimoraCaseStudyImg,
      ],
      images: [
        dimoraCaseStudyImg,
      ],
      year: '2024',
      client: 'Dimora Haute Parfumerie',
      description: 'Symmetrical geometric monogram logo and luxury perfume brand identity inspired by the letter D, fragrance flow, and balanced elegance.',
      badge: 'LUXURY LOGO',
      accentColor: '#c7b299',
    },
    {
      id: 'hyperlex-car-care-logo',
      title: 'HYPERLEX - PREMIUM CAR CARE LOGO & BRANDING',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: hyperlexLogoCoverImg,
      coverImage: hyperlexLogoCoverImg,
      projectImages: [
        hyperlexLogoCaseStudyImg,
      ],
      images: [
        hyperlexLogoCaseStudyImg,
      ],
      year: '2024',
      client: 'Hyperlex Premium Car Care Center',
      description: 'Aerodynamic star monogram and high-performance automotive branding for luxury car detailing, PPF, and ceramic coating.',
      badge: 'LOGO SHOWCASE',
      accentColor: '#d33a2c',
    },
    {
      id: 'swara-electricals-logo',
      title: 'SWARA ELECTRICALS - LOGO & STORE IDENTITY',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: swaraLogoCoverImg,
      coverImage: swaraLogoCoverImg,
      projectImages: [
        swaraLogoCaseStudyImg,
      ],
      images: [
        swaraLogoCaseStudyImg,
      ],
      year: '2024',
      client: 'Swara Electricals & Lighting Hub',
      description: 'Geometric monogram S glyph symbolizing electrical power, connectivity, and modern tech-forward retail showroom identity.',
      badge: 'LOGO SHOWCASE',
      accentColor: '#1e72d8',
    },
    {
      id: 'marbex-furniture-interiors-logo',
      title: 'MARBEX - LUXURY FURNITURE & INTERIORS LOGO',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: marbexLogoCoverImg,
      coverImage: marbexLogoCoverImg,
      projectImages: [
        marbexLogoCaseStudyImg,
      ],
      images: [
        marbexLogoCaseStudyImg,
      ],
      year: '2024',
      client: 'Marbex Home & Luxury Interiors',
      description: 'Elegant geometric M monogram blending architectural structure, comfort curves, and metallic gold for a luxury furniture atelier.',
      badge: 'LOGO SHOWCASE',
      accentColor: '#d4af37',
    },
    {
      id: 'soul-fashion-logo',
      title: 'SOUL FASHION - LUXURY ATELIER LOGO & IDENTITY',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: soulFashionLogoCoverImg,
      coverImage: soulFashionLogoCoverImg,
      projectImages: [
        soulFashionLogoCaseStudyImg,
      ],
      images: [
        soulFashionLogoCaseStudyImg,
      ],
      year: '2024',
      client: 'Soul Fashion Haute Couture',
      description: 'Fluid swirling emblem inspired by elegance, harmony, and feminine grace for a luxury fashion house.',
      badge: 'LOGO SHOWCASE',
      accentColor: '#751a1f',
    },
    {
      id: 'vb-events-luxury-logo',
      title: 'VB EVENTS - CELEBRATION & EVENT DESIGN LOGO',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: vbEventsLogoCoverImg,
      coverImage: vbEventsLogoCoverImg,
      projectImages: [
        vbEventsLogoCaseStudyImg,
      ],
      images: [
        vbEventsLogoCaseStudyImg,
      ],
      year: '2024',
      client: 'VB Events & Luxury Wedding Co.',
      description: 'Opulent gold monogram intertwined with celebratory growth leaves, designed for high-end bespoke celebrations.',
      badge: 'LOGO SHOWCASE',
      accentColor: '#d4a037',
    },
    {
      id: 'axial-brand-symbol',
      title: 'AXIAL GRAPHIC - DRIVEN BY DESIGN',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: axialLogoCoverImg,
      coverImage: axialLogoCoverImg,
      projectImages: [
        axialLogoCaseStudyImg,
      ],
      images: [
        axialLogoCaseStudyImg,
      ],
      year: '2024',
      client: 'Axial Graphic Studio',
      description: 'Bold constructivist letterforms representing Letter A for Axial, Letter G for Graphic, and creative blocks for design and build.',
      badge: 'LOGO SHOWCASE',
      accentColor: '#3f46af',
    },
    {
      id: 'candy-cloud-mascot-mark',
      title: 'CANDY CLOUD - CONFECTIONERY LOGO & IDENTITY',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Packaging Design', 'Branding'],
      image: candyCloudLogoCoverImg,
      coverImage: candyCloudLogoCoverImg,
      projectImages: [
        candyCloudLogoCaseStudyImg,
      ],
      images: [
        candyCloudLogoCaseStudyImg,
      ],
      year: '2024',
      client: 'Candy Cloud Confectionery Co.',
      description: 'Whimsical cloud and sweet swirl monogram logomark representing softness, sweetness, and happiness for an artisanal confectionery.',
      badge: 'LOGO SHOWCASE',
      accentColor: '#a746a8',
    },
    {
      id: 'devsthan-samiti-insignia',
      title: 'DEVSTHAN SAMITI - SACRED TEMPLE LOGO & IDENTITY',
      category: 'Logo Designs',
      categories: ['Logo Designs', 'Branding'],
      image: devsthanLogoCoverImg,
      coverImage: devsthanLogoCoverImg,
      projectImages: [
        devsthanLogoCaseStudyImg,
      ],
      images: [
        devsthanLogoCaseStudyImg,
      ],
      year: '2024',
      client: 'Devsthan Vyavasthapan Samiti, West Maharashtra, Kolhapur',
      description: 'Sacred Ganesha monogram emblem synthesizing temple pillars, divine presence, and the rich cultural heritage of Kolhapur.',
      badge: 'LOGO SHOWCASE',
      accentColor: '#f5b400',
    },
  ],

  'social-media-posts': [
    {
      id: 'dimora-social-campaign',
      title: 'DIMORA - LUXURY FRAGRANCE SOCIAL MEDIA CAMPAIGN',
      category: 'Social Media Posts',
      categories: ['Social Media Posts', 'Branding'],
      image: dimoraSocialCoverImg,
      coverImage: dimoraSocialCoverImg,
      projectImages: [
        dimoraSocialPost1Img,
        dimoraSocialPost2Img,
        dimoraSocialPost3Img,
        dimoraSocialPost4Img,
        dimoraSocialPost5Img,
        dimoraSocialPost6Img,
      ],
      images: [
        dimoraSocialPost1Img,
        dimoraSocialPost2Img,
        dimoraSocialPost3Img,
        dimoraSocialPost4Img,
        dimoraSocialPost5Img,
        dimoraSocialPost6Img,
      ],
      year: '2024',
      client: 'Dimora Haute Parfumerie',
      description: 'High-conversion editorial social media ad campaign for Dimora luxury fragrance, featuring product hero showcases, lifestyle model features, and gift packaging creatives.',
      badge: 'LUXURY CAMPAIGN',
      accentColor: '#a31d24',
    },
    {
      id: 'get-it-social-campaign',
      title: 'GET IT - ON-DEMAND DELIVERY SOCIAL MEDIA CAMPAIGN',
      category: 'Social Media Posts',
      categories: ['Social Media Posts', 'Branding'],
      image: getItSocialCoverImg,
      coverImage: getItSocialCoverImg,
      projectImages: [
        getItSocialPost1Img,
        getItSocialPost2Img,
        getItSocialPost3Img,
        getItSocialPost4Img,
        getItSocialPost5Img,
        getItSocialPost6Img,
      ],
      images: [
        getItSocialPost1Img,
        getItSocialPost2Img,
        getItSocialPost3Img,
        getItSocialPost4Img,
        getItSocialPost5Img,
        getItSocialPost6Img,
      ],
      year: '2024',
      client: 'Get It Technologies / On-Demand Delivery Co.',
      description: 'High-conversion multi-post social media campaign featuring rider app launches, express delivery, customer satisfaction, and merchant growth creatives.',
      badge: 'SOCIAL CAMPAIGN',
      accentColor: '#F7931A',
    },
    {
      id: 'konnect-compiler-social-campaign',
      title: 'KONNECT COMPILER - TECH EDUCATION SOCIAL MEDIA CAMPAIGN',
      category: 'Social Media Posts',
      categories: ['Social Media Posts', 'Branding'],
      image: konnectCompilerSocialCoverImg,
      coverImage: konnectCompilerSocialCoverImg,
      projectImages: [
        konnectCompilerSocialPost1Img,
        konnectCompilerSocialPost2Img,
        konnectCompilerSocialPost3Img,
        konnectCompilerSocialPost4Img,
        konnectCompilerSocialPost5Img,
        konnectCompilerSocialPost6Img,
        konnectCompilerSocialPost7Img,
      ],
      images: [
        konnectCompilerSocialPost1Img,
        konnectCompilerSocialPost2Img,
        konnectCompilerSocialPost3Img,
        konnectCompilerSocialPost4Img,
        konnectCompilerSocialPost5Img,
        konnectCompilerSocialPost6Img,
        konnectCompilerSocialPost7Img,
      ],
      year: '2024',
      client: 'Konnect Compiler / Coding Academy',
      description: 'High-impact educational social media campaign featuring full-stack web development, Python, SQL databases, mobile apps, and youth innovator coding courses.',
      badge: 'EDTECH CAMPAIGN',
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
