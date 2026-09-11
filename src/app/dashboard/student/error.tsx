"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Student Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground max-w-md mb-4 text-sm">
        We encountered an unexpected error while loading this page. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try again
        </Button>
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 p-4 bg-muted/50 rounded-lg text-left text-xs font-mono max-w-2xl w-full overflow-auto">
          <p className="font-bold text-rose-500 mb-2">{error.message}</p>
          <pre className="text-muted-foreground">{error.stack}</pre>
        </div>
      )}
    </div>
  );
}
