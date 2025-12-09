import { getLandingData } from '@/lib/api'

export default async function DownloadBanner() {
  const data = await getLandingData()
  return (
    <section className="bg-dark py-10">
      <div className="container-default">
        <div className="rounded-xl bg-darkTertiary text-white p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <div className="text-2xl font-semibold">{data.download.title}</div>
            <p className="mt-2 text-bodySecondary max-w-xl">{data.download.description}</p>
          </div>
          <div className="flex gap-3">
            <a href={data.footer.store.appStore ?? '#'} className="btn-secondary">App Store</a>
            <a href={data.footer.store.googlePlay ?? '#'} className="btn-secondary">Google Play</a>
          </div>
        </div>
      </div>
    </section>
  )
}

