import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppProviders from "@/components/AppProviders";
import "@/index.css";

export const metadata: Metadata = {
  title: "Nihol Elegance",
  description: "Nihol restaurant menu and room service",
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
