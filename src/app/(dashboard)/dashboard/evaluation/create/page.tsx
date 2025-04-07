"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const evaluationAgents = agents.filter(agent => agent.type === "evaluation");

const createEvaluationSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  agentId: z.string().min(1, { message: "Please select an agent" }),
  userId: z.string().min(1, { message: "Please select a team member" }),
  description: z.string().optional(),
});

export default function CreateEvaluationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof createEvaluationSchema>>({
    resolver: zodResolver(createEvaluationSchema),
    defaultValues: {
      title: "",
      agentId: "",
      userId: "",
      description: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof createEvaluationSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Evaluation created",
        description: "The evaluation has been created successfully.",
      });
      
      router.push("/dashboard/evaluation");
    }, 1500);
  }
  
  return (
    <div className="space-y-6">
      <Button variant="ghost" className="mb-4" asChild>
        <Link href="/dashboard/evaluation">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Evaluations
        </Link>
      </Button>
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Evaluation</h1>
        <p className="text-muted-foreground">
          Set up a new evaluation for a team member.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Details</CardTitle>
          <CardDescription>
            Configure the evaluation settings and assign it to a team member.
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
                    <FormLabel>Evaluation Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sales Performance Review Q2" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this evaluation.
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
                      <FormLabel>Evaluation Agent</FormLabel>
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
                          {evaluationAgents.map(agent => (
                            <SelectItem key={agent.id} value={agent.id}>
                              {agent.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The agent that will conduct this evaluation.
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
                        The team member who will take this evaluation.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add additional context or instructions for this evaluation..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Additional information about the evaluation for your records.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/evaluation">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Evaluation"
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