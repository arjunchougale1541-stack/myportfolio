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
    subtitle: 'Letter S & Electrical Power — Modern Showroom Identity',
    year: '2024',
    client: 'Swara Electricals & Lighting Hub',
    description: 'Geometric monogram S glyph symbolizing electrical power, connectivity, and modern tech-forward retail showroom identity.',
    tags: ['Logo Design', 'Branding', 'Visual Identity'],
    mockupSide: 'right',
    badge: 'LOGO SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#1e72d8',
    bgTone: '#0b162c',
    coverImage: swaraLogoCoverImg,
    projectImages: [
      swaraLogoCaseStudyImg,
    ],
    images: [
      swaraLogoCaseStudyImg,
    ],
    details: {
      overview: 'Swara Electricals is a modern electrical solutions and lighting showroom. The logo concept synthesizes the letter S for Swara with dynamic electrical connectivity and power motifs. The identity suite includes a clean tech-forward geometric pattern, an illuminated channel-letter storefront, branded eco shopping bags, and premium retail product packaging.',
      role: 'Logo Designer & Brand Identity Artist',
      timeline: '2024',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Electric Cobalt Blue', hex: '#1E72D8' },
        { name: 'Cyan Sky Blue', hex: '#4DB2FF' },
        { name: 'Graphite Slate', hex: '#555555' }
      ],
      deliverables: [
        'Geometric Letter S & Electrical Monogram Vector Lockup',
        'Clean Tech-Forward Repeating Power Pattern',
        'Illuminated LED Storefront Signage System',
        'Luxury Retail Tote Bags & Presentation Packaging Boxes'
      ],
      galleryImages: [
        swaraLogoCaseStudyImg,
      ]
    }
  },
  {
    id: 'hyperlex-car-care-logo',
    number: '05',
    title: 'HYPERLEX - PREMIUM CAR CARE LOGO & BRANDING',
    subtitle: 'Shine & Protection — PPF • Ceramic Coating • Detailing',
    year: '2024',
    client: 'Hyperlex Premium Car Care Center',
    description: 'Aerodynamic star monogram and high-performance automotive branding for luxury car detailing, PPF, and ceramic coating.',
    tags: ['Logo Design', 'Branding', 'Automotive'],
    mockupSide: 'left',
    badge: 'LOGO SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#d33a2c',
    bgTone: '#180a0a',
    coverImage: hyperlexLogoCoverImg,
    projectImages: [
      hyperlexLogoCaseStudyImg,
    ],
    images: [
      hyperlexLogoCaseStudyImg,
    ],
    details: {
      overview: 'Hyperlex is an elite automotive detailing studio specializing in Paint Protection Film (PPF), ceramic coatings, and precision car detailing. The logo concept pairs a shine/finish 4-point sparkle star reflecting premium car care with the geometric letter H for Hyperlex. The identity system includes a sleek repeating protection pattern, illuminated exterior architectural signage, professional team workwear, and branded ceramic coating packaging.',
      role: 'Lead Brand Identity & Automotive Logo Designer',
      timeline: '2024',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Crimson Performance Red', hex: '#D33A2C' },
        { name: 'Obsidian Automotive Black', hex: '#111111' },
        { name: 'Pure Spark White', hex: '#F5F5F5' }
      ],
      deliverables: [
        'Aerodynamic Star & Letter H Monogram Lockup',
        'Precision Geometric Star Protective Repeating Pattern',
        'Illuminated 3D Facade & Interior Showroom Signage',
        'Staff Workwear Polo & Branded Detailing Packaging Suite'
      ],
      galleryImages: [
        hyperlexLogoCaseStudyImg,
      ]
    }
  },
  {
    id: 'get-it-delivery-logo',
    number: '05',
    title: 'GET IT - ON-DEMAND DELIVERY LOGO & IDENTITY',
    subtitle: 'Speed, Precision & Quick Commerce Brand Identity',
    year: '2024',
    client: 'Get It Technologies / On-Demand Delivery Co.',
    description: 'Dynamic location-pin spiral monogram and bold delivery branding symbolizing speed, real-time tracking, and seamless quick commerce.',
    tags: ['Logo Design', 'On-Demand Delivery', 'Branding', 'App UI'],
    mockupSide: 'left',
    badge: 'LOGO SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#F7931A',
    bgTone: '#161410',
    coverImage: getItLogoCoverImg,
    projectImages: [
      getItLogoCaseStudyImg,
    ],
    images: [
      getItLogoCaseStudyImg,
    ],
    details: {
      overview: 'Get It is a modern on-demand delivery and quick-commerce platform built for speed and reliability. The logo mark ingeniously combines a map location pin with a forward motion spiral, representing precision GPS tracking and rapid delivery fulfillment. Paired with bold modern typography, a high-contrast charcoal and vibrant orange color scheme, and an extensive branding kit across digital apps, storefront signage, and delivery gear.',
      role: 'Logo Designer & Visual Identity Architect',
      timeline: '2 Weeks (2024)',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Vibrant Orange', hex: '#F7931A' },
        { name: 'Pure Charcoal', hex: '#4A4A4A' },
        { name: 'Light Gray', hex: '#F7F7F7' }
      ],
      deliverables: [
        'Dynamic Location Spiral Monogram & Bold Wordmark Lockup',
        'Repeating Brand Pattern & Visual Design System',
        'Mobile Application App Icon & Dark Interface UI Mockup',
        'Boutique Quick-Commerce Storefront 3D Channel-Letter Signage',
        'Insulated Thermal Delivery Bag & Field Logistics Merchandise'
      ],
      galleryImages: [
        getItLogoCaseStudyImg,
      ]
    }
  },
  {
    id: 'get-it-social-campaign',
    number: '06',
    title: 'GET IT - ON-DEMAND DELIVERY SOCIAL MEDIA CAMPAIGN',
    subtitle: 'High-Conversion Digital Ad Creatives & App Launch Posts',
    year: '2024',
    client: 'Get It Technologies / On-Demand Delivery Co.',
    description: 'High-conversion multi-post social media campaign featuring rider app launches, express delivery, customer satisfaction, and merchant growth creatives.',
    tags: ['Social Media Posts', 'Digital Advertising', 'Campaign Design', 'Branding'],
    mockupSide: 'right',
    badge: 'SOCIAL CAMPAIGN',
    category: 'Social Media Posts',
    accentColor: '#F7931A',
    bgTone: '#171410',
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
    details: {
      overview: 'A complete multi-channel social media ad campaign designed for GET IT, an on-demand quick-commerce and parcel delivery platform. The 6-creative suite combines bold typography, vibrant brand orange gradients, real-world lifestyle photography, app interface previews, and strong call-to-actions engineered to drive app downloads, brand trust, merchant acquisition, and user retention.',
      role: 'Lead Visual Designer & Social Campaign Strategist',
      timeline: '2 Weeks (2024)',
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma'],
      colors: [
        { name: 'Vibrant Orange', hex: '#F7931A' },
        { name: 'Pure Charcoal', hex: '#4A4A4A' },
        { name: 'Clean White', hex: '#FFFFFF' }
      ],
      deliverables: [
        'Post 01: Hero App Launch & Store Download Creative',
        'Post 02: Fast Doorstep Delivery & Customer Satisfaction Ad',
        'Post 03: Parcel Logistics & Real-Time Fleet Delivery Creative',
        'Post 04: Doorstep Convenience & Mobile Live Tracking Ad',
        'Post 05: Merchant Partnership & Business Growth Campaign',
        'Post 06: Express Night Delivery & Instant Essentials Ad'
      ],
      galleryImages: [
        getItSocialPost1Img,
        getItSocialPost2Img,
        getItSocialPost3Img,
        getItSocialPost4Img,
        getItSocialPost5Img,
        getItSocialPost6Img,
      ]
    }
  },
  {
    id: 'dimora-social-campaign',
    number: '07',
    title: 'DIMORA - LUXURY FRAGRANCE SOCIAL MEDIA CAMPAIGN',
    subtitle: 'High-Conversion Editorial Ad Creatives & Scent Launch Series',
    year: '2024',
    client: 'Dimora Haute Parfumerie',
    description: 'High-conversion editorial social media ad campaign for Dimora luxury fragrance, featuring product hero showcases, lifestyle model features, and gift packaging creatives.',
    tags: ['Social Media Posts', 'Luxury Branding', 'Campaign Design', 'Product Ads'],
    mockupSide: 'left',
    badge: 'LUXURY CAMPAIGN',
    category: 'Social Media Posts',
    accentColor: '#a31d24',
    bgTone: '#1a0d0f',
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
    details: {
      overview: 'A premium social media advertising suite created for Dimora Haute Parfumerie. The 6-post campaign blends high-fashion editorial aesthetics, cinematic lighting, rich burgundy crimson gradients, and compelling luxury copy ("Own The Essence", "Ignite Your Aura", "Make Your Presence Last") designed to drive prestige brand recall, high engagement, and direct e-commerce sales.',
      role: 'Lead Art Director & Luxury Campaign Designer',
      timeline: '2 Weeks (2024)',
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma'],
      colors: [
        { name: 'Imperial Ruby Crimson', hex: '#A31D24' },
        { name: 'Warm Champagne Gold', hex: '#C7B299' },
        { name: 'Silk Ivory Cream', hex: '#F7F3EB' }
      ],
      deliverables: [
        'Post 01: "Own The Essence" - Flagship Product Hero Showcase',
        'Post 02: "Ignite Your Aura" - High-Impact Crimson Brand Statement Ad',
        'Post 03: "Make Your Presence Last" - High-Fashion Editorial Model Feature',
        'Post 04: "Elevate Every Moment" - Luxury Rigid Box Gift Set Creative',
        'Post 05: "Scent That Defines You" - Raw Volcanic Stone Mineral Display',
        'Post 06: "Your Scent Your Statement" - Dramatic Glass Reflection Ad'
      ],
      galleryImages: [
        dimoraSocialPost1Img,
        dimoraSocialPost2Img,
        dimoraSocialPost3Img,
        dimoraSocialPost4Img,
        dimoraSocialPost5Img,
        dimoraSocialPost6Img,
      ]
    }
  },
  {
    id: 'konnect-compiler-social-campaign',
    number: '08',
    title: 'KONNECT COMPILER - TECH EDUCATION SOCIAL MEDIA CAMPAIGN',
    subtitle: 'High-Impact Digital Ad Creatives & Course Launch Posts',
    year: '2024',
    client: 'Konnect Compiler / Coding Academy',
    description: 'High-impact educational social media campaign featuring full-stack web development, Python, SQL databases, mobile apps, and youth innovator coding courses.',
    tags: ['Social Media Posts', 'EdTech Design', 'Campaign Design', 'Branding'],
    mockupSide: 'right',
    badge: 'EDTECH CAMPAIGN',
    category: 'Social Media Posts',
    accentColor: '#06b6d4',
    bgTone: '#0a101d',
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
    details: {
      overview: 'A complete multi-platform social media ad campaign engineered for Konnect Compiler, an innovative computer science and programming academy. The 7-design suite utilizes futuristic cyber aesthetics, high-contrast neon glows, 3D technology assets, clear course breakdowns, and conversion-focused call-to-actions designed to drive enrollments across foundational databases (SQL), full-stack web development, mobile app development, and young innovator coding bootcamps.',
      role: 'Lead Visual Designer & Social Campaign Strategist',
      timeline: '2 Weeks (2024)',
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma'],
      colors: [
        { name: 'Cyber Electric Cyan', hex: '#00F0FF' },
        { name: 'Deep Tech Indigo', hex: '#1E1B4B' },
        { name: 'Neon Amber Gold', hex: '#F59E0B' }
      ],
      deliverables: [
        'Post 01: SQL Database Mastery - "Speak the Language of Data" (Red Dark Hero)',
        'Post 02: SQL Structured Query Language - "Speak the Language of Data" (Cyber Blue Tech)',
        'Post 03: Young Innovators Tech Curriculum (Ages 7–16 Bootcamp)',
        'Post 04: Full Stack Web Developer - Scratch to Pro Comprehensive Guide',
        'Post 05: Game Development for Kids - "Young Minds, Big Games"',
        'Post 06: Cross-Platform Mobile App Development (iOS & Android)',
        'Post 07: Modern Web Development Made Simple, Powerful & Real'
      ],
      galleryImages: [
        konnectCompilerSocialPost1Img,
        konnectCompilerSocialPost2Img,
        konnectCompilerSocialPost3Img,
        konnectCompilerSocialPost4Img,
        konnectCompilerSocialPost5Img,
        konnectCompilerSocialPost6Img,
        konnectCompilerSocialPost7Img,
      ]
    }
  },
  {
    id: 'dimora-luxury-fragrance-logo',
    number: '06',
    title: 'DIMORA - LUXURY FRAGRANCE LOGO & IDENTITY',
    subtitle: 'Symbol of Luxury & Balance',
    year: '2024',
    client: 'Dimora Haute Parfumerie',
    description: 'Symmetrical geometric monogram logo and luxury perfume brand identity inspired by the letter D, fragrance flow, and balanced elegance.',
    tags: ['Logo Design', 'Luxury Branding', 'Packaging'],
    mockupSide: 'right',
    badge: 'LUXURY LOGO',
    category: 'Logo Designs',
    accentColor: '#c7b299',
    bgTone: '#1e1c18',
    coverImage: dimoraCoverImg,
    projectImages: [
      dimoraCaseStudyImg,
    ],
    images: [
      dimoraCaseStudyImg,
    ],
    details: {
      overview: 'Dimora is an artisanal luxury fragrance house. The brand identity features a harmonious geometric monogram synthesizing the letter D with infinity-inspired curves symbolizing fragrance and flow, creating a timeless seal of luxury and balance.',
      role: 'Brand Identity & Luxury Monogram Designer',
      timeline: '3 Weeks (2024)',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Pure Obsidian', hex: '#1E1E1E' },
        { name: 'Warm Champagne Sand', hex: '#C7B299' },
        { name: 'Silk Ivory Cream', hex: '#F7F3EB' }
      ],
      deliverables: [
        'Symmetrical Monogram Mark & Wordmark System',
        'Minimal Repeating Geometric Brand Pattern',
        'Luxury Boutique Storefront Signage & Facade Mockup',
        'Flacon Label & Rigid Presentation Box Packaging'
      ],
      galleryImages: [
        dimoraCaseStudyImg,
      ]
    }
  },
  {
    id: 'axial-brand-symbol',
    number: '07',
    title: 'AXIAL GRAPHIC - DRIVEN BY DESIGN',
    subtitle: 'PERSONAL DESIGN IDENTITY & LOGO SYSTEM',
    year: '2024',
    client: 'Axial Graphic Studio',
    description: 'Bold constructivist letterforms representing Letter A for Axial, Letter G for Graphic, and creative blocks for design and build.',
    tags: ['Logo Design', 'Branding', 'Visual Identity'],
    mockupSide: 'left',
    badge: 'LOGO SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#3f46af',
    bgTone: '#121430',
    coverImage: axialLogoCoverImg,
    projectImages: [
      axialLogoCaseStudyImg,
    ],
    images: [
      axialLogoCaseStudyImg,
    ],
    details: {
      overview: 'Axial Graphic is built around pure geometric constructivism. The logo system explores modular letterforms where Letter A and Letter G interlock with creative building blocks, accompanied by a dynamic wave pattern, an illuminated 3D studio wall sign, and corporate stationery.',
      role: 'Logo Designer & Visual Identity Architect',
      timeline: '2024',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Axial Royal Indigo', hex: '#3F46AF' },
        { name: 'Iris Periwinkle', hex: '#7D87E9' },
        { name: 'Lavender Mist', hex: '#E9EBF7' }
      ],
      deliverables: [
        'Modular Letterform Monogram & Wordmark',
        'Kinetic Wave Graphic Pattern System',
        'Studio Interior Signage & Backlit LED Display Mockup',
        'Corporate Stationery & Branded Apparel Suite'
      ],
      galleryImages: [
        axialLogoCaseStudyImg,
      ]
    }
  },
  {
    id: 'candy-cloud-mascot-mark',
    number: '08',
    title: 'CANDY CLOUD - CONFECTIONERY LOGO & IDENTITY',
    subtitle: 'Taste the Clouds. — Logo & Identity System',
    year: '2024',
    client: 'Candy Cloud Confectionery Co.',
    description: 'Whimsical cloud and sweet swirl monogram logomark representing softness, sweetness, and happiness for an artisanal confectionery.',
    tags: ['Logo Design', 'Packaging', 'Visual Identity'],
    mockupSide: 'right',
    badge: 'LOGO SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#a746a8',
    bgTone: '#241324',
    coverImage: candyCloudLogoCoverImg,
    projectImages: [
      candyCloudLogoCaseStudyImg,
    ],
    images: [
      candyCloudLogoCaseStudyImg,
    ],
    details: {
      overview: 'Candy Cloud is an artisanal confectionery brand. The logo concept blends a soft cloud silhouette representing happiness and softness, an inner swirl symbolizing candy sweetness, and the stylized initial letter C. The system includes playful repeating patterns, retail storefront design, and gift packaging.',
      role: 'Logo Designer & Confectionery Brand Identity Artist',
      timeline: '2024',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Berry Velvet Purple', hex: '#A746A8' },
        { name: 'Pastel Lilac Mist', hex: '#D993CE' },
        { name: 'Sweet Cotton Cream', hex: '#FBE6F5' }
      ],
      deliverables: [
        'Cloud Swirl Monogram & Typography Lockup',
        'Playful Repeating Cloud Icon Pattern',
        'Boutique Storefront Signage with Neon Backlight',
        'Luxury Ribbon Gift Bag & Presentation Box'
      ],
      galleryImages: [
        candyCloudLogoCaseStudyImg,
      ]
    }
  },
  {
    id: 'devsthan-samiti-insignia',
    number: '09',
    title: 'DEVSTHAN SAMITI - SACRED TEMPLE LOGO & IDENTITY',
    subtitle: 'देवस्थान व्यवस्थापन समिती, पश्चिम महाराष्ट्र, कोल्हापूर — Sacred Identity System',
    year: '2024',
    client: 'Devsthan Vyavasthapan Samiti, West Maharashtra, Kolhapur',
    description: 'Sacred Ganesha monogram emblem synthesizing temple pillars, divine presence, and the rich cultural heritage of Kolhapur.',
    tags: ['Logo Design', 'Cultural Heritage', 'Visual Identity'],
    mockupSide: 'left',
    badge: 'LOGO SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#f5b400',
    bgTone: '#291802',
    coverImage: devsthanLogoCoverImg,
    projectImages: [
      devsthanLogoCaseStudyImg,
    ],
    images: [
      devsthanLogoCaseStudyImg,
    ],
    details: {
      overview: 'Devsthan Vyavasthapan Samiti manages the revered historical and sacred temples across Western Maharashtra, Kolhapur. The logo concept synthesizes the divine Ganesha silhouette, sacred temple pillars (mandir sthambh), and the spiritual legacy of Kolhapur. The identity system encompasses ceremonial invitations, temple entrance signage, annual receipt ledgers, and festival stage environments.',
      role: 'Lead Cultural Identity & Sacred Symbol Designer',
      timeline: '2024',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Saffron Gold (सुवर्ण / केशरी)', hex: '#F5B400' },
        { name: 'Devotional Red (गडद लाल)', hex: '#D82428' },
        { name: 'Sacred Ivory (शुभ्र क्रीम)', hex: '#FFF7E8' }
      ],
      deliverables: [
        'Sacred Ganesha Monogram & Devanagari Typography Lockup',
        'Traditional Sacred Temple Repeating Motif Pattern',
        'Carved Teakwood Temple Entrance Archway Signage',
        'Ceremonial Invitation Suite & Annual Ledger Publications'
      ],
      galleryImages: [
        devsthanLogoCaseStudyImg,
      ]
    }
  },
  {
    id: 'marbex-furniture-interiors-logo',
    number: '10',
    title: 'MARBEX - LUXURY FURNITURE & INTERIORS LOGO',
    subtitle: 'Home • Furniture • Interiors — Luxury Brand Identity',
    year: '2024',
    client: 'Marbex Home & Luxury Interiors',
    description: 'Elegant geometric M monogram blending architectural structure, comfort curves, and metallic gold for a luxury furniture atelier.',
    tags: ['Logo Design', 'Luxury Furniture', 'Branding'],
    mockupSide: 'right',
    badge: 'LOGO SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#d4af37',
    bgTone: '#1e1b14',
    coverImage: marbexLogoCoverImg,
    projectImages: [
      marbexLogoCaseStudyImg,
    ],
    images: [
      marbexLogoCaseStudyImg,
    ],
    details: {
      overview: 'Marbex is a high-end luxury furniture, interior architecture, and home decor brand. The logo concept harmonizes the letter M for Marbex, an ergonomic curve symbolizing comfort, and clean architectural lines representing structural furniture integrity. The identity encompasses minimal repeating pattern motifs, an illuminated showroom facade, woven upholstery labels, and gold-foiled packaging.',
      role: 'Lead Brand Identity & Luxury Logo Designer',
      timeline: '2024',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Warm Metallic Gold', hex: '#D4AF37' },
        { name: 'Charcoal Slate', hex: '#5A5A5A' },
        { name: 'Soft Warm Ivory', hex: '#F7F4EB' }
      ],
      deliverables: [
        'Sculptural Letter M Monogram & Typography Lockup',
        'Minimal Geometric Pattern Motif',
        'Illuminated Showroom Facade Signage',
        'Woven Fabric Upholstery Labels & Gold-Foiled Shopping Bags'
      ],
      galleryImages: [
        marbexLogoCaseStudyImg,
      ]
    }
  },
  {
    id: 'soul-fashion-logo',
    number: '11',
    title: 'SOUL FASHION - LUXURY ATELIER LOGO & IDENTITY',
    subtitle: 'Elegance & Flow — Haute Couture Brand System',
    year: '2024',
    client: 'Soul Fashion Haute Couture',
    description: 'Fluid swirling emblem inspired by elegance, harmony, and feminine grace for a luxury fashion house.',
    tags: ['Logo Design', 'Fashion Branding', 'Apparel'],
    mockupSide: 'left',
    badge: 'LOGO SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#751a1f',
    bgTone: '#1f090b',
    coverImage: soulFashionLogoCoverImg,
    projectImages: [
      soulFashionLogoCaseStudyImg,
    ],
    images: [
      soulFashionLogoCaseStudyImg,
    ],
    details: {
      overview: 'Soul Fashion is an haute couture and contemporary luxury apparel atelier. The logo concept features an intricate organic symbol inspired by elegance, movement, and flow, paired with high-contrast serif typography. The identity system includes a signature repeating pattern, boutique storefront signage with warm ambient lighting, premium matte shopping bags, and textured fabric swing tags.',
      role: 'Lead Brand Identity & Luxury Fashion Logo Designer',
      timeline: '2024',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Deep Crimson Burgundy', hex: '#751A1F' },
        { name: 'Soft Warm Blush Ivory', hex: '#F5E8E0' },
        { name: 'Dark Espresso Maroon', hex: '#3B1E1E' }
      ],
      deliverables: [
        'Fluid Monogram Symbol & High-Contrast Typography Lockup',
        'Repeating Brand Heritage Textile Pattern',
        'Boutique Retail Storefront Channel-Letter Signage',
        'Premium Paper Shopping Bags & Garment Swing Tags'
      ],
      galleryImages: [
        soulFashionLogoCaseStudyImg,
      ]
    }
  },
  {
    id: 'vb-events-luxury-logo',
    number: '12',
    title: 'VB EVENTS - CELEBRATION & EVENT DESIGN LOGO',
    subtitle: 'Event Planning | Design | Execution — Bespoke Celebrations',
    year: '2024',
    client: 'VB Events & Luxury Wedding Co.',
    description: 'Opulent gold monogram intertwined with celebratory growth leaves, designed for high-end bespoke celebrations.',
    tags: ['Logo Design', 'Luxury Events', 'Branding'],
    mockupSide: 'right',
    badge: 'LOGO SHOWCASE',
    category: 'Logo Designs',
    accentColor: '#d4a037',
    bgTone: '#1c1508',
    coverImage: vbEventsLogoCoverImg,
    projectImages: [
      vbEventsLogoCaseStudyImg,
    ],
    images: [
      vbEventsLogoCaseStudyImg,
    ],
    details: {
      overview: 'VB Events is a premier luxury event planning, wedding production, and stage design company. The logo concept intertwines the distinctive brand monogram with organic celebratory leaves symbolizing growth, freshness, and joyful milestones. The identity system encompasses an illuminated architectural studio facade, embossed gold foil wedding invitations, and opulent stage environment backdrops.',
      role: 'Lead Identity & Event Branding Designer',
      timeline: '2024',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      colors: [
        { name: 'Metallic Celebration Gold', hex: '#D4A037' },
        { name: 'Royal Burgundy', hex: '#7A0E1E' },
        { name: 'Warm Banquet Ivory', hex: '#F9F4E8' }
      ],
      deliverables: [
        'Celebratory Leaf Monogram & Serif Typography Lockup',
        'Subtle Organic Leaf Motif Event Pattern',
        'Studio Showroom Facade & Entrance Signage',
        'Embossed Satin Ribbon Invitations & Banquet Stage Visuals'
      ],
      galleryImages: [
        vbEventsLogoCaseStudyImg,
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
