"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { agents, users } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2, Bot, User, Info } from "lucide-react";
import Link from "next/link";

const trainingAgents = agents.filter(agent => agent.type === "training");

const createTrainingSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  agentId: z.string().min(1, { message: "Please select an agent" }),
  userId: z.string().min(1, { message: "Please select a team member" }),
  description: z.string().optional(),
});

export default function CreateTrainingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof createTrainingSchema>>({
    resolver: zodResolver(createTrainingSchema),
    defaultValues: {
      title: "",
      agentId: searchParams.get("agentId") || "",
      userId: "",
      description: "",
    },
  });
  
  useEffect(() => {
    const agentId = form.getValues().agentId;
    if (agentId) {
      const agent = agents.find(a => a.id === agentId);
      if (agent) {
        setSelectedAgent(agent);
        form.setValue("title", agent.name);
      }
    }
  }, [form, searchParams]);
  
  const watchAgentId = form.watch("agentId");
  useEffect(() => {
    const agent = agents.find(a => a.id === watchAgentId);
    setSelectedAgent(agent || null);
    
    const currentTitle = form.getValues().title;
    const currentAgent = agents.find(a => a.name === currentTitle);
    
    if (!currentTitle || (currentAgent && currentAgent.id !== watchAgentId)) {
      form.setValue("title", agent?.name || "");
    }
  }, [watchAgentId, form]);
  
  function onSubmit(values: z.infer<typeof createTrainingSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Training session created",
        description: "The training session has been created successfully.",
      });
      
      router.push("/dashboard/training");
    }, 1500);
  }
  
  return (
    <div className="space-y-6">
      <Button variant="ghost" className="mb-4" asChild>
        <Link href="/dashboard/training">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Training
        </Link>
      </Button>
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Training Session</h1>
        <p className="text-muted-foreground">
          Assign a training module to a team member.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Training Session Details</CardTitle>
          <CardDescription>
            Configure the training session and assign it to a team member.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sales Training Module" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this training session.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="agentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Training Agent</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an agent" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {trainingAgents.map(agent => (
                            <SelectItem key={agent.id} value={agent.id}>
                              {agent.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The agent that will provide the training.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Member</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a team member" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.filter(user => user.role === "employee").map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The team member who will take this training.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {selectedAgent && (
                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{selectedAgent.name}</CardTitle>
                    </div>
                    <CardDescription>{selectedAgent.industry}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm">{selectedAgent.description}</p>
                  </CardContent>
                </Card>
              )}
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add additional context or instructions for this training session..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Additional information about the training for your records.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/training">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Training Session"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}