import { FooterData, HeroData } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  X,
  Mail,
  Phone,
  Send,
  Linkedin,
  Youtube,
} from "lucide-react";

const data = {
  footer: {
    links: [
      [
        { label: "About", href: "#" },
        { label: "Lister", href: "#" },
        { label: "Seeker", href: "#" },
      ],
      [
        { label: "Help center", href: "#" },
        { label: "Privacy policy", href: "#" },
        { label: "Terms and Conditions", href: "#" },
      ],
    ],
  },
};

export default async function Footer({
  footerData,
  heroData,
}: {
  footerData: FooterData;
  heroData: HeroData;
}) {
  return (
    <footer className="border-t border-border bg-dark text-body pb-[32px]">
      <div className="px-4 sm:px-6 lg:px-10">
        {/* Banner Section */}
        <div className="w-full h-auto min-h-[300px] md:h-[196px] relative mt-[32px] sm:mt-[48px] lg:mt-[72px] mb-[32px] rounded-lg overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${footerData.banner.image}`}
            alt={footerData.banner.title}
            fill
            className="object-cover"
            unoptimized={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${footerData.banner.image}`.startsWith(
              "http"
            )}
          />
          <div className="absolute inset-0 flex items-center p-4 sm:p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-[48px] w-full max-w-7xl">
              <div className="flex flex-col items-center lg:items-start gap-[8px] max-w-full lg:max-w-[591px] text-center lg:text-left">
                <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold text-white">
                  {footerData.banner.title}
                </h2>
                <p className="text-bodySecondary text-[14px] sm:text-[16px]">
                  {footerData.banner.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={heroData.actionButtons.appStore.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#333D4C] border border-[#333D4C] rounded-lg px-[18px] py-[12px] transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary group w-full sm:w-auto"
                >
                  <img
                    src="/apple-play.svg"
                    alt="Apple Play"
                    width={24}
                    height={24}
                    className="flex-shrink-0 brightness-0 invert transition-all duration-200"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-[14px] font-semibold leading-tight text-white group-hover:text-white transition-colors duration-200">
                      {heroData.actionButtons.appStore.title}
                    </span>
                  </div>
                </a>
                <a
                  href={heroData.actionButtons.playStore.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#333D4C] border border-[#333D4C] rounded-lg px-[18px] py-[12px] transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary group w-full sm:w-auto"
                >
                  <img
                    src="/google-play.svg"
                    alt="Google Play"
                    width={24}
                    height={24}
                    className="flex-shrink-0  transition-all duration-200"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-[14px] font-semibold leading-tight text-white group-hover:text-white transition-colors duration-200">
                      {heroData.actionButtons.playStore.title}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10 justify-between items-start">
          {/* Left Section - Logo, Socials, Copyright */}
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            {footerData.settings?.logo ? (
              <div className="relative w-full max-w-[251px] h-[30px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${footerData.settings.logo}`}
                  alt={footerData.banner.title}
                  fill
                  className="object-cover brightness-50 invert"
                  unoptimized={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${footerData.settings.logo}`.startsWith(
                    "http"
                  )}
                />
              </div>
            ) : (
              <div className="text-white font-bold text-lg">CREW•NEST</div>
            )}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {footerData.settings?.socials?.instagram && (
                <a
                  href={footerData.settings.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              )}
              {footerData.settings?.socials?.facebook && (
                <a
                  href={footerData.settings.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
              )}
              {footerData.settings?.socials?.twitter && (
                <a
                  href={footerData.settings.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <X className="w-4 h-4 text-white" />
                </a>
              )}
              {footerData.settings?.socials?.linkedin && (
                <a
                  href={footerData.settings.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
              )}
              {footerData.settings?.socials?.youtube && (
                <a
                  href={footerData.settings.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-white" />
                </a>
              )}
              {footerData.settings?.socials?.tiktok && (
                <a
                  href={footerData.settings.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="TikTok"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              )}
            </div>
            <div className="text-sm text-bodySecondary">
              © All rights reserved. Made by Compu-vision
            </div>
          </div>

          {/* Middle Section - Links */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 sm:gap-10 w-full lg:w-auto">
            {data.footer.links.map((group, gi) => (
              <ul key={gi} className="space-y-2">
                {group.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-body hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* Right Section - Contact and Newsletter */}
          <div className="w-full lg:max-w-xs space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-body flex-wrap">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">
                  {footerData.settings.contact.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-body">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>
                  {footerData.settings.contact.phone.code}{" "}
                  {footerData.settings.contact.phone.number}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">
              Subscribe to Our Newsletter
            </h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 sm:px-4 py-2 text-white placeholder:text-bodySecondary focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
