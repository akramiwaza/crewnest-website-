"use client";

import { FeaturedNewsData, NewsSectionData } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogSection({
  featuredNewsData,
  newsSectionData,
}: {
  featuredNewsData: FeaturedNewsData[];
  newsSectionData: NewsSectionData;
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

  const totalSlides = Math.ceil(featuredNewsData.length / itemsPerView);

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
    <section id="insights" className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        {newsSectionData.title}
      </h2>
      <p className="text-center text-slate-600 mt-3 text-sm sm:text-base px-4">
        {newsSectionData.description}
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
                {featuredNewsData
                  .slice(
                    slideIndex * itemsPerView,
                    slideIndex * itemsPerView + itemsPerView
                  )
                  .map((b) => (
                    <Link
                      href={`/news/${b._id}`}
                      key={b._id}
                      className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-[250px] sm:h-[300px] bg-gray-200 relative">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${b.image}`}
                          alt={b.title}
                          fill
                          className="object-cover rounded-t-xl"
                          unoptimized={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${b.image}`.startsWith(
                            "http"
                          )}
                        />
                      </div>
                      <div className="pt-[16px] pb-[22px] px-[9px] flex flex-col gap-[5px]">
                        <div className="text-[14px] sm:text-[16px] text-[#6B7280] font-normal">
                          {b.category}
                        </div>
                        <h3 className="font-semibold text-[18px] sm:text-[20px] line-clamp-2">
                          {b.title}
                        </h3>
                        <span className="text-[#6B7280] text-[14px] sm:text-[16px] font-normal">
                          {(() => {
                            const date = new Date(b.createdAt);
                            const pad = (n: number) =>
                              n.toString().padStart(2, "0");
                            return `${pad(date.getMonth() + 1)}-${pad(
                              date.getDate()
                            )}-${date.getFullYear()}`;
                          })()}
                        </span>
                        <p className="mt-[8px] text-[#6B7280] text-[14px] sm:text-[16px] font-normal line-clamp-3">
                          {b.description}
                        </p>
                      </div>
                    </Link>
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
    </section>
  );
}
