import { industryTemplates } from "@/lib/mockData";
import { 
  Fan, 
  Stethoscope, 
  ShoppingBag,
  HardHat,
  Car,
  Activity,
  Plane,
  Briefcase,
  Code,
  DollarSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function IndustryTemplates() {
  const getIconForIndustry = (icon: string) => {
    switch (icon) {
      case "fan": return <Fan className="h-5 w-5" />;
      case "stethoscope": return <Stethoscope className="h-5 w-5" />;
      case "shopping-bag": return <ShoppingBag className="h-5 w-5" />;
      case "hard-hat": return <HardHat className="h-5 w-5" />;
      case "car": return <Car className="h-5 w-5" />;
      case "activity": return <Activity className="h-5 w-5" />;
      case "plane": return <Plane className="h-5 w-5" />;
      case "briefcase": return <Briefcase className="h-5 w-5" />;
      case "code": return <Code className="h-5 w-5" />;
      case "dollar-sign": return <DollarSign className="h-5 w-5" />;
      default: return <Briefcase className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Ready for Your Industry
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pre-configured templates for multiple industries, ready to use out of the box or customize to your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industryTemplates.map((industry) => (
            <div 
              key={industry.id} 
              className="bg-background rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary transition-colors cursor-pointer"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                {getIconForIndustry(industry.icon)}
              </div>
              <h3 className="font-medium mb-1">{industry.name}</h3>
              <Badge variant="outline" className="bg-background">
                {industry.agentCount} templates
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/templates">
              Explore All Industry Templates
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}