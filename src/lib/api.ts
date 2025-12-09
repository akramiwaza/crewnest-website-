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

export type ApiResponseSettings = {
  message: string;
  error: boolean;
  code: number;
  results: {
    settings: SettingsData;
  };
};

export type ApiResponseNews = {
  message: string;
  error: boolean;
  code: number;
  results: {
    news: News;
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

export type SettingsData = {
  about: {
    title: string;
    description: string;
    image: string;
  };
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
  seekerSplashScreens: {
    title: string;
    description: string;
    image: string;
    order: number;
    isActive: boolean;
    _id: string;
  }[];
  listerSplashScreens: {
    title: string;
    description: string;
    image: string;
    order: number;
    isActive: boolean;
    _id: string;
  }[];
  privacyPolicy: string;
  termsAndConditions: string;
  createdAt: string;
  updatedAt: string;
  logo: string;
};
export type Settings = SettingsData;

export type News = {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  author: {
    fullName: string;
  };
};

export type SeoData = {
  _id: string;
  __v: number;
  canonicalUrl: string;
  createdAt: string;
  description: string;
  image: string;
  keywords: string[];
  og: {
    description: string;
    image: string;
    title: string;
    type: string;
    url: string;
  };
  title: string;
  twitter: {
    card: string;
    description: string;
    image: string;
    title: string;
  };
  updatedAt: string;
};
export type ApiResponseSeo = {
  message: string;
  error: boolean;
  code: number;
  results: SeoData;
};

const fetchLanding = async (): Promise<LandingData> => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/website`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    console.error("Failed to load landing data", res.status, res.statusText);
    throw new Error(`Failed to load landing data (${res.status})`);
  }

  const raw: ApiResponse = await res.json();
  if (!raw?.results?.website) {
    console.error("Unexpected landing data shape", raw);
    throw new Error("Unexpected landing data shape: missing results.website");
  }

  return raw.results.website;
};

export const getLandingData = unstable_cache(fetchLanding, ["landing-data"], {
  revalidate: 60,
});

const fetchSettings = async (): Promise<Settings> => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/setting`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    console.error("Failed to load settings data", res.status, res.statusText);
    throw new Error(`Failed to load settings data (${res.status})`);
  }

  const raw: ApiResponseSettings = await res.json();
  if (!raw?.results?.settings) {
    console.error("Unexpected settings data shape", raw);
    throw new Error("Unexpected settings data shape: missing results.settings");
  }

  return raw.results.settings as Settings;
};

export const getSettingsData = unstable_cache(
  fetchSettings,
  ["settings-data"],
  {
    revalidate: 60,
  }
);

const fetchNews = async (id: string): Promise<News> => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/news/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    console.error("Failed to load news data", res.status, res.statusText);
    throw new Error(`Failed to load news data (${res.status})`);
  }
  const raw: ApiResponseNews = await res.json();
  if (!raw?.results?.news) {
    console.error("Unexpected news data shape", raw);
    throw new Error("Unexpected news data shape: missing results.news");
  }
  return raw.results.news as News;
};

export const getNewsData = unstable_cache(fetchNews, ["news-data"], {
  revalidate: 60,
});

const fetchSeoData = async (): Promise<SeoData> => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/seo`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    console.error("Failed to load seo data", res.status, res.statusText);
    throw new Error(`Failed to load seo data (${res.status})`);
  }
  const raw: ApiResponseSeo = await res.json();
  if (!raw?.results) {
    console.error("Unexpected seo data shape", raw);
    throw new Error("Unexpected seo data shape: missing results");
  }
  return raw.results as SeoData;
};

export const getSeoData = unstable_cache(fetchSeoData, ["seo-data"], {
  revalidate: 60,
});
