"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

// Mock data for evaluation results distribution
const resultDistribution = [
  { name: "Excellent (90-100%)", value: 20 },
  { name: "Good (75-89%)", value: 40 },
  { name: "Average (60-74%)", value: 30 },
  { name: "Needs Improvement (<60%)", value: 10 },
];

const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#ef4444"];

// Mock data for skill assessment
const skillData = [
  { subject: "Product Knowledge", A: 85, B: 70 },
  { subject: "Communication", A: 80, B: 65 },
  { subject: "Problem Solving", A: 70, B: 60 },
  { subject: "Technical Skills", A: 75, B: 55 },
  { subject: "Customer Service", A: 90, B: 70 },
  { subject: "Closing Ability", A: 65, B: 50 },
];

export function EvaluationResults() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Results Distribution</CardTitle>
            <CardDescription>
              Breakdown of evaluation scores across all team members.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resultDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {resultDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Skill Assessment Comparison</CardTitle>
            <CardDescription>
              Current period vs previous period skill assessment results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={100} data={skillData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Current Period"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Previous Period"
                    dataKey="B"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Assessment Insights</CardTitle>
          <CardDescription>
            Key takeaways from evaluation results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Strengths</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 mr-2" />
                  <span>Customer service skills consistently score highest across all teams</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 mr-2" />
                  <span>Product knowledge has improved by 15% since last quarter</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 mr-2" />
                  <span>60% of team members have shown improvement in communication skills</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Areas for Improvement</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2" />
                  <span>Technical skills remain the lowest scoring category overall</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2" />
                  <span>Closing ability scores show wide variation across team members</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2" />
                  <span>Problem-solving scores have decreased by 5% in new hires</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Recommended Actions</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2" />
                  <span>Schedule technical skills workshops for all team members</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2" />
                  <span>Pair lower-performing team members with mentors in closing techniques</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2" />
                  <span>Develop new problem-solving scenarios for the onboarding program</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}