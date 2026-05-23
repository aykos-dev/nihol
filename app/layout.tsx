import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppProviders from "@/components/AppProviders";
import "@/index.css";

export const metadata: Metadata = {
  title: "Nihol Restaurant",
  description: "Nihol restaurant menu and room service",
  icons: {
    icon: "/favicon-n.svg",
    shortcut: "/favicon-n.svg",
    apple: "/favicon-n.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
