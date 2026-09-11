import { Metadata } from "next";
import { ReportsClient } from "./reports-client";

export const metadata: Metadata = {
  title: "Reports & Compliance",
  description: "Standardized compliance reports and data exports.",
};

export default function ReportsPage() {
  return <ReportsClient />;
}
