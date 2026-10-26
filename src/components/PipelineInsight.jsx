import { Sparkles, ArrowRight } from "lucide-react";

export default function PipelineInsight() {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-mint-50 p-6 lg:p-7">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-brand">
        <Sparkles className="h-3 w-3" />
        Pipeline insight
      </span>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-navy-950">
        Computer Science juniors need attention.
      </h2>
      <p className="mt-4 text-[15px] text-slate-600">
        Only 42% have completed a technical mock interview, compared with 71% across other
        programs.
      </p>
      <button className="mt-6 flex items-center gap-2 rounded-xl bg-teal-brand px-5 py-3 text-[15px] font-bold text-white hover:bg-teal-dark">
        View cohort
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
