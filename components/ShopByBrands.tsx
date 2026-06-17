import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllBrands } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

const ShopByBrands = async () => {
  const brands = await getAllBrands();
  return (
    <div className="py-20">
      <h2 className="text-4xl mt-15 md:text-4xl font-medium text-neutral-900 leading-tight text-center">
        Discover top brands.
      </h2>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">
        {brands?.map((brand) => (
          <Link
            key={brand?._id}
            href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
            className="flex items-center justify-center p-6 rounded-2xl hover:border hoverEffect"
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt={brand?.title ?? "brand"}
                width={300}
                height={300}
                className="w-full h-18 object-contain"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
