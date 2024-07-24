import { Globe, Search } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-[hsl(var(--primary))] text-white">
            <div className="max-w-[1440px] mx-auto pt-7 pb-3 px-3 w-full flex  items-center md:items-start flex-col gap-6 md:gap-10">
                <div className="flex items-center justify-center md:justify-between">
                    <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-10">
                        <a href="/">
                            <img
                                src="/branding/logo-white.svg"
                                alt="zoekhetbestecadeau logo white svg"
                                width={350}
                                height={0}
                            />
                        </a>
                        <div className="flex gap-6 text-base flex-col sm:flex-row items-center">
                            <a href="/" className="flex items-center gap-1">
                                Start met zoeken <Search size={14} />
                            </a>
                            <a
                                href="/about"
                                className="flex items-center gap-1"
                            >
                                Over ons <Globe size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-10 md:gap-20 md:items-baseline md:flex-row">
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <p className="text-lg font-bold">Paginas</p>
                        <a href="/">Homepagina</a>

                        <a href="/finder">Zoeken</a>
                        <a href="/about">Over ons</a>
                    </div>

                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <p className="text-lg font-bold">Voorwaarden</p>
                        <a href="/conditions">Algemene voorwaarden.</a>
                        <a href="/disclaimer">Disclaimer.</a>
                        <a href="/privacy-policy">Privacybeleid.</a>
                    </div>

                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <p className="text-lg font-bold">Socials</p>
                        <div
                            className="flex flex-1 gap-5"
                            aria-label="Social media links"
                        >
                            <a
                                href="https://www.instagram.com/zoekhetbestecadeau/?igsh=Yzc2ejdreTViYXoz&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <img
                                    src="/branding/instagram.svg"
                                    alt="instagram icon svg"
                                    width={30}
                                    height={30}
                                />
                            </a>
                            <a
                                href="https://vm.tiktok.com/ZIJnsDRJn/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Tiktok"
                            >
                                <img
                                    src="/branding/tiktok.svg"
                                    alt="tiktok icon svg"
                                    width={30}
                                    height={30}
                                />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61560445112589"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <img
                                    src="/branding/facebook.svg"
                                    alt="facebook icon svg"
                                    width={30}
                                    height={30}
                                />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-2 mt-5 text-xs text-center md:flex-row">
                    <p>
                        © {currentYear} zoekhetbestecadeau.nl. All rights
                        reserved.
                    </p>
                    <p>
                        <a href={`mailto:${import.meta.env.VITE_MAIL}`}>
                            {import.meta.env.VITE_MAIL}
                        </a>
                        .
                    </p>
                    <p>
                        <a href="/sitemap-0.xml">Sitemap</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
