import { Metadata } from "next";
import { AgentCreateForm } from "@/components/agents/agent-create-form";

export const metadata: Metadata = {
  title: "Create Agent | DigitalAgents.io",
  description: "Create a new AI agent for training or evaluation",
};

export default function CreateAgentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Agent</h1>
        <p className="text-muted-foreground">
          Configure a new AI agent for training or evaluation.
        </p>
      </div>
      
      <AgentCreateForm />
    </div>
  );
}