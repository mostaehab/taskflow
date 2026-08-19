"use client";
import { memo } from "react";
import {
  ChevronsUp,
  ChevronUp,
  ChevronDown,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";
import Avatar from "@/components/ui/Avatar";
import { useSortable } from "@dnd-kit/react/sortable";
type Urgency = "high" | "medium" | "low";

const urgencyMap: Record<
  Urgency,
  { label: string; icon: LucideIcon; className: string }
> = {
  high: {
    label: "High",
    icon: ChevronsUp,
    className: "bg-priority-high-soft text-priority-high",
  },
  medium: {
    label: "Medium",
    icon: ChevronUp,
    className: "bg-priority-medium-soft text-priority-medium",
  },
  low: {
    label: "Low",
    icon: ChevronDown,
    className: "bg-priority-low-soft text-priority-low",
  },
};

interface TaskCardProps {
  id?: string;
  title?: string;
  urgency?: Urgency;
  createdAt?: string;
  assignee?: string;
  comments?: number;
  index?: number;
  column?: string;
}

const TaskCard = ({
  id = "TR-66",
  title = "Remove DEV_AUTH_BYPASS from every non-local environment",
  urgency = "high",
  createdAt = "Mar 5",
  assignee = "Jane Doe",
  comments = 0,
  index = 0,
  column = "Backlog",
}: TaskCardProps) => {
  const { ref, isDragging } = useSortable({
    id,
    index,
    group: column,
    type: "task",
    accept: "task",
  });
  const { label, icon: UrgencyIcon, className } = urgencyMap[urgency];

  return (
    <div
      ref={ref}
      className={cn(
        "flex cursor-grab flex-col gap-2 rounded-lg border border-border bg-surface p-3 shadow-sm transition-shadow duration-150 hover:shadow-md",
        isDragging && "opacity-50",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-medium text-foreground-muted">
          {id}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
            className,
          )}
        >
          <UrgencyIcon className="size-3.5" />
          {label}
        </span>
      </div>
      <h2 className="text-sm font-medium text-foreground">{title}</h2>
      <div className="mt-0.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 text-xs text-foreground-muted">
          <span>{createdAt}</span>
          {comments > 0 && (
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="size-3.5" />
              {comments}
            </span>
          )}
        </div>
        <Avatar name={assignee} size="sm" />
      </div>
    </div>
  );
};

export default memo(TaskCard);
