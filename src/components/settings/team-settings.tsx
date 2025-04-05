import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Calendar, Clock } from "lucide-react";

export function TeamSettings() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Settings</CardTitle>
          <CardDescription>
            Manage team-wide settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Role Management</h3>
            <p className="text-sm text-muted-foreground">
              Configure which roles have access to which features. Update role permissions and create custom roles for your organization.
            </p>
            <Button variant="outline" className="mt-2">
              <Users className="mr-2 h-4 w-4" />
              Manage Roles
            </Button>
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <h3 className="text-lg font-medium">Default Templates</h3>
            <p className="text-sm text-muted-foreground">
              Configure the default templates and settings for new team members. This streamlines the onboarding process.
            </p>
            <Button variant="outline" className="mt-2">
              <Calendar className="mr-2 h-4 w-4" />
              Configure Templates
            </Button>
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <h3 className="text-lg font-medium">Session Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure session timeouts, recording settings, and other team-wide session preferences.
            </p>
            <Button variant="outline" className="mt-2">
              <Clock className="mr-2 h-4 w-4" />
              Session Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  