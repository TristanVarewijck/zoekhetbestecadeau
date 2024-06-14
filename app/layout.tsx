import "./globals.css";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

import type { Metadata } from "next";

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
      <Head>
        {/* tradetracker  - verification*/}
        <meta
          name="d8636510c24e825"
          content="52a6550d24090e50b2ddb19a87f344cf"
        />
      </Head>

      <body>
        <Analytics />
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
