"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { evaluationSessions, currentUser } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";

export function ProfilePerformance() {
  const userEvaluations = evaluationSessions.filter(
    s => s.userId === currentUser.id && s.status === "completed"
  );
  
  // Calculate average score
  const averageScore = userEvaluations.length > 0
    ? userEvaluations.reduce((sum, evaluation) => sum + (evaluation.score || 0), 0)
    : 0;
    
  // Mock score progress data
  const scoreProgressData = [
    { name: "Jan", score: 65 },
    { name: "Feb", score: 68 },
    { name: "Mar", score: 72 },
    { name: "Apr", score: 75 },
    { name: "May", score: 79 },
    { name: "Jun", score: 83 },
  ];
  
  // Mock skill assessment data
  const skillData = [
    { name: "Product Knowledge", score: 85 },
    { name: "Communication", score: 78 },
    { name: "Problem Solving", score: 65 },
    { name: "Technical Skills", score: 72 },
    { name: "Teamwork", score: 90 },
    { name: "Leadership", score: 68 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Average Score</div>
            <div className="text-3xl font-bold">{averageScore.toFixed(1)}%</div>
            <div className="mt-2 text-xs text-muted-foreground">
              Based on {userEvaluations.length} evaluations
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Highest Score</div>
            <div className="text-3xl font-bold">
              {userEvaluations.length > 0
                ? Math.max(...userEvaluations.map(e => e.score || 0)).toFixed(1)
                : "0"}%
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Last evaluation
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Improvement</div>
            <div className="text-3xl font-bold">+18%</div>
            <div className="mt-2 text-xs text-muted-foreground">
              Since first evaluation
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Ranking</div>
            <div className="text-3xl font-bold">Top 20%</div>
            <div className="mt-2 text-xs text-muted-foreground">
              Within your department
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Score Progress</CardTitle>
            <CardDescription>
              Your evaluation scores over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={scoreProgressData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Evaluation Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Skill Assessment</CardTitle>
            <CardDescription>
              Breakdown of your skills based on evaluations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={skillData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#8884d8" name="Skill Level" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>
            Suggestions for improvement based on your evaluation results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Strengths</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                  <p className="text-sm">Strong product knowledge and understanding of industry trends</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                  <p className="text-sm">Excellent teamwork and collaboration skills</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                  <p className="text-sm">Good communication and presentation abilities</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Areas for Improvement</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                  <p className="text-sm">Enhance problem-solving skills through more complex scenarios</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                  <p className="text-sm">Develop advanced technical skills relevant to your role</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                  <p className="text-sm">Focus on leadership capabilities to prepare for future roles</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Recommended Training</h3>
              <div className="rounded-md border p-4">
                <p className="font-medium mb-2">Problem Solving Mastery</p>
                <p className="text-sm text-muted-foreground mb-4">
                  A comprehensive training module focused on advanced problem-solving techniques.
                </p>
                <Button variant="outline" size="sm">View Course</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}