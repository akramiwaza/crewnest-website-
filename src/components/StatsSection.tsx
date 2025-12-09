import { StatsData } from "@/lib/api";
export default async function StatsSection({
  statsData,
}: {
  statsData: StatsData[];
}) {
  return (
    <section className="px-10 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
        {statsData.map((s) => (
          <div key={s._id} className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <div className="text-3xl md:text-[40px] font-bold text-black">
                {s.type === "rating"
                  ? `${s.value} ★`
                  : typeof s.value === "number"
                  ? "+" + s.value.toLocaleString()
                  : String(s.value)}
              </div>
              <span className="text-[20px] font-normal text-black">
                {s.title}
              </span>
            </div>
            <p className="mt-[8px] text-[16px] text-slate-600">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
