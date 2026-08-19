import { memo } from "react";
import { cn } from "@/utils/cn";

type Status =
  | "NotStarted"
  | "InProgress"
  | "Completed"
  | "OnHold"
  | "Cancelled"
  | "Blocked"
  | "Backlog";

interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status;
}

const statusVariantsMap: Record<Status, string> = {
  NotStarted: "text-gray-200 text-gray-800",
  InProgress: "text-blue-200 text-blue-800",
  Completed: "text-green-200 text-green-800",
  OnHold: "text-yellow-200 text-yellow-800",
  Cancelled: "text-red-200 text-red-800",
  Blocked: "text-purple-200 text-purple-800",
  Backlog: "text-gray-400 text-gray-900",
};

const Status = ({ status, className, children, ...props }: StatusProps) => {
  const variantClass = statusVariantsMap[status];

  return (
    <div className={cn(variantClass, className)} {...props}>
      {children}
    </div>
  );
};

export default memo(Status);
