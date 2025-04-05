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
import { pricingPlans } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Download, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BillingSettings() {
  const currentPlan = pricingPlans[1]; // Growth plan
  const usageData = {
    ai_minutes: {
      used: 45,
      total: 75,
      percentage: (45 / 75) * 100,
    },
    users: {
      used: 12,
      total: 50,
      percentage: (12 / 50) * 100,
    },
  };

  const invoices = [
    { id: "INV-001", date: "2025-04-01", amount: 599, status: "paid" },
    { id: "INV-002", date: "2025-03-01", amount: 599, status: "paid" },
    { id: "INV-003", date: "2025-02-01", amount: 599, status: "paid" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing information.
              </CardDescription>
            </div>
            <Badge>
              {currentPlan.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium">Subscription details</div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <div className="text-muted-foreground">Plan</div>
                <div>{currentPlan.name}</div>
                <div className="text-muted-foreground">Billing Period</div>
                <div>Monthly</div>
                <div className="text-muted-foreground">Next Invoice</div>
                <div>May 1, 2025</div>
                <div className="text-muted-foreground">Amount</div>
                <div>${currentPlan.price}/month</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Payment method</div>
              <div className="flex items-center gap-2 rounded-md border p-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Visa ending in 4242</div>
                  <div className="text-xs text-muted-foreground">Expires 12/26</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Update</Button>
                <Button variant="ghost" size="sm">Add new</Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Usage</div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Conversation Minutes</span>
                  <span>{usageData.ai_minutes.used} / {usageData.ai_minutes.total}</span>
                </div>
                <Progress value={usageData.ai_minutes.percentage} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Team Members</span>
                  <span>{usageData.users.used} / {usageData.users.total}</span>
                </div>
                <Progress value={usageData.users.percentage} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between border-t px-6 py-4">
          <Button variant="outline">Cancel Subscription</Button>
          <Button>Manage Subscription</Button>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View and download your past invoices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 border-b px-4 py-3 font-medium">
                  <div>Invoice</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div className="text-right">Actions</div>
                </div>
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-4 px-4 py-3 items-center">
                    <div>{invoice.id}</div>
                    <div>{new Date(invoice.date).toLocaleDateString()}</div>
                    <div>${invoice.amount.toFixed(2)}</div>
                    <div className="text-right">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans" className="mt-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`${plan.isPopular ? 'border-primary' : ''}`}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.price === null ? "Custom pricing" : `$${plan.price}/month`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex">
                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.id === currentPlan.id ? "outline" : "default"}
                  >
                    {plan.id === currentPlan.id ? "Current Plan" : "Switch Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}