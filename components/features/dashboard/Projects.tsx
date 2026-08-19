import { memo } from "react";
import Link from "next/link";
import PriorityBadge from "@/components/ui/PriorityBadge";
import { AvatarGroup } from "@/components/ui/Avatar";
import { capitalize } from "@/utils/capitalize";
const Projects = () => {
  type PriorityLevel = "low" | "medium" | "high";
  interface Project {
    name: string;
    description: string;
    priority: PriorityLevel;
    team: string[];
  }
  const projects = [
    {
      name: "Project Alpha",
      description:
        "A cutting-edge project that leverages AI to optimize workflows.",
      priority: "high",
      team: ["Jane Doe", "Marcus Lee", "Leo Martins", "Sara Osman"],
    },
    {
      name: "Project Beta",
      description:
        "A comprehensive project focused on enhancing user experience and satisfaction.",
      priority: "medium",
      team: ["Priya Nair", "David Kim", "Amelia Ross"],
    },
  ] as Project[];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        Projects
      </h2>
      <div className="flex flex-col flex-start gap-3">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}`}
            key={project.name}
          >
            <div
              key={project.name}
              className="flex flex-col gap-1 rounded-xl bg-surface p-5  justify-between transition-colors duration-150 hover:bg-surface-hover"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  {project.name}
                </h3>
                <PriorityBadge priority={project.priority}>
                  {capitalize(project.priority)}
                </PriorityBadge>
              </div>

              <p className="text-sm text-foreground-secondary">
                {project.description}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <AvatarGroup
                  names={project.team}
                  size="sm"
                  max={4}
                  ringClass="ring-surface"
                />
                <span className="text-xs text-foreground-muted">
                  {project.team.length} members
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(Projects);
