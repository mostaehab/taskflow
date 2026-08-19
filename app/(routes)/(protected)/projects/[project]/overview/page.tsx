import { memo } from "react";
import { UserPlus } from "lucide-react";
import { capitalize } from "@/utils/capitalize";
import ProjectPropsMenu from "@/components/features/projects/ProjectPropsMenu";
import ProjectTabs from "@/components/features/projects/ProjectTabs";
import ProjectNavigation from "@/components/features/projects/ProjectNavigation";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
const Page = async ({ params }: { params: Promise<{ project: string }> }) => {
  const skippedFields = ["name", "description"];
  const projectProps = {
    status: "Active",
    name: "Project Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966",
    priority: "High",
    lead: "Mostafa Ehab",
    reviewer: "Jane Doe",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  };
  const projectTeam = [
    { name: "Mostafa Ehab", role: "Project Lead", lead: true },
    { name: "Jane Doe", role: "Frontend Engineer", lead: false },
    { name: "Marcus Lee", role: "Backend Engineer", lead: false },
    { name: "Priya Nair", role: "Product Designer", lead: false },
    { name: "David Kim", role: "QA Engineer", lead: false },
  ];
  return (
    <div className="flex flex-row items-start gap-6">
      <div className="flex min-w-0 flex-1 flex-col">
        <ProjectNavigation params={params} />
        <ProjectTabs />
        <div className="flex flex-col gap-4">
          {" "}
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {projectProps.name}
            </h2>
            <p className="max-w-2xl leading-relaxed text-foreground-secondary">
              {projectProps.description}
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-5 rounded-xl border border-border bg-surface p-5 text-sm shadow-sm sm:grid-cols-3">
            {Object.entries(projectProps)
              .filter(([key]) => !skippedFields.includes(key))
              .map(([key, value]) => (
                <li key={key} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-foreground-muted">
                    {capitalize(key)}
                  </span>
                  {key === "lead" || key === "reviewer" ? (
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <Avatar name={String(value)} size="sm" />
                      {String(value)}
                    </span>
                  ) : (
                    <span className="font-medium text-foreground">
                      {String(value)}
                    </span>
                  )}
                </li>
              ))}
          </ul>

          <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  Team
                </h3>
                <span className="rounded-full bg-surface-muted px-1.5 py-0.5 text-xs font-medium tabular-nums text-foreground-secondary">
                  {projectTeam.length}
                </span>
              </div>
              <Button variant="ghost" size="small">
                <UserPlus className="size-4" />
                Invite
              </Button>
            </div>
            <ul className="flex flex-col divide-y divide-divider">
              {projectTeam.map((member) => (
                <li
                  key={member.name}
                  className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <Avatar name={member.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {member.name}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {member.role}
                    </p>
                  </div>
                  {member.lead && (
                    <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
                      Lead
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ProjectPropsMenu properties={projectProps} />
    </div>
  );
};

export default memo(Page);
