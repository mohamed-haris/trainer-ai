import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { evaluationSessions } from "@/lib/mockData";
import { format } from "date-fns";

export function UpcomingEvaluations() {
  const pendingEvaluations = evaluationSessions
    .filter((session) => session.status === "pending")
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {pendingEvaluations.map((evaluation) => (
        <div key={evaluation.id} className="flex flex-col space-y-2">
          <div className="font-medium">{evaluation.title}</div>
          <div className="text-sm text-muted-foreground">
            {evaluation.userName}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {evaluation.startDate 
              ? format(new Date(evaluation.startDate), "PPP") 
              : "Not scheduled"}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {evaluation.startDate 
              ? format(new Date(evaluation.startDate), "p") 
              : "Not scheduled"}
          </div>
          <Button size="sm" className="mt-2" asChild>
            <Link href={`/dashboard/evaluation/${evaluation.id}`}>
              Start Evaluation
            </Link>
          </Button>
        </div>
      ))}

      {pendingEvaluations.length === 0 && (
        <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
          No pending evaluations
        </div>
      )}

      {pendingEvaluations.length > 0 && (
        <Button size="sm" variant="outline" className="w-full mt-2" asChild>
          <Link href="/dashboard/evaluation">View all evaluations</Link>
        </Button>
      )}
    </div>
  );
}