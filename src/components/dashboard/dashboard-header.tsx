import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here's an overview of your team's activity.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href="/dashboard/agents/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Agent
          </Link>
        </Button>
      </div>
    </div>
  );
}