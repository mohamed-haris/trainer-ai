"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { evaluationSessions, agents, users } from "@/lib/mockData";
import { ConversationInterface } from "@/components/conversation/conversation-interface";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, FileText, User, MessageCircle, Clock, Calendar, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function EvaluationDetailPage({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<any | null>(null);
  const [agent, setAgent] = useState<any | null>(null);
  const [evaluee, setEvaluee] = useState<any | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const evaluationSession = evaluationSessions.find(s => s.id === params.id);
      
      if (!evaluationSession) {
        setError("Evaluation session not found");
        setIsLoading(false);
        return;
      }
      
      setSession(evaluationSession);
      
      const sessionAgent = agents.find(a => a.id === evaluationSession.agentId);
      
      if (!sessionAgent) {
        setError("Agent not found for this session");
        setIsLoading(false);
        return;
      }
      
      setAgent(sessionAgent);
      
      const sessionEvaluee = users.find(u => u.id === evaluationSession.userId);
      
      if (!sessionEvaluee) {
        setError("User not found for this session");
        setIsLoading(false);
        return;
      }
      
      setEvaluee(sessionEvaluee);
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
          <p className="mt-4 text-muted-foreground">Loading evaluation session...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard/evaluation")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Evaluations
        </Button>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (!session || !agent || !evaluee) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      {!isSessionActive ? (
        <>
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/dashboard/evaluation">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Evaluations
            </Link>
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{session.title}</h1>
              <p className="text-muted-foreground">
                {session.status === "completed" 
                  ? "View evaluation results and feedback" 
                  : "Manage and track this evaluation"}
              </p>
            </div>
            {session.status !== "completed" && (
              <Button onClick={handleStartSession}>
                <FileText className="mr-2 h-4 w-4" />
                {session.status === "in_progress" ? "Continue Evaluation" : "Start Evaluation"}
              </Button>
            )}
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue={session.status === "completed" ? "results" : "overview"}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  {session.status === "completed" && (
                    <TabsTrigger value="results">Results</TabsTrigger>
                  )}
                </TabsList>
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Evaluation Overview</CardTitle>
                      <CardDescription>
                        Details about this evaluation session
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Team Member</p>
                            <p className="text-sm text-muted-foreground">{evaluee.name}</p>
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
                            <p className="text-sm font-medium">
                              {session.status === "completed" ? "Completion Date" : "Start Date"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {session.completionDate 
                                ? new Date(session.completionDate).toLocaleDateString() 
                                : session.startDate
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
                      
                      <div className="rounded-md border p-4">
                        <p className="text-sm font-medium mb-1">Evaluation Status</p>
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
                              : "Pending"}
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
                        About this evaluation agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{agent.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {session.status === "completed" && (
                  <TabsContent value="results" className="space-y-6 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Evaluation Results</CardTitle>
                        <CardDescription>
                          Performance assessment and feedback
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold">Overall Score</div>
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
                            <span className="text-xl font-bold">{session.score}%</span>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-3">Strengths</h3>
                          <div className="space-y-2">
                            {session.strengths.map((strength: string, index: number) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <p className="text-sm">{strength}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-3">Areas for Improvement</h3>
                          <div className="space-y-2">
                            {session.weaknesses.map((weakness: string, index: number) => (
                              <div key={index} className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                                <p className="text-sm">{weakness}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-3">Skill Assessment</h3>
                          
                          {/* Mock skill assessments */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Product Knowledge</span>
                                <span>85%</span>
                              </div>
                              <Progress value={85} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Communication Skills</span>
                                <span>78%</span>
                              </div>
                              <Progress value={78} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Problem Solving</span>
                                <span>65%</span>
                              </div>
                              <Progress value={65} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Technical Proficiency</span>
                                <span>72%</span>
                              </div>
                              <Progress value={72} className="h-2" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-3">Recommendation</h3>
                          <div className="rounded-md bg-muted p-4">
                            <p className="text-sm">{session.recommendation || "No recommendation provided."}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Next Steps</CardTitle>
                        <CardDescription>
                          Recommended actions based on evaluation results
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                              1
                            </div>
                            <div>
                              <p className="font-medium">Targeted Training</p>
                              <p className="text-sm text-muted-foreground">
                                Schedule focused training sessions on problem-solving techniques.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Practice Sessions</p>
                              <p className="text-sm text-muted-foreground">
                                Engage in regular practice scenarios to reinforce communication skills.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                              3
                            </div>
                            <div>
                              <p className="font-medium">Follow-up Evaluation</p>
                              <p className="text-sm text-muted-foreground">
                                Schedule a follow-up evaluation in 30 days to measure improvement.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button asChild>
                            <Link href="/dashboard/training/create">
                              Create Training Plan
                            </Link>
                          </Button>
                          <Button variant="outline">
                            Download Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Team Member Profile</CardTitle>
                  <CardDescription>
                    Information about the evaluee
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={evaluee.avatar} alt={evaluee.name} />
                      <AvatarFallback>
                      {evaluee.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{evaluee.name}</p>
                      <p className="text-sm text-muted-foreground">{evaluee.position}</p>
                      <p className="text-sm text-muted-foreground">{evaluee.department}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Evaluations Completed</span>
                      <span>2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Score</span>
                      <span>74%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Training Sessions</span>
                      <span>3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {session.status !== "completed" && (
                <div className="mt-4">
                  <Button className="w-full" onClick={handleStartSession}>
                    <FileText className="mr-2 h-4 w-4" />
                    {session.status === "in_progress" ? "Continue Evaluation" : "Start Evaluation"}
                  </Button>
                </div>
              )}
              
              {session.status === "completed" && (
                <div className="mt-4 space-y-4">
                  <Button variant="outline" className="w-full">
                    Download Report
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/training/create">
                      Create Training Plan
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <ConversationInterface
          agent={agent}
          mode="evaluation"
          onSessionEnd={handleEndSession}
        />
      )}
    </div>
  );
}