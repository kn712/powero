import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return (
    <div className="bg-white">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-10 h-10 animate-spin text-darkColor" />
          </div>
        }
      >
        <Shop categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
};

export default ShopPage;