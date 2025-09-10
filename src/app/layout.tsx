import type { Metadata } from "next";
import "./globals.css";
import { Lato } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Simple Landing",
  description: "Single-page site built with Next.js, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} overflow-x-hidden antialiased`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
