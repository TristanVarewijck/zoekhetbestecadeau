import { ArrowRight, Gift, Globe, MenuIcon, Search, User } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";

const Navbar = () => {
    return (
        <div className="flex h-16 shrink-0 items-center mx-auto px-4 md:px-6 justify-end absolute right-0 left-0 z-50 lg:bg-white w-full lg:shadow-sm">
            <nav className="flex items-center justify-between gap-6 ml-auto lg:hidden w-full">
                <a href="/">
                    <img
                        src="/branding/icon.svg"
                        alt="zoekhetbestecadeau icon svg"
                        width={35}
                        height={0}
                    />
                </a>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className="lg:hidden"
                            size="icon"
                            variant="outline"
                        >
                            <MenuIcon className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <a className="mr-6" href="/">
                            <img
                                src="/branding/logo.svg"
                                alt="zoekhetbestecadeau logo svg"
                                width={275}
                                height={0}
                            />
                        </a>
                        <div className="grid gap-2 py-6">
                            <a
                                className="flex items-center w-full py-2 text-lg font-semibold gap-1"
                                href="/"
                            >
                                <span>
                                    <Search size={18} />
                                </span>
                                <span>Start met zoeken</span>
                            </a>

                            <a
                                className="flex items-center w-full py-2 text-lg font-semibold gap-2"
                                href="/products"
                            >
                                <span>
                                    <Gift size={18} />
                                </span>
                                <span>Bekijk al onze cadeaus</span>
                            </a>

                            <a
                                className="flex items-center w-full py-2 text-lg font-semibold gap-2"
                                href="/about"
                            >
                                <span>
                                    <Globe size={18} />
                                </span>
                                <span> Over ons</span>
                            </a>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>

            <nav className="items-center justify-between hidden w-full gap-6 ml-auto lg:flex max-w-[1440px] mx-auto">
                <a className="mr-6" href="/">
                    <img
                        src="/branding/logo.svg"
                        alt="zoekhetbestecadeau logo svg"
                        width={275}
                        height={0}
                    />
                </a>

                <div className="flex items-center gap-3">
                    <Button asChild variant={"outline"}>
                        <a
                            href="/about"
                            className="flex items-center gap-1 font-bold"
                        >
                            <span className="font-bold">Over ons</span>
                            <User size={18} />
                        </a>
                    </Button>

                    <Button asChild variant={"outline"}>
                        <a href="/products" className="flex items-center gap-1">
                            <span className="font-bold">
                                Bekijk al onze cadeaus
                            </span>
                            <Gift size={18} />
                        </a>
                    </Button>
                    <Button asChild variant={"default"}>
                        <a
                            href="/"
                            className="flex items-center gap-1 font=bold"
                        >
                            <span className="font-bold">Zoeken</span>
                            <ArrowRight size={18} />
                        </a>
                    </Button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
