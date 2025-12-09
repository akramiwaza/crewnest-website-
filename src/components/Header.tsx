import Link from "next/link";
import { getLandingData } from "@/lib/api";

export default async function Header() {
  const data = await getLandingData();
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="container-default h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          CREW•NEST
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
