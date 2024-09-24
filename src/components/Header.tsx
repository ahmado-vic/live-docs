import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { HeaderProps } from "types";

function Header({ children, className }: HeaderProps) {
  return (
    <main className={`${cn("header", className)}`}>
      <Link href="/" className="md:flex-1">
        <Image
          src="../assets/icons/logo.svg"
          alt="logo with name"
          width={120}
          height={32}
          className="hidden md:block"
        />
        <Image
          src="../assets/icons/logo-icon.svg"
          alt="logo"
          width={50}
          height={50}
          className="block md:hidden"
        />
      </Link>
      {children}
    </main>
  );
}

export default Header;
