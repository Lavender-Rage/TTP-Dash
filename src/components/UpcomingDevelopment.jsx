import SectionHeader from "./SectionHeader";
import { events } from "../data/dashboard";

export default function UpcomingDevelopment() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 lg:p-7">
      <SectionHeader
        title="Upcoming development"
        subtitle="Workshops, coaching, and community"
        action="Full calendar"
      />

      <ul className="mt-6 space-y-3">
        {events.map((e) => (
          <li key={e.title} className="flex items-center gap-5 rounded-xl px-2 py-3">
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-100">
              <span className="text-[10px] font-bold uppercase text-teal-brand">{e.month}</span>
              <span className="text-lg font-bold leading-none text-navy-950">{e.day}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-navy-950">{e.title}</p>
              <p className="mt-1 text-sm text-slate-500">
                {e.time} · {e.place}
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {e.tag}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
