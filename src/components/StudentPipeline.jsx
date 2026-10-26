import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { students, statusStyles } from "../data/dashboard";

export default function StudentPipeline() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <div className="px-6 pb-6 pt-7">
        <SectionHeader
          title="Student pipeline"
          subtitle="Recently active talent"
          action="View all"
          showArrow
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-y border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
              <th className="w-[30%] px-6 py-4 font-bold">Student</th>
              <th className="w-[30%] px-6 py-4 font-bold">Program</th>
              <th className="w-[12%] px-6 py-4 font-bold">Year</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="w-12 px-6 py-4" />
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.name}
                className="group cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${s.avatar}`}
                    >
                      {s.initials}
                    </div>
                    <span className="text-[15px] font-semibold text-navy-950">{s.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[15px] text-slate-600">{s.program}</td>
                <td className="px-6 py-4 text-[15px] text-slate-600">{s.year}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 group-hover:text-slate-700">
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
