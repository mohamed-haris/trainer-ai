import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function LandingHero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Transform Your Team with<br />
          <span className="text-primary">AI-Powered Training</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Create customized AI agents that simulate real-world scenarios for personalized training, 
          evaluation, and coaching across any industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/register">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/demo">
              Request Demo
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-8 opacity-70">
          <div className="text-lg font-semibold">Trusted by innovative teams</div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 grayscale">
            <div className="h-8">Company Logo 1</div>
            <div className="h-8">Company Logo 2</div>
            <div className="h-8">Company Logo 3</div>
            <div className="h-8">Company Logo 4</div>
            <div className="h-8">Company Logo 5</div>
          </div>
        </div>
      </div>
    </section>
  );
}