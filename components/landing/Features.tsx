import { memo } from "react";
import {
  SquareKanban,
  Users,
  ChartLine,
  Bell,
  Paperclip,
  Lock,
} from "lucide-react";
const Features = () => {
  const features = [
    {
      label: "Kanban Boards",
      description:
        "Visualize work, limit WIP, and keep projects moving with intuitive boards.",
      icon: SquareKanban,
    },
    {
      label: "Team Collaboration",
      description:
        "Real-time updates, comments, and mentions to keep everyone aligned.",
      icon: Users,
    },
    {
      label: "Progress Analytics",
      description:
        "Track progress with beautiful reports and actionable insights.",
      icon: ChartLine,
    },
    {
      label: "Smart Notifications",
      description: "Stay in the loop with custom notifications that matter.",
      icon: Bell,
    },
    {
      label: "Attachments",
      description:
        "Attach files, images, and docs to keep all context in one place.",
      icon: Paperclip,
    },
    {
      label: "Enterprise Ready",
      description: "Secure, scalable, and built for modern teams.",
      icon: Lock,
    },
  ];

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-background py-24"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-3xl font-bold leading-tight tracking-tight text-foreground"
          >
            Everything your team needs to move faster
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-foreground-secondary">
            Powerful features to help you plan, collaborate, and ship amazing
            work.
          </p>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ label, description, icon: Icon }) => (
            <li
              key={label}
              className="flex items-start gap-4 rounded-xl border border-border bg-surface p-6 shadow-sm"
            >
              <Icon className="size-11 shrink-0 rounded-lg bg-primary-soft p-2.5 text-primary ring-1 ring-inset ring-primary/10" />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {label}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-secondary">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default memo(Features);
