"use client";
import { memo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import NewProjectModal from "./../../../../components/features/projects/NewProjectModal";
import PriorityBadge from "@/components/ui/PriorityBadge";
import Status from "@/components/ui/Status";
import { AvatarGroup } from "@/components/ui/Avatar";
import { useModal } from "@/hooks/useModal";
import { capitalize } from "@/utils/capitalize";
type PriorityLevel = "high" | "medium" | "low";
type StatusType =
  | "NotStarted"
  | "InProgress"
  | "Completed"
  | "OnHold"
  | "Cancelled"
  | "Blocked"
  | "Backlog";
type Project = {
  label: string;
  priority: PriorityLevel;
  date: string;
  issues: number;
  status: StatusType;
  team: string[];
};
const Page = () => {
  const { isOpen, open, close, setIsOpen } = useModal();

  const projects = [
    {
      label: "Project 1",
      priority: "high",
      date: "2023-08-01",
      issues: 5,
      status: "InProgress",
      team: ["Jane Doe", "Marcus Lee", "Leo Martins", "Sara Osman"],
    },
    {
      label: "Project 2",
      priority: "medium",
      date: "2023-08-02",
      issues: 3,
      status: "NotStarted",
      team: ["Priya Nair", "David Kim"],
    },
    {
      label: "Project 3",
      priority: "low",
      date: "2023-08-03",
      issues: 1,
      status: "Completed",
      team: ["Amelia Ross", "Mostafa Ehab", "Jane Doe"],
    },
    {
      label: "Project 4",
      priority: "high",
      date: "2023-08-04",
      issues: 2,
      status: "InProgress",
      team: ["Marcus Lee", "David Kim", "Priya Nair", "Leo Martins", "Sara Osman"],
    },
  ] as Project[];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Projects
        </h1>

        <Plus
          onClick={open}
          className="size-9 cursor-pointer rounded-full bg-primary p-2 text-foreground-inverse shadow-sm transition-all duration-150 hover:bg-primary-hover hover:shadow-md active:bg-primary-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
                Label
              </th>
              <th className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
                Priority
              </th>
              <th className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
                Issues
              </th>
              <th className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
                Team
              </th>
              <th className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
                Status
              </th>
              <th className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-divider">
            {projects.map((project, index) => (
              <tr
                key={index}
                className="relative transition-colors hover:bg-surface-hover"
              >
                <td className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 font-medium text-foreground">
                  <Link
                    href={`/projects/${project.label.toLowerCase().replace(/\s+/g, "-")}/overview`}
                    className="after:absolute after:inset-0"
                  >
                    {project.label}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 text-foreground-secondary">
                  <PriorityBadge priority={project.priority}>
                    {capitalize(project.priority)}
                  </PriorityBadge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 tabular-nums text-foreground-secondary">
                  {project.issues}
                </td>
                <td className="relative z-10 w-px whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0">
                  <AvatarGroup names={project.team} size="sm" max={4} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 text-foreground-secondary">
                  <Status status={project.status}>
                    {project.status.replace(/([A-Z])/g, " $1").trim()}
                  </Status>
                </td>
                <td className="whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0 text-foreground-secondary">
                  {project.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <NewProjectModal isOpen={isOpen} close={close} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default memo(Page);
