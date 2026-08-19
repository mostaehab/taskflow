"use client";
import { memo } from "react";
import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/react";

const TaskContainer = ({
  children,
  title = "Task Container",
  onOpen,
}: {
  children?: React.ReactNode;
  title: string;
  onOpen: (title: string) => void;
}) => {
  const { ref } = useDroppable({
    id: title,
    type: "column",
    accept: "task",
  });

  return (
    <div className="flex h-full w-[300px] shrink-0 flex-col rounded-xl border border-border bg-surface-muted p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between border-b border-divider pb-3 text-sm font-semibold tracking-tight text-foreground">
        <span>{title}</span>
        <Plus
          onClick={() => onOpen(title)}
          className="ml-2 size-6 shrink-0 cursor-pointer rounded-md p-1 text-foreground-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-foreground"
        />
      </div>
      <div ref={ref} className="h-full">
        {children}
      </div>
    </div>
  );
};

export default memo(TaskContainer);
