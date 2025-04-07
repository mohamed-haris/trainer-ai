import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileInfo } from "@/components/profile/profile-info";
import { ProfileActivity } from "@/components/profile/profile-activity";
import { ProfilePerformance } from "@/components/profile/profile-performance";
import { ProfileCertifications } from "@/components/profile/profile-certifications";

export const metadata: Metadata = {
  title: "Profile | DigitalAgents.io",
  description: "View and manage your profile",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your profile information and activities.
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 space-y-6">
          <ProfileInfo />
        </TabsContent>
        <TabsContent value="activity" className="mt-6 space-y-6">
          <ProfileActivity />
        </TabsContent>
        <TabsContent value="performance" className="mt-6 space-y-6">
          <ProfilePerformance />
        </TabsContent>
        <TabsContent value="certifications" className="mt-6 space-y-6">
          <ProfileCertifications />
        </TabsContent>
      </Tabs>
    </div>
  );
}