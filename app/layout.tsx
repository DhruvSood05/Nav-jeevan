//

"use client";

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

// Supabase imports
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";
import { useMemo } from "react";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const metadata: Metadata = {
  title: "Nav Jeevan - Emergency Relief Coordination Platform",
  description:
    "Emergency relief platform connecting victims, volunteers, and organizations with real-time coordination and instant response capabilities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // initialize supabase client once
  const supabase = useMemo(() => getSupabaseBrowser(), []);

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}
      >
        <SessionContextProvider supabaseClient={supabase}>
          <div className="min-h-screen">
            <Header /> {/* your existing navbar/header */}
            <main>{children}</main>
            <Toaster /> {/* notifications */}
          </div>
        </SessionContextProvider>
      </body>
    </html>
  );
}
