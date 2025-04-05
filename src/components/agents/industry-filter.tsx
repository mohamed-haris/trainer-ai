"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function IndustryFilter() {
  const [open, setOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const clearFilters = () => {
    setSelectedIndustry(null);
    setSelectedType(null);
  };

  const industries = [
    "All Industries",
    "Hospitality",
    "HVAC & Construction",
    "Healthcare",
    "Sales",
    "Financial Services",
    "Retail",
    "Technology",
  ];

  const types = ["All Types", "Training", "Evaluation", "Simulation", "Onboarding"];

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9 border-dashed">
            <Filter className="mr-2 h-4 w-4" />
            Filter
            {(selectedIndustry || selectedType) && (
              <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal lg:hidden">
                {(selectedIndustry ? 1 : 0) + (selectedType ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4" align="start">
          <Tabs defaultValue="industry">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="industry" className="flex-1">Industry</TabsTrigger>
              <TabsTrigger value="type" className="flex-1">Type</TabsTrigger>
            </TabsList>
            <TabsContent value="industry" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industry-search">Search Industries</Label>
                <Input id="industry-search" placeholder="Search..." />
              </div>
              <div className="space-y-2">
                {industries.map((industry) => (
                  <Button
                    key={industry}
                    variant={selectedIndustry === industry ? "default" : "outline"}
                    onClick={() => setSelectedIndustry(
                      industry === "All Industries" ? null : industry
                    )}
                    className="w-full justify-start text-left"
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="type" className="space-y-4">
              <div className="space-y-2">
                {types.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    onClick={() => setSelectedType(
                      type === "All Types" ? null : type.toLowerCase()
                    )}
                    className="w-full justify-start text-left"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-auto p-0 text-xs text-muted-foreground"
            >
              Clear filters
              <X className="ml-1 h-3 w-3" />
            </Button>
            <Button onClick={() => setOpen(false)}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {selectedIndustry && (
        <Badge variant="outline" className="rounded-sm px-2 font-normal">
          Industry: {selectedIndustry}
          <Button
            variant="ghost"
            onClick={() => setSelectedIndustry(null)}
            className="ml-1 h-auto p-0"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove filter</span>
          </Button>
        </Badge>
      )}
      
      {selectedType && (
        <Badge variant="outline" className="rounded-sm px-2 font-normal">
          Type: {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
          <Button
            variant="ghost"
            onClick={() => setSelectedType(null)}
            className="ml-1 h-auto p-0"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove filter</span>
          </Button>
        </Badge>
      )}
    </div>
  );
}
