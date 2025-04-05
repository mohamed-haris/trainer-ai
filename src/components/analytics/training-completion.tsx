"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for training completion by module
const moduleData = [
  { name: "Onboarding", completion: 92 },
  { name: "Product Knowledge", completion: 78 },
  { name: "Sales Techniques", completion: 65 },
  { name: "Customer Service", completion: 85 },
  { name: "Compliance", completion: 90 },
  { name: "Technical Skills", completion: 60 },
];

// Mock data for training time spent by category
const timeData = [
  { name: "Onboarding", hours: 12 },
  { name: "Product Knowledge", hours: 28 },
  { name: "Sales Techniques", hours: 35 },
  { name: "Customer Service", hours: 20 },
  { name: "Compliance", hours: 15 },
  { name: "Technical Skills", hours: 25 },
];

export function TrainingCompletion() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Training Analytics</CardTitle>
          <CardDescription>
            Training completion rates and time spent by category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="completion" className="space-y-4">
            <TabsList>
              <TabsTrigger value="completion">Completion Rates</TabsTrigger>
              <TabsTrigger value="time">Time Spent</TabsTrigger>
            </TabsList>
            <TabsContent value="completion">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={moduleData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Completion Rate"]} />
                    <Legend />
                    <Bar dataKey="completion" fill="#8884d8" name="Completion Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="time">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} hours`, "Time Spent"]} />
                    <Legend />
                    <Bar dataKey="hours" fill="#82ca9d" name="Time Spent (hours)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Learning Trends</CardTitle>
          <CardDescription>
            Insights into learning patterns and engagement trends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Average Training Sessions"
              value="3.2"
              subtitle="per week"
              change="+0.8"
              changeLabel="vs last month"
            />
            <MetricCard
              title="Completion Time"
              value="4.5"
              subtitle="hours per module"
              change="-0.7"
              changeLabel="vs last month"
            />
            <MetricCard
              title="Engagement Score"
              value="83"
              subtitle="out of 100"
              change="+5"
              changeLabel="vs last month"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for metrics
function MetricCard({ title, value, subtitle, change, changeLabel }: {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  changeLabel: string;
}) {
  const isPositive = change.startsWith("+");
  
  return (
    <div className="bg-muted/40 rounded-lg p-4">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <div className="mt-2 flex items-baseline">
        <div className="text-3xl font-bold">{value}</div>
        <div className="ml-1 text-sm text-muted-foreground">{subtitle}</div>
      </div>
      <div className={`mt-2 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change} {changeLabel}
      </div>
    </div>
  );
}