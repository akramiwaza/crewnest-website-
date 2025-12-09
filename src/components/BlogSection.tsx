import { getLandingData } from "@/lib/api";

export default async function BlogSection() {
  const data = await getLandingData();
  return (
    <section id="insights" className="container-default py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Tips, News & Stories From The Sky
      </h2>
      <p className="text-center text-slate-600 mt-3">
        Get the latest on housing trends, booking tips, and community updates
        shared by airline professionals.
      </p>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.blog.map((b) => (
          <article
            key={b.id}
            className="rounded-xl overflow-hidden border bg-white"
          >
            <div className="h-40 bg-gray-200" />
            <div className="p-4">
              <div className="text-xs text-slate-500">{b.tag}</div>
              <h3 className="mt-1 font-semibold">{b.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{b.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
