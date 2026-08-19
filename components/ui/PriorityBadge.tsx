import { memo } from "react";
import Badge from "@/components/ui/Badge";

type PriorityLevel = "low" | "medium" | "high";

interface PriorityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  priority: PriorityLevel;
}

const PriorityBadge = ({
  priority,
  className,
  children,
  ...props
}: PriorityBadgeProps) => {
  return (
    <Badge
      variant={
        priority === "low"
          ? "info"
          : priority === "medium"
            ? "warning"
            : "error"
      }
      className={className}
      {...props}
    >
      {children}
    </Badge>
  );
};

export default memo(PriorityBadge);
