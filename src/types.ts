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
  images?: string[];
  details?: {
    overview?: string;
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
