import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { TeamMembers } from "@/components/team/team-members";
import { TeamInvites } from "@/components/team/team-invites";
import { BulkImport } from "@/components/team/bulk-import";

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members and their roles.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invites">Pending Invites</TabsTrigger>
          <TabsTrigger value="import">Bulk Import</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="mt-6">
          <TeamMembers />
        </TabsContent>
        <TabsContent value="invites" className="mt-6">
          <TeamInvites />
        </TabsContent>
        <TabsContent value="import" className="mt-6">
          <BulkImport />
        </TabsContent>
      </Tabs>
    </div>
  );
}