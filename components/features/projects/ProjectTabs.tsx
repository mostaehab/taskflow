"use client";
import { memo } from "react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
const ProjectTabs = () => {
  const { project } = useParams();
  const pathname = usePathname();

  const tabs = [
    {
      name: "Overview",
      href: `/projects/${project}/overview`,
    },
    {
      name: "Tasks",
      href: `/projects/${project}/tasks`,
    },
  ];
  return (
    <nav className="border-b border-border mb-5">
      <ul className="-mb-px flex gap-1 [&>li:first-child>a]:pl-0">
        {tabs.map((tab) => {
          const current =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <li key={tab.name}>
              <a
                href={tab.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex items-center rounded-t-md border-b-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                  current
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground-secondary hover:border-border hover:text-foreground",
                )}
              >
                {tab.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default memo(ProjectTabs);
