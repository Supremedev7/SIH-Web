"use client";

import { PARTNER_LOGOS } from "@/lib/constants/public-navigation";
import { Building2, GraduationCap } from "lucide-react";

interface PartnerMarqueeProps {
  headline?: string;
  speed?: "normal" | "slow";
  reverse?: boolean;
}

export function PartnerMarquee({
  headline = "APEX PLATFORM TRUSTED BY LEADING INDIAN INSTITUTES & GLOBAL CORPORATES",
  reverse = false,
}: PartnerMarqueeProps) {
  // Duplicate list to achieve seamless infinite loop
  const repeatedPartners = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <div className="w-full py-8 border-y border-border/40 bg-muted/20 overflow-hidden relative select-none">
      {headline && (
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            {headline}
          </p>
        </div>
      )}

      {/* Edge gradient masks for subtle fade-in / fade-out */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className={`flex items-center gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {repeatedPartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/40 bg-card/40 backdrop-blur hover:bg-card hover:border-border/80 hover:shadow-sm transition-all duration-300 cursor-default shrink-0"
          >
            <div className={`p-1.5 rounded-full transition-colors ${
              partner.type === "institute" ? "bg-muted text-muted-foreground group-hover:bg-amber-500/10 group-hover:text-amber-500" : "bg-muted text-muted-foreground group-hover:bg-blue-500/10 group-hover:text-blue-500"
            }`}>
              {partner.type === "institute" ? (
                <GraduationCap className="h-4 w-4" />
              ) : (
                <Building2 className="h-4 w-4" />
              )}
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground tracking-tight">
                {partner.name}
              </span>
              <span className="text-[11px] text-muted-foreground ml-2 font-mono">
                {partner.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
