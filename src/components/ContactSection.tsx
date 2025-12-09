import { getLandingData } from '@/lib/api'

export default async function ContactSection() {
  const data = await getLandingData()
  return (
    <section id="contact" className="container-default py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center">{data.contact.title}</h2>
      <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">{data.contact.subtitle}</p>
      <form className="mt-8 grid md:grid-cols-2 gap-6 bg-white rounded-xl p-6 border">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-600">First Name</label>
          <input className="rounded-md border bg-surface px-3 py-2" placeholder="First" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-600">Last Name</label>
          <input className="rounded-md border bg-surface px-3 py-2" placeholder="Last" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-600">Phone Number</label>
          <input className="rounded-md border bg-surface px-3 py-2" placeholder="Phone" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-600">Email</label>
          <input className="rounded-md border bg-surface px-3 py-2" placeholder="Email" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-slate-600">Message</label>
          <textarea className="rounded-md border bg-surface px-3 py-2 h-32" />
        </div>
      </form>
      <div className="mt-6 flex justify-center">
        <button className="btn-primary">Send Message</button>
      </div>
    </section>
  )
}

