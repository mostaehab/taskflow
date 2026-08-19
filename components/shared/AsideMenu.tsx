"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import Avatar, { AvatarGroup } from "@/components/ui/Avatar";
import { teamMembers, workspace, getMember } from "@/utils/team";
import {
  Home,
  Inbox,
  LayoutDashboard,
  SquareKanban,
  Calendar,
  Settings,
  LogOut,
  ChevronsUpDown,
  type LucideIcon,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: LucideIcon;
  route: string;
  badge?: number;
};

const menuItems: MenuItem[] = [
  {
    label: "Home",
    icon: Home,
    route: "/",
  },
  {
    label: "Inbox",
    icon: Inbox,
    route: "/inbox",
    badge: 4,
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/dashboard",
  },
  {
    label: "Projects",
    icon: SquareKanban,
    route: "/projects",
  },
  {
    label: "Calendar",
    icon: Calendar,
    route: "/calendar",
  },
  {
    label: "Settings",
    icon: Settings,
    route: "/settings",
  },
];

const currentUser = getMember("me");
const memberNames = teamMembers.map((member) => member.name);

const AsideMenu = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-sidebar sticky top-0 flex h-screen w-64 shrink-0 flex-col gap-6 p-4 text-sm text-foreground-inverse">
      <button
        type="button"
        className="bg-sidebar-surface flex items-center gap-3 rounded-md p-3 text-left transition-colors duration-150 hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <Image src="/logo.png" alt="TaskFlow logo" width={36} height={36} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold">{workspace.name}</p>
          <p className="truncate text-xs text-foreground-inverse/50">
            {workspace.plan}
          </p>
        </div>
        <ChevronsUpDown className="size-4 shrink-0 text-foreground-inverse/50" />
      </button>

      <nav>
        <ul className="flex flex-col gap-1">
          {menuItems.map(({ label, icon: Icon, route, badge }) => {
            const isActive =
              route === "/" ? pathname === "/" : pathname.startsWith(route);

            return (
              <li key={label}>
                <Link
                  href={route}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                    isActive
                      ? "bg-sidebar-active text-foreground-inverse"
                      : "hover:bg-sidebar-hover text-foreground-inverse/70 hover:text-foreground-inverse",
                  )}
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                  {badge !== undefined && (
                    <span className="bg-primary text-foreground-inverse ml-auto min-w-5 rounded-full px-1.5 py-0.5 text-center text-xs font-medium tabular-nums">
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-4 border-t border-foreground-inverse/10 pt-4">
        <div className="flex items-center justify-between gap-2">
          <AvatarGroup
            names={memberNames}
            size="sm"
            max={5}
            ringClass="ring-sidebar"
          />
          <span className="text-xs font-medium text-foreground-inverse/50">
            {teamMembers.length} members
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Avatar name={currentUser.name} size="lg" status="online" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-foreground-inverse/50">
              {currentUser.role}
            </p>
          </div>
          <button
            type="button"
            aria-label="Log out"
            className="hover:bg-sidebar-hover cursor-pointer rounded-md p-2 text-foreground-inverse/60 transition-colors duration-150 hover:text-foreground-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default memo(AsideMenu);
