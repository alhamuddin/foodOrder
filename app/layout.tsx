import type { Metadata } from "next";
import { Acme, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import MobileView from "@/components/MobileView";
import Footer from "@/components/Footer";

const acme = Acme({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={acme.className}>
        <div className="flex flex-col min-h-screen">
          <Header />

          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
