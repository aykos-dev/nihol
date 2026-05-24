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
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: "/icon.svg",
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
