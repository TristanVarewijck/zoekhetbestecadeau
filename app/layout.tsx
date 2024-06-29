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
        {/* TradeTracker meta tag */}
        <meta
          name="d8636510c24e825"
          content="52a6550d24090e50b2ddb19a87f344cf"
        />
      </Head>
      <body>
        <Analytics />
        {/* <Navbar /> */}
        {/* <div className="min-h-screen">{children}</div> */}
        <div>under construction</div>
        {/* <Footer /> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _TradeTrackerTagOptions = {
                t: 'a',
                s: '474149',
                chk: '5b15b5e41e5508c3e7dcd93a6e6f6d20',
                overrideOptions: {}
              };
              (function() {
                var tt = document.createElement('script'),
                    s = document.getElementsByTagName('script')[0];
                tt.setAttribute('type', 'text/javascript');
                tt.setAttribute('src', (document.location.protocol == 'https:' ? 'https' : 'http') + '://tm.tradetracker.net/tag?t=' + _TradeTrackerTagOptions.t + '&s=' + _TradeTrackerTagOptions.s + '&chk=' + _TradeTrackerTagOptions.chk);
                s.parentNode.insertBefore(tt, s);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
