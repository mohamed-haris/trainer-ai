import { Metadata } from "next";
import { notFound } from "next/navigation";
import { agents } from "@/lib/mockData";
import { AgentDetails } from "@/components/agents/agent-details";

export const metadata: Metadata = {
  title: "Agent Details | DigitalAgents.io",
  description: "View and manage agent details",
};

interface AgentPageProps {
  params: {
    id: string;
  };
}

export default function AgentPage({ params }: AgentPageProps) {
  const agent = agents.find((a) => a.id === params.id);
  
  if (!agent) {
    notFound();
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{agent.name}</h1>
        <p className="text-muted-foreground">
          {agent.description}
        </p>
      </div>
      
      <AgentDetails agent={agent} />
    </div>
  );
}