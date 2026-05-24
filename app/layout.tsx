import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppProviders from "@/components/AppProviders";
import "@/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.niholfamilyrestaurant.uz"),
  title: {
    default: "Nihol Restaurant",
    template: "%s | Nihol Restaurant",
  },
  description: "Nihol restaurant menu and room service",
  applicationName: "Nihol Restaurant",
  openGraph: {
    title: "Nihol Restaurant",
    description: "Nihol restaurant menu and room service",
    type: "website",
    siteName: "Nihol Restaurant",
    url: "https://www.niholfamilyrestaurant.uz",
  },
  twitter: {
    card: "summary",
    title: "Nihol Restaurant",
    description: "Nihol restaurant menu and room service",
  },
  icons: {
    icon: [{ url: "/icon-n.ico", type: "image/x-icon" }],
    shortcut: ["/icon-n.ico"],
    apple: "/icon-n.ico",
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
