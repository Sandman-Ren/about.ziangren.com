import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ziang Ren",
  description:
    "Personal website of Ziang Ren, featuring portfolio, projects, and professional background.",
  openGraph: {
    title: "Ziang Ren",
    description:
      "Personal website of Ziang Ren, featuring portfolio, projects, and professional background.",
    url: "https://about.ziangren.com",
    siteName: "Ziang Ren's Website",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
