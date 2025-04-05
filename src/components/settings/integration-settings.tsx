"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { integrations } from "@/lib/mockData";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check, X, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function IntegrationSettings() {
  const [activeIntegrations, setActiveIntegrations] = useState(
    integrations.filter(i => i.status === "connected").map(i => i.id)
  );
  const [syncing, setSyncing] = useState<string | null>(null);
  const { toast } = useToast();

  const handleToggleIntegration = (id: string) => {
    if (activeIntegrations.includes(id)) {
      setActiveIntegrations(activeIntegrations.filter(i => i !== id));
      
      toast({
        title: "Integration disconnected",
        description: "The integration has been disconnected successfully.",
      });
    } else {
      setActiveIntegrations([...activeIntegrations, id]);
      
      toast({
        title: "Integration connected",
        description: "The integration has been connected successfully.",
      });
    }
  };

  const handleSync = (id: string) => {
    setSyncing(id);
    
    // Simulate sync delay
    setTimeout(() => {
      setSyncing(null);
      
      toast({
        title: "Sync complete",
        description: "The integration has been synced successfully.",
      });
    }, 2000);
  };

  const renderIntegrationStatus = (status: string) => {
    if (status === "connected") {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Connected
        </Badge>
      );
    } else if (status === "error") {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700">
          Error
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline">
          Disconnected
        </Badge>
      );
    }
  };

  const integrationsByType = {
    hris: integrations.filter(i => i.type === "hris"),
    lms: integrations.filter(i => i.type === "lms"),
    crm: integrations.filter(i => i.type === "crm"),
    communication: integrations.filter(i => i.type === "communication"),
    knowledge_base: integrations.filter(i => i.type === "knowledge_base"),
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hris">HRIS</TabsTrigger>
          <TabsTrigger value="lms">LMS</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6 mt-6">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              isActive={activeIntegrations.includes(integration.id)}
              isSyncing={syncing === integration.id}
              onToggle={() => handleToggleIntegration(integration.id)}
              onSync={() => handleSync(integration.id)}
              renderStatus={renderIntegrationStatus}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="hris" className="space-y-6 mt-6">
          {integrationsByType.hris.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              isActive={activeIntegrations.includes(integration.id)}
              isSyncing={syncing === integration.id}
              onToggle={() => handleToggleIntegration(integration.id)}
              onSync={() => handleSync(integration.id)}
              renderStatus={renderIntegrationStatus}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="lms" className="space-y-6 mt-6">
          {integrationsByType.lms.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              isActive={activeIntegrations.includes(integration.id)}
              isSyncing={syncing === integration.id}
              onToggle={() => handleToggleIntegration(integration.id)}
              onSync={() => handleSync(integration.id)}
              renderStatus={renderIntegrationStatus}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="crm" className="space-y-6 mt-6">
          {integrationsByType.crm.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              isActive={activeIntegrations.includes(integration.id)}
              isSyncing={syncing === integration.id}
              onToggle={() => handleToggleIntegration(integration.id)}
              onSync={() => handleSync(integration.id)}
              renderStatus={renderIntegrationStatus}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="other" className="space-y-6 mt-6">
          {[...integrationsByType.communication, ...integrationsByType.knowledge_base].map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              isActive={activeIntegrations.includes(integration.id)}
              isSyncing={syncing === integration.id}
              onToggle={() => handleToggleIntegration(integration.id)}
              onSync={() => handleSync(integration.id)}
              renderStatus={renderIntegrationStatus}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IntegrationCard({ integration, isActive, isSyncing, onToggle, onSync, renderStatus }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>{integration.name}</CardTitle>
          <CardDescription>
            {integration.type === "hris" && "HR Information System"}
            {integration.type === "lms" && "Learning Management System"}
            {integration.type === "crm" && "Customer Relationship Management"}
            {integration.type === "communication" && "Communication Tool"}
            {integration.type === "knowledge_base" && "Knowledge Base"}
          </CardDescription>
        </div>
        {renderStatus(integration.status)}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor={`integration-${integration.id}`}>
              {isActive ? "Connected" : "Disconnected"}
            </Label>
            <Switch
              id={`integration-${integration.id}`}
              checked={isActive}
              onCheckedChange={onToggle}
            />
          </div>
          
          {isActive && (
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Last synced: </span>
                <span>{integration.lastSync ? new Date(integration.lastSync).toLocaleString() : "Never"}</span>
              </div>
              
              {integration.status === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Sync Error</AlertTitle>
                  <AlertDescription>
                    There was an error synchronizing with {integration.name}. Please check your credentials and try again.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </CardContent>
      {isActive && (
        <CardFooter className="border-t px-6 py-4">
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" onClick={onSync} disabled={isSyncing}>
              {isSyncing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </>
              )}
            </Button>
            <Button variant="ghost" className="text-sm">Configure</Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
