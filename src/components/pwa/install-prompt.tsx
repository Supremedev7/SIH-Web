"use client";

import * as React from "react";
import { Download, X, Smartphone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = React.useState(false);
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = React.useState(false);

  React.useEffect(() => {
    // Check if already installed in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (isInstalled || isDismissed) return null;

  async function handleInstallClick() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSPrompt(true);
    }
  }

  // Only render if install prompt is available or iOS device
  if (!deferredPrompt && !isIOS) return null;

  return (
    <aside aria-label="Install SCI Application" className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100%-2rem)] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-3.5 rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 text-card-foreground">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <Smartphone className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-foreground truncate">Install SCI App</h4>
            <p className="text-[11px] text-muted-foreground truncate">
              Fast access, offline tools & instant alerts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            size="sm"
            onClick={handleInstallClick}
            className="h-8 text-xs font-bold px-3 rounded-xl bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Install
          </Button>
          <button
            onClick={() => setIsDismissed(true)}
            className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60"
            aria-label="Dismiss install prompt"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {showIOSPrompt && (
        <div className="mt-2 p-3 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg text-xs space-y-1 animate-in fade-in duration-200">
          <p className="font-semibold text-foreground">To install on iOS:</p>
          <p className="text-muted-foreground text-[11px]">
            Tap the <span className="font-bold text-foreground">Share</span> button in Safari, then tap <span className="font-bold text-foreground">"Add to Home Screen"</span>.
          </p>
        </div>
      )}
    </aside>
  );
}
