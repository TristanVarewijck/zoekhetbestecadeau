import { Globe, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto py-7 px-3 w-full">
        <div className="flex items-center justify-center md:justify-between mb-14">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 justify-between">
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

        <div className="flex justify-between items-center md:items-baseline flex-col-reverse gap-4 md:gap-0 md:flex-row">
          <div className="flex items-center flex-col md:flex-row gap-2 text-xs">
            <p>© {currentYear} Zoekhetbestecadeau. All rights reserved.</p>
            <Link href="/conditions">Algemene voorwaarden.</Link>
            <Link href="/privacy">Privacy policy.</Link>
          </div>

          <div className="flex space-x-2 items-center gap-3">
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
    </footer>
  );
};

export default Footer;
