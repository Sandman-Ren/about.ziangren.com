import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { MainLayout } from "@/components/layout/main-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ziang Ren - Personal Website",
  description:
    "Personal website of Ziang Ren - Software Engineer, Blogger, and Tech Enthusiast",
  keywords: [
    "Ziang Ren",
    "Software Engineer",
    "Blog",
    "Technology",
    "Programming",
  ],
  authors: [{ name: "Ziang Ren" }],
  creator: "Ziang Ren",
  openGraph: {
    title: "Ziang Ren - Personal Website",
    description:
      "Personal website of Ziang Ren - Software Engineer, Blogger, and Tech Enthusiast",
    url: "https://about.ziangren.com",
    siteName: "Ziang Ren",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziang Ren - Personal Website",
    description:
      "Personal website of Ziang Ren - Software Engineer, Blogger, and Tech Enthusiast",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
