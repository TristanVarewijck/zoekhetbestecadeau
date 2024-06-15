import { ArrowRight, MenuIcon, User } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex h-16 shrink-0 items-center mx-auto px-4 md:px-6 max-w-[1440px] justify-end absolute w-full right-0 left-0 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <Link className="mr-6" href="/">
            <Image
              src="/branding/logo.svg"
              alt="zoekhetbestecadeau logo"
              width={175}
              height={0}
            />
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              href="/about"
            >
              Start met zoeken
            </Link>

            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              href="/about"
            >
              Over ons
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <nav className="ml-auto hidden lg:flex gap-6 items-center justify-between w-full">
        <Link className="mr-6" href="/">
          <Image
            src="/branding/logo.svg"
            alt="zoekhetbestecadeau logo"
            width={225}
            height={0}
          />
        </Link>

        <div className="flex gap-3 items-center">
          <Button asChild variant={"secondary"}>
            <Link href="/about" className="flex items-center gap-1">
              <span>Over ons</span>
              <User size={18} />
            </Link>
          </Button>

          <Button asChild variant={"default"}>
            <Link href="/" className="flex items-center gap-1">
              <span>Zoeken</span>
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
