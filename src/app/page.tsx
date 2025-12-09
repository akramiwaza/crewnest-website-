import { Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import DownloadBanner from "@/components/DownloadBanner";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Suspense fallback={<div className="container-default py-16" />}>
          {/* Hero */}
          <HeroSection />
        </Suspense>
        <Suspense fallback={<div className="container-default py-12" />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div className="container-default py-8" />}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={<div className="container-default py-12" />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<div className="container-default py-12" />}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<div className="container-default py-12" />}>
          <ContactSection />
        </Suspense>
        <Suspense fallback={<div className="container-default py-12" />}>
          <DownloadBanner />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
