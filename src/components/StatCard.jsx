import { MoreHorizontal } from "lucide-react";

export default function StatCard({ label, value, note, icon: Icon, iconBg, iconColor }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.75} />
        </div>
        <button className="text-slate-400 hover:text-slate-700" aria-label={`${label} options`}>
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-6 text-[15px] text-slate-500">{label}</p>
      <p className="mt-1 text-4xl font-bold tracking-tight text-navy-950">{value}</p>
      <p className="mt-3 text-sm font-medium text-teal-brand">{note}</p>
    </article>
  );
}
