import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TerpBunny — Premium Cannabis Wholesale",
  description: "Oklahoma's premium wholesale cannabis platform for licensed dispensaries. Hand-selected strains, craft-grown flower.",
  icons: { icon: "/images/terpbunny-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body style={{ background: "#0a0a0a", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
        <Header />
        <main style={{ minHeight: "100vh", paddingTop: "80px" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
