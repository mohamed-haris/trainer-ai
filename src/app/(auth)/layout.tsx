import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col bg-primary p-10 text-white">
        <div className="flex items-center gap-2 mb-12">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <span className="text-sm font-bold text-primary">DA</span>
          </div>
          <span className="text-xl font-bold">DigitalAgents.io</span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-6 max-w-md">
            <h1 className="text-4xl font-bold mb-6">
              Transform your team with AI-powered training
            </h1>
            <p className="text-xl">
              DigitalAgents.io helps you evaluate, train, and develop your talent with
              personalized AI coaching tailored to your industry.
            </p>
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <div className="h-1 w-1 rounded-full bg-white"></div>
                <p>Industry-specific training templates</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-1 w-1 rounded-full bg-white"></div>
                <p>Realistic simulations for practice</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-1 w-1 rounded-full bg-white"></div>
                <p>Detailed performance analytics</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-1 w-1 rounded-full bg-white"></div>
                <p>Personalized improvement plans</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <p>© 2025 DigitalAgents.io. All rights reserved.</p>
        </div>
      </div>
      <div className="flex flex-col min-h-screen p-8">
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="md:hidden" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
