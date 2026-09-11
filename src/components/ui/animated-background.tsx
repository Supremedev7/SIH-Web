"use client";

import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-background">
      {/* Sleek Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Subtle Glow at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[400px] bg-primary/10 blur-[100px] rounded-full opacity-60" />
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[40vw] max-w-2xl h-[200px] bg-blue-500/10 blur-[80px] rounded-full opacity-40 dark:opacity-20" />
    </div>
  );
}
