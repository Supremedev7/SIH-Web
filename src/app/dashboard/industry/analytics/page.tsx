import { Metadata } from "next";
import { AnalyticsClient } from "./analytics-client";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Talent pipeline analytics and market intelligence.",
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
