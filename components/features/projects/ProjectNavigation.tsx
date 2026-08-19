import { memo } from "react";
const ProjectNavigation = async ({
  params,
}: {
  params: Promise<{ project: string }>;
}) => {
  const { project: projectName } = await params;
  return (
    <div className="flex shrink-0 items-center border-b border-border py-3">
      <span className="text-sm font-medium capitalize text-foreground-secondary">
        Projects {">"} {projectName.replace("-", " ")}
      </span>
    </div>
  );
};

export default memo(ProjectNavigation);
