import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trainingSessions, evaluationSessions, users } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";

export function RecentActivities() {
  // Combine training and evaluation activities and sort by most recent
  const activities = [
    ...trainingSessions.map((session) => ({
      id: session.id,
      type: "training" as const,
      title: session.title,
      userName: session.userName,
      userId: session.userId,
      date: session.startDate || session.createdAt,
      progress: session.progress,
      status: session.status,
    })),
    ...evaluationSessions.map((session) => ({
      id: session.id,
      type: "evaluation" as const,
      title: session.title,
      userName: session.userName,
      userId: session.userId,
      date: session.completionDate || session.startDate || session.createdAt,
      score: session.score,
      status: session.status,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recentActivities = activities.slice(0, 5);

  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => {
        const user = users.find((u) => u.id === activity.userId);
        
        return (
          <div
            key={`${activity.type}-${activity.id}`}
            className="flex items-center gap-4"
          >
            <Avatar>
              <AvatarImage src={user?.avatar} alt={activity.userName} />
              <AvatarFallback>
                {activity.userName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.userName}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.type === "training" 
                  ? `Training progress: ${activity.progress}% on "${activity.title}"`
                  : `Completed evaluation: ${activity.score}% on "${activity.title}"`
                }
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
            </div>
          </div>
        );
      })}

      {recentActivities.length === 0 && (
        <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
          No recent activities
        </div>
      )}
    </div>
  );
}