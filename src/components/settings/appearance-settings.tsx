"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState("medium");
  const [density, setDensity] = useState("comfortable");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSave = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Appearance settings updated",
        description: "Your appearance preferences have been saved.",
      });
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of the application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Theme</Label>
          <RadioGroup
            defaultValue={theme}
            onValueChange={setTheme}
            className="grid grid-cols-3 gap-4"
          >
            <Label
              htmlFor="theme-light"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              data-state={theme === "light" ? "checked" : "unchecked"}
            >
              <RadioGroupItem value="light" id="theme-light" className="sr-only" />
              <Sun className="mb-3 h-6 w-6" />
              Light
            </Label>
            <Label
              htmlFor="theme-dark"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              data-state={theme === "dark" ? "checked" : "unchecked"}
            >
              <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
              <Moon className="mb-3 h-6 w-6" />
              Dark
            </Label>
            <Label
              htmlFor="theme-system"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              data-state={theme === "system" ? "checked" : "unchecked"}
            >
              <RadioGroupItem value="system" id="theme-system" className="sr-only" />
              <Monitor className="mb-3 h-6 w-6" />
              System
            </Label>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="font-size">Font Size</Label>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger id="font-size">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="density">Interface Density</Label>
          <Select value={density} onValueChange={setDensity}>
            <SelectTrigger id="density">
              <SelectValue placeholder="Select interface density" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="comfortable">Comfortable</SelectItem>
              <SelectItem value="spacious">Spacious</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
