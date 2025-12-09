"use client";

import { TestimonialsData, TestimonialsSectionData } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const StarSvg = ({ filled = true }: { filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 1.66675L12.575 6.88341L18.3333 7.72508L14.1667 11.7834L15.15 17.5167L10 14.8084L4.85001 17.5167L5.83334 11.7834L1.66667 7.72508L7.425 6.88341L10 1.66675Z"
      fill={filled ? "#2D3358" : "none"}
      stroke={filled ? "#2D3358" : "#2D3358"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TestimonialsSection({
  testimonialsData,
  testimonialsSectionData,
}: {
  testimonialsData: TestimonialsData[];
  testimonialsSectionData: TestimonialsSectionData;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Calculate items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(4); // lg: 4 items
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2); // sm: 2 items
      } else {
        setItemsPerView(1); // mobile: 1 item
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(testimonialsData.length / itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-surface py-12 sm:py-16">
      <div className="px-4 sm:px-6 lg:px-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          {testimonialsSectionData.title}
        </h2>
        <p className="text-center text-slate-600 mt-3 text-sm sm:text-base px-4">
          {testimonialsSectionData.description}
        </p>

        {/* Carousel Container */}
        <div className="mt-8 sm:mt-10 relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2"
                >
                  {testimonialsData
                    .slice(
                      slideIndex * itemsPerView,
                      slideIndex * itemsPerView + itemsPerView
                    )
                    .map((t) => (
                      <div
                        key={t._id}
                        className="rounded-xl bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-300 relative flex-shrink-0">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${t.image}`}
                              alt={t.fullName}
                              fill
                              className="object-cover rounded-full"
                              unoptimized={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${t.image}`.startsWith(
                                "http"
                              )}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm sm:text-base truncate">
                              {t.fullName}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-600">
                              {t.type === "lister" ? "Lister" : "Seeker"}
                            </div>
                          </div>
                        </div>
                        <div className="mt-[5px] flex items-center gap-[7px]">
                          {Array.from({ length: 5 }, (_, index) => (
                            <span key={index}>
                              <StarSvg filled={index < t.rating} />
                            </span>
                          ))}
                        </div>

                        <p className="mt-3 text-slate-700 text-sm sm:text-base line-clamp-4">
                          {t.review}
                        </p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
              <button
                onClick={handlePrev}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
                type="button"
                disabled={totalSlides <= 1}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Indicators */}
              <div className="flex gap-2 overflow-x-auto max-w-full px-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-pressed={index === currentIndex}
                    type="button"
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
                type="button"
                disabled={totalSlides <= 1}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
