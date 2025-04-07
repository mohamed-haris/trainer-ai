import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, BookOpen, Filter } from "lucide-react";
import { trainingSessions, agents, users } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = {
  title: "Training | DigitalAgents.io",
  description: "Manage and track training for your team",
};

export default function TrainingPage() {
  const activeTraining = trainingSessions.filter(session => session.status === "in_progress");
  const completedTraining = trainingSessions.filter(session => session.status === "completed");
  const notStartedTraining = trainingSessions.filter(session => session.status === "not_started");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Training</h1>
          <p className="text-muted-foreground">
            Create, manage, and track training sessions for your team members.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/training/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Training Session
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">In Progress</TabsTrigger>
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <TrainingTable sessions={trainingSessions} />
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <TrainingTable sessions={activeTraining} />
        </TabsContent>
        <TabsContent value="not-started" className="mt-6">
          <TrainingTable sessions={notStartedTraining} />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <TrainingTable sessions={completedTraining} />
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Training Modules</CardTitle>
          <CardDescription>
            Browse our library of training modules by industry and role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {agents.filter(a => a.type === "training").map(agent => (
              <Card key={agent.id} className="border shadow-sm">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{agent.name}</CardTitle>
                  <CardDescription>{agent.industry}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {agent.description}
                  </p>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/training/create?agentId=${agent.id}`}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Assign Training
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TrainingTable({ sessions }: { sessions: typeof trainingSessions }) {
  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <div className="flex items-center justify-between">
          <CardTitle>Training Sessions</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {sessions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Team Member</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map(session => {
                const user = users.find(u => u.id === session.userId);
                const agent = agents.find(a => a.id === session.agentId);
                
                return (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.title}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{agent?.name}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={session.progress} className="h-2 w-16" />
                        <span className="text-sm">{session.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {session.startDate
                        ? new Date(session.startDate).toLocaleDateString()
                        : new Date(session.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/training/${session.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No training sessions found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get started by creating a training session for your team.
            </p>
            <Button asChild>
              <Link href="/dashboard/training/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Training Session
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}