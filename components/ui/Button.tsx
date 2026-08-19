import { cn } from "@/utils/cn";
type ButtonColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "ghost";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonColor;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonColor, string> = {
  primary:
    "bg-primary text-foreground-inverse hover:bg-primary-hover active:bg-primary-active focus-visible:ring-primary/50",
  secondary:
    "bg-secondary text-foreground-inverse hover:bg-secondary/90 active:bg-secondary focus-visible:ring-secondary/50",
  tertiary:
    "bg-tertiary text-foreground-inverse hover:bg-tertiary/90 active:bg-tertiary focus-visible:ring-tertiary/50",
  success:
    "bg-success text-foreground-inverse hover:bg-success/90 active:bg-success focus-visible:ring-success/50",
  warning:
    "bg-warning text-foreground hover:bg-warning/90 active:bg-warning focus-visible:ring-warning/60",
  danger:
    "bg-danger text-foreground-inverse hover:bg-danger/90 active:bg-danger focus-visible:ring-danger/50",
  ghost:
    "bg-transparent text-foreground-secondary shadow-none hover:bg-surface-hover hover:text-foreground focus-visible:ring-primary/40",
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "px-2.5 py-1.5 text-xs",
  medium: "px-4 py-2 text-sm",
  large: "px-6 py-3 text-base",
};

const Button = ({
  variant = "primary",
  size = "medium",
  isLoading = false,
  children,
  className,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      onClick={buttonProps.onClick}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent font-medium shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {isLoading ? (
        <svg
          className="size-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
