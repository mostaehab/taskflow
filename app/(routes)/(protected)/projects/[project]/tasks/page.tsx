import ProjectTabs from "@/components/features/projects/ProjectTabs";
import ProjectNavigation from "@/components/features/projects/ProjectNavigation";
import DragnDrop from "@/components/features/projects/DragnDrop";
const Page = ({ params }: { params: Promise<{ project: string }> }) => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <ProjectNavigation params={params} />
      <ProjectTabs />
      <DragnDrop />
    </div>
  );
};

export default Page;
