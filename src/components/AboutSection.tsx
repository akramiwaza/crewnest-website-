"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { AboutData, KeyFeaturesData } from "@/lib/api";

export default function AboutSection({
  aboutData,
  keyFeaturesData,
}: {
  aboutData: AboutData;
  keyFeaturesData: KeyFeaturesData;
}) {
  const [activeIndex, setActiveIndex] = useState(2); // Start with the third card active
  const [error, setError] = useState<string | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);

  const features = keyFeaturesData.features;
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    setError(null);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    setError(null);
  };

  // Safe setter for index selected via indicators or feature cards
  const setIndexSafely = (index: number) => {
    if (Number.isInteger(index) && index >= 0 && index < features.length) {
      setActiveIndex(index);
      setError(null);
    }
  };

  // Calculate which 3 cards to display, with active card always on the right
  const getVisibleCards = () => {
    const cards = [];
    // Show 2 cards before the active one, then the active card on the right
    for (let i = 2; i >= 0; i--) {
      const index = (activeIndex - i + features.length) % features.length;
      cards.push({ ...features[index], originalIndex: index });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();
  const activeFeature = features[activeIndex];

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-gray-50"
      aria-label="About our app"
    >
      <div className="px-10">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            About Our App
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {aboutData.title}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {aboutData.description}
          </p>
          <button
            className="bg-[#1e293b] hover:bg-[#334155] text-white px-6 py-2.5 rounded-md font-medium"
            type="button"
            aria-controls="features"
            onClick={() => {
              featuresRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {aboutData.actionButton.title}
          </button>
        </div>

        <div ref={featuresRef} id="features" className="mb-[40px]">
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            Key Features
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
            {keyFeaturesData.title}
          </h3>
        </div>

        {/* Mobile layout: single active card with its image above */}
        <div className="lg:hidden mb-10">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs sm:max-w-sm relative top-10">
              <Image
                src={
                  `${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${activeFeature.image}` ||
                  "/placeholder.svg"
                }
                alt={activeFeature.title}
                className="w-full h-auto rounded-2xl shadow-lg object-cover"
                width={400}
                height={300}
                priority
                unoptimized={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${activeFeature.image}`.startsWith(
                  "http"
                )}
              />
            </div>

            <div
              className="w-full rounded-2xl p-6 shadow-lg bg-primary text-white cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => setIndexSafely(activeIndex)}
              role="button"
              aria-pressed
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 border bg-transparent border-white">
                {(() => {
                  const ActiveIcon = activeFeature.icon;
                  const iconUrl = `${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${ActiveIcon}`;
                  return (
                    <Image
                      src={iconUrl}
                      alt={activeFeature.title}
                      className="w-6 h-6"
                      width={24}
                      height={24}
                      priority
                      unoptimized={iconUrl.startsWith("http")}
                    />
                  );
                })()}
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">
                {activeFeature.title}
              </h4>
              <p className="text-sm leading-relaxed text-blue-100">
                {activeFeature.description}
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8"
            role="region"
            aria-roledescription="carousel"
            aria-label="Feature carousel"
          >
            {visibleCards.map((feature, displayIndex) => {
              const isActive = displayIndex === 2; // Active card is always the last one (rightmost)
              const Icon = feature.icon;

              return (
                <div
                  key={`${activeIndex}-${displayIndex}`}
                  className="relative"
                >
                  {/* Phone Mockup - absolutely positioned above active card */}
                  {isActive && (
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -top-[480px] xl:-top-[500px] pointer-events-none transition-all ">
                      <div className="relative w-[300px] xl:w-[333px] h-auto ">
                        <Image
                          src={
                            `${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${feature.image}` ||
                            "/placeholder.svg"
                          }
                          alt={feature.title}
                          className="w-full h-full object-cover transition-all duration-500"
                          width={333}
                          height={660}
                          priority
                          unoptimized={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${feature.image}`.startsWith(
                            "http"
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Feature Card */}
                  <div
                    className={`rounded-2xl p-6 shadow-lg transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-[#f7f7fd] text-gray-900 hover:shadow-xl"
                    }`}
                    onClick={() => setIndexSafely(feature.originalIndex)}
                    role="button"
                    aria-pressed={isActive}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 border ${
                        isActive
                          ? "bg-transparent border-white"
                          : "bg-[#f7f7fd] border-black"
                      }`}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${Icon}`}
                        alt={feature.title}
                        className="w-6 h-6"
                        width={24}
                        height={24}
                        priority
                        unoptimized={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${Icon}`.startsWith(
                          "http"
                        )}
                        style={
                          isActive
                            ? {
                                filter: "invert(1) brightness(10) grayscale(1)",
                              }
                            : undefined
                        }
                      />
                    </div>
                    <h4
                      className={`text-lg font-bold mb-2 ${
                        isActive ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className={`text-sm leading-relaxed line-clamp-2 ${
                        isActive ? "text-blue-100" : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 bg-transparent"
              aria-label="Previous feature"
              type="button"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setIndexSafely(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  type="button"
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 bg-transparent"
              aria-label="Next feature"
              type="button"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div aria-live="polite" className="sr-only">
            Active feature: {features[activeIndex].title}
          </div>
          {error && (
            <div role="alert" aria-live="assertive" className="sr-only">
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
