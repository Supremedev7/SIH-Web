import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full p-8 bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 flex flex-col items-center text-center space-y-6">
        <div className="p-4 bg-muted/50 rounded-2xl">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Page Not Found
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            We couldn't find the page you were looking for. It might have been moved or deleted.
          </p>
        </div>
        <Button asChild variant="default" className="w-full gap-2 h-11 rounded-xl">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
