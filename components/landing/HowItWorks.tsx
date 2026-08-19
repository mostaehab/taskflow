import { memo } from "react";
import { SquarePen, List, Users, Rocket } from "lucide-react";
const HowItWorks = () => {
  const steps = [
    {
      label: "Create Workspace",
      how: "Set up your workspace and invite your team members",
      icon: SquarePen,
    },
    {
      label: "Plan Your Work",
      how: "Create boards, add tasks, and organize priorities",
      icon: List,
    },
    {
      label: "Collaborate",
      how: "Work together in real-time and stay aligned",
      icon: Users,
    },
    {
      label: "Deliver Results",
      how: "Track progress and ship high-quality work",
      icon: Rocket,
    },
  ];

  return (
    <div className="bg-surface py-24">
      <div className="container mx-auto px-6">
        <ul className="flex flex-col gap-12 md:flex-row md:justify-between">
          {steps.map(({ label, how, icon: Icon }) => (
            <li
              key={label}
              className="flex flex-1 flex-col gap-2 justify-center items-center text-center"
            >
              <Icon className="size-12 rounded-full bg-primary-soft p-3 text-primary ring-1 ring-inset ring-primary/10" />
              <span className="mt-2 text-lg font-semibold text-foreground">
                {label}
              </span>
              <span className="max-w-56 text-sm leading-relaxed text-foreground-secondary">
                {how}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(HowItWorks);
