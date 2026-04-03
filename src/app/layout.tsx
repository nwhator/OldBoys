import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });
const notoSerif = Noto_Serif({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Old Boys' Association",
    template: "%s | Old Boys' Association"
  },
  description: "Official website of the Holy Ghost College Owerri Old Boys' Association.",
  openGraph: {
    title: "Old Boys' Association",
    description: "News, events, community stories, and updates from the Holy Ghost College Owerri Old Boys' Association.",
    type: "website",
    images: ["/logo.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Old Boys' Association",
    description: "Official website of the Holy Ghost College Owerri Old Boys' Association.",
    images: ["/logo.jpg"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/logo.jpg", type: "image/jpeg" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${notoSerif.variable}`}>
      <body className="font-(--font-body) text-[15px] leading-relaxed">{children}</body>
    </html>
  );
}
