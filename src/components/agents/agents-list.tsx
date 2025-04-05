"use client";

import { useState } from "react";
import Link from "next/link";
import { agents } from "@/lib/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, MoreHorizontal, Bot, Copy, Edit, Trash2, Share } from "lucide-react";
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

export function AgentsList() {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Filter agents based on selected industry and type
  const filteredAgents = agents.filter((agent) => {
    if (selectedIndustry && agent.industry !== selectedIndustry) {
      return false;
    }
    if (selectedType && agent.type !== selectedType) {
      return false;
    }
    return true;
  });
  
  const handleDelete = (id: string) => {
    // In a real app, this would call an API to delete the agent
    toast({
      title: "Agent deleted",
      description: "The agent has been successfully deleted.",
    });
  };
  
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/agents/${agent.id}`}>
                        <Bot className="mr-2 h-4 w-4" />
                        <span>View details</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicate</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/agents/${agent.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      <span>Share</span>
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
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
                            onClick={() => handleDelete(agent.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {agent.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Industry: {agent.industry}</span>
              </div>
              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <span>Created: {new Date(agent.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/dashboard/agents/${agent.id}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
          <Bot className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No agents found</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Try adjusting your filters or create a new agent.
          </p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/agents/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Agent
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}