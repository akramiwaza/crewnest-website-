import Image from "next/image";
import Link from "next/link";

const data = {
  header: {
    nav: [
      { label: "About", href: "#about" },
      { label: "Insights", href: "#insights" },
      { label: "Contact Us", href: "#contact" },
    ],
    cta: "Sign Up",
  },
};

export default async function Header({ logoData }: { logoData: string }) {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="px-10 h-16 flex items-center justify-between">
        <Link href="/" className="relative w-[302px] h-[36px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${logoData}`}
            alt="Logo"
            fill
            className="object-cover"
            unoptimized={`${process.env.NEXT_PUBLIC_SITE_URL_IMAGE}/${logoData}`.startsWith(
              "http"
            )}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {data.header.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-slate-700 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <Link href="#" className="btn-primary">
            {data.header.cta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
