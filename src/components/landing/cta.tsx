import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
          Ready to transform your team?
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Join hundreds of companies using DigitalAgents.io to train, evaluate, and develop their talent.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:text-primary hover:bg-primary-foreground" asChild>
            <Link href="/demo">
              Book a Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}