import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image"
import LogoPic from "@/images/logo.png"


const Logo = ({ className }: { className?: string}) => {
  return (
    <Link href={"/"} className="inline-flex">
      <Image src={LogoPic} alt="logo" width={35} height={35} />
      <h2
        className={cn(
          "text-2xl font-bold text-shop_dark_blue tracking-tighter hoverEffect group font-geist-sans",
          className
        )}
      >
        powero
      </h2>
    </Link>
  );
};

export default Logo;
