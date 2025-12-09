import { unstable_cache } from "next/cache";

// Types matching the actual API response structure
export type ApiResponse = {
  message: string;
  error: boolean;
  code: number;
  results: {
    website: WebsiteData;
  };
};

export type StatsData = {
  title: string;
  value: number;
  description: string;
  type: "number" | "rating";
  _id: string;
};

export type AboutData = {
  title: string;
  description: string;
  actionButton: {
    title: string;
    url: string;
  };
};
export type KeyFeaturesData = {
  title: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
    image: string;
  }>;
};
export type HeroData = {
  title: string;
  description: string;
  actionButtons: {
    title: string;
    appStore: {
      title: string;
      url: string;
    };
    playStore: {
      title: string;
      url: string;
    };
  };
  image: string;
};

export type TestimonialsData = {
  _id: string;
  fullName: string;
  type: "lister" | "seeker";
  image: string;
  rating: number;
  review: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TestimonialsSectionData = {
  title: string;
  description: string;
};

export type NewsSectionData = {
  title: string;
  description: string;
};

export type FeaturedNewsData = {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: {
    fullName: string;
  };
  isFeatured: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ContactSectionData = {
  title: string;
  description: string;
};
export type DownloadData = {
  title: string;
  description: string;
};
export type FooterData = {
  banner: {
    title: string;
    description: string;
    image: string;
  };
  settings: {
    socials: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
      youtube: string;
      tiktok: string;
    };
    contact: {
      phone: {
        code: number;
        number: number;
      };
      email: string;
    };
    _id: string;
    logo: string;
  };
};
export type WebsiteData = {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  footer: FooterData;
  homePage: {
    banner: HeroData;
    aboutSection: AboutData;
    keyFeatures: KeyFeaturesData;
    statsSection: StatsData[];
    testimonialsSection: TestimonialsSectionData;
    newsSection: NewsSectionData;
    contactSection: ContactSectionData;
    featuredNews: FeaturedNewsData[];
    testimonials: TestimonialsData[];
  };
};

export type LandingData = WebsiteData;

const fetchLanding = async (): Promise<LandingData> => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/website`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    console.error("Failed to load landing data", res.status, res.statusText);
    throw new Error(`Failed to load landing data (${res.status})`);
  }

  const raw: ApiResponse = await res.json();
  // Return the website data as-is, matching the API response structure
  if (!raw?.results?.website) {
    console.error("Unexpected landing data shape", raw);
    throw new Error("Unexpected landing data shape: missing results.website");
  }

  return raw.results.website;
};

export const getLandingData = unstable_cache(fetchLanding, ["landing-data"], {
  revalidate: 60,
});
