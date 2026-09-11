import { Loader2 } from "lucide-react";

export default function AuthLoading() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 space-y-4">
      <div className="p-4 rounded-full bg-primary/5 text-primary">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
      <p className="text-sm text-muted-foreground font-medium animate-pulse">
        Securely loading...
      </p>
    </div>
  );
}
