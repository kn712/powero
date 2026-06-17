import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Logo from "@/components/Logo";
import GooeySearchBar from "@/components/GooeySearchBar";
import CartIcon from "@/components/CartIcon";
import FavoriteButton from "@/components/FavoriteButton";
import SignIn from "@/components/SignIn";
import MobileMenu from "@/components/MobileMenu";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "Blog", link: "/blog" },
  { name: "Hot Deal", link: "/deal" },
];

const FloatingHeader = async () => {
  let user = null;
  let orders = null;
  try {
    user = await currentUser();
    const { userId } = await auth();
    if (userId) {
      orders = await getMyOrders(userId);
    }
  } catch {
    // Clerk middleware not available for this route
  }

  return (
    <FloatingNav
      leftContent={
        <>
          <MobileMenu />
          <Logo />
        </>
      }
      centerContent={
        <>
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className=" relative rounded-full px-4 py-2 text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-200"
            >
              {item.name}
            </Link>
          ))}
        </>
      }
      rightContent={
        <>
          <GooeySearchBar />
          <div className="flex items-center gap-3 text-neutral-500">
            <CartIcon />
            <FavoriteButton />
            {user && (
              <Link
                href="/orders"
                className="group relative hover:text-lightColor hoverEffect"
              >
                <Logs className="h-5 w-5 text-black group-hover:text-lightColor hoverEffect" />
                <span className="absolute -top-1 -right-1 bg-darkColor group-hover:bg-lightColor hoverEffect text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center pointer-events-none">
                  {orders?.length ?? 0}
                </span>
              </Link>
            )}
          </div>
          <div className="h-5 w-px bg-neutral-200" />
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {!user && (
              <SignIn />
            )}
          </ClerkLoaded>
        </>
      }
    />
  );
};

export default FloatingHeader;
