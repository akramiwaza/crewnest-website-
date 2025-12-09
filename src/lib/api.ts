import { unstable_cache } from "next/cache";

export type NavItem = { label: string; href: string };
export type Feature = {
  title: string;
  description: string;
  highlight?: boolean;
};
export type Stat = { value: string; label: string };
export type Testimonial = {
  name: string;
  role: string;
  rating: number;
  content: string;
};
export type BlogPost = {
  id: string;
  title: string;
  tag: string;
  excerpt: string;
  image?: string;
};

export type LandingData = {
  header: { nav: NavItem[]; cta: string };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    appButtons: { appStore?: string; googlePlay?: string };
  };
  about: { title: string; heading: string; description: string; cta: string };
  features: Feature[];
  stats: Stat[];
  testimonials: Testimonial[];
  blog: BlogPost[];
  contact: { title: string; subtitle: string };
  download: { title: string; description: string };
  footer: {
    about: string;
    links: { label: string; href: string }[][];
    email: string;
    phone: string;
    store: { appStore?: string; googlePlay?: string };
  };
};

const fetchLanding = async (): Promise<LandingData> => {
  const devHost = "http://localhost:3001";
  const base = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`
    : devHost;
  const url =
    process.env.LANDING_API_URL ?? new URL("/api/landing", base).toString();
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to load landing data");
  return res.json();
};

export const getLandingData = unstable_cache(fetchLanding, ["landing-data"], {
  revalidate: 60,
});
