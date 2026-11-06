import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://globalgeokit.tashanto.com"),
  title: {
    default: "global-geo-kit | Global Location Data Toolkit",
    template: "%s | global-geo-kit",
  },
  description:
    "One TypeScript toolkit for countries, states, cities, currencies, phone codes, postal codes, timezones, GeoJSON and global search.",
  keywords: [
    "global location data",
    "country state city npm",
    "world countries npm",
    "currency formatter javascript",
    "phone country codes",
    "postal code lookup",
    "timezone conversion typescript",
    "geojson cities",
    "global-geo-kit",
  ],
  alternates: { canonical: "https://globalgeokit.tashanto.com" },
  openGraph: {
    type: "website",
    url: "https://globalgeokit.tashanto.com",
    title: "global-geo-kit | Global Location Data Toolkit",
    description:
      "Countries, administrative regions, cities, currencies, phone codes, postal codes, timezones and GeoJSON from one package.",
    siteName: "global-geo-kit",
  },
  twitter: {
    card: "summary",
    title: "global-geo-kit | Global Location Data Toolkit",
    description:
      "One typed package for the world's location data and utilities.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
