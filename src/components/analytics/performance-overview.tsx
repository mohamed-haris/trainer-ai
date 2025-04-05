"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// Mock data for the chart
const performanceData = [
  { month: "Jan", evaluation: 65, training: 55, proficiency: 60 },
  { month: "Feb", evaluation: 68, training: 59, proficiency: 62 },
  { month: "Mar", evaluation: 70, training: 63, proficiency: 65 },
  { month: "Apr", evaluation: 72, training: 67, proficiency: 68 },
  { month: "May", evaluation: 75, training: 72, proficiency: 71 },
  { month: "Jun", evaluation: 79, training: 75, proficiency: 74 },
  { month: "Jul", evaluation: 80, training: 78, proficiency: 76 },
];

export function PerformanceOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>
          Average scores across evaluation, training, and proficiency metrics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[50, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="evaluation"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Evaluation Scores"
              />
              <Line
                type="monotone"
                dataKey="training"
                stroke="#82ca9d"
                name="Training Completion"
              />
              <Line
                type="monotone"
                dataKey="proficiency"
                stroke="#ffc658"
                name="Proficiency Levels"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}