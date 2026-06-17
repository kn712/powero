"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import ProductSearchModal from "@/components/ProductSearchModal";

const NavSearchButton = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-700"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search</span>
        <kbd className="ml-1 flex items-center gap-0.5 rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <ProductSearchModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default NavSearchButton;
