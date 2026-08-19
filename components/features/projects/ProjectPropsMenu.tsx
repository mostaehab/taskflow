"use client";

import { memo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { capitalize } from "@/utils/capitalize";
import { cn } from "@/utils/cn";

interface ProjectPropsMenuProps {
  properties: Record<string, string>;
}

const ProjectPropsMenu = ({ properties }: ProjectPropsMenuProps) => {
  const skippedFields = ["name", "description"];
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-1/3">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="project-props-list"
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Properties
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-foreground-secondary transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      <div
        className={cn(
          "grid overflow-auto transition-all duration-200 ease-out rounded-xl border border-border bg-surface p-5 shadow-sm",
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul
          id="project-props-list"
          className="flex min-h-0 flex-col divide-y divide-divider overflow-hidden text-sm"
        >
          {Object.entries(properties)
            .filter(([key]) => !skippedFields.includes(key))
            .map(([key, value]) => (
              <li
                key={key}
                className="flex justify-between gap-4 py-2 first:pt-0 last:pb-0"
              >
                <span className="font-medium text-foreground-secondary">
                  {capitalize(key)}
                </span>
                <span className="font-medium text-foreground">{value}</span>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default memo(ProjectPropsMenu);
