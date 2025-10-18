import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sell Your Gear - CourtCycle",
  description: "List your squash gear on CourtCycle marketplace",
};

export default function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 