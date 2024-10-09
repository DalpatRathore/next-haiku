import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextHaiku - Explore the Beauty of Haiku",
  description:
    "A modern platform to discover, create, and share the timeless art of Haiku poetry.",
  keywords:
    "haiku, poetry, create haiku, share haiku, modern haiku platform, haiku collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-[100vh] h-full grid grid-rows-[auto_1fr_auto]">
            <Header></Header>
            <main className="w-full mx-auto max-w-screen-xl h-full">
              {children}
            </main>
            <Footer></Footer>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
