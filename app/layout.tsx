import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FieldLink - Field Hockey Community Network",
  description:
    "Connect with field hockey players, coaches, and clubs worldwide",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#18283E",
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen`}
      >
        <ThemeProvider>
           {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
