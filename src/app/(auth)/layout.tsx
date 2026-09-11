import Link from "next/link";
import { Suspense } from "react";
import { School, Loader2 } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 transition-colors hover:opacity-80">
            <School className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">SCI Portal</span>
          </Link>
        </div>
      </header>

      {/* Main Content Centered with Suspense */}
      <main className="flex flex-1 items-center justify-center p-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
