import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Greeting from "./components/Greeting";
import StatCard from "./components/StatCard";
import StudentPipeline from "./components/StudentPipeline";
import PipelineInsight from "./components/PipelineInsight";
import PriorityOpportunities from "./components/PriorityOpportunities";
import UpcomingDevelopment from "./components/UpcomingDevelopment";
import HelpButton from "./components/HelpButton";
import { stats } from "./data/dashboard";

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl space-y-8 px-6 py-10 lg:px-10">
            <Greeting />

            <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </section>

            <StudentPipeline />
            <PipelineInsight />
            <PriorityOpportunities />
            <UpcomingDevelopment />
          </div>
        </main>
      </div>

      <HelpButton />
    </div>
  );
}
