import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";

export const metadata: Metadata = {
  title: "zoekhetbestecadeau.nl",
  description: "Vind het perfecte cadeau!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
