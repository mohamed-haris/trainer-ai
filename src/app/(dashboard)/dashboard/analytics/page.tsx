"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DownloadCloud, ArrowUp, ArrowDown, Calendar } from "lucide-react";
import { PerformanceOverview } from "@/components/analytics/performance-overview";
import { TeamProgress } from "@/components/analytics/team-progress";
import { TrainingCompletion } from "@/components/analytics/training-completion";
import { EvaluationResults } from "@/components/analytics/evaluation-results";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("30days");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track performance metrics and training effectiveness.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Year to date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Average Training Score"
          value="79.5%"
          change="+5.2%"
          trend="up"
        />
        <MetricCard
          title="Training Completion Rate"
          value="68.3%"
          change="+12.1%"
          trend="up"
        />
        <MetricCard
          title="Avg. Time to Proficiency"
          value="14.3 days"
          change="-3.5 days"
          trend="up"
        />
        <MetricCard
          title="Active Training Sessions"
          value="12"
          change="-2"
          trend="down"
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team Progress</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 space-y-6">
          <PerformanceOverview />
        </TabsContent>
        <TabsContent value="team" className="mt-6 space-y-6">
          <TeamProgress />
        </TabsContent>
        <TabsContent value="training" className="mt-6 space-y-6">
          <TrainingCompletion />
        </TabsContent>
        <TabsContent value="evaluation" className="mt-6 space-y-6">
          <EvaluationResults />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({ title, value, change, trend }: { 
  title: string; 
  value: string; 
  change: string;
  trend: "up" | "down";
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-3xl font-bold">{value}</div>
          <div className={`flex items-center text-sm font-medium ${
            trend === "up" 
              ? "text-green-600" 
              : "text-red-600"
          }`}>
            {trend === "up" ? (
              <ArrowUp className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4" />
            )}
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}