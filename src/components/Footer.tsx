import Link from 'next/link'
import { getLandingData } from '@/lib/api'

export default async function Footer() {
  const data = await getLandingData()
  return (
    <footer className="border-t border-border bg-dark text-body py-10">
      <div className="container-default">
        <div className="flex flex-col lg:flex-row gap-10 justify-between">
          <div className="max-w-sm">
            <div className="text-white font-bold text-lg">CREW•NEST</div>
            <p className="mt-3 text-body">{data.footer.about}</p>
            <div className="mt-4 flex items-center gap-3">
              <a href={data.footer.store.appStore ?? '#'} className="btn-secondary">App Store</a>
              <a href={data.footer.store.googlePlay ?? '#'} className="btn-secondary">Google Play</a>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-10">
            {data.footer.links.map((group, gi) => (
              <ul key={gi} className="space-y-2">
                {group.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-body hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="max-w-xs">
            <div className="text-sm text-body">{data.footer.email}</div>
            <div className="text-sm text-body mt-1">{data.footer.phone}</div>
          </div>
        </div>
        <div className="mt-8 text-sm text-bodySecondary">© {new Date().getFullYear()} Crew•Nest</div>
      </div>
    </footer>
  )
}

