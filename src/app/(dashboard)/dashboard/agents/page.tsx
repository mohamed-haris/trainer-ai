import { Metadata } from "next";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentsList } from "@/components/agents/agents-list";
import { IndustryFilter } from "@/components/agents/industry-filter";

export const metadata: Metadata = {
  title: "Agents | DigitalAgents.io",
  description: "Manage your AI agents for training and evaluation",
};

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
          <p className="text-muted-foreground">
            Create and manage AI agents for training and evaluation.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/agents/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Agent
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <IndustryFilter />
      </div>
      
      <AgentsList />
    </div>
  );
}