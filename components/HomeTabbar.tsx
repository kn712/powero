"use client";
import { productType } from "@/constants/data";
import Link from "next/link";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex flex-col items-center gap-8 mt-20 mb-10">
      <p className="text-center text-black font-medium text-4xl md:text-4xl leading-tight">
        Popular picks on powero.
      </p>

      <div className="flex items-center flex-wrap gap-1 justify-center">
        {productType?.map((item) => (
          <button
            onClick={() => onTabSelect(item?.title)}
            key={item?.title}
            className={`relative rounded-full px-4 py-2 text-lg font-semibold transition-colors hoverEffect
              ${selectedTab === item?.title
                ? "bg-neutral-200 text-neutral-900"
                : "text-neutral-900 hover:bg-neutral-200"
              }`}
          >
            {item?.title}
          </button>
        ))}
        <Link
          href="/shop"
          className="relative rounded-full px-4 py-2 text-lg font-semibold text-neutral-900 border border-neutral-300 transition-colors hover:bg-neutral-200 hoverEffect"
        >
          See all
        </Link>
      </div>
    </div>
  );
};

export default HomeTabbar;
