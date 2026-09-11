"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Briefcase, 
  MessageSquare,
  Users,
  Plus
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: Home, href: "/dashboard/student/home" },
    { label: "Network", icon: Users, href: "/dashboard/student/network" },
    { label: "Jobs", icon: Briefcase, href: "/dashboard/student/jobs" },
    { label: "Messages", icon: MessageSquare, href: "/dashboard/student/messages" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-safe">
      <nav className="flex items-center justify-around h-14">
        {/* Home & Network */}
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 pt-1"
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-foreground text-foreground" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Center Action Button (Post/Add) */}
        <div className="flex-1 flex justify-center -mt-5 relative z-10">
          <button className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-4 border-card hover:bg-primary/90 transition-transform active:scale-95">
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Jobs & Messages */}
        {navItems.slice(2, 4).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 pt-1"
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-foreground text-foreground" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
