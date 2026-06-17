"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import { useSearchParams } from "next/navigation";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { client } from "@/sanity/lib/client";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}
const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && price >= $minPrice && price <= $maxPrice
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;
      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);
  const hasActiveFilters = selectedCategory !== null || selectedBrand !== null || selectedPrice !== null;

  const FilterPanel = () => (
    <>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BrandList
        brands={brands}
        setSelectedBrand={setSelectedBrand}
        selectedBrand={selectedBrand}
      />
      <PriceList
        setSelectedPrice={setSelectedPrice}
        selectedPrice={selectedPrice}
      />
    </>
  );

  return (
    <div>
      <Container className="mt-12 mb-15">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <Title>Get the products as your needs.</Title>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_green underline text-sm font-medium hover:text-darkRed hoverEffect"
              >
                Reset
              </button>
            )}
            {/* Mobile filter button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden flex items-center gap-2 px-3 py-2 rounded-full border border-neutral-300 text-sm font-medium hover:bg-neutral-100 hoverEffect"
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && (
                <span className="bg-darkColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {[selectedCategory, selectedBrand, selectedPrice].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex flex-row gap-5">
          <div className="sticky top-20 self-start min-w-64 pb-5">
            <FilterPanel />
          </div>
          <div className="flex-1 pt-5">
            {loading ? (
              <div className="p-20 flex flex-col gap-2 items-center justify-center">
                <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                <p className="font-semibold tracking-wide text-base">Product is loading . . .</p>
              </div>
            ) : products?.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
                {products?.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
              </div>
            ) : (
              <NoProductAvailable className="bg-white mt-0" />
            )}
          </div>
        </div>

        {/* Mobile layout — products full width */}
        <div className="md:hidden">
          {loading ? (
            <div className="p-20 flex flex-col gap-2 items-center justify-center">
              <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
              <p className="font-semibold tracking-wide text-base">Product is loading . . .</p>
            </div>
          ) : products?.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5">
              {products?.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))}
            </div>
          ) : (
            <NoProductAvailable className="bg-white mt-0" />
          )}
        </div>
      </Container>

      {/* Mobile filter bottom sheet */}
      {isFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsFilterOpen(false)}
          />
          {/* Sheet */}
          <div className="relative bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto pb-8 shadow-2xl">
            <div className="sticky top-0 bg-white px-5 pt-5 pb-3 flex items-center justify-between border-b border-neutral-100">
              <p className="font-semibold text-lg">Filters</p>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-100 hoverEffect"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-2">
              <FilterPanel />
            </div>
            <div className="px-5 pt-4">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-darkColor text-white py-3 rounded-full font-semibold hover:bg-lightColor hoverEffect"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
