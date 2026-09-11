import Link from "next/link";
import { 
  Shield, 
  LifeBuoy, 
  FileText, 
  Globe, 
  Activity, 
  BookOpen, 
  ArrowUpRight,
  MessageSquare
} from "lucide-react";
import Image from "next/image";

interface DashboardFooterProps {
  portalName?: string;
}

export function DashboardFooter({ portalName = "Portal" }: DashboardFooterProps) {
  
  // Theme colors based on portal
  let themeConfig = {
    bgHover: "hover:bg-primary/10",
    textHover: "hover:text-primary",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
    borderGlow: "border-primary/20",
    gradientColor: "from-primary/5",
  };

  if (portalName === "Industry") {
    themeConfig = {
      bgHover: "hover:bg-teal-500/10",
      textHover: "hover:text-teal-500",
      badgeBg: "bg-teal-500/10",
      badgeText: "text-teal-500",
      borderGlow: "border-teal-500/20",
      gradientColor: "from-teal-500/5",
    };
  } else if (portalName === "Faculty") {
    themeConfig = {
      bgHover: "hover:bg-purple-500/10",
      textHover: "hover:text-purple-500",
      badgeBg: "bg-purple-500/10",
      badgeText: "text-purple-500",
      borderGlow: "border-purple-500/20",
      gradientColor: "from-purple-500/5",
    };
  } else if (portalName === "Institution") {
    themeConfig = {
      bgHover: "hover:bg-orange-500/10",
      textHover: "hover:text-orange-500",
      badgeBg: "bg-orange-500/10",
      badgeText: "text-orange-500",
      borderGlow: "border-orange-500/20",
      gradientColor: "from-orange-500/5",
    };
  }

  return (
    <footer className={`w-full mt-20 border-t border-border/50 bg-background relative z-10 overflow-hidden`}>
      {/* Background Gradient Effect */}
      <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50`}></div>
      <div className={`absolute -top-24 right-0 w-96 h-96 rounded-full bg-gradient-to-br ${themeConfig.gradientColor} to-transparent blur-3xl opacity-50 pointer-events-none`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 lg:gap-12 mb-12">
          
          {/* Brand & Status Column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-card border ${themeConfig.borderGlow} shadow-sm group-hover:scale-105 transition-transform overflow-hidden shrink-0`}>
                <Image src="/logo.png" alt="SCI Logo" fill className="object-contain p-1" sizes="40px" />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-lg tracking-tight text-foreground ${themeConfig.textHover} transition-colors`}>
                  SCI <span className="font-light text-muted-foreground ml-1">Portal</span>
                </span>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${themeConfig.badgeText}`}>
                  {portalName} Dashboard
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Empowering the academic and industrial ecosystem through intelligent collaboration and skill mapping.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 shadow-sm w-fit ${themeConfig.bgHover} transition-colors`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-foreground">All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-foreground">Resources</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/docs" className={`text-sm text-muted-foreground flex items-center gap-2 ${themeConfig.textHover} transition-colors group w-fit`}>
                  <BookOpen className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api-reference" className={`text-sm text-muted-foreground flex items-center gap-2 ${themeConfig.textHover} transition-colors group w-fit`}>
                  <Terminal className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/help" className={`text-sm text-muted-foreground flex items-center gap-2 ${themeConfig.textHover} transition-colors group w-fit`}>
                  <LifeBuoy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/feedback" className={`text-sm text-muted-foreground flex items-center gap-2 ${themeConfig.textHover} transition-colors group w-fit`}>
                  <MessageSquare className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-foreground">Legal & Privacy</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/privacy" className={`text-sm text-muted-foreground flex items-center gap-2 ${themeConfig.textHover} transition-colors group w-fit`}>
                  <Shield className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={`text-sm text-muted-foreground flex items-center gap-2 ${themeConfig.textHover} transition-colors group w-fit`}>
                  <FileText className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/compliance" className={`text-sm text-muted-foreground flex items-center gap-2 ${themeConfig.textHover} transition-colors group w-fit`}>
                  <Activity className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  Compliance & Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-foreground">Connect</h4>
            <div className="flex items-center gap-3 mb-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={`p-2 rounded-lg border border-border/60 bg-card text-muted-foreground ${themeConfig.bgHover} ${themeConfig.textHover} transition-all shadow-sm`}>
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`p-2 rounded-lg border border-border/60 bg-card text-muted-foreground ${themeConfig.bgHover} ${themeConfig.textHover} transition-all shadow-sm`}>
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className={`p-2 rounded-lg border border-border/60 bg-card text-muted-foreground ${themeConfig.bgHover} ${themeConfig.textHover} transition-all shadow-sm`}>
                <Globe className="w-4 h-4" />
              </a>
            </div>
            <a href="mailto:support@sci-portal.gov.in" className={`text-sm text-muted-foreground flex items-center gap-2 ${themeConfig.textHover} transition-colors group w-fit mt-1`}>
              <MessageSquare className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              support@sci.gov.in
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
             <Globe className="w-4 h-4 text-muted-foreground" />
             <span className="text-sm text-muted-foreground font-medium">
               &copy; {new Date().getFullYear()} Student Council of India. All rights reserved.
             </span>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
             <span className="flex items-center gap-1">Made with <span className="text-red-500">♥</span> in India</span>
             <span className="w-1 h-1 rounded-full bg-border"></span>
             <span>v2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Fix missing Terminal import
import { Terminal } from "lucide-react";
