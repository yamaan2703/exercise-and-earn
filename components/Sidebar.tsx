"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu as links } from "@/Data/sidebarData";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface MenuLink {
  to: string;
  label: string;
  icon: React.ReactElement;
  children?: MenuLink[];
  ml?: number;
}

interface OpenMenus {
  [key: string]: boolean;
}

function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<OpenMenus>({});

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderLinks = (menuLinks: MenuLink[]) => {
    if (!menuLinks || menuLinks.length === 0) return null;

    return menuLinks.map((link, index) => {
      const key = `${link.to}-${index}`;
      const isMenuOpen = openMenus[key];
      const hasChildren = link.children && link.children.length > 0;

      const marginLeftClass = link.ml ? `ml-${link.ml}` : "";

      return (
        <div key={key} className={`space-y-1 ${marginLeftClass}`}>
          {hasChildren ? (
            <>
              <button
                onClick={() => toggleMenu(key)}
                className={cn(
                  "flex items-center justify-between w-full text-[12px] sm:text-[15px] px-3 py-2 rounded-lg transition duration-300",
                  pathname.startsWith(link.to)
                    ? "bg-[#C7E5C9] text-gray-900 shadow-md"
                    : "text-gray-600 hover:bg-[#EDF8ED] hover:text-green-900"
                )}
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </span>
                <span>
                  {isMenuOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </span>
              </button>
              {isMenuOpen &&
                link.children &&
                renderLinks(link.children as MenuLink[])}
            </>
          ) : (
            <Link href={link.to} onClick={handleLinkClick}>
              <p
                className={cn(
                  "flex items-center text-[12px] sm:text-[15px] space-x-3 px-3 py-2 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95",
                  pathname === link.to
                    ? "bg-[#C7E5C9] text-gray-900 shadow-md"
                    : "text-gray-600 hover:bg-[#c7f7cb] hover:text-green-900"
                )}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </p>
            </Link>
          )}
        </div>
      );
    });
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full w-[270px] bg-[#0b1220] border-r border-gray-400 shadow-md z-[101] transform transition-transform rounded-r-2xl",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:block"
      )}
    >
      <div className="flex items-center justify-center mx-auto pb-3 pt-5">
        <Image
          src="/Icons/logo.png"
          width={1000}
          height={1000}
          alt="Logo"
          className="w-28 h-28"
        />
      </div>

      <div className="flex-1 px-4 space-y-2 h-[calc(100vh-140px)] overflow-y-auto scrollbar-custom">
        <nav className="flex flex-col space-y-2">{renderLinks(links)}</nav>
      </div>
    </aside>
  );
}

export default Sidebar;
