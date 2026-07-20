// /app/layout.tsx

import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

//this is acually broadway, since i am too lazy to change the font var name everywhere i am using this
const fraunces = localFont({
  src: "../public/fonts/Broadway.ttf",
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "FR Shift 2030 | FindingRoots",
  description: "Curating Boardroom Conversations Ahead of Future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}