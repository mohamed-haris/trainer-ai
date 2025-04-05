"use client";

import { QuickPrepView } from "@/components/conversation/quick-prep-view";

export default function QuickPrepPage() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quick Prep</h1>
          <p className="text-muted-foreground">
            Practice with AI agents for quick preparation.
          </p>
        </div>
        
        <QuickPrepView />
      </div>
    );
  }