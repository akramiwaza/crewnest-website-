import { getLandingData } from '@/lib/api'

export default async function HeroSection() {
  const data = await getLandingData()
  return (
    <section className="bg-surface">
      <div className="container-default grid md:grid-cols-2 gap-10 py-20">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            {data.hero.title}
          </h1>
          <p className="text-lg text-slate-700">
            {data.hero.description}
          </p>
          <div className="flex gap-4">
            <a href={data.hero.appButtons.appStore ?? '#'} className="btn-secondary">App Store</a>
            <a href={data.hero.appButtons.googlePlay ?? '#'} className="btn-secondary">Google Play</a>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-2xl bg-white shadow-xl h-80 md:h-[28rem]" />
        </div>
      </div>
    </section>
  )
}

