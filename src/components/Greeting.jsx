import { ArrowRight } from "lucide-react";

export default function Greeting() {
  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase text-teal-brand">Monday, October 14</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-navy-950 lg:text-[42px]">
          Good morning, Maya.
        </h1>
        <p className="mt-3 text-[15px] text-slate-500">
          Here’s what’s happening across your talent pipeline.
        </p>
      </div>
      <button className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-3 text-[15px] font-semibold text-navy-950 shadow-sm hover:bg-slate-50 sm:self-auto">
        Export report
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
