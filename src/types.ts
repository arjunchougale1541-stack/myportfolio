export interface ReelData {
  videoUrl: string;
  title?: string;
  client?: string;
  overview: {
    description: string;
    objective: string;
  };
  creativeDirection: string;
  editingProcess: {
    description: string;
    techniques?: string[];
  };
  toolsUsed: string[];
  details: {
    category: string;
    year: string;
    role: string;
    format?: string;
    aspectRatio?: string;
  };
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  year: string;
  client?: string;
  description: string;
  tags: string[];
  mockupSide: 'left' | 'right';
  badge?: string;
  category: string;
  accentColor: string;
  bgTone: string;
  coverImage?: string;
  projectImages?: string[];
  images?: string[];
  videoUrl?: string;
  reelData?: ReelData;
  details?: {
    overview?: string;
    objective?: string;
    creativeDirection?: string;
    editingProcess?: string;
    role?: string;
    timeline?: string;
    tools?: string[];
    colors?: { name: string; hex: string }[];
    typography?: { name: string; usage: string }[];
    deliverables?: string[];
    galleryImages?: string[];
  };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: string[];
  tools: { name: string; icon?: string }[];
  highlights: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  tag: string;
}
