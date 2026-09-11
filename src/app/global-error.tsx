"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 bg-card rounded-2xl border border-border shadow-lg flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-destructive/10 rounded-full text-destructive">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              A critical error occurred
            </h1>
            <p className="text-sm text-muted-foreground">
              Something went wrong. The application could not recover from this error.
            </p>
          </div>
          <Button onClick={() => reset()} className="w-full mt-4">
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
