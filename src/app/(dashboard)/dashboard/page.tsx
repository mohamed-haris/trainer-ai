import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Zap,
  LineChart,
  ArrowRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  trainingSessions, 
  evaluationSessions, 
  performanceMetrics 
} from "@/lib/mockData";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { PerformanceCards } from "@/components/dashboard/performance-cards";
import { UpcomingEvaluations } from "@/components/dashboard/upcoming-evaluations";

export const metadata: Metadata = {
  title: "Dashboard | DigitalAgents.io",
  description: "Main dashboard for DigitalAgents.io platform",
};

export default function DashboardPage() {
  // Filter sessions for active training
  const activeTrainings = trainingSessions.filter(
    (session) => session.status === "in_progress"
  );

  // Get a pending evaluation (for demo)
  const pendingEvaluations = evaluationSessions.filter(
    (session) => session.status === "pending"
  );

  // Calculate performance metrics (improvement, etc.)
  const metrics = performanceMetrics.slice(0, 3);

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Active Training</CardTitle>
            </div>
            <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
              <Button variant="secondary" className="h-8 w-8 p-0" asChild>
                <Link href="/dashboard/training">
                  <span className="sr-only">View all</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTrainings.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeTrainings.length === 1 ? "Session" : "Sessions"} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
            </div>
            <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
              <Button variant="secondary" className="h-8 w-8 p-0" asChild>
                <Link href="/dashboard/evaluation">
                  <span className="sr-only">View all</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingEvaluations.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <Zap className="mr-2 h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Quick Prep</CardTitle>
            </div>
            <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
              <Button variant="secondary" className="h-8 w-8 p-0" asChild>
                <Link href="/dashboard/quick-prep">
                  <span className="sr-only">Start prep</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              Available credits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <LineChart className="mr-2 h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
            </div>
            <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
              <Button variant="secondary" className="h-8 w-8 p-0" asChild>
                <Link href="/dashboard/analytics">
                  <span className="sr-only">View analytics</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              From previous month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest training and evaluation activities across your team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Evaluations</CardTitle>
            <CardDescription>
              Scheduled evaluations for your team members.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardContent>
            <UpcomingEvaluations />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Key performance indicators and their changes over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceCards />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
            <CardDescription>
              Active training sessions and their completion status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTrainings.map((training) => (
              <div key={training.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">{training.agentName}</div>
                    <div className="text-xs text-muted-foreground">
                      {training.userName}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {training.progress}%
                  </div>
                </div>
                <Progress value={training.progress} className="h-1" />
              </div>
            ))}
            {activeTrainings.length === 0 && (
              <div className="flex h-[100px] items-center justify-center text-sm text-muted-foreground">
                No active training sessions
              </div>
            )}
            <Button size="sm" variant="outline" className="w-full" asChild>
              <Link href="/dashboard/training">View all training sessions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}