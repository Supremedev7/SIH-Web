import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "SCI — Student Council of India",
    template: "%s | SCI Portal",
  },
  description:
    "A unified Academia–Industry Collaboration Portal for Skill Mapping, Internships & Placement. Empowering students, academicians, and industry partners.",
  applicationName: "SCI Portal",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SCI Portal",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "skill assessment",
    "internship portal",
    "placement",
    "academia industry collaboration",
    "career guidance",
    "student portal",
  ],
  authors: [{ name: "SCI — Student Council of India" }],
  openGraph: {
    title: "SCI — Student Council of India",
    description:
      "Bridging the gap between academia and industry. Discover your skills, land internships, and kickstart your career.",
    type: "website",
    locale: "en_IN",
    siteName: "SCI Portal",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
