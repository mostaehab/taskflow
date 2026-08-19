import { memo } from "react";
import { cn } from "@/utils/cn";

type AvatarSize = "xs" | "sm" | "md" | "lg";
type PresenceStatus = "online" | "away";

const sizeClasses: Record<AvatarSize, string> = {
  xs: "size-5 text-[0.625rem]",
  sm: "size-6 text-[0.6875rem]",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
};

const statusSizeClasses: Record<AvatarSize, string> = {
  xs: "size-1.5",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
};

/**
 * Muted, low-chroma tones so a team of avatars stays distinguishable without
 * breaking the calm, violet-anchored palette (PRODUCT.md: "one accent").
 */
const tones = [
  "bg-[oklch(0.92_0.05_288)] text-[oklch(0.42_0.13_288)]",
  "bg-[oklch(0.92_0.045_250)] text-[oklch(0.42_0.12_250)]",
  "bg-[oklch(0.92_0.05_185)] text-[oklch(0.40_0.09_190)]",
  "bg-[oklch(0.92_0.05_150)] text-[oklch(0.40_0.1_150)]",
  "bg-[oklch(0.93_0.055_75)] text-[oklch(0.44_0.1_65)]",
  "bg-[oklch(0.93_0.045_20)] text-[oklch(0.47_0.13_22)]",
];

export const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const toneForName = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return tones[hash % tones.length];
};

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  status?: PresenceStatus;
  ring?: boolean;
  className?: string;
}

const Avatar = ({
  name,
  size = "md",
  status,
  ring = false,
  className,
}: AvatarProps) => {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        role="img"
        aria-label={name}
        title={name}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold select-none",
          sizeClasses[size],
          toneForName(name),
          ring && "ring-2 ring-surface",
        )}
      >
        {getInitials(name)}
      </span>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-surface",
            statusSizeClasses[size],
            status === "online" ? "bg-success" : "bg-warning",
          )}
        />
      )}
    </span>
  );
};

interface AvatarGroupProps {
  names: string[];
  size?: AvatarSize;
  max?: number;
  ringClass?: string;
  className?: string;
}

export const AvatarGroup = ({
  names,
  size = "sm",
  max = 4,
  ringClass = "ring-surface",
  className,
}: AvatarGroupProps) => {
  const visible = names.slice(0, max);
  const overflow = names.length - visible.length;

  return (
    <div className={cn("flex items-center -space-x-1.5", className)}>
      {visible.map((name, index) => (
        <span
          key={`${name}-${index}`}
          className={cn("rounded-full ring-2", ringClass)}
        >
          <Avatar name={name} size={size} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-surface-muted font-semibold tabular-nums text-foreground-secondary ring-2",
            sizeClasses[size],
            ringClass,
          )}
          title={`${overflow} more`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
};

export default memo(Avatar);
