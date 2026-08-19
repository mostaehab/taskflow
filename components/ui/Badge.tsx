import { memo } from "react";
import { cn } from "@/utils/cn";
type BadgeVariants = "default" | "success" | "error" | "warning" | "info";

interface badgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariants;
}

const badgeVariantsMap: Record<BadgeVariants, string> = {
  default: "bg-gray-200 text-gray-800",
  success: "bg-green-200 text-green-800",
  error: "bg-red-200 text-red-800",
  warning: "bg-yellow-200 text-yellow-800",
  info: "bg-blue-200 text-blue-800",
};

const Badge = ({
  variant = "default",
  className,
  children,
  ...props
}: badgeProps) => {
  const variantClass = badgeVariantsMap[variant];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClass,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default memo(Badge);
