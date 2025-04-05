import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pricingPlans } from "@/lib/mockData";
import Link from "next/link";

export function Pricing() {
  return (
    <section className="py-20 bg-muted/30" id="pricing">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your team. All plans include full access to our AI platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`${plan.isPopular ? 'border-primary shadow-md relative' : ''}`}
            >
              {plan.isPopular && (
                <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/3">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  {plan.billingPeriod === 'custom' ? 'Contact us for pricing' : ''}
                </CardDescription>
                {plan.price !== null && (
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                )}
                {plan.price === null && (
                  <div className="mt-4">
                    <span className="text-2xl font-bold">Custom Pricing</span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.isPopular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.price === null ? "/contact" : "/register"}>
                    {plan.price === null ? "Contact Sales" : "Get Started"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}