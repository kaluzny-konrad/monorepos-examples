import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TrpcProvider from "@repo/trpc/TrpcProvider.web";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "English Learning App",
  description: "Learn English with interactive lessons and vocabulary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TrpcProvider url={process.env.NEXT_PUBLIC_TRPC_URL || "http://localhost:3000/trpc"}>{children}</TrpcProvider>
      </body>
    </html>
  );
}
