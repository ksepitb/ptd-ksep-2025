import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "PTD KSEP 2025",
    template: "%s | PTD KSEP 2025",
  },
  description: "Platform Kajasep dan Dejasep KSEP ITB 2025",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Providers>
          <NextTopLoader color="#A3863D" />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
