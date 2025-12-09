import { getLandingData } from '@/lib/api'

export default async function FeaturesSection() {
  const data = await getLandingData()
  return (
    <section className="container-default py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {data.features.map((f, i) => (
          <div
            key={i}
            className={
              f.highlight
                ? 'rounded-xl bg-primary text-white p-8'
                : 'rounded-xl bg-surface p-8'
            }
          >
            <h3 className={f.highlight ? 'text-white text-xl font-semibold' : 'text-slate-900 text-xl font-semibold'}>
              {f.title}
            </h3>
            <p className={f.highlight ? 'text-white/90 mt-3' : 'text-slate-600 mt-3'}>
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

