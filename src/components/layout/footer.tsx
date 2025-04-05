import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex h-14 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DigitalAgents.io. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link 
            href="/help" 
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Help
          </Link>
          <Link 
            href="/privacy" 
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
          <Link 
            href="/terms" 
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}