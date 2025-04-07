"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/mockData";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    }),
  bio: z.string().max(160).optional(),
  position: z.string().min(2).max(50),
  department: z.string().min(2).max(50),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const defaultValues: Partial<ProfileFormValues> = {
    name: currentUser.name,
    email: currentUser.email,
    bio: "",
    position: currentUser.position,
    department: currentUser.department,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your personal information and public profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage alt={currentUser.name} src={currentUser.avatar} />
                <AvatarFallback>
                  {currentUser.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{currentUser.name}</h3>
                <div className="flex gap-2">
                  <Button variant="outline">Change Avatar</Button>
                  <Button variant="ghost" className="text-destructive">
                    Remove Avatar
                  </Button>
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email address" {...field} />
                        </FormControl>
                        <FormDescription>
                          This email will be used for notifications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Your position" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your role in the organization.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="Your department" {...field} />
                        </FormControl>
                        <FormDescription>
                          The department you belong to.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Brief description for your profile. Max 160 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update profile"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
