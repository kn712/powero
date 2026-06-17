"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  leftContent,
  centerContent,
  rightContent,
  className,
}: {
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-[5000]", className)}>
      <div className="max-w-screen-xl mx-auto px-4 pt-5 pb-2">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border px-6 py-2.5 transition-all duration-300",
            scrolled
              ? "border-black/5 bg-white shadow-md shadow-black/10"
              : "border-transparent bg-transparent shadow-none"
          )}
        >
          <div className="flex items-center gap-3">{leftContent}</div>
          <div className="hidden md:flex items-center gap-1">{centerContent}</div>
          <div className="flex items-center gap-4">{rightContent}</div>
        </div>
      </div>
    </div>
  );
};
