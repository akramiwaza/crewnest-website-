"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  MessageCircle,
  Filter,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Shield,
    title: "Verified Listings",
    description:
      "You can communicate directly with landlords and we provide you with virtual tour before you buy or rent the property.",
    image: "/image49.png",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Easy Communication",
    description:
      "Find your dream house? You just need to do a little to no effort and you can start move in to your new dream home!",
    image: "/image49.png",
  },
  {
    id: 3,
    icon: Filter,
    title: "Filters That Matter",
    description:
      "Explore the options, filter your favorites and let us search to help you find the best home deal.",
    image: "/image49.png",
  },
  {
    id: 4,
    icon: Filter,
    title: "Filters That Matter",
    description:
      "Explore the options, filter your favorites and let us search to help you find the best home deal.",
    image: "/image49.png",
  },
  {
    id: 5,
    icon: Filter,
    title: "Filters That Matter",
    description:
      "Explore the options, filter your favorites and let us search to help you find the best home deal.",
    image: "/image49.png",
  },
];

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with the third card active

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
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

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            About Our App
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Simplifying Crew Accommodation – One Booking At A Time
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our app helps airline employees find short- or long-term stays near
            their base city or airport. Whether you need a crash pad a private
            room, or a full apartment, we've got you covered. Listers can
            showcase properties and earn effortlessly.
          </p>
          <button className="bg-[#1e293b] hover:bg-[#334155] text-white px-6 py-2.5 rounded-md font-medium">
            Know More!
          </button>
        </div>

        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            Key Features
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
            For Seeker And Lister!
          </h3>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-[500px] pointer-events-none transition-all duration-500 ease-out animate-fadeIn">
                      <div className="relative w-[333px] h-[537px]">
                        <img
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          className="w-full h-full object-cover transition-all duration-500"
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
                    onClick={() => setActiveIndex(feature.originalIndex)}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 border ${
                        isActive
                          ? "bg-transparent border-white"
                          : "bg-[#f7f7fd] border-black"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isActive ? "text-white" : "text-gray-700"
                        }`}
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
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
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
        </div>
      </div>
    </section>
  );
}
