"use client";

import { useState } from "react";
import { Check, CreditCard, Calendar, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { pricingPlans } from "@/lib/mockData";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("subscription");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  const currentPlan = {
    id: "plan_2",
    name: "Growth Team",
    price: 599,
    billingPeriod: "monthly",
    nextInvoice: "May 1, 2025",
    aiCreditsUsed: 45,
    aiCreditsTotal: 75,
    teamMembersUsed: 12,
    teamMembersTotal: 50
  };

  const invoices = [
    { id: "INV-001", date: "01/04/2025", amount: "$599.00" },
    { id: "INV-002", date: "01/03/2025", amount: "$599.00" },
    { id: "INV-003", date: "01/02/2025", amount: "$599.00" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information.
        </p>
      </div>

      <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="subscription">Current Plan</TabsTrigger>
          <TabsTrigger value="invoices">Billing History</TabsTrigger>
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing information.</CardDescription>
                </div>
                <Badge variant="outline">{currentPlan.name}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Plan</span>
                  <span>{currentPlan.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Billing Period</span>
                  <span>Monthly</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Next Invoice</span>
                  <span>{currentPlan.nextInvoice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Amount</span>
                  <span>${currentPlan.price}/month</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">AI Conversation Minutes</span>
                    <span>{currentPlan.aiCreditsUsed} / {currentPlan.aiCreditsTotal}</span>
                  </div>
                  <Progress value={(currentPlan.aiCreditsUsed / currentPlan.aiCreditsTotal) * 100} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Team Members</span>
                    <span>{currentPlan.teamMembersUsed} / {currentPlan.teamMembersTotal}</span>
                  </div>
                  <Progress value={(currentPlan.teamMembersUsed / currentPlan.teamMembersTotal) * 100} />
                </div>
              </div>

              <div className="flex items-center space-x-2 rounded-md border p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Visa ending in 4242
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expires 12/26
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Update</Button>
                  <Button variant="outline" size="sm">Add new</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" onClick={() => setShowCancelDialog(true)}>
                Cancel Subscription
              </Button>
              <Button>Manage Subscription</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                    <div>Invoice</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="grid grid-cols-4 gap-4 border-t p-4">
                      <div>{invoice.id}</div>
                      <div>{invoice.date}</div>
                      <div>{invoice.amount}</div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={currentPlan.id === plan.id ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-1">
                    {plan.price ? (
                      <>
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </>
                    ) : (
                      <span className="text-lg font-medium">Custom pricing</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {currentPlan.id === plan.id ? (
                    <Button className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline">
                      {plan.price ? "Switch Plan" : "Contact Sales"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription? Your service will continue until the end of your current billing period.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <div className="text-sm">
              You'll lose access to all your training data and configurations after your subscription ends.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Subscription
            </Button>
            <Button variant="destructive">
              Cancel Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}