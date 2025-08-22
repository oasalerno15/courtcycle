import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import ConditionalHeader from "@/components/ConditionalHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CourtCycle - Buy, Sell, Play",
  description: "The ultimate marketplace for buying, selling, and trading premium squash rackets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ConditionalHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
