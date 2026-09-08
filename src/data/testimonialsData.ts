import { TestimonialItem } from '../types';
import priyaImg from '../assets/images/testimonials/priya_sharma.jpg';
import vikramImg from '../assets/images/testimonials/vikram_patil.jpg';
import marcusImg from '../assets/images/testimonials/marcus_vance.jpg';
import ananyaImg from '../assets/images/testimonials/ananya_deshmukh.jpg';
import davidImg from '../assets/images/testimonials/david_chen.jpg';
import rohanImg from '../assets/images/testimonials/rohan_kulkarni.jpg';

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Founder & Creative Director',
    company: 'Candy Cloud Confectionery',
    avatar: priyaImg,
    rating: 5,
    tag: 'Branding & Packaging',
    quote: 'Arjun completely revitalized our brand identity. Our packaging engagement soared by over 140% after the redesign, and customers constantly rave about the playful unboxing experience. He is a truly gifted visual storyteller.'
  },
  {
    id: 'vikram-patil',
    name: 'Vikramaditya Patil',
    role: 'Head of Communications',
    company: 'Shri Chhatrapati Devsthan Trust',
    avatar: vikramImg,
    rating: 5,
    tag: 'Social Media & Identity',
    quote: 'Balancing historical reverence with modern digital aesthetics seemed impossible until Arjun stepped in. His social media designs and cultural motion reels garnered millions of organic impressions and deeply engaged youth audiences.'
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Senior Producer',
    company: 'Apex Digital Media (San Francisco)',
    avatar: marcusImg,
    rating: 5,
    tag: 'Video Editing & Motion',
    quote: 'Working with Arjun across timezones was effortless. His video editing pacing, sound design, and kinetic typography elevated our high-stakes commercial client reels to broadcast tier. Unmatched eye for dynamic motion.'
  },
  {
    id: 'ananya-deshmukh',
    name: 'Ananya Deshmukh',
    role: 'Brand Strategist & Marketing Lead',
    company: 'Studio Lumina',
    avatar: ananyaImg,
    rating: 5,
    tag: 'Creative Direction',
    quote: 'Arjun possesses a rare instinct for both design psychology and high-retention social content. The animated ad creatives he produced consistently outperformed static assets by 3x on our paid performance campaigns.'
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'Co-Founder & CMO',
    company: 'Kinetic Apparel Co.',
    avatar: davidImg,
    rating: 5,
    tag: 'Campaign Reels & Motion',
    quote: 'Arjun crafted promotional launch reels and motion posters that literally defined our summer apparel drop. His speed of execution and surgical precision in audio-visual rhythm and color grading are world-class.'
  },
  {
    id: 'rohan-kulkarni',
    name: 'Rohan Kulkarni',
    role: 'Operations Director',
    company: 'Vistas Media Labs',
    avatar: rohanImg,
    rating: 5,
    tag: 'Commercial Production',
    quote: 'Exceptional creative intuition, fast turnaround, and unmatched dependability. Arjun delivered 12 high-retention video edits and brand collaterals well ahead of deadline. Our premier go-to collaborator for visual excellence.'
  }
];
