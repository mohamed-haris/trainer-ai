"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { agents } from "@/lib/mockData";
import { ConversationInterface } from "@/components/conversation/conversation-interface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";

export function QuickPrepView() {
  const searchParams = useSearchParams();
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  useEffect(() => {
    const agentId = searchParams.get("agentId");
    if (agentId) {
      setSelectedAgentId(agentId);
    }
  }, [searchParams]);
  
  const handleStartSession = () => {
    if (!selectedAgentId) return;
    
    setIsStarting(true);
    
    setTimeout(() => {
      setIsSessionActive(true);
      setIsStarting(false);
    }, 1500);
  };
  
  const selectedAgent = agents.find(agent => agent.id === selectedAgentId);
  
  return (
    <>
      {!isSessionActive ? (
        <Card>
          <CardHeader>
            <CardTitle>Start a Quick Prep Session</CardTitle>
            <CardDescription>
              Select an agent to have a conversation with. This won't be tracked in your training history.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="agent-select" className="text-sm font-medium">
                Select an Agent
              </label>
              <Select
                value={selectedAgentId || ""}
                onValueChange={setSelectedAgentId}
              >
                <SelectTrigger id="agent-select">
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedAgent && (
              <div className="rounded-lg border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <span className="font-medium">{selectedAgent.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedAgent.description}</p>
              </div>
            )}
            
            <Button
              onClick={handleStartSession}
              disabled={!selectedAgentId || isStarting}
              className="w-full"
            >
              {isStarting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting session...
                </>
              ) : (
                "Start Conversation"
              )}
            </Button>
          </CardContent>
        </Card>
      ) : selectedAgent ? (
        <ConversationInterface
          agent={selectedAgent}
          mode="quick-prep"
          onSessionEnd={() => setIsSessionActive(false)}
        />
      ) : null}
    </>
  );
}