import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
  

export function TeamInvites() {
    return (
      <div className="rounded-md border p-6 flex flex-col items-center justify-center text-center">
        <div className="text-4xl mb-4">✉️</div>
        <h3 className="text-lg font-medium mb-2">No Pending Invites</h3>
        <p className="text-muted-foreground mb-4">
          When you invite new team members, they'll appear here until they join.
        </p>
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Send Invitation
        </Button>
      </div>
    );
  }