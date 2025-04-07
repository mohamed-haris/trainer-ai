"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trainingSessions, agents, users } from "@/lib/mockData";
import { ConversationInterface } from "@/components/conversation/conversation-interface";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, BookOpen, User, MessageCircle, Clock, Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TrainingSessionPage({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<any | null>(null);
  const [agent, setAgent] = useState<any | null>(null);
  const [trainee, setTrainee] = useState<any | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const trainingSession = trainingSessions.find(s => s.id === params.id);
      
      if (!trainingSession) {
        setError("Training session not found");
        setIsLoading(false);
        return;
      }
      
      setSession(trainingSession);
      
      const sessionAgent = agents.find(a => a.id === trainingSession.agentId);
      
      if (!sessionAgent) {
        setError("Agent not found for this session");
        setIsLoading(false);
        return;
      }
      
      setAgent(sessionAgent);
      
      const sessionTrainee = users.find(u => u.id === trainingSession.userId);
      
      if (!sessionTrainee) {
        setError("User not found for this session");
        setIsLoading(false);
        return;
      }
      
      setTrainee(sessionTrainee);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params.id]);
  
  const handleStartSession = () => {
    setIsSessionActive(true);
  };
  
  const handleEndSession = () => {
    setIsSessionActive(false);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading training session...</p>
        </div>
      </div>
    );
  }
  
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
  
  if (!session || !agent || !trainee) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      {!isSessionActive ? (
        <>
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/dashboard/training">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Training
            </Link>
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{session.title}</h1>
              <p className="text-muted-foreground">
                Training session details and progress
              </p>
            </div>
            {session.status !== "completed" && (
              <Button onClick={handleStartSession}>
                <BookOpen className="mr-2 h-4 w-4" />
                {session.progress > 0 ? "Continue Training" : "Start Training"}
              </Button>
            )}
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Session Overview</CardTitle>
                      <CardDescription>
                        Details about this training session
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Team Member</p>
                            <p className="text-sm text-muted-foreground">{trainee.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Agent</p>
                            <p className="text-sm text-muted-foreground">{agent.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Start Date</p>
                            <p className="text-sm text-muted-foreground">
                              {session.startDate 
                                ? new Date(session.startDate).toLocaleDateString() 
                                : "Not started yet"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Time Spent</p>
                            <p className="text-sm text-muted-foreground">{session.timeSpent} minutes</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Progress</span>
                          <span>{session.progress}%</span>
                        </div>
                        <Progress value={session.progress} className="h-2" />
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <p className="text-sm font-medium mb-1">Session Status</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              session.status === "completed"
                                ? "bg-green-50 text-green-700 hover:bg-green-50"
                                : session.status === "in_progress"
                                ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                                : "bg-amber-50 text-amber-700 hover:bg-amber-50"
                            }
                          >
                            {session.status === "in_progress"
                              ? "In Progress"
                              : session.status === "completed"
                              ? "Completed"
                              : "Not Started"}
                          </Badge>
                          {session.recommendation && (
                            <p className="text-sm text-muted-foreground ml-2">{session.recommendation}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Agent Description</CardTitle>
                      <CardDescription>
                        About this training agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{agent.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="progress" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Training Progress</CardTitle>
                      <CardDescription>
                        Detailed progress tracking
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall Completion</span>
                            <span>{session.progress}%</span>
                          </div>
                          <Progress value={session.progress} className="h-2" />
                        </div>
                        
                        {/* Mock module progress */}
                        <div className="space-y-4">
                          <div className="text-sm font-medium">Module Progress</div>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Introduction & Basics</span>
                                <span>100%</span>
                              </div>
                              <Progress value={100} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Core Concepts</span>
                                <span>75%</span>
                              </div>
                              <Progress value={75} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Practical Applications</span>
                                <span>25%</span>
                              </div>
                              <Progress value={25} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Advanced Techniques</span>
                                <span>0%</span>
                              </div>
                              <Progress value={0} className="h-2" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-4">
                          <p className="text-sm font-medium mb-2">Next Steps</p>
                          <p className="text-sm text-muted-foreground">
                            Continue with the Core Concepts module to improve understanding of key principles.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Trainee Profile</CardTitle>
                  <CardDescription>
                    Information about the team member
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={trainee.avatar} alt={trainee.name} />
                      <AvatarFallback>
                        {trainee.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{trainee.name}</p>
                      <p className="text-sm text-muted-foreground">{trainee.position}</p>
                      <p className="text-sm text-muted-foreground">{trainee.department}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Training Sessions</span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Evaluations</span>
                      <span>2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Evaluation Score</span>
                      <span>74%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4">
                <Button className="w-full" onClick={handleStartSession}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  {session.progress > 0 ? "Continue Training" : "Start Training"}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ConversationInterface
          agent={agent}
          mode="training"
          onSessionEnd={handleEndSession}
        />
      )}
    </div>
  );
}