"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { links } from "./navDesktop";

const NavMobile = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent"></CiMenuFries>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetTitle className="mt-32 mb-40 text-center text-2xl text-white">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Placeholder<span className="text-accent">.</span>
            </h1>
          </Link>
        </SheetTitle>
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${pathname === link.path && "text-accent border-b-2 border-accent"} font-medium hover:text-accent transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
