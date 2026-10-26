import { Users, Briefcase, CalendarDays, LineChart } from "lucide-react";

export const stats = [
  {
    label: "Active students",
    value: "248",
    note: "+12 this month",
    icon: Users,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    label: "Open opportunities",
    value: "36",
    note: "8 closing soon",
    icon: Briefcase,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    label: "Interviews this week",
    value: "18",
    note: "+5 vs. last week",
    icon: CalendarDays,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    label: "Placement rate",
    value: "68%",
    note: "+9% year over year",
    icon: LineChart,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
];

export const students = [
  { initials: "AM", name: "Avery Morgan", program: "Computer Science", year: "Senior", status: "Interviewing", avatar: "bg-violet-100 text-violet-600" },
  { initials: "JL", name: "Jordan Lee", program: "Data Science", year: "Junior", status: "Applied", avatar: "bg-sky-100 text-sky-700" },
  { initials: "SK", name: "Samira Khan", program: "Information Systems", year: "Senior", status: "Offer", avatar: "bg-amber-100 text-amber-700" },
  { initials: "DT", name: "Diego Torres", program: "Computer Engineering", year: "Junior", status: "Prospecting", avatar: "bg-emerald-100 text-emerald-700" },
];

export const statusStyles = {
  Interviewing: "bg-amber-100 text-amber-700",
  Applied: "bg-slate-100 text-slate-600",
  Offer: "bg-emerald-100 text-emerald-700",
  Prospecting: "bg-slate-100 text-slate-600",
};

export const opportunities = [
  { letter: "F", title: "Product Engineering Intern", company: "Figma", candidates: 14, closes: "Oct 18", logo: "bg-fuchsia-600" },
  { letter: "S", title: "New Grad Software Engineer", company: "Stripe", candidates: 9, closes: "Oct 24", logo: "bg-indigo-600" },
  { letter: "N", title: "Data Analyst, Early Career", company: "Notion", candidates: 7, closes: "Nov 02", logo: "bg-neutral-900" },
];

export const events = [
  { month: "Oct", day: "16", title: "Technical Interview Lab", time: "2:00 PM", place: "Innovation Hub", tag: "Workshop" },
  { month: "Oct", day: "19", title: "Alumni Mentor Mixer", time: "5:30 PM", place: "Founders Hall", tag: "Networking" },
  { month: "Oct", day: "23", title: "Resume Review Sprint", time: "11:00 AM", place: "Career Center", tag: "Coaching" },
];
