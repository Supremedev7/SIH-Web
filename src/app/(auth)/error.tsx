"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError({
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
    <div className="w-full space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mx-auto w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="h-8 w-8" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Authentication Error
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unable to process your request. Please try again.
        </p>
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <Button onClick={() => reset()} className="w-full h-11 rounded-xl font-semibold">
          Try again
        </Button>
        <Button variant="outline" asChild className="w-full h-11 rounded-xl">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
