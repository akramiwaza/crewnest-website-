import { Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getLandingData } from "@/lib/api";

export default async function Page() {
  const data = await getLandingData();
  const heroData = data.homePage.banner;
  const aboutData = data.homePage.aboutSection;
  const statsData = data.homePage.statsSection;
  const testimonialsData = data.homePage.testimonials;
  const testimonialsSectionData = data.homePage.testimonialsSection;
  const blogSectionData = data.homePage.newsSection;
  const featuredNewsData = data.homePage.featuredNews;
  const contactSectionData = data.homePage.contactSection;
  const footerData = data.footer;
  const keyFeaturesData = data.homePage.keyFeatures;
  const logoData = data.footer.settings.logo;

  return (
    <div className="min-h-screen">
      <Header logoData={logoData} />
      <main>
        <Suspense fallback={<div className="container-default py-16" />}>
          {/* Hero */}
          <HeroSection heroData={heroData} />
        </Suspense>
        <Suspense fallback={<div className="container-default py-12" />}>
          <AboutSection
            aboutData={aboutData}
            keyFeaturesData={keyFeaturesData}
          />
        </Suspense>
        <Suspense fallback={<div className="container-default py-8" />}>
          <StatsSection statsData={statsData} />
        </Suspense>
        <Suspense fallback={<div className="container-default py-12" />}>
          <TestimonialsSection
            testimonialsData={testimonialsData}
            testimonialsSectionData={testimonialsSectionData}
          />
        </Suspense>
        <Suspense fallback={<div className="container-default py-12" />}>
          <BlogSection
            featuredNewsData={featuredNewsData}
            newsSectionData={blogSectionData}
          />
        </Suspense>
        <Suspense fallback={<div className="container-default py-12" />}>
          <ContactSection contactSectionData={contactSectionData} />
        </Suspense>
      </main>
      <Footer footerData={footerData} heroData={heroData} />
    </div>
  );
}
