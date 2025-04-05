"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  LineChart, 
  Settings, 
  FileText,
  Zap,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const items: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Agents",
    href: "/dashboard/agents",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    title: "Training",
    href: "/dashboard/training",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Evaluation",
    href: "/dashboard/evaluation",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Quick Prep",
    href: "/dashboard/quick-prep",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-64 border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-primary-foreground">DA</span>
          </div>
          <span>DigitalAgents.io</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="grid gap-1">
          {items.map((item) => (
            <li key={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-secondary"
                )}
                asChild
              >
                <Link href={item.href}>
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <p className="mb-2 text-center text-xs text-muted-foreground">
          <span className="font-medium">10</span> AI credits remaining
        </p>
        <Button className="w-full" size="sm" asChild>
          <Link href="/dashboard/settings/billing">
            Upgrade Plan
          </Link>
        </Button>
      </div>
    </aside>
  );
}
