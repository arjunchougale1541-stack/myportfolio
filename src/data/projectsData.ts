import { ProjectItem, ServiceItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'personal-branding',
    number: '01',
    title: 'PERSONAL BRANDING PROJECT',
    subtitle: 'AXIAL GRAPHIC - DRIVEN BY DESIGN',
    year: '2023',
    client: 'Self Identity & Studio Concept',
    description: 'A thoughtfully crafted visual identity focused on creating a clean, modern, and impactful brand presence.',
    tags: ['Logo Design', 'Branding', 'Social Media'],
    mockupSide: 'left',
    badge: 'BRANDING CASE STUDY',
    category: 'Visual Identity',
    accentColor: '#5362ff',
    bgTone: '#1e1b4b',
    details: {
      overview: 'Axial Graphic represents a bold, geometric, and high-impact identity system designed for a multidisciplinary creative studio. The visual language emphasizes precision, typographic dominance, and modern digital aesthetics across physical and digital touchpoints.',
      role: 'Lead Brand Designer, Visual Strategist & 3D Mockup Artist',
      timeline: '4 Weeks (Q3 2023)',
      tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Blender 3D', 'Figma'],
      colors: [
        { name: 'Electric Violet', hex: '#5362ff' },
        { name: 'Deep Midnight Indigo', hex: '#16143c' },
        { name: 'Pure Obsidian', hex: '#0a0a0f' },
        { name: 'Silver Frost', hex: '#e2e8f0' }
      ],
      typography: [
        { name: 'Custom Heavy Block Sans', usage: 'Logo Mark & Display Title' },
        { name: 'Plus Jakarta Sans Bold', usage: 'Headings & Accents' },
        { name: 'Inter Regular', usage: 'Body Copy & ID Specifications' }
      ],
      deliverables: [
        'Modular Wordmark & Symbol System',
        'Physical Corporate Stationery Suite',
        'Staff Lanyard & NFC Smart ID Card',
        'Dark Mode Social Media Asset Kit',
        'Comprehensive 32-Page Brand Guidelines'
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
