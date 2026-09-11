import { MegaNavbar } from "@/components/layout/mega-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <MegaNavbar />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  );
}
