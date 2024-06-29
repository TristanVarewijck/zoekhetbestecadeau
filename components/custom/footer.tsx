import { Globe, Search } from "lucide-react";

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[hsl(var(--primary))] text-white">
      <div className="max-w-[1440px] mx-auto pt-7 pb-3 px-3 w-full flex  items-center md:items-start flex-col gap-6 md:gap-10">
        <div className="flex items-center justify-center md:justify-between">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 justify-center">
            <Link href="/">
              <Image
                src="/branding/logo.svg"
                alt="zoekhetbestecadeau logo"
                width={225}
                height={0}
              />
            </Link>
            <div className="flex gap-6 text-base">
              <Link href="/" className="flex gap-1 items-center">
                start met zoeken <Search size={14} />
              </Link>
              <Link href="/about" className="flex gap-1 items-center">
                over ons <Globe size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-10 md:gap-20 md:items-baseline flex-col-reverse md:flex-row">
          <div className="flex items-center md:items-start flex-col gap-2 text-xs">
            <p className="text-lg">Paginas:</p>
            <Link href="/">Homepagina</Link>
            <Link href="/finder">Zoeken</Link>
            <Link href="/about">Over ons</Link>
          </div>

          <div className="flex items-center md:items-start flex-col gap-2 text-xs">
            <p className="text-lg">Voorwaarden:</p>
            <Link href="/conditions">Algemene voorwaarden.</Link>
            <Link href="/disclaimer">Disclaimer.</Link>
            <Link href="/privacy-policy">Privacybeleid.</Link>
          </div>

          <div className="flex items-center md:items-start flex-col gap-2">
            <p className="text-lg">Socials:</p>
            <div className="flex gap-5 flex-1" aria-label="Social media links">
              <Link
                href="https://www.instagram.com/zoekhetbestecadeau/?igsh=Yzc2ejdreTViYXoz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram icon"
                  width={30}
                  height={30}
                />
              </Link>
              <Link
                href="https://vm.tiktok.com/ZIJnsDRJn/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tiktok"
              >
                <Image
                  src="/icons/tiktok.svg"
                  alt="Tiktok icon"
                  width={30}
                  height={30}
                />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61560445112589"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook icon"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-xs mt-5 flex flex-col md:flex-row gap-2 justify-center">
          <p>© {currentYear} zoekhetbestecadeau.nl. All rights reserved.</p>
          <p>
            <Link href={`mailto:${process.env.NEXT_PUBLIC_APP_MAIL}`}>
              zoekhetbestecadeau@gmail.nl
            </Link>
            .
          </p>
          <p>
            <Link href="/sitemap-0.xml">Sitemap</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
