import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { performanceMetrics } from "@/lib/mockData";

export function PerformanceCards() {
  // Get first 3 metrics for display
  const metrics = performanceMetrics.slice(0, 3);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardContent className="p-4">
            <div className="text-sm font-medium">{metric.metricName}</div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">
                {typeof metric.value === "number" && metric.value % 1 === 0
                  ? metric.value
                  : metric.value.toFixed(1)}
              </div>
              {metric.changePercentage !== undefined && (
                <div
                  className={`flex items-center text-xs font-medium ${
                    metric.changePercentage >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {metric.changePercentage >= 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  )}
                  {Math.abs(metric.changePercentage).toFixed(1)}%
                </div>
              )}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              vs previous period
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}