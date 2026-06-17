import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { Product } from "@/sanity.types";
import { getDealProducts } from "@/sanity/queries";
import React from "react";


const DealPage = async () => {
  const products: Product[] = await getDealProducts();
  return (
    <div >
      <Container className="mt-12 mb-15">
        <Title >
          Hot deals of the week.
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {products?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
