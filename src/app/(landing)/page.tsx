import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingHero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { IndustryTemplates } from "@/components/landing/industry-templates";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";

export default function LandingPage() {
  return (
    <div>
      <LandingHero />
      <Features />
      <IndustryTemplates />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
}