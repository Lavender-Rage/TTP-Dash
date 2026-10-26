import { ArrowRight } from "lucide-react";

export default function SectionHeader({ title, subtitle, action, showArrow = false }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-navy-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <a
        href="#"
        className="mt-2 flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-brand hover:text-teal-dark"
      >
        {action}
        {showArrow && <ArrowRight className="h-4 w-4" />}
      </a>
    </div>
  );
}
