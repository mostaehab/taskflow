"use client";
import { memo, useMemo, useState } from "react";
import {
  AtSign,
  MessageSquare,
  UserPlus,
  Eye,
  ArrowRightLeft,
  CheckCheck,
  Inbox as InboxIcon,
  type LucideIcon,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { memberName } from "@/utils/team";

type NotificationType =
  | "assigned"
  | "mention"
  | "comment"
  | "status"
  | "review";

type Notification = {
  id: string;
  type: NotificationType;
  actorId: string;
  action: string;
  taskId?: string;
  title: string;
  project: string;
  snippet?: string;
  time: string;
  group: "Today" | "Yesterday" | "Earlier";
  unread: boolean;
};

const typeConfig: Record<
  NotificationType,
  { icon: LucideIcon; badge: string; label: string }
> = {
  assigned: {
    icon: UserPlus,
    badge: "bg-primary-soft text-primary",
    label: "Assigned",
  },
  mention: {
    icon: AtSign,
    badge: "bg-info-soft text-info",
    label: "Mention",
  },
  comment: {
    icon: MessageSquare,
    badge: "bg-surface-hover text-foreground-secondary",
    label: "Comment",
  },
  status: {
    icon: ArrowRightLeft,
    badge: "bg-success-soft text-success",
    label: "Status",
  },
  review: {
    icon: Eye,
    badge: "bg-warning-soft text-warning",
    label: "Review",
  },
};

const initialNotifications: Notification[] = [
  {
    id: "n1",
    type: "assigned",
    actorId: "jane",
    action: "assigned you to",
    taskId: "TR-71",
    title: "Add rate limiting to the public API gateway",
    project: "Platform",
    time: "22m ago",
    group: "Today",
    unread: true,
  },
  {
    id: "n2",
    type: "mention",
    actorId: "priya",
    action: "mentioned you in a comment on",
    taskId: "DS-12",
    title: "Task card redesign",
    project: "Design System",
    snippet: "Can you sanity-check the spacing on the new card, @Mostafa?",
    time: "40m ago",
    group: "Today",
    unread: true,
  },
  {
    id: "n3",
    type: "comment",
    actorId: "marcus",
    action: "commented on",
    taskId: "TR-58",
    title: "Migrate session storage to Redis",
    project: "Platform",
    snippet: "Redis cluster is provisioned — ready to point staging at it.",
    time: "1h ago",
    group: "Today",
    unread: true,
  },
  {
    id: "n4",
    type: "status",
    actorId: "sara",
    action: "marked as Done",
    taskId: "TR-49",
    title: "Set up CI pipeline for preview deploys",
    project: "Platform",
    time: "3h ago",
    group: "Today",
    unread: false,
  },
  {
    id: "n5",
    type: "review",
    actorId: "sara",
    action: "requested your review on",
    taskId: "TR-62",
    title: "Refactor the project navigation breadcrumb",
    project: "Web App",
    time: "Yesterday, 4:15 PM",
    group: "Yesterday",
    unread: true,
  },
  {
    id: "n6",
    type: "comment",
    actorId: "leo",
    action: "commented on",
    taskId: "TR-66",
    title: "Remove DEV_AUTH_BYPASS from every non-local environment",
    project: "Platform",
    snippet: "This is blocking the security audit — bumping to high priority.",
    time: "Yesterday, 1:02 PM",
    group: "Yesterday",
    unread: false,
  },
  {
    id: "n7",
    type: "mention",
    actorId: "amelia",
    action: "mentioned you in",
    taskId: "DA-08",
    title: "Q3 metrics dashboard",
    project: "Analytics",
    snippet: "@Mostafa the funnel numbers are ready for the review deck.",
    time: "Yesterday, 11:20 AM",
    group: "Yesterday",
    unread: false,
  },
  {
    id: "n8",
    type: "status",
    actorId: "jane",
    action: "marked as Done",
    taskId: "TR-51",
    title: "Fix flaky calendar timezone test",
    project: "Web App",
    time: "Mar 6",
    group: "Earlier",
    unread: false,
  },
  {
    id: "n9",
    type: "assigned",
    actorId: "marcus",
    action: "assigned you to",
    taskId: "TR-73",
    title: "Document the onboarding flow for new engineers",
    project: "Platform",
    time: "Mar 5",
    group: "Earlier",
    unread: false,
  },
];

const filters: { key: "all" | NotificationType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "assigned", label: "Assigned" },
  { key: "mention", label: "Mentions" },
  { key: "comment", label: "Comments" },
  { key: "review", label: "Reviews" },
];

const groupOrder = ["Today", "Yesterday", "Earlier"] as const;

const Inbox = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]["key"]>("all");
  const [onlyUnread, setOnlyUnread] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const unreadByFilter = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    for (const n of notifications) {
      if (!n.unread) continue;
      counts.all += 1;
      counts[n.type] = (counts[n.type] ?? 0) + 1;
    }
    return counts;
  }, [notifications]);

  const visible = notifications.filter((n) => {
    if (activeFilter !== "all" && n.type !== activeFilter) return false;
    if (onlyUnread && !n.unread) return false;
    return true;
  });

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Inbox
            </h1>
            {unreadCount > 0 && (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-xs font-medium tabular-nums text-foreground-inverse">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground-secondary">
            Assignments, mentions and updates from your team.
          </p>
        </div>
        <Button
          variant="ghost"
          size="small"
          onClick={markAllRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck className="size-4" />
          Mark all as read
        </Button>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex flex-wrap items-center gap-1">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            const count = unreadByFilter[filter.key] ?? 0;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-foreground-secondary hover:bg-surface-hover hover:text-foreground",
                )}
              >
                {filter.label}
                {count > 0 && (
                  <span
                    className={cn(
                      "min-w-4 rounded-full px-1 text-center text-xs font-medium tabular-nums",
                      isActive
                        ? "bg-primary text-foreground-inverse"
                        : "bg-surface-muted text-foreground-secondary",
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setOnlyUnread((prev) => !prev)}
          aria-pressed={onlyUnread}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            onlyUnread
              ? "bg-primary-soft text-primary"
              : "text-foreground-secondary hover:bg-surface-hover hover:text-foreground",
          )}
        >
          <span
            className={cn(
              "size-2 rounded-full",
              onlyUnread ? "bg-primary" : "bg-foreground-disabled",
            )}
          />
          Unread only
        </button>
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary">
            <InboxIcon className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">
              You&apos;re all caught up
            </p>
            <p className="text-sm text-foreground-secondary">
              Nothing here right now. New activity from your team will show up in
              this view.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {groupOrder.map((group) => {
            const items = visible.filter((n) => n.group === group);
            if (items.length === 0) return null;
            return (
              <section key={group} className="flex flex-col gap-1.5">
                <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                  {group}
                </h2>
                <ul className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                  {items.map((item, index) => {
                    const { icon: Icon, badge } = typeConfig[item.type];
                    return (
                      <li
                        key={item.id}
                        className={cn(
                          index > 0 && "border-t border-divider",
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => markRead(item.id)}
                          className={cn(
                            "flex w-full gap-3 px-3 py-3.5 text-left transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50",
                            item.unread && "bg-primary-soft/40",
                          )}
                        >
                          <div className="relative shrink-0">
                            <Avatar name={memberName(item.actorId)} size="md" />
                            <span
                              className={cn(
                                "absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full ring-2 ring-surface",
                                badge,
                              )}
                            >
                              <Icon className="size-2.5" />
                            </span>
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <p className="text-sm leading-snug text-foreground-secondary">
                              <span className="font-semibold text-foreground">
                                {memberName(item.actorId)}
                              </span>{" "}
                              {item.action}{" "}
                              {item.taskId && (
                                <span className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[0.6875rem] font-medium text-foreground-secondary">
                                  {item.taskId}
                                </span>
                              )}{" "}
                              <span className="font-medium text-foreground">
                                {item.title}
                              </span>
                            </p>

                            {item.snippet && (
                              <p className="border-l-2 border-border pl-2.5 text-sm italic leading-snug text-foreground-secondary">
                                {item.snippet}
                              </p>
                            )}

                            <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                              <span>{item.project}</span>
                              <span aria-hidden>·</span>
                              <span>{item.time}</span>
                            </div>
                          </div>

                          {item.unread && (
                            <span
                              aria-label="Unread"
                              className="mt-1 size-2 shrink-0 rounded-full bg-primary"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(Inbox);
