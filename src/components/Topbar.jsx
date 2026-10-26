import { Search, Bell, Plus } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-slate-200/70 bg-white px-6 py-5 lg:px-10">
      <label className="flex w-full max-w-md items-center gap-3 rounded-xl bg-slate-100/80 px-4 py-3 text-slate-500 focus-within:ring-2 focus-within:ring-teal-brand/30">
        <Search className="h-4 w-4 shrink-0" />
        <input
          type="text"
          placeholder="Search students, companies..."
          className="w-full bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
      </label>

      <div className="ml-auto flex items-center gap-3">
        <button
          className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
          <span className="absolute right-3 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
        <button className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-navy-950 px-5 py-3 text-[15px] font-bold text-white hover:bg-navy-800">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Add student
        </button>
      </div>
    </header>
  );
}
