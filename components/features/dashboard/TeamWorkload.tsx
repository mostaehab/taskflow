import { memo } from "react";
import Avatar from "@/components/ui/Avatar";

type Workload = {
  name: string;
  role: string;
  active: number;
  done: number;
};

const workloads: Workload[] = [
  { name: "Mostafa Ehab", role: "Product Lead", active: 3, done: 9 },
  { name: "Jane Doe", role: "Frontend Engineer", active: 5, done: 12 },
  { name: "Marcus Lee", role: "Backend Engineer", active: 4, done: 7 },
  { name: "Priya Nair", role: "Product Designer", active: 2, done: 6 },
  { name: "David Kim", role: "QA Engineer", active: 6, done: 4 },
];

const maxActive = Math.max(...workloads.map((w) => w.active));

const TeamWorkload = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Team workload
        </h2>
        <span className="text-sm text-foreground-secondary">This sprint</span>
      </div>

      <ul className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm">
        {workloads.map((member) => (
          <li key={member.name} className="flex items-center gap-3">
            <Avatar name={member.name} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-foreground">
                  {member.name}
                </p>
                <span className="shrink-0 text-xs tabular-nums text-foreground-muted">
                  {member.active} active · {member.done} done
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(member.active / maxActive) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(TeamWorkload);
