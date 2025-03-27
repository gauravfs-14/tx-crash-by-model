import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Texas Road Safety - Crash Data Analysis | Interactive Story",
  description:
    "Explore comprehensive crash data visualization revealing patterns, trends, and insights to improve road safety across Texas.",
  openGraph: {
    title: "Texas Road Safety - Crash Data Analysis",
    description:
      "Explore comprehensive crash data visualization revealing patterns, trends, and insights to improve road safety across Texas.",
    images: [
      {
        url: "/og-image.png",
        width: 1697,
        height: 988,
        alt: "Texas Road Safety Data Visualization",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
