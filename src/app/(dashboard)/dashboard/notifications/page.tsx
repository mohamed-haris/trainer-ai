import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { notifications } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  CheckSquare,
  Clock,
  ExternalLink,
  Filter,
  MailOpen,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage and view all your notifications.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MailOpen className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadNotifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadNotifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <TabsContent value="all" className="mt-6">
          <NotificationsList notifications={notifications} />
        </TabsContent>
        <TabsContent value="unread" className="mt-6">
          <NotificationsList notifications={unreadNotifications} />
        </TabsContent>
        <TabsContent value="read" className="mt-6">
          <NotificationsList notifications={readNotifications} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationsList({ notifications }: { notifications: any[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "evaluation_completed":
        return <CheckSquare className="h-8 w-8 text-green-500" />;
      case "training_milestone":
        return <Clock className="h-8 w-8 text-blue-500" />;
      case "integration_error":
        return <X className="h-8 w-8 text-red-500" />;
      case "new_team_member":
        return <Avatar className="h-8 w-8"><AvatarFallback>MB</AvatarFallback></Avatar>;
      case "credit_running_low":
        return <Bell className="h-8 w-8 text-amber-500" />;
      default:
        return <Bell className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Card>
      {notifications.length > 0 ? (
        <div className="divide-y">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 gap-4 ${
                notification.read ? "" : "bg-muted/30"
              }`}
            >
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className={`font-medium ${notification.read ? "" : "font-semibold"}`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <div className="pt-2 flex items-center gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={notification.actionUrl}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                  {!notification.read && (
                    <Button variant="ghost" size="sm">
                      <MailOpen className="mr-2 h-4 w-4" />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No notifications</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            You don't have any notifications at the moment. We'll notify you when there's activity related to your team.
          </p>
        </CardContent>
      )}
    </Card>
  );
}