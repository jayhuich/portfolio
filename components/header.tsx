import Link from "next/link";

import NavDesktop from "./navDesktop";
import NavMobile from "./navMobile";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Placeholder<span className="text-accent">.</span>
          </h1>
        </Link>

        {/* desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          <NavDesktop />
          <Link href="/contact">
            <Button>Contact me</Button>
          </Link>
        </div>

        {/* mobile nav */}
        <div className="lg:hidden">
          <NavMobile />
        </div>
      </div>
    </header>
  );
};

export default Header;
