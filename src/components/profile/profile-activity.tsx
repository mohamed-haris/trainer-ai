"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { trainingSessions, evaluationSessions, currentUser, TrainingSession, EvaluationSession } from "@/lib/mockData";
import { format } from "date-fns";

type Activity =
  | (TrainingSession & { type: "training"; date: string })
  | (EvaluationSession & { type: "evaluation"; date: string });

export function ProfileActivity() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const userTrainingSessions = trainingSessions.filter(s => s.userId === currentUser.id);
  const userEvaluationSessions = evaluationSessions.filter(s => s.userId === currentUser.id);

  const activities: Activity[] = [
    ...userTrainingSessions.map(session => ({
      ...session,
      type: "training" as const,
      date: session.startDate || session.createdAt,
    })),
    ...userEvaluationSessions.map(session => ({
      ...session,
      type: "evaluation" as const,
      date: session.completionDate || session.startDate || session.createdAt,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>
              Your learning and evaluation activities
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div
                  key={`${activity.type}-${activity.id}`}
                  className="relative pl-8"
                >
                  {index < activities.length - 1 && (
                    <div className="absolute top-0 left-3 h-full w-px bg-muted-foreground/20" />
                  )}
                  <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                    {activity.type === "training" ? (
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{activity.title}</p>
                      <Badge
                        variant="outline"
                        className={
                          activity.status === "completed"
                            ? "bg-green-50 text-green-700"
                            : activity.status === "in_progress"
                            ? "bg-blue-50 text-blue-700"
                            : // training might have "not_started", evaluation might have "pending"
                              "bg-amber-50 text-amber-700"
                        }
                      >
                        {activity.status === "in_progress"
                          ? "In Progress"
                          : activity.status === "completed"
                          ? "Completed"
                          : // fallback for "not_started" or "pending"
                            "Not Started"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(activity.date), "PPP 'at' p")}
                    </p>
                    <p className="text-sm">
                      {activity.type === "training"
                        ? `Training session ${
                            activity.status === "completed"
                              ? "completed"
                              : `in progress (${activity.progress}% complete)`
                          }`
                        : `Evaluation ${
                            activity.status === "completed"
                              ? `completed with a score of ${activity.score}%`
                              : `${activity.status}`
                          }`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No activities found for this period.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Calendar</CardTitle>
          <CardDescription>
            Visualize your activities by date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">
              {format(currentMonth, "MMMM yyyy")}
            </h3>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-center py-20">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
            <h3 className="font-medium mb-1">Calendar View Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              This feature is currently in development.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
