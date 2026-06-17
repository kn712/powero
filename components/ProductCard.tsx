import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] rounded-lg group bg-white">
      <div className="relative group overflow-hidden rounded-t-lg bg-shop_light_bg">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={700}
              priority
              className={`w-full h-96 object-cover overflow-hidden transition-transform bg-shop_light_bg duration-500 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.status === "sale" ? (
          <p className="absolute top-3 left-3 z-10 text-md font-medium text-white bg-darkColor px-3 py-2 rounded-full">
            Sale!
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-3 left-2 z-10 rounded-full p-2 bg-shop_red  outline-none"
          >
            <Flame
              size={18}
              fill="#ffffff"
              className="text-white"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className=" line-clamp-1 text-md font-medium text-lightText">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}
        <Title className="text-lg line-clamp-1">{product?.name}</Title>
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-1">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                fontSize={20}
                className={
                  index < 4 ? "text-shop_yellow" : " text-lightColor"
                }
                fill={index < 4 ? "#ffb400" : "#646464"}
              />
            ))}
          </div>
          <p className="text-lightText text-xs tracking-wide">2450 Reviews</p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`${product?.stock === 0 ? "text-shop_red" : "text-darkColor font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discount}
        />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;