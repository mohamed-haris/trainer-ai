"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      training_complete: true,
      evaluation_complete: true,
      new_team_member: true,
      system_updates: false,
      credit_alerts: true,
      weekly_digest: true,
    },
    inApp: {
      training_complete: true,
      evaluation_complete: true,
      new_team_member: true,
      system_updates: true,
      credit_alerts: true,
      team_progress: true,
    },
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleToggleEmail = (key: string) => {
    setNotifications({
      ...notifications,
      email: {
        ...notifications.email,
        [key]: !notifications.email[key as keyof typeof notifications.email],
      },
    });
  };

  const handleToggleInApp = (key: string) => {
    setNotifications({
      ...notifications,
      inApp: {
        ...notifications.inApp,
        [key]: !notifications.inApp[key as keyof typeof notifications.inApp],
      },
    });
  };

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      });
      setIsLoading(false);
    }, 1500);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure how and when you receive notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Email Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-training-complete">
                Training Completion
                <span className="block text-xs text-muted-foreground">
                  Get notified when a team member completes training.
                </span>
              </Label>
              <Switch
                id="email-training-complete"
                checked={notifications.email.training_complete}
                onCheckedChange={() => handleToggleEmail("training_complete")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-evaluation-complete">
                Evaluation Results
                <span className="block text-xs text-muted-foreground">
                  Get notified when evaluations are completed.
                </span>
              </Label>
              <Switch
                id="email-evaluation-complete"
                checked={notifications.email.evaluation_complete}
                onCheckedChange={() => handleToggleEmail("evaluation_complete")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-new-team-member">
                New Team Member
                <span className="block text-xs text-muted-foreground">
                  Get notified when someone joins your team.
                </span>
              </Label>
              <Switch
                id="email-new-team-member"
                checked={notifications.email.new_team_member}
                onCheckedChange={() => handleToggleEmail("new_team_member")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-system-updates">
                System Updates
                <span className="block text-xs text-muted-foreground">
                  Get notified about system updates and new features.
                </span>
              </Label>
              <Switch
                id="email-system-updates"
                checked={notifications.email.system_updates}
                onCheckedChange={() => handleToggleEmail("system_updates")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-credit-alerts">
                Credit Alerts
                <span className="block text-xs text-muted-foreground">
                  Get notified when credits are running low.
                </span>
              </Label>
              <Switch
                id="email-credit-alerts"
                checked={notifications.email.credit_alerts}
                onCheckedChange={() => handleToggleEmail("credit_alerts")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-weekly-digest">
                Weekly Digest
                <span className="block text-xs text-muted-foreground">
                  Receive a weekly summary of team activity.
                </span>
              </Label>
              <Switch
                id="email-weekly-digest"
                checked={notifications.email.weekly_digest}
                onCheckedChange={() => handleToggleEmail("weekly_digest")}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">In-App Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="app-training-complete">
                Training Completion
                <span className="block text-xs text-muted-foreground">
                  Get notified when a team member completes training.
                </span>
              </Label>
              <Switch
                id="app-training-complete"
                checked={notifications.inApp.training_complete}
                onCheckedChange={() => handleToggleInApp("training_complete")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-evaluation-complete">
                Evaluation Results
                <span className="block text-xs text-muted-foreground">
                  Get notified when evaluations are completed.
                </span>
              </Label>
              <Switch
                id="app-evaluation-complete"
                checked={notifications.inApp.evaluation_complete}
                onCheckedChange={() => handleToggleInApp("evaluation_complete")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-new-team-member">
                New Team Member
                <span className="block text-xs text-muted-foreground">
                  Get notified when someone joins your team.
                </span>
              </Label>
              <Switch
                id="app-new-team-member"
                checked={notifications.inApp.new_team_member}
                onCheckedChange={() => handleToggleInApp("new_team_member")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-system-updates">
                System Updates
                <span className="block text-xs text-muted-foreground">
                  Get notified about system updates and new features.
                </span>
              </Label>
              <Switch
                id="app-system-updates"
                checked={notifications.inApp.system_updates}
                onCheckedChange={() => handleToggleInApp("system_updates")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-credit-alerts">
                Credit Alerts
                <span className="block text-xs text-muted-foreground">
                  Get notified when credits are running low.
                </span>
              </Label>
              <Switch
                id="app-credit-alerts"
                checked={notifications.inApp.credit_alerts}
                onCheckedChange={() => handleToggleInApp("credit_alerts")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-team-progress">
                Team Progress Updates
                <span className="block text-xs text-muted-foreground">
                  Get notified about team progress and milestones.
                </span>
              </Label>
              <Switch
                id="app-team-progress"
                checked={notifications.inApp.team_progress}
                onCheckedChange={() => handleToggleInApp("team_progress")}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}