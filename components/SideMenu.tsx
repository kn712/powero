import React from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const SideMenu: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/10 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } hoverEffect`}
    >
      <div className="min-w-72 max-w-96 bg-white/70 backdrop-blur-2xl h-screen p-10 border-r border-r-neutral-200 flex flex-col gap-6 shadow-xl">
        <div className="flex items-center justify-between gap-5">
          <Logo />
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-darkColor hoverEffect"
          >
            <X />
          </button>
        </div>
        <div
          ref={sidebarRef}
          className="flex flex-col space-y-3.5 font-semibold tracking-wide text-neutral-800"
        >
          {headerData?.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              className={`hover:text-lightColor hoverEffect ${
                pathname === item?.href && "text-lightColor"
              }`}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
