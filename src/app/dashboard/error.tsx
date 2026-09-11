"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[50vh]">
      <div className="max-w-md w-full p-8 bg-card rounded-2xl border border-destructive/20 shadow-sm flex flex-col items-center text-center space-y-6">
        <div className="p-4 bg-destructive/10 rounded-full text-destructive">
          <AlertCircle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Something went wrong!
          </h2>
          <p className="text-sm text-muted-foreground">
            An unexpected error occurred while loading this dashboard section.
          </p>
        </div>
        <Button onClick={() => reset()} variant="outline" className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
