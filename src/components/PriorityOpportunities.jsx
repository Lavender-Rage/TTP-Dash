import SectionHeader from "./SectionHeader";
import { opportunities } from "../data/dashboard";

export default function PriorityOpportunities() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 lg:p-7">
      <SectionHeader
        title="Priority opportunities"
        subtitle="Open roles with upcoming deadlines"
        action="View board"
      />

      <ul className="mt-6 space-y-4">
        {opportunities.map((o) => (
          <li
            key={o.title}
            className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 hover:border-slate-200"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white ${o.logo}`}
            >
              {o.letter}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-navy-950">{o.title}</p>
              <p className="mt-0.5 text-sm text-slate-500">
                {o.company} · {o.candidates} candidates
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Closes
              </p>
              <p className="mt-1 text-[15px] font-semibold text-navy-950">{o.closes}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
