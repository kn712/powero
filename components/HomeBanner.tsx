"use client";
import React from "react";
import Link from "next/link";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import product1 from "@/images/hp1.png";
import product2 from "@/images/hp2.png";

const images = [
  product1.src,
  product2.src,
];

const HomeBanner = () => {
  return (
    <div className="relative flex flex-col pt-80 md:pt-60 -mt-20 min-h-screen w-full items-center justify-start overflow-hidden bg-gradient-to-b from-gray-100 to-white">
      <ParallaxHeroImages images={images} />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-medium text-black font-geist-sans leading-tight">
          Discover headphones selected just for you.
        </h1>
        <Link
          href="/shop"
          className="bg-black text-white px-8 py-3 rounded-full font-medium text-md hover:bg-lightColor hoverEffect"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
