import {
  Sparkles,
  LayoutGrid,
  Users,
  Briefcase,
  LineChart,
  CalendarDays,
  MoreHorizontal,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutGrid, active: true },
  { label: "Students", icon: Users, badge: 248 },
  { label: "Opportunities", icon: Briefcase },
  { label: "Development", icon: LineChart },
  { label: "Events", icon: CalendarDays },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-[300px] shrink-0 flex-col bg-navy-900 text-slate-300 lg:flex">
      {/* Brand */}
      <div className="flex items-center gap-3.5 border-b border-white/5 px-9 py-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-brand text-navy-950">
          <Sparkles className="h-5 w-5" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <p className="text-[19px] font-bold text-white">Launchpad</p>
          <p className="text-[13px] text-slate-400">Talent CRM</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 pt-9">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Workspace
        </p>
        <ul className="space-y-1.5">
          {navItems.map(({ label, icon: Icon, active, badge }) => (
            <li key={label}>
              <a
                href="#"
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
                  active
                    ? "bg-white text-navy-950"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="rounded-full bg-navy-700 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                    {badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Fall goal */}
      <div className="mx-6 mb-6 rounded-2xl bg-navy-800 p-5">
        <div className="flex items-center gap-2 text-[13px] font-bold uppercase text-lime-brand">
          <Sparkles className="h-3.5 w-3.5" />
          Fall goal
        </div>
        <p className="mt-3 text-[15px] leading-snug text-slate-200">
          68% of seniors have secured a next step.
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-navy-700">
          <div className="h-full w-[68%] rounded-full bg-lime-brand" />
        </div>
      </div>

      {/* User */}
      <div className="flex items-center gap-3 border-t border-white/5 px-7 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-200 text-sm font-bold text-teal-900">
          MC
        </div>
        <div className="flex-1 leading-tight">
          <p className="text-[15px] font-semibold text-white">Maya Chen</p>
          <p className="text-[13px] text-slate-400">Career Programs</p>
        </div>
        <button className="rounded-md p-1 text-slate-400 hover:text-white" aria-label="Account menu">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
}
