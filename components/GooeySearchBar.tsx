"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { GooeyInput } from "@/components/ui/gooey-input";
import ProductSearchModal from "@/components/ProductSearchModal";

const GooeySearchBar = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <>
        <button onClick={() => setModalOpen(true)} className="text-black hover:text-lightColor hoverEffect">
          <Search className="w-5 h-5" />
        </button>
        <ProductSearchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  return (
    <GooeyInput
      placeholder="Search..."
      onValueChange={(value) => {
        if (value.trim()) router.push(`/shop?search=${encodeURIComponent(value.trim())}`);
      }}
      collapsedWidth={115}
      expandedWidth={220}
      expandedOffset={50}
      classNames={{
        root: "outline outline-1 outline-neutral-200 rounded-full",
        trigger: "bg-white text-neutral-500 shadow-none ring-0 hover:text-neutral-700",
        bubbleSurface: "bg-white text-neutral-500 shadow-none ring-0",
        input: "text-neutral-700 placeholder:text-neutral-400",
      }}
    />
  );
};

export default GooeySearchBar;
