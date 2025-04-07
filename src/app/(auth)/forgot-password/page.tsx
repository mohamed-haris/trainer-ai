"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Reset link sent",
      description: "Check your email for password reset instructions",
    });
    
    setIsSubmitted(true);
    setIsLoading(false);
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      
      {!isSubmitted ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-muted/50">
            <p className="text-center">
              We've sent a password reset link to your email.
              Please check your inbox and follow the instructions to reset your password.
            </p>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </Button>
        </div>
      )}
      
      <div className="mt-6 text-center text-sm">
        Remember your password?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}