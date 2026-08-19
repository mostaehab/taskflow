import Statistics from "@/components/features/dashboard/Statistics";
import Projects from "@/components/features/dashboard/Projects";
import TeamWorkload from "@/components/features/dashboard/TeamWorkload";
const Page = () => {
  return (
    <div className="flex flex-col gap-8">
      <Statistics />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Projects />
        </div>
        <TeamWorkload />
      </div>
    </div>
  );
};

export default Page;
