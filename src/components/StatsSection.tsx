import { getLandingData } from '@/lib/api'

export default async function StatsSection() {
  const data = await getLandingData()
  return (
    <section className="container-default py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
        {data.stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-slate-900">{s.value}</div>
            <div className="mt-2 text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

