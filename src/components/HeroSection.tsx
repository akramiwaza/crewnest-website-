import { HeroData } from "@/lib/api";
import Image from "next/image";

export default async function HeroSection({
  heroData,
}: {
  heroData: HeroData;
}) {
  const imageUrl = heroData.image
    ? `${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${heroData.image}`
    : "/placeholder.png";

  return (
    <section className="bg-surface min-h-[600px] w-full py-16 xl:py-0">
      <div className="grid xl:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-6 px-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            {heroData.title}
          </h1>
          <p className="text-lg text-slate-700">{heroData.description}</p>
          <div className="flex flex-col gap-[16px]">
            <span className="text-[20px] font-semibold leading-[30px] text-black">
              Download the app to get started
            </span>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={heroData.actionButtons.appStore.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white border border-black rounded-lg px-[34px] py-[8px] transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary group"
              >
                <img
                  src="/apple-play.svg"
                  alt="Apple Play"
                  className="flex-shrink-0 group-hover:brightness-0 group-hover:invert transition-all duration-200"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-tight text-black group-hover:text-white transition-colors duration-200">
                    Download on the
                  </span>
                  <span className="text-[14px] font-semibold leading-tight text-black group-hover:text-white transition-colors duration-200">
                    {heroData.actionButtons.appStore.title}
                  </span>
                </div>
              </a>
              <a
                href={heroData.actionButtons.playStore.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white border border-black rounded-lg px-[34px] py-[8px] transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary group"
              >
                <img
                  src="/google-play.svg"
                  alt="Google Play"
                  className="flex-shrink-0  transition-all duration-200"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-tight text-primary group-hover:text-white transition-colors duration-200">
                    GET IT ON
                  </span>
                  <span className="text-[14px] font-semibold leading-tight text-primary group-hover:text-white transition-colors duration-200">
                    {heroData.actionButtons.playStore.title}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[400px] sm:h-[600px]">
          <Image
            src={imageUrl}
            alt={heroData.title}
            fill
            className="object-cover rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={imageUrl.startsWith("http")}
          />
        </div>
      </div>
    </section>
  );
}
