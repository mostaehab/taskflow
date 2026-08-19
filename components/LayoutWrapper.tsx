"use client";
import { memo } from "react";
import { usePathname } from "next/navigation";
import AsideMenu from "./shared/AsideMenu";
import { cn } from "@/utils/cn";
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideAsideMenu = ["/", "/login", "/register"].includes(pathname);
  return (
    <div className="flex w-full">
      {!hideAsideMenu && <AsideMenu />}
      <main className={cn("min-w-0 flex-1", !hideAsideMenu && "p-8")}>
        {children}
      </main>
    </div>
  );
};

export default memo(LayoutWrapper);
