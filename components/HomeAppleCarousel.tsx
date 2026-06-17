"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import product1 from "@/images/carousel/carousel_1.jpg";
import product2 from "@/images/carousel/carousel_2.jpg";
import product3 from "@/images/carousel/carousel_3.jpg";
import product4 from "@/images/carousel/carousel_4.jpg";
import product5 from "@/images/carousel/carousel_5.jpg";
import product6 from "@/images/carousel/carousel_6.jpg";

// 修改图片：把上面的 import 换成你想要的图片文件
// 修改跳转：把下面 href 改成对应的 Sanity 分类 slug（/shop?category=your-slug）
const cardsData = [
  {
    category: "New Arrivals",
    title: "Latest Gadgets",
    src: product1.src,
    href: "/shop?category=gadget",
    content: null,
  },
  {
    category: "Top Picks",
    title: "Premium Headphones",
    src: product5.src,
    href: "/shop?category=headphones",
    content: null,
  },
  {
    category: "Best Sellers",
    title: "Home Appliances",
    src: product4.src,
    href: "/shop?category=appliances",
    content: null,
  },
  {
    category: "Hot Deals",
    title: "Smart Electronics",
    src: product3.src,
    href: "/deal",
    content: null,
  },
  {
    category: "Featured",
    title: "Accessories",
    src: product2.src,
    href: "/shop?category=accessories",
    content: null,
  },
  {
    category: "Trending",
    title: "Audio & Sound",
    src: product6.src,
    href: "/shop?category=audio",
    content: null,
  },
];

const HomeAppleCarousel = () => {
  const cards = cardsData.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <div className="relative left-1/2 -translate-x-1/2 w-screen mt-10">
      <div className="px-6 pb-2">
        <h2 className="text-4xl font-medium text-center mt-35 mb-10 text-black">Explore our featured collections.</h2>
      </div>
      <Carousel items={cards} autoScroll autoScrollInterval={0.5} />
    </div>
  );
};

export default HomeAppleCarousel;
