"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { agents, trainingSessions } from "@/lib/mockData";
import { ConversationInterface } from "@/components/conversation/conversation-interface";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

interface TrainingSessionPageProps {
  params: {
    id: string;
  };
}

export default function TrainingSessionPage({ params }: TrainingSessionPageProps) {
  const [session, setSession] = useState<any | null>(null);
  const [agent, setAgent] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEnding, setIsEnding] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Find the session
    const trainingSession = trainingSessions.find(s => s.id === params.id);
    
    if (!trainingSession) {
      setError("Training session not found");
      return;
    }
    
    setSession(trainingSession);
    
    // Find the agent
    const sessionAgent = agents.find(a => a.id === trainingSession.agentId);
    
    if (!sessionAgent) {
      setError("Agent not found for this session");
      return;
    }
    
    setAgent(sessionAgent);
  }, [params.id]);
  
  const handleEndSession = () => {
    setIsEnding(true);
    
    // Simulate API call to end the session
    setTimeout(() => {
      router.push("/dashboard/training");
    }, 1500);
  };
  
  if (error) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard/training")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Training
        </Button>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (!session || !agent) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading session...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.push("/dashboard/training")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Training
      </Button>
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{session.title}</h1>
        <p className="text-muted-foreground">
          Training session with {agent.name}
        </p>
      </div>
      
      <ConversationInterface
        agent={agent}
        mode="training"
        onSessionEnd={handleEndSession}
      />
    </div>
  );
}