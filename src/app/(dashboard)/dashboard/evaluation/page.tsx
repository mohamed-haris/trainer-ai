import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, FileText, Filter } from "lucide-react";
import { evaluationSessions, agents, users } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Evaluations | DigitalAgents.io",
  description: "Manage and track evaluations for your team",
};

export default function EvaluationPage() {
const pendingEvaluations = evaluationSessions.filter((evaluation) => evaluation.status === "pending");
const inProgressEvaluations = evaluationSessions.filter((evaluation) => evaluation.status === "in_progress");
const completedEvaluations = evaluationSessions.filter((evaluation) => evaluation.status === "completed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Evaluations</h1>
          <p className="text-muted-foreground">
            Create, manage, and track evaluations for your team members.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/evaluation/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Evaluation
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <EvaluationTable evaluations={evaluationSessions} />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <EvaluationTable evaluations={pendingEvaluations} />
        </TabsContent>
        <TabsContent value="in-progress" className="mt-6">
          <EvaluationTable evaluations={inProgressEvaluations} />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <EvaluationTable evaluations={completedEvaluations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EvaluationTable({ evaluations }: { evaluations: typeof evaluationSessions }) {
  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <div className="flex items-center justify-between">
          <CardTitle>Evaluations</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {evaluations.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Team Member</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evaluations.map(evaluation => {
                const user = users.find(u => u.id === evaluation.userId);
                const agent = agents.find(a => a.id === evaluation.agentId);
                
                return (
                  <TableRow key={evaluation.id}>
                    <TableCell className="font-medium">{evaluation.title}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{agent?.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          evaluation.status === "completed"
                            ? "bg-green-50 text-green-700 hover:bg-green-50"
                            : evaluation.status === "in_progress"
                            ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-50"
                        }
                      >
                        {evaluation.status === "in_progress"
                          ? "In Progress"
                          : evaluation.status === "completed"
                          ? "Completed"
                          : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {evaluation.status === "completed" && evaluation.completionDate
                        ? new Date(evaluation.completionDate).toLocaleDateString()
                        : evaluation.startDate
                        ? new Date(evaluation.startDate).toLocaleDateString()
                        : new Date(evaluation.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {evaluation.score ? `${evaluation.score}%` : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/evaluation/${evaluation.id}`}>
                          <FileText className="mr-2 h-4 w-4" />
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
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No evaluations found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get started by creating your first evaluation.
            </p>
            <Button asChild>
              <Link href="/dashboard/evaluation/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Evaluation
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
