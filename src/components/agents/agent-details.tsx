"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Agent } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Trash2, Copy, Bot, User, MessageSquare, Clock } from "lucide-react";

interface AgentDetailsProps {
  agent: Agent;
}

export function AgentDetails({ agent }: AgentDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const handleDelete = () => {
    // In a real app, this would call an API to delete the agent
    toast({
      title: "Agent deleted",
      description: "The agent has been successfully deleted.",
    });
    router.push("/dashboard/agents");
  };
  
  const handleDuplicate = () => {
    toast({
      title: "Agent duplicated",
      description: "A copy of this agent has been created.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={
              agent.type === "training"
                ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                : agent.type === "evaluation"
                ? "bg-green-50 text-green-700 hover:bg-green-50"
                : "bg-purple-50 text-purple-700 hover:bg-purple-50"
            }
          >
            {agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}
          </Badge>
          <Badge variant="outline">
            {agent.industry}
          </Badge>
          {agent.isTemplate && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
              Template
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/agents/${agent.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete agent</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this agent? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Agent Configuration</CardTitle>
            <CardDescription>
              Full details and content for this agent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content">
              <TabsList className="mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                {agent.instructions && (
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                )}
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <div className="whitespace-pre-wrap rounded-md border bg-muted p-4">
                  {agent.content}
                </div>
              </TabsContent>
              
              {agent.instructions && (
                <TabsContent value="instructions">
                  <div className="whitespace-pre-wrap rounded-md border bg-muted p-4">
                    {agent.instructions}
                  </div>
                </TabsContent>
              )}
              
              <TabsContent value="usage">
                <div className="space-y-2">
                  <p>No usage data available yet.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created by</span>
                <span className="text-sm font-medium">Admin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created on</span>
                <span className="text-sm font-medium">
                  {new Date(agent.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last updated</span>
                <span className="text-sm font-medium">
                  {new Date(agent.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Industry</span>
                <span className="text-sm font-medium">{agent.industry}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href={`/dashboard/training/create?agentId=${agent.id}`}>
                  <Bot className="mr-2 h-4 w-4" />
                  Start Training Session
                </Link>
              </Button>
              {agent.type === "evaluation" && (
                <Button className="w-full justify-start" asChild>
                  <Link href={`/dashboard/evaluation/create?agentId=${agent.id}`}>
                    <User className="mr-2 h-4 w-4" />
                    Create Evaluation
                  </Link>
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/dashboard/quick-prep?agentId=${agent.id}`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Quick Conversation
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/dashboard/agents/${agent.id}/schedule`}>
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Sessions
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}