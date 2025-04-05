"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/mockData";

export function TeamProgress() {
  // Only use the first 5 users
  const teamMembers = users.slice(0, 5);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Team Progress</CardTitle>
          <CardDescription>
            Training completion and evaluation scores by team member.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teamMembers.map((member, index) => {
              // Generate mock training completion (between 30% and 95%)
              const trainingCompletion = 30 + Math.floor(Math.random() * 65);
              
              // Generate mock evaluation score (between 60 and 95)
              const evaluationScore = 60 + Math.floor(Math.random() * 35);
              
              return (
                <div key={member.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {member.position}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {evaluationScore}% Score
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Training Progress</span>
                      <span>{trainingCompletion}%</span>
                    </div>
                    <Progress value={trainingCompletion} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>
            Average completion and evaluation scores by department.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {["Sales", "Customer Support", "Product Development"].map((dept, index) => {
              // Generate mock training completion (between 50% and 95%)
              const trainingCompletion = 50 + Math.floor(Math.random() * 45);
              
              // Generate mock evaluation score (between 70 and 95)
              const evaluationScore = 70 + Math.floor(Math.random() * 25);
              
              return (
                <div key={dept} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{dept}</div>
                    <div className="text-sm text-muted-foreground">
                      {evaluationScore}% Avg Score
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Training Completion</span>
                      <span>{trainingCompletion}%</span>
                    </div>
                    <Progress value={trainingCompletion} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}