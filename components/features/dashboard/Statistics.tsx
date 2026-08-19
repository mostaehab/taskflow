import { memo } from "react";
import { ListTodo, ListCheck, Clock, CircleAlert } from "lucide-react";
const Statistics = () => {
  const statistics = [
    {
      label: "Total Tasks",
      value: 120,
      icon: ListTodo,
    },
    {
      label: "Completed Tasks",
      value: 80,
      icon: ListCheck,
    },
    {
      label: "Pending Tasks",
      value: 40,
      icon: Clock,
    },
    {
      label: "Overdue Tasks",
      value: 10,
      icon: CircleAlert,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Statistics
        </h2>
        <p className="text-sm text-foreground-secondary">
          Across all projects and team members this week.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-start gap-1 rounded-xl border border-border bg-surface p-5 shadow-sm"
          >
            <Icon className="mb-2 size-9 shrink-0 rounded-lg bg-primary-soft p-2 text-primary ring-1 ring-inset ring-primary/10" />
            <div className="text-2xl font-semibold tabular-nums text-foreground">
              {value}
            </div>
            <div className="text-sm text-foreground-secondary">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Statistics);
