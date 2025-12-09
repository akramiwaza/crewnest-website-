import { getLandingData } from '@/lib/api'

export default async function TestimonialsSection() {
  const data = await getLandingData()
  return (
    <section className="bg-surface py-16">
      <div className="container-default">
        <h2 className="text-3xl md:text-4xl font-bold text-center">What Our Community Is Saying</h2>
        <p className="text-center text-slate-600 mt-3">Real stories from airline professionals</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.testimonials.map((t, i) => (
            <div key={i} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gray-300" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-slate-600">{t.role}</div>
                </div>
              </div>
              <div className="mt-4 text-amber-500">{'★'.repeat(t.rating)}</div>
              <p className="mt-3 text-slate-700">{t.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

